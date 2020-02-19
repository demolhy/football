require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([1],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(108);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_58b457ae_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(111);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(109)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_58b457ae_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\screen\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58b457ae", Component.options)
  } else {
    hotAPI.reload("data-v-58b457ae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 109:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 110:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    // card
  },

  data: function data() {
    return {
      current: 0,
      length: 0,
      checkeds: false,
      screen_list: [{
        key: 0,
        checked: false,
        title: "英格兰"
      }, {
        key: 1,
        checked: false,
        title: "阿尔巴利亚"
      }, {
        key: 2,
        checked: false,
        title: "西班牙"
      }, {
        key: 3,
        checked: false,
        title: "德国"
      }, {
        key: 4,
        checked: false,
        title: "阿尔巴利亚"
      }]

    };
  },
  created: function created() {},

  methods: {
    onChange: function onChange(e) {
      console.log('onChange', e.target.key);
      this.current = e.target.key;
    },
    onChecked: function onChecked(e) {
      // console.log(e);
      // console.log(e.mp.detail.value);
      var values = e.mp.detail.value;
      this.screen_list.map(function (item, index) {
        item.checked = values.indexOf("" + index) > -1;
        console.log(item);
        // console.log('123'+values.indexOf(""+index))
        // if(values.indexOf(""+index) > -1){
        //   console.log(index)
        //   item.checked = true;
        // }else{
        //   item.checked = false;
        // }
      });
      console.log(values);
      this.length = values.length;
    },
    onAll: function onAll() {
      this.screen_list.map(function (item, index) {
        item.checked = true;
      });
    },
    onReverse: function onReverse() {
      this.screen_list.map(function (item, index) {
        item.checked = !item.checked;
      });
    }
  }
});

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('wux-tabs', {
    attrs: {
      "current": _vm.current,
      "defaultCurrent": "tab1",
      "eventid": '0',
      "mpcomid": '5'
    },
    on: {
      "change": _vm.onChange
    }
  }, [_c('wux-tab', {
    key: "0",
    attrs: {
      "title": "全部",
      "wux-class": "nav",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('wux-tab', {
    key: "1",
    attrs: {
      "title": "一级",
      "wux-class": "nav",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('wux-tab', {
    key: "2",
    attrs: {
      "title": "竞彩",
      "wux-class": "nav",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('wux-tab', {
    key: "3",
    attrs: {
      "title": "足彩",
      "wux-class": "nav",
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('wux-tab', {
    key: "4",
    attrs: {
      "title": "单彩",
      "wux-class": "nav",
      "mpcomid": '4'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "footer"
  }, [_c('div', {
    staticClass: "lf"
  }, [_c('div', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.onAll
    }
  }, [_vm._v("全选")]), _vm._v(" "), _c('div', {
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.onReverse
    }
  }, [_vm._v("反选")]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_vm._v("已选" + _vm._s(_vm.length) + "场")])]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('checkbox-group', {
    staticClass: "item",
    attrs: {
      "value": 1,
      "eventid": '3',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.onChecked
    }
  }, _vm._l((_vm.screen_list), function(item, index) {
    return _c('label', {
      key: item.key,
      staticClass: "list",
      class: item.checked == true ? 'on' : ''
    }, [_c('checkbox', {
      staticClass: "input",
      attrs: {
        "id": item.key,
        "value": item.key,
        "checked": item.checked
      }
    }), _vm._v("\n          " + _vm._s(item.title) + "\n        ")], 1)
  }))], 1)], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rh"
  }, [_c('div', [_vm._v("确定")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-58b457ae", esExports)
  }
}

/***/ })

},[107]);