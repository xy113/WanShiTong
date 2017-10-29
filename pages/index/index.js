//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  viewCatlog:function(e){
    var catid = e.currentTarget.dataset.catid;
    wx.navigateTo({
      url: '../catlog/catlog',
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
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
    var self = this;
    wx.request({
      url: app.Config.Api+"c=infocatlog&a=batchget",
      success:function(response){
        //console.log(JSON.stringify(response.data.data));
        self.setData({
          catlogList:response.data.data
        });
      }
    });
    //加载轮播广告
    wx.request({
      url: app.Config.Api+"c=block&a=get_items&block_id=10",
      success:function(response){
        self.setData({
          sliders: response.data.data
        });
      }
    })
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
  }
})
