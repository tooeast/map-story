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
    activeBanner: 0
  },
  onLoad() {},
  onShow() {
    this.getInfo();
  },
  getInfo() {
    let bannerList = [
      {
        img: "http://blog.sansiro.me/image/2019-last-time.jpg",
        url: "2019-last-time",
        title: "写于2019的最后一个晚上"
      },
      {
        img: "http://blog.sansiro.me/image/2018-2019.jpeg",
        url: "2018-to-2019",
        title: "2018再见，2019你好"
      }
    ];

    let aaList = [
      {
        abstract: "2019年的最后一天，记录一下...",
        author: "sansiro",
        date: "2019-12-31 21:39:39",
        id: "2019-last-time",
        poster: "http://img4.imgtn.bdimg.com/it/u=3993714100,1250038048&fm=26&gp=0.jpg",
        title: "写于2019的最后一个晚上"
      },
      {
        abstract: "实现一下用户-角色-权限的权限控制！",
        author: "sansiro",
        date: "2019-09-20 18:10:09",
        id: "auth-control",
        poster: "http://blog.sansiro.me/image/permission-1.png",
        title: "基于角色的后台权限控制实现"
      },
      {
        abstract: "对于防抖和节流的认识比较混乱，这次再重新学习下！",
        author: "sansiro",
        date: "2019-01-10 19:01:22",
        id: "throttle-and-debounce",
        poster: "http://img1.imgtn.bdimg.com/it/u=3649717550,98900411&fm=26&gp=0.jpg",
        title: "重新了解防抖和节流"
      },
      {
        abstract: "又到了年终总结的时候...",
        author: "sansiro",
        date: "2018-12-28 15:26:09",
        id: "2018-to-2019",
        poster: "http://blog.sansiro.me/image/2018-2019.jpeg",
        title: "2018再见，2019你好"
      },
      {
        abstract: "正则表达式中神奇的回溯现象",
        author: "sansiro",
        date: "2018-11-28 21:24:39",
        id: "learn-regexp-four",
        poster: "http://blog.sansiro.me/image/regexp.jpg",
        title: "JS正则表达式学习四"
      },
      {
        abstract: "继续之前的内容，学习正则中括号的使用！",
        author: "sansiro",
        date: "2018-11-26 16:45:11",
        id: "learn-regexp-three",
        poster: "http://blog.sansiro.me/image/regexp.jpg",
        title: "JS正则表达式学习三"
      }
    ];

    this.setData({
      bannerList: bannerList
    })

    this.addToNowList(aaList);
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

    if(leftHeight >= rightHeight) {
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
