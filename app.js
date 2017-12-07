//app.js
var self = null;
App({
  login: function(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          lang: 'zh_CN',
          success: function (info) {
            //console.log(info);
            self.globalData.userinfo = info.userInfo;
            wx.request({
              url: self.getApi() + "c=minapp&a=onlogin&code=" + res.code,
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: info.userInfo,
              success: function (response) {
                //console.log(response);
                var data = response.data.data;
                if (data.sessionKey) {
                  wx.setStorageSync('sessionKey', data.sessionKey);
                }
                if (data.phoneNumber) {
                  wx.setStorageSync('phoneNumber', data.phoneNumber);
                }
                if (!data.uid) {
                  wx.setStorageSync('uid', data.uid);
                  wx.setStorageSync('username', data.username);
                }
              }
            });
          }
        });
      }
    });
  },
  onLaunch: function () {
    self = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          self.login();
        }
      }
    });
    //获取位置信息
    wx.getLocation({
      success: function(res) {
        var location = res.latitude+','+res.longitude;
        wx.setStorageSync('location', location);
      },
    })
  },
  globalData: {
    userInfo: null
  },
  //获取接口API
  getApi:function(){
    var sessionKey = wx.getStorageSync('sessionKey');
    var location = wx.getStorageSync('location');
    return "https://wst.songdewei.com/index.php?sessionKey="+sessionKey+"&location="+location+"&m=api&";
  },
  checkUserSession:function(sucess, fail){
    
  },
  isLogin:function(){
    var sessionKey = wx.getStorageSync('sessionKey');
    if (sessionKey) {
      return true;
    }else {
      self.login();
      return false;
    }
  }
})