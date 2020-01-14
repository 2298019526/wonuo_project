// pages/userAgreement/index.js
//引入app实例
const app = getApp();
//引入路由模块
const routeList = require("../../utils/router.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreement: {
      title: "悦助用户协议",
      content: "对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过对方过后地方规划局过后呢不想吃v电饭锅手动客服那就是的部分刚开始发表过"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAgreement();
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

  //获取用户协议
  getUserAgreement: function(){
    let that = this;
    
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: routeList.getUserAgreement,
      data: {},
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          that.setData({
            agreement: res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  }
})