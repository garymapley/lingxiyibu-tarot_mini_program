package tarot_wechat_mini.service;

import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationParam;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.common.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TarotAiService {

    @Value("${ai.dashscope.api-key}")
    private String apiKey;

    public String[] generateTarotAi(String spreadName, String question, List<String> cardInfos) {
        String prompt = String.format("""
            你是一位经验丰富的专业塔罗师，精通韦特塔罗体系，擅长用温柔、精准的语言解读牌阵。
            牌阵类型：%s
            用户问题：%s
            抽到的牌：%s
            请严格按以下格式输出，不要额外内容：
            【整体总结】：（100字内概括核心结论）
            【详细解读】：（分牌解读，结合正逆位、牌意、用户问题分析现状与原因）
            【行动建议】：（给出具体可执行的建议，符合塔罗指引）
            """,
                spreadName,
                (question == null || question.isEmpty()) ? "本次占卜" : question,
                String.join("、", cardInfos)
        );

        try {
            Message userMsg = Message.builder()
                    .role("user")
                    .content(prompt)
                    .build();

            GenerationParam param = GenerationParam.builder()
                    .apiKey(apiKey)
                    .model("qwen-turbo")
                    .messages(Collections.singletonList(userMsg))
                    .resultFormat(GenerationParam.ResultFormat.MESSAGE)
                    .build();

            Generation generation = new Generation();
            GenerationResult result = generation.call(param);

            String aiContent = result.getOutput().getChoices().get(0).getMessage().getContent();
            return parseAiResult(aiContent);

        } catch (Exception e) {
            e.printStackTrace();
            return new String[]{
                    "【本次占卜】AI解读",
                    "AI服务暂时不可用，请检查网络后重试",
                    "✨ 塔罗是指引，真正的力量永远来自你自己。"
            };
        }
    }

    private String[] parseAiResult(String aiContent) {
        String summary = "", detail = "", advice = "";
        String[] parts = aiContent.split("【");
        for (String part : parts) {
            if (part.startsWith("整体总结】")) summary = part.replace("整体总结】：", "").trim();
            else if (part.startsWith("详细解读】")) detail = part.replace("详细解读】：", "").trim();
            else if (part.startsWith("行动建议】")) advice = part.replace("行动建议】：", "").trim();
        }
        if (summary.isEmpty()) summary = "【本次占卜】AI解读";
        if (detail.isEmpty()) detail = "AI解读生成中...";
        if (advice.isEmpty()) advice = "✨ 塔罗是指引，真正的力量永远来自你自己。";
        return new String[]{summary, detail, advice};
    }
}