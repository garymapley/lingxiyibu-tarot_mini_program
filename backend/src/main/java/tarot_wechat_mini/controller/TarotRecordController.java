package tarot_wechat_mini.controller;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.entity.TarotRecord;
import tarot_wechat_mini.entity.TarotInterpretation;
import tarot_wechat_mini.service.TarotRecordService;
import tarot_wechat_mini.service.TarotInterpretationService;
import tarot_wechat_mini.utils.R;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/tarot/record")
public class TarotRecordController {

    @Autowired
    private TarotRecordService tarotRecordService;

    @Autowired
    private TarotInterpretationService tarotInterpretationService;

    @PostMapping("/save")
    public R<?> save(
            HttpServletRequest request,
            @RequestBody(required = false) TarotRecord record
    ) {
        try {
            if (record == null) record = new TarotRecord();

            Long userId = (Long) request.getAttribute("userId");
            log.info("拦截器注入的userId: {}", userId);

            if (userId == null) {
                return R.error("用户未登录，无法保存");
            }

            record.setUserId(userId);

            if (record.getQuestion() == null) {
                record.setQuestion("无问题");
            }

            // ==============================================
            // 第一步：先保存占卜记录 → 生成 ID
            // ==============================================
            boolean saved = tarotRecordService.saveRecord(record);

            if (!saved || record.getId() == null) {
                return R.error("保存失败，未能生成记录ID");
            }

            log.info("✅ 占卜记录保存成功，ID = {}", record.getId());

            // ==============================================
            // 第二步：解析卡牌信息
            // ==============================================
            String cardsJson = record.getCardsJson();
            List<Map<String, Object>> cards = JSON.parseObject(cardsJson, new TypeReference<>() {});

            List<String> cardInfos = new ArrayList<>();
            for (Map<String, Object> card : cards) {
                String name = String.valueOf(card.get("name"));
                boolean rev = Boolean.TRUE.equals(card.get("isReverse"));
                cardInfos.add(name + (rev ? "（逆位）" : "（正位）"));
            }

            // ==============================================
            // 第三步：AI 生成解读（现在 ID 一定有值）
            // ==============================================
            TarotInterpretation interpretation = tarotInterpretationService.generateByAi(
                    record.getId(),
                    "塔罗占卜",
                    record.getQuestion(),
                    cardInfos
            );

            Map<String, Object> result = new HashMap<>();
            result.put("record", record);
            result.put("interpretation", interpretation);

            return R.ok(result);

        } catch (Exception e) {
            log.error("保存占卜记录异常", e);
            return R.error("保存失败：" + e.getMessage());
        }
    }

    @GetMapping("/list")
    public R<?> list(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return R.ok(tarotRecordService.getRecordList(userId));
    }

    @GetMapping("/detail/{id}")
    public R<?> detail(@PathVariable Integer id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        String role = (String) request.getAttribute("role"); // 从上下文取role
        log.info("【详情接口】请求用户：userId={}, role={}, 记录ID={}", userId, role, id);

        TarotRecord record = tarotRecordService.getById(id);
        if (record == null) {
            log.error("【详情接口】记录不存在：id={}", id);
            return R.error("记录不存在");
        }

        // ✅ 【权限校验优化】管理员直接放行，普通用户只能看自己的
        if (!"admin".equals(role) && !record.getUserId().equals(userId)) {
            log.error("【详情接口】无权限：userId={}, recordUserId={}", userId, record.getUserId());
            return R.error("无权限或记录不存在");
        }

        TarotInterpretation interpretation = tarotInterpretationService.lambdaQuery()
                .eq(TarotInterpretation::getTarotRecordId, id)
                .one();
        log.info("【详情接口】查询到解读：{}", interpretation);

        Map<String, Object> map = new HashMap<>();
        map.put("record", record);
        map.put("interpretation", interpretation);

        return R.ok(map);
    }

    @PostMapping("/delete/{id}")
    public R<?> delete(@PathVariable Integer id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        TarotRecord record = tarotRecordService.getById(id);
        if (record == null || !record.getUserId().equals(userId)) {
            return R.error("无权限");
        }
        tarotRecordService.removeById(id);
        return R.ok("删除成功");
    }
}