//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    mapInfo: {},
    isLogin: app.globalData.isLogin,
    num: 0
  },
  onShow() {
    if(this.data.isLogin) {
      this.getMapInfo();
    }
  },
  getMapLatlng() {
    wx.navigateTo({
      url: '/pages/picker/picker',
    })
  },
  async wxLogin(e) {
    console.log('login')
    let res = await app.base.login(e);

    console.log(res);

    if(res.code == 0) {
      this.getBaseInfo();
      this.getMapInfo();
    }
  },
  async getMapInfo() {
    let res = await app.request('/api/map/MapPc/getUserMapNum');

    if(res.code == 0) {
      this.setData({
        num: res.data
      });
    }
  },
  getBaseInfo() {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      isLogin: true,
      userInfo: userInfo
    });

    app.globalData.isLogin = true;
    app.globalData.userInfo = userInfo;
  }
})
