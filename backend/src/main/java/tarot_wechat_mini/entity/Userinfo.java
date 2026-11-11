package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDate;
import java.util.Date;

@Data
@TableName("userinfo")  // 对应数据库表名
public class Userinfo {
    @TableId(type = IdType.AUTO)  // 标记为主键
    private Long id;

    private String nickname;

    private String avatarUrl;  // 下划线转驼峰

    private String wechatOpenid;

    private String wechatUnionid;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 0未删除，其他为删除
     */
    private Integer deleted;

    /**
     * 版本号，用于更新的乐观锁
     */
    private Integer version;

    /**
     * 管理员功能
     */
    private String role;
}

