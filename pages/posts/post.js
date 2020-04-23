import postData  from '../../data/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '远方有狼，脚下有狗',
    imgUrls: [
      {
        url: '../../images/iqiyi.png',
        id: 0
      },
      {
        url: '../../images/vr.png',
        id: 1
      },
      {
        url: '../../images/wx.png',
        id: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 在onload方法中，不是异步的去执行一个数据绑定，则不需要使用this.setData,this.setData()是同步方法 
     */ 
    this.setData({postData})
  },
  // 轮播跳转详情
  onSwiperTap: function(event) {
    // target 和 currttarget
    // target指的是当前点击的组件和currentTarget指的是时间捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    console.log(event.target)
    console.log(event.currentTarget)
    const id = event.target.dataset.swiperid
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?id=' + id
    })
  },
  // 跳转文章详情
  onPostTap: function(event) {
    // data- 转换成驼峰命名，转换成小写， data-postId ==> dataset.postid
    const id = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?id=' + id
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