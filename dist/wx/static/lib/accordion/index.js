"use strict";
var _baseComponent = _interopRequireDefault(
    require("../helpers/baseComponent")
  ),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _defineProperty(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = n),
    e
  );
}
(0, _baseComponent.default)({
  relations: { "../accordion-group/index": { type: "parent" } },
  properties: {
    prefixCls: { type: String, value: "wux-accordion" },
    key: { type: String, value: "" },
    thumb: { type: String, value: "" },
    title: { type: String, value: "" },
    content: { type: String, value: "" },
    disabled: { type: Boolean, value: !1 },
    showArrow: { type: Boolean, value: !0 }
  },
  data: { current: !1, index: "0" },
  computed: {
    classes: [
      "prefixCls, current, disabled",
      function(e, t, n) {
        var r;
        return {
          wrap: (0, _classNames2.default)(
            e,
            (_defineProperty((r = {}), "".concat(e, "--current"), t),
            _defineProperty(r, "".concat(e, "--disabled"), n),
            r)
          ),
          hd: "".concat(e, "__hd"),
          thumb: "".concat(e, "__thumb"),
          title: "".concat(e, "__title"),
          arrow: "".concat(e, "__arrow"),
          bd: "".concat(e, "__bd"),
          content: "".concat(e, "__content")
        };
      }
    ]
  },
  methods: {
    changeCurrent: function(e, t) {
      this.setData({ current: e, index: t });
    },
    onTap: function() {
      var e = this.data,
        t = e.index,
        n = e.disabled,
        r = this.getRelationNodes("../accordion-group/index")[0];
      !n && r && r.onClickItem(t);
    }
  }
});
