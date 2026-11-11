import { API_BASE_URL } from '../../config';

Page({
  data: {
    list: [] as any[],
    loading: true
  },

  onLoad() {
    this.getList();
  },

  onShow() {
    this.getList();
  },

  getList() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.setData({ loading: false });
      return;
    }

    wx.showLoading({ title: '加载中...' });

    wx.request({
      url: `${API_BASE_URL}/api/tarot/collection/list`,
      header: {
        "Authorization": "Bearer " + token
      },
      success: (res) => {
        const result = res.data as any;
        if (result.code === 200) {
          this.setData({
            list: result.data || []
          });
        } else {
          wx.showToast({ title: '加载失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络异常', icon: 'none' });
      },
      complete: () => {
        wx.hideLoading();
        this.setData({ loading: false });
      }
    });
  },

  // 取消收藏
  cancelCollect(e: any) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;

    const token = wx.getStorageSync('token');
    wx.request({
      url: `${API_BASE_URL}/api/tarot/collection/toggle/${id}`,
      method: "POST",
      header: {
        "Authorization": "Bearer " + token
      },
      success: () => {
        wx.showToast({ title: '已取消收藏', icon: 'success' });
        this.getList();
      }
    });
  },

  // ✅ 查看详情（增加空值保护，永远不报错）
  goDetail(e: any) {
    const item = e.currentTarget.dataset.item;
    if (!item || !item.id) {
      wx.showToast({ title: '记录异常', icon: 'none' });
      return;
    }

    wx.navigateTo({
      url: `/pages/result/result?recordId=${item.id}`
    });
  }
});
