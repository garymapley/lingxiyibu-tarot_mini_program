package tarot_wechat_mini.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.controller.vo.TarotCardPageQuery;
import tarot_wechat_mini.entity.TarotCard;
import tarot_wechat_mini.service.TarotCardService;
import tarot_wechat_mini.utils.R;

import java.util.List;

@RequestMapping("/card")
@RestController
public class TarotCardController {
    @Autowired
    private TarotCardService tarotCardService;

    @GetMapping
    public TarotCard getById(@RequestParam String id){
        return tarotCardService.getById(id);
    }

    /**
     * 获取所有塔罗牌（包含牌意数据）
     * 用于前端牌意库展示
     */
    @GetMapping("/all")
    public R<List<TarotCard>> getAllCards() {
        List<TarotCard> cards = tarotCardService.getAllCards();
        return R.ok(cards);
    }

    /**
     * 根据分类获取塔罗牌
     * @param nameType 1:大阿卡那 2:权杖 3:圣杯 4:宝剑 5:钱币
     */
    @GetMapping("/byType/{nameType}")
    public R<List<TarotCard>> getCardsByType(@PathVariable int nameType) {
        List<TarotCard> cards = tarotCardService.getCardsByType(nameType);
        return R.ok(cards);
    }

//    @PostMapping
//    public int save(@RequestBody TarotCard tarotCard){
//        return tarotCardService.save(tarotCard);
//    }
//
//    @PutMapping
//    public int updateById(@RequestBody TarotCard tarotCard){
//        return tarotCardService.updateById(tarotCard);
//    }
//
//    @DeleteMapping
//    public int removeById(@RequestParam String id){
//        return tarotCardService.removeById(id);
//    }

    /**
     * 分页查询卡牌
     * 示例：GET /card/page?pageNum=1&pageSize=10
     */
    @GetMapping("/page")
    public IPage<TarotCard> page( TarotCardPageQuery tarotCardPageQuery) {
        System.out.println(tarotCardPageQuery.toString());
        int pageSize = tarotCardPageQuery.getPageSize();
        if ( pageSize <= 1){
            pageSize = 10;
        }
        int pageNum = tarotCardPageQuery.getPageNum();
        if (pageNum < 0){
            pageNum = 0;
        }
        int nameType = tarotCardPageQuery.getNameType();
        if (nameType < 1 || nameType>5){
            nameType = 0;
        }
        return tarotCardService.page(pageNum, pageSize, nameType);
    }
}
