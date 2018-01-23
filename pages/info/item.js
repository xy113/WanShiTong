// pages/info/item.js
var app = getApp();
var infoId = 0;
var self = null;
var isRefreshing = false;
var isLoading = false;
var bigImages = [];
//页面请求集合
var _info = {};
var handlers = {
  //从服务加载信息
  loadData:function(){
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.getApi() + 'c=info&a=get&id=' + infoId,
      success: function (res) {
        setTimeout(function(){
          wx.hideLoading();
          if (isRefreshing) {
            isRefreshing = false;
            wx.stopPullDownRefresh();
          }

          if (isLoading) {
            isLoading = false;
          }
          _info = res.data.data;
          self.setData({
            info: _info
          });
        }, 500);
      }
    });
  }
};
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
    infoId = options.id;
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
      isRefreshing = true;
      handlers.loadData();
    }
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

  showShare:function(){
    wx.showShareMenu({
      
    })
  },

  showImages:function(e){
    //if (bigImages.length == 0) {
    bigImages = [];
      for (var i=0; i<_info.images.length; i++){
        bigImages.push(_info.images[i].image);
      }
    //}

    var image = e.currentTarget.dataset.image;
    wx.previewImage({
      urls: bigImages,
      current:image
    })
  },
})