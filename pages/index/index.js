//index.js
//获取应用实例
const app = getApp()
var self = null;
var infoList = [];
var shopList = [];
var handlers = {
  //加载信息
  loadInfoList: function () {
    wx.request({
      url: app.getApi() + "c=info&a=batchget&offset=0&count=10",
      success: function (res) {
        //console.log(res.data);
        infoList = res.data.data;
        self.setData({
          infoList: infoList
        });
      }
    })
  },
  //加载店铺信息
  loadShopList:function(){
    wx.request({
      url: app.getApi()+"c=shop&a=batchget&offset=0&count=10",
      success:function(res){
        console.log(res.data);
        shopList = res.data.data;
        self.setData({
          shopList:shopList
        });
      }
    });
  }
};

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabindex:0
  },
  //事件处理函数
  viewCatlog:function(e){
    var catid = e.currentTarget.dataset.catid;
    wx.navigateTo({
      url: '../info/list?catid='+catid,
    })
  },
  onLoad: function () {
    self = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(JSON.stringify(app.globalData.userInfo));
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //加载分类信息
    wx.request({
      url: app.getApi()+"c=infocatlog&a=batchget",
      success:function(response){
        //console.log(JSON.stringify(response.data.data));
        self.setData({
          catlogList:response.data.data
        });
      }
    });
    //加载轮播广告
    wx.request({
      url: app.getApi()+"c=block&a=get_items&block_id=10",
      success:function(response){
        self.setData({
          sliders: response.data.data
        });
      }
    });
    //加载最新信息
    handlers.loadInfoList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showPub:function(e){
    wx.navigateTo({
      url: '../publish/catlog',
    })
  },
  tab:function(e){
    var tabindex = e.currentTarget.dataset.index;
    self.setData({
      tabindex:tabindex
    });

    if (tabindex == 0){
      if (infoList.length == 0){
        handlers.loadInfoList();
      }
    }else {
      if(shopList.length == 0){
        handlers.loadShopList();
      }
    }
  },

  /**
   * 查看店铺详情
   */
  viewShop: function (e) {
    var shop_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/shop/detail?shop_id=" + shop_id,
    })
  },

  /**
   * 查看详情
   */
  viewInfo: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/info/item?id=' + id,
    });
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})
