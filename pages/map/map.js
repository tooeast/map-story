const app = getApp()

Page({
  data: {
    latitude: 28.304380682962783,
    longitude:104.94140625,
    markers: [],
    markersShow: [],
    markersNoCall: [],
    iconList: [
      'blue', 'cherry', 'deepblue', 'green', 'purple', 'red', 'yellow'
    ],
    isShowCall: true,
    showMarkerId: 0,
    isShowStory: false,
    scale: 3,
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');

    this.box = this.selectComponent('#story-box');
  },
  onLoad() {
    // 未登录
    if(!app.globalData.isLogin) {
      wx.showModal({
        title: '提示',
        content: '登陆后才能获取您的足迹点，请先登陆哦～',
        confirmText: '去登陆',
        confirmColor: '#17ba17',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/own/own'
            })
          }
        }
      })
    }
  },
  onShow() {
    if(app.globalData.isLogin && app.globalData.isHaveNew) {
      this.getPointList();
    }

  },
  async getPointList() {
    let res = await app.request('/api/map/MapPc/getPointsList');

    if(res.code == 0) {
      app.globalData.isHaveNew = false
      console.log(res);
      let markersShow = [];
      let markersNoCall = [];
      let todo, todoTwo, color;
      res.data.map(item => {
        color = this.getRandColorIcon()
        todo = {
          id: item.id,
          latitude: item.point.lat,
          longitude: item.point.lng,
          iconPath: color,
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          },
          zIndex: 100
        }

        markersNoCall.push(todo);

        todoTwo = {
          id: item.id,
          latitude: item.point.lat,
          longitude: item.point.lng,
          iconPath: color,
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          },
          zIndex: 100,
          callout: {
            content: item.title,
            display: 'ALWAYS',
            padding: 2,
            borderRadius: 4,
            anchorY: 10,
            fontSize: 14
          }
        }

        markersShow.push(todoTwo);
      });

      this.setData({
        markers: markersShow,
        markersShow: markersShow,
        markersNoCall: markersNoCall
      })
    }
  },
  getRandColorIcon() {
    return '../../images/' + this.data.iconList[Math.floor(Math.random() * this.data.iconList.length)] + '.png';
  },
  maptap(e) {
    console.log(e)
  },
  markertap(e) {
    const newId = Number(e.markerId);

    this.box.getInfoByMarkerId(newId);
  },
  isShowCallBtn() {
    if(this.data.isShowCall) {
      this.setData({
        isShowCall: false,
        markers: this.data.markersNoCall
      })
    }
    else {
      this.setData({
        isShowCall: true,
        markers: this.data.markersShow
      })
    }
  },
  resetMap() {
    this.setData({
      latitude: 28.304380682962783,
      longitude:104.94140625,
      scale: 3
    })
  }
})
