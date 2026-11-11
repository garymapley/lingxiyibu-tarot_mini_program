package tarot_wechat_mini.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import tarot_wechat_mini.entity.TarotCard;

import java.util.List;

public interface TarotCardService {
    TarotCard getById(String id);

    int save(TarotCard user);

    int updateById(TarotCard user);

    int removeById(String id);

    /**
     * 分页查询卡牌
     *
     * @param pageNum  当前页码，从 1 开始
     * @param pageSize 每页数量
     * @return 分页结果
     */
    IPage<TarotCard> page(int pageNum, int pageSize,int nameType);

    /**
     * 获取所有塔罗牌（包含牌意数据）
     */
    List<TarotCard> getAllCards();

    /**
     * 根据分类获取塔罗牌
     * @param nameType 1:大阿卡那 2:权杖 3:圣杯 4:宝剑 5:钱币
     */
    List<TarotCard> getCardsByType(int nameType);

}
