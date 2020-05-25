require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(149);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_58b457ae_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(156);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(150)
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

/***/ 150:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

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
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    // card
  },

  data: function data() {
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
  created: function created() {},
  onLoad: function onLoad() {
    // console.log("page index onLoad", this);

    this.getDataList("fbdata/jishiList", "");
  },

  methods: {
    onChange: function onChange(e) {
      // console.log("onChange", e.target.key);
      this.current = e.target.key;
      this.statistics(this.current);
    },
    onChecked: function onChecked(e) {
      var _this = this;

      this.idArr = [];
      // console.log(e);
      // console.log(e.mp.detail.value);
      var values = e.mp.detail.value;
      this.screen_list.map(function (item, index) {
        item.checked = values.indexOf("" + index) > -1;
        // item.checked
        if (item.checked) {
          // this.idArr = []
          _this.idArr.push(item.id);
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
    toIndex: function toIndex() {
      // console.log(this.idArr);
      wx.reLaunch({ url: "../index/main?model=" + this.idArr

      });
    },
    onAll: function onAll() {
      var _this2 = this;

      this.idArr = [];
      this.screen_list.map(function (item, index) {
        item.checked = true;
        if (item.checked) {
          // this.idArr = []
          _this2.idArr.push(item.id);
        }
      });
      this.length = this.screen_list.length;
    },
    onReverse: function onReverse() {
      var _this3 = this;

      this.idArr = [];
      var num = 0;
      this.screen_list.map(function (item, index) {
        item.checked = !item.checked;
        if (item.checked) {
          num++;
          _this3.idArr.push(item.id);
        }
      });
      this.length = num;
    },
    getDataList: function getDataList(url, data) {
      var _this4 = this;

      this.$httpWX.post({
        url: url,
        data: data
      }).then(function (res) {
        _this4.dataList = res.data;

        _this4.statistics(0);
      });
    },
    statistics: function statistics(num) {
      var _this5 = this;

      this.screen_list = [];
      this.dataTotal = [];
      this.nameContainer = {};
      // console.log(2222)
      // this.dataTotal = []
      // this.dataList = []
      this.dataList.map(function (item, index) {
        // console.log(index)
        if (num == 0) {
          _this5.nameContainer[item[2][0]] = _this5.nameContainer[item[2][0]] || [];
          _this5.nameContainer[item[2][0]].push(item);
        }
        if (num == 1) {
          if (item[17] == 0) {
            _this5.nameContainer[item[2][0]] = _this5.nameContainer[item[2][0]] || [];
            _this5.nameContainer[item[2][0]].push(item);
            _this5.nameContainer[item[2][0]].push(item);
          }
        }
        if (num == 2) {
          if (item[18] == 1) {
            _this5.nameContainer[item[2][0]] = _this5.nameContainer[item[2][0]] || [];
            _this5.nameContainer[item[1]].push(item);
          }
        }
        if (num == 3) {
          if (item[20] == 1) {
            _this5.nameContainer[item[2][0]] = _this5.nameContainer[item[2][0]] || [];
            _this5.nameContainer[item[2][0]].push(item);
          }
        }
        if (num == 4) {
          if (item[19] == 1) {
            _this5.nameContainer[item[2][0]] = _this5.nameContainer[item[2][0]] || [];
            _this5.nameContainer[item[2][0]].push(item);
          }
        }
      });
      console.log(this.nameContainer);
      var dataName = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.nameContainer);
      console.log(dataName);
      dataName.map(function (nameItem) {
        console.log(nameItem);
        var count = 0;
        _this5.nameContainer[nameItem].map(function (item) {
          count++; // 遍历每种水果中包含的条目计算总数
        });
        _this5.dataTotal.push({
          id: _this5.nameContainer[nameItem][0][1],
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
});

/***/ }),

/***/ 156:
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
  }, [_vm._v("已选" + _vm._s(_vm.length) + "场")])]), _vm._v(" "), _c('div', {
    staticClass: "rh",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": _vm.toIndex
    }
  }, [_c('div', [_vm._v("确定")])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('checkbox-group', {
    staticClass: "item",
    attrs: {
      "value": 1,
      "eventid": '4',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.onChecked
    }
  }, _vm._l((_vm.screen_list), function(item, index) {
    return _c('label', {
      key: index,
      staticClass: "list",
      class: item.checked == true ? 'on' : ''
    }, [_c('checkbox', {
      staticClass: "input",
      attrs: {
        "id": item.key,
        "value": index,
        "checked": item.checked
      }
    }), _vm._v("\n        " + _vm._s(item.title) + "\n      ")], 1)
  }))], 1)], 1)
}
var staticRenderFns = []
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

},[148]);