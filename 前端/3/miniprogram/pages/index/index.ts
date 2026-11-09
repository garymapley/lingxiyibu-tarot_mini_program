import { allCards } from '../../utils/tarotData';

Page({
  data: {
    currentDate: '',
    currentCard: null as any,
    luckyColor: '#00CED1',
    luckyNumber: 4,
    suggestions: ['保持诚信', '执行力高', '内心探索'],
    avoid: ['行为不端', '因爱生恨', '沉迷幻想'],
    guidance: '追随我们的心,勇敢地去爱和表达我们的情感,并探索生活中的美好与深情。',
    // 新增：用户信息和订单数据
    userInfo: null as any,
  },

  onLoad() {
    // 原有逻辑：初始化日期和每日卡牌
    this.setCurrentDate();
    this.loadDailyCard();
    // 新增逻辑：获取用户信息和订单（登录态校验）
    this.getUserInfo();
  },

  onShow() {
    // 更新底部导航栏状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
    // 页面显示时刷新用户信息（比如登录后返回首页）
    this.getUserInfo();
  },

  setCurrentDate() {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    this.setData({
      currentDate: `${weekday} ${year}-${month}-${day}`
    });
  },

  loadDailyCard() {
    // 根据日期生成固定的随机数，确保同一天显示同一张牌
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const seed = this.hashCode(dateStr);
    
    // 使用种子确保同一天同一张牌
    const index = seed % allCards.length;
    const dailyCard = allCards[index];
    
    this.setData({
      currentCard: {
        ...dailyCard,
        position: '正位'
      },
      luckyNumber: (seed % 9) + 1,
      luckyColor: this.getLuckyColor(seed)
    });
  },

  hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  },

  getLuckyColor(seed: number): string {
    const colors = ['#00CED1', '#9370DB', '#FF69B4', '#FFD700', '#FF6347', '#32CD32', '#1E90FF'];
    return colors[seed % colors.length];
  },

  // 新增：获取用户信息（携带Token鉴权）
  getUserInfo() {
    const token = wx.getStorageSync('wechat_token');
    if (!token) {
      // 未登录不跳转，保留首页塔罗牌功能，仅提示登录
      this.setData({ userInfo: null });
      return;
    }

    wx.request({
      url: 'https://127.0.0.1:8088/api/user/info', // 替换为实际后端地址
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token, // Token携带方式
        'Content-Type': 'application/json'
      },
      success: (res) => {
        // 适配后端Result返回格式（code=0为成功）
        const result = res.data as { code: number; data: any; msg: string };
        if (result.code === 0) {
          console.log('用户信息：', result.data);
          this.setData({ userInfo: result.data });
        } else if (result.code === 401) {
          // Token失效，清除存储
          wx.removeStorageSync('wechat_token');
          this.setData({ userInfo: null });
          wx.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败：', err);
        // 网络失败不影响首页核心功能
      }
    });
  },
});