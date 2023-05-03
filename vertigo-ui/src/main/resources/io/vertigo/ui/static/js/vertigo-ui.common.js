(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ol"), require("quasar"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([, , ], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("ol"), require("quasar"), require("vue")) : factory(root["ol"], root["Quasar"], root["Vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__5015__, __WEBPACK_EXTERNAL_MODULE__728__, __WEBPACK_EXTERNAL_MODULE__7203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 3658:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var isArray = __webpack_require__(3157);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 4154:
/***/ (function(module) {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7207:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 8113:
/***/ (function(module) {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

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

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);
var isNullOrUndefined = __webpack_require__(8554);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(4811);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
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

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
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

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 614:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
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

/***/ 8554:
/***/ (function(module) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNullOrUndefined = __webpack_require__(8554);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.29.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.29.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(6293);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 4811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(6293);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7658:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var setArrayLength = __webpack_require__(3658);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var fails = __webpack_require__(7293);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 5015:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__5015__;

/***/ }),

/***/ 728:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__728__;

/***/ }),

/***/ 7203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "getBoundMethods": function() { return /* reexport */ getBoundMethods; },
  "initData": function() { return /* reexport */ initData; },
  "install": function() { return /* reexport */ install; },
  "methods": function() { return /* reexport */ main_methods; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"quasar","commonjs2":"quasar","root":"Quasar"}
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_ = __webpack_require__(728);
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_quasar_commonjs2_quasar_root_Quasar_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VChatbot.vue?vue&type=template&id=26be0710&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "bot"
  }, [_c('q-scroll-area', {
    ref: "scroller",
    staticClass: "bg-grey-2 col-grow row q-pa-sm"
  }, [_c('div', {
    staticClass: "q-pr-md"
  }, [_vm._l(_vm.messages, function (msg, index) {
    return _c('div', {
      key: index
    }, [msg.rating ? _c('q-chat-message', {
      key: 'msgRating-' + index,
      staticClass: "animate-fade",
      attrs: {
        "sent": msg.sent,
        "bg-color": msg.bgColor,
        "avatar": msg.avatar
      }
    }, [_c('q-rating', {
      staticStyle: {
        "font-size": "2rem"
      },
      attrs: {
        "max": 5,
        "readonly": ""
      },
      model: {
        value: msg.rating,
        callback: function ($$v) {
          _vm.$set(msg, "rating", $$v);
        },
        expression: "msg.rating"
      }
    })], 1) : _vm._e(), msg.text ? _c('q-chat-message', {
      key: 'msg-' + index,
      staticClass: "animate-fade",
      attrs: {
        "label": msg.label,
        "sent": msg.sent,
        "text-color": msg.textColor,
        "bg-color": msg.bgColor,
        "name": msg.name,
        "avatar": msg.avatar,
        "text": msg.text,
        "stamp": msg.stamp
      }
    }) : _vm._e()], 1);
  }), _c('div', {
    staticClass: "sys-chat"
  }, [_vm.error ? _c('q-chat-message', {
    staticClass: "animate-fade",
    attrs: {
      "bg-color": "orange-4",
      "text-color": "black",
      "size": "12"
    }
  }, [_c('div', {
    staticClass: "q-pb-sm"
  }, [_vm._v(" " + _vm._s(_vm.$q.lang.vui.chatbot.errorMessage) + " ")]), _c('q-btn', {
    staticClass: "full-width",
    attrs: {
      "label": _vm.$q.lang.vui.chatbot.tryAgain,
      "color": "white",
      "text-color": "black"
    },
    on: {
      "click": function ($event) {
        return _vm.askBot(_vm.lastPayload);
      }
    }
  })], 1) : _vm._e()], 1), _c('div', {
    staticClass: "sys-chat non-selectable"
  }, [_vm.inputConfig.buttons.length > 0 ? _c('q-chat-message', {
    staticClass: "animate-fade",
    attrs: {
      "bg-color": "primary",
      "size": "12"
    }
  }, [_c('div', {
    staticClass: "text-blue-2 q-caption"
  }, [_vm._v(" " + _vm._s(_vm.$q.lang.vui.suggestedAnswers) + " ")]), _c('div', {
    staticClass: "row docs-btn"
  }, _vm._l(_vm.inputConfig.buttons, function (btn, index) {
    return _c('q-btn', {
      key: 'repChatBtn-' + index,
      staticClass: "full-width",
      attrs: {
        "label": btn.title,
        "color": "white",
        "text-color": "black"
      },
      on: {
        "click": function ($event) {
          return _vm.postAnswerBtn(btn);
        }
      }
    });
  }), 1)]) : _vm._e()], 1), _c('div', {
    staticClass: "message-processing sys-chat non-selectable"
  }, [_vm.processing ? _c('q-chat-message', {
    staticClass: "animate-fade",
    attrs: {
      "bg-color": "grey-4"
    }
  }, [_c('q-spinner-dots', {
    attrs: {
      "size": "2em"
    }
  })], 1) : _vm._e()], 1), _c('div', {
    staticClass: "non-selectable"
  }, [_vm.inputConfig.showRating ? _c('q-chat-message', {
    staticClass: "animate-fade",
    attrs: {
      "bg-color": "primary",
      "sent": ""
    }
  }, [_c('q-rating', {
    staticStyle: {
      "font-size": "2rem"
    },
    attrs: {
      "max": 4
    },
    model: {
      value: _vm.rating,
      callback: function ($$v) {
        _vm.rating = $$v;
      },
      expression: "rating"
    }
  })], 1) : _vm._e()], 1)], 2)]), _c('div', {
    staticClass: "message-response row docs-btn q-pl-sm non-selectable"
  }, [_c('q-input', {
    ref: "input",
    staticClass: "col-grow",
    attrs: {
      "type": _vm.inputConfig.modeTextarea ? 'textarea' : 'text',
      "max-height": 100,
      "placeholder": _vm.$q.lang.vui.chatbot.inputPlaceholder,
      "disable": _vm.processing || _vm.error,
      "loading": _vm.processing
    },
    on: {
      "keyup": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        _vm.inputConfig.modeTextarea ? false : _vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0 ? false : _vm.postAnswerText();
      }
    },
    model: {
      value: _vm.inputConfig.responseText,
      callback: function ($$v) {
        _vm.$set(_vm.inputConfig, "responseText", $$v);
      },
      expression: "inputConfig.responseText"
    }
  }), _c('q-btn', {
    attrs: {
      "round": "",
      "color": "primary",
      "icon": "send",
      "disable": _vm.processing || _vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0
    },
    on: {
      "click": function ($event) {
        return _vm.postAnswerText();
      }
    }
  }), _vm.devMode === true ? _c('q-btn', {
    attrs: {
      "round": "",
      "color": "red",
      "icon": "refresh"
    },
    on: {
      "click": _vm.restart
    }
  }) : _vm._e()], 1)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VChatbot.vue?vue&type=script&lang=js&

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
  data: function () {
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
  created: function () {
    this.askBot('/start'); // lancement de la phrase d'accueil
    this.convId = Math.random();
  },
  methods: {
    postAnswerBtn: function (btn) {
      this.messages.push({
        text: [btn.title],
        sent: true,
        bgColor: "primary",
        textColor: "white"
      });
      this._scrollToBottom();
      this.askBot(btn.payload);
    },
    postAnswerText: function () {
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
    _scrollToBottom: function () {
      if (this.$refs.scroller) {
        this.$refs.scroller.setScrollPosition(this.$refs.scroller.scrollHeight, 400);
      }
    },
    askBot: function (value) {
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
        httpResponse.data.forEach(function (value) {
          this.watingMessagesStack.push(value);
        }, this);
        this._displayMessages();
      }.bind(this)).catch(function () {
        // error
        this.error = true;
        this.processing = false;
        this._scrollToBottom();
      }.bind(this));
    },
    _displayMessages: function () {
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
    _processResponse: function (response) {
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
    restart: function () {
      this.messages.push({
        text: [this.$q.lang.vui.chatbot.restartMessage],
        bgColor: "orange"
      });
      this._scrollToBottom();
      this.$http.post(this.botUrl, '{"sender":"' + this.convId + '","message":"/restart"}').then(function () {
        this.askBot("/start"); // lancement de la phrase d'accueil
      }.bind(this));
    },
    reinitInput: function () {
      this.inputConfig.modeTextarea = false;
      this.inputConfig.responsePattern = "";
      this.inputConfig.responseText = "";
      this.inputConfig.showRating = false;
      this.inputConfig.rating = 0;
      this.inputConfig.buttons = [];
      this.error = false;
    },
    sleep: function (milliseconds) {
      return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VChatbot.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VChatbotvue_type_script_lang_js_ = (VChatbotvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

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
  if (moduleIdentifier) {
    // server build
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
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/VChatbot.vue





/* normalize component */
;
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
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VCommands.vue?vue&type=template&id=8b078d18&
var VCommandsvue_type_template_id_8b078d18_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [!_vm.isCommandCommited ? _c('q-select', {
    ref: "commandInput",
    attrs: {
      "placeholder": _vm.$q.lang.vui.commands.globalPlaceholder,
      "outlined": "",
      "bg-color": "white",
      "dense": "",
      "autofocus": "",
      "dropdown-icon": "search",
      "use-input": "",
      "input-debounce": "300",
      "hide-selected": "",
      "options": _vm.commandAutocompleteOptions
    },
    on: {
      "blur": _vm.reset,
      "filter": _vm.searchCommands,
      "input": _vm.selectCommand
    },
    nativeOn: {
      "keydown": function ($event) {
        return _vm.commitCommand.apply(null, arguments);
      }
    }
  }, [_vm.text !== '' && _vm.selectedCommand.commandName && _vm.selectedCommand.commandName.startsWith(_vm.text) ? _c('span', {
    staticStyle: {
      "line-height": "40px",
      "opacity": "0.5",
      "position": "fixed"
    }
  }, [_vm._v(_vm._s(_vm.selectedCommand.commandName))]) : _vm._e()]) : _c('div', {
    staticClass: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
    nativeOn: {
      "keyup": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.executeCommand.apply(null, arguments);
      }
    }
  }, [_c('div', {
    staticClass: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
    staticStyle: {
      "line-height": "40px"
    }
  }, [_vm._v(_vm._s(_vm.selectedCommand.commandName))]), !_vm.isExecuted ? _c('div', {
    staticClass: "row col items-center q-py-xs"
  }, [_vm.selectedCommand.commandParams && _vm.selectedCommand.commandParams.length > 0 ? [_vm._l(_vm.selectedCommand.commandParams, function (param, index) {
    return [param.paramType.rawType === 'io.vertigo.commons.command.GenericUID' ? [_c('q-select', {
      key: param,
      staticClass: "col q-px-xs",
      staticStyle: {
        "height": "32px"
      },
      attrs: {
        "use-chips": "",
        "bg-color": "white",
        "dense": "",
        "borderless": "",
        "use-input": "",
        "input-debounce": "300",
        "value": _vm.getParamValue(index),
        "options": _vm.paramsAutocompleteOptions[index],
        "autofocus": index === 0,
        "dropdown-icon": "search"
      },
      on: {
        "filter": function (val, update, abort) {
          _vm.autocompleteParam(param, index, val, update, abort);
        },
        "input": function (newValue) {
          _vm.selectParam(newValue, index);
        }
      },
      nativeOn: {
        "keydown": function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) return null;
          return function (event) {
            _vm.backIfNeeded(event, index === 0);
          }.apply(null, arguments);
        },
        "keyup": function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) return null;
          return function (event) {
            _vm.backIfNeeded(event, index === 0);
          }.apply(null, arguments);
        }
      }
    })] : [_c('q-input', {
      key: param,
      staticClass: "col q-px-xs",
      staticStyle: {
        "height": "32px"
      },
      attrs: {
        "color": "secondary",
        "borderless": "",
        "autofocus": index === 0,
        "dense": ""
      },
      on: {
        "keydown": function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) return null;
          return function (event) {
            _vm.backIfNeeded(event, index === 0);
          }.apply(null, arguments);
        },
        "keyup": [function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) return null;
          return function (event) {
            _vm.backIfNeeded(event, index === 0);
          }.apply(null, arguments);
        }, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
          return _vm.handleEnter(index);
        }]
      },
      model: {
        value: _vm.commandParamsValues[index].value,
        callback: function ($$v) {
          _vm.$set(_vm.commandParamsValues[index], "value", $$v);
        },
        expression: "commandParamsValues[index].value"
      }
    })], _c('q-separator', {
      key: param,
      attrs: {
        "vertical": ""
      }
    })];
  })] : _c('div', {
    staticClass: "col"
  }, [_vm._v(_vm._s(_vm.$q.lang.vui.commands.executeCommand))]), _c('q-btn', {
    attrs: {
      "flat": "",
      "icon": "play_arrow",
      "size": "sm",
      "round": ""
    },
    on: {
      "click": _vm.executeCommand
    }
  })], 2) : _c('div', {
    staticClass: "row col items-center"
  }, [_c('div', {
    staticClass: "col shadow-2 bg-secondary text-white q-px-md",
    staticStyle: {
      "line-height": "40px"
    }
  }, [_vm._v(_vm._s(_vm.commandResult.display))]), _vm.commandResult.targetUrl ? _c('q-btn', {
    attrs: {
      "type": "a",
      "href": _vm.baseUrl + _vm.commandResult.targetUrl,
      "flat": ""
    }
  }, [_vm._v(_vm._s(_vm.$q.lang.vui.commands.linkLabel))]) : _vm._e(), _c('q-btn', {
    attrs: {
      "flat": "",
      "icon": "cancel",
      "size": "sm",
      "round": ""
    },
    on: {
      "click": _vm.reset
    }
  })], 1)])], 1);
};
var VCommandsvue_type_template_id_8b078d18_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VCommands.vue?vue&type=script&lang=js&
/* harmony default export */ var VCommandsvue_type_script_lang_js_ = ({
  data: function () {
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
    searchCommands: function (val, update, abort) {
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
        this.$data.commands = response.data;
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
      }.bind(this));
    },
    selectCommand: function (selection) {
      this.chooseCommand(selection.command, true);
    },
    chooseCommand: function (command, commitCommand) {
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
    commitCommand: function (keyEvent) {
      if (this.$data.selectedCommand && this.$data.selectedCommand.commandName) {
        switch (keyEvent.keyCode) {
          case 9:
          case 13:
            this.$data.isCommandCommited = true;
            keyEvent.preventDefault();
        }
      }
    },
    executeCommand: function () {
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
          this.$data.commandResult = response.data;
        }.bind(this));
      } else {
        return false;
      }
    },
    handleEnter: function (index) {
      if (index === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[index].value) {
        this.executeCommand();
      }
      // otherwise nothing particular
    },

    autocompleteParam: function (param, index, val, update, abort) {
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
          newOptions[index] = response.data.map(function (element) {
            return {
              label: element.label,
              value: element.urn
            };
          });
          this.$data.paramsAutocompleteOptions = newOptions;
        }.bind(this));
      }.bind(this));
    },
    selectParam: function (selection, index) {
      var newParams = this.$data.commandParamsValues.slice();
      newParams[index] = selection;
      this.$data.commandParamsValues = newParams;
    },
    getParamValue(index) {
      var actualValue = this.$data.commandParamsValues[index];
      if (actualValue && actualValue.value) {
        return actualValue;
      }
    },
    backIfNeeded: function (index, isFirst) {
      if (isFirst && !this.$data.commandParamsValues[0].value) {
        this.back();
      }
      // otherwise nothing particular
    },

    back: function () {
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
    reset: function () {
      this.back();
      this.$data.text = "";
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VCommands.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VCommandsvue_type_script_lang_js_ = (VCommandsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VCommands.vue





/* normalize component */
;
var VCommands_component = normalizeComponent(
  components_VCommandsvue_type_script_lang_js_,
  VCommandsvue_type_template_id_8b078d18_render,
  VCommandsvue_type_template_id_8b078d18_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VCommands = (VCommands_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VComments.vue?vue&type=template&id=57976546&
var VCommentsvue_type_template_id_57976546_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', [_c('q-btn', {
    staticClass: "on-left",
    attrs: {
      "round": "",
      "size": "lg",
      "color": "primary",
      "textColor": "white",
      "icon": _vm.count > 0 ? _vm.icon : _vm.iconNone
    },
    on: {
      "click": function ($event) {
        _vm.commentDrawer = !_vm.commentDrawer;
      }
    }
  }, [_vm.count > 0 ? _c('q-badge', {
    staticStyle: {
      "right": "-.4em",
      "top": "-.4em"
    },
    attrs: {
      "floating": "",
      "small": "",
      "color": "red"
    }
  }, [_vm._v(_vm._s(_vm.count))]) : _vm._e()], 1), _c('q-drawer', {
    staticStyle: {
      "top": "58px"
    },
    attrs: {
      "overlay": "",
      "behavior": "mobile",
      "width": 600,
      "side": "right"
    },
    model: {
      value: _vm.commentDrawer,
      callback: function ($$v) {
        _vm.commentDrawer = $$v;
      },
      expression: "commentDrawer"
    }
  }, [_c('q-list', [_c('q-item-label', {
    attrs: {
      "header": ""
    }
  }, [_c('big', [_vm._v(_vm._s(_vm.$q.lang.vui.comments.title))])], 1), _c('q-item', [_c('q-item-section', [_c('q-input', {
    staticClass: "col",
    attrs: {
      "type": "textarea",
      "autogrow": "",
      "label": _vm.$q.lang.vui.comments.inputLabel,
      "stack-label": ""
    },
    model: {
      value: _vm.commentTextArea,
      callback: function ($$v) {
        _vm.commentTextArea = $$v;
      },
      expression: "commentTextArea"
    }
  })], 1), _c('q-item-section', {
    attrs: {
      "side": ""
    }
  }, [_c('q-btn', {
    attrs: {
      "color": "primary",
      "round": "",
      "icon": "send",
      "title": _vm.$q.lang.vui.comments.actionLabel,
      "aria-label": _vm.$q.lang.vui.comments.actionLabel
    },
    on: {
      "click": _vm.publishComment
    }
  })], 1)], 1), _c('q-separator'), _vm._l(_vm.list, function (comment) {
    return _c('q-item', {
      key: comment.uuid,
      staticClass: "items-start",
      class: {
        'cursor-pointer': comment.author == _vm.connectedAccount
      }
    }, [_c('q-item-section', {
      attrs: {
        "avatar": ""
      }
    }, [_c('q-avatar', [_c('img', {
      attrs: {
        "src": _vm.baseUrl + 'x/accounts/api/' + comment.author + '/photo'
      }
    })])], 1), _c('q-item-section', [_c('q-item-label', [_vm._v(_vm._s(comment.authorDisplayName))]), _c('div', [_vm._v(" " + _vm._s(comment.msg) + " ")])], 1), _c('q-item-section', {
      attrs: {
        "side": ""
      }
    }, [_c('q-item-label', {
      attrs: {
        "stamp": ""
      }
    }, [_vm._v(_vm._s(_vm.toDelay(new Date(comment.creationDate))))]), comment.author == _vm.connectedAccount ? _c('q-icon', {
      attrs: {
        "name": "edit"
      }
    }) : _vm._e()], 1), comment.author == _vm.connectedAccount ? _c('q-popup-edit', {
      attrs: {
        "buttons": true,
        "label-cancel": _vm.$q.lang.vui.comments.cancel,
        "label-set": _vm.$q.lang.vui.comments.save
      },
      on: {
        "save": function ($event) {
          return _vm.updateComment(comment);
        }
      }
    }, [_c('q-input', {
      attrs: {
        "type": "textarea",
        "autogrow": "",
        "dense": ""
      },
      model: {
        value: comment.msg,
        callback: function ($$v) {
          _vm.$set(comment, "msg", $$v);
        },
        expression: "comment.msg"
      }
    })], 1) : _vm._e()], 1);
  })], 2)], 1)], 1);
};
var VCommentsvue_type_template_id_57976546_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VComments.vue?vue&type=script&lang=js&

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
  data: function () {
    return {
      list: [],
      count: 0,
      commentDrawer: false,
      commentTextArea: ""
    };
  },
  created: function () {
    this.fetchCommentsList();
  },
  methods: {
    fetchCommentsList: function () {
      this.$http.get(this.baseUrl + 'x/comment/api/comments?concept=' + this.concept + '&id=' + this.id).then(function (response) {
        //Ok
        this.list = response.data;
        this.count = this.list.length;
      }.bind(this));
    },
    publishComment: function () {
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
        }.bind(this));
      }
    },
    updateComment: function (newComment) {
      this.$http.put(this.baseUrl + 'x/comment/api/comments/' + newComment.uuid, newComment).then(function () {
        //Ok
        this.commentTextArea = '';
        this.fetchCommentsList();
      }.bind(this));
    },
    toDelay: function (creationDate) {
      let diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'days');
      if (diff > 0) return diff + ' days';
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'hours');
      if (diff > 0) return diff + ' hours';
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'minutes');
      if (diff > 0) return diff + ' min';
      return 'Now';
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VComments.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VCommentsvue_type_script_lang_js_ = (VCommentsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VComments.vue





/* normalize component */
;
var VComments_component = normalizeComponent(
  components_VCommentsvue_type_script_lang_js_,
  VCommentsvue_type_template_id_57976546_render,
  VCommentsvue_type_template_id_57976546_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VComments = (VComments_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=template&id=043c22d7&
var VExtensionsStorevue_type_template_id_043c22d7_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "row q-col-gutter-md"
  }, _vm._l(_vm.extensions, function (extension) {
    return _c('div', {
      key: extension.name,
      staticClass: "col-xs-12 col-lg-6 col-xl-4"
    }, [_c('q-card', [_c('q-item', {
      staticClass: "bg-white",
      staticStyle: {
        "height": "100px"
      }
    }, [_c('q-item-section', {
      attrs: {
        "avatar": ""
      }
    }, [_c('q-icon', {
      style: _vm.getIconStyle(extension.color),
      attrs: {
        "name": extension.icon,
        "size": "40px"
      }
    })], 1), _c('q-item-section', [_c('div', {
      staticClass: "row col items-center"
    }, [_c('div', {
      staticClass: "q-subheading text-bold"
    }, [_vm._v(_vm._s(extension.label))]), _c('div', {
      staticClass: "col"
    }), _c('div', [_c('q-toggle', {
      attrs: {
        "disable": "",
        "readonly": "",
        "color": "positive"
      },
      model: {
        value: extension.enabled,
        callback: function ($$v) {
          _vm.$set(extension, "enabled", $$v);
        },
        expression: "extension.enabled"
      }
    })], 1)]), _c('div', {
      staticClass: "row col q-body-2 text-justify"
    }, [_vm._v(_vm._s(extension.description))])])], 1)], 1)], 1);
  }), 0);
};
var VExtensionsStorevue_type_template_id_043c22d7_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=script&lang=js&
/* harmony default export */ var VExtensionsStorevue_type_script_lang_js_ = ({
  props: {
    activeSkills: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      extensions: []
    };
  },
  created: function () {
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
    getIconStyle: function (color) {
      return 'border: 3px solid ' + color + '; background-color: ' + color + '; color: white; padding: 5px; width: 70px; height: 70px;';
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VExtensionsStorevue_type_script_lang_js_ = (VExtensionsStorevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue





/* normalize component */
;
var VExtensionsStore_component = normalizeComponent(
  components_VExtensionsStorevue_type_script_lang_js_,
  VExtensionsStorevue_type_template_id_043c22d7_render,
  VExtensionsStorevue_type_template_id_043c22d7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VExtensionsStore = (VExtensionsStore_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VFacets.vue?vue&type=template&id=092364a7&
var VFacetsvue_type_template_id_092364a7_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "facets"
  }, [_vm.isAnyFacetValueSelected() ? _c('div', {
    staticClass: "selectedFacets q-pb-md"
  }, _vm._l(_vm.selectedFacets, function (selectedFacetValues, selectedFacet) {
    return _c('div', {
      key: selectedFacet
    }, [!_vm.facetMultipleByCode(selectedFacet) ? _vm._l(selectedFacetValues, function (selectedFacetValue) {
      return _c('q-chip', {
        key: selectedFacetValue.code,
        staticClass: "q-mb-sm",
        attrs: {
          "clickable": "",
          "icon-right": "cancel"
        },
        on: {
          "click": function ($event) {
            return _vm.$emit('toogle-facet', selectedFacet, selectedFacetValue, _vm.contextKey);
          }
        }
      }, [_vm._v(_vm._s(_vm.facetLabelByCode(selectedFacet)) + ": " + _vm._s(_vm.facetValueLabelByCode(selectedFacet, selectedFacetValue)) + " ")]);
    }) : _vm._e()], 2);
  }), 0) : _vm._e(), _vm._l(_vm.facets, function (facet) {
    return _c('q-list', {
      key: facet.code,
      staticClass: "facetValues q-py-none",
      attrs: {
        "dense": ""
      }
    }, [facet.multiple || !_vm.isFacetSelected(facet.code) ? [_c('q-item-label', {
      attrs: {
        "header": ""
      }
    }, [_c('big', [_vm._v(_vm._s(facet.label))])], 1), _vm._l(_vm.selectedInvisibleFacets(facet.code), function (value) {
      return _c('q-item', {
        key: value.code,
        staticClass: "facetValue q-ml-md",
        attrs: {
          "clickable": ""
        },
        nativeOn: {
          "click": function ($event) {
            return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey);
          }
        }
      }, [facet.multiple ? _c('q-item-section', {
        attrs: {
          "side": ""
        }
      }, [_c('q-checkbox', {
        attrs: {
          "dense": "",
          "value": true
        },
        on: {
          "input": function ($event) {
            return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey);
          }
        }
      })], 1) : _vm._e(), _c('q-item-section', [_vm._v(_vm._s(value.label))]), _c('q-item-section', {
        attrs: {
          "side": ""
        }
      }, [_vm._v(_vm._s(value.count))])], 1);
    }), _vm._l(_vm.visibleFacets(facet.code, facet.values), function (value) {
      return _c('q-item', {
        key: value.code,
        staticClass: "facetValue q-ml-md",
        attrs: {
          "clickable": ""
        },
        nativeOn: {
          "click": function ($event) {
            return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey);
          }
        }
      }, [facet.multiple ? _c('q-item-section', {
        attrs: {
          "side": ""
        }
      }, [_c('q-checkbox', {
        attrs: {
          "dense": "",
          "value": _vm.isFacetValueSelected(facet.code, value.code)
        },
        on: {
          "input": function ($event) {
            return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey);
          }
        }
      })], 1) : _vm._e(), _c('q-item-section', [_vm._v(_vm._s(value.label))]), _c('q-item-section', {
        attrs: {
          "side": ""
        }
      }, [_vm._v(_vm._s(value.count))])], 1);
    }), facet.values.length > _vm.maxValues && !_vm.isFacetExpanded(facet.code) ? _c('q-btn', {
      attrs: {
        "flat": ""
      },
      on: {
        "click": function ($event) {
          return _vm.expandFacet(facet.code);
        }
      }
    }, [_vm._v(_vm._s(_vm.$q.lang.vui.facets.showAll))]) : _vm._e(), facet.values.length > _vm.maxValues && _vm.isFacetExpanded(facet.code) ? _c('q-btn', {
      attrs: {
        "flat": ""
      },
      on: {
        "click": function ($event) {
          return _vm.reduceFacet(facet.code);
        }
      }
    }, [_vm._v(_vm._s(_vm.$q.lang.vui.facets.showLess))]) : _vm._e()] : _vm._e()], 2);
  })], 2);
};
var VFacetsvue_type_template_id_092364a7_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VFacets.vue?vue&type=script&lang=js&

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
  data: function () {
    return {
      expandedFacets: []
    };
  },
  methods: {
    facetByCode: function (facetCode) {
      return this.facets.filter(function (facet) {
        return facet.code === facetCode;
      })[0];
    },
    facetValueByCode: function (facetCode, facetValueCode) {
      return this.facetByCode(facetCode).values.filter(function (facetValue) {
        return facetValue.code === facetValueCode;
      })[0];
    },
    facetLabelByCode: function (facetCode) {
      return this.facetByCode(facetCode).label;
    },
    facetMultipleByCode: function (facetCode) {
      return this.facetByCode(facetCode).multiple;
    },
    facetValueLabelByCode: function (facetCode, facetValueCode) {
      var facetValueByCode = this.facetValueByCode(facetCode, facetValueCode);
      return facetValueByCode ? facetValueByCode.label : facetValueCode; //might be not found
    },

    isFacetValueSelected: function (facetCode, facetValueCode) {
      return this.selectedFacets[facetCode].includes(facetValueCode);
    },
    isFacetSelected: function (facetCode) {
      if (this.selectedFacets[facetCode]) {
        return this.selectedFacets[facetCode].length > 0;
      }
      return false;
    },
    isAnyFacetValueSelected: function () {
      return Object.keys(this.selectedFacets).some(function (facetCode) {
        return !this.facetMultipleByCode(facetCode);
      }.bind(this));
    },
    expandFacet: function (facetCode) {
      if (!this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.push(facetCode);
      }
    },
    reduceFacet: function (facetCode) {
      if (this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(facetCode), 1);
      }
    },
    isFacetExpanded: function (facetCode) {
      return this.$data.expandedFacets.includes(facetCode);
    },
    selectedInvisibleFacets: function (facetCode) {
      return this.selectedFacets[facetCode].filter(facetValueCode => !this.facetValueByCode(facetCode, facetValueCode)).map(facetValueCode => {
        var obj = {};
        obj.code = facetValueCode;
        obj.label = facetValueCode;
        obj.count = 0;
        return obj;
      });
    },
    visibleFacets: function (facetCode, facetValues) {
      if (!this.isFacetExpanded(facetCode)) {
        return facetValues.slice(0, this.maxValues);
      }
      return facetValues;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VFacets.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VFacetsvue_type_script_lang_js_ = (VFacetsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VFacets.vue





/* normalize component */
;
var VFacets_component = normalizeComponent(
  components_VFacetsvue_type_script_lang_js_,
  VFacetsvue_type_template_id_092364a7_render,
  VFacetsvue_type_template_id_092364a7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VFacets = (VFacets_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=template&id=575d0bbc&
var VGeopointInputvue_type_template_id_575d0bbc_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "row"
  }, [_c('q-input', {
    attrs: {
      "label": "Longitude",
      "stack-label": ""
    },
    on: {
      "input": _vm.updateJson
    },
    model: {
      value: _vm.inputObject.lon,
      callback: function ($$v) {
        _vm.$set(_vm.inputObject, "lon", _vm._n($$v));
      },
      expression: "inputObject.lon"
    }
  }), _c('q-input', {
    attrs: {
      "label": "Latitude",
      "stack-label": ""
    },
    on: {
      "input": _vm.updateJson
    },
    model: {
      value: _vm.inputObject.lat,
      callback: function ($$v) {
        _vm.$set(_vm.inputObject, "lat", _vm._n($$v));
      },
      expression: "inputObject.lat"
    }
  })], 1);
};
var VGeopointInputvue_type_template_id_575d0bbc_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=script&lang=js&
/* harmony default export */ var VGeopointInputvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: Object
    }
  },
  data: function () {
    return {
      inputObject: this.$props.value ? this.$props.value : {}
    };
  },
  watch: {
    value: function (newVal) {
      this.$data.inputObject = newVal ? newVal : {};
      this.updateJson();
    }
  },
  beforeMount() {
    this.updateJson();
  },
  methods: {
    updateJson() {
      var newInputValue;
      if (this.$props.value) {
        newInputValue = JSON.stringify({
          lon: this.$data.inputObject.lon,
          lat: this.$data.inputObject.lat
        });
        this.$set(this.$props.value, '_v_inputValue', newInputValue);
      } else {
        //this.$set(this.$props.value, null );
      }
      this.$emit('input', this.$data.inputObject);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VGeopointInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VGeopointInputvue_type_script_lang_js_ = (VGeopointInputvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VGeopointInput.vue





/* normalize component */
;
var VGeopointInput_component = normalizeComponent(
  components_VGeopointInputvue_type_script_lang_js_,
  VGeopointInputvue_type_template_id_575d0bbc_render,
  VGeopointInputvue_type_template_id_575d0bbc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VGeopointInput = (VGeopointInput_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VHandles.vue?vue&type=template&id=6621b1be&
var VHandlesvue_type_template_id_6621b1be_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('q-input', {
    attrs: {
      "placeholder": _vm.$q.lang.vui.handles.placeholder,
      "debounce": 300,
      "autofocus": "",
      "outlined": "",
      "bg-color": "white",
      "dense": ""
    },
    on: {
      "input": _vm.searchHandles
    },
    scopedSlots: _vm._u([{
      key: "prepend",
      fn: function () {
        return [_c('q-icon', {
          attrs: {
            "name": "search"
          }
        })];
      },
      proxy: true
    }]),
    model: {
      value: _vm.text,
      callback: function ($$v) {
        _vm.text = $$v;
      },
      expression: "text"
    }
  }), _c('q-list', {
    attrs: {
      "bordered": "",
      "dense": "",
      "separator": ""
    }
  }, _vm._l(_vm.handles, function (handle) {
    return _c('q-item', {
      directives: [{
        name: "ripple",
        rawName: "v-ripple"
      }],
      key: handle.code,
      attrs: {
        "clickable": ""
      },
      on: {
        "click": function ($event) {
          return _vm.VUi.methods.goTo(_vm.baseUrl + 'hw/' + handle.code);
        }
      }
    }, [_c('q-item-section', [_vm._v(" " + _vm._s(handle.code) + " ")])], 1);
  }), 1)], 1);
};
var VHandlesvue_type_template_id_6621b1be_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VHandles.vue?vue&type=script&lang=js&
/* harmony default export */ var VHandlesvue_type_script_lang_js_ = ({
  props: {
    baseUrl: {
      type: String,
      'default': '/'
    }
  },
  data: function () {
    return {
      text: "",
      handles: []
    };
  },
  methods: {
    searchHandles: function (val) {
      if (val) {
        this.$http.post(this.baseUrl + 'api/vertigo/handle/_search', {
          prefix: val
        }).then(function (response) {
          //Ok
          this.$data.handles = response.data;
        }.bind(this));
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VHandles.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VHandlesvue_type_script_lang_js_ = (VHandlesvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VHandles.vue





/* normalize component */
;
var VHandles_component = normalizeComponent(
  components_VHandlesvue_type_script_lang_js_,
  VHandlesvue_type_template_id_6621b1be_render,
  VHandlesvue_type_template_id_6621b1be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VHandles = (VHandles_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=template&id=2f4f3e4d&
var VJsonEditorvue_type_template_id_2f4f3e4d_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "row"
  }, _vm._l(_vm.jsonAsObject, function (value, key) {
    return _c('div', {
      key: key,
      class: 'col-' + 12 / _vm.cols
    }, [!_vm.readonly ? _c('q-input', {
      attrs: {
        "label": key,
        "orientation": "vertical",
        "stack-label": ""
      },
      on: {
        "input": _vm.updateJson
      },
      model: {
        value: _vm.jsonAsObject[key],
        callback: function ($$v) {
          _vm.$set(_vm.jsonAsObject, key, $$v);
        },
        expression: "jsonAsObject[key]"
      }
    }) : _c('q-field', {
      attrs: {
        "label": key,
        "orientation": "vertical",
        "stack-label": "",
        "borderless": "",
        "readonly": ""
      }
    }, [_c('span', [_vm._v(_vm._s(value))])])], 1);
  }), 0);
};
var VJsonEditorvue_type_template_id_2f4f3e4d_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=script&lang=js&
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
  data: function () {
    return {
      jsonAsObject: JSON.parse(this.$props.value)
    };
  },
  watch: {
    value: function (newVal) {
      this.$data.jsonAsObject = JSON.parse(newVal);
    }
  },
  methods: {
    updateJson() {
      this.$emit('input', JSON.stringify(this.$data.jsonAsObject));
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VJsonEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VJsonEditorvue_type_script_lang_js_ = (VJsonEditorvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VJsonEditor.vue





/* normalize component */
;
var VJsonEditor_component = normalizeComponent(
  components_VJsonEditorvue_type_script_lang_js_,
  VJsonEditorvue_type_template_id_2f4f3e4d_render,
  VJsonEditorvue_type_template_id_2f4f3e4d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VJsonEditor = (VJsonEditor_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VNotifications.vue?vue&type=template&id=7e9a7200&
var VNotificationsvue_type_template_id_7e9a7200_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('q-btn', {
    staticClass: "on-left",
    attrs: {
      "round": "",
      "dense": "",
      "color": _vm.hasNew ? 'primary' : 'white',
      "textColor": _vm.hasNew ? 'white' : 'primary',
      "icon": _vm.count > 0 ? _vm.icon : _vm.iconNone
    }
  }, [_vm.count > 0 ? _c('q-badge', {
    attrs: {
      "color": "red",
      "text-color": "white",
      "floating": ""
    }
  }, [_vm._v(_vm._s(_vm.count))]) : _vm._e(), _c('q-menu', {
    staticClass: "notifications"
  }, [_c('q-list', {
    staticStyle: {
      "width": "300px"
    }
  }, _vm._l(_vm.list, function (notif) {
    return _c('q-item', {
      key: notif.uuid,
      attrs: {
        "tag": "a",
        "href": notif.targetUrl
      }
    }, [_c('q-item-section', {
      attrs: {
        "avatar": ""
      }
    }, [_c('q-icon', {
      attrs: {
        "name": _vm.toIcon(notif.type),
        "size": "2rem"
      }
    })], 1), _c('q-item-section', [_c('q-item-label', [_vm._v(_vm._s(notif.title))]), _c('q-item-label', {
      attrs: {
        "caption": "",
        "lines": "3"
      }
    }, [_vm._v(_vm._s(notif.content))])], 1), _c('q-item-section', {
      attrs: {
        "side": "",
        "top": ""
      }
    }, [_c('q-item-label', {
      attrs: {
        "caption": ""
      }
    }, [_vm._v(_vm._s(_vm.toDelay(new Date(notif.creationDate))))])], 1)], 1);
  }), 1)], 1)], 1);
};
var VNotificationsvue_type_template_id_7e9a7200_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VNotifications.vue?vue&type=script&lang=js&


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
      'default': function () {
        return {};
      }
    },
    baseUrl: {
      type: String,
      'default': '/api/',
      required: true
    }
  },
  data: function () {
    return {
      firstCall: true,
      list: [],
      hasNew: false,
      wasError: false,
      count: 0,
      timer: ''
    };
  },
  created: function () {
    this.fetchNotificationsList();
    this.timer = setInterval(this.fetchNotificationsList, 5000);
  },
  methods: {
    fetchNotificationsList: function () {
      this.$http.get(this.baseUrl + 'x/notifications/api/messages', {
        timeout: 5 * 1000
      }).then(function (response) {
        //Ok
        this.updateNotificationsData(response.data);
        if (this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 5000);
        }
        this.wasError = false;
      }.bind(this)).catch(function () {
        //Ko
        if (!this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 60000);
        }
        this.wasError = true;
      }.bind(this));
    },
    updateNotificationsData: function (newList) {
      // Tri par ordre décroissant de date de création
      const sortedList = newList.sort(function (a, b) {
        return b.creationDate - a.creationDate;
      });
      var newElements = [];
      // Traverse both arrays simultaneously.
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
      }
      // Mise à jour des notifications
      this.list = sortedList;
      // Met à jour le nombre total de notifications
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
      }

      // Booléen indiquant s'il s'agit du premier appel à la MaJ des notifications
      this.firstCall = false;
    },
    cancelAutoUpdate: function () {
      clearInterval(this.timer);
    },
    toIcon: function (type) {
      var typeIcon = this.typeIconMap[type];
      return typeIcon ? typeIcon : 'mail';
    },
    toDelay: function (creationDate) {
      let diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'days');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.days;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'hours');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.hours;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'minutes');
      if (diff > 0) return diff + ' ' + this.$q.lang.vui.notifications.minutes;
      diff = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.getDateDiff(Date.now(), creationDate, 'seconds');
      return diff + ' ' + this.$q.lang.vui.notifications.seconds;
    }
  },
  beforeDestroy: function () {
    clearInterval(this.timer);
  }
});
;// CONCATENATED MODULE: ./src/components/VNotifications.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VNotificationsvue_type_script_lang_js_ = (VNotificationsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VNotifications.vue





