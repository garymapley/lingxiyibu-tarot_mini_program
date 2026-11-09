import { API_BASE_URL } from '../../../config'

interface RecordItem {
  id: number
  userId: number
  arrayName: string | null
  createTime: string
}

Page({
  data: {
    list: [] as RecordItem[],
    filterUserId: '',
    arrayIndex: 0,
    arrayList: ['全部牌阵','恋人复合牌阵', '三牌阵', '时间之流牌阵', '二选一牌阵', '单牌阵'],
    arrayMap: [null, 1, 2, 3, 4, 5],
    selectDate: '' // 🔴 合并为单个日期字段
  },

  onLoad() {
    this.getList()
  },

  getList() {
    const { filterUserId, arrayIndex, arrayMap, selectDate } = this.data;
    // 🔴 关键修复：只构造有值的参数，不传递null
    const params: any = {
      page: 1,
      size: 100
    };
  
    // 只有用户ID有值时，才添加参数
    if (filterUserId && filterUserId.trim() !== '') {
      params.userId = Number(filterUserId);
    }
  
    // 只有牌阵不是"全部牌阵"时，才添加参数
    const arrayTypeId = arrayMap[arrayIndex];
    if (arrayTypeId !== null) {
      params.arrayTypeId = arrayTypeId;
    }
  
    // 只有选择了日期时，才添加时间参数
    if (selectDate && selectDate.trim() !== '') {
      params.startTime = `${selectDate} 00:00:00`;
      params.endTime = `${selectDate} 23:59:59`;
    }
  
    console.log("🔴 最终请求参数：", params);
  
    wx.request({
      url: `${API_BASE_URL}/api/admin/tarot/records`,
      header: { Authorization: 'Bearer ' + wx.getStorageSync('token') },
      data: params, // 🔴 只传构造好的、有值的参数
      success: (resp) => {
        console.log("🔴 接口返回数据：", resp.data);
        const res = resp.data as any;
        if (res.code === 200) {
          this.setData({ list: res.data.records });
        }
      }
    })
  },

  // ==============================
  // ✅ 新增：点击跳转到占卜结果页
  // ==============================
  goToResult(e: any) {
    const recordId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/result/result?recordId=${recordId}`
    });
  },

  // 用户ID输入
  onUserIdInput(e: any) {
    this.setData({ filterUserId: e.detail.value })
  },

  // 牌阵选择
  onArrayChange(e: any) {
    this.setData({ arrayIndex: e.detail.value })
  },

  // 🔴 单日期选择
  onDateChange(e: any) {
    this.setData({ selectDate: e.detail.value })
  },

  // 执行筛选
  onFilter() {
    this.getList()
  },

  // 重置筛选
  onReset() {
    this.setData({
      filterUserId: '',
      arrayIndex: 0,
      selectDate: ''
    })
    this.getList()
  },

  goBack() {
    const pages = getCurrentPages();
    pages.length > 1 ? wx.navigateBack() : wx.reLaunch({ url: '/pages/admin/index/index' });
  }
})
