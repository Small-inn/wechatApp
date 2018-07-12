import postData from '../../data/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    // 利用data缓存id
    this.currentPostId = id
    this.setData({ postDetail: postData[id] })
    // 获取缓存值
    var postCollectedObj = wx.getStorageSync('post_collected')
    if (postCollectedObj) {
      var postCollected = postCollectedObj[id]
      this.setData({ collected: postCollected })
    } else {
      var postCollectedObj = {}
      postCollectedObj[id] = false
      wx.setStorageSync('post_collected', postCollectedObj)
    }
  },

  onCollect: function (event) {
    console.log(this.currentPostId)
    var postCollectedObj = wx.getStorageSync('post_collected')
    var postCollected = postCollectedObj[this.currentPostId]
    // 取反操作
    postCollected = !postCollected
    postCollectedObj[this.currentPostId] = postCollected
    this.showToast(postCollectedObj, postCollected)
  },
  showToast: function (postCollectedObj, postCollected) {
    // 更新文章的缓存值
    wx.setStorageSync('post_collected', postCollectedObj)
    this.setData({
      collected: postCollected
    })
    // wx.showToast
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})