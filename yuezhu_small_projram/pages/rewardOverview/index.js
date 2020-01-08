// pages/nearbyTask/index.js
const app = getApp();
//引入腾讯位置服务api
const QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
//引入路由模块
const routeList = require("../../utils/router.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
        { id: 1, title: "第一个分类", state: false },
        { id: 2, title: "第二个分类", state: false },
        { id: 3, title: "学习", state: false },
        { id: 4, title: "美食", state: false },
        { id: 5, title: "打球", state: false },
        { id: 4, title: "游戏", state: false },
        { id: 5, title: "音乐", state: false }
      ],
    currentIndex: 0,
    rewardData: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.getLabel();
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

  //标签切换事件
  tabChange: function (e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.setData({
      currentIndex: index
    })

    this.getLabelReward(id);
  },

  //向后台获取标签
  getLabel: function(){
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: routeList.getLabel,
      data: {

      },
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        if(res.data.code==0){
          let labelList = res.data.data;
          if (labelList.length>0){
            that.getLabelReward(labelList[0].id);
          }
          
        }
      }
    })
  },

  //查找标签下的悬赏
  getLabelReward: function(id){
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: routeList.getLabelReward,
      data: {

      },
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){

      }
    })
  }
})