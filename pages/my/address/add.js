// pages/my/address/add.js
var app = getApp();
var self = null;
var address = {
  consignee:'',
  phone:'',
  province:'',
  city:'',
  county:'',
  street:'',
  isefault:0
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
      title: '添加收货地址',
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
    if (app.globalData.district) {
      var district = app.globalData.district;
      address.province = district.province.name;
      address.city = district.city.name;
      address.county = district.county.name;
      self.setData({
        region:address.province+' '+address.city+' '+address.county
      });
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

  //提交表单
  onSubmit:function(e){
    for(var key in e.detail.value){
      address[key] = e.detail.value[key];
    }

    if (!address.consignee) {
      wx.showToast({
        title: '请填写收货人姓名',
      })
      return false;
    }

    if (!address.phone) {
      wx.showToast({
        title: '请填写联系电话',
      })
      return false;
    }

    if (!address.province) {
      wx.showToast({
        title: '请选择位置',
      })
      return false;
    }

    if (!address.street) {
      wx.showToast({
        title: '请填写街道地址',
      })
      return false;
    }

    wx.request({
      url: app.getApi()+'c=address&a=add',
      data:address,
      success:function(res){
        wx.navigateBack({
          
        });
      }
    })
  },


  chooseDistrict:function(){
    wx.navigateTo({
      url: '../../common/district',
    })
  }
})