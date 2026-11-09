package tarot_wechat_mini.service;

import tarot_wechat_mini.controller.vo.Result;
import tarot_wechat_mini.controller.vo.login.TokenData;

public interface LoginService {
    Result<TokenData> wechatLogin(String code);


    String generateAndStoreToken(String openid, String sessionKey);
}
