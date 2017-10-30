// pages/shop/list.js
const app = getApp();
var self = null;
var catid = 0;
var catlog = {};
var shopList = [];
var currentPage = 1;
var isLoading = false;
var isRefreshing = false;
var handlers = {
  loadShopList: function () {
    var offset = (currentPage - 1) * 20;
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.getApi() + "c=shop&a=batchget&offset=" + offset + "&count=10",
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading();
          if (isLoading) {
            isLoading = false;
            for (var k in res.data.data) {
              shopList.push(res.data.data[k]);
            }
          } else {
            if (isRefreshing) {
              isRefreshing = false;
              wx.stopPullDownRefresh();
            }
            shopList = res.data.data;
          }

          self.setData({
            shopList: shopList
          });
        }, 500);
      }
    });
  },
  loadCatlog:function(){
    wx.request({
      url: app.getApi()+"c=shopcatlog&a=get&catid="+catid,
      success:function(res){
        catlog = res.data.data;
        wx.setNavigationBarTitle({
          title: catlog.name
        });
      }
    })
  }
};
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
    catid = options.catid;
    handlers.loadCatlog();
    handlers.loadShopList();
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
    if (!isRefreshing) {
      currentPage = 1;
      isRefreshing = true;
      handlers.loadShopList();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!isLoading) {
      isLoading = true;
      currentPage++;
      handlers.loadShopList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 查看店铺详情
   */
  viewShop: function (e) {
    var shop_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "detail?shop_id=" + shop_id,
    })
  },
})