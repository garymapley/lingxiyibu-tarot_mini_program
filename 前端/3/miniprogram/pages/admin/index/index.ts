import { API_BASE_URL } from '../../../config'

Page({
  data: {
    userCount: 0,
    recordCount: 0
  },

  onLoad() {
    this.getDashboard()
  },

  getDashboard() {
    wx.request({
      url: `${API_BASE_URL}/api/admin/dashboard`,
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('token')
      },
      success: (resp) => {
        const res = resp.data as { code: number; data: { userCount: number; recordCount: number } }
        if (res.code === 200) {
          this.setData(res.data)
        }
      }
    })
  },

  goUser() {
    wx.navigateTo({ url: '/pages/admin/user/user' })
  },

  goRecord() {
    wx.navigateTo({ url: '/pages/admin/record/record' })
  },

  // 新增：返回用户端（我的页面）
  goBackUser() {
    wx.reLaunch({
      url: '/pages/mine/mine'
    })
  }
})