/* normalize component */
;
var VNotifications_component = normalizeComponent(
  components_VNotificationsvue_type_script_lang_js_,
  VNotificationsvue_type_template_id_7e9a7200_render,
  VNotificationsvue_type_template_id_7e9a7200_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VNotifications = (VNotifications_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VMap.vue?vue&type=template&id=216750ce&
var VMapvue_type_template_id_216750ce_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  }, [_vm._t("default")], 2);
};
var VMapvue_type_template_id_216750ce_staticRenderFns = [];

// EXTERNAL MODULE: external {"commonjs":"ol","commonjs2":"ol","root":"ol"}
var external_commonjs_ol_commonjs2_ol_root_ol_ = __webpack_require__(5015);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VMap.vue?vue&type=script&lang=js&


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
    onMapLoad: function (found) {
      var vm = this;
      function checkForMap() {
        if (vm.olMap) {
          found(vm.olMap);
          vm.postInit();
        } else {
          setTimeout(checkForMap, 50);
        }
      }
      checkForMap();
    },
    postInit() {
      if (this.$props.initialZoomLevel) {
        this.olMap.getView().setZoom(this.$props.initialZoomLevel);
      }
    }
  },
  mounted: function () {
    var view = new external_commonjs_ol_commonjs2_ol_root_ol_.View();
    var osmLayer = new external_commonjs_ol_commonjs2_ol_root_ol_.layer.Tile({
      preload: 4,
      source: new external_commonjs_ol_commonjs2_ol_root_ol_.source.OSM()
    });
    this.olMap = new external_commonjs_ol_commonjs2_ol_root_ol_.Map({
      interactions: external_commonjs_ol_commonjs2_ol_root_ol_.interaction.defaults({
        onFocusOnly: true
      }),
      target: this.$props.id,
      layers: [osmLayer],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      view: view
    });
    if (this.$props.initialCenter) {
      this.olMap.getView().setCenter(external_commonjs_ol_commonjs2_ol_root_ol_.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat]));
    }

    // handle refresh if an endPoint is specified
    this.olMap.on('moveend', function (e) {
      var mapExtent = e.map.getView().calculateExtent();
      var wgs84Extent = external_commonjs_ol_commonjs2_ol_root_ol_.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
      var topLeft = external_commonjs_ol_commonjs2_ol_root_ol_.extent.getTopLeft(wgs84Extent);
      var bottomRight = external_commonjs_ol_commonjs2_ol_root_ol_.extent.getBottomRight(wgs84Extent);
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$emit('moveend', topLeft, bottomRight), 300);
    }.bind(this));
    setTimeout(function () {
      this.olMap.on('click', function (evt) {
        evt.stopPropagation();
        external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')), 300);
      }.bind(this));
    }.bind(this), 300);
  }
});
;// CONCATENATED MODULE: ./src/components/VMap.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VMapvue_type_script_lang_js_ = (VMapvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VMap.vue





