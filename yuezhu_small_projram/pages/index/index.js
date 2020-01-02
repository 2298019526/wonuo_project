// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerData: [
      {image: "../../images/banner/01.jpg",linkUrl:""},
      {image: "../../images/banner/02.jpg",linkUrl:""},
      {image: "../../images/banner/03.jpg",linkUrl:""}
    ],
    todayData: [
      {headUrl: "../../images/head/01.jpg",nickName: "测试一",completeCount: 12},
      {headUrl: "../../images/head/02.jpg",nickName: "测试二",completeCount: 11},
      {headUrl: "../../images/head/03.jpg",nickName: "测试三",completeCount: 9},
      {headUrl: "../../images/head/04.jpg",nickName: "测试四",completeCount: 6},
      {headUrl: "../../images/head/05.jpg",nickName: "测试五",completeCount: 5}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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