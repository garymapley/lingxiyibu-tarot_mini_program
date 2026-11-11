package tarot_wechat_mini.service;

import com.alibaba.fastjson2.JSON;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.UserSession;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.mapper.UserSessionMapper;
import tarot_wechat_mini.mapper.UserinfoMapper;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class TokenService {
    private final StringRedisTemplate stringRedisTemplate;
    private final UserSessionMapper userSessionMapper;
    @Resource
    private UserinfoMapper userinfoMapper;

    @Value("${app.token-expire-days:7}")
    private int expireDays;

    public TokenService(StringRedisTemplate stringRedisTemplate, UserSessionMapper userSessionMapper) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.userSessionMapper = userSessionMapper;
    }

    public String generateAndStoreToken(String openid, String sessionKey) {
        String token = UUID.randomUUID().toString().replace("-", "");
        WechatUserInfo info = new WechatUserInfo(openid, sessionKey);
        String json = JSON.toJSONString(info);

        // ✅ 存储到 Redis（日志校验）
        log.info("【TokenService】生成Token：{}，用户信息：{}", token, json);
        stringRedisTemplate.opsForValue().set(token, json, expireDays, TimeUnit.DAYS);
        String check = stringRedisTemplate.opsForValue().get(token);
        log.info("【TokenService】Redis存储校验：{}", check);

        // ✅ 存储到 MySQL
        UserSession session = new UserSession();
        session.setToken(token);
        session.setOpenid(openid);
        session.setSessionKey(sessionKey);
        session.setCreateTime(LocalDateTime.now());
        session.setExpireTime(LocalDateTime.now().plusDays(expireDays));
        userSessionMapper.insert(session);
        log.info("【TokenService】MySQL插入成功：token={}", token);

        return token;
    }

    public Userinfo getUserInfoByToken(String token) {
        log.info("【TokenService】查询Token：{}", token);
        // 1. 查 Redis
        String uid = stringRedisTemplate.opsForValue().get("user:"+token);
        log.info("【TokenService】Redis查询结果：{}", uid);
        if (uid != null) {
            return userinfoMapper.selectById(uid);
        }
        return null;

//        // 2. 查 MySQL
//        UserSession session = userSessionMapper.selectByToken(token);
//        log.info("【TokenService】MySQL查询结果：{}", session);
//        if (session == null || session.getExpireTime().isBefore(LocalDateTime.now())) {
//            log.error("【TokenService】Token无效：{}", token);
//            return null;
//        }
//
//        // 3. 同步回 Redis
//        WechatUserInfo info = new WechatUserInfo(session.getOpenid(), session.getSessionKey());
//        redisTemplate.opsForValue().set(token, JSON.toJSONString(info), expireDays, TimeUnit.DAYS);
//        return info;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WechatUserInfo {
        private String openid;
        private String sessionKey;
    }
}