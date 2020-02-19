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
      <div class="rh">
        <div>确定</div>
      </div>
    </div>
    <div class="content">
      <checkbox-group @change="onChecked" class="item" :value="1">
          <label class="list" v-for="item in screen_list" :class="item.checked == true ? 'on' : ''" :key="item.key">
            <checkbox class="input" :id="item.key" :value="item.key" :checked="item.checked"></checkbox>
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

  data () {
    return {
      current: 0,
      length: 0,
      checkeds: false,
      screen_list:[
        {
          key: 0,
          checked: false,
          title: "英格兰"
        },
        {
          key: 1,
          checked: false,
          title: "阿尔巴利亚"
        },
        {
          key: 2,
          checked: false,
          title: "西班牙"
        },{
          key: 3,
          checked: false,
          title: "德国"
        },
        {
          key: 4,
          checked: false,
          title: "阿尔巴利亚"
        }
      ],
      
    }
  },

  created () {
    
  },
  methods: {
    onChange(e) {
      console.log('onChange', e.target.key)
      this.current = e.target.key

    },
    onChecked(e){
      // console.log(e);
      // console.log(e.mp.detail.value);
      let values = e.mp.detail.value;
      this.screen_list.map(function(item,index){
        item.checked = values.indexOf(""+index) > -1;
        console.log(item);
        // console.log('123'+values.indexOf(""+index))
        // if(values.indexOf(""+index) > -1){
        //   console.log(index)
        //   item.checked = true;
        // }else{
        //   item.checked = false;
        // }
        
      })
      console.log(values)
      this.length = values.length
    } ,
    onAll(){
      this.screen_list.map((item,index)=>{
        item.checked = true
      })
    },
    onReverse(){
      this.screen_list.map((item,index)=>{
        item.checked = !item.checked
      })
    }
  },
}
</script>

<style>
  .nav.wux-tabs__tab--current{
    border-bottom: 2rpx solid #4CB13B;
  }
  .nav::after{
    content: none;
    display: none
  }
  .nav::before{
    content: none;
    display: none
  }
  .footer{
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
  .footer .lf{
    display: flex;
    align-items: center
  }
  .footer .lf>div{
    color: #333;
    font-size: 32rpx;
    padding: 0 20rpx
  }
  .footer .lf>div:first-child{
    position: relative;
    padding: 0 20rpx 0 30rpx;
  }
  .footer .lf>div:first-child::after{
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2rpx;
    height: 18rpx;
    background: rgba(0, 0, 0, .1)
  }
  .footer .lf .text{
    color: #999;
    font-size: 24rpx;
    margin-left: 0rpx
  }
  .footer .rh{
    background: #4CB13B;
    color: #fff;
    font-size: 32rpx;
    padding: 30rpx 45rpx
  }
  .content{
    margin-top: 74rpx;
    padding: 20rpx 10rpx;
    box-sizing: content-box;
    /* margin-left: -10rpx; */
    margin-right: -10rpx
  }
  .content .item{
    display: flex;
    flex-wrap: wrap;
  }
  .content .list{
    width: 21.6%;
    margin: 10rpx;
  }
  .content label{
    background: #fff;
    /* width: 100%; */
    
    font-size: 24rpx;
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 20rpx 0;
    display: block;
    border: 2rpx solid #fff
  }
  .content .list.on{
    border: 2rpx dashed #4CB13B;
    background: #E6F0EA
  }
  .content .list .input{
    position: absolute;
    left: -9999999rpx;
  }
</style>
