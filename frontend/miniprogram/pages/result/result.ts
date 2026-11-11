import { API_BASE_URL } from '../../config';

Page({
  data: {
    cards: [] as any[],
    interpretation: {} as any,
    spreadName: ''
  },

  onLoad(options: any) {
    try {
      // 1. 如果是从历史记录进来（带recordId）
      if (options.recordId) {
        this.loadHistoryDetail(options.recordId);
        return;
      }

      // 2. 原来逻辑（占卜页进来）
      if (!options.data) {
        this.setData({ spreadName: '占卜结果' });
        return;
      }

      const decodedData = decodeURIComponent(options.data as string);
      const data = JSON.parse(decodedData);
      this.setData({
        cards: data.cards || [],
        interpretation: data.interpretation || {},
        spreadName: data.interpretation.summary ? data.interpretation.summary.split('】')[1] || '占卜结果' : '占卜结果'
      });
    } catch (err) {
      console.error('解析错误', err);
      this.setData({ spreadName: '占卜结果' });
    }
  },

  // ========================
  // 加载历史记录详情（已修复）
  // ========================
  loadHistoryDetail(recordId: string) {
    const token = wx.getStorageSync('token');
    wx.showLoading({ title: '加载中...' });

    wx.request({
        url: `${API_BASE_URL}/api/tarot/record/detail/${recordId}`,
      header: { Authorization: "Bearer " + token },
      success: (res) => {
        const result = res.data as any;
        if (result.code === 200) {
          // ========= 修复点 1 =========
          // 现在 detail 接口返回：{ record, interpretation }
          const { record, interpretation } = result.data;

          // 解析牌
          const cards = JSON.parse(record.cardsJson);

          this.setData({
            cards,
            interpretation: interpretation || {}, // 直接用真实AI解读
            spreadName: interpretation?.summary?.split('】')[1] || '历史记录'
          });
        }
      },
      complete: () => wx.hideLoading()
    });
  }
});
