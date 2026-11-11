import { spreads } from '../../utils/tarotData';

Page({
  data: {
    spreads: [] as any[]
  },

  onLoad() {
    this.setData({
      spreads: spreads
    });
  },

  onShow() {
    // 更新底部导航栏状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },

  selectSpread(e: any) {
    const index = e.currentTarget.dataset.index;
    const spread = this.data.spreads[index];
    
    wx.showModal({
      title: spread.name,
      content: spread.description,
      confirmText: '开始占卜',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 跳转到占卜页面
          wx.navigateTo({
            url: `/pages/divination/divination?spreadId=${spread.id}`
          });
        }
      }
    });
  }
});
