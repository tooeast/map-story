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
  },

  chooseImg() {
    console.log('chooseImg');

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths);

        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: "https://vps.521plus.com/api/common/Public/uploadImage",
            filePath: tempFilePaths[i],
            formData: {
              type: 'mapstory'
            },
            name: 'file',
            success: function(res) {
              wx.hideLoading();
              console.log(res);
            }
          })
        }
      }
    })
  }
})
