var app = getApp();
console.log(app.globalData['userInfo']);
Page({

  /**
   * 事件
   */
  onClickTap(e) {
    wx.navigateTo({
      url: '../posts/post',
    });
    // 不存在子父页面的关系，到下一个页面之前的页面会被销毁，执行前一个页面的Unload事件
    // wx.redirectTo({
    //   url: '',
    // })

  },
  onGotUserInfo(e) {
    console.log(e.detail.userInfo)
    this.setData({
      userName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // avatarUrl: ''
    // name: 'lx',
    // textWord: '开启小程序之旅'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = {
      name: 'Small-inn',
      textWord: '开启小程序之旅',
      img: ''
    }
    this.setData({ userInfo})
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