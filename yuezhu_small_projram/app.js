//app.js
//引入路由模块
const routeList = require("utils/router.js");
App({
  onLaunch: function () {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: routeList.login,
            data: {
              code: res.code
            },
            success: function(res){
              if(res.data.code=='0'){
                that.globalData.sessionKey = res.data.data.sessionKey;
                that.globalData.servicePhone = res.data.data.servicePhone;
                that.getUserInfo();
              }else{
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                })
              }
            }
          })
        }
      }
    })

  },

  //获取用户数据
  getUserInfo: function(callback){
    let that = this;

    if (that.globalData.sessionKey.length==0) return false;
    wx.request({
      url: routeList.getUserInfo,
      data:{
        sessionKey: that.globalData.sessionKey
      },
      success: function(res){
        if(res.data.code=='0'){
          let info = res.data.data;
          that.globalData.userType = 1;
          that.globalData.userInfo = info;
          if (info.real_name.length==0 || info.user_phone.length==0){ //用户个人信息未完善
            that.globalData.infoState = false;
          }else{
            that.globalData.infoState = true;
          }
        } else if (res.data.code=='1'){
          that.globalData.userType = 0;
          that.globalData.userInfo = {};
        }

        if (callback && typeof callback == "function"){
          callback();
        }
      }
    })
  },

  //更新用户信息
  updateUserInfo:function(data){
    let that = this;
    wx.request({
      url: routeList.updateUserInfo,
      data: {
        user_head: data.avatarUrl,
        user_gender: data.gender,
        user_name: data.nickName
      },
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code='0'){ //更新数据成功，重新获取用户信息
          that.getUserInfo();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  //全局变量
  globalData:{
    userType: 0, //用户身份0-未注册，1-已注册，数据库有数据
    infoState: false, //false个人信息未完善，true个人信息已完善
    sessionKey: "",
    servicePhone: "023-12345678",
    userInfo: {}, //用户信息
    point: "", //用户当前坐标点
    address: "" //用户当前位置信息
  },
})