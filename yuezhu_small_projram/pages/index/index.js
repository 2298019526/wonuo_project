// pages/index/index.js
//引入app实例
const app = getApp();
//引入腾讯位置服务api
const QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
//引入路由模块
const routeList = require("../../utils/router.js");
//实例化API核心类
const demo = new QQMapWX({
  key: routeList.mapKey // 必填
});

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
    ],
    currentCity: "" //当前城市
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentLocation();
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

  },
  
  //获取当前的定位信息
  getCurrentLocation: function(){
    let that = this;
    wx.getLocation({
      type: "gcj02", //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        //console.log(res);
        let latitude = res.latitude;
        let longitude = res.longitude;
        app.globalData.point = {
          long: Number(res.longitude),
          lat: Number(res.latitude)
        }
        that.getLocationAddress(longitude, latitude);
      },
      fail: function (res) {
        wx.showToast({
          title: '定位失败',
          icon: 'warn'
        })
        that.setData({
          currentCity: "定位失败"
        });
      }
    });
  },
  getLocationAddress: function(long,lat){
    let that = this;

    // 调用接口, 坐标转具体位置 -xxz0717
    demo.reverseGeocoder({
      location: {
        latitude: Number(lat),
        longitude: Number(long)
      },
      success: function (res) {
        //console.log("地址解析返回值：",res);
        that.setData({
          currentCity: res.result.address_component.city
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '定位失败',
          icon: 'warn'
        })
        that.setData({
          currentCity: "定位失败"
        });
      }
    });
  }
})