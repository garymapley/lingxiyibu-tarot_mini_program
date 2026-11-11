package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("divination_card_assocation")
public class DivinationCardAssociation {
    /**
     * 收藏ID（主键）
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 用户ID（关联userinfo表）
     */
    @TableField("user_id")
    private Integer userId;

    /**
     * 收藏目标ID（对应占卜记录ID/tarot_record.id）
     */
    @TableField("target_id")
    private Integer targetId;

    /**
     * 收藏时间（默认当前时间）
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
