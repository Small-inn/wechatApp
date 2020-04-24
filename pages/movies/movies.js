const app = getApp()
import { convertToArray } from '../../utils/util'
const top250Url = `${app.globalData.baseUrl}/v2/movie/top250?start=0&count=3`
const inTheatersUrl = `${app.globalData.baseUrl}/v2/movie/in_theaters?start=0&count=3`
const comingSoonUrl = `${app.globalData.baseUrl}/v2/movie/coming_soon?start=0&count=3`
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top250: {},
        inTheaters: {},
        comingSoon: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMovieList(top250Url, 'top250', '豆瓣Top250')
        this.getMovieList(inTheatersUrl, 'inTheaters', '正在热映')
        this.getMovieList(comingSoonUrl, 'comingSoon', '即将上映')
    },

    // 请求数据接口
    getMovieList(url, seekKey, descript) {
        let that = this
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            // header: {},
            success: function (res) {
                // console.log(res.data)
                that.processData(res.data, seekKey, descript)
            },
            fail: function (err) {
                console.log(err)
            },
        })
    },
    // 数据处理
    processData(movieData, seekKey, descript) {
        let tempList = []
        for (let i in movieData.subjects) {
            let subject = movieData.subjects[i]
            let title = subject.title.length > 6 ? `${subject.title.slice(0, 6)}...` : subject.title
            let tempObj = {
                title,
                stars: convertToArray(subject.rating.stars),
                categoryTitle: descript,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            tempList.push(tempObj)
        }
        let readyData = {}
        readyData[seekKey] = {
            categoryTitle: descript,
            movies: tempList
        }
        this.setData(readyData)
        console.log(this.data.top250)
    },
    // 点击更多电影
    onMoreTap(e) {
        console.log(e.currentTarget.dataset.category)
        const category = e.currentTarget.dataset.category
        wx.navigateTo({
            url: '/pages/more-movie/more-movie?category=' + category
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