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
    currentCity: "", //当前城市
    rewardData: [ //附近悬赏数据
      // {
      //   id: 1,
      //   userNickName: "测试测试",
      //   userHeadImg: "../../images/head/01.jpg",
      //   eventTitle: "求帮取快递，有特别的奖励哦哦哦哦哦哦哦哦水电费噶是的发噶啥地方",
      //   eventReward: "120",
      //   eventReleaseTime: "2020-01-01 10:10:01",
      //   eventLong: "29.452304",
      //   eventLat: "106.531677",
      //   eventAddress: "重庆市巴南区红光大道",
      //   eventDistance: "100"
      // },{
      //   id: 2,
      //   userNickName: "水电费",
      //   userHeadImg: "../../images/head/02.jpg",
      //   eventTitle: "求陪同打球",
      //   eventReward: "100",
      //   eventReleaseTime: "2020-01-01 10:10:01",
      //   eventLong: "29.452304",
      //   eventLat: "106.531677",
      //   eventAddress: "重庆市巴南区红光大道",
      //   eventDistance: "150"
      // },{
      //   id: 3,
      //   userNickName: "对方告诉对方",
      //   userHeadImg: "../../images/head/03.jpg",
      //   eventTitle: "送文件",
      //   eventReward: "160",
      //   eventReleaseTime: "2020-01-02 10:10:01",
      //   eventLong: "29.452304",
      //   eventLat: "106.531677",
      //   eventAddress: "重庆市巴南区红光大道",
      //   eventDistance: "200"
      // },{
      //   id: 4,
      //   userNickName: "胜多负少",
      //   userHeadImg: "../../images/head/04.jpg",
      //   eventTitle: "介绍靠谱的租房",
      //   eventReward: "100",
      //   eventReleaseTime: "2020-01-01 10:10:01",
      //   eventLong: "29.452304",
      //   eventLat: "106.531677",
      //   eventAddress: "重庆市巴南区红光大道第23号接到的深V时代付款即可决胜巅峰",
      //   eventDistance: "400"
      // }
    ],
    page: 1 //附近悬赏页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getCurrentLocation();
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
    let page = this.data.page + 1;
    this.getNearbyReward(page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取附近悬赏
  getNearbyReward: function(page){
    let that = this;
    
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: routeList.getIndexEvents, //仅为示例，并非真实的接口地址
      data: {
        page: page,
        pageSize: 10,
        long: app.globalData.point.long,
        lat: app.globalData.point.lat
      },
      complete: function(){
        wx.hideLoading();
      },
      success (res) {
        console.log("返回值",res);
        if(res.data.code==0){
          let newData = res.data.data;
          if(newData.length>0){
            let rewardData = that.data.rewardData.concat(newData);
            that.setData({
              rewardData: rewardData,
              page: page
            })
          }else{
            wx.showToast({
              title: '没有更多了',
              icon: 'none'
            })
          }
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        console.log("附近悬赏返回值",res.data);
      }
    })

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
        
        that.getNearbyReward(that.data.page);
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