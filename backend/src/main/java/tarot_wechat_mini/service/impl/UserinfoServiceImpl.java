package tarot_wechat_mini.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.mapper.UserinfoMapper;
import tarot_wechat_mini.service.UserinfoService;

import java.util.Date;

@Service
public class UserinfoServiceImpl implements UserinfoService {

    @Autowired
    private UserinfoMapper userinfoMapper;

    @Override
    public Userinfo getById(Long id) {
        return userinfoMapper.selectById(id);
    }

    @Override
    public boolean save(Userinfo userinfo) {
        return userinfoMapper.insert(userinfo) > 0;
    }

    @Override
    public boolean updateById(Userinfo userinfo) {
        return userinfoMapper.updateById(userinfo) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return userinfoMapper.deleteById(id) > 0;
    }

    @Override
    public boolean updateAvatar(Long userId, String avatarUrl) {
        Userinfo user = new Userinfo();
        user.setId(userId);
        user.setAvatarUrl(avatarUrl);
        user.setUpdateTime(new Date());
        // 这里直接调用mapper的updateById，IDEA在Service里不会误判！
        return userinfoMapper.updateById(user) > 0;
    }
}