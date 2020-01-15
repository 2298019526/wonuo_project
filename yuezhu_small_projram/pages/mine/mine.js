//引入app实例
const app = getApp();
//引入路由模块
const routeList = require("../../utils/router.js");
Page({
  data: {
    empowerStatus: false,
    userInfo:{
      user_id: 1,
      user_name: "九月",
      user_head: "../../images/head/01.jpg",
      user_sex: 1,
      user_phone: "18090261577",
      user_level: 0,
      event_release: "16",
      event_received: "10",
      user_integral: 1200
    },
    userInfoState: false,
    myReleaseNum: 0,
    myReceiveNum: 0,
    servicePhone: ""
  },

  onLoad: function () {
    let that = this;
    
    
  },

  onShow:function(){
    let that = this;
    
    that.getRewardInfo();
    app.getUserInfo(function(){
      that.setData({
        userInfoState: app.globalData.infoState,
        servicePhone: app.globalData.servicePhone
        //userInfo: app.globalData.userInfo
      })
    // if(app.globalData.userType==0){ //未注册
    //   that.setData({
    //     empowerStatus: true
    //   })
    // }
    });
  },

  //获取用户的悬赏信息
  getRewardInfo: function(){
    let that = this;

    wx.request({
      url: routeList.getMineReward,
      data: {

      },
      success: function(res){
        if(res.data.code=='0'){
          that.setData({
            myReleaseNum: res.data.data.myReleaseNum,
            myReceiveNum: res.data.data.myReceiveNum
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  //获取用户信息返回值
  getUserInfo: function () {
    let that = this;

    that.setData({
      empowerStatus: false
    })
    wx.showLoading({
      title: '授权中...',
      mask: true
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) { //已授权个人信息
          wx.getUserInfo({
            success(res) {
              //console.log("获取用户信息成功", res)
              app.updateUserInfo(res.userInfo);
            }
          })
        } else { //未授权个人信息
          that.setData({
            empowerStatus: true
          })
        }
      }
    })
  },

  //打电话
  callPhone: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });
  }

})