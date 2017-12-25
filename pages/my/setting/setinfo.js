// pages/my/setting/setinfo.js
var app = getApp();
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
    if (options.field == 'username'){
      wx.setNavigationBarTitle({
        title: '修改昵称',
      })
    }

    if (options.field == 'mobile') {
      wx.setNavigationBarTitle({
        title: '修改手机号',
      })
    }

    if (options.field == 'email'){
      wx.setNavigationBarTitle({
        title: '修改邮箱',
      })
    }
    self.setData({
      field:options.field,
      value:options.value
    })
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
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  onSubmit:function(e){
    var field = e.detail.value.field;
    var value = e.detail.value.value;

    if (field == 'username') {
      if (!value) {
        wx.showToast({
          title: '请输入昵称',
        })
        return false;
      }
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: app.getApi() +'c=member&a=edit_username',
        data:{username:value},
        success:function(res){
          wx.hideLoading();
          wx.navigateBack({
            
          })
        }
      })
    }

    if (field == 'mobile') {
      if (!value) {
        wx.showToast({
          title: '请输入手机号',
        })
        return false;
      }
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: app.getApi() + 'c=member&a=edit_mobile',
        data: { mobile: value },
        success: function (res) {
          wx.hideLoading();
          if (res.data.errcode == 0){
            wx.navigateBack({

            })
          }else {
            wx.showToast({
              title: res.data.errmsg,
            })
          }
        }
      })
    }

    if (field == 'email') {
      if (!value) {
        wx.showToast({
          title: '请输入邮箱',
        })
        return false;
      }
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: app.getApi() + 'c=member&a=edit_email',
        data: { email: value },
        success: function (res) {
          wx.hideLoading();
          if (res.data.errcode == 0) {
            wx.navigateBack({

            })
          } else {
            wx.showToast({
              title: res.data.errmsg,
            })
          }
        }
      })
    }
  }
})