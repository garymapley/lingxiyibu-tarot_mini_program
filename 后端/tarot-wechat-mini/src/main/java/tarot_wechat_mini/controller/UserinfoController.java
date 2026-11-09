package tarot_wechat_mini.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.service.UserinfoService;
import tarot_wechat_mini.utils.R;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserinfoController {

    @Autowired
    private UserinfoService userinfoService;

    /**
     * ✅ 核心接口：通过 Token 获取当前登录用户信息
     * 这是个人信息功能必须的！
     */
    @GetMapping("/info")
    public R<?> getUserInfo(HttpServletRequest request) {
        // 从拦截器获取用户ID（这是你拦截器解析Token后存的）
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return R.error("用户未登录");
        }
        Userinfo user = userinfoService.getById(userId);
        return R.ok(user);
    }

    /**
     * ✅ 核心接口：更新当前用户信息
     */
    @PutMapping("/update")
    public R<?> updateUserInfo(HttpServletRequest request, @RequestBody Userinfo userinfo) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return R.error("用户未登录");
        }
        // 强制设置要更新的ID是当前登录用户
        userinfo.setId(userId);
        boolean success = userinfoService.updateById(userinfo);
        if (success) {
            return R.ok("保存成功");
        } else {
            return R.error("保存失败");
        }
    }

    // 下面接口保留，用于后台管理，个人信息页不用
    @GetMapping("/{id}")
    public R<?> getById(@PathVariable Long id) {
        return R.ok(userinfoService.getById(id));
    }

    @PostMapping
    public R<?> save(@RequestBody Userinfo userinfo) {
        return R.ok(userinfoService.save(userinfo));
    }

    @DeleteMapping("/{id}")
    public R<?> removeById(@PathVariable Long id) {
        return R.ok(userinfoService.removeById(id));
    }
}