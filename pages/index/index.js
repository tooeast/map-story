//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList: [],
    leftList: [],
    rightList: [],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    circular: true,
    page: 0,
    more: true,
    bottomText: '正在为您加载数据...',
    activeBanner: 0,
    isLoading: false
  },
  onLoad() {
    this.getHomeInfo();
  },
  onShow() {
    
  },
  async getHomeInfo() {
    this.setData({
      isLoading: true
    })
    let res = await app.request('/api/map/MapPc/getMiniAppHomeInfo');

    this.setData({
      isLoading: false
    })

    if(res.code == 0) {
      this.setData({
        bannerList: res.data.bannerList
      });

      this.addToNowList(res.data.articleList);
    }
  },
  getLeft() {
    return new Promise((req, rej) => {
      const query = wx.createSelectorQuery();
      query.select('#left').boundingClientRect(data => {
        req(data.height);
      }).exec();
    });
  },
  getRight() {
    return new Promise((req, rej) => {
      const query = wx.createSelectorQuery();
      query.select('#right').boundingClientRect(data => {
        req(data.height);
      }).exec();
    });
  },
  async addToNowList(list) {
    for(let i = 0; i < list.length; i++) {
      await this.splitEachSide(list[i]);
    }
  },
  async splitEachSide(item) {
    let leftHeight = await this.getLeft();
    let rightHeight = await this.getRight();

    if(leftHeight > rightHeight) {
      const right = this.data.rightList;
      right.push(item);
      this.setData({
        rightList: right
      })
    }
    else {
      const left = this.data.leftList;
      left.push(item);
      this.setData({
        leftList: left
      })
    }
  },
  bannerChange(e) {
    this.setData({
      activeBanner: e.detail.current
    })
  }
})
