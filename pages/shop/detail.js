// pages/shop/detail.js
var WxParse = require("../../wxParse/wxParse.js");
const app = getApp();
var self = null;
var shop_id = 0;
var shopData = {};
var handlers = {
  loadData:function(){
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.getApi()+"c=shop&a=get&shop_id="+shop_id,
      success:function(res){
        wx.hideLoading();
        shopData = res.data.data;
        WxParse.wxParse('content', 'html', shopData.content, self, 0);
        //设置页面标题
        wx.setNavigationBarTitle({
          title: shopData.shop_name,
        });
        //刷新UI
        self.setData({
          shop:shopData
        });
      }
    });
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    shop_id = options.shop_id;
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
  
  }
})