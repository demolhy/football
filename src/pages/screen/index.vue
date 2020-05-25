<template>
  <div>
    <wux-tabs :current="current" defaultCurrent="tab1" @change="onChange">
      <wux-tab key="0" title="全部" wux-class="nav"></wux-tab>
      <wux-tab key="1" title="一级" wux-class="nav"></wux-tab>
      <wux-tab key="2" title="竞彩" wux-class="nav"></wux-tab>
      <wux-tab key="3" title="足彩" wux-class="nav"></wux-tab>
      <wux-tab key="4" title="单彩" wux-class="nav"></wux-tab>
    </wux-tabs>
    <div class="footer">
      <div class="lf">
        <div @click="onAll">全选</div>
        <div @click="onReverse">反选</div>
        <div class="text">已选{{length}}场</div>
      </div>
      <div class="rh" @click="toIndex">
        <div>确定</div>
      </div>
    </div>
    <div class="content">
      <checkbox-group @change="onChecked" class="item" :value="1">
        <label
          class="list"
          v-for="(item,index) in screen_list"
          :class="item.checked == true ? 'on' : ''"
          :key="index"
        >
          <checkbox class="input" :id="item.key" :value="index" :checked="item.checked"></checkbox>
          {{item.title}}
        </label>
      </checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // card
  },

  data() {
    return {
      current: 0,
      length: 0,
      checkeds: true,
      screen_list: [],
      dataList: "",
      nameContainer: {},
      dataTotal: [],
      idArr: []
    };
  },

  created() {},
  onLoad() {
    // console.log("page index onLoad", this);

    this.getDataList("fbdata/jishiList", "");
  },
  methods: {
    onChange(e) {
      // console.log("onChange", e.target.key);
      this.current = e.target.key;
      this.statistics(this.current);
    },
    onChecked(e) {
      this.idArr = [];
      // console.log(e);
      // console.log(e.mp.detail.value);
      let values = e.mp.detail.value;
      this.screen_list.map((item, index) => {
        item.checked = values.indexOf("" + index) > -1;
        // item.checked
        if (item.checked) {
          // this.idArr = []
          this.idArr.push(item.id);
        }
        // console.log('123'+values.indexOf(""+index))
        // if(values.indexOf(""+index) > -1){
        //   console.log(index)
        //   item.checked = true;
        // }else{
        //   item.checked = false;
        // }
      });
      // console.log(values)
      this.length = values.length;
    },
    toIndex() {
      // console.log(this.idArr);
      wx.reLaunch({ url: "../index/main?model="+ this.idArr,
        
       });
      
    },
    onAll() {
      this.idArr = [];
      this.screen_list.map((item, index) => {
        item.checked = true;
        if (item.checked) {
          // this.idArr = []
          this.idArr.push(item.id);
        }
      });
      this.length = this.screen_list.length;
    },
    onReverse() {
      this.idArr = [];
      let num = 0;
      this.screen_list.map((item, index) => {
        item.checked = !item.checked;
        if (item.checked) {
          num++;
          this.idArr.push(item.id);
        }
      });
      this.length = num;
    },
    getDataList(url, data) {
      this.$httpWX
        .post({
          url: url,
          data: data
        })
        .then(res => {
          this.dataList = res.data;

          this.statistics(0);
        });
    },
    statistics(num) {
      this.screen_list = [];
      this.dataTotal = [];
      this.nameContainer = {};
      // console.log(2222)
      // this.dataTotal = []
      // this.dataList = []
      this.dataList.map((item, index) => {
        // console.log(index)
        if (num == 0) {
          this.nameContainer[item[2][0]] = this.nameContainer[item[2][0]] || [];
          this.nameContainer[item[2][0]].push(item);
        }
        if (num == 1) {
          if (item[17] == 0) {
            this.nameContainer[item[2][0]] =
              this.nameContainer[item[2][0]] || [];
            this.nameContainer[item[2][0]].push(item);
            this.nameContainer[item[2][0]].push(item);
          }
        }
        if (num == 2) {
          if (item[18] == 1) {
            this.nameContainer[item[2][0]] =
              this.nameContainer[item[2][0]] || [];
            this.nameContainer[item[1]].push(item);
          }
        }
        if (num == 3) {
          if (item[20] == 1) {
            this.nameContainer[item[2][0]] =
              this.nameContainer[item[2][0]] || [];
            this.nameContainer[item[2][0]].push(item);
          }
        }
        if (num == 4) {
          if (item[19] == 1) {
            this.nameContainer[item[2][0]] =
              this.nameContainer[item[2][0]] || [];
            this.nameContainer[item[2][0]].push(item);
          }
        }
      });
      console.log(this.nameContainer);
      let dataName = Object.keys(this.nameContainer);
      console.log(dataName);
      dataName.map(nameItem => {
        console.log(nameItem);
        let count = 0;
        this.nameContainer[nameItem].map(item => {
          count++; // 遍历每种水果中包含的条目计算总数
        });
        this.dataTotal.push({
          id: this.nameContainer[nameItem][0][1],
          title: nameItem + "(" + count + ")",
          total: count,
          // id: item.id,
          checked: false
        });
      });
      console.log(this.dataTotal);
      this.screen_list = this.dataTotal;
    }
  }
};
</script>

<style>
.nav.wux-tabs__tab--current {
  border-bottom: 2rpx solid #4cb13b;
}
.nav::after {
  content: none;
  display: none;
}
.nav::before {
  content: none;
  display: none;
}
.footer {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer .lf {
  display: flex;
  align-items: center;
}
.footer .lf > div {
  color: #333;
  font-size: 32rpx;
  padding: 0 20rpx;
}
.footer .lf > div:first-child {
  position: relative;
  padding: 0 20rpx 0 30rpx;
}
.footer .lf > div:first-child::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2rpx;
  height: 18rpx;
  background: rgba(0, 0, 0, 0.1);
}
.footer .lf .text {
  color: #999;
  font-size: 24rpx;
  margin-left: 0rpx;
}
.footer .rh {
  background: #4cb13b;
  color: #fff;
  font-size: 32rpx;
  padding: 30rpx 45rpx;
}
.content {
  margin-top: 74rpx;
  padding: 20rpx 10rpx;
  box-sizing: content-box;
  /* margin-left: -10rpx; */
  margin-right: -10rpx;
}
.content .item {
  display: flex;
  flex-wrap: wrap;
}
.content .list {
  width: 21.6%;
  margin: 10rpx;
}
.content label {
  background: #fff;
  /* width: 100%; */

  font-size: 24rpx;
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 20rpx 0;
  display: block;
  border: 2rpx solid #fff;
}
.content .list.on {
  border: 2rpx dashed #4cb13b;
  background: #e6f0ea;
}
.content .list .input {
  position: absolute;
  left: -9999999rpx;
}
</style>