/* normalize component */
;
var VMap_component = normalizeComponent(
  components_VMapvue_type_script_lang_js_,
  VMapvue_type_template_id_216750ce_render,
  VMapvue_type_template_id_216750ce_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMap = (VMap_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VMapLayer.vue?vue&type=template&id=08890d30&
var VMapLayervue_type_template_id_08890d30_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  }, [_c('div', {
    attrs: {
      "id": _vm.id + 'Popup'
    }
  }, [_vm.popupDisplayed ? _c('q-card', {
    staticClass: "q-px-md"
  }, [_vm._t("card", function () {
    return [_c('div', {
      staticClass: "text-subtitle2"
    }, [_vm._v(_vm._s(_vm.objectDisplayed[_vm.nameField]))])];
  }, {
    "objectDisplayed": _vm.objectDisplayed
  })], 2) : _vm._e()], 1)]);
};
var VMapLayervue_type_template_id_08890d30_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VMapLayer.vue?vue&type=script&lang=js&



/* harmony default export */ var VMapLayervue_type_script_lang_js_ = ({
  props: {
    id: {
      type: String,
      required: true
    },
    list: {
      type: Array
    },
    cluster: {
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
  data: function () {
    return {
      popupDisplayed: false,
      objectDisplayed: {},
      items: [],
      clusters: [],
      olMap: {},
      vectorSource: {},
      base32: '0123456789bcdefghjkmnpqrstuvwxyz' // (geohash-specific) Base32 map
    };
  },

  watch: {
    list: function (newVal) {
      //console.log('watch list');
      this.$data.items = newVal;
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    cluster: function (newVal) {
      //console.log('watch cluster');
      this.$data.items = [];
      this.$data.clusters = [];
      for (var i = 0; i < newVal.length; i++) {
        if (newVal[i].totalCount == 1) {
          this.$data.items = this.$data.items.concat(newVal[i].list);
        } else {
          this.$data.clusters.push({
            geoHash: newVal[i].code,
            geoLocation: this.decode(newVal[i].code),
            totalCount: newVal[i].totalCount
          });
        }
      }
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    'object.geoLocation': function () {
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    }
  },
  computed: {
    features: function () {
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
          var iconFeature = new external_commonjs_ol_commonjs2_ol_root_ol_.Feature({
            geometry: new external_commonjs_ol_commonjs2_ol_root_ol_.geom.Point(external_commonjs_ol_commonjs2_ol_root_ol_.proj.fromLonLat([geoObject.lon, geoObject.lat]))
          });
          if (this.$props.nameField) {
            iconFeature.set('name', object[this.$props.nameField]);
            iconFeature.set('innerObject', object);
            iconFeature.set('totalCount', object.totalCount);
          }
          return iconFeature;
        }
        return null;
      }.bind(this));
      var arrayOfClusterFeatures = this.$data.clusters.filter(function (object) {
        return object[geoField] != null;
      }).map(function (object) {
        var geoObject;
        if (typeof object[geoField] === 'string' || object[geoField] instanceof String) {
          geoObject = JSON.parse(object[geoField]);
        } else {
          geoObject = object[geoField];
        }
        if (geoObject != null) {
          var iconFeature = new external_commonjs_ol_commonjs2_ol_root_ol_.Feature({
            geometry: new external_commonjs_ol_commonjs2_ol_root_ol_.geom.Point(external_commonjs_ol_commonjs2_ol_root_ol_.proj.fromLonLat([geoObject.lon, geoObject.lat]))
          });
          if (this.$props.nameField) {
            iconFeature.set('name', object[this.$props.nameField]);
            iconFeature.set('innerObject', object);
            iconFeature.set('totalCount', object.totalCount);
          }
          return iconFeature;
        }
        return null;
      }.bind(this));
      return arrayOfFeatures.concat(arrayOfClusterFeatures);
    }
  },
  methods: {
    fetchList: function (topLeft, bottomRight) {
      this.$http.get(this.baseUrl + '_geoSearch?topLeft="' + topLeft.lat + ',' + topLeft.lon + '"&bottomRight="' + bottomRight.lat + ',' + bottomRight.lon + '"', {
        timeout: 5 * 1000
      }).then(function (response) {
        //Ok
        this.$data.items = response.data;
        this.$data.vectorSource.clear();
        this.$data.vectorSource.addFeatures(this.features);
      }.bind(this));
    },
    /**
    * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
    *     to reasonable precision).
    *
    * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
    * @returns {{lat:number, lon:number}} (Center of) geohashed location.
    * @throws  Invalid geohash.
    *
    * @example
    *     const latlon = Geohash.decode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
    */
    decode: function (geohash) {
      const bounds = this.bounds(geohash); // <-- the hard work
      // now just determine the centre of the cell...
      const latMin = bounds.sw.lat,
        lonMin = bounds.sw.lon;
      const latMax = bounds.ne.lat,
        lonMax = bounds.ne.lon;
      // cell centre
      let lat = (latMin + latMax) / 2;
      let lon = (lonMin + lonMax) / 2;
      // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
      lat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10));
      lon = lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10));
      return {
        lat: Number(lat),
        lon: Number(lon)
      };
    },
    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    bounds: function (geohash) {
      if (geohash.length == 0) throw new Error('Invalid geohash');
      geohash = geohash.toLowerCase();
      let evenBit = true;
      let latMin = -90,
        latMax = 90;
      let lonMin = -180,
        lonMax = 180;
      for (let i = 0; i < geohash.length; i++) {
        const chr = geohash.charAt(i);
        const idx = this.$data.base32.indexOf(chr);
        if (idx == -1) throw new Error('Invalid geohash');
        for (let n = 4; n >= 0; n--) {
          const bitN = idx >> n & 1;
          if (evenBit) {
            // longitude
            const lonMid = (lonMin + lonMax) / 2;
            if (bitN == 1) {
              lonMin = lonMid;
            } else {
              lonMax = lonMid;
            }
          } else {
            // latitude
            const latMid = (latMin + latMax) / 2;
            if (bitN == 1) {
              latMin = latMid;
            } else {
              latMax = latMid;
            }
          }
          evenBit = !evenBit;
        }
      }
      const bounds = {
        sw: {
          lat: latMin,
          lon: lonMin
        },
        ne: {
          lat: latMax,
          lon: lonMax
        }
      };
      return bounds;
    }
  },
  mounted: function () {
    this.$parent.onMapLoad(function (olMap) {
      this.$data.olMap = olMap;
      this.$data.items = [];
      this.$data.clusters = [];
      if (this.$props.list) {
        this.$data.items = this.$props.list;
      } else if (this.$props.cluster) {
        for (var i = 0; i < this.$props.cluster.length; i++) {
          if (this.$props.cluster[i].totalCount == 1) {
            this.$data.items = this.$data.items.concat(this.$props.cluster[i].list);
          } else {
            this.$data.clusters.push({
              geoHash: this.$props.cluster[i].code,
              geoLocation: this.decode(this.$props.cluster[i].code),
              totalCount: this.$props.cluster[i].totalCount
            });
          }
        }
      } else if (this.$props.object) {
        this.$data.items = [this.$props.object];
      }
      this.$data.vectorSource = new external_commonjs_ol_commonjs2_ol_root_ol_.source.Vector({
        features: this.features
      });
      var clusterSource = new external_commonjs_ol_commonjs2_ol_root_ol_.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      });
      var clusterLayer = new external_commonjs_ol_commonjs2_ol_root_ol_.layer.Vector({
        source: clusterSource
      });
      var styleIcon = new external_commonjs_ol_commonjs2_ol_root_ol_.style.Style({
        text: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Text({
          font: this.$props.markerSize + 'px ' + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Fill({
            color: this.$props.markerColor
          }),
          offsetY: 0
        })
      });
      var styleCache = {};
      clusterLayer.setStyle(function (feature /*resolution*/) {
        var size = 0;
        var agregateFeatures = feature.get('features');
        for (var i = 0; i < agregateFeatures.length; i++) {
          var fSize = agregateFeatures[i].get('totalCount');
          size += !fSize ? 1 : fSize;
        }
        if (!size || size == 1) {
          return styleIcon;
        } else {
          // otherwise show the number of features
          var style = styleCache[size];
          if (!style) {
            style = new external_commonjs_ol_commonjs2_ol_root_ol_.style.Style({
              image: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Circle({
                radius: this.$props.clusterCircleSize,
                stroke: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Stroke({
                  color: this.$props.clusterCircleBorderColor
                }),
                fill: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Fill({
                  color: this.$props.clusterColor
                })
              }),
              text: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Text({
                text: size.toString(),
                font: this.$props.clusterTextSize + 'px ' + this.$props.clusterTextFont,
                fill: new external_commonjs_ol_commonjs2_ol_root_ol_.style.Fill({
                  color: this.$props.clusterTextColor
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      }.bind(this));
      this.olMap.addLayer(clusterLayer);

      // fit view
      if (this.features.length > 0) {
        this.olMap.getView().fit(clusterLayer.getSource().getSource().getExtent(), this.olMap.getSize());
      }
      // handle refresh if an endPoint is specified
      this.olMap.on('moveend', function (e) {
        var mapExtent = e.map.getView().calculateExtent();
        var wgs84Extent = external_commonjs_ol_commonjs2_ol_root_ol_.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
        var topLeft = external_commonjs_ol_commonjs2_ol_root_ol_.extent.getTopLeft(wgs84Extent);
        var bottomRight = external_commonjs_ol_commonjs2_ol_root_ol_.extent.getBottomRight(wgs84Extent);
        if (this.baseUrl) {
          external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.fetchList({
            lat: topLeft[0],
            lon: topLeft[1]
          }, {
            lat: bottomRight[0],
            lon: bottomRight[1]
          }), 300);
        }
        external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$emit('moveend', topLeft, bottomRight), 300);
      }.bind(this));
      if (this.$props.nameField) {
        var popup = new external_commonjs_ol_commonjs2_ol_root_ol_.Overlay({
          element: this.$el.querySelector('#' + this.$props.id + 'Popup'),
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -20]
        });
        this.olMap.addOverlay(popup);
        // display popup on click
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
            external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326')), 300);
          } else {
            this.$data.popupDisplayed = false;
          }
        }.bind(this));

        // change mouse cursor when over marker
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
            external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$emit('click', external_commonjs_ol_commonjs2_ol_root_ol_.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326')), 300);
          }
        }.bind(this));
      }
    }.bind(this));
  }
});
;// CONCATENATED MODULE: ./src/components/VMapLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VMapLayervue_type_script_lang_js_ = (VMapLayervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VMapLayer.vue





