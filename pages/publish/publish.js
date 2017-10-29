// pages/publish/publish.js
var app = getApp();
var imagePickedKey = "imagePickedKey";
var imageSavedKey = "imageSavedKey";
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
      var imageList = wx.getStorageSync(imagePickedKey);
      this.setData({
        imageList: imageList
      });
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
    //wx.setStorageSync('infoImageList', []);
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
    data.images = wx.getStorageSync(imageSavedKey);
    wx.request({
      url: app.Config.Api+"c=info&a=add",
      type:'POST',
      data: data,
      success:function(response){
          var res = response.data;
          console.log(res);
          if(res.errcode == 0){
            wx.removeStorageSync(imagePickedKey);
            wx.removeStorageSync(imageSavedKey);
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

  getLocation:function(){
      var self = this;
      wx.chooseLocation({
        success: function(res) {
          //console.log(JSON.stringify(res));
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
              title: '正在处理图片...',
            });
            wx.uploadFile({
              url: app.Config.Api+'c=material&a=upload&type=image',
              filePath: filePath,
              name: 'filedata',
              success:function(response){
                wx.hideLoading();
                var data = JSON.parse(response.data);
                var imgData = data.data;
                console.log(JSON.stringify(imgData));
                var infoImages = [];
                var imageList = [];
                try {
                  infoImages = wx.getStorageSync(imageSavedKey);
                }catch (e) {}
                //最多9张图片
                if (infoImages.length < 9) {
                  infoImages.push(imgData.id);
                }
                wx.setStorageSync(imageSavedKey, infoImages);

                try {
                  imageList = wx.getStorageSync(imagePickedKey);
                }catch(e){}
                if (imageList.length < 9) {
                  imageList.push(filePath);
                }
                wx.setStorageSync(imagePickedKey, imageList);
                self.setData({
                  imageList: imageList
                });

                if (imageList.length >= 9) {
                  self.setData({
                    showAddImgBtn: false
                  });
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
        try {
          var newImages = [];
          var newImageList = [];
          var images = wx.getStorageSync(imageSavedKey);
          var imageList = wx.getStorageSync(imagePickedKey);
          for (var i = 0; i < imageList.length; i++) {
            if (i == key) {
              continue;
            } else {
              newImages.push(images[i]);
              newImageList.push(imageList[i]);
            }
          }

          wx.setStorageSync(imageSavedKey, images);
          wx.setStorageSync('infoImageList', newImageList);
          self.setData({
            imageList: newImageList
          });

          if (newImageList.length >= 9) {
            self.setData({
              showAddImgBtn: false
            });
          }else {
            self.setData({
              showAddImgBtn: true
            });
          }
        } catch (e) {
          //什么也不做
        }
      }
      
      wx.showActionSheet({
        itemList: ['确定'],
        success:function(res){
          if(res.tapIndex == 0){
            deleteItem();
          }
        }
      })
    }
})