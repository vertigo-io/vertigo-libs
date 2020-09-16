(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ol"), require("quasar"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([, , ], factory);
	else if(typeof exports === 'object')
		exports["VertigoUi"] = factory(require("ol"), require("quasar"), require("vue"));
	else
		root["VertigoUi"] = factory(root["ol"], root["Quasar"], root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__0f55__, __WEBPACK_EXTERNAL_MODULE__7c52__, __WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0f55":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0f55__;

/***/ }),

/***/ "129f":
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "19aa":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1cdc":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var bind = __webpack_require__("0366");
var getIteratorMethod = __webpack_require__("35a1");
var callWithSafeIterationClosing = __webpack_require__("9bdd");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2ca0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var toLength = __webpack_require__("50c4");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");
var IS_PURE = __webpack_require__("c430");

var nativeStartsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");
var bind = __webpack_require__("0366");
var html = __webpack_require__("1be4");
var createElement = __webpack_require__("cc12");
var IS_IOS = __webpack_require__("1cdc");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "45fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $some = __webpack_require__("b727").some;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
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
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
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

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c52":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7c52__;

/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "841c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var sameValue = __webpack_require__("129f");
var regExpExec = __webpack_require__("14c3");

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a623":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $every = __webpack_require__("b727").every;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b575":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var classof = __webpack_require__("c6b6");
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cdf9":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var newPromiseCapability = __webpack_require__("f069");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e667":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "e6cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var NativePromise = __webpack_require__("fea9");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var isObject = __webpack_require__("861d");
var aFunction = __webpack_require__("1c0b");
var anInstance = __webpack_require__("19aa");
var classof = __webpack_require__("c6b6");
var inspectSource = __webpack_require__("8925");
var iterate = __webpack_require__("2266");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var speciesConstructor = __webpack_require__("4840");
var task = __webpack_require__("2cf4").set;
var microtask = __webpack_require__("b575");
var promiseResolve = __webpack_require__("cdf9");
var hostReportErrors = __webpack_require__("44de");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var InternalStateModule = __webpack_require__("69f3");
var isForced = __webpack_require__("94ca");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getBoundMethods", function() { return /* reexport */ getBoundMethods; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });
__webpack_require__.d(__webpack_exports__, "methods", function() { return /* reexport */ main_methods; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: external {"commonjs":"quasar","commonjs2":"quasar","root":"Quasar"}
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_ = __webpack_require__("7c52");
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_quasar_commonjs2_quasar_root_Quasar_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VChatbot.vue?vue&type=template&id=caa42b14&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bot"},[_c('q-scroll-area',{ref:"scroller",staticClass:"bg-grey-2 col-grow row q-pa-sm"},[_c('div',{staticClass:"q-pr-md"},[_vm._l((_vm.messages),function(msg,index){return _c('div',{key:index},[(msg.rating)?_c('q-chat-message',{key:'msgRating-'+index,staticClass:"animate-fade",attrs:{"sent":msg.sent,"bg-color":msg.bgColor,"avatar":msg.avatar}},[_c('q-rating',{staticStyle:{"font-size":"2rem"},attrs:{"max":5,"readonly":""},model:{value:(msg.rating),callback:function ($$v) {_vm.$set(msg, "rating", $$v)},expression:"msg.rating"}})],1):_vm._e(),(msg.text)?_c('q-chat-message',{key:'msg-'+index,staticClass:"animate-fade",attrs:{"label":msg.label,"sent":msg.sent,"text-color":msg.textColor,"bg-color":msg.bgColor,"name":msg.name,"avatar":msg.avatar,"text":msg.text,"stamp":msg.stamp}}):_vm._e()],1)}),_c('div',{staticClass:"sys-chat"},[(_vm.error)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"orange-4","text-color":"black","size":"12"}},[_c('div',{staticClass:"q-pb-sm"},[_vm._v(" "+_vm._s(_vm.$q.lang.vui.chatbot.errorMessage)+" ")]),_c('q-btn',{staticClass:"full-width",attrs:{"label":_vm.$q.lang.vui.chatbot.tryAgain,"color":"white","text-color":"black"},on:{"click":function($event){return _vm.askBot(_vm.lastPayload)}}})],1):_vm._e()],1),_c('div',{staticClass:"sys-chat non-selectable"},[(_vm.inputConfig.buttons.length > 0)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"primary","size":"12"}},[_c('div',{staticClass:"text-blue-2 q-caption"},[_vm._v(" "+_vm._s(_vm.$q.lang.vui.suggestedAnswers)+" ")]),_c('div',{staticClass:"row docs-btn"},_vm._l((_vm.inputConfig.buttons),function(btn,index){return _c('q-btn',{key:'repChatBtn-'+index,staticClass:"full-width",attrs:{"label":btn.title,"color":"white","text-color":"black"},on:{"click":function($event){return _vm.postAnswerBtn(btn)}}})}),1)]):_vm._e()],1),_c('div',{staticClass:"message-processing sys-chat non-selectable"},[(_vm.processing)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"grey-4"}},[_c('q-spinner-dots',{attrs:{"size":"2em"}})],1):_vm._e()],1),_c('div',{staticClass:"non-selectable"},[(_vm.inputConfig.showRating)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"primary","sent":""}},[_c('q-rating',{staticStyle:{"font-size":"2rem"},attrs:{"max":4},model:{value:(_vm.rating),callback:function ($$v) {_vm.rating=$$v},expression:"rating"}})],1):_vm._e()],1)],2)]),_c('div',{staticClass:"message-response row docs-btn q-pl-sm non-selectable"},[_c('q-input',{ref:"input",staticClass:"col-grow",attrs:{"type":_vm.inputConfig.modeTextarea ? 'textarea' : 'text',"max-height":100,"placeholder":_vm.$q.lang.vui.chatbot.inputPlaceholder,"disable":_vm.processing || _vm.error,"loading":_vm.processing},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }_vm.inputConfig.modeTextarea ? false : (_vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0) ? false : _vm.postAnswerText()}},model:{value:(_vm.inputConfig.responseText),callback:function ($$v) {_vm.$set(_vm.inputConfig, "responseText", $$v)},expression:"inputConfig.responseText"}}),_c('q-btn',{attrs:{"round":"","color":"primary","icon":"send","disable":_vm.processing || (_vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0)},on:{"click":function($event){return _vm.postAnswerText()}}}),(_vm.devMode === true)?_c('q-btn',{attrs:{"round":"","color":"red","icon":"refresh"},on:{"click":_vm.restart}}):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VChatbot.vue?vue&type=template&id=caa42b14&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VChatbot.vue?vue&type=script&lang=js&









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
/* harmony default export */ var VChatbotvue_type_script_lang_js_ = ({
  props: {
    botUrl: {
      type: String,
      required: true
    },
    devMode: {
      type: Boolean,
      'default': false
    },
    minTimeBetweenMessages: {
      type: Number,
      'default': 1000
    },
    botAvatar: {
      type: String,
      required: true
    },
    botName: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      // config
      convId: 42,
      // technique
      inputConfig: {
        modeTextarea: false,
        // TODO, il exste d'autres modes, par ex email
        responseText: "",
        responsePattern: "",
        showRating: false,
        rating: 0,
        buttons: []
      },
      prevInputConfig: {},
      lastPayload: null,
      processing: false,
      error: false,
      messages: [],
      keepAction: false,
      menu: false,
      lastUserInteraction: 0,
      watingMessagesStack: []
    };
  },
  created: function created() {
    this.askBot('/start'); // lancement de la phrase d'accueil

    this.convId = Math.random();
  },
  methods: {
    postAnswerBtn: function postAnswerBtn(btn) {
      this.messages.push({
        text: [btn.title],
        sent: true,
        bgColor: "primary",
        textColor: "white"
      });

      this._scrollToBottom();

      this.askBot(btn.payload);
    },
    postAnswerText: function postAnswerText() {
      var sanitizedString = this.inputConfig.responseText.trim().replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.messages.push({
        text: sanitizedString !== '' ? [sanitizedString] : null,
        rating: this.inputConfig.rating > 0 ? this.inputConfig.rating : null,
        sent: true,
        bgColor: "primary",
        textColor: "white"
      });

      this._scrollToBottom();

      var response = this.inputConfig.responsePattern === "" ? sanitizedString.replace(/(")/g, "\"") : this.inputConfig.responsePattern.replace("#", sanitizedString.replace(/(")/g, "\\\""));
      this.askBot(response);
    },
    _scrollToBottom: function _scrollToBottom() {
      if (this.$refs.scroller) {
        this.$refs.scroller.setScrollPosition(this.$refs.scroller.scrollHeight, 400);
      }
    },
    askBot: function askBot(value) {
      this.prevInputConfig = JSON.parse(JSON.stringify(this.inputConfig));
      this.reinitInput();
      this.lastPayload = value;
      this.processing = true;
      this.lastUserInteraction = Date.now();
      this.$http.post(this.botUrl, {
        sender: this.convId,
        message: value
      }).then(function (httpResponse) {
        // success
        httpResponse.body.forEach(function (value) {
          this.watingMessagesStack.push(value);
        }, this);

        this._displayMessages();
      }, function () {
        // error
        this.error = true;
        this.processing = false;

        this._scrollToBottom();
      });
    },
    _displayMessages: function _displayMessages() {
      if (this.watingMessagesStack.length > 0) {
        var currentMessage = this.watingMessagesStack.shift();
        var watingTime = this.lastUserInteraction - Date.now() + this.minTimeBetweenMessages;
        this.sleep(watingTime).then(function () {
          this._processResponse(currentMessage);

          this.lastUserInteraction = Date.now();

          this._displayMessages();
        }.bind(this));
      } else {
        this.processing = false;

        if (this.keepAction) {
          this.inputConfig = this.prevInputConfig;
          this.inputConfig.responseText = "";
          this.keepAction = false;
        }

        this.sleep(1).then(function () {
          // en différé le temps que la vue soit mise à jour
          this.$refs.input.focus();
        }.bind(this));
      }
    },
    _processResponse: function _processResponse(response) {
      var lastMsg = this.messages[this.messages.length - 1];

      if (lastMsg && !lastMsg.sent) {
        // ajoute un message à un précédent message du bot
        lastMsg.text.push(response.text);
      } else {
        // première réponse du bot
        this.messages.push({
          avatar: this.botAvatar,
          text: [response.text],
          bgColor: "grey-4"
        });
      }

      if (response.buttons) {
        response.buttons.forEach(function (value) {
          if (value.title.startsWith("#")) {
            var cmd = value.title.substring(1);
            if (cmd === "textarea") this.inputConfig.modeTextarea = true;
            if (cmd === "eval") this.inputConfig.showRating = true;
            if (cmd === "keep_action") this.keepAction = true;
            if (value.payload) this.inputConfig.responsePattern = value.payload;
          } else {
            this.inputConfig.buttons.push(value);
          }
        }, this);
      }

      this._scrollToBottom();
    },
    restart: function restart() {
      this.messages.push({
        text: [this.$q.lang.vui.chatbot.restartMessage],
        bgColor: "orange"
      });

      this._scrollToBottom();

      this.$http.post(this.botUrl, '{"sender":"' + this.convId + '","message":"/restart"}').then(function () {
        this.askBot("/start"); // lancement de la phrase d'accueil
      });
    },
    reinitInput: function reinitInput() {
      this.inputConfig.modeTextarea = false;
      this.inputConfig.responsePattern = "";
      this.inputConfig.responseText = "";
      this.inputConfig.showRating = false;
      this.inputConfig.rating = 0;
      this.inputConfig.buttons = [];
      this.error = false;
    },
    sleep: function sleep(milliseconds) {
      return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/VChatbot.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VChatbotvue_type_script_lang_js_ = (VChatbotvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/VChatbot.vue





/* normalize component */

var component = normalizeComponent(
  components_VChatbotvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VChatbot = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VCommands.vue?vue&type=template&id=6a11a77e&
var VCommandsvue_type_template_id_6a11a77e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.isCommandCommited)?_c('q-select',{ref:"commandInput",attrs:{"placeholder":_vm.$q.lang.vui.commands.globalPlaceholder,"outlined":"","bg-color":"white","dense":"","autofocus":"","dropdown-icon":"search","use-input":"","input-debounce":"300","hide-selected":"","options":_vm.commandAutocompleteOptions},on:{"blur":_vm.reset,"filter":_vm.searchCommands,"input":_vm.selectCommand},nativeOn:{"keydown":function($event){return _vm.commitCommand($event)}}},[(_vm.text !== '' && _vm.selectedCommand.commandName && _vm.selectedCommand.commandName.startsWith(_vm.text))?_c('span',{staticStyle:{"line-height":"40px","opacity":"0.5","position":"fixed"}},[_vm._v(_vm._s(_vm.selectedCommand.commandName))]):_vm._e()]):_c('div',{staticClass:"row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.executeCommand($event)}}},[_c('div',{staticClass:"bg-grey-4 text-center vertical-middle text-bold q-px-md",staticStyle:{"line-height":"40px"}},[_vm._v(_vm._s(_vm.selectedCommand.commandName))]),(!_vm.isExecuted)?_c('div',{staticClass:"row col items-center q-py-xs"},[(_vm.selectedCommand.commandParams && _vm.selectedCommand.commandParams.length > 0)?[_vm._l((_vm.selectedCommand.commandParams),function(param,index){return [(param.paramType.rawType === 'io.vertigo.commons.command.GenericUID')?[_c('q-select',{key:param,staticClass:"col q-px-xs",staticStyle:{"height":"32px"},attrs:{"use-chips":"","bg-color":"white","dense":"","borderless":"","use-input":"","input-debounce":"300","value":_vm.getParamValue(index),"options":_vm.paramsAutocompleteOptions[index],"autofocus":index === 0,"dropdown-icon":"search"},on:{"filter":function(val, update, abort) { _vm.autocompleteParam(param, index, val, update, abort);},"input":function (newValue) { _vm.selectParam(newValue, index)}},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)})($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)})($event)}}})]:[_c('q-input',{key:param,staticClass:"col q-px-xs",staticStyle:{"height":"32px"},attrs:{"color":"secondary","borderless":"","autofocus":index === 0,"dense":""},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)})($event)},"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)})($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleEnter(index)}]},model:{value:(_vm.commandParamsValues[index].value),callback:function ($$v) {_vm.$set(_vm.commandParamsValues[index], "value", $$v)},expression:"commandParamsValues[index].value"}})],_c('q-separator',{key:param,attrs:{"vertical":""}})]})]:_c('div',{staticClass:"col"},[_vm._v(_vm._s(_vm.$q.lang.vui.commands.executeCommand))]),_c('q-btn',{attrs:{"flat":"","icon":"play_arrow","size":"sm","round":""},on:{"click":_vm.executeCommand}})],2):_c('div',{staticClass:"row col items-center"},[_c('div',{staticClass:"col shadow-2 bg-secondary text-white q-px-md",staticStyle:{"line-height":"40px"}},[_vm._v(_vm._s(_vm.commandResult.display))]),(_vm.commandResult.targetUrl)?_c('q-btn',{attrs:{"type":"a","href":_vm.baseUrl + _vm.commandResult.targetUrl,"flat":""}},[_vm._v(_vm._s(_vm.$q.lang.vui.commands.linkLabel))]):_vm._e(),_c('q-btn',{attrs:{"flat":"","icon":"cancel","size":"sm","round":""},on:{"click":_vm.reset}})],1)])],1)}
var VCommandsvue_type_template_id_6a11a77e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VCommands.vue?vue&type=template&id=6a11a77e&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__("a623");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VCommands.vue?vue&type=script&lang=js&



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
//
/* harmony default export */ var VCommandsvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      text: "",
      commandParamsValues: [],
      commands: [],
      commandAutocompleteOptions: [],
      isCommandCommited: false,
      selectedCommand: {},
      isExecuted: false,
      commandResult: {},
      paramsAutocompleteOptions: []
    };
  },
  props: {
    baseUrl: {
      type: String,
      'default': '/'
    }
  },
  methods: {
    searchCommands: function searchCommands(val, update, abort) {
      this.$data.text = val;
      this.$data.selectedCommand = {};

      if (val.length < 1) {
        abort();
        return;
      }

      this.$http.post(this.baseUrl + 'api/vertigo/commands/_search', {
        prefix: val
      }).then(function (response) {
        //Ok
        this.$data.commands = response.body;
        update(function () {
          this.$data.commandAutocompleteOptions = this.$data.commands.map(function (command) {
            return {
              label: command.commandName,
              sublabel: command.descpription,
              value: command.commandName,
              command: command
            };
          });
        }.bind(this));

        if (this.$data.commands.length > 0) {
          this.chooseCommand(this.$data.commands[0], false);
        }
      });
    },
    selectCommand: function selectCommand(selection) {
      this.chooseCommand(selection.command, true);
    },
    chooseCommand: function chooseCommand(command, commitCommand) {
      this.$data.selectedCommand = command;

      if (this.$data.selectedCommand.commandParams) {
        // if we have params
        this.$data.commandParamsValues = this.$data.selectedCommand.commandParams.map(function () {
          // we prepare params
          return {
            value: ""
          };
        });
      } else {
        this.$data.commandParamsValues = [];
      }

      this.$data.isCommandCommited = commitCommand;
    },
    commitCommand: function commitCommand(keyEvent) {
      if (this.$data.selectedCommand && this.$data.selectedCommand.commandName) {
        switch (keyEvent.keyCode) {
          case 9:
          case 13:
            this.$data.isCommandCommited = true;
            keyEvent.preventDefault();
        }
      }
    },
    executeCommand: function executeCommand() {
      if (this.$data.commandParamsValues.every(function (paramValue) {
        return paramValue;
      })) {
        var actualParams = this.$data.commandParamsValues.map(function (param) {
          return param.value;
        });
        this.$http.post(this.baseUrl + 'api/vertigo/commands/_execute', {
          command: this.$data.selectedCommand.commandName,
          params: actualParams
        }).then(function (response) {
          //Ok
          this.$data.isExecuted = true;
          this.$data.commandResult = response.body;
        });
      } else {
        return false;
      }
    },
    handleEnter: function handleEnter(index) {
      if (index === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[index].value) {
        this.executeCommand();
      } // otherwise nothing particular

    },
    autocompleteParam: function autocompleteParam(param, index, val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }

      this.$http.get(this.baseUrl + 'api/vertigo/commands/params/_autocomplete', {
        params: {
          terms: val,
          entityClass: param.paramType.actualTypeArguments[0]
        }
      }).then(function (response) {
        update(function () {
          var newOptions = this.$data.paramsAutocompleteOptions.slice();
          newOptions[index] = response.body.map(function (element) {
            return {
              label: element.label,
              value: element.urn
            };
          });
          this.$data.paramsAutocompleteOptions = newOptions;
        }.bind(this));
      });
    },
    selectParam: function selectParam(selection, index) {
      var newParams = this.$data.commandParamsValues.slice();
      newParams[index] = selection;
      this.$data.commandParamsValues = newParams;
    },
    getParamValue: function getParamValue(index) {
      var actualValue = this.$data.commandParamsValues[index];

      if (actualValue && actualValue.value) {
        return actualValue;
      }
    },
    backIfNeeded: function backIfNeeded(index, isFirst) {
      if (isFirst && !this.$data.commandParamsValues[0].value) {
        this.back();
      } // otherwise nothing particular

    },
    back: function back() {
      this.$data.commandParamsValues = [];
      this.$data.commands = [];
      this.$data.isCommandCommited = false;
      this.$data.selectedCommand = {};
      this.$data.isExecuted = false;
      this.$data.commandResult = {};
      this.$data.paramsAutocompleteOptions = [];
      this.$nextTick(function () {
        this.$refs.commandInput.updateInputValue(this.$data.text);
      });
    },
    reset: function reset() {
      this.back();
      this.$data.text = "";
    }
  }
});
// CONCATENATED MODULE: ./src/components/VCommands.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VCommandsvue_type_script_lang_js_ = (VCommandsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VCommands.vue





