package tarot_wechat_mini.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tarot_wechat_mini.controller.vo.Result;
import tarot_wechat_mini.controller.vo.WechatLoginResponse;
import tarot_wechat_mini.controller.vo.login.TokenData;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.mapper.UserinfoMapper;
import tarot_wechat_mini.service.LoginService;
import tarot_wechat_mini.service.TokenService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private TokenService tokenService;

    @Resource
    private UserinfoMapper userinfoMapper;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String generateAndStoreToken(String openid, String sessionKey) {
        return tokenService.generateAndStoreToken(openid, sessionKey);
    }

    @Override
    public Result<TokenData> wechatLogin(String code) {
        if (code.equals("abcd")){
            return Result.fail(404,"用户不存在");
        }

        String getUrl2 = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type=authorization_code";
        Map<String, Object> getParams = new HashMap<>();
        getParams.put("appid", "wx46efdbff079622a9");
        getParams.put("secret", "6697ead316f206b8ff091ad9f4c68808");
        getParams.put("js_code", code);

        try {
            String json = restTemplate.getForObject(getUrl2, String.class, getParams);
            WechatLoginResponse wechatLoginResponse = objectMapper.readValue(json, WechatLoginResponse.class);

            System.out.println("微信返回：" + json);

            if (wechatLoginResponse == null || !wechatLoginResponse.isSuccess()) {
                return Result.fail(501, "登录失败：" + (wechatLoginResponse != null ? wechatLoginResponse.getErrMsg() : "返回空"));
            }

            String openid = wechatLoginResponse.getOpenid();
            String sessionKey = wechatLoginResponse.getSessionKey();

            // 1. 查询用户是否存在
            Userinfo userinfo = userinfoMapper.selectOne(new LambdaQueryWrapper<Userinfo>()
                    .eq(Userinfo::getWechatOpenid, openid)
                    .last(" limit 1"));

            // 2. 用户不存在 → 自动注册（最终修复版）
            if (userinfo == null || userinfo.getId() == null || userinfo.getId() <= 0){
                userinfo = new Userinfo();
                userinfo.setWechatOpenid(openid);
                userinfo.setNickname("微信用户");
                userinfo.setAvatarUrl("https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/default-avatar.jpg");
                userinfo.setCreateTime(new java.util.Date());
                userinfo.setUpdateTime(new java.util.Date());
                userinfo.setDeleted(0); // 逻辑删除默认0
                userinfo.setVersion(1); // 乐观锁默认1
                // 👇 绝对不要手动 setId()！让数据库自增
                userinfoMapper.insert(userinfo);
            }

            Long id = userinfo.getId();
            TokenData tokenData = new TokenData();
            String token = UUID.randomUUID().toString().replace("-", "");
            String refreshToken = UUID.randomUUID().toString().replace("-", "");

            tokenData.setToken(token);
            tokenData.setRefresh_token(refreshToken);
            tokenData.setRole(userinfo.getRole());
            tokenData.setAvatarUrl(userinfo.getAvatarUrl());
            tokenData.setNickname(userinfo.getNickname());

            // 设置token过期时间（如7天）
            stringRedisTemplate.opsForValue().set("user:token:"+id, token, 7, TimeUnit.DAYS);
            stringRedisTemplate.opsForValue().set("user:"+token, String.valueOf(id), 7, TimeUnit.DAYS);
            stringRedisTemplate.opsForValue().set("user:refresh_token:"+id, refreshToken, 30, TimeUnit.DAYS);

            return Result.success("登录成功", tokenData);

        } catch (Exception e) {
            e.printStackTrace();
            return Result.fail(500, "服务器异常：" + e.getMessage());
        }
    }
}