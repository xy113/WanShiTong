// pages/my/shop/kaidian.js
var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../../lib/qqmap/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmap = new QQMapWX({
  key: '6MKBZ-WG2WD-B3O4R-HYWHH-IHLV6-L7BIO' // 必填
});

var self = null;
var shopInfo = {
  catid:'',
  shop_name: '',
  phone: '',
  owner_name: '',
  lat: 0,
  lng: 0,
  province:'',
  city:'',
  county:'',
  street:'',
  intro:'',
  shop_logo:'',
  shop_image:''
};
var attaches = {
  logo:'',
  image:''
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:shopInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    wx.setNavigationBarTitle({
      title: '商家入驻',
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
    if (app.globalData.catlog) {
      shopInfo.catid = app.globalData.catlog.catid;
      self.setData({
        catlogName: app.globalData.catlog.name
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

  chooseLocation:function(e){
    wx.chooseLocation({
      success: function(res) {
        //console.log(res);
        shopInfo.lat = res.latitude;
        shopInfo.lng = res.longitude;
        self.setData({
          address:res.address
        });
        // 调用接口
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            //console.log(res);
            var component = res.result.address_component;
            shopInfo.province = component.province;
            shopInfo.city = component.city;
            shopInfo.county = component.district;
            shopInfo.street = component.street;
            //console.log(shopInfo);
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

  chooseImage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.chooseImage({
      success: function (res) {
        //console.log(res);
        if (id == 'logo'){
          attaches.logo = res.tempFilePaths[0];
          self.setData({
            shop_logo: res.tempFilePaths[0]
          })
        }else {
          attaches.image = res.tempFilePaths[0];
          self.setData({
            shop_image: res.tempFilePaths[0]
          })
        }
      },
      count: 1
    })
  },

  chooseCatlog:function(e){
    wx.navigateTo({
      url: '../catlog/catlog',
    })
  },

  //提交表单
  onSubmit:function(e){
    //console.log(shopInfo);
    var values = e.detail.value;
    shopInfo.shop_name = values.shop_name;
    shopInfo.phone = values.phone;
    shopInfo.owner_name = values.owner_name;
    shopInfo.intro = values.intro;

    if (!shopInfo.catid) {
      wx.showToast({
        title: '请选择行业分类',
      })
      return false;
    }

    if (shopInfo.shop_name.length < 2){
      wx.showToast({
        title: '请输入门店名称，只是两个字',
        
      });
      return false;
    }

    if (shopInfo.phone.length < 11){
      wx.showToast({
        title: '请输入联系电话',
      });
      return false;
    }

    if (shopInfo.owner_name.length < 2){
      wx.showToast({
        title: '请填写店主姓名，至少两个字',
      })
      return false;
    }
    
    if(!attaches.logo) {
      wx.showToast({
        title: '请选择门店LOGO',
      })
      return false;
    }

    if(!attaches.image) {
      wx.showToast({
        title: '请选择门头照片',
      })
      return false;
    }

    if (!shopInfo.lat || !shopInfo.lng) {
      wx.showToast({
        title: '请选择门店位置',
      });
      return false;
    }

    if (!shopInfo.intro) {
      wx.showToast({
        title: '请简单介绍一下你的门店',
      });
      return false;
    }
    var count = 2;
    var checkUpload = function(){
      if (count == 0){
        wx.hideLoading();
        wx.showLoading({
          title: '正在保存信息',
        })
        wx.request({
          url: app.getApi() + 'c=shop&a=add',
          type: 'POST',
          data: shopInfo,
          success: function (response) {
            console.log(response);
          }
        })
        //return true;
      }else {
        return false;
      }
    }
    wx.showLoading({
      title: '正在保存图片',
    });
    wx.uploadFile({
      url: app.getApi() + 'c=material&a=upload&type=image',
      filePath: attaches.logo,
      name: 'filedata',
      success:function(res){
        var data = JSON.parse(res.data);
        shopInfo.shop_logo = data.data.image;
        count--;
        checkUpload();
      }
    });

    wx.uploadFile({
      url: app.getApi() + 'c=material&a=upload&type=image',
      filePath: attaches.image,
      name: 'filedata',
      success: function (res) {
        var data = JSON.parse(res.data);
        shopInfo.shop_image = data.data.image;
        count--;
        checkUpload();
      }
    });
  }
})