/* normalize component */
;
var VMapLayer_component = normalizeComponent(
  components_VMapLayervue_type_script_lang_js_,
  VMapLayervue_type_template_id_08890d30_render,
  VMapLayervue_type_template_id_08890d30_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMapLayer = (VMapLayer_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VTree.vue?vue&type=template&id=3c71d92d&
var VTreevue_type_template_id_3c71d92d_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('q-field', _vm._b({
    scopedSlots: _vm._u([{
      key: "append",
      fn: function () {
        return [_c('q-icon', {
          attrs: {
            "name": "arrow_drop_down"
          }
        })];
      },
      proxy: true
    }, {
      key: "control",
      fn: function () {
        return [_c('div', {
          staticClass: "self-center full-width no-outline",
          attrs: {
            "tabindex": "0"
          }
        }, [_vm._v(_vm._s(_vm.getSelectedLabel()))])];
      },
      proxy: true
    }])
  }, 'q-field', _vm.$attrs, false), [_c('q-menu', {
    ref: "menu",
    attrs: {
      "breakpoint": 600,
      "fit": ""
    }
  }, [_c('q-tree', {
    attrs: {
      "nodes": _vm.convertListToTree(_vm.$props.list, _vm.$props.subTreeKey),
      "node-key": _vm.$props.keyField,
      "label-key": _vm.$props.labelField,
      "expanded": _vm.expandedNodes,
      "selected": _vm.selectedNode
    },
    on: {
      "update:expanded": [function ($event) {
        _vm.expandedNodes = $event;
      }, _vm.handleExpanded],
      "update:selected": [function ($event) {
        _vm.selectedNode = $event;
      }, _vm.handleSelected]
    }
  })], 1)], 1);
};
var VTreevue_type_template_id_3c71d92d_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/VTree.vue?vue&type=script&lang=js&


/* harmony default export */ var VTreevue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    keyField: {
      type: String,
      required: true
    },
    labelField: {
      type: String,
      required: true
    },
    parentKeyField: {
      type: String,
      required: true
    },
    subTreeKey: {
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      selectedNode: this.$props.value,
      expandedNodes: [this.$props.value]
    };
  },
  watch: {
    value: function (newVal) {
      this.$data.selectedNode = newVal;
    }
  },
  methods: {
    handleSelected: function (target) {
      this.$emit('input', this.$data.selectedNode);
      if (target) {
        this.$refs.menu.hide();
      }
    },
    handleExpanded: function () {
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function () {
      if (this.$data.selectedNode) {
        let node = this.$props.list.find(function (rse) {
          return rse[this.$props.keyField] === this.$data.selectedNode;
        }.bind(this));
        return node[this.$props.labelField];
      }
      return null;
    },
    convertListToTree: function (list, subTreeKey) {
      var map = {},
        node,
        roots = [],
        i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i][this.$props.keyField]] = i; // initialize the map
        list[i].children = []; // initialize the children
      }

      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node[this.$props.parentKeyField]) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node[this.$props.parentKeyField]]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      if (subTreeKey) {
        return [list[map[subTreeKey]]];
      }
      return roots;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VTree.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VTreevue_type_script_lang_js_ = (VTreevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/VTree.vue





/* normalize component */
;
var VTree_component = normalizeComponent(
  components_VTreevue_type_script_lang_js_,
  VTreevue_type_template_id_3c71d92d_render,
  VTreevue_type_template_id_3c71d92d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VTree = (VTree_component.exports);
;// CONCATENATED MODULE: ./src/directives/VAlertUnsavedUpdates.js
/* harmony default export */ var VAlertUnsavedUpdates = ({
  inserted: function (el, binding, vnode) {
    var watchKeys = binding.expression;
    if (!window.watcherUpdates) {
      //Some init must be only once
      window.watcherUpdates = {
        originalDocumentTitle: document.title,
        updates_detected: false,
        acceptedUpdates: function () {
          window.watcherUpdates.updates_detected = false;
          document.title = window.watcherUpdates.originalDocumentTitle;
        },
        beforeWindowUnload: function (e) {
          //les navigateurs n'affichent pas le message proposé pour éviter le scam, il suffit de retourner une chaine non vide
          if (window.watcherUpdates.updates_detected) {
            // Cancel the event
            e.preventDefault();
            // Chrome requires returnValue to be set
            e.returnValue = 'Voulez-vous quitter cette page ? \n Les modifications que vous avez apportées ne seront peut-être pas enregistrées';
          }
        }
      };
      window.addEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload);
      if (vnode.context.$root.uiMessageStack) {
        var uiMessageStack = vnode.context.$root.uiMessageStack;
        var hasError = uiMessageStack.globalErrors.length > 0;
        for (let watchKey of watchKeys.split(",")) {
          hasError = hasError || uiMessageStack.objectFieldErrors[watchKey];
          if (hasError) {
            break;
          }
        }
        if (hasError) {
          window.watcherUpdates.updates_detected = true; //if there is other errors => mark as dirty
        }
      }
    }
    //each button eventListener click
    el.addEventListener('click', window.watcherUpdates.acceptedUpdates);

    //each button watch data (watchKey may differ)
    for (let watchKey of watchKeys.split(",")) {
      vnode.context.$root.$watch('vueData.' + watchKey, function () {
        window.watcherUpdates.updates_detected = true;
        document.title = '*' + window.watcherUpdates.originalDocumentTitle;
      }, {
        deep: true
      });
    }
  },
  unbind: function () {
    window.removeEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload);
  }
});
;// CONCATENATED MODULE: ./src/directives/VAutofocus.js
/* harmony default export */ var VAutofocus = ({
  bind: function (el, binding, vnode) {
    var doFocus = binding.value;
    if (doFocus && !window.autofocus) {
      window.autofocus = true;
      vnode.context.$nextTick(() => el.focus());
    }
  }
});
;// CONCATENATED MODULE: ./src/directives/VIfUnsavedUpdates.js
/* harmony default export */ var VIfUnsavedUpdates = ({
  update: function (el, binding, vnode) {
    vnode.context.$nextTick(() => {
      if (!window.watcherUpdates || !window.watcherUpdates.updates_detected) {
        el.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
      }
    });
  }
});
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);
;// CONCATENATED MODULE: ./src/directives/VMinify.js


