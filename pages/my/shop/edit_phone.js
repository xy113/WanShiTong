// pages/my/shop/edit_phone.js
var app = getApp();
var self = null;
var phone = null;

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
    phone = options.phone;
    self.setData({
      phone:phone
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
    phone = e.detail.value.phone;
    if(!phone) {
      wx.showToast({
        title: '请填写手机号码',
      })
      return false;
    }

    wx.request({
      url: app.getApi() + "c=shop&a=update",
      data: { "shop[phone]": phone },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.navigateBack({

        });
      }
    })
  }
})