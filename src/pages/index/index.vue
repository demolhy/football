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
    <div class="content1 content" :class="index == 0 ? 'on' : ''">
      <div class="list" @click="toDetail">
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
      <div class="list">
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
      </div>
    </div>

    <!-- </scroll-view> -->

    <!-- 已赛 -->

    <div class="content2 content" :class="index == 1 ? 'on' : ''">
      <div class="times_nav">
        <block v-for="item in times" :key="item.key">
          <div class="item" :class="item.id == 0 ? 'on':''">
            <div>
              <p class="date">{{item.date}}</p>
              <p class="week">{{item.week}}</p>
            </div>
          </div>
        </block>
      </div>
      <div class="content_already">
        <div class="list">
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
      </div>
    </div>

    <!-- 赛程 -->

    <div class="content3 content" :class="index == 2 ? 'on' : ''">
      <div class="times_nav">
        <block v-for="item in times" :key="item.key">
          <div class="item" :class="item.id == 0 ? 'on':''">
            <div>
              <p class="date">{{item.date}}</p>
              <p class="week">{{item.week}}</p>
            </div>
          </div>
        </block>
      </div>
      <div class="content_already">
        <div class="list">
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
        </div>
      </div>
    </div>

    <!-- 关注 -->

    <div class="content4 content" v-bind:class="index == 3 ? 'on' : ''">
      <div class="info">2019-12-17 星期二(共6场)</div>
      <div class="content-list">
        <div class="list1 list">
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
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
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
      times: [
        {
          id: 0,
          date: "12-15",
          week: "周一"
        },
        {
          id: 1,
          date: "12-16",
          week: "周二"
        },
        {
          id: 2,
          date: "12-17",
          week: "周三"
        },
        {
          id: 3,
          date: "12-18",
          week: "周四"
        },
        {
          id: 4,
          date: "12-19",
          week: "周五"
        },
        {
          id: 5,
          date: "12-20",
          week: "周六"
        },
        {
          id: 6,
          date: "12-21",
          week: "周日"
        }
      ]
    };
  },

  components: {},

  methods: {
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
      // console.log(this.key + "和" + this.index);
    },
    toDetail() {
      wx.navigateTo({
        url: "../index_details/main",
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log("success")
        },
        fail: function(e){
          console.log(e)
        }
      });
      console.log(123);
    },
    toScreen(){
      wx.navigateTo({
        url: "../screen/main",
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log("success")
        },
        fail: function(e){
          console.log(e)
        }
      });
    }
  },

  created() {
    // let app = getApp()
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
.box-content .main .left {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold
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
  font-weight: bold
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
}
.screen img {
  width: 74rpx;
  height: 74rpx;
}
</style>
