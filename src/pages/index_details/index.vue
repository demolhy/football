<template>
  <div>
    <web-view src="https://fb.hxweixin.top/images/distH5/football/index.html"></web-view>
  </div>
</template>

<script>
import * as echarts from "echarts/dist/echarts.min";
import mpvueEcharts from "mpvue-echarts";

let chart = null;
let chart1 = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: {
      orient: "vertical",
      itemWidth: 5,
      top: "middle",
      textStyle: {
        color: "#666666",
        fontSize: "10"
      },
      left: 150,
      data: ["盘口上升公司 1家", "盘口不变公司 4家", "盘口下降公司 1家"],
      icon: "circle",
      selectedMode: false
    },
    series: [
      {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        type: "pie",
        radius: ["60%", "50%"],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "outside"
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "盘口上升公司 1家", selected: false },
          { value: 4, name: "盘口不变公司 4家", selected: false },
          { value: 1, name: "盘口下降公司 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);
  console.log('initChart');
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: {
      orient: "vertical",
      itemWidth: 5,
      top: "middle",
      textStyle: {
        color: "#666666",
        fontSize: "10"
      },
      left: 150,
      data: ["盘口上升公司 1家", "盘口不变公司 4家", "盘口下降公司 1家"],
      icon: "circle",
      selectedMode: false
    },
    series: [
      {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        type: "pie",
        radius: ["60%", "50%"],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "outside"
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "盘口上升公司 1家", selected: false },
          { value: 4, name: "盘口不变公司 4家", selected: false },
          { value: 1, name: "盘口下降公司 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);
  console.log('initChart2');
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart3(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: [
      {
        orient: "vertical",
        itemWidth: 5,
        top: "55%",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: "12%",
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      },
      {
        orient: "vertical",
        itemWidth: 5,
        top: "55%",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: "42%",
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      },
      {
        orient: "vertical",
        itemWidth: 5,
        top: "55%",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: "72%",
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      }
    ],
    series: [
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['20%', '30%'],
        radius: ["40%", "30%"],
        avoidLabelOverlap: false,

        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "主胜";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['50%', '30%'],
        radius: ["40%", "30%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "平局";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['80%', '30%'],
        radius: ["40%", "30%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "客胜";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);
  console.log('initChart3');
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart4(canvas, width, height) {
  var pp = this;
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: [{
        subtext: '进攻',
        left: '19%',
        top: '27%',
        textAlign: 'center',
        textStyle:{
          color: '#333'
        }
    }, {
        subtext: '危险\n进攻',
        left: '49%',
        top: '20%',
        textAlign: 'center',
        textStyle:{
          color: '#333'
        }
    },
    {
        subtext: '控球率',
        left: '79%',
        top: '27%',
        textAlign: 'center',
        textStyle:{
          color: '#333'
        }
    }
    ],
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    series: [
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['20%', '50%'],
        radius: ["70%", "60%"],
        avoidLabelOverlap: false,
        label: {
          normal:{
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 0,
            formatter:"{c}",
            },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['50%', '50%'],
        radius: ["70%", "60%"],
        avoidLabelOverlap: false,
        label: {
          normal:{
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 0,
            formatter:"{c}",
            verticalAlign: "middle"
            },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 0,
        top: "0",
        type: "pie",
        center: ['80%', '50%'],
        radius: ["70%", "60%"],
        avoidLabelOverlap: false,
        label: {
          normal:{
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 0,
            formatter:"{c}",
            },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);
  console.log('initChart4');
  // handleCanvarToImg(pp);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function handleCanvarToImg(e) {
  
  wx.canvasToTempFilePath(
    {
      x: 0,
      y: 0,
      // width: 260,
      // height: 180,
      canvasId: "demo-canvas",
      success: function(res) {
        console.log("666" + res.tempFilePath);
        e.radarImg = res.tempFilePath;
        console.log(e.radarImg)
        // that.setData({ radarImg: res.tempFilePath });
        // then.radarImg = res.tempFilePath;
        // return res.tempFilePath;
      }
    },
    this
  );
}

export default {
  mounted() {},
  onShow() {
    var then = this;
    console.log("123" + this.radarImg);
  },
  computed: {},
  components: {
    mpvueEcharts
  },
  created() {},
  data() {
    return {
      key: 3,
      tabs: [
        {
          key: 0,
          name: "阵容"
        },
        {
          key: 1,
          name: "分析"
        },
        {
          key: 2,
          name: "指数"
        },
        {
          key: 3,
          name: "直播"
        },
        {
          key: 4,
          name: "聊天"
        }
      ],
      isActive: false,
      isActive1: false,
      isActive2: false,
      echarts,
      onInit: initChart,
      onInit2: initChart2,
      onInit3: initChart3,
      onInit4: initChart4,
      src: handleCanvarToImg,
      current: 0,
      onhide: '',
      radarImg: "",
      prog1: '60',
      prog2: '40',
      // opts: {
      //   onInit: initChart("column", 400, 300, F2)
      // }
    };
  },
  methods: {
    onBtn(e) {
      // console.log(e)
      this.key = e.currentTarget.dataset.key;
      console.log(this.key)
    },
    onHide(e) {
      console.log(e);
      this.isActive = !this.isActive;
    },
    onHide1(e) {
      console.log(e);
      this.isActive1 = !this.isActive1;
    },
    onHide2(e) {
      console.log(e);
      this.isActive2 = !this.isActive2;
    },
    onChange(e) {
      console.log(e.mp.detail.key);
      this.current = e.mp.detail.key;
      this.onhide = e.mp.detail.key;
    },
    onsrc(e) {
      var then = this;
      console.log(then.radarImg);
      
    },
    toData(){
      wx.navigateTo({
        url: '../details_data/yz_data/main'
      })
    },
    toData1(){
      wx.navigateTo({
        url: '../details_data/oz_data/main'
      })
    },
    toData2(){
      wx.navigateTo({
        url: '../details_data/size_data/main'
      })
    }
  }
};
</script>

<style scoped>
.header {
  background: url("https://fb.hxweixin.top/images/header_background.png")
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.header .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 130rpx 90rpx;
  padding-bottom: 162rpx;
  text-align: center;
}
.header .item img {
  width: 108rpx;
  height: 108rpx;
}
.header .item p {
  color: #fff;
  font-size: 28rpx;
}
.header .item .left p,
.header .item .right p {
  margin-top: 22rpx;
}
.header .item .center p {
  font-size: 20rpx;
}
.header .item .center .title {
  font-size: 48rpx;
  font-weight: bold;
}
.header .btn {
  position: absolute;
  bottom: 60rpx;
  left: 50%;
  transform: translateX(-50%);
}
.header .btn button {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 20rpx;
  width: 150rpx;
  height: 50rpx;
  border-radius: 25rpx;
}
.box_content {
  margin-top: 568rpx;
}
.box_content .nav {
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  background-color: #fff;
  position: fixed;
  top: 460rpx;
  left: 0;
  right: 0;
  z-index: 99999;
}
.box_content .nav div {
  padding: 20rpx 0;
  font-size: 30rpx;
  color: #999999;
  position: relative;
}
.box_content .nav div.on {
  color: #4cb13b;
}
.box_content .nav div.on::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 40rpx;
  left: 10rpx;
  background-color: #4cb13b;
  height: 4rpx;
  animation: btm 200ms;
}
.content {
  display: none;
}
.content.on {
  display: block;
}
@keyframes btm {
  from {
    width: 0;
  }
  to {
    width: 40rpx;
  }
}
.content1 {
  margin-top: 30rpx;
}
.content1 .title {
  background-color: rgba(153, 218, 255, 0.1);
  color: #333333;
  font-size: 24rpx;
  padding: 15rpx 0;
  text-align: center;
}
.content1 .list {
  background-color: #fff;
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}
.content1 .list .left {
  border-right: 2rpx solid rgba(0, 0, 0, 0.1);
}
.content1 .list .left,
.content1 .list .right {
  position: relative;
  flex: 1;
}
.content1 .list p {
  color: #333;
  font-size: 24rpx;
  padding: 15rpx 66rpx;
}
.content1 .list p::before {
  position: absolute;
  content: "1";
  width: 26rpx;
  height: 26rpx;
  line-height: 26rpx;
  text-align: center;
  color: #fff;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  border-radius: 50%;
  font-size: 20rpx;
}
.content1 .list .left p::before {
  background-color: #ff5757;
}
.content1 .list .right p::before {
  background-color: #64c5ee;
}
.content2 {
  margin-top: 30rpx;
  /* background-color: #fff */
}
.content2 .item {
  background-color: #fff;
}
.content2 .item_nav {
  display: flex;
  justify-content: space-between;
  padding: 18rpx 30rpx;
  align-items: center;
  position: relative;
  border-bottom: 2rpx solid #f2f2f2;
}
.content2 .item_nav .left p {
  font-size: 26rpx;
  color: #333333;
  font-weight: bold;
}
.content2 .item_nav .left p::before {
  position: absolute;
  content: "";
  background-color: #4cb13b;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 30rpx;
  width: 4rpx;
}
.content2 .item_nav .right {
  font-size: 20rpx;
  display: flex;
  align-items: center;
}
.content2 .item_nav .right img {
  width: 22rpx;
  height: 12rpx;
  vertical-align: middle;
  transition: all 200ms;
  margin-left: 30rpx;
}
.content2 .item_nav .right img.on {
  transform: rotate(-90deg);
}
.content2 .item_content.on {
  display: none;
}
.content2 .item .item_content .title {
  position: relative;
  padding: 10rpx 30rpx;
  display: flex;
  justify-content: space-between;
  background-color: rgba(153, 218, 255, 0.1);
}
.content2 .item .item_content .title > div {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #333333;
}
.content2 .item .item_content .title > div img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
.content2 .item .item_content .title .center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content2 .item .item_content .title .center img {
  width: 29rpx;
  height: 19rpx;
}
.content2 .item .item_content .primary .list {
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.content2 .item .item_content .primary .list > div {
  flex: 1;
  padding: 30rpx;
}
.content2 .item .item_content .primary .list .left {
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item .item_content .primary .list > div .p1 {
  color: #333;
  font-size: 24rpx;
  font-weight: 500;
}
.content2 .item .item_content .primary .list > div .p2 {
  color: #666;
  font-size: 22rpx;
  margin-top: 15rpx;
}
.content2 .item1 {
  margin-top: 30rpx;
  background-color: #fff;
}
.content2 .item1 .item_content .table {
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}

.content2 .item1 .item_content .table.title > div {
  font-size: 24rpx;
}
.content2 .item1 .item_content .table > div {
  font-size: 22rpx;
  text-align: center;
  color: #333;
  padding: 12rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item1 .item_content .table > div:last-child {
  border: none;
}
.content2 .item1 .item_content .table .t1 {
  width: 20%;
}
.content2 .item1 .item_content .table .t2 {
  width: 20%;
}
.content2 .item1 .item_content .table .t3 {
  width: 20%;
}
.content2 .item1 .item_content .table .t4 {
  width: 20%;
}
.content2 .item1 .item_content .table .t5 {
  width: 20%;
}
.content2 .item1 .item_content .table .t6 {
  width: 16%;
}

.content2 .item_content .btm {
  text-align: center;
  font-size: 22rpx;
  padding: 15rpx 0;
}
.content2 .item2 {
  background-color: #fff;
  margin-top: 30rpx;
}
.content2 .item2 .title {
  padding: 15rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(153, 218, 255, 0.1);
}
.content2 .item2 .title p {
  font-size: 24rpx;
  color: #333333;
}
.content2 .item2 .title img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
.content2 .item2 .item_content .table {
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}

.content2 .item2 .item_content .table.title > div {
  font-size: 24rpx;
}
.content2 .item2 .item_content .table > div {
  font-size: 22rpx;
  text-align: center;
  color: #333;
  padding: 12rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item2 .item_content .table > div:last-child {
  border: none;
}
.content2 .item2 .item_content .table .t1 {
  width: 12%;
}
.content2 .item2 .item_content .table .t2 {
  width: 12%;
}
.content2 .item2 .item_content .table .t3 {
  width: 12%;
}
.content2 .item2 .item_content .table .t4 {
  width: 12%;
}
.content2 .item2 .item_content .table .t5 {
  width: 12%;
}
.content2 .item2 .item_content .table .t6 {
  width: 12%;
}
.content2 .item2 .item_content .btm {
  display: flex;
  font-size: 24rpx;
  padding: 15rpx 30rpx;
}
.content2 .item2 .item_content .btm p {
  margin-right: 110rpx;
}
/* .content3 {
  margin-top: 568rpx;
} */
.content3 .seg {
  display: none;
}
.content3 .seg.on {
  display: block;
}
.content3 .seg_content {
  padding: 0 30rpx;
}

.echarts-wrap {
  width: 100%;
  /* height: 182rpx; */
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}
/* .echarts-wrap canvas{
  height: 182rpx;
} */
.content3 .seg_nav {
  padding: 0rpx 30rpx;
  position: relative;
  margin-bottom: 30rpx;
}
.content3 .seg_nav::before {
  position: absolute;
  content: "";
  left: 0rpx;
  width: 6rpx;
  height: 30rpx;
  top: 55%;
  transform: translateY(-55%);
  background: #4cb13b;
}
.content3 .seg_nav .p1 {
  font-weight: bold;
  font-size: 26rpx;
  color: #333333;
}
.content3 .seg_nav .p2 {
  font-size: 20rpx;
  margin-left: 10rpx;
  color: #666666;
}
.box_data {
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
}
.content3 .seg_content .table {
  display: flex;
  background: #fff;
  border-top: 2rpx solid #f2f2f2;
}
.content3 .seg_content .table > div {
  flex: 1;
  text-align: center;
  font-size: 22rpx;
  color: #333;
  padding: 10rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content3 .seg_content .table > div:last-child {
  border: none;
}
.yz_data {
  margin-top: 30rpx;
}
.yz_content {
  background: #fff;
}
.content3 .yz_data .seg_nav {
  padding-left: 60rpx;
}
.content3 .yz_data .seg_nav::before {
  left: 30rpx;
}
.yz_content .yz_title {
  display: flex;
}
.yz_content .yz_title div {
  width: 40%;
  text-align: center;
  padding: 10rpx 0;
  font-size: 24rpx;
  /* border-right: 2rpx solid #f2f2f2 */
}
.yz_content .yz_title .t1 {
  width: 20%;
  flex: auto;
}
.yz_content .yz_list .list {
  display: flex;
  text-align: center;
  border-top: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list > div {
  width: 13.4%;
  padding: 10rpx 0;
  font-size: 22rpx;
  border-right: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list > div:last-child {
  border: none;
}
.yz_content .yz_list .list .t1 {
  width: 20%;
  flex: auto;
  color: #4cb13b;
  position: relative;
}
.yz_content .yz_list .list .t1::before {
  content: "";
  position: absolute;
  right: 10rpx;
  top: 52%;
  transform: translateY(-52%);
  width: 0;
  height: 0;
  border-width: 10rpx;
  border-color: transparent transparent transparent #4cb13b;
  border-style: solid;
}
.oz_content {
  padding: 0 30rpx;
}
.oz_data {
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}
.oz_data .box {
  text-align: center;
  margin-top: 0rpx;
}
.oz_data .box .title {
  font-size: 22rpx;
  color: #666666;
  margin-bottom: 30rpx;
}
.oz_data .box .t1 {
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.oz_data .box .t1 > div {
  flex: 1;
  font-size: 22rpx;
  color: #333;
  padding: 10rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.oz_data .box .t1 > div:last-child {
  border: none;
}
.oz_data .box .t1.t_title > div {
  color: #666666;
}
.oz_list .seg_nav {
  margin-top: 40rpx;
  padding-left: 60rpx;
}
.oz_list .seg_nav::before {
  left: 30rpx;
}
.oz_list .list_title,
.oz_list .list_box {
  background: #fff;
}
.oz_list .list_title {
  display: flex;
}
.oz_list .list_title > div {
  width: 15.5%;
  /* border-right: 2rpx solid #f2f2f2; */
  padding: 15rpx 0;
  text-align: center;
  font-size: 24rpx;
}
/* .oz_list .list_title>div:last-child{
  border: none
} */
.oz_list .list_title > div.t1 {
  width: 22.53%;
  margin-right: 15.5%;
}

.oz_list .list_box .list {
  position: relative;
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.oz_list .list_box .list .right {
  width: 77.47%;
}
.oz_list .list_box .list .t1 {
  width: 22.53%;
  text-align: center;
  border-right: 2rpx solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  position: relative;
}
.oz_list .list_box .list .t1.t2::after {
  content: "";
  position: absolute;
  right: 10rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-width: 10rpx;
  border-color: transparent transparent transparent #4cb13b;
  border-style: solid;
  z-index: 99;
}
.oz_list .list_box .list .table {
  display: flex;
  width: 100%;
  border-bottom: 2rpx solid #f2f2f2;
}
.oz_list .list_box .list .table:last-child {
  border: none;
}
.oz_list .list_box .list .table > div {
  width: 20%;
  border-right: 2rpx solid #f2f2f2;
  font-size: 22rpx;
  padding: 15rpx 0;
  text-align: center;
}
.live_content .live_header {
  background: #fff;
}
.live_content .live_header .head {
  padding: 30rpx 25rpx;
  display: flex;
  justify-content: space-between;
}
.live_content .live_header .head .left,
.live_content .live_header .head .right {
  display: flex;
  align-items: center;
}
.live_content .live_header .head img {
  width: 24rpx;
  height: 24rpx;
}
.live_content .live_header p {
  font-size: 24rpx;
}
.live_content .live_header .left p {
  color: #fb5a51;
}
.live_content .live_header .right p {
  color: #64c5ee;
}
.live_content .live_header .left img {
  margin-right: 10rpx;
}
.live_content .live_header .right img {
  margin-left: 10rpx;
}
.content_btm {
  position: fixed;
  bottom: 0;
  z-index: 99;
  left: 0;
  right: 0;
}
.content_btm img {
  width: 100%;
  height: 88rpx;
  vertical-align: middle;
}

.content4 .canv{
  /* display: flex; */
  padding-bottom: 20rpx;
}
.content4 .canv .left{
  /* width: 60%; */
  box-sizing: border-box;
  padding: 0 70rpx;
  margin-top: 30rpx;
}
.content4 .canv .right{
  /* width: 40% */
}
.content4 .canv .left .canv_list{
  margin-bottom: 10rpx;
  position: relative;
}
.content4 .canv .left .canv_list .title{
  text-align: center;
  font-size: 22rpx;
  color: #666;
  margin-bottom: 10rpx
}
.content4 .canv .left .canv_list .list_text{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx
}
.content4 .canv .left .canv_list .list_text p{
  font-size: 22rpx;
  color: #333;
  margin-top: 10rpx;
  position: absolute
}
.content4 .canv .left .canv_list .list_text  .p1{
  bottom: -5rpx;
  left: -40rpx;
}
.content4 .canv .left .canv_list .list_text  .p2{
  bottom: -5rpx;
  right: -40rpx;
}
.content4 .canv .left .canv_list .list_prog{
  display: flex;
}
.content4 .canv .left .canv_list .list_prog .prog1{
  background: #FB5A51;
  height: 16rpx;
}
.content4 .canv .left .canv_list .list_prog .prog2{
  background: #64C5EE;
  height: 16rpx;
}
.content4 .canv .left .list_foul{
  display: flex;
  justify-content: space-between;
  padding-bottom: 30rpx
}
.content4 .canv .left .list_foul .text{
  display: flex;
  align-items: center;
}
.content4 .canv .left .list_foul .text img{
  width: 22rpx;
  height: 22rpx;
}
.content4 .canv .left .list_foul .text span{
  margin-left: 5rpx;
  color: #333;
  font-size: 20rpx
}
.content4 .canv .left .list_foul .foul_left,.content4 .canv .left .list_foul .foul_right{
  display: flex
}
.content4 .canv .left .list_foul .foul_left .text{
  margin-right: 20rpx;
  display: flex
}
.content4 .canv .left .list_foul .foul_right .text{
  margin-left: 20rpx;
  display: flex
}
.content4 .live_foul .title{
  position: relative;
  padding: 40rpx 0 30rpx 0;
}
.content4 .live_foul .title p{
  color: #333;
  font-size: 26rpx;
  font-weight: bold;
  padding-left: 60rpx;
  position: relative
}
.content4 .live_foul .title p::after{
  content: "";
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  background: #4CB13B;
  width: 6rpx;
  height: 30rpx;
}
.content4 .live_foul .list_foul_list{
  background: #fff
}
.content4 .live_foul .list_foul_list .list_head{
  display: flex;
}
.content4 .live_foul .list_foul_list .list_head>div{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rpx 0
}
.content4 .live_foul .list_foul_list .list_head img{
  width: 26rpx;
  height: 26rpx;
}
.content4 .live_foul .list_foul_list .list_head span{
  color: #666;
  font-size: 20rpx;
  margin-left: 10rpx;
}
.content4 .live_foul .list_foul_list .list1{
  display: flex;
  border-top: 2rpx solid #f2f2f2
}
.content4 .live_foul .list_foul_list .list1>div{
  display: flex;
  align-items: center;
  padding: 15rpx 0;
  text-align: center
}
.content4 .live_foul .list_foul_list .list1 .time{
  justify-content: center;
  width: 10%;
  border-right: 2rpx solid #f2f2f2;
  font-size: 20rpx
}
.content4 .live_foul .list_foul_list .list1 .data{
  padding: 0 30rpx;
  justify-content: space-between;
  align-items: center;
  width: 90%
}
.content4 .live_foul .list_foul_list .list1 .data img{
  width: 26rpx;
  height: 26rpx;
}
.content4 .live_foul .list_foul_list .list1 .data span{
  color: #333;
  font-size: 24rpx;
  margin-left: 10rpx;
}
</style>
