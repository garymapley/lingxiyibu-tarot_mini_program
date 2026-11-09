// 导入塔罗牌数据：所有卡牌数组 allCards、卡牌类型定义 TarotCard
import { allCards, TarotCard } from '../../utils/tarotData';

// 小程序页面定义
Page({
  // 页面数据：存储当前要展示的单张塔罗牌信息
  data: {
    // 类型注解：card 可以是 TarotCard 类型，也可以是 undefined（未找到/未加载）
    card: undefined as TarotCard | undefined
  },

  /**
   * 页面加载时执行的生命周期函数
   * @param options 页面跳转时传递的参数（包含卡牌 id）
   */
  onLoad(options: any) {
    // 从页面参数中获取 塔罗牌ID
    const id = options.id;
    
    // 在所有塔罗牌数组中，查找 id 匹配的那一张卡牌
    const card = allCards.find(item => item.id === id);
    
    // 将查找到的卡牌数据赋值到页面 data 中，触发页面渲染
    this.setData({
      card: card
    });
  }
});