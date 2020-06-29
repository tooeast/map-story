//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad() {},
  onShow() {
    this.getUserList();
  },
  async getUserList() {
    let res = await app.request('/api/map/MapPc/getUserPointList');

    if(res.code == 0) {
      this.setData({
        list: res.data
      });
    }
  },
  showAllScreen(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },
  deletePoint(e) {
    console.log(e);
    let pointId = e.currentTarget.dataset.pointid;
    let title = e.currentTarget.dataset.title;
    let storyId = e.currentTarget.dataset.storyid;

    let that = this;

    wx.showModal({
      title: '提示',
      content: `确定删除足迹 ${title} 吗？`,
      success (res) {
        if (res.confirm) {
          that.deletePointRequest(pointId, storyId);
        }
      }
    });
  },
  async deletePointRequest(pointId, storyId) {
    console.log(pointId);
    console.log(storyId);
    let res = await app.request('/api/map/MapPc/deletePoint', {
      data: {
        pointId: pointId,
        storyId: storyId
      }
    });

    if(res.code == 0) {
      wx.showToast({
        title: '成功',
        icon: '删除成功！',
        duration: 1000
      });

      app.globalData.isHaveNew = true;

      this.getUserList();
    }
  }
})
