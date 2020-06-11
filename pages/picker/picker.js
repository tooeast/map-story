const app = getApp()

Page({
  data: {
    logs: [],
    lat: null,
    lng: null,
    address: '',
    content: '',
    title: '',
    isClick: false,
    imgList: [],
    uploadedList: []
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
  },

  async chooseImg() {
    let list = await app.base.chooseImage();

    console.log(list);

    this.setData({
      imgList: list
    })
  },
  async submitPoint() {
    // if(this.data.isClick) {
    //   return;
    // }

    if(!this.data.title) {
      wx.showModal({
        title: '提示',
        content: '起一个标题才能发布哦~',
        showCancel: false
      });

      return;
    }

    if(!this.data.story) {
      wx.showModal({
        title: '提示',
        content: '没有故事怎么能算是旅行呢！',
        showCancel: false
      });

      return;
    }

    if(!this.data.lat || !this.data.lng || !this.data.address) {
      wx.showModal({
        title: '提示',
        content: '请先获取位置哦~',
        showCancel: false
      });

      return;
    }

    if(this.data.imgList.length < 1) {
      wx.showModal({
        title: '提示',
        content: '请至少选择一张图片哦~',
        showCancel: false
      });

      return;
    }

    wx.showLoading({
      title: '正在上传',
      mask: true
    });

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
      app.globalData.isHaveNew = true;

      this.uploadPicToStory(res.data.storyId, this.data.imgList);
    }
    else {
      this.setData({
        isClick: false
      })
    }
  },
  uploadPicToStory(storyid, list) {
    console.log('upload before', storyid, list);
    let that = this;
    let nowImgList = [];

    let promiseList = list.map((item, index) => {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: "https://vps.521plus.com/api/common/Public/uploadImage",
          filePath: item,
          formData: {
            type: 'mapstory',
            filename: storyid + "-" + index
          },
          name: 'file',
          success: function(res) {
            res = JSON.parse(res.data);
            if(res.code == 0) {
              nowImgList.push(res.data);
            }

            resolve();
          }
        })
      })
    });

    console.log(promiseList);

    Promise.all(promiseList).then(() => {
      this.showModelAndBack(storyid, nowImgList);
    })

    // for (let i = 0; i < list.length; i++) {
    //   wx.uploadFile({
    //     url: "https://vps.521plus.com/api/common/Public/uploadImage",
    //     filePath: list[i],
    //     formData: {
    //       type: 'mapstory',
    //       filename: storyid + "-" + i
    //     },
    //     name: 'file',
    //     success: function(res) {
    //       res = JSON.parse(res.data);

    //       console.log(res);

    //       if(res.code == 0) {
    //         nowImgList.push(res.data);
    //       }

    //       // 是最后一张了
    //       if(i == list.length - 1) {
    //         that.showModelAndBack(storyid, nowImgList);
    //       }
    //     }
    //   })
    // }
  },
  async showModelAndBack(storyId, list) {
    console.log('after', storyId, list);

    if(list.length < 1) {
      wx.showModal({
        title: '提示',
        content: '图片上传失败',
        showCancel: false
      });

      return;
    }

    let res = await app.request('/api/map/MapPc/recordPointImage', {
      method: 'POST',
      data: {
        storyId: storyId,
        imgList: list.join(',')
      }
    });

    if(res.code == 0) {
      wx.hideLoading();

      wx.showToast({
        title: '记录成功哦！',
        icon: 'success',
        duration: 1500
      });

      setTimeout(() => {
        this.setData({
          isClick: true
        });

        this.goBack();
      }, 1000)
    }
  }
})
