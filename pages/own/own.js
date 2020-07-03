//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    mapInfo: {},
    isLogin: app.globalData.isLogin,
    num: 0,
    isShowAbout: false,
    isShowFeedback: false
  },
  onReady() {
    this.about = this.selectComponent('#about-box');
    this.feedback = this.selectComponent('#feedback-box');
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
  managePoint() {
    wx.navigateTo({
      url: '/pages/manage/manage',
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
  },
  aboutPage() {
    console.log('about');
    // this.setData({
    //   isShowAbout: true
    // })
    this.about.show();
  },
  feedbackPage() {
    console.log('feedback');
    // this.setData({
    //   isShowFeedback: true
    // })
    this.feedback.show();
  },
  onShareAppMessage(e) {
    let title = '';
    
    if(this.data.num > 0) {
      title = `我在足迹故事小程序记录了 ${this.data.num} 个足迹点哦，一起来吧～`;
    }
    else {
      title = '我在足迹故事小程序记录足迹哦，你也一起来吧～'
    }
    return {
      title: title,
      path: `/pages/index/index`,
      imageUrl: this.data.userInfo.avatarUrl,
      success: () => {
        wx.showToast({
          title: '分享成功',
          duration: 2000
        })
      }
    }
  }
})
