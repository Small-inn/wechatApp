// pages/more-movie.js
const app = getApp()
import { convertToArray, http } from '../../utils/util'
const top250Url = `${app.globalData.baseUrl}/v2/movie/top250`
const inTheatersUrl = `${app.globalData.baseUrl}/v2/movie/in_theaters`
const comingSoonUrl = `${app.globalData.baseUrl}/v2/movie/coming_soon`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    dataUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category
    this.setData({
      category: category
    })
    wx.setNavigationBarTitle({
      title: this.data.category
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
    for (let i in data.subjects) {
      const subject = data.subjects[i]
      let title = subject.title.length > 6 ? `${subject.title.slice(0, 6)}...` : subject.title
      let tempObj = {
        title,
        stars: convertToArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      tempList.push(tempObj)
    }

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