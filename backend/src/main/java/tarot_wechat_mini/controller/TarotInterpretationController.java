package tarot_wechat_mini.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.entity.TarotInterpretation;
import tarot_wechat_mini.service.TarotInterpretationService;
import tarot_wechat_mini.utils.R;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tarot/interpretation")
public class TarotInterpretationController {

    @Autowired
    private TarotInterpretationService interpretationService;

    /**
     * 生成AI塔罗解读（修复版：统一用 @RequestBody 接收）
     */
//    @PostMapping("/generate-ai")
//    public R<TarotInterpretation> generateAiInterpretation(
//            @RequestBody Map<String, Object> requestMap  // 改成 Map 接收
//    ) {
//        try {
//            // 强制手动取出，100% 拿到
//            Integer tarotRecordId = (Integer) requestMap.get("tarotRecordId");
//            String spreadName = (String) requestMap.get("spreadName");
//            String question = (String) requestMap.get("question");
//            List<String> cardList = (List<String>) requestMap.get("cardList");
//
//            System.out.println("===== 拿到 tarotRecordId = " + tarotRecordId); // 看这里
//
//            TarotInterpretation saved = interpretationService.generateByAi(
//                    tarotRecordId,
//                    spreadName,
//                    question,
//                    cardList
//            );
//            return R.ok(saved);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return R.error("AI生成失败：" + e.getMessage());
//        }
//    }

    /**
     * 根据占卜记录ID获取解读
     */
    @GetMapping("/getByRecordId/{recordId}")
    public R<TarotInterpretation> getByRecordId(@PathVariable Integer recordId) {
        TarotInterpretation interpretation = interpretationService.lambdaQuery()
                .eq(TarotInterpretation::getTarotRecordId, recordId)
                .one();

        return R.ok(interpretation);
    }

    // 内部接收类
    @Data
    public static class AiRequest {
        private Integer tarotRecordId;
        private String spreadName;
        private String question;
        private List<String> cardList;
    }
}