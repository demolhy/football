<template>
  
  <div>
    <web-view src="https://fb.hxweixin.top/images/distH5/basketball/index.html"></web-view>
  </div>
    

</template>

<script>
import * as echarts from "echarts/dist/echarts.min";
import mpvueEcharts from "mpvue-echarts";

let chart = null;
let chart1 = null;

export default {
  mounted() {},
  onShow() {},
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
          name: "统计"
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
      isActive3: false,
      echarts,
      onInit: this.initChart,
      onInit2: this.initChart2,
      onInit3: this.initChart3,
      onInit4: this.initChart4,
      // src: handleCanvarToImg,
      current: 0,
      current1: 0,
      onhide: 0,
      radarImg: "",
      prog1: "60",
      prog2: "40",
      imgsrc: '',
      isShow: true
      // opts: {
      //   onInit: initChart("column", 400, 300, F2)
      // }
    };
  },
  methods: {
    initChart(canvas, width, height) {
      let then = this;
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      console.log(canvas);
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
            center: ["20%", "50%"],
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
      console.log("initChart");
      setTimeout(function() {
        
        then.handleCanvarToImg(canvas.canvasId,width,height);
        
        
      },1000);
      
      return chart; // 返回 chart 后可以自动绑定触摸操作
    },
    initChart2(canvas, width, height) {
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
            center: ["20%", "50%"],
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
      console.log("initChart2");
      return chart; // 返回 chart 后可以自动绑定触摸操作
    },
    initChart3(canvas, width, height) {
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
            top: "95",
            textStyle: {
              color: "#666666",
              fontSize: "10"
            },
            left: "17%",
            data: ["上升 1家", "不变 1家", "下降 1家"],
            icon: "circle",
            selectedMode: false
          },
          {
            orient: "vertical",
            itemWidth: 5,
            top: "95",
            textStyle: {
              color: "#666666",
              fontSize: "10"
            },
            left: "67%",
            data: ["上升 1家", "不变 1家", "下降 1家"],
            icon: "circle",
            selectedMode: false
          }
        ],
        series: [
          {
            left: "0%",
            right: "0%",
            top: 0,
            bottom: 0,
            type: "pie",
            center: ["25%", "30%"],
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
            left: "0%",
            right: "0%",
            top: 0,
            bottom: 0,
            type: "pie",
            center: ["75%", "30%"],
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
      console.log("initChart3");

      return chart; // 返回 chart 后可以自动绑定触摸操作
    },
    initChart4(canvas, width, height) {
      var pp = this;
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);

      var option = {
        title: [
          {
            subtext: "犯规数",
            left: "47%",
            top: "21%",
            textAlign: "center",
            textStyle: {
              color: "#333"
            }
          },
          {
            subtext: "剩余\n暂停",
            left: "47%",
            top: "58%",
            textAlign: "center",
            textStyle: {
              color: "#333"
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
            center: ["50%", "30%"],
            radius: ["40%", "30%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: "outer",
                alignTo: "labelLine",
                bleedMargin: 5,
                formatter: "{c}"
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
              { value: 1, selected: false },
              { value: 4, selected: false }
            ],
            color: ["#FF5858", "#64C4ED"],
            hoverAnimation: false,
            legendHoverLink: false
          },
          {
            left: 0,
            top: "0",
            type: "pie",
            center: ["50%", "70%"],
            radius: ["40%", "30%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: "outer",
                alignTo: "labelLine",
                bleedMargin: 5,
                formatter: "{c}"
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
              { value: 1, selected: false },
              { value: 4, selected: false }
            ],
            color: ["#FF5858", "#64C4ED"],
            hoverAnimation: false,
            legendHoverLink: false
          }
        ]
      }; // ECharts 配置项

      chart.setOption(option);

      console.log("initChart4");

      return chart; // 返回 chart 后可以自动绑定触摸操作
    },
    handleCanvarToImg(id, width, height) {
      let then = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        canvasId: id,
        success: function (res) {
          console.log("666" + res.tempFilePath);
          then.isShow = false;
          then.imgsrc = res.tempFilePath;
          console.log(this.isShow)
          console.log(then.imgsrc)
          // e.radarImg = res.tempFilePath;
          // console.log(e.radarImg);
          // that.setData({ radarImg: res.tempFilePath });
          // then.radarImg = res.tempFilePath;
          // return res.tempFilePath;
        }
      });
    },
    onBtn(e) {
      // console.log(e)
      this.key = e.currentTarget.dataset.key;
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
    onHide3(e) {
      console.log(e);
      this.isActive3 = !this.isActive3;
    },
    onChange(e) {
      console.log(e.mp.detail.key);
      this.current = e.mp.detail.key;
      this.onhide = e.mp.detail.key;
      // if(this.onhide == 0){
      //   initChart;
      //   console.log(123)
      // }else if(this.onhide == 1){
      //   initChart3;
      // }else if(this.onhide == 2){
      //   initChart2;
      // }
    },
    onChange1(e) {
      // console.log(e.mp.detail.key);
      this.current1 = e.mp.detail.key;
      // this.onhide = e.mp.detail.key;
      // if(this.current){
      //   initChart3;
      //   console.log(123)
      // }
    },
    onsrc(e) {
      var then = this;
      console.log(then.radarImg);
    },
    toData() {
      wx.navigateTo({
        url: "../basketball_details_data/yz_data/main"
      });
    },
    toData1() {
      wx.navigateTo({
        url: "../basketball_details_data/oz_data/main"
      });
    },
    toData2() {
      wx.navigateTo({
        url: "../basketball_details_data/size_data/main"
      });
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
.header .time {
  position: absolute;
  top: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 20rpx;
  padding: 15rpx;
  border-radius: 6rpx;
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
  margin-top: 30rpx;
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
  font-size: 22rpx;
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
  /* align-items: center */
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
  width: 15%;
}
.content2 .item1 .item_content .table .t5 {
  width: 20%;
}
.content2 .item1 .item_content .table .t6 {
  width: 15%;
}
.content2 .item1 .item_content .table .t7 {
  width: 15%;
}
.content2 .item1 .item_content .table.title > div {
  border: none;
}
.content2 .item1 .item_content .table > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content2 .item1 .item_content .table .t1 .text {
  display: block;
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
  width: 16.66%;
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
.yz_content .yz_title .t2 {
  display: flex;
}
.yz_content .yz_title .t2 > p {
  flex: 1;
  white-space: nowrap;
}
.yz_content .yz_title .t2.bor {
  border-right: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list {
  display: flex;
  text-align: center;
  border-top: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list > div {
  /* padding: 10rpx 0; */
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
  display: flex;
  align-items: center;
  justify-content: center;
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
.yz_content .yz_list .list .t2 {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  width: 40%;
  position: relative;
}
.yz_content .yz_list .list .t2::after {
  content: "";
  position: absolute;
  background: #f2f2f2;
  height: 2rpx;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.yz_content .yz_list .list .t2 > div {
  width: 33.33%;
  padding: 10rpx 0;
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
.live_content .live_header img {
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
.content2 .item_list.on {
  display: none;
}
.content2 .item_list .list1 .list_title {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #333;
  padding: 15rpx 0;
  background: rgba(153, 218, 255, 0.1);
}
.content2 .item_list .list1 .list_title img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
.content2 .item_list .list1 .table .tr {
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}
.content2 .item_list .list1 .table .tr > div {
  padding: 15rpx 0;
  font-size: 20rpx;
  color: #333;
  text-align: center;
  width: 10%;
  border-left: 2rpx solid #f2f2f2;
  font-weight: 400;
}
.content2 .item_list .list1 .table .tr > div:first-child {
  width: 20%;
  border: none;
}
.content2 .item_list .list1 .table .tr.table_head > div {
  border: none;
  font-weight: 500;
  font-size: 22rpx;
}
.ball_box .box_head {
  margin-bottom: 30rpx;
}
.ball_box .box_head .title {
  position: relative;
  margin-bottom: 33rpx;
}
.ball_box .box_head .title::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 30rpx;
  width: 6rpx;
  height: 30rpx;
  background: rgba(76, 177, 59, 1);
}
.ball_box .box_head .title p {
  margin-left: 55rpx;
  font-size: 26rpx;
  color: #333;
  font-weight: bold;
}
.ball_box .box_head .item {
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
}
.ball_box .box_head .item .left,
.ball_box .box_head .item .right {
  display: flex;
  align-items: center;
}
.ball_box .box_head .item .left p,
.ball_box .box_head .item .right p {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 0rpx;
}
.ball_box .box_head .item .left span,
.ball_box .box_head .item .right span {
  font-size: 24rpx;
  color: #999;
}
.ball_box .box_head .item img {
  width: 108rpx;
  height: 108rpx;
}
.ball_box .box_head .item .left_p {
  margin-left: 20rpx;
}
.ball_box .box_head .item .right_p {
  margin-right: 20rpx;
}
.ball_box .box_head .record {
  background: #fff;
  padding: 20rpx 60rpx;
  display: flex;
  justify-content: space-between;
  border-top: 2rpx solid #f2f2f2;
}
.ball_box .box_head .record div {
  font-size: 24rpx;
  color: #999;
}
.ball_box .box_head .record div:last-child {
  color: #333;
}
.ball_box .item1 .item_record {
  padding: 10rpx 30rpx;
  background: rgba(153, 218, 255, 0.1);
  display: flex;
  align-items: center;
}
.ball_box .item1 .item_record img {
  width: 34rpx;
  height: 34rpx;
}
.ball_box .item1 .item_record p {
  font-size: 22rpx;
  color: #333;
  margin-left: 20rpx;
}
.content4 .head_table .title {
  display: flex;
  text-align: center;
  border-bottom: 2rpx solid #f2f2f2;
}
.content4 .head_table .title > div {
  width: 14.28%;
  font-size: 24rpx;
  color: #333;
  padding: 10rpx 0;
}
.content4 .head_table .title.bor > div {
  border-right: 2rpx solid #f2f2f2;
  font-size: 22rpx;
}
.content4 .head_table .title.bor > div:last-child {
  border-right: none;
}
.content4 .head_table .title > div:first-child {
  width: 28.57%;
}
.content4 .canv {
  display: flex;
  padding-bottom: 20rpx;
}
.content4 .canv .left {
  width: 60%;
  box-sizing: border-box;
  padding: 0 30rpx;
}
.content4 .canv .right {
  width: 40%;
}
.content4 .canv .left .canv_list {
  margin-bottom: 10rpx;
}
.content4 .canv .left .canv_list .title {
  text-align: center;
  font-size: 22rpx;
  color: #666;
  margin-bottom: 10rpx;
}
.content4 .canv .left .canv_list .list_text {
  display: flex;
  justify-content: space-between;
}
.content4 .canv .left .canv_list .list_text p {
  font-size: 22rpx;
  color: #333;
  margin-top: 10rpx;
}
.content4 .canv .left .canv_list .list_prog {
  display: flex;
}
.content4 .canv .left .canv_list .list_prog .prog1 {
  background: #fb5a51;
  height: 16rpx;
}
.content4 .canv .left .canv_list .list_prog .prog2 {
  background: #64c5ee;
  height: 16rpx;
}
.content4 .live_data {
  margin-top: 30rpx;
}
.content4 .data_list {
  background: #fff;
  padding: 40rpx 30rpx;
}
.content4 .data_list .box {
  margin-left: 35rpx;
}
.content4 .data_list .box .top {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #333;
}
.content4 .data_list .box .con {
  background: #f2f2f2;
  margin-top: 20rpx;
  padding: 15rpx 10rpx;
  position: re;
}
.content4 .data_list .box .con p {
  font-size: 24rpx;
  color: #333;
}
.canvas-hide{
  display: none
}
</style>
