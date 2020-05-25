<template>
  <div>
    <wux-tabs wux-class="bordered" controlled :current="key" @change="onTabsChange">
      <block v-for="item in tabs" :key="item.key">
        <wux-tab :key="item.key" :title="item.title"></wux-tab>
      </block>
    </wux-tabs>

    <div class="screen" @click="toScreen">
      <img src="../../../static/images/index/screen_img.png" alt />
    </div>

    <!-- 即时 -->
    <div class="content1 content" v-if="index == 0" :class="index == 0 ? 'on' : ''">
      <block v-for="item in conList" :key="item.key">
        <div class="list" v-if="item['22']" @click="toDetail" :data-id="item['0']">
          <div class="header">
            <div class="left">
              <img src="../../../static/images/index/header_img1.png" alt />
              <span>{{item["2"][0]}}</span>
            </div>
            <div class="center">
              <p :class="item['33']">{{item['30']}}</p>
            </div>
            <div class="right">
              <div class="icon1 icon on" @change="top"></div>
              <div class="icon2 icon" @change="coll"></div>
            </div>
          </div>
          <div class="box-content">
            <div class="main item">
              <p class="left">{{item["5"][0]}}</p>
              <p class="center" :class="item['32']">{{item["12"]}}</p>
              <p class="right">{{item["6"][0]}}</p>
            </div>
            <div class="btm item">
              <p class="left" :class="item['31']">{{item["10"]}}</p>
              <p class="center" v-show="item[15] || item[14]">半 {{item["13"]}}</p>
              <div class="right">
                <p v-show="item[14]">红 {{item["14"]}}</p>
                <p v-show="item[15]">黄 {{item["15"]}}</p>
                <p v-show="item[16]">角 {{item["16"]}}</p>
              </div>
            </div>
          </div>
        </div>
      </block>
      <!-- <div class="list">
        <div class="header">
          <div class="left">
            <img src="../../../static/images/index/header_img2.png" alt />
            <span>欧俱杯</span>
          </div>
          <div class="center">
            <p>第4节 05:44′</p>
          </div>
          <div class="right">
            <div class="icon1 icon" @change="top"></div>
            <div class="icon2 icon" @change="coll"></div>
          </div>
        </div>
        <div class="box-content">
          <div class="main item">
            <p class="left">哈迪拉</p>
            <p class="center">1:2</p>
            <p class="right">内斯兹奥纳</p>
          </div>
          <div class="btm item">
            <p class="left">11:00</p>
            <p class="center">半 0:0</p>
            <div class="right">
              <p>红 0:0</p>
              <p>黄 0:0</p>
              <p>角 0:0</p>
            </div>
          </div>
        </div>
      </div>-->
    </div>

    <!-- </scroll-view> -->

    <!-- 已赛 -->

    <div class="content1 content" v-if="index == 1" :class="index == 1 ? 'on' : ''">
      <div class="times_nav">
        <block v-for="item in timesend" :key="item.id">
          <div
            class="item"
            :class="changeKey == item.id ? 'on':''"
            @click="onChangetime"
            :id="item.id"
            :data-id="item.years"
          >
            <div>
              <p class="date">{{item.date}}</p>
              <p class="week">{{item.week}}</p>
            </div>
          </div>
        </block>
      </div>
      <div class>
        <block v-for="item in conList" :key="item.key">
          <div class="list" @click="toDetail" :data-id="item['0']">
            <div class="header">
              <div class="left">
                <img src="../../../static/images/index/header_img1.png" alt />
                <span>{{item["2"][0]}}</span>
              </div>
              <div class="center">
                <p :class="item['33']">{{item['30']}}</p>
              </div>
              <div class="right">
                <div class="icon1 icon on" @change="top"></div>
                <div class="icon2 icon" @change="coll"></div>
              </div>
            </div>
            <div class="box-content">
              <div class="main item">
                <p class="left">{{item["5"][0]}}</p>
                <p class="center" :class="item['32']">{{item["12"]}}</p>
                <p class="right">{{item["6"][0]}}</p>
              </div>
              <div class="btm item">
                <p class="left" :class="item['31']">{{item["10"]}}</p>
                <p class="center" v-show="item[15] || item[14]">半 {{item["13"]}}</p>
                <div class="right">
                  <p v-show="item[14]">红 {{item["14"]}}</p>
                  <p v-show="item[15]">黄 {{item["15"]}}</p>
                  <p v-show="item[16]">角 {{item["16"]}}</p>
                </div>
              </div>
            </div>
          </div>
        </block>
      </div>
    </div>

    <!-- 赛程 -->

    <div class="content1 content" v-if="index == 2" :class="index == 2 ? 'on' : ''">
      <div class="times_nav">
        <block v-for="item in times" :key="item.id">
          <div
            class="item"
            :class="changeKey == item.id ? 'on':''"
            @click="onChangetimeAll"
            :id="item.id"
            :data-id="item.years"
          >
            <div>
              <p class="date">{{item.date}}</p>
              <p class="week">{{item.week}}</p>
            </div>
          </div>
        </block>
      </div>
      <div class="content_already">
        <block v-for="item in conList" :key="item.key">
          <div class="list" @click="toDetail" :data-id="item['0']">
            <div class="header">
              <div class="left">
                <img src="../../../static/images/index/header_img1.png" alt />
                <span>{{item["2"][0]}}</span>
              </div>
              <div class="center">
                <p class="grey">未开</p>
              </div>
              <div class="right">
                <div class="icon1 icon on" @change="top"></div>
                <div class="icon2 icon" @change="coll"></div>
              </div>
            </div>
            <div class="box-content">
              <div class="main item">
                <p class="left">{{item["5"][0]}}</p>
                <p class="center grey1">VS</p>
                <p class="right">{{item["6"][0]}}</p>
              </div>
              <div class="btm item">
                <p class="left time_on">{{item["10"]}}</p>
                <p class="center" v-show="item[15] || item[14]">半 {{item["13"]}}</p>
                <div class="right">
                  <p v-show="item[14]">红 {{item["14"]}}</p>
                  <p v-show="item[15]">黄 {{item["15"]}}</p>
                  <p v-show="item[16]">角 {{item["16"]}}</p>
                </div>
              </div>
            </div>
          </div>
        </block>
      </div>
    </div>

    <!-- 关注 -->

    <div class="content4 content" v-if="index == 3" v-bind:class="index == 3 ? 'on' : ''">
      <!-- <div class="info">2019-12-17 星期二(共6场)</div> -->
      <div class="content-list">
        <!-- <div class="list1 list">
          <div class="header">
            <div class="left">
              <img src="../../../static/images/index/header_img1.png" alt />
              <span>欧俱杯</span>
            </div>
            <div class="center">
              <p>第4节 05:44′</p>
            </div>
            <div class="right">
              <div class="icon1 icon on" @change="top"></div>
              <div class="icon2 icon on" @change="coll"></div>
            </div>
          </div>
          <div class="box-content">
            <div class="main item">
              <p class="left">哈迪拉</p>
              <p class="center">1:2</p>
              <p class="right">内斯兹奥纳</p>
            </div>
            <div class="btm item">
              <p class="left">11:00</p>
              <p class="center">半 0:0</p>
              <div class="right">
                <p>红 0:0</p>
                <p>黄 0:0</p>
                <p>角 0:0</p>
              </div>
            </div>
          </div>
        </div>
        <div class="list2 list">
          <div class="header">
            <div class="left">
              <img src="../../../static/images/index/header_img1.png" alt />
              <span>欧俱杯</span>
            </div>
            <div class="center">
              <p>完</p>
            </div>
            <div class="right">
              <div class="icon1 icon on" @change="top"></div>
              <div class="icon2 icon on" @change="coll"></div>
            </div>
          </div>
          <div class="box-content">
            <div class="main item">
              <p class="left">哈迪拉</p>
              <p class="center">1:2</p>
              <p class="right">内斯兹奥纳</p>
            </div>
            <div class="btm item">
              <p class="left">11:00</p>
              <p class="center">半 0:0</p>
              <div class="right">
                <p>红 0:0</p>
                <p>黄 0:0</p>
                <p>角 0:0</p>
              </div>
            </div>
          </div>
        </div>
        <div class="list3 list">
          <div class="header">
            <div class="left">
              <img src="../../../static/images/index/header_img1.png" alt />
              <span>欧俱杯</span>
              <span class="time">11:00</span>
            </div>
            <div class="center">
              <p>未开</p>
            </div>
            <div class="right">
              <div class="icon1 icon on" @change="top"></div>
              <div class="icon2 icon on" @change="coll"></div>
            </div>
          </div>
          <div class="box-content">
            <div class="main item">
              <p class="left">哈迪拉</p>
              <p class="center">VS</p>
              <p class="right">内斯兹奥纳</p>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>


