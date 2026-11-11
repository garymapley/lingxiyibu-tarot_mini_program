package tarot_wechat_mini.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("tarot_card")
public class TarotCard {
    @TableId(type = IdType.AUTO)
    private String id;

    private String name;

    /**
     * 正位/逆位，对应数据库 ENUM 类型
     */
    private String orientation;

    private String imageUrl;

    /**
     * 牌的基础解读
     */
    private String description;
    private int nameType;

    /**
     * 正位含义
     */
    private String meaningUp;

    /**
     * 逆位含义
     */
    private String meaningRev;
}
