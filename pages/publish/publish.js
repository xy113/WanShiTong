// pages/publish/publish.js
var app = getApp();
var imageIdList = [];
var imagePathList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:"请选择位置",
      lng:"",
      lat:"",
      imageList:[],
      showAddImgBtn:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        catid:options.catid
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try {
      this.setImages();
    } catch (e) {
      //什么也不做
    }
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
   * 刷新图片信息
   */
  setImages:function(){
    this.setData({
      imageList: imagePathList
    });

    if (imageIdList.length >= 9) {
      this.setData({
        showAddImgBtn: false
      });
    }else {
      this.setData({
        showAddImgBtn: true
      });
    }
  },

  /**
   * 表单提交
   */
  formSubmit:function(e){
    var data = e.detail.value;
    if(data.content.length < 5) {
      wx.showToast({
        title: '请填写要发布的内容，至少5个字',
        image:"/images/icon/info.png"
      });
      return false;
    }

    if (data.lng.length == 0 || data.lat.length == 0){
      wx.showToast({
        title: '请选择你所在的位置',
        image: "/images/icon/info.png"
      });
      return false;
    }

    if (data.phone.length == 0){
      wx.showToast({
        title: '请填写联系电话',
        image: "/images/icon/info.png"
      });
      return false;
    }
    data.images = imageIdList;
    wx.request({
      url: app.getApi()+"c=info&a=add",
      type:'POST',
      data: data,
      success:function(response){
          var res = response.data;
          console.log(res);
          if(res.errcode == 0){
            imageIdList = [];
            imagePathList = [];
            wx.redirectTo({
              url: '/pages/info/item?id='+res.data.id,
            });
          }else {
            wx.showToast({
              title: res.errmsg,
              image: "/images/icon/info.png"
            });
          }
      }
    })
  },

  /**
   * 选择地址
   */
  getLocation:function(){
      var self = this;
      wx.chooseLocation({
        success: function(res) {
          self.setData({
              address:res.address,
              lng:res.longitude,
              lat:res.latitude
          })
        },
      })
  },

  /**
   * 上传图片
   */
  chooseImage:function(){
      var self = this;
      wx.chooseImage({
        count: 1, // 默认9
        success: function(res) {
            var filePath = res.tempFilePaths[0];
            wx.showLoading({
              title: '正在处理..',
            });
            wx.uploadFile({
              url: app.getApi()+'c=material&a=upload&type=image',
              filePath: filePath,
              name: 'filedata',
              success:function(response){
                wx.hideLoading();
                var data = JSON.parse(response.data);
                var imgData = data.data;
                //console.log(JSON.stringify(imgData));

                //最多9张图片
                if (imageIdList.length < 9) {
                  imageIdList.push(imgData.id);
                  imagePathList.push(filePath);
                  self.setImages();
                }
              }
            })
        },
      })
  },

  /**
   * 删除图片
   */
  deleteImage:function(e){
      var self = this;
      var key = e.currentTarget.dataset.key;
      var deleteItem = function(){
        var newImageIdList = [];
        var newImagePathList = [];

        for (var i = 0; i < imagePathList.length; i++) {
          if (i == key) {
            continue;
          } else {
            newImageIdList.push(imageIdList[i]);
            newImagePathList.push(imagePathList[i]);
          }
        }

        imageIdList = newImageIdList;
        imagePathList = newImagePathList;
        self.setImages();
      }
      
      wx.showActionSheet({
        itemList: ['确定'],
        success:function(res){
          if(res.tapIndex == 0){
            deleteItem();
          }
        }
      });
    }
})