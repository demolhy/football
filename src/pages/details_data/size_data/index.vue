<template>
  <div class="content">
    <div class="table_title">
      <div class="t1">指数公司</div>
      <div class="t1">大球</div>
      <div class="t1">盘口</div>
      <div class="t1">小球</div>
      <div class="t5">变盘时间</div>
    </div>
    <div class="table_list">
      <div class="list">
        <div class="t1 on">
          <div class="th">易胜博</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t2">
          <div class="th">01-01 08:22</div>
        </div>
      </div>
      <div class="list">
        <div class="t1">
          <div class="th">易胜博</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t1">
          <div class="th">2</div>
        </div>
        <div class="t2">
          <div class="th">01-01 08:22</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {},
  onShow() {

  },
  computed: {},
  components: {
    
  },
  created() {},
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.content{
  background: #fff;
  border-top: 2rpx solid #f2f2f2
}
.table_title{
  display: flex;
  text-align: center;
  font-size: 22rpx;
  color: #333;
  padding: 15rpx 0
}
.table_title .t1{
  width: 20%
}

.table_title .t5{
  width: 25%
}
.table_list .list{
  display: flex;
  text-align: center;
  font-size: 22rpx;
  color: #333;
  border-top: 2rpx solid #f2f2f2;
}
.table_list .list .th{
  padding: 15rpx 0
}
.table_list .list>div{
  border-right: 2rpx solid #f2f2f2
}
.table_list .list>div:last-child{
  border: none
}
.table_list .list .t1{
  width: 20%;
}
.table_list .list .t1.on{
  background: rgba(0, 0, 0, .1)
}
.table_list .list .t2{
  width: 25%
}
</style>
