// pages/publish/catlog.js
//获取应用实例
const app = getApp()
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
    //加载分类信息
    self = this;
    wx.request({
      url: app.getApi() + "c=infocatlog&a=batchget",
      success: function (response) {
        self.setData({
          catlogList: response.data.data
        });
      }
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

  //选择分类处理事件
  pubWithCatlog: function (e) {
      var self = this;
      var catid = e.currentTarget.dataset.catid;
      wx.request({
        url: app.getApi()+"c=infocatlog&a=batchget&fid="+catid,
        success:function(response){
          var data = response.data.data;
          if(data.length == 0){
            if (!app.isLogin()) {
              app.login();
            }else {
              wx.navigateTo({
                url: 'publish?catid=' + catid,
              });
            }
          }else {
            self.setData({
              catlogList: response.data.data
            });
          }
        }
      })
  }
})