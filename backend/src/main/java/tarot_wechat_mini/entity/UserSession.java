package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("user_session")
public class UserSession {
    @TableId(type = IdType.AUTO) // 数据库自增，对应bigint
    private Long id;
    private String token;
    private String openid;
    private String sessionKey;
    private LocalDateTime createTime;
    private LocalDateTime expireTime;
}