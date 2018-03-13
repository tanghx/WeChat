//logs.js
Page({
  data: {
    latitudeInfor:"",
    longitude:"",
    wifiInfor:[],
    indexShow:true,
    listShow:false
  },
  onLoad: function () {
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          latitudeInfor:latitude,
          longitudeInfor:longitude
        });
        var parameter={
          key : "ca5e8c5e47514691b8fe3a96fa66c31e",
          r: "1000M",
          type: "gps",
          lon : longitude,
          lat : latitude
        }
        that.wifiSearch(parameter);
      },
      fail: function(){
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 1500
        });
      }
    })
  },
  wifiSearch:function(parameter){
    var that=this;
    wx.request({
      url: 'http://api.avatardata.cn/Wifi/QueryByRegion', 
      method: 'GET',
      data: parameter,
      success: function(res) {
        var w = res.data.result.data;
        that.setData({
          indexShow:false,
          listShow: true,
          wifiInfor:w
        })
      }
    });
  },
  
  position:function(e){
    var name = e.currentTarget.dataset.name;
    var address = e.currentTarget.dataset.address;
    var latitude = parseFloat(e.currentTarget.dataset.latitude);
    var longitude = parseFloat(e.currentTarget.dataset.longitude);
    wx.openLocation({
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
      scale: 6
    })
  }
})
