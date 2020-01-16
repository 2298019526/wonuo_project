// pages/myRelease/index.js

const app = getApp();
//引入路由模块
const routeList = require("../../utils/router.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNav: 0, //==0进行中，==1已完结
    page: 1, //页码
    rewardData: [
      {
        id: 1,
        userNickName: "测试测试",
        event_user_head: "../../images/head/01.jpg",
        event_title: "求帮取快递，有特别的奖励哦哦哦哦哦哦哦哦水电费噶是的发噶啥地方",
        event_reward: "120",
        event_status: 1,
        event_release_time: "2020-01-01 10:10:01",
        event_finish_time: "2020-01-01 10:10:01",
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
        event_status: 4,
        event_release_time: "2020-01-01 10:10:01",
        event_finish_time: "2020-01-01 10:10:01",
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
        event_status: 3,
        event_release_time: "2020-01-02 10:10:01",
        event_finish_time: "2020-01-01 10:10:01",
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
    this.getMyReceiveData();
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
    let that = this;

    that.setData({
      page: that.data.page + 1
    }, function () {
      that.getMyReceiveData();
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //导航标签点击事件
  navClick: function (e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    that.setData({
      page: 1,
      currentNav: type,
      rewardData: []
    })
    that.getMyReceiveData();
  },

  //获取数据
  getMyReceiveData: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.request({
      url: routeList.getMyReceiveData,
      data: {
        page: that.data.page,
        type: that.data.currentNav
      },
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == '0') {
          if (res.data.data.legth > 0) {
            let allData = that.data.rewardData;
            allData.concat(res.data.data);
            that.setData({
              rewardData: allData
            })
          } else {
            if(that.data.page>1){
              that.setData({
                page: that.data.page - 1
              })
            }
            wx.showToast({
              title: '没有更多了',
              icon: "none"
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  //悬赏点击事件
  eventClick: function (e) {
    let that = this;
    let eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../eventProcess/index?event_id=' + eventId,
    })
  }
})