package tarot_wechat_mini.controller.vo.login;

import lombok.Data;

/**
 * 登录成功后返回的Token数据类
 */
@Data
public class TokenData {
    /**
     * 访问令牌
     */
    private String token;

    /**
     * 刷新令牌
     */
    private String refresh_token;

    /**
     * 角色
     */
    private String role;

    /**
     * 用户头像URL（存储在COS）
     */
    private String avatarUrl;

    /**
     * 用户昵称
     */
    private String nickname;
}