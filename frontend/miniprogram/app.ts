// app.ts
App<IAppOption>({
  globalData: {},

  onLaunch() {
    // ====================== 云开发初始化（新增）======================
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-5g5hrey9972c7f4d', // 这里必须改成你自己的！
        traceUser: true
      })
      console.log('✅ 云开发初始化成功')
    }

    // ====================== 你原来的代码（不动）======================
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录（你注释掉了，我保持不动）
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     console.log("xxxxxxxxxxxxxxxxx获取到的code:", res.code)
    //   },
    // })
  },
})