package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("tarot_array_type")
public class TarotArrayType {
    @TableId(type = IdType.AUTO)
    /**
     * 牌阵ID（主键）
     */
    private Integer id;

    /**
     * 牌阵名称（如：三牌阵）
     */
    private String name;

    /**
     * 该牌阵需要的牌数
     */
    private Integer cardCount;  // 对应数据库card_count（驼峰映射）

    /**
     * 牌阵说明
     */
    private String description;

}
