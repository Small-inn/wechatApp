import postData from '../../data/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: '',
    isPlay: false
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
  // 收藏实现
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


  // 音乐播放实现
  onMusicTap: function (e) {
    console.log(e)
    if (this.isPlay) {
      wx.pauseBackgroundAudio()
      this.isPlay = false
    } else {
      this.isPlay = true
      wx.playBackgroundAudio({
        dataUrl: postData[this.currentPostId].musicUrl,
        title: postData[this.currentPostId].musicTitle,
        coverImgUrl: postData[this.currentPostId].coverImg
      })
    }
  }
})