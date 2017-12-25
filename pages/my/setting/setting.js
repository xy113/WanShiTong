// pages/my/setting/setting.js
var app = getApp();
var self = null;
var userinfo = {};
var loadDatasource = function(){
  wx.request({
    url: app.getApi() + 'c=member&a=get_info',
    success: function (res) {
      //console.log(res);
      userinfo = res.data.data;
      self.setData({
        userinfo: userinfo
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
      title: '个人设置',
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
    if (app.globalData.district) {
      var district = app.globalData.district;
      var data = {
        province : district.province.name,
        city : district.city.name,
        county : district.county.name
      };
      wx.request({
        url: app.getApi()+'c=member&a=update_info',
        data:data,
        method:'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success:function(res){
          loadDatasource();
        }
      })
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

  setHeadimg:function(){
    wx.chooseImage({
      success: function(res) {
        userinfo.headimg = res.tempFilePaths[0];
        wx.showLoading({
          title: '',
        })
        wx.uploadFile({
          url: app.getApi() +'c=member&a=set_headimg',
          filePath: res.tempFilePaths[0],
          name: 'filedata',
          success:function(r){
            wx.hideLoading();
            self.setData({
              userinfo:userinfo
            })
          }
        })
      },
    })
  },

  setName:function(e){
    wx.navigateTo({
      url: 'setinfo?field=username&value='+userinfo.username,
    })
  },

  setMobile:function(){
    wx.navigateTo({
      url: 'setinfo?field=mobile&value='+userinfo.mobile,
    })
  },

  setEmail:function(){
    wx.navigateTo({
      url: 'setinfo?field=email&value='+userinfo.email,
    })
  },

  setSex:function(){
    wx.showActionSheet({
      itemList: ['女', '男'],
      success:function(res){
        wx.showLoading({
          title: '',
        });
        wx.request({
          url: app.getApi()+'c=member&a=update_info',
          data:{usersex:res.tapIndex},
          method:'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success:function(r){
            //console.log(r);
            wx.hideLoading();
            loadDatasource();
          }
        })
      }
    })
  },

  setPlace:function(){
    wx.navigateTo({
      url: '../../common/district',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})