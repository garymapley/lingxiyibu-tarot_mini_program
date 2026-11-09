package tarot_wechat_mini.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.entity.TarotRecordCollection;
import tarot_wechat_mini.service.TarotRecordCollectionService;
import tarot_wechat_mini.utils.R;

@Slf4j
@RestController
@RequestMapping("/api/tarot/collection")
public class TarotRecordCollectionController {

    @Autowired
    private TarotRecordCollectionService collectionService;

    // 收藏 / 取消收藏
    @PostMapping("/toggle/{recordId}")
    public R<?> toggle(@PathVariable Integer recordId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        boolean result = collectionService.toggle(recordId, userId);
        return R.ok(result);
    }

    // 获取我的收藏列表
    @GetMapping("/list")
    public R<?> list(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return R.ok(collectionService.getCollectionList(userId));
    }
}