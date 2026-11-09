import { API_BASE_URL } from '../../../config'

// 定义用户类型
interface UserItem {
  id: number
  nickname: string
  role: string
  avatarUrl: string
  [key: string]: any
}

Page({
  data: {
    list: [] as UserItem[]
  },

  onLoad() {
    this.getList()
  },

  getList() {
    wx.request({
      url: `${API_BASE_URL}/api/admin/user/list`,
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('token')
      },
      success: (resp) => {
        const res = resp.data as { code: number; data: { records: UserItem[] } }
        if (res.code === 200) {
          this.setData({ list: res.data.records })
        }
      }
    })
  },


  deleteUser(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as number
    wx.request({
      url: `${API_BASE_URL}/api/admin/user/delete/${id}`,
      method: 'DELETE',
      header: { Authorization: 'Bearer ' + wx.getStorageSync('token') },
      success: (resp) => {
        const res = resp.data as { code: number }
        if (res.code === 200) {
          wx.showToast({ title: '删除成功' })
          this.getList()
        }
      }
    })
  },

  goBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/admin/index/index' })
  }
})