/* normalize component */

var VCommands_component = normalizeComponent(
  components_VCommandsvue_type_script_lang_js_,
  VCommandsvue_type_template_id_6a11a77e_render,
  VCommandsvue_type_template_id_6a11a77e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VCommands = (VCommands_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VComments.vue?vue&type=template&id=045a3049&
var VCommentsvue_type_template_id_045a3049_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_c('q-btn',{staticClass:"on-left",attrs:{"round":"","size":"lg","color":"primary","textColor":"white","icon":_vm.count>0?_vm.icon:_vm.iconNone},on:{"click":function($event){_vm.commentDrawer = !_vm.commentDrawer}}},[(_vm.count>0)?_c('q-badge',{staticStyle:{"right":"-.4em","top":"-.4em"},attrs:{"floating":"","small":"","color":"red"}},[_vm._v(_vm._s(_vm.count))]):_vm._e()],1),_c('q-drawer',{staticStyle:{"top":"58px"},attrs:{"overlay":"","behavior":"mobile","width":600,"side":"right"},model:{value:(_vm.commentDrawer),callback:function ($$v) {_vm.commentDrawer=$$v},expression:"commentDrawer"}},[_c('q-list',[_c('q-item-label',{attrs:{"header":""}},[_c('big',[_vm._v(_vm._s(_vm.$q.lang.vui.comments.title))])],1),_c('q-item',[_c('q-item-section',[_c('q-input',{staticClass:"col",attrs:{"type":"textarea","autogrow":"","label":_vm.$q.lang.vui.comments.inputLabel,"stack-label":""},model:{value:(_vm.commentTextArea),callback:function ($$v) {_vm.commentTextArea=$$v},expression:"commentTextArea"}})],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-btn',{attrs:{"color":"primary","round":"","icon":"send","title":_vm.$q.lang.vui.comments.actionLabel,"aria-label":_vm.$q.lang.vui.comments.actionLabel},on:{"click":_vm.publishComment}})],1)],1),_c('q-separator'),_vm._l((_vm.list),function(comment){return _c('q-item',{key:comment.uuid,staticClass:"items-start",class:{'cursor-pointer': comment.author==_vm.connectedAccount}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-avatar',[_c('img',{attrs:{"src":_vm.baseUrl+'x/accounts/api/'+comment.author+'/photo'}})])],1),_c('q-item-section',[_c('q-item-label',[_vm._v(_vm._s(comment.authorDisplayName))]),_c('div',[_vm._v(" "+_vm._s(comment.msg)+" ")])],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-item-label',{attrs:{"stamp":""}},[_vm._v(_vm._s(_vm.toDelay(new Date(comment.creationDate))))]),(comment.author==_vm.connectedAccount)?_c('q-icon',{attrs:{"name":"edit"}}):_vm._e()],1),(comment.author==_vm.connectedAccount)?_c('q-popup-edit',{attrs:{"buttons":true,"label-cancel":_vm.$q.lang.vui.comments.cancel,"label-set":_vm.$q.lang.vui.comments.save},on:{"save":function($event){return _vm.updateComment(comment)}}},[_c('q-input',{attrs:{"type":"textarea","autogrow":"","dense":""},model:{value:(comment.msg),callback:function ($$v) {_vm.$set(comment, "msg", $$v)},expression:"comment.msg"}})],1):_vm._e()],1)})],2)],1)],1)}
var VCommentsvue_type_template_id_045a3049_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VComments.vue?vue&type=template&id=045a3049&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VComments.vue?vue&type=script&lang=js&
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

/* harmony default export */ var VCommentsvue_type_script_lang_js_ = ({
  props: {
    concept: {
      type: String
    },
    id: {
      type: String
    },
    icon: {
      type: String,
      'default': 'comment'
    },
    iconNone: {
      type: String,
      'default': 'add_comment'
    },
    baseUrl: {
      type: String,
      'default': '/api/',
      required: true
    },
    connectedAccount: {
      type: String
    }
  },
  data: function data() {
    return {
      list: [],
      count: 0,
      commentDrawer: false,
      commentTextArea: ""
    };
  },
  created: function created() {
    this.fetchCommentsList();
  },
  methods: {
    fetchCommentsList: function fetchCommentsList() {
      this.$http.get(this.baseUrl + 'x/comment/api/comments?concept=' + this.concept + '&id=' + this.id).then(function (response) {
        //Ok
        this.list = response.body;
        this.count = this.list.length;
      });
    },
    publishComment: function publishComment() {
      var newComment = {
        msg: this.commentTextArea
      };

      if (newComment.msg) {
        newComment.concept = this.concept;
        newComment.id = this.id;
        this.$http.post(this.baseUrl + 'x/comment/api/comments?concept=' + this.concept + '&id=' + this.id, newComment).then(function () {
          //Ok
          this.commentTextArea = '';
          this.fetchCommentsList();
        });
      }
    },
    updateComment: function updateComment(newComment) {
      this.$http.put(this.baseUrl + 'x/comment/api/comments/' + newComment.uuid, newComment).then(function () {
        //Ok
        this.commentTextArea = '';
        this.fetchCommentsList();
      });
    },
    toDelay: function toDelay(creationDate) {
      var diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'days');
      if (diff > 0) return diff + ' days';
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'hours');
      if (diff > 0) return diff + ' hours';
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'minutes');
      if (diff > 0) return diff + ' min';
      return 'Now';
    }
  }
});
// CONCATENATED MODULE: ./src/components/VComments.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VCommentsvue_type_script_lang_js_ = (VCommentsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VComments.vue





/* normalize component */

var VComments_component = normalizeComponent(
  components_VCommentsvue_type_script_lang_js_,
  VCommentsvue_type_template_id_045a3049_render,
  VCommentsvue_type_template_id_045a3049_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VComments = (VComments_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=template&id=1e19dd23&
var VExtensionsStorevue_type_template_id_1e19dd23_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row q-col-gutter-md"},_vm._l((_vm.extensions),function(extension){return _c('div',{key:extension.name,staticClass:"col-xs-12 col-lg-6 col-xl-4"},[_c('q-card',[_c('q-item',{staticClass:"bg-white",staticStyle:{"height":"100px"}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{style:(_vm.getIconStyle(extension.color)),attrs:{"name":extension.icon,"size":"40px"}})],1),_c('q-item-section',[_c('div',{staticClass:"row col items-center"},[_c('div',{staticClass:"q-subheading text-bold"},[_vm._v(_vm._s(extension.label))]),_c('div',{staticClass:"col"}),_c('div',[_c('q-toggle',{attrs:{"disable":"","readonly":"","color":"positive"},model:{value:(extension.enabled),callback:function ($$v) {_vm.$set(extension, "enabled", $$v)},expression:"extension.enabled"}})],1)]),_c('div',{staticClass:"row col q-body-2 text-justify"},[_vm._v(_vm._s(extension.description))])])],1)],1)],1)}),0)}
var VExtensionsStorevue_type_template_id_1e19dd23_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue?vue&type=template&id=1e19dd23&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=script&lang=js&



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
/* harmony default export */ var VExtensionsStorevue_type_script_lang_js_ = ({
  props: {
    activeSkills: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      extensions: []
    };
  },
  created: function created() {
    var availableExtensions = [{
      name: "vertigo-audit",
      label: "Audit",
      description: "Trace every single aspect of your app through exhaustive logging capabilities.",
      color: "#F7578C",
      icon: "fas fa-clipboard-list",
      enabled: false
    }, {
      name: "vertigo-dashboard",
      label: "Dashboard",
      description: "Monitor you system to make sure your app meets the customer requirements.",
      color: "#742774",
      icon: "fas fa-chart-line",
      enabled: false
    }, {
      name: "vertigo-geo",
      label: "Geo",
      description: "Enhance your data by enabling geographic functions and tools.",
      icon: "fas fa-globe",
      color: "#0E2947",
      enabled: false
    }, {
      name: "vertigo-ledger",
      label: "Ledger",
      description: "Use a blockchain to enforce secure transactions in your app !",
      icon: "fas fa-link",
      color: "#00AC5C",
      enabled: false
    }, {
      name: "vertigo-orchestra",
      label: "Orchestra",
      description: "Manage jobs and monitor their status with this powerfull control tower.",
      color: "#FC636B",
      icon: "fas fa-tasks",
      enabled: false
    }, {
      name: "vertigo-quarto",
      label: "Quarto",
      description: "Generate slick documents and reports using the Quarto template engine.",
      color: "#0747A6",
      icon: "fas fa-file-invoice",
      enabled: false
    }, {
      name: "vertigo-social",
      label: "Social",
      description: "Ensure real time communication and collaboration between your app users.",
      color: "#FF3366",
      icon: "far fa-comments",
      enabled: false
    }, {
      name: "vertigo-stella",
      label: "Stella",
      description: "Enable multi-node task dispatching for your app and assign specific tasks to each node.",
      color: "#0066FF",
      icon: "fas fa-network-wired",
      enabled: false
    }];
    availableExtensions.forEach(function (availableExtension) {
      availableExtension.enabled = this.$props.activeSkills.indexOf(availableExtension.name) > -1;
    }.bind(this));
    this.extensions = availableExtensions;
  },
  methods: {
    getIconStyle: function getIconStyle(color) {
      return 'border: 3px solid ' + color + '; background-color: ' + color + '; color: white; padding: 5px; width: 70px; height: 70px;';
    }
  }
});
// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VExtensionsStorevue_type_script_lang_js_ = (VExtensionsStorevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue





/* normalize component */

var VExtensionsStore_component = normalizeComponent(
  components_VExtensionsStorevue_type_script_lang_js_,
  VExtensionsStorevue_type_template_id_1e19dd23_render,
  VExtensionsStorevue_type_template_id_1e19dd23_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VExtensionsStore = (VExtensionsStore_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VFacets.vue?vue&type=template&id=dee9ebd2&
var VFacetsvue_type_template_id_dee9ebd2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"facets"},[(_vm.isAnyFacetValueSelected())?_c('div',{staticClass:"selectedFacets q-pb-md"},_vm._l((_vm.selectedFacets),function(selectedFacetValues,selectedFacet){return _c('div',{key:selectedFacet},_vm._l((selectedFacetValues),function(selectedFacetValue){return _c('q-chip',{key:selectedFacetValue.code,staticClass:"q-mb-sm",attrs:{"clickable":"","icon-right":"cancel"},on:{"click":function($event){return _vm.$emit('toogle-facet', selectedFacet, selectedFacetValue, _vm.contextKey)}}},[_vm._v(_vm._s(_vm.facetLabelByCode(selectedFacet))+": "+_vm._s(_vm.facetValueLabelByCode(selectedFacet, selectedFacetValue))+" ")])}),1)}),0):_vm._e(),_vm._l((_vm.facets),function(facet){return _c('q-list',{key:facet.code,staticClass:"facetValues q-py-none",attrs:{"dense":""}},[(facet.multiple || !_vm.isFacetSelected(facet.code))?[_c('q-item-label',{attrs:{"header":""}},[_c('big',[_vm._v(_vm._s(facet.label))])],1),_vm._l((_vm.visibleFacets(facet.code, facet.values)),function(value){return _c('q-item',{key:value.code,staticClass:"facetValue q-ml-md",attrs:{"clickable":""},nativeOn:{"click":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}},[(facet.multiple)?_c('q-item-section',{attrs:{"avatar":""}},[_c('q-checkbox',{attrs:{"value":_vm.isFacetValueSelected(facet.code, value.code),"label":_vm.facetValueLabel(value.label, value.count)},on:{"change":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}})],1):_c('q-item-section',[_vm._v(_vm._s(value.label))]),_vm._v(" "),_c('q-item-section',{attrs:{"side":""}},[_vm._v(_vm._s(value.count))])],1)}),(facet.values.length > _vm.maxValues && !_vm.isFacetExpanded(facet.code))?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){return _vm.expandFacet(facet.code)}}},[_vm._v(_vm._s(_vm.$q.lang.vui.facets.showAll))]):_vm._e(),(facet.values.length > _vm.maxValues && _vm.isFacetExpanded(facet.code))?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){return _vm.reduceFacet(facet.code)}}},[_vm._v(_vm._s(_vm.$q.lang.vui.facets.showLess))]):_vm._e()]:_vm._e()],2)})],2)}
var VFacetsvue_type_template_id_dee9ebd2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VFacets.vue?vue&type=template&id=dee9ebd2&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VFacets.vue?vue&type=script&lang=js&












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
/* harmony default export */ var VFacetsvue_type_script_lang_js_ = ({
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    maxValues: {
      type: Number,
      default: 5
    }
  },
  computed: {},
  data: function data() {
    return {
      expandedFacets: []
    };
  },
  methods: {
    facetByCode: function facetByCode(facetCode) {
      return this.facets.filter(function (facet) {
        return facet.code === facetCode;
      })[0];
    },
    facetLabelByCode: function facetLabelByCode(facetCode) {
      return this.facetByCode(facetCode).label;
    },
    facetValueLabelByCode: function facetValueLabelByCode(facetCode, facetValueCode) {
      return this.facetByCode(facetCode).values.filter(function (facetValue) {
        return facetValue.code === facetValueCode;
      })[0].label;
    },
    isAnyFacetValueSelected: function isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some(function (facetCode) {
        return this.selectedFacets[facetCode] && this.selectedFacets[facetCode].length > 0;
      }.bind(this));
    },
    isFacetValueSelected: function isFacetValueSelected(facetCode, facetValueCode) {
      return this.selectedFacets[facetCode].includes(facetValueCode);
    },
    isFacetSelected: function isFacetSelected(facetCode) {
      if (this.selectedFacets[facetCode]) {
        return this.selectedFacets[facetCode].length > 0;
      }

      return false;
    },
    facetValueLabel: function facetValueLabel(label, count) {
      return label + ' (' + count + ')';
    },
    expandFacet: function expandFacet(facetCode) {
      if (!this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.push(facetCode);
      }
    },
    reduceFacet: function reduceFacet(facetCode) {
      if (this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(facetCode), 1);
      }
    },
    isFacetExpanded: function isFacetExpanded(facetCode) {
      return this.$data.expandedFacets.includes(facetCode);
    },
    visibleFacets: function visibleFacets(facetCode, facetValues) {
      if (!this.isFacetExpanded(facetCode)) {
        return facetValues.slice(0, this.maxValues);
      }

      return facetValues;
    }
  }
});
// CONCATENATED MODULE: ./src/components/VFacets.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VFacetsvue_type_script_lang_js_ = (VFacetsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VFacets.vue





