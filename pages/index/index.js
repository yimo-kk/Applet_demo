// index.js
// 获取应用实例
const app = getApp()
const address = require('../../data/adderss.js')
Page({
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
 
    multiArray: [],
    multiIndex: [0, 0, 0, 0],
    chinaData: []
  },
  bindPicker() {
    let value = !this.data.isPicker
    // let value = true
    this.setData({ isPicker: value })
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      // url: '../logs/logs'
    })
  },
  onLoad() {
    this.getSheng(address);
    
  },
  /*
   四级联动代码
 */
  bindMultiPickerChange: function (e) { //  确认更改
    console.log(e);
  },
  bindMultiPickerColumnChange: function (e) { //  列表滑动
    var move = e.detail;
    var index = move.column;
    var value = move.value;
    if (index == 0) {
      this.setData({
        multiIndex: [value, 0, 0, 0]
      })
      this.getCity();
    }
    if (index == 1) {
      this.setData({
        "multiIndex[1]": value,
        "multiIndex[2]": 0,
        "multiIndex[3]": 0
      })
      this.getXian();
    }
    if (index == 2) {
      this.setData({
        "multiIndex[2]": value,
        "multiIndex[3]": 0,

      })
      this.getZhen();
    }
    if (index == 3) {
      this.setData({
        "multiIndex[3]": value
      })
      this.getZhen();
    }
  },
  // getSiteData: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json',
  //     success: res => {
  //       var chinaData = res.data;
  //       this.data.chinaData = chinaData;
  //       var sheng = []; //  设置省数组
  //       for (var i = 0; i < chinaData.length; i++) {
  //         sheng.push(chinaData[i].name);
  //       }
  //       this.setData({
  //         "multiArray[0]": sheng
  //       })
  //       that.getCity(); // 得到市
  //     }
  //   })
  // },
  // 获取省
  getSheng:function(chinaData){
    this.data.chinaData = chinaData;
    var sheng = []; //  设置省数组
        for (var i = 0; i < chinaData.length; i++) {
          sheng.push(chinaData[i].name);
        }
        this.setData({
          "multiArray[0]": sheng
        })
        this.getCity(); // 得到市
  },
  getCity: function () { //  得到市
    var shengNum = this.data.multiIndex[0];
    var chinaData = this.data.chinaData;
    var cityData = chinaData[shengNum].children;
    var city = [];
    for (var i = 0; i < cityData.length; i++) {
      city.push(cityData[i].name)
    }
    this.setData({
      "multiArray[1]": city
    })
    this.getXian();
  },
  getXian: function (e) { //  得到县
    var shengNum = this.data.multiIndex[0];
    var cityNum = this.data.multiIndex[1];
    var chinaData = this.data.chinaData;
    var xianData = chinaData[shengNum].children[cityNum].children;
    var xian = [];
    for (var i = 0; i < xianData.length; i++) {
      xian.push(xianData[i].name)
    }
    this.setData({
      "multiArray[2]": xian
    })
    this.getZhen();
  },
  getZhen: function () { //  得到镇
    var shengNum = this.data.multiIndex[0];
    var cityNum = this.data.multiIndex[1];
    var xianNum = this.data.multiIndex[2];
    var chinaData = this.data.chinaData;
    var zhenData = chinaData[shengNum].children[cityNum].children[xianNum].children;
    var zhen = [];
    for (var i = 0; i < zhenData.length; i++) {
      zhen.push(zhenData[i].name)
    }
    this.setData({
      "multiArray[3]": zhen
    })
  },
})