<script>
import timestamp from "@/utils/index";

export default {
  data() {
    return {
      // time,
      key: "",
      index: 0,
      motto: "Hello miniprograme",
      isActive: 0,
      current: "0",
      tabs: [
        {
          key: "0",
          title: "即时",
          content: "Content of tab 1"
        },
        {
          key: "1",
          title: "已赛",
          content: "Content of tab 2"
        },
        {
          key: "2",
          title: "赛程",
          content: "Content of tab 3"
        },
        {
          key: "3",
          title: "关注",
          content: "Content of tab 4"
        }
      ],
      times: [],
      conList: [],
      conList_end: [],
      conList_all: [],
      conList_coll: [],
      changeKey: 0,
      timesend: [],
      idArr: []
    };
  },

  components: {},

  created() {
    console.log(321);
    console.log("repeat", this);
  },

  onLoad(e) {
    // console.log("page index onLoad", this);

    this.getDataList("fbdata/jishiList", "");
    this.getTimes();
    this.getTimesEnd();

    // console.log(e.model)
    if (e.model != null) {
      let arr = e.model.split(",");
      this.idArr = arr;
    }
  },
  updated() {
    if (this.index == 1) {
      // this.getDataList("fbdata/saiguoList");
    }
  },
  computed: {
    // time
  },

  methods: {
    getDataList(url, data) {
      this.$httpWX
        .post({
          url: url,
          data: data
        })
        .then(res => {
          console.log(res);
          // let = length
          let newtime = new Date();
          let hour = newtime.getHours(); //得到小时
          let minu = newtime.getMinutes(); //得到分钟
          let ntime = [hour, minu].join(":");
          let day = Math.round(newtime.getTime() / 1000);

          this.conList = res.data;

          console.log(this.idArr);
          this.conList.map((item, index) => {
            
            
            if(this.idArr != null){
              this.idArr.map(setItem => {
                if (item["1"] == setItem) {
                  item["22"] = true;
                }else{
                  // item["22"] = false
                }
                // item['22'] = setItem
                // console.log(setItem)
              });
            }else{
              
            }
            if(this.idArr == ''){
              item["22"] = true
            }
            let ctime = timestamp.formatTime(item["10"]);
            let starting;
            item["10"] = ctime;

            // console.log(item["9"]);
            switch (item["9"]) {
              case -1:
                // console.log("完场");
                // this.timeStatus = '完'
                item["30"] = "完";
                item["31"] = "";
                item["32"] = "red1";
                item["33"] = "grey";
                break;
              case 0:
                // console.log("未开");
                item["30"] = "未开";
                item["31"] = "time_on";
                item["32"] = "grey1";
                item["33"] = "grey";
                item["12"] = "VS";
                break;
              case 1:
                starting = (day - item["11"]) / 60;
                item["31"] = "";
                item["32"] = "red1";
                item["33"] = "green1";
                if (starting > 45) {
                  item["30"] = "45+";
                } else {
                  item["30"] = "1";
                }
                // let otime = timestamp.formatTime(starting);
                // console.log("上半场：" );
                break;
              case 2:
                // console.log("中场");
                item["30"] = "中";
                item["31"] = "";
                item["32"] = "red1";
                item["33"] = "green1";
                break;
              case 3:
                // starting = ntime - ctime;
                // console.log("下半场：");
                item["31"] = "";
                item["32"] = "red1";
                item["33"] = "green1";
                starting = (day - item["11"]) / 60;
                if (starting > 90) {
                  item["30"] = "90+";
                } else {
                  item["30"] = "46";
                }
                break;
              case -14:
                // starting = ntime - ctime;
                // console.log("推迟");
                item["30"] = "推迟";
                item["31"] = "time_on";
                item["32"] = "grey1";
                item["33"] = "grey";
                item["12"] = "VS";
                break;
              default:
              // console.log("未知");
            }
          });
          // console.log(this.conList)
        });
    },

    btn(e) {
      this.isActive = e.currentTarget.dataset.id;
    },
    onTabsChange(e) {
      console.log("onTabsChange", e);
      var then = this;
      const { key } = e.target.key;
      const index = then.tabs.indexOf(key);

      this.key = e.target.key;
      this.index = e.target.key;

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let years = year + "-" + month + "-" + day + "";

      // console.log(years)

      let listArr = [
        {
          data: "",
          url: "fbdata/jishiList"
        },
        {
          data: {
            date: years
          },
          url: "fbdata/saiguoList"
        },
        {
          data: {
            date: years
          },
          url: "fbdata/saichengList"
        },
        {
          data: "",
          url: "fbdata/followGameList"
        }
      ];
      // console.log(listArr[this.key].data);
      this.getDataList(listArr[this.key].url, listArr[this.key].data);
      // console.log(this.key + "和" + this.index);
    },
    getTimes() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let week = date.getDay();
      console.log("week" + week);
      let timearr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      // console.log(timestr);
      for (var i = 0; i < 7; i++) {
        let days = day + i;
        let timestr = month + "-" + days;
        let years = year + "-" + month + "-" + days;
        if (week + i >= 7) {
          week = week - 7;
        }
        this.times.push({
          id: i,
          date: timestr,
          week: timearr[week + i],
          year: years
        });
      }
      // this.times.map((item, index) => {
      //   let days = day + index;
      //   let years = year + "-" + month + "-" + days;

      //     item.id= day + index,
      //     item.date= month + "-" + days,
      //     item.week= timearr[day],
      //     item.years= years
      //   console.log(this.times);
      // });
    },
    getTimesEnd() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let week = date.getDay();
      // console.log('week'+week)
      let timearr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      // console.log(timestr);
      for (var i = 0; i < 7; i++) {
        let days = day - i;
        let timestr = month + "-" + days;
        let years = year + "-" + month + "-" + days;
        if (week - i <= -1) {
          week = week + 7;
        }
        this.timesend.push({
          id: i,
          date: timestr,
          week: timearr[week - i],
          year: years
        });
      }
      // console.log(this.timesend);
    },
    onChangetime(e) {
      this.changeKey = e.mp.currentTarget.id;
      // console.log(e);
      // let num = e.mp.currentTarget.id
      let date = this.timesend[e.mp.currentTarget.id].year;
      let dateArr = [
        {
          date: date
        }
      ];
      console.log(dateArr);
      this.getDataList("fbdata/saiguoList", dateArr[0]);
    },
    onChangetimeAll(e) {
      this.changeKey = e.mp.currentTarget.id;
      // console.log(e);
      // let num = e.mp.currentTarget.id
      let date = this.times[e.mp.currentTarget.id].year;
      let dateArr = [
        {
          date: date
        }
      ];
      console.log(dateArr);
      this.getDataList("fbdata/saichengList", dateArr[0]);
    },
    toDetail(e) {
      console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id;
      let url = "../index_details/main?id=" + id;
      wx.navigateTo({
        url: url,
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log("success");
        },
        fail: function(e) {
          console.log(e);
        }
      });
      console.log(123);
    },
    toScreen() {
      wx.navigateTo({
        url: "../screen/main",
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log("success");
        },
        fail: function(e) {
          console.log(e);
        }
      });
    }
  }
};
</script>

