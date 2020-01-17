// pages/release/index.js
//引入app实例
const app = getApp();
//引入路由模块
const routeList = require("../../utils/router.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewardTitle: "",
    rewardDescribe: "",
    rewardAddress: "",
    rewardIntegral: "100",
    rewardClass: [
      { id: 1, value: "送文件" },
      { id: 2, value: "取快递" },
      { id: 3, value: "代买物品" },
      { id: 4, value: "陪练" },
      { id: 5, value: "组团旅游" },
      { id: 6, value: "租房" },
      { id: 7, value: "取快递" }
    ],
    currentClass: 0, //当前分类索引
    rewardContacts: "", //联系人姓名
    rewardContactnumber: "", //联系电话
    rewardOvertime: "",
    overStart: "",
    overEnd: "",
    agreement: {
      name: "agreement",
      checked: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.setTodayDate();
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

    if (this.data.rewardAddress.length==0 && app.globalData.address.length>0){
      this.setData({
        rewardAddress: app.globalData.address
      })
    }
    try{
      this.setData({
        rewardContacts: app.userInfo.user_real_name,
        rewardContactnumber: app.userInfo.user_phone
      })
    }catch(err){

    }
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
   
  //标题和描述等值改变事件
  valueChange: function(e){
    let that = this;
    if (e.currentTarget.dataset.type =="title"){
      //console.log(e.detail.value);
      that.setData({
        rewardTitle: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "describe") {
      //console.log(e.detail.value);
      that.setData({
        rewardDescribe: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "address") {
      //console.log(e.detail.value);
      that.setData({
        rewardAddress: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "integral"){
      //console.log(e.detail.value);
      that.setData({
        rewardIntegral: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "type") {
      //console.log(e);
      that.setData({
        currentClass: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "contacts") {
      //console.log(e);
      that.setData({
        rewardContacts: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "contactnumber") {
      //console.log(e);
      that.setData({
        rewardContactnumber: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "overtime") {
      //console.log(e);
      that.setData({
        rewardOvertime: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "agreement") {
      //console.log(e);
      let check = false;
      if(e.detail.value.length==0){
        check = false;
      }else{
        check = true;
      }
      that.setData({
        ['agreement.checked']: check
      })
    }
  },

  //发布按钮点击事件
  releaseSubmit: function(){
    let that = this;
    if (that.checkForm()){
      return false;
    }
    wx.showLoading({
      title: '发布中...',
      mask: true
    })

    wx.request({
      url: routeList.release,
      data: {},
      complete: function(){
        wx.hideLoading();
      },
      success: function(res){
        if(res.data.code=='0'){
          wx.showToast({
            title: '发布成功',
          })
          wx.redirectTo({
            url: '../eventProcess/index',
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

  //验证表单正确性
  checkForm: function(){
    if (this.data.rewardTitle.length==0){
      wx.showToast({
        title: '悬赏标题不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardDescribe.length == 0) {
      wx.showToast({
        title: '悬赏内容不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardAddress.length == 0) {
      wx.showToast({
        title: '悬赏地址不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardIntegral.length == 0) {
      wx.showToast({
        title: '悬赏积分不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardContacts.length == 0) {
      wx.showToast({
        title: '联系人不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardContactnumber.length == 0) {
      wx.showToast({
        title: '联系电话不能为空！',
        icon: 'none'
      })
      return true;
    }
    if (this.data.rewardOvertime.length == 0) {
      wx.showToast({
        title: '有效时间不能为空！',
        icon: 'none'
      })
      return true;
    }
    
  },

  //打开地图
  chooseMapLocation: function () {
    let that = this;
    wx.chooseLocation({
      success(res) {
        //console.log(res);
        that.setData({
          rewardAddress: res.address
        });
      }
    });
  },

  setTodayDate: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = (month < 10) ? '0' + month : month;
    day = (day<10)?'0'+day:day;
    let today = year + "-" + month + "-" + day;

    let overDate = new Date(date.getTime() + 60 * 60 * 24 * 3 * 1000);
    let oyear = overDate.getFullYear();
    let omonth = overDate.getMonth() + 1;
    let oday = overDate.getDate();
    omonth = (omonth < 10) ? '0' + omonth : omonth;
    oday = (oday < 10) ? '0' + oday : oday;
    let overDay = oyear + "-" + omonth + "-" + oday;

    let endDate = new Date(date.getTime() + 60 * 60 * 24 * 30 * 1000);
    let eyear = endDate.getFullYear();
    let emonth = endDate.getMonth() + 1;
    let eday = endDate.getDate();
    emonth = (emonth < 10) ? '0' + emonth : emonth;
    eday = (eday < 10) ? '0' + eday : eday;
    let endDay = eyear + "-" +emonth + "-" + eday;

    this.setData({
      rewardOvertime: overDay,
      overStart: today,
      overEnd: endDay
    })
  },

  //进入用户协议页面
  toAgreement: function(){
    wx.navigateTo({
      url: '../userAgreement/index',
    })  
  }
})