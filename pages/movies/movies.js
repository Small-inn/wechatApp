// const App = require('../../app')
const app = getApp()
const top250Url = `${app.globalData.baseUrl}/v2/movie/top250`
const inTheatersUrl = `${app.globalData.baseUrl}/v2/movie/in_theaters`
const comingSoonUrl = `${app.globalData.baseUrl}/v2/movie/coming_soon`
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top250: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(top250Url)
        this.getMovieList(top250Url)
    },

    // 请求数据接口
    getMovieList(url) {
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res)
            },
            fail: function (err) {
                console.log(err)
            },
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