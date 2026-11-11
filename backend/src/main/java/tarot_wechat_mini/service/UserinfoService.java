package tarot_wechat_mini.service;

import tarot_wechat_mini.entity.Userinfo;

public interface UserinfoService {
    Userinfo getById(Long id);
    boolean save(Userinfo userinfo);
    boolean updateById(Userinfo userinfo);
    boolean removeById(Long id);
    boolean updateAvatar(Long userId, String avatarUrl);
}