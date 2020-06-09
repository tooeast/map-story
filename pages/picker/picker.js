const app = getApp()

Page({
  data: {
    logs: [],
    lat: null,
    lng: null,
    address: '',
    content: '',
    title: '',
    isClick: false
  },
  onLoad() {

  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  getStory(e) {
    console.log(e)
    this.setData({
      story: e.detail.value
    });
  },
  getTitle(e) {
    console.log(e)
    this.setData({
      title: app.base.trim(e.detail.value)
    });
  },
  getAddress(e) {
    console.log(e)
    this.setData({
      address: app.base.trim(e.detail.value)
    });
  },

  async choosePos() {
    const pos = await app.base.chooseLocation();

    console.log(pos);

    this.setData({
      lat: pos.latitude,
      lng: pos.longitude,
      address: pos.address
    })

    console.log(this.data.lat);
    console.log(this.data.lng);
    console.log(this.data.address);
  },
  async submitPoint() {
    // if(this.data.isClick) {
    //   return;
    // }

    if(!this.data.lat || !this.data.lng || !this.data.address || !this.data.title) {
      wx.showModal({
        title: '提示',
        content: '输入内容不能为空哦~',
        showCancel: false
      });

      return;
    }

    this.setData({
      isClick: true
    })


    let params = {
      lat: this.data.lat,
      lng: this.data.lng,
      address: this.data.address,
      title: this.data.title,
      story: this.data.story
    };

    console.log(params);

    let res = await app.request('/api/map/MapPc/recordPoint', {
      method: 'POST',
      data: params
    });

    if(res.code == 0) {
      wx.showToast({
        title: '记录成功哦！',
        icon: 'success',
        duration: 1500
      });

      app.globalData.isHaveNew = true;

      setTimeout(() => {
        this.setData({
          isClick: true
        });

        this.goBack();
      }, 1000)

      // this.goBack();
    }
    else {
      this.setData({
        isClick: false
      })
    }
  }
})