/* harmony default export */ var VMinify = ({
  bind: function (elMaxi, args) {
    const topOffset = args.value.topOffset;
    const topOffsetElSelector = args.value.topOffsetEl;
    const leftOffset = args.value.leftOffset;
    const leftOffsetElSelector = args.value.leftOffsetEl;
    const elMini = elMaxi.querySelector('.mini');
    for (var i = 0; i < elMaxi.childNodes.length; i++) {
      var elChild = elMaxi.childNodes[i];
      if (elChild.classList && !elChild.classList.contains('mini')) {
        elChild.classList.add("not-mini");
      }
    }
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).minifyHandler = function () {
      var currentTopOffset = external_commonjs_vue_commonjs2_vue_root_Vue_default().minifyComputeOffset(topOffset, topOffsetElSelector, 0, 'TOP');
      var currentLeftOffset = external_commonjs_vue_commonjs2_vue_root_Vue_default().minifyComputeOffset(leftOffset, leftOffsetElSelector, 0, 'LEFT');
      var elMiniHeight = elMini.getBoundingClientRect().height - currentTopOffset;
      var elMaxiHeight = elMaxi.getBoundingClientRect().height;
      //We check if nav should be fixed
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
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).minifyComputeOffset = function (offset, offsetElSelector, defaultOffset, direction) {
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
    window.addEventListener('scroll', (external_commonjs_vue_commonjs2_vue_root_Vue_default()).minifyHandler);
    window.addEventListener('resize', external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.throttle((external_commonjs_vue_commonjs2_vue_root_Vue_default()).minifyHandler, 50));
  },
  componentUpdated: function () {
    const interval = 50;
    const maxDelay = 1000;
    for (var delay = interval; delay < maxDelay; delay += delay) {
      setTimeout((external_commonjs_vue_commonjs2_vue_root_Vue_default()).minifyHandler, delay);
    }
  },
  unbind: function (elMaxi) {
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
;// CONCATENATED MODULE: ./src/directives/VScrollSpy.js



/* harmony default export */ var VScrollSpy = ({
  inserted: function (elNav, args) {
    const debugMode = args.value.debug ? args.value.debug : false;
    const startingOffset = args.value.startingOffset ? args.value.startingOffset : 24;
    const fixedPos = args.value.fixedPos ? args.value.fixedPos : 24;
    const fixeTrigger = startingOffset - fixedPos;
    const scanner = args.value.scanner ? args.value.scanner : fixedPos + 30; //scanner is 30px bottom of fixedPos, must be smaller than the smallest first element
    const elAs = elNav.querySelectorAll('a');
    elAs[0].classList.add("active"); //first active
    const scrollContainer = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.getScrollTarget(document.querySelector(elAs[0].hash));
    let scannerLines = [];
    let startLinearLine;
    let lastScrollLine;
    if (debugMode) {
      //scannerLine1 = Vue.createDebugLine('nearesBlock','absolute',scanner,'red' );
      // scannerLine1b = Vue.createDebugLine('scannerStart', 'fixed', scanner, 'orange');
      // startingTopLine = Vue.createDebugLine('startingTop', 'fixed', startingOffset, 'green');//position where the element is at start
      // scannerLine3 = Vue.createDebugLine('fixedPos', 'fixed', fixedPos, 'blue'); //position where the nav is fixed   
      startLinearLine = external_commonjs_vue_commonjs2_vue_root_Vue_default().createDebugLine('startLinear', 'absolute', 0, 'red');
      lastScrollLine = external_commonjs_vue_commonjs2_vue_root_Vue_default().createDebugLine('last', 'absolute', 0, 'red');
    }
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).scrollSpyHandler = function () {
      if (debugMode) {
        var el = elNav;
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        console.log("x: " + _x);
        console.log("y: " + _y + " (startingOffset)");
        //return { top: _y, left: _x };
      }
      // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
      if (window.pageYOffset > fixeTrigger) {
        if (!elNav.style.top) {
          elNav.style.top = fixedPos + "px";
          //when fixed, we must set a valid width
          if (!elNav.style.width) {
            elNav.style.width = elNav.getBoundingClientRect().width + "px";
          }
          elNav.classList.add("fixed");
        }
      } else {
        if (elNav.style.top) {
          elNav.classList.remove("fixed");
          elNav.style.top = null;
          elNav.style.width = elNav.getBoundingClientRect().width + "px"; //we keep the element size, when it's not fixed and keep it after
        }
      }

      //We compute breakpoints
      var scrollPosition = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.getScrollPosition(scrollContainer);
      var scrollBreakpoints = external_commonjs_vue_commonjs2_vue_root_Vue_default().computeBreakPoints(scrollPosition);
      //We looks between which breakpoints we are
      for (var i = 0; i < elAs.length; i++) {
        if (scrollBreakpoints[i] <= scrollPosition && (i >= elAs.length - 1 || scrollPosition < scrollBreakpoints[i + 1])) {
          elAs[i].classList.add("active");
        } else {
          elAs[i].classList.remove("active");
        }
      }
    };
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).computeBlockTop = function (scrollPosition) {
      var blockTop = [];
      for (let i = 0; i < elAs.length; i++) {
        const elScrollId = elAs[i].hash;
        const elScroll = document.querySelector(elScrollId);
        if (elScroll) {
          blockTop.push(scrollPosition + elScroll.getBoundingClientRect().top);
        } else {
          //console.warn('ScrollSpy element '+elScrollId+' not found')
        }
      }
      return blockTop;
    };
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).scrollTo = function (event) {
      event.preventDefault();
      const elScrollId = event.target.hash;
      const elScroll = document.querySelector(elScrollId);
      var toScroll = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.getScrollPosition(scrollContainer) + elScroll.getBoundingClientRect().top - scanner;
      var scrollPosition = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.getScrollPosition(scrollContainer);
      var blockTop = external_commonjs_vue_commonjs2_vue_root_Vue_default().computeBlockTop(scrollPosition);
      var scrollBreakpoints = external_commonjs_vue_commonjs2_vue_root_Vue_default().computeBreakPoints(scrollPosition);
      for (var i = 0; i < elAs.length; i++) {
        if (elAs[i].hash == elScrollId) {
          //console.log('scrollTo', blockTop[i]-scanner, scrollBreakpoints[i+1])
          if (blockTop[i] - scanner < scrollBreakpoints[i + 1] || !scrollBreakpoints[i + 1]) {
            toScroll = blockTop[i] - scanner;
          } else {
            toScroll = scrollBreakpoints[i + 1] - 1;
          }
          break;
        }
      }
      var duration = 200;
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.setScrollPosition(scrollContainer, toScroll, duration);
    };
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).computeBreakPoints = function (scrollPosition) {
      var blockTop = external_commonjs_vue_commonjs2_vue_root_Vue_default().computeBlockTop(scrollPosition);
      const windowHeight = window.innerHeight || document.documentElement.clientHeight; /** visible height */
      const scrollHeight = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.scroll.getScrollHeight(scrollContainer); /** height of scrollable element */
      const scrollMax = scrollHeight - windowHeight; /** Maximum possible scroll */
      const scrollEnd = scrollMax; //blockTop[blockTop.length-1]; /** Finish linear move at this scroll position */
      let scrollStart = scrollEnd - windowHeight + scanner; /** Start linear move at this scroll position : start a block start */
      for (let i = 1; i < elAs.length; i++) {
        if (blockTop[i] - scanner > scrollStart) {
          scrollStart = blockTop[i] - scanner;
          break;
        }
      }
      const scrollDelta = scrollEnd - scrollStart; //scroll linear regression "to" length
      //console.log('SP',scrollPosition, ' WH', windowHeight, ' SH',scrollHeight, ' SM', scrollMax, ' SS', scrollStart,  ' SD', scrollDelta, " scanner",scanner    );
      var scrollBreakpoints = [];
      scrollBreakpoints.push(0);
      for (let i = 1; i < elAs.length; i++) {
        if (blockTop[i] - scanner > scrollStart) {
          scrollBreakpoints[i] = scrollStart + scrollDelta * (blockTop[i] - scrollStart) / (scrollHeight - scrollStart);
          //console.log(i+' scrollBreakpoints top: ',blockTop[i])
        } else {
          scrollBreakpoints[i] = blockTop[i] - scanner;
        }
        scrollBreakpoints[i] = Math.round(scrollBreakpoints[i]);
      }
      if (debugMode) {
        for (let i = 1; i < elAs.length; i++) {
          var scannerLine;
          if (scannerLines.length < i) {
            scannerLine = external_commonjs_vue_commonjs2_vue_root_Vue_default().createDebugLine('navId#' + i, 'absolute', 0, 'red');
            scannerLines.push(scannerLine);
          } else {
            scannerLine = scannerLines[i - 1];
          }
          scannerLine.style.top = scrollBreakpoints[i] + scanner + 'px';
        }
        startLinearLine.style.top = scrollStart + scanner + 'px';
        lastScrollLine.style.top = scrollEnd + scanner + 'px';
      }
      return scrollBreakpoints;
    };
    (external_commonjs_vue_commonjs2_vue_root_Vue_default()).createDebugLine = function (name, position, top, color) {
      let scannerLine1 = document.createElement("div");
      scannerLine1.style.position = position;
      scannerLine1.style.top = top + 'px';
      scannerLine1.style.border = 'none';
      scannerLine1.style.borderTop = color + ' solid 1px';
      scannerLine1.style.width = '100%';
      scannerLine1.style.zIndex = '10000';
      scannerLine1.style.padding = '0px';
      scannerLine1.style.lineHeight = '0px';
      scannerLine1.style.fontSize = '12px';
      scannerLine1.style.color = color;
      scannerLine1.innerHTML = name;
      document.querySelector('body').appendChild(scannerLine1);
      return scannerLine1;
    };
    elNav.classList.add("scroll-spy-nav");
    for (var i = 0; i < elAs.length; i++) {
      elAs[i].addEventListener('click', (external_commonjs_vue_commonjs2_vue_root_Vue_default()).scrollTo);
    }
    window.addEventListener('scroll', (external_commonjs_vue_commonjs2_vue_root_Vue_default()).scrollSpyHandler);
    window.addEventListener('resize', external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.throttle((external_commonjs_vue_commonjs2_vue_root_Vue_default()).scrollSpyHandler, 50));
  },
  unbind: function (elNav) {
    elNav.classList.remove("scroll-spy-nav");
    window.removeEventListener('scroll');
    window.removeEventListener('resize');
    const elAs = elNav.querySelectorAll('a');
    for (var i = 0; i < elAs.length; i++) {
      elAs.removeEventListener('click');
    }
  }
});
;// CONCATENATED MODULE: ./node_modules/quasar/src/utils/private/sort.js
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

