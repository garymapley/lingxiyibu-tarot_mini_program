package tarot_wechat_mini.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.TarotInterpretation;
import tarot_wechat_mini.mapper.TarotInterpretationMapper;
import tarot_wechat_mini.service.TarotAiService;
import tarot_wechat_mini.service.TarotInterpretationService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarotInterpretationServiceImpl
        extends ServiceImpl<TarotInterpretationMapper, TarotInterpretation>
        implements TarotInterpretationService {

    @Autowired
    private TarotAiService tarotAiService;

    /**
     * 原方法（保留兼容）
     */
    @Override
    public TarotInterpretation generateInterpretation(Integer tarotRecordId, String summary, String detail, String advice) {
        TarotInterpretation interpretation = new TarotInterpretation();
        interpretation.setTarotRecordId(tarotRecordId);
        interpretation.setSummary(summary);
        interpretation.setDetail(detail);
        interpretation.setAdvice(advice);
        interpretation.setCreateTime(LocalDateTime.now());
        this.save(interpretation);
        return interpretation;
    }

    /**
     * 新增：AI生成解读实现（和接口方法完全对应）
     */
    @Override
    public TarotInterpretation generateByAi(Integer tarotRecordId, String spreadName, String question, List<String> cardInfos) {
        // 调用AI生成解读
        String[] aiResult = tarotAiService.generateTarotAi(spreadName, question, cardInfos);
        String summary = aiResult[0];
        String detail = aiResult[1];
        String advice = aiResult[2];

        // 保存到数据库
        TarotInterpretation interpretation = new TarotInterpretation();
        interpretation.setTarotRecordId(tarotRecordId);
        interpretation.setSummary(summary);
        interpretation.setDetail(detail);
        interpretation.setAdvice(advice);
        interpretation.setCreateTime(LocalDateTime.now());

        this.save(interpretation);
        return interpretation;
    }
}