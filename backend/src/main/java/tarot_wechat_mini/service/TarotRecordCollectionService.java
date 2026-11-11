package tarot_wechat_mini.service;

import java.util.List;
import tarot_wechat_mini.entity.TarotRecord;

public interface TarotRecordCollectionService {
    boolean toggle(Integer recordId, Long userId);
    List<TarotRecord> getCollectionList(Long userId);
}