/* normalize component */

var VFacets_component = normalizeComponent(
  components_VFacetsvue_type_script_lang_js_,
  VFacetsvue_type_template_id_dee9ebd2_render,
  VFacetsvue_type_template_id_dee9ebd2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VFacets = (VFacets_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=template&id=ea4883be&
var VGeopointInputvue_type_template_id_ea4883be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('q-input',{attrs:{"label":"Longitude","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.inputObject.lon),callback:function ($$v) {_vm.$set(_vm.inputObject, "lon", _vm._n($$v))},expression:"inputObject.lon"}}),_c('q-input',{attrs:{"label":"Latitude","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.inputObject.lat),callback:function ($$v) {_vm.$set(_vm.inputObject, "lat", _vm._n($$v))},expression:"inputObject.lat"}})],1)}
var VGeopointInputvue_type_template_id_ea4883be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VGeopointInput.vue?vue&type=template&id=ea4883be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var VGeopointInputvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: Object
    }
  },
  data: function data() {
    return {
      inputObject: this.$props.value ? this.$props.value : {}
    };
  },
  watch: {
    value: function value(newVal) {
      this.$data.inputObject = newVal ? newVal : {};
      this.updateJson();
    }
  },
  beforeMount: function beforeMount() {
    this.updateJson();
  },
  methods: {
    updateJson: function updateJson() {
      var newInputValue;

      if (this.$props.value) {
        newInputValue = JSON.stringify({
          lon: this.$data.inputObject.lon,
          lat: this.$data.inputObject.lat
        });
        this.$set(this.$props.value, '_v_inputValue', newInputValue);
      } else {//this.$set(this.$props.value, null );
      }

      this.$emit('input', this.$data.inputObject);
    }
  }
});
// CONCATENATED MODULE: ./src/components/VGeopointInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VGeopointInputvue_type_script_lang_js_ = (VGeopointInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VGeopointInput.vue





