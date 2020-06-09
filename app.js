//app.js
const baseObj = require('./utils/base');

// const baseObj = new Base();

App({
  onLaunch() {
    let sessionKey = wx.getStorageSync('sessionInfo');
    console.log('from launch', sessionKey);
    if(sessionKey) {
      this.globalData.isLogin = true;
    }

    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null,
    isLogin: false,
    isHaveNew: true
  },
  request: baseObj.request,
  base: baseObj
})