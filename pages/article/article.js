//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    circular: true,
    articleInfo: {},
    id: null,
    activeImg: 0
  },
  onLoad(options) {
    const id = options.id;

    this.setData({
      id: id
    })

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
  onShareAppMessage(e) {
    let title = this.data.articleInfo.title ? this.data.articleInfo.title : "来看我在足迹故事小程序的故事哦！";
    return {
      title: title,
      path: `/pages/article/article?id=${this.data.id}`,
      imageUrl: this.data.articleInfo.images ? this.data.articleInfo.images[0] : '',
      success: () => {
        wx.showToast({
          title: '分享成功',
          duration: 2000
        })
      }
    }
  },
  bannerChange(e) {
    this.setData({
      activeImg: e.detail.current
    })
  }
})