/* normalize component */

var VGeopointInput_component = normalizeComponent(
  components_VGeopointInputvue_type_script_lang_js_,
  VGeopointInputvue_type_template_id_ea4883be_render,
  VGeopointInputvue_type_template_id_ea4883be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VGeopointInput = (VGeopointInput_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VHandles.vue?vue&type=template&id=b00acc16&
var VHandlesvue_type_template_id_b00acc16_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('q-input',{attrs:{"placeholder":_vm.$q.lang.vui.handles.placeholder,"debounce":300,"autofocus":"","outlined":"","bg-color":"white","dense":""},on:{"input":_vm.searchHandles},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"search"}})]},proxy:true}]),model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}}),_c('q-list',{attrs:{"bordered":"","dense":"","separator":""}},_vm._l((_vm.handles),function(handle){return _c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],key:handle.code,attrs:{"clickable":""},on:{"click":function($event){return _vm.VUi.methods.goTo(_vm.baseUrl + 'hw/' + handle.code )}}},[_c('q-item-section',[_vm._v(" "+_vm._s(handle.code)+" ")])],1)}),1)],1)}
var VHandlesvue_type_template_id_b00acc16_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VHandles.vue?vue&type=template&id=b00acc16&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VHandles.vue?vue&type=script&lang=js&
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
/* harmony default export */ var VHandlesvue_type_script_lang_js_ = ({
  props: {
    baseUrl: {
      type: String,
      'default': '/'
    }
  },
  data: function data() {
    return {
      text: "",
      handles: []
    };
  },
  methods: {
    searchHandles: function searchHandles(val) {
      if (val) {
        this.$http.post(this.baseUrl + 'api/vertigo/handle/_search', {
          prefix: val
        }).then(function (response) {
          //Ok
          this.$data.handles = response.body;
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/VHandles.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VHandlesvue_type_script_lang_js_ = (VHandlesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VHandles.vue





/* normalize component */

var VHandles_component = normalizeComponent(
  components_VHandlesvue_type_script_lang_js_,
  VHandlesvue_type_template_id_b00acc16_render,
  VHandlesvue_type_template_id_b00acc16_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VHandles = (VHandles_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=template&id=0d8d2ff4&
var VJsonEditorvue_type_template_id_0d8d2ff4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},_vm._l((_vm.jsonAsObject),function(value,key){return _c('div',{key:key,class:'col-'+(12/_vm.cols)},[(!_vm.readonly)?_c('q-input',{attrs:{"label":key,"orientation":"vertical","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.jsonAsObject[key]),callback:function ($$v) {_vm.$set(_vm.jsonAsObject, key, $$v)},expression:"jsonAsObject[key]"}}):_c('q-field',{attrs:{"label":key,"orientation":"vertical","stack-label":"","borderless":"","readonly":""}},[_c('span',[_vm._v(_vm._s(value))])])],1)}),0)}
var VJsonEditorvue_type_template_id_0d8d2ff4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VJsonEditor.vue?vue&type=template&id=0d8d2ff4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=script&lang=js&

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
/* harmony default export */ var VJsonEditorvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      required: true
    },
    cols: {
      type: Number,
      'default': 2
    }
  },
  data: function data() {
    return {
      jsonAsObject: JSON.parse(this.$props.value)
    };
  },
  watch: {
    value: function value(newVal) {
      this.$data.jsonAsObject = JSON.parse(newVal);
    }
  },
  methods: {
    updateJson: function updateJson() {
      this.$emit('input', JSON.stringify(this.$data.jsonAsObject));
    }
  }
});
// CONCATENATED MODULE: ./src/components/VJsonEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VJsonEditorvue_type_script_lang_js_ = (VJsonEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VJsonEditor.vue





/* normalize component */

var VJsonEditor_component = normalizeComponent(
  components_VJsonEditorvue_type_script_lang_js_,
  VJsonEditorvue_type_template_id_0d8d2ff4_render,
  VJsonEditorvue_type_template_id_0d8d2ff4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VJsonEditor = (VJsonEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VNotifications.vue?vue&type=template&id=282e8095&
var VNotificationsvue_type_template_id_282e8095_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-btn',{staticClass:"on-left",attrs:{"round":"","dense":"","color":_vm.hasNew?'primary':'white',"textColor":_vm.hasNew?'white':'primary',"icon":_vm.count>0?_vm.icon:_vm.iconNone}},[(_vm.count>0)?_c('q-badge',{attrs:{"color":"red","text-color":"white","floating":""}},[_vm._v(_vm._s(_vm.count))]):_vm._e(),_c('q-menu',{staticClass:"notifications"},[_c('q-list',{staticStyle:{"width":"300px"}},_vm._l((_vm.list),function(notif){return _c('q-item',{key:notif.uuid,attrs:{"tag":"a","href":notif.targetUrl}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{attrs:{"name":_vm.toIcon(notif.type),"size":"2rem"}})],1),_c('q-item-section',[_c('q-item-label',[_vm._v(_vm._s(notif.title))]),_c('q-item-label',{attrs:{"caption":"","lines":"3"}},[_vm._v(_vm._s(notif.content))])],1),_c('q-item-section',{attrs:{"side":"","top":""}},[_c('q-item-label',{attrs:{"caption":""}},[_vm._v(_vm._s(_vm.toDelay(new Date(notif.creationDate))))])],1)],1)}),1)],1)],1)}
var VNotificationsvue_type_template_id_282e8095_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VNotifications.vue?vue&type=template&id=282e8095&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VNotifications.vue?vue&type=script&lang=js&


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

/* harmony default export */ var VNotificationsvue_type_script_lang_js_ = ({
  props: {
    icon: {
      type: String,
      'default': 'notifications'
    },
    iconNone: {
      type: String,
      'default': 'notifications_none'
    },
    typeIconMap: {
      type: Object,
      'default': function _default() {
        return {};
      }
    },
    baseUrl: {
      type: String,
      'default': '/api/',
      required: true
    }
  },
  data: function data() {
    return {
      firstCall: true,
      list: [],
      hasNew: false,
      wasError: false,
      count: 0,
      timer: ''
    };
  },
  created: function created() {
    this.fetchNotificationsList();
    this.timer = setInterval(this.fetchNotificationsList, 5000);
  },
  methods: {
    fetchNotificationsList: function fetchNotificationsList() {
      this.$http.get(this.baseUrl + 'x/notifications/api/messages', {
        timeout: 5 * 1000
      }).then(function (response) {
        //Ok
        this.updateNotificationsData(response.body);

        if (this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 5000);
        }

        this.wasError = false;
      }).catch(function () {
        //Ko
        if (!this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 60000);
        }

        this.wasError = true;
      });
    },
    updateNotificationsData: function updateNotificationsData(newList) {
      // Tri par ordre décroissant de date de création
      var sortedList = newList.sort(function (a, b) {
        return b.creationDate - a.creationDate;
      });
      var newElements = []; // Traverse both arrays simultaneously.

      var lastOldElement = this.list[0];

      if (!lastOldElement) {
        newElements = sortedList;
      } else {
        for (var newIdx = 0; newIdx < sortedList.length; newIdx++) {
          if (sortedList[newIdx].uuid != lastOldElement.uuid) {
            if (sortedList[newIdx].creationDate < lastOldElement.creationDate) {
              break;
            } else {
              newElements.push(sortedList[newIdx]);
            }
          }
        }
      } // Mise à jour des notifications


      this.list = sortedList; // Met à jour le nombre total de notifications

      this.count = sortedList.length;
      this.hasNew = newElements.length > 0;

      if (!this.firstCall) {
        newElements.forEach(function (notif) {
          this.$q.notify({
            type: 'info',
            icon: this.toIcon(notif.type),
            message: notif.title,
            detail: notif.content,
            timeout: 3000,
            position: 'bottom-right'
          });
        }.bind(this));
      } // Booléen indiquant s'il s'agit du premier appel à la MaJ des notifications


      this.firstCall = false;
    },
    cancelAutoUpdate: function cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    toIcon: function toIcon(type) {
      var typeIcon = this.typeIconMap[type];
      return typeIcon ? typeIcon : 'mail';
    },
    toDelay: function toDelay(creationDate) {
      var diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'days');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.days;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'hours');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.hours;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'minutes');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.minutes;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.getDateDiff(Date.now(), creationDate, 'seconds');
      return diff + ' ' + this.$q.lang.vui.notifications.seconds;
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.timer);
  }
});
// CONCATENATED MODULE: ./src/components/VNotifications.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VNotificationsvue_type_script_lang_js_ = (VNotificationsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VNotifications.vue





/* normalize component */

var VNotifications_component = normalizeComponent(
  components_VNotificationsvue_type_script_lang_js_,
  VNotificationsvue_type_template_id_282e8095_render,
  VNotificationsvue_type_template_id_282e8095_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VNotifications = (VNotifications_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMap.vue?vue&type=template&id=6fd51611&
var VMapvue_type_template_id_6fd51611_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.id}},[_vm._t("default")],2)}
var VMapvue_type_template_id_6fd51611_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VMap.vue?vue&type=template&id=6fd51611&

// EXTERNAL MODULE: external {"commonjs":"ol","commonjs2":"ol","root":"ol"}
var external_commonjs_ol_commonjs2_ol_root_ol_ = __webpack_require__("0f55");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMap.vue?vue&type=script&lang=js&


//
//
//
//
//


/* harmony default export */ var VMapvue_type_script_lang_js_ = ({
  props: {
    id: {
      type: String,
      required: true
    },
    initialZoomLevel: {
      type: Number
    },
    initialCenter: {
      type: Object
    }
  },
  methods: {
    onMapLoad: function onMapLoad(found) {
      var vm = this;

      function checkForMap() {
        if (vm.olMap) {
          found(vm.olMap);
        } else {
          setTimeout(checkForMap, 50);
        }
      }

      checkForMap();
    }
  },
  mounted: function mounted() {
    var view = new external_commonjs_ol_commonjs2_ol_root_ol_["View"]();
    var osmLayer = new external_commonjs_ol_commonjs2_ol_root_ol_["layer"].Tile({
      preload: 4,
      source: new external_commonjs_ol_commonjs2_ol_root_ol_["source"].OSM()
    });
    this.olMap = new external_commonjs_ol_commonjs2_ol_root_ol_["Map"]({
      interactions: external_commonjs_ol_commonjs2_ol_root_ol_["interaction"].defaults({
        onFocusOnly: true
      }),
      target: this.$props.id,
      layers: [osmLayer],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      view: view
    });

    if (this.$props.initialCenter) {
      this.olMap.getView().setCenter(external_commonjs_ol_commonjs2_ol_root_ol_["proj"].fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat]));
    }

    if (this.$props.initialZoomLevel) {
      this.olMap.getView().setZoom(this.$props.initialZoomLevel);
    } // handle refresh if an endPoint is specified


    this.olMap.on('moveend', function (e) {
      var mapExtent = e.map.getView().calculateExtent();
      var wgs84Extent = external_commonjs_ol_commonjs2_ol_root_ol_["proj"].transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
      var topLeft = external_commonjs_ol_commonjs2_ol_root_ol_["extent"].getTopLeft(wgs84Extent);
      var bottomRight = external_commonjs_ol_commonjs2_ol_root_ol_["extent"].getBottomRight(wgs84Extent);
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$emit('moveend', topLeft, bottomRight), 300);
    }.bind(this));
    setTimeout(function () {
      this.olMap.on('click', function (evt) {
        evt.stopPropagation();
        external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_["proj"].transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')), 300);
      }.bind(this));
    }.bind(this), 300);
  }
});
// CONCATENATED MODULE: ./src/components/VMap.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VMapvue_type_script_lang_js_ = (VMapvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VMap.vue





/* normalize component */

var VMap_component = normalizeComponent(
  components_VMapvue_type_script_lang_js_,
  VMapvue_type_template_id_6fd51611_render,
  VMapvue_type_template_id_6fd51611_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMap = (VMap_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"78c208c0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMapLayer.vue?vue&type=template&id=4b5003ae&
var VMapLayervue_type_template_id_4b5003ae_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.id}},[_c('div',{attrs:{"id":_vm.id+'Popup'}},[(_vm.popupDisplayed)?_c('q-card',{staticClass:"q-px-md"},[_vm._t("card",[_c('div',{staticClass:"text-subtitle2"},[_vm._v(_vm._s(_vm.objectDisplayed[_vm.nameField]))])],{"objectDisplayed":_vm.objectDisplayed})],2):_vm._e()],1)])}
var VMapLayervue_type_template_id_4b5003ae_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VMapLayer.vue?vue&type=template&id=4b5003ae&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMapLayer.vue?vue&type=script&lang=js&





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


/* harmony default export */ var VMapLayervue_type_script_lang_js_ = ({
  props: {
    id: {
      type: String,
      required: true
    },
    list: {
      type: Array
    },
    object: {
      type: Object
    },
    baseUrl: {
      type: String
    },
    field: {
      type: String,
      required: true
    },
    nameField: {
      type: String
    },
    markerColor: {
      type: String,
      'default': "#000000"
    },
    markerFont: {
      type: String,
      'default': "Material Icons"
    },
    markerIcon: {
      type: String,
      'default': "place"
    },
    markerSize: {
      type: Number,
      'default': 30
    },
    clusterCircleSize: {
      type: Number,
      'default': 20
    },
    clusterColor: {
      type: String,
      'default': "#fff"
    },
    clusterCircleBorderColor: {
      type: String,
      'default': "#000000"
    },
    clusterTextColor: {
      type: String,
      'default': "#000000"
    },
    clusterTextSize: {
      type: Number,
      'default': 12
    },
    clusterTextFont: {
      type: String,
      'default': 'sans-serif'
    }
  },
  data: function data() {
    return {
      popupDisplayed: false,
      objectDisplayed: {},
      items: [],
      olMap: {},
      vectorSource: {}
    };
  },
  watch: {
    list: function list(newVal) {
      this.$data.items = newVal;
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    'object.geoLocation': function objectGeoLocation() {
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    }
  },
  computed: {
    features: function features() {
      var geoField = this.$props.field;
      var arrayOfFeatures = this.$data.items.filter(function (object) {
        return object[geoField] != null;
      }).map(function (object) {
        var geoObject;

        if (typeof object[geoField] === 'string' || object[geoField] instanceof String) {
          geoObject = JSON.parse(object[geoField]);
        } else {
          geoObject = object[geoField];
        }

        if (geoObject != null) {
          var iconFeature = new external_commonjs_ol_commonjs2_ol_root_ol_["Feature"]({
            geometry: new external_commonjs_ol_commonjs2_ol_root_ol_["geom"].Point(external_commonjs_ol_commonjs2_ol_root_ol_["proj"].fromLonLat([geoObject.lon, geoObject.lat]))
          });

          if (this.$props.nameField) {
            iconFeature.set('name', object[this.$props.nameField]);
            iconFeature.set('innerObject', object);
          }

          return iconFeature;
        }

        return null;
      }.bind(this));
      return arrayOfFeatures;
    }
  },
  methods: {
    fetchList: function fetchList(topLeft, bottomRight) {
      this.$http.get(this.baseUrl + '_geoSearch?topLeft="' + topLeft.lat + ',' + topLeft.lon + '"&bottomRight="' + bottomRight.lat + ',' + bottomRight.lon + '"', {
        timeout: 5 * 1000
      }).then(function (response) {
        //Ok
        this.$data.items = response.body;
        this.$data.vectorSource.clear();
        this.$data.vectorSource.addFeatures(this.features);
      });
    }
  },
  mounted: function mounted() {
    this.$parent.onMapLoad(function (olMap) {
      this.$data.olMap = olMap;
      this.$data.items = [];

      if (this.$props.list) {
        this.$data.items = this.$props.list;
      } else if (this.$props.object) {
        this.$data.items = [this.$props.object];
      }

      this.$data.vectorSource = new external_commonjs_ol_commonjs2_ol_root_ol_["source"].Vector({
        features: this.features
      });
      var clusterSource = new external_commonjs_ol_commonjs2_ol_root_ol_["source"].Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      });
      var clusterLayer = new external_commonjs_ol_commonjs2_ol_root_ol_["layer"].Vector({
        source: clusterSource
      });
      var styleIcon = new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Style({
        text: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Text({
          font: this.$props.markerSize + 'px ' + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Fill({
            color: this.$props.markerColor
          }),
          offsetY: 0
        })
      });
      var styleCache = {};
      clusterLayer.setStyle(function (feature)
      /*resolution*/
      {
        var size = feature.get('features').length;

        if (size == 1) {
          return styleIcon;
        } else {
          // otherwise show the number of features
          var style = styleCache[size];

          if (!style) {
            style = new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Style({
              image: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Circle({
                radius: this.$props.clusterCircleSize,
                stroke: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Stroke({
                  color: this.$props.clusterCircleBorderColor
                }),
                fill: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Fill({
                  color: this.$props.clusterColor
                })
              }),
              text: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Text({
                text: size.toString(),
                font: this.$props.clusterTextSize + 'px ' + this.$props.clusterTextFont,
                fill: new external_commonjs_ol_commonjs2_ol_root_ol_["style"].Fill({
                  color: this.$props.clusterTextColor
                })
              })
            });
            styleCache[size] = style;
          }

          return style;
        }
      }.bind(this));
      this.olMap.addLayer(clusterLayer); // fit view

      if (this.features.length > 0) {
        this.olMap.getView().fit(clusterLayer.getSource().getSource().getExtent(), this.olMap.getSize());
      } // handle refresh if an endPoint is specified


      this.olMap.on('moveend', function (e) {
        var mapExtent = e.map.getView().calculateExtent();
        var wgs84Extent = external_commonjs_ol_commonjs2_ol_root_ol_["proj"].transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
        var topLeft = external_commonjs_ol_commonjs2_ol_root_ol_["extent"].getTopLeft(wgs84Extent);
        var bottomRight = external_commonjs_ol_commonjs2_ol_root_ol_["extent"].getBottomRight(wgs84Extent);

        if (this.baseUrl) {
          external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.fetchList({
            lat: topLeft[0],
            lon: topLeft[1]
          }, {
            lat: bottomRight[0],
            lon: bottomRight[1]
          }), 300);
        }

        external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$emit('moveend', topLeft, bottomRight), 300);
      }.bind(this));

      if (this.$props.nameField) {
        var popup = new external_commonjs_ol_commonjs2_ol_root_ol_["Overlay"]({
          element: this.$el.querySelector('#' + this.$props.id + 'Popup'),
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -20]
        });
        this.olMap.addOverlay(popup); // display popup on click

        this.olMap.on('click', function (evt) {
          var feature = this.olMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });

          if (feature && feature.get('features').length == 1) {
            var coordinates = feature.getGeometry().getCoordinates();
            popup.setPosition(coordinates);
            this.$data.popupDisplayed = true;
            this.$data.objectDisplayed = feature.get('features')[0].get('innerObject');
            evt.stopPropagation();
            external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_["proj"].transform(coordinates, 'EPSG:3857', 'EPSG:4326')), 300);
          } else {
            this.$data.popupDisplayed = false;
          }
        }.bind(this)); // change mouse cursor when over marker

        this.olMap.on('pointermove', function (e) {
          if (e.dragging) {
            this.$data.popupDisplayed = false;
            return;
          }

          var pixel = this.olMap.getEventPixel(e.originalEvent);
          var hit = this.olMap.hasFeatureAtPixel(pixel);
          this.olMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }.bind(this));
      } else {
        this.olMap.on('click', function (evt) {
          var feature = this.olMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });

          if (feature && feature.get('features').length == 1) {
            var coordinates = feature.getGeometry().getCoordinates();
            evt.stopPropagation();
            external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_["proj"].transform(coordinates, 'EPSG:3857', 'EPSG:4326')), 300);
          }
        }.bind(this));
      }
    }.bind(this));
  }
});
// CONCATENATED MODULE: ./src/components/VMapLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VMapLayervue_type_script_lang_js_ = (VMapLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VMapLayer.vue





