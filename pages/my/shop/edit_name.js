// pages/my/shop/edit_name.js
var app = getApp();
var self = null;
var shop_name = null;

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
    wx.setNavigationBarTitle({
      title: '修改门店名称',
    })
    shop_name = options.shop_name;
    self.setData({
      shop_name:shop_name
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

  //提交表单
  onSubmit:function(e){
    shop_name = e.detail.value.shop_name;
    if (!shop_name) {
      wx.showToast({
        title: '请输入门店名称',
      })
      return false;
    }

    wx.request({
      url: app.getApi()+"c=shop&a=update",
      data:{"shop[shop_name]":shop_name},
      method:'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        wx.navigateBack({
          
        });
      }
    })
  }
})