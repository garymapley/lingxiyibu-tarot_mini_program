package tarot_wechat_mini.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tarot_wechat_mini.controller.vo.Result;
import tarot_wechat_mini.entity.TarotRecord;
import tarot_wechat_mini.entity.Userinfo;
import tarot_wechat_mini.mapper.TarotRecordMapper;
import tarot_wechat_mini.mapper.UserinfoMapper;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserinfoMapper userinfoMapper;
    private final TarotRecordMapper tarotRecordMapper;

    // ====================== 1. 管理员首页统计 ======================
    @GetMapping("/dashboard")
    public Result<Map<String, Object>> dashboard() {
        long userCount = userinfoMapper.selectCount(null);
        long recordCount = tarotRecordMapper.selectCount(null);

        Map<String, Object> map = new HashMap<>();
        map.put("userCount", userCount);
        map.put("recordCount", recordCount);
        return Result.success(map);
    }

    // ====================== 2. 用户列表（分页） ======================
    @GetMapping("/user/list")
    public Result<IPage<Userinfo>> userList(
            @RequestParam(defaultValue = "1") long page,
            @RequestParam(defaultValue = "10") long size,
            @RequestParam(required = false) String keyword) {

        LambdaQueryWrapper<Userinfo> wrapper = new LambdaQueryWrapper<>();
        if (keyword != null && !keyword.isEmpty()) {
            wrapper.like(Userinfo::getNickname, keyword);
        }

        Page<Userinfo> pageParam = new Page<>(page, size);
        IPage<Userinfo> iPage = userinfoMapper.selectPage(pageParam, wrapper);
        return Result.success(iPage);
    }

    // ====================== 3. 设置用户角色 ======================
    @PostMapping("/user/setRole")
    public Result<String> setRole(
            @RequestParam Long userId,
            @RequestParam String role) {
        Userinfo user = new Userinfo();
        user.setId(userId);
        user.setRole(role);
        userinfoMapper.updateById(user);
        return Result.success("设置成功");
    }

    // ====================== 4. 删除用户 ======================
    @DeleteMapping("/user/delete/{userId}")
    public Result<String> deleteUser(@PathVariable Long userId) {
        userinfoMapper.deleteById(userId);
        return Result.success("删除成功");
    }

    // ====================== 5. 占卜记录列表 ======================
    @GetMapping("/tarot/records")
    public Result<IPage<TarotRecord>> recordList(
            @RequestParam(defaultValue = "1") long page,
            @RequestParam(defaultValue = "10") long size,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Integer arrayTypeId,
            @RequestParam(required = false) String startTime,
            @RequestParam(required = false) String endTime) {

        Page<TarotRecord> pageParam = new Page<>(page, size);
        IPage<TarotRecord> iPage = tarotRecordMapper.selectRecordWithFilter(
                pageParam, userId, arrayTypeId, startTime, endTime);
        return Result.success(iPage);
    }


}