<style scoped>
/* @import './main.css'; */
.content {
  margin-top: 86rpx;
  display: none;
}
.content.on {
  display: block;
}
.content .list {
  margin-top: 10rpx;
  background-color: #fff;
  position: relative;
}
.content .list .header {
  display: flex;
  justify-content: space-between;
  padding: 14rpx 30rpx;
  align-items: center;
  border-bottom: 2rpx dashed rgba(0, 0, 0, 0.1);
  position: relative;
}
.content .list .header .left {
  display: flex;
  align-items: center;
}
.content .list .header .left image {
  width: 30rpx;
  height: 27rpx;
  margin-right: 30rpx;
}
.content .list .header .left span {
  color: #666666;
  font-size: 22rpx;
}
.content .list .header .center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content .list .header .center p {
  color: #4cb13b;
  font-size: 20rpx;
}
.content .list .header .right {
  display: flex;
  align-items: center;
}
.content .list .header .right .icon {
  width: 32rpx;
  height: 32rpx;
  background-size: 100% 100%;
}
.content .list .header .right .icon1 {
  background-image: url("https://fb.hxweixin.top/images/header_right1.png");
}
.content .list .header .right .icon1.on {
  background-image: url("https://fb.hxweixin.top/images/header_right1_active.png");
}
.content .list .header .right .icon2 {
  background-image: url("https://fb.hxweixin.top/images/header_right2.png");
  margin-left: 40rpx;
}
.content .list .header .right .icon2.on {
  background-image: url("https://fb.hxweixin.top/images/header_right2_active.png");
}
.box-content {
  padding: 23rpx 30rpx 19rpx 30rpx;
}
.box-content .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.box-content .item .center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.box-content .main {
  position: relative;
}
.box-content .main .left {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
}
.box-content .main .center {
  color: #ff5353;
  font-size: 44rpx;
  letter-spacing: 10rpx;
  font-weight: bold;
}
.box-content .main .right {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
}
.box-content .btm {
  color: #666666;
  margin-top: 20rpx;
}
.box-content .btm .left {
  font-size: 22rpx;
}
.box-content .btm .center {
  font-size: 20rpx;
}
.box-content .btm .right {
  display: flex;
}
.box-content .btm .right p {
  font-size: 20rpx;
  margin-left: 20rpx;
}
.content2,
.content3 {
  margin-top: 76rpx;
}
.content .times_nav {
  white-space: nowrap;
  overflow-x: auto;
  width: auto;
  padding: 10rpx 0;
  border-top: 2rpx solid rgba(0, 0, 0, 0.1);
  background: #fff;
}
.content .times_nav::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.content .times_nav .item {
  width: 115rpx;
  text-align: center;
  display: inline-block;
}

