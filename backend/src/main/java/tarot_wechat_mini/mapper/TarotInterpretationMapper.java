package tarot_wechat_mini.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import tarot_wechat_mini.entity.TarotInterpretation;

@Mapper
// 修复泛型错误：原来是TarotInterpretationMapper，现在是实体类TarotInterpretation
public interface TarotInterpretationMapper extends BaseMapper<TarotInterpretation> {

}