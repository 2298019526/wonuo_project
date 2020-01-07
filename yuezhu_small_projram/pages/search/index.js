// pages/search/index.js
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
    searchStatus: true,
    searchKey:"", //设置搜索框的值
    searchValue: "", //输入框的值
    autoFocus: false, //
    historyList: [],
    typeList: [
      { id: 1, label_name: "送文件" },
      { id: 2, label_name: "取快递" },
      { id: 3, label_name: "代买物品" },
      { id: 4, label_name: "陪练" },
      { id: 5, label_name: "组团旅游" },
      { id: 6, label_name: "租房" },
      { id: 7, label_name: "取快递" }
    ],
    rewardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.getCacheToHistory();
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

    this.getCacheToHistory();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  //搜索文本框获得焦点触发事件
  searchFoucs: function(e){

  },

  //搜索文本框的输入监听事件
  searchInput: function(e){
    let that = this;
    let value = e.detail.value;
    that.setData({
      searchValue: value
    })
    if(value.length==0){
      that.setData({
        searchStatus: true
      })
    }
  },

  //确认搜索事件
  searchConfirm: function(){
    let that = this;

    let value = that.data.searchValue;
    if (value.length == 0) {
      return false;
    }
    that.addCache(value);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: routeList.searchAllEvent,
      data: {

      },
      complete: function(){
        wx.hideLoading();
        that.setData({
          searchStatus: false
        })
      },
      success: function(res){
        console.log("搜索返回值",res);
      }
    })
  },

  //历史点击事件
  historyClick: function(e){
    let key = e.currentTarget.dataset.key;
    this.setData({
      searchKey: key,
      searchValue: key
    })
    this.searchConfirm();
  },

  //添加缓存
  addCache: function (words) {
    if(words.length==0){
      return false;
    }
    let searchHistoryList = wx.getStorageSync('searchHistoryList');
    console.log(searchHistoryList);
    if (searchHistoryList.length == 0) {
      var arr = new Array;
      arr.unshift(words);
      wx.setStorageSync('searchHistoryList', arr);
    } else {
      searchHistoryList.unshift(words);
      wx.setStorageSync('searchHistoryList', searchHistoryList);
    }

    this.getCacheToHistory();
  },

  getCacheToHistory: function(){
    let that = this;
    let searchHistoryList = wx.getStorageSync('searchHistoryList');
    that.setData({
      historyList: searchHistoryList
    })
  },

  //清除历史事件
  clearHistory: function(){

    wx.setStorageSync('searchHistoryList', []);
    this.getCacheToHistory();
  },

  //搜索标签点击事件
  typeClick: function(e){
    let id = e.currentTarget.dataset.id;
    let key = e.currentTarget.dataset.key;

    this.setData({
      searchKey: key,
      searchValue: key
    })
    this.searchConfirm();
  },

  //悬赏事件点击事件
  eventClick: function(e){

  }
})