.content .times_nav .item p {
  color: #666666;
}
.content .times_nav .item.on p {
  color: #4cb13b;
}
.content .times_nav .item .date {
  font-size: 24rpx;
}
.content .times_nav .item .week {
  font-size: 20rpx;
  margin-top: 14rpx;
}
.content2 .content_already .header .center p {
  color: #666666;
  font-size: 22rpx;
}

.content3 .box-content {
  padding: 23rpx 30rpx 33rpx 30rpx;
}
.content3 .box-content .center {
  color: #999999;
  letter-spacing: inherit;
}
.content3 .header .left .time {
  margin-left: 52rpx;
}
.content3 .list .header .center p {
  color: #666666;
}

.content4 {
  margin-top: 76rpx;
}
.content4 .info {
  padding: 20rpx 30rpx;
  padding-bottom: 10rpx;
  font-size: 20rpx;
  color: #333333;
}
.content4 .content-list .list2 .header .center p {
  color: #666666;
  font-size: 22rpx;
}
.content4 .content-list .list3 .header .center p {
  color: #666666;
  font-size: 22rpx;
}

.content4 .content-list .list3 .box-content .center {
  color: #999999;
  letter-spacing: inherit;
}
.content4 .content-list .list3 .box-content {
  padding: 23rpx 30rpx 33rpx 30rpx;
}
.screen {
  position: fixed;
  bottom: 220rpx;
  right: 30rpx;
  z-index: 999;
}
.screen img {
  width: 74rpx;
  height: 74rpx;
}
.box-content .btm .left.time_on {
  position: absolute;
  top: -125rpx;
  left: 210rpx;
}
.grey {
  color: #666 !important;
}
.grey1 {
  color: #999 !important;
}
.red1 {
  color: #ff5353;
}
.green1 {
  color: #4cb13b;
}
</style>
