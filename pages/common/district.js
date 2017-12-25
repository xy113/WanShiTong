// pages/common/district.js
var app = getApp();
var self = null;
var loadDatasource = function(fid){
  wx.request({
    url: app.getApi()+'c=district&a=batchget&fid='+fid,
    success:function(res){
      self.setData({
        districtList:res.data.data
      })
    }
  })
}
var selectData = {};

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
      title: '选择区域',
    })
    loadDatasource(0);
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
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var level = e.currentTarget.dataset.level;

    if (level == 1){
      selectData.province = {
        id:id,
        name:name
      }
      loadDatasource(id);
    }

    if (level == 2){
      selectData.city = {
        id:id,
        name:name
      }
      loadDatasource(id);
    }

    if(level == 3){
      selectData.county = {
        id:id,
        name:name
      }
      app.globalData.district = selectData;
      wx.navigateBack({
        
      })
    }
  }
})