/* normalize component */

var VMapLayer_component = normalizeComponent(
  components_VMapLayervue_type_script_lang_js_,
  VMapLayervue_type_template_id_4b5003ae_render,
  VMapLayervue_type_template_id_4b5003ae_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMapLayer = (VMapLayer_component.exports);
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/directives/VMinify.js


/* harmony default export */ var VMinify = ({
  bind: function bind(elMaxi, args) {
    var topOffset = args.value.topOffset;
    var topOffsetElSelector = args.value.topOffsetEl;
    var leftOffset = args.value.leftOffset;
    var leftOffsetElSelector = args.value.leftOffsetEl;
    var elMini = elMaxi.querySelector('.mini');

    for (var i = 0; i < elMaxi.childNodes.length; i++) {
      var elChild = elMaxi.childNodes[i];

      if (elChild.classList && !elChild.classList.contains('mini')) {
        elChild.classList.add("not-mini");
      }
    }

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyHandler = function () {
      var currentTopOffset = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyComputeOffset(topOffset, topOffsetElSelector, 0, 'TOP');
      var currentLeftOffset = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyComputeOffset(leftOffset, leftOffsetElSelector, 0, 'LEFT');
      var elMiniHeight = elMini.getBoundingClientRect().height - currentTopOffset;
      var elMaxiHeight = elMaxi.getBoundingClientRect().height; //We check if nav should be fixed
      // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position

      if (window.pageYOffset > elMaxiHeight - elMiniHeight) {
        elMini.classList.add("visible");
        elMini.style.top = 0; //top

        elMini.style.paddingTop = currentTopOffset + "px";
        elMini.style.paddingLeft = currentLeftOffset + "px";
      } else {
        elMini.classList.remove("visible");
        elMini.style.top = -elMiniHeight - currentTopOffset + "px";
      }
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyComputeOffset = function (offset, offsetElSelector, defaultOffset, direction) {
      var currentOffset = defaultOffset;

      if (offset) {
        currentOffset = offset;
      } else if (offsetElSelector) {
        var offsetElement = document.querySelector(offsetElSelector);

        if (direction === 'LEFT') {
          currentOffset = offsetElement.getBoundingClientRect().width + offsetElement.getBoundingClientRect().x;
        } else if (direction === 'TOP') {
          currentOffset = offsetElement.getBoundingClientRect().height + offsetElement.getBoundingClientRect().y;
        }
      }

      return currentOffset;
    };

    window.addEventListener('scroll', external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyHandler);
    window.addEventListener('resize', external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.throttle(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyHandler, 50));
  },
  componentUpdated: function componentUpdated() {
    var interval = 50;
    var maxDelay = 1000;

    for (var delay = interval; delay < maxDelay; delay += delay) {
      setTimeout(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.minifyHandler, delay);
    }
  },
  unbind: function unbind(elMaxi) {
    window.removeEventListener('scroll');
    window.removeEventListener('resize');

    for (var i = 0; i < elMaxi.childNodes.length; i++) {
      var elChild = elMaxi.childNodes[i];

      if (elChild.classList) {
        elChild.classList.remove("not-mini");
      }
    }
  }
});
// CONCATENATED MODULE: ./src/directives/VScrollSpy.js


/* harmony default export */ var VScrollSpy = ({
  bind: function bind(elNav, args) {
    var debugMode = args.value.debug ? args.value.debug : false;
    var offset = args.value.offset ? args.value.offset : 0;
    var padding = args.value.padding ? args.value.padding : 24;
    var scanner = args.value.scanner ? args.value.scanner : offset + 30; //scanner is 30px bottom of offset, must be smaller than the smallest first element

    var elAs = elNav.querySelectorAll('a');
    elAs[0].classList.add("active"); //first active

    var scrollContainer = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollTarget(document.querySelector(elAs[0].hash));
    var scannerLine1;

    if (debugMode) {
      scannerLine1 = document.createElement("HR");
      scannerLine1.style.position = 'absolute';
      scannerLine1.style.top = scanner + 'px';
      scannerLine1.style.border = 'none';
      scannerLine1.style.borderTop = 'red solid 1px';
      scannerLine1.style.width = '100%';
      scannerLine1.style.zIndex = '10000';
      document.querySelector('body').appendChild(scannerLine1);
    }

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollSpyHandler = function () {
      // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
      if (window.pageYOffset > offset) {
        elNav.style.top = offset + padding + "px"; //when fixed, we must set a valid width, for that we use parent width

        elNav.style.width = elNav.parentElement.getBoundingClientRect().width + "px";
        elNav.classList.add("fixed");
      } else {
        elNav.classList.remove("fixed");
        elNav.style.top = null;
        elNav.style.width = null;
      } //We compute breakpoints


      var scrollPosition = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollPosition(scrollContainer);
      var scrollBreakpoints = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBreakPoints(scrollPosition); //We looks between which breakpoints we are

      for (var i = 0; i < elAs.length; i++) {
        if (scrollBreakpoints[i] <= scrollPosition && (i >= elAs.length - 1 || scrollPosition < scrollBreakpoints[i + 1])) {
          elAs[i].classList.add("active");
        } else {
          elAs[i].classList.remove("active");
        }
      }
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollTo = function (event) {
      event.preventDefault();
      var elScrollId = event.target.hash;
      var elScroll = document.querySelector(elScrollId);
      var toScroll = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollPosition(scrollContainer) + elScroll.getBoundingClientRect().top - scanner;
      var scrollPosition = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollPosition(scrollContainer);
      var scrollBreakpoints = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBreakPoints(scrollPosition);

      for (var i = 0; i < elAs.length; i++) {
        if (elAs[i].hash == elScrollId) {
          toScroll = scrollBreakpoints[i];
          break;
        }
      }

      var duration = 200;
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.setScrollPosition(scrollContainer, toScroll, duration);
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBreakPoints = function (scrollPosition) {
      var blockHeight = [];

      for (var _i = 0; _i < elAs.length; _i++) {
        var elScrollId = elAs[_i].hash;
        var elScroll = document.querySelector(elScrollId);

        if (elScroll) {
          blockHeight.push(scrollPosition + elScroll.getBoundingClientRect().top); //console.log(i+'  top: '+blockHeight[i] )
        } else {//console.warn('ScrollSpy element '+elScrollId+' not found')
          }
      }

      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      /** visible height */

      var scrollHeight = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollHeight(scrollContainer);
      /** height of scrollable element */

      var scrollMax = scrollHeight - windowHeight;
      /** Maximum possible scroll */

      var scrollStart = scrollMax - windowHeight + scanner;
      /** Start linear move at this scroll position */

      var blockHeightDelta = blockHeight[blockHeight.length - 1] - scanner - scrollStart; //block position linear regression "from" length

      var scrollDelta = windowHeight - scanner; //scroll linear regression "to" length

      var scrollBreakpoints = [];
      scrollBreakpoints.push(0);

      for (var _i2 = 1; _i2 < elAs.length; _i2++) {
        if (blockHeight[_i2] > scrollStart) {
          var blockScanFromStart = blockHeight[_i2] - scrollStart - scanner;
          scrollBreakpoints[_i2] = scrollStart + blockScanFromStart / blockHeightDelta * scrollDelta;
        } else {
          scrollBreakpoints[_i2] = blockHeight[_i2] - scanner;
        }

        scrollBreakpoints[_i2] = Math.round(scrollBreakpoints[_i2]);
      }

      if (debugMode) {
        scannerLine1.style.top = scrollBreakpoints[scrollBreakpoints.length - 1] + 'px';
      }

      return scrollBreakpoints;
    };

    elNav.classList.add("scroll-spy-nav");

    for (var i = 0; i < elAs.length; i++) {
      elAs[i].addEventListener('click', external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollTo);
    }

    window.addEventListener('scroll', external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollSpyHandler);
    window.addEventListener('resize', external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.throttle(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollSpyHandler, 50));
  },
  unbind: function unbind(elNav) {
    elNav.classList.remove("scroll-spy-nav");
    window.removeEventListener('scroll');
    window.removeEventListener('resize');
    var elAs = elNav.querySelectorAll('a');

    for (var i = 0; i < elAs.length; i++) {
      elAs.removeEventListener('click');
    }
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/quasar/src/utils/sort.js
function sortString (a, b) {
  if (typeof a !== 'string') {
    throw new TypeError('The value for sorting must be a String')
  }
  return a.localeCompare(b)
}

function sortNumber (a, b) {
  return a - b
}

function sortDate (a, b) {
  return (new Date(a)) - (new Date(b))
}

function sortBoolean (a, b) {
  return a && !b
    ? -1
    : (!a && b ? 1 : 0)
}

// CONCATENATED MODULE: ./node_modules/quasar/src/utils/is.js
const
  hasMap = typeof Map === 'function',
  hasSet = typeof Set === 'function',
  hasArrayBuffer = typeof ArrayBuffer === 'function'

function isDeepEqual (a, b) {
  if (a === b) {
    return true
  }

  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) {
      return false
    }

    let length, i

    if (a.constructor === Array) {
      length = a.length

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (isDeepEqual(a[i], b[i]) !== true) {
          return false
        }
      }

      return true
    }

    if (hasMap === true && a.constructor === Map) {
      if (a.size !== b.size) {
        return false
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false
        }
        i = i.next()
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (isDeepEqual(i.value[1], b.get(i.value[0])) !== true) {
          return false
        }
        i = i.next()
      }

      return true
    }

    if (hasSet === true && a.constructor === Set) {
      if (a.size !== b.size) {
        return false
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false
        }
        i = i.next()
      }

      return true
    }

    if (hasArrayBuffer === true && a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) {
          return false
        }
      }

      return true
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags
    }

    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf()
    }

    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString()
    }

    const keys = Object.keys(a)
    length = keys.length

    if (length !== Object.keys(b).length) {
      return false
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i]
      if (isDeepEqual(a[key], b[key]) !== true) {
        return false
      }
    }

    return true
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b // eslint-disable-line no-self-compare
}