;// CONCATENATED MODULE: ./node_modules/quasar/src/utils/is.js
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

    const keys = Object.keys(a).filter(key => a[key] !== void 0)
    length = keys.length

    if (length !== Object.keys(b).filter(key => b[key] !== void 0).length) {
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

// not perfect, but what we ARE interested is for Arrays not to slip in
// as spread operator will mess things up in various areas
// see https://jsbench.me/tbl0iliyax/1
function isObject (v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) !== true
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

/* harmony default export */ var is = ({
  deepEqual: isDeepEqual,
  object: isObject,
  date: isDate,
  regexp: isRegexp,
  number: isNumber
});

;// CONCATENATED MODULE: ./src/methods.js




/* harmony default export */ var methods = ({
  onAjaxError: function (response) {
    //Quasar Notif Schema
    let notif = {
      type: 'negative',
      message: 'Network Error.',
      multiLine: true,
      icon: 'warning',
      timeout: 2500
    };

    //Setup Error Message
    if (response) {
      if (Object.prototype.hasOwnProperty.call(response.data, 'redirect')) {
        //if response was a redirect
        window.location = response.data.redirect;
        return;
      } else if (Object.prototype.hasOwnProperty.call(response.data, 'message')) {
        //if response was an error
        notif.message = response.data.message;
      }
      //Setup Generic Response Messages
      if (response.status === 401) {
        notif.message = 'UnAuthorized, you may login with an authorized account';
        this.$root.$emit('unauthorized', response); //Emit Logout Event
        return;
      } else if (response.status === 403) {
        notif.message = 'Forbidden, your havn&quote;t enought rights';
      } else if (response.status === 404) {
        notif.message = 'API Route is Missing or Undefined';
      } else if (response.status === 405) {
        notif.message = 'API Route Method Not Allowed';
      } else if (response.status === 422) {
        //Validation Message
        notif.message = '';
        Object.keys(response.data).forEach(function (key) {
          this.$data.uiMessageStack[key] = response.data[key];
        }.bind(this));
      } else if (response.status >= 500) {
        notif.message = 'Server Error';
      }
      if (response.statusText && response.status !== 422) {
        notif.message = response.statusText;
      }
      //Try to Use the Response Message
      if (Object.prototype.hasOwnProperty.call(response, 'data')) {
        if (Object.prototype.hasOwnProperty.call(response.data, 'message') && response.data.message && response.data.message.length > 0) {
          notif.message = response.data.message;
        } else if (Object.prototype.hasOwnProperty.call(response.data, 'globalErrors') && response.data.globalErrors && response.data.globalErrors.length > 0) {
          var notifyMessages = this.uiMessageStackToNotify(response.data);
          notifyMessages.forEach(function (notifyMessage) {
            this.$q.notify(notifyMessage);
          }.bind(this));
          notif.message = ''; //déja envoyé
        }
      }
    }
    //Send the notif
    if (notif.message.length > 0) {
      this.$q.notify(notif);
    }
  },
  uiMessageStackToNotify: function (uiMessageStack) {
    if (uiMessageStack) {
      var notifyMessages = [];
      if (Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalErrors') && uiMessageStack.globalErrors && uiMessageStack.globalErrors.length > 0) {
        uiMessageStack.globalErrors.forEach(function (uiMessage) {
          notifyMessages.push({
            type: 'negative',
            message: uiMessage,
            multiLine: true,
            timeout: 2500
          });
        });
      }
      if (Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalWarnings') && uiMessageStack.globalWarnings && uiMessageStack.globalWarnings.length > 0) {
        uiMessageStack.globalWarnings.forEach(function (uiMessage) {
          notifyMessages.push({
            type: 'warning',
            message: uiMessage,
            multiLine: true,
            timeout: 2500
          });
        });
      }
      if (Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalInfos') && uiMessageStack.globalInfos && uiMessageStack.globalInfos.length > 0) {
        uiMessageStack.globalInfos.forEach(function (uiMessage) {
          notifyMessages.push({
            type: 'info',
            message: uiMessage,
            multiLine: true,
            timeout: 2500
          });
        });
      }
      if (Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalSuccess') && uiMessageStack.globalSuccess && uiMessageStack.globalSuccess.length > 0) {
        uiMessageStack.globalSuccess.forEach(function (uiMessage) {
          notifyMessages.push({
            type: 'positive',
            message: uiMessage,
            multiLine: true,
            timeout: 2500
          });
        });
      }
      //Pour le moment, rien avec : objectFieldErrors, objectFieldWarnings, objectFieldInfos

      return notifyMessages;
    }
  },
  getSafeValue: function (objectkey, fieldKey, subFieldKey) {
    if (this.$data.vueData[objectkey] && this.$data.vueData[objectkey][fieldKey]) {
      return this.$data.vueData[objectkey][fieldKey][subFieldKey];
    }
    return null;
  },
  transformListForSelection: function (list, valueField, labelField) {
    return this.$data.vueData[list].map(function (object) {
      return {
        value: object[valueField],
        label: object[labelField].toString()
      }; // a label is always a string
    });
  },

  paginationAndSortHandler: function (params) {
    var pagination = params.pagination;
    let componentStates = this.$data.componentStates;
    let vueData = this.$data.vueData;
    var oldPagination = componentStates[pagination.componentId].pagination;
    if (oldPagination.sortBy != pagination.sortBy || oldPagination.descending != pagination.descending) {
      if (pagination.sortBy) {
        // it's a sort
        if (pagination.sortUrl) {
          //order call the server
          pagination.page = 1; //reset pagination
          this.$http.post(pagination.sortUrl, this.objectToFormData({
            sortFieldName: pagination.sortBy,
            sortDesc: pagination.descending,
            CTX: this.$data.vueData.CTX
          })).then(function (response) {
            vueData[pagination.listKey] = response.data.model[pagination.listKey];
            this.$data.vueData.CTX = response.data.model['CTX'];
          }.bind(this));
        } else {
          //do locally
          this.$refs[pagination.componentId].sortMethod.apply(this.$refs[pagination.componentId], [vueData[pagination.listKey], pagination.sortBy, pagination.descending]);
        }
      } // if we reset the sort we do nothing
    }
    // otherwise it's pagination or filter : do it locally
    // nothing to do everything is done by the paginatedData function
    componentStates[pagination.componentId].pagination = pagination;
  },
  paginatedData: function (list, componentId) {
    let componentStates = this.$data.componentStates;
    var pagination = componentStates[componentId].pagination;
    if (pagination.rowsPerPage != 0) {
      // not all
      var firstRowIndex = (pagination.page - 1) * pagination.rowsPerPage;
      var lastRowIndex = pagination.page * pagination.rowsPerPage;
      return this.$data.vueData[list].slice(firstRowIndex, lastRowIndex);
    }
    return this.$data.vueData[list];
  },
  sortCiAi: function (data, sortBy, descending) {
    const col = this.colList.find(def => def.name === sortBy);
    if (col === void 0 || col.field === void 0) {
      return data;
    }
    const dir = descending === true ? -1 : 1,
      val = typeof col.field === 'function' ? v => col.field(v) : v => v[col.field];
    const collator = new Intl.Collator();
    return data.sort((a, b) => {
      let A = val(a),
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
      [A, B] = [A, B].map(s => (s + '').toLocaleString());
      return collator.compare(A, B) * dir;
    });
  },
  selectedFunction: function (object, field, item /*, keyboard*/) {
    this.$data.vueData[object][field] = item.value;
  },
  searchAutocomplete: function (list, valueField, labelField, componentId, url, terms, update, abort) {
    if (terms.length < 2) {
      abort();
      return;
    }
    this.$http.post(url, this.objectToFormData({
      terms: terms,
      list: list,
      valueField: valueField,
      labelField: labelField,
      CTX: this.$data.vueData.CTX
    })).then(function (response) {
      var finalList = response.data.map(function (object) {
        return {
          value: object[valueField],
          label: object[labelField].toString()
        }; // a label is always a string
      });

      update(function () {
        this.$data.componentStates[componentId].options = finalList;
      }.bind(this));
    }.bind(this)).catch(function (error) {
      this.$q.notify(error.response.status + ":" + error.response.statusText);
      update([]);
    });
  },
  loadAutocompleteById: function (list, valueField, labelField, componentId, url, objectName, fieldName, rowIndex) {
    //Method use when value(id) is set by another way : like Ajax Viewcontext update, other component, ...
    //if options already contains the value (id) : we won't reload.
    var value;
    if (rowIndex != null) {
      value = this.$data.vueData[objectName][rowIndex][fieldName];
    } else {
      value = this.$data.vueData[objectName][fieldName];
    }
    if (Array.isArray(value)) {
      value.forEach(element => this.loadMissingAutocompleteOption(list, valueField, labelField, componentId, url, element));
    } else {
      this.loadMissingAutocompleteOption(list, valueField, labelField, componentId, url, value);
    }
  },
  loadMissingAutocompleteOption: function (list, valueField, labelField, componentId, url, value) {
    if (!value || this.$data.componentStates[componentId].options.filter(function (option) {
      return option.value === value;
    }.bind(this)).length > 0) {
      return;
    }
    this.$data.componentStates[componentId].loading = true;
    this.$http.post(url, this.objectToFormData({
      value: value,
      list: list,
      valueField: valueField,
      labelField: labelField,
      CTX: this.$data.vueData.CTX
    })).then(function (response) {
      var finalList = response.data.map(function (object) {
        return {
          value: object[valueField],
          label: object[labelField].toString()
        }; // a label is always a string
      });

      this.$data.componentStates[componentId].options = this.$data.componentStates[componentId].options.concat(finalList);
    }.bind(this)).catch(function (error) {
      this.$q.notify(error.response.status + ":" + error.response.statusText);
    }.bind(this)).then(function () {
      // always executed
      this.$data.componentStates[componentId].loading = false;
    }.bind(this));
  },
  decodeDate: function (value, format) {
    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(value, 'DD/MM/YYYY'), 'DD/MM/YYYY')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(value, 'DD/MM/YYYY'), format);
    } else {
      return value;
    }
  },
  encodeDate: function (newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(newValue, format), format)) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(newValue, format), 'DD/MM/YYYY');
    } else {
      return newValue;
    }
  },
  decodeDatetime: function (value, format) {
    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), format);
    } else {
      return value;
    }
  },
  encodeDatetime: function (newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(newValue, format), format)) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(newValue, format), 'DD/MM/YYYY HH:mm');
    } else {
      return newValue;
    }
  },
  sortDatesAsString: function (format) {
    return function (date1, date2) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(date1, format).getTime() > external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.date.extractDate(date2, format).getTime() ? 1 : -1;
    };
  },
  goTo: function (url) {
    window.location = url;
  },
  openModal: function (modalId, url, params) {
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
  toogleFacet: function (facetCode, facetValueCode, contextKey) {
    let vueData = this.$data.vueData;
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
  search: external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.debounce(function (contextKey) {
    let componentStates = this.$data.componentStates;
    let vueData = this.$data.vueData;
    var selectedFacetsContextKey = contextKey + "_selectedFacets";
    var criteriaContextKey = vueData[contextKey + '_criteriaContextKey'];
    var params = this.vueDataParams([criteriaContextKey]);
    params.append(selectedFacetsContextKey, JSON.stringify(vueData[selectedFacetsContextKey]));
    var searchUrl = componentStates[contextKey + 'Search'].searchUrl;
    var collectionComponentId = componentStates[contextKey + 'Search'].collectionComponentId;
    if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
      var collectionPagination = componentStates[collectionComponentId].pagination;
      params.append('sortFieldName', collectionPagination.sortBy);
      params.append('sortDesc', collectionPagination.descending);
    }
    this.httpPostAjax(searchUrl, params, {
      onSuccess: function (response) {
        if (componentStates[collectionComponentId].pagination) {
          var collectionPagination = componentStates[collectionComponentId].pagination;
          collectionPagination.page = 1; // reset page
          collectionPagination.rowsNumber = response.data.model[contextKey + '_list'].length;
        }
      }
    });
  }, 400),
  showMore: function (componentId) {
    let componentStates = this.$data.componentStates;
    var showMoreCount = componentStates[componentId].pagination.showMoreCount;
    if (showMoreCount) {
      // nothing to do
    } else {
      showMoreCount = 1;
      componentStates[componentId].pagination.showMoreCount = showMoreCount;
    }
    componentStates[componentId].pagination.rowsPerPage = componentStates[componentId].pagination.rowsPerPage / showMoreCount * (showMoreCount + 1);
  },
  vueDataToArray(value) {
    if (Array.isArray(value)) {
      return value;
    } else if (value) {
      return [value];
    }
    return [];
  },
  obtainVueDataAccessor(referer, object, field, rowIndex) {
    if (field != null && field != 'null') {
      if (rowIndex != null) {
        return {
          get: function () {
            return referer.$data.vueData[object][rowIndex][field];
          },
          set: function (newData) {
            referer.$data.vueData[object][rowIndex][field] = newData;
          }
        };
      } else {
        return {
          get: function () {
            return referer.$data.vueData[object][field];
          },
          set: function (newData) {
            referer.$data.vueData[object][field] = newData;
          }
        };
      }
    } else {
      return {
        get: function () {
          return referer.$data.vueData[object];
        },
        set: function (newData) {
          referer.$data.vueData[object] = newData;
        }
      };
    }
  },
  uploader_changeIcon() {
    this.$q.iconSet.uploader.removeUploaded = 'delete_sweep';
    this.$q.iconSet.uploader.done = 'delete';
  },
  uploader_mounted(componentId, object, field, rowIndex) {
    this.uploader_changeIcon();
    var component = this.$refs[componentId];
    //must removed duplicate
    component.vueDataAccessor = this.obtainVueDataAccessor(this, object, field, rowIndex);
    var vueDataAccessor = component.vueDataAccessor;
    var curValue = vueDataAccessor.get();
    if (!Array.isArray(curValue)) {
      vueDataAccessor.set(this.vueDataToArray(curValue));
    }
    vueDataAccessor.set(vueDataAccessor.get().filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    }));
    vueDataAccessor.get().forEach(function (uri) {
      var xhrParams = {};
      xhrParams[component.fieldName] = uri;
      this.$http.get(component.url, {
        params: xhrParams,
        credentials: component.withCredentials
      }).then(function (response) {
        //Ok
        var fileData = response.data;
        if (component.files.some(file => file.name === fileData.name)) {
          console.warn("Component doesn't support duplicate file ", fileData);
        } else {
          fileData.__sizeLabel = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.format.humanStorageSize(fileData.size);
          fileData.__progressLabel = '100%';
          component.files.push(fileData);
          component.uploadedFiles.push(fileData);
          this.uploader_forceComputeUploadedSize(componentId);
        }
      }.bind(this)).catch(function (error) {
        //Ko
        if (error.response) {
          this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't load file " + uri);
        } else {
          this.$q.notify(error + " Can't load file " + uri);
        }
      }.bind(this));
    }.bind(this));
  },
  uploader_dragenter(componentId) {
    let componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = true;
  },
  uploader_dragleave(componentId) {
    let componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = false;
  },
  uploader_drop(event, componentId) {
    var component = this.$refs[componentId];
    component.addFiles(event.dataTransfer.files);
  },
  uploader_forceComputeUploadedSize: function (componentId) {
    var component = this.$refs[componentId];
    //recompute totalSize
    component.uploadedSize = 0;
    component.uploadedFiles.forEach(function (file) {
      component.uploadedSize += file.size;
    });
    component.uploadSize = component.uploadedSize;
    component.queuedFiles.forEach(function (file) {
      component.uploadSize += file.size;
    });
  },
  uploader_humanStorageSize: function (size) {
    return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default().utils.format.humanStorageSize(size);
  },
  uploader_addedFile: function (isMultiple, componentId) {
    if (!isMultiple) {
      var component = this.$refs[componentId];
      var vueDataAccessor = component.vueDataAccessor;
      component.removeUploadedFiles();
      vueDataAccessor.set([]);
    }
  },
  uploader_uploadedFiles: function (uploadInfo, componentId) {
    var component = this.$refs[componentId];
    var vueDataAccessor = component.vueDataAccessor;
    uploadInfo.files.forEach(function (file) {
      file.fileUri = file.xhr.response;
      vueDataAccessor.get().push(file.fileUri);
    }.bind(this));
  },
  uploader_failedFiles: function (uploadInfo) {
    uploadInfo.files.forEach(function (file) {
      this.onAjaxError({
        status: file.xhr.status,
        statusText: file.xhr.statusText,
        data: JSON.parse(file.xhr.response)
      });
      //server can return : a response with a uiMessageStack object or directly the uiMessageStack
      /*let uiMessageStack = response.globalErrors?response:response.uiMessageStack;
      Object.keys(uiMessageStack).forEach(function (key) {
          this.$data.uiMessageStack[key] = uiMessageStack[key];
      }.bind(this));*/
    }.bind(this));
  },
  uploader_removeFiles: function (removedFiles, componentId) {
    var component = this.$refs[componentId];
    var vueDataAccessor = component.vueDataAccessor;
    var dataFileUris = vueDataAccessor.get();
    removedFiles.forEach(function (removedFile) {
      if (removedFile.fileUri) {
        //if file is serverside
        var indexOfFileUri = dataFileUris.indexOf(removedFile.fileUri);
        var xhrParams = {};
        xhrParams[component.fieldName] = removedFile.fileUri;
        this.$http.delete(component.url, {
          params: xhrParams,
          credentials: component.withCredentials
        }).then(function /*response*/
        () {
          //Ok
          if (component.multiple) {
            dataFileUris.splice(indexOfFileUri, 1);
          } else {
            dataFileUris.splice(0);
          }
          this.uploader_forceComputeUploadedSize(componentId);
        }.bind(this)).catch(function (error) {
          //Ko
          this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't remove temporary file");
        }.bind(this));
      }
    }.bind(this));
  },
  httpPostAjax: function (url, paramsIn, options) {
    var paramsInResolved = Array.isArray(paramsIn) ? this.vueDataParams(paramsIn) : paramsIn;
    let vueData = this.$data.vueData;
    let uiMessageStack = this.$data.uiMessageStack;
    let params = this.isFormData(paramsInResolved) ? paramsInResolved : this.objectToFormData(paramsInResolved);
    params.append('CTX', vueData.CTX);
    this.pushPendingAction(url);
    this.$http.post(url, params).then(function (response) {
      if (response.data.model.CTX) {
        vueData.CTX = response.data.model.CTX;
      }
      Object.keys(response.data.model).forEach(function (key) {
        if ('CTX' != key) {
          vueData[key] = response.data.model[key];
        }
      });
      Object.keys(response.data.uiMessageStack).forEach(function (key) {
        uiMessageStack[key] = response.data.uiMessageStack[key];
      });
      if (options && options.onSuccess) {
        options.onSuccess.call(this, response);
      }
    }.bind(this)).catch(function (error) {
      if (options && options.onError) {
        options.onError.call(this, error.response);
      }
    }).finally(function () {
      this.removePendingAction(url);
    }.bind(this));
  },
  isPendingAction: function (actionName) {
    if (actionName) {
      return this.$data.componentStates.pendingAction.actionNames.includes(actionName);
    } else {
      return this.$data.componentStates.pendingAction.actionNames.length > 0;
    }
  },
  pushPendingAction: function (actionName) {
    this.$data.componentStates.pendingAction.actionNames.push(actionName);
  },
  removePendingAction: function (actionName) {
    this.$data.componentStates.pendingAction.actionNames = this.$data.componentStates.pendingAction.actionNames.filter(e => e !== actionName);
  },
  hasFieldsError: function (object, field, rowIndex) {
    const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;
      return Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field) && fieldsErrors[objectName][field].length > 0;
    }
    return false;
  },
  getErrorMessage: function (object, field, rowIndex) {
    const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;
      if (Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field)) {
        return fieldsErrors[objectName][field].join(', ');
      }
    } else {
      return '';
    }
  },
  vueDataParams: function (keys) {
    var params = new FormData();
    for (var i = 0; i < keys.length; i++) {
      var attribs = keys[i].split('.', 2);
      var contextKey = attribs[0];
      var attribute = attribs[1];
      var vueDataValue = this.$data.vueData[contextKey];
      if (vueDataValue && typeof vueDataValue === 'object' && Array.isArray(vueDataValue) === false) {
        // object
        if (!attribute) {
          Object.keys(vueDataValue).forEach(function (propertyKey) {
            if (!propertyKey.includes("_")) {
              //  properties taht start with _ are private and don't belong to the serialized entity
              // we filter field with modifiers (like <field>_display and <field>_fmt)
              this._vueDataParamsKey(params, contextKey, propertyKey, vueDataValue);
            }
          }.bind(this));
        } else {
          this._vueDataParamsKey(params, contextKey, attribute, vueDataValue);
        }
      } else {
        //primitive
        this.appendToFormData(params, 'vContext[' + contextKey + ']', vueDataValue);
      }
    }
    return params;
  },
  _vueDataParamsKey: function (params, contextKey, propertyKey, vueDataValue) {
    let vueDataFieldValue = vueDataValue[propertyKey];
    if (Array.isArray(vueDataFieldValue)) {
      if (!vueDataFieldValue || vueDataFieldValue.length == 0) {
        this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', ""); // reset array with an empty string
      } else {
        vueDataFieldValue.forEach(function (value, index) {
          if (vueDataFieldValue[index] && typeof vueDataFieldValue[index] === 'object') {
            this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]['_v_inputValue']);
          } else {
            this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]);
          }
        }.bind(this));
      }
    } else {
      if (vueDataFieldValue && typeof vueDataFieldValue === 'object') {
        this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue['_v_inputValue']);
      } else {
        this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue);
      }
    }
  },
  objectToFormData: function (object) {
    const formData = new FormData();
    Object.keys(object).forEach(function (key) {
      this.appendToFormData(formData, key, object[key]);
    }.bind(this));
    return formData;
  },
  appendToFormData: function (formData, name, value) {
    if (value != null) {
      formData.append(name, value);
    } else {
      formData.append(name, "");
    }
  },
  isFormData: function (val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  },
  /**
   * Capture the <CTL-V> paste event, only allow plain-text, no images.         *
   * see: https://stackoverflow.com/a/28213320         *
   * @param {object} evt - array of files
   * @author Daniel Thompson-Yvetot
   * @license MIT
   */
  pastePlainTextCapture(evt, editorRef) {
    // Let inputs do their thing, so we don't break pasting of links.
    if (evt.target.nodeName === 'INPUT') return;
    let text, onPasteStripFormattingIEPaste;
    evt.preventDefault();
    if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
      text = evt.originalEvent.clipboardData.getData('text/plain');
      this.$refs[editorRef].runCmd('insertText', text);
    } else if (evt.clipboardData && evt.clipboardData.getData) {
      text = evt.clipboardData.getData('text/plain');
      this.$refs[editorRef].runCmd('insertText', text);
    } else if (window.clipboardData && window.clipboardData.getData) {
      if (!onPasteStripFormattingIEPaste) {
        onPasteStripFormattingIEPaste = true;
        this.$refs[editorRef].runCmd('ms-pasteTextOnly', text);
      }
      onPasteStripFormattingIEPaste = false;
    }
  },
  editorHandlerFixHelper(tags, regexp, doBlockName, undoBlockName, eVm, caret) {
    if (caret.hasParents(tags, true)) {
      eVm.runCmd('formatBlock', undoBlockName);
      if (!caret.range.commonAncestorContainer.hasChildNodes()) {
        var currentNode = caret.selection.focusNode.parentNode;
        while (currentNode && currentNode !== caret.el) {
          if (tags.includes(currentNode.nodeName.toLowerCase())) {
            currentNode.outerHTML = currentNode.outerHTML.replace(regexp, "");
          }
          currentNode = currentNode.parentNode;
        }
      } else {
        var inSelection = false;
        var startNode = caret.range.startContainer;
        while (startNode && startNode !== caret.el && startNode.parentNode !== caret.range.commonAncestorContainer) {
          startNode = startNode.parentNode;
        }
        var endNode = caret.range.endContainer;
        while (endNode && endNode !== caret.el && endNode.parentNode !== caret.range.commonAncestorContainer) {
          endNode = endNode.parentNode;
        }
        caret.range.commonAncestorContainer.childNodes.forEach(function (currentNode) {
          if (currentNode === startNode) {
            inSelection = true;
          }
          if (inSelection) {
            currentNode.outerHTML = currentNode.outerHTML.replace(regexp, "");
          }
          if (currentNode === endNode) {
            inSelection = false;
          }
        });
      }
    } else {
      eVm.runCmd('formatBlock', doBlockName);
    }
  },
  editorHandlerBlockquoteFix(e, eVm, caret) {
    this.editorHandlerFixHelper(['blockquote'], /<\/?blockquote[^>]*\/?>/g, 'blockquote', 'div', eVm, caret);
  },
  editorHandlerParagrapheFix(e, eVm, caret) {
    this.editorHandlerFixHelper(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'], /<\/?h[1-9][^>]*\/?>/g, 'div', 'div', eVm, caret);
  }
});
;// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-en-us.js
/* harmony default export */ var vertigo_ui_lang_en_us = ({
  comments: {
    title: "Comments",
    inputLabel: "Insert here a comment",
    actionlabel: "Publish",
    cancel: "Cancel",
    save: "Save"
  },
  chatbot: {
    errorMessage: "An error occured sending the message",
    tryAgain: "Try again",
    suggestedAnswers: "Suggested answers",
    inputPlaceHolder: "Enter here a message",
    restartMessage: "Conversation is restarting"
  },
  facets: {
    showAll: "Show all",
    showLess: "Show less"
  },
  notifications: {
    days: "days",
    hours: "hours",
    minutes: "min",
    seconds: "s"
  },
  commands: {
    globalPlaceholder: "Type / to show all available commands",
    executeCommand: "Press Enter to execute command",
    linkLabel: "Show details"
  },
  "uploader": {
    "clear_all": "Clear All",
    "removeUploaded": "Remove Uploaded Files",
    "remove": "Remove",
    "add": "Pick Files",
    "upload": "Upload Files",
    "clear": "Abort Upload"
  },
  handles: {
    placeholder: "Enter a handle : format is type/code"
  }
});
;// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-fr.js
/* harmony default export */ var vertigo_ui_lang_fr = ({
  comments: {
    title: "Commentaires",
    inputLabel: "Insérer un commentaire ici",
    actionlabel: "Publier",
    cancel: "Annuler",
    save: "Sauver"
  },
  chatbot: {
    errorMessage: "Une erreur est survenue lors de l'envoi du message",
    tryAgain: "Essayez de nouveau",
    suggestedAnswers: "Réponses suggérées",
    inputPlaceHolder: "Ecrire un message",
    restartMessage: "Redémarrage de la conversation"
  },
  facets: {
    showAll: "Voir plus",
    showLess: "Voir moins"
  },
  notifications: {
    days: "jours",
    hours: "heures",
    minutes: "min",
    seconds: "s"
  },
  commands: {
    globalPlaceholder: "Taper / pour afficher les commandes disponibles",
    executeCommand: "Appuyer sur entrée pour executer la commande",
    linkLabel: "Voir les détails"
  },
  "uploader": {
    "clear_all": "Annuler tous",
    "removeUploaded": "Supprimer tous",
    "remove": "Supprimer",
    "add": "Ajouter un fichier",
    "upload": "Envoyer",
    "clear": "Annuler"
  },
  handles: {
    placeholder: "Entrer un handle de la forme type/code"
  }
});
;// CONCATENATED MODULE: ./src/main.js





















