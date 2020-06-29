//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 800,
    circular: true,
    articleInfo: {}
  },
  onLoad(options) {

    console.log(options)

    const id = options.id;

    this.getArticleInfo(id);
  },
  onShow() {
  },
  async getArticleInfo(id) {
    let res = await app.request('/api/map/MapPc/getArticleInfoById', {
      data: {
        dataid: id
      }
    });

    if (res.code == 0) {
      this.setData({
        articleInfo: res.data
      })
    }
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  showAllScreen(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.articleInfo.images ? this.data.articleInfo.images : [e.currentTarget.dataset.url]
    })
  },
})
