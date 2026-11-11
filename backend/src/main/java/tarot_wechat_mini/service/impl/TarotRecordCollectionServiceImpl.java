package tarot_wechat_mini.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.TarotRecord;
import tarot_wechat_mini.entity.TarotRecordCollection;
import tarot_wechat_mini.mapper.TarotRecordCollectionMapper;
import tarot_wechat_mini.mapper.TarotRecordMapper;
import tarot_wechat_mini.service.TarotRecordCollectionService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarotRecordCollectionServiceImpl extends ServiceImpl<TarotRecordCollectionMapper, TarotRecordCollection> implements TarotRecordCollectionService {

    // ========================
    // ✅ 只保留这一个！删除多余的 collectionMapper
    // ========================
    private final TarotRecordMapper tarotRecordMapper;

    @Override
    public boolean toggle(Integer recordId, Long userId) {
        LambdaQueryWrapper<TarotRecordCollection> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TarotRecordCollection::getUserId, userId);
        wrapper.eq(TarotRecordCollection::getTargetId, recordId);

        TarotRecordCollection one = this.getOne(wrapper);

        if (one != null) {
            this.removeById(one.getId());
            return false;
        } else {
            TarotRecordCollection add = new TarotRecordCollection();
            add.setUserId(userId);
            add.setTargetId(recordId);
            this.save(add);
            return true;
        }
    }

    @Override
    public List<TarotRecord> getCollectionList(Long userId) {
        List<TarotRecordCollection> collections = this.list(
                new LambdaQueryWrapper<TarotRecordCollection>()
                        .eq(TarotRecordCollection::getUserId, userId)
        );

        if (collections.isEmpty()) {
            return List.of();
        }

        List<Integer> recordIds = collections.stream()
                .map(TarotRecordCollection::getTargetId)
                .collect(Collectors.toList());

        return tarotRecordMapper.selectBatchIds(recordIds);
    }
}