function getBoundMethods(obj, methods) {
  let boundMethods = {};
  Object.keys(methods).forEach(methodName => boundMethods[methodName] = methods[methodName].bind(obj));
  return boundMethods;
}
function install(Vue, options) {
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
  Vue.component("v-map-layer", VMapLayer);
  Vue.component("v-tree", VTree);

  // directives
  Vue.directive("alert-unsaved-updates", VAlertUnsavedUpdates);
  Vue.directive("autofocus", VAutofocus);
  Vue.directive("if-unsaved-updates", VIfUnsavedUpdates);
  Vue.directive("minify", VMinify);
  Vue.directive("scroll-spy", VScrollSpy);
  if (!options.axios) {
    console.error('You have to install axios');
    return;
  }
  Vue.axios = options.axios;
  Vue.$http = options.axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return options.axios;
      }
    },
    $http: {
      get() {
        return options.axios;
      }
    },
    $vui: {
      get() {
        return getBoundMethods(this, methods);
      }
    }
  });
  if ((external_commonjs_quasar_commonjs2_quasar_root_Quasar_default()).lang.enUs) {
    (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default()).lang.enUs.vui = vertigo_ui_lang_en_us;
  }
  if ((external_commonjs_quasar_commonjs2_quasar_root_Quasar_default()).lang.fr) {
    (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default()).lang.fr.vui = vertigo_ui_lang_fr;
  }
}
let main_methods = methods;
function initData(instance, json) {
  instance.vueData = json.vueData;
  instance.componentStates = json.componentStates;
  instance.uiMessageStack = json.uiMessageStack;
  instance.vuiLang = json.vuiLang;
}
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js



}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vertigo-ui.common.js.map