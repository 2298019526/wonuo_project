// pages/eventDetail/index.js
//引入路由模块
const routeList = require("../../utils/router.js");
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
      user_level: 3,
      event_release: "16",
      event_received: "10"
    },
    rewardDetail: { //悬赏详情数据
      id: 1,
      user_name: "测试测试",
      event_user_head: "../../images/head/01.jpg",
      event_title: "求帮取快递",
      event_describe: "是分公司打分V字形差旅us如何过五色UR给后端非常是面持续打发斯蒂芬打算放过是的弗格森",
      event_reward: "120",
      event_release_time: "2020-01-01 10:10:01",
      event_contact: "18290261572",
      event_contacts: "王先生",
      event_long: "106.531677",
      event_lat: "29.452304",
      event_address: "重庆市巴南区红光大道",
      event_distance: "100",
      event_browse_number: 4
    },
    markers: [{
      iconPath: "../../images/map-location.png",
      id: 0,
      latitude: "29.452304",
      longitude: "106.531677",
      width: 30,
      height: 32
    }],
    controls: [],
    scale: 10, //缩放级别，取值范围为3-20
    locationPoint: {},
    centerPoint: {
      long: 106.498718,
      lat: 29.598237
    },
    recommendData: [ //附近悬赏数据
      {
        id: 1,
        userNickName: "测试测试",
        event_user_head: "../../images/head/01.jpg",
        event_title: "求帮取快递，有特别的奖励哦哦哦哦哦哦哦哦水电费噶是的发噶啥地方",
        event_reward: "120",
        event_release_time: "2020-01-01 10:10:01",
        eventLong: "29.452304",
        eventLat: "106.531677",
        event_address: "重庆市巴南区红光大道",
        event_distance: "100"
      }, {
        id: 2,
        userNickName: "水电费",
        event_user_head: "../../images/head/02.jpg",
        event_title: "求陪同打球",
        event_reward: "100",
        event_release_time: "2020-01-01 10:10:01",
        eventLong: "29.452304",
        eventLat: "106.531677",
        event_address: "重庆市巴南区红光大道",
        event_distance: "150"
      }, {
        id: 3,
        userNickName: "对方告诉对方",
        event_user_head: "../../images/head/03.jpg",
        event_title: "送文件",
        event_reward: "160",
        event_release_time: "2020-01-02 10:10:01",
        eventLong: "29.452304",
        eventLat: "106.531677",
        event_address: "重庆市巴南区红光大道",
        event_distance: "200"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.event_id);
    that.getDetails(options.event_id);

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

  //获取页面数据，同时
  getDetails: function(eventID){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.request({
      url: routeList.getEventDetails,
      data: {
        eventID: eventID
      },
      complete: function(){
        wx.hideLoading();
      },
      success(res) {
        console.log("事件详情页返回值", res);
        if (res.data.code == 0) {
          let data = res.data.data
          this.setData({
            userInfo: data.userInfo,
            rewardDetail: data.rewardDetail,
            recommendData: data.recommendData,
            markers: [
              {
                iconPath: "../../images/map-location.png",
                id: 0,
                latitude: data.rewardDetail.event_lat,
                longitude: data.rewardDetail.event_long,
                width: 30,
                height: 32
              }
            ],
            centerPoint: {
              long: data.rewardDetail.event_long,
              lat: data.rewardDetail.event_lat
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  //重新拉取定位
  getMyLocation: function() {
    let that = this;

    wx.getLocation({
      type: "gcj02", //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        let locationPoint = {
          long: Number(res.longitude),
          lat: Number(res.latitude)
        }
        that.setData({
          centerPoint: locationPoint,
          locationPoint: locationPoint
        })
      },
      fail: function (res) {
        that.setData({
          address: "定位失败"
        });
      }
    });
  },

  //缩放，放大缩小
  zoomChange: function(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    if (type == 0) { //+
      if (that.data.scale > 3) {
        that.setData({
          scale: that.data.scale + 1
        })
      }
    } else if (type == 1) { //-
      if (that.data.scale < 20) {
        that.setData({
          scale: that.data.scale - 1
        })
      }
    }
  },

  //推荐点击事件
  eventClick: function(e){
    let that = this;
  },

  //打电话
  callPhone: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });
  },

  //居中显示事件地点
  showEventLocation: function(){
    let point = {
      long: this.data.rewardDetail.event_long,
      lat: this.data.rewardDetail.event_lat
    };

    this.setData({
      centerPoint: point,
      scale: 18
    })
  },

  //相关推荐点击事件
  recommendClick: function (e) {
    let that = this;
    let eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../eventDetail/index?event_id=' + eventId,
    })
  },

  //立即接取点击事件
  rightReceive: function(){
    let that = this;
    wx.showLoading({
      title: '接取中...',
      mask: true
    });
    wx.request({
      url: routeList.receiveReward,
      data: {
        eventID: that.data.rewardDetail.id,
      },
      complete: function(){
        wx.hideLoading();

        wx.redirectTo({
          url: '../eventProcess/index?eventID=' + that.data.rewardDetail.id,
        })
        wx.showToast({
          title: '接取成功',
          icon: 'success',
          mask: true
        })
      },
      success: function(res){
        if(res.data.code=='0'){

          wx.redirectTo({
            url: '../eventProcess/index',
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            mask: true
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            image: '../../images/warn.png',
            mask: true,
          })
        }
      }
    })
    
  }
})