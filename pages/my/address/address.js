// pages/my/address/address.js
var app = getApp();
var self = null;
var loadDatasource = function(){
  wx.request({
    url: app.getApi()+'c=address&a=batchget',
    success: function(res){
      console.log(res.data);
      self.setData({
        addressList:res.data.data
      })
    }
  })
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
    wx.setNavigationBarTitle({
      title:'我的地址'
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
    loadDatasource();
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

  addAddress:function(){
    wx.navigateTo({
      url: 'add',
    })
  },

  editAddress:function(e){
    var address_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'edit?address_id='+address_id,
    })
  }
})