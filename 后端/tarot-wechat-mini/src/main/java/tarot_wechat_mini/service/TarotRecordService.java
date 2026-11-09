package tarot_wechat_mini.service;

import tarot_wechat_mini.entity.TarotRecord;
import java.util.List;

public interface TarotRecordService {
    List<TarotRecord> getRecordList(Long userId);
    boolean saveRecord(TarotRecord record);
    TarotRecord getById(Integer id);
    boolean removeById(Integer id);

    // ✅ 新增：管理员查询所有记录（接口必须先声明，否则ServiceImpl实现会报错）
    List<TarotRecord> getAllAdminRecord();
}