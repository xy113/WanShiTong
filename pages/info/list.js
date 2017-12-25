// pages/info/list.js
var app = getApp();
var self = null;
var catid = 0;
var currentPage = 1;
var infoList = [];
var isRefreshing = false;
var isLoading = false;
//请求操作集合
var handlers = {
  loadData:function(){
    //从服务器请求数据
    var offset = (currentPage - 1) * 20;
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.getApi() + "c=info&a=batchget&catid=" + catid + "&offset=" + offset + "&count=20",
      success: function (response) {
        setTimeout(function () {
          wx.hideLoading();
          if (isRefreshing) {
            isRefreshing = false;
            wx.stopPullDownRefresh();
          }
          if (isLoading) {
            isLoading = false;
            for (var i in response.data.data) {
              infoList.push(response.data.data[i]);
            }
          }else {
            infoList = response.data.data;
          }
          console.log(infoList);
          //刷新UI
          self.setData({
            infoList: infoList
          });
        }, 500);
      }
    });
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    catid = options.catid;
    handlers.loadData();
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
    if (!isRefreshing) {
      currentPage = 1;
      isRefreshing = true;
      handlers.loadData();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!isLoading) {
      isLoading = true;
      handlers.loadData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 查看详情
   */
  viewInfoDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/info/item?id='+id,
    });
  },

  callThePhone: function (e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})