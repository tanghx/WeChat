//index.js
//获取应用实例
var app = getApp();
var cityList = require('../../utils/city.js');
Page({
  data: {
    input_val:'',
    weather:{},
    city_list_show: false,
    city_list:cityList.city.data,
    city_infor:"",
    locationInfor:""
  },
  //事件处理函数
  
  //初始化当前天气
  init:function(){
      var that=this; 
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          that.setData({
            locationInfor:latitude+","+longitude
          });
          var parameter = {
            'location': latitude+","+longitude
          };
          that.requestWeather(parameter);
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
  requestWeather:function(parameter){
    var that=this;
    wx.request({
      url: 'http://jisutianqi.market.alicloudapi.com/weather/query', 
      method: 'GET',
      data: parameter,
      header:{
          "Authorization":"APPCODE 2f312d25777646fd9bc33bd5da28df4a"
      },
      success: function(res) {
        console.log(res)
        if(res.statusCode==200){
          var w=res.data.result;
          that.setData({
              weather:w,
              city_infor:w.city
          })
        }else{
          wx.showToast({
            title:"服务器错误",
            icon: 'loading',
            duration: 1500
          })
        }
      }
    });
  },
  
  selectCity:function(){
    this.setData({
      city_list_show: true
    })
  },
  select:function(e){
    var parameter = {
      'city': e.currentTarget.dataset.name
    };
    this.requestWeather(parameter);
    this.setData({
      city_list_show: false
    })
  },
  back:function(){
    this.setData({
      city_list_show: false
    })
  },
  position:function(){
    var parameter = {
      'location': this.data.locationInfor
    }
    this.requestWeather(parameter);
    this.setData({
      city_list_show: false
    })
  },
  //监听输入并赋值给input_val
  searchInp:function(e){
    this.setData({
      input_val: e.detail.value 
    })
  },
  //点击搜索
  search:function(){
    var val = this.data.input_val;
    var parameter = {
      'city': val
    }
    this.requestWeather(parameter);
    this.setData({
      input_val: ""
    })
  },
  life:function(e){
    wx.showModal({
      title: e.currentTarget.dataset.name,
      content: e.currentTarget.dataset.infor,
      showCancel:false,
      confirmText: "返回"
    })
  },
  onLoad: function () {
    var that = this
    this.init();
  },
  onShareAppMessage: function () {
      return {
        title: this.data.city_infor+'天气',
        desc: '天气',
        path: '/page/weather/weather'
      }
  }
})
