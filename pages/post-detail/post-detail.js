import postData from '../../data/data.js'
const backgroundAudioManager = wx.getBackgroundAudioManager() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: '',
    isPlay: false, // 音乐播放控制
    // backgroundAudioManager: null // 背景音频对象
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    // 利用data缓存id
    this.data.currentPostId = id
    // 获取数据
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
    // 监听音乐播放与暂停
    // this.setData({ backgroundAudioManager: wx.getBackgroundAudioManager() })
    // this.data.backgroundAudioManager.onPause(() => {
    //   console.log('暂停')
    // })
    // this.data.backgroundAudioManager.onPlay(() => {
    //   console.log('播放')
    // })
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
    console.log(postData)
    const currentId = this.data.currentPostId
    console.log(backgroundAudioManager)
    // this.data.backgroundAudioManager.title = postData[currentId].musicTitle
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // backgroundAudioManager.src = postData[currentId].musicUrl
    if (this.data.isPlay) {
      // backgroundAudioManager.pause()
      this.setData({ isPlay: false })
      // this.data.isPlay = false
    } else {
      backgroundAudioManager.play()
      this.setData({ isPlay: true })
      // this.data.isPlay = true
    }
  }
})