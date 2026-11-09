package tarot_wechat_mini.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tarot_wechat_mini.controller.vo.Result;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @GetMapping("/info")
    public Result<Map<String, Object>> getUserInfo(HttpServletRequest request) {
        // 1. 从请求上下文获取用户信息（拦截器已存入）
        String openid = (String) request.getAttribute("openid");
//        String sessionKey = (String) request.getAttribute("sessionKey");

        // ✅ 关键修复：空值保护，彻底避免空指针
        if (openid == null) {
            return Result.fail(500, "用户信息获取失败：openid 为空");
        }

        // 2. 封装返回数据（安全处理，避免 substring 报错）
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("openid", openid);
        userInfo.put("nickname", "微信用户_" + (openid.length() > 8 ? openid.substring(0, 8) : openid));
        userInfo.put("sessionKey", "******"); // 敏感信息脱敏

        return Result.success("获取用户信息成功", userInfo);
    }
}