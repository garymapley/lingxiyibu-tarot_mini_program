package tarot_wechat_mini.controller;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tarot_wechat_mini.controller.vo.Result;
import tarot_wechat_mini.controller.vo.login.TokenData;
import tarot_wechat_mini.controller.vo.login.WechatLoginReqVo;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.service.UserinfoService;
import tarot_wechat_mini.service.LoginService;
import tarot_wechat_mini.utils.CosUtil;

import java.util.Map;

@Slf4j
@RequestMapping("/login")
@RestController
public class LoginController {

    @Resource
    private LoginService loginService;

    @Resource
    private CosUtil cosUtil;

    @Resource
    private UserinfoService userinfoService;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${wechat.mini.appid}")
    private String appid;

    @Value("${wechat.mini.secret}")
    private String secret;

    @PostMapping("/wechat_login")
    public Result<TokenData> login(@RequestBody WechatLoginReqVo reqVo) {
        log.info("接口获取的请求参数：{}", reqVo);
        String code = reqVo.getCode();
        return loginService.wechatLogin(code);
    }

    @PostMapping("/updateAvatar")
    public Result<String> updateAvatar(
            @RequestParam Long userId,
            @RequestParam MultipartFile file) {

        if (userId == null || file == null || file.isEmpty()) {
            return Result.fail(400, "参数错误");
        }

        try {
            // 1. 上传到COS
            String avatarUrl = cosUtil.uploadAvatar(file);

            // 2. 调用我们专门写的Service方法，100%不会报错
            boolean success = userinfoService.updateAvatar(userId, avatarUrl);

            if (success) {
                return Result.success("头像修改成功", avatarUrl);
            } else {
                return Result.fail(500, "修改失败");
            }
        } catch (Exception e) {
            log.error("头像上传失败", e);
            return Result.fail(500, "上传失败：" + e.getMessage());
        }
    }

    @GetMapping("/logout")
    public Result<Void> logout() {
        return Result.success();
    }
}