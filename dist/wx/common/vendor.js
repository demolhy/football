global.webpackJsonpMpvue([0],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;

  if (typeof wx !== 'undefined') {
    global.mpvue = wx;
    global.mpvuePlatform = 'wx';
  } else if (typeof swan !== 'undefined') {
    global.mpvue = swan;
    global.mpvuePlatform = 'swan';
  }else if (typeof tt !== 'undefined') {
    global.mpvue = tt;
    global.mpvuePlatform = 'tt';
  }else if (typeof my !== 'undefined') {
    global.mpvue = my;
    global.mpvuePlatform = 'my';
  }
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated', 'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap',
  'attached',
  'ready',
  'moved',
  'detached'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = ['mpvue-runtime'].join();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  // } else if (typeof MutationObserver !== 'undefined' && (
  //   isNative(MutationObserver) ||
  //   // PhantomJS and iOS 7.x
  //   MutationObserver.toString() === '[object MutationObserverConstructor]'
  // )) {
  //   // use MutationObserver where native Promise is not available,
  //   // e.g. PhantomJS IE11, iOS7, Android 4.4
  //   var counter = 1
  //   var observer = new MutationObserver(nextTickHandler)
  //   var textNode = document.createTextNode(String(counter))
  //   observer.observe(textNode, {
  //     characterData: true
  //   })
  //   timerFunc = () => {
  //     counter = (counter + 1) % 2
  //     textNode.data = String(counter)
  //   }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value, key) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  if (key) {
    this.key = key;
  }
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData, key) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value, key);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val, undefined, key);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, undefined, key);
      dep.notify();

      if (!obj.__keyPath) {
        def(obj, '__keyPath', {}, false);
      }
      obj.__keyPath[key] = true;
      if (newVal instanceof Object && !(newVal instanceof Array)) {
        // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
        def(newVal, '__newReference', true, false);
      }
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  // Vue.set 添加对象属性，渲染时候把 val 传给小程序渲染
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  target.__keyPath[key] = true;
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  // Vue.del 删除对象属性，渲染时候把这个属性设置为 undefined
  target.__keyPath[key] = 'del';
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var mark;
var measure;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';
Vue$3.mpvueVersion = '2.0.6';

/* globals renderer */



var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }



function getComKey (vm) {
  return vm && vm.$attrs ? vm.$attrs['mpcomid'] : '0'
}

// 用于小程序的 event type 到 web 的 event
var eventTypeMap = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

/*  */

// import { namespaceMap } from 'mp/util/index'

var obj = {};

function createElement$1 (tagName, vnode) {
  return obj
}

function createElementNS (namespace, tagName) {
  return obj
}

function createTextNode (text) {
  return obj
}

function createComment (text) {
  return obj
}

function insertBefore (parentNode, newNode, referenceNode) {}

function removeChild (node, child) {}

function appendChild (node, child) {}

function parentNode (node) {
  return obj
}

function nextSibling (node) {
  return obj
}

function tagName (node) {
  return 'div'
}

function setTextContent (node, text) {
  return obj
}

function setAttribute (node, key, val) {
  return obj
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

// import baseModules from 'core/vdom/modules/index'
// const platformModules = []
// import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// const modules = platformModules.concat(baseModules)
var modules = [ref];

var corePatch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function patch () {
  corePatch.apply(this, arguments);
  this.$updateDataToMP();
}

function callHook$1 (vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  } else if (hook === 'onPageNotFound' && handlers) {
    handlers = [handlers];
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        ret = handlers[i].call(vm, params);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) { return callHook$1(v, hook, params); });
  }

  return ret
}

// mpType 小程序实例的类型，可能的值是 'app', 'page'
// rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
function getGlobalData (app, rootVueVM) {
  var mp = rootVueVM.$mp;
  if (app && app.globalData) {
    mp.appOptions = app.globalData.appOptions;
  }
}

// 格式化 properties 属性，并给每个属性加上 observer 方法

// properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
// properties: {
//   paramA: Number,
//   myProperty: { // 属性名
//     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
//     observer: function(newVal, oldVal, changedPath) {
//        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
//     }
//   },
// }

// props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
// props: {
//   // 基础的类型检查 (`null` 匹配任何类型)
//   propA: Number,
//   // 多个可能的类型
//   propB: [String, Number],
//   // 必填的字符串
//   propC: {
//     type: String,
//     required: true
//   },
//   // 带有默认值的数字
//   propD: {
//     type: Number,
//     default: 100
//   },
//   // 带有默认值的对象
//   propE: {
//     type: Object,
//     // 对象或数组且一定会从一个工厂函数返回默认值
//     default: function () {
//       return { message: 'hello' }
//     }
//   },
//   // 自定义验证函数
//   propF: {
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['success', 'warning', 'danger'].indexOf(value) !== -1
//     }
//   }
// }

// core/util/options
function normalizeProps$1 (props, res, vm) {
  if (!props) { return }
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }

  // fix vueProps to properties
  for (var key$1 in res) {
    if (res.hasOwnProperty(key$1)) {
      var item = res[key$1];
      if (item.default) {
        item.value = item.default;
      }
      var oldObserver = item.observer;
      item.observer = function (newVal, oldVal) {
        vm[name] = newVal;
        // 先修改值再触发原始的 observer，跟 watch 行为保持一致
        if (typeof oldObserver === 'function') {
          oldObserver.call(vm, newVal, oldVal);
        }
      };
    }
  }

  return res
}

function normalizeProperties (vm) {
  var properties = vm.$options.properties;
  var vueProps = vm.$options.props;
  var res = {};

  normalizeProps$1(properties, res, vm);
  normalizeProps$1(vueProps, res, vm);

  return res
}

/**
 * 把 properties 中的属性 proxy 到 vm 上
 */
function initMpProps (vm) {
  var mpProps = vm._mpProps = {};
  var keys = Object.keys(vm.$options.properties || {});
  keys.forEach(function (key) {
    if (!(key in vm)) {
      proxy(vm, '_mpProps', key);
      mpProps[key] = undefined; // for observe
    }
  });
  observe(mpProps, true);
}

function initMP (mpType, next) {
  var rootVueVM = this.$root;
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {};
  }

  var mp = rootVueVM.$mp;

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    // 处理子组件的小程序生命周期
    if (mpType === 'app') {
      callHook$1(this, 'onLaunch', mp.appOptions);
    } else {
      callHook$1(this, 'onLoad', mp.query);
      callHook$1(this, 'onReady');
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType;
  mp.status = 'register';

  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch: function onLaunch (options) {
        if ( options === void 0 ) options = {};

        mp.app = this;
        mp.status = 'launch';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onLaunch', options);
        next();
      },

      // Do something when app show.
      onShow: function onShow (options) {
        if ( options === void 0 ) options = {};

        mp.status = 'show';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onShow', options);
      },

      // Do something when app hide.
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
      },

      onError: function onError (err) {
        callHook$1(rootVueVM, 'onError', err);
      },

      onPageNotFound: function onPageNotFound (err) {
        callHook$1(rootVueVM, 'onPageNotFound', err);
      }
    });
  } else if (mpType === 'component') {
    initMpProps(rootVueVM);

    global.Component({
      // 小程序原生的组件属性
      properties: normalizeProperties(rootVueVM),
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created: function created () {
        mp.status = 'created';
        mp.page = this;
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached: function attached () {
        mp.status = 'attached';
        callHook$1(rootVueVM, 'attached');
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready: function ready () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'ready');
        next();

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved: function moved () {
        callHook$1(rootVueVM, 'moved');
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached: function detached () {
        mp.status = 'detached';
        callHook$1(rootVueVM, 'detached');
      }
    });
  } else {
    var app = global.getApp();
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad: function onLoad (query) {
        mp.page = this;
        mp.query = query;
        mp.status = 'load';
        getGlobalData(app, rootVueVM);
        callHook$1(rootVueVM, 'onLoad', query);
      },

      // 生命周期函数--监听页面显示
      onShow: function onShow () {
        mp.page = this;
        mp.status = 'show';
        callHook$1(rootVueVM, 'onShow');

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function onReady () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'onReady');
        next();
      },

      // 生命周期函数--监听页面隐藏
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
        mp.page = null;
      },

      // 生命周期函数--监听页面卸载
      onUnload: function onUnload () {
        mp.status = 'unload';
        callHook$1(rootVueVM, 'onUnload');
        mp.page = null;
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function onPullDownRefresh () {
        callHook$1(rootVueVM, 'onPullDownRefresh');
      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function onReachBottom () {
        callHook$1(rootVueVM, 'onReachBottom');
      },

      // 用户点击右上角分享
      onShareAppMessage: rootVueVM.$options.onShareAppMessage
        ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,

      // Do something when page scroll
      onPageScroll: function onPageScroll (options) {
        callHook$1(rootVueVM, 'onPageScroll', options);
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap: function onTabItemTap (options) {
        callHook$1(rootVueVM, 'onTabItemTap', options);
      }
    });
  }
}

var updateDataTotal = 0; // 总共更新的数据量
function diffLog (updateData) {
  updateData = JSON.stringify(updateData);
  if (!Vue$3._mpvueTraceTimer) {
    Vue$3._mpvueTraceTimer = setTimeout(function () {
      clearTimeout(Vue$3._mpvueTraceTimer);
      updateDataTotal = (updateDataTotal / 1024).toFixed(1);
      console.log('这次操作引发500ms内数据更新量:' + updateDataTotal + 'kb');
      Vue$3._mpvueTraceTimer = 0;
      updateDataTotal = 0;
    }, 500);
  } else if (Vue$3._mpvueTraceTimer) {
    updateData = updateData.replace(/[^\u0000-\u00ff]/g, 'aa'); // 中文占2字节，中文替换成两个字母计算占用空间
    updateDataTotal += updateData.length;
  }
}

var KEY_SEP$1 = '_';

function getDeepData (keyList, viewData) {
  if (keyList.length > 1) {
    var _key = keyList.splice(0, 1);
    var _viewData = viewData[_key];
    if (_viewData) {
      return getDeepData(keyList, _viewData)
    } else {
      return null
    }
  } else {
    if (viewData[keyList[0]]) {
      return viewData[keyList[0]]
    } else {
      return null
    }
  }
}

function compareAndSetDeepData (key, newData, vm, data, forceUpdate) {
  // 比较引用类型数据
  try {
    var keyList = key.split('.');
    // page.__viewData__老版小程序不存在，使用mpvue里绑的data比对
    var oldData = getDeepData(keyList, vm.$root.$mp.page.data);
    if (oldData === null || JSON.stringify(oldData) !== JSON.stringify(newData) || forceUpdate) {
      data[key] = newData;
    } else {
      var keys = Object.keys(oldData);
      keys.forEach(function (_key) {
        var properties = Object.getOwnPropertyDescriptor(oldData, _key);
        if (!properties['get'] && !properties['set']) {
          data[key + '.' + _key] = newData[_key];
        }
      });
    }
  } catch (e) {
    console.log(e, key, newData, vm);
  }
}

function cleanKeyPath (vm) {
  if (vm.__mpKeyPath) {
    Object.keys(vm.__mpKeyPath).forEach(function (_key) {
      delete vm.__mpKeyPath[_key]['__keyPath'];
    });
  }
}

function minifyDeepData (rootKey, originKey, vmData, data, _mpValueSet, vm) {
  try {
    if (vmData instanceof Array) {
       // 数组
      compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data, true);
    } else {
      // Object
      var _keyPathOnThis = {}; // 存储这层对象的keyPath
      if (vmData.__keyPath && !vmData.__newReference) {
        // 有更新列表 ，按照更新列表更新
        _keyPathOnThis = vmData.__keyPath;
        Object.keys(vmData).forEach(function (_key) {
          if (vmData[_key] instanceof Object) {
            // 引用类型 递归
            if (_key === '__keyPath') {
              return
            }
            minifyDeepData(rootKey + '.' + originKey, _key, vmData[_key], data, null, vm);
          } else {
            // 更新列表中的 加入data
            if (_keyPathOnThis[_key] === true) {
              if (originKey) {
                data[rootKey + '.' + originKey + '.' + _key] = vmData[_key];
              } else {
                data[rootKey + '.' + _key] = vmData[_key];
              }
            }
          }
        });
         // 根节点可能有父子引用同一个引用类型数据，依赖树都遍历完后清理
        vm['__mpKeyPath'] = vm['__mpKeyPath'] || {};
        vm['__mpKeyPath'][vmData.__ob__.dep.id] = vmData;
      } else {
        // 没有更新列表
        compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data);
      }
      // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
      def(vmData, '__newReference', false, false);
    }
  } catch (e) {
    console.log(e, rootKey, originKey, vmData, data);
  }
}

function getRootKey (vm, rootKey) {
  if (!vm.$parent.$attrs) {
    rootKey = '$root.0' + KEY_SEP$1 + rootKey;
    return rootKey
  } else {
    rootKey = vm.$parent.$attrs.mpcomid + KEY_SEP$1 + rootKey;
    return getRootKey(vm.$parent, rootKey)
  }
}

function diffData (vm, data) {
  var vmData = vm._data || {};
  var vmProps = vm._props || {};
  var rootKey = '';
  if (!vm.$attrs) {
    rootKey = '$root.0';
  } else {
    rootKey = getRootKey(vm, vm.$attrs.mpcomid);
  }
  Vue$3.nextTick(function () {
    cleanKeyPath(vm);
  });
  // console.log(rootKey)

  // 值类型变量不考虑优化，还是直接更新
  var __keyPathOnThis = vmData.__keyPath || vm.__keyPath || {};
  delete vm.__keyPath;
  delete vmData.__keyPath;
  delete vmProps.__keyPath;
  if (vm._mpValueSet === 'done') {
    // 第二次赋值才进行缩减操作
    Object.keys(vmData).forEach(function (vmDataItemKey) {
      if (vmData[vmDataItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmDataItemKey, vmData[vmDataItemKey], data, vm._mpValueSet, vm);
      } else if (vmData[vmDataItemKey] !== undefined) {
        // _data上的值属性只有要更新的时候才赋值
        if (__keyPathOnThis[vmDataItemKey] === true) {
          data[rootKey + '.' + vmDataItemKey] = vmData[vmDataItemKey];
        }
      }
    });

    Object.keys(vmProps).forEach(function (vmPropsItemKey) {
      if (vmProps[vmPropsItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmPropsItemKey, vmProps[vmPropsItemKey], data, vm._mpValueSet, vm);
      } else if (vmProps[vmPropsItemKey] !== undefined) {
        data[rootKey + '.' + vmPropsItemKey] = vmProps[vmPropsItemKey];
      }
      // _props上的值属性只有要更新的时候才赋值
    });

    // 检查完data和props,最后补上_mpProps & _computedWatchers
    var vmMpProps = vm._mpProps || {};
    var vmComputedWatchers = vm._computedWatchers || {};
    Object.keys(vmMpProps).forEach(function (mpItemKey) {
      data[rootKey + '.' + mpItemKey] = vm[mpItemKey];
    });
    Object.keys(vmComputedWatchers).forEach(function (computedItemKey) {
      data[rootKey + '.' + computedItemKey] = vm[computedItemKey];
    });
    // 更新的时候要删除$root.0:{},否则会覆盖原正确数据
    delete data[rootKey];
  }
  if (vm._mpValueSet === undefined) {
    // 第一次设置数据成功后，标记位置true,再更新到这个节点如果没有keyPath数组认为不需要更新
    vm._mpValueSet = 'done';
  }
  if (Vue$3.config._mpTrace) {
    // console.log('更新VM节点', vm)
    // console.log('实际传到Page.setData数据', data)
    diffLog(data);
  }
}

// 节流方法，性能优化
// 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
// $c === $child
// $k === $comKey

// 新型的被拍平的数据结构
// {
//   $root: {
//     '1-1'{
//       // ... data
//     },
//     '1.2-1': {
//       // ... data1
//     },
//     '1.2-2': {
//       // ... data2
//     }
//   }
// }

var KEY_SEP = '_';

function getVmData (vm) {
  // 确保当前 vm 所有数据被同步
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._props || {}),
    Object.keys(vm._mpProps || {}),
    Object.keys(vm._computedWatchers || {})
  );
  return dataKeys.reduce(function (res, key) {
    res[key] = vm[key];
    return res
  }, {})
}

function getParentComKey (vm, res) {
  if ( res === void 0 ) res = [];

  var ref = vm || {};
  var $parent = ref.$parent;
  if (!$parent) { return res }
  res.unshift(getComKey($parent));
  if ($parent.$parent) {
    return getParentComKey($parent, res)
  }
  return res
}

function formatVmData (vm) {
  var $p = getParentComKey(vm).join(KEY_SEP);
  var $k = $p + ($p ? KEY_SEP : '') + getComKey(vm);

  // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
  // 改动 vue.runtime 所获的的核心能力
  var data = Object.assign(getVmData(vm), { $k: $k, $kk: ("" + $k + KEY_SEP), $p: $p });
  var key = '$root.' + $k;
  var res = {};
  res[key] = data;
  return res
}

function collectVmData (vm, res) {
  if ( res === void 0 ) res = {};

  var vms = vm.$children;
  if (vms && vms.length) {
    vms.forEach(function (v) { return collectVmData(v, res); });
  }
  return Object.assign(res, formatVmData(vm))
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 自动合并 data
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  function later () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  }
  return function (handle, data) {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = args ? [handle, Object.assign(args[1], data)] : [handle, data];
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

// 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
var throttleSetData = throttle(function (handle, data) {
  handle(data);
}, 50);

function getPage (vm) {
  var rootVueVM = vm.$root;
  var ref = rootVueVM.$mp || {};
  var mpType = ref.mpType; if ( mpType === void 0 ) mpType = '';
  var page = ref.page;

  // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
  if (mpType === 'app' || !page || typeof page.setData !== 'function') {
    return
  }
  return page
}

// 优化js变量动态变化时候引起全量更新
// 优化每次 setData 都传递大量新数据
function updateDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = formatVmData(this);
  diffData(this, data);
  throttleSetData(page.setData.bind(page), data);
}

function initDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = collectVmData(this.$root);
  page.setData(data);
}

// 虚拟dom的compid与真实dom的comkey匹配，多层嵌套的先补齐虚拟dom的compid直到完全匹配为止
function isVmKeyMatchedCompkey (k, comkey) {
  if (!k || !comkey) {
    return false
  }
  // 完全匹配 comkey = '1_0_1', k = '1_0_1'
  // 部分匹配 comkey = '1_0_10_1', k = '1_0_10'
  // k + KEY_SEP防止k = '1_0_1'误匹配comkey = '1_0_10_1'
  return comkey === k || comkey.indexOf(k + KEY_SEP$2) === 0
}

function getVM (vm, comkeys) {
  if ( comkeys === void 0 ) comkeys = [];

  var keys = comkeys.slice(1);
  if (!keys.length) { return vm }

  // bugfix #1375: 虚拟dom的compid和真实dom的comkey在组件嵌套时匹配出错，comid会丢失前缀，需要从父节点补充
  var comkey = keys.join(KEY_SEP$2);
  var comidPrefix = '';
  return keys.reduce(function (res, key) {
    var len = res.$children.length;
    for (var i = 0; i < len; i++) {
      var v = res.$children[i];
      var k = getComKey(v);
      if (comidPrefix) {
        k = comidPrefix + KEY_SEP$2 + k;
      }
      // 找到匹配的父节点
      if (isVmKeyMatchedCompkey(k, comkey)) {
        comidPrefix = k;
        res = v;
        return res
      }
    }
    return res
  }, vm)
}

function getHandle (vnode, eventid, eventTypes) {
  if ( eventTypes === void 0 ) eventTypes = [];

  var res = [];
  if (!vnode || !vnode.tag) {
    return res
  }

  var ref = vnode || {};
  var data = ref.data; if ( data === void 0 ) data = {};
  var children = ref.children; if ( children === void 0 ) children = [];
  var componentInstance = ref.componentInstance;
  if (componentInstance) {
    // 增加 slot 情况的处理
    // Object.values 会多增加几行编译后的代码
    Object.keys(componentInstance.$slots).forEach(function (slotKey) {
      var slot = componentInstance.$slots[slotKey];
      var slots = Array.isArray(slot) ? slot : [slot];
      slots.forEach(function (node) {
        res = res.concat(getHandle(node, eventid, eventTypes));
      });
    });
  } else {
    // 避免遍历超出当前组件的 vm
    children.forEach(function (node) {
      res = res.concat(getHandle(node, eventid, eventTypes));
    });
  }

  var attrs = data.attrs;
  var on = data.on;
  if (attrs && on && attrs['eventid'] === eventid) {
    eventTypes.forEach(function (et) {
      var h = on[et];
      if (typeof h === 'function') {
        res.push(h);
      } else if (Array.isArray(h)) {
        res = res.concat(h);
      }
    });
    return res
  }

  return res
}

function getWebEventByMP (e) {
  var type = e.type;
  var timeStamp = e.timeStamp;
  var touches = e.touches;
  var detail = e.detail; if ( detail === void 0 ) detail = {};
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget; if ( currentTarget === void 0 ) currentTarget = {};
  var x = detail.x;
  var y = detail.y;
  var event = {
    mp: e,
    type: type,
    timeStamp: timeStamp,
    x: x,
    y: y,
    target: Object.assign({}, target, detail),
    currentTarget: currentTarget,
    stopPropagation: noop,
    preventDefault: noop
  };

  if (touches && touches.length) {
    Object.assign(event, touches[0]);
    event.touches = touches;
  }
  return event
}

var KEY_SEP$2 = '_';
function handleProxyWithVue (e) {
  var rootVueVM = this.$root;
  var type = e.type;
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget;
  var ref = currentTarget || target;
  var dataset = ref.dataset; if ( dataset === void 0 ) dataset = {};
  var comkey = dataset.comkey; if ( comkey === void 0 ) comkey = '';
  var eventid = dataset.eventid;
  var vm = getVM(rootVueVM, comkey.split(KEY_SEP$2));

  if (!vm) {
    return
  }

  var webEventTypes = eventTypeMap[type] || [type];
  var handles = getHandle(vm._vnode, eventid, webEventTypes);

  // TODO, enevt 还需要处理更多
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
  if (handles.length) {
    var event = getWebEventByMP(e);
    if (handles.length === 1) {
      var result = handles[0](event);
      return result
    }
    handles.forEach(function (h) { return h(event); });
  }
}

// for platforms
// import config from 'core/config'
// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  var this$1 = this;

  // el = el && inBrowser ? query(el) : undefined
  // return mountComponent(this, el, hydrating)

  // 初始化小程序生命周期相关
  var options = this.$options;

  if (options && (options.render || options.mpType)) {
    var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
    return this._initMP(mpType, function () {
      return mountComponent(this$1, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
};

// for mp
Vue$3.prototype._initMP = initMP;

Vue$3.prototype.$updateDataToMP = updateDataToMP;
Vue$3.prototype._initDataToMP = initDataToMP;

Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue;

/*  */

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(6)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


!function(t,e){ true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.echarts={})}(this,function(t){"use strict";var e=2311,n=function(){return e++},v="object"==typeof wx&&"function"==typeof wx.getSystemInfoSync?{browser:{},os:{},node:!1,wxa:!0,canvasSupported:!0,svgSupported:!1,touchEventsSupported:!0,domSupported:!1}:"undefined"==typeof document&&"undefined"!=typeof self?{browser:{},os:{},node:!1,worker:!0,canvasSupported:!0,domSupported:!1}:"undefined"==typeof navigator?{browser:{},os:{},node:!0,worker:!1,canvasSupported:!0,svgSupported:!0,domSupported:!1}:function(t){var e={},i=t.match(/Firefox\/([\d.]+)/),n=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),o=t.match(/Edge\/([\d.]+)/),a=/micromessenger/i.test(t);i&&(e.firefox=!0,e.version=i[1]);n&&(e.ie=!0,e.version=n[1]);o&&(e.edge=!0,e.version=o[1]);a&&(e.weChat=!0);return{browser:e,os:{},node:!1,canvasSupported:!!document.createElement("canvas").getContext,svgSupported:"undefined"!=typeof SVGRect,touchEventsSupported:"ontouchstart"in window&&!e.ie&&!e.edge,pointerEventsSupported:"onpointerdown"in window&&(e.edge||e.ie&&11<=e.version),domSupported:"undefined"!=typeof document}}(navigator.userAgent);var s={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1,"[object Canvas]":1},l={"[object Int8Array]":1,"[object Uint8Array]":1,"[object Uint8ClampedArray]":1,"[object Int16Array]":1,"[object Uint16Array]":1,"[object Int32Array]":1,"[object Uint32Array]":1,"[object Float32Array]":1,"[object Float64Array]":1},u=Object.prototype.toString,i=Array.prototype,r=i.forEach,h=i.filter,o=i.slice,c=i.map,d=i.reduce,a={};function f(t,e){"createCanvas"===t&&(y=null),a[t]=e}function D(t){if(null==t||"object"!=typeof t)return t;var e=t,i=u.call(t);if("[object Array]"===i){if(!$(t)){e=[];for(var n=0,o=t.length;n<o;n++)e[n]=D(t[n])}}else if(l[i]){if(!$(t)){var a=t.constructor;if(t.constructor.from)e=a.from(t);else{e=new a(t.length);for(n=0,o=t.length;n<o;n++)e[n]=D(t[n])}}}else if(!s[i]&&!$(t)&&!G(t))for(var r in e={},t)t.hasOwnProperty(r)&&(e[r]=D(t[r]));return e}function m(t,e,i){if(!R(e)||!R(t))return i?D(e):t;for(var n in e)if(e.hasOwnProperty(n)){var o=t[n],a=e[n];!R(a)||!R(o)||k(a)||k(o)||G(a)||G(o)||B(a)||B(o)||$(a)||$(o)?!i&&n in t||(t[n]=D(e[n])):m(o,a,i)}return t}function p(t,e){for(var i=t[0],n=1,o=t.length;n<o;n++)i=m(i,t[n],e);return i}function L(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}function C(t,e,i){for(var n in e)e.hasOwnProperty(n)&&(i?null!=e[n]:null==t[n])&&(t[n]=e[n]);return t}function g(){return a.createCanvas()}var y;function x(){return y=y||g().getContext("2d")}function _(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var i=0,n=t.length;i<n;i++)if(t[i]===e)return i}return-1}function w(t,e){var i=t.prototype;function n(){}for(var o in n.prototype=e.prototype,t.prototype=new n,i)i.hasOwnProperty(o)&&(t.prototype[o]=i[o]);(t.prototype.constructor=t).superClass=e}function b(t,e,i){C(t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,i)}function P(t){if(t)return"string"!=typeof t&&"number"==typeof t.length}function E(t,e,i){if(t&&e)if(t.forEach&&t.forEach===r)t.forEach(e,i);else if(t.length===+t.length)for(var n=0,o=t.length;n<o;n++)e.call(i,t[n],n,t);else for(var a in t)t.hasOwnProperty(a)&&e.call(i,t[a],a,t)}function N(t,e,i){if(t&&e){if(t.map&&t.map===c)return t.map(e,i);for(var n=[],o=0,a=t.length;o<a;o++)n.push(e.call(i,t[o],o,t));return n}}function S(t,e,i,n){if(t&&e){if(t.reduce&&t.reduce===d)return t.reduce(e,i,n);for(var o=0,a=t.length;o<a;o++)i=e.call(n,i,t[o],o,t);return i}}function M(t,e,i){if(t&&e){if(t.filter&&t.filter===h)return t.filter(e,i);for(var n=[],o=0,a=t.length;o<a;o++)e.call(i,t[o],o,t)&&n.push(t[o]);return n}}function I(t,e,i){if(t&&e)for(var n=0,o=t.length;n<o;n++)if(e.call(i,t[n],n,t))return t[n]}function A(t,e){var i=o.call(arguments,2);return function(){return t.apply(e,i.concat(o.call(arguments)))}}function T(t){var e=o.call(arguments,1);return function(){return t.apply(this,e.concat(o.call(arguments)))}}function k(t){return"[object Array]"===u.call(t)}function O(t){return"function"==typeof t}function z(t){return"[object String]"===u.call(t)}function R(t){var e=typeof t;return"function"==e||!!t&&"object"==e}function B(t){return!!s[u.call(t)]}function V(t){return!!l[u.call(t)]}function G(t){return"object"==typeof t&&"number"==typeof t.nodeType&&"object"==typeof t.ownerDocument}function F(t){return t!=t}function W(t){for(var e=0,i=arguments.length;e<i;e++)if(null!=arguments[e])return arguments[e]}function H(t,e){return null!=t?t:e}function Z(t,e,i){return null!=t?t:null!=e?e:i}function U(){return Function.call.apply(o,arguments)}function X(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t}function Y(t,e){if(!t)throw new Error(e)}function j(t){return null==t?null:"function"==typeof t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}a.createCanvas=function(){return document.createElement("canvas")};var q="__ec_primitive__";function K(t){t[q]=!0}function $(t){return t[q]}function J(t){var i=k(t);this.data={};var n=this;function e(t,e){i?n.set(t,e):n.set(e,t)}t instanceof J?t.each(e):t&&E(t,e)}function Q(t){return new J(t)}function tt(t,e){for(var i=new t.constructor(t.length+e.length),n=0;n<t.length;n++)i[n]=t[n];var o=t.length;for(n=0;n<e.length;n++)i[n+o]=e[n];return i}function et(){}J.prototype={constructor:J,get:function(t){return this.data.hasOwnProperty(t)?this.data[t]:null},set:function(t,e){return this.data[t]=e},each:function(t,e){for(var i in void 0!==e&&(t=A(t,e)),this.data)this.data.hasOwnProperty(i)&&t(this.data[i],i)},removeKey:function(t){delete this.data[t]}};var it=(Object.freeze||Object)({$override:f,clone:D,merge:m,mergeAll:p,extend:L,defaults:C,createCanvas:g,getContext:x,indexOf:_,inherits:w,mixin:b,isArrayLike:P,each:E,map:N,reduce:S,filter:M,find:I,bind:A,curry:T,isArray:k,isFunction:O,isString:z,isObject:R,isBuiltInObject:B,isTypedArray:V,isDom:G,eqNaN:F,retrieve:W,retrieve2:H,retrieve3:Z,slice:U,normalizeCssArray:X,assert:Y,trim:j,setAsPrimitive:K,isPrimitive:$,createHashMap:Q,concatArray:tt,noop:et}),nt="undefined"==typeof Float32Array?Array:Float32Array;function ot(t,e){var i=new nt(2);return null==t&&(t=0),null==e&&(e=0),i[0]=t,i[1]=e,i}function at(t,e){return t[0]=e[0],t[1]=e[1],t}function rt(t){var e=new nt(2);return e[0]=t[0],e[1]=t[1],e}function st(t,e,i){return t[0]=e,t[1]=i,t}function lt(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function ut(t,e,i,n){return t[0]=e[0]+i[0]*n,t[1]=e[1]+i[1]*n,t}function ht(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function ct(t){return Math.sqrt(ft(t))}var dt=ct;function ft(t){return t[0]*t[0]+t[1]*t[1]}var pt=ft;function gt(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function mt(t,e){var i=ct(e);return 0===i?(t[0]=0,t[1]=0):(t[0]=e[0]/i,t[1]=e[1]/i),t}function vt(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]))}var yt=vt;function xt(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])}var _t=xt;function wt(t,e,i,n){return t[0]=e[0]+n*(i[0]-e[0]),t[1]=e[1]+n*(i[1]-e[1]),t}function bt(t,e,i){var n=e[0],o=e[1];return t[0]=i[0]*n+i[2]*o+i[4],t[1]=i[1]*n+i[3]*o+i[5],t}function St(t,e,i){return t[0]=Math.min(e[0],i[0]),t[1]=Math.min(e[1],i[1]),t}function Mt(t,e,i){return t[0]=Math.max(e[0],i[0]),t[1]=Math.max(e[1],i[1]),t}var It=(Object.freeze||Object)({create:ot,copy:at,clone:rt,set:st,add:lt,scaleAndAdd:ut,sub:ht,len:ct,length:dt,lenSquare:ft,lengthSquare:pt,mul:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t},div:function(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]},scale:gt,normalize:mt,distance:vt,dist:yt,distanceSquare:xt,distSquare:_t,negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t},lerp:wt,applyTransform:bt,min:St,max:Mt});function Tt(){this.on("mousedown",this._dragStart,this),this.on("mousemove",this._drag,this),this.on("mouseup",this._dragEnd,this)}function At(t,e){return{target:t,topTarget:e&&e.topTarget}}Tt.prototype={constructor:Tt,_dragStart:function(t){var e=t.target;e&&e.draggable&&((this._draggingTarget=e).dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(At(e,t),"dragstart",t.event))},_drag:function(t){var e=this._draggingTarget;if(e){var i=t.offsetX,n=t.offsetY,o=i-this._x,a=n-this._y;this._x=i,this._y=n,e.drift(o,a,t),this.dispatchToElement(At(e,t),"drag",t.event);var r=this.findHover(i,n,e).target,s=this._dropTarget;e!==(this._dropTarget=r)&&(s&&r!==s&&this.dispatchToElement(At(s,t),"dragleave",t.event),r&&r!==s&&this.dispatchToElement(At(r,t),"dragenter",t.event))}},_dragEnd:function(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(At(e,t),"dragend",t.event),this._dropTarget&&this.dispatchToElement(At(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null}};var Dt=Array.prototype.slice,Ct=function(t){this._$handlers={},this._$eventProcessor=t};function Lt(t,e,i,n,o,a){var r=t._$handlers;if("function"==typeof i&&(o=n,n=i,i=null),!n||!e)return t;i=function(t,e){var i=t._$eventProcessor;return null!=e&&i&&i.normalizeQuery&&(e=i.normalizeQuery(e)),e}(t,i),r[e]||(r[e]=[]);for(var s=0;s<r[e].length;s++)if(r[e][s].h===n)return t;var l={h:n,one:a,query:i,ctx:o||t,callAtLast:n.zrEventfulCallAtLast},u=r[e].length-1,h=r[e][u];return h&&h.callAtLast?r[e].splice(u,0,l):r[e].push(l),t}Ct.prototype={constructor:Ct,one:function(t,e,i,n){return Lt(this,t,e,i,n,!0)},on:function(t,e,i,n){return Lt(this,t,e,i,n,!1)},isSilent:function(t){var e=this._$handlers;return!e[t]||!e[t].length},off:function(t,e){var i=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(i[t]){for(var n=[],o=0,a=i[t].length;o<a;o++)i[t][o].h!==e&&n.push(i[t][o]);i[t]=n}i[t]&&0===i[t].length&&delete i[t]}else delete i[t];return this},trigger:function(t){var e=this._$handlers[t],i=this._$eventProcessor;if(e){var n=arguments,o=n.length;3<o&&(n=Dt.call(n,1));for(var a=e.length,r=0;r<a;){var s=e[r];if(i&&i.filter&&null!=s.query&&!i.filter(t,s.query))r++;else{switch(o){case 1:s.h.call(s.ctx);break;case 2:s.h.call(s.ctx,n[1]);break;case 3:s.h.call(s.ctx,n[1],n[2]);break;default:s.h.apply(s.ctx,n)}s.one?(e.splice(r,1),a--):r++}}}return i&&i.afterTrigger&&i.afterTrigger(t),this},triggerWithContext:function(t){var e=this._$handlers[t],i=this._$eventProcessor;if(e){var n=arguments,o=n.length;4<o&&(n=Dt.call(n,1,n.length-1));for(var a=n[n.length-1],r=e.length,s=0;s<r;){var l=e[s];if(i&&i.filter&&null!=l.query&&!i.filter(t,l.query))s++;else{switch(o){case 1:l.h.call(a);break;case 2:l.h.call(a,n[1]);break;case 3:l.h.call(a,n[1],n[2]);break;default:l.h.apply(a,n)}l.one?(e.splice(s,1),r--):s++}}}return i&&i.afterTrigger&&i.afterTrigger(t),this}};var kt=Math.log(2);function Pt(t,e,i,n,o,a){var r=n+"-"+o,s=t.length;if(a.hasOwnProperty(r))return a[r];if(1===e){var l=Math.round(Math.log((1<<s)-1&~o)/kt);return t[i][l]}for(var u=n|1<<i,h=i+1;n&1<<h;)h++;for(var c=0,d=0,f=0;d<s;d++){var p=1<<d;p&o||(c+=(f%2?-1:1)*t[i][d]*Pt(t,e-1,h,u,o|p,a),f++)}return a[r]=c}var Nt="undefined"!=typeof window&&!!window.addEventListener,Ot=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Et="___zrEVENTSAVED",zt=[];function Rt(t,e,i,n){return i=i||{},n||!v.canvasSupported?Bt(t,e,i):v.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(i.zrX=e.layerX,i.zrY=e.layerY):null!=e.offsetX?(i.zrX=e.offsetX,i.zrY=e.offsetY):Bt(t,e,i),i}function Bt(t,e,i){if(t.getBoundingClientRect&&v.domSupported){var n=e.clientX,o=e.clientY;if("CANVAS"===t.nodeName.toUpperCase()){var a=t.getBoundingClientRect();return i.zrX=n-a.left,void(i.zrY=o-a.top)}var r=t[Et]||(t[Et]={}),s=function(t,e){for(var i=e.transformer,n=e.srcCoords,o=!0,a=[],r=[],s=0;s<4;s++){var l=t[s].getBoundingClientRect(),u=2*s,h=l.left,c=l.top;a.push(h,c),o&=n&&h===n[u]&&c===n[1+u],r.push(t[s].offsetLeft,t[s].offsetTop)}return o?i:(e.srcCoords=a,e.transformer=function(t,e){var i=[[t[0],t[1],1,0,0,0,-e[0]*t[0],-e[0]*t[1]],[0,0,0,t[0],t[1],1,-e[1]*t[0],-e[1]*t[1]],[t[2],t[3],1,0,0,0,-e[2]*t[2],-e[2]*t[3]],[0,0,0,t[2],t[3],1,-e[3]*t[2],-e[3]*t[3]],[t[4],t[5],1,0,0,0,-e[4]*t[4],-e[4]*t[5]],[0,0,0,t[4],t[5],1,-e[5]*t[4],-e[5]*t[5]],[t[6],t[7],1,0,0,0,-e[6]*t[6],-e[6]*t[7]],[0,0,0,t[6],t[7],1,-e[7]*t[6],-e[7]*t[7]]],n={},o=Pt(i,8,0,0,0,n);if(0!==o){for(var a=[],r=0;r<8;r++)for(var s=0;s<8;s++)null==a[s]&&(a[s]=0),a[s]+=((r+s)%2?-1:1)*Pt(i,7,0===r?1:0,1<<r,1<<s,n)/o*e[r];return function(t,e,i){var n=e*a[6]+i*a[7]+1;t[0]=(e*a[0]+i*a[1]+a[2])/n,t[1]=(e*a[3]+i*a[4]+a[5])/n}}}(a,r))}(function(t,e){var i=e.markers;if(i)return i;i=e.markers=[];for(var n=["left","right"],o=["top","bottom"],a=0;a<4;a++){var r=document.createElement("div"),s=r.style,l=a%2,u=(a>>1)%2;s.cssText=["position:absolute","visibility: hidden","padding: 0","margin: 0","border-width: 0","width:0","height:0",n[l]+":0",o[u]+":0",n[1-l]+":auto",o[1-u]+":auto",""].join("!important;"),t.appendChild(r),i.push(r)}return i}(t,r),r);if(s)return s(zt,n,o),i.zrX=zt[0],void(i.zrY=zt[1])}i.zrX=i.zrY=0}function Vt(t){return t||window.event}function Gt(t,e,i){if(null!=(e=Vt(e)).zrX)return e;var n=e.type;if(n&&0<=n.indexOf("touch")){var o="touchend"!==n?e.targetTouches[0]:e.changedTouches[0];o&&Rt(t,o,e,i)}else Rt(t,e,e,i),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;var a=e.button;return null==e.which&&void 0!==a&&Ot.test(e.type)&&(e.which=1&a?1:2&a?3:4&a?2:0),e}function Ft(t,e,i,n){Nt?t.addEventListener(e,i,n):t.attachEvent("on"+e,i)}var Wt=Nt?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0}:function(t){t.returnValue=!1,t.cancelBubble=!0};function Ht(t){return 2===t.which||3===t.which}function Zt(){this._track=[]}function Ut(t){var e=t[1][0]-t[0][0],i=t[1][1]-t[0][1];return Math.sqrt(e*e+i*i)}Zt.prototype={constructor:Zt,recognize:function(t,e,i){return this._doTrack(t,e,i),this._recognize(t)},clear:function(){return this._track.length=0,this},_doTrack:function(t,e,i){var n=t.touches;if(n){for(var o={points:[],touches:[],target:e,event:t},a=0,r=n.length;a<r;a++){var s=n[a],l=Rt(i,s,{});o.points.push([l.zrX,l.zrY]),o.touches.push(s)}this._track.push(o)}},_recognize:function(t){for(var e in Xt)if(Xt.hasOwnProperty(e)){var i=Xt[e](this._track,t);if(i)return i}}};var Xt={pinch:function(t,e){var i=t.length;if(i){var n=(t[i-1]||{}).points,o=(t[i-2]||{}).points||n;if(o&&1<o.length&&n&&1<n.length){var a=Ut(n)/Ut(o);isFinite(a)||(a=1),e.pinchScale=a;var r=function(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2]}(n);return e.pinchX=r[0],e.pinchY=r[1],{type:"pinch",target:t[0].target,event:e}}}}},Yt="silent";function jt(){Wt(this.event)}function qt(){}qt.prototype.dispose=function(){};function Kt(t,e,i,n){Ct.call(this),this.storage=t,this.painter=e,this.painterRoot=n,i=i||new qt,this.proxy=null,this._hovered={},this._lastTouchMoment,this._lastX,this._lastY,this._gestureMgr,Tt.call(this),this.setHandlerProxy(i)}var $t=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"];function Jt(t,e,i){if(t[t.rectHover?"rectContain":"contain"](e,i)){for(var n,o=t;o;){if(o.clipPath&&!o.clipPath.contain(e,i))return!1;o.silent&&(n=!0),o=o.parent}return!n||Yt}return!1}function Qt(t,e,i){var n=t.painter;return e<0||e>n.getWidth()||i<0||i>n.getHeight()}Kt.prototype={constructor:Kt,setHandlerProxy:function(e){this.proxy&&this.proxy.dispose(),e&&(E($t,function(t){e.on&&e.on(t,this[t],this)},this),e.handler=this),this.proxy=e},mousemove:function(t){var e=t.zrX,i=t.zrY,n=Qt(this,e,i),o=this._hovered,a=o.target;a&&!a.__zr&&(a=(o=this.findHover(o.x,o.y)).target);var r=this._hovered=n?{x:e,y:i}:this.findHover(e,i),s=r.target,l=this.proxy;l.setCursor&&l.setCursor(s?s.cursor:"default"),a&&s!==a&&this.dispatchToElement(o,"mouseout",t),this.dispatchToElement(r,"mousemove",t),s&&s!==a&&this.dispatchToElement(r,"mouseover",t)},mouseout:function(t){var e=t.zrEventControl,i=t.zrIsToLocalDOM;"only_globalout"!==e&&this.dispatchToElement(this._hovered,"mouseout",t),"no_globalout"!==e&&(i||this.trigger("globalout",{type:"globalout",event:t}))},resize:function(t){this._hovered={}},dispatch:function(t,e){var i=this[t];i&&i.call(this,e)},dispose:function(){this.proxy.dispose(),this.storage=this.proxy=this.painter=null},setCursorStyle:function(t){var e=this.proxy;e.setCursor&&e.setCursor(t)},dispatchToElement:function(t,e,i){var n=(t=t||{}).target;if(!n||!n.silent){for(var o="on"+e,a=function(t,e,i){return{type:t,event:i,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:i.zrX,offsetY:i.zrY,gestureEvent:i.gestureEvent,pinchX:i.pinchX,pinchY:i.pinchY,pinchScale:i.pinchScale,wheelDelta:i.zrDelta,zrByTouch:i.zrByTouch,which:i.which,stop:jt}}(e,t,i);n&&(n[o]&&(a.cancelBubble=n[o].call(n,a)),n.trigger(e,a),n=n.parent,!a.cancelBubble););a.cancelBubble||(this.trigger(e,a),this.painter&&this.painter.eachOtherLayer(function(t){"function"==typeof t[o]&&t[o].call(t,a),t.trigger&&t.trigger(e,a)}))}},findHover:function(t,e,i){for(var n=this.storage.getDisplayList(),o={x:t,y:e},a=n.length-1;0<=a;a--){var r;if(n[a]!==i&&!n[a].ignore&&(r=Jt(n[a],t,e))&&(o.topTarget||(o.topTarget=n[a]),r!==Yt)){o.target=n[a];break}}return o},processGesture:function(t,e){this._gestureMgr||(this._gestureMgr=new Zt);var i=this._gestureMgr;"start"===e&&i.clear();var n=i.recognize(t,this.findHover(t.zrX,t.zrY,null).target,this.proxy.dom);if("end"===e&&i.clear(),n){var o=n.type;t.gestureEvent=o,this.dispatchToElement({target:n.target},o,n.event)}}},E(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(r){Kt.prototype[r]=function(t){var e,i,n=t.zrX,o=t.zrY,a=Qt(this,n,o);if("mouseup"===r&&a||(i=(e=this.findHover(n,o)).target),"mousedown"===r)this._downEl=i,this._downPoint=[t.zrX,t.zrY],this._upEl=i;else if("mouseup"===r)this._upEl=i;else if("click"===r){if(this._downEl!==this._upEl||!this._downPoint||4<yt(this._downPoint,[t.zrX,t.zrY]))return;this._downPoint=null}this.dispatchToElement(e,r,t)}}),b(Kt,Ct),b(Kt,Tt);var te="undefined"==typeof Float32Array?Array:Float32Array;function ee(){var t=new te(6);return ie(t),t}function ie(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function ne(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t}function oe(t,e,i){var n=e[0]*i[0]+e[2]*i[1],o=e[1]*i[0]+e[3]*i[1],a=e[0]*i[2]+e[2]*i[3],r=e[1]*i[2]+e[3]*i[3],s=e[0]*i[4]+e[2]*i[5]+e[4],l=e[1]*i[4]+e[3]*i[5]+e[5];return t[0]=n,t[1]=o,t[2]=a,t[3]=r,t[4]=s,t[5]=l,t}function ae(t,e,i){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+i[0],t[5]=e[5]+i[1],t}function re(t,e,i){var n=e[0],o=e[2],a=e[4],r=e[1],s=e[3],l=e[5],u=Math.sin(i),h=Math.cos(i);return t[0]=n*h+r*u,t[1]=-n*u+r*h,t[2]=o*h+s*u,t[3]=-o*u+h*s,t[4]=h*a+u*l,t[5]=h*l-u*a,t}function se(t,e,i){var n=i[0],o=i[1];return t[0]=e[0]*n,t[1]=e[1]*o,t[2]=e[2]*n,t[3]=e[3]*o,t[4]=e[4]*n,t[5]=e[5]*o,t}function le(t,e){var i=e[0],n=e[2],o=e[4],a=e[1],r=e[3],s=e[5],l=i*r-a*n;return l?(l=1/l,t[0]=r*l,t[1]=-a*l,t[2]=-n*l,t[3]=i*l,t[4]=(n*s-r*o)*l,t[5]=(a*o-i*s)*l,t):null}function ue(t){var e=ee();return ne(e,t),e}var he=(Object.freeze||Object)({create:ee,identity:ie,copy:ne,mul:oe,translate:ae,rotate:re,scale:se,invert:le,clone:ue}),ce=ie;function de(t){return 5e-5<t||t<-5e-5}var fe=function(t){(t=t||{}).position||(this.position=[0,0]),null==t.rotation&&(this.rotation=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null},pe=fe.prototype;pe.transform=null,pe.needLocalTransform=function(){return de(this.rotation)||de(this.position[0])||de(this.position[1])||de(this.scale[0]-1)||de(this.scale[1]-1)};var ge=[];pe.updateTransform=function(){var t=this.parent,e=t&&t.transform,i=this.needLocalTransform(),n=this.transform;if(i||e){n=n||ee(),i?this.getLocalTransform(n):ce(n),e&&(i?oe(n,t.transform,n):ne(n,t.transform)),this.transform=n;var o=this.globalScaleRatio;if(null!=o&&1!==o){this.getGlobalScale(ge);var a=ge[0]<0?-1:1,r=ge[1]<0?-1:1,s=((ge[0]-a)*o+a)/ge[0]||0,l=((ge[1]-r)*o+r)/ge[1]||0;n[0]*=s,n[1]*=s,n[2]*=l,n[3]*=l}this.invTransform=this.invTransform||ee(),le(this.invTransform,n)}else n&&ce(n)},pe.getLocalTransform=function(t){return fe.getLocalTransform(this,t)},pe.setTransform=function(t){var e=this.transform,i=t.dpr||1;e?t.setTransform(i*e[0],i*e[1],i*e[2],i*e[3],i*e[4],i*e[5]):t.setTransform(i,0,0,i,0,0)},pe.restoreTransform=function(t){var e=t.dpr||1;t.setTransform(e,0,0,e,0,0)};var me=[],ve=ee();pe.setLocalTransform=function(t){if(t){var e=t[0]*t[0]+t[1]*t[1],i=t[2]*t[2]+t[3]*t[3],n=this.position,o=this.scale;de(e-1)&&(e=Math.sqrt(e)),de(i-1)&&(i=Math.sqrt(i)),t[0]<0&&(e=-e),t[3]<0&&(i=-i),n[0]=t[4],n[1]=t[5],o[0]=e,o[1]=i,this.rotation=Math.atan2(-t[1]/i,t[0]/e)}},pe.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(oe(me,t.invTransform,e),e=me);var i=this.origin;i&&(i[0]||i[1])&&(ve[4]=i[0],ve[5]=i[1],oe(me,e,ve),me[4]-=i[0],me[5]-=i[1],e=me),this.setLocalTransform(e)}},pe.getGlobalScale=function(t){var e=this.transform;return t=t||[],e?(t[0]=Math.sqrt(e[0]*e[0]+e[1]*e[1]),t[1]=Math.sqrt(e[2]*e[2]+e[3]*e[3]),e[0]<0&&(t[0]=-t[0]),e[3]<0&&(t[1]=-t[1])):(t[0]=1,t[1]=1),t},pe.transformCoordToLocal=function(t,e){var i=[t,e],n=this.invTransform;return n&&bt(i,i,n),i},pe.transformCoordToGlobal=function(t,e){var i=[t,e],n=this.transform;return n&&bt(i,i,n),i},fe.getLocalTransform=function(t,e){ce(e=e||[]);var i=t.origin,n=t.scale||[1,1],o=t.rotation||0,a=t.position||[0,0];return i&&(e[4]-=i[0],e[5]-=i[1]),se(e,e,n),o&&re(e,e,o),i&&(e[4]+=i[0],e[5]+=i[1]),e[4]+=a[0],e[5]+=a[1],e};var ye={linear:function(t){return t},quadraticIn:function(t){return t*t},quadraticOut:function(t){return t*(2-t)},quadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},cubicIn:function(t){return t*t*t},cubicOut:function(t){return--t*t*t+1},cubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},quarticIn:function(t){return t*t*t*t},quarticOut:function(t){return 1- --t*t*t*t},quarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},quinticIn:function(t){return t*t*t*t*t},quinticOut:function(t){return--t*t*t*t*t+1},quinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},sinusoidalIn:function(t){return 1-Math.cos(t*Math.PI/2)},sinusoidalOut:function(t){return Math.sin(t*Math.PI/2)},sinusoidalInOut:function(t){return.5*(1-Math.cos(Math.PI*t))},exponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},exponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},exponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},circularIn:function(t){return 1-Math.sqrt(1-t*t)},circularOut:function(t){return Math.sqrt(1- --t*t)},circularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},elasticIn:function(t){var e,i=.1;return 0===t?0:1===t?1:(e=!i||i<1?(i=1,.1):.4*Math.asin(1/i)/(2*Math.PI),-i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4))},elasticOut:function(t){var e,i=.1;return 0===t?0:1===t?1:(e=!i||i<1?(i=1,.1):.4*Math.asin(1/i)/(2*Math.PI),i*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/.4)+1)},elasticInOut:function(t){var e,i=.1;return 0===t?0:1===t?1:(e=!i||i<1?(i=1,.1):.4*Math.asin(1/i)/(2*Math.PI),(t*=2)<1?i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*-.5:i*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*.5+1)},backIn:function(t){return t*t*(2.70158*t-1.70158)},backOut:function(t){return--t*t*(2.70158*t+1.70158)+1},backInOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((1+e)*t-e)*.5:.5*((t-=2)*t*((1+e)*t+e)+2)},bounceIn:function(t){return 1-ye.bounceOut(1-t)},bounceOut:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounceInOut:function(t){return t<.5?.5*ye.bounceIn(2*t):.5*ye.bounceOut(2*t-1)+.5}};function xe(t){this._target=t.target,this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null!=t.loop&&t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart,this._pausedTime=0,this._paused=!1}xe.prototype={constructor:xe,step:function(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)this._pausedTime+=e;else{var i=(t-this._startTime-this._pausedTime)/this._life;if(!(i<0)){i=Math.min(i,1);var n=this.easing,o="string"==typeof n?ye[n]:n,a="function"==typeof o?o(i):i;return this.fire("frame",a),1===i?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null}}},restart:function(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0,this._needsRemove=!1},fire:function(t,e){this[t="on"+t]&&this[t](this._target,e)},pause:function(){this._paused=!0},resume:function(){this._paused=!1}};function _e(){this.head=null,this.tail=null,this._len=0}var we=_e.prototype;we.insert=function(t){var e=new Se(t);return this.insertEntry(e),e},we.insertEntry=function(t){this.head?((this.tail.next=t).prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++},we.remove=function(t){var e=t.prev,i=t.next;e?e.next=i:this.head=i,i?i.prev=e:this.tail=e,t.next=t.prev=null,this._len--},we.len=function(){return this._len},we.clear=function(){this.head=this.tail=null,this._len=0};function be(t){this._list=new _e,this._map={},this._maxSize=t||10,this._lastRemovedEntry=null}var Se=function(t){this.value=t,this.next,this.prev},Me=be.prototype;Me.put=function(t,e){var i=this._list,n=this._map,o=null;if(null==n[t]){var a=i.len(),r=this._lastRemovedEntry;if(a>=this._maxSize&&0<a){var s=i.head;i.remove(s),delete n[s.key],o=s.value,this._lastRemovedEntry=s}r?r.value=e:r=new Se(e),r.key=t,i.insertEntry(r),n[t]=r}return o},Me.get=function(t){var e=this._map[t],i=this._list;if(null!=e)return e!==i.tail&&(i.remove(e),i.insertEntry(e)),e.value},Me.clear=function(){this._list.clear(),this._map={}};var Ie={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function Te(t){return(t=Math.round(t))<0?0:255<t?255:t}function Ae(t){return t<0?0:1<t?1:t}function De(t){return t.length&&"%"===t.charAt(t.length-1)?Te(parseFloat(t)/100*255):Te(parseInt(t,10))}function Ce(t){return t.length&&"%"===t.charAt(t.length-1)?Ae(parseFloat(t)/100):Ae(parseFloat(t))}function Le(t,e,i){return i<0?i+=1:1<i&&(i-=1),6*i<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t}function ke(t,e,i){return t+(e-t)*i}function Pe(t,e,i,n,o){return t[0]=e,t[1]=i,t[2]=n,t[3]=o,t}function Ne(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}var Oe=new be(20),Ee=null;function ze(t,e){Ee&&Ne(Ee,e),Ee=Oe.put(t,Ee||e.slice())}function Re(t,e){if(t){e=e||[];var i=Oe.get(t);if(i)return Ne(e,i);var n,o=(t+="").replace(/ /g,"").toLowerCase();if(o in Ie)return Ne(e,Ie[o]),ze(t,e),e;if("#"===o.charAt(0))return 4===o.length?0<=(n=parseInt(o.substr(1),16))&&n<=4095?(Pe(e,(3840&n)>>4|(3840&n)>>8,240&n|(240&n)>>4,15&n|(15&n)<<4,1),ze(t,e),e):void Pe(e,0,0,0,1):7===o.length?0<=(n=parseInt(o.substr(1),16))&&n<=16777215?(Pe(e,(16711680&n)>>16,(65280&n)>>8,255&n,1),ze(t,e),e):void Pe(e,0,0,0,1):void 0;var a=o.indexOf("("),r=o.indexOf(")");if(-1!==a&&r+1===o.length){var s=o.substr(0,a),l=o.substr(a+1,r-(a+1)).split(","),u=1;switch(s){case"rgba":if(4!==l.length)return void Pe(e,0,0,0,1);u=Ce(l.pop());case"rgb":return 3!==l.length?void Pe(e,0,0,0,1):(Pe(e,De(l[0]),De(l[1]),De(l[2]),u),ze(t,e),e);case"hsla":return 4!==l.length?void Pe(e,0,0,0,1):(l[3]=Ce(l[3]),Be(l,e),ze(t,e),e);case"hsl":return 3!==l.length?void Pe(e,0,0,0,1):(Be(l,e),ze(t,e),e);default:return}}Pe(e,0,0,0,1)}}function Be(t,e){var i=(parseFloat(t[0])%360+360)%360/360,n=Ce(t[1]),o=Ce(t[2]),a=o<=.5?o*(n+1):o+n-o*n,r=2*o-a;return Pe(e=e||[],Te(255*Le(r,a,i+1/3)),Te(255*Le(r,a,i)),Te(255*Le(r,a,i-1/3)),1),4===t.length&&(e[3]=t[3]),e}function Ve(t,e){var i=Re(t);if(i){for(var n=0;n<3;n++)i[n]=e<0?i[n]*(1-e)|0:(255-i[n])*e+i[n]|0,255<i[n]?i[n]=255:t[n]<0&&(i[n]=0);return Ye(i,4===i.length?"rgba":"rgb")}}function Ge(t){var e=Re(t);if(e)return((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1)}function Fe(t,e,i){if(e&&e.length&&0<=t&&t<=1){i=i||[];var n=t*(e.length-1),o=Math.floor(n),a=Math.ceil(n),r=e[o],s=e[a],l=n-o;return i[0]=Te(ke(r[0],s[0],l)),i[1]=Te(ke(r[1],s[1],l)),i[2]=Te(ke(r[2],s[2],l)),i[3]=Ae(ke(r[3],s[3],l)),i}}var We=Fe;function He(t,e,i){if(e&&e.length&&0<=t&&t<=1){var n=t*(e.length-1),o=Math.floor(n),a=Math.ceil(n),r=Re(e[o]),s=Re(e[a]),l=n-o,u=Ye([Te(ke(r[0],s[0],l)),Te(ke(r[1],s[1],l)),Te(ke(r[2],s[2],l)),Ae(ke(r[3],s[3],l))],"rgba");return i?{color:u,leftIndex:o,rightIndex:a,value:n}:u}}var Ze=He;function Ue(t,e,i,n){if(t=Re(t))return t=function(t){if(t){var e,i,n=t[0]/255,o=t[1]/255,a=t[2]/255,r=Math.min(n,o,a),s=Math.max(n,o,a),l=s-r,u=(s+r)/2;if(0==l)i=e=0;else{i=u<.5?l/(s+r):l/(2-s-r);var h=((s-n)/6+l/2)/l,c=((s-o)/6+l/2)/l,d=((s-a)/6+l/2)/l;n===s?e=d-c:o===s?e=1/3+h-d:a===s&&(e=2/3+c-h),e<0&&(e+=1),1<e&&(e-=1)}var f=[360*e,i,u];return null!=t[3]&&f.push(t[3]),f}}(t),null!=e&&(t[0]=function(t){return(t=Math.round(t))<0?0:360<t?360:t}(e)),null!=i&&(t[1]=Ce(i)),null!=n&&(t[2]=Ce(n)),Ye(Be(t),"rgba")}function Xe(t,e){if((t=Re(t))&&null!=e)return t[3]=Ae(e),Ye(t,"rgba")}function Ye(t,e){if(t&&t.length){var i=t[0]+","+t[1]+","+t[2];return"rgba"!==e&&"hsva"!==e&&"hsla"!==e||(i+=","+t[3]),e+"("+i+")"}}var je=(Object.freeze||Object)({parse:Re,lift:Ve,toHex:Ge,fastLerp:Fe,fastMapToColor:We,lerp:He,mapToColor:Ze,modifyHSL:Ue,modifyAlpha:Xe,stringify:Ye}),qe=Array.prototype.slice;function Ke(t,e){return t[e]}function $e(t,e,i){t[e]=i}function Je(t,e,i){return(e-t)*i+t}function Qe(t,e,i){return.5<i?e:t}function ti(t,e,i,n,o){var a=t.length;if(1===o)for(var r=0;r<a;r++)n[r]=Je(t[r],e[r],i);else{var s=a&&t[0].length;for(r=0;r<a;r++)for(var l=0;l<s;l++)n[r][l]=Je(t[r][l],e[r][l],i)}}function ei(t,e,i){var n=t.length,o=e.length;if(n!==o)if(o<n)t.length=o;else for(var a=n;a<o;a++)t.push(1===i?e[a]:qe.call(e[a]));var r=t[0]&&t[0].length;for(a=0;a<t.length;a++)if(1===i)isNaN(t[a])&&(t[a]=e[a]);else for(var s=0;s<r;s++)isNaN(t[a][s])&&(t[a][s]=e[a][s])}function ii(t,e,i){if(t===e)return!0;var n=t.length;if(n!==e.length)return!1;if(1===i){for(var o=0;o<n;o++)if(t[o]!==e[o])return!1}else{var a=t[0].length;for(o=0;o<n;o++)for(var r=0;r<a;r++)if(t[o][r]!==e[o][r])return!1}return!0}function ni(t,e,i,n,o,a,r,s,l){var u=t.length;if(1===l)for(var h=0;h<u;h++)s[h]=oi(t[h],e[h],i[h],n[h],o,a,r);else{var c=t[0].length;for(h=0;h<u;h++)for(var d=0;d<c;d++)s[h][d]=oi(t[h][d],e[h][d],i[h][d],n[h][d],o,a,r)}}function oi(t,e,i,n,o,a,r){var s=.5*(i-t),l=.5*(n-e);return(2*(e-i)+s+l)*r+(-3*(e-i)-2*s-l)*a+s*o+e}function ai(t){if(P(t)){var e=t.length;if(P(t[0])){for(var i=[],n=0;n<e;n++)i.push(qe.call(t[n]));return i}return qe.call(t)}return t}function ri(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")"}function si(t,e,i,n,a,o){var r=t._getter,s=t._setter,l="spline"===e,u=n.length;if(u){var h,c=P(n[0].value),d=!1,f=!1,p=c?function(t){var e=t[t.length-1].value;return P(e&&e[0])?2:1}(n):0;n.sort(function(t,e){return t.time-e.time}),h=n[u-1].time;for(var g=[],m=[],v=n[0].value,y=!0,x=0;x<u;x++){g.push(n[x].time/h);var _=n[x].value;if(c&&ii(_,v,p)||!c&&_===v||(y=!1),"string"==typeof(v=_)){var w=Re(_);w?(_=w,d=!0):f=!0}m.push(_)}if(o||!y){var b=m[u-1];for(x=0;x<u-1;x++)c?ei(m[x],b,p):!isNaN(m[x])||isNaN(b)||f||d||(m[x]=b);c&&ei(r(t._target,a),b,p);var S,M,I,T,A,D=0,C=0;if(d)var L=[0,0,0,0];var k=new xe({target:t._target,life:h,loop:t._loop,delay:t._delay,onframe:function(t,e){var i;if(e<0)i=0;else if(e<C){for(i=Math.min(D+1,u-1);0<=i&&!(g[i]<=e);i--);i=Math.min(i,u-2)}else{for(i=D;i<u&&!(g[i]>e);i++);i=Math.min(i-1,u-2)}C=e;var n=g[(D=i)+1]-g[i];if(0!=n)if(S=(e-g[i])/n,l)if(I=m[i],M=m[0===i?i:i-1],T=m[u-2<i?u-1:i+1],A=m[u-3<i?u-1:i+2],c)ni(M,I,T,A,S,S*S,S*S*S,r(t,a),p);else{if(d)o=ni(M,I,T,A,S,S*S,S*S*S,L,1),o=ri(L);else{if(f)return Qe(I,T,S);o=oi(M,I,T,A,S,S*S,S*S*S)}s(t,a,o)}else if(c)ti(m[i],m[i+1],S,r(t,a),p);else{var o;if(d)ti(m[i],m[i+1],S,L,1),o=ri(L);else{if(f)return Qe(m[i],m[i+1],S);o=Je(m[i],m[i+1],S)}s(t,a,o)}},ondestroy:i});return e&&"spline"!==e&&(k.easing=e),k}}}function li(t,e,i,n){this._tracks={},this._target=t,this._loop=e||!1,this._getter=i||Ke,this._setter=n||$e,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[]}li.prototype={when:function(t,e){var i=this._tracks;for(var n in e)if(e.hasOwnProperty(n)){if(!i[n]){i[n]=[];var o=this._getter(this._target,n);if(null==o)continue;0!==t&&i[n].push({time:0,value:ai(o)})}i[n].push({time:t,value:e[n]})}return this},during:function(t){return this._onframeList.push(t),this},pause:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].pause();this._paused=!0},resume:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].resume();this._paused=!1},isPaused:function(){return!!this._paused},_doneCallback:function(){this._tracks={},this._clipList.length=0;for(var t=this._doneList,e=t.length,i=0;i<e;i++)t[i].call(this)},start:function(t,e){function i(){--a||o._doneCallback()}var n,o=this,a=0;for(var r in this._tracks)if(this._tracks.hasOwnProperty(r)){var s=si(this,t,i,this._tracks[r],r,e);s&&(this._clipList.push(s),a++,this.animation&&this.animation.addClip(s),n=s)}if(n){var l=n.onframe;n.onframe=function(t,e){l(t,e);for(var i=0;i<o._onframeList.length;i++)o._onframeList[i](t,e)}}return a||this._doneCallback(),this},stop:function(t){for(var e=this._clipList,i=this.animation,n=0;n<e.length;n++){var o=e[n];t&&o.onframe(this._target,1),i&&i.removeClip(o)}e.length=0},delay:function(t){return this._delay=t,this},done:function(t){return t&&this._doneList.push(t),this},getClips:function(){return this._clipList}};var ui=1;"undefined"!=typeof window&&(ui=Math.max(window.devicePixelRatio||1,1));var hi=ui,ci=function(){};function di(){this.animators=[]}var fi=ci;function pi(t,e,i,n,o,a,r,s){z(n)?(a=o,o=n,n=0):O(o)?(a=o,o="linear",n=0):O(n)?(a=n,n=0):i=O(i)?(a=i,500):i||500,t.stopAnimation(),function t(e,i,n,o,a,r,s){var l={};var u=0;for(var h in o)o.hasOwnProperty(h)&&(null!=n[h]?R(o[h])&&!P(o[h])?t(e,i?i+"."+h:h,n[h],o[h],a,r,s):(s?(l[h]=n[h],gi(e,i,h,o[h])):l[h]=o[h],u++):null==o[h]||s||gi(e,i,h,o[h]));0<u&&e.animate(i,!1).when(null==a?500:a,l).delay(r||0)}(t,"",t,e,i,n,s);var l=t.animators.slice(),u=l.length;function h(){--u||a&&a()}u||a&&a();for(var c=0;c<l.length;c++)l[c].done(h).start(o,r)}function gi(t,e,i,n){if(e){var o={};o[e]={},o[e][i]=n,t.attr(o)}else t.attr(i,n)}di.prototype={constructor:di,animate:function(t,e){var i,n=!1,o=this,a=this.__zr;if(t){var r=t.split("."),s=o;n="shape"===r[0];for(var l=0,u=r.length;l<u;l++)s=s&&s[r[l]];s&&(i=s)}else i=o;if(i){var h=o.animators,c=new li(i,e);return c.during(function(t){o.dirty(n)}).done(function(){h.splice(_(h,c),1)}),h.push(c),a&&a.animation.addAnimator(c),c}fi('Property "'+t+'" is not existed in element '+o.id)},stopAnimation:function(t){for(var e=this.animators,i=e.length,n=0;n<i;n++)e[n].stop(t);return e.length=0,this},animateTo:function(t,e,i,n,o,a){pi(this,t,e,i,n,o,a)},animateFrom:function(t,e,i,n,o,a){pi(this,t,e,i,n,o,a,!0)}};var mi=function(t){fe.call(this,t),Ct.call(this,t),di.call(this,t),this.id=t.id||n()};mi.prototype={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,isGroup:!1,drift:function(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0}var i=this.transform;(i=i||(this.transform=[1,0,0,1,0,0]))[4]+=t,i[5]+=e,this.decomposeTransform(),this.dirty(!1)},beforeUpdate:function(){},afterUpdate:function(){},update:function(){this.updateTransform()},traverse:function(t,e){},attrKV:function(t,e){if("position"===t||"scale"===t||"origin"===t){if(e){var i=this[t];(i=i||(this[t]=[]))[0]=e[0],i[1]=e[1]}}else this[t]=e},hide:function(){this.ignore=!0,this.__zr&&this.__zr.refresh()},show:function(){this.ignore=!1,this.__zr&&this.__zr.refresh()},attr:function(t,e){if("string"==typeof t)this.attrKV(t,e);else if(R(t))for(var i in t)t.hasOwnProperty(i)&&this.attrKV(i,t[i]);return this.dirty(!1),this},setClipPath:function(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),(this.clipPath=t).__zr=e,(t.__clipTarget=this).dirty(!1)},removeClipPath:function(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1))},addSelfToZr:function(t){this.__zr=t;var e=this.animators;if(e)for(var i=0;i<e.length;i++)t.animation.addAnimator(e[i]);this.clipPath&&this.clipPath.addSelfToZr(t)},removeSelfFromZr:function(t){this.__zr=null;var e=this.animators;if(e)for(var i=0;i<e.length;i++)t.animation.removeAnimator(e[i]);this.clipPath&&this.clipPath.removeSelfFromZr(t)}},b(mi,di),b(mi,fe),b(mi,Ct);var vi,yi,xi,_i,wi=bt,bi=Math.min,Si=Math.max;function Mi(t,e,i,n){i<0&&(t+=i,i=-i),n<0&&(e+=n,n=-n),this.x=t,this.y=e,this.width=i,this.height=n}Mi.prototype={constructor:Mi,union:function(t){var e=bi(t.x,this.x),i=bi(t.y,this.y);this.width=Si(t.x+t.width,this.x+this.width)-e,this.height=Si(t.y+t.height,this.y+this.height)-i,this.x=e,this.y=i},applyTransform:(vi=[],yi=[],xi=[],_i=[],function(t){if(t){vi[0]=xi[0]=this.x,vi[1]=_i[1]=this.y,yi[0]=_i[0]=this.x+this.width,yi[1]=xi[1]=this.y+this.height,wi(vi,vi,t),wi(yi,yi,t),wi(xi,xi,t),wi(_i,_i,t),this.x=bi(vi[0],yi[0],xi[0],_i[0]),this.y=bi(vi[1],yi[1],xi[1],_i[1]);var e=Si(vi[0],yi[0],xi[0],_i[0]),i=Si(vi[1],yi[1],xi[1],_i[1]);this.width=e-this.x,this.height=i-this.y}}),calculateTransform:function(t){var e=t.width/this.width,i=t.height/this.height,n=ee();return ae(n,n,[-this.x,-this.y]),se(n,n,[e,i]),ae(n,n,[t.x,t.y]),n},intersect:function(t){if(!t)return!1;t instanceof Mi||(t=Mi.create(t));var e=this,i=e.x,n=e.x+e.width,o=e.y,a=e.y+e.height,r=t.x,s=t.x+t.width,l=t.y,u=t.y+t.height;return!(n<r||s<i||a<l||u<o)},contain:function(t,e){var i=this;return t>=i.x&&t<=i.x+i.width&&e>=i.y&&e<=i.y+i.height},clone:function(){return new Mi(this.x,this.y,this.width,this.height)},copy:function(t){this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height},plain:function(){return{x:this.x,y:this.y,width:this.width,height:this.height}}},Mi.create=function(t){return new Mi(t.x,t.y,t.width,t.height)};var Ii=function(t){for(var e in t=t||{},mi.call(this,t),t)t.hasOwnProperty(e)&&(this[e]=t[e]);this._children=[],this.__storage=null,this.__dirty=!0};Ii.prototype={constructor:Ii,isGroup:!0,type:"group",silent:!1,children:function(){return this._children.slice()},childAt:function(t){return this._children[t]},childOfName:function(t){for(var e=this._children,i=0;i<e.length;i++)if(e[i].name===t)return e[i]},childCount:function(){return this._children.length},add:function(t){return t&&t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),this},addBefore:function(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var i=this._children,n=i.indexOf(e);0<=n&&(i.splice(n,0,t),this._doAdd(t))}return this},_doAdd:function(t){t.parent&&t.parent.remove(t);var e=(t.parent=this).__storage,i=this.__zr;e&&e!==t.__storage&&(e.addToStorage(t),t instanceof Ii&&t.addChildrenToStorage(e)),i&&i.refresh()},remove:function(t){var e=this.__zr,i=this.__storage,n=this._children,o=_(n,t);return o<0||(n.splice(o,1),t.parent=null,i&&(i.delFromStorage(t),t instanceof Ii&&t.delChildrenFromStorage(i)),e&&e.refresh()),this},removeAll:function(){var t,e,i=this._children,n=this.__storage;for(e=0;e<i.length;e++)t=i[e],n&&(n.delFromStorage(t),t instanceof Ii&&t.delChildrenFromStorage(n)),t.parent=null;return i.length=0,this},eachChild:function(t,e){for(var i=this._children,n=0;n<i.length;n++){var o=i[n];t.call(e,o,n)}return this},traverse:function(t,e){for(var i=0;i<this._children.length;i++){var n=this._children[i];t.call(e,n),"group"===n.type&&n.traverse(t,e)}return this},addChildrenToStorage:function(t){for(var e=0;e<this._children.length;e++){var i=this._children[e];t.addToStorage(i),i instanceof Ii&&i.addChildrenToStorage(t)}},delChildrenFromStorage:function(t){for(var e=0;e<this._children.length;e++){var i=this._children[e];t.delFromStorage(i),i instanceof Ii&&i.delChildrenFromStorage(t)}},dirty:function(){return this.__dirty=!0,this.__zr&&this.__zr.refresh(),this},getBoundingRect:function(t){for(var e=null,i=new Mi(0,0,0,0),n=t||this._children,o=[],a=0;a<n.length;a++){var r=n[a];if(!r.ignore&&!r.invisible){var s=r.getBoundingRect(),l=r.getLocalTransform(o);l?(i.copy(s),i.applyTransform(l),(e=e||i.clone()).union(i)):(e=e||s.clone()).union(s)}}return e||i}},w(Ii,mi);var Ti=32,Ai=7;function Di(t,e,i,n){var o=e+1;if(o===i)return 1;if(n(t[o++],t[e])<0){for(;o<i&&n(t[o],t[o-1])<0;)o++;!function(t,e,i){i--;for(;e<i;){var n=t[e];t[e++]=t[i],t[i--]=n}}(t,e,o)}else for(;o<i&&0<=n(t[o],t[o-1]);)o++;return o-e}function Ci(t,e,i,n,o){for(n===e&&n++;n<i;n++){for(var a,r=t[n],s=e,l=n;s<l;)o(r,t[a=s+l>>>1])<0?l=a:s=1+a;var u=n-s;switch(u){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;0<u;)t[s+u]=t[s+u-1],u--}t[s]=r}}function Li(t,e,i,n,o,a){var r=0,s=0,l=1;if(0<a(t,e[i+o])){for(s=n-o;l<s&&0<a(t,e[i+o+l]);)(l=1+((r=l)<<1))<=0&&(l=s);s<l&&(l=s),r+=o,l+=o}else{for(s=o+1;l<s&&a(t,e[i+o-l])<=0;)(l=1+((r=l)<<1))<=0&&(l=s);s<l&&(l=s);var u=r;r=o-l,l=o-u}for(r++;r<l;){var h=r+(l-r>>>1);0<a(t,e[i+h])?r=h+1:l=h}return l}function ki(t,e,i,n,o,a){var r=0,s=0,l=1;if(a(t,e[i+o])<0){for(s=o+1;l<s&&a(t,e[i+o-l])<0;)(l=1+((r=l)<<1))<=0&&(l=s);s<l&&(l=s);var u=r;r=o-l,l=o-u}else{for(s=n-o;l<s&&0<=a(t,e[i+o+l]);)(l=1+((r=l)<<1))<=0&&(l=s);s<l&&(l=s),r+=o,l+=o}for(r++;r<l;){var h=r+(l-r>>>1);a(t,e[i+h])<0?l=h:r=h+1}return l}function Pi(p,g){var r,s,m=Ai,l=0,v=[];function e(t){var e=r[t],i=s[t],n=r[t+1],o=s[t+1];s[t]=i+o,t===l-3&&(r[t+1]=r[t+2],s[t+1]=s[t+2]),l--;var a=ki(p[n],p,e,i,0,g);e+=a,0!==(i-=a)&&0!==(o=Li(p[e+i-1],p,n,o,o-1,g))&&(i<=o?function(t,e,i,n){var o=0;for(o=0;o<e;o++)v[o]=p[t+o];var a=0,r=i,s=t;if(p[s++]=p[r++],0==--n){for(o=0;o<e;o++)p[s+o]=v[a+o];return}if(1===e){for(o=0;o<n;o++)p[s+o]=p[r+o];return p[s+n]=v[a]}var l,u,h,c=m;for(;;){u=l=0,h=!1;do{if(g(p[r],v[a])<0){if(p[s++]=p[r++],u++,(l=0)==--n){h=!0;break}}else if(p[s++]=v[a++],l++,u=0,1==--e){h=!0;break}}while((l|u)<c);if(h)break;do{if(0!==(l=ki(p[r],v,a,e,0,g))){for(o=0;o<l;o++)p[s+o]=v[a+o];if(s+=l,a+=l,(e-=l)<=1){h=!0;break}}if(p[s++]=p[r++],0==--n){h=!0;break}if(0!==(u=Li(v[a],p,r,n,0,g))){for(o=0;o<u;o++)p[s+o]=p[r+o];if(s+=u,r+=u,0===(n-=u)){h=!0;break}}if(p[s++]=v[a++],1==--e){h=!0;break}c--}while(Ai<=l||Ai<=u);if(h)break;c<0&&(c=0),c+=2}if((m=c)<1&&(m=1),1===e){for(o=0;o<n;o++)p[s+o]=p[r+o];p[s+n]=v[a]}else{if(0===e)throw new Error;for(o=0;o<e;o++)p[s+o]=v[a+o]}}(e,i,n,o):function(t,e,i,n){var o=0;for(o=0;o<n;o++)v[o]=p[i+o];var a=t+e-1,r=n-1,s=i+n-1,l=0,u=0;if(p[s--]=p[a--],0==--e){for(l=s-(n-1),o=0;o<n;o++)p[l+o]=v[o];return}if(1===n){for(u=(s-=e)+1,l=(a-=e)+1,o=e-1;0<=o;o--)p[u+o]=p[l+o];return p[s]=v[r]}var h=m;for(;;){var c=0,d=0,f=!1;do{if(g(v[r],p[a])<0){if(p[s--]=p[a--],c++,(d=0)==--e){f=!0;break}}else if(p[s--]=v[r--],d++,c=0,1==--n){f=!0;break}}while((c|d)<h);if(f)break;do{if(0!==(c=e-ki(v[r],p,t,e,e-1,g))){for(e-=c,u=(s-=c)+1,l=(a-=c)+1,o=c-1;0<=o;o--)p[u+o]=p[l+o];if(0===e){f=!0;break}}if(p[s--]=v[r--],1==--n){f=!0;break}if(0!==(d=n-Li(p[a],v,0,n,n-1,g))){for(n-=d,u=(s-=d)+1,l=(r-=d)+1,o=0;o<d;o++)p[u+o]=v[l+o];if(n<=1){f=!0;break}}if(p[s--]=p[a--],0==--e){f=!0;break}h--}while(Ai<=c||Ai<=d);if(f)break;h<0&&(h=0),h+=2}(m=h)<1&&(m=1);if(1===n){for(u=(s-=e)+1,l=(a-=e)+1,o=e-1;0<=o;o--)p[u+o]=p[l+o];p[s]=v[r]}else{if(0===n)throw new Error;for(l=s-(n-1),o=0;o<n;o++)p[l+o]=v[o]}}(e,i,n,o))}r=[],s=[],this.mergeRuns=function(){for(;1<l;){var t=l-2;if(1<=t&&s[t-1]<=s[t]+s[t+1]||2<=t&&s[t-2]<=s[t]+s[t-1])s[t-1]<s[t+1]&&t--;else if(s[t]>s[t+1])break;e(t)}},this.forceMergeRuns=function(){for(;1<l;){var t=l-2;0<t&&s[t-1]<s[t+1]&&t--,e(t)}},this.pushRun=function(t,e){r[l]=t,s[l]=e,l+=1}}function Ni(t,e,i,n){i=i||0;var o=(n=n||t.length)-i;if(!(o<2)){var a=0;if(o<Ti)Ci(t,i,n,i+(a=Di(t,i,n,e)),e);else{var r=new Pi(t,e),s=function(t){for(var e=0;Ti<=t;)e|=1&t,t>>=1;return t+e}(o);do{if((a=Di(t,i,n,e))<s){var l=o;s<l&&(l=s),Ci(t,i,i+l,i+a,e),a=l}r.pushRun(i,a),r.mergeRuns(),o-=a,i+=a}while(0!==o);r.forceMergeRuns()}}}function Oi(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel}function Ei(){this._roots=[],this._displayList=[],this._displayListLen=0}Ei.prototype={constructor:Ei,traverse:function(t,e){for(var i=0;i<this._roots.length;i++)this._roots[i].traverse(t,e)},getDisplayList:function(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList},updateDisplayList:function(t){this._displayListLen=0;for(var e=this._roots,i=this._displayList,n=0,o=e.length;n<o;n++)this._updateAndAddDisplayable(e[n],null,t);i.length=this._displayListLen,v.canvasSupported&&Ni(i,Oi)},_updateAndAddDisplayable:function(t,e,i){if(!t.ignore||i){t.beforeUpdate(),t.__dirty&&t.update(),t.afterUpdate();var n=t.clipPath;if(n){e=e?e.slice():[];for(var o=n,a=t;o;)o.parent=a,o.updateTransform(),e.push(o),o=(a=o).clipPath}if(t.isGroup){for(var r=t._children,s=0;s<r.length;s++){var l=r[s];t.__dirty&&(l.__dirty=!0),this._updateAndAddDisplayable(l,e,i)}t.__dirty=!1}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t}},addRoot:function(t){t.__storage!==this&&(t instanceof Ii&&t.addChildrenToStorage(this),this.addToStorage(t),this._roots.push(t))},delRoot:function(t){if(null==t){for(var e=0;e<this._roots.length;e++){var i=this._roots[e];i instanceof Ii&&i.delChildrenFromStorage(this)}return this._roots=[],this._displayList=[],void(this._displayListLen=0)}if(t instanceof Array){e=0;for(var n=t.length;e<n;e++)this.delRoot(t[e])}else{var o=_(this._roots,t);0<=o&&(this.delFromStorage(t),this._roots.splice(o,1),t instanceof Ii&&t.delChildrenFromStorage(this))}},addToStorage:function(t){return t&&(t.__storage=this,t.dirty(!1)),this},delFromStorage:function(t){return t&&(t.__storage=null),this},dispose:function(){this._renderList=this._roots=null},displayableSortFunc:Oi};var zi={shadowBlur:1,shadowOffsetX:1,shadowOffsetY:1,textShadowBlur:1,textShadowOffsetX:1,textShadowOffsetY:1,textBoxShadowBlur:1,textBoxShadowOffsetX:1,textBoxShadowOffsetY:1},Ri=function(t,e,i){return zi.hasOwnProperty(e)?i*t.dpr:i},Bi={NONE:0,STYLE_BIND:1,PLAIN_TEXT:2},Vi=9,Gi=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],Fi=function(t){this.extendFrom(t,!1)};function Wi(t,e,i){var n=null==e.x?0:e.x,o=null==e.x2?1:e.x2,a=null==e.y?0:e.y,r=null==e.y2?0:e.y2;return e.global||(n=n*i.width+i.x,o=o*i.width+i.x,a=a*i.height+i.y,r=r*i.height+i.y),n=isNaN(n)?0:n,o=isNaN(o)?1:o,a=isNaN(a)?0:a,r=isNaN(r)?0:r,t.createLinearGradient(n,a,o,r)}function Hi(t,e,i){var n=i.width,o=i.height,a=Math.min(n,o),r=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;return e.global||(r=r*n+i.x,s=s*o+i.y,l*=a),t.createRadialGradient(r,s,0,r,s,l)}Fi.prototype={constructor:Fi,fill:"#000",stroke:null,opacity:1,fillOpacity:null,strokeOpacity:null,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,font:null,textFont:null,fontStyle:null,fontWeight:null,fontSize:null,fontFamily:null,textTag:null,textFill:"#000",textStroke:null,textWidth:null,textHeight:null,textStrokeWidth:0,textLineHeight:null,textPosition:"inside",textRect:null,textOffset:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowColor:"transparent",textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textBoxShadowColor:"transparent",textBoxShadowBlur:0,textBoxShadowOffsetX:0,textBoxShadowOffsetY:0,transformText:!1,textRotation:0,textOrigin:null,textBackgroundColor:null,textBorderColor:null,textBorderWidth:0,textBorderRadius:0,textPadding:null,rich:null,truncate:null,blend:null,bind:function(t,e,i){var n=this,o=i&&i.style,a=!o||t.__attrCachedBy!==Bi.STYLE_BIND;t.__attrCachedBy=Bi.STYLE_BIND;for(var r=0;r<Gi.length;r++){var s=Gi[r],l=s[0];!a&&n[l]===o[l]||(t[l]=Ri(t,l,n[l]||s[1]))}if(!a&&n.fill===o.fill||(t.fillStyle=n.fill),!a&&n.stroke===o.stroke||(t.strokeStyle=n.stroke),!a&&n.opacity===o.opacity||(t.globalAlpha=null==n.opacity?1:n.opacity),!a&&n.blend===o.blend||(t.globalCompositeOperation=n.blend||"source-over"),this.hasStroke()){var u=n.lineWidth;t.lineWidth=u/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1)}},hasFill:function(){var t=this.fill;return null!=t&&"none"!==t},hasStroke:function(){var t=this.stroke;return null!=t&&"none"!==t&&0<this.lineWidth},extendFrom:function(t,e){if(t)for(var i in t)!t.hasOwnProperty(i)||!0!==e&&(!1===e?this.hasOwnProperty(i):null==t[i])||(this[i]=t[i])},set:function(t,e){"string"==typeof t?this[t]=e:this.extendFrom(t,!0)},clone:function(){var t=new this.constructor;return t.extendFrom(this,!0),t},getGradient:function(t,e,i){for(var n=("radial"===e.type?Hi:Wi)(t,e,i),o=e.colorStops,a=0;a<o.length;a++)n.addColorStop(o[a].offset,o[a].color);return n}};for(var Zi=Fi.prototype,Ui=0;Ui<Gi.length;Ui++){var Xi=Gi[Ui];Xi[0]in Zi||(Zi[Xi[0]]=Xi[1])}Fi.getGradient=Zi.getGradient;function Yi(t,e){this.image=t,this.repeat=e,this.type="pattern"}function ji(){return!1}function qi(t,e,i){var n=g(),o=e.getWidth(),a=e.getHeight(),r=n.style;return r&&(r.position="absolute",r.left=0,r.top=0,r.width=o+"px",r.height=a+"px",n.setAttribute("data-zr-dom-id",t)),n.width=o*i,n.height=a*i,n}function Ki(t,e,i){var n;i=i||hi,"string"==typeof t?n=qi(t,e,i):R(t)&&(t=(n=t).id),this.id=t;var o=(this.dom=n).style;o&&(n.onselectstart=ji,o["-webkit-user-select"]="none",o["user-select"]="none",o["-webkit-touch-callout"]="none",o["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",o.padding=0,o.margin=0,o["border-width"]=0),this.domBack=null,this.ctxBack=null,this.painter=e,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=i}Ki.prototype={constructor:Ki,__dirty:!0,__used:!(Yi.prototype.getCanvasPattern=function(t){return t.createPattern(this.image,this.repeat||"repeat")}),__drawIndex:0,__startIndex:0,__endIndex:0,incremental:!1,getElementCount:function(){return this.__endIndex-this.__startIndex},initContext:function(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr},createBackBuffer:function(){var t=this.dpr;this.domBack=qi("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!==t&&this.ctxBack.scale(t,t)},resize:function(t,e){var i=this.dpr,n=this.dom,o=n.style,a=this.domBack;o&&(o.width=t+"px",o.height=e+"px"),n.width=t*i,n.height=e*i,a&&(a.width=t*i,a.height=e*i,1!==i&&this.ctxBack.scale(i,i))},clear:function(t,e){var i,n=this.dom,o=this.ctx,a=n.width,r=n.height,s=(e=e||this.clearColor,this.motionBlur&&!t),l=this.lastFrameAlpha,u=this.dpr;s&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(n,0,0,a/u,r/u)),o.clearRect(0,0,a,r),e&&"transparent"!==e&&(e.colorStops?(i=e.__canvasGradient||Fi.getGradient(o,e,{x:0,y:0,width:a,height:r}),e.__canvasGradient=i):e.image&&(i=Yi.prototype.getCanvasPattern.call(e,o)),o.save(),o.fillStyle=i||e,o.fillRect(0,0,a,r),o.restore());if(s){var h=this.domBack;o.save(),o.globalAlpha=l,o.drawImage(h,0,0,a,r),o.restore()}}};var $i="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16)},Ji=new be(50);function Qi(t){if("string"!=typeof t)return t;var e=Ji.get(t);return e&&e.image}function tn(t,e,i,n,o){if(t){if("string"!=typeof t)return t;if(e&&e.__zrImageSrc===t||!i)return e;var a=Ji.get(t),r={hostEl:i,cb:n,cbPayload:o};return a?nn(e=a.image)||a.pending.push(r):((e=new Image).onload=e.onerror=en,Ji.put(t,e.__cachedImgObj={image:e,pending:[r]}),e.src=e.__zrImageSrc=t),e}return e}function en(){var t=this.__cachedImgObj;this.onload=this.onerror=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var i=t.pending[e],n=i.cb;n&&n(this,i.cbPayload),i.hostEl.dirty()}t.pending.length=0}function nn(t){return t&&t.width&&t.height}var on={},an=0,rn=5e3,sn=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,ln="12px sans-serif",un={};function hn(t,e){var i=t+":"+(e=e||ln);if(on[i])return on[i];for(var n,o,a=(t+"").split("\n"),r=0,s=0,l=a.length;s<l;s++)r=Math.max((n=a[s],o=e,un.measureText(n,o)).width,r);return rn<an&&(an=0,on={}),an++,on[i]=r}function cn(t,e,i,n,o,a,r,s){return r?function(t,e,i,n,o,a,r,s){var l=wn(t,{rich:r,truncate:s,font:e,textAlign:i,textPadding:o,textLineHeight:a}),u=l.outerWidth,h=l.outerHeight,c=dn(0,u,i),d=fn(0,h,n);return new Mi(c,d,u,h)}(t,e,i,n,o,a,r,s):function(t,e,i,n,o,a,r){var s=_n(t,e,o,a,r),l=hn(t,e);o&&(l+=o[1]+o[3]);var u=s.outerHeight,h=dn(0,l,i),c=fn(0,u,n),d=new Mi(h,c,l,u);return d.lineHeight=s.lineHeight,d}(t,e,i,n,o,a,s)}function dn(t,e,i){return"right"===i?t-=e:"center"===i&&(t-=e/2),t}function fn(t,e,i){return"middle"===i?t-=e/2:"bottom"===i&&(t-=e),t}function pn(t,e,i){var n=e.textPosition,o=e.textDistance,a=i.x,r=i.y;o=o||0;var s=i.height,l=i.width,u=s/2,h="left",c="top";switch(n){case"left":a-=o,r+=u,h="right",c="middle";break;case"right":a+=o+l,r+=u,c="middle";break;case"top":a+=l/2,r-=o,h="center",c="bottom";break;case"bottom":a+=l/2,r+=s+o,h="center";break;case"inside":a+=l/2,r+=u,h="center",c="middle";break;case"insideLeft":a+=o,r+=u,c="middle";break;case"insideRight":a+=l-o,r+=u,h="right",c="middle";break;case"insideTop":a+=l/2,r+=o,h="center";break;case"insideBottom":a+=l/2,r+=s-o,h="center",c="bottom";break;case"insideTopLeft":a+=o,r+=o;break;case"insideTopRight":a+=l-o,r+=o,h="right";break;case"insideBottomLeft":a+=o,r+=s-o,c="bottom";break;case"insideBottomRight":a+=l-o,r+=s-o,h="right",c="bottom"}return(t=t||{}).x=a,t.y=r,t.textAlign=h,t.textVerticalAlign=c,t}function gn(t,e,i,n,o){if(!e)return"";var a=(t+"").split("\n");o=mn(e,i,n,o);for(var r=0,s=a.length;r<s;r++)a[r]=vn(a[r],o);return a.join("\n")}function mn(t,e,i,n){(n=L({},n)).font=e;i=H(i,"...");n.maxIterations=H(n.maxIterations,2);var o=n.minChar=H(n.minChar,0);n.cnCharWidth=hn("国",e);var a=n.ascCharWidth=hn("a",e);n.placeholder=H(n.placeholder,"");for(var r=t=Math.max(0,t-1),s=0;s<o&&a<=r;s++)r-=a;var l=hn(i,e);return r<l&&(i="",l=0),r=t-l,n.ellipsis=i,n.ellipsisWidth=l,n.contentWidth=r,n.containerWidth=t,n}function vn(t,e){var i=e.containerWidth,n=e.font,o=e.contentWidth;if(!i)return"";var a=hn(t,n);if(a<=i)return t;for(var r=0;;r++){if(a<=o||r>=e.maxIterations){t+=e.ellipsis;break}var s=0===r?yn(t,o,e.ascCharWidth,e.cnCharWidth):0<a?Math.floor(t.length*o/a):0;a=hn(t=t.substr(0,s),n)}return""===t&&(t=e.placeholder),t}function yn(t,e,i,n){for(var o=0,a=0,r=t.length;a<r&&o<e;a++){var s=t.charCodeAt(a);o+=0<=s&&s<=127?i:n}return a}function xn(t){return hn("国",t)}function _n(t,e,i,n,o){null!=t&&(t+="");var a=H(n,xn(e)),r=t?t.split("\n"):[],s=r.length*a,l=s,u=!0;if(i&&(l+=i[0]+i[2]),t&&o){u=!1;var h=o.outerHeight,c=o.outerWidth;if(null!=h&&h<l)t="",r=[];else if(null!=c)for(var d=mn(c-(i?i[1]+i[3]:0),e,o.ellipsis,{minChar:o.minChar,placeholder:o.placeholder}),f=0,p=r.length;f<p;f++)r[f]=vn(r[f],d)}return{lines:r,height:s,outerHeight:l,lineHeight:a,canCacheByTextString:u}}function wn(t,e){var i={lines:[],width:0,height:0};if(null!=t&&(t+=""),!t)return i;for(var n,o=sn.lastIndex=0;null!=(n=sn.exec(t));){var a=n.index;o<a&&bn(i,t.substring(o,a)),bn(i,n[2],n[1]),o=sn.lastIndex}o<t.length&&bn(i,t.substring(o,t.length));var r=i.lines,s=0,l=0,u=[],h=e.textPadding,c=e.truncate,d=c&&c.outerWidth,f=c&&c.outerHeight;h&&(null!=d&&(d-=h[1]+h[3]),null!=f&&(f-=h[0]+h[2]));for(var p=0;p<r.length;p++){for(var g=r[p],m=0,v=0,y=0;y<g.tokens.length;y++){var x=(C=g.tokens[y]).styleName&&e.rich[C.styleName]||{},_=C.textPadding=x.textPadding,w=C.font=x.font||e.font,b=C.textHeight=H(x.textHeight,xn(w));if(_&&(b+=_[0]+_[2]),C.height=b,C.lineHeight=Z(x.textLineHeight,e.textLineHeight,b),C.textAlign=x&&x.textAlign||e.textAlign,C.textVerticalAlign=x&&x.textVerticalAlign||"middle",null!=f&&s+C.lineHeight>f)return{lines:[],width:0,height:0};C.textWidth=hn(C.text,w);var S=x.textWidth,M=null==S||"auto"===S;if("string"==typeof S&&"%"===S.charAt(S.length-1))C.percentWidth=S,u.push(C),S=0;else{if(M){S=C.textWidth;var I=x.textBackgroundColor,T=I&&I.image;T&&nn(T=Qi(T))&&(S=Math.max(S,T.width*b/T.height))}var A=_?_[1]+_[3]:0;S+=A;var D=null!=d?d-v:null;null!=D&&D<S&&(!M||D<A?(C.text="",C.textWidth=S=0):(C.text=gn(C.text,D-A,w,c.ellipsis,{minChar:c.minChar}),C.textWidth=hn(C.text,w),S=C.textWidth+A))}v+=C.width=S,x&&(m=Math.max(m,C.lineHeight))}g.width=v,s+=g.lineHeight=m,l=Math.max(l,v)}i.outerWidth=i.width=H(e.textWidth,l),i.outerHeight=i.height=H(e.textHeight,s),h&&(i.outerWidth+=h[1]+h[3],i.outerHeight+=h[0]+h[2]);for(p=0;p<u.length;p++){var C,L=(C=u[p]).percentWidth;C.width=parseInt(L,10)/100*l}return i}function bn(t,e,i){for(var n=""===e,o=e.split("\n"),a=t.lines,r=0;r<o.length;r++){var s=o[r],l={styleName:i,text:s,isLineHolder:!s&&!n};if(r)a.push({tokens:[l]});else{var u=(a[a.length-1]||(a[0]={tokens:[]})).tokens,h=u.length;1===h&&u[0].isLineHolder?u[0]=l:!s&&h&&!n||u.push(l)}}}function Sn(t){var e=(t.fontSize||t.fontFamily)&&[t.fontStyle,t.fontWeight,(t.fontSize||12)+"px",t.fontFamily||"sans-serif"].join(" ");return e&&j(e)||t.textFont||t.font}function Mn(t,e){var i,n,o,a,r,s=e.x,l=e.y,u=e.width,h=e.height,c=e.r;u<0&&(s+=u,u=-u),h<0&&(l+=h,h=-h),"number"==typeof c?i=n=o=a=c:c instanceof Array?1===c.length?i=n=o=a=c[0]:2===c.length?(i=o=c[0],n=a=c[1]):3===c.length?(i=c[0],n=a=c[1],o=c[2]):(i=c[0],n=c[1],o=c[2],a=c[3]):i=n=o=a=0,u<i+n&&(i*=u/(r=i+n),n*=u/r),u<o+a&&(o*=u/(r=o+a),a*=u/r),h<n+o&&(n*=h/(r=n+o),o*=h/r),h<i+a&&(i*=h/(r=i+a),a*=h/r),t.moveTo(s+i,l),t.lineTo(s+u-n,l),0!==n&&t.arc(s+u-n,l+n,n,-Math.PI/2,0),t.lineTo(s+u,l+h-o),0!==o&&t.arc(s+u-o,l+h-o,o,0,Math.PI/2),t.lineTo(s+a,l+h),0!==a&&t.arc(s+a,l+h-a,a,Math.PI/2,Math.PI),t.lineTo(s,l+i),0!==i&&t.arc(s+i,l+i,i,Math.PI,1.5*Math.PI)}un.measureText=function(t,e){var i=x();return i.font=e||ln,i.measureText(t)};var In=ln,Tn={left:1,right:1,center:1},An={top:1,bottom:1,middle:1},Dn=[["textShadowBlur","shadowBlur",0],["textShadowOffsetX","shadowOffsetX",0],["textShadowOffsetY","shadowOffsetY",0],["textShadowColor","shadowColor","transparent"]],Cn={},Ln={};function kn(t){return Pn(t),E(t.rich,Pn),t}function Pn(t){if(t){t.font=Sn(t);var e=t.textAlign;"middle"===e&&(e="center"),t.textAlign=null==e||Tn[e]?e:"left";var i=t.textVerticalAlign||t.textBaseline;"center"===i&&(i="middle"),t.textVerticalAlign=null==i||An[i]?i:"top",t.textPadding&&(t.textPadding=X(t.textPadding))}}function Nn(t,e,i,n,o,a){n.rich?function(t,e,i,n,o,a){a!==Vi&&(e.__attrCachedBy=Bi.NONE);var r=t.__textCotentBlock;r&&!t.__dirtyText||(r=t.__textCotentBlock=wn(i,n));!function(t,e,i,n,o){var a=i.width,r=i.outerWidth,s=i.outerHeight,l=n.textPadding,u=Vn(Ln,t,n,o),h=u.baseX,c=u.baseY,d=u.textAlign,f=u.textVerticalAlign;On(e,n,o,h,c);var p=dn(h,r,d),g=fn(c,s,f),m=p,v=g;l&&(m+=l[3],v+=l[0]);var y=m+a;zn(n)&&Rn(t,e,n,p,g,r,s);for(var x=0;x<i.lines.length;x++){for(var _,w=i.lines[x],b=w.tokens,S=b.length,M=w.lineHeight,I=w.width,T=0,A=m,D=y,C=S-1;T<S&&(!(_=b[T]).textAlign||"left"===_.textAlign);)En(t,e,_,n,M,v,A,"left"),I-=_.width,A+=_.width,T++;for(;0<=C&&"right"===(_=b[C]).textAlign;)En(t,e,_,n,M,v,D,"right"),I-=_.width,D-=_.width,C--;for(A+=(a-(A-m)-(y-D)-I)/2;T<=C;)_=b[T],En(t,e,_,n,M,v,A+_.width/2,"center"),A+=_.width,T++;v+=M}}(t,e,r,n,o)}(t,e,i,n,o,a):function(t,e,i,n,o,a){var r,s=zn(n),l=!1,u=e.__attrCachedBy===Bi.PLAIN_TEXT;a!==Vi?(a&&(r=a.style,l=!s&&u&&r),e.__attrCachedBy=s?Bi.NONE:Bi.PLAIN_TEXT):u&&(e.__attrCachedBy=Bi.NONE);var h=n.font||In;l&&h===(r.font||In)||(e.font=h);var c=t.__computedFont;t.__styleFont!==h&&(t.__styleFont=h,c=t.__computedFont=e.font);var d=n.textPadding,f=n.textLineHeight,p=t.__textCotentBlock;p&&!t.__dirtyText||(p=t.__textCotentBlock=_n(i,c,d,f,n.truncate));var g=p.outerHeight,m=p.lines,v=p.lineHeight,y=Vn(Ln,t,n,o),x=y.baseX,_=y.baseY,w=y.textAlign||"left",b=y.textVerticalAlign;On(e,n,o,x,_);var S=fn(_,g,b),M=x,I=S;if(s||d){var T=hn(i,c);d&&(T+=d[1]+d[3]);var A=dn(x,T,w);s&&Rn(t,e,n,A,S,T,g),d&&(M=Zn(x,w,d),I+=d[0])}e.textAlign=w,e.textBaseline="middle",e.globalAlpha=n.opacity||1;for(var D=0;D<Dn.length;D++){var C=Dn[D],L=C[0],k=C[1],P=n[L];l&&P===r[L]||(e[k]=Ri(e,k,P||C[2]))}I+=v/2;var N=n.textStrokeWidth,O=l?r.textStrokeWidth:null,E=!l||N!==O,z=!l||E||n.textStroke!==r.textStroke,R=Fn(n.textStroke,N),B=Wn(n.textFill);R&&(E&&(e.lineWidth=N),z&&(e.strokeStyle=R));B&&(l&&n.textFill===r.textFill||(e.fillStyle=B));if(1===m.length)R&&e.strokeText(m[0],M,I),B&&e.fillText(m[0],M,I);else for(D=0;D<m.length;D++)R&&e.strokeText(m[D],M,I),B&&e.fillText(m[D],M,I),I+=v}(t,e,i,n,o,a)}function On(t,e,i,n,o){if(i&&e.textRotation){var a=e.textOrigin;"center"===a?(n=i.width/2+i.x,o=i.height/2+i.y):a&&(n=a[0]+i.x,o=a[1]+i.y),t.translate(n,o),t.rotate(-e.textRotation),t.translate(-n,-o)}}function En(t,e,i,n,o,a,r,s){var l=n.rich[i.styleName]||{};l.text=i.text;var u=i.textVerticalAlign,h=a+o/2;"top"===u?h=a+i.height/2:"bottom"===u&&(h=a+o-i.height/2),!i.isLineHolder&&zn(l)&&Rn(t,e,l,"right"===s?r-i.width:"center"===s?r-i.width/2:r,h-i.height/2,i.width,i.height);var c=i.textPadding;c&&(r=Zn(r,s,c),h-=i.height/2-c[2]-i.textHeight/2),Gn(e,"shadowBlur",Z(l.textShadowBlur,n.textShadowBlur,0)),Gn(e,"shadowColor",l.textShadowColor||n.textShadowColor||"transparent"),Gn(e,"shadowOffsetX",Z(l.textShadowOffsetX,n.textShadowOffsetX,0)),Gn(e,"shadowOffsetY",Z(l.textShadowOffsetY,n.textShadowOffsetY,0)),Gn(e,"textAlign",s),Gn(e,"textBaseline","middle"),Gn(e,"font",i.font||In);var d=Fn(l.textStroke||n.textStroke,p),f=Wn(l.textFill||n.textFill),p=H(l.textStrokeWidth,n.textStrokeWidth);d&&(Gn(e,"lineWidth",p),Gn(e,"strokeStyle",d),e.strokeText(i.text,r,h)),f&&(Gn(e,"fillStyle",f),e.fillText(i.text,r,h))}function zn(t){return!!(t.textBackgroundColor||t.textBorderWidth&&t.textBorderColor)}function Rn(t,e,i,n,o,a,r){var s=i.textBackgroundColor,l=i.textBorderWidth,u=i.textBorderColor,h=z(s);if(Gn(e,"shadowBlur",i.textBoxShadowBlur||0),Gn(e,"shadowColor",i.textBoxShadowColor||"transparent"),Gn(e,"shadowOffsetX",i.textBoxShadowOffsetX||0),Gn(e,"shadowOffsetY",i.textBoxShadowOffsetY||0),h||l&&u){e.beginPath();var c=i.textBorderRadius;c?Mn(e,{x:n,y:o,width:a,height:r,r:c}):e.rect(n,o,a,r),e.closePath()}if(h)if(Gn(e,"fillStyle",s),null!=i.fillOpacity){var d=e.globalAlpha;e.globalAlpha=i.fillOpacity*i.opacity,e.fill(),e.globalAlpha=d}else e.fill();else if(R(s)){var f=s.image;(f=tn(f,null,t,Bn,s))&&nn(f)&&e.drawImage(f,n,o,a,r)}if(l&&u)if(Gn(e,"lineWidth",l),Gn(e,"strokeStyle",u),null!=i.strokeOpacity){d=e.globalAlpha;e.globalAlpha=i.strokeOpacity*i.opacity,e.stroke(),e.globalAlpha=d}else e.stroke()}function Bn(t,e){e.image=t}function Vn(t,e,i,n){var o=i.x||0,a=i.y||0,r=i.textAlign,s=i.textVerticalAlign;if(n){var l=i.textPosition;if(l instanceof Array)o=n.x+Hn(l[0],n.width),a=n.y+Hn(l[1],n.height);else{var u=e&&e.calculateTextPosition?e.calculateTextPosition(Cn,i,n):pn(Cn,i,n);o=u.x,a=u.y,r=r||u.textAlign,s=s||u.textVerticalAlign}var h=i.textOffset;h&&(o+=h[0],a+=h[1])}return(t=t||{}).baseX=o,t.baseY=a,t.textAlign=r,t.textVerticalAlign=s,t}function Gn(t,e,i){return t[e]=Ri(t,e,i),t[e]}function Fn(t,e){return null==t||e<=0||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t}function Wn(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t}function Hn(t,e){return"string"==typeof t?0<=t.lastIndexOf("%")?parseFloat(t)/100*e:parseFloat(t):t}function Zn(t,e,i){return"right"===e?t-i[1]:"center"===e?t+i[3]/2-i[1]/2:t+i[3]}function Un(t,e){return null!=t&&(t||e.textBackgroundColor||e.textBorderWidth&&e.textBorderColor||e.textPadding)}function Xn(){}var Yn=new Mi;function jn(t){for(var e in t=t||{},mi.call(this,t),t)t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);this.style=new Fi(t.style,this),this._rect=null,this.__clipPaths=null}function qn(t){jn.call(this,t)}jn.prototype={constructor:jn,type:"displayable",__dirty:!0,invisible:!(Xn.prototype={constructor:Xn,drawRectText:function(t,e){var i=this.style;e=i.textRect||e,this.__dirty&&kn(i);var n=i.text;if(null!=n&&(n+=""),Un(n,i)){t.save();var o=this.transform;i.transformText?this.setTransform(t):o&&(Yn.copy(e),Yn.applyTransform(o),e=Yn),Nn(this,t,n,i,e,Vi),t.restore()}}}),z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:!1,incremental:!1,globalScaleRatio:1,beforeBrush:function(t){},afterBrush:function(t){},brush:function(t,e){},getBoundingRect:function(){},contain:function(t,e){return this.rectContain(t,e)},traverse:function(t,e){t.call(e,this)},rectContain:function(t,e){var i=this.transformCoordToLocal(t,e);return this.getBoundingRect().contain(i[0],i[1])},dirty:function(){this.__dirty=this.__dirtyText=!0,this._rect=null,this.__zr&&this.__zr.refresh()},animateStyle:function(t){return this.animate("style",t)},attrKV:function(t,e){"style"!==t?mi.prototype.attrKV.call(this,t,e):this.style.set(e)},setStyle:function(t,e){return this.style.set(t,e),this.dirty(!1),this},useStyle:function(t){return this.style=new Fi(t,this),this.dirty(!1),this},calculateTextPosition:null},w(jn,mi),b(jn,Xn),qn.prototype={constructor:qn,type:"image",brush:function(t,e){var i=this.style,n=i.image;i.bind(t,this,e);var o=this._image=tn(n,this._image,this,this.onload);if(o&&nn(o)){var a=i.x||0,r=i.y||0,s=i.width,l=i.height,u=o.width/o.height;if(null==s&&null!=l?s=l*u:null==l&&null!=s?l=s/u:null==s&&null==l&&(s=o.width,l=o.height),this.setTransform(t),i.sWidth&&i.sHeight){var h=i.sx||0,c=i.sy||0;t.drawImage(o,h,c,i.sWidth,i.sHeight,a,r,s,l)}else if(i.sx&&i.sy){var d=s-(h=i.sx),f=l-(c=i.sy);t.drawImage(o,h,c,d,f,a,r,s,l)}else t.drawImage(o,a,r,s,l);null!=i.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))}},getBoundingRect:function(){var t=this.style;return this._rect||(this._rect=new Mi(t.x||0,t.y||0,t.width||0,t.height||0)),this._rect}},w(qn,jn);var Kn=314159;function $n(t){return parseInt(t,10)}var Jn=new Mi(0,0,0,0),Qn=new Mi(0,0,0,0);function to(t,e,i){this.type="canvas";var n=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=i=L({},i||{}),this.dpr=i.devicePixelRatio||hi,this._singleCanvas=n;var o=(this.root=t).style;o&&(o["-webkit-tap-highlight-color"]="transparent",o["-webkit-user-select"]=o["user-select"]=o["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var a=this._zlevelList=[],r=this._layers={};if(this._layerConfig={},this._needsManuallyCompositing=!1,n){var s=t.width,l=t.height;null!=i.width&&(s=i.width),null!=i.height&&(l=i.height),this.dpr=i.devicePixelRatio||1,t.width=s*this.dpr,t.height=l*this.dpr,this._width=s,this._height=l;var u=new Ki(t,this,this.dpr);u.__builtin__=!0,u.initContext(),(r[Kn]=u).zlevel=Kn,a.push(Kn),this._domRoot=t}else{this._width=this._getSize(0),this._height=this._getSize(1);var h=this._domRoot=function(t,e){var i=document.createElement("div");return i.style.cssText=["position:relative","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",i}(this._width,this._height);t.appendChild(h)}this._hoverlayer=null,this._hoverElements=[]}to.prototype={constructor:to,getType:function(){return"canvas"},isSingleCanvas:function(){return this._singleCanvas},getViewportRoot:function(){return this._domRoot},getViewportRootOffset:function(){var t=this.getViewportRoot();if(t)return{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}},refresh:function(t){var e=this.storage.getDisplayList(!0),i=this._zlevelList;this._redrawId=Math.random(),this._paintList(e,t,this._redrawId);for(var n=0;n<i.length;n++){var o=i[n],a=this._layers[o];if(!a.__builtin__&&a.refresh){var r=0===n?this._backgroundColor:null;a.refresh(r)}}return this.refreshHover(),this},addHover:function(t,e){if(!t.__hoverMir){var i=new t.constructor({style:t.style,shape:t.shape,z:t.z,z2:t.z2,silent:t.silent});return(i.__from=t).__hoverMir=i,e&&i.setStyle(e),this._hoverElements.push(i),i}},removeHover:function(t){var e=t.__hoverMir,i=this._hoverElements,n=_(i,e);0<=n&&i.splice(n,1),t.__hoverMir=null},clearHover:function(t){for(var e=this._hoverElements,i=0;i<e.length;i++){var n=e[i].__from;n&&(n.__hoverMir=null)}e.length=0},refreshHover:function(){var t=this._hoverElements,e=t.length,i=this._hoverlayer;if(i&&i.clear(),e){Ni(t,this.storage.displayableSortFunc);var n={};(i=i||(this._hoverlayer=this.getLayer(1e5))).ctx.save();for(var o=0;o<e;){var a=t[o],r=a.__from;r&&r.__zr?(o++,r.invisible||(a.transform=r.transform,a.invTransform=r.invTransform,a.__clipPaths=r.__clipPaths,this._doPaintEl(a,i,!0,n))):(t.splice(o,1),r.__hoverMir=null,e--)}i.ctx.restore()}},getHoverLayer:function(){return this.getLayer(1e5)},_paintList:function(t,e,i){if(this._redrawId===i){e=e||!1,this._updateLayerStatus(t);var n=this._doPaintList(t,e);if(this._needsManuallyCompositing&&this._compositeManually(),!n){var o=this;$i(function(){o._paintList(t,e,i)})}}},_compositeManually:function(){var e=this.getLayer(Kn).ctx,i=this._domRoot.width,n=this._domRoot.height;e.clearRect(0,0,i,n),this.eachBuiltinLayer(function(t){t.virtual&&e.drawImage(t.dom,0,0,i,n)})},_doPaintList:function(t,e){for(var i=[],n=0;n<this._zlevelList.length;n++){var o=this._zlevelList[n];(s=this._layers[o]).__builtin__&&s!==this._hoverlayer&&(s.__dirty||e)&&i.push(s)}for(var a=!0,r=0;r<i.length;r++){var s,l=(s=i[r]).ctx,u={};l.save();var h=e?s.__startIndex:s.__drawIndex,c=!e&&s.incremental&&Date.now,d=c&&Date.now(),f=s.zlevel===this._zlevelList[0]?this._backgroundColor:null;if(s.__startIndex===s.__endIndex)s.clear(!1,f);else if(h===s.__startIndex){var p=t[h];p.incremental&&p.notClear&&!e||s.clear(!1,f)}-1===h&&(console.error("For some unknown reason. drawIndex is -1"),h=s.__startIndex);for(var g=h;g<s.__endIndex;g++){var m=t[g];if(this._doPaintEl(m,s,e,u),m.__dirty=m.__dirtyText=!1,c)if(15<Date.now()-d)break}s.__drawIndex=g,s.__drawIndex<s.__endIndex&&(a=!1),u.prevElClipPaths&&l.restore(),l.restore()}return v.wxa&&E(this._layers,function(t){t&&t.ctx&&t.ctx.draw&&t.ctx.draw()}),a},_doPaintEl:function(t,e,i,n){var o=e.ctx,a=t.transform;if((e.__dirty||i)&&!t.invisible&&0!==t.style.opacity&&(!a||a[0]||a[3])&&(!t.culling||!function(t,e,i){return Jn.copy(t.getBoundingRect()),t.transform&&Jn.applyTransform(t.transform),Qn.width=e,Qn.height=i,!Jn.intersect(Qn)}(t,this._width,this._height))){var r=t.__clipPaths,s=n.prevElClipPaths;s&&!function(t,e){if(t===e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var i=0;i<t.length;i++)if(t[i]!==e[i])return!0;return!1}(r,s)||(s&&(o.restore(),n.prevElClipPaths=null,n.prevEl=null),r&&(o.save(),function(t,e){for(var i=0;i<t.length;i++){var n=t[i];n.setTransform(e),e.beginPath(),n.buildPath(e,n.shape),e.clip(),n.restoreTransform(e)}}(r,o),n.prevElClipPaths=r)),t.beforeBrush&&t.beforeBrush(o),t.brush(o,n.prevEl||null),(n.prevEl=t).afterBrush&&t.afterBrush(o)}},getLayer:function(t,e){this._singleCanvas&&!this._needsManuallyCompositing&&(t=Kn);var i=this._layers[t];return i||((i=new Ki("zr_"+t,this,this.dpr)).zlevel=t,i.__builtin__=!0,this._layerConfig[t]&&m(i,this._layerConfig[t],!0),e&&(i.virtual=e),this.insertLayer(t,i),i.initContext()),i},insertLayer:function(t,e){var i=this._layers,n=this._zlevelList,o=n.length,a=null,r=-1,s=this._domRoot;if(i[t])fi("ZLevel "+t+" has been used already");else if(function(t){return!!t&&(!!t.__builtin__||"function"==typeof t.resize&&"function"==typeof t.refresh)}(e)){if(0<o&&t>n[0]){for(r=0;r<o-1&&!(n[r]<t&&n[r+1]>t);r++);a=i[n[r]]}if(n.splice(r+1,0,t),!(i[t]=e).virtual)if(a){var l=a.dom;l.nextSibling?s.insertBefore(e.dom,l.nextSibling):s.appendChild(e.dom)}else s.firstChild?s.insertBefore(e.dom,s.firstChild):s.appendChild(e.dom)}else fi("Layer of zlevel "+t+" is not valid")},eachLayer:function(t,e){var i,n,o=this._zlevelList;for(n=0;n<o.length;n++)i=o[n],t.call(e,this._layers[i],i)},eachBuiltinLayer:function(t,e){var i,n,o,a=this._zlevelList;for(o=0;o<a.length;o++)n=a[o],(i=this._layers[n]).__builtin__&&t.call(e,i,n)},eachOtherLayer:function(t,e){var i,n,o,a=this._zlevelList;for(o=0;o<a.length;o++)n=a[o],(i=this._layers[n]).__builtin__||t.call(e,i,n)},getLayers:function(){return this._layers},_updateLayerStatus:function(t){function e(t){n&&(n.__endIndex!==t&&(n.__dirty=!0),n.__endIndex=t)}if(this.eachBuiltinLayer(function(t,e){t.__dirty=t.__used=!1}),this._singleCanvas)for(var i=1;i<t.length;i++){if((a=t[i]).zlevel!==t[i-1].zlevel||a.incremental){this._needsManuallyCompositing=!0;break}}var n=null,o=0;for(i=0;i<t.length;i++){var a,r,s=(a=t[i]).zlevel;a.incremental?((r=this.getLayer(s+.001,this._needsManuallyCompositing)).incremental=!0,o=1):r=this.getLayer(s+(0<o?.01:0),this._needsManuallyCompositing),r.__builtin__||fi("ZLevel "+s+" has been used by unkown layer "+r.id),r!==n&&(r.__used=!0,r.__startIndex!==i&&(r.__dirty=!0),r.__startIndex=i,r.incremental?r.__drawIndex=-1:r.__drawIndex=i,e(i),n=r),a.__dirty&&(r.__dirty=!0,r.incremental&&r.__drawIndex<0&&(r.__drawIndex=i))}e(i),this.eachBuiltinLayer(function(t,e){!t.__used&&0<t.getElementCount()&&(t.__dirty=!0,t.__startIndex=t.__endIndex=t.__drawIndex=0),t.__dirty&&t.__drawIndex<0&&(t.__drawIndex=t.__startIndex)})},clear:function(){return this.eachBuiltinLayer(this._clearLayer),this},_clearLayer:function(t){t.clear()},setBackgroundColor:function(t){this._backgroundColor=t},configLayer:function(t,e){if(e){var i=this._layerConfig;i[t]?m(i[t],e,!0):i[t]=e;for(var n=0;n<this._zlevelList.length;n++){var o=this._zlevelList[n];if(o===t||o===t+.01)m(this._layers[o],i[t],!0)}}},delLayer:function(t){var e=this._layers,i=this._zlevelList,n=e[t];n&&(n.dom.parentNode.removeChild(n.dom),delete e[t],i.splice(_(i,t),1))},resize:function(e,i){if(this._domRoot.style){var t=this._domRoot;t.style.display="none";var n=this._opts;if(null!=e&&(n.width=e),null!=i&&(n.height=i),e=this._getSize(0),i=this._getSize(1),t.style.display="",this._width!==e||i!==this._height){for(var o in t.style.width=e+"px",t.style.height=i+"px",this._layers)this._layers.hasOwnProperty(o)&&this._layers[o].resize(e,i);E(this._progressiveLayers,function(t){t.resize(e,i)}),this.refresh(!0)}this._width=e,this._height=i}else{if(null==e||null==i)return;this._width=e,this._height=i,this.getLayer(Kn).resize(e,i)}return this},clearLayer:function(t){var e=this._layers[t];e&&e.clear()},dispose:function(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null},getRenderedCanvas:function(t){if(t=t||{},this._singleCanvas&&!this._compositeManually)return this._layers[Kn].dom;var e=new Ki("image",this,t.pixelRatio||this.dpr);if(e.initContext(),e.clear(!1,t.backgroundColor||this._backgroundColor),t.pixelRatio<=this.dpr){this.refresh();var i=e.dom.width,n=e.dom.height,o=e.ctx;this.eachLayer(function(t){t.__builtin__?o.drawImage(t.dom,0,0,i,n):t.renderToCanvas&&(e.ctx.save(),t.renderToCanvas(e.ctx),e.ctx.restore())})}else for(var a={},r=this.storage.getDisplayList(!0),s=0;s<r.length;s++){var l=r[s];this._doPaintEl(l,e,!0,a)}return e.dom},getWidth:function(){return this._width},getHeight:function(){return this._height},_getSize:function(t){var e=this._opts,i=["width","height"][t],n=["clientWidth","clientHeight"][t],o=["paddingLeft","paddingTop"][t],a=["paddingRight","paddingBottom"][t];if(null!=e[i]&&"auto"!==e[i])return parseFloat(e[i]);var r=this.root,s=document.defaultView.getComputedStyle(r);return(r[n]||$n(s[i])||$n(r.style[i]))-($n(s[o])||0)-($n(s[a])||0)|0},pathToImage:function(t,e){e=e||this.dpr;var i=document.createElement("canvas"),n=i.getContext("2d"),o=t.getBoundingRect(),a=t.style,r=a.shadowBlur*e,s=a.shadowOffsetX*e,l=a.shadowOffsetY*e,u=a.hasStroke()?a.lineWidth:0,h=Math.max(u/2,r-s),c=Math.max(u/2,s+r),d=Math.max(u/2,r-l),f=Math.max(u/2,l+r),p=o.width+h+c,g=o.height+d+f;i.width=p*e,i.height=g*e,n.scale(e,e),n.clearRect(0,0,p,g),n.dpr=e;var m={position:t.position,rotation:t.rotation,scale:t.scale};t.position=[h-o.x,d-o.y],t.rotation=0,t.scale=[1,1],t.updateTransform(),t&&t.brush(n);var v=new qn({style:{x:0,y:0,image:i}});return null!=m.position&&(v.position=t.position=m.position),null!=m.rotation&&(v.rotation=t.rotation=m.rotation),null!=m.scale&&(v.scale=t.scale=m.scale),v}};function eo(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,Ct.call(this)}eo.prototype={constructor:eo,addClip:function(t){this._clips.push(t)},addAnimator:function(t){t.animation=this;for(var e=t.getClips(),i=0;i<e.length;i++)this.addClip(e[i])},removeClip:function(t){var e=_(this._clips,t);0<=e&&this._clips.splice(e,1)},removeAnimator:function(t){for(var e=t.getClips(),i=0;i<e.length;i++)this.removeClip(e[i]);t.animation=null},_update:function(){for(var t=(new Date).getTime()-this._pausedTime,e=t-this._time,i=this._clips,n=i.length,o=[],a=[],r=0;r<n;r++){var s=i[r],l=s.step(t,e);l&&(o.push(l),a.push(s))}for(r=0;r<n;)i[r]._needsRemove?(i[r]=i[n-1],i.pop(),n--):r++;n=o.length;for(r=0;r<n;r++)a[r].fire(o[r]);this._time=t,this.onframe(e),this.trigger("frame",e),this.stage.update&&this.stage.update()},_startLoop:function(){var e=this;this._running=!0,$i(function t(){e._running&&($i(t),e._paused||e._update())})},start:function(){this._time=(new Date).getTime(),this._pausedTime=0,this._startLoop()},stop:function(){this._running=!1},pause:function(){this._paused||(this._pauseStart=(new Date).getTime(),this._paused=!0)},resume:function(){this._paused&&(this._pausedTime+=(new Date).getTime()-this._pauseStart,this._paused=!1)},clear:function(){this._clips=[]},isFinished:function(){return!this._clips.length},animate:function(t,e){var i=new li(t,(e=e||{}).loop,e.getter,e.setter);return this.addAnimator(i),i}},b(eo,Ct);var io,no,oo=v.domSupported,ao=(no={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},{mouse:io=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],touch:["touchstart","touchend","touchmove"],pointer:N(io,function(t){var e=t.replace("mouse","pointer");return no.hasOwnProperty(e)?e:t})}),ro={mouse:["mousemove","mouseup"],pointer:["pointermove","pointerup"]};function so(t){return"mousewheel"===t&&v.browser.firefox?"DOMMouseScroll":t}function lo(t){var e=t.pointerType;return"pen"===e||"touch"===e}function uo(t){t&&(t.zrByTouch=!0)}function ho(t,e){for(var i=!1;(e=e&&e.parentNode)&&9!==e.nodeType&&!(i=e===t.painterRoot););return i}function co(t,e){this.type=e.type,this.target=this.currentTarget=t.dom,this.pointerType=e.pointerType,this.clientX=e.clientX,this.clientY=e.clientY}var fo=co.prototype;fo.stopPropagation=fo.stopImmediatePropagation=fo.preventDefault=et;var po={mousedown:function(t){t=Gt(this.dom,t),this._mayPointerCapture=[t.zrX,t.zrY],this.trigger("mousedown",t)},mousemove:function(t){t=Gt(this.dom,t);var e=this._mayPointerCapture;!e||t.zrX===e[0]&&t.zrY===e[1]||_o(this,!0),this.trigger("mousemove",t)},mouseup:function(t){t=Gt(this.dom,t),_o(this,!1),this.trigger("mouseup",t)},mouseout:function(t){t=Gt(this.dom,t),this._pointerCapturing&&(t.zrEventControl="no_globalout");var e=t.toElement||t.relatedTarget;t.zrIsToLocalDOM=ho(this,e),this.trigger("mouseout",t)},touchstart:function(t){uo(t=Gt(this.dom,t)),this._lastTouchMoment=new Date,this.handler.processGesture(t,"start"),po.mousemove.call(this,t),po.mousedown.call(this,t)},touchmove:function(t){uo(t=Gt(this.dom,t)),this.handler.processGesture(t,"change"),po.mousemove.call(this,t)},touchend:function(t){uo(t=Gt(this.dom,t)),this.handler.processGesture(t,"end"),po.mouseup.call(this,t),+new Date-this._lastTouchMoment<300&&po.click.call(this,t)},pointerdown:function(t){po.mousedown.call(this,t)},pointermove:function(t){lo(t)||po.mousemove.call(this,t)},pointerup:function(t){po.mouseup.call(this,t)},pointerout:function(t){lo(t)||po.mouseout.call(this,t)}};E(["click","mousewheel","dblclick","contextmenu"],function(e){po[e]=function(t){t=Gt(this.dom,t),this.trigger(e,t)}});var go={pointermove:function(t){lo(t)||go.mousemove.call(this,t)},pointerup:function(t){go.mouseup.call(this,t)},mousemove:function(t){this.trigger("mousemove",t)},mouseup:function(t){var e=this._pointerCapturing;_o(this,!1),this.trigger("mouseup",t),e&&(t.zrEventControl="only_globalout",this.trigger("mouseout",t))}};function mo(i,n){var o=n.domHandlers;v.pointerEventsSupported?E(ao.pointer,function(e){yo(n,e,function(t){o[e].call(i,t)})}):(v.touchEventsSupported&&E(ao.touch,function(e){yo(n,e,function(t){o[e].call(i,t),function(t){t.touching=!0,null!=t.touchTimer&&(clearTimeout(t.touchTimer),t.touchTimer=null),t.touchTimer=setTimeout(function(){t.touching=!1,t.touchTimer=null},700)}(n)})}),E(ao.mouse,function(e){yo(n,e,function(t){t=Vt(t),n.touching||o[e].call(i,t)})}))}function vo(i,n){function t(e){yo(n,e,function(t){t=Vt(t),ho(i,t.target)||(t=function(t,e){return Gt(t.dom,new co(t,e),!0)}(i,t),n.domHandlers[e].call(i,t))},{capture:!0})}v.pointerEventsSupported?E(ro.pointer,t):v.touchEventsSupported||E(ro.mouse,t)}function yo(t,e,i,n){t.mounted[e]=i,t.listenerOpts[e]=n,Ft(t.domTarget,so(e),i,n)}function xo(t){var e,i,n,o,a=t.mounted;for(var r in a)a.hasOwnProperty(r)&&(e=t.domTarget,i=so(r),n=a[r],o=t.listenerOpts[r],Nt?e.removeEventListener(i,n,o):e.detachEvent("on"+i,n));t.mounted={}}function _o(t,e){if(t._mayPointerCapture=null,oo&&t._pointerCapturing^e){t._pointerCapturing=e;var i=t._globalHandlerScope;e?vo(t,i):xo(i)}}function wo(t,e){this.domTarget=t,this.domHandlers=e,this.mounted={},this.listenerOpts={},this.touchTimer=null,this.touching=!1}function bo(t,e){Ct.call(this),this.dom=t,this.painterRoot=e,this._localHandlerScope=new wo(t,po),oo&&(this._globalHandlerScope=new wo(document,go)),this._pointerCapturing=!1,this._mayPointerCapture=null,mo(this,this._localHandlerScope)}var So=bo.prototype;So.dispose=function(){xo(this._localHandlerScope),oo&&xo(this._globalHandlerScope)},So.setCursor=function(t){this.dom.style&&(this.dom.style.cursor=t||"default")},b(bo,Ct);var Mo=!v.canvasSupported,Io={canvas:to},To={};function Ao(t,e){var i=new Co(n(),t,e);return To[i.id]=i}function Do(t,e){Io[t]=e}var Co=function(t,e,i){i=i||{},this.dom=e,this.id=t;var n=this,o=new Ei,a=i.renderer;if(Mo){if(!Io.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");a="vml"}else a&&Io[a]||(a="canvas");var r=new Io[a](e,o,i,t);this.storage=o,this.painter=r;var s=v.node||v.worker?null:new bo(r.getViewportRoot(),r.root);this.handler=new Kt(o,r,s,r.root),this.animation=new eo({stage:{update:A(this.flush,this)}}),this.animation.start(),this._needsRefresh;var l=o.delFromStorage,u=o.addToStorage;o.delFromStorage=function(t){l.call(o,t),t&&t.removeSelfFromZr(n)},o.addToStorage=function(t){u.call(o,t),t.addSelfToZr(n)}};Co.prototype={constructor:Co,getId:function(){return this.id},add:function(t){this.storage.addRoot(t),this._needsRefresh=!0},remove:function(t){this.storage.delRoot(t),this._needsRefresh=!0},configLayer:function(t,e){this.painter.configLayer&&this.painter.configLayer(t,e),this._needsRefresh=!0},setBackgroundColor:function(t){this.painter.setBackgroundColor&&this.painter.setBackgroundColor(t),this._needsRefresh=!0},refreshImmediately:function(){this._needsRefresh=this._needsRefreshHover=!1,this.painter.refresh(),this._needsRefresh=this._needsRefreshHover=!1},refresh:function(){this._needsRefresh=!0},flush:function(){var t;this._needsRefresh&&(t=!0,this.refreshImmediately()),this._needsRefreshHover&&(t=!0,this.refreshHoverImmediately()),t&&this.trigger("rendered")},addHover:function(t,e){if(this.painter.addHover){var i=this.painter.addHover(t,e);return this.refreshHover(),i}},removeHover:function(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover())},clearHover:function(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover())},refreshHover:function(){this._needsRefreshHover=!0},refreshHoverImmediately:function(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover()},resize:function(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize()},clearAnimation:function(){this.animation.clear()},getWidth:function(){return this.painter.getWidth()},getHeight:function(){return this.painter.getHeight()},pathToImage:function(t,e){return this.painter.pathToImage(t,e)},setCursorStyle:function(t){this.handler.setCursorStyle(t)},findHover:function(t,e){return this.handler.findHover(t,e)},on:function(t,e,i){this.handler.on(t,e,i)},off:function(t,e){this.handler.off(t,e)},trigger:function(t,e){this.handler.trigger(t,e)},clear:function(){this.storage.delRoot(),this.painter.clear()},dispose:function(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,function(t){delete To[t]}(this.id)}};var Lo=(Object.freeze||Object)({version:"4.2.0",init:Ao,dispose:function(t){if(t)t.dispose();else{for(var e in To)To.hasOwnProperty(e)&&To[e].dispose();To={}}return this},getInstance:function(t){return To[t]},registerPainter:Do}),ko=E,Po=R,No=k,Oo="series\0";function Eo(t){return t instanceof Array?t:null==t?[]:[t]}function zo(t,e,i){if(t){t[e]=t[e]||{},t.emphasis=t.emphasis||{},t.emphasis[e]=t.emphasis[e]||{};for(var n=0,o=i.length;n<o;n++){var a=i[n];!t.emphasis[e].hasOwnProperty(a)&&t[e].hasOwnProperty(a)&&(t.emphasis[e][a]=t[e][a])}}}var Ro=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"];function Bo(t){return!Po(t)||No(t)||t instanceof Date?t:t.value}function Vo(t,o){o=(o||[]).slice();var a=N(t||[],function(t,e){return{exist:t}});return ko(o,function(t,e){if(Po(t)){for(var i=0;i<a.length;i++)if(!a[i].option&&null!=t.id&&a[i].exist.id===t.id+"")return a[i].option=t,void(o[e]=null);for(i=0;i<a.length;i++){var n=a[i].exist;if(!(a[i].option||null!=n.id&&null!=t.id||null==t.name||Wo(t)||Wo(n)||n.name!==t.name+""))return a[i].option=t,void(o[e]=null)}}}),ko(o,function(t,e){if(Po(t)){for(var i=0;i<a.length;i++){var n=a[i].exist;if(!a[i].option&&!Wo(n)&&null==t.id){a[i].option=t;break}}i>=a.length&&a.push({option:t})}}),a}function Go(t){var r=Q();ko(t,function(t,e){var i=t.exist;i&&r.set(i.id,t)}),ko(t,function(t,e){var i=t.option;Y(!i||null==i.id||!r.get(i.id)||r.get(i.id)===t,"id duplicates: "+(i&&i.id)),i&&null!=i.id&&r.set(i.id,t),t.keyInfo||(t.keyInfo={})}),ko(t,function(t,e){var i=t.exist,n=t.option,o=t.keyInfo;if(Po(n)){if(o.name=null!=n.name?n.name+"":i?i.name:Oo+e,i)o.id=i.id;else if(null!=n.id)o.id=n.id+"";else for(var a=0;o.id="\0"+o.name+"\0"+a++,r.get(o.id););r.set(o.id,t)}})}function Fo(t){var e=t.name;return!(!e||!e.indexOf(Oo))}function Wo(t){return Po(t)&&t.id&&0===(t.id+"").indexOf("\0_ec_\0")}function Ho(e,t){return null!=t.dataIndexInside?t.dataIndexInside:null!=t.dataIndex?k(t.dataIndex)?N(t.dataIndex,function(t){return e.indexOfRawIndex(t)}):e.indexOfRawIndex(t.dataIndex):null!=t.name?k(t.name)?N(t.name,function(t){return e.indexOfName(t)}):e.indexOfName(t.name):void 0}function Zo(){var e="__\0ec_inner_"+Uo+++"_"+Math.random().toFixed(5);return function(t){return t[e]||(t[e]={})}}var Uo=0;function Xo(s,l,u){if(z(l)){var t={};t[l+"Index"]=0,l=t}var e=u&&u.defaultMainType;!e||Yo(l,e+"Index")||Yo(l,e+"Id")||Yo(l,e+"Name")||(l[e+"Index"]=0);var h={};return ko(l,function(t,e){t=l[e];if("dataIndex"!==e&&"dataIndexInside"!==e){var i=e.match(/^(\w+)(Index|Id|Name)$/)||[],n=i[1],o=(i[2]||"").toLowerCase();if(!(!n||!o||null==t||"index"===o&&"none"===t||u&&u.includeMainTypes&&_(u.includeMainTypes,n)<0)){var a={mainType:n};"index"===o&&"all"===t||(a[o]=t);var r=s.queryComponents(a);h[n+"Models"]=r,h[n+"Model"]=r[0]}}else h[e]=t}),h}function Yo(t,e){return t&&t.hasOwnProperty(e)}function jo(t,e,i){t.setAttribute?t.setAttribute(e,i):t[e]=i}function qo(t){return"auto"===t?v.domSupported?"html":"richText":t||"html"}function Ko(t,i){var n=Q(),o=[];return E(t,function(t){var e=i(t);(n.get(e)||(o.push(e),n.set(e,[]))).push(t)}),{keys:o,buckets:n}}var $o=".",Jo="___EC__COMPONENT__CONTAINER___";function Qo(t){var e={main:"",sub:""};return t&&(t=t.split($o),e.main=t[0]||"",e.sub=t[1]||""),e}function ta(t){(t.$constructor=t).extend=function(t){function e(){t.$constructor?t.$constructor.apply(this,arguments):i.apply(this,arguments)}var i=this;return L(e.prototype,t),e.extend=this.extend,e.superCall=na,e.superApply=oa,w(e,this),e.superClass=i,e}}var ea=0;function ia(t){var e=["__\0is_clz",ea++,Math.random().toFixed(3)].join("_");t.prototype[e]=!0,t.isInstance=function(t){return!(!t||!t[e])}}function na(t,e){var i=U(arguments,2);return this.superClass.prototype[e].apply(t,i)}function oa(t,e,i){return this.superClass.prototype[e].apply(t,i)}function aa(i,t){t=t||{};var o={};if(i.registerClass=function(t,e){if(e)if(function(t){Y(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal')}(e),(e=Qo(e)).sub){if(e.sub!==Jo){(function(t){var e=o[t.main];e&&e[Jo]||((e=o[t.main]={})[Jo]=!0);return e})(e)[e.sub]=t}}else o[e.main]=t;return t},i.getClass=function(t,e,i){var n=o[t];if(n&&n[Jo]&&(n=e?n[e]:null),i&&!n)throw new Error(e?"Component "+t+"."+(e||"")+" not exists. Load it first.":t+".type should be specified.");return n},i.getClassesByMainType=function(t){t=Qo(t);var i=[],e=o[t.main];return e&&e[Jo]?E(e,function(t,e){e!==Jo&&i.push(t)}):i.push(e),i},i.hasClass=function(t){return t=Qo(t),!!o[t.main]},i.getAllClassMainTypes=function(){var i=[];return E(o,function(t,e){i.push(e)}),i},i.hasSubTypes=function(t){t=Qo(t);var e=o[t.main];return e&&e[Jo]},i.parseClassType=Qo,t.registerWhenExtend){var n=i.extend;n&&(i.extend=function(t){var e=n.call(this,t);return i.registerClass(e,t.type)})}return i}function ra(s){for(var t=0;t<s.length;t++)s[t][1]||(s[t][1]=s[t][0]);return function(t,e,i){for(var n={},o=0;o<s.length;o++){var a=s[o][1];if(!(e&&0<=_(e,a)||i&&_(i,a)<0)){var r=t.getShallow(a);null!=r&&(n[s[o][0]]=r)}}return n}}var sa=ra([["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),la={getLineStyle:function(t){var e=sa(this,t);return e.lineDash=this.getLineDash(e.lineWidth),e},getLineDash:function(t){null==t&&(t=1);var e=this.get("type"),i=Math.max(t,2),n=4*t;return"solid"!==e&&null!=e&&("dashed"===e?[n,n]:[i,i])}},ua=ra([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),ha={getAreaStyle:function(t,e){return ua(this,t,e)}},ca=Math.pow,da=Math.sqrt,fa=1e-8,pa=1e-4,ga=da(3),ma=1/3,va=ot(),ya=ot(),xa=ot();function _a(t){return-fa<t&&t<fa}function wa(t){return fa<t||t<-fa}function ba(t,e,i,n,o){var a=1-o;return a*a*(a*t+3*o*e)+o*o*(o*n+3*a*i)}function Sa(t,e,i,n,o){var a=1-o;return 3*(((e-t)*a+2*(i-e)*o)*a+(n-i)*o*o)}function Ma(t,e,i,n,o){var a=6*i-12*e+6*t,r=9*e+3*n-3*t-9*i,s=3*e-3*t,l=0;if(_a(r)){if(wa(a))0<=(h=-s/a)&&h<=1&&(o[l++]=h)}else{var u=a*a-4*r*s;if(_a(u))o[0]=-a/(2*r);else if(0<u){var h,c=da(u),d=(-a-c)/(2*r);0<=(h=(-a+c)/(2*r))&&h<=1&&(o[l++]=h),0<=d&&d<=1&&(o[l++]=d)}}return l}function Ia(t,e,i,n,o,a){var r=(e-t)*o+t,s=(i-e)*o+e,l=(n-i)*o+i,u=(s-r)*o+r,h=(l-s)*o+s,c=(h-u)*o+u;a[0]=t,a[1]=r,a[2]=u,a[3]=c,a[4]=c,a[5]=h,a[6]=l,a[7]=n}function Ta(t,e,i,n){var o=1-n;return o*(o*t+2*n*e)+n*n*i}function Aa(t,e,i,n){return 2*((1-n)*(e-t)+n*(i-e))}function Da(t,e,i){var n=t+i-2*e;return 0==n?.5:(t-e)/n}function Ca(t,e,i,n,o){var a=(e-t)*n+t,r=(i-e)*n+e,s=(r-a)*n+a;o[0]=t,o[1]=a,o[2]=s,o[3]=s,o[4]=r,o[5]=i}var La=Math.min,ka=Math.max,Pa=Math.sin,Na=Math.cos,Oa=2*Math.PI,Ea=ot(),za=ot(),Ra=ot();function Ba(t,e,i){if(0!==t.length){var n,o=t[0],a=o[0],r=o[0],s=o[1],l=o[1];for(n=1;n<t.length;n++)o=t[n],a=La(a,o[0]),r=ka(r,o[0]),s=La(s,o[1]),l=ka(l,o[1]);e[0]=a,e[1]=s,i[0]=r,i[1]=l}}function Va(t,e,i,n,o,a){o[0]=La(t,i),o[1]=La(e,n),a[0]=ka(t,i),a[1]=ka(e,n)}var Ga=[],Fa=[];function Wa(t,e,i,n,o,a,r,s,l,u){var h,c=Ma,d=ba,f=c(t,i,o,r,Ga);for(l[0]=1/0,l[1]=1/0,u[0]=-1/0,u[1]=-1/0,h=0;h<f;h++){var p=d(t,i,o,r,Ga[h]);l[0]=La(p,l[0]),u[0]=ka(p,u[0])}for(f=c(e,n,a,s,Fa),h=0;h<f;h++){var g=d(e,n,a,s,Fa[h]);l[1]=La(g,l[1]),u[1]=ka(g,u[1])}l[0]=La(t,l[0]),u[0]=ka(t,u[0]),l[0]=La(r,l[0]),u[0]=ka(r,u[0]),l[1]=La(e,l[1]),u[1]=ka(e,u[1]),l[1]=La(s,l[1]),u[1]=ka(s,u[1])}function Ha(t,e,i,n,o,a,r,s,l){var u=St,h=Mt,c=Math.abs(o-a);if(c%Oa<1e-4&&1e-4<c)return s[0]=t-i,s[1]=e-n,l[0]=t+i,void(l[1]=e+n);if(Ea[0]=Na(o)*i+t,Ea[1]=Pa(o)*n+e,za[0]=Na(a)*i+t,za[1]=Pa(a)*n+e,u(s,Ea,za),h(l,Ea,za),(o%=Oa)<0&&(o+=Oa),(a%=Oa)<0&&(a+=Oa),a<o&&!r?a+=Oa:o<a&&r&&(o+=Oa),r){var d=a;a=o,o=d}for(var f=0;f<a;f+=Math.PI/2)o<f&&(Ra[0]=Na(f)*i+t,Ra[1]=Pa(f)*n+e,u(s,Ra,s),h(l,Ra,l))}var Za={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},Ua=[],Xa=[],Ya=[],ja=[],qa=Math.min,Ka=Math.max,$a=Math.cos,Ja=Math.sin,Qa=Math.sqrt,tr=Math.abs,er="undefined"!=typeof Float32Array,ir=function(t){this._saveData=!t,this._saveData&&(this.data=[]),this._ctx=null};function nr(t,e,i,n,o,a,r){if(0===o)return!1;var s=o,l=0;if(e+s<r&&n+s<r||r<e-s&&r<n-s||t+s<a&&i+s<a||a<t-s&&a<i-s)return!1;if(t===i)return Math.abs(a-t)<=s/2;var u=(l=(e-n)/(t-i))*a-r+(t*n-i*e)/(t-i);return u*u/(l*l+1)<=s/2*s/2}function or(t,e,i,n,o,a,r,s,l,u,h){if(0===l)return!1;var c=l;return!(e+c<h&&n+c<h&&a+c<h&&s+c<h||h<e-c&&h<n-c&&h<a-c&&h<s-c||t+c<u&&i+c<u&&o+c<u&&r+c<u||u<t-c&&u<i-c&&u<o-c&&u<r-c)&&function(t,e,i,n,o,a,r,s,l,u,h){var c,d,f,p,g,m=.005,v=1/0;va[0]=l,va[1]=u;for(var y=0;y<1;y+=.05)ya[0]=ba(t,i,o,r,y),ya[1]=ba(e,n,a,s,y),(p=_t(va,ya))<v&&(c=y,v=p);v=1/0;for(var x=0;x<32&&!(m<pa);x++)d=c-m,f=c+m,ya[0]=ba(t,i,o,r,d),ya[1]=ba(e,n,a,s,d),p=_t(ya,va),0<=d&&p<v?(c=d,v=p):(xa[0]=ba(t,i,o,r,f),xa[1]=ba(e,n,a,s,f),g=_t(xa,va),f<=1&&g<v?(c=f,v=g):m*=.5);return h&&(h[0]=ba(t,i,o,r,c),h[1]=ba(e,n,a,s,c)),da(v)}(t,e,i,n,o,a,r,s,u,h,null)<=c/2}function ar(t,e,i,n,o,a,r,s,l){if(0===r)return!1;var u=r;return!(e+u<l&&n+u<l&&a+u<l||l<e-u&&l<n-u&&l<a-u||t+u<s&&i+u<s&&o+u<s||s<t-u&&s<i-u&&s<o-u)&&function(t,e,i,n,o,a,r,s,l){var u,h=.005,c=1/0;va[0]=r,va[1]=s;for(var d=0;d<1;d+=.05){ya[0]=Ta(t,i,o,d),ya[1]=Ta(e,n,a,d),(m=_t(va,ya))<c&&(u=d,c=m)}c=1/0;for(var f=0;f<32&&!(h<pa);f++){var p=u-h,g=u+h;ya[0]=Ta(t,i,o,p),ya[1]=Ta(e,n,a,p);var m=_t(ya,va);if(0<=p&&m<c)u=p,c=m;else{xa[0]=Ta(t,i,o,g),xa[1]=Ta(e,n,a,g);var v=_t(xa,va);g<=1&&v<c?(u=g,c=v):h*=.5}}return l&&(l[0]=Ta(t,i,o,u),l[1]=Ta(e,n,a,u)),da(c)}(t,e,i,n,o,a,s,l,null)<=u/2}ir.prototype={constructor:ir,_xi:0,_yi:0,_x0:0,_y0:0,_ux:0,_uy:0,_len:0,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function(t,e,i){i=i||0,this._ux=tr(i/hi/t)||0,this._uy=tr(i/hi/e)||0},getContext:function(){return this._ctx},beginPath:function(t){return(this._ctx=t)&&t.beginPath(),t&&(this.dpr=t.dpr),this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this},moveTo:function(t,e){return this.addData(Za.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this},lineTo:function(t,e){var i=tr(t-this._xi)>this._ux||tr(e-this._yi)>this._uy||this._len<5;return this.addData(Za.L,t,e),this._ctx&&i&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),i&&(this._xi=t,this._yi=e),this},bezierCurveTo:function(t,e,i,n,o,a){return this.addData(Za.C,t,e,i,n,o,a),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,i,n,o,a):this._ctx.bezierCurveTo(t,e,i,n,o,a)),this._xi=o,this._yi=a,this},quadraticCurveTo:function(t,e,i,n){return this.addData(Za.Q,t,e,i,n),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,i,n):this._ctx.quadraticCurveTo(t,e,i,n)),this._xi=i,this._yi=n,this},arc:function(t,e,i,n,o,a){return this.addData(Za.A,t,e,i,i,n,o-n,0,a?0:1),this._ctx&&this._ctx.arc(t,e,i,n,o,a),this._xi=$a(o)*i+t,this._yi=Ja(o)*i+e,this},arcTo:function(t,e,i,n,o){return this._ctx&&this._ctx.arcTo(t,e,i,n,o),this},rect:function(t,e,i,n){return this._ctx&&this._ctx.rect(t,e,i,n),this.addData(Za.R,t,e,i,n),this},closePath:function(){this.addData(Za.Z);var t=this._ctx,e=this._x0,i=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,i),t.closePath()),this._xi=e,this._yi=i,this},fill:function(t){t&&t.fill(),this.toStatic()},stroke:function(t){t&&t.stroke(),this.toStatic()},setLineDash:function(t){if(t instanceof Array){this._lineDash=t;for(var e=this._dashIdx=0,i=0;i<t.length;i++)e+=t[i];this._dashSum=e}return this},setLineDashOffset:function(t){return this._dashOffset=t,this},len:function(){return this._len},setData:function(t){var e=t.length;this.data&&this.data.length===e||!er||(this.data=new Float32Array(e));for(var i=0;i<e;i++)this.data[i]=t[i];this._len=e},appendPath:function(t){t instanceof Array||(t=[t]);for(var e=t.length,i=0,n=this._len,o=0;o<e;o++)i+=t[o].len();er&&this.data instanceof Float32Array&&(this.data=new Float32Array(n+i));for(o=0;o<e;o++)for(var a=t[o].data,r=0;r<a.length;r++)this.data[n++]=a[r];this._len=n},addData:function(t){if(this._saveData){var e=this.data;this._len+arguments.length>e.length&&(this._expandData(),e=this.data);for(var i=0;i<arguments.length;i++)e[this._len++]=arguments[i];this._prevCmd=t}},_expandData:function(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++)t[e]=this.data[e];this.data=t}},_needsDash:function(){return this._lineDash},_dashedLineTo:function(t,e){var i,n,o=this._dashSum,a=this._dashOffset,r=this._lineDash,s=this._ctx,l=this._xi,u=this._yi,h=t-l,c=e-u,d=Qa(h*h+c*c),f=l,p=u,g=r.length;for(a<0&&(a=o+a),f-=(a%=o)*(h/=d),p-=a*(c/=d);0<h&&f<=t||h<0&&t<=f||0===h&&(0<c&&p<=e||c<0&&e<=p);)f+=h*(i=r[n=this._dashIdx]),p+=c*i,this._dashIdx=(n+1)%g,0<h&&f<l||h<0&&l<f||0<c&&p<u||c<0&&u<p||s[n%2?"moveTo":"lineTo"](0<=h?qa(f,t):Ka(f,t),0<=c?qa(p,e):Ka(p,e));h=f-t,c=p-e,this._dashOffset=-Qa(h*h+c*c)},_dashedBezierTo:function(t,e,i,n,o,a){var r,s,l,u,h,c=this._dashSum,d=this._dashOffset,f=this._lineDash,p=this._ctx,g=this._xi,m=this._yi,v=ba,y=0,x=this._dashIdx,_=f.length,w=0;for(d<0&&(d=c+d),d%=c,r=0;r<1;r+=.1)s=v(g,t,i,o,r+.1)-v(g,t,i,o,r),l=v(m,e,n,a,r+.1)-v(m,e,n,a,r),y+=Qa(s*s+l*l);for(;x<_&&!(d<(w+=f[x]));x++);for(r=(w-d)/y;r<=1;)u=v(g,t,i,o,r),h=v(m,e,n,a,r),x%2?p.moveTo(u,h):p.lineTo(u,h),r+=f[x]/y,x=(x+1)%_;x%2!=0&&p.lineTo(o,a),s=o-u,l=a-h,this._dashOffset=-Qa(s*s+l*l)},_dashedQuadraticTo:function(t,e,i,n){var o=i,a=n;i=(i+2*t)/3,n=(n+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,i,n,o,a)},toStatic:function(){var t=this.data;t instanceof Array&&(t.length=this._len,er&&(this.data=new Float32Array(t)))},getBoundingRect:function(){Ua[0]=Ua[1]=Ya[0]=Ya[1]=Number.MAX_VALUE,Xa[0]=Xa[1]=ja[0]=ja[1]=-Number.MAX_VALUE;for(var t,e,i,n,o,a,r,s,l,u,h,c,d,f,p=this.data,g=0,m=0,v=0,y=0,x=0;x<p.length;){var _=p[x++];switch(1===x&&(v=g=p[x],y=m=p[x+1]),_){case Za.M:g=v=p[x++],m=y=p[x++],Ya[0]=v,Ya[1]=y,ja[0]=v,ja[1]=y;break;case Za.L:Va(g,m,p[x],p[x+1],Ya,ja),g=p[x++],m=p[x++];break;case Za.C:Wa(g,m,p[x++],p[x++],p[x++],p[x++],p[x],p[x+1],Ya,ja),g=p[x++],m=p[x++];break;case Za.Q:t=g,e=m,i=p[x++],n=p[x++],o=p[x],a=p[x+1],r=Ya,s=ja,u=l=void 0,u=Ta,h=ka(La((l=Da)(t,i,o),1),0),c=ka(La(l(e,n,a),1),0),d=u(t,i,o,h),f=u(e,n,a,c),r[0]=La(t,o,d),r[1]=La(e,a,f),s[0]=ka(t,o,d),s[1]=ka(e,a,f),g=p[x++],m=p[x++];break;case Za.A:var w=p[x++],b=p[x++],S=p[x++],M=p[x++],I=p[x++],T=p[x++]+I;x+=1;var A=1-p[x++];1===x&&(v=$a(I)*S+w,y=Ja(I)*M+b),Ha(w,b,S,M,I,T,A,Ya,ja),g=$a(T)*S+w,m=Ja(T)*M+b;break;case Za.R:Va(v=g=p[x++],y=m=p[x++],v+p[x++],y+p[x++],Ya,ja);break;case Za.Z:g=v,m=y}St(Ua,Ua,Ya),Mt(Xa,Xa,ja)}return 0===x&&(Ua[0]=Ua[1]=Xa[0]=Xa[1]=0),new Mi(Ua[0],Ua[1],Xa[0]-Ua[0],Xa[1]-Ua[1])},rebuildPath:function(t){for(var e,i,n,o,a,r,s=this.data,l=this._ux,u=this._uy,h=this._len,c=0;c<h;){var d=s[c++];switch(1===c&&(e=n=s[c],i=o=s[c+1]),d){case Za.M:e=n=s[c++],i=o=s[c++],t.moveTo(n,o);break;case Za.L:a=s[c++],r=s[c++],(tr(a-n)>l||tr(r-o)>u||c===h-1)&&(t.lineTo(a,r),n=a,o=r);break;case Za.C:t.bezierCurveTo(s[c++],s[c++],s[c++],s[c++],s[c++],s[c++]),n=s[c-2],o=s[c-1];break;case Za.Q:t.quadraticCurveTo(s[c++],s[c++],s[c++],s[c++]),n=s[c-2],o=s[c-1];break;case Za.A:var f=s[c++],p=s[c++],g=s[c++],m=s[c++],v=s[c++],y=s[c++],x=s[c++],_=s[c++],w=m<g?g:m,b=m<g?1:g/m,S=m<g?m/g:1,M=v+y;.001<Math.abs(g-m)?(t.translate(f,p),t.rotate(x),t.scale(b,S),t.arc(0,0,w,v,M,1-_),t.scale(1/b,1/S),t.rotate(-x),t.translate(-f,-p)):t.arc(f,p,w,v,M,1-_),1===c&&(e=$a(v)*g+f,i=Ja(v)*m+p),n=$a(M)*g+f,o=Ja(M)*m+p;break;case Za.R:e=n=s[c],i=o=s[c+1],t.rect(s[c++],s[c++],s[c++],s[c++]);break;case Za.Z:t.closePath(),n=e,o=i}}}},ir.CMD=Za;var rr=2*Math.PI;function sr(t){return(t%=rr)<0&&(t+=rr),t}var lr=2*Math.PI;function ur(t,e,i,n,o,a,r,s,l){if(0===r)return!1;var u=r;s-=t,l-=e;var h=Math.sqrt(s*s+l*l);if(i<h-u||h+u<i)return!1;if(Math.abs(n-o)%lr<1e-4)return!0;if(a){var c=n;n=sr(o),o=sr(c)}else n=sr(n),o=sr(o);o<n&&(o+=lr);var d=Math.atan2(l,s);return d<0&&(d+=lr),n<=d&&d<=o||n<=d+lr&&d+lr<=o}function hr(t,e,i,n,o,a){if(e<a&&n<a||a<e&&a<n)return 0;if(n===e)return 0;var r=n<e?1:-1,s=(a-e)/(n-e);1!=s&&0!=s||(r=n<e?.5:-.5);var l=s*(i-t)+t;return l===o?1/0:o<l?r:0}var cr=ir.CMD,dr=2*Math.PI,fr=1e-4;var pr=[-1,-1,-1],gr=[-1,-1];function mr(t,e,i,n,o,a,r,s,l,u){if(e<u&&n<u&&a<u&&s<u||u<e&&u<n&&u<a&&u<s)return 0;var h,c=function(t,e,i,n,o,a){var r=n+3*(e-i)-t,s=3*(i-2*e+t),l=3*(e-t),u=t-o,h=s*s-3*r*l,c=s*l-9*r*u,d=l*l-3*s*u,f=0;if(_a(h)&&_a(c)){if(_a(s))a[0]=0;else 0<=(M=-l/s)&&M<=1&&(a[f++]=M)}else{var p=c*c-4*h*d;if(_a(p)){var g=c/h,m=-g/2;0<=(M=-s/r+g)&&M<=1&&(a[f++]=M),0<=m&&m<=1&&(a[f++]=m)}else if(0<p){var v=da(p),y=h*s+1.5*r*(-c+v),x=h*s+1.5*r*(-c-v);0<=(M=(-s-((y=y<0?-ca(-y,ma):ca(y,ma))+(x=x<0?-ca(-x,ma):ca(x,ma))))/(3*r))&&M<=1&&(a[f++]=M)}else{var _=(2*h*s-3*r*c)/(2*da(h*h*h)),w=Math.acos(_)/3,b=da(h),S=Math.cos(w),M=(-s-2*b*S)/(3*r),I=(m=(-s+b*(S+ga*Math.sin(w)))/(3*r),(-s+b*(S-ga*Math.sin(w)))/(3*r));0<=M&&M<=1&&(a[f++]=M),0<=m&&m<=1&&(a[f++]=m),0<=I&&I<=1&&(a[f++]=I)}}return f}(e,n,a,s,u,pr);if(0===c)return 0;for(var d,f,p=0,g=-1,m=0;m<c;m++){var v=pr[m],y=0===v||1===v?.5:1;ba(t,i,o,r,v)<l||(g<0&&(g=Ma(e,n,a,s,gr),gr[1]<gr[0]&&1<g&&(void 0,h=gr[0],gr[0]=gr[1],gr[1]=h),d=ba(e,n,a,s,gr[0]),1<g&&(f=ba(e,n,a,s,gr[1]))),2===g?v<gr[0]?p+=d<e?y:-y:v<gr[1]?p+=f<d?y:-y:p+=s<f?y:-y:v<gr[0]?p+=d<e?y:-y:p+=s<d?y:-y)}return p}function vr(t,e,i,n,o,a,r,s){if(e<s&&n<s&&a<s||s<e&&s<n&&s<a)return 0;var l=function(t,e,i,n,o){var a=t-2*e+i,r=2*(e-t),s=t-n,l=0;if(_a(a)){if(wa(r))0<=(h=-s/r)&&h<=1&&(o[l++]=h)}else{var u=r*r-4*a*s;if(_a(u))0<=(h=-r/(2*a))&&h<=1&&(o[l++]=h);else if(0<u){var h,c=da(u),d=(-r-c)/(2*a);0<=(h=(-r+c)/(2*a))&&h<=1&&(o[l++]=h),0<=d&&d<=1&&(o[l++]=d)}}return l}(e,n,a,s,pr);if(0===l)return 0;var u=Da(e,n,a);if(0<=u&&u<=1){for(var h=0,c=Ta(e,n,a,u),d=0;d<l;d++){var f=0===pr[d]||1===pr[d]?.5:1;Ta(t,i,o,pr[d])<r||(pr[d]<u?h+=c<e?f:-f:h+=a<c?f:-f)}return h}f=0===pr[0]||1===pr[0]?.5:1;return Ta(t,i,o,pr[0])<r?0:a<e?f:-f}function yr(t,e,i,n,o,a,r,s){if(i<(s-=e)||s<-i)return 0;var l=Math.sqrt(i*i-s*s);pr[0]=-l,pr[1]=l;var u=Math.abs(n-o);if(u<1e-4)return 0;if(u%dr<1e-4){o=dr;var h=a?1:-1;return r>=pr[n=0]+t&&r<=pr[1]+t?h:0}if(a){l=n;n=sr(o),o=sr(l)}else n=sr(n),o=sr(o);o<n&&(o+=dr);for(var c=0,d=0;d<2;d++){var f=pr[d];if(r<f+t){var p=Math.atan2(s,f);h=a?1:-1;p<0&&(p=dr+p),(n<=p&&p<=o||n<=p+dr&&p+dr<=o)&&(p>Math.PI/2&&p<1.5*Math.PI&&(h=-h),c+=h)}}return c}function xr(t,e,i,n,o){for(var a=0,r=0,s=0,l=0,u=0,h=0;h<t.length;){var c=t[h++];switch(c===cr.M&&1<h&&(i||(a+=hr(r,s,l,u,n,o))),1===h&&(l=r=t[h],u=s=t[h+1]),c){case cr.M:r=l=t[h++],s=u=t[h++];break;case cr.L:if(i){if(nr(r,s,t[h],t[h+1],e,n,o))return!0}else a+=hr(r,s,t[h],t[h+1],n,o)||0;r=t[h++],s=t[h++];break;case cr.C:if(i){if(or(r,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],e,n,o))return!0}else a+=mr(r,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],n,o)||0;r=t[h++],s=t[h++];break;case cr.Q:if(i){if(ar(r,s,t[h++],t[h++],t[h],t[h+1],e,n,o))return!0}else a+=vr(r,s,t[h++],t[h++],t[h],t[h+1],n,o)||0;r=t[h++],s=t[h++];break;case cr.A:var d=t[h++],f=t[h++],p=t[h++],g=t[h++],m=t[h++],v=t[h++];h+=1;var y=1-t[h++],x=Math.cos(m)*p+d,_=Math.sin(m)*g+f;1<h?a+=hr(r,s,x,_,n,o):(l=x,u=_);var w=(n-d)*g/p+d;if(i){if(ur(d,f,g,m,m+v,y,e,w,o))return!0}else a+=yr(d,f,g,m,m+v,y,w,o);r=Math.cos(m+v)*p+d,s=Math.sin(m+v)*g+f;break;case cr.R:l=r=t[h++],u=s=t[h++];x=l+t[h++],_=u+t[h++];if(i){if(nr(l,u,x,u,e,n,o)||nr(x,u,x,_,e,n,o)||nr(x,_,l,_,e,n,o)||nr(l,_,l,u,e,n,o))return!0}else a+=hr(x,u,x,_,n,o),a+=hr(l,_,l,u,n,o);break;case cr.Z:if(i){if(nr(r,s,l,u,e,n,o))return!0}else a+=hr(r,s,l,u,n,o);r=l,s=u}}return i||function(t,e){return Math.abs(t-e)<fr}(s,u)||(a+=hr(r,s,l,u,n,o)||0),0!==a}var _r=Yi.prototype.getCanvasPattern,wr=Math.abs,br=new ir(!0);function Sr(t){jn.call(this,t),this.path=null}Sr.prototype={constructor:Sr,type:"path",__dirtyPath:!0,strokeContainThreshold:5,segmentIgnoreThreshold:0,subPixelOptimize:!1,brush:function(t,e){var i,n=this.style,o=this.path||br,a=n.hasStroke(),r=n.hasFill(),s=n.fill,l=n.stroke,u=r&&!!s.colorStops,h=a&&!!l.colorStops,c=r&&!!s.image,d=a&&!!l.image;n.bind(t,this,e),this.setTransform(t),this.__dirty&&(u&&(i=i||this.getBoundingRect(),this._fillGradient=n.getGradient(t,s,i)),h&&(i=i||this.getBoundingRect(),this._strokeGradient=n.getGradient(t,l,i)));u?t.fillStyle=this._fillGradient:c&&(t.fillStyle=_r.call(s,t)),h?t.strokeStyle=this._strokeGradient:d&&(t.strokeStyle=_r.call(l,t));var f=n.lineDash,p=n.lineDashOffset,g=!!t.setLineDash,m=this.getGlobalScale();if(o.setScale(m[0],m[1],this.segmentIgnoreThreshold),this.__dirtyPath||f&&!g&&a?(o.beginPath(t),f&&!g&&(o.setLineDash(f),o.setLineDashOffset(p)),this.buildPath(o,this.shape,!1),this.path&&(this.__dirtyPath=!1)):(t.beginPath(),this.path.rebuildPath(t)),r)if(null!=n.fillOpacity){var v=t.globalAlpha;t.globalAlpha=n.fillOpacity*n.opacity,o.fill(t),t.globalAlpha=v}else o.fill(t);if(f&&g&&(t.setLineDash(f),t.lineDashOffset=p),a)if(null!=n.strokeOpacity){v=t.globalAlpha;t.globalAlpha=n.strokeOpacity*n.opacity,o.stroke(t),t.globalAlpha=v}else o.stroke(t);f&&g&&t.setLineDash([]),null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))},buildPath:function(t,e,i){},createPathProxy:function(){this.path=new ir},getBoundingRect:function(){var t=this._rect,e=this.style,i=!t;if(i){var n=this.path;n=n||(this.path=new ir),this.__dirtyPath&&(n.beginPath(),this.buildPath(n,this.shape,!1)),t=n.getBoundingRect()}if(this._rect=t,e.hasStroke()){var o=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||i){o.copy(t);var a=e.lineWidth,r=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(a=Math.max(a,this.strokeContainThreshold||4)),1e-10<r&&(o.width+=a/r,o.height+=a/r,o.x-=a/r/2,o.y-=a/r/2)}return o}return t},contain:function(t,e){var i=this.transformCoordToLocal(t,e),n=this.getBoundingRect(),o=this.style;if(t=i[0],e=i[1],n.contain(t,e)){var a=this.path.data;if(o.hasStroke()){var r=o.lineWidth,s=o.strokeNoScale?this.getLineScale():1;if(1e-10<s&&(o.hasFill()||(r=Math.max(r,this.strokeContainThreshold)),function(t,e,i,n){return xr(t,e,!0,i,n)}(a,r/s,t,e)))return!0}if(o.hasFill())return function(t,e,i){return xr(t,0,!1,e,i)}(a,t,e)}return!1},dirty:function(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this.__dirty=this.__dirtyText=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty()},animateShape:function(t){return this.animate("shape",t)},attrKV:function(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):jn.prototype.attrKV.call(this,t,e)},setShape:function(t,e){var i=this.shape;if(i){if(R(t))for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);else i[t]=e;this.dirty(!0)}return this},getLineScale:function(){var t=this.transform;return t&&1e-10<wr(t[0]-1)&&1e-10<wr(t[3]-1)?Math.sqrt(wr(t[0]*t[3]-t[2]*t[1])):1}},Sr.extend=function(o){function t(t){Sr.call(this,t),o.style&&this.style.extendFrom(o.style,!1);var e=o.shape;if(e){this.shape=this.shape||{};var i=this.shape;for(var n in e)!i.hasOwnProperty(n)&&e.hasOwnProperty(n)&&(i[n]=e[n])}o.init&&o.init.call(this,t)}for(var e in w(t,Sr),o)"style"!==e&&"shape"!==e&&(t.prototype[e]=o[e]);return t},w(Sr,jn);function Mr(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}var Ir=ir.CMD,Tr=[[],[],[]],Ar=Math.sqrt,Dr=Math.atan2,Cr=function(t,e){var i,n,o,a,r,s=t.data,l=Ir.M,u=Ir.C,h=Ir.L,c=Ir.R,d=Ir.A,f=Ir.Q;for(a=o=0;o<s.length;){switch(i=s[o++],a=o,n=0,i){case l:case h:n=1;break;case u:n=3;break;case f:n=2;break;case d:var p=e[4],g=e[5],m=Ar(e[0]*e[0]+e[1]*e[1]),v=Ar(e[2]*e[2]+e[3]*e[3]),y=Dr(-e[1]/v,e[0]/m);s[o]*=m,s[o++]+=p,s[o]*=v,s[o++]+=g,s[o++]*=m,s[o++]*=v,s[o++]+=y,s[o++]+=y,a=o+=2;break;case c:x[0]=s[o++],x[1]=s[o++],bt(x,x,e),s[a++]=x[0],s[a++]=x[1],x[0]+=s[o++],x[1]+=s[o++],bt(x,x,e),s[a++]=x[0],s[a++]=x[1]}for(r=0;r<n;r++){var x;(x=Tr[r])[0]=s[o++],x[1]=s[o++],bt(x,x,e),s[a++]=x[0],s[a++]=x[1]}}},Lr=Math.sqrt,kr=Math.sin,Pr=Math.cos,Nr=Math.PI,Or=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(Mr(t)*Mr(e))},Er=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(Or(t,e))};function zr(t,e,i,n,o,a,r,s,l,u,h){var c=l*(Nr/180),d=Pr(c)*(t-i)/2+kr(c)*(e-n)/2,f=-1*kr(c)*(t-i)/2+Pr(c)*(e-n)/2,p=d*d/(r*r)+f*f/(s*s);1<p&&(r*=Lr(p),s*=Lr(p));var g=(o===a?-1:1)*Lr((r*r*(s*s)-r*r*(f*f)-s*s*(d*d))/(r*r*(f*f)+s*s*(d*d)))||0,m=g*r*f/s,v=g*-s*d/r,y=(t+i)/2+Pr(c)*m-kr(c)*v,x=(e+n)/2+kr(c)*m+Pr(c)*v,_=Er([1,0],[(d-m)/r,(f-v)/s]),w=[(d-m)/r,(f-v)/s],b=[(-1*d-m)/r,(-1*f-v)/s],S=Er(w,b);Or(w,b)<=-1&&(S=Nr),1<=Or(w,b)&&(S=0),0===a&&0<S&&(S-=2*Nr),1===a&&S<0&&(S+=2*Nr),h.addData(u,y,x,r,s,_,S,c,a)}var Rr=/([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,Br=/-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;function Vr(t,e){var i=function(t){if(!t)return new ir;for(var e,i=0,n=0,o=i,a=n,r=new ir,s=ir.CMD,l=t.match(Rr),u=0;u<l.length;u++){for(var h,c=l[u],d=c.charAt(0),f=c.match(Br)||[],p=f.length,g=0;g<p;g++)f[g]=parseFloat(f[g]);for(var m=0;m<p;){var v,y,x,_,w,b,S,M=i,I=n;switch(d){case"l":i+=f[m++],n+=f[m++],h=s.L,r.addData(h,i,n);break;case"L":i=f[m++],n=f[m++],h=s.L,r.addData(h,i,n);break;case"m":i+=f[m++],n+=f[m++],h=s.M,r.addData(h,i,n),o=i,a=n,d="l";break;case"M":i=f[m++],n=f[m++],h=s.M,r.addData(h,i,n),o=i,a=n,d="L";break;case"h":i+=f[m++],h=s.L,r.addData(h,i,n);break;case"H":i=f[m++],h=s.L,r.addData(h,i,n);break;case"v":n+=f[m++],h=s.L,r.addData(h,i,n);break;case"V":n=f[m++],h=s.L,r.addData(h,i,n);break;case"C":h=s.C,r.addData(h,f[m++],f[m++],f[m++],f[m++],f[m++],f[m++]),i=f[m-2],n=f[m-1];break;case"c":h=s.C,r.addData(h,f[m++]+i,f[m++]+n,f[m++]+i,f[m++]+n,f[m++]+i,f[m++]+n),i+=f[m-2],n+=f[m-1];break;case"S":v=i,y=n;var T=r.len(),A=r.data;e===s.C&&(v+=i-A[T-4],y+=n-A[T-3]),h=s.C,M=f[m++],I=f[m++],i=f[m++],n=f[m++],r.addData(h,v,y,M,I,i,n);break;case"s":v=i,y=n;T=r.len(),A=r.data;e===s.C&&(v+=i-A[T-4],y+=n-A[T-3]),h=s.C,M=i+f[m++],I=n+f[m++],i+=f[m++],n+=f[m++],r.addData(h,v,y,M,I,i,n);break;case"Q":M=f[m++],I=f[m++],i=f[m++],n=f[m++],h=s.Q,r.addData(h,M,I,i,n);break;case"q":M=f[m++]+i,I=f[m++]+n,i+=f[m++],n+=f[m++],h=s.Q,r.addData(h,M,I,i,n);break;case"T":v=i,y=n;T=r.len(),A=r.data;e===s.Q&&(v+=i-A[T-4],y+=n-A[T-3]),i=f[m++],n=f[m++],h=s.Q,r.addData(h,v,y,i,n);break;case"t":v=i,y=n;T=r.len(),A=r.data;e===s.Q&&(v+=i-A[T-4],y+=n-A[T-3]),i+=f[m++],n+=f[m++],h=s.Q,r.addData(h,v,y,i,n);break;case"A":x=f[m++],_=f[m++],w=f[m++],b=f[m++],S=f[m++],zr(M=i,I=n,i=f[m++],n=f[m++],b,S,x,_,w,h=s.A,r);break;case"a":x=f[m++],_=f[m++],w=f[m++],b=f[m++],S=f[m++],zr(M=i,I=n,i+=f[m++],n+=f[m++],b,S,x,_,w,h=s.A,r)}}"z"!==d&&"Z"!==d||(h=s.Z,r.addData(h),i=o,n=a),e=h}return r.toStatic(),r}(t);return(e=e||{}).buildPath=function(t){if(t.setData){t.setData(i.data),(e=t.getContext())&&t.rebuildPath(e)}else{var e=t;i.rebuildPath(e)}},e.applyTransform=function(t){Cr(i,t),this.dirty(!0)},e}function Gr(t,e){return new Sr(Vr(t,e))}var Fr=function(t){jn.call(this,t)};Fr.prototype={constructor:Fr,type:"text",brush:function(t,e){var i=this.style;this.__dirty&&kn(i),i.fill=i.stroke=i.shadowBlur=i.shadowColor=i.shadowOffsetX=i.shadowOffsetY=null;var n=i.text;null!=n&&(n+=""),Un(n,i)?(this.setTransform(t),Nn(this,t,n,i,null,e),this.restoreTransform(t)):t.__attrCachedBy=Bi.NONE},getBoundingRect:function(){var t=this.style;if(this.__dirty&&kn(t),!this._rect){var e=t.text;null!=e?e+="":e="";var i=cn(t.text+"",t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.textLineHeight,t.rich);if(i.x+=t.x||0,i.y+=t.y||0,Fn(t.textStroke,t.textStrokeWidth)){var n=t.textStrokeWidth;i.x-=n/2,i.y-=n/2,i.width+=n,i.height+=n}this._rect=i}return this._rect}},w(Fr,jn);function Wr(l){return v.browser.ie&&11<=v.browser.version?function(){var t,e=this.__clipPaths,i=this.style;if(e)for(var n=0;n<e.length;n++){var o=e[n],a=o&&o.shape,r=o&&o.type;if(a&&("sector"===r&&a.startAngle===a.endAngle||"rect"===r&&(!a.width||!a.height))){for(var s=0;s<Zr.length;s++)Zr[s][2]=i[Zr[s][0]],i[Zr[s][0]]=Zr[s][1];t=!0;break}}if(l.apply(this,arguments),t)for(s=0;s<Zr.length;s++)i[Zr[s][0]]=Zr[s][2]}:l}var Hr=Sr.extend({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function(t,e,i){i&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0)}}),Zr=[["shadowBlur",0],["shadowColor","#000"],["shadowOffsetX",0],["shadowOffsetY",0]],Ur=Sr.extend({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},brush:Wr(Sr.prototype.brush),buildPath:function(t,e){var i=e.cx,n=e.cy,o=Math.max(e.r0||0,0),a=Math.max(e.r,0),r=e.startAngle,s=e.endAngle,l=e.clockwise,u=Math.cos(r),h=Math.sin(r);t.moveTo(u*o+i,h*o+n),t.lineTo(u*a+i,h*a+n),t.arc(i,n,a,r,s,!l),t.lineTo(Math.cos(s)*o+i,Math.sin(s)*o+n),0!==o&&t.arc(i,n,o,s,r,l),t.closePath()}}),Xr=Sr.extend({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function(t,e){var i=e.cx,n=e.cy,o=2*Math.PI;t.moveTo(i+e.r,n),t.arc(i,n,e.r,0,o,!1),t.moveTo(i+e.r0,n),t.arc(i,n,e.r0,0,o,!0)}});function Yr(t,e,i,n,o,a,r){var s=.5*(i-t),l=.5*(n-e);return(2*(e-i)+s+l)*r+(-3*(e-i)-2*s-l)*a+s*o+e}function jr(t,e,i){var n=e.points,o=e.smooth;if(n&&2<=n.length){if(o&&"spline"!==o){var a=function(t,e,i,n){var o,a,r,s,l=[],u=[],h=[],c=[];if(n){r=[1/0,1/0],s=[-1/0,-1/0];for(var d=0,f=t.length;d<f;d++)St(r,r,t[d]),Mt(s,s,t[d]);St(r,r,n[0]),Mt(s,s,n[1])}for(d=0,f=t.length;d<f;d++){var p=t[d];if(i)o=t[d?d-1:f-1],a=t[(d+1)%f];else{if(0===d||d===f-1){l.push(rt(t[d]));continue}o=t[d-1],a=t[d+1]}ht(u,a,o),gt(u,u,e);var g=vt(p,o),m=vt(p,a),v=g+m;0!==v&&(g/=v,m/=v),gt(h,u,-g),gt(c,u,m);var y=lt([],p,h),x=lt([],p,c);n&&(Mt(y,y,r),St(y,y,s),Mt(x,x,r),St(x,x,s)),l.push(y),l.push(x)}return i&&l.push(l.shift()),l}(n,o,i,e.smoothConstraint);t.moveTo(n[0][0],n[0][1]);for(var r=n.length,s=0;s<(i?r:r-1);s++){var l=a[2*s],u=a[2*s+1],h=n[(s+1)%r];t.bezierCurveTo(l[0],l[1],u[0],u[1],h[0],h[1])}}else{"spline"===o&&(n=function(t,e){for(var i=t.length,n=[],o=0,a=1;a<i;a++)o+=vt(t[a-1],t[a]);var r=o/2;r=r<i?i:r;for(a=0;a<r;a++){var s,l,u,h=a/(r-1)*(e?i:i-1),c=Math.floor(h),d=h-c,f=t[c%i];u=e?(s=t[(c-1+i)%i],l=t[(c+1)%i],t[(c+2)%i]):(s=t[0===c?c:c-1],l=t[i-2<c?i-1:c+1],t[i-3<c?i-1:c+2]);var p=d*d,g=d*p;n.push([Yr(s[0],f[0],l[0],u[0],d,p,g),Yr(s[1],f[1],l[1],u[1],d,p,g)])}return n}(n,i)),t.moveTo(n[0][0],n[0][1]);s=1;for(var c=n.length;s<c;s++)t.lineTo(n[s][0],n[s][1])}i&&t.closePath()}}var qr=Sr.extend({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function(t,e){jr(t,e,!0)}}),Kr=Sr.extend({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function(t,e){jr(t,e,!1)}}),$r=Math.round;function Jr(t,e,i){var n=i&&i.lineWidth;if(e&&n){var o=e.x1,a=e.x2,r=e.y1,s=e.y2;$r(2*o)===$r(2*a)?t.x1=t.x2=ts(o,n,!0):(t.x1=o,t.x2=a),$r(2*r)===$r(2*s)?t.y1=t.y2=ts(r,n,!0):(t.y1=r,t.y2=s)}}function Qr(t,e,i){var n=i&&i.lineWidth;if(e&&n){var o=e.x,a=e.y,r=e.width,s=e.height;t.x=ts(o,n,!0),t.y=ts(a,n,!0),t.width=Math.max(ts(o+r,n,!1)-t.x,0===r?0:1),t.height=Math.max(ts(a+s,n,!1)-t.y,0===s?0:1)}}function ts(t,e,i){var n=$r(2*t);return(n+$r(e))%2==0?n/2:(n+(i?1:-1))/2}var es={},is=Sr.extend({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function(t,e){var i,n,o,a;this.subPixelOptimize?(Qr(es,e,this.style),i=es.x,n=es.y,o=es.width,a=es.height,es.r=e.r,e=es):(i=e.x,n=e.y,o=e.width,a=e.height),e.r?Mn(t,e):t.rect(i,n,o,a),t.closePath()}}),ns={},os=Sr.extend({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i,n,o,a;a=this.subPixelOptimize?(Jr(ns,e,this.style),i=ns.x1,n=ns.y1,o=ns.x2,ns.y2):(i=e.x1,n=e.y1,o=e.x2,e.y2);var r=e.percent;0!==r&&(t.moveTo(i,n),r<1&&(o=i*(1-r)+o*r,a=n*(1-r)+a*r),t.lineTo(o,a))},pointAt:function(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t]}}),as=[];function rs(t,e,i){var n=t.cpx2,o=t.cpy2;return null===n||null===o?[(i?Sa:ba)(t.x1,t.cpx1,t.cpx2,t.x2,e),(i?Sa:ba)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(i?Aa:Ta)(t.x1,t.cpx1,t.x2,e),(i?Aa:Ta)(t.y1,t.cpy1,t.y2,e)]}function ss(t){this.colorStops=t||[]}var ls=Sr.extend({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i=e.x1,n=e.y1,o=e.x2,a=e.y2,r=e.cpx1,s=e.cpy1,l=e.cpx2,u=e.cpy2,h=e.percent;0!==h&&(t.moveTo(i,n),null==l||null==u?(h<1&&(Ca(i,r,o,h,as),r=as[1],o=as[2],Ca(n,s,a,h,as),s=as[1],a=as[2]),t.quadraticCurveTo(r,s,o,a)):(h<1&&(Ia(i,r,l,o,h,as),r=as[1],l=as[2],o=as[3],Ia(n,s,u,a,h,as),s=as[1],u=as[2],a=as[3]),t.bezierCurveTo(r,s,l,u,o,a)))},pointAt:function(t){return rs(this.shape,t,!1)},tangentAt:function(t){var e=rs(this.shape,t,!0);return mt(e,e)}}),us=Sr.extend({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function(t,e){var i=e.cx,n=e.cy,o=Math.max(e.r,0),a=e.startAngle,r=e.endAngle,s=e.clockwise,l=Math.cos(a),u=Math.sin(a);t.moveTo(l*o+i,u*o+n),t.arc(i,n,o,a,r,!s)}}),hs=Sr.extend({type:"compound",shape:{paths:null},_updatePathDirty:function(){for(var t=this.__dirtyPath,e=this.shape.paths,i=0;i<e.length;i++)t=t||e[i].__dirtyPath;this.__dirtyPath=t,this.__dirty=this.__dirty||t},beforeBrush:function(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),i=0;i<t.length;i++)t[i].path||t[i].createPathProxy(),t[i].path.setScale(e[0],e[1],t[i].segmentIgnoreThreshold)},buildPath:function(t,e){for(var i=e.paths||[],n=0;n<i.length;n++)i[n].buildPath(t,i[n].shape,!0)},afterBrush:function(){for(var t=this.shape.paths||[],e=0;e<t.length;e++)t[e].__dirtyPath=!1},getBoundingRect:function(){return this._updatePathDirty(),Sr.prototype.getBoundingRect.call(this)}});ss.prototype={constructor:ss,addColorStop:function(t,e){this.colorStops.push({offset:t,color:e})}};function cs(t,e,i,n,o,a){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==i?1:i,this.y2=null==n?0:n,this.type="linear",this.global=a||!1,ss.call(this,o)}cs.prototype={constructor:cs},w(cs,ss);function ds(t,e,i,n,o){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==i?.5:i,this.type="radial",this.global=o||!1,ss.call(this,n)}function fs(t){jn.call(this,t),this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.notClear=!0}ds.prototype={constructor:ds},w(ds,ss),fs.prototype.incremental=!0,fs.prototype.clearDisplaybles=function(){this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.dirty(),this.notClear=!1},fs.prototype.addDisplayable=function(t,e){e?this._temporaryDisplayables.push(t):this._displayables.push(t),this.dirty()},fs.prototype.addDisplayables=function(t,e){e=e||!1;for(var i=0;i<t.length;i++)this.addDisplayable(t[i],e)},fs.prototype.eachPendingDisplayable=function(t){for(var e=this._cursor;e<this._displayables.length;e++)t&&t(this._displayables[e]);for(e=0;e<this._temporaryDisplayables.length;e++)t&&t(this._temporaryDisplayables[e])},fs.prototype.update=function(){this.updateTransform();for(var t=this._cursor;t<this._displayables.length;t++){(e=this._displayables[t]).parent=this,e.update(),e.parent=null}for(t=0;t<this._temporaryDisplayables.length;t++){var e;(e=this._temporaryDisplayables[t]).parent=this,e.update(),e.parent=null}},fs.prototype.brush=function(t,e){for(var i=this._cursor;i<this._displayables.length;i++){(n=this._displayables[i]).beforeBrush&&n.beforeBrush(t),n.brush(t,i===this._cursor?null:this._displayables[i-1]),n.afterBrush&&n.afterBrush(t)}this._cursor=i;for(i=0;i<this._temporaryDisplayables.length;i++){var n;(n=this._temporaryDisplayables[i]).beforeBrush&&n.beforeBrush(t),n.brush(t,0===i?null:this._temporaryDisplayables[i-1]),n.afterBrush&&n.afterBrush(t)}this._temporaryDisplayables=[],this.notClear=!0};var ps=[];fs.prototype.getBoundingRect=function(){if(!this._rect){for(var t=new Mi(1/0,1/0,-1/0,-1/0),e=0;e<this._displayables.length;e++){var i=this._displayables[e],n=i.getBoundingRect().clone();i.needLocalTransform()&&n.applyTransform(i.getLocalTransform(ps)),t.union(n)}this._rect=t}return this._rect},fs.prototype.contain=function(t,e){var i=this.transformCoordToLocal(t,e);if(this.getBoundingRect().contain(i[0],i[1]))for(var n=0;n<this._displayables.length;n++){if(this._displayables[n].contain(t,e))return!0}return!1},w(fs,jn);var gs=Math.max,ms=Math.min,vs={},ys=1,xs={color:"textFill",textBorderColor:"textStroke",textBorderWidth:"textStrokeWidth"},_s="emphasis",ws="normal",bs=1,Ss={},Ms={};function Is(t){return Sr.extend(t)}function Ts(t,e){Ms[t]=e}function As(t){if(Ms.hasOwnProperty(t))return Ms[t]}function Ds(t,e,i,n){var o=Gr(t,e);return i&&("center"===n&&(i=Ls(i,o.getBoundingRect())),Ps(o,i)),o}function Cs(t,i,n){var o=new qn({style:{image:t,x:i.x,y:i.y,width:i.width,height:i.height},onload:function(t){if("center"===n){var e={width:t.width,height:t.height};o.setStyle(Ls(i,e))}}});return o}function Ls(t,e){var i,n=e.width/e.height,o=t.height*n;return i=o<=t.width?t.height:(o=t.width)/n,{x:t.x+t.width/2-o/2,y:t.y+t.height/2-i/2,width:o,height:i}}var ks=function(t,e){for(var i=[],n=t.length,o=0;o<n;o++){var a=t[o];a.path||a.createPathProxy(),a.__dirtyPath&&a.buildPath(a.path,a.shape,!0),i.push(a.path)}var r=new Sr(e);return r.createPathProxy(),r.buildPath=function(t){t.appendPath(i);var e=t.getContext();e&&t.rebuildPath(e)},r};function Ps(t,e){if(t.applyTransform){var i=t.getBoundingRect().calculateTransform(e);t.applyTransform(i)}}var Ns=ts;function Os(t){return null!=t&&"none"!==t}var Es=Q(),zs=0;function Rs(t){var e=t.__hoverStl;if(e&&!t.__highlighted){var i=t.__zr,n=t.useHoverLayer&&i&&"canvas"===i.painter.type;if(t.__highlighted=n?"layer":"plain",!(t.isGroup||!i&&t.useHoverLayer)){var o=t,a=t.style;n&&(a=(o=i.addHover(t)).style),ol(a),n||function(t){if(t.__hoverStlDirty){t.__hoverStlDirty=!1;var e=t.__hoverStl;if(e){var i=t.__cachedNormalStl={};t.__cachedNormalZ2=t.z2;var n=t.style;for(var o in e)null!=e[o]&&(i[o]=n[o]);i.fill=n.fill,i.stroke=n.stroke}else t.__cachedNormalStl=t.__cachedNormalZ2=null}}(o),a.extendFrom(e),Bs(a,e,"fill"),Bs(a,e,"stroke"),nl(a),n||(t.dirty(!1),t.z2+=ys)}}}function Bs(t,e,i){!Os(e[i])&&Os(t[i])&&(t[i]=function(t){if("string"!=typeof t)return t;var e=Es.get(t);return e||(e=Ve(t,-.1),zs<1e4&&(Es.set(t,e),zs++)),e}(t[i]))}function Vs(t){var e=t.__highlighted;if(e&&(t.__highlighted=!1,!t.isGroup))if("layer"===e)t.__zr&&t.__zr.removeHover(t);else{var i=t.style,n=t.__cachedNormalStl;n&&(ol(i),t.setStyle(n),nl(i));var o=t.__cachedNormalZ2;null!=o&&t.z2-o===ys&&(t.z2=o)}}function Gs(t,e,i){var n,o=ws,a=ws;t.__highlighted&&(o=_s,n=!0),e(t,i),t.__highlighted&&(a=_s,n=!0),t.isGroup&&t.traverse(function(t){t.isGroup||e(t,i)}),n&&t.__highDownOnUpdate&&t.__highDownOnUpdate(o,a)}function Fs(t,e){e=t.__hoverStl=!1!==e&&(t.hoverStyle||e||{}),t.__hoverStlDirty=!0,t.__highlighted&&(t.__cachedNormalStl=null,Vs(t),Rs(t))}function Ws(t){Xs(this,t)||this.__highByOuter||Gs(this,Rs)}function Hs(t){Xs(this,t)||this.__highByOuter||Gs(this,Vs)}function Zs(t){this.__highByOuter|=1<<(t||0),Gs(this,Rs)}function Us(t){(this.__highByOuter&=~(1<<(t||0)))||Gs(this,Vs)}function Xs(t,e){return t.__highDownSilentOnTouch&&e.zrByTouch}function Ys(t,e){js(t,!0),Gs(t,Fs,e)}function js(t,e){var i=!1===e;if(t.__highDownSilentOnTouch=t.highDownSilentOnTouch,t.__highDownOnUpdate=t.highDownOnUpdate,!i||t.__highDownDispatcher){var n=i?"off":"on";t[n]("mouseover",Ws)[n]("mouseout",Hs),t[n]("emphasis",Zs)[n]("normal",Us),t.__highByOuter=t.__highByOuter||0,t.__highDownDispatcher=!i}}function qs(t){return!(!t||!t.__highDownDispatcher)}function Ks(t){var e=Ss[t];return null==e&&bs<=32&&(e=Ss[t]=bs++),e}function $s(t,e,i,n,o,a,r){var s,l=(o=o||vs).labelFetcher,u=o.labelDataIndex,h=o.labelDimIndex,c=i.getShallow("show"),d=n.getShallow("show");(c||d)&&(l&&(s=l.getFormattedLabel(u,"normal",null,h)),null==s&&(s=O(o.defaultText)?o.defaultText(u,o):o.defaultText));var f=c?s:null,p=d?H(l?l.getFormattedLabel(u,"emphasis",null,h):null,s):null;null==f&&null==p||(Qs(t,i,a,o),Qs(e,n,r,o,!0)),t.text=f,e.text=p}function Js(t,e,i){var n=t.style;e&&(ol(n),t.setStyle(e),nl(n)),n=t.__hoverStl,i&&n&&(ol(n),L(n,i),nl(n))}function Qs(t,e,i,n,o){return tl(t,e,n,o),i&&L(t,i),t}function tl(t,e,i,n){if((i=i||vs).isRectText){var o;i.getTextPosition?o=i.getTextPosition(e,n):"outside"===(o=e.getShallow("position")||(n?null:"inside"))&&(o="top"),t.textPosition=o,t.textOffset=e.getShallow("offset");var a=e.getShallow("rotate");null!=a&&(a*=Math.PI/180),t.textRotation=a,t.textDistance=H(e.getShallow("distance"),n?null:5)}var r,s=e.ecModel,l=s&&s.option.textStyle,u=function(t){var e;for(;t&&t!==t.ecModel;){var i=(t.option||vs).rich;if(i)for(var n in e=e||{},i)i.hasOwnProperty(n)&&(e[n]=1);t=t.parentModel}return e}(e);if(u)for(var h in r={},u)if(u.hasOwnProperty(h)){var c=e.getModel(["rich",h]);el(r[h]={},c,l,i,n)}return t.rich=r,el(t,e,l,i,n,!0),i.forceRich&&!i.textStyle&&(i.textStyle={}),t}function el(t,e,i,n,o,a){i=!o&&i||vs,t.textFill=il(e.getShallow("color"),n)||i.color,t.textStroke=il(e.getShallow("textBorderColor"),n)||i.textBorderColor,t.textStrokeWidth=H(e.getShallow("textBorderWidth"),i.textBorderWidth),o||(a&&(t.insideRollbackOpt=n,nl(t)),null==t.textFill&&(t.textFill=n.autoColor)),t.fontStyle=e.getShallow("fontStyle")||i.fontStyle,t.fontWeight=e.getShallow("fontWeight")||i.fontWeight,t.fontSize=e.getShallow("fontSize")||i.fontSize,t.fontFamily=e.getShallow("fontFamily")||i.fontFamily,t.textAlign=e.getShallow("align"),t.textVerticalAlign=e.getShallow("verticalAlign")||e.getShallow("baseline"),t.textLineHeight=e.getShallow("lineHeight"),t.textWidth=e.getShallow("width"),t.textHeight=e.getShallow("height"),t.textTag=e.getShallow("tag"),a&&n.disableBox||(t.textBackgroundColor=il(e.getShallow("backgroundColor"),n),t.textPadding=e.getShallow("padding"),t.textBorderColor=il(e.getShallow("borderColor"),n),t.textBorderWidth=e.getShallow("borderWidth"),t.textBorderRadius=e.getShallow("borderRadius"),t.textBoxShadowColor=e.getShallow("shadowColor"),t.textBoxShadowBlur=e.getShallow("shadowBlur"),t.textBoxShadowOffsetX=e.getShallow("shadowOffsetX"),t.textBoxShadowOffsetY=e.getShallow("shadowOffsetY")),t.textShadowColor=e.getShallow("textShadowColor")||i.textShadowColor,t.textShadowBlur=e.getShallow("textShadowBlur")||i.textShadowBlur,t.textShadowOffsetX=e.getShallow("textShadowOffsetX")||i.textShadowOffsetX,t.textShadowOffsetY=e.getShallow("textShadowOffsetY")||i.textShadowOffsetY}function il(t,e){return"auto"!==t?t:e&&e.autoColor?e.autoColor:null}function nl(t){var e,i=t.textPosition,n=t.insideRollbackOpt;if(n&&null==t.textFill){var o=n.autoColor,a=n.isRectText,r=n.useInsideStyle,s=!1!==r&&(!0===r||a&&i&&"string"==typeof i&&0<=i.indexOf("inside")),l=!s&&null!=o;(s||l)&&(e={textFill:t.textFill,textStroke:t.textStroke,textStrokeWidth:t.textStrokeWidth}),s&&(t.textFill="#fff",null==t.textStroke&&(t.textStroke=o,null==t.textStrokeWidth&&(t.textStrokeWidth=2))),l&&(t.textFill=o)}t.insideRollback=e}function ol(t){var e=t.insideRollback;e&&(t.textFill=e.textFill,t.textStroke=e.textStroke,t.textStrokeWidth=e.textStrokeWidth,t.insideRollback=null)}function al(t,e){var i=e&&e.getModel("textStyle");return j([t.fontStyle||i&&i.getShallow("fontStyle")||"",t.fontWeight||i&&i.getShallow("fontWeight")||"",(t.fontSize||i&&i.getShallow("fontSize")||12)+"px",t.fontFamily||i&&i.getShallow("fontFamily")||"sans-serif"].join(" "))}function rl(t,e,i,n,o,a){if("function"==typeof o&&(a=o,o=null),n&&n.isAnimationEnabled()){var r=t?"Update":"",s=n.getShallow("animationDuration"+r),l=n.getShallow("animationEasing"+r),u=n.getShallow("animationDelay"+r);"function"==typeof u&&(u=u(o,n.getAnimationDelayParams?n.getAnimationDelayParams(e,o):null)),"function"==typeof s&&(s=s(o)),0<s?e.animateTo(i,s,u||0,l,a,!!a):(e.stopAnimation(),e.attr(i),a&&a())}else e.stopAnimation(),e.attr(i),a&&a()}function sl(t,e,i,n,o){rl(!0,t,e,i,n,o)}function ll(t,e,i,n,o){rl(!1,t,e,i,n,o)}function ul(t,e){for(var i=ie([]);t&&t!==e;)oe(i,t.getLocalTransform(),i),t=t.parent;return i}function hl(t,e,i){return e&&!P(e)&&(e=fe.getLocalTransform(e)),i&&(e=le([],e)),bt([],t,e)}function cl(t,e,i){var n=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),o=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),a=["left"===t?-n:"right"===t?n:0,"top"===t?-o:"bottom"===t?o:0];return a=hl(a,e,i),Math.abs(a[0])>Math.abs(a[1])?0<a[0]?"right":"left":0<a[1]?"bottom":"top"}function dl(t,e,n,i){if(t&&e){var o,a=(o={},t.traverse(function(t){!t.isGroup&&t.anid&&(o[t.anid]=t)}),o);e.traverse(function(t){if(!t.isGroup&&t.anid){var e=a[t.anid];if(e){var i=r(t);t.attr(r(e)),sl(t,i,n,t.dataIndex)}}})}function r(t){var e={position:rt(t.position),rotation:t.rotation};return t.shape&&(e.shape=L({},t.shape)),e}}function fl(t,n){return N(t,function(t){var e=t[0];e=gs(e,n.x),e=ms(e,n.x+n.width);var i=t[1];return i=gs(i,n.y),[e,i=ms(i,n.y+n.height)]})}function pl(t,e,i){var n=(e=L({rectHover:!0},e)).style={strokeNoScale:!0};if(i=i||{x:-1,y:-1,width:2,height:2},t)return 0===t.indexOf("image://")?(n.image=t.slice(8),C(n,i),new qn(e)):Ds(t.replace("path://",""),e,i,"center")}function gl(t,e,i,n,o){for(var a=0,r=o[o.length-1];a<o.length;a++){var s=o[a];if(ml(t,e,i,n,s[0],s[1],r[0],r[1]))return!0;r=s}}function ml(t,e,i,n,o,a,r,s){var l=i-t,u=n-e,h=r-o,c=s-a,d=vl(h,c,l,u);if(function(t){return t<=1e-6&&-1e-6<=t}(d))return!1;var f=t-o,p=e-a,g=vl(f,p,l,u)/d;if(g<0||1<g)return!1;var m=vl(f,p,h,c)/d;return!(m<0||1<m)}function vl(t,e,i,n){return t*n-i*e}Ts("circle",Hr),Ts("sector",Ur),Ts("ring",Xr),Ts("polygon",qr),Ts("polyline",Kr),Ts("rect",is),Ts("line",os),Ts("bezierCurve",ls),Ts("arc",us);var yl=(Object.freeze||Object)({Z2_EMPHASIS_LIFT:ys,CACHED_LABEL_STYLE_PROPERTIES:xs,extendShape:Is,extendPath:function(t,e){return function(t,e){return Sr.extend(Vr(t,e))}(t,e)},registerShape:Ts,getShapeClass:As,makePath:Ds,makeImage:Cs,mergePath:ks,resizePath:Ps,subPixelOptimizeLine:function(t){return Jr(t.shape,t.shape,t.style),t},subPixelOptimizeRect:function(t){return Qr(t.shape,t.shape,t.style),t},subPixelOptimize:Ns,setElementHoverStyle:Fs,setHoverStyle:Ys,setAsHighDownDispatcher:js,isHighDownDispatcher:qs,getHighlightDigit:Ks,setLabelStyle:$s,modifyLabelStyle:Js,setTextStyle:Qs,setText:function(t,e,i){var n,o={isRectText:!0};!1===i?n=!0:o.autoColor=i,tl(t,e,o,n)},getFont:al,updateProps:sl,initProps:ll,getTransform:ul,applyTransform:hl,transformDirection:cl,groupTransition:dl,clipPointsByRect:fl,clipRectByRect:function(t,e){var i=gs(t.x,e.x),n=ms(t.x+t.width,e.x+e.width),o=gs(t.y,e.y),a=ms(t.y+t.height,e.y+e.height);if(i<=n&&o<=a)return{x:i,y:o,width:n-i,height:a-o}},createIcon:pl,linePolygonIntersect:gl,lineLineIntersect:ml,Group:Ii,Image:qn,Text:Fr,Circle:Hr,Sector:Ur,Ring:Xr,Polygon:qr,Polyline:Kr,Rect:is,Line:os,BezierCurve:ls,Arc:us,IncrementalDisplayable:fs,CompoundPath:hs,LinearGradient:cs,RadialGradient:ds,BoundingRect:Mi}),xl=["textStyle","color"],_l={getTextColor:function(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(xl):null)},getFont:function(){return al({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel)},getTextRect:function(t){return cn(t,this.getFont(),this.getShallow("align"),this.getShallow("verticalAlign")||this.getShallow("baseline"),this.getShallow("padding"),this.getShallow("lineHeight"),this.getShallow("rich"),this.getShallow("truncateText"))}},wl=ra([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["textPosition"],["textAlign"]]),bl={getItemStyle:function(t,e){var i=wl(this,t,e),n=this.getBorderLineDash();return n&&(i.lineDash=n),i},getBorderLineDash:function(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1]}},Sl=b,Ml=Zo();function Il(t,e,i){this.parentModel=e,this.ecModel=i,this.option=t}function Tl(t,e,i){for(var n=0;n<e.length&&(!e[n]||null!=(t=t&&"object"==typeof t?t[e[n]]:null));n++);return null==t&&i&&(t=i.get(e)),t}function Al(t,e){var i=Ml(t).getParent;return i?i.call(t,e):t.parentModel}Il.prototype={constructor:Il,init:null,mergeOption:function(t){m(this.option,t,!0)},get:function(t,e){return null==t?this.option:Tl(this.option,this.parsePath(t),!e&&Al(this,t))},getShallow:function(t,e){var i=this.option,n=null==i?i:i[t],o=!e&&Al(this,t);return null==n&&o&&(n=o.getShallow(t)),n},getModel:function(t,e){var i;return new Il(null==t?this.option:Tl(this.option,t=this.parsePath(t)),e=e||(i=Al(this,t))&&i.getModel(t),this.ecModel)},isEmpty:function(){return null==this.option},restoreData:function(){},clone:function(){return new this.constructor(D(this.option))},setReadOnly:function(t){},parsePath:function(t){return"string"==typeof t&&(t=t.split(".")),t},customizeGetParent:function(t){Ml(this).getParent=t},isAnimationEnabled:function(){if(!v.node){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled()}}},ta(Il),ia(Il),Sl(Il,la),Sl(Il,ha),Sl(Il,_l),Sl(Il,bl);var Dl=0;function Cl(t){return[t||"",Dl++,Math.random().toFixed(5)].join("_")}var Ll=1e-4;function kl(t,e,i,n){var o=e[1]-e[0],a=i[1]-i[0];if(0==o)return 0==a?i[0]:(i[0]+i[1])/2;if(n)if(0<o){if(t<=e[0])return i[0];if(t>=e[1])return i[1]}else{if(t>=e[0])return i[0];if(t<=e[1])return i[1]}else{if(t===e[0])return i[0];if(t===e[1])return i[1]}return(t-e[0])/o*a+i[0]}function Pl(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%"}return"string"==typeof t?function(t){return t.replace(/^\s+|\s+$/g,"")}(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?NaN:+t}function Nl(t,e,i){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),i?t:+t}function Ol(t){return t.sort(function(t,e){return t-e}),t}function El(t){if(t=+t,isNaN(t))return 0;for(var e=1,i=0;Math.round(t*e)/e!==t;)e*=10,i++;return i}function zl(t){var e=t.toString(),i=e.indexOf("e");if(0<i){var n=+e.slice(i+1);return n<0?-n:0}var o=e.indexOf(".");return o<0?0:e.length-1-o}function Rl(t,e){var i=Math.log,n=Math.LN10,o=Math.floor(i(t[1]-t[0])/n),a=Math.round(i(Math.abs(e[1]-e[0]))/n),r=Math.min(Math.max(-o+a,0),20);return isFinite(r)?r:20}function Bl(t,e,i){if(!t[e])return 0;var n=S(t,function(t,e){return t+(isNaN(e)?0:e)},0);if(0===n)return 0;for(var o=Math.pow(10,i),a=N(t,function(t){return(isNaN(t)?0:t)/n*o*100}),r=100*o,s=N(a,function(t){return Math.floor(t)}),l=S(s,function(t,e){return t+e},0),u=N(a,function(t,e){return t-s[e]});l<r;){for(var h=Number.NEGATIVE_INFINITY,c=null,d=0,f=u.length;d<f;++d)u[d]>h&&(h=u[d],c=d);++s[c],u[c]=0,++l}return s[e]/o}var Vl=9007199254740991;function Gl(t){var e=2*Math.PI;return(t%e+e)%e}function Fl(t){return-Ll<t&&t<Ll}var Wl=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;function Hl(t){if(t instanceof Date)return t;if("string"!=typeof t)return null==t?new Date(NaN):new Date(Math.round(t));var e=Wl.exec(t);if(!e)return new Date(NaN);if(e[8]){var i=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(i-=e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,i,+(e[5]||0),+e[6]||0,+e[7]||0))}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0)}function Zl(t){return Math.pow(10,Ul(t))}function Ul(t){if(0===t)return 0;var e=Math.floor(Math.log(t)/Math.LN10);return 10<=t/Math.pow(10,e)&&e++,e}function Xl(t,e){var i=Ul(t),n=Math.pow(10,i),o=t/n;return t=(e?o<1.5?1:o<2.5?2:o<4?3:o<7?5:10:o<1?1:o<2?2:o<3?3:o<5?5:10)*n,-20<=i?+t.toFixed(i<0?-i:0):t}function Yl(t){t.sort(function(t,e){return function t(e,i,n){return e.interval[n]<i.interval[n]||e.interval[n]===i.interval[n]&&(e.close[n]-i.close[n]==(n?-1:1)||!n&&t(e,i,1))}(t,e,0)?-1:1});for(var e=-1/0,i=1,n=0;n<t.length;){for(var o=t[n].interval,a=t[n].close,r=0;r<2;r++)o[r]<=e&&(o[r]=e,a[r]=r?1:1-i),e=o[r],i=a[r];o[0]===o[1]&&a[0]*a[1]!=1?t.splice(n,1):n++}return t}function jl(t){return 0<=t-parseFloat(t)}var ql=(Object.freeze||Object)({linearMap:kl,parsePercent:Pl,round:Nl,asc:Ol,getPrecision:El,getPrecisionSafe:zl,getPixelPrecision:Rl,getPercentWithPrecision:Bl,MAX_SAFE_INTEGER:Vl,remRadian:Gl,isRadianAroundZero:Fl,parseDate:Hl,quantity:Zl,quantityExponent:Ul,nice:Xl,quantile:function(t,e){var i=(t.length-1)*e+1,n=Math.floor(i),o=+t[n-1],a=i-n;return a?o+a*(t[n]-o):o},reformIntervals:Yl,isNumeric:jl});function Kl(t){return isNaN(t)?"-":(t=(t+"").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(1<t.length?"."+t[1]:"")}function $l(t,e){return t=(t||"").toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()}),e&&t&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t}var Jl=X,Ql=/([&<>"'])/g,tu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function eu(t){return null==t?"":(t+"").replace(Ql,function(t,e){return tu[e]})}function iu(t,e){return"{"+t+(null==e?"":e)+"}"}var nu=["a","b","c","d","e","f","g"];function ou(t,e,i){k(e)||(e=[e]);var n=e.length;if(!n)return"";for(var o=e[0].$vars||[],a=0;a<o.length;a++){var r=nu[a];t=t.replace(iu(r),iu(r,0))}for(var s=0;s<n;s++)for(var l=0;l<o.length;l++){var u=e[s][o[l]];t=t.replace(iu(nu[l],s),i?eu(u):u)}return t}function au(i,t,n){return E(t,function(t,e){i=i.replace("{"+e+"}",n?eu(t):t)}),i}function ru(t,e){var i=(t=z(t)?{color:t,extraCssText:e}:t||{}).color,n=t.type,o=(e=t.extraCssText,t.renderMode||"html"),a=t.markerId||"X";return i?"html"===o?"subItem"===n?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+eu(i)+";"+(e||"")+'"></span>':'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+eu(i)+";"+(e||"")+'"></span>':{renderMode:o,content:"{marker"+a+"|}  ",style:{color:i}}:""}function su(t,e){return"0000".substr(0,e-(t+="").length)+t}function lu(t,e,i){"week"!==t&&"month"!==t&&"quarter"!==t&&"half-year"!==t&&"year"!==t||(t="MM-dd\nyyyy");var n=Hl(e),o=i?"UTC":"",a=n["get"+o+"FullYear"](),r=n["get"+o+"Month"]()+1,s=n["get"+o+"Date"](),l=n["get"+o+"Hours"](),u=n["get"+o+"Minutes"](),h=n["get"+o+"Seconds"](),c=n["get"+o+"Milliseconds"]();return t=t.replace("MM",su(r,2)).replace("M",r).replace("yyyy",a).replace("yy",a%100).replace("dd",su(s,2)).replace("d",s).replace("hh",su(l,2)).replace("h",l).replace("mm",su(u,2)).replace("m",u).replace("ss",su(h,2)).replace("s",h).replace("SSS",su(c,3))}function uu(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t}var hu=gn;var cu=(Object.freeze||Object)({addCommas:Kl,toCamelCase:$l,normalizeCssArray:Jl,encodeHTML:eu,formatTpl:ou,formatTplSimple:au,getTooltipMarker:ru,formatTime:lu,capitalFirst:uu,truncateText:hu,getTextBoundingRect:function(t){return cn(t.text,t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.textLineHeight,t.rich,t.truncate)},getTextRect:function(t,e,i,n,o,a,r,s){return cn(t,e,i,n,o,s,a,r)}}),du=E,fu=["left","right","top","bottom","width","height"],pu=[["width","left","right"],["height","top","bottom"]];function gu(h,c,d,f,p){var g=0,m=0;null==f&&(f=1/0),null==p&&(p=1/0);var v=0;c.eachChild(function(t,e){var i,n,o=t.position,a=t.getBoundingRect(),r=c.childAt(e+1),s=r&&r.getBoundingRect();if("horizontal"===h){var l=a.width+(s?-s.x+a.x:0);v=f<(i=g+l)||t.newline?(g=0,i=l,m+=v+d,a.height):Math.max(v,a.height)}else{var u=a.height+(s?-s.y+a.y:0);v=p<(n=m+u)||t.newline?(g+=v+d,m=0,n=u,a.width):Math.max(v,a.width)}t.newline||(o[0]=g,o[1]=m,"horizontal"===h?g=i+d:m=n+d)})}var mu=gu;T(gu,"vertical"),T(gu,"horizontal");function vu(t,e,i){i=Jl(i||0);var n=e.width,o=e.height,a=Pl(t.left,n),r=Pl(t.top,o),s=Pl(t.right,n),l=Pl(t.bottom,o),u=Pl(t.width,n),h=Pl(t.height,o),c=i[2]+i[0],d=i[1]+i[3],f=t.aspect;switch(isNaN(u)&&(u=n-s-d-a),isNaN(h)&&(h=o-l-c-r),null!=f&&(isNaN(u)&&isNaN(h)&&(n/o<f?u=.8*n:h=.8*o),isNaN(u)&&(u=f*h),isNaN(h)&&(h=u/f)),isNaN(a)&&(a=n-s-u-d),isNaN(r)&&(r=o-l-h-c),t.left||t.right){case"center":a=n/2-u/2-i[3];break;case"right":a=n-u-d}switch(t.top||t.bottom){case"middle":case"center":r=o/2-h/2-i[0];break;case"bottom":r=o-h-c}a=a||0,r=r||0,isNaN(u)&&(u=n-d-a-(s||0)),isNaN(h)&&(h=o-c-r-(l||0));var p=new Mi(a+i[3],r+i[0],u,h);return p.margin=i,p}function yu(t,e,i,n,o){var a=!o||!o.hv||o.hv[0],r=!o||!o.hv||o.hv[1],s=o&&o.boundingMode||"all";if(a||r){var l;if("raw"===s)l="group"===t.type?new Mi(0,0,+e.width||0,+e.height||0):t.getBoundingRect();else if(l=t.getBoundingRect(),t.needLocalTransform()){var u=t.getLocalTransform();(l=l.clone()).applyTransform(u)}e=vu(C({width:l.width,height:l.height},e),i,n);var h=t.position,c=a?e.x-l.x:0,d=r?e.y-l.y:0;t.attr("position","raw"===s?[c,d]:[h[0]+c,h[1]+d])}}function xu(l,u,t){R(t)||(t={});var h=t.ignoreSize;k(h)||(h=[h,h]);var e=n(pu[0],0),i=n(pu[1],1);function n(t,e){var i={},n=0,o={},a=0;if(du(t,function(t){o[t]=l[t]}),du(t,function(t){c(u,t)&&(i[t]=o[t]=u[t]),d(i,t)&&n++,d(o,t)&&a++}),h[e])return d(u,t[1])?o[t[2]]=null:d(u,t[2])&&(o[t[1]]=null),o;if(2!==a&&n){if(2<=n)return i;for(var r=0;r<t.length;r++){var s=t[r];if(!c(i,s)&&c(l,s)){i[s]=l[s];break}}return i}return o}function c(t,e){return t.hasOwnProperty(e)}function d(t,e){return null!=t[e]&&"auto"!==t[e]}function o(t,e,i){du(t,function(t){e[t]=i[t]})}o(pu[0],l,e),o(pu[1],l,i)}function _u(t){return wu({},t)}function wu(e,i){return i&&e&&du(fu,function(t){i.hasOwnProperty(t)&&(e[t]=i[t])}),e}var bu,Su,Mu,Iu=Zo(),Tu=Il.extend({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function(t,e,i,n){Il.call(this,t,e,i,n),this.uid=Cl("ec_cpt_model")},init:function(t,e,i,n){this.mergeDefaultAndTheme(t,i)},mergeDefaultAndTheme:function(t,e){var i=this.layoutMode,n=i?_u(t):{};m(t,e.getTheme().get(this.mainType)),m(t,this.getDefaultOption()),i&&xu(t,n,i)},mergeOption:function(t,e){m(this.option,t,!0);var i=this.layoutMode;i&&xu(this.option,t,i)},optionUpdated:function(t,e){},getDefaultOption:function(){var t=Iu(this);if(!t.defaultOption){for(var e=[],i=this.constructor;i;){var n=i.prototype.defaultOption;n&&e.push(n),i=i.superClass}for(var o={},a=e.length-1;0<=a;a--)o=m(o,e[a],!0);t.defaultOption=o}return t.defaultOption},getReferringComponents:function(t){return this.ecModel.queryComponents({mainType:t,index:this.get(t+"Index",!0),id:this.get(t+"Id",!0)})}});function Au(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e]}aa(Tu,{registerWhenExtend:!0}),Su={},(bu=Tu).registerSubTypeDefaulter=function(t,e){t=Qo(t),Su[t.main]=e},bu.determineSubType=function(t,e){var i=e.type;if(!i){var n=Qo(t).main;bu.hasSubTypes(t)&&Su[n]&&(i=Su[n](e))}return i},Mu=function(t){var e=[];E(Tu.getClassesByMainType(t),function(t){e=e.concat(t.prototype.dependencies||[])}),e=N(e,function(t){return Qo(t).main}),"dataset"!==t&&_(e,"dataset")<=0&&e.unshift("dataset");return e},Tu.topologicalTravel=function(t,e,i,n){if(t.length){var o=function(e){var o={},a=[];return E(e,function(i){var n=Au(o,i),t=function(t,e){var i=[];return E(t,function(t){0<=_(e,t)&&i.push(t)}),i}(n.originalDeps=Mu(i),e);n.entryCount=t.length,0===n.entryCount&&a.push(i),E(t,function(t){_(n.predecessor,t)<0&&n.predecessor.push(t);var e=Au(o,t);_(e.successor,t)<0&&e.successor.push(i)})}),{graph:o,noEntryList:a}}(e),a=o.graph,r=o.noEntryList,s={};for(E(t,function(t){s[t]=!0});r.length;){var l=r.pop(),u=a[l],h=!!s[l];h&&(i.call(n,l,u.originalDeps.slice()),delete s[l]),E(u.successor,h?d:c)}E(s,function(){throw new Error("Circle dependency may exists")})}function c(t){a[t].entryCount--,0===a[t].entryCount&&r.push(t)}function d(t){s[t]=!0,c(t)}},b(Tu,{getBoxLayoutParams:function(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get("bottom"),width:this.get("width"),height:this.get("height")}}});var Du="";"undefined"!=typeof navigator&&(Du=navigator.platform||"");var Cu={color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],gradientColor:["#f6efa6","#d88273","#bf444c"],textStyle:{fontFamily:Du.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:"auto",animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},Lu=Zo();var ku={clearColorPalette:function(){Lu(this).colorIdx=0,Lu(this).colorNameMap={}},getColorFromPalette:function(t,e,i){var n=Lu(e=e||this),o=n.colorIdx||0,a=n.colorNameMap=n.colorNameMap||{};if(a.hasOwnProperty(t))return a[t];var r=Eo(this.get("color",!0)),s=this.get("colorLayer",!0),l=null!=i&&s?function(t,e){for(var i=t.length,n=0;n<i;n++)if(t[n].length>e)return t[n];return t[i-1]}(s,i):r;if((l=l||r)&&l.length){var u=l[o];return t&&(a[t]=u),n.colorIdx=(o+1)%l.length,u}}},Pu="original",Nu="arrayRows",Ou="objectRows",Eu="keyedColumns",zu="unknown",Ru="typedArray",Bu="column",Vu="row";function Gu(t){this.fromDataset=t.fromDataset,this.data=t.data||(t.sourceFormat===Eu?{}:[]),this.sourceFormat=t.sourceFormat||zu,this.seriesLayoutBy=t.seriesLayoutBy||Bu,this.dimensionsDefine=t.dimensionsDefine,this.encodeDefine=t.encodeDefine&&Q(t.encodeDefine),this.startIndex=t.startIndex||0,this.dimensionsDetectCount=t.dimensionsDetectCount}Gu.seriesDataToSource=function(t){return new Gu({data:t,sourceFormat:V(t)?Ru:Pu,fromDataset:!1})},ia(Gu);var Fu={Must:1,Might:2,Not:3},Wu=Zo();function Hu(t){var e=t.option,i=e.data,n=V(i)?Ru:Pu,o=!1,a=e.seriesLayoutBy,r=e.sourceHeader,s=e.dimensions,l=ju(t);if(l){var u=l.option;i=u.source,n=Wu(l).sourceFormat,o=!0,a=a||u.seriesLayoutBy,null==r&&(r=u.sourceHeader),s=s||u.dimensions}var h=function(t,e,i,n,o){if(!t)return{dimensionsDefine:Zu(o)};var a,r;if(e===Nu)"auto"===n||null==n?Uu(function(t){null!=t&&"-"!==t&&(z(t)?null==r&&(r=1):r=0)},i,t,10):r=n?1:0,o||1!==r||(o=[],Uu(function(t,e){o[e]=null!=t?t:""},i,t)),a=o?o.length:i===Vu?t.length:t[0]?t[0].length:null;else if(e===Ou)o=o||function(t){var e,i=0;for(;i<t.length&&!(e=t[i++]););if(e){var n=[];return E(e,function(t,e){n.push(e)}),n}}(t);else if(e===Eu)o||(o=[],E(t,function(t,e){o.push(e)}));else if(e===Pu){var s=Bo(t[0]);a=k(s)&&s.length||1}return{startIndex:r,dimensionsDefine:Zu(o),dimensionsDetectCount:a}}(i,n,a,r,s);Wu(t).source=new Gu({data:i,fromDataset:o,seriesLayoutBy:a,sourceFormat:n,dimensionsDefine:h.dimensionsDefine,startIndex:h.startIndex,dimensionsDetectCount:h.dimensionsDetectCount,encodeDefine:e.encode})}function Zu(t){if(t){var n=Q();return N(t,function(t,e){if(null==(t=L({},R(t)?t:{name:t})).name)return t;t.name+="",null==t.displayName&&(t.displayName=t.name);var i=n.get(t.name);return i?t.name+="-"+i.count++:n.set(t.name,{count:1}),t})}}function Uu(t,e,i,n){if(null==n&&(n=1/0),e===Vu)for(var o=0;o<i.length&&o<n;o++)t(i[o]?i[o][0]:null,o);else{var a=i[0]||[];for(o=0;o<a.length&&o<n;o++)t(a[o],o)}}function Xu(i,t,e){var a={},n=ju(t);if(!n||!i)return a;var r,o,s=[],l=[],u=t.ecModel,h=Wu(u).datasetMap,c=n.uid+"_"+e.seriesLayoutBy;E(i=i.slice(),function(t,e){R(t)||(i[e]={name:t}),"ordinal"===t.type&&null==r&&(o=p(i[r=e])),a[t.name]=[]});var d=h.get(c)||h.set(c,{categoryWayDim:o,valueWayDim:0});function f(t,e,i){for(var n=0;n<i;n++)t.push(e+n)}function p(t){var e=t.dimsDef;return e?e.length:1}return E(i,function(t,e){var i=t.name,n=p(t);if(null==r){var o=d.valueWayDim;f(a[i],o,n),f(l,o,n),d.valueWayDim+=n}else if(r===e)f(a[i],0,n),f(s,0,n);else{o=d.categoryWayDim;f(a[i],o,n),f(l,o,n),d.categoryWayDim+=n}}),s.length&&(a.itemName=s),l.length&&(a.seriesName=l),a}function Yu(t,l,u){var e={};if(!ju(t))return e;var h,c=l.sourceFormat,d=l.dimensionsDefine;c!==Ou&&c!==Eu||E(d,function(t,e){"name"===(R(t)?t.name:t)&&(h=e)});var i=function(){for(var t={},e={},i=[],n=0,o=Math.min(5,u);n<o;n++){var a=qu(l.data,c,l.seriesLayoutBy,d,l.startIndex,n);i.push(a);var r=a===Fu.Not;if(r&&null==t.v&&n!==h&&(t.v=n),null!=t.n&&t.n!==t.v&&(r||i[t.n]!==Fu.Not)||(t.n=n),s(t)&&i[t.n]!==Fu.Not)return t;r||(a===Fu.Might&&null==e.v&&n!==h&&(e.v=n),null!=e.n&&e.n!==e.v||(e.n=n))}function s(t){return null!=t.v&&null!=t.n}return s(t)?t:s(e)?e:null}();if(i){e.value=i.v;var n=null!=h?h:i.n;e.itemName=[n],e.seriesName=[n]}return e}function ju(t){var e=t.option;if(!e.data)return t.ecModel.getComponent("dataset",e.datasetIndex||0)}function qu(t,e,i,n,o,a){var r,s,l;if(V(t))return Fu.Not;if(n){var u=n[a];R(u)?(s=u.name,l=u.type):z(u)&&(s=u)}if(null!=l)return"ordinal"===l?Fu.Must:Fu.Not;if(e===Nu)if(i===Vu){for(var h=t[a],c=0;c<(h||[]).length&&c<5;c++)if(null!=(r=g(h[o+c])))return r}else for(c=0;c<t.length&&c<5;c++){var d=t[o+c];if(d&&null!=(r=g(d[a])))return r}else if(e===Ou){if(!s)return Fu.Not;for(c=0;c<t.length&&c<5;c++){if((f=t[c])&&null!=(r=g(f[s])))return r}}else if(e===Eu){if(!s)return Fu.Not;if(!(h=t[s])||V(h))return Fu.Not;for(c=0;c<h.length&&c<5;c++)if(null!=(r=g(h[c])))return r}else if(e===Pu)for(c=0;c<t.length&&c<5;c++){var f,p=Bo(f=t[c]);if(!k(p))return Fu.Not;if(null!=(r=g(p[a])))return r}function g(t){var e=z(t);return null!=t&&isFinite(t)&&""!==t?e?Fu.Might:Fu.Not:e&&"-"!==t?Fu.Must:void 0}return Fu.Not}var Ku="\0_ec_inner",$u=Il.extend({init:function(t,e,i,n){i=i||{},this.option=null,this._theme=new Il(i),this._optionManager=n},setOption:function(t,e){Y(!(Ku in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption(null)},resetOption:function(t){var e=!1,i=this._optionManager;if(!t||"recreate"===t){var n=i.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this.mergeOption(n)):function(t){t=t,this.option={},this.option[Ku]=1,this._componentsMap=Q({series:[]}),this._seriesIndices,this._seriesIndicesMap,function(i,t){var n=i.color&&!i.colorLayer;E(t,function(t,e){"colorLayer"===e&&n||Tu.hasClass(e)||("object"==typeof t?i[e]=i[e]?m(i[e],t,!1):D(t):null==i[e]&&(i[e]=t))})}(t,this._theme.option),m(t,Cu,!1),this.mergeOption(t)}.call(this,n),e=!0}if("timeline"!==t&&"media"!==t||this.restoreData(),!t||"recreate"===t||"timeline"===t){var o=i.getTimelineOption(this);o&&(this.mergeOption(o),e=!0)}if(!t||"recreate"===t||"media"===t){var a=i.getMediaOption(this,this._api);a.length&&E(a,function(t){this.mergeOption(t,e=!0)},this)}return e},mergeOption:function(n){var l=this.option,u=this._componentsMap,i=[];!function(t){Wu(t).datasetMap=Q()}(this),E(n,function(t,e){null!=t&&(Tu.hasClass(e)?e&&i.push(e):l[e]=null==l[e]?D(t):m(l[e],t,!0))}),Tu.topologicalTravel(i,Tu.getAllClassMainTypes(),function(r,t){var e=Eo(n[r]),i=Vo(u.get(r),e);Go(i),E(i,function(t,e){var i=t.option;R(i)&&(t.keyInfo.mainType=r,t.keyInfo.subType=function(t,e,i){return e.type?e.type:i?i.subType:Tu.determineSubType(t,e)}(r,i,t.exist))});var s=function(e,t){k(t)||(t=t?[t]:[]);var i={};return E(t,function(t){i[t]=(e.get(t)||[]).slice()}),i}(u,t);l[r]=[],u.set(r,[]),E(i,function(t,e){var i=t.exist,n=t.option;if(Y(R(n)||i,"Empty component definition"),n){var o=Tu.getClass(r,t.keyInfo.subType,!0);if(i&&i.constructor===o)i.name=t.keyInfo.name,i.mergeOption(n,this),i.optionUpdated(n,!1);else{var a=L({dependentModels:s,componentIndex:e},t.keyInfo);L(i=new o(n,this,this,a),a),i.init(n,this,this,a),i.optionUpdated(null,!0)}}else i.mergeOption({},this),i.optionUpdated({},!1);u.get(r)[e]=i,l[r][e]=i.option},this),"series"===r&&Ju(this,u.get("series"))},this),this._seriesIndicesMap=Q(this._seriesIndices=this._seriesIndices||[])},getOption:function(){var n=D(this.option);return E(n,function(t,e){if(Tu.hasClass(e)){for(var i=(t=Eo(t)).length-1;0<=i;i--)Wo(t[i])&&t.splice(i,1);n[e]=t}}),delete n[Ku],n},getTheme:function(){return this._theme},getComponent:function(t,e){var i=this._componentsMap.get(t);if(i)return i[e||0]},queryComponents:function(t){var e=t.mainType;if(!e)return[];var i,n=t.index,o=t.id,a=t.name,r=this._componentsMap.get(e);if(!r||!r.length)return[];if(null!=n)k(n)||(n=[n]),i=M(N(n,function(t){return r[t]}),function(t){return!!t});else if(null!=o){var s=k(o);i=M(r,function(t){return s&&0<=_(o,t.id)||!s&&t.id===o})}else if(null!=a){var l=k(a);i=M(r,function(t){return l&&0<=_(a,t.name)||!l&&t.name===a})}else i=r.slice();return Qu(i,t)},findComponents:function(t){var e,i,n,o,a,r=t.query,s=t.mainType,l=(i=s+"Index",n=s+"Id",o=s+"Name",!(e=r)||null==e[i]&&null==e[n]&&null==e[o]?null:{mainType:s,index:e[i],id:e[n],name:e[o]}),u=l?this.queryComponents(l):this._componentsMap.get(s);return a=Qu(u,t),t.filter?M(a,t.filter):a},eachComponent:function(t,n,o){var e=this._componentsMap;if("function"==typeof t)o=n,n=t,e.each(function(t,i){E(t,function(t,e){n.call(o,i,t,e)})});else if(z(t))E(e.get(t),n,o);else if(R(t)){E(this.findComponents(t),n,o)}},getSeriesByName:function(e){return M(this._componentsMap.get("series"),function(t){return t.name===e})},getSeriesByIndex:function(t){return this._componentsMap.get("series")[t]},getSeriesByType:function(e){return M(this._componentsMap.get("series"),function(t){return t.subType===e})},getSeries:function(){return this._componentsMap.get("series").slice()},getSeriesCount:function(){return this._componentsMap.get("series").length},eachSeries:function(i,n){E(this._seriesIndices,function(t){var e=this._componentsMap.get("series")[t];i.call(n,e,t)},this)},eachRawSeries:function(t,e){E(this._componentsMap.get("series"),t,e)},eachSeriesByType:function(i,n,o){E(this._seriesIndices,function(t){var e=this._componentsMap.get("series")[t];e.subType===i&&n.call(o,e,t)},this)},eachRawSeriesByType:function(t,e,i){return E(this.getSeriesByType(t),e,i)},isSeriesFiltered:function(t){return null==this._seriesIndicesMap.get(t.componentIndex)},getCurrentSeriesIndices:function(){return(this._seriesIndices||[]).slice()},filterSeries:function(t,e){var i=M(this._componentsMap.get("series"),t,e);Ju(this,i)},restoreData:function(i){var n=this._componentsMap;Ju(this,n.get("series"));var o=[];n.each(function(t,e){o.push(e)}),Tu.topologicalTravel(o,Tu.getAllClassMainTypes(),function(e,t){E(n.get(e),function(t){"series"===e&&function(t,e){if(e){var i=e.seiresIndex,n=e.seriesId,o=e.seriesName;return null!=i&&t.componentIndex!==i||null!=n&&t.id!==n||null!=o&&t.name!==o}}(t,i)||t.restoreData()})})}});function Ju(t,e){t._seriesIndicesMap=Q(t._seriesIndices=N(e,function(t){return t.componentIndex})||[])}function Qu(t,e){return e.hasOwnProperty("subType")?M(t,function(t){return t.subType===e.subType}):t}b($u,ku);var th=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getModel","getOption","getViewOfComponentModel","getViewOfSeriesModel"];function eh(e){E(th,function(t){this[t]=A(e[t],e)},this)}var ih={};function nh(){this._coordinateSystems=[]}nh.prototype={constructor:nh,create:function(n,o){var a=[];E(ih,function(t,e){var i=t.create(n,o);a=a.concat(i||[])}),this._coordinateSystems=a},update:function(e,i){E(this._coordinateSystems,function(t){t.update&&t.update(e,i)})},getCoordinateSystems:function(){return this._coordinateSystems.slice()}},nh.register=function(t,e){ih[t]=e},nh.get=function(t){return ih[t]};var oh=E,ah=D,rh=N,sh=m,lh=/^(min|max)?(.+)$/;function uh(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption}function hh(t,e,i){var a={width:e,height:i,aspectratio:e/i},r=!0;return E(t,function(t,e){var i=e.match(lh);if(i&&i[1]&&i[2]){var n=i[1],o=i[2].toLowerCase();!function(t,e,i){return"min"===i?e<=t:"max"===i?t<=e:t===e}(a[o],t,n)&&(r=!1)}}),r}uh.prototype={constructor:uh,setOption:function(t,e){t&&E(Eo(t.series),function(t){t&&t.data&&V(t.data)&&K(t.data)}),t=ah(t);var i=this._optionBackup,n=function(t,i,n){var e,o,a=[],r=[],s=t.timeline;t.baseOption&&(o=t.baseOption);(s||t.options)&&(o=o||{},a=(t.options||[]).slice());if(t.media){o=o||{};var l=t.media;oh(l,function(t){t&&t.option&&(t.query?r.push(t):e=e||t)})}o=o||t;o.timeline||(o.timeline=s);return oh([o].concat(a).concat(N(r,function(t){return t.option})),function(e){oh(i,function(t){t(e,n)})}),{baseOption:o,timelineOptions:a,mediaDefault:e,mediaList:r}}.call(this,t,e,!i);this._newBaseOption=n.baseOption,i?(function(o,t){oh(t=t||{},function(t,e){if(null!=t){var i=o[e];if(Tu.hasClass(e)){t=Eo(t);var n=Vo(i=Eo(i),t);o[e]=rh(n,function(t){return t.option&&t.exist?sh(t.exist,t.option,!0):t.exist||t.option})}else o[e]=sh(i,t,!0)}})}(i.baseOption,n.baseOption),n.timelineOptions.length&&(i.timelineOptions=n.timelineOptions),n.mediaList.length&&(i.mediaList=n.mediaList),n.mediaDefault&&(i.mediaDefault=n.mediaDefault)):this._optionBackup=n},mountOption:function(t){var e=this._optionBackup;return this._timelineOptions=rh(e.timelineOptions,ah),this._mediaList=rh(e.mediaList,ah),this._mediaDefault=ah(e.mediaDefault),this._currentMediaIndices=[],ah(t?e.baseOption:this._newBaseOption)},getTimelineOption:function(t){var e,i=this._timelineOptions;if(i.length){var n=t.getComponent("timeline");n&&(e=ah(i[n.getCurrentIndex()],!0))}return e},getMediaOption:function(t){var e=this._api.getWidth(),i=this._api.getHeight(),n=this._mediaList,o=this._mediaDefault,a=[],r=[];if(!n.length&&!o)return r;for(var s=0,l=n.length;s<l;s++)hh(n[s].query,e,i)&&a.push(s);return!a.length&&o&&(a=[-1]),a.length&&!function(t,e){return t.join(",")===e.join(",")}(a,this._currentMediaIndices)&&(r=rh(a,function(t){return ah(-1===t?o.option:n[t].option)})),this._currentMediaIndices=a,r}};var ch=E,dh=R,fh=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"];function ph(t){var e=t&&t.itemStyle;if(e)for(var i=0,n=fh.length;i<n;i++){var o=fh[i],a=e.normal,r=e.emphasis;a&&a[o]&&(t[o]=t[o]||{},t[o].normal?m(t[o].normal,a[o]):t[o].normal=a[o],a[o]=null),r&&r[o]&&(t[o]=t[o]||{},t[o].emphasis?m(t[o].emphasis,r[o]):t[o].emphasis=r[o],r[o]=null)}}function gh(t,e,i){if(t&&t[e]&&(t[e].normal||t[e].emphasis)){var n=t[e].normal,o=t[e].emphasis;n&&(i?(t[e].normal=t[e].emphasis=null,C(t[e],n)):t[e]=n),o&&(t.emphasis=t.emphasis||{},t.emphasis[e]=o)}}function mh(t){gh(t,"itemStyle"),gh(t,"lineStyle"),gh(t,"areaStyle"),gh(t,"label"),gh(t,"labelLine"),gh(t,"upperLabel"),gh(t,"edgeLabel")}function vh(t,e){var i=dh(t)&&t[e],n=dh(i)&&i.textStyle;if(n)for(var o=0,a=Ro.length;o<a;o++){e=Ro[o];n.hasOwnProperty(e)&&(i[e]=n[e])}}function yh(t){t&&(mh(t),vh(t,"label"),t.emphasis&&vh(t.emphasis,"label"))}function xh(t){return k(t)?t:t?[t]:[]}function _h(t){return(k(t)?t[0]:t)||{}}function wh(e,t){ch(xh(e.series),function(t){dh(t)&&function(t){if(dh(t)){ph(t),mh(t),vh(t,"label"),vh(t,"upperLabel"),vh(t,"edgeLabel"),t.emphasis&&(vh(t.emphasis,"label"),vh(t.emphasis,"upperLabel"),vh(t.emphasis,"edgeLabel")),(i=t.markPoint)&&(ph(i),yh(i)),(n=t.markLine)&&(ph(n),yh(n));var e=t.markArea;e&&yh(e);var i,n,o=t.data;if("graph"===t.type){o=o||t.nodes;var a=t.links||t.edges;if(a&&!V(a))for(var r=0;r<a.length;r++)yh(a[r]);E(t.categories,function(t){mh(t)})}if(o&&!V(o))for(r=0;r<o.length;r++)yh(o[r]);if((i=t.markPoint)&&i.data){var s=i.data;for(r=0;r<s.length;r++)yh(s[r])}if((n=t.markLine)&&n.data){var l=n.data;for(r=0;r<l.length;r++)k(l[r])?(yh(l[r][0]),yh(l[r][1])):yh(l[r])}"gauge"===t.type?(vh(t,"axisLabel"),vh(t,"title"),vh(t,"detail")):"treemap"===t.type?(gh(t.breadcrumb,"itemStyle"),E(t.levels,function(t){mh(t)})):"tree"===t.type&&mh(t.leaves)}}(t)});var i=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];t&&i.push("valueAxis","categoryAxis","logAxis","timeAxis"),ch(i,function(t){ch(xh(e[t]),function(t){t&&(vh(t,"axisLabel"),vh(t.axisPointer,"label"))})}),ch(xh(e.parallel),function(t){var e=t&&t.parallelAxisDefault;vh(e,"axisLabel"),vh(e&&e.axisPointer,"label")}),ch(xh(e.calendar),function(t){gh(t,"itemStyle"),vh(t,"dayLabel"),vh(t,"monthLabel"),vh(t,"yearLabel")}),ch(xh(e.radar),function(t){vh(t,"name")}),ch(xh(e.geo),function(t){dh(t)&&(yh(t),ch(xh(t.regions),function(t){yh(t)}))}),ch(xh(e.timeline),function(t){yh(t),gh(t,"label"),gh(t,"itemStyle"),gh(t,"controlStyle",!0);var e=t.data;k(e)&&E(e,function(t){R(t)&&(gh(t,"label"),gh(t,"itemStyle"))})}),ch(xh(e.toolbox),function(t){gh(t,"iconStyle"),ch(t.feature,function(t){gh(t,"iconStyle")})}),vh(_h(e.axisPointer),"label"),vh(_h(e.tooltip).axisPointer,"label")}function bh(e){E(Sh,function(t){t[0]in e&&!(t[1]in e)&&(e[t[1]]=e[t[0]])})}var Sh=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],Mh=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],Ih=function(i,t){wh(i,t),i.series=Eo(i.series),E(i.series,function(t){if(R(t)){var e=t.type;if("line"===e)null!=t.clipOverflow&&(t.clip=t.clipOverflow);else if("pie"===e||"gauge"===e)null!=t.clockWise&&(t.clockwise=t.clockWise);else if("gauge"===e){var i=function(t,e){e=e.split(",");for(var i=t,n=0;n<e.length&&null!=(i=i&&i[e[n]]);n++);return i}(t,"pointer.color");null!=i&&function(t,e,i,n){e=e.split(",");for(var o,a=t,r=0;r<e.length-1;r++)null==a[o=e[r]]&&(a[o]={}),a=a[o];!n&&null!=a[e[r]]||(a[e[r]]=i)}(t,"itemStyle.color",i)}bh(t)}}),i.dataRange&&(i.visualMap=i.dataRange),E(Mh,function(t){var e=i[t];e&&(k(e)||(e=[e]),E(e,function(t){bh(t)}))})};function Th(m){E(m,function(h,c){var d=[],f=[NaN,NaN],t=[h.stackResultDimension,h.stackedOverDimension],p=h.data,g=h.isStackedByIndex,e=p.map(t,function(t,e,i){var n,o,a=p.get(h.stackedDimension,i);if(isNaN(a))return f;g?o=p.getRawIndex(i):n=p.get(h.stackedByDimension,i);for(var r=NaN,s=c-1;0<=s;s--){var l=m[s];if(g||(o=l.data.rawIndexOf(l.stackedByDimension,n)),0<=o){var u=l.data.getByRawIndex(l.stackResultDimension,o);if(0<=a&&0<u||a<=0&&u<0){a+=u,r=u;break}}}return d[0]=a,d[1]=r,d});p.hostModel.setData(e),h.data=e})}function Ah(t,e){Gu.isInstance(t)||(t=Gu.seriesDataToSource(t)),this._source=t;var i=this._data=t.data,n=t.sourceFormat;n===Ru&&(this._offset=0,this._dimSize=e,this._data=i),L(this,Ch[n===Nu?n+"_"+t.seriesLayoutBy:n])}var Dh=Ah.prototype;Dh.pure=!1;var Ch={arrayRows_column:{pure:Dh.persistent=!0,count:function(){return Math.max(0,this._data.length-this._source.startIndex)},getItem:function(t){return this._data[t+this._source.startIndex]},appendData:Ph},arrayRows_row:{pure:!0,count:function(){var t=this._data[0];return t?Math.max(0,t.length-this._source.startIndex):0},getItem:function(t){t+=this._source.startIndex;for(var e=[],i=this._data,n=0;n<i.length;n++){var o=i[n];e.push(o?o[t]:null)}return e},appendData:function(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".')}},objectRows:{pure:!0,count:Lh,getItem:kh,appendData:Ph},keyedColumns:{pure:!0,count:function(){var t=this._source.dimensionsDefine[0].name,e=this._data[t];return e?e.length:0},getItem:function(t){for(var e=[],i=this._source.dimensionsDefine,n=0;n<i.length;n++){var o=this._data[i[n].name];e.push(o?o[t]:null)}return e},appendData:function(t){var o=this._data;E(t,function(t,e){for(var i=o[e]||(o[e]=[]),n=0;n<(t||[]).length;n++)i.push(t[n])})}},original:{count:Lh,getItem:kh,appendData:Ph},typedArray:{persistent:!(Dh.getSource=function(){return this._source}),pure:!0,count:function(){return this._data?this._data.length/this._dimSize:0},getItem:function(t,e){t-=this._offset,e=e||[];for(var i=this._dimSize*t,n=0;n<this._dimSize;n++)e[n]=this._data[i+n];return e},appendData:function(t){this._data=t},clean:function(){this._offset+=this.count(),this._data=null}}};function Lh(){return this._data.length}function kh(t){return this._data[t]}function Ph(t){for(var e=0;e<t.length;e++)this._data.push(t[e])}var Nh={arrayRows:Oh,objectRows:function(t,e,i,n){return null!=i?t[n]:t},keyedColumns:Oh,original:function(t,e,i,n){var o=Bo(t);return null!=i&&o instanceof Array?o[i]:o},typedArray:Oh};function Oh(t,e,i,n){return null!=i?t[i]:t}var Eh={arrayRows:zh,objectRows:function(t,e,i,n){return Rh(t[e],this._dimensionInfos[e])},keyedColumns:zh,original:function(t,e,i,n){var o=t&&(null==t.value?t:t.value);return!this._rawData.pure&&function(t){return Po(t)&&!(t instanceof Array)}(t)&&(this.hasItemOption=!0),Rh(o instanceof Array?o[n]:o,this._dimensionInfos[e])},typedArray:function(t,e,i,n){return t[n]}};function zh(t,e,i,n){return Rh(t[n],this._dimensionInfos[e])}function Rh(t,e){var i=e&&e.type;if("ordinal"!==i)return"time"===i&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+Hl(t)),null==t||""===t?NaN:+t;var n=e&&e.ordinalMeta;return n?n.parseAndCollect(t):t}function Bh(t,e,i){if(t){var n=t.getRawDataItem(e);if(null!=n){var o,a,r=t.getProvider().getSource().sourceFormat,s=t.getDimensionInfo(i);return s&&(o=s.name,a=s.index),Nh[r](n,e,a,o)}}}function Vh(t,e,i){if(t){var n=t.getProvider().getSource().sourceFormat;if(n===Pu||n===Ou){var o=t.getRawDataItem(e);return n!==Pu||R(o)||(o=null),o?o[i]:void 0}}}var Gh=/\{@(.+?)\}/g,Fh={getDataParams:function(t,e){var i=this.getData(e),n=this.getRawValue(t,e),o=i.getRawIndex(t),a=i.getName(t),r=i.getRawDataItem(t),s=i.getItemVisual(t,"color"),l=i.getItemVisual(t,"borderColor"),u=this.ecModel.getComponent("tooltip"),h=qo(u&&u.get("renderMode")),c=this.mainType,d="series"===c,f=i.userOutput;return{componentType:c,componentSubType:this.subType,componentIndex:this.componentIndex,seriesType:d?this.subType:null,seriesIndex:this.seriesIndex,seriesId:d?this.id:null,seriesName:d?this.name:null,name:a,dataIndex:o,data:r,dataType:e,value:n,color:s,borderColor:l,dimensionNames:f?f.dimensionNames:null,encode:f?f.encode:null,marker:ru({color:s,renderMode:h}),$vars:["seriesName","name","value"]}},getFormattedLabel:function(n,t,e,i,o){t=t||"normal";var a=this.getData(e),r=a.getItemModel(n),s=this.getDataParams(n,e);null!=i&&s.value instanceof Array&&(s.value=s.value[i]);var l=r.get("normal"===t?[o||"label","formatter"]:[t,o||"label","formatter"]);return"function"==typeof l?(s.status=t,s.dimensionIndex=i,l(s)):"string"==typeof l?ou(l,s).replace(Gh,function(t,e){var i=e.length;return"["===e.charAt(0)&&"]"===e.charAt(i-1)&&(e=+e.slice(1,i-1)),Bh(a,n,e)}):void 0},getRawValue:function(t,e){return Bh(this.getData(e),t)},formatTooltip:function(){}};function Wh(t){return new Hh(t)}function Hh(t){t=t||{},this._reset=t.reset,this._plan=t.plan,this._count=t.count,this._onDirty=t.onDirty,this._dirty=!0,this.context}var Zh=Hh.prototype;Zh.perform=function(t){var e,i=this._upstream,n=t&&t.skip;if(this._dirty&&i){var o=this.context;o.data=o.outputData=i.context.outputData}this.__pipeline&&(this.__pipeline.currentTask=this),this._plan&&!n&&(e=this._plan(this.context));var a,r=h(this._modBy),s=this._modDataCount||0,l=h(t&&t.modBy),u=t&&t.modDataCount||0;function h(t){return 1<=t||(t=1),t}r===l&&s===u||(e="reset"),!this._dirty&&"reset"!==e||(this._dirty=!1,a=function(t,e){var i,n;t._dueIndex=t._outputDueEnd=t._dueEnd=0,t._settedOutputEnd=null,!e&&t._reset&&((i=t._reset(t.context))&&i.progress&&(n=i.forceFirstProgress,i=i.progress),k(i)&&!i.length&&(i=null));t._progress=i,t._modBy=t._modDataCount=null;var o=t._downstream;return o&&o.dirty(),n}(this,n)),this._modBy=l,this._modDataCount=u;var c=t&&t.step;if(this._dueEnd=i?i._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var d=this._dueIndex,f=Math.min(null!=c?this._dueIndex+c:1/0,this._dueEnd);if(!n&&(a||d<f)){var p=this._progress;if(k(p))for(var g=0;g<p.length;g++)tc(this,p[g],d,f,l,u);else tc(this,p,d,f,l,u)}this._dueIndex=f;var m=null!=this._settedOutputEnd?this._settedOutputEnd:f;this._outputDueEnd=m}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished()};var Uh,Xh,Yh,jh,qh,Kh,$h=Kh={reset:function(t,e,i,n){Xh=t,Uh=e,Yh=i,jh=n,qh=Math.ceil(jh/Yh),Kh.next=1<Yh&&0<jh?Qh:Jh}};function Jh(){return Xh<Uh?Xh++:null}function Qh(){var t=Xh%qh*Yh+Math.ceil(Xh/qh),e=Uh<=Xh?null:t<jh?t:Xh;return Xh++,e}function tc(t,e,i,n,o,a){$h.reset(i,n,o,a),t._callingProgress=e,t._callingProgress({start:i,end:n,count:n-i,next:$h.next},t.context)}Zh.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context)},Zh.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd},Zh.pipe=function(t){this._downstream===t&&!this._dirty||((this._downstream=t)._upstream=this,t.dirty())},Zh.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0)},Zh.getUpstream=function(){return this._upstream},Zh.getDownstream=function(){return this._downstream},Zh.setOutputEnd=function(t){this._outputDueEnd=this._settedOutputEnd=t};var ec=Zo(),ic=Tu.extend({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendVisualProvider:null,visualColorAccessPath:"itemStyle.color",visualBorderColorAccessPath:"itemStyle.borderColor",layoutMode:null,init:function(t,e,i,n){this.seriesIndex=this.componentIndex,this.dataTask=Wh({count:oc,reset:ac}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(t,i),Hu(this);var o=this.getInitialData(t,i);sc(o,this),this.dataTask.context.data=o,ec(this).dataBeforeProcessed=o,nc(this)},mergeDefaultAndTheme:function(t,e){var i=this.layoutMode,n=i?_u(t):{},o=this.subType;Tu.hasClass(o)&&(o+="Series"),m(t,e.getTheme().get(this.subType)),m(t,this.getDefaultOption()),zo(t,"label",["show"]),this.fillDataTextStyle(t.data),i&&xu(t,n,i)},mergeOption:function(t,e){t=m(this.option,t,!0),this.fillDataTextStyle(t.data);var i=this.layoutMode;i&&xu(this.option,t,i),Hu(this);var n=this.getInitialData(t,e);sc(n,this),this.dataTask.dirty(),this.dataTask.context.data=n,ec(this).dataBeforeProcessed=n,nc(this)},fillDataTextStyle:function(t){if(t&&!V(t))for(var e=["show"],i=0;i<t.length;i++)t[i]&&t[i].label&&zo(t[i],"label",e)},getInitialData:function(){},appendData:function(t){this.getRawData().appendData(t.data)},getData:function(t){var e=uc(this);if(e){var i=e.context.data;return null==t?i:i.getLinkedData(t)}return ec(this).data},setData:function(t){var e=uc(this);if(e){var i=e.context;i.data!==t&&e.modifyOutputEnd&&e.setOutputEnd(t.count()),i.outputData=t,e!==this.dataTask&&(i.data=t)}ec(this).data=t},getSource:function(){return function(t){return Wu(t).source}(this)},getRawData:function(){return ec(this).dataBeforeProcessed},getBaseAxis:function(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis()},formatTooltip:function(o,h,t,c){var d=this,e="html"===(c=c||"html")?"<br/>":"\n",f="richText"===c,p={},g=0;function i(t){return{renderMode:c,content:eu(Kl(t)),style:p}}var m=this.getData(),a=m.mapDimension("defaultedTooltip",!0),n=a.length,r=this.getRawValue(o),s=k(r),v=m.getItemVisual(o,"color");R(v)&&v.colorStops&&(v=(v.colorStops[0]||{}).color),v=v||"transparent";var l=(1<n||s&&!n?function(t){var l=S(t,function(t,e,i){var n=m.getDimensionInfo(i);return t|(n&&!1!==n.tooltip&&null!=n.displayName)},0),u=[];function e(t,e){var i=m.getDimensionInfo(e);if(i&&!1!==i.otherDims.tooltip){var n=i.type,o="sub"+d.seriesIndex+"at"+g,a=ru({color:v,type:"subItem",renderMode:c,markerId:o}),r="string"==typeof a?a:a.content,s=(l?r+eu(i.displayName||"-")+": ":"")+eu("ordinal"===n?t+"":"time"===n?h?"":lu("yyyy/MM/dd hh:mm:ss",t):Kl(t));s&&u.push(s),f&&(p[o]=v,++g)}}a.length?E(a,function(t){e(Bh(m,o,t),t)}):E(t,e);var i=l?f?"\n":"<br/>":"",n=i+u.join(i||", ");return{renderMode:c,content:n,style:p}}(r):i(n?Bh(m,o,a[0]):s?r[0]:r)).content,u=d.seriesIndex+"at"+g,y=ru({color:v,type:"item",renderMode:c,markerId:u});p[u]=v,++g;var x=m.getName(o),_=this.name;Fo(this)||(_=""),_=_?eu(_)+(h?": ":e):"";var w="string"==typeof y?y:y.content;return{html:h?w+_+l:_+w+(x?eu(x)+": "+l:l),markers:p}},isAnimationEnabled:function(){if(v.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),t},restoreData:function(){this.dataTask.dirty()},getColorFromPalette:function(t,e,i){var n=this.ecModel,o=ku.getColorFromPalette.call(this,t,e,i);return o=o||n.getColorFromPalette(t,e,i)},coordDimToDataDim:function(t){return this.getRawData().mapDimension(t,!0)},getProgressive:function(){return this.get("progressive")},getProgressiveThreshold:function(){return this.get("progressiveThreshold")},getAxisTooltipData:null,getTooltipPosition:null,pipeTask:null,preventIncremental:null,pipelineContext:null});function nc(t){var e=t.name;Fo(t)||(t.name=function(t){var i=t.getRawData(),e=i.mapDimension("seriesName",!0),n=[];return E(e,function(t){var e=i.getDimensionInfo(t);e.displayName&&n.push(e.displayName)}),n.join(" ")}(t)||e)}function oc(t){return t.model.getRawData().count()}function ac(t){var e=t.model;return e.setData(e.getRawData().cloneShallow()),rc}function rc(t,e){t.end>e.outputData.count()&&e.model.getRawData().cloneShallow(e.outputData)}function sc(e,i){E(e.CHANGABLE_METHODS,function(t){e.wrapMethod(t,T(lc,i))})}function lc(t){var e=uc(t);e&&e.setOutputEnd(this.count())}function uc(t){var e=(t.ecModel||{}).scheduler,i=e&&e.getPipeline(t.uid);if(i){var n=i.currentTask;if(n){var o=n.agentStubMap;o&&(n=o.get(t.uid))}return n}}b(ic,Fh),b(ic,ku);var hc=function(){this.group=new Ii,this.uid=Cl("viewComponent")};hc.prototype={constructor:hc,init:function(t,e){},render:function(t,e,i,n){},dispose:function(){},filterForExposedEvent:null};var cc=hc.prototype;cc.updateView=cc.updateLayout=cc.updateVisual=function(t,e,i,n){},ta(hc),aa(hc,{registerWhenExtend:!0});function dc(){var s=Zo();return function(t){var e=s(t),i=t.pipelineContext,n=e.large,o=e.progressiveRender,a=e.large=i.large,r=e.progressiveRender=i.progressiveRender;return!!(n^a||o^r)&&"reset"}}var fc=Zo(),pc=dc();function gc(){this.group=new Ii,this.uid=Cl("viewChart"),this.renderTask=Wh({plan:xc,reset:_c}),this.renderTask.context={view:this}}var mc=gc.prototype={type:"chart",init:function(t,e){},render:function(t,e,i,n){},highlight:function(t,e,i,n){yc(t.getData(),n,"emphasis")},downplay:function(t,e,i,n){yc(t.getData(),n,"normal")},remove:function(t,e){this.group.removeAll()},dispose:function(){},incrementalPrepareRender:null,incrementalRender:null,updateTransform:null,filterForExposedEvent:null};function vc(t,e,i){if(t&&(t.trigger(e,i),t.isGroup&&!qs(t)))for(var n=0,o=t.childCount();n<o;n++)vc(t.childAt(n),e,i)}function yc(e,t,i){var n=Ho(e,t),o=t&&null!=t.highlightKey?Ks(t.highlightKey):null;null!=n?E(Eo(n),function(t){vc(e.getItemGraphicEl(t),i,o)}):e.eachItemGraphicEl(function(t){vc(t,i,o)})}function xc(t){return pc(t.model)}function _c(t){var e=t.model,i=t.ecModel,n=t.api,o=t.payload,a=e.pipelineContext.progressiveRender,r=t.view,s=o&&fc(o).updateMethod,l=a?"incrementalPrepareRender":s&&r[s]?s:"render";return"render"!==l&&r[l](e,i,n,o),wc[l]}mc.updateView=mc.updateLayout=mc.updateVisual=function(t,e,i,n){this.render(t,e,i,n)},ta(gc),aa(gc,{registerWhenExtend:!0}),gc.markUpdateMethod=function(t,e){fc(t).updateMethod=e};var wc={incrementalPrepareRender:{progress:function(t,e){e.view.incrementalRender(t,e.model,e.ecModel,e.api,e.payload)}},render:{forceFirstProgress:!0,progress:function(t,e){e.view.render(e.model,e.ecModel,e.api,e.payload)}}},bc="\0__throttleOriginMethod",Sc="\0__throttleRate",Mc="\0__throttleType";function Ic(t,i,n){var o,a,r,s,l,u=0,h=0,c=null;function d(){h=(new Date).getTime(),c=null,t.apply(r,s||[])}i=i||0;function e(){o=(new Date).getTime(),r=this,s=arguments;var t=l||i,e=l||n;l=null,a=o-(e?u:h)-t,clearTimeout(c),e?c=setTimeout(d,t):0<=a?d():c=setTimeout(d,-a),u=o}return e.clear=function(){c&&(clearTimeout(c),c=null)},e.debounceNextCall=function(t){l=t},e}function Tc(t,e,i,n){var o=t[e];if(o){var a=o[bc]||o,r=o[Mc];if(o[Sc]!==i||r!==n){if(null==i||!n)return t[e]=a;(o=t[e]=Ic(a,i,"debounce"===n))[bc]=a,o[Mc]=n,o[Sc]=i}return o}}function Ac(t,e){var i=t[e];i&&i[bc]&&(t[e]=i[bc])}var Dc={createOnAllSeries:!0,performRawSeries:!0,reset:function(e,t){var i=e.getData(),a=(e.visualColorAccessPath||"itemStyle.color").split("."),n=e.get(a),o=!O(n)||n instanceof ss?null:n;n&&!o||(n=e.getColorFromPalette(e.name,null,t.getSeriesCount())),i.setVisual("color",n);var r=(e.visualBorderColorAccessPath||"itemStyle.borderColor").split("."),s=e.get(r);if(i.setVisual("borderColor",s),!t.isSeriesFiltered(e)){o&&i.each(function(t){i.setItemVisual(t,"color",o(e.getDataParams(t)))});return{dataEach:i.hasItemOption?function(t,e){var i=t.getItemModel(e),n=i.get(a,!0),o=i.get(r,!0);null!=n&&t.setItemVisual(e,"color",n),null!=o&&t.setItemVisual(e,"borderColor",o)}:null}}}},Cc={legend:{selector:{all:"全选",inverse:"反选"}},toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}},Lc=function(t,e){var a=e.getModel("aria");if(a.get("show"))if(a.get("description"))t.setAttribute("aria-label",a.get("description"));else{var h=0;e.eachSeries(function(t,e){++h},this);var i,c=a.get("data.maxCount")||10,n=a.get("series.maxCount")||10,d=Math.min(h,n);if(!(h<1)){var o=function(){var t=e.getModel("title").option;t&&t.length&&(t=t[0]);return t&&t.text}();i=o?p(g("general.withTitle"),{title:o}):g("general.withoutTitle");var f=[];i+=p(g(1<h?"series.multiple.prefix":"series.single.prefix"),{seriesCount:h}),e.eachSeries(function(t,e){if(e<d){var i,n=t.get("name"),o="series."+(1<h?"multiple":"single")+".";i=p(i=g(n?o+"withName":o+"withoutName"),{seriesId:t.seriesIndex,seriesName:t.get("name"),seriesType:function(t){return Cc.series.typeNames[t]||"自定义图"}(t.subType)});var a=t.getData();(window.data=a).count()>c?i+=p(g("data.partialData"),{displayCnt:c}):i+=g("data.allData");for(var r=[],s=0;s<a.count();s++)if(s<c){var l=a.getName(s),u=Bh(a,s);r.push(p(g(l?"data.withName":"data.withoutName"),{name:l,value:u}))}i+=r.join(g("data.separator.middle"))+g("data.separator.end"),f.push(i)}}),i+=f.join(g("series.multiple.separator.middle"))+g("series.multiple.separator.end"),t.setAttribute("aria-label",i)}}function p(t,e){if("string"!=typeof t)return t;var i=t;return E(e,function(t,e){i=i.replace(new RegExp("\\{\\s*"+e+"\\s*\\}","g"),t)}),i}function g(t){var e=a.get(t);if(null!=e)return e;for(var i=t.split("."),n=Cc.aria,o=0;o<i.length;++o)n=n[i[o]];return n}},kc=Math.PI;function Pc(t,e,i,n){this.ecInstance=t,this.api=e,this.unfinished;i=this._dataProcessorHandlers=i.slice(),n=this._visualHandlers=n.slice();this._allHandlers=i.concat(n),this._stageTaskMap=Q()}var Nc=Pc.prototype;function Oc(l,t,u,h,c){var d;function f(t,e){return t.setDirty&&(!t.dirtyMap||t.dirtyMap.get(e.__pipeline.id))}c=c||{},E(t,function(n,t){if(!c.visualType||c.visualType===n.visualType){var e=l._stageTaskMap.get(n.uid),i=e.seriesTaskMap,o=e.overallTask;if(o){var a,r=o.agentStubMap;r.each(function(t){f(c,t)&&(t.dirty(),a=!0)}),a&&o.dirty(),Ec(o,h);var s=l.getPerformArgs(o,c.block);r.each(function(t){t.perform(s)}),d|=o.perform(s)}else i&&i.each(function(t,e){f(c,t)&&t.dirty();var i=l.getPerformArgs(t,c.block);i.skip=!n.performRawSeries&&u.isSeriesFiltered(t.context.model),Ec(t,h),d|=t.perform(i)})}}),l.unfinished|=d}Nc.restoreData=function(t,e){t.restoreData(e),this._stageTaskMap.each(function(t){var e=t.overallTask;e&&e.dirty()})},Nc.getPerformArgs=function(t,e){if(t.__pipeline){var i=this._pipelineMap.get(t.__pipeline.id),n=i.context,o=!e&&i.progressiveEnabled&&(!n||n.progressiveRender)&&t.__idxInPipeline>i.blockIndex?i.step:null,a=n&&n.modDataCount;return{step:o,modBy:null!=a?Math.ceil(a/o):null,modDataCount:a}}},Nc.getPipeline=function(t){return this._pipelineMap.get(t)},Nc.updateStreamModes=function(t,e){var i=this._pipelineMap.get(t.uid),n=t.getData().count(),o=i.progressiveEnabled&&e.incrementalPrepareRender&&n>=i.threshold,a=t.get("large")&&n>=t.get("largeThreshold"),r="mod"===t.get("progressiveChunkMode")?n:null;t.pipelineContext=i.context={progressiveRender:o,modDataCount:r,large:a}},Nc.restorePipelines=function(t){var n=this,o=n._pipelineMap=Q();t.eachSeries(function(t){var e=t.getProgressive(),i=t.uid;o.set(i,{id:i,head:null,tail:null,threshold:t.getProgressiveThreshold(),progressiveEnabled:e&&!(t.preventIncremental&&t.preventIncremental()),blockIndex:-1,step:Math.round(e||700),count:0}),Uc(n,t,t.dataTask)})},Nc.prepareStageTasks=function(){var i=this._stageTaskMap,n=this.ecInstance.getModel(),o=this.api;E(this._allHandlers,function(t){var e=i.get(t.uid)||i.set(t.uid,[]);t.reset&&function(n,o,t,a,r){var s=t.seriesTaskMap||(t.seriesTaskMap=Q()),e=o.seriesType,i=o.getTargetSeries;o.createOnAllSeries?a.eachRawSeries(l):e?a.eachRawSeriesByType(e,l):i&&i(a,r).each(l);function l(t){var e=t.uid,i=s.get(e)||s.set(e,Wh({plan:Gc,reset:Fc,count:Zc}));i.context={model:t,ecModel:a,api:r,useClearVisual:o.isVisual&&!o.isLayout,plan:o.plan,reset:o.reset,scheduler:n},Uc(n,t,i)}var u=n._pipelineMap;s.each(function(t,e){u.get(e)||(t.dispose(),s.removeKey(e))})}(this,t,e,n,o),t.overallReset&&function(n,t,e,i,o){var a=e.overallTask=e.overallTask||Wh({reset:zc});a.context={ecModel:i,api:o,overallReset:t.overallReset,scheduler:n};var r=a.agentStubMap=a.agentStubMap||Q(),s=t.seriesType,l=t.getTargetSeries,u=!0,h=t.modifyOutputEnd;s?i.eachRawSeriesByType(s,c):l?l(i,o).each(c):(u=!1,E(i.getSeries(),c));function c(t){var e=t.uid,i=r.get(e);i||(i=r.set(e,Wh({reset:Rc,onDirty:Vc})),a.dirty()),i.context={model:t,overallProgress:u,modifyOutputEnd:h},i.agent=a,i.__block=u,Uc(n,t,i)}var d=n._pipelineMap;r.each(function(t,e){d.get(e)||(t.dispose(),a.dirty(),r.removeKey(e))})}(this,t,e,n,o)},this)},Nc.prepareView=function(t,e,i,n){var o=t.renderTask,a=o.context;a.model=e,a.ecModel=i,a.api=n,o.__block=!t.incrementalPrepareRender,Uc(this,e,o)},Nc.performDataProcessorTasks=function(t,e){Oc(this,this._dataProcessorHandlers,t,e,{block:!0})},Nc.performVisualTasks=function(t,e,i){Oc(this,this._visualHandlers,t,e,i)},Nc.performSeriesTasks=function(t){var e;t.eachSeries(function(t){e|=t.dataTask.perform()}),this.unfinished|=e},Nc.plan=function(){this._pipelineMap.each(function(t){var e=t.tail;do{if(e.__block){t.blockIndex=e.__idxInPipeline;break}e=e.getUpstream()}while(e)})};var Ec=Nc.updatePayload=function(t,e){"remain"!==e&&(t.context.payload=e)};function zc(t){t.overallReset(t.ecModel,t.api,t.payload)}function Rc(t,e){return t.overallProgress&&Bc}function Bc(){this.agent.dirty(),this.getDownstream().dirty()}function Vc(){this.agent&&this.agent.dirty()}function Gc(t){return t.plan&&t.plan(t.model,t.ecModel,t.api,t.payload)}function Fc(t){t.useClearVisual&&t.data.clearAllVisual();var e=t.resetDefines=Eo(t.reset(t.model,t.ecModel,t.api,t.payload));return 1<e.length?N(e,function(t,e){return Hc(e)}):Wc}var Wc=Hc(0);function Hc(a){return function(t,e){var i=e.data,n=e.resetDefines[a];if(n&&n.dataEach)for(var o=t.start;o<t.end;o++)n.dataEach(i,o);else n&&n.progress&&n.progress(t,i)}}function Zc(t){return t.data.count()}function Uc(t,e,i){var n=e.uid,o=t._pipelineMap.get(n);o.head||(o.head=i),o.tail&&o.tail.pipe(i),(o.tail=i).__idxInPipeline=o.count++,i.__pipeline=o}Pc.wrapStageHandler=function(t,e){return O(t)&&(t={overallReset:t,seriesType:function(t){Xc=null;try{t(Yc,jc)}catch(t){}return Xc}(t)}),t.uid=Cl("stageHandler"),e&&(t.visualType=e),t};var Xc,Yc={},jc={};function qc(t,e){for(var i in e.prototype)t[i]=et}qc(Yc,$u),qc(jc,eh),Yc.eachSeriesByType=Yc.eachRawSeriesByType=function(t){Xc=t},Yc.eachComponent=function(t){"series"===t.mainType&&t.subType&&(Xc=t.subType)};function Kc(){return{axisLine:{lineStyle:{color:Qc}},axisTick:{lineStyle:{color:Qc}},axisLabel:{textStyle:{color:Qc}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:Qc}}}}var $c=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],Jc={color:$c,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],$c]},Qc="#eee",td=["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],ed={color:td,backgroundColor:"#333",tooltip:{axisPointer:{lineStyle:{color:Qc},crossStyle:{color:Qc},label:{color:"#000"}}},legend:{textStyle:{color:Qc}},textStyle:{color:Qc},title:{textStyle:{color:Qc}},toolbox:{iconStyle:{normal:{borderColor:Qc}}},dataZoom:{textStyle:{color:Qc}},visualMap:{textStyle:{color:Qc}},timeline:{lineStyle:{color:Qc},itemStyle:{normal:{color:td[1]}},label:{normal:{textStyle:{color:Qc}}},controlStyle:{normal:{color:Qc,borderColor:Qc}}},timeAxis:Kc(),logAxis:Kc(),valueAxis:Kc(),categoryAxis:Kc(),line:{symbol:"circle"},graph:{color:td},gauge:{title:{textStyle:{color:Qc}}},candlestick:{itemStyle:{normal:{color:"#FD1050",color0:"#0CF49B",borderColor:"#FD1050",borderColor0:"#0CF49B"}}}};ed.categoryAxis.splitLine.show=!1,Tu.extend({type:"dataset",defaultOption:{seriesLayoutBy:Bu,sourceHeader:null,dimensions:null,source:null},optionUpdated:function(){!function(t){var e=t.option.source,i=zu;if(V(e))i=Ru;else if(k(e)){0===e.length&&(i=Nu);for(var n=0,o=e.length;n<o;n++){var a=e[n];if(null!=a){if(k(a)){i=Nu;break}if(R(a)){i=Ou;break}}}}else if(R(e)){for(var r in e)if(e.hasOwnProperty(r)&&P(e[r])){i=Eu;break}}else if(null!=e)throw new Error("Invalid data");Wu(t).sourceFormat=i}(this)}}),hc.extend({type:"dataset"});var id=Sr.extend({type:"ellipse",shape:{cx:0,cy:0,rx:0,ry:0},buildPath:function(t,e){var i=e.cx,n=e.cy,o=e.rx,a=e.ry,r=.5522848*o,s=.5522848*a;t.moveTo(i-o,n),t.bezierCurveTo(i-o,n-s,i-r,n-a,i,n-a),t.bezierCurveTo(i+r,n-a,i+o,n-s,i+o,n),t.bezierCurveTo(i+o,n+s,i+r,n+a,i,n+a),t.bezierCurveTo(i-r,n+a,i-o,n+s,i-o,n),t.closePath()}}),nd=/[\s,]+/;function od(t){z(t)&&(t=(new DOMParser).parseFromString(t,"text/xml"));for(9===t.nodeType&&(t=t.firstChild);"svg"!==t.nodeName.toLowerCase()||1!==t.nodeType;)t=t.nextSibling;return t}function ad(){this._defs={},this._root=null,this._isDefine=!1,this._isText=!1}ad.prototype.parse=function(t,e){e=e||{};var i=od(t);if(!i)throw new Error("Illegal svg");var n=new Ii;this._root=n;var o=i.getAttribute("viewBox")||"",a=parseFloat(i.getAttribute("width")||e.width),r=parseFloat(i.getAttribute("height")||e.height);isNaN(a)&&(a=null),isNaN(r)&&(r=null),cd(i,n,null,!0);for(var s,l,u=i.firstChild;u;)this._parseNode(u,n),u=u.nextSibling;if(o){var h=j(o).split(nd);4<=h.length&&(s={x:parseFloat(h[0]||0),y:parseFloat(h[1]||0),width:parseFloat(h[2]),height:parseFloat(h[3])})}if(s&&null!=a&&null!=r&&(l=md(s,a,r),!e.ignoreViewBox)){var c=n;(n=new Ii).add(c),c.scale=l.scale.slice(),c.position=l.position.slice()}return e.ignoreRootClip||null==a||null==r||n.setClipPath(new is({shape:{x:0,y:0,width:a,height:r}})),{root:n,width:a,height:r,viewBoxRect:s,viewBoxTransform:l}},ad.prototype._parseNode=function(t,e){var i,n,o=t.nodeName.toLowerCase();if("defs"===o?this._isDefine=!0:"text"===o&&(this._isText=!0),this._isDefine){if(n=sd[o]){var a=n.call(this,t),r=t.getAttribute("id");r&&(this._defs[r]=a)}}else(n=rd[o])&&(i=n.call(this,t,e),e.add(i));for(var s=t.firstChild;s;)1===s.nodeType&&this._parseNode(s,i),3===s.nodeType&&this._isText&&this._parseText(s,i),s=s.nextSibling;"defs"===o?this._isDefine=!1:"text"===o&&(this._isText=!1)},ad.prototype._parseText=function(t,e){if(1===t.nodeType){var i=t.getAttribute("dx")||0,n=t.getAttribute("dy")||0;this._textX+=parseFloat(i),this._textY+=parseFloat(n)}var o=new Fr({style:{text:t.textContent,transformText:!0},position:[this._textX||0,this._textY||0]});ld(e,o),cd(t,o,this._defs);var a=o.style.fontSize;a&&a<9&&(o.style.fontSize=9,o.scale=o.scale||[1,1],o.scale[0]*=a/9,o.scale[1]*=a/9);var r=o.getBoundingRect();return this._textX+=r.width,e.add(o),o};var rd={g:function(t,e){var i=new Ii;return ld(e,i),cd(t,i,this._defs),i},rect:function(t,e){var i=new is;return ld(e,i),cd(t,i,this._defs),i.setShape({x:parseFloat(t.getAttribute("x")||0),y:parseFloat(t.getAttribute("y")||0),width:parseFloat(t.getAttribute("width")||0),height:parseFloat(t.getAttribute("height")||0)}),i},circle:function(t,e){var i=new Hr;return ld(e,i),cd(t,i,this._defs),i.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),r:parseFloat(t.getAttribute("r")||0)}),i},line:function(t,e){var i=new os;return ld(e,i),cd(t,i,this._defs),i.setShape({x1:parseFloat(t.getAttribute("x1")||0),y1:parseFloat(t.getAttribute("y1")||0),x2:parseFloat(t.getAttribute("x2")||0),y2:parseFloat(t.getAttribute("y2")||0)}),i},ellipse:function(t,e){var i=new id;return ld(e,i),cd(t,i,this._defs),i.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),rx:parseFloat(t.getAttribute("rx")||0),ry:parseFloat(t.getAttribute("ry")||0)}),i},polygon:function(t,e){var i=t.getAttribute("points");i=i&&ud(i);var n=new qr({shape:{points:i||[]}});return ld(e,n),cd(t,n,this._defs),n},polyline:function(t,e){var i=new Sr;ld(e,i),cd(t,i,this._defs);var n=t.getAttribute("points");return n=n&&ud(n),new Kr({shape:{points:n||[]}})},image:function(t,e){var i=new qn;return ld(e,i),cd(t,i,this._defs),i.setStyle({image:t.getAttribute("xlink:href"),x:t.getAttribute("x"),y:t.getAttribute("y"),width:t.getAttribute("width"),height:t.getAttribute("height")}),i},text:function(t,e){var i=t.getAttribute("x")||0,n=t.getAttribute("y")||0,o=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0;this._textX=parseFloat(i)+parseFloat(o),this._textY=parseFloat(n)+parseFloat(a);var r=new Ii;return ld(e,r),cd(t,r,this._defs),r},tspan:function(t,e){var i=t.getAttribute("x"),n=t.getAttribute("y");null!=i&&(this._textX=parseFloat(i)),null!=n&&(this._textY=parseFloat(n));var o=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0,r=new Ii;return ld(e,r),cd(t,r,this._defs),this._textX+=o,this._textY+=a,r},path:function(t,e){var i=Gr(t.getAttribute("d")||"");return ld(e,i),cd(t,i,this._defs),i}},sd={lineargradient:function(t){var e=parseInt(t.getAttribute("x1")||0,10),i=parseInt(t.getAttribute("y1")||0,10),n=parseInt(t.getAttribute("x2")||10,10),o=parseInt(t.getAttribute("y2")||0,10),a=new cs(e,i,n,o);return function(t,e){var i=t.firstChild;for(;i;){if(1===i.nodeType){var n=i.getAttribute("offset");n=0<n.indexOf("%")?parseInt(n,10)/100:n?parseFloat(n):0;var o=i.getAttribute("stop-color")||"#000000";e.addColorStop(n,o)}i=i.nextSibling}}(t,a),a},radialgradient:function(t){}};function ld(t,e){t&&t.__inheritedStyle&&(e.__inheritedStyle||(e.__inheritedStyle={}),C(e.__inheritedStyle,t.__inheritedStyle))}function ud(t){for(var e=j(t).split(nd),i=[],n=0;n<e.length;n+=2){var o=parseFloat(e[n]),a=parseFloat(e[n+1]);i.push([o,a])}return i}var hd={fill:"fill",stroke:"stroke","stroke-width":"lineWidth",opacity:"opacity","fill-opacity":"fillOpacity","stroke-opacity":"strokeOpacity","stroke-dasharray":"lineDash","stroke-dashoffset":"lineDashOffset","stroke-linecap":"lineCap","stroke-linejoin":"lineJoin","stroke-miterlimit":"miterLimit","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","text-align":"textAlign","alignment-baseline":"textBaseline"};function cd(t,e,i,n){var o=e.__inheritedStyle||{},a="text"===e.type;if(1===t.nodeType&&(function(t,e){var i=t.getAttribute("transform");if(i){i=i.replace(/,/g," ");var n=null,o=[];i.replace(pd,function(t,e,i){o.push(e,i)});for(var a=o.length-1;0<a;a-=2){var r=o[a],s=o[a-1];switch(n=n||ee(),s){case"translate":r=j(r).split(nd),ae(n,n,[parseFloat(r[0]),parseFloat(r[1]||0)]);break;case"scale":r=j(r).split(nd),se(n,n,[parseFloat(r[0]),parseFloat(r[1]||r[0])]);break;case"rotate":r=j(r).split(nd),re(n,n,parseFloat(r[0]));break;case"skew":r=j(r).split(nd),console.warn("Skew transform is not supported yet");break;case"matrix":r=j(r).split(nd);n[0]=parseFloat(r[0]),n[1]=parseFloat(r[1]),n[2]=parseFloat(r[2]),n[3]=parseFloat(r[3]),n[4]=parseFloat(r[4]),n[5]=parseFloat(r[5])}}e.setLocalTransform(n)}}(t,e),L(o,function(t){var e=t.getAttribute("style"),i={};if(!e)return i;var n,o={};gd.lastIndex=0;for(;null!=(n=gd.exec(e));)o[n[1]]=n[2];for(var a in hd)hd.hasOwnProperty(a)&&null!=o[a]&&(i[hd[a]]=o[a]);return i}(t)),!n))for(var r in hd)if(hd.hasOwnProperty(r)){var s=t.getAttribute(r);null!=s&&(o[hd[r]]=s)}var l=a?"textFill":"fill",u=a?"textStroke":"stroke";e.style=e.style||new Fi;var h=e.style;null!=o.fill&&h.set(l,fd(o.fill,i)),null!=o.stroke&&h.set(u,fd(o.stroke,i)),E(["lineWidth","opacity","fillOpacity","strokeOpacity","miterLimit","fontSize"],function(t){var e="lineWidth"===t&&a?"textStrokeWidth":t;null!=o[t]&&h.set(e,parseFloat(o[t]))}),o.textBaseline&&"auto"!==o.textBaseline||(o.textBaseline="alphabetic"),"alphabetic"===o.textBaseline&&(o.textBaseline="bottom"),"start"===o.textAlign&&(o.textAlign="left"),"end"===o.textAlign&&(o.textAlign="right"),E(["lineDashOffset","lineCap","lineJoin","fontWeight","fontFamily","fontStyle","textAlign","textBaseline"],function(t){null!=o[t]&&h.set(t,o[t])}),o.lineDash&&(e.style.lineDash=j(o.lineDash).split(nd)),h[u]&&"none"!==h[u]&&(e[u]=!0),e.__inheritedStyle=o}var dd=/url\(\s*#(.*?)\)/;function fd(t,e){var i=e&&t&&t.match(dd);return i?e[j(i[1])]:t}var pd=/(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;var gd=/([^\s:;]+)\s*:\s*([^:;]+)/g;function md(t,e,i){var n=e/t.width,o=i/t.height,a=Math.min(n,o);return{scale:[a,a],position:[-(t.x+t.width/2)*a+e/2,-(t.y+t.height/2)*a+i/2]}}var vd=Q(),yd={registerMap:function(t,e,i){var n;return E(n=k(e)?e:e.svg?[{type:"svg",source:e.svg,specialAreas:e.specialAreas}]:(e.geoJson&&!e.features&&(i=e.specialAreas,e=e.geoJson),[{type:"geoJSON",source:e,specialAreas:i}]),function(t){var e=t.type;"geoJson"===e&&(e=t.type="geoJSON"),(0,xd[e])(t)}),vd.set(t,n)},retrieveMap:function(t){return vd.get(t)}},xd={geoJSON:function(t){var e=t.source;t.geoJSON=z(e)?"undefined"!=typeof JSON&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")():e},svg:function(t){t.svgXML=od(t.source)}},_d=Y,wd=E,bd=O,Sd=R,Md=Tu.parseClassType,Id={PROCESSOR:{FILTER:1e3,SERIES_FILTER:800,STATISTIC:5e3},VISUAL:{LAYOUT:1e3,PROGRESSIVE_LAYOUT:1100,GLOBAL:2e3,CHART:3e3,POST_CHART_LAYOUT:3500,COMPONENT:4e3,BRUSH:5e3}},Td="__flagInMainProcess",Ad="__optionUpdated",Dd=/^[a-zA-Z0-9_]+$/;function Cd(n,o){return function(t,e,i){!o&&this._disposed||(t=t&&t.toLowerCase(),Ct.prototype[n].call(this,t,e,i))}}function Ld(){Ct.call(this)}function kd(t,e,i){i=i||{},"string"==typeof e&&(e=ef[e]),this.id,this.group,this._dom=t;var n=this._zr=Ao(t,{renderer:i.renderer||"canvas",devicePixelRatio:i.devicePixelRatio,width:i.width,height:i.height});this._throttledZrFlush=Ic(A(n.flush,n),17),(e=D(e))&&Ih(e,!0),this._theme=e,this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._coordSysMgr=new nh;var o=this._api=function(i){var t=i._coordSysMgr;return L(new eh(i),{getCoordinateSystems:A(t.getCoordinateSystems,t),getComponentByElement:function(t){for(;t;){var e=t.__ecComponentInfo;if(null!=e)return i._model.getComponent(e.mainType,e.index);t=t.parent}}})}(this);function a(t,e){return t.__prio-e.__prio}Ni(tf,a),Ni($d,a),this._scheduler=new Pc(this,o,$d,tf),Ct.call(this,this._ecEventProcessor=new jd),this._messageCenter=new Ld,this._initEvents(),this.resize=A(this.resize,this),this._pendingActions=[],n.animation.on("frame",this._onframe,this),function(t,e){t.on("rendered",function(){e.trigger("rendered"),!t.animation.isFinished()||e[Ad]||e._scheduler.unfinished||e._pendingActions.length||e.trigger("finished")})}(n,this),K(this)}Ld.prototype.on=Cd("on",!0),Ld.prototype.off=Cd("off",!0),Ld.prototype.one=Cd("one",!0),b(Ld,Ct);var Pd=kd.prototype;function Nd(t,e,i){if(!this._disposed){var n,o=this._model,a=this._coordSysMgr.getCoordinateSystems();e=Xo(o,e);for(var r=0;r<a.length;r++){var s=a[r];if(s[t]&&null!=(n=s[t](o,e,i)))return n}}}Pd._onframe=function(){if(!this._disposed){var t=this._scheduler;if(this[Ad]){var e=this[Ad].silent;this[Td]=!0,Ed(this),Od.update.call(this),this[Td]=!1,this[Ad]=!1,Vd.call(this,e),Gd.call(this,e)}else if(t.unfinished){var i=1,n=this._model,o=this._api;t.unfinished=!1;do{var a=+new Date;t.performSeriesTasks(n),t.performDataProcessorTasks(n),Rd(this,n),t.performVisualTasks(n),Zd(this,this._model,o,"remain"),i-=+new Date-a}while(0<i&&t.unfinished);t.unfinished||this._zr.flush()}}},Pd.getDom=function(){return this._dom},Pd.getZr=function(){return this._zr},Pd.setOption=function(t,e,i){if(!this._disposed){var n;if(Sd(e)&&(i=e.lazyUpdate,n=e.silent,e=e.notMerge),this[Td]=!0,!this._model||e){var o=new uh(this._api),a=this._theme,r=this._model=new $u;r.scheduler=this._scheduler,r.init(null,null,a,o)}this._model.setOption(t,Jd),i?(this[Ad]={silent:n},this[Td]=!1):(Ed(this),Od.update.call(this),this._zr.flush(),this[Ad]=!1,this[Td]=!1,Vd.call(this,n),Gd.call(this,n))}},Pd.setTheme=function(){console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")},Pd.getModel=function(){return this._model},Pd.getOption=function(){return this._model&&this._model.getOption()},Pd.getWidth=function(){return this._zr.getWidth()},Pd.getHeight=function(){return this._zr.getHeight()},Pd.getDevicePixelRatio=function(){return this._zr.painter.dpr||window.devicePixelRatio||1},Pd.getRenderedCanvas=function(t){if(v.canvasSupported)return(t=t||{}).pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor"),this._zr.painter.getRenderedCanvas(t)},Pd.getSvgDataUrl=function(){if(v.svgSupported){var t=this._zr;return E(t.storage.getDisplayList(),function(t){t.stopAnimation(!0)}),t.painter.pathToDataUrl()}},Pd.getDataURL=function(t){if(!this._disposed){var e=(t=t||{}).excludeComponents,i=this._model,n=[],o=this;wd(e,function(t){i.eachComponent({mainType:t},function(t){var e=o._componentsMap[t.__viewId];e.group.ignore||(n.push(e),e.group.ignore=!0)})});var a="svg"===this._zr.painter.getType()?this.getSvgDataUrl():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return wd(n,function(t){t.group.ignore=!1}),a}},Pd.getConnectedDataURL=function(o){if(!this._disposed&&v.canvasSupported){var a=this.group,r=Math.min,s=Math.max;if(af[a]){var l=1/0,u=1/0,h=-1/0,c=-1/0,d=[],i=o&&o.pixelRatio||1;E(of,function(t,e){if(t.group===a){var i=t.getRenderedCanvas(D(o)),n=t.getDom().getBoundingClientRect();l=r(n.left,l),u=r(n.top,u),h=s(n.right,h),c=s(n.bottom,c),d.push({dom:i,left:n.left,top:n.top})}});var t=(h*=i)-(l*=i),e=(c*=i)-(u*=i),n=g();n.width=t,n.height=e;var f=Ao(n);return o.connectedBackgroundColor&&f.add(new is({shape:{x:0,y:0,width:t,height:e},style:{fill:o.connectedBackgroundColor}})),wd(d,function(t){var e=new qn({style:{x:t.left*i-l,y:t.top*i-u,image:t.dom}});f.add(e)}),f.refreshImmediately(),n.toDataURL("image/"+(o&&o.type||"png"))}return this.getDataURL(o)}},Pd.convertToPixel=T(Nd,"convertToPixel"),Pd.convertFromPixel=T(Nd,"convertFromPixel"),Pd.containPixel=function(t,o){var a;if(!this._disposed)return E(t=Xo(this._model,t),function(t,n){0<=n.indexOf("Models")&&E(t,function(t){var e=t.coordinateSystem;if(e&&e.containPoint)a|=!!e.containPoint(o);else if("seriesModels"===n){var i=this._chartsMap[t.__viewId];i&&i.containPoint&&(a|=i.containPoint(o,t))}},this)},this),!!a},Pd.getVisual=function(t,e){var i=(t=Xo(this._model,t,{defaultMainType:"series"})).seriesModel.getData(),n=t.hasOwnProperty("dataIndexInside")?t.dataIndexInside:t.hasOwnProperty("dataIndex")?i.indexOfRawIndex(t.dataIndex):null;return null!=n?i.getItemVisual(n,e):i.getVisual(e)},Pd.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId]},Pd.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId]};var Od={prepareAndUpdate:function(t){Ed(this),Od.update.call(this,t)},update:function(t){var e=this._model,i=this._api,n=this._zr,o=this._coordSysMgr,a=this._scheduler;if(e){a.restoreData(e,t),a.performSeriesTasks(e),o.create(e,i),a.performDataProcessorTasks(e,t),Rd(this,e),o.update(e,i),Wd(e),a.performVisualTasks(e,t),Hd(this,e,i,t);var r=e.get("backgroundColor")||"transparent";if(v.canvasSupported)n.setBackgroundColor(r);else{var s=Re(r);r=Ye(s,"rgb"),0===s[3]&&(r="transparent")}Ud(e,i)}},updateTransform:function(o){var a=this._model,r=this,s=this._api;if(a){var l=[];a.eachComponent(function(t,e){var i=r.getViewOfComponentModel(e);if(i&&i.__alive)if(i.updateTransform){var n=i.updateTransform(e,a,s,o);n&&n.update&&l.push(i)}else l.push(i)});var n=Q();a.eachSeries(function(t){var e=r._chartsMap[t.__viewId];if(e.updateTransform){var i=e.updateTransform(t,a,s,o);i&&i.update&&n.set(t.uid,1)}else n.set(t.uid,1)}),Wd(a),this._scheduler.performVisualTasks(a,o,{setDirty:!0,dirtyMap:n}),Zd(r,a,s,o,n),Ud(a,this._api)}},updateView:function(t){var e=this._model;e&&(gc.markUpdateMethod(t,"updateView"),Wd(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0}),Hd(this,this._model,this._api,t),Ud(e,this._api))},updateVisual:function(t){Od.update.call(this,t)},updateLayout:function(t){Od.update.call(this,t)}};function Ed(t){var e=t._model,i=t._scheduler;i.restorePipelines(e),i.prepareStageTasks(),Fd(t,"component",e,i),Fd(t,"chart",e,i),i.plan()}function zd(e,i,n,o,t){var a=e._model;if(o){var r={};r[o+"Id"]=n[o+"Id"],r[o+"Index"]=n[o+"Index"],r[o+"Name"]=n[o+"Name"];var s={mainType:o,query:r};t&&(s.subType=t);var l=n.excludeSeriesId;null!=l&&(l=Q(Eo(l))),a&&a.eachComponent(s,function(t){l&&null!=l.get(t.id)||u(e["series"===o?"_chartsMap":"_componentsMap"][t.__viewId])},e)}else wd(e._componentsViews.concat(e._chartsViews),u);function u(t){t&&t.__alive&&t[i]&&t[i](t.__model,a,e._api,n)}}function Rd(t,e){var i=t._chartsMap,n=t._scheduler;e.eachSeries(function(t){n.updateStreamModes(t,i[t.__viewId])})}function Bd(e,t){var i=e.type,n=e.escapeConnect,o=qd[i],a=o.actionInfo,r=(a.update||"update").split(":"),s=r.pop();r=null!=r[0]&&Md(r[0]),this[Td]=!0;var l=[e],u=!1;e.batch&&(u=!0,l=N(e.batch,function(t){return(t=C(L({},t),e)).batch=null,t}));var h,c=[],d="highlight"===i||"downplay"===i;wd(l,function(t){(h=(h=o.action(t,this._model,this._api))||L({},t)).type=a.event||h.type,c.push(h),d?zd(this,s,t,"series"):r&&zd(this,s,t,r.main,r.sub)},this),"none"===s||d||r||(this[Ad]?(Ed(this),Od.update.call(this,e),this[Ad]=!1):Od[s].call(this,e)),h=u?{type:a.event||i,escapeConnect:n,batch:c}:c[0],this[Td]=!1,t||this._messageCenter.trigger(h.type,h)}function Vd(t){for(var e=this._pendingActions;e.length;){var i=e.shift();Bd.call(this,i,t)}}function Gd(t){t||this.trigger("updated")}function Fd(t,e,o,a){for(var r="component"===e,s=r?t._componentsViews:t._chartsViews,l=r?t._componentsMap:t._chartsMap,u=t._zr,h=t._api,i=0;i<s.length;i++)s[i].__alive=!1;function n(t){var e="_ec_"+t.id+"_"+t.type,i=l[e];if(!i){var n=Md(t.type);(i=new(r?hc.getClass(n.main,n.sub):gc.getClass(n.sub))).init(o,h),l[e]=i,s.push(i),u.add(i.group)}t.__viewId=i.__id=e,i.__alive=!0,i.__model=t,i.group.__ecComponentInfo={mainType:t.mainType,index:t.componentIndex},r||a.prepareView(i,t,o,h)}r?o.eachComponent(function(t,e){"series"!==t&&n(e)}):o.eachSeries(n);for(i=0;i<s.length;){var c=s[i];c.__alive?i++:(r||c.renderTask.dispose(),u.remove(c.group),c.dispose(o,h),s.splice(i,1),delete l[c.__id],c.__id=c.group.__ecComponentInfo=null)}}function Wd(t){t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette()})}function Hd(t,e,i,n){!function(t,i,n,o,e){wd(e||t._componentsViews,function(t){var e=t.__model;t.render(e,i,n,o),Yd(e,t)})}(t,e,i,n),wd(t._chartsViews,function(t){t.__alive=!1}),Zd(t,e,i,n),wd(t._chartsViews,function(t){t.__alive||t.remove(e,i)})}function Zd(n,t,e,o,a){var r,s=n._scheduler;t.eachSeries(function(t){var e=n._chartsMap[t.__viewId];e.__alive=!0;var i=e.renderTask;s.updatePayload(i,o),a&&a.get(t.uid)&&i.dirty(),r|=i.perform(s.getPerformArgs(i)),e.group.silent=!!t.get("silent"),Yd(t,e),function(t,e){var i=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||t.style.blend!==i&&t.setStyle("blend",i),t.eachPendingDisplayable&&t.eachPendingDisplayable(function(t){t.setStyle("blend",i)})})}(t,e)}),s.unfinished|=r,function(i,t){var e=i._zr.storage,n=0;e.traverse(function(t){n++}),n>t.get("hoverLayerThreshold")&&!v.node&&t.eachSeries(function(t){if(!t.preventUsingHoverLayer){var e=i._chartsMap[t.__viewId];e.__alive&&e.group.traverse(function(t){t.useHoverLayer=!0})}})}(n,t),Lc(n._zr.dom,t)}function Ud(e,i){wd(Qd,function(t){t(e,i)})}Pd.resize=function(t){if(!this._disposed){this._zr.resize(t);var e=this._model;if(this._loadingFX&&this._loadingFX.resize(),e){var i=e.resetOption("media"),n=t&&t.silent;this[Td]=!0,i&&Ed(this),Od.update.call(this),this[Td]=!1,Vd.call(this,n),Gd.call(this,n)}}},Pd.showLoading=function(t,e){if(!this._disposed&&(Sd(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),nf[t])){var i=nf[t](this._api,e),n=this._zr;this._loadingFX=i,n.add(i)}},Pd.hideLoading=function(){this._disposed||(this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null)},Pd.makeActionFromEvent=function(t){var e=L({},t);return e.type=Kd[t.type],e},Pd.dispatchAction=function(t,e){this._disposed||(Sd(e)||(e={silent:!!e}),qd[t.type]&&this._model&&(this[Td]?this._pendingActions.push(t):(Bd.call(this,t,e.silent),e.flush?this._zr.flush(!0):!1!==e.flush&&v.browser.weChat&&this._throttledZrFlush(),Vd.call(this,e.silent),Gd.call(this,e.silent))))},Pd.appendData=function(t){if(!this._disposed){var e=t.seriesIndex;this.getModel().getSeriesByIndex(e).appendData(t),this._scheduler.unfinished=!0}},Pd.on=Cd("on",!1),Pd.off=Cd("off",!1),Pd.one=Cd("one",!1);var Xd=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"];function Yd(t,e){var i=t.get("z"),n=t.get("zlevel");e.group.traverse(function(t){"group"!==t.type&&(null!=i&&(t.z=i),null!=n&&(t.zlevel=n))})}function jd(){this.eventInfo}Pd._initEvents=function(){wd(Xd,function(u){function t(t){var e,i=this.getModel(),n=t.target;if("globalout"===u)e={};else if(n&&null!=n.dataIndex){var o=n.dataModel||i.getSeriesByIndex(n.seriesIndex);e=o&&o.getDataParams(n.dataIndex,n.dataType,n)||{}}else n&&n.eventData&&(e=L({},n.eventData));if(e){var a=e.componentType,r=e.componentIndex;"markLine"!==a&&"markPoint"!==a&&"markArea"!==a||(a="series",r=e.seriesIndex);var s=a&&null!=r&&i.getComponent(a,r),l=s&&this["series"===s.mainType?"_chartsMap":"_componentsMap"][s.__viewId];e.event=t,e.type=u,this._ecEventProcessor.eventInfo={targetEl:n,packedEvent:e,model:s,view:l},this.trigger(u,e)}}t.zrEventfulCallAtLast=!0,this._zr.on(u,t,this)},this),wd(Kd,function(t,e){this._messageCenter.on(e,function(t){this.trigger(e,t)},this)},this)},Pd.isDisposed=function(){return this._disposed},Pd.clear=function(){this._disposed||this.setOption({series:[]},!0)},Pd.dispose=function(){if(!this._disposed){this._disposed=!0,jo(this.getDom(),lf,"");var e=this._api,i=this._model;wd(this._componentsViews,function(t){t.dispose(i,e)}),wd(this._chartsViews,function(t){t.dispose(i,e)}),this._zr.dispose(),delete of[this.id]}},b(kd,Ct),jd.prototype={constructor:jd,normalizeQuery:function(t){var s={},l={},u={};if(z(t)){var e=Md(t);s.mainType=e.main||null,s.subType=e.sub||null}else{var h=["Index","Name","Id"],c={name:1,dataIndex:1,dataType:1};E(t,function(t,e){for(var i=!1,n=0;n<h.length;n++){var o=h[n],a=e.lastIndexOf(o);if(0<a&&a===e.length-o.length){var r=e.slice(0,a);"data"!==r&&(s.mainType=r,s[o.toLowerCase()]=t,i=!0)}}c.hasOwnProperty(e)&&(l[e]=t,i=!0),i||(u[e]=t)})}return{cptQuery:s,dataQuery:l,otherQuery:u}},filter:function(t,e,i){var n=this.eventInfo;if(!n)return!0;var o=n.targetEl,a=n.packedEvent,r=n.model,s=n.view;if(!r||!s)return!0;var l=e.cptQuery,u=e.dataQuery;return h(l,r,"mainType")&&h(l,r,"subType")&&h(l,r,"index","componentIndex")&&h(l,r,"name")&&h(l,r,"id")&&h(u,a,"name")&&h(u,a,"dataIndex")&&h(u,a,"dataType")&&(!s.filterForExposedEvent||s.filterForExposedEvent(t,e.otherQuery,o,a));function h(t,e,i,n){return null==t[i]||e[n||i]===t[i]}},afterTrigger:function(){this.eventInfo=null}};var qd={},Kd={},$d=[],Jd=[],Qd=[],tf=[],ef={},nf={},of={},af={},rf=new Date-0,sf=new Date-0,lf="_echarts_instance_";function uf(t){af[t]=!1}var hf=uf;function cf(t){return of[function(t,e){return t.getAttribute?t.getAttribute(e):t[e]}(t,lf)]}function df(t,e){ef[t]=e}function ff(t){Jd.push(t)}function pf(t,e){xf($d,t,e,1e3)}function gf(t,e,i){"function"==typeof e&&(i=e,e="");var n=Sd(t)?t.type:[t,t={event:e}][0];t.event=(t.event||n).toLowerCase(),e=t.event,_d(Dd.test(n)&&Dd.test(e)),qd[n]||(qd[n]={action:i,actionInfo:t}),Kd[e]=n}function mf(t,e){nh.register(t,e)}function vf(t,e){xf(tf,t,e,1e3,"layout")}function yf(t,e){xf(tf,t,e,3e3,"visual")}function xf(t,e,i,n,o){(bd(e)||Sd(e))&&(i=e,e=n);var a=Pc.wrapStageHandler(i,o);return a.__prio=e,a.__raw=i,t.push(a),a}function _f(t,e){nf[t]=e}function wf(t){return Tu.extend(t)}function bf(t){return hc.extend(t)}function Sf(t){return ic.extend(t)}function Mf(t){return gc.extend(t)}yf(2e3,Dc),ff(Ih),pf(900,function(t){var a=Q();t.eachSeries(function(t){var e=t.get("stack");if(e){var i=a.get(e)||a.set(e,[]),n=t.getData(),o={stackResultDimension:n.getCalculationInfo("stackResultDimension"),stackedOverDimension:n.getCalculationInfo("stackedOverDimension"),stackedDimension:n.getCalculationInfo("stackedDimension"),stackedByDimension:n.getCalculationInfo("stackedByDimension"),isStackedByIndex:n.getCalculationInfo("isStackedByIndex"),data:n,seriesModel:t};if(!o.stackedDimension||!o.isStackedByIndex&&!o.stackedByDimension)return;i.length&&n.setCalculationInfo("stackedOnSeries",i[i.length-1].seriesModel),i.push(o)}}),a.each(Th)}),_f("default",function(n,t){C(t=t||{},{text:"loading",color:"#c23531",textColor:"#000",maskColor:"rgba(255, 255, 255, 0.8)",zlevel:0});var o=new is({style:{fill:t.maskColor},zlevel:t.zlevel,z:1e4}),a=new us({shape:{startAngle:-kc/2,endAngle:-kc/2+.1,r:10},style:{stroke:t.color,lineCap:"round",lineWidth:5},zlevel:t.zlevel,z:10001}),r=new is({style:{fill:"none",text:t.text,textPosition:"right",textDistance:10,textFill:t.textColor},zlevel:t.zlevel,z:10001});a.animateShape(!0).when(1e3,{endAngle:3*kc/2}).start("circularInOut"),a.animateShape(!0).when(1e3,{startAngle:3*kc/2}).delay(300).start("circularInOut");var e=new Ii;return e.add(a),e.add(r),e.add(o),e.resize=function(){var t=n.getWidth()/2,e=n.getHeight()/2;a.setShape({cx:t,cy:e});var i=a.shape.r;r.setShape({x:t-i,y:e-i,width:2*i,height:2*i}),o.setShape({x:0,y:0,width:n.getWidth(),height:n.getHeight()})},e.resize(),e}),gf({type:"highlight",event:"highlight",update:"highlight"},et),gf({type:"downplay",event:"downplay",update:"downplay"},et),df("light",Jc),df("dark",ed);function If(t){return t}function Tf(t,e,i,n,o){this._old=t,this._new=e,this._oldKeyGetter=i||If,this._newKeyGetter=n||If,this.context=o}function Af(t,e,i,n,o){for(var a=0;a<t.length;a++){var r="_ec_"+o[n](t[a],a),s=e[r];null==s?(i.push(r),e[r]=a):(s.length||(e[r]=s=[s]),s.push(a))}}Tf.prototype={constructor:Tf,add:function(t){return this._add=t,this},update:function(t){return this._update=t,this},remove:function(t){return this._remove=t,this},execute:function(){var t=this._old,e=this._new,i={},n=[],o=[];for(Af(t,{},n,"_oldKeyGetter",this),Af(e,i,o,"_newKeyGetter",this),a=0;a<t.length;a++){if(null!=(s=i[r=n[a]]))(u=s.length)?(1===u&&(i[r]=null),s=s.shift()):i[r]=null,this._update&&this._update(s,a);else this._remove&&this._remove(a)}for(var a=0;a<o.length;a++){var r=o[a];if(i.hasOwnProperty(r)){var s;if(null==(s=i[r]))continue;if(s.length)for(var l=0,u=s.length;l<u;l++)this._add&&this._add(s[l]);else this._add&&this._add(s)}}}};var Df=Q(["tooltip","label","itemName","itemId","seriesName"]);function Cf(t,e){return t.hasOwnProperty(e)||(t[e]=[]),t[e]}function Lf(t){return"category"===t?"ordinal":"time"===t?"time":"float"}function kf(t){null!=t&&L(this,t),this.otherDims={}}var Pf=R,Nf="undefined",Of={float:typeof Float64Array==Nf?Array:Float64Array,int:typeof Int32Array==Nf?Array:Int32Array,ordinal:Array,number:Array,time:Array},Ef=typeof Uint32Array==Nf?Array:Uint32Array,zf=typeof Int32Array==Nf?Array:Int32Array,Rf=typeof Uint16Array==Nf?Array:Uint16Array;function Bf(t){return 65535<t._rawCount?Ef:Rf}var Vf=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_rawData","_chunkSize","_chunkCount","_dimValueGetter","_count","_rawCount","_nameDimIdx","_idDimIdx"],Gf=["_extent","_approximateExtent","_rawExtent"];function Ff(e,i){E(Vf.concat(i.__wrappedMethods||[]),function(t){i.hasOwnProperty(t)&&(e[t]=i[t])}),e.__wrappedMethods=i.__wrappedMethods,E(Gf,function(t){e[t]=D(i[t])}),e._calculationInfo=L(i._calculationInfo)}var Wf=function(t,e){t=t||["x","y"];for(var i={},n=[],o={},a=0;a<t.length;a++){var r=t[a];z(r)?r=new kf({name:r}):r instanceof kf||(r=new kf(r));var s=r.name;r.type=r.type||"float",r.coordDim||(r.coordDim=s,r.coordDimIndex=0),r.otherDims=r.otherDims||{},n.push(s),(i[s]=r).index=a,r.createInvertedIndices&&(o[s]=[])}this.dimensions=n,this._dimensionInfos=i,this.hostModel=e,this.dataType,this._indices=null,this._count=0,this._rawCount=0,this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this._visual={},this._layout={},this._itemVisuals=[],this.hasItemVisual={},this._itemLayouts=[],this._graphicEls=[],this._chunkSize=1e5,this._chunkCount=0,this._rawData,this._rawExtent={},this._extent={},this._approximateExtent={},this._dimensionsSummary=function(n){var t={},a=t.encode={},r=Q(),s=[],l=[],u=t.userOutput={dimensionNames:n.dimensions.slice(),encode:{}};E(n.dimensions,function(t){var o=n.getDimensionInfo(t),e=o.coordDim;if(e){var i=o.coordDimIndex;Cf(a,e)[i]=t,o.isExtraCoord||(r.set(e,1),function(t){return!("ordinal"===t||"time"===t)}(o.type)&&(s[0]=t),Cf(u.encode,e)[i]=o.index),o.defaultTooltip&&l.push(t)}Df.each(function(t,e){var i=Cf(a,e),n=o.otherDims[e];null!=n&&!1!==n&&(i[n]=o.name)})});var o=[],h={};r.each(function(t,e){var i=a[e];h[e]=i[0],o=o.concat(i)}),t.dataDimsOnCoord=o,t.encodeFirstDimNotExtra=h;var e=a.label;e&&e.length&&(s=e.slice());var i=a.tooltip;return i&&i.length?l=i.slice():l.length||(l=s.slice()),a.defaultedLabel=s,a.defaultedTooltip=l,t}(this),this._invertedIndicesMap=o,this._calculationInfo={},this.userOutput=this._dimensionsSummary.userOutput},Hf=Wf.prototype;function Zf(t,e,i,n,o){var a=Of[e.type],r=n-1,s=e.name,l=t[s][r];if(l&&l.length<i){for(var u=new a(Math.min(o-r*i,i)),h=0;h<l.length;h++)u[h]=l[h];t[s][r]=u}for(var c=n*i;c<o;c+=i)t[s].push(new a(Math.min(o-c,i)))}function Uf(o){var a=o._invertedIndicesMap;E(a,function(t,e){var i=o._dimensionInfos[e].ordinalMeta;if(i){t=a[e]=new zf(i.categories.length);for(var n=0;n<t.length;n++)t[n]=-1;for(n=0;n<o._count;n++)t[o.get(e,n)]=n}})}function Xf(t,e,i){var n;if(null!=e){var o=t._chunkSize,a=Math.floor(i/o),r=i%o,s=t.dimensions[e],l=t._storage[s][a];if(l){n=l[r];var u=t._dimensionInfos[s].ordinalMeta;u&&u.categories.length&&(n=u.categories[n])}}return n}function Yf(t){return t}function jf(t){return t<this._count&&0<=t?this._indices[t]:-1}function qf(t,e){var i=t._idList[e];return null==i&&(i=Xf(t,t._idDimIdx,e)),null==i&&(i="e\0\0"+e),i}function Kf(t){return k(t)||(t=[t]),t}function $f(t,e){var i=t.dimensions,n=new Wf(N(i,t.getDimensionInfo,t),t.hostModel);Ff(n,t);for(var o=n._storage={},a=t._storage,r=0;r<i.length;r++){var s=i[r];a[s]&&(0<=_(e,s)?(o[s]=Jf(a[s]),n._rawExtent[s]=Qf(),n._extent[s]=null):o[s]=a[s])}return n}function Jf(t){for(var e,i,n=new Array(t.length),o=0;o<t.length;o++)n[o]=(e=t[o],i=void 0,(i=e.constructor)===Array?e.slice():new i(e));return n}function Qf(){return[1/0,-1/0]}Hf.type="list",Hf.hasItemOption=!0,Hf.getDimension=function(t){return"number"!=typeof t&&(isNaN(t)||this._dimensionInfos.hasOwnProperty(t))||(t=this.dimensions[t]),t},Hf.getDimensionInfo=function(t){return this._dimensionInfos[this.getDimension(t)]},Hf.getDimensionsOnCoord=function(){return this._dimensionsSummary.dataDimsOnCoord.slice()},Hf.mapDimension=function(t,e){var i=this._dimensionsSummary;if(null==e)return i.encodeFirstDimNotExtra[t];var n=i.encode[t];return!0===e?(n||[]).slice():n&&n[e]},Hf.initData=function(t,e,i){(Gu.isInstance(t)||P(t))&&(t=new Ah(t,this.dimensions.length)),this._rawData=t,this._storage={},this._indices=null,this._nameList=e||[],this._idList=[],this._nameRepeatCount={},i||(this.hasItemOption=!1),this.defaultDimValueGetter=Eh[this._rawData.getSource().sourceFormat],this._dimValueGetter=i=i||this.defaultDimValueGetter,this._dimValueGetterArrayRows=Eh.arrayRows,this._rawExtent={},this._initDataFromProvider(0,t.count()),t.pure&&(this.hasItemOption=!1)},Hf.getProvider=function(){return this._rawData},Hf.appendData=function(t){var e=this._rawData,i=this.count();e.appendData(t);var n=e.count();e.persistent||(n+=i),this._initDataFromProvider(i,n)},Hf.appendValues=function(t,e){for(var i=this._chunkSize,n=this._storage,o=this.dimensions,a=o.length,r=this._rawExtent,s=this.count(),l=s+Math.max(t.length,e?e.length:0),u=this._chunkCount,h=0;h<a;h++){r[v=o[h]]||(r[v]=Qf()),n[v]||(n[v]=[]),Zf(n,this._dimensionInfos[v],i,u,l),this._chunkCount=n[v].length}for(var c=new Array(a),d=s;d<l;d++){for(var f=d-s,p=Math.floor(d/i),g=d%i,m=0;m<a;m++){var v=o[m],y=this._dimValueGetterArrayRows(t[f]||c,v,f,m);n[v][p][g]=y;var x=r[v];y<x[0]&&(x[0]=y),y>x[1]&&(x[1]=y)}e&&(this._nameList[d]=e[f])}this._rawCount=this._count=l,this._extent={},Uf(this)},Hf._initDataFromProvider=function(t,e){if(!(e<=t)){for(var i,n=this._chunkSize,o=this._rawData,a=this._storage,r=this.dimensions,s=r.length,l=this._dimensionInfos,u=this._nameList,h=this._idList,c=this._rawExtent,d=this._nameRepeatCount={},f=this._chunkCount,p=0;p<s;p++){c[w=r[p]]||(c[w]=Qf());var g=l[w];0===g.otherDims.itemName&&(i=this._nameDimIdx=p),0===g.otherDims.itemId&&(this._idDimIdx=p),a[w]||(a[w]=[]),Zf(a,g,n,f,e),this._chunkCount=a[w].length}for(var m=new Array(s),v=t;v<e;v++){m=o.getItem(v,m);for(var y=Math.floor(v/n),x=v%n,_=0;_<s;_++){var w,b=a[w=r[_]][y],S=this._dimValueGetter(m,w,v,_);b[x]=S;var M=c[w];S<M[0]&&(M[0]=S),S>M[1]&&(M[1]=S)}if(!o.pure){var I=u[v];if(m&&null==I)if(null!=m.name)u[v]=I=m.name;else if(null!=i){var T=r[i],A=a[T][y];if(A){I=A[x];var D=l[T].ordinalMeta;D&&D.categories.length&&(I=D.categories[I])}}var C=null==m?null:m.id;null==C&&null!=I&&(d[I]=d[I]||0,0<d[C=I]&&(C+="__ec__"+d[I]),d[I]++),null!=C&&(h[v]=C)}}!o.persistent&&o.clean&&o.clean(),this._rawCount=this._count=e,this._extent={},Uf(this)}},Hf.count=function(){return this._count},Hf.getIndices=function(){var t=this._indices;if(t){var e=t.constructor,i=this._count;if(e===Array){o=new e(i);for(var n=0;n<i;n++)o[n]=t[n]}else o=new e(t.buffer,0,i)}else{var o=new(e=Bf(this))(this.count());for(n=0;n<o.length;n++)o[n]=n}return o},Hf.get=function(t,e){if(!(0<=e&&e<this._count))return NaN;var i=this._storage;if(!i[t])return NaN;e=this.getRawIndex(e);var n=Math.floor(e/this._chunkSize),o=e%this._chunkSize;return i[t][n][o]},Hf.getByRawIndex=function(t,e){if(!(0<=e&&e<this._rawCount))return NaN;var i=this._storage[t];if(!i)return NaN;var n=Math.floor(e/this._chunkSize),o=e%this._chunkSize;return i[n][o]},Hf._getFast=function(t,e){var i=Math.floor(e/this._chunkSize),n=e%this._chunkSize;return this._storage[t][i][n]},Hf.getValues=function(t,e){var i=[];k(t)||(e=t,t=this.dimensions);for(var n=0,o=t.length;n<o;n++)i.push(this.get(t[n],e));return i},Hf.hasValue=function(t){for(var e=this._dimensionsSummary.dataDimsOnCoord,i=0,n=e.length;i<n;i++)if(isNaN(this.get(e[i],t)))return!1;return!0},Hf.getDataExtent=function(t){t=this.getDimension(t);var e=this._storage[t],i=Qf();if(!e)return i;var n,o=this.count();if(!this._indices)return this._rawExtent[t].slice();if(n=this._extent[t])return n.slice();for(var a=(n=i)[0],r=n[1],s=0;s<o;s++){var l=this._getFast(t,this.getRawIndex(s));l<a&&(a=l),r<l&&(r=l)}return n=[a,r],this._extent[t]=n},Hf.getApproximateExtent=function(t){return t=this.getDimension(t),this._approximateExtent[t]||this.getDataExtent(t)},Hf.setApproximateExtent=function(t,e){e=this.getDimension(e),this._approximateExtent[e]=t.slice()},Hf.getCalculationInfo=function(t){return this._calculationInfo[t]},Hf.setCalculationInfo=function(t,e){Pf(t)?L(this._calculationInfo,t):this._calculationInfo[t]=e},Hf.getSum=function(t){var e=0;if(this._storage[t])for(var i=0,n=this.count();i<n;i++){var o=this.get(t,i);isNaN(o)||(e+=o)}return e},Hf.getMedian=function(t){var i=[];this.each(t,function(t,e){isNaN(t)||i.push(t)});var e=[].concat(i).sort(function(t,e){return t-e}),n=this.count();return 0===n?0:n%2==1?e[(n-1)/2]:(e[n/2]+e[n/2-1])/2},Hf.rawIndexOf=function(t,e){var i=(t&&this._invertedIndicesMap[t])[e];return null==i||isNaN(i)?-1:i},Hf.indexOfName=function(t){for(var e=0,i=this.count();e<i;e++)if(this.getName(e)===t)return e;return-1},Hf.indexOfRawIndex=function(t){if(t>=this._rawCount||t<0)return-1;if(!this._indices)return t;var e=this._indices,i=e[t];if(null!=i&&i<this._count&&i===t)return t;for(var n=0,o=this._count-1;n<=o;){var a=(n+o)/2|0;if(e[a]<t)n=1+a;else{if(!(e[a]>t))return a;o=a-1}}return-1},Hf.indicesOfNearest=function(t,e,i){var n=[];if(!this._storage[t])return n;null==i&&(i=1/0);for(var o=1/0,a=-1,r=0,s=0,l=this.count();s<l;s++){var u=e-this.get(t,s),h=Math.abs(u);h<=i&&((h<o||h===o&&0<=u&&a<0)&&(o=h,a=u,r=0),u===a&&(n[r++]=s))}return n.length=r,n},Hf.getRawIndex=Yf,Hf.getRawDataItem=function(t){if(this._rawData.persistent)return this._rawData.getItem(this.getRawIndex(t));for(var e=[],i=0;i<this.dimensions.length;i++){var n=this.dimensions[i];e.push(this.get(n,t))}return e},Hf.getName=function(t){var e=this.getRawIndex(t);return this._nameList[e]||Xf(this,this._nameDimIdx,e)||""},Hf.getId=function(t){return qf(this,this.getRawIndex(t))},Hf.each=function(t,e,i,n){if(this._count){"function"==typeof t&&(n=i,i=e,e=t,t=[]),i=i||n||this;for(var o=(t=N(Kf(t),this.getDimension,this)).length,a=0;a<this.count();a++)switch(o){case 0:e.call(i,a);break;case 1:e.call(i,this.get(t[0],a),a);break;case 2:e.call(i,this.get(t[0],a),this.get(t[1],a),a);break;default:for(var r=0,s=[];r<o;r++)s[r]=this.get(t[r],a);s[r]=a,e.apply(i,s)}}},Hf.filterSelf=function(t,e,i,n){if(this._count){"function"==typeof t&&(n=i,i=e,e=t,t=[]),i=i||n||this,t=N(Kf(t),this.getDimension,this);for(var o=this.count(),a=new(Bf(this))(o),r=[],s=t.length,l=0,u=t[0],h=0;h<o;h++){var c,d=this.getRawIndex(h);if(0===s)c=e.call(i,h);else if(1===s){var f=this._getFast(u,d);c=e.call(i,f,h)}else{for(var p=0;p<s;p++)r[p]=this._getFast(u,d);r[p]=h,c=e.apply(i,r)}c&&(a[l++]=d)}return l<o&&(this._indices=a),this._count=l,this._extent={},this.getRawIndex=this._indices?jf:Yf,this}},Hf.selectRange=function(t){if(this._count){var e=[];for(var i in t)t.hasOwnProperty(i)&&e.push(i);var n=e.length;if(n){var o=this.count(),a=new(Bf(this))(o),r=0,s=e[0],l=t[s][0],u=t[s][1],h=!1;if(!this._indices){var c=0;if(1===n){for(var d=this._storage[e[0]],f=0;f<this._chunkCount;f++)for(var p=d[f],g=Math.min(this._count-f*this._chunkSize,this._chunkSize),m=0;m<g;m++){(l<=(w=p[m])&&w<=u||isNaN(w))&&(a[r++]=c),c++}h=!0}else if(2===n){d=this._storage[s];var v=this._storage[e[1]],y=t[e[1]][0],x=t[e[1]][1];for(f=0;f<this._chunkCount;f++){p=d[f];var _=v[f];for(g=Math.min(this._count-f*this._chunkSize,this._chunkSize),m=0;m<g;m++){var w=p[m],b=_[m];(l<=w&&w<=u||isNaN(w))&&(y<=b&&b<=x||isNaN(b))&&(a[r++]=c),c++}}h=!0}}if(!h)if(1===n)for(m=0;m<o;m++){var S=this.getRawIndex(m);(l<=(w=this._getFast(s,S))&&w<=u||isNaN(w))&&(a[r++]=S)}else for(m=0;m<o;m++){var M=!0;for(S=this.getRawIndex(m),f=0;f<n;f++){var I=e[f];((w=this._getFast(i,S))<t[I][0]||w>t[I][1])&&(M=!1)}M&&(a[r++]=this.getRawIndex(m))}return r<o&&(this._indices=a),this._count=r,this._extent={},this.getRawIndex=this._indices?jf:Yf,this}}},Hf.mapArray=function(t,e,i,n){"function"==typeof t&&(n=i,i=e,e=t,t=[]),i=i||n||this;var o=[];return this.each(t,function(){o.push(e&&e.apply(this,arguments))},i),o},Hf.map=function(t,e,i,n){i=i||n||this;var o=$f(this,t=N(Kf(t),this.getDimension,this));o._indices=this._indices,o.getRawIndex=o._indices?jf:Yf;for(var a=o._storage,r=[],s=this._chunkSize,l=t.length,u=this.count(),h=[],c=o._rawExtent,d=0;d<u;d++){for(var f=0;f<l;f++)h[f]=this.get(t[f],d);h[l]=d;var p=e&&e.apply(i,h);if(null!=p){"object"!=typeof p&&(r[0]=p,p=r);for(var g=this.getRawIndex(d),m=Math.floor(g/s),v=g%s,y=0;y<p.length;y++){var x=t[y],_=p[y],w=c[x],b=a[x];b&&(b[m][v]=_),_<w[0]&&(w[0]=_),_>w[1]&&(w[1]=_)}}}return o},Hf.downSample=function(t,e,i,n){for(var o=$f(this,[t]),a=o._storage,r=[],s=Math.floor(1/e),l=a[t],u=this.count(),h=this._chunkSize,c=o._rawExtent[t],d=new(Bf(this))(u),f=0,p=0;p<u;p+=s){u-p<s&&(s=u-p,r.length=s);for(var g=0;g<s;g++){var m=this.getRawIndex(p+g),v=Math.floor(m/h),y=m%h;r[g]=l[v][y]}var x=i(r),_=this.getRawIndex(Math.min(p+n(r,x)||0,u-1)),w=_%h;(l[Math.floor(_/h)][w]=x)<c[0]&&(c[0]=x),x>c[1]&&(c[1]=x),d[f++]=_}return o._count=f,o._indices=d,o.getRawIndex=jf,o},Hf.getItemModel=function(t){var e=this.hostModel;return new Il(this.getRawDataItem(t),e,e&&e.ecModel)},Hf.diff=function(e){var i=this;return new Tf(e?e.getIndices():[],this.getIndices(),function(t){return qf(e,t)},function(t){return qf(i,t)})},Hf.getVisual=function(t){var e=this._visual;return e&&e[t]},Hf.setVisual=function(t,e){if(Pf(t))for(var i in t)t.hasOwnProperty(i)&&this.setVisual(i,t[i]);else this._visual=this._visual||{},this._visual[t]=e},Hf.setLayout=function(t,e){if(Pf(t))for(var i in t)t.hasOwnProperty(i)&&this.setLayout(i,t[i]);else this._layout[t]=e},Hf.getLayout=function(t){return this._layout[t]},Hf.getItemLayout=function(t){return this._itemLayouts[t]},Hf.setItemLayout=function(t,e,i){this._itemLayouts[t]=i?L(this._itemLayouts[t]||{},e):e},Hf.clearItemLayouts=function(){this._itemLayouts.length=0},Hf.getItemVisual=function(t,e,i){var n=this._itemVisuals[t],o=n&&n[e];return null!=o||i?o:this.getVisual(e)},Hf.setItemVisual=function(t,e,i){var n=this._itemVisuals[t]||{},o=this.hasItemVisual;if(this._itemVisuals[t]=n,Pf(e))for(var a in e)e.hasOwnProperty(a)&&(n[a]=e[a],o[a]=!0);else n[e]=i,o[e]=!0},Hf.clearAllVisual=function(){this._visual={},this._itemVisuals=[],this.hasItemVisual={}};function tp(t){t.seriesIndex=this.seriesIndex,t.dataIndex=this.dataIndex,t.dataType=this.dataType}function ep(t,e,i){Gu.isInstance(e)||(e=Gu.seriesDataToSource(e)),i=i||{},t=(t||[]).slice();for(var n=(i.dimsDef||[]).slice(),o=Q(),a=Q(),l=[],r=function(t,e,i,n){var o=Math.max(t.dimensionsDetectCount||1,e.length,i.length,n||0);return E(e,function(t){var e=t.dimsDef;e&&(o=Math.max(o,e.length))}),o}(e,t,n,i.dimCount),s=0;s<r;s++){var u=n[s]=L({},R(n[s])?n[s]:{name:n[s]}),h=u.name,c=l[s]=new kf;null!=h&&null==o.get(h)&&(c.name=c.displayName=h,o.set(h,s)),null!=u.type&&(c.type=u.type),null!=u.displayName&&(c.displayName=u.displayName)}var d=i.encodeDef;!d&&i.encodeDefaulter&&(d=i.encodeDefaulter(e,r)),(d=Q(d)).each(function(t,i){if(1===(t=Eo(t).slice()).length&&!z(t[0])&&t[0]<0)d.set(i,!1);else{var n=d.set(i,[]);E(t,function(t,e){z(t)&&(t=o.get(t)),null!=t&&t<r&&(n[e]=t,p(l[t],i,e))})}});var f=0;function p(t,e,i){null!=Df.get(e)?t.otherDims[e]=i:(t.coordDim=e,t.coordDimIndex=i,a.set(e,!0))}E(t,function(o,t){var a,r,s;if(z(o))a=o,o={};else{a=o.name;var e=o.ordinalMeta;o.ordinalMeta=null,(o=D(o)).ordinalMeta=e,r=o.dimsDef,s=o.otherDims,o.name=o.coordDim=o.coordDimIndex=o.dimsDef=o.otherDims=null}if(!1!==(i=d.get(a))){var i;if(!(i=Eo(i)).length)for(var n=0;n<(r&&r.length||1);n++){for(;f<l.length&&null!=l[f].coordDim;)f++;f<l.length&&i.push(f++)}E(i,function(t,e){var i=l[t];if(p(C(i,o),a,e),null==i.name&&r){var n=r[e];R(n)||(n={name:n}),i.name=i.displayName=n.name,i.defaultTooltip=n.defaultTooltip}s&&C(i.otherDims,s)})}});var g=i.generateCoord,m=i.generateCoordCount,v=null!=m;m=g?m||1:0;for(var y,x,_=g||"value",w=0;w<r;w++){null==(c=l[w]=l[w]||new kf).coordDim&&(c.coordDim=ip(_,a,v),c.coordDimIndex=0,(!g||m<=0)&&(c.isExtraCoord=!0),m--),null==c.name&&(c.name=ip(c.coordDim,o)),null==c.type&&(y=e,x=w,c.name,qu(y.data,y.sourceFormat,y.seriesLayoutBy,y.dimensionsDefine,y.startIndex,x)===Fu.Must||c.isExtraCoord&&(null!=c.otherDims.itemName||null!=c.otherDims.seriesName))&&(c.type="ordinal")}return l}function ip(t,e,i){if(i||null!=e.get(t)){for(var n=0;null!=e.get(t+n);)n++;t+=n}return e.set(t,!0),t}Hf.setItemGraphicEl=function(t,e){var i=this.hostModel;e&&(e.dataIndex=t,e.dataType=this.dataType,e.seriesIndex=i&&i.seriesIndex,"group"===e.type&&e.traverse(tp,e)),this._graphicEls[t]=e},Hf.getItemGraphicEl=function(t){return this._graphicEls[t]},Hf.eachItemGraphicEl=function(i,n){E(this._graphicEls,function(t,e){t&&i&&i.call(n,t,e)})},Hf.cloneShallow=function(t){if(!t){var e=N(this.dimensions,this.getDimensionInfo,this);t=new Wf(e,this.hostModel)}if(t._storage=this._storage,Ff(t,this),this._indices){var i=this._indices.constructor;t._indices=new i(this._indices)}else t._indices=null;return t.getRawIndex=t._indices?jf:Yf,t},Hf.wrapMethod=function(t,e){var i=this[t];"function"==typeof i&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=i.apply(this,arguments);return e.apply(this,[t].concat(U(arguments)))})},Hf.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],Hf.CHANGABLE_METHODS=["filterSelf","selectRange"];var np=function(t,e){return ep((e=e||{}).coordDimensions||[],t,{dimsDef:e.dimensionsDefine||t.dimensionsDefine,encodeDef:e.encodeDefine||t.encodeDefine,dimCount:e.dimensionsCount,encodeDefaulter:e.encodeDefaulter,generateCoord:e.generateCoord,generateCoordCount:e.generateCoordCount})};function op(t){this.coordSysName=t,this.coordSysDims=[],this.axisMap=Q(),this.categoryAxisMap=Q(),this.firstCategoryDimIndex=null}var ap={cartesian2d:function(t,e,i,n){var o=t.getReferringComponents("xAxis")[0],a=t.getReferringComponents("yAxis")[0];e.coordSysDims=["x","y"],i.set("x",o),i.set("y",a),rp(o)&&(n.set("x",o),e.firstCategoryDimIndex=0),rp(a)&&(n.set("y",a),e.firstCategoryDimIndex,e.firstCategoryDimIndex=1)},singleAxis:function(t,e,i,n){var o=t.getReferringComponents("singleAxis")[0];e.coordSysDims=["single"],i.set("single",o),rp(o)&&(n.set("single",o),e.firstCategoryDimIndex=0)},polar:function(t,e,i,n){var o=t.getReferringComponents("polar")[0],a=o.findAxisModel("radiusAxis"),r=o.findAxisModel("angleAxis");e.coordSysDims=["radius","angle"],i.set("radius",a),i.set("angle",r),rp(a)&&(n.set("radius",a),e.firstCategoryDimIndex=0),rp(r)&&(n.set("angle",r),null==e.firstCategoryDimIndex&&(e.firstCategoryDimIndex=1))},geo:function(t,e,i,n){e.coordSysDims=["lng","lat"]},parallel:function(t,o,a,r){var s=t.ecModel,e=s.getComponent("parallel",t.get("parallelIndex")),l=o.coordSysDims=e.dimensions.slice();E(e.parallelAxisIndex,function(t,e){var i=s.getComponent("parallelAxis",t),n=l[e];a.set(n,i),rp(i)&&null==o.firstCategoryDimIndex&&(r.set(n,i),o.firstCategoryDimIndex=e)})}};function rp(t){return"category"===t.get("type")}function sp(t,i,e){var n,o,a,r,s=(e=e||{}).byIndex,l=e.stackedCoordDimension,u=!(!t||!t.get("stack"));if(E(i,function(t,e){z(t)&&(i[e]=t={name:t}),u&&!t.isExtraCoord&&(s||n||!t.ordinalMeta||(n=t),o||"ordinal"===t.type||"time"===t.type||l&&l!==t.coordDim||(o=t))}),!o||s||n||(s=!0),o){a="__\0ecstackresult",r="__\0ecstackedover",n&&(n.createInvertedIndices=!0);var h=o.coordDim,c=o.type,d=0;E(i,function(t){t.coordDim===h&&d++}),i.push({name:a,coordDim:h,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0}),d++,i.push({name:r,coordDim:r,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0})}return{stackedDimension:o&&o.name,stackedByDimension:n&&n.name,isStackedByIndex:s,stackedOverDimension:r,stackResultDimension:a}}function lp(t,e){return!!e&&e===t.getCalculationInfo("stackedDimension")}function up(t,e){return lp(t,e)?t.getCalculationInfo("stackResultDimension"):e}function hp(t,e,i){i=i||{},Gu.isInstance(t)||(t=Gu.seriesDataToSource(t));var n,o=e.get("coordinateSystem"),a=nh.get(o),r=function(t){var e=t.get("coordinateSystem"),i=new op(e),n=ap[e];if(n)return n(t,i,i.axisMap,i.categoryAxisMap),i}(e);r&&(n=N(r.coordSysDims,function(t){var e={name:t},i=r.axisMap.get(t);if(i){var n=i.get("type");e.type=Lf(n)}return e})),n=n||(a&&(a.getDimensionsInfo?a.getDimensionsInfo():a.dimensions.slice())||["x","y"]);var s,l,u=np(t,{coordDimensions:n,generateCoord:i.generateCoord,encodeDefaulter:i.useEncodeDefaulter?T(Xu,n,e):null});r&&E(u,function(t,e){var i=t.coordDim,n=r.categoryAxisMap.get(i);n&&(null==s&&(s=e),t.ordinalMeta=n.getOrdinalMeta()),null!=t.otherDims.itemName&&(l=!0)}),l||null==s||(u[s].otherDims.itemName=0);var h=sp(e,u),c=new Wf(u,e);c.setCalculationInfo(h);var d=null!=s&&function(t){if(t.sourceFormat===Pu){var e=function(t){var e=0;for(;e<t.length&&null==t[e];)e++;return t[e]}(t.data||[]);return null!=e&&!k(Bo(e))}}(t)?function(t,e,i,n){return n===s?i:this.defaultDimValueGetter(t,e,i,n)}:null;return c.hasItemOption=!1,c.initData(t,null,d),c}function cp(t){this._setting=t||{},this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments)}function dp(t){this.categories=t.categories||[],this._needCollect=t.needCollect,this._deduplication=t.deduplication,this._map}cp.prototype.parse=function(t){return t},cp.prototype.getSetting=function(t){return this._setting[t]},cp.prototype.contain=function(t){var e=this._extent;return t>=e[0]&&t<=e[1]},cp.prototype.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0])},cp.prototype.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0]},cp.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1])},cp.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e))},cp.prototype.getExtent=function(){return this._extent.slice()},cp.prototype.setExtent=function(t,e){var i=this._extent;isNaN(t)||(i[0]=t),isNaN(e)||(i[1]=e)},cp.prototype.isBlank=function(){return this._isBlank},cp.prototype.setBlank=function(t){this._isBlank=t},cp.prototype.getLabel=null,ta(cp),aa(cp,{registerWhenExtend:!0}),dp.createByAxisModel=function(t){var e=t.option,i=e.data,n=i&&N(i,gp);return new dp({categories:n,needCollect:!n,deduplication:!1!==e.dedplication})};var fp=dp.prototype;function pp(t){return t._map||(t._map=Q(t.categories))}function gp(t){return R(t)&&null!=t.value?t.value:t+""}fp.getOrdinal=function(t){return pp(this).get(t)},fp.parseAndCollect=function(t){var e,i=this._needCollect;if("string"!=typeof t&&!i)return t;if(i&&!this._deduplication)return e=this.categories.length,this.categories[e]=t,e;var n=pp(this);return null==(e=n.get(t))&&(i?(e=this.categories.length,this.categories[e]=t,n.set(t,e)):e=NaN),e};var mp=cp.prototype,vp=cp.extend({type:"ordinal",init:function(t,e){t&&!k(t)||(t=new dp({categories:t})),this._ordinalMeta=t,this._extent=e||[0,t.categories.length-1]},parse:function(t){return"string"==typeof t?this._ordinalMeta.getOrdinal(t):Math.round(t)},contain:function(t){return t=this.parse(t),mp.contain.call(this,t)&&null!=this._ordinalMeta.categories[t]},normalize:function(t){return mp.normalize.call(this,this.parse(t))},scale:function(t){return Math.round(mp.scale.call(this,t))},getTicks:function(){for(var t=[],e=this._extent,i=e[0];i<=e[1];)t.push(i),i++;return t},getLabel:function(t){if(!this.isBlank())return this._ordinalMeta.categories[t]},count:function(){return this._extent[1]-this._extent[0]+1},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},getOrdinalMeta:function(){return this._ordinalMeta},niceTicks:et,niceExtent:et});vp.create=function(){return new vp};var yp=Nl;function xp(t){return zl(t)+2}function _p(t,e,i){t[e]=Math.max(Math.min(t[e],i[1]),i[0])}function wp(t,e){isFinite(t[0])||(t[0]=e[0]),isFinite(t[1])||(t[1]=e[1]),_p(t,0,e),_p(t,1,e),t[0]>t[1]&&(t[0]=t[1])}var bp=Nl,Sp=cp.extend({type:"interval",_interval:0,_intervalPrecision:2,setExtent:function(t,e){var i=this._extent;isNaN(t)||(i[0]=parseFloat(t)),isNaN(e)||(i[1]=parseFloat(e))},unionExtent:function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),Sp.prototype.setExtent.call(this,e[0],e[1])},getInterval:function(){return this._interval},setInterval:function(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=xp(t)},getTicks:function(t){var e=this._interval,i=this._extent,n=this._niceExtent,o=this._intervalPrecision,a=[];if(!e)return a;i[0]<n[0]&&(t?a.push(bp(n[0]-e)):a.push(i[0]));for(var r=n[0];r<=n[1]&&(a.push(r),(r=bp(r+e,o))!==a[a.length-1]);)if(1e4<a.length)return[];var s=a.length?a[a.length-1]:n[1];return i[1]>s&&(t?a.push(s+e):a.push(i[1])),a},getMinorTicks:function(t){for(var e=this.getTicks(!0),i=[],n=this.getExtent(),o=1;o<e.length;o++){for(var a=e[o],r=e[o-1],s=0,l=[],u=(a-r)/t;s<t-1;){var h=Nl(r+(s+1)*u);h>n[0]&&h<n[1]&&l.push(h),s++}i.push(l)}return i},getLabel:function(t,e){if(null==t)return"";var i=e&&e.precision;return null==i?i=zl(t)||0:"auto"===i&&(i=this._intervalPrecision),Kl(t=bp(t,i,!0))},niceTicks:function(t,e,i){t=t||5;var n=this._extent,o=n[1]-n[0];if(isFinite(o)){o<0&&(o=-o,n.reverse());var a=function(t,e,i,n){var o={},a=t[1]-t[0],r=o.interval=Xl(a/e,!0);null!=i&&r<i&&(r=o.interval=i),null!=n&&n<r&&(r=o.interval=n);var s=o.intervalPrecision=xp(r);return wp(o.niceTickExtent=[yp(Math.ceil(t[0]/r)*r,s),yp(Math.floor(t[1]/r)*r,s)],t),o}(n,t,e,i);this._intervalPrecision=a.intervalPrecision,this._interval=a.interval,this._niceExtent=a.niceTickExtent}},niceExtent:function(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var i=e[0];t.fixMax||(e[1]+=i/2),e[0]-=i/2}else e[1]=1;var n=e[1]-e[0];isFinite(n)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var o=this._interval;t.fixMin||(e[0]=bp(Math.floor(e[0]/o)*o)),t.fixMax||(e[1]=bp(Math.ceil(e[1]/o)*o))}});Sp.create=function(){return new Sp};var Mp="__ec_stack_",Ip="undefined"!=typeof Float32Array?Float32Array:Array;function Tp(t){return t.get("stack")||Mp+t.seriesIndex}function Ap(t){return t.dim+t.index}function Dp(t,e){var i=[];return e.eachSeriesByType(t,function(t){Op(t)&&!Ep(t)&&i.push(t)}),i}function Cp(t){var g=function(t){var l={};E(t,function(t){var e=t.coordinateSystem.getBaseAxis();if("time"===e.type||"value"===e.type)for(var i=t.getData(),n=e.dim+"_"+e.index,o=i.mapDimension(e.dim),a=0,r=i.count();a<r;++a){var s=i.get(o,a);l[n]?l[n].push(s):l[n]=[s]}});var e=[];for(var i in l)if(l.hasOwnProperty(i)){var n=l[i];if(n){n.sort(function(t,e){return t-e});for(var o=null,a=1;a<n.length;++a){var r=n[a]-n[a-1];0<r&&(o=null===o?r:Math.min(o,r))}e[i]=o}}return e}(t),m=[];return E(t,function(t){var e,i=t.coordinateSystem.getBaseAxis(),n=i.getExtent();if("category"===i.type)e=i.getBandWidth();else if("value"===i.type||"time"===i.type){var o=i.dim+"_"+i.index,a=g[o],r=Math.abs(n[1]-n[0]),s=i.scale.getExtent(),l=Math.abs(s[1]-s[0]);e=a?r/l*a:r}else{var u=t.getData();e=Math.abs(n[1]-n[0])/u.count()}var h=Pl(t.get("barWidth"),e),c=Pl(t.get("barMaxWidth"),e),d=Pl(t.get("barMinWidth")||1,e),f=t.get("barGap"),p=t.get("barCategoryGap");m.push({bandWidth:e,barWidth:h,barMaxWidth:c,barMinWidth:d,barGap:f,barCategoryGap:p,axisKey:Ap(i),stackId:Tp(t)})}),Lp(m)}function Lp(t){var d={};E(t,function(t,e){var i=t.axisKey,n=t.bandWidth,o=d[i]||{bandWidth:n,remainedWidth:n,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},a=o.stacks;d[i]=o;var r=t.stackId;a[r]||o.autoWidthCount++,a[r]=a[r]||{width:0,maxWidth:0};var s=t.barWidth;s&&!a[r].width&&(a[r].width=s,s=Math.min(o.remainedWidth,s),o.remainedWidth-=s);var l=t.barMaxWidth;l&&(a[r].maxWidth=l);var u=t.barMinWidth;u&&(a[r].minWidth=u);var h=t.barGap;null!=h&&(o.gap=h);var c=t.barCategoryGap;null!=c&&(o.categoryGap=c)});var f={};return E(d,function(t,i){f[i]={};var e=t.stacks,n=t.bandWidth,o=Pl(t.categoryGap,n),a=Pl(t.gap,1),r=t.remainedWidth,s=t.autoWidthCount,l=(r-o)/(s+(s-1)*a);l=Math.max(l,0),E(e,function(t){var e=t.maxWidth,i=t.minWidth;if(t.width){n=t.width;e&&(n=Math.min(n,e)),i&&(n=Math.max(n,i)),t.width=n,r-=n+a*n,s--}else{var n=l;e&&e<n&&(n=Math.min(e,r)),i&&n<i&&(n=i),n!==l&&(t.width=n,r-=n+a*n,s--)}}),l=(r-o)/(s+(s-1)*a),l=Math.max(l,0);var u,h=0;E(e,function(t,e){t.width||(t.width=l),h+=(u=t).width*(1+a)}),u&&(h-=u.width*a);var c=-h/2;E(e,function(t,e){f[i][e]=f[i][e]||{bandWidth:n,offset:c,width:t.width},c+=t.width*(1+a)})}),f}function kp(t,e,i){if(t&&e){var n=t[Ap(e)];return null!=n&&null!=i&&(n=n[Tp(i)]),n}}function Pp(t,e){var i=Dp(t,e),T=Cp(i),A={};E(i,function(t){var e=t.getData(),i=t.coordinateSystem,n=i.getBaseAxis(),o=Tp(t),a=T[Ap(n)][o],r=a.offset,s=a.width,l=i.getOtherAxis(n),u=t.get("barMinHeight")||0;A[o]=A[o]||[],e.setLayout({bandWidth:a.bandWidth,offset:r,size:s});for(var h=e.mapDimension(l.dim),c=e.mapDimension(n.dim),d=lp(e,h),f=l.isHorizontal(),p=zp(n,l,d),g=0,m=e.count();g<m;g++){var v=e.get(h,g),y=e.get(c,g);if(!isNaN(v)&&!isNaN(y)){var x,_,w,b,S,M=0<=v?"p":"n",I=p;if(d&&(A[o][y]||(A[o][y]={p:p,n:p}),I=A[o][y][M]),f)x=I,_=(S=i.dataToPoint([v,y]))[1]+r,w=S[0]-p,b=s,Math.abs(w)<u&&(w=(w<0?-1:1)*u),d&&(A[o][y][M]+=w);else x=(S=i.dataToPoint([y,v]))[0]+r,_=I,w=s,b=S[1]-p,Math.abs(b)<u&&(b=(b<=0?-1:1)*u),d&&(A[o][y][M]+=b);e.setItemLayout(g,{x:x,y:_,width:w,height:b})}}},this)}var Np={seriesType:"bar",plan:dc(),reset:function(t){if(Op(t)&&Ep(t)){var e=t.getData(),h=t.coordinateSystem,c=h.getBaseAxis(),d=h.getOtherAxis(c),f=e.mapDimension(d.dim),p=e.mapDimension(c.dim),g=d.isHorizontal(),m=g?0:1,v=kp(Cp([t]),c,t).width;return.5<v||(v=.5),{progress:function(t,e){var i,n=t.count,o=new Ip(2*n),a=new Ip(n),r=[],s=[],l=0,u=0;for(;null!=(i=t.next());)s[m]=e.get(f,i),s[1-m]=e.get(p,i),r=h.dataToPoint(s,null,r),o[l++]=r[0],o[l++]=r[1],a[u++]=i;e.setLayout({largePoints:o,largeDataIndices:a,barWidth:v,valueAxisStart:zp(c,d,!1),valueAxisHorizontal:g})}}}}};function Op(t){return t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type}function Ep(t){return t.pipelineContext&&t.pipelineContext.large}function zp(t,e){return e.toGlobalCoord(e.dataToCoord("log"===e.type?1:0))}var Rp=Sp.prototype,Bp=Math.ceil,Vp=Math.floor,Gp=36e5,Fp=864e5,Wp=Sp.extend({type:"time",getLabel:function(t){var e=this._stepLvl,i=new Date(t);return lu(e[0],i,this.getSetting("useUTC"))},niceExtent:function(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=Fp,e[1]+=Fp),e[1]===-1/0&&e[0]===1/0){var i=new Date;e[1]=+new Date(i.getFullYear(),i.getMonth(),i.getDate()),e[0]=e[1]-Fp}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var n=this._interval;t.fixMin||(e[0]=Nl(Vp(e[0]/n)*n)),t.fixMax||(e[1]=Nl(Bp(e[1]/n)*n))},niceTicks:function(t,e,i){t=t||10;var n=this._extent,o=n[1]-n[0],a=o/t;null!=e&&a<e&&(a=e),null!=i&&i<a&&(a=i);var r=Hp.length,s=function(t,e,i,n){for(;i<n;){var o=i+n>>>1;t[o][1]<e?i=1+o:n=o}return i}(Hp,a,0,r),l=Hp[Math.min(s,r-1)],u=l[1];"year"===l[0]&&(u*=Xl(o/u/t,!0));var h=this.getSetting("useUTC")?0:60*new Date(+n[0]||+n[1]).getTimezoneOffset()*1e3,c=[Math.round(Bp((n[0]-h)/u)*u+h),Math.round(Vp((n[1]-h)/u)*u+h)];wp(c,n),this._stepLvl=l,this._interval=u,this._niceExtent=c},parse:function(t){return+Hl(t)}});E(["contain","normalize"],function(e){Wp.prototype[e]=function(t){return Rp[e].call(this,this.parse(t))}});var Hp=[["hh:mm:ss",1e3],["hh:mm:ss",5e3],["hh:mm:ss",1e4],["hh:mm:ss",15e3],["hh:mm:ss",3e4],["hh:mm\nMM-dd",6e4],["hh:mm\nMM-dd",3e5],["hh:mm\nMM-dd",6e5],["hh:mm\nMM-dd",9e5],["hh:mm\nMM-dd",18e5],["hh:mm\nMM-dd",Gp],["hh:mm\nMM-dd",72e5],["hh:mm\nMM-dd",6*Gp],["hh:mm\nMM-dd",432e5],["MM-dd\nyyyy",Fp],["MM-dd\nyyyy",2*Fp],["MM-dd\nyyyy",3*Fp],["MM-dd\nyyyy",4*Fp],["MM-dd\nyyyy",5*Fp],["MM-dd\nyyyy",6*Fp],["week",7*Fp],["MM-dd\nyyyy",864e6],["week",14*Fp],["week",21*Fp],["month",31*Fp],["week",42*Fp],["month",62*Fp],["week",70*Fp],["quarter",95*Fp],["month",31*Fp*4],["month",13392e6],["half-year",16416e6],["month",31*Fp*8],["month",26784e6],["year",380*Fp]];Wp.create=function(t){return new Wp({useUTC:t.ecModel.get("useUTC")})};var Zp=cp.prototype,Up=Sp.prototype,Xp=zl,Yp=Nl,jp=Math.floor,qp=Math.ceil,Kp=Math.pow,$p=Math.log,Jp=cp.extend({type:"log",base:10,$constructor:function(){cp.apply(this,arguments),this._originalScale=new Sp},getTicks:function(t){var i=this._originalScale,n=this._extent,o=i.getExtent();return N(Up.getTicks.call(this,t),function(t){var e=Nl(Kp(this.base,t));return e=t===n[0]&&i.__fixMin?Qp(e,o[0]):e,e=t===n[1]&&i.__fixMax?Qp(e,o[1]):e},this)},getMinorTicks:Up.getMinorTicks,getLabel:Up.getLabel,scale:function(t){return t=Zp.scale.call(this,t),Kp(this.base,t)},setExtent:function(t,e){var i=this.base;t=$p(t)/$p(i),e=$p(e)/$p(i),Up.setExtent.call(this,t,e)},getExtent:function(){var t=this.base,e=Zp.getExtent.call(this);e[0]=Kp(t,e[0]),e[1]=Kp(t,e[1]);var i=this._originalScale,n=i.getExtent();return i.__fixMin&&(e[0]=Qp(e[0],n[0])),i.__fixMax&&(e[1]=Qp(e[1],n[1])),e},unionExtent:function(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=$p(t[0])/$p(e),t[1]=$p(t[1])/$p(e),Zp.unionExtent.call(this,t)},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},niceTicks:function(t){t=t||10;var e=this._extent,i=e[1]-e[0];if(!(i==1/0||i<=0)){var n=Zl(i);for(t/i*n<=.5&&(n*=10);!isNaN(n)&&Math.abs(n)<1&&0<Math.abs(n);)n*=10;var o=[Nl(qp(e[0]/n)*n),Nl(jp(e[1]/n)*n)];this._interval=n,this._niceExtent=o}},niceExtent:function(t){Up.niceExtent.call(this,t);var e=this._originalScale;e.__fixMin=t.fixMin,e.__fixMax=t.fixMax}});function Qp(t,e){return Yp(t,Xp(e))}function tg(t,e){var i,n,o,a=t.type,r=e.getMin(),s=e.getMax(),l=null!=r,u=null!=s,h=t.getExtent();"ordinal"===a?i=e.getCategories().length:(k(n=e.get("boundaryGap"))||(n=[n||0,n||0]),"boolean"==typeof n[0]&&(n=[0,0]),n[0]=Pl(n[0],1),n[1]=Pl(n[1],1),o=h[1]-h[0]||Math.abs(h[0])),null==r&&(r="ordinal"===a?i?0:NaN:h[0]-n[0]*o),null==s&&(s="ordinal"===a?i?i-1:NaN:h[1]+n[1]*o),"dataMin"===r?r=h[0]:"function"==typeof r&&(r=r({min:h[0],max:h[1]})),"dataMax"===s?s=h[1]:"function"==typeof s&&(s=s({min:h[0],max:h[1]})),null!=r&&isFinite(r)||(r=NaN),null!=s&&isFinite(s)||(s=NaN),t.setBlank(F(r)||F(s)||"ordinal"===a&&!t.getOrdinalMeta().categories.length),e.getNeedCrossZero()&&(0<r&&0<s&&!l&&(r=0),r<0&&s<0&&!u&&(s=0));var c=e.ecModel;if(c&&"time"===a){var d,f=Dp("bar",c);if(E(f,function(t){d|=t.getBaseAxis()===e.axis}),d){var p=Cp(f),g=function(t,e,i,n){var o=i.axis.getExtent(),a=o[1]-o[0],r=kp(n,i.axis);if(void 0===r)return{min:t,max:e};var s=1/0;E(r,function(t){s=Math.min(t.offset,s)});var l=-1/0;E(r,function(t){l=Math.max(t.offset+t.width,l)}),s=Math.abs(s),l=Math.abs(l);var u=s+l,h=e-t,c=h/(1-(s+l)/a)-h;return{min:t-=s/u*c,max:e+=l/u*c}}(r,s,e,p);r=g.min,s=g.max}}return[r,s]}function eg(t,e){var i=tg(t,e),n=null!=e.getMin(),o=null!=e.getMax(),a=e.get("splitNumber");"log"===t.type&&(t.base=e.get("logBase"));var r=t.type;t.setExtent(i[0],i[1]),t.niceExtent({splitNumber:a,fixMin:n,fixMax:o,minInterval:"interval"===r||"time"===r?e.get("minInterval"):null,maxInterval:"interval"===r||"time"===r?e.get("maxInterval"):null});var s=e.get("interval");null!=s&&t.setInterval&&t.setInterval(s)}function ig(t,e){if(e=e||t.get("type"))switch(e){case"category":return new vp(t.getOrdinalMeta?t.getOrdinalMeta():t.getCategories(),[1/0,-1/0]);case"value":return new Sp;default:return(cp.getClass(e)||Sp).create(t)}}function ng(i){var e,n=i.getLabelModel().get("formatter"),o="category"===i.type?i.scale.getExtent()[0]:null;return"string"==typeof n?(e=n,n=function(t){return t=i.scale.getLabel(t),e.replace("{value}",null!=t?t:"")}):"function"==typeof n?function(t,e){return null!=o&&(e=t-o),n(og(i,t),e)}:function(t){return i.scale.getLabel(t)}}function og(t,e){return"category"===t.type?t.scale.getLabel(e):e}function ag(t){var e=t.get("interval");return null==e?"auto":e}function rg(t){return"category"===t.type&&0===ag(t.getLabelModel())}E(["contain","normalize"],function(e){Jp.prototype[e]=function(t){return t=$p(t)/$p(this.base),Zp[e].call(this,t)}}),Jp.create=function(){return new Jp};var sg={getMin:function(t){var e=this.option,i=t||null==e.rangeStart?e.min:e.rangeStart;return this.axis&&null!=i&&"dataMin"!==i&&"function"!=typeof i&&!F(i)&&(i=this.axis.scale.parse(i)),i},getMax:function(t){var e=this.option,i=t||null==e.rangeEnd?e.max:e.rangeEnd;return this.axis&&null!=i&&"dataMax"!==i&&"function"!=typeof i&&!F(i)&&(i=this.axis.scale.parse(i)),i},getNeedCrossZero:function(){var t=this.option;return null==t.rangeStart&&null==t.rangeEnd&&!t.scale},getCoordSysModel:et,setRange:function(t,e){this.option.rangeStart=t,this.option.rangeEnd=e},resetRange:function(){this.option.rangeStart=this.option.rangeEnd=null}},lg=Is({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var i=e.cx,n=e.cy,o=e.width/2,a=e.height/2;t.moveTo(i,n-a),t.lineTo(i+o,n+a),t.lineTo(i-o,n+a),t.closePath()}}),ug=Is({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var i=e.cx,n=e.cy,o=e.width/2,a=e.height/2;t.moveTo(i,n-a),t.lineTo(i+o,n),t.lineTo(i,n+a),t.lineTo(i-o,n),t.closePath()}}),hg=Is({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var i=e.x,n=e.y,o=e.width/5*3,a=Math.max(o,e.height),r=o/2,s=r*r/(a-r),l=n-a+r+s,u=Math.asin(s/r),h=Math.cos(u)*r,c=Math.sin(u),d=Math.cos(u),f=.6*r,p=.7*r;t.moveTo(i-h,l+s),t.arc(i,l,r,Math.PI-u,2*Math.PI+u),t.bezierCurveTo(i+h-c*f,l+s+d*f,i,n-p,i,n),t.bezierCurveTo(i,n-p,i-h+c*f,l+s+d*f,i-h,l+s),t.closePath()}}),cg=Is({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var i=e.height,n=e.width,o=e.x,a=e.y,r=n/3*2;t.moveTo(o,a),t.lineTo(o+r,a+i),t.lineTo(o,a+i/4*3),t.lineTo(o-r,a+i),t.lineTo(o,a),t.closePath()}}),dg={line:function(t,e,i,n,o){o.x1=t,o.y1=e+n/2,o.x2=t+i,o.y2=e+n/2},rect:function(t,e,i,n,o){o.x=t,o.y=e,o.width=i,o.height=n},roundRect:function(t,e,i,n,o){o.x=t,o.y=e,o.width=i,o.height=n,o.r=Math.min(i,n)/4},square:function(t,e,i,n,o){var a=Math.min(i,n);o.x=t,o.y=e,o.width=a,o.height=a},circle:function(t,e,i,n,o){o.cx=t+i/2,o.cy=e+n/2,o.r=Math.min(i,n)/2},diamond:function(t,e,i,n,o){o.cx=t+i/2,o.cy=e+n/2,o.width=i,o.height=n},pin:function(t,e,i,n,o){o.x=t+i/2,o.y=e+n/2,o.width=i,o.height=n},arrow:function(t,e,i,n,o){o.x=t+i/2,o.y=e+n/2,o.width=i,o.height=n},triangle:function(t,e,i,n,o){o.cx=t+i/2,o.cy=e+n/2,o.width=i,o.height=n}},fg={};E({line:os,rect:is,roundRect:is,square:is,circle:Hr,diamond:ug,pin:hg,arrow:cg,triangle:lg},function(t,e){fg[e]=new t});var pg=Is({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},calculateTextPosition:function(t,e,i){var n=pn(t,e,i),o=this.shape;return o&&"pin"===o.symbolType&&"inside"===e.textPosition&&(n.y=i.y+.4*i.height),n},buildPath:function(t,e,i){var n=e.symbolType;if("none"!==n){var o=fg[n];o=o||fg[n="rect"],dg[n](e.x,e.y,e.width,e.height,o.shape),o.buildPath(t,o.shape,i)}}});function gg(t,e){if("image"!==this.type){var i=this.style,n=this.shape;n&&"line"===n.symbolType?i.stroke=t:this.__isEmptyBrush?(i.stroke=t,i.fill=e||"#fff"):(i.fill&&(i.fill=t),i.stroke&&(i.stroke=t)),this.dirty(!1)}}function mg(t,e,i,n,o,a,r){var s,l=0===t.indexOf("empty");return l&&(t=t.substr(5,1).toLowerCase()+t.substr(6)),(s=0===t.indexOf("image://")?Cs(t.slice(8),new Mi(e,i,n,o),r?"center":"cover"):0===t.indexOf("path://")?Ds(t.slice(7),{},new Mi(e,i,n,o),r?"center":"cover"):new pg({shape:{symbolType:t,x:e,y:i,width:n,height:o}})).__isEmptyBrush=l,s.setColor=gg,s.setColor(a),s}var vg={isDimensionStacked:lp,enableDataStack:sp,getStackedDimension:up};var yg=(Object.freeze||Object)({createList:function(t){return hp(t.getSource(),t)},getLayoutRect:vu,dataStack:vg,createScale:function(t,e){var i=e;Il.isInstance(e)||b(i=new Il(e),sg);var n=ig(i);return n.setExtent(t[0],t[1]),eg(n,i),n},mixinAxisModelCommonMethods:function(t){b(t,sg)},completeDimensions:ep,createDimensions:np,createSymbol:mg}),xg=1e-8;function _g(t,e){return Math.abs(t-e)<xg}function wg(t,e,i){var n=0,o=t[0];if(!o)return!1;for(var a=1;a<t.length;a++){var r=t[a];n+=hr(o[0],o[1],r[0],r[1],e,i),o=r}var s=t[0];return _g(o[0],s[0])&&_g(o[1],s[1])||(n+=hr(o[0],o[1],s[0],s[1],e,i)),0!==n}function bg(t,e,i){if(this.name=t,this.geometries=e,i)i=[i[0],i[1]];else{var n=this.getBoundingRect();i=[n.x+n.width/2,n.y+n.height/2]}this.center=i}function Sg(t,e,i){for(var n=[],o=e[0],a=e[1],r=0;r<t.length;r+=2){var s=t.charCodeAt(r)-64,l=t.charCodeAt(r+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),o=s+=o,a=l+=a,n.push([s/i,l/i])}return n}bg.prototype={constructor:bg,properties:null,getBoundingRect:function(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,i=[e,e],n=[-e,-e],o=[],a=[],r=this.geometries,s=0;s<r.length;s++){if("polygon"===r[s].type)Ba(r[s].exterior,o,a),St(i,i,o),Mt(n,n,a)}return 0===s&&(i[0]=i[1]=n[0]=n[1]=0),this._rect=new Mi(i[0],i[1],n[0]-i[0],n[1]-i[1])},contain:function(t){var e=this.getBoundingRect(),i=this.geometries;if(!e.contain(t[0],t[1]))return!1;t:for(var n=0,o=i.length;n<o;n++)if("polygon"===i[n].type){var a=i[n].exterior,r=i[n].interiors;if(wg(a,t[0],t[1])){for(var s=0;s<(r?r.length:0);s++)if(wg(r[s]))continue t;return!0}}return!1},transformTo:function(t,e,i,n){var o=this.getBoundingRect(),a=o.width/o.height;i?n=n||i/a:i=a*n;for(var r=new Mi(t,e,i,n),s=o.calculateTransform(r),l=this.geometries,u=0;u<l.length;u++)if("polygon"===l[u].type){for(var h=l[u].exterior,c=l[u].interiors,d=0;d<h.length;d++)bt(h[d],h[d],s);for(var f=0;f<(c?c.length:0);f++)for(d=0;d<c[f].length;d++)bt(c[f][d],c[f][d],s)}(o=this._rect).copy(r),this.center=[o.x+o.width/2,o.y+o.height/2]},cloneShallow:function(t){null==t&&(t=this.name);var e=new bg(t,this.geometries,this.center);return e._rect=this._rect,e.transformTo=null,e}};function Mg(t){return function(t){if(!t.UTF8Encoding)return;var e=t.UTF8Scale;null==e&&(e=1024);for(var i=t.features,n=0;n<i.length;n++)for(var o=i[n].geometry,a=o.coordinates,r=o.encodeOffsets,s=0;s<a.length;s++){var l=a[s];if("Polygon"===o.type)a[s]=Sg(l,r[s],e);else if("MultiPolygon"===o.type)for(var u=0;u<l.length;u++){var h=l[u];l[u]=Sg(h,r[s][u],e)}}t.UTF8Encoding=!1}(t),N(M(t.features,function(t){return t.geometry&&t.properties&&0<t.geometry.coordinates.length}),function(t){var e=t.properties,i=t.geometry,n=i.coordinates,o=[];"Polygon"===i.type&&o.push({type:"polygon",exterior:n[0],interiors:n.slice(1)}),"MultiPolygon"===i.type&&E(n,function(t){t[0]&&o.push({type:"polygon",exterior:t[0],interiors:t.slice(1)})});var a=new bg(e.name,o,e.cp);return a.properties=e,a})}var Ig=Zo();function Tg(t){return"category"===t.type?function(t){var e=t.getLabelModel(),i=Dg(t,e);return!e.get("show")||t.scale.isBlank()?{labels:[],labelCategoryInterval:i.labelCategoryInterval}:i}(t):function(i){var t=i.scale.getTicks(),n=ng(i);return{labels:N(t,function(t,e){return{formattedLabel:n(t,e),rawLabel:i.scale.getLabel(t),tickValue:t}})}}(t)}function Ag(t,e){return"category"===t.type?function(t,e){var i,n,o=Cg(t,"ticks"),a=ag(e),r=Lg(o,a);if(r)return r;e.get("show")&&!t.scale.isBlank()||(i=[]);if(O(a))i=Ng(t,a,!0);else if("auto"===a){var s=Dg(t,t.getLabelModel());n=s.labelCategoryInterval,i=N(s.labels,function(t){return t.tickValue})}else i=Pg(t,n=a,!0);return kg(o,a,{ticks:i,tickCategoryInterval:n})}(t,e):{ticks:t.scale.getTicks()}}function Dg(t,e){var i,n=Cg(t,"labels"),o=ag(e),a=Lg(n,o);return a||kg(n,o,{labels:O(o)?Ng(t,o):Pg(t,i="auto"===o?function(t){var e=Ig(t).autoInterval;return null!=e?e:Ig(t).autoInterval=t.calculateCategoryInterval()}(t):o),labelCategoryInterval:i})}function Cg(t,e){return Ig(t)[e]||(Ig(t)[e]=[])}function Lg(t,e){for(var i=0;i<t.length;i++)if(t[i].key===e)return t[i].value}function kg(t,e,i){return t.push({key:e,value:i}),i}function Pg(t,e,i){var n=ng(t),o=t.scale,a=o.getExtent(),r=t.getLabelModel(),s=[],l=Math.max((e||0)+1,1),u=a[0],h=o.count();0!==u&&1<l&&2<h/l&&(u=Math.round(Math.ceil(u/l)*l));var c=rg(t),d=r.get("showMinLabel")||c,f=r.get("showMaxLabel")||c;d&&u!==a[0]&&g(a[0]);for(var p=u;p<=a[1];p+=l)g(p);function g(t){s.push(i?t:{formattedLabel:n(t),rawLabel:o.getLabel(t),tickValue:t})}return f&&p-l!==a[1]&&g(a[1]),s}function Ng(t,i,n){var o=t.scale,a=ng(t),r=[];return E(o.getTicks(),function(t){var e=o.getLabel(t);i(t,e)&&r.push(n?t:{formattedLabel:a(t),rawLabel:e,tickValue:t})}),r}var Og=[0,1],Eg=function(t,e,i){this.dim=t,this.scale=e,this._extent=i||[0,0],this.inverse=!1,this.onBand=!1};function zg(t,e){var i=(t[1]-t[0])/e/2;t[0]+=i,t[1]-=i}Eg.prototype={constructor:Eg,contain:function(t){var e=this._extent,i=Math.min(e[0],e[1]),n=Math.max(e[0],e[1]);return i<=t&&t<=n},containData:function(t){return this.scale.contain(t)},getExtent:function(){return this._extent.slice()},getPixelPrecision:function(t){return Rl(t||this.scale.getExtent(),this._extent)},setExtent:function(t,e){var i=this._extent;i[0]=t,i[1]=e},dataToCoord:function(t,e){var i=this._extent,n=this.scale;return t=n.normalize(t),this.onBand&&"ordinal"===n.type&&zg(i=i.slice(),n.count()),kl(t,Og,i,e)},coordToData:function(t,e){var i=this._extent,n=this.scale;this.onBand&&"ordinal"===n.type&&zg(i=i.slice(),n.count());var o=kl(t,i,Og,e);return this.scale.scale(o)},pointToData:function(t,e){},getTicksCoords:function(t){var e=(t=t||{}).tickModel||this.getTickModel(),i=N(Ag(this,e).ticks,function(t){return{coord:this.dataToCoord(t),tickValue:t}},this);return function(t,e,i,n){var o=e.length;if(!t.onBand||i||!o)return;var a,r,s=t.getExtent();if(1===o)e[0].coord=s[0],a=e[1]={coord:s[0]};else{var l=e[o-1].tickValue-e[0].tickValue,u=(e[o-1].coord-e[0].coord)/l;E(e,function(t){t.coord-=u/2});var h=t.scale.getExtent();r=1+h[1]-e[o-1].tickValue,a={coord:e[o-1].coord+u*r},e.push(a)}var c=s[0]>s[1];d(e[0].coord,s[0])&&(n?e[0].coord=s[0]:e.shift());n&&d(s[0],e[0].coord)&&e.unshift({coord:s[0]});d(s[1],a.coord)&&(n?a.coord=s[1]:e.pop());n&&d(a.coord,s[1])&&e.push({coord:s[1]});function d(t,e){return t=Nl(t),e=Nl(e),c?e<t:t<e}}(this,i,e.get("alignWithLabel"),t.clamp),i},getMinorTicksCoords:function(){if("ordinal"===this.scale.type)return[];var t=this.model.getModel("minorTick").get("splitNumber");return 0<t&&t<100||(t=5),N(this.scale.getMinorTicks(t),function(t){return N(t,function(t){return{coord:this.dataToCoord(t),tickValue:t}},this)},this)},getViewLabels:function(){return Tg(this).labels},getLabelModel:function(){return this.model.getModel("axisLabel")},getTickModel:function(){return this.model.getModel("axisTick")},getBandWidth:function(){var t=this._extent,e=this.scale.getExtent(),i=e[1]-e[0]+(this.onBand?1:0);0===i&&(i=1);var n=Math.abs(t[1]-t[0]);return Math.abs(n)/i},isHorizontal:null,getRotate:null,calculateCategoryInterval:function(){return function(t){var e=function(t){var e=t.getLabelModel();return{axisRotate:t.getRotate?t.getRotate():t.isHorizontal&&!t.isHorizontal()?90:0,labelRotate:e.get("rotate")||0,font:e.getFont()}}(t),i=ng(t),n=(e.axisRotate-e.labelRotate)/180*Math.PI,o=t.scale,a=o.getExtent(),r=o.count();if(a[1]-a[0]<1)return 0;var s=1;40<r&&(s=Math.max(1,Math.floor(r/40)));for(var l=a[0],u=t.dataToCoord(l+1)-t.dataToCoord(l),h=Math.abs(u*Math.cos(n)),c=Math.abs(u*Math.sin(n)),d=0,f=0;l<=a[1];l+=s){var p,g,m=cn(i(l),e.font,"center","top");p=1.3*m.width,g=1.3*m.height,d=Math.max(d,p,7),f=Math.max(f,g,7)}var v=d/h,y=f/c;isNaN(v)&&(v=1/0),isNaN(y)&&(y=1/0);var x=Math.max(0,Math.floor(Math.min(v,y))),_=Ig(t.model),w=t.getExtent(),b=_.lastAutoInterval,S=_.lastTickCount;return null!=b&&null!=S&&Math.abs(b-x)<=1&&Math.abs(S-r)<=1&&x<b&&_.axisExtend0===w[0]&&_.axisExtend1===w[1]?x=b:(_.lastTickCount=r,_.lastAutoInterval=x,_.axisExtend0=w[0],_.axisExtend1=w[1]),x}(this)}};var Rg=Mg,Bg={};E(["map","each","filter","indexOf","inherits","reduce","filter","bind","curry","isArray","isString","isObject","isFunction","extend","defaults","clone","merge"],function(t){Bg[t]=it[t]});var Vg={};function Gg(t,e){var i=t.mapDimension("defaultedLabel",!0),n=i.length;if(1===n)return Bh(t,e,i[0]);if(n){for(var o=[],a=0;a<i.length;a++){var r=Bh(t,e,i[a]);o.push(r)}return o.join(" ")}}function Fg(t,e,i){Ii.call(this),this.updateData(t,e,i)}E(["extendShape","extendPath","makePath","makeImage","mergePath","resizePath","createIcon","setHoverStyle","setLabelStyle","setTextStyle","setText","getFont","updateProps","initProps","getTransform","clipPointsByRect","clipRectByRect","registerShape","getShapeClass","Group","Image","Text","Circle","Sector","Ring","Polygon","Polyline","Rect","Line","BezierCurve","Arc","IncrementalDisplayable","CompoundPath","LinearGradient","RadialGradient","BoundingRect"],function(t){Vg[t]=yl[t]}),ic.extend({type:"series.line",dependencies:["grid","polar"],getInitialData:function(t,e){return hp(this.getSource(),this,{useEncodeDefaulter:!0})},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,clip:!0,label:{position:"top"},lineStyle:{width:2,type:"solid"},step:!1,smooth:!1,smoothMonotone:null,symbol:"emptyCircle",symbolSize:4,symbolRotate:null,showSymbol:!0,showAllSymbol:"auto",connectNulls:!1,sampling:"none",animationEasing:"linear",progressive:0,hoverLayerThreshold:1/0}});var Wg=Fg.prototype,Hg=Fg.getSymbolSize=function(t,e){var i=t.getItemVisual(e,"symbolSize");return i instanceof Array?i.slice():[+i,+i]};function Zg(t){return[t[0]/2,t[1]/2]}function Ug(t,e){this.parent.drift(t,e)}Wg._createSymbol=function(t,e,i,n,o){this.removeAll();var a=mg(t,-1,-1,2,2,e.getItemVisual(i,"color"),o);a.attr({z2:100,culling:!0,scale:Zg(n)}),a.drift=Ug,this._symbolType=t,this.add(a)},Wg.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(t)},Wg.getSymbolPath=function(){return this.childAt(0)},Wg.getScale=function(){return this.childAt(0).scale},Wg.highlight=function(){this.childAt(0).trigger("emphasis")},Wg.downplay=function(){this.childAt(0).trigger("normal")},Wg.setZ=function(t,e){var i=this.childAt(0);i.zlevel=t,i.z=e},Wg.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":e.cursor},Wg.updateData=function(t,e,i){this.silent=!1;var n=t.getItemVisual(e,"symbol")||"circle",o=t.hostModel,a=Hg(t,e),r=n!==this._symbolType;if(r){var s=t.getItemVisual(e,"symbolKeepAspect");this._createSymbol(n,t,e,a,s)}else{(l=this.childAt(0)).silent=!1,sl(l,{scale:Zg(a)},o,e)}if(this._updateCommon(t,e,a,i),r){var l=this.childAt(0),u=i&&i.fadeIn,h={scale:l.scale.slice()};u&&(h.style={opacity:l.style.opacity}),l.scale=[0,0],u&&(l.style.opacity=0),ll(l,h,o,e)}this._seriesModel=o};var Xg=["itemStyle"],Yg=["emphasis","itemStyle"],jg=["label"],qg=["emphasis","label"];function Kg(t,e){if(!this.incremental&&!this.useHoverLayer)if("emphasis"===e){var i=this.__symbolOriginalScale,n=i[1]/i[0],o={scale:[Math.max(1.1*i[0],i[0]+3),Math.max(1.1*i[1],i[1]+3*n)]};this.animateTo(o,400,"elasticOut")}else"normal"===e&&this.animateTo({scale:this.__symbolOriginalScale},400,"elasticOut")}function $g(t){this.group=new Ii,this._symbolCtor=t||Fg}Wg._updateCommon=function(i,t,e,n){var o=this.childAt(0),a=i.hostModel,r=i.getItemVisual(t,"color");"image"!==o.type?o.useStyle({strokeNoScale:!0}):o.setStyle({opacity:null,shadowBlur:null,shadowOffsetX:null,shadowOffsetY:null,shadowColor:null});var s=n&&n.itemStyle,l=n&&n.hoverItemStyle,u=n&&n.symbolRotate,h=n&&n.symbolOffset,c=n&&n.labelModel,d=n&&n.hoverLabelModel,f=n&&n.hoverAnimation,p=n&&n.cursorStyle;if(!n||i.hasItemOption){var g=n&&n.itemModel?n.itemModel:i.getItemModel(t);s=g.getModel(Xg).getItemStyle(["color"]),l=g.getModel(Yg).getItemStyle(),u=g.getShallow("symbolRotate"),h=g.getShallow("symbolOffset"),c=g.getModel(jg),d=g.getModel(qg),f=g.getShallow("hoverAnimation"),p=g.getShallow("cursor")}else l=L({},l);var m=o.style;o.attr("rotation",(u||0)*Math.PI/180||0),h&&o.attr("position",[Pl(h[0],e[0]),Pl(h[1],e[1])]),p&&o.attr("cursor",p),o.setColor(r,n&&n.symbolInnerColor),o.setStyle(s);var v=i.getItemVisual(t,"opacity");null!=v&&(m.opacity=v);var y=i.getItemVisual(t,"liftZ"),x=o.__z2Origin;null!=y?null==x&&(o.__z2Origin=o.z2,o.z2+=y):null!=x&&(o.z2=x,o.__z2Origin=null);var _=n&&n.useNameLabel;$s(m,l,c,d,{labelFetcher:a,labelDataIndex:t,defaultText:function(t,e){return _?i.getName(t):Gg(i,t)},isRectText:!0,autoColor:r}),o.__symbolOriginalScale=Zg(e),o.hoverStyle=l,o.highDownOnUpdate=f&&a.isAnimationEnabled()?Kg:null,Ys(o)},Wg.fadeOut=function(t,e){var i=this.childAt(0);this.silent=i.silent=!0,e&&e.keepLabel||(i.style.text=null),sl(i,{style:{opacity:0},scale:[0,0]},this._seriesModel,this.dataIndex,t)},w(Fg,Ii);var Jg=$g.prototype;function Qg(t,e,i,n){return e&&!isNaN(e[0])&&!isNaN(e[1])&&!(n.isIgnore&&n.isIgnore(i))&&!(n.clipShape&&!n.clipShape.contain(e[0],e[1]))&&"none"!==t.getItemVisual(i,"symbol")}function tm(t){return null==t||R(t)||(t={isIgnore:t}),t||{}}function em(t){var e=t.hostModel;return{itemStyle:e.getModel("itemStyle").getItemStyle(["color"]),hoverItemStyle:e.getModel("emphasis.itemStyle").getItemStyle(),symbolRotate:e.get("symbolRotate"),symbolOffset:e.get("symbolOffset"),hoverAnimation:e.get("hoverAnimation"),labelModel:e.getModel("label"),hoverLabelModel:e.getModel("emphasis.label"),cursorStyle:e.get("cursor")}}function im(t,e,i){var n,o=t.getBaseAxis(),a=t.getOtherAxis(o),r=function(t,e){var i=0,n=t.scale.getExtent();"start"===e?i=n[0]:"end"===e?i=n[1]:0<n[0]?i=n[0]:n[1]<0&&(i=n[1]);return i}(a,i),s=o.dim,l=a.dim,u=e.mapDimension(l),h=e.mapDimension(s),c="x"===l||"radius"===l?1:0,d=N(t.dimensions,function(t){return e.mapDimension(t)}),f=e.getCalculationInfo("stackResultDimension");return(n|=lp(e,d[0]))&&(d[0]=f),(n|=lp(e,d[1]))&&(d[1]=f),{dataDimsForPoint:d,valueStart:r,valueAxisDim:l,baseAxisDim:s,stacked:!!n,valueDim:u,baseDim:h,baseDataOffset:c,stackedOverDimension:e.getCalculationInfo("stackedOverDimension")}}function nm(t,e,i,n){var o=NaN;t.stacked&&(o=i.get(i.getCalculationInfo("stackedOverDimension"),n)),isNaN(o)&&(o=t.valueStart);var a=t.baseDataOffset,r=[];return r[a]=i.get(t.baseDim,n),r[1-a]=o,e.dataToPoint(r)}Jg.updateData=function(o,a){a=tm(a);var r=this.group,s=o.hostModel,l=this._data,u=this._symbolCtor,h=em(o);l||r.removeAll(),o.diff(l).add(function(t){var e=o.getItemLayout(t);if(Qg(o,e,t,a)){var i=new u(o,t,h);i.attr("position",e),o.setItemGraphicEl(t,i),r.add(i)}}).update(function(t,e){var i=l.getItemGraphicEl(e),n=o.getItemLayout(t);Qg(o,n,t,a)?(i?(i.updateData(o,t,h),sl(i,{position:n},s)):(i=new u(o,t)).attr("position",n),r.add(i),o.setItemGraphicEl(t,i)):r.remove(i)}).remove(function(t){var e=l.getItemGraphicEl(t);e&&e.fadeOut(function(){r.remove(e)})}).execute(),this._data=o},Jg.isPersistent=function(){return!0},Jg.updateLayout=function(){var n=this._data;n&&n.eachItemGraphicEl(function(t,e){var i=n.getItemLayout(e);t.attr("position",i)})},Jg.incrementalPrepareUpdate=function(t){this._seriesScope=em(t),this._data=null,this.group.removeAll()},Jg.incrementalUpdate=function(t,e,i){function n(t){t.isGroup||(t.incremental=t.useHoverLayer=!0)}i=tm(i);for(var o=t.start;o<t.end;o++){var a=e.getItemLayout(o);if(Qg(e,a,o,i)){var r=new this._symbolCtor(e,o,this._seriesScope);r.traverse(n),r.attr("position",a),this.group.add(r),e.setItemGraphicEl(o,r)}}},Jg.remove=function(t){var e=this.group,i=this._data;i&&t?i.eachItemGraphicEl(function(t){t.fadeOut(function(){e.remove(t)})}):e.removeAll()};var om=St,am=Mt,rm=ut,sm=at,lm=[],um=[],hm=[];function cm(t){return isNaN(t[0])||isNaN(t[1])}function dm(t,e,i,n,o,a,r,s,l,u){return"none"!==u&&u?function(t,e,i,n,o,a,r,s,l,u,h){for(var c=0,d=i,f=0;f<n;f++){var p=e[d];if(o<=d||d<0)break;if(cm(p)){if(h){d+=a;continue}break}if(d===i)t[0<a?"moveTo":"lineTo"](p[0],p[1]);else if(0<l){var g=e[c],m="y"===u?1:0,v=(p[m]-g[m])*l;sm(um,g),um[m]=g[m]+v,sm(hm,p),hm[m]=p[m]-v,t.bezierCurveTo(um[0],um[1],hm[0],hm[1],p[0],p[1])}else t.lineTo(p[0],p[1]);c=d,d+=a}return f}.apply(this,arguments):function(t,e,i,n,o,a,r,s,l,u,h){for(var c=0,d=i,f=0;f<n;f++){var p=e[d];if(o<=d||d<0)break;if(cm(p)){if(h){d+=a;continue}break}if(d===i)t[0<a?"moveTo":"lineTo"](p[0],p[1]),sm(um,p);else if(0<l){var g=d+a,m=e[g];if(h)for(;m&&cm(e[g]);)m=e[g+=a];var v=.5,y=e[c];if(!(m=e[g])||cm(m))sm(hm,p);else{var x,_;if(cm(m)&&!h&&(m=p),ht(lm,m,y),"x"===u||"y"===u){var w="x"===u?0:1;x=Math.abs(p[w]-y[w]),_=Math.abs(p[w]-m[w])}else x=yt(p,y),_=yt(p,m);rm(hm,p,lm,-l*(1-(v=_/(_+x))))}om(um,um,s),am(um,um,r),om(hm,hm,s),am(hm,hm,r),t.bezierCurveTo(um[0],um[1],hm[0],hm[1],p[0],p[1]),rm(um,p,lm,l*v)}else t.lineTo(p[0],p[1]);c=d,d+=a}return f}.apply(this,arguments)}function fm(t,e){var i=[1/0,1/0],n=[-1/0,-1/0];if(e)for(var o=0;o<t.length;o++){var a=t[o];a[0]<i[0]&&(i[0]=a[0]),a[1]<i[1]&&(i[1]=a[1]),a[0]>n[0]&&(n[0]=a[0]),a[1]>n[1]&&(n[1]=a[1])}return{min:e?i:n,max:e?n:i}}var pm=Sr.extend({type:"ec-polyline",shape:{points:[],smooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},style:{fill:null,stroke:"#000"},brush:Wr(Sr.prototype.brush),buildPath:function(t,e){var i=e.points,n=0,o=i.length,a=fm(i,e.smoothConstraint);if(e.connectNulls){for(;0<o&&cm(i[o-1]);o--);for(;n<o&&cm(i[n]);n++);}for(;n<o;)n+=dm(t,i,n,o,o,1,a.min,a.max,e.smooth,e.smoothMonotone,e.connectNulls)+1}}),gm=Sr.extend({type:"ec-polygon",shape:{points:[],stackedOnPoints:[],smooth:0,stackedOnSmooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},brush:Wr(Sr.prototype.brush),buildPath:function(t,e){var i=e.points,n=e.stackedOnPoints,o=0,a=i.length,r=e.smoothMonotone,s=fm(i,e.smoothConstraint),l=fm(n,e.smoothConstraint);if(e.connectNulls){for(;0<a&&cm(i[a-1]);a--);for(;o<a&&cm(i[o]);o++);}for(;o<a;){var u=dm(t,i,o,a,a,1,s.min,s.max,e.smooth,r,e.connectNulls);dm(t,n,o+u-1,u,a,-1,l.min,l.max,e.stackedOnSmooth,r,e.connectNulls),o+=u+1,t.closePath()}}});function mm(t,e,i){var n=t.getArea(),o=t.getBaseAxis().isHorizontal(),a=n.x,r=n.y,s=n.width,l=n.height,u=i.get("lineStyle.width")||2,h=new is({shape:{x:a-=u/2,y:r-=u/2,width:s+=u,height:l+=u}});return e&&(h.shape[o?"width":"height"]=0,ll(h,{shape:{width:s,height:l}},i)),h}function vm(t,e,i){var n=t.getArea(),o=new Ur({shape:{cx:Nl(t.cx,1),cy:Nl(t.cy,1),r0:Nl(n.r0,1),r:Nl(n.r,1),startAngle:n.startAngle,endAngle:n.endAngle,clockwise:n.clockwise}});return e&&(o.shape.endAngle=n.startAngle,ll(o,{shape:{endAngle:n.endAngle}},i)),o}function ym(t,e,i){return t?"polar"===t.type?vm(t,e,i):"cartesian2d"===t.type?mm(t,e,i):null:null}function xm(t,e){if(t.length===e.length){for(var i=0;i<t.length;i++){var n=t[i],o=e[i];if(n[0]!==o[0]||n[1]!==o[1])return}return!0}}function _m(t){return"number"==typeof t?t:t?.5:0}function wm(t,e,i){for(var n=e.getBaseAxis(),o="x"===n.dim||"radius"===n.dim?0:1,a=[],r=0;r<t.length-1;r++){var s=t[r+1],l=t[r];a.push(l);var u=[];switch(i){case"end":u[o]=s[o],u[1-o]=l[1-o],a.push(u);break;case"middle":var h=(l[o]+s[o])/2,c=[];u[o]=c[o]=h,u[1-o]=l[1-o],c[1-o]=s[1-o],a.push(u),a.push(c);break;default:u[o]=l[o],u[1-o]=s[1-o],a.push(u)}}return t[r]&&a.push(t[r]),a}function bm(t,e,i){var n=t.get("showAllSymbol"),o="auto"===n;if(!n||o){var a=i.getAxesByScale("ordinal")[0];if(a&&(!o||!function(t,e){var i=t.getExtent(),n=Math.abs(i[1]-i[0])/t.scale.count();isNaN(n)&&(n=0);for(var o=e.count(),a=Math.max(1,Math.round(o/5)),r=0;r<o;r+=a)if(1.5*Fg.getSymbolSize(e,r)[t.isHorizontal()?1:0]>n)return!1;return!0}(a,e))){var r=e.mapDimension(a.dim),s={};return E(a.getViewLabels(),function(t){s[t.tickValue]=1}),function(t){return!s.hasOwnProperty(e.get(r,t))}}}}function Sm(t,e,i){if("cartesian2d"!==t.type)return vm(t,e,i);var n=t.getBaseAxis().isHorizontal(),o=mm(t,e,i);if(!i.get("clip",!0)){var a=o.shape,r=Math.max(a.width,a.height);n?(a.y-=r,a.height+=2*r):(a.x-=r,a.width+=2*r)}return o}gc.extend({type:"line",init:function(){var t=new Ii,e=new $g;this.group.add(e.group),this._symbolDraw=e,this._lineGroup=t},render:function(t,e,i){var n=t.coordinateSystem,o=this.group,a=t.getData(),r=t.getModel("lineStyle"),s=t.getModel("areaStyle"),l=a.mapArray(a.getItemLayout),u="polar"===n.type,h=this._coordSys,c=this._symbolDraw,d=this._polyline,f=this._polygon,p=this._lineGroup,g=t.get("animation"),m=!s.isEmpty(),v=s.get("origin"),y=function(t,e,i){if(!i.valueDim)return[];for(var n=[],o=0,a=e.count();o<a;o++)n.push(nm(i,t,e,o));return n}(n,a,im(n,a,v)),x=t.get("showSymbol"),_=x&&!u&&bm(t,a,n),w=this._data;w&&w.eachItemGraphicEl(function(t,e){t.__temp&&(o.remove(t),w.setItemGraphicEl(e,null))}),x||c.remove(),o.add(p);var b,S=!u&&t.get("step");n&&n.getArea&&t.get("clip",!0)&&(null!=(b=n.getArea()).width?(b.x-=.1,b.y-=.1,b.width+=.2,b.height+=.2):b.r0&&(b.r0-=.5,b.r1+=.5)),this._clipShapeForSymbol=b,d&&h.type===n.type&&S===this._step?(m&&!f?f=this._newPolygon(l,y,n,g):f&&!m&&(p.remove(f),f=this._polygon=null),p.setClipPath(Sm(n,!1,t)),x&&c.updateData(a,{isIgnore:_,clipShape:b}),a.eachItemGraphicEl(function(t){t.stopAnimation(!0)}),xm(this._stackedOnPoints,y)&&xm(this._points,l)||(g?this._updateAnimation(a,y,n,i,S,v):(S&&(l=wm(l,n,S),y=wm(y,n,S)),d.setShape({points:l}),f&&f.setShape({points:l,stackedOnPoints:y})))):(x&&c.updateData(a,{isIgnore:_,clipShape:b}),S&&(l=wm(l,n,S),y=wm(y,n,S)),d=this._newPolyline(l,n,g),m&&(f=this._newPolygon(l,y,n,g)),p.setClipPath(Sm(n,!0,t)));var M=function(t,e){var i=t.getVisual("visualMeta");if(i&&i.length&&t.count()&&"cartesian2d"===e.type){for(var n,o,a=i.length-1;0<=a;a--){var r=i[a].dimension,s=t.dimensions[r],l=t.getDimensionInfo(s);if("x"===(n=l&&l.coordDim)||"y"===n){o=i[a];break}}if(o){var u=e.getAxis(n),h=N(o.stops,function(t){return{coord:u.toGlobalCoord(u.dataToCoord(t.value)),color:t.color}}),c=h.length,d=o.outerColors.slice();c&&h[0].coord>h[c-1].coord&&(h.reverse(),d.reverse());var f=h[0].coord-10,p=h[c-1].coord+10,g=p-f;if(g<.001)return"transparent";E(h,function(t){t.offset=(t.coord-f)/g}),h.push({offset:c?h[c-1].offset:.5,color:d[1]||"transparent"}),h.unshift({offset:c?h[0].offset:.5,color:d[0]||"transparent"});var m=new cs(0,0,0,0,h,!0);return m[n]=f,m[n+"2"]=p,m}}}(a,n)||a.getVisual("color");d.useStyle(C(r.getLineStyle(),{fill:"none",stroke:M,lineJoin:"bevel"}));var I=t.get("smooth");if(I=_m(t.get("smooth")),d.setShape({smooth:I,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")}),f){var T=a.getCalculationInfo("stackedOnSeries"),A=0;f.useStyle(C(s.getAreaStyle(),{fill:M,opacity:.7,lineJoin:"bevel"})),T&&(A=_m(T.get("smooth"))),f.setShape({smooth:I,stackedOnSmooth:A,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")})}this._data=a,this._coordSys=n,this._stackedOnPoints=y,this._points=l,this._step=S,this._valueOrigin=v},dispose:function(){},highlight:function(t,e,i,n){var o=t.getData(),a=Ho(o,n);if(!(a instanceof Array)&&null!=a&&0<=a){var r=o.getItemGraphicEl(a);if(!r){var s=o.getItemLayout(a);if(!s)return;if(this._clipShapeForSymbol&&!this._clipShapeForSymbol.contain(s[0],s[1]))return;(r=new Fg(o,a)).position=s,r.setZ(t.get("zlevel"),t.get("z")),r.ignore=isNaN(s[0])||isNaN(s[1]),r.__temp=!0,o.setItemGraphicEl(a,r),r.stopSymbolAnimation(!0),this.group.add(r)}r.highlight()}else gc.prototype.highlight.call(this,t,e,i,n)},downplay:function(t,e,i,n){var o=t.getData(),a=Ho(o,n);if(null!=a&&0<=a){var r=o.getItemGraphicEl(a);r&&(r.__temp?(o.setItemGraphicEl(a,null),this.group.remove(r)):r.downplay())}else gc.prototype.downplay.call(this,t,e,i,n)},_newPolyline:function(t){var e=this._polyline;return e&&this._lineGroup.remove(e),e=new pm({shape:{points:t},silent:!0,z2:10}),this._lineGroup.add(e),this._polyline=e},_newPolygon:function(t,e){var i=this._polygon;return i&&this._lineGroup.remove(i),i=new gm({shape:{points:t,stackedOnPoints:e},silent:!0}),this._lineGroup.add(i),this._polygon=i},_updateAnimation:function(t,e,i,n,o,a){var r=this._polyline,s=this._polygon,l=t.hostModel,u=function(t,e,i,n,o,a,r,s){for(var l=function(t,e){var i=[];return e.diff(t).add(function(t){i.push({cmd:"+",idx:t})}).update(function(t,e){i.push({cmd:"=",idx:e,idx1:t})}).remove(function(t){i.push({cmd:"-",idx:t})}).execute(),i}(t,e),u=[],h=[],c=[],d=[],f=[],p=[],g=[],m=im(o,e,r),v=im(a,t,s),y=0;y<l.length;y++){var x=l[y],_=!0;switch(x.cmd){case"=":var w=t.getItemLayout(x.idx),b=e.getItemLayout(x.idx1);(isNaN(w[0])||isNaN(w[1]))&&(w=b.slice()),u.push(w),h.push(b),c.push(i[x.idx]),d.push(n[x.idx1]),g.push(e.getRawIndex(x.idx1));break;case"+":var S=x.idx;u.push(o.dataToPoint([e.get(m.dataDimsForPoint[0],S),e.get(m.dataDimsForPoint[1],S)])),h.push(e.getItemLayout(S).slice()),c.push(nm(m,o,e,S)),d.push(n[S]),g.push(e.getRawIndex(S));break;case"-":S=x.idx;var M=t.getRawIndex(S);M!==S?(u.push(t.getItemLayout(S)),h.push(a.dataToPoint([t.get(v.dataDimsForPoint[0],S),t.get(v.dataDimsForPoint[1],S)])),c.push(i[S]),d.push(nm(v,a,t,S)),g.push(M)):_=!1}_&&(f.push(x),p.push(p.length))}p.sort(function(t,e){return g[t]-g[e]});var I=[],T=[],A=[],D=[],C=[];for(y=0;y<p.length;y++){S=p[y];I[y]=u[S],T[y]=h[S],A[y]=c[S],D[y]=d[S],C[y]=f[S]}return{current:I,next:T,stackedOnCurrent:A,stackedOnNext:D,status:C}}(this._data,t,this._stackedOnPoints,e,this._coordSys,i,this._valueOrigin,a),h=u.current,c=u.stackedOnCurrent,d=u.next,f=u.stackedOnNext;o&&(h=wm(u.current,i,o),c=wm(u.stackedOnCurrent,i,o),d=wm(u.next,i,o),f=wm(u.stackedOnNext,i,o)),r.shape.__points=u.current,r.shape.points=h,sl(r,{shape:{points:d}},l),s&&(s.setShape({points:h,stackedOnPoints:c}),sl(s,{shape:{points:d,stackedOnPoints:f}},l));for(var p=[],g=u.status,m=0;m<g.length;m++){if("="===g[m].cmd){var v=t.getItemGraphicEl(g[m].idx1);v&&p.push({el:v,ptIdx:m})}}r.animators&&r.animators.length&&r.animators[0].during(function(){for(var t=0;t<p.length;t++){p[t].el.attr("position",r.shape.__points[p[t].ptIdx])}})},remove:function(t){var i=this.group,n=this._data;this._lineGroup.removeAll(),this._symbolDraw.remove(!0),n&&n.eachItemGraphicEl(function(t,e){t.__temp&&(i.remove(t),n.setItemGraphicEl(e,null))}),this._polyline=this._polygon=this._coordSys=this._points=this._stackedOnPoints=this._data=null}});function Mm(t,r,s){return{seriesType:t,performRawSeries:!0,reset:function(l,t,e){var i=l.getData(),u=l.get("symbol"),h=l.get("symbolSize"),n=l.get("symbolKeepAspect"),c=O(u),d=O(h),f=c||d,o=!c&&u?u:r,a=d?null:h;if(i.setVisual({legendSymbol:s||o,symbol:o,symbolSize:a,symbolKeepAspect:n}),!t.isSeriesFiltered(l))return{dataEach:i.hasItemOption||f?function(t,e){if(f){var i=l.getRawValue(e),n=l.getDataParams(e);c&&t.setItemVisual(e,"symbol",u(i,n)),d&&t.setItemVisual(e,"symbolSize",h(i,n))}if(t.hasItemOption){var o=t.getItemModel(e),a=o.getShallow("symbol",!0),r=o.getShallow("symbolSize",!0),s=o.getShallow("symbolKeepAspect",!0);null!=a&&t.setItemVisual(e,"symbol",a),null!=r&&t.setItemVisual(e,"symbolSize",r),null!=s&&t.setItemVisual(e,"symbolKeepAspect",s)}}:null}}}}function Im(t){return{seriesType:t,plan:dc(),reset:function(t){var e=t.getData(),c=t.coordinateSystem,d=t.pipelineContext.large;if(c){var f=N(c.dimensions,function(t){return e.mapDimension(t)}).slice(0,2),p=f.length,i=e.getCalculationInfo("stackResultDimension");return lp(e,f[0])&&(f[0]=i),lp(e,f[1])&&(f[1]=i),p&&{progress:function(t,e){for(var i=t.end-t.start,n=d&&new Float32Array(i*p),o=t.start,a=0,r=[],s=[];o<t.end;o++){var l;if(1===p){var u=e.get(f[0],o);l=!isNaN(u)&&c.dataToPoint(u,null,s)}else{u=r[0]=e.get(f[0],o);var h=r[1]=e.get(f[1],o);l=!isNaN(u)&&!isNaN(h)&&c.dataToPoint(r,null,s)}d?(n[a++]=l?l[0]:NaN,n[a++]=l?l[1]:NaN):e.setItemLayout(o,l&&l.slice()||[NaN,NaN])}d&&e.setLayout("symbolPoints",n)}}}}}}function Tm(t,e){return Math.round(t.length/2)}var Am={average:function(t){for(var e=0,i=0,n=0;n<t.length;n++)isNaN(t[n])||(e+=t[n],i++);return 0===i?NaN:e/i},sum:function(t){for(var e=0,i=0;i<t.length;i++)e+=t[i]||0;return e},max:function(t){for(var e=-1/0,i=0;i<t.length;i++)t[i]>e&&(e=t[i]);return isFinite(e)?e:NaN},min:function(t){for(var e=1/0,i=0;i<t.length;i++)t[i]<e&&(e=t[i]);return isFinite(e)?e:NaN},nearest:function(t){return t[0]}};function Dm(t){return this._axes[t]}function Cm(t){this._axes={},this._dimList=[],this.name=t||""}function Lm(t){Cm.call(this,t)}Cm.prototype={constructor:Cm,type:"cartesian",getAxis:function(t){return this._axes[t]},getAxes:function(){return N(this._dimList,Dm,this)},getAxesByScale:function(e){return e=e.toLowerCase(),M(this.getAxes(),function(t){return t.scale.type===e})},addAxis:function(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e)},dataToCoord:function(t){return this._dataCoordConvert(t,"dataToCoord")},coordToData:function(t){return this._dataCoordConvert(t,"coordToData")},_dataCoordConvert:function(t,e){for(var i=this._dimList,n=t instanceof Array?[]:{},o=0;o<i.length;o++){var a=i[o],r=this._axes[a];n[a]=r[e](t[a])}return n}},Lm.prototype={constructor:Lm,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x")},containPoint:function(t){var e=this.getAxis("x"),i=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&i.contain(i.toLocalCoord(t[1]))},containData:function(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1])},dataToPoint:function(t,e,i){var n=this.getAxis("x"),o=this.getAxis("y");return(i=i||[])[0]=n.toGlobalCoord(n.dataToCoord(t[0])),i[1]=o.toGlobalCoord(o.dataToCoord(t[1])),i},clampData:function(t,e){var i=this.getAxis("x").scale,n=this.getAxis("y").scale,o=i.getExtent(),a=n.getExtent(),r=i.parse(t[0]),s=n.parse(t[1]);return(e=e||[])[0]=Math.min(Math.max(Math.min(o[0],o[1]),r),Math.max(o[0],o[1])),e[1]=Math.min(Math.max(Math.min(a[0],a[1]),s),Math.max(a[0],a[1])),e},pointToData:function(t,e){var i=this.getAxis("x"),n=this.getAxis("y");return(e=e||[])[0]=i.coordToData(i.toLocalCoord(t[0])),e[1]=n.coordToData(n.toLocalCoord(t[1])),e},getOtherAxis:function(t){return this.getAxis("x"===t.dim?"y":"x")},getArea:function(){var t=this.getAxis("x").getGlobalExtent(),e=this.getAxis("y").getGlobalExtent(),i=Math.min(t[0],t[1]),n=Math.min(e[0],e[1]);return new Mi(i,n,Math.max(t[0],t[1])-i,Math.max(e[0],e[1])-n)}},w(Lm,Cm);function km(t,e,i,n,o){Eg.call(this,t,e,i),this.type=n||"value",this.position=o||"bottom"}km.prototype={constructor:km,index:0,getAxesOnZeroOf:null,model:null,isHorizontal:function(){var t=this.position;return"top"===t||"bottom"===t},getGlobalExtent:function(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e},getOtherAxis:function(){this.grid.getOtherAxis()},pointToData:function(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e)},toLocalCoord:null,toGlobalCoord:null},w(km,Eg);var Pm={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},Nm={};Nm.categoryAxis=m({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},Pm),Nm.valueAxis=m({boundaryGap:[0,0],splitNumber:5,minorTick:{show:!1,splitNumber:5,length:3,lineStyle:{}},minorSplitLine:{show:!1,lineStyle:{color:"#eee",width:1}}},Pm),Nm.timeAxis=C({scale:!0,min:"dataMin",max:"dataMax"},Nm.valueAxis),Nm.logAxis=C({scale:!0,logBase:10},Nm.valueAxis);function Om(a,t,r,e){E(Em,function(o){t.extend({type:a+"Axis."+o,mergeDefaultAndTheme:function(t,e){var i=this.layoutMode,n=i?_u(t):{};m(t,e.getTheme().get(o+"Axis")),m(t,this.getDefaultOption()),t.type=r(a,t),i&&xu(t,n,i)},optionUpdated:function(){"category"===this.option.type&&(this.__ordinalMeta=dp.createByAxisModel(this))},getCategories:function(t){var e=this.option;if("category"===e.type)return t?e.data:this.__ordinalMeta.categories},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:p([{},Nm[o+"Axis"],e],!0)})}),Tu.registerSubTypeDefaulter(a+"Axis",T(r,a))}var Em=["value","category","time","log"],zm=Tu.extend({type:"cartesian2dAxis",axis:null,init:function(){zm.superApply(this,"init",arguments),this.resetRange()},mergeOption:function(){zm.superApply(this,"mergeOption",arguments),this.resetRange()},restoreData:function(){zm.superApply(this,"restoreData",arguments),this.resetRange()},getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0]}});function Rm(t,e){return e.type||(e.data?"category":"value")}m(zm.prototype,sg);var Bm={offset:0};function Vm(t,e){return t.getCoordSysModel()===e}function Gm(t,e,i){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,i),this.model=t}Om("x",zm,Rm,Bm),Om("y",zm,Rm,Bm),Tu.extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});var Fm=Gm.prototype;function Wm(t,e,i,n){i.getAxesOnZeroOf=function(){return o?[o]:[]};var o,a=t[e],r=i.model,s=r.get("axisLine.onZero"),l=r.get("axisLine.onZeroAxisIndex");if(s){if(null!=l)Hm(a[l])&&(o=a[l]);else for(var u in a)if(a.hasOwnProperty(u)&&Hm(a[u])&&!n[h(a[u])]){o=a[u];break}o&&(n[h(o)]=!0)}function h(t){return t.dim+"_"+t.index}}function Hm(t){return t&&"category"!==t.type&&"time"!==t.type&&function(t){var e=t.scale.getExtent(),i=e[0],n=e[1];return!(0<i&&0<n||i<0&&n<0)}(t)}Fm.type="grid",Fm.axisPointerEnabled=!0,Fm.getRect=function(){return this._rect},Fm.update=function(t,e){var i=this._axesMap;this._updateScale(t,this.model),E(i.x,function(t){eg(t.scale,t.model)}),E(i.y,function(t){eg(t.scale,t.model)});var n={};E(i.x,function(t){Wm(i,"y",t,n)}),E(i.y,function(t){Wm(i,"x",t,n)}),this.resize(this.model,e)},Fm.resize=function(t,e,i){var o=vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});this._rect=o;var n=this._axesList;function a(){E(n,function(t){var e=t.isHorizontal(),i=e?[0,o.width]:[0,o.height],n=t.inverse?1:0;t.setExtent(i[n],i[1-n]),function(t,e){var i=t.getExtent(),n=i[0]+i[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e}:function(t){return n-t+e},t.toLocalCoord="x"===t.dim?function(t){return t-e}:function(t){return n-t+e}}(t,e?o.x:o.y)})}a(),!i&&t.get("containLabel")&&(E(n,function(t){if(!t.model.get("axisLabel.inside")){var e=function(t){var e=t.model,i=t.scale;if(e.get("axisLabel.show")&&!i.isBlank()){var n,o,a="category"===t.type,r=i.getExtent();o=a?i.count():(n=i.getTicks()).length;var s,l,u,h,c,d,f,p,g,m=t.getLabelModel(),v=ng(t),y=1;40<o&&(y=Math.ceil(o/40));for(var x=0;x<o;x+=y){var _=v(n?n[x]:r[0]+x),w=m.getTextRect(_),b=(l=w,u=m.get("rotate")||0,void 0,h=u*Math.PI/180,c=l.plain(),d=c.width,f=c.height,p=d*Math.cos(h)+f*Math.sin(h),g=d*Math.sin(h)+f*Math.cos(h),new Mi(c.x,c.y,p,g));s?s.union(b):s=b}return s}}(t);if(e){var i=t.isHorizontal()?"height":"width",n=t.model.get("axisLabel.margin");o[i]-=e[i]+n,"top"===t.position?o.y+=e.height+n:"left"===t.position&&(o.x+=e.width+n)}}}),a())},Fm.getAxis=function(t,e){var i=this._axesMap[t];if(null!=i){if(null==e)for(var n in i)if(i.hasOwnProperty(n))return i[n];return i[e]}},Fm.getAxes=function(){return this._axesList.slice()},Fm.getCartesian=function(t,e){if(null!=t&&null!=e){var i="x"+t+"y"+e;return this._coordsMap[i]}R(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var n=0,o=this._coordsList;n<o.length;n++)if(o[n].getAxis("x").index===t||o[n].getAxis("y").index===e)return o[n]},Fm.getCartesians=function(){return this._coordsList.slice()},Fm.convertToPixel=function(t,e,i){var n=this._findConvertTarget(t,e);return n.cartesian?n.cartesian.dataToPoint(i):n.axis?n.axis.toGlobalCoord(n.axis.dataToCoord(i)):null},Fm.convertFromPixel=function(t,e,i){var n=this._findConvertTarget(t,e);return n.cartesian?n.cartesian.pointToData(i):n.axis?n.axis.coordToData(n.axis.toLocalCoord(i)):null},Fm._findConvertTarget=function(t,e){var i,n,o=e.seriesModel,a=e.xAxisModel||o&&o.getReferringComponents("xAxis")[0],r=e.yAxisModel||o&&o.getReferringComponents("yAxis")[0],s=e.gridModel,l=this._coordsList;if(o)_(l,i=o.coordinateSystem)<0&&(i=null);else if(a&&r)i=this.getCartesian(a.componentIndex,r.componentIndex);else if(a)n=this.getAxis("x",a.componentIndex);else if(r)n=this.getAxis("y",r.componentIndex);else if(s){s.coordinateSystem===this&&(i=this._coordsList[0])}return{cartesian:i,axis:n}},Fm.containPoint=function(t){var e=this._coordsList[0];if(e)return e.containPoint(t)},Fm._initCartesian=function(r,t,e){var s={left:!1,right:!1,top:!1,bottom:!1},l={x:{},y:{}},u={x:0,y:0};if(t.eachComponent("xAxis",i("x"),this),t.eachComponent("yAxis",i("y"),this),!u.x||!u.y)return this._axesMap={},void(this._axesList=[]);function i(a){return function(t,e){if(Vm(t,r)){var i=t.get("position");"x"===a?"top"!==i&&"bottom"!==i&&(i=s.bottom?"top":"bottom"):"left"!==i&&"right"!==i&&(i=s.left?"right":"left"),s[i]=!0;var n=new km(a,ig(t),[0,0],t.get("type"),i),o="category"===n.type;n.onBand=o&&t.get("boundaryGap"),n.inverse=t.get("inverse"),(t.axis=n).model=t,n.grid=this,n.index=e,this._axesList.push(n),l[a][e]=n,u[a]++}}}E((this._axesMap=l).x,function(o,a){E(l.y,function(t,e){var i="x"+a+"y"+e,n=new Lm(i);n.grid=this,n.model=r,this._coordsMap[i]=n,this._coordsList.push(n),n.addAxis(o),n.addAxis(t)},this)},this)},Fm._updateScale=function(l,u){function h(e,i){E(e.mapDimension(i.dim,!0),function(t){i.scale.unionExtentFromData(e,up(e,t))})}E(this._axesList,function(t){t.scale.setExtent(1/0,-1/0)}),l.eachSeries(function(t){if(Xm(t)){var e=Um(t,l),i=e[0],n=e[1];if(!Vm(i,u)||!Vm(n,u))return;var o=this.getCartesian(i.componentIndex,n.componentIndex),a=t.getData(),r=o.getAxis("x"),s=o.getAxis("y");"list"===a.type&&(h(a,r,t),h(a,s,t))}},this)},Fm.getTooltipAxes=function(n){var o=[],a=[];return E(this.getCartesians(),function(t){var e=null!=n&&"auto"!==n?t.getAxis(n):t.getBaseAxis(),i=t.getOtherAxis(e);_(o,e)<0&&o.push(e),_(a,i)<0&&a.push(i)}),{baseAxes:o,otherAxes:a}};var Zm=["xAxis","yAxis"];function Um(e){return N(Zm,function(t){return e.getReferringComponents(t)[0]})}function Xm(t){return"cartesian2d"===t.get("coordinateSystem")}Gm.create=function(n,o){var a=[];return n.eachComponent("grid",function(t,e){var i=new Gm(t,n,o);i.name="grid_"+e,i.resize(t,o,!0),t.coordinateSystem=i,a.push(i)}),n.eachSeries(function(t){if(Xm(t)){var e=Um(t),i=e[0],n=e[1],o=i.getCoordSysModel().coordinateSystem;t.coordinateSystem=o.getCartesian(i.componentIndex,n.componentIndex)}}),a},Gm.dimensions=Gm.prototype.dimensions=Lm.prototype.dimensions,nh.register("cartesian2d",Gm);function Ym(t,e){this.opt=e,this.axisModel=t,C(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new Ii;var i=new Ii({position:e.position.slice(),rotation:e.rotation});i.updateTransform(),this._transform=i.transform,this._dumbGroup=i}var jm=Math.PI;Ym.prototype={constructor:Ym,hasBuilder:function(t){return!!qm[t]},add:function(t){qm[t].call(this)},getGroup:function(){return this.group}};var qm={axisLine:function(){var a=this.opt,t=this.axisModel;if(t.get("axisLine.show")){var e=this.axisModel.axis.getExtent(),i=this._transform,r=[e[0],0],n=[e[1],0];i&&(bt(r,r,i),bt(n,n,i));var s=L({lineCap:"round"},t.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new os({anid:"line",subPixelOptimize:!0,shape:{x1:r[0],y1:r[1],x2:n[0],y2:n[1]},style:s,strokeContainThreshold:a.strokeContainThreshold||5,silent:!0,z2:1}));var l=t.get("axisLine.symbol"),o=t.get("axisLine.symbolSize"),u=t.get("axisLine.symbolOffset")||0;if("number"==typeof u&&(u=[u,u]),null!=l){"string"==typeof l&&(l=[l,l]),"string"!=typeof o&&"number"!=typeof o||(o=[o,o]);var h=o[0],c=o[1];E([{rotate:a.rotation+Math.PI/2,offset:u[0],r:0},{rotate:a.rotation-Math.PI/2,offset:u[1],r:Math.sqrt((r[0]-n[0])*(r[0]-n[0])+(r[1]-n[1])*(r[1]-n[1]))}],function(t,e){if("none"!==l[e]&&null!=l[e]){var i=mg(l[e],-h/2,-c/2,h,c,s.stroke,!0),n=t.r+t.offset,o=[r[0]+n*Math.cos(a.rotation),r[1]-n*Math.sin(a.rotation)];i.attr({rotation:t.rotate,position:o,silent:!0,z2:11}),this.group.add(i)}},this)}}},axisTickLabel:function(){var t=this.axisModel,e=this.opt,i=function(t,e,i){var n=e.axis,o=e.getModel("axisTick");if(!o.get("show")||n.scale.isBlank())return;for(var a=o.getModel("lineStyle"),r=i.tickDirection*o.get("length"),s=iv(n.getTicksCoords(),t._transform,r,C(a.getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")}),"ticks"),l=0;l<s.length;l++)t.group.add(s[l]);return s}(this,t,e);!function(t,e,i){if(rg(t.axis))return;var n=t.get("axisLabel.showMinLabel"),o=t.get("axisLabel.showMaxLabel");i=i||[];var a=(e=e||[])[0],r=e[1],s=e[e.length-1],l=e[e.length-2],u=i[0],h=i[1],c=i[i.length-1],d=i[i.length-2];!1===n?(Qm(a),Qm(u)):tv(a,r)&&(n?(Qm(r),Qm(h)):(Qm(a),Qm(u)));!1===o?(Qm(s),Qm(c)):tv(l,s)&&(o?(Qm(l),Qm(d)):(Qm(s),Qm(c)))}(t,function(u,h,c){var d=h.axis;if(!W(c.axisLabelShow,h.get("axisLabel.show"))||d.scale.isBlank())return;var f=h.getModel("axisLabel"),p=f.get("margin"),t=d.getViewLabels(),e=(W(c.labelRotate,f.get("rotate"))||0)*jm/180,g=$m(c.rotation,e,c.labelDirection),m=h.getCategories&&h.getCategories(!0),v=[],y=Jm(h),x=h.get("triggerEvent");return E(t,function(t,e){var i=t.tickValue,n=t.formattedLabel,o=t.rawLabel,a=f;m&&m[i]&&m[i].textStyle&&(a=new Il(m[i].textStyle,f,h.ecModel));var r=a.getTextColor()||h.get("axisLine.lineStyle.color"),s=[d.dataToCoord(i),c.labelOffset+c.labelDirection*p],l=new Fr({anid:"label_"+i,position:s,rotation:g.rotation,silent:y,z2:10});Qs(l.style,a,{text:n,textAlign:a.getShallow("align",!0)||g.textAlign,textVerticalAlign:a.getShallow("verticalAlign",!0)||a.getShallow("baseline",!0)||g.textVerticalAlign,textFill:"function"==typeof r?r("category"===d.type?o:"value"===d.type?i+"":i,e):r}),x&&(l.eventData=Km(h),l.eventData.targetType="axisLabel",l.eventData.value=o),u._dumbGroup.add(l),l.updateTransform(),v.push(l),u.group.add(l),l.decomposeTransform()}),v}(this,t,e),i),function(t,e,i){var n=e.axis,o=e.getModel("minorTick");if(!o.get("show")||n.scale.isBlank())return;var a=n.getMinorTicksCoords();if(!a.length)return;for(var r=o.getModel("lineStyle"),s=i.tickDirection*o.get("length"),l=C(r.getLineStyle(),C(e.getModel("axisTick").getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")})),u=0;u<a.length;u++)for(var h=iv(a[u],t._transform,s,l,"minorticks_"+u),c=0;c<h.length;c++)t.group.add(h[c])}(this,t,e)},axisName:function(){var t=this.opt,e=this.axisModel,i=W(t.axisName,e.get("name"));if(i){var n,o,a=e.get("nameLocation"),r=t.nameDirection,s=e.getModel("nameTextStyle"),l=e.get("nameGap")||0,u=this.axisModel.axis.getExtent(),h=u[0]>u[1]?-1:1,c=["start"===a?u[0]-h*l:"end"===a?u[1]+h*l:(u[0]+u[1])/2,ev(a)?t.labelOffset+r*l:0],d=e.get("nameRotate");null!=d&&(d=d*jm/180),ev(a)?n=$m(t.rotation,null!=d?d:t.rotation,r):(n=function(t,e,i,n){var o,a,r=Gl(i-t.rotation),s=n[0]>n[1],l="start"===e&&!s||"start"!==e&&s;o=Fl(r-jm/2)?(a=l?"bottom":"top","center"):Fl(r-1.5*jm)?(a=l?"top":"bottom","center"):(a="middle",r<1.5*jm&&jm/2<r?l?"left":"right":l?"right":"left");return{rotation:r,textAlign:o,textVerticalAlign:a}}(t,a,d||0,u),null!=(o=t.axisNameAvailableWidth)&&(o=Math.abs(o/Math.sin(n.rotation)),isFinite(o)||(o=null)));var f=s.getFont(),p=e.get("nameTruncate",!0)||{},g=p.ellipsis,m=W(t.nameTruncateMaxWidth,p.maxWidth,o),v=null!=g&&null!=m?hu(i,m,f,g,{minChar:2,placeholder:p.placeholder}):i,y=e.get("tooltip",!0),x=e.mainType,_={componentType:x,name:i,$vars:["name"]};_[x+"Index"]=e.componentIndex;var w=new Fr({anid:"name",__fullText:i,__truncatedText:v,position:c,rotation:n.rotation,silent:Jm(e),z2:1,tooltip:y&&y.show?L({content:i,formatter:function(){return i},formatterParams:_},y):null});Qs(w.style,s,{text:v,textFont:f,textFill:s.getTextColor()||e.get("axisLine.lineStyle.color"),textAlign:s.get("align")||n.textAlign,textVerticalAlign:s.get("verticalAlign")||n.textVerticalAlign}),e.get("triggerEvent")&&(w.eventData=Km(e),w.eventData.targetType="axisName",w.eventData.name=i),this._dumbGroup.add(w),w.updateTransform(),this.group.add(w),w.decomposeTransform()}}},Km=Ym.makeAxisEventDataBase=function(t){var e={componentType:t.mainType,componentIndex:t.componentIndex};return e[t.mainType+"Index"]=t.componentIndex,e},$m=Ym.innerTextLayout=function(t,e,i){var n,o=Gl(e-t);return{rotation:o,textAlign:Fl(o)?(n=0<i?"top":"bottom","center"):Fl(o-jm)?(n=0<i?"bottom":"top","center"):(n="middle",0<o&&o<jm?0<i?"right":"left":0<i?"left":"right"),textVerticalAlign:n}};var Jm=Ym.isLabelSilent=function(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show)};function Qm(t){t&&(t.ignore=!0)}function tv(t,e){var i=t&&t.getBoundingRect().clone(),n=e&&e.getBoundingRect().clone();if(i&&n){var o=ie([]);return re(o,o,-t.rotation),i.applyTransform(oe([],o,t.getLocalTransform())),n.applyTransform(oe([],o,e.getLocalTransform())),i.intersect(n)}}function ev(t){return"middle"===t||"center"===t}function iv(t,e,i,n,o){for(var a=[],r=[],s=[],l=0;l<t.length;l++){var u=t[l].coord;r[0]=u,s[r[1]=0]=u,s[1]=i,e&&(bt(r,r,e),bt(s,s,e));var h=new os({anid:o+"_"+t[l].tickValue,subPixelOptimize:!0,shape:{x1:r[0],y1:r[1],x2:s[0],y2:s[1]},style:n,z2:2,silent:!0});a.push(h)}return a}var nv=E,ov=T;function av(t,e){var i={axesInfo:{},seriesInvolved:!1,coordSysAxesInfo:{},coordSysMap:{}};return function(p,g,t){var a=g.getComponent("tooltip"),m=g.getComponent("axisPointer"),v=m.get("link",!0)||[],y=[];nv(t.getCoordinateSystems(),function(c){if(c.axisPointerEnabled){var t=uv(c.model),d=p.coordSysAxesInfo[t]={},f=(p.coordSysMap[t]=c).model.getModel("tooltip",a);if(nv(c.getAxes(),ov(o,!1,null)),c.getTooltipAxes&&a&&f.get("show")){var e="axis"===f.get("trigger"),i="cross"===f.get("axisPointer.type"),n=c.getTooltipAxes(f.get("axisPointer.axis"));(e||i)&&nv(n.baseAxes,ov(o,!i||"cross",e)),i&&nv(n.otherAxes,ov(o,"cross",!1))}}function o(t,e,i){var n=i.model.getModel("axisPointer",m),o=n.get("show");if(o&&("auto"!==o||t||lv(n))){null==e&&(e=n.get("triggerTooltip"));var a=(n=t?function(t,e,i,n,o,a){var r=e.getModel("axisPointer"),s={};nv(["type","snap","lineStyle","shadowStyle","label","animation","animationDurationUpdate","animationEasingUpdate","z"],function(t){s[t]=D(r.get(t))}),s.snap="category"!==t.type&&!!a,"cross"===r.get("type")&&(s.type="line");var l=s.label||(s.label={});if(null==l.show&&(l.show=!1),"cross"===o){var u=r.get("label.show");if(l.show=null==u||u,!a){var h=s.lineStyle=r.get("crossStyle");h&&C(l,h.textStyle)}}return t.model.getModel("axisPointer",new Il(s,i,n))}(i,f,m,g,t,e):n).get("snap"),r=uv(i.model),s=e||a||"category"===i.type,l=p.axesInfo[r]={key:r,axis:i,coordSys:c,axisPointerModel:n,triggerTooltip:e,involveSeries:s,snap:a,useHandle:lv(n),seriesModels:[]};d[r]=l,p.seriesInvolved|=s;var u=function(t,e){for(var i=e.model,n=e.dim,o=0;o<t.length;o++){var a=t[o]||{};if(rv(a[n+"AxisId"],i.id)||rv(a[n+"AxisIndex"],i.componentIndex)||rv(a[n+"AxisName"],i.name))return o}}(v,i);if(null!=u){var h=y[u]||(y[u]={axesInfo:{}});h.axesInfo[r]=l,h.mapper=v[u].mapper,l.linkGroup=h}}}})}(i,t,e),i.seriesInvolved&&function(o,t){t.eachSeries(function(i){var n=i.coordinateSystem,t=i.get("tooltip.trigger",!0),e=i.get("tooltip.show",!0);n&&"none"!==t&&!1!==t&&"item"!==t&&!1!==e&&!1!==i.get("axisPointer.show",!0)&&nv(o.coordSysAxesInfo[uv(n.model)],function(t){var e=t.axis;n.getAxis(e.dim)===e&&(t.seriesModels.push(i),null==t.seriesDataCount&&(t.seriesDataCount=0),t.seriesDataCount+=i.getData().count())})},this)}(i,t),i}function rv(t,e){return"all"===t||k(t)&&0<=_(t,e)||t===e}function sv(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[uv(t)]}function lv(t){return!!t.get("handle.show")}function uv(t){return t.type+"||"+t.id}var hv=bf({type:"axis",_axisPointer:null,axisPointerClass:null,render:function(t,e,i,n){this.axisPointerClass&&function(t){var e=sv(t);if(e){var i=e.axisPointerModel,n=e.axis.scale,o=i.option,a=i.get("status"),r=i.get("value");null!=r&&(r=n.parse(r));var s=lv(i);null==a&&(o.status=s?"show":"hide");var l=n.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==r||r>l[1])&&(r=l[1]),r<l[0]&&(r=l[0]),o.value=r,s&&(o.status=e.axis.scale.isBlank()?"hide":"show")}}(t),hv.superApply(this,"render",arguments),cv(this,t,e,i,n,!0)},updateAxisPointer:function(t,e,i,n,o){cv(this,t,e,i,n,!1)},remove:function(t,e){var i=this._axisPointer;i&&i.remove(e),hv.superApply(this,"remove",arguments)},dispose:function(t,e){dv(this,e),hv.superApply(this,"dispose",arguments)}});function cv(t,e,i,n,o,a){var r=hv.getAxisPointerClass(t.axisPointerClass);if(r){var s=function(t){var e=sv(t);return e&&e.axisPointerModel}(e);s?(t._axisPointer||(t._axisPointer=new r)).render(e,s,n,a):dv(t,n)}}function dv(t,e,i){var n=t._axisPointer;n&&n.dispose(e,i),t._axisPointer=null}var fv=[];function pv(t,e,i){i=i||{};var n=t.coordinateSystem,o=e.axis,a={},r=o.getAxesOnZeroOf()[0],s=o.position,l=r?"onZero":s,u=o.dim,h=n.getRect(),c=[h.x,h.x+h.width,h.y,h.y+h.height],d={left:0,right:1,top:0,bottom:1,onZero:2},f=e.get("offset")||0,p="x"===u?[c[2]-f,c[3]+f]:[c[0]-f,c[1]+f];if(r){var g=r.toGlobalCoord(r.dataToCoord(0));p[d.onZero]=Math.max(Math.min(g,p[1]),p[0])}a.position=["y"===u?p[d[l]]:c[0],"x"===u?p[d[l]]:c[3]],a.rotation=Math.PI/2*("x"===u?0:1);a.labelDirection=a.tickDirection=a.nameDirection={top:-1,bottom:1,left:-1,right:1}[s],a.labelOffset=r?p[d[s]]-p[d.onZero]:0,e.get("axisTick.inside")&&(a.tickDirection=-a.tickDirection),W(i.labelInside,e.get("axisLabel.inside"))&&(a.labelDirection=-a.labelDirection);var m=e.get("axisLabel.rotate");return a.labelRotate="top"===l?-m:m,a.z2=1,a}hv.registerAxisPointerClass=function(t,e){fv[t]=e},hv.getAxisPointerClass=function(t){return t&&fv[t]};var gv=["axisLine","axisTickLabel","axisName"],mv=["splitArea","splitLine","minorSplitLine"],vv=hv.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function(e,t,i,n){this.group.removeAll();var o=this._axisGroup;if(this._axisGroup=new Ii,this.group.add(this._axisGroup),e.get("show")){var a=e.getCoordSysModel(),r=pv(a,e),s=new Ym(e,r);E(gv,s.add,s),this._axisGroup.add(s.getGroup()),E(mv,function(t){e.get(t+".show")&&this["_"+t](e,a)},this),dl(o,this._axisGroup,e),vv.superCall(this,"render",e,t,i,n)}},remove:function(){this._splitAreaColors=null},_splitLine:function(t,e){var i=t.axis;if(!i.scale.isBlank()){var n=t.getModel("splitLine"),o=n.getModel("lineStyle"),a=o.get("color");a=k(a)?a:[a];for(var r=e.coordinateSystem.getRect(),s=i.isHorizontal(),l=0,u=i.getTicksCoords({tickModel:n}),h=[],c=[],d=o.getLineStyle(),f=0;f<u.length;f++){var p=i.toGlobalCoord(u[f].coord);s?(h[0]=p,h[1]=r.y,c[0]=p,c[1]=r.y+r.height):(h[0]=r.x,h[1]=p,c[0]=r.x+r.width,c[1]=p);var g=l++%a.length,m=u[f].tickValue;this._axisGroup.add(new os({anid:null!=m?"line_"+u[f].tickValue:null,subPixelOptimize:!0,shape:{x1:h[0],y1:h[1],x2:c[0],y2:c[1]},style:C({stroke:a[g]},d),silent:!0}))}}},_minorSplitLine:function(t,e){var i=t.axis,n=t.getModel("minorSplitLine").getModel("lineStyle"),o=e.coordinateSystem.getRect(),a=i.isHorizontal(),r=i.getMinorTicksCoords();if(r.length)for(var s=[],l=[],u=n.getLineStyle(),h=0;h<r.length;h++)for(var c=0;c<r[h].length;c++){var d=i.toGlobalCoord(r[h][c].coord);a?(s[0]=d,s[1]=o.y,l[0]=d,l[1]=o.y+o.height):(s[0]=o.x,s[1]=d,l[0]=o.x+o.width,l[1]=d),this._axisGroup.add(new os({anid:"minor_line_"+r[h][c].tickValue,subPixelOptimize:!0,shape:{x1:s[0],y1:s[1],x2:l[0],y2:l[1]},style:u,silent:!0}))}},_splitArea:function(t,e){var i=t.axis;if(!i.scale.isBlank()){var n=t.getModel("splitArea"),o=n.getModel("areaStyle"),a=o.get("color"),r=e.coordinateSystem.getRect(),s=i.getTicksCoords({tickModel:n,clamp:!0});if(s.length){var l=a.length,u=this._splitAreaColors,h=Q(),c=0;if(u)for(var d=0;d<s.length;d++){var f=u.get(s[d].tickValue);if(null!=f){c=(f+(l-1)*d)%l;break}}var p=i.toGlobalCoord(s[0].coord),g=o.getAreaStyle();a=k(a)?a:[a];for(d=1;d<s.length;d++){var m,v,y,x,_=i.toGlobalCoord(s[d].coord);p=i.isHorizontal()?(m=p,v=r.y,y=_-m,x=r.height,m+y):(m=r.x,v=p,y=r.width,v+(x=_-v));var w=s[d-1].tickValue;null!=w&&h.set(w,c),this._axisGroup.add(new is({anid:null!=w?"area_"+w:null,shape:{x:m,y:v,width:y,height:x},style:C({fill:a[c]},g),silent:!0})),c=(c+1)%l}this._splitAreaColors=h}}}});vv.extend({type:"xAxis"}),vv.extend({type:"yAxis"}),bf({type:"grid",render:function(t,e){this.group.removeAll(),t.get("show")&&this.group.add(new is({shape:t.coordinateSystem.getRect(),style:C({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}))}}),ff(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={})}),yf(Mm("line","circle","line")),vf(Im("line")),pf(Id.PROCESSOR.STATISTIC,{seriesType:"line",modifyOutputEnd:!0,reset:function(t,e,i){var n=t.getData(),o=t.get("sampling"),a=t.coordinateSystem;if("cartesian2d"===a.type&&o){var r,s=a.getBaseAxis(),l=a.getOtherAxis(s),u=s.getExtent(),h=u[1]-u[0],c=Math.round(n.count()/h);1<c&&("string"==typeof o?r=Am[o]:"function"==typeof o&&(r=o),r&&t.setData(n.downSample(n.mapDimension(l.dim),1/c,r,Tm)))}}});var yv=ic.extend({type:"series.__base_bar__",getInitialData:function(t,e){return hp(this.getSource(),this,{useEncodeDefaulter:!0})},getMarkerPosition:function(t){var e=this.coordinateSystem;if(e){var i=e.dataToPoint(e.clampData(t)),n=this.getData(),o=n.getLayout("offset"),a=n.getLayout("size");return i[e.getBaseAxis().isHorizontal()?0:1]+=o+a/2,i}return[NaN,NaN]},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,barMinAngle:0,large:!1,largeThreshold:400,progressive:3e3,progressiveChunkMode:"mod",itemStyle:{},emphasis:{}}});function xv(t,e,i,n,o,a){$s(t,e,i.getModel("label"),i.getModel("emphasis.label"),{labelFetcher:o,labelDataIndex:a,defaultText:Gg(o.getData(),a),isRectText:!0,autoColor:n}),_v(t),_v(e)}function _v(t,e){"outside"===t.textPosition&&(t.textPosition=e)}yv.extend({type:"series.bar",dependencies:["grid","polar"],brushSelector:"rect",getProgressive:function(){return!!this.get("large")&&this.get("progressive")},getProgressiveThreshold:function(){var t=this.get("progressiveThreshold"),e=this.get("largeThreshold");return t<e&&(t=e),t},defaultOption:{clip:!0,roundCap:!1}});var wv=ra([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["stroke","barBorderColor"],["lineWidth","barBorderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),bv={getBarItemStyle:function(t){var e=wv(this,t);if(this.getBorderLineDash){var i=this.getBorderLineDash();i&&(e.lineDash=i)}return e}},Sv=Is({type:"sausage",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},buildPath:function(t,e){var i=e.cx,n=e.cy,o=Math.max(e.r0||0,0),a=Math.max(e.r,0),r=.5*(a-o),s=o+r,l=e.startAngle,u=e.endAngle,h=e.clockwise,c=Math.cos(l),d=Math.sin(l),f=Math.cos(u),p=Math.sin(u);(h?u-l<2*Math.PI:l-u<2*Math.PI)&&(t.moveTo(c*o+i,d*o+n),t.arc(c*s+i,d*s+n,r,-Math.PI+l,l,!h)),t.arc(i,n,a,l,u,!h),t.moveTo(f*a+i,p*a+n),t.arc(f*s+i,p*s+n,r,u-2*Math.PI,u-Math.PI,!h),0!==o&&(t.arc(i,n,o,u,l,h),t.moveTo(c*o+i,p*o+n)),t.closePath()}}),Mv=["itemStyle","barBorderWidth"],Iv=[0,0];L(Il.prototype,bv),Mf({type:"bar",render:function(t,e,i){this._updateDrawMode(t);var n=t.get("coordinateSystem");return"cartesian2d"!==n&&"polar"!==n||(this._isLargeDraw?this._renderLarge(t,e,i):this._renderNormal(t,e,i)),this.group},incrementalPrepareRender:function(t,e,i){this._clear(),this._updateDrawMode(t)},incrementalRender:function(t,e,i,n){this._incrementalRenderLarge(t,e)},_updateDrawMode:function(t){var e=t.pipelineContext.large;(null==this._isLargeDraw||e^this._isLargeDraw)&&(this._isLargeDraw=e,this._clear())},_renderNormal:function(a,t,e){var r,s=this.group,l=a.getData(),u=this._data,h=a.coordinateSystem,i=h.getBaseAxis();"cartesian2d"===h.type?r=i.isHorizontal():"polar"===h.type&&(r="angle"===i.dim);var c=a.isAnimationEnabled()?a:null,d=a.get("clip",!0),f=function(t,e){var i=t.getArea&&t.getArea();if("cartesian2d"===t.type){var n=t.getBaseAxis();if("category"!==n.type||!n.onBand){var o=e.getLayout("bandWidth");n.isHorizontal()?(i.x-=o,i.width+=2*o):(i.y-=o,i.height+=2*o)}}return i}(h,l);s.removeClipPath();var p=a.get("roundCap",!0);l.diff(u).add(function(t){if(l.hasValue(t)){var e=l.getItemModel(t),i=Pv[h.type](l,t,e);if(d)if(Dv[h.type](f,i))return void s.remove(n);var n=Cv[h.type](t,i,r,c,!1,p);l.setItemGraphicEl(t,n),s.add(n),Ov(n,l,t,e,i,a,r,"polar"===h.type)}}).update(function(t,e){var i=u.getItemGraphicEl(e);if(l.hasValue(t)){var n=l.getItemModel(t),o=Pv[h.type](l,t,n);if(d)if(Dv[h.type](f,o))return void s.remove(i);i?sl(i,{shape:o},c,t):i=Cv[h.type](t,o,r,c,!0,p),l.setItemGraphicEl(t,i),s.add(i),Ov(i,l,t,n,o,a,r,"polar"===h.type)}else s.remove(i)}).remove(function(t){var e=u.getItemGraphicEl(t);"cartesian2d"===h.type?e&&Lv(t,c,e):e&&kv(t,c,e)}).execute(),this._data=l},_renderLarge:function(t,e,i){this._clear(),zv(t,this.group);var n=t.get("clip",!0)?ym(t.coordinateSystem,!1,t):null;n?this.group.setClipPath(n):this.group.removeClipPath()},_incrementalRenderLarge:function(t,e){zv(e,this.group,!0)},dispose:et,remove:function(t){this._clear(t)},_clear:function(e){var t=this.group,i=this._data;e&&e.get("animation")&&i&&!this._isLargeDraw?i.eachItemGraphicEl(function(t){"sector"===t.type?kv(t.dataIndex,e,t):Lv(t.dataIndex,e,t)}):t.removeAll(),this._data=null}});var Tv=Math.max,Av=Math.min,Dv={cartesian2d:function(t,e){var i=e.width<0?-1:1,n=e.height<0?-1:1;i<0&&(e.x+=e.width,e.width=-e.width),n<0&&(e.y+=e.height,e.height=-e.height);var o=Tv(e.x,t.x),a=Av(e.x+e.width,t.x+t.width),r=Tv(e.y,t.y),s=Av(e.y+e.height,t.y+t.height);e.x=o,e.y=r,e.width=a-o,e.height=s-r;var l=e.width<0||e.height<0;return i<0&&(e.x+=e.width,e.width=-e.width),n<0&&(e.y+=e.height,e.height=-e.height),l},polar:function(t){return!1}},Cv={cartesian2d:function(t,e,i,n,o){var a=new is({shape:L({},e)});if(n){var r=i?"height":"width",s={};a.shape[r]=0,s[r]=e[r],yl[o?"updateProps":"initProps"](a,{shape:s},n,t)}return a},polar:function(t,e,i,n,o,a){var r=e.startAngle<e.endAngle,s=new(!i&&a?Sv:Ur)({shape:C({clockwise:r},e)});if(n){var l=i?"r":"endAngle",u={};s.shape[l]=i?0:e.startAngle,u[l]=e[l],yl[o?"updateProps":"initProps"](s,{shape:u},n,t)}return s}};function Lv(t,e,i){i.style.text=null,sl(i,{shape:{width:0}},e,t,function(){i.parent&&i.parent.remove(i)})}function kv(t,e,i){i.style.text=null,sl(i,{shape:{r:i.shape.r0}},e,t,function(){i.parent&&i.parent.remove(i)})}var Pv={cartesian2d:function(t,e,i){var n=t.getItemLayout(e),o=function(t,e){var i=t.get(Mv)||0;return Math.min(i,Math.abs(e.width),Math.abs(e.height))}(i,n),a=0<n.width?1:-1,r=0<n.height?1:-1;return{x:n.x+a*o/2,y:n.y+r*o/2,width:n.width-a*o,height:n.height-r*o}},polar:function(t,e,i){var n=t.getItemLayout(e);return{cx:n.cx,cy:n.cy,r0:n.r0,r:n.r,startAngle:n.startAngle,endAngle:n.endAngle}}};function Nv(t){return null!=t.startAngle&&null!=t.endAngle&&t.startAngle===t.endAngle}function Ov(t,e,i,n,o,a,r,s){var l=e.getItemVisual(i,"color"),u=e.getItemVisual(i,"opacity"),h=e.getVisual("borderColor"),c=n.getModel("itemStyle"),d=n.getModel("emphasis.itemStyle").getBarItemStyle();s||t.setShape("r",c.get("barBorderRadius")||0),t.useStyle(C({stroke:Nv(o)?"none":h,fill:Nv(o)?"none":l,opacity:u},c.getBarItemStyle()));var f=n.getShallow("cursor");f&&t.attr("cursor",f);r?o.height:o.width;s||xv(t.style,d,n,l,a,i),Nv(o)&&(d.fill=d.stroke="none"),Ys(t,d)}var Ev=Sr.extend({type:"largeBar",shape:{points:[]},buildPath:function(t,e){for(var i=e.points,n=this.__startPoint,o=this.__baseDimIdx,a=0;a<i.length;a+=2)n[o]=i[a+o],t.moveTo(n[0],n[1]),t.lineTo(i[a],i[a+1])}});function zv(t,e,i){var n=t.getData(),o=[],a=n.getLayout("valueAxisHorizontal")?1:0;o[1-a]=n.getLayout("valueAxisStart");var r=new Ev({shape:{points:n.getLayout("largePoints")},incremental:!!i,__startPoint:o,__baseDimIdx:a,__largeDataIndices:n.getLayout("largeDataIndices"),__barWidth:n.getLayout("barWidth")});e.add(r),function(t,e,i){var n=i.getVisual("borderColor")||i.getVisual("color"),o=e.getModel("itemStyle").getItemStyle(["color","borderColor"]);t.useStyle(o),t.style.fill=null,t.style.stroke=n,t.style.lineWidth=i.getLayout("barWidth")}(r,t,n),r.seriesIndex=t.seriesIndex,t.get("silent")||(r.on("mousedown",Rv),r.on("mousemove",Rv))}var Rv=Ic(function(t){var e=function(t,e,i){var n=t.__baseDimIdx,o=1-n,a=t.shape.points,r=t.__largeDataIndices,s=Math.abs(t.__barWidth/2),l=t.__startPoint[o];Iv[0]=e,Iv[1]=i;for(var u=Iv[n],h=Iv[1-n],c=u-s,d=u+s,f=0,p=a.length/2;f<p;f++){var g=2*f,m=a[g+n],v=a[g+o];if(c<=m&&m<=d&&(l<=v?l<=h&&h<=v:v<=h&&h<=l))return r[f]}return-1}(this,t.offsetX,t.offsetY);this.dataIndex=0<=e?e:null},30,!1);vf(Id.VISUAL.LAYOUT,T(Pp,"bar")),vf(Id.VISUAL.PROGRESSIVE_LAYOUT,Np),yf({seriesType:"bar",reset:function(t){t.getData().setVisual("legendSymbol","roundRect")}});function Bv(t,e,i){e=k(e)&&{coordDimensions:e}||L({},e);var n=t.getSource(),o=np(n,e),a=new Wf(o,t);return a.initData(n,i),a}var Vv={updateSelectedMap:function(t){this._targetList=k(t)?t.slice():[],this._selectTargetMap=S(t||[],function(t,e){return t.set(e.name,e),t},Q())},select:function(t,e){var i=null!=e?this._targetList[e]:this._selectTargetMap.get(t);"single"===this.get("selectedMode")&&this._selectTargetMap.each(function(t){t.selected=!1}),i&&(i.selected=!0)},unSelect:function(t,e){var i=null!=e?this._targetList[e]:this._selectTargetMap.get(t);i&&(i.selected=!1)},toggleSelected:function(t,e){var i=null!=e?this._targetList[e]:this._selectTargetMap.get(t);if(null!=i)return this[i.selected?"unSelect":"select"](t,e),i.selected},isSelected:function(t,e){var i=null!=e?this._targetList[e]:this._selectTargetMap.get(t);return i&&i.selected}};function Gv(i,e){this.getAllNames=function(){var t=e();return t.mapArray(t.getName)},this.containName=function(t){return 0<=e().indexOfName(t)},this.indexOfName=function(t){return i().indexOfName(t)},this.getItemVisual=function(t,e){return i().getItemVisual(t,e)}}var Fv=Sf({type:"series.pie",init:function(t){Fv.superApply(this,"init",arguments),this.legendVisualProvider=new Gv(A(this.getData,this),A(this.getRawData,this)),this.updateSelectedMap(this._createSelectableList()),this._defaultLabelLine(t)},mergeOption:function(t){Fv.superCall(this,"mergeOption",t),this.updateSelectedMap(this._createSelectableList())},getInitialData:function(t,e){return Bv(this,{coordDimensions:["value"],encodeDefaulter:T(Yu,this)})},_createSelectableList:function(){for(var t=this.getRawData(),e=t.mapDimension("value"),i=[],n=0,o=t.count();n<o;n++)i.push({name:t.getName(n),value:t.get(e,n),selected:Vh(t,n,"selected")});return i},getDataParams:function(t){var e=this.getData(),i=Fv.superCall(this,"getDataParams",t),n=[];return e.each(e.mapDimension("value"),function(t){n.push(t)}),i.percent=Bl(n,t,e.hostModel.get("percentPrecision")),i.$vars.push("percent"),i},_defaultLabelLine:function(t){zo(t,"labelLine",["show"]);var e=t.labelLine,i=t.emphasis.labelLine;e.show=e.show&&t.label.show,i.show=i.show&&t.emphasis.label.show},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,minShowLabelAngle:0,selectedOffset:10,hoverOffset:10,avoidLabelOverlap:!0,percentPrecision:2,stillShowZeroSum:!0,left:0,top:0,right:0,bottom:0,width:null,height:null,label:{rotate:!1,show:!0,position:"outer",alignTo:"none",margin:"25%",bleedMargin:10,distanceToLabelLine:5},labelLine:{show:!0,length:15,length2:15,smooth:!1,lineStyle:{width:1,type:"solid"}},itemStyle:{borderWidth:1},animationType:"expansion",animationTypeUpdate:"transition",animationEasing:"cubicOut"}});function Wv(t,e,i,n){var o=e.getData(),a=this.dataIndex,r=o.getName(a),s=e.get("selectedOffset");n.dispatchAction({type:"pieToggleSelect",from:t,name:r,seriesId:e.id}),o.each(function(t){Hv(o.getItemGraphicEl(t),o.getItemLayout(t),e.isSelected(o.getName(t)),s,i)})}function Hv(t,e,i,n,o){var a=(e.startAngle+e.endAngle)/2,r=i?n:0,s=[Math.cos(a)*r,Math.sin(a)*r];o?t.animate().when(200,{position:s}).start("bounceOut"):t.attr("position",s)}function Zv(t,e){Ii.call(this);var i=new Ur({z2:2}),n=new Kr,o=new Fr;this.add(i),this.add(n),this.add(o),this.updateData(t,e,!0)}b(Fv,Vv);var Uv=Zv.prototype;Uv.updateData=function(t,e,i){var n=this.childAt(0),o=this.childAt(1),a=this.childAt(2),r=t.hostModel,s=t.getItemModel(e),l=t.getItemLayout(e),u=L({},l);u.label=null;var h=r.getShallow("animationTypeUpdate");i?(n.setShape(u),"scale"===r.getShallow("animationType")?(n.shape.r=l.r0,ll(n,{shape:{r:l.r}},r,e)):(n.shape.endAngle=l.startAngle,sl(n,{shape:{endAngle:l.endAngle}},r,e))):"expansion"===h?n.setShape(u):sl(n,{shape:u},r,e);var c=t.getItemVisual(e,"color");n.useStyle(C({lineJoin:"bevel",fill:c},s.getModel("itemStyle").getItemStyle())),n.hoverStyle=s.getModel("emphasis.itemStyle").getItemStyle();var d=s.getShallow("cursor");d&&n.attr("cursor",d),Hv(this,t.getItemLayout(e),r.isSelected(null,e),r.get("selectedOffset"),r.get("animation"));var f=!i&&"transition"===h;this._updateLabel(t,e,f),this.highDownOnUpdate=s.get("hoverAnimation")&&r.isAnimationEnabled()?function(t,e){"emphasis"===e?(o.ignore=o.hoverIgnore,a.ignore=a.hoverIgnore,n.stopAnimation(!0),n.animateTo({shape:{r:l.r+r.get("hoverOffset")}},300,"elasticOut")):(o.ignore=o.normalIgnore,a.ignore=a.normalIgnore,n.stopAnimation(!0),n.animateTo({shape:{r:l.r}},300,"elasticOut"))}:null,Ys(this)},Uv._updateLabel=function(t,e,i){var n=this.childAt(1),o=this.childAt(2),a=t.hostModel,r=t.getItemModel(e),s=t.getItemLayout(e).label,l=t.getItemVisual(e,"color");if(!s||isNaN(s.x)||isNaN(s.y))o.ignore=o.normalIgnore=o.hoverIgnore=n.ignore=n.normalIgnore=n.hoverIgnore=!0;else{var u={points:s.linePoints||[[s.x,s.y],[s.x,s.y],[s.x,s.y]]},h={x:s.x,y:s.y};i?(sl(n,{shape:u},a,e),sl(o,{style:h},a,e)):(n.attr({shape:u}),o.attr({style:h})),o.attr({rotation:s.rotation,origin:[s.x,s.y],z2:10});var c=r.getModel("label"),d=r.getModel("emphasis.label"),f=r.getModel("labelLine"),p=r.getModel("emphasis.labelLine");l=t.getItemVisual(e,"color");$s(o.style,o.hoverStyle={},c,d,{labelFetcher:t.hostModel,labelDataIndex:e,defaultText:s.text,autoColor:l,useInsideStyle:!!s.inside},{textAlign:s.textAlign,textVerticalAlign:s.verticalAlign,opacity:t.getItemVisual(e,"opacity")}),o.ignore=o.normalIgnore=!c.get("show"),o.hoverIgnore=!d.get("show"),n.ignore=n.normalIgnore=!f.get("show"),n.hoverIgnore=!p.get("show"),n.setStyle({stroke:l,opacity:t.getItemVisual(e,"opacity")}),n.setStyle(f.getModel("lineStyle").getLineStyle()),n.hoverStyle=p.getModel("lineStyle").getLineStyle();var g=f.get("smooth");g&&!0===g&&(g=.4),n.setShape({smooth:g})}},w(Zv,Ii);function Xv(i,t){E(t,function(a){a.update="updateView",gf(a,function(t,e){var o={};return e.eachComponent({mainType:"series",subType:i,query:t},function(i){i[a.method]&&i[a.method](t.name,t.dataIndex);var n=i.getData();n.each(function(t){var e=n.getName(t);o[e]=i.isSelected(e)||!1})}),{name:t.name,selected:o,seriesId:t.seriesId}})})}function Yv(n){return{getTargetSeries:function(t){var e={},i=Q();return t.eachSeriesByType(n,function(t){t.__paletteScope=e,i.set(t.uid,t)}),i},reset:function(s,t){var l=s.getRawData(),u={},h=s.getData();h.each(function(t){var e=h.getRawIndex(t);u[e]=t}),l.each(function(t){var e,i=u[t],n=null!=i&&h.getItemVisual(i,"color",!0),o=null!=i&&h.getItemVisual(i,"borderColor",!0);if(n&&o||(e=l.getItemModel(t)),!n){var a=e.get("itemStyle.color")||s.getColorFromPalette(l.getName(t)||t+"",s.__paletteScope,l.count());null!=i&&h.setItemVisual(i,"color",a)}if(!o){var r=e.get("itemStyle.borderColor");null!=i&&h.setItemVisual(i,"borderColor",r)}})}}}gc.extend({type:"pie",init:function(){var t=new Ii;this._sectorGroup=t},render:function(t,e,i,n){if(!n||n.from!==this.uid){var o=t.getData(),a=this._data,r=this.group,s=e.get("animation"),l=!a,u=t.get("animationType"),h=t.get("animationTypeUpdate"),c=T(Wv,this.uid,t,s,i),d=t.get("selectedMode");if(o.diff(a).add(function(t){var e=new Zv(o,t);l&&"scale"!==u&&e.eachChild(function(t){t.stopAnimation(!0)}),d&&e.on("click",c),o.setItemGraphicEl(t,e),r.add(e)}).update(function(t,e){var i=a.getItemGraphicEl(e);l||"transition"===h||i.eachChild(function(t){t.stopAnimation(!0)}),i.updateData(o,t),i.off("click"),d&&i.on("click",c),r.add(i),o.setItemGraphicEl(t,i)}).remove(function(t){var e=a.getItemGraphicEl(t);r.remove(e)}).execute(),s&&0<o.count()&&(l?"scale"!==u:"transition"!==h)){for(var f=o.getItemLayout(0),p=1;isNaN(f.startAngle)&&p<o.count();++p)f=o.getItemLayout(p);var g=Math.max(i.getWidth(),i.getHeight())/2,m=A(r.removeClipPath,r);r.setClipPath(this._createClipPath(f.cx,f.cy,g,f.startAngle,f.clockwise,m,t,l))}else r.removeClipPath();this._data=o}},dispose:function(){},_createClipPath:function(t,e,i,n,o,a,r,s){var l=new Ur({shape:{cx:t,cy:e,r0:0,r:i,startAngle:n,endAngle:n,clockwise:o}});return(s?ll:sl)(l,{shape:{endAngle:n+(o?1:-1)*Math.PI*2}},r,a),l},containPoint:function(t,e){var i=e.getData().getItemLayout(0);if(i){var n=t[0]-i.cx,o=t[1]-i.cy,a=Math.sqrt(n*n+o*o);return a<=i.r&&a>=i.r0}}});var jv=Math.PI/180;function qv(o,t,e,i,n,a,r,s,l,u){function h(t,e,i){for(var n=t;n<e&&!(o[n].y+i>l+r);n++)if(o[n].y+=i,t<n&&n+1<e&&o[n+1].y>o[n].y+o[n].height)return void c(n,i/2);c(e-1,i/2)}function c(t,e){for(var i=t;0<=i&&!(o[i].y-e<l)&&(o[i].y-=e,!(0<i&&o[i].y>o[i-1].y+o[i-1].height));i--);}function d(t,e,i,n,o,a){for(var r=e?Number.MAX_VALUE:0,s=0,l=t.length;s<l;s++)if("none"===t[s].labelAlignTo){var u=Math.abs(t[s].y-n),h=t[s].len,c=t[s].len2,d=u<o+h?Math.sqrt((o+h+c)*(o+h+c)-u*u):Math.abs(t[s].x-i);e&&r<=d&&(d=r-10),!e&&d<=r&&(d=r+10),t[s].x=i+d*a,r=d}}o.sort(function(t,e){return t.y-e.y});for(var f,p=0,g=o.length,m=[],v=[],y=0;y<g;y++){if("outer"===o[y].position&&"labelLine"===o[y].labelAlignTo){var x=o[y].x-u;o[y].linePoints[1][0]+=x,o[y].x=u}(f=o[y].y-p)<0&&h(y,g,-f),p=o[y].y+o[y].height}r-p<0&&c(g-1,p-r);for(y=0;y<g;y++)o[y].y>=e?v.push(o[y]):m.push(o[y]);d(m,!1,t,e,i,n),d(v,!0,t,e,i,n)}function Kv(t){return"center"===t.position}function $v(L,k,P,t,N,e){var O,E,z=L.getData(),R=[],B=!1,V=(L.get("minShowLabelAngle")||0)*jv;z.each(function(t){var e=z.getItemLayout(t),i=z.getItemModel(t),n=i.getModel("label"),o=n.get("position")||i.get("emphasis.label.position"),a=n.get("distanceToLabelLine"),r=n.get("alignTo"),s=Pl(n.get("margin"),P),l=n.get("bleedMargin"),u=n.getFont(),h=i.getModel("labelLine"),c=h.get("length");c=Pl(c,P);var d=h.get("length2");if(d=Pl(d,P),!(e.angle<V)){var f,p,g,m,v=(e.startAngle+e.endAngle)/2,y=Math.cos(v),x=Math.sin(v);O=e.cx,E=e.cy;var _,w=L.getFormattedLabel(t,"normal")||z.getName(t),b=cn(w,u,m,"top"),S="inside"===o||"inner"===o;if("center"===o)f=e.cx,p=e.cy,m="center";else{var M=(S?(e.r+e.r0)/2*y:e.r*y)+O,I=(S?(e.r+e.r0)/2*x:e.r*x)+E;if(f=M+3*y,p=I+3*x,!S){var T=M+y*(c+k-e.r),A=I+x*(c+k-e.r),D=T+(y<0?-1:1)*d;f="edge"===r?y<0?N+s:N+P-s:D+(y<0?-a:a),g=[[M,I],[T,A],[D,p=A]]}m=S?"center":"edge"===r?0<y?"right":"left":0<y?"left":"right"}var C=n.get("rotate");_="number"==typeof C?C*(Math.PI/180):C?y<0?-v+Math.PI:-v:0,B=!!_,e.label={x:f,y:p,position:o,height:b.height,len:c,len2:d,linePoints:g,textAlign:m,verticalAlign:"middle",rotation:_,inside:S,labelDistance:a,labelAlignTo:r,labelMargin:s,bleedMargin:l,textRect:b,text:w,font:u},S||R.push(e.label)}}),!B&&L.get("avoidLabelOverlap")&&function(t,e,i,n,o,a,r,s){for(var l=[],u=[],h=Number.MAX_VALUE,c=-Number.MAX_VALUE,d=0;d<t.length;d++)Kv(t[d])||(t[d].x<e?(h=Math.min(h,t[d].x),l.push(t[d])):(c=Math.max(c,t[d].x),u.push(t[d])));for(qv(u,e,i,n,1,0,a,0,s,c),qv(l,e,i,n,-1,0,a,0,s,h),d=0;d<t.length;d++){var f=t[d];if(!Kv(f)){var p=f.linePoints;if(p){var g,m="edge"===f.labelAlignTo,v=f.textRect.width;(g=m?f.x<e?p[2][0]-f.labelDistance-r-f.labelMargin:r+o-f.labelMargin-p[2][0]-f.labelDistance:f.x<e?f.x-r-f.bleedMargin:r+o-f.x-f.bleedMargin)<f.textRect.width&&(f.text=gn(f.text,g,f.font),"edge"===f.labelAlignTo&&(v=hn(f.text,f.font)));var y=p[1][0]-p[2][0];m?f.x<e?p[2][0]=r+f.labelMargin+v+f.labelDistance:p[2][0]=r+o-f.labelMargin-v-f.labelDistance:(f.x<e?p[2][0]=f.x+f.labelDistance:p[2][0]=f.x-f.labelDistance,p[1][0]=p[2][0]+y),p[1][1]=p[2][1]=f.y}}}}(R,O,E,k,P,t,N,e)}var Jv=2*Math.PI,Qv=Math.PI/180;function ty(t){return{seriesType:t,reset:function(t,e){var n=e.findComponents({mainType:"legend"});if(n&&n.length){var o=t.getData();o.filterSelf(function(t){for(var e=o.getName(t),i=0;i<n.length;i++)if(!n[i].isSelected(e))return!1;return!0})}}}}Xv("pie",[{type:"pieToggleSelect",event:"pieselectchanged",method:"toggleSelected"},{type:"pieSelect",event:"pieselected",method:"select"},{type:"pieUnSelect",event:"pieunselected",method:"unSelect"}]),yf(Yv("pie")),vf(T(function(t,e,A,i){e.eachSeriesByType(t,function(t){var o=t.getData(),e=o.mapDimension("value"),a=function(t,e){return vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,A),i=t.get("center"),n=t.get("radius");k(n)||(n=[0,n]),k(i)||(i=[i,i]);var r=Pl(a.width,A.getWidth()),s=Pl(a.height,A.getHeight()),l=Math.min(r,s),u=Pl(i[0],r)+a.x,h=Pl(i[1],s)+a.y,c=Pl(n[0],l/2),d=Pl(n[1],l/2),f=-t.get("startAngle")*Qv,p=t.get("minAngle")*Qv,g=0;o.each(e,function(t){isNaN(t)||g++});var m=o.getSum(e),v=Math.PI/(m||g)*2,y=t.get("clockwise"),x=t.get("roseType"),_=t.get("stillShowZeroSum"),w=o.getDataExtent(e);w[0]=0;var b=Jv,S=0,M=f,I=y?1:-1;if(o.each(e,function(t,e){var i;if(isNaN(t))o.setItemLayout(e,{angle:NaN,startAngle:NaN,endAngle:NaN,clockwise:y,cx:u,cy:h,r0:c,r:x?NaN:d,viewRect:a});else{(i="area"!==x?0===m&&_?v:t*v:Jv/g)<p?b-=i=p:S+=t;var n=M+I*i;o.setItemLayout(e,{angle:i,startAngle:M,endAngle:n,clockwise:y,cx:u,cy:h,r0:c,r:x?kl(t,w,[c,d]):d,viewRect:a}),M=n}}),b<Jv&&g)if(b<=.001){var T=Jv/g;o.each(e,function(t,e){if(!isNaN(t)){var i=o.getItemLayout(e);i.angle=T,i.startAngle=f+I*e*T,i.endAngle=f+I*(e+1)*T}})}else v=b/S,M=f,o.each(e,function(t,e){if(!isNaN(t)){var i=o.getItemLayout(e),n=i.angle===p?p:t*v;i.startAngle=M,i.endAngle=M+I*n,M+=I*n}});$v(t,d,a.width,a.height,a.x,a.y)})},"pie")),pf(ty("pie")),ic.extend({type:"series.scatter",dependencies:["grid","polar","geo","singleAxis","calendar"],getInitialData:function(t,e){return hp(this.getSource(),this,{useEncodeDefaulter:!0})},brushSelector:"point",getProgressive:function(){var t=this.option.progressive;return null==t?this.option.large?5e3:this.get("progressive"):t},getProgressiveThreshold:function(){var t=this.option.progressiveThreshold;return null==t?this.option.large?1e4:this.get("progressiveThreshold"):t},defaultOption:{coordinateSystem:"cartesian2d",zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,symbolSize:10,large:!1,largeThreshold:2e3,itemStyle:{opacity:.8},clip:!0}});var ey=Is({shape:{points:null},symbolProxy:null,softClipShape:null,buildPath:function(t,e){var i=e.points,n=e.size,o=this.symbolProxy,a=o.shape;if(!((t.getContext?t.getContext():t)&&n[0]<4))for(var r=0;r<i.length;){var s=i[r++],l=i[r++];isNaN(s)||isNaN(l)||this.softClipShape&&!this.softClipShape.contain(s,l)||(a.x=s-n[0]/2,a.y=l-n[1]/2,a.width=n[0],a.height=n[1],o.buildPath(t,a,!0))}},afterBrush:function(t){var e=this.shape,i=e.points,n=e.size;if(n[0]<4){this.setTransform(t);for(var o=0;o<i.length;){var a=i[o++],r=i[o++];isNaN(a)||isNaN(r)||this.softClipShape&&!this.softClipShape.contain(a,r)||t.fillRect(a-n[0]/2,r-n[1]/2,n[0],n[1])}this.restoreTransform(t)}},findDataIndex:function(t,e){for(var i=this.shape,n=i.points,o=i.size,a=Math.max(o[0],4),r=Math.max(o[1],4),s=n.length/2-1;0<=s;s--){var l=2*s,u=n[l]-a/2,h=n[1+l]-r/2;if(u<=t&&h<=e&&t<=u+a&&e<=h+r)return s}return-1}});function iy(){this.group=new Ii}var ny=iy.prototype;function oy(t,e,i){Eg.call(this,t,e,i),this.type="value",this.angle=0,this.name="",this.model}function ay(t,e,i){this._model=t,this.dimensions=[],this._indicatorAxes=N(t.getIndicatorModels(),function(t,e){var i="indicator_"+e,n=new oy(i,"log"===t.get("axisType")?new Jp:new Sp);return n.name=t.get("name"),(n.model=t).axis=n,this.dimensions.push(i),n},this),this.resize(t,i),this.cx,this.cy,this.r,this.r0,this.startAngle}ny.isPersistent=function(){return!this._incremental},ny.updateData=function(t,e){this.group.removeAll();var i=new ey({rectHover:!0,cursor:"default"});i.setShape({points:t.getLayout("symbolPoints")}),this._setCommon(i,t,!1,e),this.group.add(i),this._incremental=null},ny.updateLayout=function(t){if(!this._incremental){var n=t.getLayout("symbolPoints");this.group.eachChild(function(t){if(null!=t.startIndex){var e=2*(t.endIndex-t.startIndex),i=4*t.startIndex*2;n=new Float32Array(n.buffer,i,e)}t.setShape("points",n)})}},ny.incrementalPrepareUpdate=function(t){this.group.removeAll(),this._clearIncremental(),2e6<t.count()?(this._incremental||(this._incremental=new fs({silent:!0})),this.group.add(this._incremental)):this._incremental=null},ny.incrementalUpdate=function(t,e,i){var n;this._incremental?(n=new ey,this._incremental.addDisplayable(n,!0)):((n=new ey({rectHover:!0,cursor:"default",startIndex:t.start,endIndex:t.end})).incremental=!0,this.group.add(n)),n.setShape({points:e.getLayout("symbolPoints")}),this._setCommon(n,e,!!this._incremental,i)},ny._setCommon=function(i,t,e,n){var o=t.hostModel;n=n||{};var a=t.getVisual("symbolSize");i.setShape("size",a instanceof Array?a:[a,a]),i.softClipShape=n.clipShape||null,i.symbolProxy=mg(t.getVisual("symbol"),0,0,0,0),i.setColor=i.symbolProxy.setColor;var r=i.shape.size[0]<4;i.useStyle(o.getModel("itemStyle").getItemStyle(r?["color","shadowBlur","shadowColor"]:["color"]));var s=t.getVisual("color");s&&i.setColor(s),e||(i.seriesIndex=o.seriesIndex,i.on("mousemove",function(t){i.dataIndex=null;var e=i.findDataIndex(t.offsetX,t.offsetY);0<=e&&(i.dataIndex=e+(i.startIndex||0))}))},ny.remove=function(){this._clearIncremental(),this._incremental=null,this.group.removeAll()},ny._clearIncremental=function(){var t=this._incremental;t&&t.clearDisplaybles()},Mf({type:"scatter",render:function(t,e,i){var n=t.getData();this._updateSymbolDraw(n,t).updateData(n,{clipShape:this._getClipShape(t)}),this._finished=!0},incrementalPrepareRender:function(t,e,i){var n=t.getData();this._updateSymbolDraw(n,t).incrementalPrepareUpdate(n),this._finished=!1},incrementalRender:function(t,e,i){this._symbolDraw.incrementalUpdate(t,e.getData(),{clipShape:this._getClipShape(e)}),this._finished=t.end===e.getData().count()},updateTransform:function(t,e,i){var n=t.getData();if(this.group.dirty(),!this._finished||1e4<n.count()||!this._symbolDraw.isPersistent())return{update:!0};var o=Im().reset(t);o.progress&&o.progress({start:0,end:n.count()},n),this._symbolDraw.updateLayout(n)},_getClipShape:function(t){var e=t.coordinateSystem,i=e&&e.getArea&&e.getArea();return t.get("clip",!0)?i:null},_updateSymbolDraw:function(t,e){var i=this._symbolDraw,n=e.pipelineContext.large;return i&&n===this._isLargeDraw||(i&&i.remove(),i=this._symbolDraw=n?new iy:new $g,this._isLargeDraw=n,this.group.removeAll()),this.group.add(i.group),i},remove:function(t,e){this._symbolDraw&&this._symbolDraw.remove(!0),this._symbolDraw=null},dispose:function(){}}),yf(Mm("scatter","circle")),vf(Im("scatter")),w(oy,Eg),ay.prototype.getIndicatorAxes=function(){return this._indicatorAxes},ay.prototype.dataToPoint=function(t,e){var i=this._indicatorAxes[e];return this.coordToPoint(i.dataToCoord(t),e)},ay.prototype.coordToPoint=function(t,e){var i=this._indicatorAxes[e].angle;return[this.cx+t*Math.cos(i),this.cy-t*Math.sin(i)]},ay.prototype.pointToData=function(t){var e=t[0]-this.cx,i=t[1]-this.cy,n=Math.sqrt(e*e+i*i);e/=n,i/=n;for(var o,a=Math.atan2(-i,e),r=1/0,s=-1,l=0;l<this._indicatorAxes.length;l++){var u=this._indicatorAxes[l],h=Math.abs(a-u.angle);h<r&&(o=u,s=l,r=h)}return[s,+(o&&o.coordToData(n))]},ay.prototype.resize=function(t,e){var i=t.get("center"),n=e.getWidth(),o=e.getHeight(),a=Math.min(n,o)/2;this.cx=Pl(i[0],n),this.cy=Pl(i[1],o),this.startAngle=t.get("startAngle")*Math.PI/180;var r=t.get("radius");"string"!=typeof r&&"number"!=typeof r||(r=[0,r]),this.r0=Pl(r[0],a),this.r=Pl(r[1],a),E(this._indicatorAxes,function(t,e){t.setExtent(this.r0,this.r);var i=this.startAngle+e*Math.PI*2/this._indicatorAxes.length;i=Math.atan2(Math.sin(i),Math.cos(i)),t.angle=i},this)},ay.prototype.update=function(n,t){var o=this._indicatorAxes,a=this._model;E(o,function(t){t.scale.setExtent(1/0,-1/0)}),n.eachSeriesByType("radar",function(t,e){if("radar"===t.get("coordinateSystem")&&n.getComponent("radar",t.get("radarIndex"))===a){var i=t.getData();E(o,function(t){t.scale.unionExtentFromData(i,i.mapDimension(t.dim))})}},this);var f=a.get("splitNumber");function p(t){var e=Math.pow(10,Math.floor(Math.log(t)/Math.LN10)),i=t/e;return 2===i?i=5:i*=2,i*e}E(o,function(t,e){var i=tg(t.scale,t.model);eg(t.scale,t.model);var n=t.model,o=t.scale,a=n.getMin(),r=n.getMax(),s=o.getInterval();if(null!=a&&null!=r)o.setExtent(+a,+r),o.setInterval((r-a)/f);else if(null!=a)for(var l;l=a+s*f,o.setExtent(+a,l),o.setInterval(s),s=p(s),l<i[1]&&isFinite(l)&&isFinite(i[1]););else if(null!=r)for(var u;u=r-s*f,o.setExtent(u,+r),o.setInterval(s),s=p(s),u>i[0]&&isFinite(u)&&isFinite(i[0]););else{var h=o.getTicks().length-1;f<h&&(s=p(s));var c=Math.round((i[0]+i[1])/2/s)*s,d=Math.round(f/2);o.setExtent(Nl(c-d*s),Nl(c+(f-d)*s)),o.setInterval(s)}})},ay.dimensions=[],ay.create=function(i,n){var o=[];return i.eachComponent("radar",function(t){var e=new ay(t,i,n);o.push(e),t.coordinateSystem=e}),i.eachSeriesByType("radar",function(t){"radar"===t.get("coordinateSystem")&&(t.coordinateSystem=o[t.get("radarIndex")||0])}),o},nh.register("radar",ay);var ry=Nm.valueAxis;function sy(t,e){return C({show:e},t)}wf({type:"radar",optionUpdated:function(){var o=this.get("boundaryGap"),a=this.get("splitNumber"),r=this.get("scale"),s=this.get("axisLine"),l=this.get("axisTick"),u=this.get("axisType"),h=this.get("axisLabel"),c=this.get("name"),d=this.get("name.show"),f=this.get("name.formatter"),p=this.get("nameGap"),g=this.get("triggerEvent"),t=N(this.get("indicator")||[],function(t){null!=t.max&&0<t.max&&!t.min?t.min=0:null!=t.min&&t.min<0&&!t.max&&(t.max=0);var e=c;if(null!=t.color&&(e=C({color:t.color},c)),t=m(D(t),{boundaryGap:o,splitNumber:a,scale:r,axisLine:s,axisTick:l,axisType:u,axisLabel:h,name:t.text,nameLocation:"end",nameGap:p,nameTextStyle:e,triggerEvent:g},!1),d||(t.name=""),"string"==typeof f){var i=t.name;t.name=f.replace("{value}",null!=i?i:"")}else"function"==typeof f&&(t.name=f(t.name,t));var n=L(new Il(t,null,this.ecModel),sg);return n.mainType="radar",n.componentIndex=this.componentIndex,n},this);this.getIndicatorModels=function(){return t}},defaultOption:{zlevel:0,z:0,center:["50%","50%"],radius:"75%",startAngle:90,name:{show:!0},boundaryGap:[0,0],splitNumber:5,nameGap:15,scale:!1,shape:"polygon",axisLine:m({lineStyle:{color:"#bbb"}},ry.axisLine),axisLabel:sy(ry.axisLabel,!1),axisTick:sy(ry.axisTick,!1),axisType:"interval",splitLine:sy(ry.splitLine,!0),splitArea:sy(ry.splitArea,!0),indicator:[]}});var ly=["axisLine","axisTickLabel","axisName"];bf({type:"radar",render:function(t,e,i){this.group.removeAll(),this._buildAxes(t),this._buildSplitLineAndArea(t)},_buildAxes:function(t){var e=t.coordinateSystem;E(N(e.getIndicatorAxes(),function(t){return new Ym(t.model,{position:[e.cx,e.cy],rotation:t.angle,labelDirection:-1,tickDirection:-1,nameDirection:1})}),function(t){E(ly,t.add,t),this.group.add(t.getGroup())},this)},_buildSplitLineAndArea:function(t){var n=t.coordinateSystem,e=n.getIndicatorAxes();if(e.length){var i=t.get("shape"),o=t.getModel("splitLine"),a=t.getModel("splitArea"),r=o.getModel("lineStyle"),s=a.getModel("areaStyle"),l=o.get("show"),u=a.get("show"),h=r.get("color"),c=s.get("color");h=k(h)?h:[h],c=k(c)?c:[c];var d=[],f=[];if("circle"===i)for(var p=e[0].getTicksCoords(),g=n.cx,m=n.cy,v=0;v<p.length;v++){if(l)d[I(d,h,v)].push(new Hr({shape:{cx:g,cy:m,r:p[v].coord}}));if(u&&v<p.length-1)f[I(f,c,v)].push(new Xr({shape:{cx:g,cy:m,r0:p[v].coord,r:p[v+1].coord}}))}else{var y,x=N(e,function(t,e){var i=t.getTicksCoords();return y=null==y?i.length-1:Math.min(i.length-1,y),N(i,function(t){return n.coordToPoint(t.coord,e)})}),_=[];for(v=0;v<=y;v++){for(var w=[],b=0;b<e.length;b++)w.push(x[b][v]);if(w[0]&&w.push(w[0].slice()),l)d[I(d,h,v)].push(new Kr({shape:{points:w}}));if(u&&_)f[I(f,c,v-1)].push(new qr({shape:{points:w.concat(_)}}));_=w.slice().reverse()}}var S=r.getLineStyle(),M=s.getAreaStyle();E(f,function(t,e){this.group.add(ks(t,{style:C({stroke:"none",fill:c[e%c.length]},M),silent:!0}))},this),E(d,function(t,e){this.group.add(ks(t,{style:C({fill:"none",stroke:h[e%h.length]},S),silent:!0}))},this)}function I(t,e,i){var n=i%e.length;return t[n]=t[n]||[],n}}});var uy=ic.extend({type:"series.radar",dependencies:["radar"],init:function(t){uy.superApply(this,"init",arguments),this.legendVisualProvider=new Gv(A(this.getData,this),A(this.getRawData,this))},getInitialData:function(t,e){return Bv(this,{generateCoord:"indicator_",generateCoordCount:1/0})},formatTooltip:function(n){var o=this.getData(),t=this.coordinateSystem.getIndicatorAxes(),e=this.getData().getName(n);return eu(""===e?this.name:e)+"<br/>"+N(t,function(t,e){var i=o.get(o.mapDimension(t.dim),n);return eu(t.name+" : "+i)}).join("<br />")},defaultOption:{zlevel:0,z:2,coordinateSystem:"radar",legendHoverLink:!0,radarIndex:0,lineStyle:{width:2,type:"solid"},label:{position:"top"},symbol:"emptyCircle",symbolSize:4}});Mf({type:"radar",render:function(l,t,e){var i=l.coordinateSystem,g=this.group,m=l.getData(),s=this._data;function u(t,e){var i=t.getItemVisual(e,"symbol")||"circle",n=t.getItemVisual(e,"color");if("none"!==i){var o=function(t){return k(t)||(t=[+t,+t]),t}(t.getItemVisual(e,"symbolSize")),a=mg(i,-1,-1,2,2,n);return a.attr({style:{strokeNoScale:!0},z2:100,scale:[o[0]/2,o[1]/2]}),a}}function h(t,e,i,n,o,a){i.removeAll();for(var r=0;r<e.length-1;r++){var s=u(n,o);s&&(t[s.__dimIdx=r]?(s.attr("position",t[r]),yl[a?"initProps":"updateProps"](s,{position:e[r]},l,o)):s.attr("position",e[r]),i.add(s))}}function c(t){return N(t,function(t){return[i.cx,i.cy]})}m.diff(s).add(function(t){var e=m.getItemLayout(t);if(e){var i=new qr,n=new Kr,o={shape:{points:e}};i.shape.points=c(e),n.shape.points=c(e),ll(i,o,l,t),ll(n,o,l,t);var a=new Ii,r=new Ii;a.add(n),a.add(i),a.add(r),h(n.shape.points,e,r,m,t,!0),m.setItemGraphicEl(t,a)}}).update(function(t,e){var i=s.getItemGraphicEl(e),n=i.childAt(0),o=i.childAt(1),a=i.childAt(2),r={shape:{points:m.getItemLayout(t)}};r.shape.points&&(h(n.shape.points,r.shape.points,a,m,t,!1),sl(n,r,l),sl(o,r,l),m.setItemGraphicEl(t,i))}).remove(function(t){g.remove(s.getItemGraphicEl(t))}).execute(),m.eachItemGraphicEl(function(t,i){var e=m.getItemModel(i),n=t.childAt(0),o=t.childAt(1),a=t.childAt(2),r=m.getItemVisual(i,"color");g.add(t),n.useStyle(C(e.getModel("lineStyle").getLineStyle(),{fill:"none",stroke:r})),n.hoverStyle=e.getModel("emphasis.lineStyle").getLineStyle();var s=e.getModel("areaStyle"),l=e.getModel("emphasis.areaStyle"),u=s.isEmpty()&&s.parentModel.isEmpty(),h=l.isEmpty()&&l.parentModel.isEmpty();h=h&&u,o.ignore=u,o.useStyle(C(s.getAreaStyle(),{fill:r,opacity:.7})),o.hoverStyle=l.getAreaStyle();var c=e.getModel("itemStyle").getItemStyle(["color"]),d=e.getModel("emphasis.itemStyle").getItemStyle(),f=e.getModel("label"),p=e.getModel("emphasis.label");a.eachChild(function(t){t.setStyle(c),t.hoverStyle=D(d);var e=m.get(m.dimensions[t.__dimIdx],i);null!=e&&!isNaN(e)||(e=""),$s(t.style,t.hoverStyle,f,p,{labelFetcher:m.hostModel,labelDataIndex:i,labelDimIndex:t.__dimIdx,defaultText:e,autoColor:r,isRectText:!0})}),t.highDownOnUpdate=function(t,e){o.attr("ignore","emphasis"===e?h:u)},Ys(t)}),this._data=m},remove:function(){this.group.removeAll(),this._data=null},dispose:function(){}});function hy(t){return!isNaN(t[0])&&!isNaN(t[1])}function cy(t){return[t.cx,t.cy]}yf(Yv("radar")),yf(Mm("radar","circle")),vf(function(t){t.eachSeriesByType("radar",function(t){var i=t.getData(),o=[],a=t.coordinateSystem;if(a){var e=a.getIndicatorAxes();E(e,function(t,n){i.each(i.mapDimension(e[n].dim),function(t,e){o[e]=o[e]||[];var i=a.dataToPoint(t,n);o[e][n]=hy(i)?i:cy(a)})}),i.each(function(t){var e=I(o[t],function(t){return hy(t)})||cy(a);o[t].push(e.slice()),i.setItemLayout(t,o[t])})}})}),pf(ty("radar")),ff(function(i){var t=i.polar;if(t){k(t)||(t=[t]);var n=[];E(t,function(t,e){t.indicator?(t.type&&!t.shape&&(t.shape=t.type),i.radar=i.radar||[],k(i.radar)||(i.radar=[i.radar]),i.radar.push(t)):n.push(t)}),i.polar=n}E(i.series,function(t){t&&"radar"===t.type&&t.polarIndex&&(t.radarIndex=t.polarIndex)})});for(var dy=[126,25],fy=[[[0,3.5],[7,11.2],[15,11.9],[30,7],[42,.7],[52,.7],[56,7.7],[59,.7],[64,.7],[64,0],[5,0],[0,3.5]],[[13,16.1],[19,14.7],[16,21.7],[11,23.1],[13,16.1]],[[12,32.2],[14,38.5],[15,38.5],[13,32.2],[12,32.2]],[[16,47.6],[12,53.2],[13,53.2],[18,47.6],[16,47.6]],[[6,64.4],[8,70],[9,70],[8,64.4],[6,64.4]],[[23,82.6],[29,79.8],[30,79.8],[25,82.6],[23,82.6]],[[37,70.7],[43,62.3],[44,62.3],[39,70.7],[37,70.7]],[[48,51.1],[51,45.5],[53,45.5],[50,51.1],[48,51.1]],[[51,35],[51,28.7],[53,28.7],[53,35],[51,35]],[[52,22.4],[55,17.5],[56,17.5],[53,22.4],[52,22.4]],[[58,12.6],[62,7],[63,7],[60,12.6],[58,12.6]],[[0,3.5],[0,93.1],[64,93.1],[64,0],[63,0],[63,92.4],[1,92.4],[1,3.5],[0,3.5]]],py=0;py<fy.length;py++)for(var gy=0;gy<fy[py].length;gy++)fy[py][gy][0]/=10.5,fy[py][gy][1]/=-14,fy[py][gy][0]+=dy[0],fy[py][gy][1]+=dy[1];var my={"南海诸岛":[32,80],"广东":[0,-10],"香港":[10,5],"澳门":[-10,10],"天津":[5,5]},vy={Russia:[100,60],"United States":[-99,38],"United States of America":[-99,38]},yy=[[[123.45165252685547,25.73527164402261],[123.49731445312499,25.73527164402261],[123.49731445312499,25.750734064600884],[123.45165252685547,25.750734064600884],[123.45165252685547,25.73527164402261]]],xy=Zo(),_y={load:function(n,t){var e=xy(t).parsed;if(e)return e;var i,o=t.specialAreas||{},a=t.geoJSON;try{i=a?Mg(a):[]}catch(t){throw new Error("Invalid geoJson format\n"+t.message)}return function(t,e){"china"===t&&e.push(new bg("南海诸岛",N(fy,function(t){return{type:"polygon",exterior:t}}),dy))}(n,i),E(i,function(t){var e=t.name;!function(t,e){if("china"===t){var i=my[e.name];if(i){var n=e.center;n[0]+=i[0]/10.5,n[1]+=-i[1]/14}}}(n,t),function(t,e){if("world"===t){var i=vy[e.name];if(i){var n=e.center;n[0]=i[0],n[1]=i[1]}}}(n,t),function(t,e){"china"===t&&"台湾"===e.name&&e.geometries.push({type:"polygon",exterior:yy[0]})}(n,t);var i=o[e];i&&t.transformTo(i.left,i.top,i.width,i.height)}),xy(t).parsed={regions:i,boundingRect:function(t){for(var e,i=0;i<t.length;i++){var n=t[i].getBoundingRect();(e=e||n.clone()).union(n)}return e}(i)}}};var wy=Zo();function by(t,e){var i,n,o=t.svgXML;try{Y(null!=(n=(i=o&&function(t,e){return(new ad).parse(t,e)}(o,{ignoreViewBox:!0,ignoreRootClip:!0})||{}).root))}catch(t){throw new Error("Invalid svg format\n"+t.message)}var a=i.width,r=i.height,s=i.viewBoxRect;if(e||(e=null==a||null==r?n.getBoundingRect():new Mi(0,0,0,0),null!=a&&(e.width=a),null!=r&&(e.height=r)),s){var l=md(s,e.width,e.height),u=n;(n=new Ii).add(u),u.scale=l.scale,u.position=l.position}return n.setClipPath(new is({shape:e.plain()})),{root:n,boundingRect:e}}var Sy={geoJSON:_y,svg:{load:function(t,e){var i=wy(e).originRoot;if(i)return{root:i,boundingRect:wy(e).boundingRect};var n=by(e);return wy(e).originRoot=n.root,wy(e).boundingRect=n.boundingRect,n},makeGraphic:function(t,e,i){var n=wy(e),o=n.rootMap||(n.rootMap=Q()),a=o.get(i);if(a)return a;var r=n.originRoot,s=n.boundingRect;return a=n.originRootHostKey?by(e,s).root:(n.originRootHostKey=i,r),o.set(i,a)},removeGraphic:function(t,e,i){var n=wy(e),o=n.rootMap;o&&o.removeKey(i),i===n.originRootHostKey&&(n.originRootHostKey=null)}}},My={load:function(n,o){var a,r=[],s=Q(),l=Q();return E(Ty(n),function(t){var e=Sy[t.type].load(n,t);E(e.regions,function(t){var e=t.name;o&&o.hasOwnProperty(e)&&(t=t.cloneShallow(e=o[e])),r.push(t),s.set(e,t),l.set(e,t.center)});var i=e.boundingRect;i&&(a?a.union(i):a=i.clone())}),{regions:r,regionsMap:s,nameCoordMap:l,boundingRect:a||new Mi(0,0,0,0)}},makeGraphic:Iy("makeGraphic"),removeGraphic:Iy("removeGraphic")};function Iy(a){return function(i,n){var t=Ty(i),o=[];return E(t,function(t){var e=Sy[t.type][a];e&&o.push(e(i,t,n))}),o}}function Ty(t){return yd.retrieveMap(t)||[]}b(ic.extend({type:"series.map",dependencies:["geo"],layoutMode:"box",needsDrawMap:!1,seriesGroup:[],getInitialData:function(t){for(var e=Bv(this,{coordDimensions:["value"],encodeDefaulter:T(Yu,this)}),i=e.mapDimension("value"),n=Q(),o=[],a=[],r=0,s=e.count();r<s;r++){var l=e.getName(r);n.set(l,!0),o.push({name:l,value:e.get(i,r),selected:Vh(e,r,"selected")})}return E(My.load(this.getMapType(),this.option.nameMap).regions,function(t){var e=t.name;n.get(e)||(o.push({name:e}),a.push(e))}),this.updateSelectedMap(o),e.appendValues([],a),e},getHostGeoModel:function(){var t=this.option.geoIndex;return null!=t?this.dependentModels.geo[t]:null},getMapType:function(){return(this.getHostGeoModel()||this).option.map},getRawValue:function(t){var e=this.getData();return e.get(e.mapDimension("value"),t)},getRegionModel:function(t){var e=this.getData();return e.getItemModel(e.indexOfName(t))},formatTooltip:function(t){for(var e=this.getData(),i=Kl(this.getRawValue(t)),n=e.getName(t),o=this.seriesGroup,a=[],r=0;r<o.length;r++){var s=o[r].originalData.indexOfName(n),l=e.mapDimension("value");isNaN(o[r].originalData.get(l,s))||a.push(eu(o[r].name))}return a.join(", ")+"<br />"+eu(n+" : "+i)},getTooltipPosition:function(t){if(null!=t){var e=this.getData().getName(t),i=this.coordinateSystem,n=i.getRegion(e);return n&&i.dataToPoint(n.center)}},setZoom:function(t){this.option.zoom=t},setCenter:function(t){this.option.center=t},defaultOption:{zlevel:0,z:2,coordinateSystem:"geo",map:"",left:"center",top:"center",aspectScale:.75,showLegendSymbol:!0,dataRangeHoverLink:!0,boundingCoords:null,center:null,zoom:1,scaleLimit:null,label:{show:!1,color:"#000"},itemStyle:{borderWidth:.5,borderColor:"#444",areaColor:"#eee"},emphasis:{label:{show:!0,color:"rgb(100,0,0)"},itemStyle:{areaColor:"rgba(255,215,0,0.8)"}}}}),Vv);var Ay="\0_ec_interaction_mutex";function Dy(t,e){return!!Cy(t)[e]}function Cy(t){return t[Ay]||(t[Ay]={})}function Ly(i){this.pointerChecker,this._zr=i,this._opt={};var t=A,n=t(ky,this),o=t(Py,this),a=t(Ny,this),r=t(Oy,this),s=t(Ey,this);Ct.call(this),this.setPointerChecker=function(t){this.pointerChecker=t},this.enable=function(t,e){this.disable(),this._opt=C(D(e)||{},{zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!1,preventDefaultMouseMove:!0}),null==t&&(t=!0),!0!==t&&"move"!==t&&"pan"!==t||(i.on("mousedown",n),i.on("mousemove",o),i.on("mouseup",a)),!0!==t&&"scale"!==t&&"zoom"!==t||(i.on("mousewheel",r),i.on("pinch",s))},this.disable=function(){i.off("mousedown",n),i.off("mousemove",o),i.off("mouseup",a),i.off("mousewheel",r),i.off("pinch",s)},this.dispose=this.disable,this.isDragging=function(){return this._dragging},this.isPinching=function(){return this._pinching}}function ky(t){if(!(Ht(t)||t.target&&t.target.draggable)){var e=t.offsetX,i=t.offsetY;this.pointerChecker&&this.pointerChecker(t,e,i)&&(this._x=e,this._y=i,this._dragging=!0)}}function Py(t){if(this._dragging&&By("moveOnMouseMove",t,this._opt)&&"pinch"!==t.gestureEvent&&!Dy(this._zr,"globalPan")){var e=t.offsetX,i=t.offsetY,n=this._x,o=this._y,a=e-n,r=i-o;this._x=e,this._y=i,this._opt.preventDefaultMouseMove&&Wt(t.event),Ry(this,"pan","moveOnMouseMove",t,{dx:a,dy:r,oldX:n,oldY:o,newX:e,newY:i})}}function Ny(t){Ht(t)||(this._dragging=!1)}function Oy(t){var e=By("zoomOnMouseWheel",t,this._opt),i=By("moveOnMouseWheel",t,this._opt),n=t.wheelDelta,o=Math.abs(n),a=t.offsetX,r=t.offsetY;if(0!==n&&(e||i)){if(e){var s=3<o?1.4:1<o?1.2:1.1;zy(this,"zoom","zoomOnMouseWheel",t,{scale:0<n?s:1/s,originX:a,originY:r})}if(i){var l=Math.abs(n);zy(this,"scrollMove","moveOnMouseWheel",t,{scrollDelta:(0<n?1:-1)*(3<l?.4:1<l?.15:.05),originX:a,originY:r})}}}function Ey(t){Dy(this._zr,"globalPan")||zy(this,"zoom",null,t,{scale:1<t.pinchScale?1.1:1/1.1,originX:t.pinchX,originY:t.pinchY})}function zy(t,e,i,n,o){t.pointerChecker&&t.pointerChecker(n,o.originX,o.originY)&&(Wt(n.event),Ry(t,e,i,n,o))}function Ry(t,e,i,n,o){o.isAvailableBehavior=A(By,null,i,n),t.trigger(e,o)}function By(t,e,i){var n=i[t];return!t||n&&(!z(n)||e.event[n+"Key"])}function Vy(t,e,i){var n=t.target,o=n.position;o[0]+=e,o[1]+=i,n.dirty()}function Gy(t,e,i,n){var o=t.target,a=t.zoomLimit,r=o.position,s=o.scale,l=t.zoom=t.zoom||1;if(l*=e,a){var u=a.min||0,h=a.max||1/0;l=Math.max(Math.min(h,l),u)}var c=l/t.zoom;t.zoom=l,r[0]-=(i-r[0])*(c-1),r[1]-=(n-r[1])*(c-1),s[0]*=c,s[1]*=c,o.dirty()}gf({type:"takeGlobalCursor",event:"globalCursorTaken",update:"update"},function(){}),b(Ly,Ct);var Fy={axisPointer:1,tooltip:1,brush:1};function Wy(t,e,i){var n=e.getComponentByElement(t.topTarget),o=n&&n.coordinateSystem;return n&&n!==i&&!Fy[n.mainType]&&o&&o.model!==i}function Hy(t){var e=t.getItemStyle(),i=t.get("areaColor");return null!=i&&(e.fill=i),e}function Zy(i,t){t.eachChild(function(e){E(e.__regions,function(t){e.trigger(i.isSelected(t.name)?"emphasis":"normal")})})}function Uy(t,e){var i=new Ii;this.uid=Cl("ec_map_draw"),this._controller=new Ly(t.getZr()),this._controllerHost={target:e?i:null},this.group=i,this._updateGroup=e,this._mouseDownFlag,this._mapName,this._initialized,i.add(this._regionsGroup=new Ii),i.add(this._backgroundGroup=new Ii)}Uy.prototype={constructor:Uy,draw:function(_,t,e,i,n){var w="geo"===_.mainType,b=_.getData&&_.getData();w&&t.eachComponent({mainType:"series",subType:"map"},function(t){b||t.getHostGeoModel()!==_||(b=t.getData())});var o=_.coordinateSystem;this._updateBackground(o);var S=this._regionsGroup,M=this.group;o._roamTransformable.transform&&(M.transform=o._roamTransformable.transform.slice(),M.decomposeTransform());var I=o._rawTransformable.scale,T=o._rawTransformable.position;S.removeAll();var A=["itemStyle"],D=["emphasis","itemStyle"],C=["label"],L=["emphasis","label"],k=Q();E(o.regions,function(t){var e=k.get(t.name)||k.set(t.name,new Ii),a=new hs({segmentIgnoreThreshold:1,shape:{paths:[]}});e.add(a);var i,n=(x=_.getRegionModel(t.name)||_).getModel(A),o=x.getModel(D),r=Hy(n),s=Hy(o),l=x.getModel(C),u=x.getModel(L);if(b){i=b.indexOfName(t.name);var h=b.getItemVisual(i,"color",!0);h&&(r.fill=h)}function c(t){return[t[0]*I[0]+T[0],t[1]*I[1]+T[1]]}E(t.geometries,function(t){if("polygon"===t.type){for(var e=[],i=0;i<t.exterior.length;++i)e.push(c(t.exterior[i]));a.shape.paths.push(new qr({segmentIgnoreThreshold:1,shape:{points:e}}));for(i=0;i<(t.interiors?t.interiors.length:0);++i){for(var n=t.interiors[i],o=(e=[],0);o<n.length;++o)e.push(c(n[o]));a.shape.paths.push(new qr({segmentIgnoreThreshold:1,shape:{points:e}}))}}}),a.setStyle(r),a.style.strokeNoScale=!0,a.culling=!0;var d=l.get("show"),f=u.get("show"),p=b&&isNaN(b.get(b.mapDimension("value"),i)),g=b&&b.getItemLayout(i);if(w||p&&(d||f)||g&&g.showLabel){var m,v=w?t.name:i;(!b||0<=i)&&(m=_);var y=new Fr({position:c(t.center.slice()),scale:[1/M.scale[0],1/M.scale[1]],z2:10,silent:!0});$s(y.style,y.hoverStyle={},l,u,{labelFetcher:m,labelDataIndex:v,defaultText:t.name,useInsideStyle:!1},{textAlign:"center",textVerticalAlign:"middle"}),e.add(y)}if(b)b.setItemGraphicEl(i,e);else{var x=_.getRegionModel(t.name);a.eventData={componentType:"geo",componentIndex:_.componentIndex,geoIndex:_.componentIndex,name:t.name,region:x&&x.option||{}}}(e.__regions||(e.__regions=[])).push(t),e.highDownSilentOnTouch=!!_.get("selectedMode"),Ys(e,s),S.add(e)}),this._updateController(_,t,e),function(n,o,a,r,s){a.off("click"),a.off("mousedown"),o.get("selectedMode")&&(a.on("mousedown",function(){n._mouseDownFlag=!0}),a.on("click",function(t){if(n._mouseDownFlag){n._mouseDownFlag=!1;for(var e=t.target;!e.__regions;)e=e.parent;if(e){var i={type:("geo"===o.mainType?"geo":"map")+"ToggleSelect",batch:N(e.__regions,function(t){return{name:t.name,from:s.uid}})};i[o.mainType+"Id"]=o.id,r.dispatchAction(i),Zy(o,a)}}}))}(this,_,S,e,i),Zy(_,S)},remove:function(){this._regionsGroup.removeAll(),this._backgroundGroup.removeAll(),this._controller.dispose(),this._mapName&&My.removeGraphic(this._mapName,this.uid),this._mapName=null,this._controllerHost={}},_updateBackground:function(t){var e=t.map;this._mapName!==e&&E(My.makeGraphic(e,this.uid),function(t){this._backgroundGroup.add(t)},this),this._mapName=e},_updateController:function(n,t,o){var a=n.coordinateSystem,e=this._controller,i=this._controllerHost;i.zoomLimit=n.get("scaleLimit"),i.zoom=a.getZoom(),e.enable(n.get("roam")||!1);var r=n.mainType;function s(){var t={type:"geoRoam",componentType:r};return t[r+"Id"]=n.id,t}e.off("pan").on("pan",function(t){this._mouseDownFlag=!1,Vy(i,t.dx,t.dy),o.dispatchAction(L(s(),{dx:t.dx,dy:t.dy}))},this),e.off("zoom").on("zoom",function(t){if(this._mouseDownFlag=!1,Gy(i,t.scale,t.originX,t.originY),o.dispatchAction(L(s(),{zoom:t.scale,originX:t.originX,originY:t.originY})),this._updateGroup){var e=this.group.scale;this._regionsGroup.traverse(function(t){"text"===t.type&&t.attr("scale",[1/e[0],1/e[1]])})}},this),e.setPointerChecker(function(t,e,i){return a.getViewRectAfterRoam().contain(e,i)&&!Wy(t,o,n)})}};var Xy="__seriesMapHighDown",Yy="__seriesMapCallKey";function jy(t){var e=this[Xy];e&&e.recordVersion===this[Yy]&&qy(e,t)}function qy(t,e){var i=t.circle,n=t.labelModel,o=t.hoverLabelModel,a=t.emphasisText,r=t.normalText;e?(i.style.extendFrom(Qs({},o,{text:o.get("show")?a:null},{isRectText:!0,useInsideStyle:!1},!0)),i.__mapOriginalZ2=i.z2,i.z2+=ys):(Qs(i.style,n,{text:n.get("show")?r:null,textPosition:n.getShallow("position")||"bottom"},{isRectText:!0,useInsideStyle:!1}),i.dirty(!1),null!=i.__mapOriginalZ2&&(i.z2=i.__mapOriginalZ2,i.__mapOriginalZ2=null))}function Ky(t,e,i){var n=t.getZoom(),o=t.getCenter(),a=e.zoom,r=t.dataToPoint(o);if(null!=e.dx&&null!=e.dy){r[0]-=e.dx,r[1]-=e.dy;o=t.pointToData(r);t.setCenter(o)}if(null!=a){if(i){var s=i.min||0,l=i.max||1/0;a=Math.max(Math.min(n*a,l),s)/n}t.scale[0]*=a,t.scale[1]*=a;var u=t.position,h=(e.originX-u[0])*(a-1),c=(e.originY-u[1])*(a-1);u[0]-=h,u[1]-=c,t.updateTransform();o=t.pointToData(r);t.setCenter(o),t.setZoom(a*n)}return{center:t.getCenter(),zoom:t.getZoom()}}Mf({type:"map",render:function(t,e,i,n){if(!n||"mapToggleSelect"!==n.type||n.from!==this.uid){var o=this.group;if(o.removeAll(),!t.getHostGeoModel()){if(n&&"geoRoam"===n.type&&"series"===n.componentType&&n.seriesId===t.id)(a=this._mapDraw)&&o.add(a.group);else if(t.needsDrawMap){var a=this._mapDraw||new Uy(i,!0);o.add(a.group),a.draw(t,e,i,this,n),this._mapDraw=a}else this._mapDraw&&this._mapDraw.remove(),this._mapDraw=null;t.get("showLegendSymbol")&&e.getComponent("legend")&&this._renderSymbols(t,e,i)}}},remove:function(){this._mapDraw&&this._mapDraw.remove(),this._mapDraw=null,this.group.removeAll()},dispose:function(){this._mapDraw&&this._mapDraw.remove(),this._mapDraw=null},_renderSymbols:function(x,t,e){var _=x.originalData,w=this.group;_.each(_.mapDimension("value"),function(t,e){if(!isNaN(t)){var i=_.getItemLayout(e);if(i&&i.point){var n=i.point,o=i.offset,a=new Hr({style:{fill:x.getData().getVisual("color")},shape:{cx:n[0]+9*o,cy:n[1],r:3},silent:!0,z2:8+(o?0:ys+1)});if(!o){var r=x.mainSeries.getData(),s=_.getName(e),l=r.indexOfName(s),u=_.getItemModel(e),h=u.getModel("label"),c=u.getModel("emphasis.label"),d=r.getItemGraphicEl(l),f=H(x.getFormattedLabel(l,"normal"),s),p=H(x.getFormattedLabel(l,"emphasis"),f),g=d[Xy],m=Math.random();if(!g){g=d[Xy]={};var v=T(jy,!0),y=T(jy,!1);d.on("mouseover",v).on("mouseout",y).on("emphasis",v).on("normal",y)}L(g,{recordVersion:d[Yy]=m,circle:a,labelModel:h,hoverLabelModel:c,emphasisText:p,normalText:f}),qy(g,!1)}w.add(a)}}})}}),gf({type:"geoRoam",event:"geoRoam",update:"updateTransform"},function(n,t){var o=n.componentType||"series";t.eachComponent({mainType:o,query:n},function(t){var e=t.coordinateSystem;if("geo"===e.type){var i=Ky(e,n,t.get("scaleLimit"));t.setCenter&&t.setCenter(i.center),t.setZoom&&t.setZoom(i.zoom),"series"===o&&E(t.seriesGroup,function(t){t.setCenter(i.center),t.setZoom(i.zoom)})}})});var $y=bt;function Jy(){fe.call(this)}function Qy(t){this.name=t,this.zoomLimit,fe.call(this),this._roamTransformable=new Jy,this._rawTransformable=new Jy,this._center,this._zoom}function tx(t,e,i,n){var o=i.seriesModel,a=o?o.coordinateSystem:null;return a===this?a[t](n):null}function ex(t,e,i,n){Qy.call(this,t),this.map=e;var o=My.load(e,i);this._nameCoordMap=o.nameCoordMap,this._regionsMap=o.regionsMap,this._invertLongitute=null==n||n,this.regions=o.regions,this._rect=o.boundingRect}function ix(t,e,i,n){var o=i.geoModel,a=i.seriesModel,r=o?o.coordinateSystem:a?a.coordinateSystem||(a.getReferringComponents("geo")[0]||{}).coordinateSystem:null;return r===this?r[t](n):null}function nx(t,e){var i=t.get("boundingCoords");if(null!=i){var n=i[0],o=i[1];isNaN(n[0])||isNaN(n[1])||isNaN(o[0])||isNaN(o[1])||this.setBoundingRect(n[0],n[1],o[0]-n[0],o[1]-n[1])}var a,r=this.getBoundingRect(),s=t.get("layoutCenter"),l=t.get("layoutSize"),u=e.getWidth(),h=e.getHeight(),c=r.width/r.height*this.aspectScale,d=!1;if(s&&l&&(s=[Pl(s[0],u),Pl(s[1],h)],l=Pl(l,Math.min(u,h)),isNaN(s[0])||isNaN(s[1])||isNaN(l)||(d=!0)),d){var f={};1<c?(f.width=l,f.height=l/c):(f.height=l,f.width=l*c),f.y=s[1]-f.height/2,f.x=s[0]-f.width/2}else(a=t.getBoxLayoutParams()).aspect=c,f=vu(a,{width:u,height:h});this.setViewRect(f.x,f.y,f.width,f.height),this.setCenter(t.get("center")),this.setZoom(t.get("zoom"))}function ox(i,t){E(t.get("geoCoord"),function(t,e){i.addGeoCoord(e,t)})}b(Jy,fe),Qy.prototype={constructor:Qy,type:"view",dimensions:["x","y"],setBoundingRect:function(t,e,i,n){return this._rect=new Mi(t,e,i,n),this._rect},getBoundingRect:function(){return this._rect},setViewRect:function(t,e,i,n){this.transformTo(t,e,i,n),this._viewRect=new Mi(t,e,i,n)},transformTo:function(t,e,i,n){var o=this.getBoundingRect(),a=this._rawTransformable;a.transform=o.calculateTransform(new Mi(t,e,i,n)),a.decomposeTransform(),this._updateTransform()},setCenter:function(t){t&&(this._center=t,this._updateCenterAndZoom())},setZoom:function(t){t=t||1;var e=this.zoomLimit;e&&(null!=e.max&&(t=Math.min(e.max,t)),null!=e.min&&(t=Math.max(e.min,t))),this._zoom=t,this._updateCenterAndZoom()},getDefaultCenter:function(){var t=this.getBoundingRect();return[t.x+t.width/2,t.y+t.height/2]},getCenter:function(){return this._center||this.getDefaultCenter()},getZoom:function(){return this._zoom||1},getRoamTransform:function(){return this._roamTransformable.getLocalTransform()},_updateCenterAndZoom:function(){var t=this._rawTransformable.getLocalTransform(),e=this._roamTransformable,i=this.getDefaultCenter(),n=this.getCenter(),o=this.getZoom();n=bt([],n,t),i=bt([],i,t),e.origin=n,e.position=[i[0]-n[0],i[1]-n[1]],e.scale=[o,o],this._updateTransform()},_updateTransform:function(){var t=this._roamTransformable,e=this._rawTransformable;(e.parent=t).updateTransform(),e.updateTransform(),ne(this.transform||(this.transform=[]),e.transform||ee()),this._rawTransform=e.getLocalTransform(),this.invTransform=this.invTransform||[],le(this.invTransform,this.transform),this.decomposeTransform()},getViewRect:function(){return this._viewRect},getViewRectAfterRoam:function(){var t=this.getBoundingRect().clone();return t.applyTransform(this.transform),t},dataToPoint:function(t,e,i){var n=e?this._rawTransform:this.transform;return i=i||[],n?$y(i,t,n):at(i,t)},pointToData:function(t){var e=this.invTransform;return e?$y([],t,e):[t[0],t[1]]},convertToPixel:T(tx,"dataToPoint"),convertFromPixel:T(tx,"pointToData"),containPoint:function(t){return this.getViewRectAfterRoam().contain(t[0],t[1])}},b(Qy,fe),ex.prototype={constructor:ex,type:"geo",dimensions:["lng","lat"],containCoord:function(t){for(var e=this.regions,i=0;i<e.length;i++)if(e[i].contain(t))return!0;return!1},transformTo:function(t,e,i,n){var o=this.getBoundingRect(),a=this._invertLongitute;o=o.clone(),a&&(o.y=-o.y-o.height);var r=this._rawTransformable;if(r.transform=o.calculateTransform(new Mi(t,e,i,n)),r.decomposeTransform(),a){var s=r.scale;s[1]=-s[1]}r.updateTransform(),this._updateTransform()},getRegion:function(t){return this._regionsMap.get(t)},getRegionByCoord:function(t){for(var e=this.regions,i=0;i<e.length;i++)if(e[i].contain(t))return e[i]},addGeoCoord:function(t,e){this._nameCoordMap.set(t,e)},getGeoCoord:function(t){return this._nameCoordMap.get(t)},getBoundingRect:function(){return this._rect},dataToPoint:function(t,e,i){if("string"==typeof t&&(t=this.getGeoCoord(t)),t)return Qy.prototype.dataToPoint.call(this,t,e,i)},convertToPixel:T(ix,"dataToPoint"),convertFromPixel:T(ix,"pointToData")},b(ex,Qy);var ax={dimensions:ex.prototype.dimensions,create:function(t,s){var l=[];t.eachComponent("geo",function(t,e){var i=t.get("map"),n=t.get("aspectScale"),o=!0,a=yd.retrieveMap(i);a&&a[0]&&"svg"===a[0].type?(null==n&&(n=1),o=!1):null==n&&(n=.75);var r=new ex(i+e,i,t.get("nameMap"),o);r.aspectScale=n,r.zoomLimit=t.get("scaleLimit"),l.push(r),ox(r,t),(t.coordinateSystem=r).model=t,r.resize=nx,r.resize(t,s)}),t.eachSeries(function(t){if("geo"===t.get("coordinateSystem")){var e=t.get("geoIndex")||0;t.coordinateSystem=l[e]}});var i={};return t.eachSeriesByType("map",function(t){if(!t.getHostGeoModel()){var e=t.getMapType();i[e]=i[e]||[],i[e].push(t)}}),E(i,function(t,e){var i=new ex(e,e,p(N(t,function(t){return t.get("nameMap")})));i.zoomLimit=W.apply(null,N(t,function(t){return t.get("scaleLimit")})),l.push(i),i.resize=nx,i.aspectScale=t[0].get("aspectScale"),i.resize(t[0],s),E(t,function(t){ox(t.coordinateSystem=i,t)})}),l},getFilledRegions:function(t,e,i){for(var n=(t||[]).slice(),o=Q(),a=0;a<n.length;a++)o.set(n[a].name,n[a]);return E(My.load(e,i).regions,function(t){var e=t.name;o.get(e)||n.push({name:e})}),n}};mf("geo",ax);vf(function(i){var o={};i.eachSeriesByType("map",function(t){var e=t.getMapType();if(!t.getHostGeoModel()&&!o[e]){var l={};E(t.seriesGroup,function(t){var r=t.coordinateSystem,s=t.originalData;t.get("showLegendSymbol")&&i.getComponent("legend")&&s.each(s.mapDimension("value"),function(t,e){var i=s.getName(e),n=r.getRegion(i);if(n&&!isNaN(t)){var o=l[i]||0,a=r.dataToPoint(n.center);l[i]=o+1,s.setItemLayout(e,{point:a,offset:o})}})});var n=t.getData();n.each(function(t){var e=n.getName(t),i=n.getItemLayout(t)||{};i.showLabel=!l[e],n.setItemLayout(t,i)}),o[e]=!0}})}),yf(function(t){t.eachSeriesByType("map",function(t){var e=t.get("color"),i=t.getModel("itemStyle"),n=i.get("areaColor"),o=i.get("color")||e[t.seriesIndex%e.length];t.getData().setVisual({areaColor:n,color:o})})}),pf(Id.PROCESSOR.STATISTIC,function(t){var n={};t.eachSeriesByType("map",function(t){var e=t.getHostGeoModel(),i=e?"o"+e.id:"i"+t.getMapType();(n[i]=n[i]||[]).push(t)}),E(n,function(t,e){for(var i=function(u,h){var c={};return E(u,function(n){n.each(n.mapDimension("value"),function(t,e){var i="ec-"+n.getName(e);c[i]=c[i]||[],isNaN(t)||c[i].push(t)})}),u[0].map(u[0].mapDimension("value"),function(t,e){for(var i,n="ec-"+u[0].getName(e),o=0,a=1/0,r=-1/0,s=c[n].length,l=0;l<s;l++)a=Math.min(a,c[n][l]),r=Math.max(r,c[n][l]),o+=c[n][l];return i="min"===h?a:"max"===h?r:"average"===h?o/s:o,0===s?NaN:i})}(N(t,function(t){return t.getData()}),t[0].get("mapValueCalculation")),n=0;n<t.length;n++)t[n].originalData=t[n].getData();for(n=0;n<t.length;n++)(t[n].seriesGroup=t)[n].needsDrawMap=0===n&&!t[n].getHostGeoModel(),t[n].setData(i.cloneShallow()),t[n].mainSeries=t[0]})}),ff(function(t){var e=[];E(t.series,function(t){t&&"map"===t.type&&(e.push(t),t.map=t.map||t.mapType,C(t,t.mapLocation))})}),Xv("map",[{type:"mapToggleSelect",event:"mapselectchanged",method:"toggleSelected"},{type:"mapSelect",event:"mapselected",method:"select"},{type:"mapUnSelect",event:"mapunselected",method:"unSelect"}]);var rx=E,sx="\0__link_datas",lx="\0__link_mainData";function ux(i){var n=i.mainData,t=i.datas;t||(t={main:n},i.datasAttr={main:"data"}),i.datas=i.mainData=null,px(n,t,i),rx(t,function(e){rx(n.TRANSFERABLE_METHODS,function(t){e.wrapMethod(t,T(hx,i))})}),n.wrapMethod("cloneShallow",T(dx,i)),rx(n.CHANGABLE_METHODS,function(t){n.wrapMethod(t,T(cx,i))}),Y(t[n.dataType]===n)}function hx(t,e){if(function(t){return t[lx]===t}(this)){var i=L({},this[sx]);px(i[this.dataType]=e,i,t)}else gx(e,this.dataType,this[lx],t);return e}function cx(t,e){return t.struct&&t.struct.update(this),e}function dx(i,n){return rx(n[sx],function(t,e){t!==n&&gx(t.cloneShallow(),e,n,i)}),n}function fx(t){var e=this[lx];return null==t||null==e?e:e[sx][t]}function px(i,t,n){i[sx]={},rx(t,function(t,e){gx(t,e,i,n)})}function gx(t,e,i,n){(i[sx][e]=t)[lx]=i,t.dataType=e,n.struct&&(t[n.structAttr]=n.struct,n.struct[n.datasAttr[e]]=t),t.getLinkedData=fx}function mx(t,e){this.name=t||"",this.depth=0,this.height=0,this.parentNode=null,this.dataIndex=-1,this.children=[],this.viewChildren=[],this.hostTree=e}function vx(e,t,i){this.root,this.data,this._nodes=[],this.hostModel=e,this.levelModels=N(t||[],function(t){return new Il(t,e,e.ecModel)}),this.leavesModel=new Il(i||{},e,e.ecModel)}function yx(t,e){var i=e.children;t.parentNode!==e&&(i.push(t),t.parentNode=e)}function xx(t,e){var i=t.isExpand?t.children:[],n=t.parentNode.children,o=t.hierNode.i?n[t.hierNode.i-1]:null;if(i.length){!function(t){var e=t.children,i=e.length,n=0,o=0;for(;0<=--i;){var a=e[i];a.hierNode.prelim+=n,a.hierNode.modifier+=n,o+=a.hierNode.change,n+=a.hierNode.shift+o}}(t);var a=(i[0].hierNode.prelim+i[i.length-1].hierNode.prelim)/2;o?(t.hierNode.prelim=o.hierNode.prelim+e(t,o),t.hierNode.modifier=t.hierNode.prelim-a):t.hierNode.prelim=a}else o&&(t.hierNode.prelim=o.hierNode.prelim+e(t,o));t.parentNode.hierNode.defaultAncestor=function(t,e,i,n){if(e){for(var o=t,a=t,r=a.parentNode.children[0],s=e,l=o.hierNode.modifier,u=a.hierNode.modifier,h=r.hierNode.modifier,c=s.hierNode.modifier;s=Mx(s),a=Ix(a),s&&a;){o=Mx(o),r=Ix(r),o.hierNode.ancestor=t;var d=s.hierNode.prelim+c-a.hierNode.prelim-u+n(s,a);0<d&&(Tx((p=t,g=i,(f=s).hierNode.ancestor.parentNode===p.parentNode?f.hierNode.ancestor:g),t,d),u+=d,l+=d),c+=s.hierNode.modifier,u+=a.hierNode.modifier,l+=o.hierNode.modifier,h+=r.hierNode.modifier}s&&!Mx(o)&&(o.hierNode.thread=s,o.hierNode.modifier+=c-l),a&&!Ix(r)&&(r.hierNode.thread=a,r.hierNode.modifier+=u-h,i=t)}var f,p,g;return i}(t,o,t.parentNode.hierNode.defaultAncestor||n[0],e)}function _x(t){var e=t.hierNode.prelim+t.parentNode.hierNode.modifier;t.setLayout({x:e},!0),t.hierNode.modifier+=t.parentNode.hierNode.modifier}function bx(t){return arguments.length?t:Ax}function Sx(t,e){var i={};return t-=Math.PI/2,i.x=e*Math.cos(t),i.y=e*Math.sin(t),i}function Mx(t){var e=t.children;return e.length&&t.isExpand?e[e.length-1]:t.hierNode.thread}function Ix(t){var e=t.children;return e.length&&t.isExpand?e[0]:t.hierNode.thread}function Tx(t,e,i){var n=i/(e.hierNode.i-t.hierNode.i);e.hierNode.change-=n,e.hierNode.shift+=i,e.hierNode.modifier+=i,e.hierNode.prelim+=i,t.hierNode.change+=n}function Ax(t,e){return t.parentNode===e.parentNode?1:2}function Dx(t,e){var i=t.getItemLayout(e);return i&&!isNaN(i.x)&&!isNaN(i.y)&&"none"!==t.getItemVisual(e,"symbol")}function Cx(t,e,i){return i.itemModel=e,i.itemStyle=e.getModel("itemStyle").getItemStyle(),i.hoverItemStyle=e.getModel("emphasis.itemStyle").getItemStyle(),i.lineStyle=e.getModel("lineStyle").getLineStyle(),i.labelModel=e.getModel("label"),i.hoverLabelModel=e.getModel("emphasis.label"),!1===t.isExpand&&0!==t.children.length?i.symbolInnerColor=i.itemStyle.fill:i.symbolInnerColor="#fff",i}function Lx(t,e,i,n,o,a){var r=!i,s=t.tree.getNodeByDataIndex(e),l=s.getModel(),u=(a=Cx(s,l,a),t.tree.root),h=s.parentNode===u?s:s.parentNode||s,c=t.getItemGraphicEl(h.dataIndex),d=h.getLayout(),f=c?{x:c.position[0],y:c.position[1],rawX:c.__radialOldRawX,rawY:c.__radialOldRawY}:d,p=s.getLayout();r?(i=new Fg(t,e,a)).attr("position",[f.x,f.y]):i.updateData(t,e,a),i.__radialOldRawX=i.__radialRawX,i.__radialOldRawY=i.__radialRawY,i.__radialRawX=p.rawX,i.__radialRawY=p.rawY,n.add(i),t.setItemGraphicEl(e,i),sl(i,{position:[p.x,p.y]},o);var g=i.getSymbolPath();if("radial"===a.layout){var m,v,y=u.children[0],x=y.getLayout(),_=y.children.length;if(p.x===x.x&&!0===s.isExpand){var w={};w.x=(y.children[0].getLayout().x+y.children[_-1].getLayout().x)/2,w.y=(y.children[0].getLayout().y+y.children[_-1].getLayout().y)/2,(m=Math.atan2(w.y-x.y,w.x-x.x))<0&&(m=2*Math.PI+m),(v=w.x<x.x)&&(m-=Math.PI)}else(m=Math.atan2(p.y-x.y,p.x-x.x))<0&&(m=2*Math.PI+m),0===s.children.length||0!==s.children.length&&!1===s.isExpand?(v=p.x<x.x)&&(m-=Math.PI):(v=p.x>x.x)||(m-=Math.PI);var b=v?"left":"right",S=a.labelModel.get("rotate"),M=S*(Math.PI/180);g.setStyle({textPosition:a.labelModel.get("position")||b,textRotation:null==S?-m:M,textOrigin:"center",verticalAlign:"middle"})}if(s.parentNode&&s.parentNode!==u){var I=i.__edge;sl(I=I||(i.__edge=new ls({shape:Px(a,f,f),style:C({opacity:0,strokeNoScale:!0},a.lineStyle)})),{shape:Px(a,d,p),style:{opacity:1}},o),n.add(I)}}function kx(t,e,i,n,o,a){for(var r,s=t.tree.getNodeByDataIndex(e),l=t.tree.root,u=s.getModel(),h=(a=Cx(s,u,a),s.parentNode===l?s:s.parentNode||s);null==(r=h.getLayout());)h=h.parentNode===l?h:h.parentNode||h;sl(i,{position:[r.x+1,r.y+1]},o,function(){n.remove(i),t.setItemGraphicEl(e,null)}),i.fadeOut(null,{keepLabel:!0});var c=i.__edge;c&&sl(c,{shape:Px(a,r,r),style:{opacity:0}},o,function(){n.remove(c)})}function Px(t,e,i){var n,o,a,r,s,l,u,h,c=t.orient;if("radial"!==t.layout)return s=e.x,u=e.y,l=i.x,h=i.y,"LR"!==c&&"RL"!==c||(n=s+(l-s)*t.curvature,o=u,a=l+(s-l)*t.curvature,r=h),"TB"!==c&&"BT"!==c||(n=s,o=u+(h-u)*t.curvature,a=l,r=h+(u-h)*t.curvature),{x1:s,y1:u,x2:l,y2:h,cpx1:n,cpy1:o,cpx2:a,cpy2:r};s=e.rawX,u=e.rawY,l=i.rawX,h=i.rawY;var d=Sx(s,u),f=Sx(s,u+(h-u)*t.curvature),p=Sx(l,h+(u-h)*t.curvature),g=Sx(l,h);return{x1:d.x,y1:d.y,x2:g.x,y2:g.y,cpx1:f.x,cpy1:f.y,cpx2:p.x,cpy2:p.y}}function Nx(t,e){for(var i,n=[t];i=n.pop();)if(e(i),i.isExpand){var o=i.children;if(o.length)for(var a=o.length-1;0<=a;a--)n.push(o[a])}}mx.prototype={constructor:mx,isRemoved:function(){return this.dataIndex<0},eachNode:function(t,e,i){"function"==typeof t&&(i=e,e=t,t=null),z(t=t||{})&&(t={order:t});var n,o=t.order||"preorder",a=this[t.attr||"children"];"preorder"===o&&(n=e.call(i,this));for(var r=0;!n&&r<a.length;r++)a[r].eachNode(t,e,i);"postorder"===o&&e.call(i,this)},updateDepthAndHeight:function(t){var e=0;this.depth=t;for(var i=0;i<this.children.length;i++){var n=this.children[i];n.updateDepthAndHeight(t+1),n.height>e&&(e=n.height)}this.height=e+1},getNodeById:function(t){if(this.getId()===t)return this;for(var e=0,i=this.children,n=i.length;e<n;e++){var o=i[e].getNodeById(t);if(o)return o}},contains:function(t){if(t===this)return!0;for(var e=0,i=this.children,n=i.length;e<n;e++){var o=i[e].contains(t);if(o)return o}},getAncestors:function(t){for(var e=[],i=t?this:this.parentNode;i;)e.push(i),i=i.parentNode;return e.reverse(),e},getValue:function(t){var e=this.hostTree.data;return e.get(e.getDimension(t||"value"),this.dataIndex)},setLayout:function(t,e){0<=this.dataIndex&&this.hostTree.data.setItemLayout(this.dataIndex,t,e)},getLayout:function(){return this.hostTree.data.getItemLayout(this.dataIndex)},getModel:function(t){if(!(this.dataIndex<0)){var e,i=this.hostTree,n=i.data.getItemModel(this.dataIndex),o=this.getLevelModel();return o||0!==this.children.length&&(0===this.children.length||!1!==this.isExpand)||(e=this.getLeavesModel()),n.getModel(t,(o||e||i.hostModel).getModel(t))}},getLevelModel:function(){return(this.hostTree.levelModels||[])[this.depth]},getLeavesModel:function(){return this.hostTree.leavesModel},setVisual:function(t,e){0<=this.dataIndex&&this.hostTree.data.setItemVisual(this.dataIndex,t,e)},getVisual:function(t,e){return this.hostTree.data.getItemVisual(this.dataIndex,t,e)},getRawIndex:function(){return this.hostTree.data.getRawIndex(this.dataIndex)},getId:function(){return this.hostTree.data.getId(this.dataIndex)},isAncestorOf:function(t){for(var e=t.parentNode;e;){if(e===this)return!0;e=e.parentNode}return!1},isDescendantOf:function(t){return t!==this&&t.isAncestorOf(this)}},vx.prototype={constructor:vx,type:"tree",eachNode:function(t,e,i){this.root.eachNode(t,e,i)},getNodeByDataIndex:function(t){var e=this.data.getRawIndex(t);return this._nodes[e]},getNodeByName:function(t){return this.root.getNodeByName(t)},update:function(){for(var t=this.data,e=this._nodes,i=0,n=e.length;i<n;i++)e[i].dataIndex=-1;for(i=0,n=t.count();i<n;i++)e[t.getRawIndex(i)].dataIndex=i},clearLayouts:function(){this.data.clearItemLayouts()}},vx.createTree=function(t,e,i,n){var s=new vx(e,i.levels,i.leaves),l=[],u=1;!function t(e,i){var n=e.value;u=Math.max(u,k(n)?n.length:1);l.push(e);var o=new mx(e.name,s);i?yx(o,i):s.root=o;s._nodes.push(o);var a=e.children;if(a)for(var r=0;r<a.length;r++)t(a[r],o)}(t),s.root.updateDepthAndHeight(0);var o=np(l,{coordDimensions:["value"],dimensionsCount:u}),a=new Wf(o,e);return a.initData(l),ux({mainData:a,struct:s,structAttr:"tree"}),s.update(),n&&n(a),s},ic.extend({type:"series.tree",layoutInfo:null,layoutMode:"box",getInitialData:function(t){var e={name:t.name,children:t.data},i=t.leaves||{},n={};n.leaves=i;var o=vx.createTree(e,this,n,function(t){t.wrapMethod("getItemModel",function(t,e){var i=o.getNodeByDataIndex(e),n=i.getLeavesModel();return i.children.length&&i.isExpand||(t.parentModel=n),t})});var a=0;o.eachNode("preorder",function(t){t.depth>a&&(a=t.depth)});var r=t.expandAndCollapse&&0<=t.initialTreeDepth?t.initialTreeDepth:a;return o.root.eachNode("preorder",function(t){var e=t.hostTree.data.getRawDataItem(t.dataIndex);t.isExpand=e&&null!=e.collapsed?!e.collapsed:t.depth<=r}),o.data},getOrient:function(){var t=this.get("orient");return"horizontal"===t?t="LR":"vertical"===t&&(t="TB"),t},setZoom:function(t){this.option.zoom=t},setCenter:function(t){this.option.center=t},formatTooltip:function(t){for(var e=this.getData().tree,i=e.root.children[0],n=e.getNodeByDataIndex(t),o=n.getValue(),a=n.name;n&&n!==i;)a=n.parentNode.name+"."+a,n=n.parentNode;return eu(a+(isNaN(o)||null==o?"":" : "+o))},defaultOption:{zlevel:0,z:2,coordinateSystem:"view",left:"12%",top:"12%",right:"12%",bottom:"12%",layout:"orthogonal",roam:!1,nodeScaleRatio:.4,center:null,zoom:1,orient:"LR",symbol:"emptyCircle",symbolSize:7,expandAndCollapse:!0,initialTreeDepth:2,lineStyle:{color:"#ccc",width:1.5,curveness:.5},itemStyle:{color:"lightsteelblue",borderColor:"#c23531",borderWidth:1.5},label:{show:!0,color:"#555"},leaves:{label:{show:!0}},animationEasing:"linear",animationDuration:700,animationDurationUpdate:1e3}}),Mf({type:"tree",init:function(t,e){this._oldTree,this._mainGroup=new Ii,this._controller=new Ly(e.getZr()),this._controllerHost={target:this.group},this.group.add(this._mainGroup)},render:function(n,t,i,e){var o=n.getData(),a=n.layoutInfo,r=this._mainGroup,s=n.get("layout");"radial"===s?r.attr("position",[a.x+a.width/2,a.y+a.height/2]):r.attr("position",[a.x,a.y]),this._updateViewCoordSys(n,a,s),this._updateController(n,t,i);var l=this._data,u={expandAndCollapse:n.get("expandAndCollapse"),layout:s,orient:n.getOrient(),curvature:n.get("lineStyle.curveness"),symbolRotate:n.get("symbolRotate"),symbolOffset:n.get("symbolOffset"),hoverAnimation:n.get("hoverAnimation"),useNameLabel:!0,fadeIn:!0};o.diff(l).add(function(t){Dx(o,t)&&Lx(o,t,null,r,n,u)}).update(function(t,e){var i=l.getItemGraphicEl(e);Dx(o,t)?Lx(o,t,i,r,n,u):i&&kx(l,e,i,r,n,u)}).remove(function(t){var e=l.getItemGraphicEl(t);e&&kx(l,t,e,r,n,u)}).execute(),this._nodeScaleRatio=n.get("nodeScaleRatio"),this._updateNodeAndLinkScale(n),!0===u.expandAndCollapse&&o.eachItemGraphicEl(function(t,e){t.off("click").on("click",function(){i.dispatchAction({type:"treeExpandAndCollapse",seriesId:n.id,dataIndex:e})})}),this._data=o},_updateViewCoordSys:function(t){var i=t.getData(),n=[];i.each(function(t){var e=i.getItemLayout(t);!e||isNaN(e.x)||isNaN(e.y)||n.push([+e.x,+e.y])});var e=[],o=[];Ba(n,e,o);var a=this._min,r=this._max;o[0]-e[0]==0&&(e[0]=a?a[0]:e[0]-1,o[0]=r?r[0]:o[0]+1),o[1]-e[1]==0&&(e[1]=a?a[1]:e[1]-1,o[1]=r?r[1]:o[1]+1);var s=t.coordinateSystem=new Qy;s.zoomLimit=t.get("scaleLimit"),s.setBoundingRect(e[0],e[1],o[0]-e[0],o[1]-e[1]),s.setCenter(t.get("center")),s.setZoom(t.get("zoom")),this.group.attr({position:s.position,scale:s.scale}),this._viewCoordSys=s,this._min=e,this._max=o},_updateController:function(o,t,a){var e=this._controller,i=this._controllerHost,r=this.group;e.setPointerChecker(function(t,e,i){var n=r.getBoundingRect();return n.applyTransform(r.transform),n.contain(e,i)&&!Wy(t,a,o)}),e.enable(o.get("roam")),i.zoomLimit=o.get("scaleLimit"),i.zoom=o.coordinateSystem.getZoom(),e.off("pan").off("zoom").on("pan",function(t){Vy(i,t.dx,t.dy),a.dispatchAction({seriesId:o.id,type:"treeRoam",dx:t.dx,dy:t.dy})},this).on("zoom",function(t){Gy(i,t.scale,t.originX,t.originY),a.dispatchAction({seriesId:o.id,type:"treeRoam",zoom:t.scale,originX:t.originX,originY:t.originY}),this._updateNodeAndLinkScale(o)},this)},_updateNodeAndLinkScale:function(t){var e=t.getData(),i=this._getNodeGlobalScale(t),n=[i,i];e.eachItemGraphicEl(function(t,e){t.attr("scale",n)})},_getNodeGlobalScale:function(t){var e=t.coordinateSystem;if("view"!==e.type)return 1;var i=this._nodeScaleRatio,n=e.scale,o=n&&n[0]||1;return((e.getZoom()-1)*i+1)/o},dispose:function(){this._controller&&this._controller.dispose(),this._controllerHost={}},remove:function(){this._mainGroup.removeAll(),this._data=null}}),gf({type:"treeExpandAndCollapse",event:"treeExpandAndCollapse",update:"update"},function(n,t){t.eachComponent({mainType:"series",subType:"tree",query:n},function(t){var e=n.dataIndex,i=t.getData().tree.getNodeByDataIndex(e);i.isExpand=!i.isExpand})}),gf({type:"treeRoam",event:"treeRoam",update:"none"},function(i,t){t.eachComponent({mainType:"series",subType:"tree",query:i},function(t){var e=Ky(t.coordinateSystem,i);t.setCenter&&t.setCenter(e.center),t.setZoom&&t.setZoom(e.zoom)})});function Ox(t,e,i){if(t&&0<=_(e,t.type)){var n=i.getData().tree.root,o=t.targetNode;if("string"==typeof o&&(o=n.getNodeById(o)),o&&n.contains(o))return{node:o};var a=t.targetNodeId;if(null!=a&&(o=n.getNodeById(a)))return{node:o}}}function Ex(t){for(var e=[];t;)(t=t.parentNode)&&e.push(t);return e.reverse()}function zx(t,e){return 0<=_(Ex(t),e)}function Rx(t,e){for(var i=[];t;){var n=t.dataIndex;i.push({name:t.name,dataIndex:n,value:e.getRawValue(n)}),t=t.parentNode}return i.reverse(),i}yf(Mm("tree","circle")),vf(function(t,e){t.eachSeriesByType("tree",function(t){!function(t,e){var i=function(t,e){return vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,e);t.layoutInfo=i;var n=t.get("layout"),o=0,a=0,r=null;r="radial"===n?(o=2*Math.PI,a=Math.min(i.height,i.width)/2,bx(function(t,e){return(t.parentNode===e.parentNode?1:2)/t.depth})):(o=i.width,a=i.height,bx());var s=t.getData().tree.root,l=s.children[0];if(l){!function(t){t.hierNode={defaultAncestor:null,ancestor:t,prelim:0,modifier:0,change:0,shift:0,i:0,thread:null};for(var e,i,n=[t];e=n.pop();)if(i=e.children,e.isExpand&&i.length)for(var o=i.length-1;0<=o;o--){var a=i[o];a.hierNode={defaultAncestor:null,ancestor:a,prelim:0,modifier:0,change:0,shift:0,i:o,thread:null},n.push(a)}}(s),function(t,e,i){for(var n,o=[t],a=[];n=o.pop();)if(a.push(n),n.isExpand){var r=n.children;if(r.length)for(var s=0;s<r.length;s++)o.push(r[s])}for(;n=a.pop();)e(n,i)}(l,xx,r),s.hierNode.modifier=-l.hierNode.prelim,Nx(l,_x);var u=l,h=l,c=l;Nx(l,function(t){var e=t.getLayout().x;e<u.getLayout().x&&(u=t),e>h.getLayout().x&&(h=t),t.depth>c.depth&&(c=t)});var d=u===h?1:r(u,h)/2,f=d-u.getLayout().x,p=0,g=0,m=0,v=0;if("radial"===n)p=o/(h.getLayout().x+d+f),g=a/(c.depth-1||1),Nx(l,function(t){m=(t.getLayout().x+f)*p,v=(t.depth-1)*g;var e=Sx(m,v);t.setLayout({x:e.x,y:e.y,rawX:m,rawY:v},!0)});else{var y=t.getOrient();"RL"===y||"LR"===y?(g=a/(h.getLayout().x+d+f),p=o/(c.depth-1||1),Nx(l,function(t){v=(t.getLayout().x+f)*g,m="LR"===y?(t.depth-1)*p:o-(t.depth-1)*p,t.setLayout({x:m,y:v},!0)})):"TB"!==y&&"BT"!==y||(p=o/(h.getLayout().x+d+f),g=a/(c.depth-1||1),Nx(l,function(t){m=(t.getLayout().x+f)*p,v="TB"===y?(t.depth-1)*g:a-(t.depth-1)*g,t.setLayout({x:m,y:v},!0)}))}}}(t,e)})}),ic.extend({type:"series.treemap",layoutMode:"box",dependencies:["grid","polar"],preventUsingHoverLayer:!0,_viewRoot:null,defaultOption:{progressive:0,left:"center",top:"middle",right:null,bottom:null,width:"80%",height:"80%",sort:!0,clipWindow:"origin",squareRatio:.5*(1+Math.sqrt(5)),leafDepth:null,drillDownIcon:"▶",zoomToNodeRatio:.1024,roam:!0,nodeClick:"zoomToNode",animation:!0,animationDurationUpdate:900,animationEasing:"quinticInOut",breadcrumb:{show:!0,height:22,left:"center",top:"bottom",emptyItemWidth:25,itemStyle:{color:"rgba(0,0,0,0.7)",borderColor:"rgba(255,255,255,0.7)",borderWidth:1,shadowColor:"rgba(150,150,150,1)",shadowBlur:3,shadowOffsetX:0,shadowOffsetY:0,textStyle:{color:"#fff"}},emphasis:{textStyle:{}}},label:{show:!0,distance:0,padding:5,position:"inside",color:"#fff",ellipsis:!0},upperLabel:{show:!1,position:[0,"50%"],height:20,color:"#fff",ellipsis:!0,verticalAlign:"middle"},itemStyle:{color:null,colorAlpha:null,colorSaturation:null,borderWidth:0,gapWidth:0,borderColor:"#fff",borderColorSaturation:null},emphasis:{upperLabel:{show:!0,position:[0,"50%"],color:"#fff",ellipsis:!0,verticalAlign:"middle"}},visualDimension:0,visualMin:null,visualMax:null,color:[],colorAlpha:null,colorSaturation:null,colorMappingBy:"index",visibleMin:10,childrenVisibleMin:null,levels:[]},getInitialData:function(t,e){var i={name:t.name,children:t.data};!function i(t){var n=0;E(t.children,function(t){i(t);var e=t.value;k(e)&&(e=e[0]),n+=e});var e=t.value;k(e)&&(e=e[0]);null!=e&&!isNaN(e)||(e=n);e<0&&(e=0);k(t.value)?t.value[0]=e:t.value=e}(i);var n=t.levels||[];n=t.levels=function(t,e){var n,i=e.get("color");if(!i)return;if(E(t=t||[],function(t){var e=new Il(t),i=e.get("color");(e.get("itemStyle.color")||i&&"none"!==i)&&(n=!0)}),!n){(t[0]||(t[0]={})).color=i.slice()}return t}(n,e);var o={};return o.levels=n,vx.createTree(i,this,o).data},optionUpdated:function(){this.resetViewRoot()},formatTooltip:function(t){var e=this.getData(),i=this.getRawValue(t),n=k(i)?Kl(i[0]):Kl(i);return eu(e.getName(t)+": "+n)},getDataParams:function(t){var e=ic.prototype.getDataParams.apply(this,arguments),i=this.getData().tree.getNodeByDataIndex(t);return e.treePathInfo=Rx(i,this),e},setLayoutInfo:function(t){this.layoutInfo=this.layoutInfo||{},L(this.layoutInfo,t)},mapIdToIndex:function(t){var e=this._idIndexMap;e||(e=this._idIndexMap=Q(),this._idIndexMapCount=0);var i=e.get(t);return null==i&&e.set(t,i=this._idIndexMapCount++),i},getViewRoot:function(){return this._viewRoot},resetViewRoot:function(t){t?this._viewRoot=t:t=this._viewRoot;var e=this.getRawData().tree.root;t&&(t===e||e.contains(t))||(this._viewRoot=e)}});var Bx=5;function Vx(t){this.group=new Ii,t.add(this.group)}function Gx(t,e,i,n,o,a){var r=[[o?t:t-Bx,e],[t+i,e],[t+i,e+n],[o?t:t-Bx,e+n]];return a||r.splice(2,0,[t+i+Bx,e+n/2]),o||r.push([t,e+n/2]),r}Vx.prototype={constructor:Vx,render:function(t,e,i,n){var o=t.getModel("breadcrumb"),a=this.group;if(a.removeAll(),o.get("show")&&i){var r=o.getModel("itemStyle"),s=r.getModel("textStyle"),l={pos:{left:o.get("left"),right:o.get("right"),top:o.get("top"),bottom:o.get("bottom")},box:{width:e.getWidth(),height:e.getHeight()},emptyItemWidth:o.get("emptyItemWidth"),totalWidth:0,renderList:[]};this._prepare(i,l,s),this._renderContent(t,l,r,s,n),yu(a,l.pos,l.box)}},_prepare:function(t,e,i){for(var n=t;n;n=n.parentNode){var o=n.getModel().get("name"),a=i.getTextRect(o),r=Math.max(a.width+16,e.emptyItemWidth);e.totalWidth+=r+8,e.renderList.push({node:n,text:o,width:r})}},_renderContent:function(t,e,i,n,o){for(var a,r,s=0,l=e.emptyItemWidth,u=t.get("breadcrumb.height"),h=function(t,e,i){var n=e.width,o=e.height,a=Pl(t.x,n),r=Pl(t.y,o),s=Pl(t.x2,n),l=Pl(t.y2,o);return(isNaN(a)||isNaN(parseFloat(t.x)))&&(a=0),(isNaN(s)||isNaN(parseFloat(t.x2)))&&(s=n),(isNaN(r)||isNaN(parseFloat(t.y)))&&(r=0),(isNaN(l)||isNaN(parseFloat(t.y2)))&&(l=o),i=Jl(i||0),{width:Math.max(s-a-i[1]-i[3],0),height:Math.max(l-r-i[0]-i[2],0)}}(e.pos,e.box),c=e.totalWidth,d=e.renderList,f=d.length-1;0<=f;f--){var p=d[f],g=p.node,m=p.width,v=p.text;c>h.width&&(c-=m-l,m=l,v=null);var y=new qr({shape:{points:Gx(s,0,m,u,f===d.length-1,0===f)},style:C(i.getItemStyle(),{lineJoin:"bevel",text:v,textFill:n.getTextColor(),textFont:n.getFont()}),z:10,onclick:T(o,g)});this.group.add(y),a=t,r=g,y.eventData={componentType:"series",componentSubType:"treemap",componentIndex:a.componentIndex,seriesIndex:a.componentIndex,seriesName:a.name,seriesType:"treemap",selfType:"breadcrumb",nodeData:{dataIndex:r&&r.dataIndex,name:r&&r.name},treePathInfo:r&&Rx(r,a)},s+=m+8}},remove:function(){this.group.removeAll()}};function Fx(t){var e=$x(t);return e.stroke=e.fill=e.lineWidth=null,e}var Wx=A,Hx=Ii,Zx=is,Ux=E,Xx=["label"],Yx=["emphasis","label"],jx=["upperLabel"],qx=["emphasis","upperLabel"],Kx=10,$x=ra([["fill","color"],["stroke","strokeColor"],["lineWidth","strokeWidth"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]);function Jx(d,r,s,l,u,i,f,t,e,n){if(f){var p=f.getLayout();if(p&&p.isInView){var h=p.width,c=p.height,g=p.borderWidth,m=p.invisible,v=f.getRawIndex(),y=t&&t.getRawIndex(),o=f.viewChildren,x=p.upperHeight,a=o&&o.length,_=f.getModel("itemStyle"),w=f.getModel("emphasis.itemStyle"),b=A("nodeGroup",Hx);if(b){if(e.add(b),b.attr("position",[p.x||0,p.y||0]),b.__tmNodeWidth=h,b.__tmNodeHeight=c,p.isAboveViewRoot)return b;var S=A("background",Zx,n,1);if(S&&function(t,n,o){n.dataIndex=f.dataIndex,n.seriesIndex=d.seriesIndex,n.setShape({x:0,y:0,width:h,height:c});var a=f.getVisual("borderColor",!0),r=w.get("borderColor");I(n,function(){var t=Fx(_);t.fill=a;var e=$x(w);if(e.fill=r,o){var i=h-2*g;T(t,e,a,i,x,{x:g,y:0,width:i,height:x})}else t.text=e.text=null;n.setStyle(t),Ys(n,e)}),t.add(n)}(b,S,a&&p.upperHeight),!a){var M=A("content",Zx,n,2);M&&function(t,i){i.dataIndex=f.dataIndex,i.seriesIndex=d.seriesIndex;var n=Math.max(h-2*g,0),o=Math.max(c-2*g,0);i.culling=!0,i.setShape({x:g,y:g,width:n,height:o});var a=f.getVisual("color",!0);I(i,function(){var t=Fx(_);t.fill=a;var e=$x(w);T(t,e,a,n,o),i.setStyle(t),Ys(i,e)}),t.add(i)}(b,M)}return b}}}function I(t,e){m?t.invisible||i.push(t):(e(),t.__tmWillVisible||(t.invisible=!1))}function T(t,e,i,n,o,a){var r=f.getModel(),s=W(d.getFormattedLabel(f.dataIndex,"normal",null,null,a?"upperLabel":"label"),r.get("name"));if(!a&&p.isLeafRoot){var l=d.get("drillDownIcon",!0);s=l?l+" "+s:s}var u=r.getModel(a?jx:Xx),h=r.getModel(a?qx:Yx),c=u.getShallow("show");$s(t,e,u,h,{defaultText:c?s:null,autoColor:i,isRectText:!0}),a&&(t.textRect=D(a)),t.truncate=c&&u.get("ellipsis")?{outerWidth:n,outerHeight:o,minChar:2}:null}function A(t,e,i,n){var o=null!=y&&s[t][y],a=u[t];return o?(s[t][y]=null,function(t,e,i){(t[v]={}).old="nodeGroup"===i?e.position.slice():L({},e.shape)}(a,o,t)):m||((o=new e({z:function(t,e){var i=t*Kx+e;return(i-1)/i}(i,n)})).__tmDepth=i,function(t,e,i){var n=t[v]={},o=f.parentNode;if(o&&(!l||"drillDown"===l.direction)){var a=0,r=0,s=u.background[o.getRawIndex()];!l&&s&&s.old&&(a=s.old.width,r=s.old.height),n.old="nodeGroup"===i?[0,r]:{x:a,y:r,width:0,height:0}}n.fadein="nodeGroup"!==i}(a,0,o.__tmStorageName=t)),r[t][v]=o}}Mf({type:"treemap",init:function(t,e){this._containerGroup,this._storage={nodeGroup:[],background:[],content:[]},this._oldTree,this._breadcrumb,this._controller,this._state="ready"},render:function(t,e,i,n){if(!(_(e.findComponents({mainType:"series",subType:"treemap",query:n}),t)<0)){this.seriesModel=t,this.api=i,this.ecModel=e;var o=Ox(n,["treemapZoomToNode","treemapRootToNode"],t),a=n&&n.type,r=t.layoutInfo,s=!this._oldTree,l=this._storage,u="treemapRootToNode"===a&&o&&l?{rootNodeGroup:l.nodeGroup[o.node.getRawIndex()],direction:n.direction}:null,h=this._giveContainerGroup(r),c=this._doRender(h,t,u);s||a&&"treemapZoomToNode"!==a&&"treemapRootToNode"!==a?c.renderFinally():this._doAnimation(h,c,t,u),this._resetController(i),this._renderBreadcrumb(t,i,o)}},_giveContainerGroup:function(t){var e=this._containerGroup;return e||(e=this._containerGroup=new Hx,this._initEvents(e),this.group.add(e)),e.attr("position",[t.x,t.y]),e},_doRender:function(t,e,i){var n=e.getData().tree,o=this._oldTree,a={nodeGroup:[],background:[],content:[]},r={nodeGroup:[],background:[],content:[]},s=this._storage,l=[],c=T(Jx,e,r,s,i,a,l);!function a(r,s,l,u,h){u?Ux(s=r,function(t,e){t.isRemoved()||i(e,e)}):new Tf(s,r,t,t).add(i).update(i).remove(T(i,null)).execute();function t(t){return t.getId()}function i(t,e){var i=null!=t?r[t]:null,n=null!=e?s[e]:null,o=c(i,n,l,h);o&&a(i&&i.viewChildren||[],n&&n.viewChildren||[],o,u,h+1)}}(n.root?[n.root]:[],o&&o.root?[o.root]:[],t,n===o||!o,0);var u,h,d=(h={nodeGroup:[],background:[],content:[]},(u=s)&&Ux(u,function(t,e){var i=h[e];Ux(t,function(t){t&&(i.push(t),t.__tmWillDelete=1)})}),h);return this._oldTree=n,this._storage=r,{lastsForAnimation:a,willDeleteEls:d,renderFinally:function(){Ux(d,function(t){Ux(t,function(t){t.parent&&t.parent.remove(t)})}),Ux(l,function(t){t.invisible=!0,t.dirty()})}}},_doAnimation:function(t,a,e,s){if(e.get("animation")){var l=e.get("animationDurationUpdate"),u=e.get("animationEasing"),h=function(){var a,r=[],s={};return{add:function(t,e,i,n,o){return z(n)&&(o=n,n=0),!s[t.id]&&(s[t.id]=1,r.push({el:t,target:e,time:i,delay:n,easing:o}),!0)},done:function(t){return a=t,this},start:function(){for(var t=r.length,e=0,i=r.length;e<i;e++){var n=r[e];n.el.animateTo(n.target,n.time,n.delay,n.easing,o)}return this;function o(){--t||(r.length=0,s={},a&&a())}}}}();Ux(a.willDeleteEls,function(t,r){Ux(t,function(t,e){if(!t.invisible){var i,n=t.parent;if(s&&"drillDown"===s.direction)i=n===s.rootNodeGroup?{shape:{x:0,y:0,width:n.__tmNodeWidth,height:n.__tmNodeHeight},style:{opacity:0}}:{style:{opacity:0}};else{var o=0,a=0;n.__tmWillDelete||(o=n.__tmNodeWidth/2,a=n.__tmNodeHeight/2),i="nodeGroup"===r?{position:[o,a],style:{opacity:0}}:{shape:{x:o,y:a,width:0,height:0},style:{opacity:0}}}i&&h.add(t,i,l,u)}})}),Ux(this._storage,function(t,o){Ux(t,function(t,e){var i=a.lastsForAnimation[o][e],n={};i&&("nodeGroup"===o?i.old&&(n.position=t.position.slice(),t.attr("position",i.old)):(i.old&&(n.shape=L({},t.shape),t.setShape(i.old)),i.fadein?(t.setStyle("opacity",0),n.style={opacity:1}):1!==t.style.opacity&&(n.style={opacity:1})),h.add(t,n,l,u))})},this),this._state="animating",h.done(Wx(function(){this._state="ready",a.renderFinally()},this)).start()}},_resetController:function(t){var e=this._controller;e||((e=this._controller=new Ly(t.getZr())).enable(this.seriesModel.get("roam")),e.on("pan",Wx(this._onPan,this)),e.on("zoom",Wx(this._onZoom,this)));var n=new Mi(0,0,t.getWidth(),t.getHeight());e.setPointerChecker(function(t,e,i){return n.contain(e,i)})},_clearController:function(){var t=this._controller;t&&(t.dispose(),t=null)},_onPan:function(t){if("animating"!==this._state&&(3<Math.abs(t.dx)||3<Math.abs(t.dy))){var e=this.seriesModel.getData().tree.root;if(!e)return;var i=e.getLayout();if(!i)return;this.api.dispatchAction({type:"treemapMove",from:this.uid,seriesId:this.seriesModel.id,rootRect:{x:i.x+t.dx,y:i.y+t.dy,width:i.width,height:i.height}})}},_onZoom:function(t){var e=t.originX,i=t.originY;if("animating"!==this._state){var n=this.seriesModel.getData().tree.root;if(!n)return;var o=n.getLayout();if(!o)return;var a=new Mi(o.x,o.y,o.width,o.height),r=this.seriesModel.layoutInfo;e-=r.x,i-=r.y;var s=ee();ae(s,s,[-e,-i]),se(s,s,[t.scale,t.scale]),ae(s,s,[e,i]),a.applyTransform(s),this.api.dispatchAction({type:"treemapRender",from:this.uid,seriesId:this.seriesModel.id,rootRect:{x:a.x,y:a.y,width:a.width,height:a.height}})}},_initEvents:function(t){t.on("click",function(t){if("ready"===this._state){var e=this.seriesModel.get("nodeClick",!0);if(e){var i=this.findTarget(t.offsetX,t.offsetY);if(i){var n=i.node;if(n.getLayout().isLeafRoot)this._rootToNode(i);else if("zoomToNode"===e)this._zoomToNode(i);else if("link"===e){var o=n.hostTree.data.getItemModel(n.dataIndex),a=o.get("link",!0),r=o.get("target",!0)||"blank";a&&window.open(a,r)}}}}},this)},_renderBreadcrumb:function(e,t,i){i=i||((i=null!=e.get("leafDepth",!0)?{node:e.getViewRoot()}:this.findTarget(t.getWidth()/2,t.getHeight()/2))||{node:e.getData().tree.root}),(this._breadcrumb||(this._breadcrumb=new Vx(this.group))).render(e,t,i.node,Wx(function(t){"animating"!==this._state&&(zx(e.getViewRoot(),t)?this._rootToNode({node:t}):this._zoomToNode({node:t}))},this))},remove:function(){this._clearController(),this._containerGroup&&this._containerGroup.removeAll(),this._storage={nodeGroup:[],background:[],content:[]},this._state="ready",this._breadcrumb&&this._breadcrumb.remove()},dispose:function(){this._clearController()},_zoomToNode:function(t){this.api.dispatchAction({type:"treemapZoomToNode",from:this.uid,seriesId:this.seriesModel.id,targetNode:t.node})},_rootToNode:function(t){this.api.dispatchAction({type:"treemapRootToNode",from:this.uid,seriesId:this.seriesModel.id,targetNode:t.node})},findTarget:function(o,a){var r;return this.seriesModel.getViewRoot().eachNode({attr:"viewChildren",order:"preorder"},function(t){var e=this._storage.background[t.getRawIndex()];if(e){var i=e.transformCoordToLocal(o,a),n=e.shape;if(!(n.x<=i[0]&&i[0]<=n.x+n.width&&n.y<=i[1]&&i[1]<=n.y+n.height))return!1;r={node:t,offsetX:i[0],offsetY:i[1]}}},this),r}});for(var Qx=function(){},t_=["treemapZoomToNode","treemapRender","treemapMove"],e_=0;e_<t_.length;e_++)gf({type:t_[e_],update:"updateView"},Qx);gf({type:"treemapRootToNode",update:"updateView"},function(o,t){t.eachComponent({mainType:"series",subType:"treemap",query:o},function(t,e){var i=Ox(o,["treemapZoomToNode","treemapRootToNode"],t);if(i){var n=t.getViewRoot();n&&(o.direction=zx(n,i.node)?"rollUp":"drillDown"),t.resetViewRoot(i.node)}})});var i_=E,n_=R,o_=-1,a_=function(t){var e=t.mappingMethod,i=t.type,n=this.option=D(t);this.type=i,this.mappingMethod=e,this._normalizeData=m_[e];var o=r_[i];this.applyVisual=o.applyVisual,this.getColorMapper=o.getColorMapper,this._doMap=o._doMap[e],"piecewise"===e?(s_(n),function(i){var t=i.pieceList;i.hasSpecialVisual=!1,E(t,function(t,e){t.originIndex=e,null!=t.visual&&(i.hasSpecialVisual=!0)})}(n)):"category"===e?n.categories?function(t){var e=t.categories,i=t.visual,n=t.categoryMap={};if(i_(e,function(t,e){n[t]=e}),!k(i)){var o=[];R(i)?i_(i,function(t,e){var i=n[e];o[null!=i?i:o_]=t}):o[o_]=i,i=g_(t,o)}for(var a=e.length-1;0<=a;a--)null==i[a]&&(delete n[e[a]],e.pop())}(n):s_(n,!0):(Y("linear"!==e||n.dataExtent),s_(n))};a_.prototype={constructor:a_,mapValueToVisual:function(t){var e=this._normalizeData(t);return this._doMap(e,t)},getNormalizer:function(){return A(this._normalizeData,this)}};var r_=a_.visualHandlers={color:{applyVisual:h_("color"),getColorMapper:function(){var o=this.option;return A("category"===o.mappingMethod?function(t,e){return e||(t=this._normalizeData(t)),c_.call(this,t)}:function(t,e,i){var n=!!i;return e||(t=this._normalizeData(t)),i=Fe(t,o.parsedVisual,i),n?i:Ye(i,"rgba")},this)},_doMap:{linear:function(t){return Ye(Fe(t,this.option.parsedVisual),"rgba")},category:c_,piecewise:function(t,e){var i=p_.call(this,e);return null==i&&(i=Ye(Fe(t,this.option.parsedVisual),"rgba")),i},fixed:d_}},colorHue:l_(function(t,e){return Ue(t,e)}),colorSaturation:l_(function(t,e){return Ue(t,null,e)}),colorLightness:l_(function(t,e){return Ue(t,null,null,e)}),colorAlpha:l_(function(t,e){return Xe(t,e)}),opacity:{applyVisual:h_("opacity"),_doMap:f_([0,1])},liftZ:{applyVisual:h_("liftZ"),_doMap:{linear:d_,category:d_,piecewise:d_,fixed:d_}},symbol:{applyVisual:function(t,e,i){var n=this.mapValueToVisual(t);if(z(n))i("symbol",n);else if(n_(n))for(var o in n)n.hasOwnProperty(o)&&i(o,n[o])},_doMap:{linear:u_,category:c_,piecewise:function(t,e){var i=p_.call(this,e);return null==i&&(i=u_.call(this,t)),i},fixed:d_}},symbolSize:{applyVisual:h_("symbolSize"),_doMap:f_([0,1])}};function s_(t,e){var i=t.visual,n=[];R(i)?i_(i,function(t){n.push(t)}):null!=i&&n.push(i);e||1!==n.length||{color:1,symbol:1}.hasOwnProperty(t.type)||(n[1]=n[0]),g_(t,n)}function l_(n){return{applyVisual:function(t,e,i){t=this.mapValueToVisual(t),i("color",n(e("color"),t))},_doMap:f_([0,1])}}function u_(t){var e=this.option.visual;return e[Math.round(kl(t,[0,1],[0,e.length-1],!0))]||{}}function h_(n){return function(t,e,i){i(n,this.mapValueToVisual(t))}}function c_(t){var e=this.option.visual;return e[this.option.loop&&t!==o_?t%e.length:t]}function d_(){return this.option.visual[0]}function f_(n){return{linear:function(t){return kl(t,n,this.option.visual,!0)},category:c_,piecewise:function(t,e){var i=p_.call(this,e);return null==i&&(i=kl(t,n,this.option.visual,!0)),i},fixed:d_}}function p_(t){var e=this.option,i=e.pieceList;if(e.hasSpecialVisual){var n=i[a_.findPieceIndex(t,i)];if(n&&n.visual)return n.visual[this.type]}}function g_(t,e){return t.visual=e,"color"===t.type&&(t.parsedVisual=N(e,function(t){return Re(t)})),e}var m_={linear:function(t){return kl(t,this.option.dataExtent,[0,1],!0)},piecewise:function(t){var e=this.option.pieceList,i=a_.findPieceIndex(t,e,!0);if(null!=i)return kl(i,[0,e.length-1],[0,1],!0)},category:function(t){var e=this.option.categories?this.option.categoryMap[t]:t;return null==e?o_:e},fixed:et};function v_(t,e,i){return t?e<=i:e<i}a_.listVisualTypes=function(){var i=[];return E(r_,function(t,e){i.push(e)}),i},a_.addVisualHandler=function(t,e){r_[t]=e},a_.isValidType=function(t){return r_.hasOwnProperty(t)},a_.eachVisual=function(t,e,i){R(t)?E(t,e,i):e.call(i,t)},a_.mapVisual=function(t,n,o){var a,r=k(t)?[]:R(t)?{}:(a=!0,null);return a_.eachVisual(t,function(t,e){var i=n.call(o,t,e);a?r=i:r[e]=i}),r},a_.retrieveVisuals=function(i){var n,o={};return i&&i_(r_,function(t,e){i.hasOwnProperty(e)&&(o[e]=i[e],n=!0)}),n?o:null},a_.prepareVisualTypes=function(t){if(n_(t)){var i=[];i_(t,function(t,e){i.push(e)}),t=i}else{if(!k(t))return[];t=t.slice()}return t.sort(function(t,e){return"color"===e&&"color"!==t&&0===t.indexOf("color")?1:-1}),t},a_.dependsOn=function(t,e){return"color"===e?!(!t||0!==t.indexOf(e)):t===e},a_.findPieceIndex=function(n,t,e){for(var o,a=1/0,i=0,r=t.length;i<r;i++){var s=t[i].value;if(null!=s){if(s===n||"string"==typeof s&&s===n+"")return i;e&&c(s,i)}}for(i=0,r=t.length;i<r;i++){var l=t[i],u=l.interval,h=l.close;if(u){if(u[0]===-1/0){if(v_(h[1],n,u[1]))return i}else if(u[1]===1/0){if(v_(h[0],u[0],n))return i}else if(v_(h[0],u[0],n)&&v_(h[1],n,u[1]))return i;e&&c(u[0],i),e&&c(u[1],i)}}if(e)return n===1/0?t.length-1:n===-1/0?0:o;function c(t,e){var i=Math.abs(t-n);i<a&&(a=i,o=e)}};var y_=k,x_="itemStyle",__={seriesType:"treemap",reset:function(t,e,i,n){var o=t.getData().tree,a=o.root,r=t.getModel(x_);a.isRemoved()||!function n(t,e,o,a,r,s){var l=t.getModel();var i=t.getLayout();if(!i||i.invisible||!i.isInView)return;var u=t.getModel(x_);var h=o[t.depth];var c=w_(u,e,h,a);var d=u.get("borderColor");var f=u.get("borderColorSaturation");var p;null!=f&&(p=b_(c),g=f,d=null!=(m=p)?Ue(m,null,null,g):null);var g,m;t.setVisual("borderColor",d);var v=t.viewChildren;if(v&&v.length){var y=M_(t,l,i,u,c,v);E(v,function(t,e){if(t.depth>=r.length||t===r[t.depth]){var i=T_(l,c,t,e,y,s);n(t,i,o,a,r,s)}})}else p=b_(c),t.setVisual("color",p)}(a,{},N(o.levelModels,function(t){return t?t.get(x_):null}),r,t.getViewRoot().getAncestors(),t)}};function w_(i,n,o,a){var r=L({},n);return E(["color","colorAlpha","colorSaturation"],function(t){var e=i.get(t,!0);null==e&&o&&(e=o[t]),null==e&&(e=n[t]),null==e&&(e=a.get(t)),null!=e&&(r[t]=e)}),r}function b_(t){var e=S_(t,"color");if(e){var i=S_(t,"colorAlpha"),n=S_(t,"colorSaturation");return n&&(e=Ue(e,null,null,n)),i&&(e=Xe(e,i)),e}}function S_(t,e){var i=t[e];if(null!=i&&"none"!==i)return i}function M_(t,e,i,n,o,a){if(a&&a.length){var r=I_(e,"color")||null!=o.color&&"none"!==o.color&&(I_(e,"colorAlpha")||I_(e,"colorSaturation"));if(r){var s=e.get("visualMin"),l=e.get("visualMax"),u=i.dataExtent.slice();null!=s&&s<u[0]&&(u[0]=s),null!=l&&l>u[1]&&(u[1]=l);var h=e.get("colorMappingBy"),c={type:r.name,dataExtent:u,visual:r.range};"color"!==c.type||"index"!==h&&"id"!==h?c.mappingMethod="linear":(c.mappingMethod="category",c.loop=!0);var d=new a_(c);return d.__drColorMappingBy=h,d}}}function I_(t,e){var i=t.get(e);return y_(i)&&i.length?{name:e,range:i}:null}function T_(t,e,i,n,o,a){var r=L({},e);if(o){var s=o.type,l="color"===s&&o.__drColorMappingBy,u="index"===l?n:"id"===l?a.mapIdToIndex(i.getId()):i.getValue(t.get("visualDimension"));r[s]=o.mapValueToVisual(u)}return r}var A_=Math.max,D_=Math.min,C_=W,L_=E,k_=["itemStyle","borderWidth"],P_=["itemStyle","gapWidth"],N_=["upperLabel","show"],O_=["upperLabel","height"],E_={seriesType:"treemap",reset:function(t,e,i,n){var o=i.getWidth(),a=i.getHeight(),r=t.option,s=vu(t.getBoxLayoutParams(),{width:i.getWidth(),height:i.getHeight()}),l=r.size||[],u=Pl(C_(s.width,l[0]),o),h=Pl(C_(s.height,l[1]),a),c=n&&n.type,d=Ox(n,["treemapZoomToNode","treemapRootToNode"],t),f="treemapRender"===c||"treemapMove"===c?n.rootRect:null,p=t.getViewRoot(),g=Ex(p);if("treemapMove"!==c){var m="treemapZoomToNode"===c?function(t,e,i,n,o){var a,r=(e||{}).node,s=[n,o];if(!r||r===i)return s;var l=n*o,u=l*t.option.zoomToNodeRatio;for(;a=r.parentNode;){for(var h=0,c=a.children,d=0,f=c.length;d<f;d++)h+=c[d].getValue();var p=r.getValue();if(0===p)return s;u*=h/p;var g=a.getModel(),m=g.get(k_),v=Math.max(m,V_(g));u+=4*m*m+(3*m+v)*Math.pow(u,.5),Vl<u&&(u=Vl),r=a}u<l&&(u=l);var y=Math.pow(u/l,.5);return[n*y,o*y]}(t,d,p,u,h):f?[f.width,f.height]:[u,h],v=r.sort;v&&"asc"!==v&&"desc"!==v&&(v="desc");var y={squareRatio:r.squareRatio,sort:v,leafDepth:r.leafDepth};p.hostTree.clearLayouts();var x={x:0,y:0,width:m[0],height:m[1],area:m[0]*m[1]};p.setLayout(x),function t(e,i,n,o){var a;var r;if(e.isRemoved())return;var s=e.getLayout();a=s.width;r=s.height;var l=e.getModel();var u=l.get(k_);var h=l.get(P_)/2;var c=V_(l);var d=Math.max(u,c);var f=u-h;var p=d-h;var l=e.getModel();e.setLayout({borderWidth:u,upperHeight:d,upperLabelHeight:c},!0);a=A_(a-2*f,0);r=A_(r-f-p,0);var g=a*r;var m=z_(e,l,g,i,n,o);if(!m.length)return;var v={x:f,y:p,width:a,height:r};var y=D_(a,r);var x=1/0;var _=[];_.area=0;for(var w=0,b=m.length;w<b;){var S=m[w];_.push(S),_.area+=S.getLayout().area;var M=R_(_,y,i.squareRatio);x=M<=x?(w++,M):(_.area-=_.pop().getLayout().area,B_(_,y,v,h,!1),y=D_(v.width,v.height),_.length=_.area=0,1/0)}_.length&&B_(_,y,v,h,!0);if(!n){var I=l.get("childrenVisibleMin");null!=I&&g<I&&(n=!0)}for(var w=0,b=m.length;w<b;w++)t(m[w],i,n,o+1)}(p,y,!1,0);x=p.getLayout();L_(g,function(t,e){var i=(g[e+1]||p).getValue();t.setLayout(L({dataExtent:[i,i],borderWidth:0,upperHeight:0},x))})}var _=t.getData().tree.root;_.setLayout(function(t,e,i){if(e)return{x:e.x,y:e.y};var n={x:0,y:0};if(!i)return n;var o=i.node,a=o.getLayout();if(!a)return n;var r=[a.width/2,a.height/2],s=o;for(;s;){var l=s.getLayout();r[0]+=l.x,r[1]+=l.y,s=s.parentNode}return{x:t.width/2-r[0],y:t.height/2-r[1]}}(s,f,d),!0),t.setLayoutInfo(s),function e(t,i,n,o,a){var r=t.getLayout();var s=n[a];var l=s&&s===t;if(s&&!l||a===n.length&&t!==o)return;t.setLayout({isInView:!0,invisible:!l&&!i.intersect(r),isAboveViewRoot:l},!0);var u=new Mi(i.x-r.x,i.y-r.y,i.width,i.height);L_(t.viewChildren||[],function(t){e(t,u,n,o,a+1)})}(_,new Mi(-s.x,-s.y,o,a),g,p,0)}};function z_(t,e,i,n,o,a){var r=t.children||[],s=n.sort;"asc"!==s&&"desc"!==s&&(s=null);var l=null!=n.leafDepth&&n.leafDepth<=a;if(o&&!l)return t.viewChildren=[];!function(t,n){n&&t.sort(function(t,e){var i="asc"===n?t.getValue()-e.getValue():e.getValue()-t.getValue();return 0==i?"asc"===n?t.dataIndex-e.dataIndex:e.dataIndex-t.dataIndex:i})}(r=M(r,function(t){return!t.isRemoved()}),s);var u=function(t,e,i){for(var n=0,o=0,a=e.length;o<a;o++)n+=e[o].getValue();var r=t.get("visualDimension");if(e&&e.length)if("value"===r&&i)s=[e[e.length-1].getValue(),e[0].getValue()],"asc"===i&&s.reverse();else{var s=[1/0,-1/0];L_(e,function(t){var e=t.getValue(r);e<s[0]&&(s[0]=e),e>s[1]&&(s[1]=e)})}else s=[NaN,NaN];return{sum:n,dataExtent:s}}(e,r,s);if(0===u.sum)return t.viewChildren=[];if(u.sum=function(t,e,i,n,o){if(!n)return i;for(var a=t.get("visibleMin"),r=o.length,s=r,l=r-1;0<=l;l--){var u=o["asc"===n?r-l-1:l].getValue();u/i*e<a&&(s=l,i-=u)}return"asc"===n?o.splice(0,r-s):o.splice(s,r-s),i}(e,i,u.sum,s,r),0===u.sum)return t.viewChildren=[];for(var h=0,c=r.length;h<c;h++){var d=r[h].getValue()/u.sum*i;r[h].setLayout({area:d})}return l&&(r.length&&t.setLayout({isLeafRoot:!0},!0),r.length=0),t.viewChildren=r,t.setLayout({dataExtent:u.dataExtent},!0),r}function R_(t,e,i){for(var n,o=0,a=1/0,r=0,s=t.length;r<s;r++)(n=t[r].getLayout().area)&&(n<a&&(a=n),o<n&&(o=n));var l=t.area*t.area,u=e*e*i;return l?A_(u*o/l,l/(u*a)):1/0}function B_(t,e,i,n,o){var a=e===i.width?0:1,r=1-a,s=["x","y"],l=["width","height"],u=i[s[a]],h=e?t.area/e:0;(o||h>i[l[r]])&&(h=i[l[r]]);for(var c=0,d=t.length;c<d;c++){var f=t[c],p={},g=h?f.getLayout().area/h:0,m=p[l[r]]=A_(h-2*n,0),v=i[s[a]]+i[l[a]]-u,y=c===d-1||v<g?v:g,x=p[l[a]]=A_(y-2*n,0);p[s[r]]=i[s[r]]+D_(n,m/2),p[s[a]]=u+D_(n,x/2),u+=y,f.setLayout(p,!0)}i[s[r]]+=h,i[l[r]]-=h}function V_(t){return t.get(N_)?t.get(O_):0}function G_(t){return"_EC_"+t}yf(__),vf(E_);function F_(t){this._directed=t||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={},this.data,this.edgeData}var W_=F_.prototype;function H_(t,e){this.id=null==t?"":t,this.inEdges=[],this.outEdges=[],this.edges=[],this.hostGraph,this.dataIndex=null==e?-1:e}function Z_(t,e,i){this.node1=t,this.node2=e,this.dataIndex=null==i?-1:i}W_.type="graph",W_.isDirected=function(){return this._directed},W_.addNode=function(t,e){t=null==t?""+e:""+t;var i=this._nodesMap;if(!i[G_(t)]){var n=new H_(t,e);return(n.hostGraph=this).nodes.push(n),i[G_(t)]=n}},W_.getNodeByIndex=function(t){var e=this.data.getRawIndex(t);return this.nodes[e]},W_.getNodeById=function(t){return this._nodesMap[G_(t)]},W_.addEdge=function(t,e,i){var n=this._nodesMap,o=this._edgesMap;if("number"==typeof t&&(t=this.nodes[t]),"number"==typeof e&&(e=this.nodes[e]),H_.isInstance(t)||(t=n[G_(t)]),H_.isInstance(e)||(e=n[G_(e)]),t&&e){var a=t.id+"-"+e.id;if(!o[a]){var r=new Z_(t,e,i);return(r.hostGraph=this)._directed&&(t.outEdges.push(r),e.inEdges.push(r)),t.edges.push(r),t!==e&&e.edges.push(r),this.edges.push(r),o[a]=r}}},W_.getEdgeByIndex=function(t){var e=this.edgeData.getRawIndex(t);return this.edges[e]},W_.getEdge=function(t,e){H_.isInstance(t)&&(t=t.id),H_.isInstance(e)&&(e=e.id);var i=this._edgesMap;return this._directed?i[t+"-"+e]:i[t+"-"+e]||i[e+"-"+t]},W_.eachNode=function(t,e){for(var i=this.nodes,n=i.length,o=0;o<n;o++)0<=i[o].dataIndex&&t.call(e,i[o],o)},W_.eachEdge=function(t,e){for(var i=this.edges,n=i.length,o=0;o<n;o++)0<=i[o].dataIndex&&0<=i[o].node1.dataIndex&&0<=i[o].node2.dataIndex&&t.call(e,i[o],o)},W_.breadthFirstTraverse=function(t,e,i,n){if(H_.isInstance(e)||(e=this._nodesMap[G_(e)]),e){for(var o="out"===i?"outEdges":"in"===i?"inEdges":"edges",a=0;a<this.nodes.length;a++)this.nodes[a].__visited=!1;if(!t.call(n,e,null))for(var r=[e];r.length;){var s=r.shift(),l=s[o];for(a=0;a<l.length;a++){var u=l[a],h=u.node1===s?u.node2:u.node1;if(!h.__visited){if(t.call(n,h,s))return;r.push(h),h.__visited=!0}}}}},W_.update=function(){for(var t=this.data,i=this.edgeData,e=this.nodes,n=this.edges,o=0,a=e.length;o<a;o++)e[o].dataIndex=-1;for(o=0,a=t.count();o<a;o++)e[t.getRawIndex(o)].dataIndex=o;i.filterSelf(function(t){var e=n[i.getRawIndex(t)];return 0<=e.node1.dataIndex&&0<=e.node2.dataIndex});for(o=0,a=n.length;o<a;o++)n[o].dataIndex=-1;for(o=0,a=i.count();o<a;o++)n[i.getRawIndex(o)].dataIndex=o},W_.clone=function(){for(var t=new F_(this._directed),e=this.nodes,i=this.edges,n=0;n<e.length;n++)t.addNode(e[n].id,e[n].dataIndex);for(n=0;n<i.length;n++){var o=i[n];t.addEdge(o.node1.id,o.node2.id,o.dataIndex)}return t},H_.prototype={constructor:H_,degree:function(){return this.edges.length},inDegree:function(){return this.inEdges.length},outDegree:function(){return this.outEdges.length},getModel:function(t){if(!(this.dataIndex<0))return this.hostGraph.data.getItemModel(this.dataIndex).getModel(t)}},Z_.prototype.getModel=function(t){if(!(this.dataIndex<0))return this.hostGraph.edgeData.getItemModel(this.dataIndex).getModel(t)};function U_(i,n){return{getValue:function(t){var e=this[i][n];return e.get(e.getDimension(t||"value"),this.dataIndex)},setVisual:function(t,e){0<=this.dataIndex&&this[i][n].setItemVisual(this.dataIndex,t,e)},getVisual:function(t,e){return this[i][n].getItemVisual(this.dataIndex,t,e)},setLayout:function(t,e){0<=this.dataIndex&&this[i][n].setItemLayout(this.dataIndex,t,e)},getLayout:function(){return this[i][n].getItemLayout(this.dataIndex)},getGraphicEl:function(){return this[i][n].getItemGraphicEl(this.dataIndex)},getRawIndex:function(){return this[i][n].getRawIndex(this.dataIndex)}}}b(H_,U_("hostGraph","data")),b(Z_,U_("hostGraph","edgeData")),F_.Node=H_,F_.Edge=Z_,ia(H_),ia(Z_);function X_(t,e,i,n,o){for(var a=new F_(n),r=0;r<t.length;r++)a.addNode(W(t[r].id,t[r].name,r),r);var s=[],l=[],u=0;for(r=0;r<e.length;r++){var h=e[r],c=h.source,d=h.target;a.addEdge(c,d,u)&&(l.push(h),s.push(W(h.id,c+" > "+d)),u++)}var f,p=i.get("coordinateSystem");if("cartesian2d"===p||"polar"===p)f=hp(t,i);else{var g=nh.get(p),m=g&&"view"!==g.type&&g.dimensions||[];_(m,"value")<0&&m.concat(["value"]);var v=np(t,{coordDimensions:m});(f=new Wf(v,i)).initData(t)}var y=new Wf(["value"],i);return y.initData(l,s),o&&o(f,y),ux({mainData:f,struct:a,structAttr:"graph",datas:{node:f,edge:y},datasAttr:{node:"data",edge:"edgeData"}}),a.update(),a}var Y_=Sf({type:"series.graph",init:function(t){Y_.superApply(this,"init",arguments);var e=this;function i(){return e._categoriesData}this.legendVisualProvider=new Gv(i,i),this.fillDataTextStyle(t.edges||t.links),this._updateCategoriesData()},mergeOption:function(t){Y_.superApply(this,"mergeOption",arguments),this.fillDataTextStyle(t.edges||t.links),this._updateCategoriesData()},mergeDefaultAndTheme:function(t){Y_.superApply(this,"mergeDefaultAndTheme",arguments),zo(t,["edgeLabel"],["show"])},getInitialData:function(t,s){var e=t.edges||t.links||[],i=t.data||t.nodes||[],l=this;if(i&&e)return X_(i,e,this,!0,function(t,e){t.wrapMethod("getItemModel",function(t){var e=l._categoriesModels[t.getShallow("category")];return e&&(e.parentModel=t.parentModel,t.parentModel=e),t});var i=l.getModel("edgeLabel"),n=new Il({label:i.option},i.parentModel,s),o=l.getModel("emphasis.edgeLabel"),a=new Il({emphasis:{label:o.option}},o.parentModel,s);function r(t){return(t=this.parsePath(t))&&"label"===t[0]?n:t&&"emphasis"===t[0]&&"label"===t[1]?a:this.parentModel}e.wrapMethod("getItemModel",function(t){return t.customizeGetParent(r),t})}).data},getGraph:function(){return this.getData().graph},getEdgeData:function(){return this.getGraph().edgeData},getCategoriesData:function(){return this._categoriesData},formatTooltip:function(t,e,i){if("edge"!==i)return Y_.superApply(this,"formatTooltip",arguments);var n=this.getData(),o=this.getDataParams(t,i),a=n.graph.getEdgeByIndex(t),r=n.getName(a.node1.dataIndex),s=n.getName(a.node2.dataIndex),l=[];return null!=r&&l.push(r),null!=s&&l.push(s),l=eu(l.join(" > ")),o.value&&(l+=" : "+eu(o.value)),l},_updateCategoriesData:function(){var t=N(this.option.categories||[],function(t){return null!=t.value?t:L({value:0},t)}),e=new Wf(["value"],this);e.initData(t),this._categoriesData=e,this._categoriesModels=e.mapArray(function(t){return e.getItemModel(t,!0)})},setZoom:function(t){this.option.zoom=t},setCenter:function(t){this.option.center=t},isAnimationEnabled:function(){return Y_.superCall(this,"isAnimationEnabled")&&!("force"===this.get("layout")&&this.get("force.layoutAnimation"))},defaultOption:{zlevel:0,z:2,coordinateSystem:"view",legendHoverLink:!0,hoverAnimation:!0,layout:null,focusNodeAdjacency:!1,circular:{rotateLabel:!1},force:{initLayout:null,repulsion:[0,50],gravity:.1,friction:.6,edgeLength:30,layoutAnimation:!0},left:"center",top:"center",symbol:"circle",symbolSize:10,edgeSymbol:["none","none"],edgeSymbolSize:10,edgeLabel:{position:"middle"},draggable:!1,roam:!1,center:null,zoom:1,nodeScaleRatio:.6,label:{show:!1,formatter:"{b}"},itemStyle:{},lineStyle:{color:"#aaa",width:1,curveness:0,opacity:.5},emphasis:{label:{show:!0}}}}),j_=os.prototype,q_=ls.prototype;function K_(t){return isNaN(+t.cpx1)||isNaN(+t.cpy1)}var $_=Is({type:"ec-line",style:{stroke:"#000",fill:null},shape:{x1:0,y1:0,x2:0,y2:0,percent:1,cpx1:null,cpy1:null},buildPath:function(t,e){this[K_(e)?"_buildPathLine":"_buildPathCurve"](t,e)},_buildPathLine:j_.buildPath,_buildPathCurve:q_.buildPath,pointAt:function(t){return this[K_(this.shape)?"_pointAtLine":"_pointAtCurve"](t)},_pointAtLine:j_.pointAt,_pointAtCurve:q_.pointAt,tangentAt:function(t){var e=this.shape,i=K_(e)?[e.x2-e.x1,e.y2-e.y1]:this._tangentAtCurve(t);return mt(i,i)},_tangentAtCurve:q_.tangentAt}),J_=["fromSymbol","toSymbol"];function Q_(t){return"_"+t+"Type"}function tw(t,e,i){var n=e.getItemVisual(i,"color"),o=e.getItemVisual(i,t),a=e.getItemVisual(i,t+"Size");if(o&&"none"!==o){k(a)||(a=[a,a]);var r=mg(o,-a[0]/2,-a[1]/2,a[0],a[1],n);return r.name=t,r}}function ew(t,e){t.x1=e[0][0],t.y1=e[0][1],t.x2=e[1][0],t.y2=e[1][1],t.percent=1;var i=e[2];i?(t.cpx1=i[0],t.cpy1=i[1]):(t.cpx1=NaN,t.cpy1=NaN)}function iw(t,e,i){Ii.call(this),this._createLine(t,e,i)}var nw=iw.prototype;function ow(t){this._ctor=t||iw,this.group=new Ii}nw.beforeUpdate=function(){var t=this.childOfName("fromSymbol"),e=this.childOfName("toSymbol"),i=this.childOfName("label");if(t||e||!i.ignore){for(var n=1,o=this.parent;o;)o.scale&&(n/=o.scale[0]),o=o.parent;var a=this.childOfName("line");if(this.__dirty||a.__dirty){var r=a.shape.percent,s=a.pointAt(0),l=a.pointAt(r),u=ht([],l,s);if(mt(u,u),t){t.attr("position",s);var h=a.tangentAt(0);t.attr("rotation",Math.PI/2-Math.atan2(h[1],h[0])),t.attr("scale",[n*r,n*r])}if(e){e.attr("position",l);h=a.tangentAt(1);e.attr("rotation",-Math.PI/2-Math.atan2(h[1],h[0])),e.attr("scale",[n*r,n*r])}if(!i.ignore){var c,d,f;i.attr("position",l);var p=5*n;if("end"===i.__position)c=[u[0]*p+l[0],u[1]*p+l[1]],d=.8<u[0]?"left":u[0]<-.8?"right":"center",f=.8<u[1]?"top":u[1]<-.8?"bottom":"middle";else if("middle"===i.__position){var g=r/2,m=[(h=a.tangentAt(g))[1],-h[0]],v=a.pointAt(g);0<m[1]&&(m[0]=-m[0],m[1]=-m[1]),c=[v[0]+m[0]*p,v[1]+m[1]*p],d="center",f="bottom";var y=-Math.atan2(h[1],h[0]);l[0]<s[0]&&(y=Math.PI+y),i.attr("rotation",y)}else c=[-u[0]*p+s[0],-u[1]*p+s[1]],d=.8<u[0]?"right":u[0]<-.8?"left":"center",f=.8<u[1]?"bottom":u[1]<-.8?"top":"middle";i.attr({style:{textVerticalAlign:i.__verticalAlign||f,textAlign:i.__textAlign||d},position:c,scale:[n,n]})}}}},nw._createLine=function(i,n,t){var e=i.hostModel,o=function(t){var e=new $_({name:"line",subPixelOptimize:!0});return ew(e.shape,t),e}(i.getItemLayout(n));o.shape.percent=0,ll(o,{shape:{percent:1}},e,n),this.add(o);var a=new Fr({name:"label",lineLabelOriginalOpacity:1});this.add(a),E(J_,function(t){var e=tw(t,i,n);this.add(e),this[Q_(t)]=i.getItemVisual(n,t)},this),this._updateCommonStl(i,n,t)},nw.updateData=function(o,a,t){var e=o.hostModel,i=this.childOfName("line"),n=o.getItemLayout(a),r={shape:{}};ew(r.shape,n),sl(i,r,e,a),E(J_,function(t){var e=o.getItemVisual(a,t),i=Q_(t);if(this[i]!==e){this.remove(this.childOfName(t));var n=tw(t,o,a);this.add(n)}this[i]=e},this),this._updateCommonStl(o,a,t)},nw._updateCommonStl=function(t,e,i){var n=t.hostModel,o=this.childOfName("line"),a=i&&i.lineStyle,r=i&&i.hoverLineStyle,s=i&&i.labelModel,l=i&&i.hoverLabelModel;if(!i||t.hasItemOption){var u=t.getItemModel(e);a=u.getModel("lineStyle").getLineStyle(),r=u.getModel("emphasis.lineStyle").getLineStyle(),s=u.getModel("label"),l=u.getModel("emphasis.label")}var h=t.getItemVisual(e,"color"),c=Z(t.getItemVisual(e,"opacity"),a.opacity,1);o.useStyle(C({strokeNoScale:!0,fill:"none",stroke:h,opacity:c},a)),o.hoverStyle=r,E(J_,function(t){var e=this.childOfName(t);e&&(e.setColor(h),e.setStyle({opacity:c}))},this);var d,f,p=s.getShallow("show"),g=l.getShallow("show"),m=this.childOfName("label");if((p||g)&&(d=h||"#000",null==(f=n.getFormattedLabel(e,"normal",t.dataType)))){var v=n.getRawValue(e);f=null==v?t.getName(e):isFinite(v)?Nl(v):v}var y=p?f:null,x=g?H(n.getFormattedLabel(e,"emphasis",t.dataType),f):null,_=m.style;null==y&&null==x||(Qs(m.style,s,{text:y},{autoColor:d}),m.__textAlign=_.textAlign,m.__verticalAlign=_.textVerticalAlign,m.__position=s.get("position")||"middle"),m.hoverStyle=null!=x?{text:x,textFill:l.getTextColor(!0),fontStyle:l.getShallow("fontStyle"),fontWeight:l.getShallow("fontWeight"),fontSize:l.getShallow("fontSize"),fontFamily:l.getShallow("fontFamily")}:{text:null},m.ignore=!p&&!g,Ys(this)},nw.highlight=function(){this.trigger("emphasis")},nw.downplay=function(){this.trigger("normal")},nw.updateLayout=function(t,e){this.setLinePoints(t.getItemLayout(e))},nw.setLinePoints=function(t){var e=this.childOfName("line");ew(e.shape,t),e.dirty()},w(iw,Ii);var aw=ow.prototype;function rw(t){var e=t.hostModel;return{lineStyle:e.getModel("lineStyle").getLineStyle(),hoverLineStyle:e.getModel("emphasis.lineStyle").getLineStyle(),labelModel:e.getModel("label"),hoverLabelModel:e.getModel("emphasis.label")}}function sw(t){return isNaN(t[0])||isNaN(t[1])}function lw(t){return!sw(t[0])&&!sw(t[1])}function uw(t){var e=t.coordinateSystem;if("view"!==e.type)return 1;var i=t.option.nodeScaleRatio,n=e.scale,o=n&&n[0]||1;return((e.getZoom()-1)*i+1)/o}function hw(t){var e=t.getVisual("symbolSize");return e instanceof Array&&(e=(e[0]+e[1])/2),+e}aw.isPersistent=function(){return!0},aw.updateData=function(i){var n=this,e=n.group,o=n._lineData;n._lineData=i,o||e.removeAll();var a=rw(i);i.diff(o).add(function(t){!function(t,e,i,n){if(!lw(e.getItemLayout(i)))return;var o=new t._ctor(e,i,n);e.setItemGraphicEl(i,o),t.group.add(o)}(n,i,t,a)}).update(function(t,e){!function(t,e,i,n,o,a){var r=e.getItemGraphicEl(n);if(!lw(i.getItemLayout(o)))return t.group.remove(r);r?r.updateData(i,o,a):r=new t._ctor(i,o,a);i.setItemGraphicEl(o,r),t.group.add(r)}(n,o,i,e,t,a)}).remove(function(t){e.remove(o.getItemGraphicEl(t))}).execute()},aw.updateLayout=function(){var i=this._lineData;i&&i.eachItemGraphicEl(function(t,e){t.updateLayout(i,e)},this)},aw.incrementalPrepareUpdate=function(t){this._seriesScope=rw(t),this._lineData=null,this.group.removeAll()},aw.incrementalUpdate=function(t,e){function i(t){t.isGroup||(t.incremental=t.useHoverLayer=!0)}for(var n=t.start;n<t.end;n++){if(lw(e.getItemLayout(n))){var o=new this._ctor(e,n,this._seriesScope);o.traverse(i),this.group.add(o),e.setItemGraphicEl(n,o)}}},aw.remove=function(){this._clearIncremental(),this._incremental=null,this.group.removeAll()},aw._clearIncremental=function(){var t=this._incremental;t&&t.clearDisplaybles()};var cw=[],dw=[],fw=[],pw=Ta,gw=_t,mw=Math.abs;function vw(t,e,i){for(var n,o=t[0],a=t[1],r=t[2],s=1/0,l=i*i,u=.1,h=.1;h<=.9;h+=.1){cw[0]=pw(o[0],a[0],r[0],h),cw[1]=pw(o[1],a[1],r[1],h),(f=mw(gw(cw,e)-l))<s&&(s=f,n=h)}for(var c=0;c<32;c++){var d=n+u;dw[0]=pw(o[0],a[0],r[0],n),dw[1]=pw(o[1],a[1],r[1],n),fw[0]=pw(o[0],a[0],r[0],d),fw[1]=pw(o[1],a[1],r[1],d);var f=gw(dw,e)-l;if(mw(f)<.01)break;var p=gw(fw,e)-l;u/=2,f<0?0<=p?n+=u:n-=u:0<=p?n-=u:n+=u}return n}function yw(t,l){var u=[],h=Ca,c=[[],[],[]],d=[[],[]],f=[];l/=2,t.eachEdge(function(t,e){var i=t.getLayout(),n=t.getVisual("fromSymbol"),o=t.getVisual("toSymbol");i.__original||(i.__original=[rt(i[0]),rt(i[1])],i[2]&&i.__original.push(rt(i[2])));var a=i.__original;if(null!=i[2]){if(at(c[0],a[0]),at(c[1],a[2]),at(c[2],a[1]),n&&"none"!==n){var r=hw(t.node1),s=vw(c,a[0],r*l);h(c[0][0],c[1][0],c[2][0],s,u),c[0][0]=u[3],c[1][0]=u[4],h(c[0][1],c[1][1],c[2][1],s,u),c[0][1]=u[3],c[1][1]=u[4]}if(o&&"none"!==o){r=hw(t.node2),s=vw(c,a[1],r*l);h(c[0][0],c[1][0],c[2][0],s,u),c[1][0]=u[1],c[2][0]=u[2],h(c[0][1],c[1][1],c[2][1],s,u),c[1][1]=u[1],c[2][1]=u[2]}at(i[0],c[0]),at(i[1],c[2]),at(i[2],c[1])}else{if(at(d[0],a[0]),at(d[1],a[1]),ht(f,d[1],d[0]),mt(f,f),n&&"none"!==n){r=hw(t.node1);ut(d[0],d[0],f,r*l)}if(o&&"none"!==o){r=hw(t.node2);ut(d[1],d[1],f,-r*l)}at(i[0],d[0]),at(i[1],d[1])}})}var xw="__focusNodeAdjacency",_w="__unfocusNodeAdjacency",ww=["itemStyle","opacity"],bw=["lineStyle","opacity"];function Sw(t,e){var i=t.getVisual("opacity");return null!=i?i:t.getModel().get(e)}function Mw(t,e,i){var n=t.getGraphicEl(),o=Sw(t,e);null!=i&&(null==o&&(o=1),o*=i),n.downplay&&n.downplay(),n.traverse(function(t){if(!t.isGroup){var e=t.lineLabelOriginalOpacity;null!=e&&null==i||(e=o),t.setStyle("opacity",e)}})}function Iw(t,e){var i=Sw(t,e),n=t.getGraphicEl();n.traverse(function(t){t.isGroup||t.setStyle("opacity",i)}),n.highlight&&n.highlight()}Mf({type:"graph",init:function(t,e){var i=new $g,n=new ow,o=this.group;this._controller=new Ly(e.getZr()),this._controllerHost={target:o},o.add(i.group),o.add(n.group),this._symbolDraw=i,this._lineDraw=n,this._firstRender=!0},render:function(o,t,a){var r=this,e=o.coordinateSystem;this._model=o;var i=this._symbolDraw,n=this._lineDraw,s=this.group;if("view"===e.type){var l={position:e.position,scale:e.scale};this._firstRender?s.attr(l):sl(s,l,o)}yw(o.getGraph(),uw(o));var u=o.getData();i.updateData(u);var h=o.getEdgeData();n.updateData(h),this._updateNodeAndLinkScale(),this._updateController(o,t,a),clearTimeout(this._layoutTimeout);var c=o.forceLayout,d=o.get("force.layoutAnimation");c&&this._startForceLayoutIteration(c,d),u.eachItemGraphicEl(function(t,e){var i=u.getItemModel(e);t.off("drag").off("dragend");var n=i.get("draggable");n&&t.on("drag",function(){c&&(c.warmUp(),this._layouting||this._startForceLayoutIteration(c,d),c.setFixed(e),u.setItemLayout(e,t.position))},this).on("dragend",function(){c&&c.setUnfixed(e)},this),t.setDraggable(n&&c),t[xw]&&t.off("mouseover",t[xw]),t[_w]&&t.off("mouseout",t[_w]),i.get("focusNodeAdjacency")&&(t.on("mouseover",t[xw]=function(){r._clearTimer(),a.dispatchAction({type:"focusNodeAdjacency",seriesId:o.id,dataIndex:t.dataIndex})}),t.on("mouseout",t[_w]=function(){r._dispatchUnfocus(a)}))},this),u.graph.eachEdge(function(t){var e=t.getGraphicEl();e[xw]&&e.off("mouseover",e[xw]),e[_w]&&e.off("mouseout",e[_w]),t.getModel().get("focusNodeAdjacency")&&(e.on("mouseover",e[xw]=function(){r._clearTimer(),a.dispatchAction({type:"focusNodeAdjacency",seriesId:o.id,edgeDataIndex:t.dataIndex})}),e.on("mouseout",e[_w]=function(){r._dispatchUnfocus(a)}))});var f="circular"===o.get("layout")&&o.get("circular.rotateLabel"),p=u.getLayout("cx"),g=u.getLayout("cy");u.eachItemGraphicEl(function(t,e){var i=u.getItemModel(e).get("label.rotate")||0,n=t.getSymbolPath();if(f){var o=u.getItemLayout(e),a=Math.atan2(o[1]-g,o[0]-p);a<0&&(a=2*Math.PI+a);var r=o[0]<p;r&&(a-=Math.PI);var s=r?"left":"right";Js(n,{textRotation:-a,textPosition:s,textOrigin:"center"},{textPosition:s})}else Js(n,{textRotation:i*=Math.PI/180})}),this._firstRender=!1},dispose:function(){this._controller&&this._controller.dispose(),this._controllerHost={},this._clearTimer()},_dispatchUnfocus:function(t,e){var i=this;this._clearTimer(),this._unfocusDelayTimer=setTimeout(function(){i._unfocusDelayTimer=null,t.dispatchAction({type:"unfocusNodeAdjacency",seriesId:i._model.id})},500)},_clearTimer:function(){this._unfocusDelayTimer&&(clearTimeout(this._unfocusDelayTimer),this._unfocusDelayTimer=null)},focusNodeAdjacency:function(t,e,i,n){var o=this._model.getData().graph,a=n.dataIndex,r=n.edgeDataIndex,s=o.getNodeByIndex(a),l=o.getEdgeByIndex(r);(s||l)&&(o.eachNode(function(t){Mw(t,ww,.1)}),o.eachEdge(function(t){Mw(t,bw,.1)}),s&&(Iw(s,ww),E(s.edges,function(t){t.dataIndex<0||(Iw(t,bw),Iw(t.node1,ww),Iw(t.node2,ww))})),l&&(Iw(l,bw),Iw(l.node1,ww),Iw(l.node2,ww)))},unfocusNodeAdjacency:function(t,e,i,n){var o=this._model.getData().graph;o.eachNode(function(t){Mw(t,ww)}),o.eachEdge(function(t){Mw(t,bw)})},_startForceLayoutIteration:function(t,i){var n=this;!function e(){t.step(function(t){n.updateLayout(n._model),(n._layouting=!t)&&(i?n._layoutTimeout=setTimeout(e,16):e())})}()},_updateController:function(o,t,a){var e=this._controller,i=this._controllerHost,r=this.group;e.setPointerChecker(function(t,e,i){var n=r.getBoundingRect();return n.applyTransform(r.transform),n.contain(e,i)&&!Wy(t,a,o)}),"view"===o.coordinateSystem.type?(e.enable(o.get("roam")),i.zoomLimit=o.get("scaleLimit"),i.zoom=o.coordinateSystem.getZoom(),e.off("pan").off("zoom").on("pan",function(t){Vy(i,t.dx,t.dy),a.dispatchAction({seriesId:o.id,type:"graphRoam",dx:t.dx,dy:t.dy})}).on("zoom",function(t){Gy(i,t.scale,t.originX,t.originY),a.dispatchAction({seriesId:o.id,type:"graphRoam",zoom:t.scale,originX:t.originX,originY:t.originY}),this._updateNodeAndLinkScale(),yw(o.getGraph(),uw(o)),this._lineDraw.updateLayout()},this)):e.disable()},_updateNodeAndLinkScale:function(){var t=this._model,e=t.getData(),i=uw(t),n=[i,i];e.eachItemGraphicEl(function(t,e){t.attr("scale",n)})},updateLayout:function(t){yw(t.getGraph(),uw(t)),this._symbolDraw.updateLayout(),this._lineDraw.updateLayout()},remove:function(t,e){this._symbolDraw&&this._symbolDraw.remove(),this._lineDraw&&this._lineDraw.remove()}}),gf({type:"focusNodeAdjacency",event:"focusNodeAdjacency",update:"series:focusNodeAdjacency"},function(){}),gf({type:"unfocusNodeAdjacency",event:"unfocusNodeAdjacency",update:"series:unfocusNodeAdjacency"},function(){});gf({type:"graphRoam",event:"graphRoam",update:"none"},function(i,t){t.eachComponent({mainType:"series",query:i},function(t){var e=Ky(t.coordinateSystem,i);t.setCenter&&t.setCenter(e.center),t.setZoom&&t.setZoom(e.zoom)})});function Tw(t){return t instanceof Array||(t=[t,t]),t}function Aw(t){var e=t.coordinateSystem;if(!e||"view"===e.type){var i=t.getGraph();i.eachNode(function(t){var e=t.getModel();t.setLayout([+e.get("x"),+e.get("y")])}),Dw(i)}}function Dw(t){t.eachEdge(function(t){var e=t.getModel().get("lineStyle.curveness")||0,i=rt(t.node1.getLayout()),n=rt(t.node2.getLayout()),o=[i,n];+e&&o.push([(i[0]+n[0])/2-(i[1]-n[1])*e,(i[1]+n[1])/2-(n[0]-i[0])*e]),t.setLayout(o)})}var Cw=Math.PI,Lw=[];function kw(t,e){var i=t.coordinateSystem;if(!i||"view"===i.type){var n=i.getBoundingRect(),o=t.getData(),a=o.graph,s=n.width/2+n.x,l=n.height/2+n.y,r=Math.min(n.width,n.height)/2,u=o.count();o.setLayout({cx:s,cy:l}),u&&(Pw[e](t,i,a,o,r,s,l,u),a.eachEdge(function(t){var e,i=t.getModel().get("lineStyle.curveness")||0,n=rt(t.node1.getLayout()),o=rt(t.node2.getLayout()),a=(n[0]+o[0])/2,r=(n[1]+o[1])/2;+i&&(e=[s*(i*=3)+a*(1-i),l*i+r*(1-i)]),t.setLayout([n,o,e])}))}}var Pw={value:function(t,e,i,n,o,a,r,s){var l=0,u=n.getSum("value"),h=2*Math.PI/(u||s);i.eachNode(function(t){var e=t.getValue("value"),i=h*(u?e:1)/2;l+=i,t.setLayout([o*Math.cos(l)+a,o*Math.sin(l)+r]),l+=i})},symbolSize:function(t,e,i,n,o,a,r,s){var l=0;Lw.length=s;var u=uw(t);i.eachNode(function(t){var e=hw(t);isNaN(e)&&(e=2),e<0&&(e=0),e*=u;var i=Math.asin(e/2/o);isNaN(i)&&(i=Cw/2),Lw[t.dataIndex]=i,l+=2*i});var h=(2*Cw-l)/s/2,c=0;i.eachNode(function(t){var e=h+Lw[t.dataIndex];c+=e,t.setLayout([o*Math.cos(c)+a,o*Math.sin(c)+r]),c+=e})}},Nw=ut;pf(function(t){var a=t.findComponents({mainType:"legend"});a&&a.length&&t.eachSeriesByType("graph",function(t){var e=t.getCategoriesData(),n=t.getGraph().data,o=e.mapArray(e.getName);n.filterSelf(function(t){var e=n.getItemModel(t).getShallow("category");if(null!=e){"number"==typeof e&&(e=o[e]);for(var i=0;i<a.length;i++)if(!a[i].isSelected(e))return!1}return!0})},this)}),yf(Mm("graph","circle",null)),yf(function(t){var h={};t.eachSeriesByType("graph",function(s){var l=s.getCategoriesData(),o=s.getData(),u={};l.each(function(t){var e=l.getName(t);u["ec-"+e]=t;var i=l.getItemModel(t),n=i.get("itemStyle.color")||s.getColorFromPalette(e,h);l.setItemVisual(t,"color",n);for(var o=["opacity","symbol","symbolSize","symbolKeepAspect"],a=0;a<o.length;a++){var r=i.getShallow(o[a],!0);null!=r&&l.setItemVisual(t,o[a],r)}}),l.count()&&o.each(function(t){var e=o.getItemModel(t).getShallow("category");if(null!=e){"string"==typeof e&&(e=u["ec-"+e]);for(var i=["color","opacity","symbol","symbolSize","symbolKeepAspect"],n=0;n<i.length;n++)null==o.getItemVisual(t,i[n],!0)&&o.setItemVisual(t,i[n],l.getItemVisual(e,i[n]))}})})}),yf(function(t){t.eachSeriesByType("graph",function(t){var s=t.getGraph(),l=t.getEdgeData(),e=Tw(t.get("edgeSymbol")),i=Tw(t.get("edgeSymbolSize")),u="lineStyle.color".split("."),h="lineStyle.opacity".split(".");l.setVisual("fromSymbol",e&&e[0]),l.setVisual("toSymbol",e&&e[1]),l.setVisual("fromSymbolSize",i&&i[0]),l.setVisual("toSymbolSize",i&&i[1]),l.setVisual("color",t.get(u)),l.setVisual("opacity",t.get(h)),l.each(function(t){var e=l.getItemModel(t),i=s.getEdgeByIndex(t),n=Tw(e.getShallow("symbol",!0)),o=Tw(e.getShallow("symbolSize",!0)),a=e.get(u),r=e.get(h);switch(a){case"source":a=i.node1.getVisual("color");break;case"target":a=i.node2.getVisual("color")}n[0]&&i.setVisual("fromSymbol",n[0]),n[1]&&i.setVisual("toSymbol",n[1]),o[0]&&i.setVisual("fromSymbolSize",o[0]),o[1]&&i.setVisual("toSymbolSize",o[1]),i.setVisual("color",a),i.setVisual("opacity",r)})})}),vf(function(t,e){t.eachSeriesByType("graph",function(t){var e=t.get("layout"),i=t.coordinateSystem;if(i&&"view"!==i.type){var n=t.getData(),o=[];E(i.dimensions,function(t){o=o.concat(n.mapDimension(t,!0))});for(var a=0;a<n.count();a++){for(var r=[],s=!1,l=0;l<o.length;l++){var u=n.get(o[l],a);isNaN(u)||(s=!0),r.push(u)}s?n.setItemLayout(a,i.dataToPoint(r)):n.setItemLayout(a,[NaN,NaN])}Dw(n.graph)}else e&&"none"!==e||Aw(t)})}),vf(Id.VISUAL.POST_CHART_LAYOUT,function(t){t.eachSeriesByType("graph",function(t){"circular"===t.get("layout")&&kw(t,"symbolSize")})}),vf(function(t){t.eachSeriesByType("graph",function(t){if(!(l=t.coordinateSystem)||"view"===l.type)if("force"===t.get("layout")){var c=t.preservedPoints||{},d=t.getGraph(),f=d.data,e=d.edgeData,i=t.getModel("force"),n=i.get("initLayout");t.preservedPoints?f.each(function(t){var e=f.getId(t);f.setItemLayout(t,c[e]||[NaN,NaN])}):n&&"none"!==n?"circular"===n&&kw(t,"value"):Aw(t);var o=f.getDataExtent("value"),a=e.getDataExtent("value"),r=i.get("repulsion"),s=i.get("edgeLength");k(r)||(r=[r,r]),k(s)||(s=[s,s]),s=[s[1],s[0]];var l,u=f.mapArray("value",function(t,e){var i=f.getItemLayout(e),n=kl(t,o,r);return isNaN(n)&&(n=(r[0]+r[1])/2),{w:n,rep:n,fixed:f.getItemModel(e).get("fixed"),p:!i||isNaN(i[0])||isNaN(i[1])?null:i}}),h=e.mapArray("value",function(t,e){var i=d.getEdgeByIndex(e),n=kl(t,a,s);isNaN(n)&&(n=(s[0]+s[1])/2);var o=i.getModel();return{n1:u[i.node1.dataIndex],n2:u[i.node2.dataIndex],d:n,curveness:o.get("lineStyle.curveness")||0,ignoreForceLayout:o.get("ignoreForceLayout")}}),p=(l=t.coordinateSystem).getBoundingRect(),g=function(f,p,t){for(var e=t.rect,i=e.width,n=e.height,g=[e.x+i/2,e.y+n/2],m=null==t.gravity?.1:t.gravity,o=0;o<f.length;o++){var a=f[o];a.p||(a.p=ot(i*(Math.random()-.5)+g[0],n*(Math.random()-.5)+g[1])),a.pp=rt(a.p),a.edges=null}var r=null==t.friction?.6:t.friction,v=r;return{warmUp:function(){v=.8*r},setFixed:function(t){f[t].fixed=!0},setUnfixed:function(t){f[t].fixed=!1},step:function(t){for(var e=[],i=f.length,n=0;n<p.length;n++){var o=p[n];if(!o.ignoreForceLayout){var a=o.n1;ht(e,(u=o.n2).p,a.p);var r=ct(e)-o.d,s=u.w/(a.w+u.w);isNaN(s)&&(s=0),mt(e,e),a.fixed||Nw(a.p,a.p,e,s*r*v),u.fixed||Nw(u.p,u.p,e,-(1-s)*r*v)}}for(n=0;n<i;n++){(d=f[n]).fixed||(ht(e,g,d.p),Nw(d.p,d.p,e,m*v))}for(n=0;n<i;n++){a=f[n];for(var l=n+1;l<i;l++){var u;ht(e,(u=f[l]).p,a.p),0===(r=ct(e))&&(st(e,Math.random()-.5,Math.random()-.5),r=1);var h=(a.rep+u.rep)/r/r;a.fixed||Nw(a.pp,a.pp,e,h),u.fixed||Nw(u.pp,u.pp,e,-h)}}var c=[];for(n=0;n<i;n++){var d;(d=f[n]).fixed||(ht(c,d.p,d.pp),Nw(d.p,d.p,c,v),at(d.pp,d.p))}v*=.992,t&&t(f,p,v<.01)}}}(u,h,{rect:p,gravity:i.get("gravity"),friction:i.get("friction")}),m=g.step;g.step=function(h){for(var t=0,e=u.length;t<e;t++)u[t].fixed&&at(u[t].p,d.getNodeByIndex(t).getLayout());m(function(t,e,i){for(var n=0,o=t.length;n<o;n++)t[n].fixed||d.getNodeByIndex(n).setLayout(t[n].p),c[f.getId(n)]=t[n].p;for(n=0,o=e.length;n<o;n++){var a=e[n],r=d.getEdgeByIndex(n),s=a.n1.p,l=a.n2.p,u=r.getLayout();(u=u?u.slice():[])[0]=u[0]||[],u[1]=u[1]||[],at(u[0],s),at(u[1],l),+a.curveness&&(u[2]=[(s[0]+l[0])/2-(s[1]-l[1])*a.curveness,(s[1]+l[1])/2-(l[0]-s[0])*a.curveness]),r.setLayout(u)}h&&h(i)})},t.forceLayout=g,t.preservedPoints=c,g.step()}else t.forceLayout=null})}),mf("graphView",{create:function(t,d){var f=[];return t.eachSeriesByType("graph",function(t){var e=t.get("coordinateSystem");if(!e||"view"===e){var i=t.getData(),n=[],o=[];Ba(i.mapArray(function(t){var e=i.getItemModel(t);return[+e.get("x"),+e.get("y")]}),n,o),o[0]-n[0]==0&&(o[0]+=1,n[0]-=1),o[1]-n[1]==0&&(o[1]+=1,n[1]-=1);var a=(o[0]-n[0])/(o[1]-n[1]),r=function(t,e,i){var n=t.getBoxLayoutParams();return n.aspect=i,vu(n,{width:e.getWidth(),height:e.getHeight()})}(t,d,a);isNaN(a)&&(n=[r.x,r.y],o=[r.x+r.width,r.y+r.height]);var s=o[0]-n[0],l=o[1]-n[1],u=r.width,h=r.height,c=t.coordinateSystem=new Qy;c.zoomLimit=t.get("scaleLimit"),c.setBoundingRect(n[0],n[1],s,l),c.setViewRect(r.x,r.y,u,h),c.setCenter(t.get("center")),c.setZoom(t.get("zoom")),f.push(c)}}),f}});ic.extend({type:"series.gauge",getInitialData:function(t,e){return Bv(this,["value"])},defaultOption:{zlevel:0,z:2,center:["50%","50%"],legendHoverLink:!0,radius:"75%",startAngle:225,endAngle:-45,clockwise:!0,min:0,max:100,splitNumber:10,axisLine:{show:!0,lineStyle:{color:[[.2,"#91c7ae"],[.8,"#63869e"],[1,"#c23531"]],width:30}},splitLine:{show:!0,length:30,lineStyle:{color:"#eee",width:2,type:"solid"}},axisTick:{show:!0,splitNumber:5,length:8,lineStyle:{color:"#eee",width:1,type:"solid"}},axisLabel:{show:!0,distance:5,color:"auto"},pointer:{show:!0,length:"80%",width:8},itemStyle:{color:"auto"},title:{show:!0,offsetCenter:[0,"-40%"],color:"#333",fontSize:15},detail:{show:!0,backgroundColor:"rgba(0,0,0,0)",borderWidth:0,borderColor:"#ccc",width:100,height:null,padding:[5,10],offsetCenter:[0,"40%"],color:"auto",fontSize:30}}});var Ow=Sr.extend({type:"echartsGaugePointer",shape:{angle:0,width:10,r:10,x:0,y:0},buildPath:function(t,e){var i=Math.cos,n=Math.sin,o=e.r,a=e.width,r=e.angle,s=e.x-i(r)*a*(o/3<=a?1:2),l=e.y-n(r)*a*(o/3<=a?1:2);r=e.angle-Math.PI/2,t.moveTo(s,l),t.lineTo(e.x+i(r)*a,e.y+n(r)*a),t.lineTo(e.x+i(e.angle)*o,e.y+n(e.angle)*o),t.lineTo(e.x-i(r)*a,e.y-n(r)*a),t.lineTo(s,l)}});function Ew(t,e){return e&&("string"==typeof e?t=e.replace("{value}",null!=t?t:""):"function"==typeof e&&(t=e(t))),t}var zw=2*Math.PI,Rw=(gc.extend({type:"gauge",render:function(t,e,i){this.group.removeAll();var n=t.get("axisLine.lineStyle.color"),o=function(t,e){var i=t.get("center"),n=e.getWidth(),o=e.getHeight(),a=Math.min(n,o);return{cx:Pl(i[0],e.getWidth()),cy:Pl(i[1],e.getHeight()),r:Pl(t.get("radius"),a/2)}}(t,i);this._renderMain(t,e,i,n,o)},dispose:function(){},_renderMain:function(t,e,i,n,o){for(var a=this.group,r=t.getModel("axisLine"),s=r.getModel("lineStyle"),l=t.get("clockwise"),u=-t.get("startAngle")/180*Math.PI,h=((g=-t.get("endAngle")/180*Math.PI)-u)%zw,c=u,d=s.get("width"),f=r.get("show"),p=0;f&&p<n.length;p++){var g,m=Math.min(Math.max(n[p][0],0),1),v=new Ur({shape:{startAngle:c,endAngle:g=u+h*m,cx:o.cx,cy:o.cy,clockwise:l,r0:o.r-d,r:o.r},silent:!0});v.setStyle({fill:n[p][1]}),v.setStyle(s.getLineStyle(["color","borderWidth","borderColor"])),a.add(v),c=g}function y(t){if(t<=0)return n[0][1];for(var e=0;e<n.length;e++)if(n[e][0]>=t&&(0===e?0:n[e-1][0])<t)return n[e][1];return n[e-1][1]}if(!l){var x=u;u=g,g=x}this._renderTicks(t,e,i,y,o,u,g,l),this._renderPointer(t,e,i,y,o,u,g,l),this._renderTitle(t,e,i,y,o),this._renderDetail(t,e,i,y,o)},_renderTicks:function(t,e,i,n,o,a,r,s){for(var l=this.group,u=o.cx,h=o.cy,c=o.r,d=+t.get("min"),f=+t.get("max"),p=t.getModel("splitLine"),g=t.getModel("axisTick"),m=t.getModel("axisLabel"),v=t.get("splitNumber"),y=g.get("splitNumber"),x=Pl(p.get("length"),c),_=Pl(g.get("length"),c),w=a,b=(r-a)/v,S=b/y,M=p.getModel("lineStyle").getLineStyle(),I=g.getModel("lineStyle").getLineStyle(),T=0;T<=v;T++){var A=Math.cos(w),D=Math.sin(w);if(p.get("show")){var C=new os({shape:{x1:A*c+u,y1:D*c+h,x2:A*(c-x)+u,y2:D*(c-x)+h},style:M,silent:!0});"auto"===M.stroke&&C.setStyle({stroke:n(T/v)}),l.add(C)}if(m.get("show")){var L=Ew(Nl(T/v*(f-d)+d),m.get("formatter")),k=m.get("distance"),P=n(T/v);l.add(new Fr({style:Qs({},m,{text:L,x:A*(c-x-k)+u,y:D*(c-x-k)+h,textVerticalAlign:D<-.4?"top":.4<D?"bottom":"middle",textAlign:A<-.4?"left":.4<A?"right":"center"},{autoColor:P}),silent:!0}))}if(g.get("show")&&T!==v){for(var N=0;N<=y;N++){A=Math.cos(w),D=Math.sin(w);var O=new os({shape:{x1:A*c+u,y1:D*c+h,x2:A*(c-_)+u,y2:D*(c-_)+h},silent:!0,style:I});"auto"===I.stroke&&O.setStyle({stroke:n((T+N/y)/v)}),l.add(O),w+=S}w-=S}else w+=b}},_renderPointer:function(n,t,e,o,a,i,r,s){var l=this.group,u=this._data;if(n.get("pointer.show")){var h=[+n.get("min"),+n.get("max")],c=[i,r],d=n.getData(),f=d.mapDimension("value");d.diff(u).add(function(t){var e=new Ow({shape:{angle:i}});ll(e,{shape:{angle:kl(d.get(f,t),h,c,!0)}},n),l.add(e),d.setItemGraphicEl(t,e)}).update(function(t,e){var i=u.getItemGraphicEl(e);sl(i,{shape:{angle:kl(d.get(f,t),h,c,!0)}},n),l.add(i),d.setItemGraphicEl(t,i)}).remove(function(t){var e=u.getItemGraphicEl(t);l.remove(e)}).execute(),d.eachItemGraphicEl(function(t,e){var i=d.getItemModel(e),n=i.getModel("pointer");t.setShape({x:a.cx,y:a.cy,width:Pl(n.get("width"),a.r),r:Pl(n.get("length"),a.r)}),t.useStyle(i.getModel("itemStyle").getItemStyle()),"auto"===t.style.fill&&t.setStyle("fill",o(kl(d.get(f,e),h,[0,1],!0))),Ys(t,i.getModel("emphasis.itemStyle").getItemStyle())}),this._data=d}else u&&u.eachItemGraphicEl(function(t){l.remove(t)})},_renderTitle:function(t,e,i,n,o){var a=t.getData(),r=a.mapDimension("value"),s=t.getModel("title");if(s.get("show")){var l=s.get("offsetCenter"),u=o.cx+Pl(l[0],o.r),h=o.cy+Pl(l[1],o.r),c=+t.get("min"),d=+t.get("max"),f=n(kl(t.getData().get(r,0),[c,d],[0,1],!0));this.group.add(new Fr({silent:!0,style:Qs({},s,{x:u,y:h,text:a.getName(0),textAlign:"center",textVerticalAlign:"middle"},{autoColor:f,forceRich:!0})}))}},_renderDetail:function(t,e,i,n,o){var a=t.getModel("detail"),r=+t.get("min"),s=+t.get("max");if(a.get("show")){var l=a.get("offsetCenter"),u=o.cx+Pl(l[0],o.r),h=o.cy+Pl(l[1],o.r),c=Pl(a.get("width"),o.r),d=Pl(a.get("height"),o.r),f=t.getData(),p=f.get(f.mapDimension("value"),0),g=n(kl(p,[r,s],[0,1],!0));this.group.add(new Fr({silent:!0,style:Qs({},a,{x:u,y:h,text:Ew(p,a.get("formatter")),textWidth:isNaN(c)?null:c,textHeight:isNaN(d)?null:d,textAlign:"center",textVerticalAlign:"middle"},{autoColor:g,forceRich:!0})}))}}}),Sf({type:"series.funnel",init:function(t){Rw.superApply(this,"init",arguments),this.legendVisualProvider=new Gv(A(this.getData,this),A(this.getRawData,this)),this._defaultLabelLine(t)},getInitialData:function(t,e){return Bv(this,{coordDimensions:["value"],encodeDefaulter:T(Yu,this)})},_defaultLabelLine:function(t){zo(t,"labelLine",["show"]);var e=t.labelLine,i=t.emphasis.labelLine;e.show=e.show&&t.label.show,i.show=i.show&&t.emphasis.label.show},getDataParams:function(t){var e=this.getData(),i=Rw.superCall(this,"getDataParams",t),n=e.mapDimension("value"),o=e.getSum(n);return i.percent=o?+(e.get(n,t)/o*100).toFixed(2):0,i.$vars.push("percent"),i},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,left:80,top:60,right:80,bottom:60,minSize:"0%",maxSize:"100%",sort:"descending",gap:0,funnelAlign:"center",label:{show:!0,position:"outer"},labelLine:{show:!0,length:20,lineStyle:{width:1,type:"solid"}},itemStyle:{borderColor:"#fff",borderWidth:1},emphasis:{label:{show:!0}}}}));function Bw(t,e){Ii.call(this);var i=new qr,n=new Kr,o=new Fr;this.add(i),this.add(n),this.add(o),this.highDownOnUpdate=function(t,e){"emphasis"===e?(n.ignore=n.hoverIgnore,o.ignore=o.hoverIgnore):(n.ignore=n.normalIgnore,o.ignore=o.normalIgnore)},this.updateData(t,e,!0)}var Vw=Bw.prototype,Gw=["itemStyle","opacity"];Vw.updateData=function(t,e,i){var n=this.childAt(0),o=t.hostModel,a=t.getItemModel(e),r=t.getItemLayout(e),s=t.getItemModel(e).get(Gw);s=null==s?1:s,n.useStyle({}),i?(n.setShape({points:r.points}),n.setStyle({opacity:0}),ll(n,{style:{opacity:s}},o,e)):sl(n,{style:{opacity:s},shape:{points:r.points}},o,e);var l=a.getModel("itemStyle"),u=t.getItemVisual(e,"color");n.setStyle(C({lineJoin:"round",fill:u},l.getItemStyle(["opacity"]))),n.hoverStyle=l.getModel("emphasis").getItemStyle(),this._updateLabel(t,e),Ys(this)},Vw._updateLabel=function(t,e){var i=this.childAt(1),n=this.childAt(2),o=t.hostModel,a=t.getItemModel(e),r=t.getItemLayout(e).label,s=t.getItemVisual(e,"color");sl(i,{shape:{points:r.linePoints||r.linePoints}},o,e),sl(n,{style:{x:r.x,y:r.y}},o,e),n.attr({rotation:r.rotation,origin:[r.x,r.y],z2:10});var l=a.getModel("label"),u=a.getModel("emphasis.label"),h=a.getModel("labelLine"),c=a.getModel("emphasis.labelLine");s=t.getItemVisual(e,"color");$s(n.style,n.hoverStyle={},l,u,{labelFetcher:t.hostModel,labelDataIndex:e,defaultText:t.getName(e),autoColor:s,useInsideStyle:!!r.inside},{textAlign:r.textAlign,textVerticalAlign:r.verticalAlign}),n.ignore=n.normalIgnore=!l.get("show"),n.hoverIgnore=!u.get("show"),i.ignore=i.normalIgnore=!h.get("show"),i.hoverIgnore=!c.get("show"),i.setStyle({stroke:s}),i.setStyle(h.getModel("lineStyle").getLineStyle()),i.hoverStyle=c.getModel("lineStyle").getLineStyle()},w(Bw,Ii);gc.extend({type:"funnel",render:function(t,e,i){var n=t.getData(),o=this._data,a=this.group;n.diff(o).add(function(t){var e=new Bw(n,t);n.setItemGraphicEl(t,e),a.add(e)}).update(function(t,e){var i=o.getItemGraphicEl(e);i.updateData(n,t),a.add(i),n.setItemGraphicEl(t,i)}).remove(function(t){var e=o.getItemGraphicEl(t);a.remove(e)}).execute(),this._data=n},remove:function(){this.group.removeAll(),this._data=null},dispose:function(){}});yf(Yv("funnel")),vf(function(t,w,e){t.eachSeriesByType("funnel",function(t){var o=t.getData(),a=o.mapDimension("value"),e=t.get("sort"),r=function(t,e){return vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,w),i=function(t,e){for(var i=t.mapDimension("value"),n=t.mapArray(i,function(t){return t}),o=[],a="ascending"===e,r=0,s=t.count();r<s;r++)o[r]=r;return"function"==typeof e?o.sort(e):"none"!==e&&o.sort(function(t,e){return a?n[t]-n[e]:n[e]-n[t]}),o}(o,e),s=[Pl(t.get("minSize"),r.width),Pl(t.get("maxSize"),r.width)],n=o.getDataExtent(a),l=t.get("min"),u=t.get("max");null==l&&(l=Math.min(n[0],0)),null==u&&(u=n[1]);function h(t,e){var i,n=kl(o.get(a,t)||0,[l,u],s,!0);switch(c){case"left":i=r.x;break;case"center":i=r.x+(r.width-n)/2;break;case"right":i=r.x+r.width-n}return[[i,e],[i+n,e]]}var c=t.get("funnelAlign"),d=t.get("gap"),f=(r.height-d*(o.count()-1))/o.count(),p=r.y;"ascending"===e&&(f=-f,d=-d,p+=r.height,i=i.reverse());for(var g=0;g<i.length;g++){var m=i[g],v=i[g+1],y=o.getItemModel(m).get("itemStyle.height");null==y?y=f:(y=Pl(y,r.height),"ascending"===e&&(y=-y));var x=h(m,p),_=h(v,p+y);p+=y+d,o.setItemLayout(m,{points:x.concat(_.slice().reverse())})}!function(g){g.each(function(t){var e,i,n,o,a=g.getItemModel(t),r=a.getModel("label").get("position"),s=a.getModel("labelLine"),l=g.getItemLayout(t),u=l.points,h="inner"===r||"inside"===r||"center"===r||"insideLeft"===r||"insideRight"===r;if(h)e="insideLeft"===r?(i=(u[0][0]+u[3][0])/2+5,n=(u[0][1]+u[3][1])/2,"left"):"insideRight"===r?(i=(u[1][0]+u[2][0])/2-5,n=(u[1][1]+u[2][1])/2,"right"):(i=(u[0][0]+u[1][0]+u[2][0]+u[3][0])/4,n=(u[0][1]+u[1][1]+u[2][1]+u[3][1])/4,"center"),o=[[i,n],[i,n]];else{var c,d,f,p=s.get("length");e="left"===r?(c=(u[3][0]+u[0][0])/2,d=(u[3][1]+u[0][1])/2,i=(f=c-p)-5,"right"):"right"===r?(c=(u[1][0]+u[2][0])/2,d=(u[1][1]+u[2][1])/2,i=(f=c+p)+5,"left"):"rightTop"===r?(c=u[1][0],d=u[1][1],i=(f=c+p)+5,"top"):"rightBottom"===r?(c=u[2][0],d=u[2][1],i=(f=c+p)+5,"bottom"):"leftTop"===r?(c=u[0][0],d=u[1][1],i=(f=c-p)-5,"right"):"leftBottom"===r?(c=u[3][0],d=u[2][1],i=(f=c-p)-5,"right"):(c=(u[1][0]+u[2][0])/2,d=(u[1][1]+u[2][1])/2,i=(f=c+p)+5,"left");o=[[c,d],[f,d]],n=d}l.label={linePoints:o,x:i,y:n,verticalAlign:"middle",textAlign:e,inside:h}})}(o)})}),pf(ty("funnel"));function Fw(t,e,i,n,o){Eg.call(this,t,e,i),this.type=n||"value",this.axisIndex=o}Fw.prototype={constructor:Fw,model:null,isHorizontal:function(){return"horizontal"!==this.coordinateSystem.getModel().get("layout")}},w(Fw,Eg);function Ww(t,e,i,n,o,a){t=t||0;var r=i[1]-i[0];if(null!=o&&(o=Zw(o,[0,r])),null!=a&&(a=Math.max(a,null!=o?o:0)),"all"===n){var s=Math.abs(e[1]-e[0]);o=a=Zw(s=Zw(s,[0,r]),[o,a]),n=0}e[0]=Zw(e[0],i),e[1]=Zw(e[1],i);var l=Hw(e,n);e[n]+=t;var u=o||0,h=i.slice();l.sign<0?h[0]+=u:h[1]-=u,e[n]=Zw(e[n],h);var c=Hw(e,n);return null!=o&&(c.sign!==l.sign||c.span<o)&&(e[1-n]=e[n]+l.sign*o),c=Hw(e,n),null!=a&&c.span>a&&(e[1-n]=e[n]+c.sign*a),e}function Hw(t,e){var i=t[e]-t[1-e];return{span:Math.abs(i),sign:0<i?-1:i<0?1:e?-1:1}}function Zw(t,e){return Math.min(null!=e[1]?e[1]:1/0,Math.max(null!=e[0]?e[0]:-1/0,t))}var Uw=E,Xw=Math.min,Yw=Math.max,jw=Math.floor,qw=Math.ceil,Kw=Nl,$w=Math.PI;function Jw(t,e,i){this._axesMap=Q(),this._axesLayout={},this.dimensions=t.dimensions,this._rect,this._model=t,this._init(t,e,i)}function Qw(t,e){return Xw(Yw(t,e[0]),e[1])}Jw.prototype={type:"parallel",constructor:Jw,_init:function(t,r,e){var i=t.dimensions,s=t.parallelAxisIndex;Uw(i,function(t,e){var i=s[e],n=r.getComponent("parallelAxis",i),o=this._axesMap.set(t,new Fw(t,ig(n),[0,0],n.get("type"),i)),a="category"===o.type;o.onBand=a&&n.get("boundaryGap"),o.inverse=n.get("inverse"),(n.axis=o).model=n,o.coordinateSystem=n.coordinateSystem=this},this)},update:function(t,e){this._updateAxesFromSeries(this._model,t)},containPoint:function(t){var e=this._makeLayoutInfo(),i=e.axisBase,n=e.layoutBase,o=e.pixelDimIndex,a=t[1-o],r=t[o];return i<=a&&a<=i+e.axisLength&&n<=r&&r<=n+e.layoutLength},getModel:function(){return this._model},_updateAxesFromSeries:function(e,n){n.eachSeries(function(t){if(e.contains(t,n)){var i=t.getData();Uw(this.dimensions,function(t){var e=this._axesMap.get(t);e.scale.unionExtentFromData(i,i.mapDimension(t)),eg(e.scale,e.model)},this)}},this)},resize:function(t,e){this._rect=vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()}),this._layoutAxes()},getRect:function(){return this._rect},_makeLayoutInfo:function(){var t,e=this._model,i=this._rect,n=["x","y"],o=["width","height"],a=e.get("layout"),r="horizontal"===a?0:1,s=i[o[r]],l=[0,s],u=this.dimensions.length,h=Qw(e.get("axisExpandWidth"),l),c=Qw(e.get("axisExpandCount")||0,[0,u]),d=e.get("axisExpandable")&&3<u&&c<u&&1<c&&0<h&&0<s,f=e.get("axisExpandWindow");f?(t=Qw(f[1]-f[0],l),f[1]=f[0]+t):(t=Qw(h*(c-1),l),(f=[h*(e.get("axisExpandCenter")||jw(u/2))-t/2])[1]=f[0]+t);var p=(s-t)/(u-c);p<3&&(p=0);var g=[jw(Kw(f[0]/h,1))+1,qw(Kw(f[1]/h,1))-1],m=p/h*f[0];return{layout:a,pixelDimIndex:r,layoutBase:i[n[r]],layoutLength:s,axisBase:i[n[1-r]],axisLength:i[o[1-r]],axisExpandable:d,axisExpandWidth:h,axisCollapseWidth:p,axisExpandWindow:f,axisCount:u,winInnerIndices:g,axisExpandWindow0Pos:m}},_layoutAxes:function(){var l=this._rect,t=this._axesMap,e=this.dimensions,u=this._makeLayoutInfo(),h=u.layout;t.each(function(t){var e=[0,u.axisLength],i=t.inverse?1:0;t.setExtent(e[i],e[1-i])}),Uw(e,function(t,e){var i=(u.axisExpandable?function(t,e){var i,n,o=e.layoutLength,a=e.axisExpandWidth,r=e.axisCount,s=e.axisCollapseWidth,l=e.winInnerIndices,u=s,h=!1;t<l[0]?(i=t*s,n=s):t<=l[1]?(i=e.axisExpandWindow0Pos+t*a-e.axisExpandWindow[0],u=a,h=!0):(i=o-(r-1-t)*s,n=s);return{position:i,axisNameAvailableWidth:u,axisLabelShow:h,nameTruncateMaxWidth:n}}:function(t,e){var i=e.layoutLength/(e.axisCount-1);return{position:i*t,axisNameAvailableWidth:i,axisLabelShow:!0}})(e,u),n={horizontal:{x:i.position,y:u.axisLength},vertical:{x:0,y:i.position}},o={horizontal:$w/2,vertical:0},a=[n[h].x+l.x,n[h].y+l.y],r=o[h],s=ee();re(s,s,r),ae(s,s,a),this._axesLayout[t]={position:a,rotation:r,transform:s,axisNameAvailableWidth:i.axisNameAvailableWidth,axisLabelShow:i.axisLabelShow,nameTruncateMaxWidth:i.nameTruncateMaxWidth,tickDirection:1,labelDirection:1}},this)},getAxis:function(t){return this._axesMap.get(t)},dataToPoint:function(t,e){return this.axisCoordToPoint(this._axesMap.get(e).dataToCoord(t),e)},eachActiveState:function(e,t,i,n){null==i&&(i=0),null==n&&(n=e.count());var o=this._axesMap,a=this.dimensions,r=[],s=[];E(a,function(t){r.push(e.mapDimension(t)),s.push(o.get(t).model)});for(var l=this.hasAxisBrushed(),u=i;u<n;u++){var h;if(l){h="active";for(var c=e.getValues(r,u),d=0,f=a.length;d<f;d++){if("inactive"===s[d].getActiveState(c[d])){h="inactive";break}}}else h="normal";t(h,u)}},hasAxisBrushed:function(){for(var t=this.dimensions,e=this._axesMap,i=!1,n=0,o=t.length;n<o;n++)"normal"!==e.get(t[n]).model.getActiveState()&&(i=!0);return i},axisCoordToPoint:function(t,e){return hl([t,0],this._axesLayout[e].transform)},getAxisLayout:function(t){return D(this._axesLayout[t])},getSlidedAxisExpandWindow:function(t){var e=this._makeLayoutInfo(),i=e.pixelDimIndex,n=e.axisExpandWindow.slice(),o=n[1]-n[0],a=[0,e.axisExpandWidth*(e.axisCount-1)];if(!this.containPoint(t))return{behavior:"none",axisExpandWindow:n};var r,s=t[i]-e.layoutBase-e.axisExpandWindow0Pos,l="slide",u=e.axisCollapseWidth,h=this._model.get("axisExpandSlideTriggerArea"),c=null!=h[0];if(u)c&&u&&s<o*h[0]?(l="jump",r=s-o*h[2]):c&&u&&s>o*(1-h[0])?(l="jump",r=s-o*(1-h[2])):0<=(r=s-o*h[1])&&(r=s-o*(1-h[1]))<=0&&(r=0),(r*=e.axisExpandWidth/u)?Ww(r,n,a,"all"):l="none";else{o=n[1]-n[0];(n=[Yw(0,a[1]*s/o-o/2)])[1]=Xw(a[1],n[0]+o),n[0]=n[1]-o}return{axisExpandWindow:n,behavior:l}}},nh.register("parallel",{create:function(n,o){var a=[];return n.eachComponent("parallel",function(t,e){var i=new Jw(t,n,o);i.name="parallel_"+e,i.resize(t,o),(t.coordinateSystem=i).model=t,a.push(i)}),n.eachSeries(function(t){if("parallel"===t.get("coordinateSystem")){var e=n.queryComponents({mainType:"parallel",index:t.get("parallelIndex"),id:t.get("parallelId")})[0];t.coordinateSystem=e.coordinateSystem}}),a}});var tb=Tu.extend({type:"baseParallelAxis",axis:null,activeIntervals:[],getAreaSelectStyle:function(){return ra([["fill","color"],["lineWidth","borderWidth"],["stroke","borderColor"],["width","width"],["opacity","opacity"]])(this.getModel("areaSelectStyle"))},setActiveIntervals:function(t){var e=this.activeIntervals=D(t);if(e)for(var i=e.length-1;0<=i;i--)Ol(e[i])},getActiveState:function(t){var e=this.activeIntervals;if(!e.length)return"normal";if(null==t||isNaN(t))return"inactive";if(1===e.length){var i=e[0];if(i[0]<=t&&t<=i[1])return"active"}else for(var n=0,o=e.length;n<o;n++)if(e[n][0]<=t&&t<=e[n][1])return"active";return"inactive"}});m(tb.prototype,sg),Om("parallel",tb,function(t,e){return e.type||(e.data?"category":"value")},{type:"value",dim:null,areaSelectStyle:{width:20,borderWidth:1,borderColor:"rgba(160,197,232)",color:"rgba(160,197,232)",opacity:.3},realtime:!0,z:10}),Tu.extend({type:"parallel",dependencies:["parallelAxis"],coordinateSystem:null,dimensions:null,parallelAxisIndex:null,layoutMode:"box",defaultOption:{zlevel:0,z:0,left:80,top:60,right:80,bottom:60,layout:"horizontal",axisExpandable:!1,axisExpandCenter:null,axisExpandCount:0,axisExpandWidth:50,axisExpandRate:17,axisExpandDebounce:50,axisExpandSlideTriggerArea:[-.15,.05,.4],axisExpandTriggerOn:"click",parallelAxisDefault:null},init:function(){Tu.prototype.init.apply(this,arguments),this.mergeOption({})},mergeOption:function(t){var e=this.option;t&&m(e,t,!0),this._initDimensions()},contains:function(t,e){var i=t.get("parallelIndex");return null!=i&&e.getComponent("parallel",i)===this},setAxisExpand:function(e){E(["axisExpandable","axisExpandCenter","axisExpandCount","axisExpandWidth","axisExpandWindow"],function(t){e.hasOwnProperty(t)&&(this.option[t]=e[t])},this)},_initDimensions:function(){var e=this.dimensions=[],i=this.parallelAxisIndex=[];E(M(this.dependentModels.parallelAxis,function(t){return(t.get("parallelIndex")||0)===this.componentIndex},this),function(t){e.push("dim"+t.get("dim")),i.push(t.componentIndex)})}});gf({type:"axisAreaSelect",event:"axisAreaSelected"},function(e,t){t.eachComponent({mainType:"parallelAxis",query:e},function(t){t.axis.model.setActiveIntervals(e.intervals)})}),gf("parallelAxisExpand",function(e,t){t.eachComponent({mainType:"parallel",query:e},function(t){t.setAxisExpand(e)})});var eb=T,ib=E,nb=N,ob=Math.min,ab=Math.max,rb=Math.pow,sb=1e4,lb=6,ub=6,hb="globalPan",cb={w:[0,0],e:[0,1],n:[1,0],s:[1,1]},db={w:"ew",e:"ew",n:"ns",s:"ns",ne:"nesw",sw:"nesw",nw:"nwse",se:"nwse"},fb={brushStyle:{lineWidth:2,stroke:"rgba(0,0,0,0.3)",fill:"rgba(0,0,0,0.1)"},transformable:!0,brushMode:"single",removeOnClick:!1},pb=0;function gb(t){Ct.call(this),this._zr=t,this.group=new Ii,this._brushType,this._brushOption,this._panels,this._track=[],this._dragging,this._covers=[],this._creatingCover,this._creatingPanel,this._enableGlobalPan,this._uid="brushController_"+pb++,this._handlers={},ib(Fb,function(t,e){this._handlers[e]=A(t,this)},this)}function mb(t,e){var i=Hb[e.brushType].createCover(t,e);return i.__brushOption=e,xb(i,e),t.group.add(i),i}function vb(t,e){var i=wb(e);return i.endCreating&&(i.endCreating(t,e),xb(e,e.__brushOption)),e}function yb(t,e){var i=e.__brushOption;wb(e).updateCoverShape(t,e,i.range,i)}function xb(t,e){var i=e.z;null==i&&(i=sb),t.traverse(function(t){t.z=i,t.z2=i})}function _b(t,e){wb(e).updateCommon(t,e),yb(t,e)}function wb(t){return Hb[t.__brushOption.brushType]}function bb(t,e,i){var n,o=t._panels;if(!o)return!0;var a=t._transform;return ib(o,function(t){t.isTargetByCursor(e,i,a)&&(n=t)}),n}function Sb(t,e){var i=t._panels;if(!i)return!0;var n=e.__brushOption.panelId;return null==n||i[n]}function Mb(e){var t=e._covers,i=t.length;return ib(t,function(t){e.group.remove(t)},e),t.length=0,!!i}function Ib(t,e){var i=nb(t._covers,function(t){var e=t.__brushOption,i=D(e.range);return{brushType:e.brushType,panelId:e.panelId,range:i}});t.trigger("brush",i,{isEnd:!!e.isEnd,removeOnClick:!!e.removeOnClick})}function Tb(t){var e=t.length-1;return e<0&&(e=0),[t[0],t[e]]}function Ab(e,i,t,n){var o=new Ii;return o.add(new is({name:"main",style:kb(t),silent:!0,draggable:!0,cursor:"move",drift:eb(e,i,o,"nswe"),ondragend:eb(Ib,i,{isEnd:!0})})),ib(n,function(t){o.add(new is({name:t,style:{opacity:0},draggable:!0,silent:!0,invisible:!0,drift:eb(e,i,o,t),ondragend:eb(Ib,i,{isEnd:!0})}))}),o}function Db(t,e,i,n){var o=n.brushStyle.lineWidth||0,a=ab(o,ub),r=i[0][0],s=i[1][0],l=r-o/2,u=s-o/2,h=i[0][1],c=i[1][1],d=h-a+o/2,f=c-a+o/2,p=h-r,g=c-s,m=p+o,v=g+o;Lb(t,e,"main",r,s,p,g),n.transformable&&(Lb(t,e,"w",l,u,a,v),Lb(t,e,"e",d,u,a,v),Lb(t,e,"n",l,u,m,a),Lb(t,e,"s",l,f,m,a),Lb(t,e,"nw",l,u,a,a),Lb(t,e,"ne",d,u,a,a),Lb(t,e,"sw",l,f,a,a),Lb(t,e,"se",d,f,a,a))}function Cb(n,o){var t=o.__brushOption,a=t.transformable,e=o.childAt(0);e.useStyle(kb(t)),e.attr({silent:!a,cursor:a?"move":"default"}),ib(["w","e","n","s","se","sw","ne","nw"],function(t){var e=o.childOfName(t),i=function t(e,i){{if(1<i.length){i=i.split("");var n=[t(e,i[0]),t(e,i[1])];return"e"!==n[0]&&"w"!==n[0]||n.reverse(),n.join("")}var o={w:"left",e:"right",n:"top",s:"bottom"},a={left:"w",right:"e",top:"n",bottom:"s"},n=cl(o[i],ul(e.group));return a[n]}}(n,t);e&&e.attr({silent:!a,invisible:!a,cursor:a?db[i]+"-resize":null})})}function Lb(t,e,i,n,o,a,r){var s=e.childOfName(i);s&&s.setShape(function(t){var e=ob(t[0][0],t[1][0]),i=ob(t[0][1],t[1][1]),n=ab(t[0][0],t[1][0]),o=ab(t[0][1],t[1][1]);return{x:e,y:i,width:n-e,height:o-i}}(zb(t,e,[[n,o],[n+a,o+r]])))}function kb(t){return C({strokeNoScale:!0},t.brushStyle)}function Pb(t,e,i,n){var o=[ob(t,i),ob(e,n)],a=[ab(t,i),ab(e,n)];return[[o[0],a[0]],[o[1],a[1]]]}function Nb(t,e,i,n,o,a,r,s){var l=n.__brushOption,u=t(l.range),h=Eb(i,a,r);ib(o.split(""),function(t){var e=cb[t];u[e[0]][e[1]]+=h[e[0]]}),l.range=e(Pb(u[0][0],u[1][0],u[0][1],u[1][1])),_b(i,n),Ib(i,{isEnd:!1})}function Ob(t,e,i,n,o){var a=e.__brushOption.range,r=Eb(t,i,n);ib(a,function(t){t[0]+=r[0],t[1]+=r[1]}),_b(t,e),Ib(t,{isEnd:!1})}function Eb(t,e,i){var n=t.group,o=n.transformCoordToLocal(e,i),a=n.transformCoordToLocal(0,0);return[o[0]-a[0],o[1]-a[1]]}function zb(t,e,i){var n=Sb(t,e);return n&&!0!==n?n.clipPath(i,t._transform):D(i)}function Rb(t){var e=t.event;e.preventDefault&&e.preventDefault()}function Bb(t,e,i){return t.childOfName("main").contain(e,i)}function Vb(t,e,i,n){var o,a=t._creatingCover,r=t._creatingPanel,s=t._brushOption;if(t._track.push(i.slice()),function(t){var e=t._track;if(!e.length)return!1;var i=e[e.length-1],n=e[0],o=i[0]-n[0],a=i[1]-n[1],r=rb(o*o+a*a,.5);return lb<r}(t)||a){if(r&&!a){"single"===s.brushMode&&Mb(t);var l=D(s);l.brushType=Gb(l.brushType,r),l.panelId=!0===r?null:r.panelId,a=t._creatingCover=mb(t,l),t._covers.push(a)}if(a){var u=Hb[Gb(t._brushType,r)];a.__brushOption.range=u.getCreatingRange(zb(t,a,t._track)),n&&(vb(t,a),u.updateCommon(t,a)),yb(t,a),o={isEnd:n}}}else n&&"single"===s.brushMode&&s.removeOnClick&&bb(t,e,i)&&Mb(t)&&(o={isEnd:n,removeOnClick:!0});return o}function Gb(t,e){return"auto"===t?e.defaultBrushType:t}gb.prototype={constructor:gb,enableBrush:function(t){return this._brushType&&function(t){var e=t._zr;(function(t,e,i){var n=Cy(t);n[e]===i&&(n[e]=null)})(e,hb,t._uid),function(i,t){ib(t,function(t,e){i.off(e,t)})}(e,t._handlers),t._brushType=t._brushOption=null}(this),t.brushType&&function(t,e){var i=t._zr;t._enableGlobalPan||function(t,e,i){Cy(t)[e]=i}(i,hb,t._uid);(function(i,t){ib(t,function(t,e){i.on(e,t)})})(i,t._handlers),t._brushType=e.brushType,t._brushOption=m(D(fb),e,!0)}(this,t),this},setPanels:function(t){if(t&&t.length){var e=this._panels={};E(t,function(t){e[t.panelId]=D(t)})}else this._panels=null;return this},mount:function(t){t=t||{},this._enableGlobalPan=t.enableGlobalPan;var e=this.group;return this._zr.add(e),e.attr({position:t.position||[0,0],rotation:t.rotation||0,scale:t.scale||[1,1]}),this._transform=e.getLocalTransform(),this},eachCover:function(t,e){ib(this._covers,t,e)},updateCovers:function(o){o=N(o,function(t){return m(D(fb),t,!0)});var i="\0-brush-index-",a=this._covers,r=this._covers=[],s=this,l=this._creatingCover;return new Tf(a,o,function(t,e){return n(t.__brushOption,e)},n).add(t).update(t).remove(function(t){a[t]!==l&&s.group.remove(a[t])}).execute(),this;function n(t,e){return(null!=t.id?t.id:i+e)+"-"+t.brushType}function t(t,e){var i=o[t];if(null!=e&&a[e]===l)r[t]=a[e];else{var n=r[t]=null!=e?(a[e].__brushOption=i,a[e]):vb(s,mb(s,i));_b(s,n)}}},unmount:function(){return this.enableBrush(!1),Mb(this),this._zr.remove(this.group),this},dispose:function(){this.unmount(),this.off()}},b(gb,Ct);var Fb={mousedown:function(t){if(this._dragging)Wb(this,t);else if(!t.target||!t.target.draggable){Rb(t);var e=this.group.transformCoordToLocal(t.offsetX,t.offsetY);this._creatingCover=null,(this._creatingPanel=bb(this,t,e))&&(this._dragging=!0,this._track=[e.slice()])}},mousemove:function(t){var e=t.offsetX,i=t.offsetY,n=this.group.transformCoordToLocal(e,i);if(function(t,e,i){if(t._brushType&&!function(t,e,i){var n=t._zr;return e<0||e>n.getWidth()||i<0||i>n.getHeight()}(t,e)){var n=t._zr,o=t._covers,a=bb(t,e,i);if(!t._dragging)for(var r=0;r<o.length;r++){var s=o[r].__brushOption;if(a&&(!0===a||s.panelId===a.panelId)&&Hb[s.brushType].contain(o[r],i[0],i[1]))return}a&&n.setCursorStyle("crosshair")}}(this,t,n),this._dragging){Rb(t);var o=Vb(this,t,n,!1);o&&Ib(this,o)}},mouseup:function(t){Wb(this,t)}};function Wb(t,e){if(t._dragging){Rb(e);var i=e.offsetX,n=e.offsetY,o=t.group.transformCoordToLocal(i,n),a=Vb(t,e,o,!0);t._dragging=!1,t._track=[],t._creatingCover=null,a&&Ib(t,a)}}var Hb={lineX:Zb(0),lineY:Zb(1),rect:{createCover:function(t,e){return Ab(eb(Nb,function(t){return t},function(t){return t}),t,e,["w","e","n","s","se","sw","ne","nw"])},getCreatingRange:function(t){var e=Tb(t);return Pb(e[1][0],e[1][1],e[0][0],e[0][1])},updateCoverShape:function(t,e,i,n){Db(t,e,i,n)},updateCommon:Cb,contain:Bb},polygon:{createCover:function(t,e){var i=new Ii;return i.add(new Kr({name:"main",style:kb(e),silent:!0})),i},getCreatingRange:function(t){return t},endCreating:function(t,e){e.remove(e.childAt(0)),e.add(new qr({name:"main",draggable:!0,drift:eb(Ob,t,e),ondragend:eb(Ib,t,{isEnd:!0})}))},updateCoverShape:function(t,e,i,n){e.childAt(0).setShape({points:zb(t,e,i)})},updateCommon:Cb,contain:Bb}};function Zb(l){return{createCover:function(t,e){return Ab(eb(Nb,function(t){var e=[t,[0,100]];return l&&e.reverse(),e},function(t){return t[l]}),t,e,[["w","e"],["n","s"]][l])},getCreatingRange:function(t){var e=Tb(t);return[ob(e[0][l],e[1][l]),ab(e[0][l],e[1][l])]},updateCoverShape:function(t,e,i,n){var o,a=Sb(t,e);if(!0!==a&&a.getLinearBrushOtherExtent)o=a.getLinearBrushOtherExtent(l,t._transform);else{var r=t._zr;o=[0,[r.getWidth(),r.getHeight()][1-l]]}var s=[i,o];l&&s.reverse(),Db(t,e,s,n)},updateCommon:Cb,contain:Bb}}function Ub(i){return i=jb(i),function(t,e){return fl(t,i)}}function Xb(o,a){return o=jb(o),function(t){var e=null!=a?a:t,i=e?o.width:o.height,n=e?o.x:o.y;return[n,n+(i||0)]}}function Yb(n,o,a){return n=jb(n),function(t,e,i){return n.contain(e[0],e[1])&&!Wy(t,o,a)}}function jb(t){return Mi.create(t)}var qb=["axisLine","axisTickLabel","axisName"],Kb=bf({type:"parallelAxis",init:function(t,e){Kb.superApply(this,"init",arguments),(this._brushController=new gb(e.getZr())).on("brush",A(this._onBrush,this))},render:function(t,e,i,n){if(!function(t,e,i){return i&&"axisAreaSelect"===i.type&&e.findComponents({mainType:"parallelAxis",query:i})[0]===t}(t,e,n)){this.axisModel=t,this.api=i,this.group.removeAll();var o=this._axisGroup;if(this._axisGroup=new Ii,this.group.add(this._axisGroup),t.get("show")){var a=function(t,e){return e.getComponent("parallel",t.get("parallelIndex"))}(t,e),r=a.coordinateSystem,s=t.getAreaSelectStyle(),l=s.width,u=t.axis.dim,h=L({strokeContainThreshold:l},r.getAxisLayout(u)),c=new Ym(t,h);E(qb,c.add,c),this._axisGroup.add(c.getGroup()),this._refreshBrushController(h,s,t,a,l,i);var d=n&&!1===n.animation?null:t;dl(o,this._axisGroup,d)}}},_refreshBrushController:function(t,e,i,n,o,a){var r=i.axis.getExtent(),s=r[1]-r[0],l=Math.min(30,.1*Math.abs(s)),u=Mi.create({x:r[0],y:-o/2,width:s,height:o});u.x-=l,u.width+=2*l,this._brushController.mount({enableGlobalPan:!0,rotation:t.rotation,position:t.position}).setPanels([{panelId:"pl",clipPath:Ub(u),isTargetByCursor:Yb(u,a,n),getLinearBrushOtherExtent:Xb(u,0)}]).enableBrush({brushType:"lineX",brushStyle:e,removeOnClick:!0}).updateCovers(function(t){var e=t.axis;return N(t.activeIntervals,function(t){return{brushType:"lineX",panelId:"pl",range:[e.dataToCoord(t[0],!0),e.dataToCoord(t[1],!0)]}})}(i))},_onBrush:function(t,e){var i=this.axisModel,n=i.axis,o=N(t,function(t){return[n.coordToData(t.range[0],!0),n.coordToData(t.range[1],!0)]});!i.option.realtime!==e.isEnd&&!e.removeOnClick||this.api.dispatchAction({type:"axisAreaSelect",parallelAxisId:i.id,intervals:o})},dispose:function(){this._brushController.dispose()}});bf({type:"parallel",render:function(t,e,i){this._model=t,this._api=i,this._handlers||(this._handlers={},E($b,function(t,e){i.getZr().on(e,this._handlers[e]=A(t,this))},this)),Tc(this,"_throttledDispatchExpand",t.get("axisExpandRate"),"fixRate")},dispose:function(t,i){E(this._handlers,function(t,e){i.getZr().off(e,t)}),this._handlers=null},_throttledDispatchExpand:function(t){this._dispatchExpand(t)},_dispatchExpand:function(t){t&&this._api.dispatchAction(L({type:"parallelAxisExpand"},t))}});var $b={mousedown:function(t){Jb(this,"click")&&(this._mouseDownPoint=[t.offsetX,t.offsetY])},mouseup:function(t){var e=this._mouseDownPoint;if(Jb(this,"click")&&e){var i=[t.offsetX,t.offsetY];if(5<Math.pow(e[0]-i[0],2)+Math.pow(e[1]-i[1],2))return;var n=this._model.coordinateSystem.getSlidedAxisExpandWindow([t.offsetX,t.offsetY]);"none"!==n.behavior&&this._dispatchExpand({axisExpandWindow:n.axisExpandWindow})}this._mouseDownPoint=null},mousemove:function(t){if(!this._mouseDownPoint&&Jb(this,"mousemove")){var e=this._model,i=e.coordinateSystem.getSlidedAxisExpandWindow([t.offsetX,t.offsetY]),n=i.behavior;"jump"===n&&this._throttledDispatchExpand.debounceNextCall(e.get("axisExpandDebounce")),this._throttledDispatchExpand("none"===n?null:{axisExpandWindow:i.axisExpandWindow,animation:"jump"===n&&null})}}};function Jb(t,e){var i=t._model;return i.get("axisExpandable")&&i.get("axisExpandTriggerOn")===e}ff(function(t){!function(t){if(t.parallel)return;var e=!1;E(t.series,function(t){t&&"parallel"===t.type&&(e=!0)}),e&&(t.parallel=[{}])}(t),function(n){E(Eo(n.parallelAxis),function(t){if(R(t)){var e=t.parallelIndex||0,i=Eo(n.parallel)[e];i&&i.parallelAxisDefault&&m(t,i.parallelAxisDefault,!1)}})}(t)}),ic.extend({type:"series.parallel",dependencies:["parallel"],visualColorAccessPath:"lineStyle.color",getInitialData:function(t,e){var i=this.getSource();return function(t,e){if(t.encodeDefine)return;var i=e.ecModel.getComponent("parallel",e.get("parallelIndex"));if(!i)return;var n=t.encodeDefine=Q();E(i.dimensions,function(t){var e=function(t){return+t.replace("dim","")}(t);n.set(t,e)})}(i,this),hp(i,this)},getRawIndicesByActiveState:function(i){var t=this.coordinateSystem,n=this.getData(),o=[];return t.eachActiveState(n,function(t,e){i===t&&o.push(n.getRawIndex(e))}),o},defaultOption:{zlevel:0,z:2,coordinateSystem:"parallel",parallelIndex:0,label:{show:!1},inactiveOpacity:.05,activeOpacity:1,lineStyle:{width:1,opacity:.45,type:"solid"},emphasis:{label:{show:!1}},progressive:500,smooth:!1,animationEasing:"linear"}});gc.extend({type:"parallel",init:function(){this._dataGroup=new Ii,this.group.add(this._dataGroup),this._data,this._initialized},render:function(a,t,e,r){var i=this._dataGroup,s=a.getData(),l=this._data,u=a.coordinateSystem,h=u.dimensions,c=eS(a);if(s.diff(l).add(function(t){iS(tS(s,i,t,h,u),s,t,c)}).update(function(t,e){var i=l.getItemGraphicEl(e),n=Qb(s,t,h,u);s.setItemGraphicEl(t,i);var o=r&&!1===r.animation?null:a;sl(i,{shape:{points:n}},o,t),iS(i,s,t,c)}).remove(function(t){var e=l.getItemGraphicEl(t);i.remove(e)}).execute(),!this._initialized){this._initialized=!0;var n=function(t,e,i){var n=t.model,o=t.getRect(),a=new is({shape:{x:o.x,y:o.y,width:o.width,height:o.height}}),r="horizontal"===n.get("layout")?"width":"height";return a.setShape(r,0),ll(a,{shape:{width:o.width,height:o.height}},e,i),a}(u,a,function(){setTimeout(function(){i.removeClipPath()})});i.setClipPath(n)}this._data=s},incrementalPrepareRender:function(t,e,i){this._initialized=!0,this._data=null,this._dataGroup.removeAll()},incrementalRender:function(t,e,i){for(var n=e.getData(),o=e.coordinateSystem,a=o.dimensions,r=eS(e),s=t.start;s<t.end;s++){var l=tS(n,this._dataGroup,s,a,o);l.incremental=!0,iS(l,n,s,r)}},dispose:function(){},remove:function(){this._dataGroup&&this._dataGroup.removeAll(),this._data=null}});function Qb(t,e,i,n){for(var o,a=[],r=0;r<i.length;r++){var s=i[r],l=t.get(t.mapDimension(s),e);o=l,("category"===n.getAxis(s).type?null==o:null==o||isNaN(o))||a.push(n.dataToPoint(l,s))}return a}function tS(t,e,i,n,o){var a=Qb(t,i,n,o),r=new Kr({shape:{points:a},silent:!0,z2:10});return e.add(r),t.setItemGraphicEl(i,r),r}function eS(t){var e=t.get("smooth",!0);return!0===e&&(e=.3),{lineStyle:t.getModel("lineStyle").getLineStyle(),smooth:null!=e?e:.3}}function iS(t,e,i,n){var o=n.lineStyle;e.hasItemOption&&(o=e.getItemModel(i).getModel("lineStyle").getLineStyle());t.useStyle(o);var a=t.style;a.fill=null,a.stroke=e.getItemVisual(i,"color"),a.opacity=e.getItemVisual(i,"opacity"),n.smooth&&(t.shape.smooth=n.smooth)}var nS=["lineStyle","normal","opacity"];yf({seriesType:"parallel",reset:function(t,e,i){var n=t.getModel("itemStyle"),o=t.getModel("lineStyle"),a=e.get("color"),r=o.get("color")||n.get("color")||a[t.seriesIndex%a.length],s=t.get("inactiveOpacity"),l=t.get("activeOpacity"),u=t.getModel("lineStyle").getLineStyle(),h=t.coordinateSystem,c=t.getData(),d={normal:u.opacity,active:l,inactive:s};return c.setVisual("color",r),{progress:function(t,o){h.eachActiveState(o,function(t,e){var i=d[t];if("normal"===t&&o.hasItemOption){var n=o.getItemModel(e).get(nS,!0);null!=n&&(i=n)}o.setItemVisual(e,"opacity",i)},t.start,t.end)}}}});var oS=ic.extend({type:"series.sankey",layoutInfo:null,levelModels:null,getInitialData:function(t,e){for(var i=t.edges||t.links,n=t.data||t.nodes,o=t.levels,a=this.levelModels={},r=0;r<o.length;r++)null!=o[r].depth&&0<=o[r].depth&&(a[o[r].depth]=new Il(o[r],this,e));if(n&&i)return X_(n,i,this,!0,function(t,e){t.wrapMethod("getItemModel",function(t,n){return t.customizeGetParent(function(t){var e=this.parentModel,i=e.getData().getItemLayout(n).depth;return e.levelModels[i]||this.parentModel}),t}),e.wrapMethod("getItemModel",function(t,n){return t.customizeGetParent(function(t){var e=this.parentModel,i=e.getGraph().getEdgeByIndex(n).node1.getLayout().depth;return e.levelModels[i]||this.parentModel}),t})}).data},setNodePosition:function(t,e){var i=this.option.data[t];i.localX=e[0],i.localY=e[1]},getGraph:function(){return this.getData().graph},getEdgeData:function(){return this.getGraph().edgeData},formatTooltip:function(t,e,i){if("edge"===i){var n=this.getDataParams(t,i),o=n.data,a=o.source+" -- "+o.target;return n.value&&(a+=" : "+n.value),eu(a)}if("node"!==i)return oS.superCall(this,"formatTooltip",t,e);var r=this.getGraph().getNodeByIndex(t).getLayout().value,s=this.getDataParams(t,i).data.name;if(r)a=s+" : "+r;return eu(a)},optionUpdated:function(){var t=this.option;!0===t.focusNodeAdjacency&&(t.focusNodeAdjacency="allEdges")},defaultOption:{zlevel:0,z:2,coordinateSystem:"view",layout:null,left:"5%",top:"5%",right:"20%",bottom:"5%",orient:"horizontal",nodeWidth:20,nodeGap:8,draggable:!0,focusNodeAdjacency:!1,layoutIterations:32,label:{show:!0,position:"right",color:"#000",fontSize:12},levels:[],nodeAlign:"justify",itemStyle:{borderWidth:1,borderColor:"#333"},lineStyle:{color:"#314656",opacity:.2,curveness:.5},emphasis:{label:{show:!0},lineStyle:{opacity:.6}},animationEasing:"linear",animationDuration:1e3}}),aS=["itemStyle","opacity"],rS=["lineStyle","opacity"];function sS(t,e){return t.getVisual("opacity")||t.getModel().get(e)}function lS(t,e,i){var n=t.getGraphicEl(),o=sS(t,e);null!=i&&(null==o&&(o=1),o*=i),n.downplay&&n.downplay(),n.traverse(function(t){"group"!==t.type&&t.setStyle("opacity",o)})}function uS(t,e){var i=sS(t,e),n=t.getGraphicEl();n.highlight&&n.highlight(),n.traverse(function(t){"group"!==t.type&&t.setStyle("opacity",i)})}var hS=Is({shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,cpx2:0,cpy2:0,extent:0,orient:""},buildPath:function(t,e){var i=e.extent;t.moveTo(e.x1,e.y1),t.bezierCurveTo(e.cpx1,e.cpy1,e.cpx2,e.cpy2,e.x2,e.y2),"vertical"===e.orient?(t.lineTo(e.x2+i,e.y2),t.bezierCurveTo(e.cpx2+i,e.cpy2,e.cpx1+i,e.cpy1,e.x1+i,e.y1)):(t.lineTo(e.x2,e.y2+i),t.bezierCurveTo(e.cpx2,e.cpy2+i,e.cpx1,e.cpy1+i,e.x1,e.y1+i)),t.closePath()}});Mf({type:"sankey",_model:null,_focusAdjacencyDisabled:!1,render:function(w,t,n){var o=this,e=w.getGraph(),b=this.group,i=w.layoutInfo,S=i.width,M=i.height,u=w.getData(),I=w.getData("edge"),T=w.get("orient");this._model=w,b.removeAll(),b.attr("position",[i.x,i.y]),e.eachEdge(function(t){var e=new hS;e.dataIndex=t.dataIndex,e.seriesIndex=w.seriesIndex,e.dataType="edge";var i,n,o,a,r,s,l,u,h=t.getModel("lineStyle"),c=h.get("curveness"),d=t.node1.getLayout(),f=t.node1.getModel(),p=f.get("localX"),g=f.get("localY"),m=t.node2.getLayout(),v=t.node2.getModel(),y=v.get("localX"),x=v.get("localY"),_=t.getLayout();switch(e.shape.extent=Math.max(1,_.dy),u="vertical"===(e.shape.orient=T)?(i=(null!=p?p*S:d.x)+_.sy,n=(null!=g?g*M:d.y)+d.dy,o=(null!=y?y*S:m.x)+_.ty,r=i,s=n*(1-c)+(a=null!=x?x*M:m.y)*c,l=o,n*c+a*(1-c)):(i=(null!=p?p*S:d.x)+d.dx,n=(null!=g?g*M:d.y)+_.sy,r=i*(1-c)+(o=null!=y?y*S:m.x)*c,s=n,l=i*c+o*(1-c),a=(null!=x?x*M:m.y)+_.ty),e.setShape({x1:i,y1:n,x2:o,y2:a,cpx1:r,cpy1:s,cpx2:l,cpy2:u}),e.setStyle(h.getItemStyle()),e.style.fill){case"source":e.style.fill=t.node1.getVisual("color");break;case"target":e.style.fill=t.node2.getVisual("color")}Ys(e,t.getModel("emphasis.lineStyle").getItemStyle()),b.add(e),I.setItemGraphicEl(t.dataIndex,e)}),e.eachNode(function(t){var e=t.getLayout(),i=t.getModel(),n=i.get("localX"),o=i.get("localY"),a=i.getModel("label"),r=i.getModel("emphasis.label"),s=new is({shape:{x:null!=n?n*S:e.x,y:null!=o?o*M:e.y,width:e.dx,height:e.dy},style:i.getModel("itemStyle").getItemStyle()}),l=t.getModel("emphasis.itemStyle").getItemStyle();$s(s.style,l,a,r,{labelFetcher:w,labelDataIndex:t.dataIndex,defaultText:t.id,isRectText:!0}),s.setStyle("fill",t.getVisual("color")),Ys(s,l),b.add(s),u.setItemGraphicEl(t.dataIndex,s),s.dataType="node"}),u.eachItemGraphicEl(function(t,i){var e=u.getItemModel(i);e.get("draggable")&&(t.drift=function(t,e){o._focusAdjacencyDisabled=!0,this.shape.x+=t,this.shape.y+=e,this.dirty(),n.dispatchAction({type:"dragNode",seriesId:w.id,dataIndex:u.getRawIndex(i),localX:this.shape.x/S,localY:this.shape.y/M})},t.ondragend=function(){o._focusAdjacencyDisabled=!1},t.draggable=!0,t.cursor="move"),e.get("focusNodeAdjacency")&&(t.off("mouseover").on("mouseover",function(){o._focusAdjacencyDisabled||(o._clearTimer(),n.dispatchAction({type:"focusNodeAdjacency",seriesId:w.id,dataIndex:t.dataIndex}))}),t.off("mouseout").on("mouseout",function(){o._focusAdjacencyDisabled||o._dispatchUnfocus(n)}))}),I.eachItemGraphicEl(function(t,e){I.getItemModel(e).get("focusNodeAdjacency")&&(t.off("mouseover").on("mouseover",function(){o._focusAdjacencyDisabled||(o._clearTimer(),n.dispatchAction({type:"focusNodeAdjacency",seriesId:w.id,edgeDataIndex:t.dataIndex}))}),t.off("mouseout").on("mouseout",function(){o._focusAdjacencyDisabled||o._dispatchUnfocus(n)}))}),!this._data&&w.get("animation")&&b.setClipPath(function(t,e,i){var n=new is({shape:{x:t.x-10,y:t.y-10,width:0,height:t.height+20}});return ll(n,{shape:{width:t.width+20,height:t.height+20}},e,i),n}(b.getBoundingRect(),w,function(){b.removeClipPath()})),this._data=w.getData()},dispose:function(){this._clearTimer()},_dispatchUnfocus:function(t){var e=this;this._clearTimer(),this._unfocusDelayTimer=setTimeout(function(){e._unfocusDelayTimer=null,t.dispatchAction({type:"unfocusNodeAdjacency",seriesId:e._model.id})},500)},_clearTimer:function(){this._unfocusDelayTimer&&(clearTimeout(this._unfocusDelayTimer),this._unfocusDelayTimer=null)},focusNodeAdjacency:function(t,e,i,n){var o=this._model.getData(),a=o.graph,r=n.dataIndex,s=o.getItemModel(r),l=n.edgeDataIndex;if(null!=r||null!=l){var u=a.getNodeByIndex(r),h=a.getEdgeByIndex(l);if(a.eachNode(function(t){lS(t,aS,.1)}),a.eachEdge(function(t){lS(t,rS,.1)}),u){uS(u,aS);var c=s.get("focusNodeAdjacency");"outEdges"===c?E(u.outEdges,function(t){t.dataIndex<0||(uS(t,rS),uS(t.node2,aS))}):"inEdges"===c?E(u.inEdges,function(t){t.dataIndex<0||(uS(t,rS),uS(t.node1,aS))}):"allEdges"===c&&E(u.edges,function(t){t.dataIndex<0||(uS(t,rS),uS(t.node1,aS),uS(t.node2,aS))})}h&&(uS(h,rS),uS(h.node1,aS),uS(h.node2,aS))}},unfocusNodeAdjacency:function(t,e,i,n){var o=this._model.getGraph();o.eachNode(function(t){lS(t,aS)}),o.eachEdge(function(t){lS(t,rS)})}}),gf({type:"dragNode",event:"dragnode",update:"update"},function(e,t){t.eachComponent({mainType:"series",subType:"sankey",query:e},function(t){t.setNodePosition(e.dataIndex,[e.localX,e.localY])})});function cS(t){var e=t.hostGraph.data.getRawDataItem(t.dataIndex);return null!=e.depth&&0<=e.depth}function dS(t,l,u,h,c){var d="vertical"===c?"x":"y";E(t,function(t){var e,i,n;t.sort(function(t,e){return t.getLayout()[d]-e.getLayout()[d]});for(var o=0,a=t.length,r="vertical"===c?"dx":"dy",s=0;s<a;s++)0<(n=o-(i=t[s]).getLayout()[d])&&(e=i.getLayout()[d]+n,"vertical"===c?i.setLayout({x:e},!0):i.setLayout({y:e},!0)),o=i.getLayout()[d]+i.getLayout()[r]+l;if(0<(n=o-l-("vertical"===c?h:u)))for(e=i.getLayout()[d]-n,"vertical"===c?i.setLayout({x:e},!0):i.setLayout({y:e},!0),o=e,s=a-2;0<=s;--s)0<(n=(i=t[s]).getLayout()[d]+i.getLayout()[r]+l-o)&&(e=i.getLayout()[d]-n,"vertical"===c?i.setLayout({x:e},!0):i.setLayout({y:e},!0)),o=i.getLayout()[d]})}function fS(t,o,a){E(t.slice().reverse(),function(t){E(t,function(t){if(t.outEdges.length){var e=yS(t.outEdges,pS,a)/yS(t.outEdges,vS,a);if("vertical"===a){var i=t.getLayout().x+(e-mS(t,a))*o;t.setLayout({x:i},!0)}else{var n=t.getLayout().y+(e-mS(t,a))*o;t.setLayout({y:n},!0)}}})})}function pS(t,e){return mS(t.node2,e)*t.getValue()}function gS(t,e){return mS(t.node1,e)*t.getValue()}function mS(t,e){return"vertical"===e?t.getLayout().x+t.getLayout().dx/2:t.getLayout().y+t.getLayout().dy/2}function vS(t){return t.getValue()}function yS(t,e,i){for(var n=0,o=t.length,a=-1;++a<o;){var r=+e.call(t,t[a],i);isNaN(r)||(n+=r)}return n}function xS(t,o,a){E(t,function(t){E(t,function(t){if(t.inEdges.length){var e=yS(t.inEdges,gS,a)/yS(t.inEdges,vS,a);if("vertical"===a){var i=t.getLayout().x+(e-mS(t,a))*o;t.setLayout({x:i},!0)}else{var n=t.getLayout().y+(e-mS(t,a))*o;t.setLayout({y:n},!0)}}})})}vf(function(t,u,e){t.eachSeriesByType("sankey",function(t){var e=t.get("nodeWidth"),i=t.get("nodeGap"),n=function(t,e){return vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,u),o=(t.layoutInfo=n).width,a=n.height,r=t.getGraph(),s=r.nodes,l=r.edges;!function(t){E(t,function(t){var e=yS(t.outEdges,vS),i=yS(t.inEdges,vS),n=Math.max(e,i);t.setLayout({value:n},!0)})}(s),function(t,e,i,n,o,a,r,s,l){(function(t,e,i,n,o,a,r){for(var s=[],l=[],u=[],h=[],c=0,d=0;d<e.length;d++)s[d]=1;for(d=0;d<t.length;d++)l[d]=t[d].inEdges.length,0===l[d]&&u.push(t[d]);var f=-1;for(;u.length;){for(var p=0;p<u.length;p++){var g=u[p],m=g.hostGraph.data.getRawDataItem(g.dataIndex),v=null!=m.depth&&0<=m.depth;v&&m.depth>f&&(f=m.depth),g.setLayout({depth:v?m.depth:c},!0),"vertical"===a?g.setLayout({dy:i},!0):g.setLayout({dx:i},!0);for(var y=0;y<g.outEdges.length;y++){var x=g.outEdges[y],_=e.indexOf(x);s[_]=0;var w=x.node2,b=t.indexOf(w);0==--l[b]&&h.indexOf(w)<0&&h.push(w)}}++c,u=h,h=[]}for(d=0;d<s.length;d++)if(1===s[d])throw new Error("Sankey is a DAG, the original data has cycle!");var S=c-1<f?f:c-1;r&&"left"!==r&&function(t,e,i,n){if("right"===e){for(var o=[],a=t,r=0;a.length;){for(var s=0;s<a.length;s++){var l=a[s];l.setLayout({skNodeHeight:r},!0);for(var u=0;u<l.inEdges.length;u++){var h=l.inEdges[u];o.indexOf(h.node1)<0&&o.push(h.node1)}}a=o,o=[],++r}E(t,function(t){cS(t)||t.setLayout({depth:Math.max(0,n-t.getLayout().skNodeHeight)},!0)})}else"justify"===e&&function(t,e){E(t,function(t){cS(t)||t.outEdges.length||t.setLayout({depth:e},!0)})}(t,n)}(t,r,0,S);!function(t,i,n){E(t,function(t){var e=t.getLayout().depth*i;"vertical"===n?t.setLayout({y:e},!0):t.setLayout({x:e},!0)})}(t,"vertical"===a?(o-i)/S:(n-i)/S,a)})(t,e,i,o,a,s,l),function(t,e,i,n,o,a,r){var s=function(t,e){var i=[],n="vertical"===e?"y":"x",o=Ko(t,function(t){return t.getLayout()[n]});return o.keys.sort(function(t,e){return t-e}),E(o.keys,function(t){i.push(o.buckets.get(t))}),i}(t,r);(function(t,e,o,a,r,s){var l=1/0;E(t,function(t){var e=t.length,i=0;E(t,function(t){i+=t.getLayout().value});var n="vertical"===s?(a-(e-1)*r)/i:(o-(e-1)*r)/i;n<l&&(l=n)}),E(t,function(t){E(t,function(t,e){var i=t.getLayout().value*l;"vertical"===s?(t.setLayout({x:e},!0),t.setLayout({dx:i},!0)):(t.setLayout({y:e},!0),t.setLayout({dy:i},!0))})}),E(e,function(t){var e=+t.getValue()*l;t.setLayout({dy:e},!0)})})(s,e,i,n,o,r),dS(s,o,i,n,r);for(var l=1;0<a;a--)fS(s,l*=.99,r),dS(s,o,i,n,r),xS(s,l,r),dS(s,o,i,n,r)}(t,e,a,o,n,r,s),function(t,e){var i="vertical"===e?"x":"y";E(t,function(t){t.outEdges.sort(function(t,e){return t.node2.getLayout()[i]-e.node2.getLayout()[i]}),t.inEdges.sort(function(t,e){return t.node1.getLayout()[i]-e.node1.getLayout()[i]})}),E(t,function(t){var e=0,i=0;E(t.outEdges,function(t){t.setLayout({sy:e},!0),e+=t.getLayout().dy}),E(t.inEdges,function(t){t.setLayout({ty:i},!0),i+=t.getLayout().dy})})}(t,s)}(s,l,e,i,o,a,0!==M(s,function(t){return 0===t.getLayout().value}).length?0:t.get("layoutIterations"),t.get("orient"),t.get("nodeAlign"))})}),yf(function(t,e){t.eachSeriesByType("sankey",function(n){var t=n.getGraph().nodes;if(t.length){var o=1/0,a=-1/0;E(t,function(t){var e=t.getLayout().value;e<o&&(o=e),a<e&&(a=e)}),E(t,function(t){var e=new a_({type:"color",mappingMethod:"linear",dataExtent:[o,a],visual:n.get("color")}).mapValueToVisual(t.getLayout().value),i=t.getModel().get("itemStyle.color");null!=i?t.setVisual("color",i):t.setVisual("color",e)})}})});var _S={_baseAxisDim:null,getInitialData:function(t,e){var i,n,o=e.getComponent("xAxis",this.get("xAxisIndex")),a=e.getComponent("yAxis",this.get("yAxisIndex")),r=o.get("type"),s=a.get("type");"category"===r?(t.layout="horizontal",i=o.getOrdinalMeta(),n=!0):"category"===s?(t.layout="vertical",i=a.getOrdinalMeta(),n=!0):t.layout=t.layout||"horizontal";var l=["x","y"],u="horizontal"===t.layout?0:1,h=this._baseAxisDim=l[u],c=l[1-u],d=[o,a],f=d[u].get("type"),p=d[1-u].get("type"),g=t.data;if(g&&n){var m=[];E(g,function(t,e){var i;t.value&&k(t.value)?(i=t.value.slice(),t.value.unshift(e)):k(t)?(i=t.slice(),t.unshift(e)):i=t,m.push(i)}),t.data=m}var v=this.defaultValueDimensions,y=[{name:h,type:Lf(f),ordinalMeta:i,otherDims:{tooltip:!1,itemName:0},dimsDef:["base"]},{name:c,type:Lf(p),dimsDef:v.slice()}];return Bv(this,{coordDimensions:y,dimensionsCount:v.length+1,encodeDefaulter:T(Xu,y,this)})},getBaseAxis:function(){var t=this._baseAxisDim;return this.ecModel.getComponent(t+"Axis",this.get(t+"AxisIndex")).axis}};b(ic.extend({type:"series.boxplot",dependencies:["xAxis","yAxis","grid"],defaultValueDimensions:[{name:"min",defaultTooltip:!0},{name:"Q1",defaultTooltip:!0},{name:"median",defaultTooltip:!0},{name:"Q3",defaultTooltip:!0},{name:"max",defaultTooltip:!0}],dimensions:null,defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,layout:null,boxWidth:[7,50],itemStyle:{color:"#fff",borderWidth:1},emphasis:{itemStyle:{borderWidth:2,shadowBlur:5,shadowOffsetX:2,shadowOffsetY:2,shadowColor:"rgba(0,0,0,0.4)"}},animationEasing:"elasticOut",animationDuration:800}}),_S,!0);var wS=["itemStyle"],bS=["emphasis","itemStyle"],SS=(gc.extend({type:"boxplot",render:function(t,e,i){var o=t.getData(),a=this.group,r=this._data;this._data||a.removeAll();var s="horizontal"===t.get("layout")?1:0;o.diff(r).add(function(t){if(o.hasValue(t)){var e=MS(o.getItemLayout(t),o,t,s,!0);o.setItemGraphicEl(t,e),a.add(e)}}).update(function(t,e){var i=r.getItemGraphicEl(e);if(o.hasValue(t)){var n=o.getItemLayout(t);i?IS(n,i,o,t):i=MS(n,o,t,s),a.add(i),o.setItemGraphicEl(t,i)}else a.remove(i)}).remove(function(t){var e=r.getItemGraphicEl(t);e&&a.remove(e)}).execute(),this._data=o},remove:function(t){var e=this.group,i=this._data;this._data=null,i&&i.eachItemGraphicEl(function(t){t&&e.remove(t)})},dispose:et}),Sr.extend({type:"boxplotBoxPath",shape:{},buildPath:function(t,e){var i=e.points,n=0;for(t.moveTo(i[n][0],i[n][1]),n++;n<4;n++)t.lineTo(i[n][0],i[n][1]);for(t.closePath();n<i.length;n++)t.moveTo(i[n][0],i[n][1]),n++,t.lineTo(i[n][0],i[n][1])}}));function MS(t,e,i,n,o){var a=t.ends,r=new SS({shape:{points:o?function(t,e,i){return N(t,function(t){return(t=t.slice())[e]=i.initBaseline,t})}(a,n,t):a}});return IS(t,r,e,i,o),r}function IS(t,e,i,n,o){var a=i.hostModel;(0,yl[o?"initProps":"updateProps"])(e,{shape:{points:t.ends}},a,n);var r=i.getItemModel(n),s=r.getModel(wS),l=i.getItemVisual(n,"color"),u=s.getItemStyle(["borderColor"]);u.stroke=l,u.strokeNoScale=!0,e.useStyle(u),e.z2=100,Ys(e,r.getModel(bS).getItemStyle())}var TS=["itemStyle","borderColor"],AS=E;yf(function(n,t){var o=n.get("color");n.eachRawSeriesByType("boxplot",function(t){var e=o[t.seriesIndex%o.length],i=t.getData();i.setVisual({legendSymbol:"roundRect",color:t.get(TS)||e}),n.isSeriesFiltered(t)||i.each(function(t){var e=i.getItemModel(t);i.setItemVisual(t,{color:e.get(TS,!0)})})})}),vf(function(t){var e=function(t){var n=[],o=[];return t.eachSeriesByType("boxplot",function(t){var e=t.getBaseAxis(),i=_(o,e);i<0&&(i=o.length,o[i]=e,n[i]={axis:e,seriesModels:[]}),n[i].seriesModels.push(t)}),n}(t);AS(e,function(i){var t=i.seriesModels;t.length&&(function(t){var e,i,n=t.axis,o=t.seriesModels,a=o.length,r=t.boxWidthList=[],s=t.boxOffsetList=[],l=[];if("category"===n.type)i=n.getBandWidth();else{var u=0;AS(o,function(t){u=Math.max(u,t.getData().count())}),e=n.getExtent(),Math.abs(e[1]-e[0])}AS(o,function(t){var e=t.get("boxWidth");k(e)||(e=[e,e]),l.push([Pl(e[0],i)||0,Pl(e[1],i)||0])});var h=.8*i-2,c=h/a*.3,d=(h-c*(a-1))/a,f=d/2-h/2;AS(o,function(t,e){s.push(f),f+=c+d,r.push(Math.min(Math.max(d,l[e][0]),l[e][1]))})}(i),AS(t,function(t,e){!function(t,r,e){var s=t.coordinateSystem,l=t.getData(),a=e/2,u="horizontal"===t.get("layout")?0:1,h=1-u,i=["x","y"],n=l.mapDimension(i[u]),o=l.mapDimension(i[h],!0);if(null==n||o.length<5)return;for(var c=0;c<l.count();c++){var d=l.get(n,c),f=x(d,o[2],c),p=x(d,o[0],c),g=x(d,o[1],c),m=x(d,o[3],c),v=x(d,o[4],c),y=[];_(y,g,0),_(y,m,1),y.push(p,g,v,m),w(y,p),w(y,v),w(y,f),l.setItemLayout(c,{initBaseline:f[h],ends:y})}function x(t,e,i){var n,o=l.get(e,i),a=[];return a[u]=t,a[h]=o,isNaN(t)||isNaN(o)?n=[NaN,NaN]:(n=s.dataToPoint(a))[u]+=r,n}function _(t,e,i){var n=e.slice(),o=e.slice();n[u]+=a,o[u]-=a,i?t.push(n,o):t.push(o,n)}function w(t,e){var i=e.slice(),n=e.slice();i[u]-=a,n[u]+=a,t.push(i,n)}}(t,i.boxOffsetList[e],i.boxWidthList[e])}))})}),b(ic.extend({type:"series.candlestick",dependencies:["xAxis","yAxis","grid"],defaultValueDimensions:[{name:"open",defaultTooltip:!0},{name:"close",defaultTooltip:!0},{name:"lowest",defaultTooltip:!0},{name:"highest",defaultTooltip:!0}],dimensions:null,defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,layout:null,clip:!0,itemStyle:{color:"#c23531",color0:"#314656",borderWidth:1,borderColor:"#c23531",borderColor0:"#314656"},emphasis:{itemStyle:{borderWidth:2}},barMaxWidth:null,barMinWidth:null,barWidth:null,large:!0,largeThreshold:600,progressive:3e3,progressiveThreshold:1e4,progressiveChunkMode:"mod",animationUpdate:!1,animationEasing:"linear",animationDuration:300},getShadowDim:function(){return"open"},brushSelector:function(t,e,i){var n=e.getItemLayout(t);return n&&i.rect(n.brushRect)}}),_S,!0);var DS=["itemStyle"],CS=["emphasis","itemStyle"],LS=["color","color0","borderColor","borderColor0"],kS=(gc.extend({type:"candlestick",render:function(t,e,i){this.group.removeClipPath(),this._updateDrawMode(t),this._isLargeDraw?this._renderLarge(t):this._renderNormal(t)},incrementalPrepareRender:function(t,e,i){this._clear(),this._updateDrawMode(t)},incrementalRender:function(t,e,i,n){this._isLargeDraw?this._incrementalRenderLarge(t,e):this._incrementalRenderNormal(t,e)},_updateDrawMode:function(t){var e=t.pipelineContext.large;(null==this._isLargeDraw||e^this._isLargeDraw)&&(this._isLargeDraw=e,this._clear())},_renderNormal:function(o){var a=o.getData(),r=this._data,s=this.group,l=a.getLayout("isSimpleBox"),u=o.get("clip",!0),t=o.coordinateSystem,h=t.getArea&&t.getArea();this._data||s.removeAll(),a.diff(r).add(function(t){if(a.hasValue(t)){var e,i=a.getItemLayout(t);if(u&&NS(h,i))return;ll(e=PS(i,t,!0),{shape:{points:i.ends}},o,t),OS(e,a,t,l),s.add(e),a.setItemGraphicEl(t,e)}}).update(function(t,e){var i=r.getItemGraphicEl(e);if(a.hasValue(t)){var n=a.getItemLayout(t);u&&NS(h,n)?s.remove(i):(i?sl(i,{shape:{points:n.ends}},o,t):i=PS(n,t),OS(i,a,t,l),s.add(i),a.setItemGraphicEl(t,i))}else s.remove(i)}).remove(function(t){var e=r.getItemGraphicEl(t);e&&s.remove(e)}).execute(),this._data=a},_renderLarge:function(t){this._clear(),zS(t,this.group);var e=t.get("clip",!0)?ym(t.coordinateSystem,!1,t):null;e?this.group.setClipPath(e):this.group.removeClipPath()},_incrementalRenderNormal:function(t,e){for(var i,n=e.getData(),o=n.getLayout("isSimpleBox");null!=(i=t.next());){var a;OS(a=PS(n.getItemLayout(i),i),n,i,o),a.incremental=!0,this.group.add(a)}},_incrementalRenderLarge:function(t,e){zS(e,this.group,!0)},remove:function(t){this._clear()},_clear:function(){this.group.removeAll(),this._data=null},dispose:et}),Sr.extend({type:"normalCandlestickBox",shape:{},buildPath:function(t,e){var i=e.points;this.__simpleBox?(t.moveTo(i[4][0],i[4][1]),t.lineTo(i[6][0],i[6][1])):(t.moveTo(i[0][0],i[0][1]),t.lineTo(i[1][0],i[1][1]),t.lineTo(i[2][0],i[2][1]),t.lineTo(i[3][0],i[3][1]),t.closePath(),t.moveTo(i[4][0],i[4][1]),t.lineTo(i[5][0],i[5][1]),t.moveTo(i[6][0],i[6][1]),t.lineTo(i[7][0],i[7][1]))}}));function PS(t,e,i){var n=t.ends;return new kS({shape:{points:i?function(t,e){return N(t,function(t){return(t=t.slice())[1]=e.initBaseline,t})}(n,t):n},z2:100})}function NS(t,e){for(var i=!0,n=0;n<e.ends.length;n++)if(t.contain(e.ends[n][0],e.ends[n][1])){i=!1;break}return i}function OS(t,e,i,n){var o=e.getItemModel(i),a=o.getModel(DS),r=e.getItemVisual(i,"color"),s=e.getItemVisual(i,"borderColor")||r,l=a.getItemStyle(LS);t.useStyle(l),t.style.strokeNoScale=!0,t.style.fill=r,t.style.stroke=s,t.__simpleBox=n,Ys(t,o.getModel(CS).getItemStyle())}var ES=Sr.extend({type:"largeCandlestickBox",shape:{},buildPath:function(t,e){for(var i=e.points,n=0;n<i.length;)if(this.__sign===i[n++]){var o=i[n++];t.moveTo(o,i[n++]),t.lineTo(o,i[n++])}else n+=3}});function zS(t,e,i){var n=t.getData(),o=n.getLayout("largePoints"),a=new ES({shape:{points:o},__sign:1});e.add(a);var r=new ES({shape:{points:o},__sign:-1});e.add(r),RS(1,a,t,n),RS(-1,r,t,n),i&&(a.incremental=!0,r.incremental=!0)}function RS(t,e,i,n){var o=0<t?"P":"N",a=n.getVisual("borderColor"+o)||n.getVisual("color"+o),r=i.getModel(DS).getItemStyle(LS);e.useStyle(r),e.style.fill=null,e.style.stroke=a}var BS=["itemStyle","borderColor"],VS=["itemStyle","borderColor0"],GS=["itemStyle","color"],FS=["itemStyle","color0"],WS={seriesType:"candlestick",plan:dc(),performRawSeries:!0,reset:function(t,e){var i=t.getData(),n=t.pipelineContext.large;if(i.setVisual({legendSymbol:"roundRect",colorP:a(1,t),colorN:a(-1,t),borderColorP:r(1,t),borderColorN:r(-1,t)}),!e.isSeriesFiltered(t))return!n&&{progress:function(t,e){var i;for(;null!=(i=t.next());){var n=e.getItemModel(i),o=e.getItemLayout(i).sign;e.setItemVisual(i,{color:a(o,n),borderColor:r(o,n)})}}};function a(t,e){return e.get(0<t?GS:FS)}function r(t,e){return e.get(0<t?BS:VS)}}},HS="undefined"!=typeof Float32Array?Float32Array:Array,ZS={seriesType:"candlestick",plan:dc(),reset:function(t){var x=t.coordinateSystem,e=t.getData(),_=function(t,e){var i,n=t.getBaseAxis(),o="category"===n.type?n.getBandWidth():(i=n.getExtent(),Math.abs(i[1]-i[0])/e.count()),a=Pl(H(t.get("barMaxWidth"),o),o),r=Pl(H(t.get("barMinWidth"),1),o),s=t.get("barWidth");return null!=s?Pl(s,o):Math.max(Math.min(o/2,a),r)}(t,e),i=["x","y"],w=e.mapDimension(i[0]),n=e.mapDimension(i[1],!0),b=n[0],S=n[1],M=n[2],I=n[3];if(e.setLayout({candleWidth:_,isSimpleBox:_<=1.3}),!(null==w||n.length<4))return{progress:t.pipelineContext.large?function(t,e){var i,n,o=new HS(4*t.count),a=0,r=[],s=[];for(;null!=(n=t.next());){var l=e.get(w,n),u=e.get(b,n),h=e.get(S,n),c=e.get(M,n),d=e.get(I,n);isNaN(l)||isNaN(c)||isNaN(d)?(o[a++]=NaN,a+=3):(o[a++]=US(e,n,u,h,S),r[0]=l,r[1]=c,i=x.dataToPoint(r,null,s),o[a++]=i?i[0]:NaN,o[a++]=i?i[1]:NaN,r[1]=d,i=x.dataToPoint(r,null,s),o[a++]=i?i[1]:NaN)}e.setLayout("largePoints",o)}:function(t,e){var i;for(;null!=(i=t.next());){var n=e.get(w,i),o=e.get(b,i),a=e.get(S,i),r=e.get(M,i),s=e.get(I,i),l=Math.min(o,a),u=Math.max(o,a),h=g(l,n),c=g(u,n),d=g(r,n),f=g(s,n),p=[];m(p,c,0),m(p,h,1),p.push(y(f),y(c),y(d),y(h)),e.setItemLayout(i,{sign:US(e,i,o,a,S),initBaseline:a<o?c[1]:h[1],ends:p,brushRect:v(r,s,n)})}function g(t,e){var i=[];return i[0]=e,i[1]=t,isNaN(e)||isNaN(t)?[NaN,NaN]:x.dataToPoint(i)}function m(t,e,i){var n=e.slice(),o=e.slice();n[0]=Ns(n[0]+_/2,1,!1),o[0]=Ns(o[0]-_/2,1,!0),i?t.push(n,o):t.push(o,n)}function v(t,e,i){var n=g(t,i),o=g(e,i);return n[0]-=_/2,o[0]-=_/2,{x:n[0],y:n[1],width:_,height:o[1]-n[1]}}function y(t){return t[0]=Ns(t[0],1),t}}}}};function US(t,e,i,n,o){return n<i?-1:i<n?1:0<e?t.get(o,e-1)<=n?1:-1:1}ff(function(t){t&&k(t.series)&&E(t.series,function(t){R(t)&&"k"===t.type&&(t.type="candlestick")})}),yf(WS),vf(ZS),ic.extend({type:"series.effectScatter",dependencies:["grid","polar"],getInitialData:function(t,e){return hp(this.getSource(),this,{useEncodeDefaulter:!0})},brushSelector:"point",defaultOption:{coordinateSystem:"cartesian2d",zlevel:0,z:2,legendHoverLink:!0,effectType:"ripple",progressive:0,showEffectOn:"render",rippleEffect:{period:4,scale:2.5,brushType:"fill"},symbolSize:10}});function XS(t,e){var i=e.rippleEffectColor||e.color;t.eachChild(function(t){t.attr({z:e.z,zlevel:e.zlevel,style:{stroke:"stroke"===e.brushType?i:null,fill:"fill"===e.brushType?i:null}})})}function YS(t,e){Ii.call(this);var i=new Fg(t,e),n=new Ii;this.add(i),this.add(n),n.beforeUpdate=function(){this.attr(i.getScale())},this.updateData(t,e)}var jS=YS.prototype;jS.stopEffectAnimation=function(){this.childAt(1).removeAll()},jS.startEffectAnimation=function(t){for(var e=t.symbolType,i=t.color,n=this.childAt(1),o=0;o<3;o++){var a=mg(e,-1,-1,2,2,i);a.attr({style:{strokeNoScale:!0},z2:99,silent:!0,scale:[.5,.5]});var r=-o/3*t.period+t.effectOffset;a.animate("",!0).when(t.period,{scale:[t.rippleScale/2,t.rippleScale/2]}).delay(r).start(),a.animateStyle(!0).when(t.period,{opacity:0}).delay(r).start(),n.add(a)}XS(n,t)},jS.updateEffectAnimation=function(t){for(var e=this._effectCfg,i=this.childAt(1),n=["symbolType","period","rippleScale"],o=0;o<n.length;o++){var a=n[o];if(e[a]!==t[a])return this.stopEffectAnimation(),void this.startEffectAnimation(t)}XS(i,t)},jS.highlight=function(){this.trigger("emphasis")},jS.downplay=function(){this.trigger("normal")},jS.updateData=function(t,e){var i=t.hostModel;this.childAt(0).updateData(t,e);var n=this.childAt(1),o=t.getItemModel(e),a=t.getItemVisual(e,"symbol"),r=function(t){return k(t)||(t=[+t,+t]),t}(t.getItemVisual(e,"symbolSize")),s=t.getItemVisual(e,"color");n.attr("scale",r),n.traverse(function(t){t.attr({fill:s})});var l=o.getShallow("symbolOffset");if(l){var u=n.position;u[0]=Pl(l[0],r[0]),u[1]=Pl(l[1],r[1])}n.rotation=(o.getShallow("symbolRotate")||0)*Math.PI/180||0;var h={};if(h.showEffectOn=i.get("showEffectOn"),h.rippleScale=o.get("rippleEffect.scale"),h.brushType=o.get("rippleEffect.brushType"),h.period=1e3*o.get("rippleEffect.period"),h.effectOffset=e/t.count(),h.z=o.getShallow("z")||0,h.zlevel=o.getShallow("zlevel")||0,h.symbolType=a,h.color=s,h.rippleEffectColor=o.get("rippleEffect.color"),this.off("mouseover").off("mouseout").off("emphasis").off("normal"),"render"===h.showEffectOn)this._effectCfg?this.updateEffectAnimation(h):this.startEffectAnimation(h),this._effectCfg=h;else{this._effectCfg=null,this.stopEffectAnimation();var c=this.childAt(0),d=function(){c.highlight(),"render"!==h.showEffectOn&&this.startEffectAnimation(h)},f=function(){c.downplay(),"render"!==h.showEffectOn&&this.stopEffectAnimation()};this.on("mouseover",d,this).on("mouseout",f,this).on("emphasis",d,this).on("normal",f,this)}this._effectCfg=h},jS.fadeOut=function(t){this.off("mouseover").off("mouseout").off("emphasis").off("normal"),t&&t()},w(YS,Ii),Mf({type:"effectScatter",init:function(){this._symbolDraw=new $g(YS)},render:function(t,e,i){var n=t.getData(),o=this._symbolDraw;o.updateData(n),this.group.add(o.group)},updateTransform:function(t,e,i){var n=t.getData();this.group.dirty();var o=Im().reset(t);o.progress&&o.progress({start:0,end:n.count()},n),this._symbolDraw.updateLayout(n)},_updateGroupTransform:function(t){var e=t.coordinateSystem;e&&e.getRoamTransform&&(this.group.transform=ue(e.getRoamTransform()),this.group.decomposeTransform())},remove:function(t,e){this._symbolDraw&&this._symbolDraw.remove(e)},dispose:function(){}}),yf(Mm("effectScatter","circle")),vf(Im("effectScatter"));var qS="undefined"==typeof Uint32Array?Array:Uint32Array,KS="undefined"==typeof Float64Array?Array:Float64Array;function $S(t){var e=t.data;e&&e[0]&&e[0][0]&&e[0][0].coord&&(t.data=N(e,function(t){var e={coords:[t[0].coord,t[1].coord]};return t[0].name&&(e.fromName=t[0].name),t[1].name&&(e.toName=t[1].name),p([e,t[0],t[1]])}))}var JS=ic.extend({type:"series.lines",dependencies:["grid","polar"],visualColorAccessPath:"lineStyle.color",init:function(t){t.data=t.data||[],$S(t);var e=this._processFlatCoordsArray(t.data);this._flatCoords=e.flatCoords,this._flatCoordsOffset=e.flatCoordsOffset,e.flatCoords&&(t.data=new Float32Array(e.count)),JS.superApply(this,"init",arguments)},mergeOption:function(t){if(t.data=t.data||[],$S(t),t.data){var e=this._processFlatCoordsArray(t.data);this._flatCoords=e.flatCoords,this._flatCoordsOffset=e.flatCoordsOffset,e.flatCoords&&(t.data=new Float32Array(e.count))}JS.superApply(this,"mergeOption",arguments)},appendData:function(t){var e=this._processFlatCoordsArray(t.data);e.flatCoords&&(this._flatCoords?(this._flatCoords=tt(this._flatCoords,e.flatCoords),this._flatCoordsOffset=tt(this._flatCoordsOffset,e.flatCoordsOffset)):(this._flatCoords=e.flatCoords,this._flatCoordsOffset=e.flatCoordsOffset),t.data=new Float32Array(e.count)),this.getRawData().appendData(t.data)},_getCoordsFromItemModel:function(t){var e=this.getData().getItemModel(t);return e.option instanceof Array?e.option:e.getShallow("coords")},getLineCoordsCount:function(t){return this._flatCoordsOffset?this._flatCoordsOffset[2*t+1]:this._getCoordsFromItemModel(t).length},getLineCoords:function(t,e){if(this._flatCoordsOffset){for(var i=this._flatCoordsOffset[2*t],n=this._flatCoordsOffset[2*t+1],o=0;o<n;o++)e[o]=e[o]||[],e[o][0]=this._flatCoords[i+2*o],e[o][1]=this._flatCoords[i+2*o+1];return n}var a=this._getCoordsFromItemModel(t);for(o=0;o<a.length;o++)e[o]=e[o]||[],e[o][0]=a[o][0],e[o][1]=a[o][1];return a.length},_processFlatCoordsArray:function(t){var e=0;if(this._flatCoords&&(e=this._flatCoords.length),"number"!=typeof t[0])return{flatCoordsOffset:null,flatCoords:null,count:t.length};for(var i=t.length,n=new qS(i),o=new KS(i),a=0,r=0,s=0,l=0;l<i;){s++;var u=t[l++];n[r++]=a+e,n[r++]=u;for(var h=0;h<u;h++){var c=t[l++],d=t[l++];o[a++]=c,o[a++]=d}}return{flatCoordsOffset:new Uint32Array(n.buffer,0,r),flatCoords:o,count:s}},getInitialData:function(t,e){var a=new Wf(["value"],this);return a.hasItemOption=!1,a.initData(t.data,[],function(t,e,i,n){if(t instanceof Array)return NaN;a.hasItemOption=!0;var o=t.value;return null!=o?o instanceof Array?o[n]:o:void 0}),a},formatTooltip:function(t){var e=this.getData().getItemModel(t),i=e.get("name");if(i)return i;var n=e.get("fromName"),o=e.get("toName"),a=[];return null!=n&&a.push(n),null!=o&&a.push(o),eu(a.join(" > "))},preventIncremental:function(){return!!this.get("effect.show")},getProgressive:function(){var t=this.option.progressive;return null==t?this.option.large?1e4:this.get("progressive"):t},getProgressiveThreshold:function(){var t=this.option.progressiveThreshold;return null==t?this.option.large?2e4:this.get("progressiveThreshold"):t},defaultOption:{coordinateSystem:"geo",zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,xAxisIndex:0,yAxisIndex:0,symbol:["none","none"],symbolSize:[10,10],geoIndex:0,effect:{show:!1,period:4,constantSpeed:0,symbol:"circle",symbolSize:3,loop:!0,trailLength:.2},large:!1,largeThreshold:2e3,polyline:!1,clip:!0,label:{show:!1,position:"end"},lineStyle:{opacity:.5}}});function QS(t,e,i){Ii.call(this),this.add(this.createLine(t,e,i)),this._updateEffectSymbol(t,e)}var tM=QS.prototype;function eM(t,e,i){Ii.call(this),this._createPolyline(t,e,i)}tM.createLine=function(t,e,i){return new iw(t,e,i)},tM._updateEffectSymbol=function(t,e){var i=t.getItemModel(e).getModel("effect"),n=i.get("symbolSize"),o=i.get("symbol");k(n)||(n=[n,n]);var a=i.get("color")||t.getItemVisual(e,"color"),r=this.childAt(1);this._symbolType!==o&&(this.remove(r),(r=mg(o,-.5,-.5,1,1,a)).z2=100,r.culling=!0,this.add(r)),r&&(r.setStyle("shadowColor",a),r.setStyle(i.getItemStyle(["color"])),r.attr("scale",n),r.setColor(a),r.attr("scale",n),this._symbolType=o,this._updateEffectAnimation(t,i,e))},tM._updateEffectAnimation=function(e,t,i){var n=this.childAt(1);if(n){var o=this,a=e.getItemLayout(i),r=1e3*t.get("period"),s=t.get("loop"),l=t.get("constantSpeed"),u=W(t.get("delay"),function(t){return t/e.count()*r/3}),h="function"==typeof u;if(n.ignore=!0,this.updateAnimationPoints(n,a),0<l&&(r=this.getLineLength(n)/l*1e3),r!==this._period||s!==this._loop){n.stopAnimation();var c=u;h&&(c=u(i)),0<n.__t&&(c=-r*n.__t),n.__t=0;var d=n.animate("",s).when(r,{__t:1}).delay(c).during(function(){o.updateSymbolPosition(n)});s||d.done(function(){o.remove(n)}),d.start()}this._period=r,this._loop=s}},tM.getLineLength=function(t){return yt(t.__p1,t.__cp1)+yt(t.__cp1,t.__p2)},tM.updateAnimationPoints=function(t,e){t.__p1=e[0],t.__p2=e[1],t.__cp1=e[2]||[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2]},tM.updateData=function(t,e,i){this.childAt(0).updateData(t,e,i),this._updateEffectSymbol(t,e)},tM.updateSymbolPosition=function(t){var e=t.__p1,i=t.__p2,n=t.__cp1,o=t.__t,a=t.position,r=Ta,s=Aa;a[0]=r(e[0],n[0],i[0],o),a[1]=r(e[1],n[1],i[1],o);var l=s(e[0],n[0],i[0],o),u=s(e[1],n[1],i[1],o);t.rotation=-Math.atan2(u,l)-Math.PI/2,t.ignore=!1},tM.updateLayout=function(t,e){this.childAt(0).updateLayout(t,e);var i=t.getItemModel(e).getModel("effect");this._updateEffectAnimation(t,i,e)},w(QS,Ii);var iM=eM.prototype;function nM(t,e,i){QS.call(this,t,e,i),this._lastFrame=0,this._lastFramePercent=0}iM._createPolyline=function(t,e,i){var n=t.getItemLayout(e),o=new Kr({shape:{points:n}});this.add(o),this._updateCommonStl(t,e,i)},iM.updateData=function(t,e,i){var n=t.hostModel;sl(this.childAt(0),{shape:{points:t.getItemLayout(e)}},n,e),this._updateCommonStl(t,e,i)},iM._updateCommonStl=function(t,e,i){var n=this.childAt(0),o=t.getItemModel(e),a=t.getItemVisual(e,"color"),r=i&&i.lineStyle,s=i&&i.hoverLineStyle;i&&!t.hasItemOption||(r=o.getModel("lineStyle").getLineStyle(),s=o.getModel("emphasis.lineStyle").getLineStyle()),n.useStyle(C({strokeNoScale:!0,fill:"none",stroke:a},r)),n.hoverStyle=s,Ys(this)},iM.updateLayout=function(t,e){this.childAt(0).setShape("points",t.getItemLayout(e))},w(eM,Ii);var oM=nM.prototype;oM.createLine=function(t,e,i){return new eM(t,e,i)},oM.updateAnimationPoints=function(t,e){this._points=e;for(var i=[0],n=0,o=1;o<e.length;o++){var a=e[o-1],r=e[o];n+=yt(a,r),i.push(n)}if(0!==n){for(o=0;o<i.length;o++)i[o]/=n;this._offsets=i,this._length=n}},oM.getLineLength=function(t){return this._length},oM.updateSymbolPosition=function(t){var e=t.__t,i=this._points,n=this._offsets,o=i.length;if(n){var a=this._lastFrame;if(e<this._lastFramePercent){for(r=Math.min(a+1,o-1);0<=r&&!(n[r]<=e);r--);r=Math.min(r,o-2)}else{for(var r=a;r<o&&!(n[r]>e);r++);r=Math.min(r-1,o-2)}wt(t.position,i[r],i[r+1],(e-n[r])/(n[r+1]-n[r]));var s=i[r+1][0]-i[r][0],l=i[r+1][1]-i[r][1];t.rotation=-Math.atan2(l,s)-Math.PI/2,this._lastFrame=r,this._lastFramePercent=e,t.ignore=!1}},w(nM,QS);var aM=Is({shape:{polyline:!1,curveness:0,segs:[]},buildPath:function(t,e){var i=e.segs,n=e.curveness;if(e.polyline)for(var o=0;o<i.length;){var a=i[o++];if(0<a){t.moveTo(i[o++],i[o++]);for(var r=1;r<a;r++)t.lineTo(i[o++],i[o++])}}else for(o=0;o<i.length;){var s=i[o++],l=i[o++],u=i[o++],h=i[o++];if(t.moveTo(s,l),0<n){var c=(s+u)/2-(l-h)*n,d=(l+h)/2-(u-s)*n;t.quadraticCurveTo(c,d,u,h)}else t.lineTo(u,h)}},findDataIndex:function(t,e){var i=this.shape,n=i.segs,o=i.curveness;if(i.polyline)for(var a=0,r=0;r<n.length;){var s=n[r++];if(0<s)for(var l=n[r++],u=n[r++],h=1;h<s;h++){if(nr(l,u,c=n[r++],d=n[r++]))return a}a++}else for(a=0,r=0;r<n.length;){l=n[r++],u=n[r++];var c=n[r++],d=n[r++];if(0<o){if(ar(l,u,(l+c)/2-(u-d)*o,(u+d)/2-(c-l)*o,c,d))return a}else if(nr(l,u,c,d))return a;a++}return-1}});function rM(){this.group=new Ii}var sM=rM.prototype;sM.isPersistent=function(){return!this._incremental},sM.updateData=function(t){this.group.removeAll();var e=new aM({rectHover:!0,cursor:"default"});e.setShape({segs:t.getLayout("linesPoints")}),this._setCommon(e,t),this.group.add(e),this._incremental=null},sM.incrementalPrepareUpdate=function(t){this.group.removeAll(),this._clearIncremental(),5e5<t.count()?(this._incremental||(this._incremental=new fs({silent:!0})),this.group.add(this._incremental)):this._incremental=null},sM.incrementalUpdate=function(t,e){var i=new aM;i.setShape({segs:e.getLayout("linesPoints")}),this._setCommon(i,e,!!this._incremental),this._incremental?this._incremental.addDisplayable(i,!0):(i.rectHover=!0,i.cursor="default",i.__startIndex=t.start,this.group.add(i))},sM.remove=function(){this._clearIncremental(),this._incremental=null,this.group.removeAll()},sM._setCommon=function(i,t,e){var n=t.hostModel;i.setShape({polyline:n.get("polyline"),curveness:n.get("lineStyle.curveness")}),i.useStyle(n.getModel("lineStyle").getLineStyle()),i.style.strokeNoScale=!0;var o=t.getVisual("color");o&&i.setStyle("stroke",o),i.setStyle("fill"),e||(i.seriesIndex=n.seriesIndex,i.on("mousemove",function(t){i.dataIndex=null;var e=i.findDataIndex(t.offsetX,t.offsetY);0<e&&(i.dataIndex=e+i.__startIndex)}))},sM._clearIncremental=function(){var t=this._incremental;t&&t.clearDisplaybles()};var lM={seriesType:"lines",plan:dc(),reset:function(g){var m=g.coordinateSystem,v=g.get("polyline"),y=g.pipelineContext.large;return{progress:function(t,e){var i=[];if(y){var n,o=t.end-t.start;if(v){for(var a=0,r=t.start;r<t.end;r++)a+=g.getLineCoordsCount(r);n=new Float32Array(o+2*a)}else n=new Float32Array(4*o);var s=0,l=[];for(r=t.start;r<t.end;r++){var u=g.getLineCoords(r,i);v&&(n[s++]=u);for(var h=0;h<u;h++)l=m.dataToPoint(i[h],!1,l),n[s++]=l[0],n[s++]=l[1]}e.setLayout("linesPoints",n)}else for(r=t.start;r<t.end;r++){var c=e.getItemModel(r),d=(u=g.getLineCoords(r,i),[]);if(v)for(var f=0;f<u;f++)d.push(m.dataToPoint(i[f]));else{d[0]=m.dataToPoint(i[0]),d[1]=m.dataToPoint(i[1]);var p=c.get("lineStyle.curveness");+p&&(d[2]=[(d[0][0]+d[1][0])/2-(d[0][1]-d[1][1])*p,(d[0][1]+d[1][1])/2-(d[1][0]-d[0][0])*p])}e.setItemLayout(r,d)}}}}};function uM(t){return t instanceof Array||(t=[t,t]),t}Mf({type:"lines",init:function(){},render:function(t,e,i){var n=t.getData(),o=this._updateLineDraw(n,t),a=t.get("zlevel"),r=t.get("effect.trailLength"),s=i.getZr(),l="svg"===s.painter.getType();l||s.painter.getLayer(a).clear(!0),null==this._lastZlevel||l||s.configLayer(this._lastZlevel,{motionBlur:!1}),this._showEffect(t)&&r&&(l||s.configLayer(a,{motionBlur:!0,lastFrameAlpha:Math.max(Math.min(r/10+.9,1),0)})),o.updateData(n);var u=t.get("clip",!0)&&ym(t.coordinateSystem,!1,t);u?this.group.setClipPath(u):this.group.removeClipPath(),this._lastZlevel=a,this._finished=!0},incrementalPrepareRender:function(t,e,i){var n=t.getData();this._updateLineDraw(n,t).incrementalPrepareUpdate(n),this._clearLayer(i),this._finished=!1},incrementalRender:function(t,e,i){this._lineDraw.incrementalUpdate(t,e.getData()),this._finished=t.end===e.getData().count()},updateTransform:function(t,e,i){var n=t.getData(),o=t.pipelineContext;if(!this._finished||o.large||o.progressiveRender)return{update:!0};var a=lM.reset(t);a.progress&&a.progress({start:0,end:n.count()},n),this._lineDraw.updateLayout(),this._clearLayer(i)},_updateLineDraw:function(t,e){var i=this._lineDraw,n=this._showEffect(e),o=!!e.get("polyline"),a=e.pipelineContext.large;return i&&n===this._hasEffet&&o===this._isPolyline&&a===this._isLargeDraw||(i&&i.remove(),i=this._lineDraw=a?new rM:new ow(o?n?nM:eM:n?QS:iw),this._hasEffet=n,this._isPolyline=o,this._isLargeDraw=a,this.group.removeAll()),this.group.add(i.group),i},_showEffect:function(t){return!!t.get("effect.show")},_clearLayer:function(t){var e=t.getZr();"svg"===e.painter.getType()||null==this._lastZlevel||e.painter.getLayer(this._lastZlevel).clear(!0)},remove:function(t,e){this._lineDraw&&this._lineDraw.remove(),this._lineDraw=null,this._clearLayer(e)},dispose:function(){}});var hM="lineStyle.opacity".split("."),cM={seriesType:"lines",reset:function(t,e,i){var n=uM(t.get("symbol")),o=uM(t.get("symbolSize")),a=t.getData();return a.setVisual("fromSymbol",n&&n[0]),a.setVisual("toSymbol",n&&n[1]),a.setVisual("fromSymbolSize",o&&o[0]),a.setVisual("toSymbolSize",o&&o[1]),a.setVisual("opacity",t.get(hM)),{dataEach:a.hasItemOption?function(t,e){var i=t.getItemModel(e),n=uM(i.getShallow("symbol",!0)),o=uM(i.getShallow("symbolSize",!0)),a=i.get(hM);n[0]&&t.setItemVisual(e,"fromSymbol",n[0]),n[1]&&t.setItemVisual(e,"toSymbol",n[1]),o[0]&&t.setItemVisual(e,"fromSymbolSize",o[0]),o[1]&&t.setItemVisual(e,"toSymbolSize",o[1]),t.setItemVisual(e,"opacity",a)}:null}}};vf(lM),yf(cM),ic.extend({type:"series.heatmap",getInitialData:function(t,e){return hp(this.getSource(),this,{generateCoord:"value"})},preventIncremental:function(){var t=nh.get(this.get("coordinateSystem"));if(t&&t.dimensions)return"lng"===t.dimensions[0]&&"lat"===t.dimensions[1]},defaultOption:{coordinateSystem:"cartesian2d",zlevel:0,z:2,geoIndex:0,blurSize:30,pointSize:20,maxOpacity:1,minOpacity:0}});function dM(){var t=g();this.canvas=t,this.blurSize=30,this.pointSize=20,this.maxOpacity=1,this.minOpacity=0,this._gradientPixels={}}dM.prototype={update:function(t,e,i,n,o,a){var r=this._getBrush(),s=this._getGradient(t,o,"inRange"),l=this._getGradient(t,o,"outOfRange"),u=this.pointSize+this.blurSize,h=this.canvas,c=h.getContext("2d"),d=t.length;h.width=e,h.height=i;for(var f=0;f<d;++f){var p=t[f],g=p[0],m=p[1],v=n(p[2]);c.globalAlpha=v,c.drawImage(r,g-u,m-u)}if(!h.width||!h.height)return h;for(var y=c.getImageData(0,0,h.width,h.height),x=y.data,_=0,w=x.length,b=this.minOpacity,S=this.maxOpacity-b;_<w;){v=x[_+3]/256;var M=4*Math.floor(255*v);if(0<v){var I=a(v)?s:l;0<v&&(v=v*S+b),x[_++]=I[M],x[_++]=I[1+M],x[_++]=I[2+M],x[_++]=I[3+M]*v*256}else _+=4}return c.putImageData(y,0,0),h},_getBrush:function(){var t=this._brushCanvas||(this._brushCanvas=g()),e=this.pointSize+this.blurSize,i=2*e;t.width=i,t.height=i;var n=t.getContext("2d");return n.clearRect(0,0,i,i),n.shadowOffsetX=i,n.shadowBlur=this.blurSize,n.shadowColor="#000",n.beginPath(),n.arc(-e,e,this.pointSize,0,2*Math.PI,!0),n.closePath(),n.fill(),t},_getGradient:function(t,e,i){for(var n=this._gradientPixels,o=n[i]||(n[i]=new Uint8ClampedArray(1024)),a=[0,0,0,0],r=0,s=0;s<256;s++)e[i](s/255,!0,a),o[r++]=a[0],o[r++]=a[1],o[r++]=a[2],o[r++]=a[3];return o}},Mf({type:"heatmap",render:function(i,t,e){var n;t.eachComponent("visualMap",function(e){e.eachTargetSeries(function(t){t===i&&(n=e)})}),this.group.removeAll(),this._incrementalDisplayable=null;var o=i.coordinateSystem;"cartesian2d"===o.type||"calendar"===o.type?this._renderOnCartesianAndCalendar(i,e,0,i.getData().count()):function(t){var e=t.dimensions;return"lng"===e[0]&&"lat"===e[1]}(o)&&this._renderOnGeo(o,i,n,e)},incrementalPrepareRender:function(t,e,i){this.group.removeAll()},incrementalRender:function(t,e,i,n){e.coordinateSystem&&this._renderOnCartesianAndCalendar(e,n,t.start,t.end,!0)},_renderOnCartesianAndCalendar:function(t,e,i,n,o){var a,r,s=t.coordinateSystem;if("cartesian2d"===s.type){var l=s.getAxis("x"),u=s.getAxis("y");a=l.getBandWidth(),r=u.getBandWidth()}for(var h=this.group,c=t.getData(),d="emphasis.itemStyle",f="emphasis.label",p=t.getModel("itemStyle").getItemStyle(["color"]),g=t.getModel(d).getItemStyle(),m=t.getModel("label"),v=t.getModel(f),y=s.type,x="cartesian2d"===y?[c.mapDimension("x"),c.mapDimension("y"),c.mapDimension("value")]:[c.mapDimension("time"),c.mapDimension("value")],_=i;_<n;_++){var w;if("cartesian2d"===y){if(isNaN(c.get(x[2],_)))continue;var b=s.dataToPoint([c.get(x[0],_),c.get(x[1],_)]);w=new is({shape:{x:Math.floor(b[0]-a/2),y:Math.floor(b[1]-r/2),width:Math.ceil(a),height:Math.ceil(r)},style:{fill:c.getItemVisual(_,"color"),opacity:c.getItemVisual(_,"opacity")}})}else{if(isNaN(c.get(x[1],_)))continue;w=new is({z2:1,shape:s.dataToRect([c.get(x[0],_)]).contentShape,style:{fill:c.getItemVisual(_,"color"),opacity:c.getItemVisual(_,"opacity")}})}var S=c.getItemModel(_);c.hasItemOption&&(p=S.getModel("itemStyle").getItemStyle(["color"]),g=S.getModel(d).getItemStyle(),m=S.getModel("label"),v=S.getModel(f));var M=t.getRawValue(_),I="-";M&&null!=M[2]&&(I=M[2]),$s(p,g,m,v,{labelFetcher:t,labelDataIndex:_,defaultText:I,isRectText:!0}),w.setStyle(p),Ys(w,c.hasItemOption?g:L({},g)),(w.incremental=o)&&(w.useHoverLayer=!0),h.add(w),c.setItemGraphicEl(_,w)}},_renderOnGeo:function(o,t,e,i){var n=e.targetVisuals.inRange,a=e.targetVisuals.outOfRange,r=t.getData(),s=this._hmLayer||this._hmLayer||new dM;s.blurSize=t.get("blurSize"),s.pointSize=t.get("pointSize"),s.minOpacity=t.get("minOpacity"),s.maxOpacity=t.get("maxOpacity");var l=o.getViewRect().clone(),u=o.getRoamTransform();l.applyTransform(u);var h=Math.max(l.x,0),c=Math.max(l.y,0),d=Math.min(l.width+l.x,i.getWidth()),f=Math.min(l.height+l.y,i.getHeight()),p=d-h,g=f-c,m=[r.mapDimension("lng"),r.mapDimension("lat"),r.mapDimension("value")],v=r.mapArray(m,function(t,e,i){var n=o.dataToPoint([t,e]);return n[0]-=h,n[1]-=c,n.push(i),n}),y=e.getExtent(),x="visualMap.continuous"===e.type?function(t,e){var i=t[1]-t[0];return e=[(e[0]-t[0])/i,(e[1]-t[0])/i],function(t){return t>=e[0]&&t<=e[1]}}(y,e.option.range):function(e,n,o){var i=e[1]-e[0],a=(n=N(n,function(t){return{interval:[(t.interval[0]-e[0])/i,(t.interval[1]-e[0])/i]}})).length,r=0;return function(t){for(var e=r;e<a;e++){if((i=n[e].interval)[0]<=t&&t<=i[1]){r=e;break}}if(e===a)for(e=r-1;0<=e;e--){var i;if((i=n[e].interval)[0]<=t&&t<=i[1]){r=e;break}}return 0<=e&&e<a&&o[e]}}(y,e.getPieceList(),e.option.selected);s.update(v,p,g,n.color.getNormalizer(),{inRange:n.color.getColorMapper(),outOfRange:a.color.getColorMapper()},x);var _=new qn({style:{width:p,height:g,x:h,y:c,image:s.canvas},silent:!0});this.group.add(_)},dispose:function(){}});var fM=yv.extend({type:"series.pictorialBar",dependencies:["grid"],defaultOption:{symbol:"circle",symbolSize:null,symbolRotate:null,symbolPosition:null,symbolOffset:null,symbolMargin:null,symbolRepeat:!1,symbolRepeatDirection:"end",symbolClip:!1,symbolBoundingData:null,symbolPatternSize:400,barGap:"-100%",progressive:0,hoverAnimation:!1},getInitialData:function(t){return t.stack=null,fM.superApply(this,"getInitialData",arguments)}}),pM=["itemStyle","borderWidth"],gM=[{xy:"x",wh:"width",index:0,posDesc:["left","right"]},{xy:"y",wh:"height",index:1,posDesc:["top","bottom"]}],mM=new Hr;Mf({type:"pictorialBar",render:function(t,e,i){var r=this.group,s=t.getData(),l=this._data,n=t.coordinateSystem,o=!!n.getBaseAxis().isHorizontal(),a=n.grid.getRect(),u={ecSize:{width:i.getWidth(),height:i.getHeight()},seriesModel:t,coordSys:n,coordSysExtent:[[a.x,a.x+a.width],[a.y,a.y+a.height]],isHorizontal:o,valueDim:gM[+o],categoryDim:gM[1-o]};return s.diff(l).add(function(t){if(s.hasValue(t)){var e=MM(s,t),i=vM(s,t,e,u),n=DM(s,u,i);s.setItemGraphicEl(t,n),r.add(n),NM(n,u,i)}}).update(function(t,e){var i=l.getItemGraphicEl(e);if(s.hasValue(t)){var n=MM(s,t),o=vM(s,t,n,u),a=LM(s,o);i&&a!==i.__pictorialShapeStr&&(r.remove(i),s.setItemGraphicEl(t,null),i=null),i?function(t,e,i){var n=i.animationModel,o=i.dataIndex;sl(t.__pictorialBundle,{position:i.bundlePosition.slice()},n,o),i.symbolRepeat?_M(t,e,i,!0):wM(t,e,i,!0);bM(t,i,!0),SM(t,e,i,!0)}(i,u,o):i=DM(s,u,o,!0),s.setItemGraphicEl(t,i),i.__pictorialSymbolMeta=o,r.add(i),NM(i,u,o)}else r.remove(i)}).remove(function(t){var e=l.getItemGraphicEl(t);e&&CM(l,t,e.__pictorialSymbolMeta.animationModel,e)}).execute(),this._data=s,this.group},dispose:et,remove:function(e,t){var i=this.group,n=this._data;e.get("animation")?n&&n.eachItemGraphicEl(function(t){CM(n,t.dataIndex,e,t)}):i.removeAll()}});function vM(t,e,i,n){var o=t.getItemLayout(e),a=i.get("symbolRepeat"),r=i.get("symbolClip"),s=i.get("symbolPosition")||"start",l=(i.get("symbolRotate")||0)*Math.PI/180||0,u=i.get("symbolPatternSize")||2,h=i.isAnimationEnabled(),c={dataIndex:e,layout:o,itemModel:i,symbolType:t.getItemVisual(e,"symbol")||"circle",color:t.getItemVisual(e,"color"),symbolClip:r,symbolRepeat:a,symbolRepeatDirection:i.get("symbolRepeatDirection"),symbolPatternSize:u,rotation:l,animationModel:h?i:null,hoverAnimation:h&&i.get("hoverAnimation"),z2:i.getShallow("z",!0)||0};!function(t,e,i,n,o){var a,r=n.valueDim,s=t.get("symbolBoundingData"),l=n.coordSys.getOtherAxis(n.coordSys.getBaseAxis()),u=l.toGlobalCoord(l.dataToCoord(0)),h=1-+(i[r.wh]<=0);if(k(s)){var c=[yM(l,s[0])-u,yM(l,s[1])-u];c[1]<c[0]&&c.reverse(),a=c[h]}else a=null!=s?yM(l,s)-u:e?n.coordSysExtent[r.index][h]-u:i[r.wh];o.boundingLength=a,e&&(o.repeatCutLength=i[r.wh]);o.pxSign=0<a?1:a<0?-1:0}(i,a,o,n,c),function(t,e,i,n,o,a,r,s,l,u){var h=l.valueDim,c=l.categoryDim,d=Math.abs(i[c.wh]),f=t.getItemVisual(e,"symbolSize");f=k(f)?f.slice():(null==f&&(f="100%"),[f,f]);f[c.index]=Pl(f[c.index],d),f[h.index]=Pl(f[h.index],n?d:Math.abs(a)),u.symbolSize=f,(u.symbolScale=[f[0]/s,f[1]/s])[h.index]*=(l.isHorizontal?-1:1)*r}(t,e,o,a,0,c.boundingLength,c.pxSign,u,n,c),function(t,e,i,n,o){var a=t.get(pM)||0;a&&(mM.attr({scale:e.slice(),rotation:i}),mM.updateTransform(),a/=mM.getLineScale(),a*=e[n.valueDim.index]);o.valueLineWidth=a}(i,c.symbolScale,l,n,c);var d=c.symbolSize,f=i.get("symbolOffset");return k(f)&&(f=[Pl(f[0],d[0]),Pl(f[1],d[1])]),function(t,e,i,n,o,a,r,s,l,u,h,c){var d=h.categoryDim,f=h.valueDim,p=c.pxSign,g=Math.max(e[f.index]+s,0),m=g;if(n){var v=Math.abs(l),y=W(t.get("symbolMargin"),"15%")+"",x=!1;y.lastIndexOf("!")===y.length-1&&(x=!0,y=y.slice(0,y.length-1)),y=Pl(y,e[f.index]);var _=Math.max(g+2*y,0),w=x?0:2*y,b=jl(n),S=b?n:OM((v+w)/_);_=g+2*(y=(v-S*g)/2/(x?S:S-1)),w=x?0:2*y,b||"fixed"===n||(S=u?OM((Math.abs(u)+w)/_):0),m=S*_-w,c.repeatTimes=S,c.symbolMargin=y}var M=p*(m/2),I=c.pathPosition=[];I[d.index]=i[d.wh]/2,I[f.index]="start"===r?M:"end"===r?l-M:l/2,a&&(I[0]+=a[0],I[1]+=a[1]);var T=c.bundlePosition=[];T[d.index]=i[d.xy],T[f.index]=i[f.xy];var A=c.barRectShape=L({},i);A[f.wh]=p*Math.max(Math.abs(i[f.wh]),Math.abs(I[f.index]+M)),A[d.wh]=i[d.wh];var D=c.clipShape={};D[d.xy]=-i[d.xy],D[d.wh]=h.ecSize[d.wh],D[f.xy]=0,D[f.wh]=i[f.wh]}(i,d,o,a,0,f,s,c.valueLineWidth,c.boundingLength,c.repeatCutLength,n,c),c}function yM(t,e){return t.toGlobalCoord(t.dataToCoord(t.scale.parse(e)))}function xM(t){var e=t.symbolPatternSize,i=mg(t.symbolType,-e/2,-e/2,e,e,t.color);return i.attr({culling:!0}),"image"!==i.type&&i.setStyle({strokeNoScale:!0}),i}function _M(t,e,o,i){var n=t.__pictorialBundle,a=o.symbolSize,r=o.valueLineWidth,s=o.pathPosition,l=e.valueDim,u=o.repeatTimes||0,h=0,c=a[e.valueDim.index]+r+2*o.symbolMargin;for(kM(t,function(t){t.__pictorialAnimationIndex=h,t.__pictorialRepeatTimes=u,h<u?PM(t,null,p(h),o,i):PM(t,null,{scale:[0,0]},o,i,function(){n.remove(t)}),AM(t,o),h++});h<u;h++){var d=xM(o);d.__pictorialAnimationIndex=h,d.__pictorialRepeatTimes=u,n.add(d);var f=p(h);PM(d,{position:f.position,scale:[0,0]},{scale:f.scale,rotation:f.rotation},o,i),d.on("mouseover",g).on("mouseout",m),AM(d,o)}function p(t){var e=s.slice(),i=o.pxSign,n=t;return("start"===o.symbolRepeatDirection?0<i:i<0)&&(n=u-1-t),e[l.index]=c*(n-u/2+.5)+s[l.index],{position:e,scale:o.symbolScale.slice(),rotation:o.rotation}}function g(){kM(t,function(t){t.trigger("emphasis")})}function m(){kM(t,function(t){t.trigger("normal")})}}function wM(t,e,i,n){var o=t.__pictorialBundle,a=t.__pictorialMainPath;a?PM(a,null,{position:i.pathPosition.slice(),scale:i.symbolScale.slice(),rotation:i.rotation},i,n):(a=t.__pictorialMainPath=xM(i),o.add(a),PM(a,{position:i.pathPosition.slice(),scale:[0,0],rotation:i.rotation},{scale:i.symbolScale.slice()},i,n),a.on("mouseover",function(){this.trigger("emphasis")}).on("mouseout",function(){this.trigger("normal")})),AM(a,i)}function bM(t,e,i){var n=L({},e.barRectShape),o=t.__pictorialBarRect;o?PM(o,null,{shape:n},e,i):(o=t.__pictorialBarRect=new is({z2:2,shape:n,silent:!0,style:{stroke:"transparent",fill:"transparent",lineWidth:0}}),t.add(o))}function SM(t,e,i,n){if(i.symbolClip){var o=t.__pictorialClipPath,a=L({},i.clipShape),r=e.valueDim,s=i.animationModel,l=i.dataIndex;if(o)sl(o,{shape:a},s,l);else{a[r.wh]=0,o=new is({shape:a}),t.__pictorialBundle.setClipPath(o),t.__pictorialClipPath=o;var u={};u[r.wh]=i.clipShape[r.wh],yl[n?"updateProps":"initProps"](o,{shape:u},s,l)}}}function MM(t,e){var i=t.getItemModel(e);return i.getAnimationDelayParams=IM,i.isAnimationEnabled=TM,i}function IM(t){return{index:t.__pictorialAnimationIndex,count:t.__pictorialRepeatTimes}}function TM(){return this.parentModel.isAnimationEnabled()&&!!this.getShallow("animation")}function AM(t,e){t.off("emphasis").off("normal");var i=e.symbolScale.slice();e.hoverAnimation&&t.on("emphasis",function(){this.animateTo({scale:[1.1*i[0],1.1*i[1]]},400,"elasticOut")}).on("normal",function(){this.animateTo({scale:i.slice()},400,"elasticOut")})}function DM(t,e,i,n){var o=new Ii,a=new Ii;return o.add(a),(o.__pictorialBundle=a).attr("position",i.bundlePosition.slice()),i.symbolRepeat?_M(o,e,i):wM(o,0,i),bM(o,i,n),SM(o,e,i,n),o.__pictorialShapeStr=LM(t,i),o.__pictorialSymbolMeta=i,o}function CM(t,e,i,n){var o=n.__pictorialBarRect;o&&(o.style.text=null);var a=[];kM(n,function(t){a.push(t)}),n.__pictorialMainPath&&a.push(n.__pictorialMainPath),n.__pictorialClipPath&&(i=null),E(a,function(t){sl(t,{scale:[0,0]},i,e,function(){n.parent&&n.parent.remove(n)})}),t.setItemGraphicEl(e,null)}function LM(t,e){return[t.getItemVisual(e.dataIndex,"symbol")||"none",!!e.symbolRepeat,!!e.symbolClip].join(":")}function kM(e,i,n){E(e.__pictorialBundle.children(),function(t){t!==e.__pictorialBarRect&&i.call(n,t)})}function PM(t,e,i,n,o,a){e&&t.attr(e),n.symbolClip&&!o?i&&t.attr(i):i&&yl[o?"updateProps":"initProps"](t,i,n.animationModel,n.dataIndex,a)}function NM(t,e,i){var n=i.color,o=i.dataIndex,a=i.itemModel,r=a.getModel("itemStyle").getItemStyle(["color"]),s=a.getModel("emphasis.itemStyle").getItemStyle(),l=a.getShallow("cursor");kM(t,function(t){t.setColor(n),t.setStyle(C({fill:n,opacity:i.opacity},r)),Ys(t,s),l&&(t.cursor=l),t.z2=i.z2});var u={},h=(e.valueDim.posDesc[+(0<i.boundingLength)],t.__pictorialBarRect);xv(h.style,u,a,n,e.seriesModel,o),Ys(h,u)}function OM(t){var e=Math.round(t);return Math.abs(t-e)<1e-4?e:Math.ceil(t)}vf(T(Pp,"pictorialBar")),yf(Mm("pictorialBar","roundRect"));function EM(t,e,i,n,o){Eg.call(this,t,e,i),this.type=n||"value",this.position=o||"bottom",this.orient=null}function zM(t,e,i){this.dimension="single",this.dimensions=["single"],this._axis=null,this._rect,this._init(t,e,i),this.model=t}function RM(t,e){e=e||{};var i=t.coordinateSystem,n=t.axis,o={},a=n.position,r=n.orient,s=i.getRect(),l=[s.x,s.x+s.width,s.y,s.y+s.height],u={horizontal:{top:l[2],bottom:l[3]},vertical:{left:l[0],right:l[1]}};o.position=["vertical"===r?u.vertical[a]:l[0],"horizontal"===r?u.horizontal[a]:l[3]];o.rotation=Math.PI/2*{horizontal:0,vertical:1}[r];o.labelDirection=o.tickDirection=o.nameDirection={top:-1,bottom:1,right:1,left:-1}[a],t.get("axisTick.inside")&&(o.tickDirection=-o.tickDirection),W(e.labelInside,t.get("axisLabel.inside"))&&(o.labelDirection=-o.labelDirection);var h=e.rotate;return null==h&&(h=t.get("axisLabel.rotate")),o.labelRotation="top"===a?-h:h,o.z2=1,o}EM.prototype={constructor:EM,model:null,isHorizontal:function(){var t=this.position;return"top"===t||"bottom"===t},pointToData:function(t,e){return this.coordinateSystem.pointToData(t,e)[0]},toGlobalCoord:null,toLocalCoord:null},w(EM,Eg),nh.register("single",{create:function(n,o){var a=[];return n.eachComponent("singleAxis",function(t,e){var i=new zM(t,n,o);i.name="single_"+e,i.resize(t,o),t.coordinateSystem=i,a.push(i)}),n.eachSeries(function(t){if("singleAxis"===t.get("coordinateSystem")){var e=n.queryComponents({mainType:"singleAxis",index:t.get("singleAxisIndex"),id:t.get("singleAxisId")})[0];t.coordinateSystem=e&&e.coordinateSystem}}),a},dimensions:(zM.prototype={type:"singleAxis",axisPointerEnabled:!0,constructor:zM,_init:function(t,e,i){var n=this.dimension,o=new EM(n,ig(t),[0,0],t.get("type"),t.get("position")),a="category"===o.type;o.onBand=a&&t.get("boundaryGap"),o.inverse=t.get("inverse"),o.orient=t.get("orient"),(t.axis=o).model=t,(o.coordinateSystem=this)._axis=o},update:function(t,e){t.eachSeries(function(t){if(t.coordinateSystem===this){var e=t.getData();E(e.mapDimension(this.dimension,!0),function(t){this._axis.scale.unionExtentFromData(e,t)},this),eg(this._axis.scale,this._axis.model)}},this)},resize:function(t,e){this._rect=vu({left:t.get("left"),top:t.get("top"),right:t.get("right"),bottom:t.get("bottom"),width:t.get("width"),height:t.get("height")},{width:e.getWidth(),height:e.getHeight()}),this._adjustAxis()},getRect:function(){return this._rect},_adjustAxis:function(){var t=this._rect,e=this._axis,i=e.isHorizontal(),n=i?[0,t.width]:[0,t.height],o=e.reverse?1:0;e.setExtent(n[o],n[1-o]),this._updateAxisTransform(e,i?t.x:t.y)},_updateAxisTransform:function(t,e){var i=t.getExtent(),n=i[0]+i[1],o=t.isHorizontal();t.toGlobalCoord=o?function(t){return t+e}:function(t){return n-t+e},t.toLocalCoord=o?function(t){return t-e}:function(t){return n-t+e}},getAxis:function(){return this._axis},getBaseAxis:function(){return this._axis},getAxes:function(){return[this._axis]},getTooltipAxes:function(){return{baseAxes:[this.getAxis()]}},containPoint:function(t){var e=this.getRect(),i=this.getAxis();return"horizontal"===i.orient?i.contain(i.toLocalCoord(t[0]))&&t[1]>=e.y&&t[1]<=e.y+e.height:i.contain(i.toLocalCoord(t[1]))&&t[0]>=e.y&&t[0]<=e.y+e.height},pointToData:function(t){var e=this.getAxis();return[e.coordToData(e.toLocalCoord(t["horizontal"===e.orient?0:1]))]},dataToPoint:function(t){var e=this.getAxis(),i=this.getRect(),n=[],o="horizontal"===e.orient?0:1;return t instanceof Array&&(t=t[0]),n[o]=e.toGlobalCoord(e.dataToCoord(+t)),n[1-o]=0==o?i.y+i.height/2:i.x+i.width/2,n}}).dimensions});var BM=["axisLine","axisTickLabel","axisName"],VM="splitLine",GM=hv.extend({type:"singleAxis",axisPointerClass:"SingleAxisPointer",render:function(t,e,i,n){var o=this.group;o.removeAll();var a=RM(t),r=new Ym(t,a);E(BM,r.add,r),o.add(r.getGroup()),t.get(VM+".show")&&this["_"+VM](t),GM.superCall(this,"render",t,e,i,n)},_splitLine:function(t){var e=t.axis;if(!e.scale.isBlank()){var i=t.getModel("splitLine"),n=i.getModel("lineStyle"),o=n.get("width"),a=n.get("color");a=a instanceof Array?a:[a];for(var r=t.coordinateSystem.getRect(),s=e.isHorizontal(),l=[],u=0,h=e.getTicksCoords({tickModel:i}),c=[],d=[],f=0;f<h.length;++f){var p=e.toGlobalCoord(h[f].coord);s?(c[0]=p,c[1]=r.y,d[0]=p,d[1]=r.y+r.height):(c[0]=r.x,c[1]=p,d[0]=r.x+r.width,d[1]=p);var g=u++%a.length;l[g]=l[g]||[],l[g].push(new os({subPixelOptimize:!0,shape:{x1:c[0],y1:c[1],x2:d[0],y2:d[1]},style:{lineWidth:o},silent:!0}))}for(f=0;f<l.length;++f)this.group.add(ks(l[f],{style:{stroke:a[f%a.length],lineDash:n.getLineDash(o),lineWidth:o},silent:!0}))}}}),FM=Tu.extend({type:"singleAxis",layoutMode:"box",axis:null,coordinateSystem:null,getCoordSysModel:function(){return this}});m(FM.prototype,sg),Om("single",FM,function(t,e){return e.type||(e.data?"category":"value")},{left:"5%",top:"5%",right:"5%",bottom:"5%",type:"value",position:"bottom",orient:"horizontal",axisLine:{show:!0,lineStyle:{width:1,type:"solid"}},tooltip:{show:!0},axisTick:{show:!0,length:6,lineStyle:{width:1}},axisLabel:{show:!0,interval:"auto"},splitLine:{show:!0,lineStyle:{type:"dashed",opacity:.2}}});function WM(t,e){var i,n=[],o=t.seriesIndex;if(null==o||!(i=e.getSeriesByIndex(o)))return{point:[]};var a=i.getData(),r=Ho(a,t);if(null==r||r<0||k(r))return{point:[]};var s=a.getItemGraphicEl(r),l=i.coordinateSystem;if(i.getTooltipPosition)n=i.getTooltipPosition(r)||[];else if(l&&l.dataToPoint)n=l.dataToPoint(a.getValues(N(l.dimensions,function(t){return a.mapDimension(t)}),r,!0))||[];else if(s){var u=s.getBoundingRect().clone();u.applyTransform(s.transform),n=[u.x+u.width/2,u.y+u.height/2]}return{point:n,el:s}}var HM=E,ZM=T,UM=Zo();function XM(t,e,i,n,o){var a=t.axis;if(!a.scale.isBlank()&&a.containData(e))if(t.involveSeries){var r=function(l,t){var u=t.axis,h=u.dim,c=l,d=[],f=Number.MAX_VALUE,p=-1;return HM(t.seriesModels,function(e,t){var i,n,o=e.getData().mapDimension(h,!0);if(e.getAxisTooltipData){var a=e.getAxisTooltipData(o,l,u);n=a.dataIndices,i=a.nestestValue}else{if(!(n=e.getData().indicesOfNearest(o[0],l,"category"===u.type?.5:null)).length)return;i=e.getData().get(o[0],n[0])}if(null!=i&&isFinite(i)){var r=l-i,s=Math.abs(r);s<=f&&((s<f||0<=r&&p<0)&&(f=s,p=r,c=i,d.length=0),HM(n,function(t){d.push({seriesIndex:e.seriesIndex,dataIndexInside:t,dataIndex:e.getData().getRawIndex(t)})}))}}),{payloadBatch:d,snapToValue:c}}(e,t),s=r.payloadBatch,l=r.snapToValue;s[0]&&null==o.seriesIndex&&L(o,s[0]),!n&&t.snap&&a.containData(l)&&null!=l&&(e=l),i.showPointer(t,e,s,o),i.showTooltip(t,r,l)}else i.showPointer(t,e)}function YM(t,e,i,n){t[e.key]={value:i,payloadBatch:n}}function jM(t,e,i,n){var o=i.payloadBatch,a=e.axis,r=a.model,s=e.axisPointerModel;if(e.triggerTooltip&&o.length){var l=e.coordSys.model,u=uv(l),h=t.map[u];h||(h=t.map[u]={coordSysId:l.id,coordSysIndex:l.componentIndex,coordSysType:l.type,coordSysMainType:l.mainType,dataByAxis:[]},t.list.push(h)),h.dataByAxis.push({axisDim:a.dim,axisIndex:r.componentIndex,axisType:r.type,axisId:r.id,value:n,valueLabelOpt:{precision:s.get("label.precision"),formatter:s.get("label.formatter")},seriesDataIndices:o.slice()})}}function qM(t){var e=t.axis.model,i={},n=i.axisDim=t.axis.dim;return i.axisIndex=i[n+"AxisIndex"]=e.componentIndex,i.axisName=i[n+"AxisName"]=e.name,i.axisId=i[n+"AxisId"]=e.id,i}function KM(t){return!t||null==t[0]||isNaN(t[0])||null==t[1]||isNaN(t[1])}wf({type:"axisPointer",coordSysAxesInfo:null,defaultOption:{show:"auto",triggerOn:null,zlevel:0,z:50,type:"line",snap:!1,triggerTooltip:!0,value:null,status:null,link:[],animation:null,animationDurationUpdate:200,lineStyle:{color:"#aaa",width:1,type:"solid"},shadowStyle:{color:"rgba(150,150,150,0.3)"},label:{show:!0,formatter:null,precision:"auto",margin:3,color:"#fff",padding:[5,7,5,7],backgroundColor:"auto",borderColor:null,borderWidth:0,shadowBlur:3,shadowColor:"#aaa"},handle:{show:!1,icon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",size:45,margin:50,color:"#333",shadowBlur:3,shadowColor:"#aaa",shadowOffsetX:0,shadowOffsetY:2,throttle:40}}});var $M=Zo(),JM=E;function QM(t,e,i){if(!v.node){var n=e.getZr();$M(n).records||($M(n).records={}),function(o,a){if($M(o).initialized)return;function t(t,n){o.on(t,function(e){var i=function(i){var n={showTip:[],hideTip:[]},o=function(t){var e=n[t.type];e?e.push(t):(t.dispatchAction=o,i.dispatchAction(t))};return{dispatchAction:o,pendings:n}}(a);JM($M(o).records,function(t){t&&n(t,e,i.dispatchAction)}),function(t,e){var i,n=t.showTip.length,o=t.hideTip.length;n?i=t.showTip[n-1]:o&&(i=t.hideTip[o-1]);i&&(i.dispatchAction=null,e.dispatchAction(i))}(i.pendings,a)})}$M(o).initialized=!0,t("click",T(eI,"click")),t("mousemove",T(eI,"mousemove")),t("globalout",tI)}(n,e),($M(n).records[t]||($M(n).records[t]={})).handler=i}}function tI(t,e,i){t.handler("leave",null,i)}function eI(t,e,i,n){e.handler(t,i,n)}function iI(t,e){if(!v.node){var i=e.getZr();($M(i).records||{})[t]&&($M(i).records[t]=null)}}var nI=bf({type:"axisPointer",render:function(t,e,i){var n=e.getComponent("tooltip"),o=t.get("triggerOn")||n&&n.get("triggerOn")||"mousemove|click";QM("axisPointer",i,function(t,e,i){"none"!==o&&("leave"===t||0<=o.indexOf(t))&&i({type:"updateAxisPointer",currTrigger:t,x:e&&e.offsetX,y:e&&e.offsetY})})},remove:function(t,e){iI(e.getZr(),"axisPointer"),nI.superApply(this._model,"remove",arguments)},dispose:function(t,e){iI("axisPointer",e),nI.superApply(this._model,"dispose",arguments)}}),oI=Zo(),aI=D,rI=A;function sI(){}function lI(t,e,i,n){!function i(n,t){{if(R(n)&&R(t)){var o=!0;return E(t,function(t,e){o=o&&i(n[e],t)}),!!o}return n===t}}(oI(i).lastProp,n)&&(oI(i).lastProp=n,e?sl(i,n,t):(i.stopAnimation(),i.attr(n)))}function uI(t,e){t[e.get("label.show")?"show":"hide"]()}function hI(t){return{position:t.position.slice(),rotation:t.rotation||0}}function cI(t,e,i){var n=e.get("z"),o=e.get("zlevel");t&&t.traverse(function(t){"group"!==t.type&&(null!=n&&(t.z=n),null!=o&&(t.zlevel=o),t.silent=i)})}function dI(t){var e,i=t.get("type"),n=t.getModel(i+"Style");return"line"===i?(e=n.getLineStyle()).fill=null:"shadow"===i&&((e=n.getAreaStyle()).stroke=null),e}function fI(t,e,i,n,o){var a=pI(i.get("value"),e.axis,e.ecModel,i.get("seriesDataIndices"),{precision:i.get("label.precision"),formatter:i.get("label.formatter")}),r=i.getModel("label"),s=Jl(r.get("padding")||0),l=r.getFont(),u=cn(a,l),h=o.position,c=u.width+s[1]+s[3],d=u.height+s[0]+s[2],f=o.align;"right"===f&&(h[0]-=c),"center"===f&&(h[0]-=c/2);var p=o.verticalAlign;"bottom"===p&&(h[1]-=d),"middle"===p&&(h[1]-=d/2),function(t,e,i,n){var o=n.getWidth(),a=n.getHeight();t[0]=Math.min(t[0]+e,o)-e,t[1]=Math.min(t[1]+i,a)-i,t[0]=Math.max(t[0],0),t[1]=Math.max(t[1],0)}(h,c,d,n);var g=r.get("backgroundColor");g&&"auto"!==g||(g=e.get("axisLine.lineStyle.color")),t.label={shape:{x:0,y:0,width:c,height:d,r:r.get("borderRadius")},position:h.slice(),style:{text:a,textFont:l,textFill:r.getTextColor(),textPosition:"inside",textPadding:s,fill:g,stroke:r.get("borderColor")||"transparent",lineWidth:r.get("borderWidth")||0,shadowBlur:r.get("shadowBlur"),shadowColor:r.get("shadowColor"),shadowOffsetX:r.get("shadowOffsetX"),shadowOffsetY:r.get("shadowOffsetY")},z2:10}}function pI(t,e,o,i,n){t=e.scale.parse(t);var a=e.scale.getLabel(t,{precision:n.precision}),r=n.formatter;if(r){var s={value:og(e,t),axisDimension:e.dim,axisIndex:e.index,seriesData:[]};E(i,function(t){var e=o.getSeriesByIndex(t.seriesIndex),i=t.dataIndexInside,n=e&&e.getDataParams(i);n&&s.seriesData.push(n)}),z(r)?a=r.replace("{value}",a):O(r)&&(a=r(s))}return a}function gI(t,e,i){var n=ee();return re(n,n,i.rotation),ae(n,n,i.position),hl([t.dataToCoord(e),(i.labelOffset||0)+(i.labelDirection||1)*(i.labelMargin||0)],n)}function mI(t,e,i,n,o,a){var r=Ym.innerTextLayout(i.rotation,0,i.labelDirection);i.labelMargin=o.get("label.margin"),fI(e,n,o,a,{position:gI(n.axis,t,i),align:r.textAlign,verticalAlign:r.textVerticalAlign})}function vI(t,e,i){return{x1:t[i=i||0],y1:t[1-i],x2:e[i],y2:e[1-i]}}function yI(t,e,i){return{x:t[i=i||0],y:t[1-i],width:e[i],height:e[1-i]}}function xI(t,e,i,n,o,a){return{cx:t,cy:e,r0:i,r:n,startAngle:o,endAngle:a,clockwise:!0}}ta((sI.prototype={_group:null,_lastGraphicKey:null,_handle:null,_dragging:!1,_lastValue:null,_lastStatus:null,_payloadInfo:null,animationThreshold:15,render:function(t,e,i,n){var o=e.get("value"),a=e.get("status");if(this._axisModel=t,this._axisPointerModel=e,this._api=i,n||this._lastValue!==o||this._lastStatus!==a){this._lastValue=o,this._lastStatus=a;var r=this._group,s=this._handle;if(!a||"hide"===a)return r&&r.hide(),void(s&&s.hide());r&&r.show(),s&&s.show();var l={};this.makeElOption(l,o,t,e,i);var u=l.graphicKey;u!==this._lastGraphicKey&&this.clear(i),this._lastGraphicKey=u;var h=this._moveAnimation=this.determineAnimation(t,e);if(r){var c=T(lI,e,h);this.updatePointerEl(r,l,c,e),this.updateLabelEl(r,l,c,e)}else r=this._group=new Ii,this.createPointerEl(r,l,t,e),this.createLabelEl(r,l,t,e),i.getZr().add(r);cI(r,e,!0),this._renderHandle(o)}},remove:function(t){this.clear(t)},dispose:function(t){this.clear(t)},determineAnimation:function(t,e){var i=e.get("animation"),n=t.axis,o="category"===n.type,a=e.get("snap");if(!a&&!o)return!1;if("auto"!==i&&null!=i)return!0===i;var r=this.animationThreshold;if(o&&n.getBandWidth()>r)return!0;if(a){var s=sv(t).seriesDataCount,l=n.getExtent();return Math.abs(l[0]-l[1])/s>r}return!1},makeElOption:function(t,e,i,n,o){},createPointerEl:function(t,e,i,n){var o=e.pointer;if(o){var a=oI(t).pointerEl=new yl[o.type](aI(e.pointer));t.add(a)}},createLabelEl:function(t,e,i,n){if(e.label){var o=oI(t).labelEl=new is(aI(e.label));t.add(o),uI(o,n)}},updatePointerEl:function(t,e,i){var n=oI(t).pointerEl;n&&e.pointer&&(n.setStyle(e.pointer.style),i(n,{shape:e.pointer.shape}))},updateLabelEl:function(t,e,i,n){var o=oI(t).labelEl;o&&(o.setStyle(e.label.style),i(o,{shape:e.label.shape,position:e.label.position}),uI(o,n))},_renderHandle:function(t){if(!this._dragging&&this.updateHandleTransform){var e,i=this._axisPointerModel,n=this._api.getZr(),o=this._handle,a=i.getModel("handle"),r=i.get("status");if(!a.get("show")||!r||"hide"===r)return o&&n.remove(o),void(this._handle=null);this._handle||(e=!0,o=this._handle=pl(a.get("icon"),{cursor:"move",draggable:!0,onmousemove:function(t){Wt(t.event)},onmousedown:rI(this._onHandleDragMove,this,0,0),drift:rI(this._onHandleDragMove,this),ondragend:rI(this._onHandleDragEnd,this)}),n.add(o)),cI(o,i,!1);o.setStyle(a.getItemStyle(null,["color","borderColor","borderWidth","opacity","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"]));var s=a.get("size");k(s)||(s=[s,s]),o.attr("scale",[s[0]/2,s[1]/2]),Tc(this,"_doDispatchAxisPointer",a.get("throttle")||0,"fixRate"),this._moveHandleToValue(t,e)}},_moveHandleToValue:function(t,e){lI(this._axisPointerModel,!e&&this._moveAnimation,this._handle,hI(this.getHandleTransform(t,this._axisModel,this._axisPointerModel)))},_onHandleDragMove:function(t,e){var i=this._handle;if(i){this._dragging=!0;var n=this.updateHandleTransform(hI(i),[t,e],this._axisModel,this._axisPointerModel);this._payloadInfo=n,i.stopAnimation(),i.attr(hI(n)),oI(i).lastProp=null,this._doDispatchAxisPointer()}},_doDispatchAxisPointer:function(){if(this._handle){var t=this._payloadInfo,e=this._axisModel;this._api.dispatchAction({type:"updateAxisPointer",x:t.cursorPoint[0],y:t.cursorPoint[1],tooltipOption:t.tooltipOption,axesInfo:[{axisDim:e.axis.dim,axisIndex:e.componentIndex}]})}},_onHandleDragEnd:function(t){if(this._dragging=!1,this._handle){var e=this._axisPointerModel.get("value");this._moveHandleToValue(e),this._api.dispatchAction({type:"hideTip"})}},getHandleTransform:null,updateHandleTransform:null,clear:function(t){this._lastValue=null,this._lastStatus=null;var e=t.getZr(),i=this._group,n=this._handle;e&&i&&(this._lastGraphicKey=null,i&&e.remove(i),n&&e.remove(n),this._group=null,this._handle=null,this._payloadInfo=null)},doClear:function(){},buildLabel:function(t,e,i){return{x:t[i=i||0],y:t[1-i],width:e[i],height:e[1-i]}}}).constructor=sI);var _I=sI.extend({makeElOption:function(t,e,i,n,o){var a=i.axis,r=a.grid,s=n.get("type"),l=wI(r,a).getOtherAxis(a).getGlobalExtent(),u=a.toGlobalCoord(a.dataToCoord(e,!0));if(s&&"none"!==s){var h=dI(n),c=bI[s](a,u,l);c.style=h,t.graphicKey=c.type,t.pointer=c}mI(e,t,pv(r.model,i),i,n,o)},getHandleTransform:function(t,e,i){var n=pv(e.axis.grid.model,e,{labelInside:!1});return n.labelMargin=i.get("handle.margin"),{position:gI(e.axis,t,n),rotation:n.rotation+(n.labelDirection<0?Math.PI:0)}},updateHandleTransform:function(t,e,i,n){var o=i.axis,a=o.grid,r=o.getGlobalExtent(!0),s=wI(a,o).getOtherAxis(o).getGlobalExtent(),l="x"===o.dim?0:1,u=t.position;u[l]+=e[l],u[l]=Math.min(r[1],u[l]),u[l]=Math.max(r[0],u[l]);var h=(s[1]+s[0])/2,c=[h,h];c[l]=u[l];return{position:u,rotation:t.rotation,cursorPoint:c,tooltipOption:[{verticalAlign:"middle"},{align:"center"}][l]}}});function wI(t,e){var i={};return i[e.dim+"AxisIndex"]=e.index,t.getCartesian(i)}var bI={line:function(t,e,i){return{type:"Line",subPixelOptimize:!0,shape:vI([e,i[0]],[e,i[1]],SI(t))}},shadow:function(t,e,i){var n=Math.max(1,t.getBandWidth()),o=i[1]-i[0];return{type:"Rect",shape:yI([e-n/2,i[0]],[n,o],SI(t))}}};function SI(t){return"x"===t.dim?0:1}hv.registerAxisPointerClass("CartesianAxisPointer",_I),ff(function(t){if(t){t.axisPointer&&0!==t.axisPointer.length||(t.axisPointer={});var e=t.axisPointer.link;e&&!k(e)&&(t.axisPointer.link=[e])}}),pf(Id.PROCESSOR.STATISTIC,function(t,e){t.getComponent("axisPointer").coordSysAxesInfo=av(t,e)}),gf({type:"updateAxisPointer",event:"updateAxisPointer",update:":updateAxisPointer"},function(t,e,i){var n=t.currTrigger,r=[t.x,t.y],o=t,a=t.dispatchAction||A(i.dispatchAction,i),s=e.getComponent("axisPointer").coordSysAxesInfo;if(s){KM(r)&&(r=WM({seriesIndex:o.seriesIndex,dataIndex:o.dataIndex},e).point);var l=KM(r),u=o.axesInfo,h=s.axesInfo,c="leave"===n||KM(r),d={},f={},p={list:[],map:{}},g={showPointer:ZM(YM,f),showTooltip:ZM(jM,p)};HM(s.coordSysMap,function(t,e){var a=l||t.containPoint(r);HM(s.coordSysAxesInfo[e],function(t,e){var i=t.axis,n=function(t,e){for(var i=0;i<(t||[]).length;i++){var n=t[i];if(e.axis.dim===n.axisDim&&e.axis.model.componentIndex===n.axisIndex)return n}}(u,t);if(!c&&a&&(!u||n)){var o=n&&n.value;null!=o||l||(o=i.pointToData(r)),null!=o&&XM(t,o,g,!1,d)}})});var m={};return HM(h,function(o,t){var a=o.linkGroup;a&&!f[t]&&HM(a.axesInfo,function(t,e){var i=f[e];if(t!==o&&i){var n=i.value;a.mapper&&(n=o.axis.scale.parse(a.mapper(n,qM(t),qM(o)))),m[o.key]=n}})}),HM(m,function(t,e){XM(h[e],t,g,!0,d)}),function(o,t,e){var a=e.axesInfo=[];HM(t,function(t,e){var i=t.axisPointerModel.option,n=o[e];n?(t.useHandle||(i.status="show"),i.value=n.value,i.seriesDataIndices=(n.payloadBatch||[]).slice()):t.useHandle||(i.status="hide"),"show"===i.status&&a.push({axisDim:t.axis.dim,axisIndex:t.axis.model.componentIndex,value:i.value})})}(f,h,d),function(t,e,i,n){if(KM(e)||!t.list.length)return n({type:"hideTip"});var o=((t.list[0].dataByAxis[0]||{}).seriesDataIndices||[])[0]||{};n({type:"showTip",escapeConnect:!0,x:e[0],y:e[1],tooltipOption:i.tooltipOption,position:i.position,dataIndexInside:o.dataIndexInside,dataIndex:o.dataIndex,seriesIndex:o.seriesIndex,dataByCoordSys:t.list})}(p,r,t,a),function(t,e,i){var n=i.getZr(),o="axisPointerLastHighlights",a=UM(n)[o]||{},r=UM(n)[o]={};HM(t,function(t,e){var i=t.axisPointerModel.option;"show"===i.status&&HM(i.seriesDataIndices,function(t){var e=t.seriesIndex+" | "+t.dataIndex;r[e]=t})});var s=[],l=[];E(a,function(t,e){r[e]||l.push(t)}),E(r,function(t,e){a[e]||s.push(t)}),l.length&&i.dispatchAction({type:"downplay",escapeConnect:!0,batch:l}),s.length&&i.dispatchAction({type:"highlight",escapeConnect:!0,batch:s})}(h,0,i),d}});var MI=["x","y"],II=["width","height"],TI=sI.extend({makeElOption:function(t,e,i,n,o){var a=i.axis,r=a.coordinateSystem,s=CI(r,1-DI(a)),l=r.dataToPoint(e)[0],u=n.get("type");if(u&&"none"!==u){var h=dI(n),c=AI[u](a,l,s);c.style=h,t.graphicKey=c.type,t.pointer=c}mI(e,t,RM(i),i,n,o)},getHandleTransform:function(t,e,i){var n=RM(e,{labelInside:!1});return n.labelMargin=i.get("handle.margin"),{position:gI(e.axis,t,n),rotation:n.rotation+(n.labelDirection<0?Math.PI:0)}},updateHandleTransform:function(t,e,i,n){var o=i.axis,a=o.coordinateSystem,r=DI(o),s=CI(a,r),l=t.position;l[r]+=e[r],l[r]=Math.min(s[1],l[r]),l[r]=Math.max(s[0],l[r]);var u=CI(a,1-r),h=(u[1]+u[0])/2,c=[h,h];return c[r]=l[r],{position:l,rotation:t.rotation,cursorPoint:c,tooltipOption:{verticalAlign:"middle"}}}}),AI={line:function(t,e,i){return{type:"Line",subPixelOptimize:!0,shape:vI([e,i[0]],[e,i[1]],DI(t))}},shadow:function(t,e,i){var n=t.getBandWidth(),o=i[1]-i[0];return{type:"Rect",shape:yI([e-n/2,i[0]],[n,o],DI(t))}}};function DI(t){return t.isHorizontal()?0:1}function CI(t,e){var i=t.getRect();return[i[MI[e]],i[MI[e]]+i[II[e]]]}hv.registerAxisPointerClass("SingleAxisPointer",TI),bf({type:"single"});var LI=ic.extend({type:"series.themeRiver",dependencies:["singleAxis"],nameMap:null,init:function(t){LI.superApply(this,"init",arguments),this.legendVisualProvider=new Gv(A(this.getData,this),A(this.getRawData,this))},fixData:function(t){var e=t.length,i=Ko(t,function(t){return t[2]}),n=[];i.buckets.each(function(t,e){n.push({name:e,dataList:t})});for(var o=n.length,a=-1,r=-1,s=0;s<o;++s){var l=n[s].dataList.length;a<l&&(a=l,r=s)}for(var u=0;u<o;++u)if(u!==r)for(var h=n[u].name,c=0;c<a;++c){for(var d=n[r].dataList[c][0],f=n[u].dataList.length,p=-1,g=0;g<f;++g){if(n[u].dataList[g][0]===d){p=g;break}}-1===p&&(t[e]=[],t[e][0]=d,t[e][1]=0,t[e][2]=h,e++)}return t},getInitialData:function(t,e){for(var i=e.queryComponents({mainType:"singleAxis",index:this.get("singleAxisIndex"),id:this.get("singleAxisId")})[0].get("type"),n=M(t.data,function(t){return void 0!==t[2]}),o=this.fixData(n||[]),a=[],r=this.nameMap=Q(),s=0,l=0;l<o.length;++l)a.push(o[l][2]),r.get(o[l][2])||(r.set(o[l][2],s),s++);var u=np(o,{coordDimensions:["single"],dimensionsDefine:[{name:"time",type:Lf(i)},{name:"value",type:"float"},{name:"name",type:"ordinal"}],encodeDefine:{single:0,value:1,itemName:2}}),h=new Wf(u,this);return h.initData(o),h},getLayerSeries:function(){for(var i=this.getData(),t=i.count(),e=[],n=0;n<t;++n)e[n]=n;var o=i.mapDimension("single"),a=Ko(e,function(t){return i.get("name",t)}),r=[];return a.buckets.each(function(t,e){t.sort(function(t,e){return i.get(o,t)-i.get(o,e)}),r.push({name:e,indices:t})}),r},getAxisTooltipData:function(t,e,i){k(t)||(t=t?[t]:[]);for(var n,o=this.getData(),a=this.getLayerSeries(),r=[],s=a.length,l=0;l<s;++l){for(var u=Number.MAX_VALUE,h=-1,c=a[l].indices.length,d=0;d<c;++d){var f=o.get(t[0],a[l].indices[d]),p=Math.abs(f-e);p<=u&&(n=f,u=p,h=a[l].indices[d])}r.push(h)}return{dataIndices:r,nestestValue:n}},formatTooltip:function(t){var e=this.getData(),i=e.getName(t),n=e.get(e.mapDimension("value"),t);return!isNaN(n)&&null!=n||(n="-"),eu(i+" : "+n)},defaultOption:{zlevel:0,z:2,coordinateSystem:"singleAxis",boundaryGap:["10%","10%"],singleAxisIndex:0,animationEasing:"linear",label:{margin:4,show:!0,position:"left",color:"#000",fontSize:11},emphasis:{label:{show:!0}}}});Mf({type:"themeRiver",init:function(){this._layers=[]},render:function(b,t,e){var S=b.getData(),M=this.group,I=b.getLayerSeries(),i=S.getLayout("layoutInfo"),n=i.rect,o=i.boundaryGap;function a(t){return t.name}M.attr("position",[0,n.y+o[0]]);var r=new Tf(this._layersSeries||[],I,a,a),T={};function s(t,e,i){var n=this._layers;if("remove"!==t){for(var o,a,r,s=[],l=[],u=I[e].indices,h=0;h<u.length;h++){var c=S.getItemLayout(u[h]),d=c.x,f=c.y0,p=c.y;s.push([d,f]),l.push([d,f+p]),o=S.getItemVisual(u[h],"color")}var g=S.getItemLayout(u[0]),m=S.getItemModel(u[h-1]),v=m.getModel("label"),y=v.get("margin");if("add"===t){var x=T[e]=new Ii;a=new gm({shape:{points:s,stackedOnPoints:l,smooth:.4,stackedOnSmooth:.4,smoothConstraint:!1},z2:0}),r=new Fr({style:{x:g.x-y,y:g.y0+g.y/2}}),x.add(a),x.add(r),M.add(x),a.setClipPath(function(t,e,i){var n=new is({shape:{x:t.x-10,y:t.y-10,width:0,height:t.height+20}});return ll(n,{shape:{width:t.width+20,height:t.height+20}},e,i),n}(a.getBoundingRect(),b,function(){a.removeClipPath()}))}else{x=n[i];a=x.childAt(0),r=x.childAt(1),M.add(x),T[e]=x,sl(a,{shape:{points:s,stackedOnPoints:l}},b),sl(r,{style:{x:g.x-y,y:g.y0+g.y/2}},b)}var _=m.getModel("emphasis.itemStyle"),w=m.getModel("itemStyle");Qs(r.style,v,{text:v.get("show")?b.getFormattedLabel(u[h-1],"normal")||S.getName(u[h-1]):null,textVerticalAlign:"middle"}),a.setStyle(L({fill:o},w.getItemStyle(["color"]))),Ys(a,_.getItemStyle())}else M.remove(n[e])}r.add(A(s,this,"add")).update(A(s,this,"update")).remove(A(s,this,"remove")).execute(),this._layersSeries=I,this._layers=T},dispose:function(){}});function kI(i,t,e){if(i.count())for(var n,o=t.coordinateSystem,a=t.getLayerSeries(),r=i.mapDimension("single"),s=i.mapDimension("value"),l=N(a,function(t){return N(t.indices,function(t){var e=o.dataToPoint(i.get(r,t));return e[1]=i.get(s,t),e})}),u=function(t){for(var e=t.length,i=t[0].length,n=[],o=[],a=0,r={},s=0;s<i;++s){for(var l=0,u=0;l<e;++l)u+=t[l][s][1];a<u&&(a=u),n.push(u)}for(var h=0;h<i;++h)o[h]=(a-n[h])/2;for(var c=a=0;c<i;++c){var d=n[c]+o[c];a<d&&(a=d)}return r.y0=o,r.max=a,r}(l),h=u.y0,c=e/u.max,d=a.length,f=a[0].indices.length,p=0;p<f;++p){n=h[p]*c,i.setItemLayout(a[0].indices[p],{layerIndex:0,x:l[0][p][0],y0:n,y:l[0][p][1]*c});for(var g=1;g<d;++g)n+=l[g-1][p][1]*c,i.setItemLayout(a[g].indices[p],{layerIndex:g,x:l[g][p][0],y0:n,y:l[g][p][1]*c})}}vf(function(t,e){t.eachSeriesByType("themeRiver",function(t){var e=t.getData(),i=t.coordinateSystem,n={},o=i.getRect();n.rect=o;var a=t.get("boundaryGap"),r=i.getAxis();(n.boundaryGap=a,"horizontal"===r.orient)?(a[0]=Pl(a[0],o.height),a[1]=Pl(a[1],o.height),kI(e,t,o.height-a[0]-a[1])):(a[0]=Pl(a[0],o.width),a[1]=Pl(a[1],o.width),kI(e,t,o.width-a[0]-a[1]));e.setLayout("layoutInfo",n)})}),yf(function(t){t.eachSeriesByType("themeRiver",function(o){var a=o.getData(),r=o.getRawData(),s=o.get("color"),l=Q();a.each(function(t){l.set(a.getRawIndex(t),t)}),r.each(function(t){var e=r.getName(t),i=s[(o.nameMap.get(e)-1)%s.length];r.setItemVisual(t,"color",i);var n=l.get(t);null!=n&&a.setItemVisual(n,"color",i)})})}),pf(ty("themeRiver")),ic.extend({type:"series.sunburst",_viewRoot:null,getInitialData:function(t,e){var i={name:t.name,children:t.data};!function i(t){var n=0;E(t.children,function(t){i(t);var e=t.value;k(e)&&(e=e[0]),n+=e});var e=t.value;k(e)&&(e=e[0]);null!=e&&!isNaN(e)||(e=n);e<0&&(e=0);k(t.value)?t.value[0]=e:t.value=e}(i);var n=t.levels||[],o={};return o.levels=n,vx.createTree(i,this,o).data},optionUpdated:function(){this.resetViewRoot()},getDataParams:function(t){var e=ic.prototype.getDataParams.apply(this,arguments),i=this.getData().tree.getNodeByDataIndex(t);return e.treePathInfo=Rx(i,this),e},defaultOption:{zlevel:0,z:2,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,percentPrecision:2,stillShowZeroSum:!0,highlightPolicy:"descendant",nodeClick:"rootToNode",renderLabelForZeroData:!1,label:{rotate:"radial",show:!0,opacity:1,align:"center",position:"inside",distance:5,silent:!0,emphasis:{}},itemStyle:{borderWidth:1,borderColor:"white",borderType:"solid",shadowBlur:0,shadowColor:"rgba(0, 0, 0, 0.2)",shadowOffsetX:0,shadowOffsetY:0,opacity:1,emphasis:{},highlight:{opacity:1},downplay:{opacity:.9}},animationType:"expansion",animationDuration:1e3,animationDurationUpdate:500,animationEasing:"cubicOut",data:[],levels:[],sort:"desc"},getViewRoot:function(){return this._viewRoot},resetViewRoot:function(t){t?this._viewRoot=t:t=this._viewRoot;var e=this.getRawData().tree.root;t&&(t===e||e.contains(t))||(this._viewRoot=e)}});var PI="none",NI="ancestor",OI="self",EI=2,zI=4;function RI(t,e,i){Ii.call(this);var n=new Ur({z2:EI});n.seriesIndex=e.seriesIndex;var o=new Fr({z2:zI,silent:t.getModel("label").get("silent")});function a(){o.ignore=o.hoverIgnore}function r(){o.ignore=o.normalIgnore}this.add(n),this.add(o),this.updateData(!0,t,"normal",e,i),this.on("emphasis",a).on("normal",r).on("mouseover",a).on("mouseout",r)}var BI=RI.prototype;BI.updateData=function(t,e,i,n,o){(this.node=e).piece=this,n=n||this._seriesModel,o=o||this._ecModel;var a=this.childAt(0);a.dataIndex=e.dataIndex;var r=e.getModel(),s=e.getLayout(),l=L({},s);l.label=null;var u=function(t,e,i){var n=t.getVisual("color"),o=t.getVisual("visualMeta");o&&0!==o.length||(n=null);var a=t.getModel("itemStyle").get("color");{if(a)return a;if(n)return n;if(0===t.depth)return i.option.color[0];var r=i.option.color.length;a=i.option.color[function(t){var e=t;for(;1<e.depth;)e=e.parentNode;return _(t.getAncestors()[0].children,e)}(t)%r]}return a}(e,0,o);!function(t,e,i){e.getData().setItemVisual(t.dataIndex,"color",i)}(e,n,u);var h,c=r.getModel("itemStyle").getItemStyle();"normal"===i?h=c:h=m(r.getModel(i+".itemStyle").getItemStyle(),c);h=C({lineJoin:"bevel",fill:h.fill||u},h),t?(a.setShape(l),a.shape.r=s.r0,sl(a,{shape:{r:s.r}},n,e.dataIndex),a.useStyle(h)):"object"==typeof h.fill&&h.fill.type||"object"==typeof a.style.fill&&a.style.fill.type?(sl(a,{shape:l},n),a.useStyle(h)):sl(a,{shape:l,style:h},n),this._updateLabel(n,u,i);var d=r.getShallow("cursor");if(d&&a.attr("cursor",d),t){var f=n.getShallow("highlightPolicy");this._initEvents(a,e,n,f)}this._seriesModel=n||this._seriesModel,this._ecModel=o||this._ecModel},BI.onEmphasis=function(e){var i=this;this.node.hostTree.root.eachNode(function(t){t.piece&&(i.node===t?t.piece.updateData(!1,t,"emphasis"):!function(t,e,i){return i!==PI&&(i===OI?t===e:i===NI?t===e||t.isAncestorOf(e):t===e||t.isDescendantOf(e))}(t,i.node,e)?e!==PI&&t.piece.childAt(0).trigger("downplay"):t.piece.childAt(0).trigger("highlight"))})},BI.onNormal=function(){this.node.hostTree.root.eachNode(function(t){t.piece&&t.piece.updateData(!1,t,"normal")})},BI.onHighlight=function(){this.updateData(!1,this.node,"highlight")},BI.onDownplay=function(){this.updateData(!1,this.node,"downplay")},BI._updateLabel=function(t,e,i){var n=this.node.getModel(),o=n.getModel("label"),a="normal"===i||"emphasis"===i?o:n.getModel(i+".label"),r=n.getModel("emphasis.label"),s=W(t.getFormattedLabel(this.node.dataIndex,i,null,null,"label"),this.node.name);!1===S("show")&&(s="");var l=this.node.getLayout(),u=a.get("minAngle");null==u&&(u=o.get("minAngle")),u=u/180*Math.PI;var h=l.endAngle-l.startAngle;null!=u&&Math.abs(h)<u&&(s="");var c=this.childAt(1);$s(c.style,c.hoverStyle||{},o,r,{defaultText:a.getShallow("show")?s:null,autoColor:e,useInsideStyle:!0});var d,f=(l.startAngle+l.endAngle)/2,p=Math.cos(f),g=Math.sin(f),m=S("position"),v=S("distance")||0,y=S("align");"outside"===m?(d=l.r+v,y=f>Math.PI/2?"right":"left"):y&&"center"!==y?"left"===y?(d=l.r0+v,f>Math.PI/2&&(y="right")):"right"===y&&(d=l.r-v,f>Math.PI/2&&(y="left")):(d=(l.r+l.r0)/2,y="center"),c.attr("style",{text:s,textAlign:y,textVerticalAlign:S("verticalAlign")||"middle",opacity:S("opacity")});var x=d*p+l.cx,_=d*g+l.cy;c.attr("position",[x,_]);var w=S("rotate"),b=0;function S(t){var e=a.get(t);return null==e?o.get(t):e}"radial"===w?(b=-f)<-Math.PI/2&&(b+=Math.PI):"tangential"===w?(b=Math.PI/2-f)>Math.PI/2?b-=Math.PI:b<-Math.PI/2&&(b+=Math.PI):"number"==typeof w&&(b=w*Math.PI/180),c.attr("rotation",b)},BI._initEvents=function(t,e,i,n){t.off("mouseover").off("mouseout").off("emphasis").off("normal");function o(){r.onEmphasis(n)}function a(){r.onNormal()}var r=this;i.isAnimationEnabled()&&t.on("mouseover",o).on("mouseout",a).on("emphasis",o).on("normal",a).on("downplay",function(){r.onDownplay()}).on("highlight",function(){r.onHighlight()})},w(RI,Ii);gc.extend({type:"sunburst",init:function(){},render:function(o,a,t,e){var n=this;this.seriesModel=o,this.api=t,this.ecModel=a;var r=o.getData(),s=r.tree.root,i=o.getViewRoot(),l=this.group,u=o.get("renderLabelForZeroData"),h=[];i.eachNode(function(t){h.push(t)});var c=this._oldChildren||[];if(function(i,n){if(0===i.length&&0===n.length)return;function t(t){return t.getId()}function e(t,e){!function(t,e){u||!t||t.getValue()||(t=null);if(t!==s&&e!==s)if(e&&e.piece)t?(e.piece.updateData(!1,t,"normal",o,a),r.setItemGraphicEl(t.dataIndex,e.piece)):function(t){if(!t)return;t.piece&&(l.remove(t.piece),t.piece=null)}(e);else if(t){var i=new RI(t,o,a);l.add(i),r.setItemGraphicEl(t.dataIndex,i)}}(null==t?null:i[t],null==e?null:n[e])}new Tf(n,i,t,t).add(e).update(e).remove(T(e,null)).execute()}(h,c),function(t,e){if(0<e.depth){n.virtualPiece?n.virtualPiece.updateData(!1,t,"normal",o,a):(n.virtualPiece=new RI(t,o,a),l.add(n.virtualPiece)),e.piece._onclickEvent&&e.piece.off("click",e.piece._onclickEvent);var i=function(t){n._rootToNode(e.parentNode)};e.piece._onclickEvent=i,n.virtualPiece.on("click",i)}else n.virtualPiece&&(l.remove(n.virtualPiece),n.virtualPiece=null)}(s,i),e&&e.highlight&&e.highlight.piece){var d=o.getShallow("highlightPolicy");e.highlight.piece.onEmphasis(d)}else if(e&&e.unhighlight){var f=this.virtualPiece;!f&&s.children.length&&(f=s.children[0].piece),f&&f.onNormal()}this._initEvents(),this._oldChildren=h},dispose:function(){},_initEvents:function(){function t(a){var r=!1;s.seriesModel.getViewRoot().eachNode(function(t){if(!r&&t.piece&&t.piece.childAt(0)===a.target){var e=t.getModel().get("nodeClick");if("rootToNode"===e)s._rootToNode(t);else if("link"===e){var i=t.getModel(),n=i.get("link");if(n){var o=i.get("target",!0)||"_blank";window.open(n,o)}}r=!0}})}var s=this;this.group._onclickEvent&&this.group.off("click",this.group._onclickEvent),this.group.on("click",t),this.group._onclickEvent=t},_rootToNode:function(t){t!==this.seriesModel.getViewRoot()&&this.api.dispatchAction({type:"sunburstRootToNode",from:this.uid,seriesId:this.seriesModel.id,targetNode:t})},containPoint:function(t,e){var i=e.getData().getItemLayout(0);if(i){var n=t[0]-i.cx,o=t[1]-i.cy,a=Math.sqrt(n*n+o*o);return a<=i.r&&a>=i.r0}}});var VI="sunburstRootToNode";gf({type:VI,update:"updateView"},function(o,t){t.eachComponent({mainType:"series",subType:"sunburst",query:o},function(t,e){var i=Ox(o,[VI],t);if(i){var n=t.getViewRoot();n&&(o.direction=zx(n,i.node)?"rollUp":"drillDown"),t.resetViewRoot(i.node)}})});var GI="sunburstHighlight";gf({type:GI,update:"updateView"},function(n,t){t.eachComponent({mainType:"series",subType:"sunburst",query:n},function(t,e){var i=Ox(n,[GI],t);i&&(n.highlight=i.node)})});gf({type:"sunburstUnhighlight",update:"updateView"},function(i,t){t.eachComponent({mainType:"series",subType:"sunburst",query:i},function(t,e){i.unhighlight=!0})});var FI=Math.PI/180;function WI(t,e){if("function"==typeof e)return t.sort(e);var n="asc"===e;return t.sort(function(t,e){var i=(t.getValue()-e.getValue())*(n?1:-1);return 0==i?(t.dataIndex-e.dataIndex)*(n?-1:1):i})}function HI(a,r){return r=r||[0,0],N(["x","y"],function(t,e){var i=this.getAxis(t),n=r[e],o=a[e]/2;return"category"===i.type?i.getBandWidth():Math.abs(i.dataToCoord(n-o)-i.dataToCoord(n+o))},this)}yf(T(Yv,"sunburst")),vf(T(function(t,e,C,i){e.eachSeriesByType(t,function(t){var e=t.get("center"),i=t.get("radius");k(i)||(i=[0,i]),k(e)||(e=[e,e]);var n=C.getWidth(),o=C.getHeight(),h=Math.min(n,o),c=Pl(e[0],n),d=Pl(e[1],o),f=Pl(i[0],h/2),a=Pl(i[1],h/2),r=-t.get("startAngle")*FI,p=t.get("minAngle")*FI,g=t.getData().tree.root,s=t.getViewRoot(),m=s.depth,l=t.get("sort");null!=l&&!function e(t,i){var n=t.children||[];t.children=WI(n,i);n.length&&E(t.children,function(t){e(t,i)})}(s,l);var u=0;E(s.children,function(t){isNaN(t.getValue())||u++});var v=s.getValue(),y=Math.PI/(v||u)*2,x=0<s.depth,_=s.height-(x?-1:1),w=(a-f)/(_||1),b=t.get("clockwise"),S=t.get("stillShowZeroSum"),M=b?1:-1,I=function(t,e){if(t){var i=e;if(t!==g){var n=t.getValue(),o=0===v&&S?y:n*y;o<p&&(o=p),i=e+M*o;var a=t.depth-m-(x?-1:1),r=f+w*a,s=f+w*(1+a),l=t.getModel();null!=l.get("r0")&&(r=Pl(l.get("r0"),h/2)),null!=l.get("r")&&(s=Pl(l.get("r"),h/2)),t.setLayout({angle:o,startAngle:e,endAngle:i,clockwise:b,cx:c,cy:d,r0:r,r:s})}if(t.children&&t.children.length){var u=0;E(t.children,function(t){u+=I(t,e+u)})}return i-e}};if(x){var T=f,A=f+w,D=2*Math.PI;g.setLayout({angle:D,startAngle:r,endAngle:r+D,clockwise:b,cx:c,cy:d,r0:T,r:A})}I(s,r)})},"sunburst")),pf(T(ty,"sunburst"));function ZI(a,r){return r=r||[0,0],N([0,1],function(t){var e=r[t],i=a[t]/2,n=[],o=[];return n[t]=e-i,o[t]=e+i,n[1-t]=o[1-t]=r[1-t],Math.abs(this.dataToPoint(n)[t]-this.dataToPoint(o)[t])},this)}function UI(t,e){var i=this.getAxis(),n=e instanceof Array?e[0]:e,o=(t instanceof Array?t[0]:t)/2;return"category"===i.type?i.getBandWidth():Math.abs(i.dataToCoord(n-o)-i.dataToCoord(n+o))}function XI(s,l){return N(["Radius","Angle"],function(t,e){var i=this["get"+t+"Axis"](),n=l[e],o=s[e]/2,a="dataTo"+t,r="category"===i.type?i.getBandWidth():Math.abs(i[a](n-o)-i[a](n+o));return"Angle"===t&&(r=r*Math.PI/180),r},this)}var YI=xs,jI=["itemStyle"],qI=["emphasis","itemStyle"],KI=["label"],$I=["emphasis","label"],JI="e\0\0",QI={cartesian2d:function(e){var t=e.grid.getRect();return{coordSys:{type:"cartesian2d",x:t.x,y:t.y,width:t.width,height:t.height},api:{coord:function(t){return e.dataToPoint(t)},size:A(HI,e)}}},geo:function(e){var t=e.getBoundingRect();return{coordSys:{type:"geo",x:t.x,y:t.y,width:t.width,height:t.height,zoom:e.getZoom()},api:{coord:function(t){return e.dataToPoint(t)},size:A(ZI,e)}}},singleAxis:function(e){var t=e.getRect();return{coordSys:{type:"singleAxis",x:t.x,y:t.y,width:t.width,height:t.height},api:{coord:function(t){return e.dataToPoint(t)},size:A(UI,e)}}},polar:function(o){var a=o.getRadiusAxis(),r=o.getAngleAxis(),t=a.getExtent();return t[0]>t[1]&&t.reverse(),{coordSys:{type:"polar",cx:o.cx,cy:o.cy,r:t[1],r0:t[0]},api:{coord:A(function(t){var e=a.dataToRadius(t[0]),i=r.dataToAngle(t[1]),n=o.coordToPoint([e,i]);return n.push(e,i*Math.PI/180),n}),size:A(XI,o)}}},calendar:function(i){var t=i.getRect(),e=i.getRangeInfo();return{coordSys:{type:"calendar",x:t.x,y:t.y,width:t.width,height:t.height,cellWidth:i.getCellWidth(),cellHeight:i.getCellHeight(),rangeInfo:{start:e.start,end:e.end,weeks:e.weeks,dayCount:e.allDay}},api:{coord:function(t,e){return i.dataToPoint(t,e)}}}}};function tT(t,e,i,n,o){null==i[t]||o||(e[t]=i[t],i[t]=n[t])}function eT(a,r,e,t){var i=a.get("renderItem"),n=a.coordinateSystem,o={};n&&(o=n.prepareCustoms?n.prepareCustoms():QI[n.type](n));var s,l,u,h,c,d=C({getWidth:t.getWidth,getHeight:t.getHeight,getZr:t.getZr,getDevicePixelRatio:t.getDevicePixelRatio,value:function(t,e){return null==e&&(e=s),r.get(r.getDimension(t||0),e)},style:function(t,e){null==e&&(e=s),g(e);var i=l.getModel(jI).getItemStyle();null!=c&&(i.fill=c);var n=r.getItemVisual(e,"opacity");null!=n&&(i.opacity=n);var o=t?rT(t,u):u;return Qs(i,o,null,{autoColor:c,isRectText:!0}),i.text=o.getShallow("show")?H(a.getFormattedLabel(e,"normal"),Gg(r,e)):null,t&&sT(i,t),i},styleEmphasis:function(t,e){null==e&&(e=s),g(e);var i=l.getModel(qI).getItemStyle(),n=t?rT(t,h):h;return Qs(i,n,null,{isRectText:!0},!0),i.text=n.getShallow("show")?Z(a.getFormattedLabel(e,"emphasis"),a.getFormattedLabel(e,"normal"),Gg(r,e)):null,t&&sT(i,t),i},visual:function(t,e){return null==e&&(e=s),r.getItemVisual(e,t)},barLayout:function(t){if(n.getBaseAxis){return function(t){var e=[],i=t.axis;if("category"===i.type){for(var n=i.getBandWidth(),o=0;o<t.count;o++)e.push(C({bandWidth:n,axisKey:"axis0",stackId:Mp+o},t));var a=Lp(e),r=[];for(o=0;o<t.count;o++){var s=a.axis0[Mp+o];s.offsetCenter=s.offset+s.width/2,r.push(s)}return r}}(C({axis:n.getBaseAxis()},t))}},currentSeriesIndices:function(){return e.getCurrentSeriesIndices()},font:function(t){return al(t,e)}},o.api||{}),f={context:{},seriesId:a.id,seriesName:a.name,seriesIndex:a.seriesIndex,coordSys:o.coordSys,dataInsideLength:r.count(),encode:function(o){var a={};return E(o.dimensions,function(t,e){var i=o.getDimensionInfo(t);if(!i.isExtraCoord){var n=i.coordDim;(a[n]=a[n]||[])[i.coordDimIndex]=e}}),a}(a.getData())},p=!0;return function(t,e){return s=t,p=!0,i&&i(C({dataIndexInside:t,dataIndex:r.getRawIndex(t),actionType:e?e.type:null},f),d)};function g(t){null==t&&(t=s),p&&(l=r.getItemModel(t),u=l.getModel(KI),h=l.getModel($I),c=r.getItemVisual(t,"color"),p=!1)}}function iT(t,e,i,n,o,a){return(t=nT(t,e,i,n,o,a,!0))&&a.setItemGraphicEl(e,t),t}function nT(t,e,i,n,o,a,r){var s=!i,l=(i=i||{}).type,u=i.shape,h=i.style;if(t&&(s||null!=l&&l!==t.__customGraphicType||"path"===l&&function(t){return t&&(t.hasOwnProperty("pathData")||t.hasOwnProperty("d"))}(u)&&uT(u)!==t.__customPathData||"image"===l&&hT(h,"image")&&h.image!==t.__customImagePath||"text"===l&&hT(u,"text")&&h.text!==t.__customText)&&(o.remove(t),t=null),!s){var c=!t;return function(e,t,i,n,o,a,r){var s={},l=i.style||{};if(i.shape&&(s.shape=D(i.shape)),i.position&&(s.position=i.position.slice()),i.scale&&(s.scale=i.scale.slice()),i.origin&&(s.origin=i.origin.slice()),i.rotation&&(s.rotation=i.rotation),"image"===e.type&&i.style){var u=s.style={};E(["x","y","width","height"],function(t){tT(t,u,l,e.style,a)})}if("text"===e.type&&i.style){u=s.style={};E(["x","y"],function(t){tT(t,u,l,e.style,a)}),!l.hasOwnProperty("textFill")&&l.fill&&(l.textFill=l.fill),!l.hasOwnProperty("textStroke")&&l.stroke&&(l.textStroke=l.stroke)}if("group"!==e.type&&(e.useStyle(l),a)){e.style.opacity=0;var h=l.opacity;null==h&&(h=1),ll(e,{style:{opacity:h}},n,t)}a?e.attr(s):sl(e,s,n,t),i.hasOwnProperty("z2")&&e.attr("z2",i.z2||0),i.hasOwnProperty("silent")&&e.attr("silent",i.silent),i.hasOwnProperty("invisible")&&e.attr("invisible",i.invisible),i.hasOwnProperty("ignore")&&e.attr("ignore",i.ignore),i.hasOwnProperty("info")&&e.attr("info",i.info);var c=i.styleEmphasis;Fs(e,c),r&&js(e,!1!==c)}(t=t||function(t){var e,i=t.type;if("path"===i){var n=t.shape,o=null!=n.width&&null!=n.height?{x:n.x||0,y:n.y||0,width:n.width,height:n.height}:null,a=uT(n);(e=Ds(a,null,o,n.layout||"center")).__customPathData=a}else if("image"===i)(e=new qn({})).__customImagePath=t.style.image;else if("text"===i)(e=new Fr({})).__customText=t.style.text;else if("group"===i)e=new Ii;else{if("compoundPath"===i)throw new Error('"compoundPath" is not supported yet.');e=new(As(i))}return e.__customGraphicType=i,e.name=t.name,e}(i),e,i,n,0,c,r),"group"===l&&function(t,e,i,n,o){var a=i.children,r=a?a.length:0,s=i.$mergeChildren,l="byName"===s||i.diffChildrenByName,u=!1===s;if(!r&&!l&&!u)return;if(l)return function(t){new Tf(t.oldChildren,t.newChildren,oT,oT,t).add(aT).update(aT).remove(lT).execute()}({oldChildren:t.children()||[],newChildren:a||[],dataIndex:e,animatableModel:n,group:t,data:o});u&&t.removeAll();for(var h=0;h<r;h++)a[h]&&nT(t.childAt(h),e,a[h],n,t,o)}(t,e,i,n,a),o.add(t),t}}function oT(t,e){var i=t&&t.name;return null!=i?i:JI+e}function aT(t,e){var i=this.context,n=null!=t?i.newChildren[t]:null;nT(null!=e?i.oldChildren[e]:null,i.dataIndex,n,i.animatableModel,i.group,i.data)}function rT(i,t){var n=new Il({},t);return E(YI,function(t,e){i.hasOwnProperty(t)&&(n.option[e]=i[t])}),n}function sT(t,e){for(var i in e)!e.hasOwnProperty(i)&&YI.hasOwnProperty(i)||(t[i]=e[i])}function lT(t){var e=this.context,i=e.oldChildren[t];i&&e.group.remove(i)}function uT(t){return t&&(t.pathData||t.d)}function hT(t,e){return t&&t.hasOwnProperty(e)}function cT(t){return t.get("stack")||"__ec_stack_"+t.seriesIndex}function dT(t,e){return e.dim+t.model.componentIndex}function fT(t,e){Eg.call(this,"radius",t,e),this.type="category"}ic.extend({type:"series.custom",dependencies:["grid","polar","geo","singleAxis","calendar"],defaultOption:{coordinateSystem:"cartesian2d",zlevel:0,z:2,legendHoverLink:!0,useTransform:!0,clip:!1},getInitialData:function(t,e){return hp(this.getSource(),this)},getDataParams:function(t,e,i){var n=ic.prototype.getDataParams.apply(this,arguments);return i&&(n.info=i.info),n}}),gc.extend({type:"custom",_data:null,render:function(i,t,e,n){var o=this._data,a=i.getData(),r=this.group,s=eT(i,a,t,e);a.diff(o).add(function(t){iT(null,t,s(t,n),i,r,a)}).update(function(t,e){iT(o.getItemGraphicEl(e),t,s(t,n),i,r,a)}).remove(function(t){var e=o.getItemGraphicEl(t);e&&r.remove(e)}).execute();var l=i.get("clip",!0)?ym(i.coordinateSystem,!1,i):null;l?r.setClipPath(l):r.removeClipPath(),this._data=a},incrementalPrepareRender:function(t,e,i){this.group.removeAll(),this._data=null},incrementalRender:function(t,e,i,n,o){var a=e.getData(),r=eT(e,a,i,n);function s(t){t.isGroup||(t.incremental=!0,t.useHoverLayer=!0)}for(var l=t.start;l<t.end;l++){iT(null,l,r(l,o),e,this.group,a).traverse(s)}},dispose:et,filterForExposedEvent:function(t,e,i,n){var o=e.element;if(null==o||i.name===o)return!0;for(;(i=i.parent)&&i!==this.group;)if(i.name===o)return!0;return!1}}),fT.prototype={constructor:fT,pointToData:function(t,e){return this.polar.pointToData(t,e)["radius"===this.dim?0:1]},dataToRadius:Eg.prototype.dataToCoord,radiusToData:Eg.prototype.coordToData},w(fT,Eg);var pT=Zo();function gT(t,e){e=e||[0,360],Eg.call(this,"angle",t,e),this.type="category"}gT.prototype={constructor:gT,pointToData:function(t,e){return this.polar.pointToData(t,e)["radius"===this.dim?0:1]},dataToAngle:Eg.prototype.dataToCoord,angleToData:Eg.prototype.coordToData,calculateCategoryInterval:function(){var t=this.getLabelModel(),e=this.scale,i=e.getExtent(),n=e.count();if(i[1]-i[0]<1)return 0;var o=i[0],a=this.dataToCoord(o+1)-this.dataToCoord(o),r=Math.abs(a),s=cn(o,t.getFont(),"center","top"),l=Math.max(s.height,7)/r;isNaN(l)&&(l=1/0);var u=Math.max(0,Math.floor(l)),h=pT(this.model),c=h.lastAutoInterval,d=h.lastTickCount;return null!=c&&null!=d&&Math.abs(c-u)<=1&&Math.abs(d-n)<=1&&u<c?u=c:(h.lastTickCount=n,h.lastAutoInterval=u),u}},w(gT,Eg);function mT(t){this.name=t||"",this.cx=0,this.cy=0,this._radiusAxis=new fT,this._angleAxis=new gT,this._radiusAxis.polar=this._angleAxis.polar=this}mT.prototype={type:"polar",axisPointerEnabled:!0,constructor:mT,dimensions:["radius","angle"],model:null,containPoint:function(t){var e=this.pointToCoord(t);return this._radiusAxis.contain(e[0])&&this._angleAxis.contain(e[1])},containData:function(t){return this._radiusAxis.containData(t[0])&&this._angleAxis.containData(t[1])},getAxis:function(t){return this["_"+t+"Axis"]},getAxes:function(){return[this._radiusAxis,this._angleAxis]},getAxesByScale:function(t){var e=[],i=this._angleAxis,n=this._radiusAxis;return i.scale.type===t&&e.push(i),n.scale.type===t&&e.push(n),e},getAngleAxis:function(){return this._angleAxis},getRadiusAxis:function(){return this._radiusAxis},getOtherAxis:function(t){var e=this._angleAxis;return t===e?this._radiusAxis:e},getBaseAxis:function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAngleAxis()},getTooltipAxes:function(t){var e=null!=t&&"auto"!==t?this.getAxis(t):this.getBaseAxis();return{baseAxes:[e],otherAxes:[this.getOtherAxis(e)]}},dataToPoint:function(t,e){return this.coordToPoint([this._radiusAxis.dataToRadius(t[0],e),this._angleAxis.dataToAngle(t[1],e)])},pointToData:function(t,e){var i=this.pointToCoord(t);return[this._radiusAxis.radiusToData(i[0],e),this._angleAxis.angleToData(i[1],e)]},pointToCoord:function(t){var e=t[0]-this.cx,i=t[1]-this.cy,n=this.getAngleAxis(),o=n.getExtent(),a=Math.min(o[0],o[1]),r=Math.max(o[0],o[1]);n.inverse?a=r-360:r=a+360;var s=Math.sqrt(e*e+i*i);e/=s,i/=s;for(var l=Math.atan2(-i,e)/Math.PI*180,u=l<a?1:-1;l<a||r<l;)l+=360*u;return[s,l]},coordToPoint:function(t){var e=t[0],i=t[1]/180*Math.PI;return[Math.cos(i)*e+this.cx,-Math.sin(i)*e+this.cy]},getArea:function(){var t=this.getAngleAxis(),e=this.getRadiusAxis().getExtent().slice();e[0]>e[1]&&e.reverse();var i=t.getExtent(),n=Math.PI/180;return{cx:this.cx,cy:this.cy,r0:e[0],r:e[1],startAngle:-i[0]*n,endAngle:-i[1]*n,clockwise:t.inverse,contain:function(t,e){var i=t-this.cx,n=e-this.cy,o=i*i+n*n,a=this.r,r=this.r0;return o<=a*a&&r*r<=o}}}};var vT=Tu.extend({type:"polarAxis",axis:null,getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"polar",index:this.option.polarIndex,id:this.option.polarId})[0]}});m(vT.prototype,sg);var yT={splitNumber:5};function xT(t,e){return e.type||(e.data?"category":"value")}function _T(t,e){var i=this,n=i.getAngleAxis(),o=i.getRadiusAxis();if(n.scale.setExtent(1/0,-1/0),o.scale.setExtent(1/0,-1/0),t.eachSeries(function(t){if(t.coordinateSystem===i){var e=t.getData();E(e.mapDimension("radius",!0),function(t){o.scale.unionExtentFromData(e,up(e,t))}),E(e.mapDimension("angle",!0),function(t){n.scale.unionExtentFromData(e,up(e,t))})}}),eg(n.scale,n.model),eg(o.scale,o.model),"category"===n.type&&!n.onBand){var a=n.getExtent(),r=360/n.scale.count();n.inverse?a[1]+=r:a[1]-=r,n.setExtent(a[0],a[1])}}function wT(t,e){if(t.type=e.get("type"),t.scale=ig(e),t.onBand=e.get("boundaryGap")&&"category"===t.type,t.inverse=e.get("inverse"),"angleAxis"===e.mainType){t.inverse^=e.get("clockwise");var i=e.get("startAngle");t.setExtent(i,i+(t.inverse?-360:360))}(e.axis=t).model=e}Om("angle",vT,xT,{startAngle:90,clockwise:!0,splitNumber:12,axisLabel:{rotate:!1}}),Om("radius",vT,xT,yT),wf({type:"polar",dependencies:["polarAxis","angleAxis"],coordinateSystem:null,findAxisModel:function(t){var e;return this.ecModel.eachComponent(t,function(t){t.getCoordSysModel()===this&&(e=t)},this),e},defaultOption:{zlevel:0,z:0,center:["50%","50%"],radius:"80%"}}),nh.register("polar",{dimensions:mT.prototype.dimensions,create:function(i,s){var l=[];return i.eachComponent("polar",function(t,e){var i=new mT(e);i.update=_T;var n=i.getRadiusAxis(),o=i.getAngleAxis(),a=t.findAxisModel("radiusAxis"),r=t.findAxisModel("angleAxis");wT(n,a),wT(o,r),function(t,e,i){var n=e.get("center"),o=i.getWidth(),a=i.getHeight();t.cx=Pl(n[0],o),t.cy=Pl(n[1],a);var r=t.getRadiusAxis(),s=Math.min(o,a)/2,l=e.get("radius");null==l?l=[0,"100%"]:k(l)||(l=[0,l]),l=[Pl(l[0],s),Pl(l[1],s)],r.inverse?r.setExtent(l[1],l[0]):r.setExtent(l[0],l[1])}(i,t,s),l.push(i),(t.coordinateSystem=i).model=t}),i.eachSeries(function(t){if("polar"===t.get("coordinateSystem")){var e=i.queryComponents({mainType:"polar",index:t.get("polarIndex"),id:t.get("polarId")})[0];t.coordinateSystem=e.coordinateSystem}}),l}});var bT=["axisLine","axisLabel","axisTick","minorTick","splitLine","minorSplitLine","splitArea"];function ST(t,e,i){e[1]>e[0]&&(e=e.slice().reverse());var n=t.coordToPoint([e[0],i]),o=t.coordToPoint([e[1],i]);return{x1:n[0],y1:n[1],x2:o[0],y2:o[1]}}function MT(t){return t.getRadiusAxis().inverse?0:1}function IT(t){var e=t[0],i=t[t.length-1];e&&i&&Math.abs(Math.abs(e.coord-i.coord)-360)<1e-4&&t.pop()}hv.extend({type:"angleAxis",axisPointerClass:"PolarAxisPointer",render:function(e,t){if(this.group.removeAll(),e.get("show")){var i=e.axis,n=i.polar,o=n.getRadiusAxis().getExtent(),a=i.getTicksCoords(),r=i.getMinorTicksCoords(),s=N(i.getViewLabels(),function(t){return(t=D(t)).coord=i.dataToCoord(t.tickValue),t});IT(s),IT(a),E(bT,function(t){!e.get(t+".show")||i.scale.isBlank()&&"axisLine"!==t||this["_"+t](e,n,a,r,o,s)},this)}},_axisLine:function(t,e,i,n,o){var a,r=t.getModel("axisLine.lineStyle"),s=MT(e),l=s?0:1;(a=0===o[l]?new Hr({shape:{cx:e.cx,cy:e.cy,r:o[s]},style:r.getLineStyle(),z2:1,silent:!0}):new Xr({shape:{cx:e.cx,cy:e.cy,r:o[s],r0:o[l]},style:r.getLineStyle(),z2:1,silent:!0})).style.fill=null,this.group.add(a)},_axisTick:function(t,e,i,n,o){var a=t.getModel("axisTick"),r=(a.get("inside")?-1:1)*a.get("length"),s=o[MT(e)],l=N(i,function(t){return new os({shape:ST(e,[s,s+r],t.coord)})});this.group.add(ks(l,{style:C(a.getModel("lineStyle").getLineStyle(),{stroke:t.get("axisLine.lineStyle.color")})}))},_minorTick:function(t,e,i,n,o){if(n.length){for(var a=t.getModel("axisTick"),r=t.getModel("minorTick"),s=(a.get("inside")?-1:1)*r.get("length"),l=o[MT(e)],u=[],h=0;h<n.length;h++)for(var c=0;c<n[h].length;c++)u.push(new os({shape:ST(e,[l,l+s],n[h][c].coord)}));this.group.add(ks(u,{style:C(r.getModel("lineStyle").getLineStyle(),C(a.getLineStyle(),{stroke:t.get("axisLine.lineStyle.color")}))}))}},_axisLabel:function(c,d,t,e,f,i){var p=c.getCategories(!0),g=c.getModel("axisLabel"),m=g.get("margin"),v=c.get("triggerEvent");E(i,function(t,e){var i=g,n=t.tickValue,o=f[MT(d)],a=d.coordToPoint([o+m,t.coord]),r=d.cx,s=d.cy,l=Math.abs(a[0]-r)/o<.3?"center":a[0]>r?"left":"right",u=Math.abs(a[1]-s)/o<.3?"middle":a[1]>s?"top":"bottom";p&&p[n]&&p[n].textStyle&&(i=new Il(p[n].textStyle,g,g.ecModel));var h=new Fr({silent:Ym.isLabelSilent(c)});this.group.add(h),Qs(h.style,i,{x:a[0],y:a[1],textFill:i.getTextColor()||c.get("axisLine.lineStyle.color"),text:t.formattedLabel,textAlign:l,textVerticalAlign:u}),v&&(h.eventData=Ym.makeAxisEventDataBase(c),h.eventData.targetType="axisLabel",h.eventData.value=t.rawLabel)},this)},_splitLine:function(t,e,i,n,o){var a=t.getModel("splitLine").getModel("lineStyle"),r=a.get("color"),s=0;r=r instanceof Array?r:[r];for(var l=[],u=0;u<i.length;u++){var h=s++%r.length;l[h]=l[h]||[],l[h].push(new os({shape:ST(e,o,i[u].coord)}))}for(u=0;u<l.length;u++)this.group.add(ks(l[u],{style:C({stroke:r[u%r.length]},a.getLineStyle()),silent:!0,z:t.get("z")}))},_minorSplitLine:function(t,e,i,n,o){if(n.length){for(var a=t.getModel("minorSplitLine").getModel("lineStyle"),r=[],s=0;s<n.length;s++)for(var l=0;l<n[s].length;l++)r.push(new os({shape:ST(e,o,n[s][l].coord)}));this.group.add(ks(r,{style:a.getLineStyle(),silent:!0,z:t.get("z")}))}},_splitArea:function(t,e,i,n,o){if(i.length){var a=t.getModel("splitArea").getModel("areaStyle"),r=a.get("color"),s=0;r=r instanceof Array?r:[r];for(var l=[],u=Math.PI/180,h=-i[0].coord*u,c=Math.min(o[0],o[1]),d=Math.max(o[0],o[1]),f=t.get("clockwise"),p=1;p<i.length;p++){var g=s++%r.length;l[g]=l[g]||[],l[g].push(new Ur({shape:{cx:e.cx,cy:e.cy,r0:c,r:d,startAngle:h,endAngle:-i[p].coord*u,clockwise:f},silent:!0})),h=-i[p].coord*u}for(p=0;p<l.length;p++)this.group.add(ks(l[p],{style:C({fill:r[p%r.length]},a.getAreaStyle()),silent:!0}))}}});var TT=["axisLine","axisTickLabel","axisName"],AT=["splitLine","splitArea","minorSplitLine"];hv.extend({type:"radiusAxis",axisPointerClass:"PolarAxisPointer",render:function(e,t){if(this.group.removeAll(),e.get("show")){var i=e.axis,n=i.polar,o=n.getAngleAxis(),a=i.getTicksCoords(),r=i.getMinorTicksCoords(),s=o.getExtent()[0],l=i.getExtent(),u=function(t,e,i){return{position:[t.cx,t.cy],rotation:i/180*Math.PI,labelDirection:-1,tickDirection:-1,nameDirection:1,labelRotate:e.getModel("axisLabel").get("rotate"),z2:1}}(n,e,s),h=new Ym(e,u);E(TT,h.add,h),this.group.add(h.getGroup()),E(AT,function(t){e.get(t+".show")&&!i.scale.isBlank()&&this["_"+t](e,n,s,l,a,r)},this)}},_splitLine:function(t,e,i,n,o){var a=t.getModel("splitLine").getModel("lineStyle"),r=a.get("color"),s=0;r=r instanceof Array?r:[r];for(var l=[],u=0;u<o.length;u++){var h=s++%r.length;l[h]=l[h]||[],l[h].push(new Hr({shape:{cx:e.cx,cy:e.cy,r:o[u].coord}}))}for(u=0;u<l.length;u++)this.group.add(ks(l[u],{style:C({stroke:r[u%r.length],fill:null},a.getLineStyle()),silent:!0}))},_minorSplitLine:function(t,e,i,n,o,a){if(a.length){for(var r=t.getModel("minorSplitLine").getModel("lineStyle"),s=[],l=0;l<a.length;l++)for(var u=0;u<a[l].length;u++)s.push(new Hr({shape:{cx:e.cx,cy:e.cy,r:a[l][u].coord}}));this.group.add(ks(s,{style:C({fill:null},r.getLineStyle()),silent:!0}))}},_splitArea:function(t,e,i,n,o){if(o.length){var a=t.getModel("splitArea").getModel("areaStyle"),r=a.get("color"),s=0;r=r instanceof Array?r:[r];for(var l=[],u=o[0].coord,h=1;h<o.length;h++){var c=s++%r.length;l[c]=l[c]||[],l[c].push(new Ur({shape:{cx:e.cx,cy:e.cy,r0:u,r:o[h].coord,startAngle:0,endAngle:2*Math.PI},silent:!0})),u=o[h].coord}for(h=0;h<l.length;h++)this.group.add(ks(l[h],{style:C({fill:r[h%r.length]},a.getAreaStyle()),silent:!0}))}}});var DT=sI.extend({makeElOption:function(t,e,i,n,o){var a=i.axis;"angle"===a.dim&&(this.animationThreshold=Math.PI/18);var r,s=a.polar,l=s.getOtherAxis(a).getExtent();r=a["dataTo"+uu(a.dim)](e);var u=n.get("type");if(u&&"none"!==u){var h=dI(n),c=CT[u](a,s,r,l,h);c.style=h,t.graphicKey=c.type,t.pointer=c}var d=n.get("label.margin");fI(t,i,n,o,function(t,e,i,n,o){var a=e.axis,r=a.dataToCoord(t),s=n.getAngleAxis().getExtent()[0];s=s/180*Math.PI;var l,u,h,c=n.getRadiusAxis().getExtent();if("radius"===a.dim){var d=ee();re(d,d,s),ae(d,d,[n.cx,n.cy]),l=hl([r,-o],d);var f=e.getModel("axisLabel").get("rotate")||0,p=Ym.innerTextLayout(s,f*Math.PI/180,-1);u=p.textAlign,h=p.textVerticalAlign}else{var g=c[1];l=n.coordToPoint([g+o,r]);var m=n.cx,v=n.cy;u=Math.abs(l[0]-m)/g<.3?"center":l[0]>m?"left":"right",h=Math.abs(l[1]-v)/g<.3?"middle":l[1]>v?"top":"bottom"}return{position:l,align:u,verticalAlign:h}}(e,i,0,s,d))}});var CT={line:function(t,e,i,n,o){return"angle"===t.dim?{type:"Line",shape:vI(e.coordToPoint([n[0],i]),e.coordToPoint([n[1],i]))}:{type:"Circle",shape:{cx:e.cx,cy:e.cy,r:i}}},shadow:function(t,e,i,n,o){var a=Math.max(1,t.getBandWidth()),r=Math.PI/180;return"angle"===t.dim?{type:"Sector",shape:xI(e.cx,e.cy,n[0],n[1],(-i-a/2)*r,(a/2-i)*r)}:{type:"Sector",shape:xI(e.cx,e.cy,i-a/2,i+a/2,0,2*Math.PI)}}};function LT(n,t){t.update="updateView",gf(t,function(t,e){var i={};return e.eachComponent({mainType:"geo",query:t},function(e){e[n](t.name),E(e.coordinateSystem.regions,function(t){i[t.name]=e.isSelected(t.name)||!1})}),{selected:i,name:t.name}})}hv.registerAxisPointerClass("PolarAxisPointer",DT),vf(T(function(t,e,i){var N={},O=function(t){var g={};E(t,function(t,e){var i=t.getData(),n=t.coordinateSystem,o=n.getBaseAxis(),a=dT(n,o),r=o.getExtent(),s="category"===o.type?o.getBandWidth():Math.abs(r[1]-r[0])/i.count(),l=g[a]||{bandWidth:s,remainedWidth:s,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},u=l.stacks;g[a]=l;var h=cT(t);u[h]||l.autoWidthCount++,u[h]=u[h]||{width:0,maxWidth:0};var c=Pl(t.get("barWidth"),s),d=Pl(t.get("barMaxWidth"),s),f=t.get("barGap"),p=t.get("barCategoryGap");c&&!u[h].width&&(c=Math.min(l.remainedWidth,c),u[h].width=c,l.remainedWidth-=c),d&&(u[h].maxWidth=d),null!=f&&(l.gap=f),null!=p&&(l.categoryGap=p)});var d={};return E(g,function(t,i){d[i]={};var e=t.stacks,n=t.bandWidth,o=Pl(t.categoryGap,n),a=Pl(t.gap,1),r=t.remainedWidth,s=t.autoWidthCount,l=(r-o)/(s+(s-1)*a);l=Math.max(l,0),E(e,function(t,e){var i=t.maxWidth;i&&i<l&&(i=Math.min(i,r),t.width&&(i=Math.min(i,t.width)),r-=i,t.width=i,s--)}),l=(r-o)/(s+(s-1)*a),l=Math.max(l,0);var u,h=0;E(e,function(t,e){t.width||(t.width=l),h+=(u=t).width*(1+a)}),u&&(h-=u.width*a);var c=-h/2;E(e,function(t,e){d[i][e]=d[i][e]||{offset:c,width:t.width},c+=t.width*(1+a)})}),d}(M(e.getSeriesByType(t),function(t){return!e.isSeriesFiltered(t)&&t.coordinateSystem&&"polar"===t.coordinateSystem.type}));e.eachSeriesByType(t,function(t){if("polar"===t.coordinateSystem.type){var e=t.getData(),i=t.coordinateSystem,n=i.getBaseAxis(),o=dT(i,n),a=cT(t),r=O[o][a],s=r.offset,l=r.width,u=i.getOtherAxis(n),h=t.coordinateSystem.cx,c=t.coordinateSystem.cy,d=t.get("barMinHeight")||0,f=t.get("barMinAngle")||0;N[a]=N[a]||[];for(var p=e.mapDimension(u.dim),g=e.mapDimension(n.dim),m=lp(e,p),v="radius"!==n.dim||!t.get("roundCap",!0),y=u.getExtent()[0],x=0,_=e.count();x<_;x++){var w=e.get(p,x),b=e.get(g,x);if(!isNaN(w)){var S,M,I,T,A=0<=w?"p":"n",D=y;if(m&&(N[a][b]||(N[a][b]={p:y,n:y}),D=N[a][b][A]),"radius"===u.dim){var C=u.dataToRadius(w)-y,L=n.dataToAngle(b);Math.abs(C)<d&&(C=(C<0?-1:1)*d),M=(S=D)+C,T=(I=L-s)-l,m&&(N[a][b][A]=M)}else{var k=u.dataToAngle(w,v)-y,P=n.dataToRadius(b);Math.abs(k)<f&&(k=(k<0?-1:1)*f),M=(S=P+s)+l,T=(I=D)+k,m&&(N[a][b][A]=T)}e.setItemLayout(x,{cx:h,cy:c,r0:S,r:M,startAngle:-I*Math.PI/180,endAngle:-T*Math.PI/180})}}}},this)},"bar")),bf({type:"polar"}),b(Tu.extend({type:"geo",coordinateSystem:null,layoutMode:"box",init:function(t){Tu.prototype.init.apply(this,arguments),zo(t,"label",["show"])},optionUpdated:function(){var t=this.option,i=this;t.regions=ax.getFilledRegions(t.regions,t.map,t.nameMap),this._optionModelMap=S(t.regions||[],function(t,e){return e.name&&t.set(e.name,new Il(e,i)),t},Q()),this.updateSelectedMap(t.regions)},defaultOption:{zlevel:0,z:0,show:!0,left:"center",top:"center",aspectScale:null,silent:!1,map:"",boundingCoords:null,center:null,zoom:1,scaleLimit:null,label:{show:!1,color:"#000"},itemStyle:{borderWidth:.5,borderColor:"#444",color:"#eee"},emphasis:{label:{show:!0,color:"rgb(100,0,0)"},itemStyle:{color:"rgba(255,215,0,0.8)"}},regions:[]},getRegionModel:function(t){return this._optionModelMap.get(t)||new Il(null,this,this.ecModel)},getFormattedLabel:function(t,e){var i=this.getRegionModel(t).get("label"+("normal"===e?".":e+".")+"formatter"),n={name:t};return"function"==typeof i?(n.status=e,i(n)):"string"==typeof i?i.replace("{a}",null!=t?t:""):void 0},setZoom:function(t){this.option.zoom=t},setCenter:function(t){this.option.center=t}}),Vv),bf({type:"geo",init:function(t,e){var i=new Uy(e,!0);this._mapDraw=i,this.group.add(i.group)},render:function(t,e,i,n){if(!n||"geoToggleSelect"!==n.type||n.from!==this.uid){var o=this._mapDraw;t.get("show")?o.draw(t,e,i,this,n):this._mapDraw.group.removeAll(),this.group.silent=t.get("silent")}},dispose:function(){this._mapDraw&&this._mapDraw.remove()}}),LT("toggleSelected",{type:"geoToggleSelect",event:"geoselectchanged"}),LT("select",{type:"geoSelect",event:"geoselected"}),LT("unSelect",{type:"geoUnSelect",event:"geounselected"});function kT(t,e,i){this._model=t}function PT(t,e,i,n){var o=i.calendarModel,a=i.seriesModel,r=o?o.coordinateSystem:a?a.coordinateSystem:null;return r===this?r[t](n):null}kT.prototype={constructor:kT,type:"calendar",dimensions:["time","value"],getDimensionsInfo:function(){return[{name:"time",type:"time"},"value"]},getRangeInfo:function(){return this._rangeInfo},getModel:function(){return this._model},getRect:function(){return this._rect},getCellWidth:function(){return this._sw},getCellHeight:function(){return this._sh},getOrient:function(){return this._orient},getFirstDayOfWeek:function(){return this._firstDayOfWeek},getDateInfo:function(t){var e=(t=Hl(t)).getFullYear(),i=t.getMonth()+1;i=i<10?"0"+i:i;var n=t.getDate();n=n<10?"0"+n:n;var o=t.getDay();return{y:e,m:i,d:n,day:o=Math.abs((o+7-this.getFirstDayOfWeek())%7),time:t.getTime(),formatedDate:e+"-"+i+"-"+n,date:t}},getNextNDay:function(t,e){return 0===(e=e||0)||(t=new Date(this.getDateInfo(t).time)).setDate(t.getDate()+e),this.getDateInfo(t)},update:function(t,e){this._firstDayOfWeek=+this._model.getModel("dayLabel").get("firstDay"),this._orient=this._model.get("orient"),this._lineWidth=this._model.getModel("itemStyle").getItemStyle().lineWidth||0,this._rangeInfo=this._getRangeInfo(this._initRangeOption());var i=this._rangeInfo.weeks||1,n=["width","height"],o=this._model.get("cellSize").slice(),a=this._model.getBoxLayoutParams(),r="horizontal"===this._orient?[i,7]:[7,i];E([0,1],function(t){u(o,t)&&(a[n[t]]=o[t]*r[t])});var s={width:e.getWidth(),height:e.getHeight()},l=this._rect=vu(a,s);function u(t,e){return null!=t[e]&&"auto"!==t[e]}E([0,1],function(t){u(o,t)||(o[t]=l[n[t]]/r[t])}),this._sw=o[0],this._sh=o[1]},dataToPoint:function(t,e){k(t)&&(t=t[0]),null==e&&(e=!0);var i=this.getDateInfo(t),n=this._rangeInfo,o=i.formatedDate;if(e&&!(i.time>=n.start.time&&i.time<n.end.time+864e5))return[NaN,NaN];var a=i.day,r=this._getRangeInfo([n.start.time,o]).nthWeek;return"vertical"===this._orient?[this._rect.x+a*this._sw+this._sw/2,this._rect.y+r*this._sh+this._sh/2]:[this._rect.x+r*this._sw+this._sw/2,this._rect.y+a*this._sh+this._sh/2]},pointToData:function(t){var e=this.pointToDate(t);return e&&e.time},dataToRect:function(t,e){var i=this.dataToPoint(t,e);return{contentShape:{x:i[0]-(this._sw-this._lineWidth)/2,y:i[1]-(this._sh-this._lineWidth)/2,width:this._sw-this._lineWidth,height:this._sh-this._lineWidth},center:i,tl:[i[0]-this._sw/2,i[1]-this._sh/2],tr:[i[0]+this._sw/2,i[1]-this._sh/2],br:[i[0]+this._sw/2,i[1]+this._sh/2],bl:[i[0]-this._sw/2,i[1]+this._sh/2]}},pointToDate:function(t){var e=Math.floor((t[0]-this._rect.x)/this._sw)+1,i=Math.floor((t[1]-this._rect.y)/this._sh)+1,n=this._rangeInfo.range;return"vertical"===this._orient?this._getDateByWeeksAndDay(i,e-1,n):this._getDateByWeeksAndDay(e,i-1,n)},convertToPixel:T(PT,"dataToPoint"),convertFromPixel:T(PT,"pointToData"),_initRangeOption:function(){var t=this._model.get("range"),e=t;if(k(e)&&1===e.length&&(e=e[0]),/^\d{4}$/.test(e)&&(t=[e+"-01-01",e+"-12-31"]),/^\d{4}[\/|-]\d{1,2}$/.test(e)){var i=this.getDateInfo(e),n=i.date;n.setMonth(n.getMonth()+1);var o=this.getNextNDay(n,-1);t=[i.formatedDate,o.formatedDate]}/^\d{4}[\/|-]\d{1,2}[\/|-]\d{1,2}$/.test(e)&&(t=[e,e]);var a=this._getRangeInfo(t);return a.start.time>a.end.time&&t.reverse(),t},_getRangeInfo:function(t){var e;(t=[this.getDateInfo(t[0]),this.getDateInfo(t[1])])[0].time>t[1].time&&(e=!0,t.reverse());var i=Math.floor(t[1].time/864e5)-Math.floor(t[0].time/864e5)+1,n=new Date(t[0].time),o=n.getDate(),a=t[1].date.getDate();if(n.setDate(o+i-1),n.getDate()!==a)for(var r=0<n.getTime()-t[1].time?1:-1;n.getDate()!==a&&0<(n.getTime()-t[1].time)*r;)i-=r,n.setDate(o+i-1);var s=Math.floor((i+t[0].day+6)/7),l=e?1-s:s-1;return e&&t.reverse(),{range:[t[0].formatedDate,t[1].formatedDate],start:t[0],end:t[1],allDay:i,weeks:s,nthWeek:l,fweek:t[0].day,lweek:t[1].day}},_getDateByWeeksAndDay:function(t,e,i){var n=this._getRangeInfo(i);if(t>n.weeks||0===t&&e<n.fweek||t===n.weeks&&e>n.lweek)return!1;var o=7*(t-1)-n.fweek+e,a=new Date(n.start.time);return a.setDate(n.start.d+o),this.getDateInfo(a)}},kT.dimensions=kT.prototype.dimensions,kT.getDimensionsInfo=kT.prototype.getDimensionsInfo,kT.create=function(i,n){var o=[];return i.eachComponent("calendar",function(t){var e=new kT(t,i,n);o.push(e),t.coordinateSystem=e}),i.eachSeries(function(t){"calendar"===t.get("coordinateSystem")&&(t.coordinateSystem=o[t.get("calendarIndex")||0])}),o},nh.register("calendar",kT);var NT=Tu.extend({type:"calendar",coordinateSystem:null,defaultOption:{zlevel:0,z:2,left:80,top:60,cellSize:20,orient:"horizontal",splitLine:{show:!0,lineStyle:{color:"#000",width:1,type:"solid"}},itemStyle:{color:"#fff",borderWidth:1,borderColor:"#ccc"},dayLabel:{show:!0,firstDay:0,position:"start",margin:"50%",nameMap:"en",color:"#000"},monthLabel:{show:!0,position:"start",margin:5,align:"center",nameMap:"en",formatter:null,color:"#000"},yearLabel:{show:!0,position:null,margin:30,formatter:null,color:"#ccc",fontFamily:"sans-serif",fontWeight:"bolder",fontSize:20}},init:function(t,e,i,n){var o=_u(t);NT.superApply(this,"init",arguments),OT(t,o)},mergeOption:function(t,e){NT.superApply(this,"mergeOption",arguments),OT(this.option,t)}});function OT(t,e){var i=t.cellSize;k(i)?1===i.length&&(i[1]=i[0]):i=t.cellSize=[i,i];var n=N([0,1],function(t){return function(t,e){return null!=t[pu[e][0]]||null!=t[pu[e][1]]&&null!=t[pu[e][2]]}(e,t)&&(i[t]="auto"),null!=i[t]&&"auto"!==i[t]});xu(t,e,{type:"box",ignoreSize:n})}var ET={EN:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],CN:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},zT={EN:["S","M","T","W","T","F","S"],CN:["日","一","二","三","四","五","六"]};bf({type:"calendar",_tlpoints:null,_blpoints:null,_firstDayOfMonth:null,_firstDayPoints:null,render:function(t,e,i){var n=this.group;n.removeAll();var o=t.coordinateSystem,a=o.getRangeInfo(),r=o.getOrient();this._renderDayRect(t,a,n),this._renderLines(t,a,r,n),this._renderYearText(t,a,r,n),this._renderMonthText(t,r,n),this._renderWeekText(t,a,r,n)},_renderDayRect:function(t,e,i){for(var n=t.coordinateSystem,o=t.getModel("itemStyle").getItemStyle(),a=n.getCellWidth(),r=n.getCellHeight(),s=e.start.time;s<=e.end.time;s=n.getNextNDay(s,1).time){var l=n.dataToRect([s],!1).tl,u=new is({shape:{x:l[0],y:l[1],width:a,height:r},cursor:"default",style:o});i.add(u)}},_renderLines:function(i,t,n,o){var a=this,r=i.coordinateSystem,s=i.getModel("splitLine.lineStyle").getLineStyle(),l=i.get("splitLine.show"),e=s.lineWidth;this._tlpoints=[],this._blpoints=[],this._firstDayOfMonth=[],this._firstDayPoints=[];for(var u=t.start,h=0;u.time<=t.end.time;h++){d(u.formatedDate),0===h&&(u=r.getDateInfo(t.start.y+"-"+t.start.m));var c=u.date;c.setMonth(c.getMonth()+1),u=r.getDateInfo(c)}function d(t){a._firstDayOfMonth.push(r.getDateInfo(t)),a._firstDayPoints.push(r.dataToRect([t],!1).tl);var e=a._getLinePointsOfOneWeek(i,t,n);a._tlpoints.push(e[0]),a._blpoints.push(e[e.length-1]),l&&a._drawSplitline(e,s,o)}d(r.getNextNDay(t.end.time,1).formatedDate),l&&this._drawSplitline(a._getEdgesPoints(a._tlpoints,e,n),s,o),l&&this._drawSplitline(a._getEdgesPoints(a._blpoints,e,n),s,o)},_getEdgesPoints:function(t,e,i){var n=[t[0].slice(),t[t.length-1].slice()],o="horizontal"===i?0:1;return n[0][o]=n[0][o]-e/2,n[1][o]=n[1][o]+e/2,n},_drawSplitline:function(t,e,i){var n=new Kr({z2:20,shape:{points:t},style:e});i.add(n)},_getLinePointsOfOneWeek:function(t,e,i){var n=t.coordinateSystem;e=n.getDateInfo(e);for(var o=[],a=0;a<7;a++){var r=n.getNextNDay(e.time,a),s=n.dataToRect([r.time],!1);o[2*r.day]=s.tl,o[2*r.day+1]=s["horizontal"===i?"bl":"tr"]}return o},_formatterLabel:function(t,e){return"string"==typeof t&&t?au(t,e):"function"==typeof t?t(e):e.nameMap},_yearTextPositionControl:function(t,e,i,n,o){e=e.slice();var a=["center","bottom"];"bottom"===n?(e[1]+=o,a=["center","top"]):"left"===n?e[0]-=o:"right"===n?(e[0]+=o,a=["center","top"]):e[1]-=o;var r=0;return"left"!==n&&"right"!==n||(r=Math.PI/2),{rotation:r,position:e,style:{textAlign:a[0],textVerticalAlign:a[1]}}},_renderYearText:function(t,e,i,n){var o=t.getModel("yearLabel");if(o.get("show")){var a=o.get("margin"),r=o.get("position");r=r||("horizontal"!==i?"top":"left");var s=[this._tlpoints[this._tlpoints.length-1],this._blpoints[0]],l=(s[0][0]+s[1][0])/2,u=(s[0][1]+s[1][1])/2,h="horizontal"===i?0:1,c={top:[l,s[h][1]],bottom:[l,s[1-h][1]],left:[s[1-h][0],u],right:[s[h][0],u]},d=e.start.y;+e.end.y>+e.start.y&&(d=d+"-"+e.end.y);var f=o.get("formatter"),p={start:e.start.y,end:e.end.y,nameMap:d},g=this._formatterLabel(f,p),m=new Fr({z2:30});Qs(m.style,o,{text:g}),m.attr(this._yearTextPositionControl(m,c[r],i,r,a)),n.add(m)}},_monthTextPositionControl:function(t,e,i,n,o){var a="left",r="top",s=t[0],l=t[1];return"horizontal"===i?(l+=o,e&&(a="center"),"start"===n&&(r="bottom")):(s+=o,e&&(r="middle"),"start"===n&&(a="right")),{x:s,y:l,textAlign:a,textVerticalAlign:r}},_renderMonthText:function(t,e,i){var n=t.getModel("monthLabel");if(n.get("show")){var o=n.get("nameMap"),a=n.get("margin"),r=n.get("position"),s=n.get("align"),l=[this._tlpoints,this._blpoints];z(o)&&(o=ET[o.toUpperCase()]||[]);var u="start"===r?0:1,h="horizontal"===e?0:1;a="start"===r?-a:a;for(var c="center"===s,d=0;d<l[u].length-1;d++){var f=l[u][d].slice(),p=this._firstDayOfMonth[d];if(c){var g=this._firstDayPoints[d];f[h]=(g[h]+l[0][d+1][h])/2}var m=n.get("formatter"),v=o[+p.m-1],y={yyyy:p.y,yy:(p.y+"").slice(2),MM:p.m,M:+p.m,nameMap:v},x=this._formatterLabel(m,y),_=new Fr({z2:30});L(Qs(_.style,n,{text:x}),this._monthTextPositionControl(f,c,e,r,a)),i.add(_)}}},_weekTextPositionControl:function(t,e,i,n,o){var a="center",r="middle",s=t[0],l=t[1],u="start"===i;return"horizontal"===e?(s=s+n+(u?1:-1)*o[0]/2,a=u?"right":"left"):(l=l+n+(u?1:-1)*o[1]/2,r=u?"bottom":"top"),{x:s,y:l,textAlign:a,textVerticalAlign:r}},_renderWeekText:function(t,e,i,n){var o=t.getModel("dayLabel");if(o.get("show")){var a=t.coordinateSystem,r=o.get("position"),s=o.get("nameMap"),l=o.get("margin"),u=a.getFirstDayOfWeek();z(s)&&(s=zT[s.toUpperCase()]||[]);var h=a.getNextNDay(e.end.time,7-e.lweek).time,c=[a.getCellWidth(),a.getCellHeight()];l=Pl(l,c["horizontal"===i?0:1]),"start"===r&&(h=a.getNextNDay(e.start.time,-(7+e.fweek)).time,l=-l);for(var d=0;d<7;d++){var f,p=a.getNextNDay(h,d),g=a.dataToRect([p.time],!1).center;f=Math.abs((d+u)%7);var m=new Fr({z2:30});L(Qs(m.style,o,{text:s[f]}),this._weekTextPositionControl(g,i,r,l,c)),n.add(m)}}}});var RT={path:null,compoundPath:null,group:Ii,image:qn,text:Fr};ff(function(t){var e=t.graphic;k(e)?e[0]&&e[0].elements?t.graphic=[t.graphic[0]]:t.graphic=[{elements:e}]:e&&!e.elements&&(t.graphic=[{elements:[e]}])});var BT=wf({type:"graphic",defaultOption:{elements:[],parentId:null},_elOptionsToUpdate:null,mergeOption:function(t){var e=this.option.elements;this.option.elements=null,BT.superApply(this,"mergeOption",arguments),this.option.elements=e},optionUpdated:function(t,e){var i=this.option,n=(e?i:t).elements,o=i.elements=e?[]:i.elements,a=[];this._flatten(n,a);var r=Vo(o,a);Go(r);var s=this._elOptionsToUpdate=[];E(r,function(t,e){var i=t.option;i&&(s.push(i),function(t,e){var i=t.exist;if(e.id=t.keyInfo.id,!e.type&&i&&(e.type=i.type),null==e.parentId){var n=e.parentOption;n?e.parentId=n.id:i&&(e.parentId=i.parentId)}e.parentOption=null}(t,i),function(t,e,i){var n=L({},i),o=t[e],a=i.$action||"merge";"merge"===a?o?(m(o,n,!0),xu(o,n,{ignoreSize:!0}),wu(i,o)):t[e]=n:"replace"===a?t[e]=n:"remove"===a&&o&&(t[e]=null)}(o,e,i),function(t,e){if(!t)return;t.hv=e.hv=[FT(e,["left","right"]),FT(e,["top","bottom"])],"group"===t.type&&(null==t.width&&(t.width=e.width=0),null==t.height&&(t.height=e.height=0))}(o[e],i))},this);for(var l=o.length-1;0<=l;l--)null==o[l]?o.splice(l,1):delete o[l].$action},_flatten:function(t,i,n){E(t,function(t){if(t){n&&(t.parentOption=n),i.push(t);var e=t.children;"group"===t.type&&e&&this._flatten(e,i,t),delete t.children}},this)},useElOptionsToUpdate:function(){var t=this._elOptionsToUpdate;return this._elOptionsToUpdate=null,t}});function VT(t,e,i,n){var o=i.type,a=new(RT.hasOwnProperty(o)?RT[o]:As(o))(i);e.add(a),n.set(t,a),a.__ecGraphicId=t}function GT(t,e){var i=t&&t.parent;i&&("group"===t.type&&t.traverse(function(t){GT(t,e)}),e.removeKey(t.__ecGraphicId),i.remove(t))}function FT(e,t){var i;return E(t,function(t){null!=e[t]&&"auto"!==e[t]&&(i=!0)}),i}bf({type:"graphic",init:function(t,e){this._elMap=Q(),this._lastGraphicModel},render:function(t,e,i){t!==this._lastGraphicModel&&this._clear(),this._lastGraphicModel=t,this._updateElements(t),this._relocate(t,i)},_updateElements:function(u){var t=u.useElOptionsToUpdate();if(t){var h=this._elMap,c=this.group;E(t,function(t){var e=t.$action,i=t.id,n=h.get(i),o=t.parentId,a=null!=o?h.get(o):c,r=t.style;"text"===t.type&&r&&(t.hv&&t.hv[1]&&(r.textVerticalAlign=r.textBaseline=null),!r.hasOwnProperty("textFill")&&r.fill&&(r.textFill=r.fill),!r.hasOwnProperty("textStroke")&&r.stroke&&(r.textStroke=r.stroke));var s=function(e){return e=L({},e),E(["id","parentId","$action","hv","bounding"].concat(fu),function(t){delete e[t]}),e}(t);e&&"merge"!==e?"replace"===e?(GT(n,h),VT(i,a,s,h)):"remove"===e&&GT(n,h):n?n.attr(s):VT(i,a,s,h);var l=h.get(i);l&&(l.__ecGraphicWidthOption=t.width,l.__ecGraphicHeightOption=t.height,function(t,e){var i=t.eventData;t.silent||t.ignore||i||(i=t.eventData={componentType:"graphic",componentIndex:e.componentIndex,name:t.name});i&&(i.info=t.info)}(l,u))})}},_relocate:function(t,e){for(var i=t.option.elements,n=this.group,o=this._elMap,a=e.getWidth(),r=e.getHeight(),s=0;s<i.length;s++){var l=i[s];if((h=o.get(l.id))&&h.isGroup){var u=(c=h.parent)===n;h.__ecGraphicWidth=Pl(h.__ecGraphicWidthOption,u?a:c.__ecGraphicWidth)||0,h.__ecGraphicHeight=Pl(h.__ecGraphicHeightOption,u?r:c.__ecGraphicHeight)||0}}for(s=i.length-1;0<=s;s--){var h,c;l=i[s];if(h=o.get(l.id))yu(h,l,(c=h.parent)===n?{width:a,height:r}:{width:c.__ecGraphicWidth,height:c.__ecGraphicHeight},null,{hv:l.hv,boundingMode:l.bounding})}},_clear:function(){var e=this._elMap;e.each(function(t){GT(t,e)}),this._elMap=Q()},dispose:function(){this._clear()}});var WT={};function HT(t,e){WT[t]=e}function ZT(t){return WT[t]}var UT=wf({type:"toolbox",layoutMode:{type:"box",ignoreSize:!0},optionUpdated:function(){UT.superApply(this,"optionUpdated",arguments),E(this.option.feature,function(t,e){var i=ZT(e);i&&m(t,i.defaultOption)})},defaultOption:{show:!0,z:6,zlevel:0,orient:"horizontal",left:"right",top:"top",backgroundColor:"transparent",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemSize:15,itemGap:8,showTitle:!0,iconStyle:{borderColor:"#666",color:"none"},emphasis:{iconStyle:{borderColor:"#3E98C5"}},tooltip:{show:!1}}});function XT(t,e){var i=Jl(e.get("padding")),n=e.getItemStyle(["color","opacity"]);return n.fill=e.get("backgroundColor"),t=new is({shape:{x:t.x-i[3],y:t.y-i[0],width:t.width+i[1]+i[3],height:t.height+i[0]+i[2],r:e.get("borderRadius")},style:n,silent:!0,z2:-1})}bf({type:"toolbox",render:function(h,c,d,l){var f=this.group;if(f.removeAll(),h.get("show")){var p=+h.get("itemSize"),u=h.get("feature")||{},g=this._features||(this._features={}),m=[];E(u,function(t,e){m.push(e)}),new Tf(this._featureNames||[],m).add(t).update(t).remove(T(t,null)).execute(),this._featureNames=m,function(t,e,i){var n=e.getBoxLayoutParams(),o=e.get("padding"),a={width:i.getWidth(),height:i.getHeight()},r=vu(n,a,o);mu(e.get("orient"),t,e.get("itemGap"),r.width,r.height),yu(t,n,a,o)}(f,h,d),f.add(XT(f.getBoundingRect(),h)),f.eachChild(function(t){var e=t.__title,i=t.hoverStyle;if(i&&e){var n=cn(e,Sn(i)),o=t.position[0]+f.position[0],a=!1;t.position[1]+f.position[1]+p+n.height>d.getHeight()&&(i.textPosition="top",a=!0);var r=a?-5-n.height:p+8;o+n.width/2>d.getWidth()?(i.textPosition=["100%",r],i.textAlign="right"):o-n.width/2<0&&(i.textPosition=[0,r],i.textAlign="left")}})}function t(t,e){var i,n=m[t],o=m[e],a=u[n],r=new Il(a,h,h.ecModel);if(l&&null!=l.newTitle&&(a.title=l.newTitle),n&&!o){if(function(t){return 0===t.indexOf("my")}(n))i={model:r,onclick:r.option.onclick,featureName:n};else{var s=ZT(n);if(!s)return;i=new s(r,c,d)}g[n]=i}else{if(!(i=g[o]))return;i.model=r,i.ecModel=c,i.api=d}n||!o?r.get("show")&&!i.unusable?(function(o,a,t){var r=o.getModel("iconStyle"),s=o.getModel("emphasis.iconStyle"),e=a.getIcons?a.getIcons():o.get("icon"),l=o.get("title")||{};if("string"==typeof e){var i=e,n=l;l={},(e={})[t]=i,l[t]=n}var u=o.iconPaths={};E(e,function(t,e){var i=pl(t,{},{x:-p/2,y:-p/2,width:p,height:p});i.setStyle(r.getItemStyle()),i.hoverStyle=s.getItemStyle(),i.setStyle({text:l[e],textAlign:s.get("textAlign"),textBorderRadius:s.get("textBorderRadius"),textPadding:s.get("textPadding"),textFill:null});var n=h.getModel("tooltip");n&&n.get("show")&&i.attr("tooltip",L({content:l[e],formatter:n.get("formatter",!0)||function(){return l[e]},formatterParams:{componentType:"toolbox",name:e,title:l[e],$vars:["name","title"]},position:n.get("position",!0)||"bottom"},n.option)),Ys(i),h.get("showTitle")&&(i.__title=l[e],i.on("mouseover",function(){var t=s.getItemStyle(),e="vertical"===h.get("orient")?null==h.get("right")?"right":"left":null==h.get("bottom")?"bottom":"top";i.setStyle({textFill:s.get("textFill")||t.fill||t.stroke||"#000",textBackgroundColor:s.get("textBackgroundColor"),textPosition:s.get("textPosition")||e})}).on("mouseout",function(){i.setStyle({textFill:null,textBackgroundColor:null})})),i.trigger(o.get("iconStatus."+e)||"normal"),f.add(i),i.on("click",A(a.onclick,a,c,d,e)),u[e]=i})}(r,i,n),r.setIconStatus=function(t,e){var i=this.option,n=this.iconPaths;i.iconStatus=i.iconStatus||{},i.iconStatus[t]=e,n[t]&&n[t].trigger(e)},i.render&&i.render(r,c,d,l)):i.remove&&i.remove(c,d):i.dispose&&i.dispose(c,d)}},updateView:function(t,e,i,n){E(this._features,function(t){t.updateView&&t.updateView(t.model,e,i,n)})},remove:function(e,i){E(this._features,function(t){t.remove&&t.remove(e,i)}),this.group.removeAll()},dispose:function(e,i){E(this._features,function(t){t.dispose&&t.dispose(e,i)})}});var YT=Cc.toolbox.saveAsImage;function jT(t){this.model=t}jT.defaultOption={show:!0,icon:"M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0",title:YT.title,type:"png",connectedBackgroundColor:"#fff",name:"",excludeComponents:["toolbox"],pixelRatio:1,lang:YT.lang.slice()},jT.prototype.unusable=!v.canvasSupported,jT.prototype.onclick=function(t,e){var i=this.model,n=i.get("name")||t.get("title.0.text")||"echarts",o=i.get("type",!0)||"png",a=e.getConnectedDataURL({type:o,backgroundColor:i.get("backgroundColor",!0)||t.get("backgroundColor")||"#fff",connectedBackgroundColor:i.get("connectedBackgroundColor"),excludeComponents:i.get("excludeComponents"),pixelRatio:i.get("pixelRatio")});if("function"!=typeof MouseEvent||v.browser.ie||v.browser.edge)if(window.navigator.msSaveOrOpenBlob){for(var r=atob(a.split(",")[1]),s=r.length,l=new Uint8Array(s);s--;)l[s]=r.charCodeAt(s);var u=new Blob([l]);window.navigator.msSaveOrOpenBlob(u,n+"."+o)}else{var h=i.get("lang"),c='<body style="margin:0;"><img src="'+a+'" style="max-width:100%;" title="'+(h&&h[0]||"")+'" /></body>';window.open().document.write(c)}else{var d=document.createElement("a");d.download=n+"."+o,d.target="_blank",d.href=a;var f=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1});d.dispatchEvent(f)}},HT("saveAsImage",jT);var qT=Cc.toolbox.magicType,KT="__ec_magicType_stack__";function $T(t){this.model=t}$T.defaultOption={show:!0,type:[],icon:{line:"M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",bar:"M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",stack:"M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z"},title:D(qT.title),option:{},seriesIndex:{}};var JT=$T.prototype;JT.getIcons=function(){var t=this.model,e=t.get("icon"),i={};return E(t.get("type"),function(t){e[t]&&(i[t]=e[t])}),i};var QT={line:function(t,e,i,n){if("bar"===t)return m({id:e,type:"line",data:i.get("data"),stack:i.get("stack"),markPoint:i.get("markPoint"),markLine:i.get("markLine")},n.get("option.line")||{},!0)},bar:function(t,e,i,n){if("line"===t)return m({id:e,type:"bar",data:i.get("data"),stack:i.get("stack"),markPoint:i.get("markPoint"),markLine:i.get("markLine")},n.get("option.bar")||{},!0)},stack:function(t,e,i,n){var o=i.get("stack")===KT;if("line"===t||"bar"===t)return n.setIconStatus("stack",o?"normal":"emphasis"),m({id:e,stack:o?"":KT},n.get("option.stack")||{},!0)}},tA=[["line","bar"],["stack"]];JT.onclick=function(u,t,h){var c=this.model,e=c.get("seriesIndex."+h);if(QT[h]){var i,d={series:[]};if(E(tA,function(t){0<=_(t,h)&&E(t,function(t){c.setIconStatus(t,"normal")})}),c.setIconStatus(h,"emphasis"),u.eachComponent({mainType:"series",query:null==e?null:{seriesIndex:e}},function(t){var e=t.subType,i=t.id,n=QT[h](e,i,t,c);n&&(C(n,t.option),d.series.push(n));var o=t.coordinateSystem;if(o&&"cartesian2d"===o.type&&("line"===h||"bar"===h)){var a=o.getAxesByScale("ordinal")[0];if(a){var r=a.dim+"Axis",s=u.queryComponents({mainType:r,index:t.get(name+"Index"),id:t.get(name+"Id")})[0].componentIndex;d[r]=d[r]||[];for(var l=0;l<=s;l++)d[r][s]=d[r][s]||{};d[r][s].boundaryGap="bar"===h}}}),"stack"===h)i=d.series&&d.series[0]&&d.series[0].stack===KT?m({stack:qT.title.tiled},qT.title):D(qT.title);t.dispatchAction({type:"changeMagicType",currentType:h,newOption:d,newTitle:i})}},gf({type:"changeMagicType",event:"magicTypeChanged",update:"prepareAndUpdate"},function(t,e){e.mergeOption(t.newOption)}),HT("magicType",$T);var eA=Cc.toolbox.dataView,iA=new Array(60).join("-"),nA="\t";function oA(t){var e=function(t){var o={},a=[],r=[];return t.eachRawSeries(function(t){var e=t.coordinateSystem;if(!e||"cartesian2d"!==e.type&&"polar"!==e.type)a.push(t);else{var i=e.getBaseAxis();if("category"===i.type){var n=i.dim+"_"+i.index;o[n]||(o[n]={categoryAxis:i,valueAxis:e.getOtherAxis(i),series:[]},r.push({axisDim:i.dim,axisIndex:i.index})),o[n].series.push(t)}else a.push(t)}}),{seriesGroupByCategoryAxis:o,other:a,meta:r}}(t);return{value:M([function(t){var h=[];return E(t,function(t,e){var i=t.categoryAxis,n=t.valueAxis.dim,o=[" "].concat(N(t.series,function(t){return t.name})),a=[i.model.getCategories()];E(t.series,function(t){a.push(t.getRawData().mapArray(n,function(t){return t}))});for(var r=[o.join(nA)],s=0;s<a[0].length;s++){for(var l=[],u=0;u<a.length;u++)l.push(a[u][s]);r.push(l.join(nA))}h.push(r.join("\n"))}),h.join("\n\n"+iA+"\n\n")}(e.seriesGroupByCategoryAxis),function(t){return N(t,function(t){var o=t.getRawData(),a=[t.name],r=[];return o.each(o.dimensions,function(){for(var t=arguments.length,e=arguments[t-1],i=o.getName(e),n=0;n<t-1;n++)r[n]=arguments[n];a.push((i?i+nA:"")+r.join(nA))}),a.join("\n")}).join("\n\n"+iA+"\n\n")}(e.other)],function(t){return t.replace(/[\n\t\s]/g,"")}).join("\n\n"+iA+"\n\n"),meta:e.meta}}function aA(t){return t.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}var rA=new RegExp("["+nA+"]+","g");function sA(t,a){var e=t.split(new RegExp("\n*"+iA+"\n*","g")),r={series:[]};return E(e,function(t,e){if(function(t){if(0<=t.slice(0,t.indexOf("\n")).indexOf(nA))return!0}(t)){var i=function(t){for(var e=t.split(/\n+/g),i=[],n=N(aA(e.shift()).split(rA),function(t){return{name:t,data:[]}}),o=0;o<e.length;o++){var a=aA(e[o]).split(rA);i.push(a.shift());for(var r=0;r<a.length;r++)n[r]&&(n[r].data[o]=a[r])}return{series:n,categories:i}}(t),n=a[e],o=n.axisDim+"Axis";n&&(r[o]=r[o]||[],r[o][n.axisIndex]={data:i.categories},r.series=r.series.concat(i.series))}else{i=function(t){for(var e=t.split(/\n+/g),i=aA(e.shift()),n=[],o=0;o<e.length;o++){var a,r=aA(e[o]).split(rA),s="",l=!1;a=isNaN(r[0])?(l=!0,s=r[0],r=r.slice(1),n[o]={name:s,value:[]},n[o].value):n[o]=[];for(var u=0;u<r.length;u++)a.push(+r[u]);1===a.length&&(l?n[o].value=a[0]:n[o]=a[0])}return{name:i,data:n}}(t);r.series.push(i)}}),r}function lA(t){this._dom=null,this.model=t}lA.defaultOption={show:!0,readOnly:!1,optionToContent:null,contentToOption:null,icon:"M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28",title:D(eA.title),lang:D(eA.lang),backgroundColor:"#fff",textColor:"#000",textareaColor:"#fff",textareaBorderColor:"#333",buttonColor:"#c23531",buttonTextColor:"#fff"},lA.prototype.onclick=function(t,e){var i=e.getDom(),n=this.model;this._dom&&i.removeChild(this._dom);var o=document.createElement("div");o.style.cssText="position:absolute;left:5px;top:5px;bottom:5px;right:5px;",o.style.backgroundColor=n.get("backgroundColor")||"#fff";var a=document.createElement("h4"),r=n.get("lang")||[];a.innerHTML=r[0]||n.get("title"),a.style.cssText="margin: 10px 20px;",a.style.color=n.get("textColor");var s=document.createElement("div"),l=document.createElement("textarea");s.style.cssText="display:block;width:100%;overflow:auto;";var u=n.get("optionToContent"),h=n.get("contentToOption"),c=oA(t);if("function"==typeof u){var d=u(e.getOption());"string"==typeof d?s.innerHTML=d:G(d)&&s.appendChild(d)}else s.appendChild(l),l.readOnly=n.get("readOnly"),l.style.cssText="width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;",l.style.color=n.get("textColor"),l.style.borderColor=n.get("textareaBorderColor"),l.style.backgroundColor=n.get("textareaColor"),l.value=c.value;var f=c.meta,p=document.createElement("div");p.style.cssText="position:absolute;bottom:0;left:0;right:0;";var g="float:right;margin-right:20px;border:none;cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px",m=document.createElement("div"),v=document.createElement("div");g+=";background-color:"+n.get("buttonColor"),g+=";color:"+n.get("buttonTextColor");var y=this;function x(){i.removeChild(o),y._dom=null}Ft(m,"click",x),Ft(v,"click",function(){var t;try{t="function"==typeof h?h(s,e.getOption()):sA(l.value,f)}catch(t){throw x(),new Error("Data view format error "+t)}t&&e.dispatchAction({type:"changeDataView",newOption:t}),x()}),m.innerHTML=r[1],v.innerHTML=r[2],v.style.cssText=g,m.style.cssText=g,n.get("readOnly")||p.appendChild(v),p.appendChild(m),o.appendChild(a),o.appendChild(s),o.appendChild(p),s.style.height=i.clientHeight-80+"px",i.appendChild(o),this._dom=o},lA.prototype.remove=function(t,e){this._dom&&e.getDom().removeChild(this._dom)},lA.prototype.dispose=function(t,e){this.remove(t,e)},HT("dataView",lA),gf({type:"changeDataView",event:"dataViewChanged",update:"prepareAndUpdate"},function(t,n){var o=[];E(t.newOption.series,function(t){var e=n.getSeriesByName(t.name)[0];if(e){var i=e.get("data");o.push({name:t.name,data:function(t,n){return N(t,function(t,e){var i=n&&n[e];return R(i)&&!k(i)?(R(t)&&!k(t)&&(t=t.value),C({value:t},i)):t})}(t.data,i)})}else o.push(L({type:"scatter"},t))}),n.mergeOption(C({series:o},t.newOption))});var uA=E,hA=_,cA=T,dA=["dataToPoint","pointToData"],fA=["grid","xAxis","yAxis","geo","graph","polar","radiusAxis","angleAxis","bmap"];function pA(t,e,i){var n=this._targetInfoList=[],o={},a=vA(e,t);uA(yA,function(t,e){i&&i.include&&!(0<=hA(i.include,e))||t(a,n,o)})}var gA=pA.prototype;function mA(t){return t[0]>t[1]&&t.reverse(),t}function vA(t,e){return Xo(t,e,{includeMainTypes:fA})}gA.setOutputRanges=function(t,e){this.matchOutputRanges(t,e,function(t,e,i){if((t.coordRanges||(t.coordRanges=[])).push(e),!t.coordRange){t.coordRange=e;var n=wA[t.brushType](0,i,e);t.__rangeOffset={offset:SA[t.brushType](n.values,t.range,[1,1]),xyMinMax:n.xyMinMax}}})},gA.matchOutputRanges=function(t,n,o){uA(t,function(i){var t=this.findTargetInfo(i,n);t&&!0!==t&&E(t.coordSyses,function(t){var e=wA[i.brushType](1,t,i.range);o(i,e.values,t,n)})},this)},gA.setInputRanges=function(t,o){uA(t,function(t){var e=this.findTargetInfo(t,o);if(t.range=t.range||[],e&&!0!==e){t.panelId=e.panelId;var i=wA[t.brushType](0,e.coordSys,t.coordRange),n=t.__rangeOffset;t.range=n?SA[t.brushType](i.values,n.offset,function(t,e){var i=IA(t),n=IA(e),o=[i[0]/n[0],i[1]/n[1]];return isNaN(o[0])&&(o[0]=1),isNaN(o[1])&&(o[1]=1),o}(i.xyMinMax,n.xyMinMax)):i.values}},this)},gA.makePanelOpts=function(i,n){return N(this._targetInfoList,function(t){var e=t.getPanelRect();return{panelId:t.panelId,defaultBrushType:n&&n(t),clipPath:Ub(e),isTargetByCursor:Yb(e,i,t.coordSysModel),getLinearBrushOtherExtent:Xb(e)}})},gA.controlSeries=function(t,e,i){var n=this.findTargetInfo(t,i);return!0===n||n&&0<=hA(n.coordSyses,e.coordinateSystem)},gA.findTargetInfo=function(t,e){for(var i=this._targetInfoList,n=vA(e,t),o=0;o<i.length;o++){var a=i[o],r=t.panelId;if(r){if(a.panelId===r)return a}else for(o=0;o<xA.length;o++)if(xA[o](n,a))return a}return!0};var yA={grid:function(t,n){var o=t.xAxisModels,a=t.yAxisModels,e=t.gridModels,i=Q(),r={},s={};(o||a||e)&&(uA(o,function(t){var e=t.axis.grid.model;i.set(e.id,e),r[e.id]=!0}),uA(a,function(t){var e=t.axis.grid.model;i.set(e.id,e),s[e.id]=!0}),uA(e,function(t){i.set(t.id,t),r[t.id]=!0,s[t.id]=!0}),i.each(function(t){var e=t.coordinateSystem,i=[];uA(e.getCartesians(),function(t,e){(0<=hA(o,t.getAxis("x").model)||0<=hA(a,t.getAxis("y").model))&&i.push(t)}),n.push({panelId:"grid--"+t.id,gridModel:t,coordSysModel:t,coordSys:i[0],coordSyses:i,getPanelRect:_A.grid,xAxisDeclared:r[t.id],yAxisDeclared:s[t.id]})}))},geo:function(t,i){uA(t.geoModels,function(t){var e=t.coordinateSystem;i.push({panelId:"geo--"+t.id,geoModel:t,coordSysModel:t,coordSys:e,coordSyses:[e],getPanelRect:_A.geo})})}},xA=[function(t,e){var i=t.xAxisModel,n=t.yAxisModel,o=t.gridModel;return!o&&i&&(o=i.axis.grid.model),!o&&n&&(o=n.axis.grid.model),o&&o===e.gridModel},function(t,e){var i=t.geoModel;return i&&i===e.geoModel}],_A={grid:function(){return this.coordSys.grid.getRect().clone()},geo:function(){var t=this.coordSys,e=t.getBoundingRect().clone();return e.applyTransform(ul(t)),e}},wA={lineX:cA(bA,0),lineY:cA(bA,1),rect:function(t,e,i){var n=e[dA[t]]([i[0][0],i[1][0]]),o=e[dA[t]]([i[0][1],i[1][1]]),a=[mA([n[0],o[0]]),mA([n[1],o[1]])];return{values:a,xyMinMax:a}},polygon:function(i,n,t){var o=[[1/0,-1/0],[1/0,-1/0]];return{values:N(t,function(t){var e=n[dA[i]](t);return o[0][0]=Math.min(o[0][0],e[0]),o[1][0]=Math.min(o[1][0],e[1]),o[0][1]=Math.max(o[0][1],e[0]),o[1][1]=Math.max(o[1][1],e[1]),e}),xyMinMax:o}}};function bA(t,e,i,n){var o=i.getAxis(["x","y"][t]),a=mA(N([0,1],function(t){return e?o.coordToData(o.toLocalCoord(n[t])):o.toGlobalCoord(o.dataToCoord(n[t]))})),r=[];return r[t]=a,r[1-t]=[NaN,NaN],{values:a,xyMinMax:r}}var SA={lineX:cA(MA,0),lineY:cA(MA,1),rect:function(t,e,i){return[[t[0][0]-i[0]*e[0][0],t[0][1]-i[0]*e[0][1]],[t[1][0]-i[1]*e[1][0],t[1][1]-i[1]*e[1][1]]]},polygon:function(t,i,n){return N(t,function(t,e){return[t[0]-n[0]*i[e][0],t[1]-n[1]*i[e][1]]})}};function MA(t,e,i,n){return[e[0]-n[t]*i[0],e[1]-n[t]*i[1]]}function IA(t){return t?[t[0][1]-t[0][0],t[1][1]-t[1][0]]:[NaN,NaN]}var TA=E,AA="\0_ec_hist_store";function DA(t){var e=t[AA];return e=e||(t[AA]=[{}])}Tu.registerSubTypeDefaulter("dataZoom",function(){return"slider"});var CA=["cartesian2d","polar","singleAxis"];var LA,kA,PA,NA,OA=(kA=["axisIndex","axis","index","id"],PA=N(LA=(LA=["x","y","z","radius","angle","single"]).slice(),uu),NA=N(kA=(kA||[]).slice(),uu),function(o,a){E(LA,function(t,e){for(var i={name:t,capital:PA[e]},n=0;n<kA.length;n++)i[kA[n]]=t+NA[n];o.call(a,i)})});function EA(o,a,r){return function(t){var e,i={nodes:[],records:{}};if(a(function(t){i.records[t.name]={}}),!t)return i;for(s(t,i);e=!1,o(n),e;);function n(t){!function(t,e){return 0<=_(e.nodes,t)}(t,i)&&function(t,i){var n=!1;return a(function(e){E(r(t,e)||[],function(t){i.records[e.name][t]&&(n=!0)})}),n}(t,i)&&(s(t,i),e=!0)}return i};function s(t,i){i.nodes.push(t),a(function(e){E(r(t,e)||[],function(t){i.records[e.name][t]=!0})})}}function zA(t,e,i,n){this._dimName=t,this._axisIndex=e,this._valueWindow,this._percentWindow,this._dataExtent,this._minMaxSpan,this.ecModel=n,this._dataZoomModel=i}var RA=E,BA=Ol;function VA(t,e){var i=t.getAxisModel(),n=t._percentWindow,o=t._valueWindow;if(n){var a=Rl(o,[0,500]);a=Math.min(a,20);var r=e||0===n[0]&&100===n[1];i.setRange(r?null:+o[0].toFixed(a),r?null:+o[1].toFixed(a))}}zA.prototype={constructor:zA,hostedBy:function(t){return this._dataZoomModel===t},getDataValueWindow:function(){return this._valueWindow.slice()},getDataPercentWindow:function(){return this._percentWindow.slice()},getTargetSeriesModels:function(){var n=[],o=this.ecModel;return o.eachSeries(function(t){if(function(t){return 0<=_(CA,t)}(t.get("coordinateSystem"))){var e=this._dimName,i=o.queryComponents({mainType:e+"Axis",index:t.get(e+"AxisIndex"),id:t.get(e+"AxisId")})[0];this._axisIndex===(i&&i.componentIndex)&&n.push(t)}},this),n},getAxisModel:function(){return this.ecModel.getComponent(this._dimName+"Axis",this._axisIndex)},getOtherAxisModel:function(){var t,e,i,n=this._dimName,o=this.ecModel,a=this.getAxisModel();return t="x"===n||"y"===n?(e="gridIndex","x"===n?"y":"x"):(e="polarIndex","angle"===n?"radius":"angle"),o.eachComponent(t+"Axis",function(t){(t.get(e)||0)===(a.get(e)||0)&&(i=t)}),i},getMinMaxSpan:function(){return D(this._minMaxSpan)},calculateDataWindow:function(o){var a,r=this._dataExtent,s=this.getAxisModel().axis.scale,l=this._dataZoomModel.getRangePropMode(),u=[0,100],h=[],c=[];RA(["start","end"],function(t,e){var i=o[t],n=o[t+"Value"];"percent"===l[e]?(null==i&&(i=u[e]),n=s.parse(kl(i,u,r))):(a=!0,i=kl(n=null==n?r[e]:s.parse(n),r,u)),c[e]=n,h[e]=i}),BA(c),BA(h);var d=this._minMaxSpan;function t(t,e,i,n,o){var a=o?"Span":"ValueSpan";Ww(0,t,i,"all",d["min"+a],d["max"+a]);for(var r=0;r<2;r++)e[r]=kl(t[r],i,n,!0),o&&(e[r]=s.parse(e[r]))}return a?t(c,h,r,u,!1):t(h,c,u,r,!0),{valueWindow:c,percentWindow:h}},reset:function(t){if(t===this._dataZoomModel){var e=this.getTargetSeriesModels();this._dataExtent=function(t,e,i){var n=[1/0,-1/0];RA(i,function(t){var i=t.getData();i&&RA(i.mapDimension(e,!0),function(t){var e=i.getApproximateExtent(t);e[0]<n[0]&&(n[0]=e[0]),e[1]>n[1]&&(n[1]=e[1])})}),n[1]<n[0]&&(n=[NaN,NaN]);return function(t,e){var i=t.getAxisModel(),n=i.getMin(!0),o="category"===i.get("type"),a=o&&i.getCategories().length;null!=n&&"dataMin"!==n&&"function"!=typeof n?e[0]=n:o&&(e[0]=0<a?0:NaN);var r=i.getMax(!0);null!=r&&"dataMax"!==r&&"function"!=typeof r?e[1]=r:o&&(e[1]=0<a?a-1:NaN);i.get("scale",!0)||(0<e[0]&&(e[0]=0),e[1]<0&&(e[1]=0))}(t,n),n}(this,this._dimName,e),function(n){var o=n._minMaxSpan={},a=n._dataZoomModel,r=n._dataExtent;RA(["min","max"],function(t){var e=a.get(t+"Span"),i=a.get(t+"ValueSpan");null!=i&&(i=n.getAxisModel().axis.scale.parse(i)),null!=i?e=kl(r[0]+i,r,[0,100],!0):null!=e&&(i=kl(e,[0,100],r,!0)-r[0]),o[t+"Span"]=e,o[t+"ValueSpan"]=i})}(this);var i=this.calculateDataWindow(t.settledOption);this._valueWindow=i.valueWindow,this._percentWindow=i.percentWindow,VA(this)}},restore:function(t){t===this._dataZoomModel&&(this._valueWindow=this._percentWindow=null,VA(this,!0))},filterData:function(t,e){if(t===this._dataZoomModel){var n=this._dimName,i=this.getTargetSeriesModels(),o=t.get("filterMode"),c=this._valueWindow;"none"!==o&&RA(i,function(i){var u=i.getData(),h=u.mapDimension(n,!0);h.length&&("weakFilter"===o?u.filterSelf(function(t){for(var e,i,n,o=0;o<h.length;o++){var a=u.get(h[o],t),r=!isNaN(a),s=a<c[0],l=a>c[1];if(r&&!s&&!l)return!0;r&&(n=!0),s&&(e=!0),l&&(i=!0)}return n&&e&&i}):RA(h,function(t){if("empty"===o)i.setData(u=u.map(t,function(t){return function(t){return t>=c[0]&&t<=c[1]}(t)?t:NaN}));else{var e={};e[t]=c,u.selectRange(e)}}),RA(h,function(t){u.setApproximateExtent(c,t)}))})}}};var GA=E,FA=OA,WA=wf({type:"dataZoom",dependencies:["xAxis","yAxis","zAxis","radiusAxis","angleAxis","singleAxis","series"],defaultOption:{zlevel:0,z:4,orient:null,xAxisIndex:null,yAxisIndex:null,filterMode:"filter",throttle:null,start:0,end:100,startValue:null,endValue:null,minSpan:null,maxSpan:null,minValueSpan:null,maxValueSpan:null,rangeMode:null},init:function(t,e,i){this._dataIntervalByAxis={},this._dataInfo={},this._axisProxies={},this.textStyleModel,this._autoThrottle=!0,this._rangePropMode=["percent","percent"];var n=HA(t);this.settledOption=n,this.mergeDefaultAndTheme(t,i),this.doInit(n)},mergeOption:function(t){var e=HA(t);m(this.option,t,!0),m(this.settledOption,e,!0),this.doInit(e)},doInit:function(t){var i=this.option;v.canvasSupported||(i.realtime=!1),this._setDefaultThrottle(t),ZA(this,t);var n=this.settledOption;GA([["start","startValue"],["end","endValue"]],function(t,e){"value"===this._rangePropMode[e]&&(i[t[0]]=n[t[0]]=null)},this),this.textStyleModel=this.getModel("textStyle"),this._resetTarget(),this._giveAxisProxies()},_giveAxisProxies:function(){var r=this._axisProxies;this.eachTargetAxis(function(t,e,i,n){var o=this.dependentModels[t.axis][e],a=o.__dzAxisProxy||(o.__dzAxisProxy=new zA(t.name,e,this,n));r[t.name+"_"+e]=a},this)},_resetTarget:function(){var i=this.option,t=this._judgeAutoMode();FA(function(t){var e=t.axisIndex;i[e]=Eo(i[e])},this),"axisIndex"===t?this._autoSetAxisIndex():"orient"===t&&this._autoSetOrient()},_judgeAutoMode:function(){var e=this.option,i=!1;FA(function(t){null!=e[t.axisIndex]&&(i=!0)},this);var t=e.orient;return null==t&&i?"orient":i?void 0:(null==t&&(e.orient="horizontal"),"axisIndex")},_autoSetAxisIndex:function(){var a=!0,e=this.get("orient",!0),r=this.option,t=this.dependentModels;if(a){var i="vertical"===e?"y":"x";t[i+"Axis"].length?(r[i+"AxisIndex"]=[0],a=!1):GA(t.singleAxis,function(t){a&&t.get("orient",!0)===e&&(r.singleAxisIndex=[t.componentIndex],a=!1)})}a&&FA(function(t){if(a){var e=[],i=this.dependentModels[t.axis];if(i.length&&!e.length)for(var n=0,o=i.length;n<o;n++)"category"===i[n].get("type")&&e.push(n);(r[t.axisIndex]=e).length&&(a=!1)}},this),a&&this.ecModel.eachSeries(function(o){this._isSeriesHasAllAxesTypeOf(o,"value")&&FA(function(t){var e=r[t.axisIndex],i=o.get(t.axisIndex),n=o.get(t.axisId);_(e,i=o.ecModel.queryComponents({mainType:t.axis,index:i,id:n})[0].componentIndex)<0&&e.push(i)})},this)},_autoSetOrient:function(){var e;this.eachTargetAxis(function(t){e=e||t.name},this),this.option.orient="y"===e?"vertical":"horizontal"},_isSeriesHasAllAxesTypeOf:function(n,o){var a=!0;return FA(function(t){var e=n.get(t.axisIndex),i=this.dependentModels[t.axis][e];i&&i.get("type")===o||(a=!1)},this),a},_setDefaultThrottle:function(t){if(t.hasOwnProperty("throttle")&&(this._autoThrottle=!1),this._autoThrottle){var e=this.ecModel.option;this.option.throttle=e.animation&&0<e.animationDurationUpdate?100:20}},getFirstTargetAxisModel:function(){var i;return FA(function(t){if(null==i){var e=this.get(t.axisIndex);e.length&&(i=this.dependentModels[t.axis][e[0]])}},this),i},eachTargetAxis:function(i,n){var o=this.ecModel;FA(function(e){GA(this.get(e.axisIndex),function(t){i.call(n,e,t,this,o)},this)},this)},getAxisProxy:function(t,e){return this._axisProxies[t+"_"+e]},getAxisModel:function(t,e){var i=this.getAxisProxy(t,e);return i&&i.getAxisModel()},setRawRange:function(e){var i=this.option,n=this.settledOption;GA([["start","startValue"],["end","endValue"]],function(t){null==e[t[0]]&&null==e[t[1]]||(i[t[0]]=n[t[0]]=e[t[0]],i[t[1]]=n[t[1]]=e[t[1]])},this),ZA(this,e)},setCalculatedRange:function(e){var i=this.option;GA(["start","startValue","end","endValue"],function(t){i[t]=e[t]})},getPercentRange:function(){var t=this.findRepresentativeAxisProxy();if(t)return t.getDataPercentWindow()},getValueRange:function(t,e){if(null!=t||null!=e)return this.getAxisProxy(t,e).getDataValueWindow();var i=this.findRepresentativeAxisProxy();return i?i.getDataValueWindow():void 0},findRepresentativeAxisProxy:function(t){if(t)return t.__dzAxisProxy;var e=this._axisProxies;for(var i in e)if(e.hasOwnProperty(i)&&e[i].hostedBy(this))return e[i];for(var i in e)if(e.hasOwnProperty(i)&&!e[i].hostedBy(this))return e[i]},getRangePropMode:function(){return this._rangePropMode.slice()}});function HA(e){var i={};return GA(["start","end","startValue","endValue","throttle"],function(t){e.hasOwnProperty(t)&&(i[t]=e[t])}),i}function ZA(t,o){var a=t._rangePropMode,r=t.get("rangeMode");GA([["start","startValue"],["end","endValue"]],function(t,e){var i=null!=o[t[0]],n=null!=o[t[1]];i&&!n?a[e]="percent":!i&&n?a[e]="value":r?a[e]=r[e]:i&&(a[e]="percent")})}var UA=hc.extend({type:"dataZoom",render:function(t,e,i,n){this.dataZoomModel=t,this.ecModel=e,this.api=i},getTargetCoordInfo:function(){var t=this.dataZoomModel,o=this.ecModel,a={};return t.eachTargetAxis(function(t,e){var i=o.getComponent(t.axis,e);if(i){var n=i.getCoordSysModel();n&&function(t,e,i,n){for(var o,a=0;a<i.length;a++)if(i[a].model===t){o=i[a];break}o||i.push(o={model:t,axisModels:[],coordIndex:n});o.axisModels.push(e)}(n,i,a[n.mainType]||(a[n.mainType]=[]),n.componentIndex)}},this),a}});WA.extend({type:"dataZoom.select"}),UA.extend({type:"dataZoom.select"}),pf({getTargetSeries:function(t){var n=Q();return t.eachComponent("dataZoom",function(t){t.eachTargetAxis(function(t,e,i){E(i.getAxisProxy(t.name,e).getTargetSeriesModels(),function(t){n.set(t.uid,t)})})}),n},modifyOutputEnd:!0,overallReset:function(t,n){t.eachComponent("dataZoom",function(t){t.eachTargetAxis(function(t,e,i){i.getAxisProxy(t.name,e).reset(i,n)}),t.eachTargetAxis(function(t,e,i){i.getAxisProxy(t.name,e).filterData(i,n)})}),t.eachComponent("dataZoom",function(t){var e=t.findRepresentativeAxisProxy(),i=e.getDataPercentWindow(),n=e.getDataValueWindow();t.setCalculatedRange({start:i[0],end:i[1],startValue:n[0],endValue:n[1]})})}}),gf("dataZoom",function(i,t){var n=EA(A(t.eachComponent,t,"dataZoom"),OA,function(t,e){return t.get(e.axisIndex)}),o=[];t.eachComponent({mainType:"dataZoom",query:i},function(t,e){o.push.apply(o,n(t).nodes)}),E(o,function(t,e){t.setRawRange({start:i.start,end:i.end,startValue:i.startValue,endValue:i.endValue})})});var XA=Cc.toolbox.dataZoom,YA=E;function jA(t,e,i){(this._brushController=new gb(i.getZr())).on("brush",A(this._onBrush,this)).mount(),this._isZoomActive}jA.defaultOption={show:!0,filterMode:"filter",icon:{zoom:"M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1",back:"M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26"},title:D(XA.title)};var qA=jA.prototype;qA.render=function(t,e,i,n){this.model=t,this.ecModel=e,this.api=i,function(t,e,i,n,o){var a=i._isZoomActive;n&&"takeGlobalCursor"===n.type&&(a="dataZoomSelect"===n.key&&n.dataZoomSelectActive);i._isZoomActive=a,t.setIconStatus("zoom",a?"emphasis":"normal");var r=new pA($A(t.option),e,{include:["grid"]});i._brushController.setPanels(r.makePanelOpts(o,function(t){return t.xAxisDeclared&&!t.yAxisDeclared?"lineX":!t.xAxisDeclared&&t.yAxisDeclared?"lineY":"rect"})).enableBrush(!!a&&{brushType:"auto",brushStyle:{lineWidth:0,fill:"rgba(0,0,0,0.2)"}})}(t,e,this,n,i),function(t,e){t.setIconStatus("back",1<function(t){return DA(t).length}(e)?"emphasis":"normal")}(t,e)},qA.onclick=function(t,e,i){KA[i].call(this)},qA.remove=function(t,e){this._brushController.unmount()},qA.dispose=function(t,e){this._brushController.dispose()};var KA={zoom:function(){var t=!this._isZoomActive;this.api.dispatchAction({type:"takeGlobalCursor",key:"dataZoomSelect",dataZoomSelectActive:t})},back:function(){this._dispatchZoomAction(function(t){var n=DA(t),e=n[n.length-1];1<n.length&&n.pop();var o={};return TA(e,function(t,e){for(var i=n.length-1;0<=i;i--){if(t=n[i][e]){o[e]=t;break}}}),o}(this.ecModel))}};function $A(e){var i={};return E(["xAxisIndex","yAxisIndex"],function(t){i[t]=e[t],null==i[t]&&(i[t]="all"),!1!==i[t]&&"none"!==i[t]||(i[t]=[])}),i}qA._onBrush=function(t,e){if(e.isEnd&&t.length){var s={},l=this.ecModel;this._brushController.updateCovers([]),new pA($A(this.model.option),l,{include:["grid"]}).matchOutputRanges(t,l,function(t,e,i){if("cartesian2d"===i.type){var n=t.brushType;"rect"===n?(o("x",i,e[0]),o("y",i,e[1])):o({lineX:"x",lineY:"y"}[n],i,e)}}),function(a,t){var r=DA(a);TA(t,function(t,e){for(var i=r.length-1;0<=i;i--){if(r[i][e])break}if(i<0){var n=a.queryComponents({mainType:"dataZoom",subType:"select",id:e})[0];if(n){var o=n.getPercentRange();r[0][e]={dataZoomId:e,start:o[0],end:o[1]}}}}),r.push(t)}(l,s),this._dispatchZoomAction(s)}function o(t,e,i){var n=e.getAxis(t),o=n.model,a=function(e,i,t){var n;return t.eachComponent({mainType:"dataZoom",subType:"select"},function(t){t.getAxisModel(e,i.componentIndex)&&(n=t)}),n}(t,o,l),r=a.findRepresentativeAxisProxy(o).getMinMaxSpan();null==r.minValueSpan&&null==r.maxValueSpan||(i=Ww(0,i.slice(),n.scale.getExtent(),0,r.minValueSpan,r.maxValueSpan)),a&&(s[a.id]={dataZoomId:a.id,startValue:i[0],endValue:i[1]})}},qA._dispatchZoomAction=function(t){var i=[];YA(t,function(t,e){i.push(D(t))}),i.length&&this.api.dispatchAction({type:"dataZoom",from:this.uid,batch:i})},HT("dataZoom",jA),ff(function(s){if(s){var l=s.dataZoom||(s.dataZoom=[]);k(l)||(s.dataZoom=l=[l]);var t=s.toolbox;if(t&&(k(t)&&(t=t[0]),t&&t.feature)){var e=t.feature.dataZoom;i("xAxis",e),i("yAxis",e)}}function i(n,o){if(o){var a=n+"Index",r=o[a];null==r||"all"===r||k(r)||(r=!1===r||"none"===r?[]:[r]),function(t,e){var i=s[t];k(i)||(i=i?[i]:[]);YA(i,e)}(n,function(t,e){if(null==r||"all"===r||-1!==_(r,e)){var i={type:"select",$fromToolbox:!0,filterMode:o.filterMode||"filter",id:"\0_ec_\0toolbox-dataZoom_"+n+e};i[a]=e,l.push(i)}})}}});var JA=Cc.toolbox.restore;function QA(t){this.model=t}QA.defaultOption={show:!0,icon:"M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5",title:JA.title},QA.prototype.onclick=function(t,e,i){!function(t){t[AA]=null}(t),e.dispatchAction({type:"restore",from:this.uid})},HT("restore",QA),gf({type:"restore",event:"restore",update:"prepareAndUpdate"},function(t,e){e.resetOption("recreate")}),wf({type:"tooltip",dependencies:["axisPointer"],defaultOption:{zlevel:0,z:60,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove|click",alwaysShowContent:!1,displayMode:"single",renderMode:"auto",confine:!1,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"rgba(50,50,50,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:"auto",animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",crossStyle:{color:"#999",width:1,type:"dashed",textStyle:{}}},textStyle:{color:"#fff",fontSize:14}}});var tD=E,eD=$l,iD=["","-webkit-","-moz-","-o-"];function nD(o){var a=[],t=o.get("transitionDuration"),e=o.get("backgroundColor"),i=o.getModel("textStyle"),n=o.get("padding");return t&&a.push(function(t){var e="cubic-bezier(0.23, 1, 0.32, 1)",i="left "+t+"s "+e+",top "+t+"s "+e;return N(iD,function(t){return t+"transition:"+i}).join(";")}(t)),e&&(v.canvasSupported?a.push("background-Color:"+e):(a.push("background-Color:#"+Ge(e)),a.push("filter:alpha(opacity=70)"))),tD(["width","color","radius"],function(t){var e="border-"+t,i=eD(e),n=o.get(i);null!=n&&a.push(e+":"+n+("color"===t?"":"px"))}),a.push(function(i){var n=[],t=i.get("fontSize"),e=i.getTextColor();return e&&n.push("color:"+e),n.push("font:"+i.getFont()),t&&n.push("line-height:"+Math.round(3*t/2)+"px"),tD(["decoration","align"],function(t){var e=i.get(t);e&&n.push("text-"+t+":"+e)}),n.join(";")}(i)),null!=n&&a.push("padding:"+Jl(n).join("px ")+"px"),a.join(";")+";"}function oD(i,t){if(v.wxa)return null;var e=document.createElement("div"),n=this._zr=t.getZr();this.el=e,this._x=t.getWidth()/2,this._y=t.getHeight()/2,i.appendChild(e),this._container=i,this._show=!1,this._hideTimeout;var o=this;e.onmouseenter=function(){o._enterable&&(clearTimeout(o._hideTimeout),o._show=!0),o._inContent=!0},e.onmousemove=function(t){if(t=t||window.event,!o._enterable){var e=n.handler;Gt(i,t,!0),e.dispatch("mousemove",t)}},e.onmouseleave=function(){o._enterable&&o._show&&o.hideLater(o._hideDelay),o._inContent=!1}}function aD(t){this._zr=t.getZr(),this._show=!1,this._hideTimeout}oD.prototype={constructor:oD,_enterable:!0,update:function(){var t=this._container,e=t.currentStyle||document.defaultView.getComputedStyle(t),i=t.style;"absolute"!==i.position&&"absolute"!==e.position&&(i.position="relative")},show:function(t){clearTimeout(this._hideTimeout);var e=this.el;e.style.cssText="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;"+nD(t)+";left:"+this._x+"px;top:"+this._y+"px;"+(t.get("extraCssText")||""),e.style.display=e.innerHTML?"block":"none",e.style.pointerEvents=this._enterable?"auto":"none",this._show=!0},setContent:function(t){this.el.innerHTML=null==t?"":t},setEnterable:function(t){this._enterable=t},getSize:function(){var t=this.el;return[t.clientWidth,t.clientHeight]},moveTo:function(t,e){var i,n=this._zr;n&&n.painter&&(i=n.painter.getViewportRootOffset())&&(t+=i.offsetLeft,e+=i.offsetTop);var o=this.el.style;o.left=t+"px",o.top=e+"px",this._x=t,this._y=e},hide:function(){this.el.style.display="none",this._show=!1},hideLater:function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(A(this.hide,this),t)):this.hide())},isShow:function(){return this._show},getOuterSize:function(){var t=this.el.clientWidth,e=this.el.clientHeight;if(document.defaultView&&document.defaultView.getComputedStyle){var i=document.defaultView.getComputedStyle(this.el);i&&(t+=parseInt(i.borderLeftWidth,10)+parseInt(i.borderRightWidth,10),e+=parseInt(i.borderTopWidth,10)+parseInt(i.borderBottomWidth,10))}return{width:t,height:e}}},aD.prototype={constructor:aD,_enterable:!0,update:function(){},show:function(t){this._hideTimeout&&clearTimeout(this._hideTimeout),this.el.attr("show",!0),this._show=!0},setContent:function(t,e,i){this.el&&this._zr.remove(this.el);for(var n={},o=t,a="{marker",r=o.indexOf(a);0<=r;){var s=o.indexOf("|}"),l=o.substr(r+a.length,s-r-a.length);-1<l.indexOf("sub")?n["marker"+l]={textWidth:4,textHeight:4,textBorderRadius:2,textBackgroundColor:e[l],textOffset:[3,0]}:n["marker"+l]={textWidth:10,textHeight:10,textBorderRadius:5,textBackgroundColor:e[l]},r=(o=o.substr(s+1)).indexOf("{marker")}this.el=new Fr({style:{rich:n,text:t,textLineHeight:20,textBackgroundColor:i.get("backgroundColor"),textBorderRadius:i.get("borderRadius"),textFill:i.get("textStyle.color"),textPadding:i.get("padding")},z:i.get("z")}),this._zr.add(this.el);var u=this;this.el.on("mouseover",function(){u._enterable&&(clearTimeout(u._hideTimeout),u._show=!0),u._inContent=!0}),this.el.on("mouseout",function(){u._enterable&&u._show&&u.hideLater(u._hideDelay),u._inContent=!1})},setEnterable:function(t){this._enterable=t},getSize:function(){var t=this.el.getBoundingRect();return[t.width,t.height]},moveTo:function(t,e){this.el&&this.el.attr("position",[t,e])},hide:function(){this.el&&this.el.hide(),this._show=!1},hideLater:function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(A(this.hide,this),t)):this.hide())},isShow:function(){return this._show},getOuterSize:function(){var t=this.getSize();return{width:t[0],height:t[1]}}};var rD=A,sD=E,lD=Pl,uD=new is({shape:{x:-1,y:-1,width:2,height:2}});function hD(t){for(var e=t.pop();t.length;){var i=t.pop();i&&(Il.isInstance(i)&&(i=i.get("tooltip",!0)),"string"==typeof i&&(i={formatter:i}),e=new Il(i,e,e.ecModel))}return e}function cD(t,e){return t.dispatchAction||A(e.dispatchAction,e)}function dD(t){return"center"===t||"middle"===t}bf({type:"tooltip",init:function(t,e){if(!v.node){var i,n=t.getComponent("tooltip").get("renderMode");this._renderMode=qo(n),"html"===this._renderMode?(i=new oD(e.getDom(),e),this._newLine="<br/>"):(i=new aD(e),this._newLine="\n"),this._tooltipContent=i}},render:function(t,e,i){if(!v.node){this.group.removeAll(),this._tooltipModel=t,this._ecModel=e,this._api=i,this._lastDataByCoordSys=null,this._alwaysShowContent=t.get("alwaysShowContent");var n=this._tooltipContent;n.update(),n.setEnterable(t.get("enterable")),this._initGlobalListener(),this._keepShow()}},_initGlobalListener:function(){var n=this._tooltipModel.get("triggerOn");QM("itemTooltip",this._api,rD(function(t,e,i){"none"!==n&&(0<=n.indexOf(t)?this._tryShow(e,i):"leave"===t&&this._hide(i))},this))},_keepShow:function(){var t=this._tooltipModel,e=this._ecModel,i=this._api;if(null!=this._lastX&&null!=this._lastY&&"none"!==t.get("triggerOn")){var n=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout(function(){i.isDisposed()||n.manuallyShowTip(t,e,i,{x:n._lastX,y:n._lastY})})}},manuallyShowTip:function(t,e,i,n){if(n.from!==this.uid&&!v.node){var o=cD(n,i);this._ticket="";var a=n.dataByCoordSys;if(n.tooltip&&null!=n.x&&null!=n.y){var r=uD;r.position=[n.x,n.y],r.update(),r.tooltip=n.tooltip,this._tryShow({offsetX:n.x,offsetY:n.y,target:r},o)}else if(a)this._tryShow({offsetX:n.x,offsetY:n.y,position:n.position,event:{},dataByCoordSys:n.dataByCoordSys,tooltipOption:n.tooltipOption},o);else if(null!=n.seriesIndex){if(this._manuallyAxisShowTip(t,e,i,n))return;var s=WM(n,e),l=s.point[0],u=s.point[1];null!=l&&null!=u&&this._tryShow({offsetX:l,offsetY:u,position:n.position,target:s.el,event:{}},o)}else null!=n.x&&null!=n.y&&(i.dispatchAction({type:"updateAxisPointer",x:n.x,y:n.y}),this._tryShow({offsetX:n.x,offsetY:n.y,position:n.position,target:i.getZr().findHover(n.x,n.y).target,event:{}},o))}},manuallyHideTip:function(t,e,i,n){var o=this._tooltipContent;!this._alwaysShowContent&&this._tooltipModel&&o.hideLater(this._tooltipModel.get("hideDelay")),this._lastX=this._lastY=null,n.from!==this.uid&&this._hide(cD(n,i))},_manuallyAxisShowTip:function(t,e,i,n){var o=n.seriesIndex,a=n.dataIndex,r=e.getComponent("axisPointer").coordSysAxesInfo;if(null!=o&&null!=a&&null!=r){var s=e.getSeriesByIndex(o);if(s)if("axis"===(t=hD([s.getData().getItemModel(a),s,(s.coordinateSystem||{}).model,t])).get("trigger"))return i.dispatchAction({type:"updateAxisPointer",seriesIndex:o,dataIndex:a,position:n.position}),!0}},_tryShow:function(t,e){var i=t.target;if(this._tooltipModel){this._lastX=t.offsetX,this._lastY=t.offsetY;var n=t.dataByCoordSys;n&&n.length?this._showAxisTooltip(n,t):i&&null!=i.dataIndex?(this._lastDataByCoordSys=null,this._showSeriesItemTooltip(t,i,e)):i&&i.tooltip?(this._lastDataByCoordSys=null,this._showComponentItemTooltip(t,i,e)):(this._lastDataByCoordSys=null,this._hide(e))}},_showOrMove:function(t,e){var i=t.get("showDelay");e=A(e,this),clearTimeout(this._showTimout),0<i?this._showTimout=setTimeout(e,i):e()},_showAxisTooltip:function(t,e){var d=this._ecModel,i=this._tooltipModel,n=[e.offsetX,e.offsetY],o=[],f=[],a=hD([e.tooltipOption,i]),p=this._renderMode,r=this._newLine,g={};sD(t,function(t){sD(t.dataByAxis,function(s){var l=d.getComponent(s.axisDim+"Axis",s.axisIndex),u=s.value,h=[];if(l&&null!=u){var c=pI(u,l.axis,d,s.seriesDataIndices,s.valueLabelOpt);E(s.seriesDataIndices,function(t){var e=d.getSeriesByIndex(t.seriesIndex),i=t.dataIndexInside,n=e&&e.getDataParams(i);if(n.axisDim=s.axisDim,n.axisIndex=s.axisIndex,n.axisType=s.axisType,n.axisId=s.axisId,n.axisValue=og(l.axis,u),n.axisValueLabel=c,n){f.push(n);var o,a=e.formatTooltip(i,!0,null,p);if(R(a)){o=a.html;var r=a.markers;m(g,r)}else o=a;h.push(o)}});var t=c;"html"!==p?o.push(h.join(r)):o.push((t?eu(t)+r:"")+h.join(r))}})},this),o.reverse(),o=o.join(this._newLine+this._newLine);var s=e.position;this._showOrMove(a,function(){this._updateContentNotChangedOnAxis(t)?this._updatePosition(a,s,n[0],n[1],this._tooltipContent,f):this._showTooltipContent(a,o,f,Math.random(),n[0],n[1],s,void 0,g)})},_showSeriesItemTooltip:function(t,e,i){var n=this._ecModel,o=e.seriesIndex,a=n.getSeriesByIndex(o),r=e.dataModel||a,s=e.dataIndex,l=e.dataType,u=r.getData(),h=hD([u.getItemModel(s),r,a&&(a.coordinateSystem||{}).model,this._tooltipModel]),c=h.get("trigger");if(null==c||"item"===c){var d,f,p=r.getDataParams(s,l),g=r.formatTooltip(s,!1,l,this._renderMode);f=R(g)?(d=g.html,g.markers):(d=g,null);var m="item_"+r.name+"_"+s;this._showOrMove(h,function(){this._showTooltipContent(h,d,p,m,t.offsetX,t.offsetY,t.position,t.target,f)}),i({type:"showTip",dataIndexInside:s,dataIndex:u.getRawIndex(s),seriesIndex:o,from:this.uid})}},_showComponentItemTooltip:function(t,e,i){var n=e.tooltip;if("string"==typeof n){n={content:n,formatter:n}}var o=new Il(n,this._tooltipModel,this._ecModel),a=o.get("content"),r=Math.random();this._showOrMove(o,function(){this._showTooltipContent(o,a,o.get("formatterParams")||{},r,t.offsetX,t.offsetY,t.position,e)}),i({type:"showTip",from:this.uid})},_showTooltipContent:function(i,t,n,e,o,a,r,s,l){if(this._ticket="",i.get("showContent")&&i.get("show")){var u=this._tooltipContent,h=i.get("formatter");r=r||i.get("position");var c=t;if(h&&"string"==typeof h)c=ou(h,n,!0);else if("function"==typeof h){var d=rD(function(t,e){t===this._ticket&&(u.setContent(e,l,i),this._updatePosition(i,r,o,a,u,n,s))},this);this._ticket=e,c=h(n,e,d)}u.setContent(c,l,i),u.show(i),this._updatePosition(i,r,o,a,u,n,s)}},_updatePosition:function(t,e,i,n,o,a,r){var s=this._api.getWidth(),l=this._api.getHeight();e=e||t.get("position");var u=o.getSize(),h=t.get("align"),c=t.get("verticalAlign"),d=r&&r.getBoundingRect().clone();if(r&&d.applyTransform(r.transform),"function"==typeof e&&(e=e([i,n],a,o.el,d,{viewSize:[s,l],contentSize:u.slice()})),k(e))i=lD(e[0],s),n=lD(e[1],l);else if(R(e)){e.width=u[0],e.height=u[1];var f=vu(e,{width:s,height:l});i=f.x,n=f.y,c=h=null}else if("string"==typeof e&&r){i=(p=function(t,e,i){var n=i[0],o=i[1],a=0,r=0,s=e.width,l=e.height;switch(t){case"inside":a=e.x+s/2-n/2,r=e.y+l/2-o/2;break;case"top":a=e.x+s/2-n/2,r=e.y-o-5;break;case"bottom":a=e.x+s/2-n/2,r=e.y+l+5;break;case"left":a=e.x-n-5,r=e.y+l/2-o/2;break;case"right":a=e.x+s+5,r=e.y+l/2-o/2}return[a,r]}(e,d,u))[0],n=p[1]}else{var p;i=(p=function(t,e,i,n,o,a,r){var s=i.getOuterSize(),l=s.width,u=s.height;null!=a&&(n<t+l+a?t-=l+a:t+=a);null!=r&&(o<e+u+r?e-=u+r:e+=r);return[t,e]}(i,n,o,s,l,h?null:20,c?null:20))[0],n=p[1]}h&&(i-=dD(h)?u[0]/2:"right"===h?u[0]:0),c&&(n-=dD(c)?u[1]/2:"bottom"===c?u[1]:0),t.get("confine")&&(i=(p=function(t,e,i,n,o){var a=i.getOuterSize(),r=a.width,s=a.height;return t=Math.min(t+r,n)-r,e=Math.min(e+s,o)-s,t=Math.max(t,0),e=Math.max(e,0),[t,e]}(i,n,o,s,l))[0],n=p[1]);o.moveTo(i,n)},_updateContentNotChangedOnAxis:function(n){var t=this._lastDataByCoordSys,r=!!t&&t.length===n.length;return r&&sD(t,function(t,e){var i=t.dataByAxis||{},a=(n[e]||{}).dataByAxis||[];(r&=i.length===a.length)&&sD(i,function(t,e){var i=a[e]||{},n=t.seriesDataIndices||[],o=i.seriesDataIndices||[];(r&=t.value===i.value&&t.axisType===i.axisType&&t.axisId===i.axisId&&n.length===o.length)&&sD(n,function(t,e){var i=o[e];r&=t.seriesIndex===i.seriesIndex&&t.dataIndex===i.dataIndex})})}),this._lastDataByCoordSys=n,!!r},_hide:function(t){this._lastDataByCoordSys=null,t({type:"hideTip",from:this.uid})},dispose:function(t,e){v.node||(this._tooltipContent.hide(),iI("itemTooltip",e))}}),gf({type:"showTip",event:"showTip",update:"tooltip:manuallyShowTip"},function(){}),gf({type:"hideTip",event:"hideTip",update:"tooltip:manuallyHideTip"},function(){});var fD=["rect","polygon","keep","clear"];var pD=E;function gD(t){if(t)for(var e in t)if(t.hasOwnProperty(e))return!0}function mD(t,e,a){var i={};return pD(e,function(n){var o=i[n]=function(){function t(){}return t.prototype.__hidden=t.prototype,new t}();pD(t[n],function(t,e){if(a_.isValidType(e)){var i={type:e,visual:t};a&&a(i,n),o[e]=new a_(i),"opacity"===e&&((i=D(i)).type="colorAlpha",o.__hidden.__alphaForOpacity=new a_(i))}})}),i}function vD(e,i,t){var n;E(t,function(t){i.hasOwnProperty(t)&&gD(i[t])&&(n=!0)}),n&&E(t,function(t){i.hasOwnProperty(t)&&gD(i[t])?e[t]=D(i[t]):delete e[t]})}var yD={lineX:xD(0),lineY:xD(1),rect:{point:function(t,e,i){return t&&i.boundingRect.contain(t[0],t[1])},rect:function(t,e,i){return t&&i.boundingRect.intersect(t)}},polygon:{point:function(t,e,i){return t&&i.boundingRect.contain(t[0],t[1])&&wg(i.range,t[0],t[1])},rect:function(t,e,i){var n=i.range;if(!t||n.length<=1)return!1;var o=t.x,a=t.y,r=t.width,s=t.height,l=n[0];return!!(wg(n,o,a)||wg(n,o+r,a)||wg(n,o,a+s)||wg(n,o+r,a+s)||Mi.create(t).contain(l[0],l[1])||gl(o,a,o+r,a,n)||gl(o,a,o,a+s,n)||gl(o+r,a,o+r,a+s,n)||gl(o,a+s,o+r,a+s,n))||void 0}}};function xD(a){var r=["x","y"],s=["width","height"];return{point:function(t,e,i){if(t){var n=i.range;return _D(t[a],n)}},rect:function(t,e,i){if(t){var n=i.range,o=[t[r[a]],t[r[a]]+t[s[a]]];return o[1]<o[0]&&o.reverse(),_D(o[0],n)||_D(o[1],n)||_D(n[0],o)||_D(n[1],o)}}}}function _D(t,e){return e[0]<=t&&t<=e[1]}var wD=["inBrush","outOfBrush"],bD="__ecBrushSelect",SD="__ecInBrushSelectEvent",MD=Id.VISUAL.BRUSH;function ID(t,e){if(!t.isDisposed()){var i=t.getZr();i[SD]=!0,t.dispatchAction({type:"brushSelect",batch:e}),i[SD]=!1}}function TD(t,e,i,n){for(var o=0,a=e.length;o<a;o++){var r=e[o];if(t[r.brushType](n,i,r.selectors,r))return!0}}function AD(t){var r=t.brushSelector;if(z(r)){var e=[];return E(yD,function(a,t){e[t]=function(t,e,i,n){var o=e.getItemLayout(t);return a[r](o,i,n)}}),e}if(O(r)){var i={};return E(yD,function(t,e){i[e]=r}),i}return r}vf(MD,function(e,t,i){e.eachComponent({mainType:"brush"},function(t){i&&"takeGlobalCursor"===i.type&&t.setBrushOption("brush"===i.key?i.brushOption:{brushType:!1}),(t.brushTargetManager=new pA(t.option,e)).setInputRanges(t.areas,e)})}),yf(MD,function(p,t,e){var o,g,m=[];p.eachComponent({mainType:"brush"},function(a,t){var s={brushId:a.id,brushIndex:t,brushName:a.name,areas:D(a.areas),selected:[]};m.push(s);var e=a.option,i=e.brushLink,n=[],l=[],u=[],h=0;t||(o=e.throttleType,g=e.throttleDelay);var r=N(a.areas,function(t){return function(i){var n=i.selectors={};return E(yD[i.brushType],function(e,t){n[t]=function(t){return e(t,n,i)}}),i}(C({boundingRect:DD[t.brushType](t)},t))}),c=mD(a.option,wD,function(t){t.mappingMethod="fixed"});function d(t){return"all"===i||n[t]}function f(t){return!!t.length}k(i)&&E(i,function(t){n[t]=1}),p.eachSeries(function(t,e){var i=u[e]=[];"parallel"===t.subType?function(t,e){var i=t.coordinateSystem;h|=i.hasAxisBrushed(),d(e)&&i.eachActiveState(t.getData(),function(t,e){"active"===t&&(l[e]=1)})}(t,e):function(e,t,i){var n=AD(e);if(!n||function(t,e){var i=t.option.seriesIndex;return null!=i&&"all"!==i&&(k(i)?_(i,e)<0:e!==i)}(a,t))return;if(E(r,function(t){n[t.brushType]&&a.brushTargetManager.controlSeries(t,e,p)&&i.push(t),h|=f(i)}),d(t)&&f(i)){var o=e.getData();o.each(function(t){TD(n,i,o,t)&&(l[t]=1)})}}(t,e,i)}),p.eachSeries(function(t,e){var i={seriesId:t.id,seriesIndex:e,seriesName:t.name,dataIndex:[]};s.selected.push(i);var n=AD(t),o=u[e],a=t.getData(),r=d(e)?function(t){return l[t]?(i.dataIndex.push(a.getRawIndex(t)),"inBrush"):"outOfBrush"}:function(t){return TD(n,o,a,t)?(i.dataIndex.push(a.getRawIndex(t)),"inBrush"):"outOfBrush"};(d(e)?h:f(o))&&function(t,u,h,c,d,f){var p,g={};function m(t){return h.getItemVisual(p,t)}function v(t,e){h.setItemVisual(p,t,e)}function e(t,e){p=null==f?t:e;var i=h.getRawDataItem(p);if(!i||!1!==i.visualMap)for(var n=c.call(d,t),o=u[n],a=g[n],r=0,s=a.length;r<s;r++){var l=a[r];o[l]&&o[l].applyVisual(t,m,v)}}E(t,function(t){var e=a_.prepareVisualTypes(u[t]);g[t]=e}),null==f?h.each(e):h.each([f],e)}(wD,c,a,r)})}),function(t,e,i,n,o){if(!o)return;var a=t.getZr();if(a[SD])return;a[bD]||(a[bD]=ID);Tc(a,bD,i,e)(t,n)}(t,o,g,m,e)});var DD={lineX:et,lineY:et,rect:function(t){return CD(t.range)},polygon:function(t){for(var e,i=t.range,n=0,o=i.length;n<o;n++){e=e||[[1/0,-1/0],[1/0,-1/0]];var a=i[n];a[0]<e[0][0]&&(e[0][0]=a[0]),a[0]>e[0][1]&&(e[0][1]=a[0]),a[1]<e[1][0]&&(e[1][0]=a[1]),a[1]>e[1][1]&&(e[1][1]=a[1])}return e&&CD(e)}};function CD(t){return new Mi(t[0][0],t[1][0],t[0][1]-t[0][0],t[1][1]-t[1][0])}var LD=["#ddd"];wf({type:"brush",dependencies:["geo","grid","xAxis","yAxis","parallel","series"],defaultOption:{toolbox:null,brushLink:null,seriesIndex:"all",geoIndex:null,xAxisIndex:null,yAxisIndex:null,brushType:"rect",brushMode:"single",transformable:!0,brushStyle:{borderWidth:1,color:"rgba(120,140,180,0.3)",borderColor:"rgba(120,140,180,0.8)"},throttleType:"fixRate",throttleDelay:0,removeOnClick:!0,z:1e4},areas:[],brushType:null,brushOption:{},coordInfoList:[],optionUpdated:function(t,e){var i=this.option;e||vD(i,t,["inBrush","outOfBrush"]);var n=i.inBrush=i.inBrush||{};i.outOfBrush=i.outOfBrush||{color:LD},n.hasOwnProperty("liftZ")||(n.liftZ=5)},setAreas:function(t){t&&(this.areas=N(t,function(t){return kD(this.option,t)},this))},setBrushOption:function(t){this.brushOption=kD(this.option,t),this.brushType=this.brushOption.brushType}});function kD(t,e){return m({brushType:t.brushType,brushMode:t.brushMode,transformable:t.transformable,brushStyle:new Il(t.brushStyle).getItemStyle(),removeOnClick:t.removeOnClick,z:t.z},e,!0)}function PD(t,e,i,n){n&&n.$from===t.id||this._brushController.setPanels(t.brushTargetManager.makePanelOpts(i)).enableBrush(t.brushOption).updateCovers(t.areas.slice())}bf({type:"brush",init:function(t,e){this.ecModel=t,this.api=e,this.model,(this._brushController=new gb(e.getZr())).on("brush",A(this._onBrush,this)).mount()},render:function(t){return this.model=t,PD.apply(this,arguments)},updateTransform:PD,updateView:PD,dispose:function(){this._brushController.dispose()},_onBrush:function(t,e){var i=this.model.id;this.model.brushTargetManager.setOutputRanges(t,this.ecModel),e.isEnd&&!e.removeOnClick||this.api.dispatchAction({type:"brush",brushId:i,areas:D(t),$from:i}),e.isEnd&&this.api.dispatchAction({type:"brushEnd",brushId:i,areas:D(t),$from:i})}}),gf({type:"brush",event:"brush"},function(e,t){t.eachComponent({mainType:"brush",query:e},function(t){t.setAreas(e.areas)})}),gf({type:"brushSelect",event:"brushSelected",update:"none"},function(){}),gf({type:"brushEnd",event:"brushEnd",update:"none"},function(){});var ND=Cc.toolbox.brush;function OD(t,e,i){this.model=t,this.ecModel=e,this.api=i,this._brushType,this._brushMode}OD.defaultOption={show:!0,type:["rect","polygon","lineX","lineY","keep","clear"],icon:{rect:"M7.3,34.7 M0.4,10V-0.2h9.8 M89.6,10V-0.2h-9.8 M0.4,60v10.2h9.8 M89.6,60v10.2h-9.8 M12.3,22.4V10.5h13.1 M33.6,10.5h7.8 M49.1,10.5h7.8 M77.5,22.4V10.5h-13 M12.3,31.1v8.2 M77.7,31.1v8.2 M12.3,47.6v11.9h13.1 M33.6,59.5h7.6 M49.1,59.5 h7.7 M77.5,47.6v11.9h-13",polygon:"M55.2,34.9c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1 s-3.1-1.4-3.1-3.1S53.5,34.9,55.2,34.9z M50.4,51c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1 C47.3,52.4,48.7,51,50.4,51z M55.6,37.1l1.5-7.8 M60.1,13.5l1.6-8.7l-7.8,4 M59,19l-1,5.3 M24,16.1l6.4,4.9l6.4-3.3 M48.5,11.6 l-5.9,3.1 M19.1,12.8L9.7,5.1l1.1,7.7 M13.4,29.8l1,7.3l6.6,1.6 M11.6,18.4l1,6.1 M32.8,41.9 M26.6,40.4 M27.3,40.2l6.1,1.6 M49.9,52.1l-5.6-7.6l-4.9-1.2",lineX:"M15.2,30 M19.7,15.6V1.9H29 M34.8,1.9H40.4 M55.3,15.6V1.9H45.9 M19.7,44.4V58.1H29 M34.8,58.1H40.4 M55.3,44.4 V58.1H45.9 M12.5,20.3l-9.4,9.6l9.6,9.8 M3.1,29.9h16.5 M62.5,20.3l9.4,9.6L62.3,39.7 M71.9,29.9H55.4",lineY:"M38.8,7.7 M52.7,12h13.2v9 M65.9,26.6V32 M52.7,46.3h13.2v-9 M24.9,12H11.8v9 M11.8,26.6V32 M24.9,46.3H11.8v-9 M48.2,5.1l-9.3-9l-9.4,9.2 M38.9-3.9V12 M48.2,53.3l-9.3,9l-9.4-9.2 M38.9,62.3V46.4",keep:"M4,10.5V1h10.3 M20.7,1h6.1 M33,1h6.1 M55.4,10.5V1H45.2 M4,17.3v6.6 M55.6,17.3v6.6 M4,30.5V40h10.3 M20.7,40 h6.1 M33,40h6.1 M55.4,30.5V40H45.2 M21,18.9h62.9v48.6H21V18.9z",clear:"M22,14.7l30.9,31 M52.9,14.7L22,45.7 M4.7,16.8V4.2h13.1 M26,4.2h7.8 M41.6,4.2h7.8 M70.3,16.8V4.2H57.2 M4.7,25.9v8.6 M70.3,25.9v8.6 M4.7,43.2v12.6h13.1 M26,55.8h7.8 M41.6,55.8h7.8 M70.3,43.2v12.6H57.2"},title:D(ND.title)};var ED=OD.prototype;ED.render=ED.updateView=function(e,t,i){var n,o,a;t.eachComponent({mainType:"brush"},function(t){n=t.brushType,o=t.brushOption.brushMode||"single",a|=t.areas.length}),this._brushType=n,this._brushMode=o,E(e.get("type",!0),function(t){e.setIconStatus(t,("keep"===t?"multiple"===o:"clear"===t?a:t===n)?"emphasis":"normal")})},ED.getIcons=function(){var t=this.model,e=t.get("icon",!0),i={};return E(t.get("type",!0),function(t){e[t]&&(i[t]=e[t])}),i},ED.onclick=function(t,e,i){var n=this._brushType,o=this._brushMode;"clear"===i?(e.dispatchAction({type:"axisAreaSelect",intervals:[]}),e.dispatchAction({type:"brush",command:"clear",areas:[]})):e.dispatchAction({type:"takeGlobalCursor",key:"brush",brushOption:{brushType:"keep"===i?n:n!==i&&i,brushMode:"keep"===i?"multiple"===o?"single":"multiple":o}})},HT("brush",OD),ff(function(t,e){var i=t&&t.brush;if(k(i)||(i=i?[i]:[]),i.length){var n=[];E(i,function(t){var e=t.hasOwnProperty("toolbox")?t.toolbox:[];e instanceof Array&&(n=n.concat(e))});var o=t&&t.toolbox;k(o)&&(o=o[0]),o||(o={feature:{}},t.toolbox=[o]);var a=o.feature||(o.feature={}),r=a.brush||(a.brush={}),s=r.type||(r.type=[]);s.push.apply(s,n),function(i){var e={};E(i,function(t){e[t]=1}),i.length=0,E(e,function(t,e){i.push(e)})}(s),e&&!s.length&&s.push.apply(s,fD)}}),wf({type:"title",layoutMode:{type:"box",ignoreSize:!0},defaultOption:{zlevel:0,z:6,show:!0,text:"",target:"blank",subtext:"",subtarget:"blank",left:0,top:0,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}}}),bf({type:"title",render:function(t,e,i){if(this.group.removeAll(),t.get("show")){var n=this.group,o=t.getModel("textStyle"),a=t.getModel("subtextStyle"),r=t.get("textAlign"),s=H(t.get("textBaseline"),t.get("textVerticalAlign")),l=new Fr({style:Qs({},o,{text:t.get("text"),textFill:o.getTextColor()},{disableBox:!0}),z2:10}),u=l.getBoundingRect(),h=t.get("subtext"),c=new Fr({style:Qs({},a,{text:h,textFill:a.getTextColor(),y:u.height+t.get("itemGap"),textVerticalAlign:"top"},{disableBox:!0}),z2:10}),d=t.get("link"),f=t.get("sublink"),p=t.get("triggerEvent",!0);l.silent=!d&&!p,c.silent=!f&&!p,d&&l.on("click",function(){window.open(d,"_"+t.get("target"))}),f&&c.on("click",function(){window.open(f,"_"+t.get("subtarget"))}),l.eventData=c.eventData=p?{componentType:"title",componentIndex:t.componentIndex}:null,n.add(l),h&&n.add(c);var g=n.getBoundingRect(),m=t.getBoxLayoutParams();m.width=g.width,m.height=g.height;var v=vu(m,{width:i.getWidth(),height:i.getHeight()},t.get("padding"));r||("middle"===(r=t.get("left")||t.get("right"))&&(r="center"),"right"===r?v.x+=v.width:"center"===r&&(v.x+=v.width/2)),s||("center"===(s=t.get("top")||t.get("bottom"))&&(s="middle"),"bottom"===s?v.y+=v.height:"middle"===s&&(v.y+=v.height/2),s=s||"top"),n.attr("position",[v.x,v.y]);var y={textAlign:r,textVerticalAlign:s};l.setStyle(y),c.setStyle(y),g=n.getBoundingRect();var x=v.margin,_=t.getItemStyle(["color","opacity"]);_.fill=t.get("backgroundColor");var w=new is({shape:{x:g.x-x[3],y:g.y-x[0],width:g.width+x[1]+x[3],height:g.height+x[0]+x[2],r:t.get("borderRadius")},style:_,subPixelOptimize:!0,silent:!0});n.add(w)}}});function zD(t){var e=t.itemStyle||(t.itemStyle={}),i=e.emphasis||(e.emphasis={}),n=t.label||t.label||{},o=n.normal||(n.normal={}),a={normal:1,emphasis:1};E(n,function(t,e){a[e]||RD(o,e)||(o[e]=t)}),i.label&&!RD(n,"emphasis")&&(n.emphasis=i.label,delete i.label)}function RD(t,e){return t.hasOwnProperty(e)}Tu.registerSubTypeDefaulter("timeline",function(){return"slider"}),gf({type:"timelineChange",event:"timelineChanged",update:"prepareAndUpdate"},function(t,e){var i=e.getComponent("timeline");return i&&null!=t.currentIndex&&(i.setCurrentIndex(t.currentIndex),!i.get("loop",!0)&&i.isIndexMax()&&i.setPlayState(!1)),e.resetOption("timeline"),C({currentIndex:i.option.currentIndex},t)}),gf({type:"timelinePlayChange",event:"timelinePlayChanged",update:"update"},function(t,e){var i=e.getComponent("timeline");i&&null!=t.playState&&i.setPlayState(t.playState)});var BD=Tu.extend({type:"timeline",layoutMode:"box",defaultOption:{zlevel:0,z:4,show:!0,axisType:"time",realtime:!0,left:"20%",top:null,right:"20%",bottom:0,width:null,height:40,padding:5,controlPosition:"left",autoPlay:!1,rewind:!1,loop:!0,playInterval:2e3,currentIndex:0,itemStyle:{},label:{color:"#000"},data:[]},init:function(t,e,i){this._data,this._names,this.mergeDefaultAndTheme(t,i),this._initData()},mergeOption:function(t){BD.superApply(this,"mergeOption",arguments),this._initData()},setCurrentIndex:function(t){null==t&&(t=this.option.currentIndex);var e=this._data.count();this.option.loop?t=(t%e+e)%e:(e<=t&&(t=e-1),t<0&&(t=0)),this.option.currentIndex=t},getCurrentIndex:function(){return this.option.currentIndex},isIndexMax:function(){return this.getCurrentIndex()>=this._data.count()-1},setPlayState:function(t){this.option.autoPlay=!!t},getPlayState:function(){return!!this.option.autoPlay},_initData:function(){var t=this.option,e=t.data||[],i=t.axisType,o=this._names=[];if("category"===i){var a=[];E(e,function(t,e){var i,n=Bo(t);R(t)?(i=D(t)).value=e:i=e,a.push(i),z(n)||null!=n&&!isNaN(n)||(n=""),o.push(n+"")}),e=a}var n={category:"ordinal",time:"time"}[i]||"number";(this._data=new Wf([{name:"value",type:n}],this)).initData(e,o)},getData:function(){return this._data},getCategories:function(){if("category"===this.get("axisType"))return this._names.slice()}});b(BD.extend({type:"timeline.slider",defaultOption:{backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,orient:"horizontal",inverse:!1,tooltip:{trigger:"item"},symbol:"emptyCircle",symbolSize:10,lineStyle:{show:!0,width:2,color:"#304654"},label:{position:"auto",show:!0,interval:"auto",rotate:0,color:"#304654"},itemStyle:{color:"#304654",borderWidth:1},checkpointStyle:{symbol:"circle",symbolSize:13,color:"#c23531",borderWidth:5,borderColor:"rgba(194,53,49, 0.5)",animation:!0,animationDuration:300,animationEasing:"quinticInOut"},controlStyle:{show:!0,showPlayBtn:!0,showPrevBtn:!0,showNextBtn:!0,itemSize:22,itemGap:12,position:"left",playIcon:"path://M31.6,53C17.5,53,6,41.5,6,27.4S17.5,1.8,31.6,1.8C45.7,1.8,57.2,13.3,57.2,27.4S45.7,53,31.6,53z M31.6,3.3 C18.4,3.3,7.5,14.1,7.5,27.4c0,13.3,10.8,24.1,24.1,24.1C44.9,51.5,55.7,40.7,55.7,27.4C55.7,14.1,44.9,3.3,31.6,3.3z M24.9,21.3 c0-2.2,1.6-3.1,3.5-2l10.5,6.1c1.899,1.1,1.899,2.9,0,4l-10.5,6.1c-1.9,1.1-3.5,0.2-3.5-2V21.3z",stopIcon:"path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",nextIcon:"path://M18.6,50.8l22.5-22.5c0.2-0.2,0.3-0.4,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7L18.7,4.4c-0.1-0.1-0.2-0.3-0.2-0.5 c0-0.4,0.3-0.8,0.8-0.8c0.2,0,0.5,0.1,0.6,0.3l23.5,23.5l0,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-0.1,0.1L19.7,52 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0-0.8-0.3-0.8-0.8C18.4,51.2,18.5,51,18.6,50.8z",prevIcon:"path://M43,52.8L20.4,30.3c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7L42.9,6.4c0.1-0.1,0.2-0.3,0.2-0.5 c0-0.4-0.3-0.8-0.8-0.8c-0.2,0-0.5,0.1-0.6,0.3L18.3,28.8l0,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l0.1,0.1L41.9,54 c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.3,0.8-0.8C43.2,53.2,43.1,53,43,52.8z",color:"#304654",borderColor:"#304654",borderWidth:1},emphasis:{label:{show:!0,color:"#c23531"},itemStyle:{color:"#c23531"},controlStyle:{color:"#c23531",borderColor:"#c23531",borderWidth:2}},data:[]}}),Fh);function VD(t,e,i,n){Eg.call(this,t,e,i),this.type=n||"value",this.model=null}var GD=hc.extend({type:"timeline"});VD.prototype={constructor:VD,getLabelModel:function(){return this.model.getModel("label")},isHorizontal:function(){return"horizontal"===this.model.get("orient")}},w(VD,Eg);var FD=A,WD=E,HD=Math.PI;function ZD(t,e,i,n,o,a){var r=e.get("color");o?(o.setColor(r),i.add(o),a&&a.onUpdate(o)):((o=mg(t.get("symbol"),-1,-1,2,2,r)).setStyle("strokeNoScale",!0),i.add(o),a&&a.onCreate(o));var s=e.getItemStyle(["color","symbol","symbolSize"]);o.setStyle(s),n=m({rectHover:!0,z2:100},n,!0);var l=t.get("symbolSize");(l=l instanceof Array?l.slice():[+l,+l])[0]/=2,l[1]/=2,n.scale=l;var u=t.get("symbolOffset");if(u){var h=n.position=n.position||[0,0];h[0]+=Pl(u[0],l[0]),h[1]+=Pl(u[1],l[1])}var c=t.get("symbolRotate");return n.rotation=(c||0)*Math.PI/180||0,o.attr(n),o.updateTransform(),o}function UD(t,e,i,n,o){if(!t.dragging){var a=n.getModel("checkpointStyle"),r=i.dataToCoord(n.getData().get(["value"],e));o||!a.get("animation",!0)?t.attr({position:[r,0]}):(t.stopAnimation(!0),t.animateTo({position:[r,0]},a.get("animationDuration",!0),a.get("animationEasing",!0)))}}GD.extend({type:"timeline.slider",init:function(t,e){this.api=e,this._axis,this._viewRect,this._timer,this._currentPointer,this._mainGroup,this._labelGroup},render:function(e,t,i,n){if(this.model=e,this.api=i,this.ecModel=t,this.group.removeAll(),e.get("show",!0)){var o=this._layout(e,i),a=this._createGroup("mainGroup"),r=this._createGroup("labelGroup"),s=this._axis=this._createAxis(o,e);e.formatTooltip=function(t){return eu(s.scale.getLabel(t))},WD(["AxisLine","AxisTick","Control","CurrentPointer"],function(t){this["_render"+t](o,a,s,e)},this),this._renderAxisLabel(o,r,s,e),this._position(o,e)}this._doPlayStop()},remove:function(){this._clearTimer(),this.group.removeAll()},dispose:function(){this._clearTimer()},_layout:function(t,e){var i=t.get("label.position"),n=t.get("orient"),o=function(t,e){return vu(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()},t.get("padding"))}(t,e);null==i||"auto"===i?i="horizontal"===n?o.y+o.height/2<e.getHeight()/2?"-":"+":o.x+o.width/2<e.getWidth()/2?"+":"-":isNaN(i)&&(i={horizontal:{top:"-",bottom:"+"},vertical:{left:"-",right:"+"}}[n][i]);var a,r,s,l,u={horizontal:"center",vertical:0<=i||"+"===i?"left":"right"},h={horizontal:0<=i||"+"===i?"top":"bottom",vertical:"middle"},c={horizontal:0,vertical:HD/2},d="vertical"===n?o.height:o.width,f=t.getModel("controlStyle"),p=f.get("show",!0),g=p?f.get("itemSize"):0,m=p?f.get("itemGap"):0,v=g+m,y=t.get("label.rotate")||0;y=y*HD/180;var x=f.get("position",!0),_=p&&f.get("showPlayBtn",!0),w=p&&f.get("showPrevBtn",!0),b=p&&f.get("showNextBtn",!0),S=0,M=d;return"left"===x||"bottom"===x?(_&&(a=[0,0],S+=v),w&&(r=[S,0],S+=v)):(_&&(a=[M-g,0],M-=v),w&&(r=[0,0],S+=v)),b&&(s=[M-g,0],M-=v),l=[S,M],t.get("inverse")&&l.reverse(),{viewRect:o,mainLength:d,orient:n,rotation:c[n],labelRotation:y,labelPosOpt:i,labelAlign:t.get("label.align")||u[n],labelBaseline:t.get("label.verticalAlign")||t.get("label.baseline")||h[n],playPosition:a,prevBtnPosition:r,nextBtnPosition:s,axisExtent:l,controlSize:g,controlGap:m}},_position:function(t,e){var i=this._mainGroup,n=this._labelGroup,o=t.viewRect;if("vertical"===t.orient){var a=ee(),r=o.x,s=o.y+o.height;ae(a,a,[-r,-s]),re(a,a,-HD/2),ae(a,a,[r,s]),(o=o.clone()).applyTransform(a)}var l=m(o),u=m(i.getBoundingRect()),h=m(n.getBoundingRect()),c=i.position,d=n.position;d[0]=c[0]=l[0][0];var f,p=t.labelPosOpt;isNaN(p)?(v(c,u,l,1,f="+"===p?0:1),v(d,h,l,1,1-f)):(v(c,u,l,1,f=0<=p?0:1),d[1]=c[1]+p);function g(t){var e=t.position;t.origin=[l[0][0]-e[0],l[1][0]-e[1]]}function m(t){return[[t.x,t.x+t.width],[t.y,t.y+t.height]]}function v(t,e,i,n,o){t[n]+=i[n][o]-e[n][o]}i.attr("position",c),n.attr("position",d),i.rotation=n.rotation=t.rotation,g(i),g(n)},_createAxis:function(t,e){var i=e.getData(),n=e.get("axisType"),o=ig(e,n);o.getTicks=function(){return i.mapArray(["value"],function(t){return t})};var a=i.getDataExtent("value");o.setExtent(a[0],a[1]),o.niceTicks();var r=new VD("value",o,t.axisExtent,n);return r.model=e,r},_createGroup:function(t){var e=this["_"+t]=new Ii;return this.group.add(e),e},_renderAxisLine:function(t,e,i,n){var o=i.getExtent();n.get("lineStyle.show")&&e.add(new os({shape:{x1:o[0],y1:0,x2:o[1],y2:0},style:L({lineCap:"round"},n.getModel("lineStyle").getLineStyle()),silent:!0,z2:1}))},_renderAxisTick:function(t,s,l,u){var h=u.getData(),e=l.scale.getTicks();WD(e,function(t){var e=l.dataToCoord(t),i=h.getItemModel(t),n=i.getModel("itemStyle"),o=i.getModel("emphasis.itemStyle"),a={position:[e,0],onclick:FD(this._changeTimeline,this,t)},r=ZD(i,n,s,a);Ys(r,o.getItemStyle()),i.get("tooltip")?(r.dataIndex=t,r.dataModel=u):r.dataIndex=r.dataModel=null},this)},_renderAxisLabel:function(s,l,u,t){if(u.getLabelModel().get("show")){var h=t.getData(),e=u.getViewLabels();WD(e,function(t){var e=t.tickValue,i=h.getItemModel(e),n=i.getModel("label"),o=i.getModel("emphasis.label"),a=u.dataToCoord(t.tickValue),r=new Fr({position:[a,0],rotation:s.labelRotation-s.rotation,onclick:FD(this._changeTimeline,this,e),silent:!1});Qs(r.style,n,{text:t.formattedLabel,textAlign:s.labelAlign,textVerticalAlign:s.labelBaseline}),l.add(r),Ys(r,Qs({},o))},this)}},_renderControl:function(t,a,e,r){var s=t.controlSize,l=t.rotation,u=r.getModel("controlStyle").getItemStyle(),h=r.getModel("emphasis.controlStyle").getItemStyle(),c=[0,-s/2,s,s],i=r.getPlayState(),n=r.get("inverse",!0);function o(t,e,i,n){if(t){var o=function(t,e,i,n){return Ds(t.get(e).replace(/^path:\/\//,""),D(n||{}),new Mi(i[0],i[1],i[2],i[3]),"center")}(r,e,c,{position:t,origin:[s/2,0],rotation:n?-l:0,rectHover:!0,style:u,onclick:i});a.add(o),Ys(o,h)}}o(t.nextBtnPosition,"controlStyle.nextIcon",FD(this._changeTimeline,this,n?"-":"+")),o(t.prevBtnPosition,"controlStyle.prevIcon",FD(this._changeTimeline,this,n?"+":"-")),o(t.playPosition,"controlStyle."+(i?"stopIcon":"playIcon"),FD(this._handlePlayClick,this,!i),!0)},_renderCurrentPointer:function(t,e,i,n){var o=n.getData(),a=n.getCurrentIndex(),r=o.getItemModel(a).getModel("checkpointStyle"),s=this,l={onCreate:function(t){t.draggable=!0,t.drift=FD(s._handlePointerDrag,s),t.ondragend=FD(s._handlePointerDragend,s),UD(t,a,i,n,!0)},onUpdate:function(t){UD(t,a,i,n)}};this._currentPointer=ZD(r,r,this._mainGroup,{},this._currentPointer,l)},_handlePlayClick:function(t){this._clearTimer(),this.api.dispatchAction({type:"timelinePlayChange",playState:t,from:this.uid})},_handlePointerDrag:function(t,e,i){this._clearTimer(),this._pointerChangeTimeline([i.offsetX,i.offsetY])},_handlePointerDragend:function(t){this._pointerChangeTimeline([t.offsetX,t.offsetY],!0)},_pointerChangeTimeline:function(t,e){var i=this._toAxisCoord(t)[0],n=Ol(this._axis.getExtent().slice());i>n[1]&&(i=n[1]),i<n[0]&&(i=n[0]),this._currentPointer.position[0]=i,this._currentPointer.dirty();var o=this._findNearestTick(i),a=this.model;(e||o!==a.getCurrentIndex()&&a.get("realtime"))&&this._changeTimeline(o)},_doPlayStop:function(){this._clearTimer(),this.model.getPlayState()&&(this._timer=setTimeout(FD(function(){var t=this.model;this._changeTimeline(t.getCurrentIndex()+(t.get("rewind",!0)?-1:1))},this),this.model.get("playInterval")))},_toAxisCoord:function(t){return hl(t,this._mainGroup.getLocalTransform(),!0)},_findNearestTick:function(o){var a,t=this.model.getData(),r=1/0,s=this._axis;return t.each(["value"],function(t,e){var i=s.dataToCoord(t),n=Math.abs(i-o);n<r&&(r=n,a=e)}),a},_clearTimer:function(){this._timer&&(clearTimeout(this._timer),this._timer=null)},_changeTimeline:function(t){var e=this.model.getCurrentIndex();"+"===t?t=e+1:"-"===t&&(t=e-1),this.api.dispatchAction({type:"timelineChange",currentIndex:t,from:this.uid})}}),ff(function(t){var e=t&&t.timeline;k(e)||(e=e?[e]:[]),E(e,function(t){t&&function(t){var e=t.type,i={number:"value",time:"time"};i[e]&&(t.axisType=i[e],delete t.type);if(zD(t),RD(t,"controlPosition")){var n=t.controlStyle||(t.controlStyle={});RD(n,"position")||(n.position=t.controlPosition),"none"!==n.position||RD(n,"show")||(n.show=!1,delete n.position),delete t.controlPosition}E(t.data||[],function(t){R(t)&&!k(t)&&(!RD(t,"value")&&RD(t,"name")&&(t.value=t.name),zD(t))})}(t)})});var XD=Kl,YD=eu;function jD(t){zo(t,"label",["show"])}var qD=wf({type:"marker",dependencies:["series","grid","polar","geo"],init:function(t,e,i){this.mergeDefaultAndTheme(t,i),this._mergeOption(t,i,!1,!0)},isAnimationEnabled:function(){if(v.node)return!1;var t=this.__hostSeries;return this.getShallow("animation")&&t&&t.isAnimationEnabled()},mergeOption:function(t,e){this._mergeOption(t,e,!1,!1)},_mergeOption:function(t,n,e,o){var a=this.constructor,r=this.mainType+"Model";e||n.eachSeries(function(t){var e=t.get(this.mainType,!0),i=t[r];e&&e.data?(i?i._mergeOption(e,n,!0):(o&&jD(e),E(e.data,function(t){t instanceof Array?(jD(t[0]),jD(t[1])):jD(t)}),L(i=new a(e,this,n),{mainType:this.mainType,seriesIndex:t.seriesIndex,name:t.name,createdBySelf:!0}),i.__hostSeries=t),t[r]=i):t[r]=null},this)},formatTooltip:function(t){var e=this.getData(),i=this.getRawValue(t),n=k(i)?N(i,XD).join(", "):XD(i),o=e.getName(t),a=YD(this.name);return null==i&&!o||(a+="<br />"),o&&(a+=YD(o),null!=i&&(a+=" : ")),null!=i&&(a+=YD(n)),a},getData:function(){return this._data},setData:function(t){this._data=t}});b(qD,Fh),qD.extend({type:"markPoint",defaultOption:{zlevel:0,z:5,symbol:"pin",symbolSize:50,tooltip:{trigger:"item"},label:{show:!0,position:"inside"},itemStyle:{borderWidth:2},emphasis:{label:{show:!0}}}});var KD=_;function $D(t,e,i,n,o,a){var r=[],s=lp(e,n)?e.getCalculationInfo("stackResultDimension"):n,l=oC(e,s,t),u=e.indicesOfNearest(s,l)[0];r[o]=e.get(i,u),r[a]=e.get(n,u);var h=El(e.get(n,u));return 0<=(h=Math.min(h,20))&&(r[a]=+r[a].toFixed(h)),r}var JD=T,QD={min:JD($D,"min"),max:JD($D,"max"),average:JD($D,"average")};function tC(t,e){var i=t.getData(),n=t.coordinateSystem;if(e&&!function(t){return!isNaN(parseFloat(t.x))&&!isNaN(parseFloat(t.y))}(e)&&!k(e.coord)&&n){var o=n.dimensions,a=eC(e,i,n,t);if((e=D(e)).type&&QD[e.type]&&a.baseAxis&&a.valueAxis){var r=KD(o,a.baseAxis.dim),s=KD(o,a.valueAxis.dim);e.coord=QD[e.type](i,a.baseDataDim,a.valueDataDim,r,s),e.value=e.coord[s]}else{for(var l=[null!=e.xAxis?e.xAxis:e.radiusAxis,null!=e.yAxis?e.yAxis:e.angleAxis],u=0;u<2;u++)QD[l[u]]&&(l[u]=oC(i,i.mapDimension(o[u]),l[u]));e.coord=l}}return e}function eC(t,e,i,n){var o={};return null!=t.valueIndex||null!=t.valueDim?(o.valueDataDim=null!=t.valueIndex?e.getDimension(t.valueIndex):t.valueDim,o.valueAxis=i.getAxis(function(t,e){var i=t.getData(),n=i.dimensions;e=i.getDimension(e);for(var o=0;o<n.length;o++){var a=i.getDimensionInfo(n[o]);if(a.name===e)return a.coordDim}}(n,o.valueDataDim)),o.baseAxis=i.getOtherAxis(o.valueAxis),o.baseDataDim=e.mapDimension(o.baseAxis.dim)):(o.baseAxis=n.getBaseAxis(),o.valueAxis=i.getOtherAxis(o.baseAxis),o.baseDataDim=e.mapDimension(o.baseAxis.dim),o.valueDataDim=e.mapDimension(o.valueAxis.dim)),o}function iC(t,e){return!(t&&t.containData&&e.coord&&!function(t){return!(isNaN(parseFloat(t.x))&&isNaN(parseFloat(t.y)))}(e))||t.containData(e.coord)}function nC(t,e,i,n){return n<2?t.coord&&t.coord[n]:t.value}function oC(t,e,i){if("average"!==i)return"median"===i?t.getMedian(e):t.getDataExtent(e,!0)["max"===i?1:0];var n=0,o=0;return t.each(e,function(t,e){isNaN(t)||(n+=t,o++)}),n/o}var aC=bf({type:"marker",init:function(){this.markerGroupMap=Q()},render:function(t,i,n){var e=this.markerGroupMap;e.each(function(t){t.__keep=!1});var o=this.type+"Model";i.eachSeries(function(t){var e=t[o];e&&this.renderSeries(t,e,i,n)},this),e.each(function(t){t.__keep||this.group.remove(t.group)},this)},renderSeries:function(){}});function rC(s,l,u){var h=l.coordinateSystem;s.each(function(t){var e,i=s.getItemModel(t),n=Pl(i.get("x"),u.getWidth()),o=Pl(i.get("y"),u.getHeight());if(isNaN(n)||isNaN(o)){if(l.getMarkerPosition)e=l.getMarkerPosition(s.getValues(s.dimensions,t));else if(h){var a=s.get(h.dimensions[0],t),r=s.get(h.dimensions[1],t);e=h.dataToPoint([a,r])}}else e=[n,o];isNaN(n)||(e[0]=n),isNaN(o)||(e[1]=o),s.setItemLayout(t,e)})}aC.extend({type:"markPoint",updateTransform:function(t,e,i){e.eachSeries(function(t){var e=t.markPointModel;e&&(rC(e.getData(),t,i),this.markerGroupMap.get(t.id).updateLayout(e))},this)},renderSeries:function(t,l,e,i){var n=t.coordinateSystem,o=t.id,u=t.getData(),a=this.markerGroupMap,r=a.get(o)||a.set(o,new $g),h=function(t,e,i){var n;n=t?N(t&&t.dimensions,function(t){return C({name:t},e.getData().getDimensionInfo(e.getData().mapDimension(t))||{})}):[{name:"value",type:"float"}];var o=new Wf(n,i),a=N(i.get("data"),T(tC,e));t&&(a=M(a,T(iC,t)));return o.initData(a,null,t?nC:function(t){return t.value}),o}(n,t,l);l.setData(h),rC(l.getData(),t,i),h.each(function(t){var e=h.getItemModel(t),i=e.getShallow("symbol"),n=e.getShallow("symbolSize"),o=O(i),a=O(n);if(o||a){var r=l.getRawValue(t),s=l.getDataParams(t);o&&(i=i(r,s)),a&&(n=n(r,s))}h.setItemVisual(t,{symbol:i,symbolSize:n,color:e.get("itemStyle.color")||u.getVisual("color")})}),r.updateData(h),this.group.add(r.group),h.eachItemGraphicEl(function(t){t.traverse(function(t){t.dataModel=l})}),r.__keep=!0,r.group.silent=l.get("silent")||t.get("silent")}}),ff(function(t){t.markPoint=t.markPoint||{}}),qD.extend({type:"markLine",defaultOption:{zlevel:0,z:5,symbol:["circle","arrow"],symbolSize:[8,16],precision:2,tooltip:{trigger:"item"},label:{show:!0,position:"end"},lineStyle:{type:"dashed"},emphasis:{label:{show:!0},lineStyle:{width:3}},animationEasing:"linear"}});function sC(t,e,i,n){var o=t.getData(),a=n.type;if(!k(n)&&("min"===a||"max"===a||"average"===a||"median"===a||null!=n.xAxis||null!=n.yAxis)){var r,s;if(null!=n.yAxis||null!=n.xAxis)r=e.getAxis(null!=n.yAxis?"y":"x"),s=W(n.yAxis,n.xAxis);else{var l=eC(n,o,e,t);r=l.valueAxis,s=oC(o,up(o,l.valueDataDim),a)}var u="x"===r.dim?0:1,h=1-u,c=D(n),d={};c.type=null,c.coord=[],d.coord=[],c.coord[h]=-1/0,d.coord[h]=1/0;var f=i.get("precision");0<=f&&"number"==typeof s&&(s=+s.toFixed(Math.min(f,20))),c.coord[u]=d.coord[u]=s,n=[c,d,{type:a,valueIndex:n.valueIndex,value:s}]}return(n=[tC(t,n[0]),tC(t,n[1]),L({},n[2])])[2].type=n[2].type||"",m(n[2],n[0]),m(n[2],n[1]),n}function lC(t){return!isNaN(t)&&!isFinite(t)}function uC(t,e,i,n){var o=1-t,a=n.dimensions[t];return lC(e[o])&&lC(i[o])&&e[t]===i[t]&&n.getAxis(a).containData(e[t])}function hC(t,e){if("cartesian2d"===t.type){var i=e[0].coord,n=e[1].coord;if(i&&n&&(uC(1,i,n,t)||uC(0,i,n,t)))return!0}return iC(t,e[0])&&iC(t,e[1])}function cC(t,e,i,n,o){var a,r=n.coordinateSystem,s=t.getItemModel(e),l=Pl(s.get("x"),o.getWidth()),u=Pl(s.get("y"),o.getHeight());if(isNaN(l)||isNaN(u)){if(n.getMarkerPosition)a=n.getMarkerPosition(t.getValues(t.dimensions,e));else{var h=r.dimensions,c=t.get(h[0],e),d=t.get(h[1],e);a=r.dataToPoint([c,d])}if("cartesian2d"===r.type){var f=r.getAxis("x"),p=r.getAxis("y");h=r.dimensions;lC(t.get(h[0],e))?a[0]=f.toGlobalCoord(f.getExtent()[i?0:1]):lC(t.get(h[1],e))&&(a[1]=p.toGlobalCoord(p.getExtent()[i?0:1]))}isNaN(l)||(a[0]=l),isNaN(u)||(a[1]=u)}else a=[l,u];t.setItemLayout(e,a)}aC.extend({type:"markLine",updateTransform:function(t,e,a){e.eachSeries(function(e){var t=e.markLineModel;if(t){var i=t.getData(),n=t.__from,o=t.__to;n.each(function(t){cC(n,t,!0,e,a),cC(o,t,!1,e,a)}),i.each(function(t){i.setItemLayout(t,[n.getItemLayout(t),o.getItemLayout(t)])}),this.markerGroupMap.get(e.id).updateLayout()}},this)},renderSeries:function(o,i,t,a){var e=o.coordinateSystem,n=o.id,r=o.getData(),s=this.markerGroupMap,l=s.get(n)||s.set(n,new ow);this.group.add(l.group);var u=function(t,e,i){var n;n=t?N(t&&t.dimensions,function(t){return C({name:t},e.getData().getDimensionInfo(e.getData().mapDimension(t))||{})}):[{name:"value",type:"float"}];var o=new Wf(n,i),a=new Wf(n,i),r=new Wf([],i),s=N(i.get("data"),T(sC,e,t,i));t&&(s=M(s,T(hC,t)));var l=t?nC:function(t){return t.value};return o.initData(N(s,function(t){return t[0]}),null,l),a.initData(N(s,function(t){return t[1]}),null,l),r.initData(N(s,function(t){return t[2]})),r.hasItemOption=!0,{from:o,to:a,line:r}}(e,o,i),h=u.from,c=u.to,d=u.line;i.__from=h,i.__to=c,i.setData(d);var f=i.get("symbol"),p=i.get("symbolSize");function g(t,e,i){var n=t.getItemModel(e);cC(t,e,i,o,a),t.setItemVisual(e,{symbolSize:n.get("symbolSize")||p[i?0:1],symbol:n.get("symbol",!0)||f[i?0:1],color:n.get("itemStyle.color")||r.getVisual("color")})}k(f)||(f=[f,f]),"number"==typeof p&&(p=[p,p]),u.from.each(function(t){g(h,t,!0),g(c,t,!1)}),d.each(function(t){var e=d.getItemModel(t).get("lineStyle.color");d.setItemVisual(t,{color:e||h.getItemVisual(t,"color")}),d.setItemLayout(t,[h.getItemLayout(t),c.getItemLayout(t)]),d.setItemVisual(t,{fromSymbolSize:h.getItemVisual(t,"symbolSize"),fromSymbol:h.getItemVisual(t,"symbol"),toSymbolSize:c.getItemVisual(t,"symbolSize"),toSymbol:c.getItemVisual(t,"symbol")})}),l.updateData(d),u.line.eachItemGraphicEl(function(t,e){t.traverse(function(t){t.dataModel=i})}),l.__keep=!0,l.group.silent=i.get("silent")||o.get("silent")}}),ff(function(t){t.markLine=t.markLine||{}}),qD.extend({type:"markArea",defaultOption:{zlevel:0,z:1,tooltip:{trigger:"item"},animation:!1,label:{show:!0,position:"top"},itemStyle:{borderWidth:0},emphasis:{label:{show:!0,position:"top"}}}});function dC(t,e,i,n){var o=tC(t,n[0]),a=tC(t,n[1]),r=W,s=o.coord,l=a.coord;s[0]=r(s[0],-1/0),s[1]=r(s[1],-1/0),l[0]=r(l[0],1/0),l[1]=r(l[1],1/0);var u=p([{},o,a]);return u.coord=[o.coord,a.coord],u.x0=o.x,u.y0=o.y,u.x1=a.x,u.y1=a.y,u}function fC(t){return!isNaN(t)&&!isFinite(t)}function pC(t,e,i){var n=1-t;return fC(e[n])&&fC(i[n])}function gC(t,e){var i=e.coord[0],n=e.coord[1];return!("cartesian2d"!==t.type||!i||!n||!pC(1,i,n)&&!pC(0,i,n))||(iC(t,{coord:i,x:e.x0,y:e.y0})||iC(t,{coord:n,x:e.x1,y:e.y1}))}function mC(t,e,i,n,o){var a,r=n.coordinateSystem,s=t.getItemModel(e),l=Pl(s.get(i[0]),o.getWidth()),u=Pl(s.get(i[1]),o.getHeight());if(isNaN(l)||isNaN(u)){if(n.getMarkerPosition)a=n.getMarkerPosition(t.getValues(i,e));else{var h=[f=t.get(i[0],e),p=t.get(i[1],e)];r.clampData&&r.clampData(h,h),a=r.dataToPoint(h,!0)}if("cartesian2d"===r.type){var c=r.getAxis("x"),d=r.getAxis("y"),f=t.get(i[0],e),p=t.get(i[1],e);fC(f)?a[0]=c.toGlobalCoord(c.getExtent()["x0"===i[0]?0:1]):fC(p)&&(a[1]=d.toGlobalCoord(d.getExtent()["y0"===i[1]?0:1]))}isNaN(l)||(a[0]=l),isNaN(u)||(a[1]=u)}else a=[l,u];return a}var vC=[["x0","y0"],["x1","y0"],["x1","y1"],["x0","y1"]];aC.extend({type:"markArea",updateTransform:function(t,e,o){e.eachSeries(function(i){var t=i.markAreaModel;if(t){var n=t.getData();n.each(function(e){var t=N(vC,function(t){return mC(n,e,t,i,o)});n.setItemLayout(e,t),n.getItemGraphicEl(e).setShape("points",t)})}},this)},renderSeries:function(i,r,t,n){var e=i.coordinateSystem,o=i.id,a=i.getData(),s=this.markerGroupMap,l=s.get(o)||s.set(o,{group:new Ii});this.group.add(l.group),l.__keep=!0;var u=function(t,i,e){var n,o;o=t?(n=N(t&&t.dimensions,function(t){var e=i.getData();return C({name:t},e.getDimensionInfo(e.mapDimension(t))||{})}),new Wf(N(["x0","y0","x1","y1"],function(t,e){return{name:t,type:n[e%2].type}}),e)):new Wf(n=[{name:"value",type:"float"}],e);var a=N(e.get("data"),T(dC,i,t,e));t&&(a=M(a,T(gC,t)));var r=t?function(t,e,i,n){return t.coord[Math.floor(n/2)][n%2]}:function(t){return t.value};return o.initData(a,null,r),o.hasItemOption=!0,o}(e,i,r);r.setData(u),u.each(function(e){u.setItemLayout(e,N(vC,function(t){return mC(u,e,t,i,n)})),u.setItemVisual(e,{color:a.getVisual("color")})}),u.diff(l.__data).add(function(t){var e=new qr({shape:{points:u.getItemLayout(t)}});u.setItemGraphicEl(t,e),l.group.add(e)}).update(function(t,e){var i=l.__data.getItemGraphicEl(e);sl(i,{shape:{points:u.getItemLayout(t)}},r,t),l.group.add(i),u.setItemGraphicEl(t,i)}).remove(function(t){var e=l.__data.getItemGraphicEl(t);l.group.remove(e)}).execute(),u.eachItemGraphicEl(function(t,e){var i=u.getItemModel(e),n=i.getModel("label"),o=i.getModel("emphasis.label"),a=u.getItemVisual(e,"color");t.useStyle(C(i.getModel("itemStyle").getItemStyle(),{fill:Xe(a,.4),stroke:a})),t.hoverStyle=i.getModel("emphasis.itemStyle").getItemStyle(),$s(t.style,t.hoverStyle,n,o,{labelFetcher:r,labelDataIndex:e,defaultText:u.getName(e)||"",isRectText:!0,autoColor:a}),Ys(t,{}),t.dataModel=r}),l.__data=u,l.group.silent=r.get("silent")||i.get("silent")}}),ff(function(t){t.markArea=t.markArea||{}});var yC=Cc.legend.selector,xC={all:{type:"all",title:D(yC.all)},inverse:{type:"inverse",title:D(yC.inverse)}},_C=wf({type:"legend.plain",dependencies:["series"],layoutMode:{type:"box",ignoreSize:!0},init:function(t,e,i){this.mergeDefaultAndTheme(t,i),t.selected=t.selected||{},this._updateSelector(t)},mergeOption:function(t){_C.superCall(this,"mergeOption",t),this._updateSelector(t)},_updateSelector:function(t){var i=t.selector;!0===i&&(i=t.selector=["all","inverse"]),k(i)&&E(i,function(t,e){z(t)&&(t={type:t}),i[e]=m(t,xC[t.type])})},optionUpdated:function(){this._updateData(this.ecModel);var t=this._data;if(t[0]&&"single"===this.get("selectedMode")){for(var e=!1,i=0;i<t.length;i++){var n=t[i].get("name");if(this.isSelected(n)){this.select(n),e=!0;break}}e||this.select(t[0].get("name"))}},_updateData:function(o){var a=[],r=[];o.eachRawSeries(function(t){var e,i=t.name;if(r.push(i),t.legendVisualProvider){var n=t.legendVisualProvider.getAllNames();o.isSeriesFiltered(t)||(r=r.concat(n)),n.length?a=a.concat(n):e=!0}else e=!0;e&&Fo(t)&&a.push(t.name)}),this._availableNames=r;var t=N(this.get("data")||a,function(t){return"string"!=typeof t&&"number"!=typeof t||(t={name:t}),new Il(t,this,this.ecModel)},this);this._data=t},getData:function(){return this._data},select:function(t){var e=this.option.selected;"single"===this.get("selectedMode")&&E(this._data,function(t){e[t.get("name")]=!1});e[t]=!0},unSelect:function(t){"single"!==this.get("selectedMode")&&(this.option.selected[t]=!1)},toggleSelected:function(t){var e=this.option.selected;e.hasOwnProperty(t)||(e[t]=!0),this[e[t]?"unSelect":"select"](t)},allSelect:function(){var t=this._data,e=this.option.selected;E(t,function(t){e[t.get("name",!0)]=!0})},inverseSelect:function(){var t=this._data,i=this.option.selected;E(t,function(t){var e=t.get("name",!0);i.hasOwnProperty(e)||(i[e]=!0),i[e]=!i[e]})},isSelected:function(t){var e=this.option.selected;return!(e.hasOwnProperty(t)&&!e[t])&&0<=_(this._availableNames,t)},getOrient:function(){return"vertical"===this.get("orient")?{index:1,name:"vertical"}:{index:0,name:"horizontal"}},defaultOption:{zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:0,align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,inactiveColor:"#ccc",inactiveBorderColor:"#ccc",itemStyle:{borderWidth:0},textStyle:{color:"#333"},selectedMode:!0,selector:!1,selectorLabel:{show:!0,borderRadius:10,padding:[3,5,3,5],fontSize:12,fontFamily:" sans-serif",color:"#666",borderWidth:1,borderColor:"#666"},emphasis:{selectorLabel:{show:!0,color:"#eee",backgroundColor:"#666"}},selectorPosition:"auto",selectorItemGap:7,selectorButtonGap:10,tooltip:{show:!1}}});function wC(t,e,i){var o,a={},r="toggleSelected"===t;return i.eachComponent("legend",function(n){r&&null!=o?n[o?"select":"unSelect"](e.name):"allSelect"===t||"inverseSelect"===t?n[t]():(n[t](e.name),o=n.isSelected(e.name)),E(n.getData(),function(t){var e=t.get("name");if("\n"!==e&&""!==e){var i=n.isSelected(e);a.hasOwnProperty(e)?a[e]=a[e]&&i:a[e]=i}})}),"allSelect"===t||"inverseSelect"===t?{selected:a}:{name:e.name,selected:a}}gf("legendToggleSelect","legendselectchanged",T(wC,"toggleSelected")),gf("legendAllSelect","legendselectall",T(wC,"allSelect")),gf("legendInverseSelect","legendinverseselect",T(wC,"inverseSelect")),gf("legendSelect","legendselected",T(wC,"select")),gf("legendUnSelect","legendunselected",T(wC,"unSelect"));var bC=T,SC=E,MC=Ii,IC=bf({type:"legend.plain",newlineDisabled:!1,init:function(){this.group.add(this._contentGroup=new MC),this._backgroundEl,this.group.add(this._selectorGroup=new MC),this._isFirstRender=!0},getContentGroup:function(){return this._contentGroup},getSelectorGroup:function(){return this._selectorGroup},render:function(t,e,i){var n=this._isFirstRender;if(this._isFirstRender=!1,this.resetInner(),t.get("show",!0)){var o=t.get("align"),a=t.get("orient");o&&"auto"!==o||(o="right"===t.get("left")&&"vertical"===a?"right":"left");var r=t.get("selector",!0),s=t.get("selectorPosition",!0);!r||s&&"auto"!==s||(s="horizontal"===a?"end":"start"),this.renderInner(o,t,e,i,r,a,s);var l=t.getBoxLayoutParams(),u={width:i.getWidth(),height:i.getHeight()},h=t.get("padding"),c=vu(l,u,h),d=this.layoutInner(t,o,c,n,r,s),f=vu(C({width:d.width,height:d.height},l),u,h);this.group.attr("position",[f.x-d.x,f.y-d.y]),this.group.add(this._backgroundEl=XT(d,t))}},resetInner:function(){this.getContentGroup().removeAll(),this._backgroundEl&&this.group.remove(this._backgroundEl),this.getSelectorGroup().removeAll()},renderInner:function(u,h,c,d,t,e,i){var f=this.getContentGroup(),p=Q(),g=h.get("selectedMode"),m=[];c.eachRawSeries(function(t){t.get("legendHoverLink")||m.push(t.id)}),SC(h.getData(),function(a,r){var s=a.get("name");if(this.newlineDisabled||""!==s&&"\n"!==s){var t=c.getSeriesByName(s)[0];if(!p.get(s))if(t){var e=t.getData(),i=e.getVisual("color"),n=e.getVisual("borderColor");"function"==typeof i&&(i=i(t.getDataParams(0))),"function"==typeof n&&(n=n(t.getDataParams(0)));var o=e.getVisual("legendSymbol")||"roundRect",l=e.getVisual("symbol");this._createItem(s,r,a,h,o,l,u,i,n,g).on("click",bC(AC,s,null,d,m)).on("mouseover",bC(DC,t.name,null,d,m)).on("mouseout",bC(CC,t.name,null,d,m)),p.set(s,!0)}else c.eachRawSeries(function(t){if(!p.get(s)&&t.legendVisualProvider){var e=t.legendVisualProvider;if(!e.containName(s))return;var i=e.indexOfName(s),n=e.getItemVisual(i,"color"),o=e.getItemVisual(i,"borderColor");this._createItem(s,r,a,h,"roundRect",null,u,n,o,g).on("click",bC(AC,null,s,d,m)).on("mouseover",bC(DC,null,s,d,m)).on("mouseout",bC(CC,null,s,d,m)),p.set(s,!0)}},this)}else f.add(new MC({newline:!0}))},this),t&&this._createSelector(t,h,d,e,i)},_createSelector:function(t,a,r,e,i){var s=this.getSelectorGroup();SC(t,function(t){!function(t){var e=t.type,i=new Fr({style:{x:0,y:0,align:"center",verticalAlign:"middle"},onclick:function(){r.dispatchAction({type:"all"===e?"legendAllSelect":"legendInverseSelect"})}});s.add(i);var n=a.getModel("selectorLabel"),o=a.getModel("emphasis.selectorLabel");$s(i.style,i.hoverStyle={},n,o,{defaultText:t.title,isRectText:!1}),Ys(i)}(t)})},_createItem:function(t,e,i,n,o,a,r,s,l,u){var h=n.get("itemWidth"),c=n.get("itemHeight"),d=n.get("inactiveColor"),f=n.get("inactiveBorderColor"),p=n.get("symbolKeepAspect"),g=n.getModel("itemStyle"),m=n.isSelected(t),v=new MC,y=i.getModel("textStyle"),x=i.get("icon"),_=i.getModel("tooltip"),w=_.parentModel,b=mg(o=x||o,0,0,h,c,m?s:d,null==p||p);if(v.add(TC(b,o,g,l,f,m)),!x&&a&&(a!==o||"none"===a)){var S=.8*c;"none"===a&&(a="circle");var M=mg(a,(h-S)/2,(c-S)/2,S,S,m?s:d,null==p||p);v.add(TC(M,a,g,l,f,m))}var I="left"===r?h+5:-5,T=r,A=n.get("formatter"),D=t;"string"==typeof A&&A?D=A.replace("{name}",null!=t?t:""):"function"==typeof A&&(D=A(t)),v.add(new Fr({style:Qs({},y,{text:D,x:I,y:c/2,textFill:m?y.getTextColor():d,textAlign:T,textVerticalAlign:"middle"})}));var C=new is({shape:v.getBoundingRect(),invisible:!0,tooltip:_.get("show")?L({content:t,formatter:w.get("formatter",!0)||function(){return t},formatterParams:{componentType:"legend",legendIndex:n.componentIndex,name:t,$vars:["name"]}},_.option):null});return v.add(C),v.eachChild(function(t){t.silent=!0}),C.silent=!u,this.getContentGroup().add(v),Ys(v),v.__legendDataIndex=e,v},layoutInner:function(t,e,i,n,o,a){var r=this.getContentGroup(),s=this.getSelectorGroup();mu(t.get("orient"),r,t.get("itemGap"),i.width,i.height);var l=r.getBoundingRect(),u=[-l.x,-l.y];if(o){mu("horizontal",s,t.get("selectorItemGap",!0));var h=s.getBoundingRect(),c=[-h.x,-h.y],d=t.get("selectorButtonGap",!0),f=t.getOrient().index,p=0===f?"width":"height",g=0===f?"height":"width",m=0===f?"y":"x";"end"===a?c[f]+=l[p]+d:u[f]+=h[p]+d,c[1-f]+=l[g]/2-h[g]/2,s.attr("position",c),r.attr("position",u);var v={x:0,y:0};return v[p]=l[p]+d+h[p],v[g]=Math.max(l[g],h[g]),v[m]=Math.min(0,h[m]+c[1-f]),v}return r.attr("position",u),this.group.getBoundingRect()},remove:function(){this.getContentGroup().removeAll(),this._isFirstRender=!0}});function TC(t,e,i,n,o,a){var r;return"line"!==e&&e.indexOf("empty")<0?(r=i.getItemStyle(),t.style.stroke=n,a||(r.stroke=o)):r=i.getItemStyle(["borderWidth","borderColor"]),t.setStyle(r)}function AC(t,e,i,n){CC(t,e,i,n),i.dispatchAction({type:"legendToggleSelect",name:null!=t?t:e}),DC(t,e,i,n)}function DC(t,e,i,n){var o=i.getZr().storage.getDisplayList()[0];o&&o.useHoverLayer||i.dispatchAction({type:"highlight",seriesName:t,name:e,excludeSeriesId:n})}function CC(t,e,i,n){var o=i.getZr().storage.getDisplayList()[0];o&&o.useHoverLayer||i.dispatchAction({type:"downplay",seriesName:t,name:e,excludeSeriesId:n})}pf(Id.PROCESSOR.SERIES_FILTER,function(t){var i=t.findComponents({mainType:"legend"});i&&i.length&&t.filterSeries(function(t){for(var e=0;e<i.length;e++)if(!i[e].isSelected(t.name))return!1;return!0})}),Tu.registerSubTypeDefaulter("legend",function(){return"plain"});var LC=_C.extend({type:"legend.scroll",setScrollDataIndex:function(t){this.option.scrollDataIndex=t},defaultOption:{scrollDataIndex:0,pageButtonItemGap:5,pageButtonGap:null,pageButtonPosition:"end",pageFormatter:"{current}/{total}",pageIcons:{horizontal:["M0,0L12,-10L12,10z","M0,0L-12,-10L-12,10z"],vertical:["M0,0L20,0L10,-20z","M0,0L20,0L10,20z"]},pageIconColor:"#2f4554",pageIconInactiveColor:"#aaa",pageIconSize:15,pageTextStyle:{color:"#333"},animationDurationUpdate:800},init:function(t,e,i,n){var o=_u(t);LC.superCall(this,"init",t,e,i,n),kC(this,t,o)},mergeOption:function(t,e){LC.superCall(this,"mergeOption",t,e),kC(this,this.option,t)}});function kC(t,e,i){var n=[1,1];n[t.getOrient().index]=0,xu(e,i,{type:"box",ignoreSize:n})}var PC=Ii,NC=["width","height"],OC=["x","y"],EC=IC.extend({type:"legend.scroll",newlineDisabled:!0,init:function(){EC.superCall(this,"init"),this._currentIndex=0,this.group.add(this._containerGroup=new PC),this._containerGroup.add(this.getContentGroup()),this.group.add(this._controllerGroup=new PC),this._showController},resetInner:function(){EC.superCall(this,"resetInner"),this._controllerGroup.removeAll(),this._containerGroup.removeClipPath(),this._containerGroup.__rectSize=null},renderInner:function(t,o,e,a,i,n,r){var s=this;EC.superCall(this,"renderInner",t,o,e,a,i,n,r);var l=this._controllerGroup,u=o.get("pageIconSize",!0);k(u)||(u=[u,u]),c("pagePrev",0);var h=o.getModel("pageTextStyle");function c(t,e){var i=t+"DataIndex",n=pl(o.get("pageIcons",!0)[o.getOrient().name][e],{onclick:A(s._pageGo,s,i,o,a)},{x:-u[0]/2,y:-u[1]/2,width:u[0],height:u[1]});n.name=t,l.add(n)}l.add(new Fr({name:"pageText",style:{textFill:h.getTextColor(),font:h.getFont(),textVerticalAlign:"middle",textAlign:"center"},silent:!0})),c("pageNext",1)},layoutInner:function(t,e,i,n,o,a){var r=this.getSelectorGroup(),s=t.getOrient().index,l=NC[s],u=OC[s],h=NC[1-s],c=OC[1-s];o&&mu("horizontal",r,t.get("selectorItemGap",!0));var d=t.get("selectorButtonGap",!0),f=r.getBoundingRect(),p=[-f.x,-f.y],g=D(i);o&&(g[l]=i[l]-f[l]-d);var m=this._layoutContentAndController(t,n,g,s,l,h,c);if(o){if("end"===a)p[s]+=m[l]+d;else{var v=f[l]+d;p[s]-=v,m[u]-=v}m[l]+=f[l]+d,p[1-s]+=m[c]+m[h]/2-f[h]/2,m[h]=Math.max(m[h],f[h]),m[c]=Math.min(m[c],f[c]+p[1-s]),r.attr("position",p)}return m},_layoutContentAndController:function(t,e,i,n,o,a,r){var s=this.getContentGroup(),l=this._containerGroup,u=this._controllerGroup;mu(t.get("orient"),s,t.get("itemGap"),n?i.width:null,n?null:i.height),mu("horizontal",u,t.get("pageButtonItemGap",!0));var h=s.getBoundingRect(),c=u.getBoundingRect(),d=this._showController=h[o]>i[o],f=[-h.x,-h.y];e||(f[n]=s.position[n]);var p=[0,0],g=[-c.x,-c.y],m=H(t.get("pageButtonGap",!0),t.get("itemGap",!0));d&&("end"===t.get("pageButtonPosition",!0)?g[n]+=i[o]-c[o]:p[n]+=c[o]+m);g[1-n]+=h[a]/2-c[a]/2,s.attr("position",f),l.attr("position",p),u.attr("position",g);var v={x:0,y:0};if(v[o]=d?i[o]:h[o],v[a]=Math.max(h[a],c[a]),v[r]=Math.min(0,c[r]+g[1-n]),l.__rectSize=i[o],d){var y={x:0,y:0};y[o]=Math.max(i[o]-c[o]-m,0),y[a]=v[a],l.setClipPath(new is({shape:y})),l.__rectSize=y[o]}else u.eachChild(function(t){t.attr({invisible:!0,silent:!0})});var x=this._getPageInfo(t);return null!=x.pageIndex&&sl(s,{position:x.contentPosition},d&&t),this._updatePageInfoView(t,x),v},_pageGo:function(t,e,i){var n=this._getPageInfo(e)[t];null!=n&&i.dispatchAction({type:"legendScroll",scrollDataIndex:n,legendId:e.id})},_updatePageInfoView:function(n,o){var a=this._controllerGroup;E(["pagePrev","pageNext"],function(t){var e=null!=o[t+"DataIndex"],i=a.childOfName(t);i&&(i.setStyle("fill",e?n.get("pageIconColor",!0):n.get("pageIconInactiveColor",!0)),i.cursor=e?"pointer":"default")});var t=a.childOfName("pageText"),e=n.get("pageFormatter"),i=o.pageIndex,r=null!=i?i+1:0,s=o.pageCount;t&&e&&t.setStyle("text",z(e)?e.replace("{current}",r).replace("{total}",s):e({current:r,total:s}))},_getPageInfo:function(t){var e=t.get("scrollDataIndex",!0),i=this.getContentGroup(),n=this._containerGroup.__rectSize,o=t.getOrient().index,a=NC[o],r=OC[o],s=this._findTargetItemIndex(e),l=i.children(),u=l[s],h=l.length,c=h?1:0,d={contentPosition:i.position.slice(),pageCount:c,pageIndex:c-1,pagePrevDataIndex:null,pageNextDataIndex:null};if(!u)return d;var f=y(u);d.contentPosition[o]=-f.s;for(var p=s+1,g=f,m=f,v=null;p<=h;++p)(!(v=y(l[p]))&&m.e>g.s+n||v&&!x(v,g.s))&&(g=m.i>g.i?m:v)&&(null==d.pageNextDataIndex&&(d.pageNextDataIndex=g.i),++d.pageCount),m=v;for(p=s-1,g=f,m=f,v=null;-1<=p;--p)(v=y(l[p]))&&x(m,v.s)||!(g.i<m.i)||(m=g,null==d.pagePrevDataIndex&&(d.pagePrevDataIndex=g.i),++d.pageCount,++d.pageIndex),g=v;return d;function y(t){if(t){var e=t.getBoundingRect(),i=e[r]+t.position[o];return{s:i,e:i+e[a],i:t.__legendDataIndex}}}function x(t,e){return t.e>=e&&t.s<=e+n}},_findTargetItemIndex:function(n){var o,a,t=this.getContentGroup();return this._showController&&t.eachChild(function(t,e){var i=t.__legendDataIndex;null==a&&null!=i&&(a=e),i===n&&(o=e)}),null!=o?o:a}});gf("legendScroll","legendscroll",function(t,e){var i=t.scrollDataIndex;null!=i&&e.eachComponent({mainType:"legend",subType:"scroll",query:t},function(t){t.setScrollDataIndex(i)})});WA.extend({type:"dataZoom.slider",layoutMode:"box",defaultOption:{show:!0,right:"ph",top:"ph",width:"ph",height:"ph",left:null,bottom:null,backgroundColor:"rgba(47,69,84,0)",dataBackground:{lineStyle:{color:"#2f4554",width:.5,opacity:.3},areaStyle:{color:"rgba(47,69,84,0.3)",opacity:.3}},borderColor:"#ddd",fillerColor:"rgba(167,183,204,0.4)",handleIcon:"M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",handleSize:"100%",handleStyle:{color:"#a7b7cc"},labelPrecision:null,labelFormatter:null,showDetail:!0,showDataShadow:"auto",realtime:!0,zoomLock:!1,textStyle:{color:"#333"}}});var zC=is,RC=kl,BC=Ol,VC=A,GC=E,FC="horizontal",WC="vertical",HC=["line","bar","candlestick","scatter"],ZC=UA.extend({type:"dataZoom.slider",init:function(t,e){this._displayables={},this._orient,this._range,this._handleEnds,this._size,this._handleWidth,this._handleHeight,this._location,this._dragging,this._dataShadowInfo,this.api=e},render:function(t,e,i,n){ZC.superApply(this,"render",arguments),Tc(this,"_dispatchZoomAction",this.dataZoomModel.get("throttle"),"fixRate"),this._orient=t.get("orient"),!1!==this.dataZoomModel.get("show")?(n&&"dataZoom"===n.type&&n.from===this.uid||this._buildView(),this._updateView()):this.group.removeAll()},remove:function(){ZC.superApply(this,"remove",arguments),Ac(this,"_dispatchZoomAction")},dispose:function(){ZC.superApply(this,"dispose",arguments),Ac(this,"_dispatchZoomAction")},_buildView:function(){var t=this.group;t.removeAll(),this._resetLocation(),this._resetInterval();var e=this._displayables.barGroup=new Ii;this._renderBackground(),this._renderHandle(),this._renderDataShadow(),t.add(e),this._positionGroup()},_resetLocation:function(){var t=this.dataZoomModel,e=this.api,i=this._findCoordRect(),n={width:e.getWidth(),height:e.getHeight()},o=this._orient===FC?{right:n.width-i.x-i.width,top:n.height-30-7,width:i.width,height:30}:{right:7,top:i.y,width:30,height:i.height},a=_u(t.option);E(["right","top","width","height"],function(t){"ph"===a[t]&&(a[t]=o[t])});var r=vu(a,n,t.padding);this._location={x:r.x,y:r.y},this._size=[r.width,r.height],this._orient===WC&&this._size.reverse()},_positionGroup:function(){var t=this.group,e=this._location,i=this._orient,n=this.dataZoomModel.getFirstTargetAxisModel(),o=n&&n.get("inverse"),a=this._displayables.barGroup,r=(this._dataShadowInfo||{}).otherAxisInverse;a.attr(i!==FC||o?i===FC&&o?{scale:r?[-1,1]:[-1,-1]}:i!==WC||o?{scale:r?[-1,-1]:[-1,1],rotation:Math.PI/2}:{scale:r?[1,-1]:[1,1],rotation:Math.PI/2}:{scale:r?[1,1]:[1,-1]});var s=t.getBoundingRect([a]);t.attr("position",[e.x-s.x,e.y-s.y])},_getViewExtent:function(){return[0,this._size[0]]},_renderBackground:function(){var t=this.dataZoomModel,e=this._size,i=this._displayables.barGroup;i.add(new zC({silent:!0,shape:{x:0,y:0,width:e[0],height:e[1]},style:{fill:t.get("backgroundColor")},z2:-40})),i.add(new zC({shape:{x:0,y:0,width:e[0],height:e[1]},style:{fill:"transparent"},z2:0,onclick:A(this._onClickPanelClick,this)}))},_renderDataShadow:function(){var t=this._dataShadowInfo=this._prepareDataShadowInfo();if(t){var e=this._size,i=t.series,n=i.getRawData(),o=i.getShadowDim?i.getShadowDim():t.otherDim;if(null!=o){var a=n.getDataExtent(o),r=.3*(a[1]-a[0]);a=[a[0]-r,a[1]+r];var s,l=[0,e[1]],u=[0,e[0]],h=[[e[0],0],[0,0]],c=[],d=u[1]/(n.count()-1),f=0,p=Math.round(n.count()/e[0]);n.each([o],function(t,e){if(0<p&&e%p)f+=d;else{var i=null==t||isNaN(t)||""===t,n=i?0:RC(t,a,l,!0);i&&!s&&e?(h.push([h[h.length-1][0],0]),c.push([c[c.length-1][0],0])):!i&&s&&(h.push([f,0]),c.push([f,0])),h.push([f,n]),c.push([f,n]),f+=d,s=i}});var g=this.dataZoomModel;this._displayables.barGroup.add(new qr({shape:{points:h},style:C({fill:g.get("dataBackgroundColor")},g.getModel("dataBackground.areaStyle").getAreaStyle()),silent:!0,z2:-20})),this._displayables.barGroup.add(new Kr({shape:{points:c},style:g.getModel("dataBackground.lineStyle").getLineStyle(),silent:!0,z2:-19}))}}},_prepareDataShadowInfo:function(){var t=this.dataZoomModel,s=t.get("showDataShadow");if(!1!==s){var l,u=this.ecModel;return t.eachTargetAxis(function(a,r){E(t.getAxisProxy(a.name,r).getTargetSeriesModels(),function(t){if(!(l||!0!==s&&_(HC,t.get("type"))<0)){var e,i=u.getComponent(a.axis,r).axis,n=function(t){return{x:"y",y:"x",radius:"angle",angle:"radius"}[t]}(a.name),o=t.coordinateSystem;null!=n&&o.getOtherAxis&&(e=o.getOtherAxis(i).inverse),n=t.getData().mapDimension(n),l={thisAxis:i,series:t,thisDim:a.name,otherDim:n,otherAxisInverse:e}}},this)},this),l}},_renderHandle:function(){var t=this._displayables,a=t.handles=[],r=t.handleLabels=[],s=this._displayables.barGroup,e=this._size,l=this.dataZoomModel;s.add(t.filler=new zC({draggable:!0,cursor:UC(this._orient),drift:VC(this._onDragMove,this,"all"),ondragstart:VC(this._showDataInfo,this,!0),ondragend:VC(this._onDragEnd,this),onmouseover:VC(this._showDataInfo,this,!0),onmouseout:VC(this._showDataInfo,this,!1),style:{fill:l.get("fillerColor"),textPosition:"inside"}})),s.add(new zC({silent:!0,subPixelOptimize:!0,shape:{x:0,y:0,width:e[0],height:e[1]},style:{stroke:l.get("dataBackgroundColor")||l.get("borderColor"),lineWidth:1,fill:"rgba(0,0,0,0)"}})),GC([0,1],function(t){var e=pl(l.get("handleIcon"),{cursor:UC(this._orient),draggable:!0,drift:VC(this._onDragMove,this,t),ondragend:VC(this._onDragEnd,this),onmouseover:VC(this._showDataInfo,this,!0),onmouseout:VC(this._showDataInfo,this,!1)},{x:-1,y:0,width:2,height:2}),i=e.getBoundingRect();this._handleHeight=Pl(l.get("handleSize"),this._size[1]),this._handleWidth=i.width/i.height*this._handleHeight,e.setStyle(l.getModel("handleStyle").getItemStyle());var n=l.get("handleColor");null!=n&&(e.style.fill=n),s.add(a[t]=e);var o=l.textStyleModel;this.group.add(r[t]=new Fr({silent:!0,invisible:!0,style:{x:0,y:0,text:"",textVerticalAlign:"middle",textAlign:"center",textFill:o.getTextColor(),textFont:o.getFont()},z2:10}))},this)},_resetInterval:function(){var t=this._range=this.dataZoomModel.getPercentRange(),e=this._getViewExtent();this._handleEnds=[RC(t[0],[0,100],e,!0),RC(t[1],[0,100],e,!0)]},_updateInterval:function(t,e){var i=this.dataZoomModel,n=this._handleEnds,o=this._getViewExtent(),a=i.findRepresentativeAxisProxy().getMinMaxSpan(),r=[0,100];Ww(e,n,o,i.get("zoomLock")?"all":t,null!=a.minSpan?RC(a.minSpan,r,o,!0):null,null!=a.maxSpan?RC(a.maxSpan,r,o,!0):null);var s=this._range,l=this._range=BC([RC(n[0],o,r,!0),RC(n[1],o,r,!0)]);return!s||s[0]!==l[0]||s[1]!==l[1]},_updateView:function(t){var n=this._displayables,o=this._handleEnds,e=BC(o.slice()),a=this._size;GC([0,1],function(t){var e=n.handles[t],i=this._handleHeight;e.attr({scale:[i/2,i/2],position:[o[t],a[1]/2-i/2]})},this),n.filler.setShape({x:e[0],y:0,width:e[1]-e[0],height:a[1]}),this._updateDataInfo(t)},_updateDataInfo:function(t){var e=this.dataZoomModel,a=this._displayables,r=a.handleLabels,s=this._orient,l=["",""];if(e.get("showDetail")){var i=e.findRepresentativeAxisProxy();if(i){var n=i.getAxisModel().axis,o=this._range,u=t?i.calculateDataWindow({start:o[0],end:o[1]}).valueWindow:i.getDataValueWindow();l=[this._formatLabel(u[0],n),this._formatLabel(u[1],n)]}}var h=BC(this._handleEnds.slice());function c(t){var e=ul(a.handles[t].parent,this.group),i=cl(0===t?"right":"left",e),n=this._handleWidth/2+5,o=hl([h[t]+(0===t?-n:n),this._size[1]/2],e);r[t].setStyle({x:o[0],y:o[1],textVerticalAlign:s===FC?"middle":i,textAlign:s===FC?i:"center",text:l[t]})}c.call(this,0),c.call(this,1)},_formatLabel:function(t,e){var i=this.dataZoomModel,n=i.get("labelFormatter"),o=i.get("labelPrecision");null!=o&&"auto"!==o||(o=e.getPixelPrecision());var a=null==t||isNaN(t)?"":"category"===e.type||"time"===e.type?e.scale.getLabel(Math.round(t)):t.toFixed(Math.min(o,20));return O(n)?n(t,a):z(n)?n.replace("{value}",a):a},_showDataInfo:function(t){t=this._dragging||t;var e=this._displayables.handleLabels;e[0].attr("invisible",!t),e[1].attr("invisible",!t)},_onDragMove:function(t,e,i,n){this._dragging=!0,Wt(n.event);var o=hl([e,i],this._displayables.barGroup.getLocalTransform(),!0),a=this._updateInterval(t,o[0]),r=this.dataZoomModel.get("realtime");this._updateView(!r),a&&r&&this._dispatchZoomAction()},_onDragEnd:function(){this._dragging=!1,this._showDataInfo(!1),this.dataZoomModel.get("realtime")||this._dispatchZoomAction()},_onClickPanelClick:function(t){var e=this._size,i=this._displayables.barGroup.transformCoordToLocal(t.offsetX,t.offsetY);if(!(i[0]<0||i[0]>e[0]||i[1]<0||i[1]>e[1])){var n=this._handleEnds,o=(n[0]+n[1])/2,a=this._updateInterval("all",i[0]-o);this._updateView(),a&&this._dispatchZoomAction()}},_dispatchZoomAction:function(){var t=this._range;this.api.dispatchAction({type:"dataZoom",from:this.uid,dataZoomId:this.dataZoomModel.id,start:t[0],end:t[1]})},_findCoordRect:function(){var i;if(GC(this.getTargetCoordInfo(),function(t){if(!i&&t.length){var e=t[0].model.coordinateSystem;i=e.getRect&&e.getRect()}}),!i){var t=this.api.getWidth(),e=this.api.getHeight();i={x:.2*t,y:.2*e,width:.6*t,height:.6*e}}return i}});function UC(t){return"vertical"===t?"ns-resize":"ew-resize"}WA.extend({type:"dataZoom.inside",defaultOption:{disabled:!1,zoomLock:!1,zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!1,preventDefaultMouseMove:!0}});var XC="\0_ec_dataZoom_roams";function YC(t,n){var e=qC(t),o=n.dataZoomId,a=n.coordId;E(e,function(t,e){var i=t.dataZoomInfos;i[o]&&_(n.allCoordIds,a)<0&&(delete i[o],t.count--)}),KC(e);var i=e[a];i||((i=e[a]={coordId:a,dataZoomInfos:{},count:0}).controller=function(t,r){var e=new Ly(t.getZr());return E(["pan","zoom","scrollMove"],function(a){e.on(a,function(n){var o=[];E(r.dataZoomInfos,function(t){if(n.isAvailableBehavior(t.dataZoomModel.option)){var e=(t.getRange||{})[a],i=e&&e(r.controller,n);!t.dataZoomModel.get("disabled",!0)&&i&&o.push({dataZoomId:t.dataZoomId,start:i[0],end:i[1]})}}),o.length&&r.dispatchAction(o)})}),e}(t,i),i.dispatchAction=T($C,t)),i.dataZoomInfos[o]||i.count++,i.dataZoomInfos[o]=n;var r=function(t){var n,o={type_true:2,type_move:1,type_false:0,type_undefined:-1},a=!0;return E(t,function(t){var e=t.dataZoomModel,i=!e.get("disabled",!0)&&(!e.get("zoomLock",!0)||"move");o["type_"+n]<o["type_"+i]&&(n=i),a&=e.get("preventDefaultMouseMove",!0)}),{controlType:n,opt:{zoomOnMouseWheel:!0,moveOnMouseMove:!0,moveOnMouseWheel:!0,preventDefaultMouseMove:!!a}}}(i.dataZoomInfos);i.controller.enable(r.controlType,r.opt),i.controller.setPointerChecker(n.containsPoint),Tc(i,"dispatchAction",n.dataZoomModel.get("throttle",!0),"fixRate")}function jC(t){return t.type+"\0_"+t.id}function qC(t){var e=t.getZr();return e[XC]||(e[XC]={})}function KC(i){E(i,function(t,e){t.count||(t.controller.dispose(),delete i[e])})}function $C(t,e){t.dispatchAction({type:"dataZoom",batch:e})}var JC=A,QC=UA.extend({type:"dataZoom.inside",init:function(t,e){this._range},render:function(r,t,s,e){QC.superApply(this,"render",arguments),this._range=r.getPercentRange(),E(this.getTargetCoordInfo(),function(t,o){var a=N(t,function(t){return jC(t.model)});E(t,function(e){var n=e.model,i={};E(["pan","zoom","scrollMove"],function(t){i[t]=JC(tL[t],this,e,o)},this),YC(s,{coordId:jC(n),allCoordIds:a,containsPoint:function(t,e,i){return n.coordinateSystem.containPoint([e,i])},dataZoomId:r.id,dataZoomModel:r,getRange:i})},this)},this)},dispose:function(){!function(t,i){var e=qC(t);E(e,function(t){t.controller.dispose();var e=t.dataZoomInfos;e[i]&&(delete e[i],t.count--)}),KC(e)}(this.api,this.dataZoomModel.id),QC.superApply(this,"dispose",arguments),this._range=null}}),tL={zoom:function(t,e,i,n){var o=this._range,a=o.slice(),r=t.axisModels[0];if(r){var s=nL[e](null,[n.originX,n.originY],r,i,t),l=(0<s.signal?s.pixelStart+s.pixelLength-s.pixel:s.pixel-s.pixelStart)/s.pixelLength*(a[1]-a[0])+a[0],u=Math.max(1/n.scale,0);a[0]=(a[0]-l)*u+l,a[1]=(a[1]-l)*u+l;var h=this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();return Ww(0,a,[0,100],0,h.minSpan,h.maxSpan),this._range=a,o[0]!==a[0]||o[1]!==a[1]?a:void 0}},pan:eL(function(t,e,i,n,o,a){var r=nL[n]([a.oldX,a.oldY],[a.newX,a.newY],e,o,i);return r.signal*(t[1]-t[0])*r.pixel/r.pixelLength}),scrollMove:eL(function(t,e,i,n,o,a){return nL[n]([0,0],[a.scrollDelta,a.scrollDelta],e,o,i).signal*(t[1]-t[0])*a.scrollDelta})};function eL(l){return function(t,e,i,n){var o=this._range,a=o.slice(),r=t.axisModels[0];if(r){var s=l(a,r,t,e,i,n);return Ww(s,a,[0,100],"all"),this._range=a,o[0]!==a[0]||o[1]!==a[1]?a:void 0}}}function iL(t){var e=t&&t.visualMap;k(e)||(e=e?[e]:[]),oL(e,function(t){if(t){aL(t,"splitList")&&!aL(t,"pieces")&&(t.pieces=t.splitList,delete t.splitList);var e=t.pieces;e&&k(e)&&oL(e,function(t){R(t)&&(aL(t,"start")&&!aL(t,"min")&&(t.min=t.start),aL(t,"end")&&!aL(t,"max")&&(t.max=t.end))})}})}var nL={grid:function(t,e,i,n,o){var a=i.axis,r={},s=o.model.coordinateSystem.getRect();return t=t||[0,0],"x"===a.dim?(r.pixel=e[0]-t[0],r.pixelLength=s.width,r.pixelStart=s.x,r.signal=a.inverse?1:-1):(r.pixel=e[1]-t[1],r.pixelLength=s.height,r.pixelStart=s.y,r.signal=a.inverse?-1:1),r},polar:function(t,e,i,n,o){var a=i.axis,r={},s=o.model.coordinateSystem,l=s.getRadiusAxis().getExtent(),u=s.getAngleAxis().getExtent();return t=t?s.pointToCoord(t):[0,0],e=s.pointToCoord(e),"radiusAxis"===i.mainType?(r.pixel=e[0]-t[0],r.pixelLength=l[1]-l[0],r.pixelStart=l[0],r.signal=a.inverse?1:-1):(r.pixel=e[1]-t[1],r.pixelLength=u[1]-u[0],r.pixelStart=u[0],r.signal=a.inverse?-1:1),r},singleAxis:function(t,e,i,n,o){var a=i.axis,r=o.model.coordinateSystem.getRect(),s={};return t=t||[0,0],"horizontal"===a.orient?(s.pixel=e[0]-t[0],s.pixelLength=r.width,s.pixelStart=r.x,s.signal=a.inverse?1:-1):(s.pixel=e[1]-t[1],s.pixelLength=r.height,s.pixelStart=r.y,s.signal=a.inverse?-1:1),s}},oL=E;function aL(t,e){return t&&t.hasOwnProperty&&t.hasOwnProperty(e)}Tu.registerSubTypeDefaulter("visualMap",function(t){return t.categories||(t.pieces?0<t.pieces.length:0<t.splitNumber)&&!t.calculable?"piecewise":"continuous"});var rL=Id.VISUAL.COMPONENT;function sL(t,e,i,n){for(var o=e.targetVisuals[n],a=a_.prepareVisualTypes(o),r={color:t.getData().getVisual("color")},s=0,l=a.length;s<l;s++){var u=a[s],h=o["opacity"===u?"__alphaForOpacity":u];h&&h.applyVisual(i,c,d)}return r.color;function c(t){return r[t]}function d(t,e){r[t]=e}}yf(rL,{createOnAllSeries:!0,reset:function(i,t){var n=[];return t.eachComponent("visualMap",function(t){var e=i.pipelineContext;!t.isTargetSeries(i)||e&&e.large||n.push(function(t,f,p,g){var m={};return E(t,function(t){var e=a_.prepareVisualTypes(f[t]);m[t]=e}),{progress:function(t,i){function e(t){return i.getItemVisual(o,t)}function n(t,e){i.setItemVisual(o,t,e)}var o;for(null!=g&&(g=i.getDimension(g));null!=(o=t.next());){var a=i.getRawDataItem(o);if(!a||!1!==a.visualMap)for(var r=null!=g?i.get(g,o,!0):o,s=p(r),l=f[s],u=m[s],h=0,c=u.length;h<c;h++){var d=u[h];l[d]&&l[d].applyVisual(r,e,n)}}}}}(t.stateList,t.targetVisuals,A(t.getValueState,t),t.getDataDimension(i.getData())))}),n}}),yf(rL,{createOnAllSeries:!0,reset:function(o,t){var a=o.getData(),r=[];t.eachComponent("visualMap",function(t){if(t.isTargetSeries(o)){var e=t.getVisualMeta(A(sL,null,o,t))||{stops:[],outerColors:[]},i=t.getDataDimension(a),n=a.getDimensionInfo(i);null!=n&&(e.dimension=n.index,r.push(e))}}),o.getData().setVisual("visualMeta",r)}});var lL=function(t,e,i){var n=D((uL[t]||{})[e]);return i&&k(n)?n[n.length-1]:n},uL={color:{active:["#006edd","#e0ffff"],inactive:["rgba(0,0,0,0)"]},colorHue:{active:[0,360],inactive:[0,0]},colorSaturation:{active:[.3,1],inactive:[0,0]},colorLightness:{active:[.9,.5],inactive:[0,0]},colorAlpha:{active:[.3,1],inactive:[0,0]},opacity:{active:[.3,1],inactive:[0,0]},symbol:{active:["circle","roundRect","diamond"],inactive:["none"]},symbolSize:{active:[10,50],inactive:[0,0]}},hL=a_.mapVisual,cL=a_.eachVisual,dL=k,fL=E,pL=Ol,gL=kl,mL=wf({type:"visualMap",dependencies:["series"],stateList:["inRange","outOfRange"],replacableOptionKeys:["inRange","outOfRange","target","controller","color"],dataBound:[-1/0,1/0],layoutMode:{type:"box",ignoreSize:!0},defaultOption:{show:!0,zlevel:0,z:4,seriesIndex:"all",min:0,max:200,dimension:null,inRange:null,outOfRange:null,left:0,right:null,top:null,bottom:0,itemWidth:null,itemHeight:null,inverse:!1,orient:"vertical",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",contentColor:"#5793f3",inactiveColor:"#aaa",borderWidth:0,padding:5,textGap:10,precision:0,color:null,formatter:null,text:null,textStyle:{color:"#333"}},init:function(t,e,i){this._dataExtent,this.targetVisuals={},this.controllerVisuals={},this.textStyleModel,this.itemSize,this.mergeDefaultAndTheme(t,i)},optionUpdated:function(t,e){var i=this.option;v.canvasSupported||(i.realtime=!1),e||vD(i,t,this.replacableOptionKeys),this.textStyleModel=this.getModel("textStyle"),this.resetItemSize(),this.completeVisualOption()},resetVisual:function(t){var e=this.stateList;t=A(t,this),this.controllerVisuals=mD(this.option.controller,e,t),this.targetVisuals=mD(this.option.target,e,t)},getTargetSeriesIndices:function(){var t=this.option.seriesIndex,i=[];return null==t||"all"===t?this.ecModel.eachSeries(function(t,e){i.push(e)}):i=Eo(t),i},eachTargetSeries:function(e,i){E(this.getTargetSeriesIndices(),function(t){e.call(i,this.ecModel.getSeriesByIndex(t))},this)},isTargetSeries:function(e){var i=!1;return this.eachTargetSeries(function(t){t===e&&(i=!0)}),i},formatValueText:function(t,e,i){var n,o,a=this.option,r=a.precision,s=this.dataBound,l=a.formatter;return i=i||["<",">"],k(t)&&(t=t.slice(),n=!0),o=e?t:n?[u(t[0]),u(t[1])]:u(t),z(l)?l.replace("{value}",n?o[0]:o).replace("{value2}",n?o[1]:o):O(l)?n?l(t[0],t[1]):l(t):n?t[0]===s[0]?i[0]+" "+o[1]:t[1]===s[1]?i[1]+" "+o[0]:o[0]+" - "+o[1]:o;function u(t){return t===s[0]?"min":t===s[1]?"max":(+t).toFixed(Math.min(r,20))}},resetExtent:function(){var t=this.option,e=pL([t.min,t.max]);this._dataExtent=e},getDataDimension:function(t){var e=this.option.dimension,i=t.dimensions;if(null!=e||i.length){if(null!=e)return t.getDimension(e);for(var n=t.dimensions,o=n.length-1;0<=o;o--){var a=n[o];if(!t.getDimensionInfo(a).isCalculationCoord)return a}}},getExtent:function(){return this._dataExtent.slice()},completeVisualOption:function(){var t=this.ecModel,e=this.option,i={inRange:e.inRange,outOfRange:e.outOfRange},n=e.target||(e.target={}),o=e.controller||(e.controller={});m(n,i),m(o,i);var u=this.isCategory();function a(n){dL(e.color)&&!n.inRange&&(n.inRange={color:e.color.slice().reverse()}),n.inRange=n.inRange||{color:t.get("gradientColor")},fL(this.stateList,function(t){var e=n[t];if(z(e)){var i=lL(e,"active",u);i?(n[t]={},n[t][e]=i):delete n[t]}},this)}a.call(this,n),a.call(this,o),function(t,e,i){var n=t[e],o=t[i];n&&!o&&(o=t[i]={},fL(n,function(t,e){if(a_.isValidType(e)){var i=lL(e,"inactive",u);null!=i&&(o[e]=i,"color"!==e||o.hasOwnProperty("opacity")||o.hasOwnProperty("colorAlpha")||(o.opacity=[0,0]))}}))}.call(this,n,"inRange","outOfRange"),function(a){var r=(a.inRange||{}).symbol||(a.outOfRange||{}).symbol,s=(a.inRange||{}).symbolSize||(a.outOfRange||{}).symbolSize,l=this.get("inactiveColor");fL(this.stateList,function(t){var e=this.itemSize,i=a[t];null==(i=i||(a[t]={color:u?l:[l]})).symbol&&(i.symbol=r&&D(r)||(u?"roundRect":["roundRect"])),null==i.symbolSize&&(i.symbolSize=s&&D(s)||(u?e[0]:[e[0],e[0]])),i.symbol=hL(i.symbol,function(t){return"none"===t||"square"===t?"roundRect":t});var n=i.symbolSize;if(null!=n){var o=-1/0;cL(n,function(t){o<t&&(o=t)}),i.symbolSize=hL(n,function(t){return gL(t,[0,o],[0,e[0]],!0)})}},this)}.call(this,o)},resetItemSize:function(){this.itemSize=[parseFloat(this.get("itemWidth")),parseFloat(this.get("itemHeight"))]},isCategory:function(){return!!this.option.categories},setSelected:et,getValueState:et,getVisualMeta:et}),vL=[20,140],yL=mL.extend({type:"visualMap.continuous",defaultOption:{align:"auto",calculable:!1,range:null,realtime:!0,itemHeight:null,itemWidth:null,hoverLink:!0,hoverLinkDataSize:null,hoverLinkOnHandle:null},optionUpdated:function(t,e){yL.superApply(this,"optionUpdated",arguments),this.resetExtent(),this.resetVisual(function(t){t.mappingMethod="linear",t.dataExtent=this.getExtent()}),this._resetRange()},resetItemSize:function(){yL.superApply(this,"resetItemSize",arguments);var t=this.itemSize;"horizontal"===this._orient&&t.reverse(),null!=t[0]&&!isNaN(t[0])||(t[0]=vL[0]),null!=t[1]&&!isNaN(t[1])||(t[1]=vL[1])},_resetRange:function(){var t=this.getExtent(),e=this.option.range;!e||e.auto?(t.auto=1,this.option.range=t):k(e)&&(e[0]>e[1]&&e.reverse(),e[0]=Math.max(e[0],t[0]),e[1]=Math.min(e[1],t[1]))},completeVisualOption:function(){mL.prototype.completeVisualOption.apply(this,arguments),E(this.stateList,function(t){var e=this.option.controller[t].symbolSize;e&&e[0]!==e[1]&&(e[0]=0)},this)},setSelected:function(t){this.option.range=t.slice(),this._resetRange()},getSelected:function(){var t=this.getExtent(),e=Ol((this.get("range")||[]).slice());return e[0]>t[1]&&(e[0]=t[1]),e[1]>t[1]&&(e[1]=t[1]),e[0]<t[0]&&(e[0]=t[0]),e[1]<t[0]&&(e[1]=t[0]),e},getValueState:function(t){var e=this.option.range,i=this.getExtent();return(e[0]<=i[0]||e[0]<=t)&&(e[1]>=i[1]||t<=e[1])?"inRange":"outOfRange"},findTargetDataIndices:function(n){var o=[];return this.eachTargetSeries(function(t){var i=[],e=t.getData();e.each(this.getDataDimension(e),function(t,e){n[0]<=t&&t<=n[1]&&i.push(e)},this),o.push({seriesId:t.id,dataIndex:i})},this),o},getVisualMeta:function(i){var t=xL(this,"outOfRange",this.getExtent()),e=xL(this,"inRange",this.option.range.slice()),n=[];function o(t,e){n.push({value:t,color:i(t,e)})}for(var a=0,r=0,s=e.length,l=t.length;r<l&&(!e.length||t[r]<=e[0]);r++)t[r]<e[a]&&o(t[r],"outOfRange");for(var u=1;a<s;a++,u=0)u&&n.length&&o(e[a],"outOfRange"),o(e[a],"inRange");for(u=1;r<l;r++)(!e.length||e[e.length-1]<t[r])&&(u&&(n.length&&o(n[n.length-1].value,"outOfRange"),u=0),o(t[r],"outOfRange"));var h=n.length;return{stops:n,outerColors:[h?n[0].color:"transparent",h?n[h-1].color:"transparent"]}}});function xL(t,e,i){if(i[0]===i[1])return i.slice();for(var n=(i[1]-i[0])/200,o=i[0],a=[],r=0;r<=200&&o<i[1];r++)a.push(o),o+=n;return a.push(i[1]),a}var _L=bf({type:"visualMap",autoPositionValues:{left:1,right:1,top:1,bottom:1},init:function(t,e){this.ecModel=t,this.api=e,this.visualMapModel},render:function(t,e,i,n){!1!==(this.visualMapModel=t).get("show")?this.doRender.apply(this,arguments):this.group.removeAll()},renderBackground:function(t){var e=this.visualMapModel,i=Jl(e.get("padding")||0),n=t.getBoundingRect();t.add(new is({z2:-1,silent:!0,shape:{x:n.x-i[3],y:n.y-i[0],width:n.width+i[3]+i[1],height:n.height+i[0]+i[2]},style:{fill:e.get("backgroundColor"),stroke:e.get("borderColor"),lineWidth:e.get("borderWidth")}}))},getControllerVisual:function(i,n,o){var t=(o=o||{}).forceState,e=this.visualMapModel,a={};if("symbol"===n&&(a.symbol=e.get("itemSymbol")),"color"===n){var r=e.get("contentColor");a.color=r}function s(t){return a[t]}function l(t,e){a[t]=e}var u=e.controllerVisuals[t||e.getValueState(i)];return E(a_.prepareVisualTypes(u),function(t){var e=u[t];o.convertOpacityToAlpha&&"opacity"===t&&(t="colorAlpha",e=u.__alphaForOpacity),a_.dependsOn(t,n)&&e&&e.applyVisual(i,s,l)}),a[n]},positionGroup:function(t){var e=this.visualMapModel,i=this.api;yu(t,e.getBoxLayoutParams(),{width:i.getWidth(),height:i.getHeight()})},doRender:et});function wL(t,e,i){var n=t.option,o=n.align;if(null!=o&&"auto"!==o)return o;for(var a={width:e.getWidth(),height:e.getHeight()},r="horizontal"===n.orient?1:0,s=[["left","right","width"],["top","bottom","height"]],l=s[r],u=[0,null,10],h={},c=0;c<3;c++)h[s[1-r][c]]=u[c],h[l[c]]=2===c?i[0]:n[l[c]];var d=[["x","width",3],["y","height",0]][r],f=vu(h,a,n.padding);return l[(f.margin[d[2]]||0)+f[d[0]]+.5*f[d[1]]<.5*a[d[1]]?0:1]}function bL(t,e){return E(t||[],function(t){null!=t.dataIndex&&(t.dataIndexInside=t.dataIndex,t.dataIndex=null),t.highlightKey="visualMap"+(e?e.componentIndex:"")}),t}var SL=kl,ML=E,IL=Math.min,TL=Math.max,AL=_L.extend({type:"visualMap.continuous",init:function(){AL.superApply(this,"init",arguments),this._shapes={},this._dataInterval=[],this._handleEnds=[],this._orient,this._useHandle,this._hoverLinkDataIndices=[],this._dragging,this._hovering},doRender:function(t,e,i,n){n&&"selectDataRange"===n.type&&n.from===this.uid||this._buildView()},_buildView:function(){this.group.removeAll();var t=this.visualMapModel,e=this.group;this._orient=t.get("orient"),this._useHandle=t.get("calculable"),this._resetInterval(),this._renderBar(e);var i=t.get("text");this._renderEndsText(e,i,0),this._renderEndsText(e,i,1),this._updateView(!0),this.renderBackground(e),this._updateView(),this._enableHoverLinkToSeries(),this._enableHoverLinkFromSeries(),this.positionGroup(e)},_renderEndsText:function(t,e,i){if(e){var n=e[1-i];n=null!=n?n+"":"";var o=this.visualMapModel,a=o.get("textGap"),r=o.itemSize,s=this._shapes.barGroup,l=this._applyTransform([r[0]/2,0===i?-a:r[1]+a],s),u=this._applyTransform(0===i?"bottom":"top",s),h=this._orient,c=this.visualMapModel.textStyleModel;this.group.add(new Fr({style:{x:l[0],y:l[1],textVerticalAlign:"horizontal"===h?"middle":u,textAlign:"horizontal"===h?u:"center",text:n,textFont:c.getFont(),textFill:c.getTextColor()}}))}},_renderBar:function(t){var e=this.visualMapModel,i=this._shapes,n=e.itemSize,o=this._orient,a=this._useHandle,r=wL(e,this.api,n),s=i.barGroup=this._createBarGroup(r);s.add(i.outOfRange=DL()),s.add(i.inRange=DL(null,a?LL(this._orient):null,A(this._dragHandle,this,"all",!1),A(this._dragHandle,this,"all",!0)));var l=e.textStyleModel.getTextRect("国"),u=TL(l.width,l.height);a&&(i.handleThumbs=[],i.handleLabels=[],i.handleLabelPoints=[],this._createHandle(s,0,n,u,o,r),this._createHandle(s,1,n,u,o,r)),this._createIndicator(s,n,u,o),t.add(s)},_createHandle:function(t,e,i,n,o){var a=A(this._dragHandle,this,e,!1),r=A(this._dragHandle,this,e,!0),s=DL(function(t,e){return 0===t?[[0,0],[e,0],[e,-e]]:[[0,0],[e,0],[e,e]]}(e,n),LL(this._orient),a,r);s.position[0]=i[0],t.add(s);var l=this.visualMapModel.textStyleModel,u=new Fr({draggable:!0,drift:a,onmousemove:function(t){Wt(t.event)},ondragend:r,style:{x:0,y:0,text:"",textFont:l.getFont(),textFill:l.getTextColor()}});this.group.add(u);var h=["horizontal"===o?n/2:1.5*n,"horizontal"===o?0===e?-1.5*n:1.5*n:0===e?-n/2:n/2],c=this._shapes;c.handleThumbs[e]=s,c.handleLabelPoints[e]=h,c.handleLabels[e]=u},_createIndicator:function(t,e,i,n){var o=DL([[0,0]],"move");o.position[0]=e[0],o.attr({invisible:!0,silent:!0}),t.add(o);var a=this.visualMapModel.textStyleModel,r=new Fr({silent:!0,invisible:!0,style:{x:0,y:0,text:"",textFont:a.getFont(),textFill:a.getTextColor()}});this.group.add(r);var s=["horizontal"===n?i/2:9,0],l=this._shapes;l.indicator=o,l.indicatorLabel=r,l.indicatorLabelPoint=s},_dragHandle:function(t,e,i,n){if(this._useHandle){if(this._dragging=!e,!e){var o=this._applyTransform([i,n],this._shapes.barGroup,!0);this._updateInterval(t,o[1]),this._updateView()}e===!this.visualMapModel.get("realtime")&&this.api.dispatchAction({type:"selectDataRange",from:this.uid,visualMapId:this.visualMapModel.id,selected:this._dataInterval.slice()}),e?this._hovering||this._clearHoverLinkToSeries():CL(this.visualMapModel)&&this._doHoverLinkToSeries(this._handleEnds[t],!1)}},_resetInterval:function(){var t=this.visualMapModel,e=this._dataInterval=t.getSelected(),i=t.getExtent(),n=[0,t.itemSize[1]];this._handleEnds=[SL(e[0],i,n,!0),SL(e[1],i,n,!0)]},_updateInterval:function(t,e){e=e||0;var i=this.visualMapModel,n=this._handleEnds,o=[0,i.itemSize[1]];Ww(e,n,o,t,0);var a=i.getExtent();this._dataInterval=[SL(n[0],o,a,!0),SL(n[1],o,a,!0)]},_updateView:function(t){var e=this.visualMapModel,i=e.getExtent(),n=this._shapes,o=[0,e.itemSize[1]],a=t?o:this._handleEnds,r=this._createBarVisual(this._dataInterval,i,a,"inRange"),s=this._createBarVisual(i,i,o,"outOfRange");n.inRange.setStyle({fill:r.barColor,opacity:r.opacity}).setShape("points",r.barPoints),n.outOfRange.setStyle({fill:s.barColor,opacity:s.opacity}).setShape("points",s.barPoints),this._updateHandle(a,r)},_createBarVisual:function(t,e,i,n){var o={forceState:n,convertOpacityToAlpha:!0},a=this._makeColorGradient(t,o),r=[this.getControllerVisual(t[0],"symbolSize",o),this.getControllerVisual(t[1],"symbolSize",o)],s=this._createBarPoints(i,r);return{barColor:new cs(0,0,0,1,a),barPoints:s,handlesColor:[a[0].color,a[a.length-1].color]}},_makeColorGradient:function(t,e){var i=[],n=(t[1]-t[0])/100;i.push({color:this.getControllerVisual(t[0],"color",e),offset:0});for(var o=1;o<100;o++){var a=t[0]+n*o;if(a>t[1])break;i.push({color:this.getControllerVisual(a,"color",e),offset:o/100})}return i.push({color:this.getControllerVisual(t[1],"color",e),offset:1}),i},_createBarPoints:function(t,e){var i=this.visualMapModel.itemSize;return[[i[0]-e[0],t[0]],[i[0],t[0]],[i[0],t[1]],[i[0]-e[1],t[1]]]},_createBarGroup:function(t){var e=this._orient,i=this.visualMapModel.get("inverse");return new Ii("horizontal"!==e||i?"horizontal"===e&&i?{scale:"bottom"===t?[-1,1]:[1,1],rotation:-Math.PI/2}:"vertical"!==e||i?{scale:"left"===t?[1,1]:[-1,1]}:{scale:"left"===t?[1,-1]:[-1,-1]}:{scale:"bottom"===t?[1,1]:[-1,1],rotation:Math.PI/2})},_updateHandle:function(n,o){if(this._useHandle){var a=this._shapes,r=this.visualMapModel,s=a.handleThumbs,l=a.handleLabels;ML([0,1],function(t){var e=s[t];e.setStyle("fill",o.handlesColor[t]),e.position[1]=n[t];var i=hl(a.handleLabelPoints[t],ul(e,this.group));l[t].setStyle({x:i[0],y:i[1],text:r.formatValueText(this._dataInterval[t]),textVerticalAlign:"middle",textAlign:this._applyTransform("horizontal"===this._orient?0===t?"bottom":"top":"left",a.barGroup)})},this)}},_showIndicator:function(t,e,i,n){var o=this.visualMapModel,a=o.getExtent(),r=o.itemSize,s=[0,r[1]],l=SL(t,a,s,!0),u=this._shapes,h=u.indicator;if(h){h.position[1]=l,h.attr("invisible",!1),h.setShape("points",function(t,e,i,n){return t?[[0,-IL(e,TL(i,0))],[6,0],[0,IL(e,TL(n-i,0))]]:[[0,0],[5,-5],[5,5]]}(!!i,n,l,r[1]));var c=this.getControllerVisual(t,"color",{convertOpacityToAlpha:!0});h.setStyle("fill",c);var d=hl(u.indicatorLabelPoint,ul(h,this.group)),f=u.indicatorLabel;f.attr("invisible",!1);var p=this._applyTransform("left",u.barGroup),g=this._orient;f.setStyle({text:(i||"")+o.formatValueText(e),textVerticalAlign:"horizontal"===g?p:"middle",textAlign:"horizontal"===g?"center":p,x:d[0],y:d[1]})}},_enableHoverLinkToSeries:function(){var n=this;this._shapes.barGroup.on("mousemove",function(t){if(n._hovering=!0,!n._dragging){var e=n.visualMapModel.itemSize,i=n._applyTransform([t.offsetX,t.offsetY],n._shapes.barGroup,!0,!0);i[1]=IL(TL(0,i[1]),e[1]),n._doHoverLinkToSeries(i[1],0<=i[0]&&i[0]<=e[0])}}).on("mouseout",function(){n._hovering=!1,n._dragging||n._clearHoverLinkToSeries()})},_enableHoverLinkFromSeries:function(){var t=this.api.getZr();this.visualMapModel.option.hoverLink?(t.on("mouseover",this._hoverLinkFromSeriesMouseOver,this),t.on("mouseout",this._hideIndicator,this)):this._clearHoverLinkFromSeries()},_doHoverLinkToSeries:function(t,e){var i=this.visualMapModel,n=i.itemSize;if(i.option.hoverLink){var o=[0,n[1]],a=i.getExtent();t=IL(TL(o[0],t),o[1]);var r=function(t,e,i){var n=6,o=t.get("hoverLinkDataSize");o&&(n=SL(o,e,i,!0)/2);return n}(i,a,o),s=[t-r,t+r],l=SL(t,o,a,!0),u=[SL(s[0],o,a,!0),SL(s[1],o,a,!0)];s[0]<o[0]&&(u[0]=-1/0),o[1]<s[1]&&(u[1]=1/0),e&&(u[0]===-1/0?this._showIndicator(l,u[1],"< ",r):u[1]===1/0?this._showIndicator(l,u[0],"> ",r):this._showIndicator(l,l,"≈ ",r));var h=this._hoverLinkDataIndices,c=[];(e||CL(i))&&(c=this._hoverLinkDataIndices=i.findTargetDataIndices(u));var d=function(t,e){var i={},n={};return o(t||[],i),o(e||[],n,i),[a(i),a(n)];function o(t,e,i){for(var n=0,o=t.length;n<o;n++)for(var a=t[n].seriesId,r=Eo(t[n].dataIndex),s=i&&i[a],l=0,u=r.length;l<u;l++){var h=r[l];s&&s[h]?s[h]=null:(e[a]||(e[a]={}))[h]=1}}function a(t,e){var i=[];for(var n in t)if(t.hasOwnProperty(n)&&null!=t[n])if(e)i.push(+n);else{var o=a(t[n],!0);o.length&&i.push({seriesId:n,dataIndex:o})}return i}}(h,c);this._dispatchHighDown("downplay",bL(d[0],i)),this._dispatchHighDown("highlight",bL(d[1],i))}},_hoverLinkFromSeriesMouseOver:function(t){var e=t.target,i=this.visualMapModel;if(e&&null!=e.dataIndex){var n=this.ecModel.getSeriesByIndex(e.seriesIndex);if(i.isTargetSeries(n)){var o=n.getData(e.dataType),a=o.get(i.getDataDimension(o),e.dataIndex,!0);isNaN(a)||this._showIndicator(a,a)}}},_hideIndicator:function(){var t=this._shapes;t.indicator&&t.indicator.attr("invisible",!0),t.indicatorLabel&&t.indicatorLabel.attr("invisible",!0)},_clearHoverLinkToSeries:function(){this._hideIndicator();var t=this._hoverLinkDataIndices;this._dispatchHighDown("downplay",bL(t,this.visualMapModel)),t.length=0},_clearHoverLinkFromSeries:function(){this._hideIndicator();var t=this.api.getZr();t.off("mouseover",this._hoverLinkFromSeriesMouseOver),t.off("mouseout",this._hideIndicator)},_applyTransform:function(t,e,i,n){var o=ul(e,n?null:this.group);return yl[k(t)?"applyTransform":"transformDirection"](t,o,i)},_dispatchHighDown:function(t,e){e&&e.length&&this.api.dispatchAction({type:t,batch:e})},dispose:function(){this._clearHoverLinkFromSeries(),this._clearHoverLinkToSeries()},remove:function(){this._clearHoverLinkFromSeries(),this._clearHoverLinkToSeries()}});function DL(t,e,i,n){return new qr({shape:{points:t},draggable:!!i,cursor:e,drift:i,onmousemove:function(t){Wt(t.event)},ondragend:n})}function CL(t){var e=t.get("hoverLinkOnHandle");return!!(null==e?t.get("realtime"):e)}function LL(t){return"vertical"===t?"ns-resize":"ew-resize"}gf({type:"selectDataRange",event:"dataRangeSelected",update:"update"},function(e,t){t.eachComponent({mainType:"visualMap",query:e},function(t){t.setSelected(e.selected)})}),ff(iL);var kL=mL.extend({type:"visualMap.piecewise",defaultOption:{selected:null,minOpen:!1,maxOpen:!1,align:"auto",itemWidth:20,itemHeight:14,itemSymbol:"roundRect",pieceList:null,categories:null,splitNumber:5,selectedMode:"multiple",itemGap:10,hoverLink:!0,showLabel:null},optionUpdated:function(t,e){kL.superApply(this,"optionUpdated",arguments),this._pieceList=[],this.resetExtent();var i=this._mode=this._determineMode();PL[this._mode].call(this),this._resetSelected(t,e);var n=this.option.categories;this.resetVisual(function(t,e){"categories"===i?(t.mappingMethod="category",t.categories=D(n)):(t.dataExtent=this.getExtent(),t.mappingMethod="piecewise",t.pieceList=N(this._pieceList,function(t){t=D(t);return"inRange"!==e&&(t.visual=null),t}))})},completeVisualOption:function(){var n=this.option,i={},t=a_.listVisualTypes(),o=this.isCategory();function a(t,e,i){return t&&t[e]&&(R(t[e])?t[e].hasOwnProperty(i):t[e]===i)}E(n.pieces,function(e){E(t,function(t){e.hasOwnProperty(t)&&(i[t]=1)})}),E(i,function(t,e){var i=0;E(this.stateList,function(t){i|=a(n,t,e)||a(n.target,t,e)},this),i||E(this.stateList,function(t){(n[t]||(n[t]={}))[e]=lL(e,"inRange"===t?"active":"inactive",o)})},this),mL.prototype.completeVisualOption.apply(this,arguments)},_resetSelected:function(t,e){var i=this.option,n=this._pieceList,o=(e?i:t).selected||{};if(i.selected=o,E(n,function(t,e){var i=this.getSelectedMapKey(t);o.hasOwnProperty(i)||(o[i]=!0)},this),"single"===i.selectedMode){var a=!1;E(n,function(t,e){var i=this.getSelectedMapKey(t);o[i]&&(a?o[i]=!1:a=!0)},this)}},getSelectedMapKey:function(t){return"categories"===this._mode?t.value+"":t.index+""},getPieceList:function(){return this._pieceList},_determineMode:function(){var t=this.option;return t.pieces&&0<t.pieces.length?"pieces":this.option.categories?"categories":"splitNumber"},setSelected:function(t){this.option.selected=D(t)},getValueState:function(t){var e=a_.findPieceIndex(t,this._pieceList);return null!=e&&this.option.selected[this.getSelectedMapKey(this._pieceList[e])]?"inRange":"outOfRange"},findTargetDataIndices:function(n){var o=[];return this.eachTargetSeries(function(t){var i=[],e=t.getData();e.each(this.getDataDimension(e),function(t,e){a_.findPieceIndex(t,this._pieceList)===n&&i.push(e)},this),o.push({seriesId:t.id,dataIndex:i})},this),o},getRepresentValue:function(t){var e;if(this.isCategory())e=t.value;else if(null!=t.value)e=t.value;else{var i=t.interval||[];e=i[0]===-1/0&&i[1]===1/0?0:(i[0]+i[1])/2}return e},getVisualMeta:function(o){if(!this.isCategory()){var a=[],r=[],s=this,t=this._pieceList.slice();if(t.length){var e=t[0].interval[0];e!==-1/0&&t.unshift({interval:[-1/0,e]}),(e=t[t.length-1].interval[1])!==1/0&&t.push({interval:[e,1/0]})}else t.push({interval:[-1/0,1/0]});var i=-1/0;return E(t,function(t){var e=t.interval;e&&(e[0]>i&&n([i,e[0]],"outOfRange"),n(e.slice()),i=e[1])},this),{stops:a,outerColors:r}}function n(t,e){var i=s.getRepresentValue({interval:t});e=e||s.getValueState(i);var n=o(i,e);t[0]===-1/0?r[0]=n:t[1]===1/0?r[1]=n:a.push({value:t[0],color:n},{value:t[1],color:n})}}}),PL={splitNumber:function(){var t=this.option,e=this._pieceList,i=Math.min(t.precision,20),n=this.getExtent(),o=t.splitNumber;o=Math.max(parseInt(o,10),1),t.splitNumber=o;for(var a=(n[1]-n[0])/o;+a.toFixed(i)!==a&&i<5;)i++;t.precision=i,a=+a.toFixed(i);var r=0;t.minOpen&&e.push({index:r++,interval:[-1/0,n[0]],close:[0,0]});for(var s=n[0],l=r+o;r<l;s+=a){var u=r===o-1?n[1]:s+a;e.push({index:r++,interval:[s,u],close:[1,1]})}t.maxOpen&&e.push({index:r++,interval:[n[1],1/0],close:[0,0]}),Yl(e),E(e,function(t){t.text=this.formatValueText(t.interval)},this)},categories:function(){var t=this.option;E(t.categories,function(t){this._pieceList.push({text:this.formatValueText(t,!0),value:t})},this),NL(t,this._pieceList)},pieces:function(){var t=this.option,d=this._pieceList;E(t.pieces,function(t,e){R(t)||(t={value:t});var i={text:"",index:e};if(null!=t.label&&(i.text=t.label),t.hasOwnProperty("value")){var n=i.value=t.value;i.interval=[n,n],i.close=[1,1]}else{for(var o=i.interval=[],a=i.close=[0,0],r=[1,0,1],s=[-1/0,1/0],l=[],u=0;u<2;u++){for(var h=[["gte","gt","min"],["lte","lt","max"]][u],c=0;c<3&&null==o[u];c++)o[u]=t[h[c]],a[u]=r[c],l[u]=2===c;null==o[u]&&(o[u]=s[u])}l[0]&&o[1]===1/0&&(a[0]=0),l[1]&&o[0]===-1/0&&(a[1]=0),o[0]===o[1]&&a[0]&&a[1]&&(i.value=o[0])}i.visual=a_.retrieveVisuals(t),d.push(i)},this),NL(t,d),Yl(d),E(d,function(t){var e=t.close,i=[["<","≤"][e[1]],[">","≥"][e[0]]];t.text=t.text||this.formatValueText(null!=t.value?t.value:t.interval,!1,i)},this)}};function NL(t,e){var i=t.inverse;("vertical"===t.orient?!i:i)&&e.reverse()}_L.extend({type:"visualMap.piecewise",doRender:function(){var a=this.group;a.removeAll();var r=this.visualMapModel,s=r.get("textGap"),t=r.textStyleModel,l=t.getFont(),u=t.getTextColor(),h=this._getItemAlign(),c=r.itemSize,e=this._getViewData(),i=e.endsText,d=W(r.get("showLabel",!0),!i);i&&this._renderEndsText(a,i[0],c,d,h),E(e.viewPieceList,function(t){var e=t.piece,i=new Ii;i.onclick=A(this._onItemClick,this,e),this._enableHoverLink(i,t.indexInModelPieceList);var n=r.getRepresentValue(e);if(this._createItemSymbol(i,n,[0,0,c[0],c[1]]),d){var o=this.visualMapModel.getValueState(n);i.add(new Fr({style:{x:"right"===h?-s:c[0]+s,y:c[1]/2,text:e.text,textVerticalAlign:"middle",textAlign:h,textFont:l,textFill:u,opacity:"outOfRange"===o?.5:1}}))}a.add(i)},this),i&&this._renderEndsText(a,i[1],c,d,h),mu(r.get("orient"),a,r.get("itemGap")),this.renderBackground(a),this.positionGroup(a)},_enableHoverLink:function(t,i){function e(t){var e=this.visualMapModel;e.option.hoverLink&&this.api.dispatchAction({type:t,batch:bL(e.findTargetDataIndices(i),e)})}t.on("mouseover",A(e,this,"highlight")).on("mouseout",A(e,this,"downplay"))},_getItemAlign:function(){var t=this.visualMapModel,e=t.option;if("vertical"===e.orient)return wL(t,this.api,t.itemSize);var i=e.align;return i&&"auto"!==i||(i="left"),i},_renderEndsText:function(t,e,i,n,o){if(e){var a=new Ii,r=this.visualMapModel.textStyleModel;a.add(new Fr({style:{x:n?"right"===o?i[0]:0:i[0]/2,y:i[1]/2,textVerticalAlign:"middle",textAlign:n?o:"center",text:e,textFont:r.getFont(),textFill:r.getTextColor()}})),t.add(a)}},_getViewData:function(){var t=this.visualMapModel,e=N(t.getPieceList(),function(t,e){return{piece:t,indexInModelPieceList:e}}),i=t.get("text"),n=t.get("orient"),o=t.get("inverse");return("horizontal"===n?o:!o)?e.reverse():i=i&&i.slice().reverse(),{viewPieceList:e,endsText:i}},_createItemSymbol:function(t,e,i){t.add(mg(this.getControllerVisual(e,"symbol"),i[0],i[1],i[2],i[3],this.getControllerVisual(e,"color")))},_onItemClick:function(t){var e=this.visualMapModel,i=e.option,n=D(i.selected),o=e.getSelectedMapKey(t);"single"===i.selectedMode?(n[o]=!0,E(n,function(t,e){n[e]=e===o})):n[o]=!n[o],this.api.dispatchAction({type:"selectDataRange",from:this.uid,visualMapId:this.visualMapModel.id,selected:n})}});ff(iL);var OL,EL="urn:schemas-microsoft-com:vml",zL="undefined"==typeof window?null:window,RL=!1,BL=zL&&zL.document;function VL(t){return OL(t)}if(BL&&!v.canvasSupported)try{BL.namespaces.zrvml||BL.namespaces.add("zrvml",EL),OL=function(t){return BL.createElement("<zrvml:"+t+' class="zrvml">')}}catch(t){OL=function(t){return BL.createElement("<"+t+' xmlns="'+EL+'" class="zrvml">')}}var GL,FL=ir.CMD,WL=Math.round,HL=Math.sqrt,ZL=Math.abs,UL=Math.cos,XL=Math.sin,YL=Math.max;if(!v.canvasSupported){var jL=",",qL="progid:DXImageTransform.Microsoft",KL=21600,$L=KL/2,JL=function(t){t.style.cssText="position:absolute;left:0;top:0;width:1px;height:1px;",t.coordsize=KL+","+KL,t.coordorigin="0,0"},QL=function(t,e,i){return"rgb("+[t,e,i].join(",")+")"},tk=function(t,e){e&&t&&e.parentNode!==t&&t.appendChild(e)},ek=function(t,e){e&&t&&e.parentNode===t&&t.removeChild(e)},ik=function(t,e,i){return 1e5*(parseFloat(t)||0)+1e3*(parseFloat(e)||0)+i},nk=Hn,ok=function(t,e,i){var n=Re(e);i=+i,isNaN(i)&&(i=1),n&&(t.color=QL(n[0],n[1],n[2]),t.opacity=i*n[3])},ak=function(t,e,i,n){var o="fill"===e,a=t.getElementsByTagName(e)[0];null!=i[e]&&"none"!==i[e]&&(o||!o&&i.lineWidth)?(t[o?"filled":"stroked"]="true",i[e]instanceof ss&&ek(t,a),a=a||VL(e),o?function(t,e,i){var n,o,a=e.fill;if(null!=a)if(a instanceof ss){var r,s=0,l=[0,0],u=0,h=1,c=i.getBoundingRect(),d=c.width,f=c.height;if("linear"===a.type){r="gradient";var p=i.transform,g=[a.x*d,a.y*f],m=[a.x2*d,a.y2*f];p&&(bt(g,g,p),bt(m,m,p));var v=m[0]-g[0],y=m[1]-g[1];(s=180*Math.atan2(v,y)/Math.PI)<0&&(s+=360),s<1e-6&&(s=0)}else{r="gradientradial";g=[a.x*d,a.y*f],p=i.transform;var x=i.scale,_=d,w=f;l=[(g[0]-c.x)/_,(g[1]-c.y)/w],p&&bt(g,g,p),_/=x[0]*KL,w/=x[1]*KL;var b=YL(_,w);u=0/b,h=2*a.r/b-u}var S=a.colorStops.slice();S.sort(function(t,e){return t.offset-e.offset});for(var M=S.length,I=[],T=[],A=0;A<M;A++){var D=S[A],C=(n=D.color,void 0,o=Re(n),[QL(o[0],o[1],o[2]),o[3]]);T.push(D.offset*h+u+" "+C[0]),0!==A&&A!==M-1||I.push(C)}if(2<=M){var L=I[0][0],k=I[1][0],P=I[0][1]*e.opacity,N=I[1][1]*e.opacity;t.type=r,t.method="none",t.focus="100%",t.angle=s,t.color=L,t.color2=k,t.colors=T.join(","),t.opacity=N,t.opacity2=P}"radial"===r&&(t.focusposition=l.join(","))}else ok(t,a,e.opacity)}(a,i,n):function(t,e){e.lineDash&&(t.dashstyle=e.lineDash.join(" ")),null==e.stroke||e.stroke instanceof ss||ok(t,e.stroke,e.opacity)}(a,i),tk(t,a)):(t[o?"filled":"stroked"]="false",ek(t,a))},rk=[[],[],[]];Sr.prototype.brushVML=function(t){var e=this.style,i=this._vmlEl;i||(i=VL("shape"),JL(i),this._vmlEl=i),ak(i,"fill",e,this),ak(i,"stroke",e,this);var n=this.transform,o=null!=n,a=i.getElementsByTagName("stroke")[0];if(a){var r=e.lineWidth;if(o&&!e.strokeNoScale){var s=n[0]*n[3]-n[1]*n[2];r*=HL(ZL(s))}a.weight=r+"px"}var l=this.path||(this.path=new ir);this.__dirtyPath&&(l.beginPath(),l.subPixelOptimize=!1,this.buildPath(l,this.shape),l.toStatic(),this.__dirtyPath=!1),i.path=function(t,e){var i,n,o,a,r,s,l=FL.M,u=FL.C,h=FL.L,c=FL.A,d=FL.Q,f=[],p=t.data,g=t.len();for(a=0;a<g;){switch(n="",i=0,o=p[a++]){case l:n=" m ",i=1,r=p[a++],s=p[a++],rk[0][0]=r,rk[0][1]=s;break;case h:n=" l ",i=1,r=p[a++],s=p[a++],rk[0][0]=r,rk[0][1]=s;break;case d:case u:n=" c ",i=3;var m,v,y=p[a++],x=p[a++],_=p[a++],w=p[a++];o===d?(_=((m=_)+2*y)/3,w=((v=w)+2*x)/3,y=(r+2*y)/3,x=(s+2*x)/3):(m=p[a++],v=p[a++]),rk[0][0]=y,rk[0][1]=x,rk[1][0]=_,rk[1][1]=w,r=rk[2][0]=m,s=rk[2][1]=v;break;case c:var b=0,S=0,M=1,I=1,T=0;e&&(b=e[4],S=e[5],M=HL(e[0]*e[0]+e[1]*e[1]),I=HL(e[2]*e[2]+e[3]*e[3]),T=Math.atan2(-e[1]/I,e[0]/M));var A=p[a++],D=p[a++],C=p[a++],L=p[a++],k=p[a++]+T,P=p[a++]+k+T;a++;var N=p[a++],O=A+UL(k)*C,E=D+XL(k)*L,z=(y=A+UL(P)*C,x=D+XL(P)*L,N?" wa ":" at ");Math.abs(O-y)<1e-4&&(.01<Math.abs(P-k)?N&&(O+=.0125):Math.abs(E-D)<1e-4?N&&O<A||!N&&A<O?x-=.0125:x+=.0125:N&&E<D||!N&&D<E?y+=.0125:y-=.0125),f.push(z,WL(((A-C)*M+b)*KL-$L),jL,WL(((D-L)*I+S)*KL-$L),jL,WL(((A+C)*M+b)*KL-$L),jL,WL(((D+L)*I+S)*KL-$L),jL,WL((O*M+b)*KL-$L),jL,WL((E*I+S)*KL-$L),jL,WL((y*M+b)*KL-$L),jL,WL((x*I+S)*KL-$L)),r=y,s=x;break;case FL.R:var R=rk[0],B=rk[1];R[0]=p[a++],R[1]=p[a++],B[0]=R[0]+p[a++],B[1]=R[1]+p[a++],e&&(bt(R,R,e),bt(B,B,e)),R[0]=WL(R[0]*KL-$L),B[0]=WL(B[0]*KL-$L),R[1]=WL(R[1]*KL-$L),B[1]=WL(B[1]*KL-$L),f.push(" m ",R[0],jL,R[1]," l ",B[0],jL,R[1]," l ",B[0],jL,B[1]," l ",R[0],jL,B[1]);break;case FL.Z:f.push(" x ")}if(0<i){f.push(n);for(var V=0;V<i;V++){var G=rk[V];e&&bt(G,G,e),f.push(WL(G[0]*KL-$L),jL,WL(G[1]*KL-$L),V<i-1?jL:"")}}}return f.join("")}(l,this.transform),i.style.zIndex=ik(this.zlevel,this.z,this.z2),tk(t,i),null!=e.text?this.drawRectText(t,this.getBoundingRect()):this.removeRectText(t)},Sr.prototype.onRemove=function(t){ek(t,this._vmlEl),this.removeRectText(t)},Sr.prototype.onAdd=function(t){tk(t,this._vmlEl),this.appendRectText(t)};qn.prototype.brushVML=function(t){var e,i,n=this.style,o=n.image;if(function(t){return"object"==typeof t&&t.tagName&&"IMG"===t.tagName.toUpperCase()}(o)){var a=o.src;if(a===this._imageSrc)e=this._imageWidth,i=this._imageHeight;else{var r=o.runtimeStyle,s=r.width,l=r.height;r.width="auto",r.height="auto",e=o.width,i=o.height,r.width=s,r.height=l,this._imageSrc=a,this._imageWidth=e,this._imageHeight=i}o=a}else o===this._imageSrc&&(e=this._imageWidth,i=this._imageHeight);if(o){var u=n.x||0,h=n.y||0,c=n.width,d=n.height,f=n.sWidth,p=n.sHeight,g=n.sx||0,m=n.sy||0,v=f&&p,y=this._vmlEl;y||(y=BL.createElement("div"),JL(y),this._vmlEl=y);var x,_=y.style,w=!1,b=1,S=1;if(this.transform&&(x=this.transform,b=HL(x[0]*x[0]+x[1]*x[1]),S=HL(x[2]*x[2]+x[3]*x[3]),w=x[1]||x[2]),w){var M=[u,h],I=[u+c,h],T=[u,h+d],A=[u+c,h+d];bt(M,M,x),bt(I,I,x),bt(T,T,x),bt(A,A,x);var D=YL(M[0],I[0],T[0],A[0]),C=YL(M[1],I[1],T[1],A[1]),L=[];L.push("M11=",x[0]/b,jL,"M12=",x[2]/S,jL,"M21=",x[1]/b,jL,"M22=",x[3]/S,jL,"Dx=",WL(u*b+x[4]),jL,"Dy=",WL(h*S+x[5])),_.padding="0 "+WL(D)+"px "+WL(C)+"px 0",_.filter=qL+".Matrix("+L.join("")+", SizingMethod=clip)"}else x&&(u=u*b+x[4],h=h*S+x[5]),_.filter="",_.left=WL(u)+"px",_.top=WL(h)+"px";var k=this._imageEl,P=this._cropEl;k||(k=BL.createElement("div"),this._imageEl=k);var N=k.style;if(v){if(e&&i)N.width=WL(b*e*c/f)+"px",N.height=WL(S*i*d/p)+"px";else{var O=new Image,E=this;O.onload=function(){O.onload=null,e=O.width,i=O.height,N.width=WL(b*e*c/f)+"px",N.height=WL(S*i*d/p)+"px",E._imageWidth=e,E._imageHeight=i,E._imageSrc=o},O.src=o}P||((P=BL.createElement("div")).style.overflow="hidden",this._cropEl=P);var z=P.style;z.width=WL((c+g*c/f)*b),z.height=WL((d+m*d/p)*S),z.filter=qL+".Matrix(Dx="+-g*c/f*b+",Dy="+-m*d/p*S+")",P.parentNode||y.appendChild(P),k.parentNode!==P&&P.appendChild(k)}else N.width=WL(b*c)+"px",N.height=WL(S*d)+"px",y.appendChild(k),P&&P.parentNode&&(y.removeChild(P),this._cropEl=null);var R="",B=n.opacity;B<1&&(R+=".Alpha(opacity="+WL(100*B)+") "),R+=qL+".AlphaImageLoader(src="+o+", SizingMethod=scale)",N.filter=R,y.style.zIndex=ik(this.zlevel,this.z,this.z2),tk(t,y),null!=n.text&&this.drawRectText(t,this.getBoundingRect())}},qn.prototype.onRemove=function(t){ek(t,this._vmlEl),this._vmlEl=null,this._cropEl=null,this._imageEl=null,this.removeRectText(t)},qn.prototype.onAdd=function(t){tk(t,this._vmlEl),this.appendRectText(t)};var sk,lk="normal",uk={},hk=0,ck=document.createElement("div");GL=function(t,e){var i=BL;sk||((sk=i.createElement("div")).style.cssText="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;",BL.body.appendChild(sk));try{sk.style.font=e}catch(t){}return sk.innerHTML="",sk.appendChild(i.createTextNode(t)),{width:sk.offsetWidth}},un["measureText"]=GL;for(var dk=new Mi,fk=function(t,e,i,n){var o=this.style;this.__dirty&&kn(o);var a=o.text;if(null!=a&&(a+=""),a){if(o.rich){var r=wn(a,o);a=[];for(var s=0;s<r.lines.length;s++){for(var l=r.lines[s].tokens,u=[],h=0;h<l.length;h++)u.push(l[h].text);a.push(u.join(""))}a=a.join("\n")}var c,d,f=o.textAlign,p=o.textVerticalAlign,g=function(t){var e=uk[t];if(!e){100<hk&&(hk=0,uk={});var i,n=ck.style;try{n.font=t,i=n.fontFamily.split(",")[0]}catch(t){}e={style:n.fontStyle||lk,variant:n.fontVariant||lk,weight:n.fontWeight||lk,size:0|parseFloat(n.fontSize||12),family:i||"Microsoft YaHei"},uk[t]=e,hk++}return e}(o.font),m=g.style+" "+g.variant+" "+g.weight+" "+g.size+'px "'+g.family+'"';i=i||cn(a,m,f,p,o.textPadding,o.textLineHeight);var v=this.transform;if(v&&!n&&(dk.copy(e),dk.applyTransform(v),e=dk),n)c=e.x,d=e.y;else{var y=o.textPosition;if(y instanceof Array)c=e.x+nk(y[0],e.width),d=e.y+nk(y[1],e.height),f=f||"left";else{var x=this.calculateTextPosition?this.calculateTextPosition({},o,e):pn({},o,e);c=x.x,d=x.y,f=f||x.textAlign,p=p||x.textVerticalAlign}}c=dn(c,i.width,f),d=fn(d,i.height,p),d+=i.height/2;var _,w,b,S=VL,M=this._textVmlEl;M?w=(_=(b=M.firstChild).nextSibling).nextSibling:(M=S("line"),_=S("path"),w=S("textpath"),b=S("skew"),w.style["v-text-align"]="left",JL(M),_.textpathok=!0,w.on=!0,M.from="0 0",M.to="1000 0.05",tk(M,b),tk(M,_),tk(M,w),this._textVmlEl=M);var I=[c,d],T=M.style;v&&n?(bt(I,I,v),b.on=!0,b.matrix=v[0].toFixed(3)+jL+v[2].toFixed(3)+jL+v[1].toFixed(3)+jL+v[3].toFixed(3)+",0,0",b.offset=(WL(I[0])||0)+","+(WL(I[1])||0),b.origin="0 0",T.left="0px",T.top="0px"):(b.on=!1,T.left=WL(c)+"px",T.top=WL(d)+"px"),w.string=function(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}(a);try{w.style.font=m}catch(t){}ak(M,"fill",{fill:o.textFill,opacity:o.opacity},this),ak(M,"stroke",{stroke:o.textStroke,opacity:o.opacity,lineDash:o.lineDash||null},this),M.style.zIndex=ik(this.zlevel,this.z,this.z2),tk(t,M)}},pk=function(t){ek(t,this._textVmlEl),this._textVmlEl=null},gk=function(t){tk(t,this._textVmlEl)},mk=[Xn,jn,qn,Sr,Fr],vk=0;vk<mk.length;vk++){var yk=mk[vk].prototype;yk.drawRectText=fk,yk.removeRectText=pk,yk.appendRectText=gk}Fr.prototype.brushVML=function(t){var e=this.style;null!=e.text?this.drawRectText(t,{x:e.x||0,y:e.y||0,width:0,height:0},this.getBoundingRect(),!0):this.removeRectText(t)},Fr.prototype.onRemove=function(t){this.removeRectText(t)},Fr.prototype.onAdd=function(t){this.appendRectText(t)}}function xk(t){return parseInt(t,10)}function _k(t,e){!function(){if(!RL&&BL){RL=!0;var t=BL.styleSheets;t.length<31?BL.createStyleSheet().addRule(".zrvml","behavior:url(#default#VML)"):t[0].addRule(".zrvml","behavior:url(#default#VML)")}}(),this.root=t,this.storage=e;var i=document.createElement("div"),n=document.createElement("div");i.style.cssText="display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;",n.style.cssText="position:absolute;left:0;top:0;",t.appendChild(i),this._vmlRoot=n,this._vmlViewport=i,this.resize();var o=e.delFromStorage,a=e.addToStorage;e.delFromStorage=function(t){o.call(e,t),t&&t.onRemove&&t.onRemove(n)},e.addToStorage=function(t){t.onAdd&&t.onAdd(n),a.call(e,t)},this._firstPaint=!0}_k.prototype={constructor:_k,getType:function(){return"vml"},getViewportRoot:function(){return this._vmlViewport},getViewportRootOffset:function(){var t=this.getViewportRoot();if(t)return{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}},refresh:function(){var t=this.storage.getDisplayList(!0,!0);this._paintList(t)},_paintList:function(t){for(var e=this._vmlRoot,i=0;i<t.length;i++){var n=t[i];n.invisible||n.ignore?(n.__alreadyNotVisible||n.onRemove(e),n.__alreadyNotVisible=!0):(n.__alreadyNotVisible&&n.onAdd(e),n.__alreadyNotVisible=!1,n.__dirty&&(n.beforeBrush&&n.beforeBrush(),(n.brushVML||n.brush).call(n,e),n.afterBrush&&n.afterBrush())),n.__dirty=!1}this._firstPaint&&(this._vmlViewport.appendChild(e),this._firstPaint=!1)},resize:function(t,e){t=null==t?this._getWidth():t,e=null==e?this._getHeight():e;if(this._width!==t||this._height!==e){this._width=t,this._height=e;var i=this._vmlViewport.style;i.width=t+"px",i.height=e+"px"}},dispose:function(){this.root.innerHTML="",this._vmlRoot=this._vmlViewport=this.storage=null},getWidth:function(){return this._width},getHeight:function(){return this._height},clear:function(){this._vmlViewport&&this.root.removeChild(this._vmlViewport)},_getWidth:function(){var t=this.root,e=t.currentStyle;return(t.clientWidth||xk(e.width))-xk(e.paddingLeft)-xk(e.paddingRight)|0},_getHeight:function(){var t=this.root,e=t.currentStyle;return(t.clientHeight||xk(e.height))-xk(e.paddingTop)-xk(e.paddingBottom)|0}},E(["getLayer","insertLayer","eachLayer","eachBuiltinLayer","eachOtherLayer","getLayers","modLayer","delLayer","clearLayer","toDataURL","pathToImage"],function(t){_k.prototype[t]=function(t){return function(){fi('In IE8.0 VML mode painter not support method "'+t+'"')}}(t)}),Do("vml",_k);function wk(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}var bk=ir.CMD,Sk=Array.prototype.join,Mk="none",Ik=Math.round,Tk=Math.sin,Ak=Math.cos,Dk=Math.PI,Ck=2*Math.PI,Lk=180/Dk,kk=1e-4;function Pk(t){return Ik(1e4*t)/1e4}function Nk(t){return t<kk&&-kk<t}function Ok(t,e){e&&Ek(t,"transform","matrix("+Sk.call(e,",")+")")}function Ek(t,e,i){i&&("linear"===i.type||"radial"===i.type)||t.setAttribute(e,i)}function zk(t,e,i,n){if(function(t,e){var i=e?t.textFill:t.fill;return null!=i&&i!==Mk}(e,i)){var o=i?e.textFill:e.fill;Ek(t,"fill",o="transparent"===o?Mk:o),Ek(t,"fill-opacity",null!=e.fillOpacity?e.fillOpacity*e.opacity:e.opacity)}else Ek(t,"fill",Mk);if(function(t,e){var i=e?t.textStroke:t.stroke;return null!=i&&i!==Mk}(e,i)){var a=i?e.textStroke:e.stroke;Ek(t,"stroke",a="transparent"===a?Mk:a),Ek(t,"stroke-width",(i?e.textStrokeWidth:e.lineWidth)/(!i&&e.strokeNoScale?n.getLineScale():1)),Ek(t,"paint-order",i?"stroke":"fill"),Ek(t,"stroke-opacity",null!=e.strokeOpacity?e.strokeOpacity:e.opacity),e.lineDash?(Ek(t,"stroke-dasharray",e.lineDash.join(",")),Ek(t,"stroke-dashoffset",Ik(e.lineDashOffset||0))):Ek(t,"stroke-dasharray",""),e.lineCap&&Ek(t,"stroke-linecap",e.lineCap),e.lineJoin&&Ek(t,"stroke-linejoin",e.lineJoin),e.miterLimit&&Ek(t,"stroke-miterlimit",e.miterLimit)}else Ek(t,"stroke",Mk)}var Rk={};Rk.brush=function(t){var e=t.style,i=t.__svgEl;i||(i=wk("path"),t.__svgEl=i),t.path||t.createPathProxy();var n=t.path;if(t.__dirtyPath){n.beginPath(),n.subPixelOptimize=!1,t.buildPath(n,t.shape),t.__dirtyPath=!1;var o=function(t){for(var e=[],i=t.data,n=t.len(),o=0;o<n;){var a="",r=0;switch(i[o++]){case bk.M:a="M",r=2;break;case bk.L:a="L",r=2;break;case bk.Q:a="Q",r=4;break;case bk.C:a="C",r=6;break;case bk.A:var s=i[o++],l=i[o++],u=i[o++],h=i[o++],c=i[o++],d=i[o++],f=i[o++],p=i[o++],g=Math.abs(d),m=Nk(g-Ck)||(p?Ck<=d:Ck<=-d),v=0<d?d%Ck:d%Ck+Ck,y=!1;y=!!m||!Nk(g)&&Dk<=v==!!p;var x=Pk(s+u*Ak(c)),_=Pk(l+h*Tk(c));m&&(d=p?Ck-1e-4:1e-4-Ck,y=!0,9===o&&e.push("M",x,_));var w=Pk(s+u*Ak(c+d)),b=Pk(l+h*Tk(c+d));e.push("A",Pk(u),Pk(h),Ik(f*Lk),+y,+p,w,b);break;case bk.Z:a="Z";break;case bk.R:w=Pk(i[o++]),b=Pk(i[o++]);var S=Pk(i[o++]),M=Pk(i[o++]);e.push("M",w,b,"L",w+S,b,"L",w+S,b+M,"L",w,b+M,"L",w,b)}a&&e.push(a);for(var I=0;I<r;I++)e.push(Pk(i[o++]))}return e.join(" ")}(n);o.indexOf("NaN")<0&&Ek(i,"d",o)}zk(i,e,!1,t),Ok(i,t.transform),null!=e.text?Zk(t,t.getBoundingRect()):Xk(t)};var Bk={brush:function(t){var e=t.style,i=e.image;i instanceof HTMLImageElement&&(i=i.src);if(i){var n=e.x||0,o=e.y||0,a=e.width,r=e.height,s=t.__svgEl;s||(s=wk("image"),t.__svgEl=s),i!==t.__imageSrc&&(function(t,e,i){t.setAttributeNS("http://www.w3.org/1999/xlink",e,i)}(s,"href",i),t.__imageSrc=i),Ek(s,"width",a),Ek(s,"height",r),Ek(s,"x",n),Ek(s,"y",o),Ok(s,t.transform),null!=e.text?Zk(t,t.getBoundingRect()):Xk(t)}}},Vk={},Gk=new Mi,Fk={},Wk=[],Hk={left:"start",right:"end",center:"middle",middle:"middle"},Zk=function(t,e){var i=t.style,n=t.transform,o=t instanceof Fr||i.transformText;t.__dirty&&kn(i);var a=i.text;if(null!=a&&(a+=""),Un(a,i)){null==a&&(a=""),!o&&n&&(Gk.copy(e),Gk.applyTransform(n),e=Gk);var r=t.__textSvgEl;r||(r=wk("text"),t.__textSvgEl=r);var s=r.style,l=i.font||ln,u=r.__computedFont;l!==r.__styleFont&&(s.font=r.__styleFont=l,u=r.__computedFont=s.font);var h=i.textPadding,c=i.textLineHeight,d=t.__textCotentBlock;d&&!t.__dirtyText||(d=t.__textCotentBlock=_n(a,u,h,c,i.truncate));var f=d.outerHeight,p=d.lineHeight;Vn(Fk,t,i,e);var g=Fk.baseX,m=Fk.baseY,v=Fk.textAlign||"left",y=Fk.textVerticalAlign;!function(t,e,i,n,o,a,r){ie(Wk),e&&i&&ne(Wk,i);var s=n.textRotation;if(o&&s){var l=n.textOrigin;"center"===l?(a=o.width/2+o.x,r=o.height/2+o.y):l&&(a=l[0]+o.x,r=l[1]+o.y),Wk[4]-=a,Wk[5]-=r,re(Wk,Wk,s),Wk[4]+=a,Wk[5]+=r}Ok(t,Wk)}(r,o,n,i,e,g,m);var x=g,_=fn(m,f,y);h&&(x=function(t,e,i){return"right"===e?t-i[1]:"center"===e?t+i[3]/2-i[1]/2:t+i[3]}(g,v,h),_+=h[0]),_+=p/2,zk(r,i,!0,t);var w=d.canCacheByTextString,b=t.__tspanList||(t.__tspanList=[]),S=b.length;if(w&&t.__canCacheByTextString&&t.__text===a){if(t.__dirtyText&&S)for(var M=0;M<S;++M)Uk(b[M],v,x,_+M*p)}else{t.__text=a,t.__canCacheByTextString=w;var I=d.lines,T=I.length;for(M=0;M<T;M++){var A=b[M],D=I[M];A?A.__zrText!==D&&(A.innerHTML="",A.appendChild(document.createTextNode(D))):(A=b[M]=wk("tspan"),r.appendChild(A),A.appendChild(document.createTextNode(D))),Uk(A,v,x,_+M*p)}if(T<S){for(;M<S;M++)r.removeChild(b[M]);b.length=T}}}};function Uk(t,e,i,n){Ek(t,"dominant-baseline","middle"),Ek(t,"text-anchor",Hk[e]),Ek(t,"x",i),Ek(t,"y",n)}function Xk(t){t&&t.__textSvgEl&&(t.__textSvgEl.parentNode&&t.__textSvgEl.parentNode.removeChild(t.__textSvgEl),t.__textSvgEl=null,t.__tspanList=[],t.__text=null)}function Yk(){}function jk(t,e){for(var i=0,n=e.length,o=0,a=0;i<n;i++){var r=e[i];if(r.removed){for(s=[],l=a;l<a+r.count;l++)s.push(l);r.indices=s,a+=r.count}else{for(var s=[],l=o;l<o+r.count;l++)s.push(l);r.indices=s,o+=r.count,r.added||(a+=r.count)}}return e}Vk.drawRectText=Zk,Vk.brush=function(t){null!=t.style.text?Zk(t,!1):Xk(t)},Yk.prototype={diff:function(l,u,t){t=t||function(t,e){return t===e},this.equals=t;var h=this;l=l.slice();var c=(u=u.slice()).length,d=l.length,f=1,e=c+d,p=[{newPos:-1,components:[]}],i=this.extractCommon(p[0],u,l,0);if(p[0].newPos+1>=c&&d<=i+1){for(var n=[],o=0;o<u.length;o++)n.push(o);return[{indices:n,count:u.length}]}function a(){for(var t=-1*f;t<=f;t+=2){var e,i=p[t-1],n=p[t+1],o=(n?n.newPos:0)-t;i&&(p[t-1]=void 0);var a=i&&i.newPos+1<c,r=n&&0<=o&&o<d;if(a||r){if(!a||r&&i.newPos<n.newPos?(e={newPos:(s=n).newPos,components:s.components.slice(0)},h.pushComponent(e.components,void 0,!0)):((e=i).newPos++,h.pushComponent(e.components,!0,void 0)),o=h.extractCommon(e,u,l,t),e.newPos+1>=c&&d<=o+1)return jk(h,e.components,u,l);p[t]=e}else p[t]=void 0}var s;f++}for(;f<=e;){var r=a();if(r)return r}},pushComponent:function(t,e,i){var n=t[t.length-1];n&&n.added===e&&n.removed===i?t[t.length-1]={count:n.count+1,added:e,removed:i}:t.push({count:1,added:e,removed:i})},extractCommon:function(t,e,i,n){for(var o=e.length,a=i.length,r=t.newPos,s=r-n,l=0;r+1<o&&s+1<a&&this.equals(e[r+1],i[s+1]);)r++,s++,l++;return l&&t.components.push({count:l}),t.newPos=r,s},tokenize:function(t){return t.slice()},join:function(t){return t.slice()}};var qk=new Yk;function Kk(t,e,i,n,o){this._zrId=t,this._svgRoot=e,this._tagNames="string"==typeof i?[i]:i,this._markLabel=n,this._domName=o||"_dom",this.nextId=0}function $k(t,e){Kk.call(this,t,e,["linearGradient","radialGradient"],"__gradient_in_use__")}function Jk(t,e){Kk.call(this,t,e,"clipPath","__clippath_in_use__")}function Qk(t,e){Kk.call(this,t,e,["filter"],"__filter_in_use__","_shadowDom")}function tP(t){return t&&(t.shadowBlur||t.shadowOffsetX||t.shadowOffsetY||t.textShadowBlur||t.textShadowOffsetX||t.textShadowOffsetY)}function eP(t){return parseInt(t,10)}function iP(t,e){return e&&t&&e.parentNode!==t}function nP(t,e,i){if(iP(t,e)&&i){var n=i.nextSibling;n?t.insertBefore(e,n):t.appendChild(e)}}function oP(t,e){if(iP(t,e)){var i=t.firstChild;i?t.insertBefore(e,i):t.appendChild(e)}}function aP(t,e){e&&t&&e.parentNode===t&&t.removeChild(e)}function rP(t){return t.__textSvgEl}function sP(t){return t.__svgEl}Kk.prototype.createElement=wk,Kk.prototype.getDefs=function(t){var e=this._svgRoot,n=this._svgRoot.getElementsByTagName("defs");return 0===n.length?t?((n=e.insertBefore(this.createElement("defs"),e.firstChild)).contains||(n.contains=function(t){var e=n.children;if(!e)return!1;for(var i=e.length-1;0<=i;--i)if(e[i]===t)return!0;return!1}),n):null:n[0]},Kk.prototype.update=function(t,e){if(t){var i=this.getDefs(!1);if(t[this._domName]&&i.contains(t[this._domName]))"function"==typeof e&&e(t);else{var n=this.add(t);n&&(t[this._domName]=n)}}},Kk.prototype.addDom=function(t){this.getDefs(!0).appendChild(t)},Kk.prototype.removeDom=function(t){var e=this.getDefs(!1);e&&t[this._domName]&&(e.removeChild(t[this._domName]),t[this._domName]=null)},Kk.prototype.getDoms=function(){var i=this.getDefs(!1);if(!i)return[];var n=[];return E(this._tagNames,function(t){var e=i.getElementsByTagName(t);n=n.concat([].slice.call(e))}),n},Kk.prototype.markAllUnused=function(){var t=this.getDoms(),e=this;E(t,function(t){t[e._markLabel]="0"})},Kk.prototype.markUsed=function(t){t&&(t[this._markLabel]="1")},Kk.prototype.removeUnused=function(){var e=this.getDefs(!1);if(e){var t=this.getDoms(),i=this;E(t,function(t){"1"!==t[i._markLabel]&&e.removeChild(t)})}},Kk.prototype.getSvgProxy=function(t){return t instanceof Sr?Rk:t instanceof qn?Bk:t instanceof Fr?Vk:Rk},Kk.prototype.getTextSvgElement=function(t){return t.__textSvgEl},Kk.prototype.getSvgElement=function(t){return t.__svgEl},w($k,Kk),$k.prototype.addWithoutUpdate=function(a,r){if(r&&r.style){var s=this;E(["fill","stroke"],function(t){if(r.style[t]&&("linear"===r.style[t].type||"radial"===r.style[t].type)){var e,i=r.style[t],n=s.getDefs(!0);i._dom?(e=i._dom,n.contains(i._dom)||s.addDom(e)):e=s.add(i),s.markUsed(r);var o=e.getAttribute("id");a.setAttribute(t,"url(#"+o+")")}})}},$k.prototype.add=function(t){var e;if("linear"===t.type)e=this.createElement("linearGradient");else{if("radial"!==t.type)return fi("Illegal gradient type."),null;e=this.createElement("radialGradient")}return t.id=t.id||this.nextId++,e.setAttribute("id","zr"+this._zrId+"-gradient-"+t.id),this.updateDom(t,e),this.addDom(e),e},$k.prototype.update=function(i){var n=this;Kk.prototype.update.call(this,i,function(){var t=i.type,e=i._dom.tagName;"linear"===t&&"linearGradient"===e||"radial"===t&&"radialGradient"===e?n.updateDom(i,i._dom):(n.removeDom(i),n.add(i))})},$k.prototype.updateDom=function(t,e){if("linear"===t.type)e.setAttribute("x1",t.x),e.setAttribute("y1",t.y),e.setAttribute("x2",t.x2),e.setAttribute("y2",t.y2);else{if("radial"!==t.type)return void fi("Illegal gradient type.");e.setAttribute("cx",t.x),e.setAttribute("cy",t.y),e.setAttribute("r",t.r)}t.global?e.setAttribute("gradientUnits","userSpaceOnUse"):e.setAttribute("gradientUnits","objectBoundingBox"),e.innerHTML="";for(var i=t.colorStops,n=0,o=i.length;n<o;++n){var a=this.createElement("stop");a.setAttribute("offset",100*i[n].offset+"%");var r=i[n].color;if(r.indexOf(!1)){var s=Re(r)[3],l=Ge(r);a.setAttribute("stop-color","#"+l),a.setAttribute("stop-opacity",s)}else a.setAttribute("stop-color",i[n].color);e.appendChild(a)}t._dom=e},$k.prototype.markUsed=function(t){if(t.style){var e=t.style.fill;e&&e._dom&&Kk.prototype.markUsed.call(this,e._dom),(e=t.style.stroke)&&e._dom&&Kk.prototype.markUsed.call(this,e._dom)}},w(Jk,Kk),Jk.prototype.update=function(t){var e=this.getSvgElement(t);e&&this.updateDom(e,t.__clipPaths,!1);var i=this.getTextSvgElement(t);i&&this.updateDom(i,t.__clipPaths,!0),this.markUsed(t)},Jk.prototype.updateDom=function(t,e,i){if(e&&0<e.length){var n,o,a=this.getDefs(!0),r=e[0],s=i?"_textDom":"_dom";r[s]?(o=r[s].getAttribute("id"),n=r[s],a.contains(n)||a.appendChild(n)):(o="zr"+this._zrId+"-clip-"+this.nextId,++this.nextId,(n=this.createElement("clipPath")).setAttribute("id",o),a.appendChild(n),r[s]=n);var l=this.getSvgProxy(r);if(r.transform&&r.parent.invTransform&&!i){var u=Array.prototype.slice.call(r.transform);oe(r.transform,r.parent.invTransform,r.transform),l.brush(r),r.transform=u}else l.brush(r);var h=this.getSvgElement(r);n.innerHTML="",n.appendChild(h.cloneNode()),t.setAttribute("clip-path","url(#"+o+")"),1<e.length&&this.updateDom(n,e.slice(1),i)}else t&&t.setAttribute("clip-path","none")},Jk.prototype.markUsed=function(t){var e=this;t.__clipPaths&&E(t.__clipPaths,function(t){t._dom&&Kk.prototype.markUsed.call(e,t._dom),t._textDom&&Kk.prototype.markUsed.call(e,t._textDom)})},w(Qk,Kk),Qk.prototype.addWithoutUpdate=function(t,e){if(e&&tP(e.style)){var i;if(e._shadowDom)i=e._shadowDom,this.getDefs(!0).contains(e._shadowDom)||this.addDom(i);else i=this.add(e);this.markUsed(e);var n=i.getAttribute("id");t.style.filter="url(#"+n+")"}},Qk.prototype.add=function(t){var e=this.createElement("filter");return t._shadowDomId=t._shadowDomId||this.nextId++,e.setAttribute("id","zr"+this._zrId+"-shadow-"+t._shadowDomId),this.updateDom(t,e),this.addDom(e),e},Qk.prototype.update=function(t,e){if(tP(e.style)){var i=this;Kk.prototype.update.call(this,e,function(){i.updateDom(e,e._shadowDom)})}else this.remove(t,e)},Qk.prototype.remove=function(t,e){null!=e._shadowDomId&&(this.removeDom(t),t.style.filter="")},Qk.prototype.updateDom=function(t,e){var i=e.getElementsByTagName("feDropShadow");i=0===i.length?this.createElement("feDropShadow"):i[0];var n,o,a,r,s=t.style,l=t.scale&&t.scale[0]||1,u=t.scale&&t.scale[1]||1;if(s.shadowBlur||s.shadowOffsetX||s.shadowOffsetY)n=s.shadowOffsetX||0,o=s.shadowOffsetY||0,a=s.shadowBlur,r=s.shadowColor;else{if(!s.textShadowBlur)return void this.removeDom(e,s);n=s.textShadowOffsetX||0,o=s.textShadowOffsetY||0,a=s.textShadowBlur,r=s.textShadowColor}i.setAttribute("dx",n/l),i.setAttribute("dy",o/u),i.setAttribute("flood-color",r);var h=a/2/l+" "+a/2/u;i.setAttribute("stdDeviation",h),e.setAttribute("x","-100%"),e.setAttribute("y","-100%"),e.setAttribute("width",Math.ceil(a/2*200)+"%"),e.setAttribute("height",Math.ceil(a/2*200)+"%"),e.appendChild(i),t._shadowDom=e},Qk.prototype.markUsed=function(t){t._shadowDom&&Kk.prototype.markUsed.call(this,t._shadowDom)};function lP(t,e,i,n){this.root=t,this.storage=e,this._opts=i=L({},i||{});var o=wk("svg");o.setAttribute("xmlns","http://www.w3.org/2000/svg"),o.setAttribute("version","1.1"),o.setAttribute("baseProfile","full"),o.style.cssText="user-select:none;position:absolute;left:0;top:0;",this.gradientManager=new $k(n,o),this.clipPathManager=new Jk(n,o),this.shadowManager=new Qk(n,o);var a=document.createElement("div");a.style.cssText="overflow:hidden;position:relative",this._svgRoot=o,this._viewport=a,t.appendChild(a),a.appendChild(o),this.resize(i.width,i.height),this._visibleList=[]}lP.prototype={constructor:lP,getType:function(){return"svg"},getViewportRoot:function(){return this._viewport},getViewportRootOffset:function(){var t=this.getViewportRoot();if(t)return{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}},refresh:function(){var t=this.storage.getDisplayList(!0);this._paintList(t)},setBackgroundColor:function(t){this._viewport.style.background=t},_paintList:function(t){this.gradientManager.markAllUnused(),this.clipPathManager.markAllUnused(),this.shadowManager.markAllUnused();var e,i,n=this._svgRoot,o=this._visibleList,a=t.length,r=[];for(e=0;e<a;e++){var s=t[e],l=(i=s)instanceof Sr?Rk:i instanceof qn?Bk:i instanceof Fr?Vk:Rk,u=sP(s)||rP(s);s.invisible||(s.__dirty&&(l&&l.brush(s),this.clipPathManager.update(s),s.style&&(this.gradientManager.update(s.style.fill),this.gradientManager.update(s.style.stroke),this.shadowManager.update(u,s)),s.__dirty=!1),r.push(s))}var h,c=function(t,e,i){return qk.diff(t,e,i)}(o,r);for(e=0;e<c.length;e++){if((p=c[e]).removed)for(var d=0;d<p.count;d++){u=sP(s=o[p.indices[d]]);var f=rP(s);aP(n,u),aP(n,f)}}for(e=0;e<c.length;e++){var p;if((p=c[e]).added)for(d=0;d<p.count;d++){u=sP(s=r[p.indices[d]]),f=rP(s);h?nP(n,u,h):oP(n,u),u?nP(n,f,u):h?nP(n,f,h):oP(n,f),nP(n,f,u),h=f||u||h,this.gradientManager.addWithoutUpdate(u||f,s),this.shadowManager.addWithoutUpdate(u||f,s),this.clipPathManager.markUsed(s)}else if(!p.removed)for(d=0;d<p.count;d++){u=sP(s=r[p.indices[d]]),f=rP(s),u=sP(s),f=rP(s);this.gradientManager.markUsed(s),this.gradientManager.addWithoutUpdate(u||f,s),this.shadowManager.markUsed(s),this.shadowManager.addWithoutUpdate(u||f,s),this.clipPathManager.markUsed(s),f&&nP(n,f,u),h=u||f||h}}this.gradientManager.removeUnused(),this.clipPathManager.removeUnused(),this.shadowManager.removeUnused(),this._visibleList=r},_getDefs:function(t){var n,e=this._svgRoot;return 0!==(n=this._svgRoot.getElementsByTagName("defs")).length?n[0]:t?((n=e.insertBefore(wk("defs"),e.firstChild)).contains||(n.contains=function(t){var e=n.children;if(!e)return!1;for(var i=e.length-1;0<=i;--i)if(e[i]===t)return!0;return!1}),n):null},resize:function(t,e){var i=this._viewport;i.style.display="none";var n=this._opts;if(null!=t&&(n.width=t),null!=e&&(n.height=e),t=this._getSize(0),e=this._getSize(1),i.style.display="",this._width!==t||this._height!==e){this._width=t,this._height=e;var o=i.style;o.width=t+"px",o.height=e+"px";var a=this._svgRoot;a.setAttribute("width",t),a.setAttribute("height",e)}},getWidth:function(){return this._width},getHeight:function(){return this._height},_getSize:function(t){var e=this._opts,i=["width","height"][t],n=["clientWidth","clientHeight"][t],o=["paddingLeft","paddingTop"][t],a=["paddingRight","paddingBottom"][t];if(null!=e[i]&&"auto"!==e[i])return parseFloat(e[i]);var r=this.root,s=document.defaultView.getComputedStyle(r);return(r[n]||eP(s[i])||eP(r.style[i]))-(eP(s[o])||0)-(eP(s[a])||0)|0},dispose:function(){this.root.innerHTML="",this._svgRoot=this._viewport=this.storage=null},clear:function(){this._viewport&&this.root.removeChild(this._viewport)},pathToDataUrl:function(){return this.refresh(),"data:image/svg+xml;charset=UTF-8,"+this._svgRoot.outerHTML}},E(["getLayer","insertLayer","eachLayer","eachBuiltinLayer","eachOtherLayer","getLayers","modLayer","delLayer","clearLayer","toDataURL","pathToImage"],function(t){lP.prototype[t]=function(t){return function(){fi('In SVG mode painter not support method "'+t+'"')}}(t)}),Do("svg",lP),t.version="4.6.0",t.dependencies={zrender:"4.2.0"},t.PRIORITY=Id,t.init=function(t,e,i){var n=cf(t);if(n)return n;var o=new kd(t,e,i);return o.id="ec_"+rf++,of[o.id]=o,jo(t,lf,o.id),function(n){var o="__connectUpdateStatus";function a(t,e){for(var i=0;i<t.length;i++){t[i][o]=e}}wd(Kd,function(t,e){n._messageCenter.on(e,function(t){if(af[n.group]&&0!==n[o]){if(t&&t.escapeConnect)return;var e=n.makeActionFromEvent(t),i=[];wd(of,function(t){t!==n&&t.group===n.group&&i.push(t)}),a(i,0),wd(i,function(t){1!==t[o]&&t.dispatchAction(e)}),a(i,2)}})})}(o),o},t.connect=function(e){if(k(e)){var t=e;e=null,wd(t,function(t){null!=t.group&&(e=t.group)}),e=e||"g_"+sf++,wd(t,function(t){t.group=e})}return af[e]=!0,e},t.disConnect=uf,t.disconnect=hf,t.dispose=function(t){"string"==typeof t?t=of[t]:t instanceof kd||(t=cf(t)),t instanceof kd&&!t.isDisposed()&&t.dispose()},t.getInstanceByDom=cf,t.getInstanceById=function(t){return of[t]},t.registerTheme=df,t.registerPreprocessor=ff,t.registerProcessor=pf,t.registerPostUpdate=function(t){Qd.push(t)},t.registerAction=gf,t.registerCoordinateSystem=mf,t.getCoordinateSystemDimensions=function(t){var e=nh.get(t);if(e)return e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice()},t.registerLayout=vf,t.registerVisual=yf,t.registerLoading=_f,t.extendComponentModel=wf,t.extendComponentView=bf,t.extendSeriesModel=Sf,t.extendChartView=Mf,t.setCanvasCreator=function(t){f("createCanvas",t)},t.registerMap=function(t,e,i){yd.registerMap(t,e,i)},t.getMap=function(t){var e=yd.retrieveMap(t);return e&&e[0]&&{geoJson:e[0].geoJSON,specialAreas:e[0].specialAreas}},t.dataTool={},t.zrender=Lo,t.number=ql,t.format=cu,t.throttle=Ic,t.helper=yg,t.matrix=he,t.vector=It,t.color=je,t.parseGeoJSON=Mg,t.parseGeoJson=Rg,t.util=Bg,t.graphic=Vg,t.List=Wf,t.Model=Il,t.Axis=Eg,t.env=v});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_echarts_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_5e41a82f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_echarts_vue__ = __webpack_require__(70);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(38)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5e41a82f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_echarts_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_5e41a82f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_echarts_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\mpvue-echarts\\src\\echarts.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] echarts.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e41a82f", Component.options)
  } else {
    hotAPI.reload("data-v-5e41a82f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(11);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(57);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return typeof global !== 'undefined' ? global : this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wx_canvas__ = __webpack_require__(69);

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



function wrapTouch(e) {
  for (var i = 0; i < e.mp.touches.length; i += 1) {
    var touch = e.mp.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return e;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    echarts: {
      required: true,
      type: Object,
      default: function _default() {
        return null;
      }
    },
    onInit: {
      type: Function,
      default: null
    },
    canvasId: {
      type: String,
      default: 'ec-canvas'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    disableTouch: {
      type: Boolean,
      default: false
    },
    throttleTouch: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: String
    }
  },
  onReady: function onReady() {
    if (!this.echarts) {
      console.warn('组件需绑定 echarts 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" :echarts="echarts"></ec-canvas>');
      return;
    }

    if (!this.lazyLoad) this.init();
  },

  methods: {
    init: function init(callback) {
      var _this = this;

      var version = wx.version.version.split('.').map(function (n) {
        return parseInt(n, 10);
      });
      var isValid = version[0] > 1 || version[0] === 1 && version[1] > 9 || version[0] === 1 && version[1] === 9 && version[2] >= 91;
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
        return;
      }

      var canvasId = this.canvasId;

      this.ctx = wx.createCanvasContext(canvasId);

      var canvas = new __WEBPACK_IMPORTED_MODULE_1__wx_canvas__["a" /* default */](this.ctx, canvasId);

      this.echarts.setCanvasCreator(function () {
        return canvas;
      });

      var query = wx.createSelectorQuery();
      query.select('#' + canvasId).boundingClientRect(function (res) {
        if (!res) {
          setTimeout(function () {
            return _this.init();
          }, 50);
          return;
        }

        var width = res.width,
            height = res.height;


        if (typeof callback === 'function') {
          _this.chart = callback(canvas, width, height);
        } else if (typeof _this.onInit === 'function') {
          _this.chart = _this.onInit(canvas, width, height);
        }

        if (!_this.chart) {
          return;
        }

        var _chart$getZr = _this.chart.getZr(),
            handler = _chart$getZr.handler;

        _this.handler = handler;
        _this.processGesture = handler.proxy.processGesture || function () {};
      }).exec();
    },
    canvasToTempFilePath: function canvasToTempFilePath(opt) {
      var canvasId = this.canvasId;

      this.ctx.draw(true, function () {
        wx.canvasToTempFilePath(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          canvasId: canvasId
        }, opt));
      });
    },
    touchStart: function touchStart(e) {
      var disableTouch = this.disableTouch,
          chart = this.chart;

      if (disableTouch || !chart || !e.mp.touches.length) return;
      var touch = e.mp.touches[0];
      this.handler.dispatch('mousedown', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'start');
    },
    touchMove: function touchMove(e) {
      var disableTouch = this.disableTouch,
          throttleTouch = this.throttleTouch,
          chart = this.chart,
          lastMoveTime = this.lastMoveTime;

      if (disableTouch || !chart || !e.mp.touches.length) return;

      if (throttleTouch) {
        var currMoveTime = Date.now();
        if (currMoveTime - lastMoveTime < 240) return;
        this.lastMoveTime = currMoveTime;
      }

      var touch = e.mp.touches[0];
      this.handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'change');
    },
    touchEnd: function touchEnd(e) {
      var disableTouch = this.disableTouch,
          chart = this.chart;

      if (disableTouch || !chart) return;
      var touch = e.mp.changedTouches ? e.mp.changedTouches[0] : {};
      this.handler.dispatch('mouseup', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.handler.dispatch('click', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'end');
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(41);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(44);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(54) });


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var ctx = __webpack_require__(45);
var hide = __webpack_require__(47);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(46);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(48);
var createDesc = __webpack_require__(53);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(49);
var IE8_DOM_DEFINE = __webpack_require__(50);
var toPrimitive = __webpack_require__(52);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(6)(function () {
  return Object.defineProperty(__webpack_require__(51)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(2);
var getKeys = __webpack_require__(55);
var gOPS = __webpack_require__(66);
var pIE = __webpack_require__(67);
var toObject = __webpack_require__(68);
var IObject = __webpack_require__(11);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(6)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(56);
var enumBugKeys = __webpack_require__(65);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(58)(false);
var IE_PROTO = __webpack_require__(61)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(59);
var toAbsoluteIndex = __webpack_require__(60);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(62)('keys');
var uid = __webpack_require__(64);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(63) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 66 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WxCanvas {
  constructor(ctx, canvasId) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    WxCanvas.initStyle(ctx);
    this.initEvent();
  }

  getContext(contextType) {
    return contextType === '2d' ? this.ctx : null;
  }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  static initStyle(ctx) {
    const styles = ['fillStyle', 'strokeStyle', 'globalAlpha',
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if ((style !== 'fillStyle' && style !== 'strokeStyle')
            || (value !== 'none' && value !== null)
          ) {
            ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value);
          }
        },
      });
    });

    ctx.createRadialGradient = () => ctx.createCircularGradient(arguments);
  }

  initEvent() {
    this.event = {};
    const eventNames = [{
      wxName: 'touchStart',
      ecName: 'mousedown',
    }, {
      wxName: 'touchMove',
      ecName: 'mousemove',
    }, {
      wxName: 'touchEnd',
      ecName: 'mouseup',
    }, {
      wxName: 'touchEnd',
      ecName: 'click',
    }];

    eventNames.forEach((name) => {
      this.event[name.wxName] = (e) => {
        const touch = e.mp.touches[0];
        this.chart.getZr().handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
        });
      };
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WxCanvas;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.canvasId) ? _c('canvas', {
    staticClass: "ec-canvas",
    class: _vm.isShow,
    attrs: {
      "id": _vm.canvasId,
      "canvasId": _vm.canvasId,
      "eventid": '0'
    },
    on: {
      "touchstart": _vm.touchStart,
      "touchmove": _vm.touchMove,
      "touchend": _vm.touchEnd,
      "error": _vm.error
    }
  }) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5e41a82f", esExports)
  }
}

/***/ }),
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(115);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
]);