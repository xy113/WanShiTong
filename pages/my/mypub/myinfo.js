// pages/my/mypub/myinfo.js
var app = getApp();
var self = null;

var loadInfoData = function(){
  wx.request({
    url: app.getApi() + 'c=info&a=my_info',
    success: function (res) {
      //console.log(res.data);
      self.setData({ infoList: res.data.data });
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    wx.setNavigationBarTitle({
      title: '我发布的',
    });
    loadInfoData();
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

  /**
   * 查看详情
   */
  viewInfo: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/info/item?id=' + id,
    });
  },

  /**
   * 删除信息
   */
  deleteInfo:function(e){
    var id = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['删除'],
      success:function(res){
        if(res.tapIndex == 0){
          wx.request({
            url: app.getApi()+"c=info&a=delete",
            data:{id:id},
            success:function(response){
              loadInfoData();
            }
          })
        }
      }
    })
  },
})