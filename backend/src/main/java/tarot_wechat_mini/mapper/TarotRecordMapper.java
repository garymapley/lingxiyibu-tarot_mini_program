package tarot_wechat_mini.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import tarot_wechat_mini.entity.TarotRecord;
import java.util.List;

@Mapper
public interface TarotRecordMapper extends BaseMapper<TarotRecord> {

    // 【用户端】
    @Select("SELECT tr.*, ta.name AS arrayName " +
            "FROM tarot_record tr " +
            "LEFT JOIN tarot_array_type ta ON tr.array_type_id = ta.id " +
            "WHERE tr.user_id = #{userId} " +
            "ORDER BY tr.create_time DESC")
    List<TarotRecord> selectByUserId(Long userId);

    // 【管理员端】原版
    @Select("SELECT tr.*, ta.name AS arrayName " +
            "FROM tarot_record tr " +
            "LEFT JOIN tarot_array_type ta ON tr.array_type_id = ta.id " +
            "ORDER BY tr.create_time DESC")
    IPage<TarotRecord> selectRecordWithArrayName(Page<TarotRecord> page);

    // 【新增】管理员端 → 带条件筛选（用户ID、牌阵、时间）
    @Select("<script>" +
            "SELECT tr.*, ta.name AS arrayName " +
            "FROM tarot_record tr " +
            "LEFT JOIN tarot_array_type ta ON tr.array_type_id = ta.id " +
            "<where>" +
            "   <if test='userId != null'> AND tr.user_id = #{userId} </if>" +
            "   <if test='arrayTypeId != null'> AND tr.array_type_id = #{arrayTypeId} </if>" +
            "   <if test='startTime != null'> AND tr.create_time &gt;= #{startTime} </if>" +
            "   <if test='endTime != null'> AND tr.create_time &lt;= #{endTime} </if>" +
            "</where>" +
            "ORDER BY tr.create_time DESC" +
            "</script>")
    IPage<TarotRecord> selectRecordWithFilter(
            Page<TarotRecord> page,
            Long userId,
            Integer arrayTypeId,
            String startTime,
            String endTime
    );

    // 【全量查询】
    @Select("SELECT tr.*, ta.name AS arrayName " +
            "FROM tarot_record tr " +
            "LEFT JOIN tarot_array_type ta ON tr.array_type_id = ta.id " +
            "ORDER BY tr.create_time DESC")
    List<TarotRecord> selectAllRecord();
}