function isPrintableChar (v) {
  return (v > 47 && v < 58) || // number keys
    v === 32 || v === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
    (v > 64 && v < 91) || // letter keys
    (v > 95 && v < 112) || // numpad keys
    (v > 185 && v < 193) || // ;=,-./` (in order)
    (v > 218 && v < 223)
}

function isObject (v) {
  return Object(v) === v
}

function isDate (v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}

function isRegexp (v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

function isNumber (v) {
  return typeof v === 'number' && isFinite(v)
}

function isString (v) {
  return typeof v === 'string'
}

// CONCATENATED MODULE: ./src/methods.js






















/* harmony default export */ var methods = ({
  onAjaxError: function onAjaxError(response) {
    //Quasar Notif Schema
    var notif = {
      type: 'negative',
      message: 'Network Error.',
      icon: 'warning',
      timeout: 2500
    }; //Setup Error Message //if response was an error

    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      notif.message = response.message;
    } //Setup Generic Response Messages


    if (response.status === 401) {
      notif.message = 'UnAuthorized, you may login with an authorized account';
      this.$root.$emit('logout'); //Emit Logout Event
    } else if (response.status === 403) {
      notif.message = 'Forbidden, your havn&quote;t enought rights';
    } else if (response.status === 404) {
      notif.message = 'API Route is Missing or Undefined';
    } else if (response.status === 405) {
      notif.message = 'API Route Method Not Allowed';
    } else if (response.status === 422) {
      //Validation Message
      notif.message = '';
      Object.keys(response.body).forEach(function (key) {
        this.$data.uiMessageStack[key] = response.body[key];
      }.bind(this));
    } else if (response.status >= 500) {
      notif.message = 'Server Error';
    }

    if (response.statusText) {
      notif.message = response.statusText;
    } //Try to Use the Response Message


    if (Object.prototype.hasOwnProperty.call(response, 'data')) {
      if (Object.prototype.hasOwnProperty.call(response.data, 'message') && response.data.message && response.data.message.length > 0) {
        notif.message = response.data.message;
      } else if (Object.prototype.hasOwnProperty.call(response.data, 'globalErrors') && response.data.globalErrors && response.data.globalErrors.length > 0) {
        notif.message = response.data.globalErrors.join('<br/>\n ');
      }
    } //Send the notif


    if (notif.message.length > 0) {
      this.$q.notify(notif);
    }
  },
  getSafeValue: function getSafeValue(objectkey, fieldKey, subFieldKey) {
    if (this.$data.vueData[objectkey] && this.$data.vueData[objectkey][fieldKey]) {
      return this.$data.vueData[objectkey][fieldKey][subFieldKey];
    }

    return null;
  },
  transformListForSelection: function transformListForSelection(list, valueField, labelField) {
    return this.$data.vueData[list].map(function (object) {
      return {
        value: object[valueField],
        label: object[labelField].toString()
      }; // a label is always a string
    });
  },
  paginationAndSortHandler: function paginationAndSortHandler(params) {
    var pagination = params.pagination;
    var componentStates = this.$data.componentStates;
    var vueData = this.$data.vueData;
    var oldPagination = componentStates[pagination.componentId].pagination;

    if (oldPagination.sortBy != pagination.sortBy || oldPagination.descending != pagination.descending) {
      if (pagination.sortBy) {
        // it's a sort
        if (pagination.sortUrl) {
          //order call the server
          pagination.page = 1; //reset pagination

          this.$http.post(pagination.sortUrl, {
            sortFieldName: pagination.sortBy,
            sortDesc: pagination.descending,
            CTX: this.$data.vueData.CTX
          }, {
            emulateJSON: true
          }).then(function (response) {
            vueData[pagination.listKey] = response.body.model[pagination.listKey];
            this.$data.vueData.CTX = response.body.model['CTX'];
          });
        } else {
          //do locally
          this.$refs[pagination.componentId].sortMethod.apply(this.$refs[pagination.componentId], [vueData[pagination.listKey], pagination.sortBy, pagination.descending]);
        }
      } // if we reset the sort we do nothing

    } // otherwise it's pagination or filter : do it locally
    // nothing to do everything is done by the paginatedData function


    componentStates[pagination.componentId].pagination = pagination;
  },
  paginatedData: function paginatedData(list, componentId) {
    var componentStates = this.$data.componentStates;
    var pagination = componentStates[componentId].pagination;

    if (pagination.rowsPerPage != 0) {
      // not all
      var firstRowIndex = (pagination.page - 1) * pagination.rowsPerPage;
      var lastRowIndex = pagination.page * pagination.rowsPerPage;
      return this.$data.vueData[list].slice(firstRowIndex, lastRowIndex);
    }

    return this.$data.vueData[list];
  },
  sortCiAi: function sortCiAi(data, sortBy, descending) {
    var col = this.colList.find(function (def) {
      return def.name === sortBy;
    });

    if (col === void 0 || col.field === void 0) {
      return data;
    }

    var dir = descending === true ? -1 : 1,
        val = typeof col.field === 'function' ? function (v) {
      return col.field(v);
    } : function (v) {
      return v[col.field];
    };
    var collator = new Intl.Collator();
    return data.sort(function (a, b) {
      var A = val(a),
          B = val(b);

      if (A === null || A === void 0) {
        return -1 * dir;
      }

      if (B === null || B === void 0) {
        return 1 * dir;
      }

      if (col.sort !== void 0) {
        return col.sort(A, B, a, b) * dir;
      }

      if (isNumber(A) === true && isNumber(B) === true) {
        return (A - B) * dir;
      }

      if (isDate(A) === true && isDate(B) === true) {
        return sortDate(A, B) * dir;
      }

      if (typeof A === 'boolean' && typeof B === 'boolean') {
        return (A - B) * dir;
      }

      var _map = [A, B].map(function (s) {
        return (s + '').toLocaleString();
      });

      var _map2 = _slicedToArray(_map, 2);

      A = _map2[0];
      B = _map2[1];
      return collator.compare(A, B) * dir;
    });
  },
  selectedFunction: function selectedFunction(object, field, item)
  /*keyboard*/
  {
    this.$data.vueData[object][field] = item.value;
  },
  searchAutocomplete: function searchAutocomplete(list, valueField, labelField, componentId, url, terms, update, abort) {
    if (terms.length < 2) {
      abort();
      return;
    }

    this.$http.post(url, {
      terms: terms,
      list: list,
      valueField: valueField,
      labelField: labelField,
      CTX: this.$data.vueData.CTX
    }, {
      emulateJSON: true
    }).then(function (response) {
      var finalList = response.body.map(function (object) {
        return {
          value: object[valueField],
          label: object[labelField].toString()
        }; // a label is always a string
      });
      update(function () {
        this.$data.componentStates[componentId].options = finalList;
      }.bind(this));
    }, function (response) {
      this.$q.notify(response.status + ":" + response.statusText);
      update([]);
    });
  },
  decodeDate: function decodeDate(object, field, format) {
    var value = this.$data.vueData[object][field];

    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY'), 'DD/MM/YYYY')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY'), format);
    } else {
      return value;
    }
  },
  encodeDate: function encodeDate(object, field, newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), format)) {
      this.$data.vueData[object][field] = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), 'DD/MM/YYYY');
    } else {
      this.$data.vueData[object][field] = newValue;
    }
  },
  decodeDatetime: function decodeDatetime(object, field, format) {
    var value = this.$data.vueData[object][field];

    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), format);
    } else {
      return value;
    }
  },
  encodeDatetime: function encodeDatetime(object, field, newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), format)) {
      this.$data.vueData[object][field] = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), 'DD/MM/YYYY HH:mm');
    } else {
      this.$data.vueData[object][field] = newValue;
    }
  },
  sortDatesAsString: function sortDatesAsString(format) {
    return function (date1, date2) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(date1, format).getTime() > external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(date2, format).getTime() ? 1 : -1;
    };
  },
  goTo: function goTo(url) {
    window.location = url;
  },
  openModal: function openModal(modalId, url, params) {
    if (url) {
      var finalUrl = url;

      if (params && Object.keys(params).length > 0) {
        var paramsString = Object.keys(params).map(function (key) {
          return key + '=' + params[key];
        }).join("&");
        finalUrl = finalUrl + '?' + paramsString;
      }

      this.$data.componentStates[modalId].srcUrl = finalUrl;
    }

    this.$data.componentStates[modalId].opened = true;
  },
  toogleFacet: function toogleFacet(facetCode, facetValueCode, contextKey) {
    var vueData = this.$data.vueData;
    var multiple = false;
    vueData[contextKey + "_facets"].forEach(function (facet) {
      if (facet.code === facetCode) {
        // get the right facet 
        multiple = facet.multiple;
      }
    });
    var selectedFacetValues = vueData[contextKey + "_selectedFacets"][facetCode];

    if (selectedFacetValues) {
      if (selectedFacetValues.includes(facetValueCode)) {
        if (multiple) {
          selectedFacetValues.splice(selectedFacetValues.indexOf(facetValueCode), 1);
        } else {
          selectedFacetValues.splice(0);
        }
      } else {
        selectedFacetValues.push(facetValueCode);
      }
    } else {
      vueData[contextKey + "_selectedFacets"][facetCode] = [facetValueCode];
    }

    this.search(contextKey);
  },
  search: external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(function (contextKey) {
    var componentStates = this.$data.componentStates;
    var vueData = this.$data.vueData;
    var selectedFacetsContextKey = contextKey + "_selectedFacets";
    var criteriaContextKey = vueData[contextKey + '_criteriaContextKey'];
    var params = this.vueDataParams([criteriaContextKey]);
    params['selectedFacets'] = JSON.stringify(vueData[selectedFacetsContextKey]);
    var searchUrl = componentStates[contextKey + 'Search'].searchUrl;
    var collectionComponentId = componentStates[contextKey + 'Search'].collectionComponentId;

    if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
      var collectionPagination = componentStates[collectionComponentId].pagination;
      params['sortFieldName'] = collectionPagination.sortBy;
      params['sortDesc'] = collectionPagination.descending;
    }

    this.httpPostAjax(searchUrl, params, {
      onSuccess: function onSuccess(response) {
        if (componentStates[collectionComponentId].pagination) {
          var collectionPagination = componentStates[collectionComponentId].pagination;
          collectionPagination.page = 1; // reset page

          collectionPagination.rowsNumber = response.body.model[contextKey + '_list'].length;
        }
      }
    });
  }, 400),
  showMore: function showMore(componentId) {
    var componentStates = this.$data.componentStates;
    var showMoreCount = componentStates[componentId].pagination.showMoreCount;

    if (showMoreCount) {// nothing to do
    } else {
      showMoreCount = 1;
      componentStates[componentId].pagination.showMoreCount = showMoreCount;
    }

    componentStates[componentId].pagination.rowsPerPage = componentStates[componentId].pagination.rowsPerPage / showMoreCount * (showMoreCount + 1);
  },
  uploader_addedFile: function uploader_addedFile(isMultiple, componentId) {
    var componentStates = this.$data.componentStates;

    if (!isMultiple) {
      this.$refs[componentId].removeUploadedFiles();
      componentStates[componentId].fileUris = [];
    }
  },
  uploader_uploadedFiles: function uploader_uploadedFiles(uploadInfo, componentId) {
    var componentStates = this.$data.componentStates;
    uploadInfo.files.forEach(function (file) {
      componentStates[componentId].fileUris.push(file.xhr.response);
      file.fileUri = file.xhr.response;
    });
  },
  uploader_removeFiles: function uploader_removeFiles(removedFiles, componentId) {
    var componentStates = this.$data.componentStates;
    removedFiles.forEach(function (removedFile) {
      var component = this.$refs[componentId];
      var componentFileUris = componentStates[componentId].fileUris;
      var indexOfFileUri = componentFileUris.indexOf(removedFile.fileUri);
      var xhrParams = {};
      xhrParams[component.fieldName] = removedFile.fileUri;
      this.$http.delete(component.url, {
        params: xhrParams,
        credentials: component.withCredentials
      }).then(function ()
      /*response*/
      {
        //Ok
        if (component.multiple) {
          componentFileUris.splice(indexOfFileUri, 1);
        } else {
          componentFileUris.splice(0);
        }
      }, function (response) {
        //Ko
        this.$q.notify(response.status + ":" + response.statusText + " Can't remove temporary file");
      });
    }.bind(this));
  },
  httpPostAjax: function httpPostAjax(url, params, options) {
    var vueData = this.$data.vueData;
    var uiMessageStack = this.$data.uiMessageStack;
    params['CTX'] = vueData.CTX;
    this.$http.post(url, params, {
      emulateJSON: true
    }).then(function (response) {
      if (response.body.model.CTX) {
        vueData.CTX = response.body.model.CTX;
      }

      Object.keys(response.body.model).forEach(function (key) {
        if ('CTX' != key) {
          vueData[key] = response.body.model[key];
        }
      });
      Object.keys(response.body.uiMessageStack).forEach(function (key) {
        uiMessageStack[key] = response.body.uiMessageStack[key];
      });

      if (options && options.onSuccess) {
        options.onSuccess.bind(this).apply(response);
      }
    }.bind(this)).catch(function (response) {
      if (options && options.onError) {
        options.onError.bind(this).apply(response);
      }
    });
  },
  hasFieldsError: function hasFieldsError(object, field) {
    var fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
    return fieldsErrors && Object.prototype.hasOwnProperty.call(fieldsErrors, object) && fieldsErrors[object] && Object.prototype.hasOwnProperty.call(fieldsErrors[object], field) && fieldsErrors[object][field].length > 0;
  },
  getErrorMessage: function getErrorMessage(object, field) {
    var fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;

    if (fieldsErrors && Object.prototype.hasOwnProperty.call(fieldsErrors, object) && fieldsErrors[object] && Object.prototype.hasOwnProperty.call(fieldsErrors[object], field)) {
      return fieldsErrors[object][field].toString();
    } else {
      return '';
    }
  },
  vueDataParams: function vueDataParams(keys) {
    var params = {};

    for (var i = 0; i < keys.length; i++) {
      var contextKey = keys[i];
      var vueDataValue = this.$data.vueData[contextKey];

      if (vueDataValue && _typeof(vueDataValue) === 'object' && Array.isArray(vueDataValue) === false) {
        // object
        Object.keys(vueDataValue).forEach(function (propertyKey) {
          if (!propertyKey.startsWith("_")) {
            // _ properties are private and don't belong to the serialized entity
            if (Array.isArray(vueDataValue[propertyKey])) {
              vueDataValue[propertyKey].forEach(function (value, index) {
                if (vueDataValue[propertyKey][index] && _typeof(vueDataValue[propertyKey][index]) === 'object') {
                  params['vContext[' + contextKey + '][' + propertyKey + '][' + index + ']'] = vueDataValue[propertyKey][index]['_v_inputValue'];
                } else {
                  params['vContext[' + contextKey + '][' + propertyKey + '][' + index + ']'] = vueDataValue[propertyKey][index];
                }
              });
            } else {
              if (vueDataValue[propertyKey] && _typeof(vueDataValue[propertyKey]) === 'object') {
                params['vContext[' + contextKey + '][' + propertyKey + ']'] = vueDataValue[propertyKey]['_v_inputValue'];
              } else {
                params['vContext[' + contextKey + '][' + propertyKey + ']'] = vueDataValue[propertyKey];
              }
            }
          }
        });
      } else {
        //primitive
        params['vContext[' + contextKey + ']'] = vueDataValue;
      }
    }

    return params;
  }
});
// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-en-us.js
/* harmony default export */ var vertigo_ui_lang_en_us = ({
  "comments": {
    "title": "Comments",
    "inputLabel": "Insert here a comment",
    "actionlabel": "Publish",
    "cancel": "Cancel",
    "save": "Save"
  },
  "chatbot": {
    "errorMessage": "An error occured sending the message",
    "tryAgain": "Try again",
    "suggestedAnswers": "Suggested answers",
    "inputPlaceHolder": "Enter here a message",
    "restartMessage": "Conversation is restarting"
  },
  "facets": {
    "showAll": "Show all",
    "showLess": "Show less"
  },
  "notifications": {
    "days": "days",
    "hours": "hours",
    "minutes": "min",
    "seconds": "s"
  },
  "commands": {
    "globalPlaceholder": "Type / to show all available commands",
    "executeCommand": "Press Enter to execute command",
    "linkLabel": "Show details"
  },
  "handles": {
    "placeholder": "Enter a handle : format is type/code"
  }
});
// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-fr.js
/* harmony default export */ var vertigo_ui_lang_fr = ({
  "comments": {
    "title": "Commentaires",
    "inputLabel": "Insérer un commentaire ici",
    "actionlabel": "Publier",
    "cancel": "Annuler",
    "save": "Sauver"
  },
  "chatbot": {
    "errorMessage": "Une erreur est survenue lors de l'envoi du message",
    "tryAgain": "Essayez de nouveau",
    "suggestedAnswers": "Réponses suggérées",
    "inputPlaceHolder": "Ecrire un message",
    "restartMessage": "Redémarrage de la conversation"
  },
  "facets": {
    "showAll": "Voir plus",
    "showLess": "Voir moins"
  },
  "notifications": {
    "days": "jours",
    "hours": "heures",
    "minutes": "min",
    "seconds": "s"
  },
  "commands": {
    "globalPlaceholder": "Taper / pour afficher les commandes disponibles",
    "executeCommand": "Appuyer sur entrée pour executer la commande",
    "linkLabel": "Voir les détails"
  },
  "handles": {
    "placeholder": "Entrer un handle de la forme type/code"
  }
});
// CONCATENATED MODULE: ./src/main.js




















