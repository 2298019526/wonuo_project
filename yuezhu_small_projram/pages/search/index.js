// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:"", //设置搜索框的值
    searchValue: "", //输入框的值
    autoFocus: false, //
    historyList: []
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
  },

  //确认搜索事件
  searchConfirm: function(){
    let that = this;

    let value = that.data.searchValue;
    if (value.length == 0) {
      return false;
    }
    that.addCache(value);
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
  }
})