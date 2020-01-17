// pages/myUserInfo/index.js
//引入app实例
const app = getApp();
//引入路由模块
const routeList = require("../../utils/router.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      user_id: 1,
      user_head: "../../images/head/02.jpg",
      user_name: "九月",
      user_gender: 1,
      user_real_name: "",
      user_phone: "18290261577",
      user_address: ""
    },
    genderArr:[
      {name:1,value:"男"},
      {name:2,value:"女"}
    ],
    genderIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getUserInfo(function(){
      that.setData({
        userInfo: app.globalData.userInfo
      })
      if(app.globalData.userInfo.user_gender==0){
        that.setData({
          ['userInfo.user_gender']: 1,
          genderIndex: 0
        })
      }else{
        that.setData({
          genderIndex: that.userInfo.user_gender-1
        })
      }

    });
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

  //选择器值改变事件
  bindValueChange: function(e){
    let that = this;
    let type = e.currentTarget.dataset.type;
    if (type=='gender'){
      let index = Number(e.detail.value);
      that.setData({
        genderIndex: index,
        ['userInfo.user_gender']: index+1
      })
    } else if (type =='realName'){
      that.setData({
        ['userInfo.user_real_name']: e.detail.value
      })
    } else if (type =='phone'){
      that.setData({
        ['userInfo.user_phone']: e.detail.value
      })
    } else if (type == 'address') {
      that.setData({
        ['userInfo.user_address']: e.detail.value
      })
    }
  },

  //选择地址
  chooseAddress: function(){
    let that = this;
    wx.chooseLocation({
      success(res) {
        that.setData({
          ['userInfo.user_address']: res.address
        })
      }
    });
  },

  //保存按钮点击事件
  savePersionData: function(){
    let that = this;
    console.log(this.data.userInfo);

    wx.showLoading({
      title: '保存中...',
      mask: true
    })
    let upData = {};
    if(that.data.userInfo.user_gender==0){
      upData.user_gender = 1;
    }
    if (that.data.userInfo.user_real_name.length>0){
      upData.user_real_name = that.data.userInfo.user_real_name;
    }
    if (that.data.userInfo.user_phone.length>0){
      upData.user_phone = that.data.userInfo.user_phone;
    }
    if(that.data.user_address.length>0){
      upData.user_address = that.data.userInfo.user_address;
    }
    wx.request({
      url: routeList.updateUserData,
      data: upData,
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          wx.showToast({
            title: '保存成功',
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