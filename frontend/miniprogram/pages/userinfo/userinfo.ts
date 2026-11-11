import { API_BASE_URL } from '../../config';

Page({
  data: {
    nickName: '',
    avatarUrl: '/pages/images/愚人 Thr Fool.jpg',
    safeAvatarUrl: '/pages/images/愚人 Thr Fool.jpg',
    defaultAvatar: '/pages/images/愚人 Thr Fool.jpg',
    userId: null as number | null,
    tempFilePath: '' as string | null
  },

  normalizeAvatarUrl(raw: string) {
    const value = (raw || '').trim();
    const valid = /^https?:\/\/\S+$/i.test(value);
    return valid ? value : this.data.defaultAvatar;
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      nickName: userInfo.nickName || '微信用户',
      avatarUrl: userInfo.avatarUrl || this.data.defaultAvatar,
      safeAvatarUrl: this.normalizeAvatarUrl(userInfo.avatarUrl || this.data.defaultAvatar)
    });
    this.fetchUserInfo();
  },

  fetchUserInfo() {
    const token = wx.getStorageSync('token');
    console.log('[fetchUserInfo] 取出的token:', token);

    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    wx.request({
      url: `${API_BASE_URL}/api/user/info`,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log('[fetchUserInfo] 接口返回:', res.data);
        const result = res.data as any;
        if (result.code === 200 && result.data) {
          const user = result.data;
          const finalAvatar = user.avatarUrl?.trim() || this.data.defaultAvatar;
          const finalNick = user.nickname?.trim() || '微信用户';

          const userInfo = { nickName: finalNick, avatarUrl: finalAvatar };
          wx.setStorageSync('userInfo', userInfo);

          this.setData({
            nickName: finalNick,
            avatarUrl: finalAvatar,
            safeAvatarUrl: this.normalizeAvatarUrl(finalAvatar),
            userId: user.id
          });
        } else {
          wx.showToast({ title: result.msg || '获取信息失败', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('[fetchUserInfo] 请求失败:', err);
        wx.showToast({ title: '网络异常', icon: 'none' });
      }
    });
  },

  chooseAndUploadAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        const filePath = res.tempFiles[0].tempFilePath;
        this.setData({
          tempFilePath: filePath,
          safeAvatarUrl: filePath,
          avatarUrl: filePath
        });
      }
    });
  },

  doUploadAvatar(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      const userId = this.data.userId;

      if (!userId || !token) {
        reject(new Error('请先登录'));
        return;
      }

      wx.uploadFile({
        url: `${API_BASE_URL}/login/updateAvatar`,
        filePath: filePath,
        name: 'file',
        formData: { userId: userId + '' },
        header: { 'Authorization': 'Bearer ' + token },

        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.code === 200) {
            resolve(data.data);
          } else {
            reject(new Error(data.msg || '上传失败'));
          }
        },
        fail: (err) => {
          console.error('[doUploadAvatar] 上传失败:', err);
          reject(new Error('上传失败'));
        }
      });
    });
  },

  onNickNameInput(e: any) {
    this.setData({ nickName: e.detail.value });
  },

  onImageError() {
    this.setData({
      avatarUrl: this.data.defaultAvatar,
      safeAvatarUrl: this.data.defaultAvatar
    });
  },

  async onSave() {
    const { nickName, avatarUrl, tempFilePath } = this.data;
    const token = wx.getStorageSync('token');
    const trimNick = nickName.trim();

    if (!trimNick) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });

    try {
      let finalAvatar = avatarUrl;

      if (tempFilePath) {
        finalAvatar = await this.doUploadAvatar(tempFilePath);
      }

      finalAvatar = this.normalizeAvatarUrl(finalAvatar);

      // 修复RequestTask.data警告：用Promise包装wx.request
      const res = await new Promise<any>((resolve, reject) => {
        wx.request({
      url: `${API_BASE_URL}/api/user/update`,
          method: 'PUT',
          header: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: {
            nickname: trimNick,
            avatarUrl: finalAvatar
          },
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });

      const result = res.data as any;
      if (result.code === 200) {
        const newUserInfo = {
          ...wx.getStorageSync('userInfo'),
          nickName: trimNick,
          avatarUrl: finalAvatar
        };
        wx.setStorageSync('userInfo', newUserInfo);

        this.setData({
          avatarUrl: finalAvatar,
          safeAvatarUrl: finalAvatar,
          tempFilePath: null
        });

        wx.showToast({ title: '保存成功', icon: 'success' });
        setTimeout(() => wx.navigateBack(), 1500);
      } else {
        wx.showToast({ title: result.msg || '保存失败', icon: 'none' });
      }
    } catch (_err) {
      // 修复未使用err警告：用_err忽略，同时打印日志
      console.error('[onSave] 保存失败:', _err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});
