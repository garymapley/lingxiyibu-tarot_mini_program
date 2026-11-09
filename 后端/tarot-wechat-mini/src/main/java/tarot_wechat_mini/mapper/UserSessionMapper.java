package tarot_wechat_mini.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import tarot_wechat_mini.entity.UserSession;

@Mapper
public interface UserSessionMapper extends BaseMapper<UserSession> {

    // ✅ 用 MyBatis-Plus 自带方法，不用写SQL！
    default UserSession selectByToken(String token) {
        return selectOne(new LambdaQueryWrapper<UserSession>()
                .eq(UserSession::getToken, token)
                .last("limit 1"));
    }
}