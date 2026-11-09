package tarot_wechat_mini.controller.vo;

import lombok.Data;

@Data
public class TarotCardPageQuery {
    private int pageNum = 1;
    private int pageSize = 156;
    private int nameType;
}
