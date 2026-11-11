package tarot_wechat_mini.controller.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * 微信小程序登录接口响应实体
 */
@Data // Lombok注解，自动生成get/set/toString，需确保项目引入Lombok依赖
public class WechatLoginResponse {
    // 成功字段
    @JsonProperty("session_key") // 对应JSON中的session_key（下划线转驼峰也可不用，Jackson默认支持）
    private String sessionKey;

    @JsonProperty("openid")
    private String openid;

    // 失败字段
    @JsonProperty("errcode")
    private Integer errCode;

    @JsonProperty("errmsg")
    private String errMsg;

    // 扩展：快速判断是否成功的方法（无需手动判断errCode）
    public boolean isSuccess() {
        // 微信接口成功时无errcode，或errcode=0
        return errCode == null || errCode == 0;
    }
}
