<template>
  <div>
    <div class="logo">
      <img src="https://fb.hxweixin.top/images/mine/mine_logo.png" alt />
    </div>
    <div class="box">
      <div class="login">
        <h5>登录</h5>
        <div class="lg_list">
          <div class="list">
            <input type="text" placeholder="输入你的用户名/手机号" />
            <img src="https://fb.hxweixin.top/images/mine/mine_phone.png" alt />
          </div>
          <div class="list">
            <input type="password" placeholder="输入您的密码" />
            <img src="https://fb.hxweixin.top/images/mine/mine_pass.png" alt />
          </div>
          <div class="forget">
            <span>忘记密码?</span>
          </div>
        </div>
        <button>登 录</button>
      </div>
    </div>
    <div class="other">
      <p>其他登录方式</p>
    </div>
    <div class="wechat">
      <img src="https://fb.hxweixin.top/images/mine/mine_wechat.png" alt />
      <p>微信登录</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  onShow() {},
  computed: {},
  components: {},
  created() {},
  onLoad() {
    this.getLogin();
  },
  data() {
    return {};
  },
  methods: {
    getLogin() {
      wx.login({
        success: res => {
          console.log(res);
          let appid = "wx724f11fd7a80ac59";
          let secret = "ab9039e11f2c99e9d093223c1be451a5";
          let code = res.code;

          this.$httpWX
            .post({
              url: "xwxlogin",
              data: {
                // openid: e.data.openid,
                // access_token: e.data.session_key
                code: code
              }
            })
            .then(res => {
              console.log(res);
            });
          // wx.request({
          //   url:
          //     "https://api.weixin.qq.com/sns/jscode2session?appid=" +
          //     appid +
          //     "&secret=" +
          //     secret +
          //     "&js_code=" +
          //     code +
          //     "&grant_type=authorization_code", // 仅为示例，并非真实的接口地址
          //   method: "get",
          //   data: {},
          //   headers: {
          //     "content-type": "application/json" // 默认值
          //   },
          //   success: (e) => {
          //     console.log(e);

          //   },
          //   fail: function(e) {
          //     // console.log('fail:'+e)
          //   },
          //   complete: function(e) {
          //     // console.log(e)
          //   }
          // });
        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style scoped>
.logo {
  text-align: center;
  margin: 70rpx;
}
.logo img {
  width: 273rpx;
  height: 92rpx;
}
.box {
  padding: 0 42rpx;
}
.box .login {
  background: #fff;
  border-radius: 10rpx;
  padding: 50rpx 45rpx;
  padding-bottom: 0;
  position: relative;
}
.box .login h5 {
  font-size: 48rpx;
}
.box .login .lg_list {
  margin-top: 50rpx;
}
.box .login .lg_list .list {
  position: relative;
  margin-bottom: 20rpx;
}
.box .login .lg_list .list img {
  position: absolute;
  left: 40rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 28rpx;
  height: 40rpx;
}
.box .login .lg_list .list input {
  border-bottom: 2rpx solid #d3dfef;
  font-size: 24rpx;
  padding: 35rpx 100rpx;
}
.box .login .lg_list .forget {
  text-align: right;
  padding-right: 30rpx;
}
.box .login .lg_list .forget span {
  color: #4cb13b;
  font-size: 24rpx;
}
.box .login button {
  margin-top: 10rpx;
  background: #4cb13b;
  color: #fff;
  font-size: 30rpx;
  border: none;
  border-radius: 40rpx;
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  bottom: -40rpx;
}
.other {
  text-align: center;
  position: relative;
  margin-top: 80rpx;
}
.other p {
  color: #999;
  font-size: 22rpx;
}
.other::after {
  content: "";
  width: 100rpx;
  height: 1rpx;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
}
.other::before {
  content: "";
  width: 100rpx;
  height: 1rpx;
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
}
.wechat {
  text-align: center;
  margin-top: 30rpx;
}
.wechat img {
  width: 90rpx;
  height: 90rpx;
}
.wechat p {
  color: #999999;
  font-size: 22rpx;
}
</style>

