// pages/IntegralDetails/index.js
//引入路由模块
const routeList = require("../../utils/router.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIntegral: 1200,
    month: "2020-01",
    page: 1,
    recordData: [
      {
        id: 1,
        describe: "发布悬赏",
        type: 1,
        number: 100,
        datetime: "2020-01-01 10:12:12",
        balance: "1100"
      }, {
        id: 2,
        describe: "接取悬赏",
        type: 0,
        number: 100,
        datetime: "2020-01-03 11:23:12",
        balance: "1200"
      }, {
        id: 3,
        describe: "系统调整",
        type: 0,
        number: 100,
        datetime: "2020-01-03 09:12:12",
        balance: "1300"
      }, {
        id: 4,
        describe: "系统调整",
        type: 1,
        number: 100,
        datetime: "2020-02-01 13:18:12",
        balance: "1100"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecordData();
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
      page: that.data.page+1
    },function(){
      that.getRecordData();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //时间改变监听事件
  bindDateChange: function(e){
    this.setData({
      page: 1,
      recordData: [],
      month: e.detail.value
    })
  },

  //获取余额和记录数据
  getRecordData: function(){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: routeList.getIntegralRecordData,
      data: {
        page: that.data.page,
        date: that.data.month
      },
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          let data = res.data.data;
          that.setData({
            currentIntegral: data.balance
          })
          if (data.recordData.length>0){
            let allRecord = that.data.recordData.concat(data.recordData);
            that.setData({
              recordData: allRecord
            })
          }else{
            if(that.data.page>1){
              that.setData({
                page: that.data.page-1  
              })
            }
          }
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