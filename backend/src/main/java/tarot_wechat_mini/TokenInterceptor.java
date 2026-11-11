package tarot_wechat_mini;

import com.alibaba.fastjson2.JSON;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import tarot_wechat_mini.controller.vo.Result;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.service.TokenService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class TokenInterceptor implements HandlerInterceptor {

    private final TokenService tokenService;
    private static final List<String> WHITE_LIST = Arrays.asList(
            "/login/wechat_login",
            "/login/logout",
            "/error"
    );

    public TokenInterceptor(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String requestUri = request.getRequestURI();
        String method = request.getMethod();

        // 1. OPTIONS预检请求直接放行
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        // 2. 白名单接口直接放行
        if (WHITE_LIST.stream().anyMatch(uri -> requestUri.startsWith(uri))) {
            log.info("白名单接口放行：{}", requestUri);
            return true;
        }

        // 3. 校验Token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            returnJson(response, Result.fail(401, "未携带有效Token"));
            return false;
        }

        String token = authHeader.substring(7);
        log.info("拦截器收到Token：{}", token);

        Userinfo userInfoByToken = tokenService.getUserInfoByToken(token);
        log.info("Token解析结果：{}", userInfoByToken);

        if (userInfoByToken == null) {
            returnJson(response, Result.fail(401, "Token无效或已过期"));
            return false;
        }

        // ✅ 【核心修复】补全role注入，管理员权限校验生效
        request.setAttribute("userId", userInfoByToken.getId());
        request.setAttribute("openid", userInfoByToken.getWechatOpenid());
        request.setAttribute("role", userInfoByToken.getRole()); // 新增：存入用户角色

        log.info("用户信息已存入上下文：userId={}, openid={}, role={}",
                userInfoByToken.getId(),
                userInfoByToken.getWechatOpenid(),
                userInfoByToken.getRole());

        return true;
    }

    private void returnJson(HttpServletResponse response, Result<?> result) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        PrintWriter writer = response.getWriter();
        writer.write(JSON.toJSONString(result));
        writer.flush();
        writer.close();
    }
}