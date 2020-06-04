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
    isShowCall: true
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onShow() {
    // wx.hideTabBar({
    //   complete(err) {
    //       console.log('隐藏了', err)
    //   }
    // });

    this.getPointList();

  },
  async getPointList() {
    let res = await app.request('/api/map/MapPc/getPointsList');

    if(res.code == 0) {
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
            content: '这就是标注',
            display: 'ALWAYS',
            padding: 2,
            borderRadius: 2,
            anchorY: 15
          }
        }

        markersShow.push(todoTwo);
      });


      console.log('no', markersNoCall);
      console.log('yes', markersShow)

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
    console.log(e);
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
  }
})
