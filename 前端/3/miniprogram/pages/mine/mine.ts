Page({
  data: {
    userInfo: {
      // 🔴 正确路径
      avatarUrl: 'https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/default-avatar.jpg',
      nickName: '未登录'
    },
    tarotCoins: 26,
    weekCheckIn: [true, true, true, false, false, false, false],
    checkedInToday: false,
    currentDay: 0,
    isLogin: false,
    role: ""
  },

  onLoad() {
    this.loadUserInfo();
    this.loadCheckInStatus();
    this.loadTarotCoins();
    this.checkLoginStatus();
    const role = wx.getStorageSync('role') || '';
    this.setData({ role });
  },

  onShow() {
    this.loadUserInfo();
    this.loadCheckInStatus();
    this.loadTarotCoins();
    this.checkLoginStatus();
    const role = wx.getStorageSync('role') || '';
    this.setData({ role });

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      isLogin: !!token && !!userInfo
    });
  },

  goAdmin() {
    wx.reLaunch({
      url: '/pages/admin/index/index'
    });
  },

  loadUserInfo() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo') || {};

    if (!token || !userInfo) {
      this.setData({
        // 🔴 正确路径
        'userInfo.avatarUrl': '/pages/images/default-avatar.jpg',
        'userInfo.nickName': '未登录'
      });
      return;
    }

    this.setData({
      userInfo: {
        // 🔴 正确路径
        avatarUrl: userInfo.avatarUrl || '/pages/images/default-avatar.jpg',
        nickName: userInfo.nickName || '微信用户'
      }
    });
  },

  onAvatarError() {
    this.setData({
      // 🔴 正确路径
      'userInfo.avatarUrl': '/pages/images/default-avatar.jpg'
    });
  },

  loadCheckInStatus() {
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const todayStr = today.toDateString();
    const lastCheckIn = wx.getStorageSync('lastCheckIn');

    const weekCheckIn = [];
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - (dayOfWeek - i));
      const checkDateStr = checkDate.toDateString();
      weekCheckIn.push(wx.getStorageSync(`checkIn_${checkDateStr}`) === true);
    }

    this.setData({
      currentDay: dayOfWeek,
      checkedInToday: lastCheckIn === todayStr,
      weekCheckIn: weekCheckIn
    });
  },

  loadTarotCoins() {
    const coins = wx.getStorageSync('tarotCoins') || 26;
    this.setData({ tarotCoins: coins });
  },

  handleCheckIn() {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.goToLogin();
      return;
    }
    if (this.data.checkedInToday) {
      wx.showToast({ title: '今日已签到', icon: 'none' });
      return;
    }

    const today = new Date();
    const todayStr = today.toDateString();
    wx.setStorageSync('lastCheckIn', todayStr);
    wx.setStorageSync(`checkIn_${todayStr}`, true);

    const coins = this.data.tarotCoins + 5;
    wx.setStorageSync('tarotCoins', coins);

    const weekCheckIn = [...this.data.weekCheckIn];
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    weekCheckIn[dayOfWeek] = true;

    this.setData({
      checkedInToday: true,
      tarotCoins: coins,
      weekCheckIn: weekCheckIn
    });

    wx.showToast({ title: '签到成功', icon: 'success' });
  },

  navigateToRecharge() {
    wx.navigateTo({
      url: '/pages/userinfo/userinfo'
    });
  },

  navigateToHistory() {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.goToLogin();
      return;
    }
    wx.navigateTo({ url: '/pages/history/history' });
  },

  navigateToInvite() {
    this.navigateToCollection();
  },

  navigateToCollection() {
    if (!this.data.isLogin) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.goToLogin();
      return;
    }
    wx.navigateTo({ url: '/pages/collection/collection' });
  },

  goToLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },

  handleLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('role');

          this.setData({
            isLogin: false,
            role: '',
            userInfo: {
              // 🔴 正确路径
              avatarUrl: '/pages/images/default-avatar.jpg',
              nickName: '未登录'
            }
          });

          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  }
});