import { API_BASE_URL } from '../../config';

interface LoginSuccess {
  code: string;
}

interface LoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    refresh_token: string;
    role: string;
    nickname: string;
    avatarUrl: string;
  };
}

Page({
  data: {},

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
      return;
    }
    wx.reLaunch({ url: '/pages/mine/mine' });
  },

  onLoginTap() {
    wx.showLoading({ title: '登录中...' });

    // 只用 wx.login，所有人都能登录
    wx.login({
      success: (loginRes: LoginSuccess) => {
        const code = loginRes.code;

        wx.request<LoginResponse>({
          url: `${API_BASE_URL}/login/wechat_login`,
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          data: {
            code: code,
            nickName: "微信用户",
            avatarUrl: "https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/default-avatar.jpg"
          },
          success: (resp) => {
            wx.hideLoading();
            const resData = resp.data;

            if (resData.code === 200) {
              const { token, refresh_token, role, nickname, avatarUrl } = resData.data;

              wx.setStorageSync("token", token);
              wx.setStorageSync("refresh_token", refresh_token);
              wx.setStorageSync("role", role);
              wx.setStorageSync("userInfo", {
                nickName: nickname,
                avatarUrl: avatarUrl || "https://tarot-1409233212.cos.ap-guangzhou.myqcloud.com/tarot_images/default-avatar.jpg"
              });

              wx.showToast({ title: "登录成功", icon: "success" });

              if (role === "admin") {
                wx.reLaunch({ url: "/pages/admin/index/index" });
              } else {
                wx.navigateBack();
              }
            }
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({ title: "网络错误", icon: "none" });
          }
        });
      },
      fail: (err) => {
        wx.hideLoading();
        console.error("wx.login 失败详情:", err); 
        wx.showToast({ title: "登录失败", icon: "none" });
      }
    });
  }
});
