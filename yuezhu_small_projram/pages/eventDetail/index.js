// pages/eventDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      user_id: 1,
      user_name: "九月",
      user_head: "../../images/head/01.jpg",
      user_sex: 1,
      user_phone: "18090261577",
      event_release: "16",
      event_received: "10"
    },
    markers: [{
      iconPath: "../../images/map-location.png",
      id: 0,
      latitude: 29.598237,
      longitude: 106.498718,
      width: 30,
      height: 32
    }],
    controls: [],
    scale: 14, //缩放级别，取值范围为3-20
    locationPoint: {},
    centerPoint: {
      long: 106.498718,
      lat: 29.598237
    }
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