function getBoundMethods(obj, methods) {
  var boundMethods = {};
  Object.keys(methods).forEach(function (methodName) {
    return boundMethods[methodName] = methods[methodName].bind(obj);
  });
  return boundMethods;
}
function install(Vue)
/*options*/
{
  // components
  Vue.component("v-chatbot", VChatbot);
  Vue.component("v-commands", VCommands);
  Vue.component("v-comments", VComments);
  Vue.component("v-extensions-store", VExtensionsStore);
  Vue.component("v-facets", VFacets);
  Vue.component("v-geopoint-input", VGeopointInput);
  Vue.component("v-handles", VHandles);
  Vue.component("v-json-editor", VJsonEditor);
  Vue.component("v-notifications", VNotifications);
  Vue.component("v-map", VMap);
  Vue.component("v-map-layer", VMapLayer); // directives

  Vue.directive("minify", VMinify);
  Vue.directive("scroll-spy", VScrollSpy);
  Vue.http.interceptors.push(function ()
  /*request*/
  {
    return function (response) {
      if (!response.ok) {
        methods.onAjaxError.bind(this)(response);
      }
    };
  });

  if (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.enUs) {
    external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.enUs.vui = vertigo_ui_lang_en_us;
  }

  if (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.fr) {
    external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.fr.vui = vertigo_ui_lang_fr;
  }
}
var main_methods = methods;
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fea9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ })

/******/ });
});
//# sourceMappingURL=vertigo-ui.common.js.map