const app = getApp()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 12141,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '../../images/red.png',
      width: 20,
      height: 20,
      anchor: {
        x: 0.5,
        y: 0.5
      }
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')

    this.getPointList();
  },
  onShow() {
    // wx.hideTabBar({
    //   complete(err) {
    //       console.log('隐藏了', err)
    //   }
    // });

  },
  async getPointList() {
    let res = await app.request('/api/map/MapPc/getPointsList');

    if(res.code == 0) {
      console.log(res);
      let markers = res.data.map(item => {
        return {
          id: item.id,
          latitude: item.point.lat,
          longitude: item.point.lng,
          iconPath: '../../images/red.png',
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        }
      });

      this.setData({
        markers: markers
      })
    }
  },
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function(res){
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
  // translateMarker: function() {
  //   this.mapCtx.translateMarker({
  //     markerId: 1,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude:23.10229,
  //       longitude:113.3345211,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },
  // includePoints: function() {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude:23.10229,
  //       longitude:113.3345211,
  //     }, {
  //       latitude:23.00229,
  //       longitude:113.3345211,
  //     }]
  //   })
  // },
  markertap(e) {
    console.log(e);
  }
})
