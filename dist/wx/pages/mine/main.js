require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(144);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_199d7860_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(147);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-199d7860"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_199d7860_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\mine\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-199d7860", Component.options)
  } else {
    hotAPI.reload("data-v-199d7860", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 145:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mounted: function mounted() {},
  onShow: function onShow() {},

  computed: {},
  components: {},
  created: function created() {},
  onLoad: function onLoad() {
    this.getLogin();
  },
  data: function data() {
    return {};
  },

  methods: {
    getLogin: function getLogin() {
      var _this = this;

      wx.login({
        success: function success(res) {
          console.log(res);
          _this.$httpWX.get({
            url: "https://api.weixin.qq.com/sns/oauth2/access_token",
            data: {
              appid: "wx724f11fd7a80ac59",
              secret: "3430199e83173b36f5264453d94520ad",
              code: res.code,
              grant_type: 'authorization_code'
            }
          }).then(function (res) {
            console.log(res);
          });
        },
        fail: function fail() {},
        complete: function complete() {}
      });
    }
  }
});

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "login"
  }, [_c('h5', [_vm._v("登录")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('button', [_vm._v("登 录")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "other"
  }, [_c('p', [_vm._v("其他登录方式")])], 1), _vm._v(" "), _c('div', {
    staticClass: "wechat"
  }, [_c('img', {
    attrs: {
      "src": "https://fb.hxweixin.top/images/mine/mine_wechat.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("微信登录")])], 1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "logo"
  }, [_c('img', {
    attrs: {
      "src": "https://fb.hxweixin.top/images/mine/mine_logo.png",
      "alt": ""
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "lg_list"
  }, [_c('div', {
    staticClass: "list"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "输入你的用户名/手机号"
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "https://fb.hxweixin.top/images/mine/mine_phone.png",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('input', {
    attrs: {
      "type": "password",
      "placeholder": "输入您的密码"
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "https://fb.hxweixin.top/images/mine/mine_pass.png",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "forget"
  }, [_c('span', [_vm._v("忘记密码?")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-199d7860", esExports)
  }
}

/***/ })

},[143]);