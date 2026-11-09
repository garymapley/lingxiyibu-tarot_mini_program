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

@Slf4j
@Component
public class AdminInterceptor implements HandlerInterceptor {

    private final TokenService tokenService;

    public AdminInterceptor(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        // 1. 获取Token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            returnJson(response, Result.fail(401, "未携带有效Token"));
            return false;
        }

        String token = authHeader.substring(7);

        // 2. 获取用户信息
        Userinfo userInfoByToken = tokenService.getUserInfoByToken(token);

        if (userInfoByToken == null) {
            returnJson(response, Result.fail(401, "Token无效或已过期"));
            return false;
        }

        // ====================== 【管理员核心校验】 ======================
        String role = userInfoByToken.getRole();
        if (role == null || !"admin".equals(role)) {
            returnJson(response, Result.fail(403, "无管理员权限，禁止访问"));
            return false;
        }

        // 把用户信息存入请求域
        request.setAttribute("userId", userInfoByToken.getId());
        request.setAttribute("openid", userInfoByToken.getWechatOpenid());
        request.setAttribute("role", role);

        log.info("【管理员访问】userId={}", userInfoByToken.getId());
        return true;
    }

    // 统一返回JSON
    private void returnJson(HttpServletResponse response, Result<?> result) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        PrintWriter writer = response.getWriter();
        writer.write(JSON.toJSONString(result));
        writer.flush();
        writer.close();
    }
}