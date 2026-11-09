package tarot_wechat_mini.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarot_wechat_mini.entity.TarotCard;
import tarot_wechat_mini.mapper.TarotCardMapper;
import tarot_wechat_mini.service.TarotCardService;

import java.util.List;

@Service
public class TarotCardServiceImpl implements TarotCardService {
    @Autowired
    TarotCardMapper tarotCardMapper;

    @Override
    public TarotCard getById(String id) {
        return tarotCardMapper.selectById(id);
    }

//    @Override
//    public List<User> list() {return cardMapper.selectList();}

    @Override
    public int save(TarotCard tarotCard) {
        return tarotCardMapper.insert(tarotCard);
    }

    @Override
    public int updateById(TarotCard tarotCard) {
        return tarotCardMapper.updateById(tarotCard);
    }

    @Override
    public int removeById(String id) {
        return tarotCardMapper.deleteById(id);
    }

    @Override
    public IPage<TarotCard> page(int pageNum, int pageSize, int nameType) {
        System.out.println("pageNum: "+pageNum + ", pageSize:" + pageSize);
        Page<TarotCard> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<TarotCard> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (nameType> 0){
            lambdaQueryWrapper.eq(TarotCard::getNameType, nameType);
        }
        return tarotCardMapper.selectPage(page, lambdaQueryWrapper);
    }

    @Override
    public List<TarotCard> getAllCards() {
        LambdaQueryWrapper<TarotCard> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(TarotCard::getNameType, TarotCard::getId);
        return tarotCardMapper.selectList(wrapper);
    }

    @Override
    public List<TarotCard> getCardsByType(int nameType) {
        LambdaQueryWrapper<TarotCard> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TarotCard::getNameType, nameType);
        wrapper.orderByAsc(TarotCard::getId);
        return tarotCardMapper.selectList(wrapper);
    }
}
