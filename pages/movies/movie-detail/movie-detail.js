// pages/movies/movie-detail/movie-detail.js
import {
  Movie
} from './class/Movie.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.movieId)
    const movieId = options.movieId
    wx.setNavigationBarTitle({
      title: '电影详情',
    })
    const url = app.globalData.baseUrl + '/v2/movie/subject/' + movieId
    // http(url, this.getDetail)
    // 1.0
    const movie = new Movie(url, (movie) => {
      this.setData({
        movie: movie
      })
    })
    movie.getMovieData()
  },
  // 图片预览
  viewMoviePostImg(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src, //  当前显示图片的http链接
      urls: [src]
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