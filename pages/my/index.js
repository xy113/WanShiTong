// pages/my/index.js
const app = getApp();
var self = null;

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
      title: '',
    });
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        //console.log(res);
        self.setData({
          userinfo:res.userInfo
        })
      }
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

  didSelectedRow:function(e){
    var target = e.currentTarget.dataset.target;

    if(app.isLogin()){
      if (target == 'publish') {
        wx.navigateTo({
          url: './mypub/myinfo',
        })
      }

      if (target == 'shop') {
        wx.navigateTo({
          url: './shop/myshop',
        })
      }

      if(target == 'address') {
        wx.navigateTo({
          url: './address/address',
        })
      }

      if(target == 'settings'){
        wx.navigateTo({
          url: './setting/setting',
        })
      }

      if(target == 'kefu') {
        wx.navigateTo({
          url: './kefu/kefu',
        })
      }
    }
  }
})