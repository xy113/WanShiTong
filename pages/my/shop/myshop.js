// pages/my/shop/myshop.js
var app = getApp();
var self = null;
var shopInfo = {};

// 引入SDK核心类
var QQMapWX = require('../../../lib/qqmap/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmap = new QQMapWX({
  key: '6MKBZ-WG2WD-B3O4R-HYWHH-IHLV6-L7BIO' // 必填
});

var loadDatasource = function(){
  wx.request({
    url: app.getApi()+'c=shop&a=get',
    success:function(res) {
      if (res.data.errcode == 0){
        //console.log(res.data.data);
        shopInfo = res.data.data;
        self.setData({
          shopInfo:shopInfo
        });
        self.setData({
          catlog: shopInfo.catlog.name
        })
      }
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
      title: '我的门店',
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
    if (app.globalData.catlog){
      wx.request({
        url: app.getApi()+'c=shop&a=update',
        data: { "shop[catid]": app.globalData.catlog.catid},
        success:function(res){
          console.log(res);
        }
      });
      self.setData({
        catlog: app.globalData.catlog.name
      });
      app.globalData.catlog = null;
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

  kaidian:function(){
    wx.navigateTo({
      url: 'kaidian',
    })
  },

  //更换LOGO
  chooseLogo:function(){
    var setLogo = function(shop_logo){
      wx.request({
        url: app.getApi()+'c=shop&a=update',
        data: { "shop[shop_logo]": shop_logo},
        success:function(res){
          console.log(res.data);
        }
      })
    }
    wx.chooseImage({
      success: function(res) {
        wx.showLoading({
          title: '',
        })
        wx.uploadFile({
          url: app.getApi() + 'c=material&a=upload&type=image',
          filePath: res.tempFilePaths[0],
          name: 'filedata',
          success:function(response){
            wx.hideLoading();
            var d = JSON.parse(response.data);
            self.setData({
              shop_logo:d.data.imageurl
            });
            setLogo(d.data.image);
          }
        })
      },
      count:1
    })
  },

  //修改名称
  editName:function(){
    wx.navigateTo({
      url: 'edit_name?shop_name='+shopInfo.shop_name,
    })
  },

  chooseCatlog : function(){
    wx.navigateTo({
      url: '../catlog/catlog',
    })
  },

  chooseLocation:function(){
    wx.chooseLocation({
      success: function(res) {
        // 调用接口
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            //console.log(res);
            var component = res.result.address_component;
            var data = {
              "shop[province]":component.province,
              "shop[city]": component.city,
              "shop[county]": component.district,
              "shop[street]": component.street
            }
            wx.request({
              url: app.getApi() + "c=shop&a=update",
              data: data,
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                loadDatasource();
              }
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            //console.log(res);
          }
        });
      },
    })
  },

  editPhone:function(){
    wx.navigateTo({
      url: 'edit_phone?phone='+shopInfo.phone,
    })
  }
})