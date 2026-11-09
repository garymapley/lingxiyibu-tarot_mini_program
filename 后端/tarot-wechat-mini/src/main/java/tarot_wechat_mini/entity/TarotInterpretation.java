package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("tarot_interpretation")
public class TarotInterpretation {

    /**
     * 解读ID（主键）
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 占卜记录ID（关联 tarot_record 表）
     */
    @TableField("tarot_record_id")
    private Integer tarotRecordId;

    /**
     * 整体总结
     */
    @TableField("summary")
    private String summary;

    /**
     * 详细解读内容
     */
    @TableField("detail")
    private String detail;

    /**
     * 行动建议
     */
    @TableField("advice")
    private String advice;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}