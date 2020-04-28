import postData from '../../data/data.js'
const backgroundAudioManager = wx.getBackgroundAudioManager()
var app = getApp()
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
    this.setData({
      // postDetail: postData[id]
      postDetail: postData.filter(item => item.postId == id)[0]
    })
    // 获取缓存值
    var postCollectedObj = wx.getStorageSync('post_collected')
    if (postCollectedObj) {
      var postCollected = postCollectedObj[id]
      this.setData({
        collected: postCollected || false
      })
    } else {
      var postCollectedObj = {}
      postCollectedObj[id] = false
      wx.setStorageSync('post_collected', postCollectedObj)
    }
    if (app.globalData.g_isMusicPlay && app.globalData.g_playPostId === id) {
      this.setData({
        isPlay: true
      })
    }
    // 监听音乐播放与暂停
    this.addEvtLis()
  },
  // 收藏实现
  onCollect(event) {
    var postCollectedObj = wx.getStorageSync('post_collected')
    console.log(postCollectedObj)
    var postCollected = postCollectedObj[this.data.currentPostId]
    // 取反操作
    postCollected = !postCollected
    postCollectedObj[this.data.currentPostId] = postCollected
    this.showToast(postCollectedObj, postCollected)
  },
  onShare() {
    this.showActSheet()
  },
  showToast(postCollectedObj, postCollected) {
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
  showActSheet() {
    wx.showActionSheet({
      itemList: ['朋友', '朋友圈', 'QQ', '微博']
    })
  },

  // 音乐播放实现
  onMusicTap(e) {
    const currentId = this.data.currentPostId
    const musicDetail = postData[currentId].music
    const isPlay = this.data.isPlay
    // 1.0
    if (isPlay) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlay: false
      })
      app.globalData.g_isMusicPlay = false
    } else {
      wx.playBackgroundAudio({
        dataUrl: musicDetail.url,
        title: musicDetail.title,
        coverImgUrl: musicDetail.coverImgUrl
      })
      this.setData({
        isPlay: true
      })
      app.globalData.g_playPostId = currentId
      app.globalData.g_isMusicPlay = true
    }
    // 2.0
    // console.log(musicDetail)
    // backgroundAudioManager.title = musicDetail.title
    // backgroundAudioManager.epname = musicDetail.title
    // backgroundAudioManager.singer = musicDetail.title.split('-')[1]
    // backgroundAudioManager.coverImgUrl = musicDetail.coverImgUrl
    // backgroundAudioManager.src = musicDetail.url
    // if (this.data.isPlay) {
    //   backgroundAudioManager.pause()
    //   this.setData({
    //     isPlay: false
    //   })
    // } else {
    //   backgroundAudioManager.play()
    //   this.setData({
    //     isPlay: true
    //   })
    // }
    // this.addEvtLis()
  },
  // 音乐播放暂停监听,点击播放和总控开关触发此函数
  addEvtLis() {
    // 1.0
    wx.onBackgroundAudioPlay(() => {
      let pages = getCurrentPages()
      let currentPage = pages[pages.length - 1]
      if (currentPage.data.currentPostId === this.data.currentPostId) {
        if (app.globalData.g_playPostId == this.data.currentPostId) {
          this.setData({
            isPlay: true
          })
        }
      }
      app.globalData.g_isMusicPlay = true
    })
    wx.onBackgroundAudioPause(() => {
      let pages = getCurrentPages()
      let currentPage = pages[pages.length - 1]
      if (currentPage.data.currentPostId === this.data.currentPostId) {
        if (app.globalData.g_playPostId == this.data.currentPostId) {
          this.setData({
            isPlay: false
          })
        }
      }
      app.globalData.g_isMusicPlay = false
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlay: false
      })
    })
    app.globalData.g_isMusicPlay = false
    // 2.0
    // backgroundAudioManager.onPlay(() => {
    //   this.setData({
    //     isPlay: true
    //   })
    //   app.globalData.g_isMusicPlay = true
    //   app.globalData.g_playPostId = this.data.currentPostId
    // })
    // backgroundAudioManager.onPause(() => {
    //   this.setData({
    //     isPlay: false
    //   })
    //   app.globalData.g_isMusicPlay = false
    //   app.globalData.g_playPostId = null
    // })
  }
})