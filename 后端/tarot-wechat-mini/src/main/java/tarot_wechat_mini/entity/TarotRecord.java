package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("tarot_record")
public class TarotRecord {
    /**
     * 占卜记录ID（主键）
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 用户ID（关联userinfo表）
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 牌阵类型ID（关联tarot_array_type表）
     */
    @TableField("array_type_id")
    private Integer arrayTypeId;

    /**
     * 用户占卜问题
     */
    @TableField("question")
    private String question;

    // ✅ 新增：存完整的牌面JSON（包含正逆位、牌意等）
    private String cardsJson;

    // ✅ 新增：存完整的解读内容（总结、详情、建议）
    private String interpretationJson;
    /**
     * 占卜时间（默认当前时间）
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(exist = false)
    private String arrayName;
}

