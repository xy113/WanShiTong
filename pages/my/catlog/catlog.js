// pages/my/catlog/catlog.js
var app = getApp();

var self = null;
var loadDatasource = function(){
  wx.request({
    url: app.getApi()+'c=shopcatlog&a=batchget',
    success:function(res){
      //console.log(res);
      self.setData({
        catlogList:res.data.data
      })
    }
  });
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
      title: '选择分类',
    });

    loadDatasource();
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

  onSelectedItem:function(e){
    var catid = e.currentTarget.dataset.catid;
    var name = e.currentTarget.dataset.name;
    app.globalData.catlog = {
      catid:catid,
      name:name
    }
    wx.navigateBack({
      
    });
  }
})