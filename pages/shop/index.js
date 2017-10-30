// pages/shop/index.js
const app = getApp();
var self = null;
var shopList = [];
var catlogList = [];
var currentPage = 1;
var isLoading = false;
var handlers = {
  loadShopList:function(){
    var offset = (currentPage - 1) * 20;
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.getApi()+"c=shop&a=batchget&offset="+offset+"&count=10",
      success:function(res){
        setTimeout(function(){
          wx.hideLoading();
          if (isLoading) {
            isLoading = false;
            for (var k in res.data.data) {
              shopList.push(res.data.data[k]);
            }
          } else {
            shopList = res.data.data;
          }

          self.setData({
            shopList: shopList
          });
        }, 500);
      }
    });
  },
  loadCatlogList:function(){
    var getCatlogList = function(){
      wx.request({
        url: app.getApi() + "c=shopcatlog&a=batchget",
        success: function (response) {
          catlogList = response.data.data;
          wx.setStorageSync('shopCatlogList', catlogList);
          self.setData({
            catlogList: catlogList
          });
        }
      });
    }
    getCatlogList();
    /*
    wx.getStorage({
      key: 'shopCatlogList',
      success: function(res) {
        if (res.data.length == 0){
          getCatlogList();
        }else {
          catlogList = res.data;
          self.setData({
            catlogList: catlogList
          });
        }
      },
      fail:function(msg){
        getCatlogList();
      }
    });
    //console.log(catlogList);
    */
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
    handlers.loadCatlogList();
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
  viewShop:function(e){
    var shop_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "detail?shop_id="+shop_id,
    })
  },

  /**
   * 显示分类列表
   */
  viewCatlog:function(e){
    var catid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'list?catid='+catid,
    })
  }
})