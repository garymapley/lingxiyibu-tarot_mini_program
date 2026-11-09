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

  // 获取占卜历史记录
  getList() {
    const token = wx.getStorageSync('token');
    
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.setData({ loading: false });
      return;
    }

    wx.showLoading({ title: '加载中...' });

    wx.request({
      url: `${API_BASE_URL}/api/tarot/record/list`,
      header: {
        "Authorization": "Bearer " + token
      },
      success: (res) => {
        const result = res.data as any;
        if (result.code === 200) {
          this.setData({
            list: result.data || []
          });
          this.loadCollectedStatus();
        } else {
          wx.showToast({ title: result.msg || '加载失败', icon: 'none' });
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

  // 加载收藏状态
  loadCollectedStatus() {
    const token = wx.getStorageSync('token');
    wx.request({
      url: `${API_BASE_URL}/api/tarot/collection/list`,
      header: { Authorization: "Bearer " + token },
      success: (res) => {
        const result = res.data as any;
        if (result.code === 200 && result.data) {
          const collectedIds = result.data.map((it: any) => it.id);
          const newList = this.data.list.map((it: any) => ({
            ...it,
            collected: collectedIds.includes(it.id)
          }));
          this.setData({ list: newList });
        }
      }
    });
  },

  // 收藏/取消收藏
  toggleCollect(e: any) {
    // 强化空值判断
    if (!e?.currentTarget?.dataset?.id) return;
    
    const id = e.currentTarget.dataset.id;
    const token = wx.getStorageSync('token');
    wx.request({
      url: `${API_BASE_URL}/api/tarot/collection/toggle/${id}`,
      method: "POST",
      header: { Authorization: "Bearer " + token },
      success: () => {
        this.getList();
      }
    });
  },

  // 删除记录
  deleteRecord(e: any) {
    // 强化空值判断
    if (!e?.currentTarget?.dataset?.id) return;
    
    const id = e.currentTarget.dataset.id;
    const token = wx.getStorageSync('token');
    
    wx.showModal({
      title: "确认删除",
      content: "删除后无法恢复，确定删除吗？",
      success: (ok) => {
        if (ok.confirm) {
          wx.request({
      url: `${API_BASE_URL}/api/tarot/record/delete/${id}`,
            method: "POST",
            header: { Authorization: "Bearer " + token },
            success: () => {
              wx.showToast({ title: "删除成功", icon: "success" });
              this.getList();
            }
          });
        }
      }
    });
  },

  // 跳转详情（彻底修复空值问题）
  goDetail(e: any) {
    // 多层空值防护，彻底杜绝 undefined
    const item = e?.currentTarget?.dataset?.item;
    if (!item || !item.id) {
      wx.showToast({ title: "记录异常", icon: "none" });
      return;
    }
    
    wx.navigateTo({
      url: `/pages/result/result?recordId=${item.id}`
    });
  }
});
