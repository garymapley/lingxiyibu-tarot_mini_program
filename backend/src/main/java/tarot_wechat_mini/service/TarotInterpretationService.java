package tarot_wechat_mini.service;

import com.baomidou.mybatisplus.extension.service.IService;
import tarot_wechat_mini.entity.TarotInterpretation;
import java.util.List;

public interface TarotInterpretationService extends IService<TarotInterpretation> {

    /**
     * 原方法（保留兼容）
     */
    TarotInterpretation generateInterpretation(Integer tarotRecordId, String summary, String detail, String advice);

    /**
     * 新增：AI生成塔罗解读方法（必须声明！）
     */
    TarotInterpretation generateByAi(Integer tarotRecordId, String spreadName, String question, List<String> cardInfos);
}