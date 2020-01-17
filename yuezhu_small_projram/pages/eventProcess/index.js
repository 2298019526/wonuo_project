// pages/eventProcess/index.js
//引入路由模块
const routeList = require("../../utils/router.js");

var it = null; //倒计时

Page({

  /**
   * 页面的初始数据
   */
  data: {
    release_user_info: {
      user_id: 1,
      user_name: "我是发布的人",
      user_head: "../../images/head/01.jpg",
      user_phone: "18290261570",
      user_real_name: "王先生"
    },
    receive_user_info: {
      user_id: 2,
      user_name: "测试测试",
      user_head: "../../images/head/02.jpg",
      user_phone: "18290261571",
      user_real_name: "饶先生"
    },
    rewardDetail: { //悬赏详情数据
      id: 1,
      event_title: "求帮取快递",
      event_type: "取快递",
      event_describe: "是分公司打分V字形差旅us如何过五色UR给后端非常是面持续打发斯蒂芬打算放过是的弗格森",
      event_reward: "120",
      event_release_time: "2020-01-01 10:10:01",
      event_long: "106.531677",
      event_lat: "29.452304",
      event_address: "重庆市巴南区红光大道",
      event_distance: "100",
      event_browse_number: 3,
      event_receive_time: "2020-01-10 12:10:12",
      event_status: 3,
      event_over_time: "2020-01-11 10:12:10",
      event_term_time: "2020-01-11 12:12:02"
    },
    countDown: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("传入参数",options);
    that.getRewardDetails(options.eventID);

    that.countDown(that.data.rewardDetail.event_term_time);
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
    clearInterval(it);
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

  //获取发布人，接取人，悬赏详情数据
  getRewardDetails: function (eventID){
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: routeList.getRewardProcess,
      data: {
        eventID: eventID
      },
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          that.setData({
            release_user_info: {},
            receive_user_info: {},
            rewardDetail: {}
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },

  //打电话
  callPhone: function(e){
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },

  //结束悬赏点击事件
  finishReward: function(){
    let that = this;

    wx.showModal({
      title: '确认结束？',
      content: '请确认悬赏完成后结束悬赏。',
      success: function(res){
        if(res.confirm){
          that.endTheReward();
        }else{

        }
      }
    })
  },

  //计算倒计时
  countDown: function(datetime){
    let that = this;
    it = setInterval(function(){
      let date1 = new Date(); //开始时间 
      let date2 = new Date(datetime);  //结束时间 
      let date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
      //计算出相差天数 
      let days = Math.floor(date3 / (24 * 3600 * 1000));
      //计算出小时数 
      let leave1 = date3 % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数 
      let hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数 
      let leave2 = leave1 % (3600 * 1000);    //计算小时数后剩余的毫秒数 
      let minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数 
      let leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数 
      let seconds = Math.round(leave3 / 1000);
      let countDownStr = "";
      if (days>0){
        countDownStr += days + "天 ";
      }
      if (hours>0){
        countDownStr += hours + "小时 ";
      }
      if (minutes > 0) {
        countDownStr += minutes + "分钟 ";
      }
      countDownStr += seconds + "秒";
      that.setData({
        countDown: countDownStr
      })

    })
  },

  //结束悬赏
  endTheReward: function(){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.request({
      url: routeList.endTheReward,
      data: {

      },
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          wx.showToast({
            title: '成功完结',
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})