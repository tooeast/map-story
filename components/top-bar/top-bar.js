const app = getApp();

Component({
  properties: {
    txt: {
      type: String,
      value: '取消'
    }
  },

  data: {
  },

  created() {

  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行)
   */
  attached() {

  },

  /**
   * 	组件生命周期函数-在组件布局完成后执行)
   */
  ready() {
    // console.log(this.data.isOwn)
  },

  /**
   * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
   */
  moved() {

  },

  /**
   * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
   */
  detached() {

  },

  /**
   *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
   */
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
