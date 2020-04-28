// pages/more-movie.js
const app = getApp()
import {
  convertToArray,
  http
} from '../../utils/util'
const top250Url = `${app.globalData.baseUrl}/v2/movie/top250`
const inTheatersUrl = `${app.globalData.baseUrl}/v2/movie/in_theaters`
const comingSoonUrl = `${app.globalData.baseUrl}/v2/movie/coming_soon`
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    dataUrl: '',
    moviesData: {},
    storeList: [],
    requestUrl: '',
    totalCount: 0,
    isEmpty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category
    this.setData({
      category: category,
    })
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
    switch (category) {
      case '豆瓣Top250':
        this.data.dataUrl = top250Url
        break
      case '即将上映':
        this.data.dataUrl = comingSoonUrl
        break
      case '正在热映':
        this.data.dataUrl = inTheatersUrl
        break
    }
    http(this.data.dataUrl, this.getData)
  },
  // 数据处理
  getData(data) {
    let tempList = []
    // let count = data.count
    for (let i in data.subjects) {
      const subject = data.subjects[i]
      let title =
        subject.title.length > 6 ?
        `${subject.title.slice(0, 6)}...` :
        subject.title
      let tempObj = {
        title,
        stars: convertToArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
      }
      tempList.push(tempObj)
    }
    // if (tempList.length === 20) {

    // }

    // 1.0
    let totalList = (this.data.storeList = this.data.storeList.concat(tempList))
    // 2.0
    // let totalList = []
    // if (!this.data.isEmpty) {
    // 非首次加载
    //   totalList = this.data.moviesData.concat(tempList)
    // } else {
    //   // 首次加载
    //   totalList = tempList
    //   this.data.isEmpty = true
    // }

    this.setData({
      moviesData: totalList,
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    this.data.totalCount += 20
  },
  // 1.0 上拉加载， 配合scroll-view
  onScrollTolower: function (e) {
    console.log('加载更多')
    wx.showNavigationBarLoading()
    const requestUrl =
      this.data.dataUrl + '?start=' + this.data.totalCount + '&count=20'
    http(requestUrl, this.getData)
  },
  // 2.0 上拉加载
  // onReachBottom: function (e) {
  //   console.log('加载更多')
  //   wx.showNavigationBarLoading()
  //   const requestUrl =
  //     this.data.dataUrl + '?start=' + this.data.totalCount + '&count=20'
  //   http(requestUrl, this.getData)
  // },
  // 下拉刷新
  onPullDownRefresh: function (e) {
    console.log('下拉刷新')
    // wx.startPullDownRefresh()
    this.data.moviesData = {}
    wx.showNavigationBarLoading()
    http(this.data.dataUrl, this.getData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})