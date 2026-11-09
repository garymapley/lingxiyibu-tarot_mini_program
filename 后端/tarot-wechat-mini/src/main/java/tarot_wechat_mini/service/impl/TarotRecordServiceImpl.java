package tarot_wechat_mini.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.TarotRecord;
import tarot_wechat_mini.mapper.TarotRecordMapper;
import tarot_wechat_mini.service.TarotRecordService;
import java.util.List;

@Slf4j
@Service
public class TarotRecordServiceImpl extends ServiceImpl<TarotRecordMapper, TarotRecord> implements TarotRecordService {

    @Override
    public List<TarotRecord> getRecordList(Long userId) {
        log.info("查询用户{}的占卜记录（联表牌阵）", userId);
        // 调用Mapper的联表方法
        return baseMapper.selectByUserId(userId);
    }

    @Override
    public boolean saveRecord(TarotRecord record) {
        log.info("保存占卜记录：{}", record);
        return this.save(record);
    }

    @Override
    public TarotRecord getById(Integer id) {
        return super.getById(id);
    }

    @Override
    public boolean removeById(Integer id) {
        return super.removeById(id);
    }

    // ✅ 实现接口新增的方法，调用Mapper的selectAllRecord（方法名完全一致）
    @Override
    public List<TarotRecord> getAllAdminRecord() {
        log.info("管理员查询所有占卜记录");
        return baseMapper.selectAllRecord();
    }
}