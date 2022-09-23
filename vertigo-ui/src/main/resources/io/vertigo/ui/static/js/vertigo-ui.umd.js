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

/***/ "00b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "01b4":
/***/ (function(module, exports) {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var NATIVE_BIND = __webpack_require__("40d5");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "04d1":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__("c6b6");
var toIndexedObject = __webpack_require__("fc6a");
var $getOwnPropertyNames = __webpack_require__("241c").f;
var arraySlice = __webpack_require__("4dae");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var call = __webpack_require__("c65b");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

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

/***/ "07fa":
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__("50c4");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "0b42":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "0cb2":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "0f55":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0f55__;

/***/ }),

/***/ "107c":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var getMethod = __webpack_require__("dc4a");
var arraySlice = __webpack_require__("4dae");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var stickyHelpers = __webpack_require__("9f7f");
var fails = __webpack_require__("d039");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ "129f":
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "1626":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "19aa":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isPrototypeOf = __webpack_require__("3a9b");

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ "1a2d":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


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
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
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

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d80":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
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

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var tryToString = __webpack_require__("0d51");
var isArrayIteratorMethod = __webpack_require__("e95a");
var lengthOfArrayLike = __webpack_require__("07fa");
var isPrototypeOf = __webpack_require__("3a9b");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var iteratorClose = __webpack_require__("2a62");

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

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
  options.name        - the .name of the function if it does not match the key
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
      if (typeof sourceProperty == typeof targetProperty) continue;
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
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var correctIsRegExpLogic = __webpack_require__("ab13");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var isPrototypeOf = __webpack_require__("3a9b");
var $toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var regExpFlags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
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

/***/ "2a62":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var getMethod = __webpack_require__("dc4a");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "2ba4":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "2ca0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");
var IS_PURE = __webpack_require__("c430");

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var bind = __webpack_require__("0366");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var fails = __webpack_require__("d039");
var html = __webpack_require__("1be4");
var arraySlice = __webpack_require__("f36a");
var createElement = __webpack_require__("cc12");
var IS_IOS = __webpack_require__("1cdc");
var IS_NODE = __webpack_require__("605d");

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
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
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(isCallable(fn) ? fn : Function(fn), undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
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
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
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

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var getMethod = __webpack_require__("dc4a");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("aed9");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var toIndexedObject = __webpack_require__("fc6a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "3a9b":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var toString = __webpack_require__("577e");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
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

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "40d5":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
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
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
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
    arguments.length == 1 ? console.error(a) : console.error(a, b);
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
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aConstructor = __webpack_require__("5087");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

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

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

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

/***/ "4dae":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var isConstructor = __webpack_require__("68ee");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "4e82":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var internalSort = __webpack_require__("addb");
var arrayMethodIsStrict = __webpack_require__("a640");
var FF = __webpack_require__("04d1");
var IE_OR_EDGE = __webpack_require__("d998");
var V8 = __webpack_require__("2d00");
var WEBKIT = __webpack_require__("512c");

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ "5087":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isConstructor = __webpack_require__("68ee");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "512c":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var fails = __webpack_require__("d039");
var anObject = __webpack_require__("825a");
var isCallable = __webpack_require__("1626");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var getMethod = __webpack_require__("dc4a");
var getSubstitution = __webpack_require__("0cb2");
var regExpExec = __webpack_require__("14c3");
var wellKnownSymbol = __webpack_require__("b622");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "577e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var classof = __webpack_require__("f5df");

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var whitespaces = __webpack_require__("5899");

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5926":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isRegExp = __webpack_require__("44e7");

var TypeError = global.TypeError;

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

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var hasOwn = __webpack_require__("1a2d");

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

/***/ "605d":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var global = __webpack_require__("da84");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "6069":
/***/ (function(module, exports) {

module.exports = typeof window == 'object';


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0b42");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "68ee":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("f5df");
var getBuiltIn = __webpack_require__("d066");
var inspectSource = __webpack_require__("8925");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var hasOwn = __webpack_require__("1a2d");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

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
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
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

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var createNonEnumerableProperty = __webpack_require__("9112");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
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
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var hasOwn = __webpack_require__("1a2d");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
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

/***/ "785a":
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__("cc12");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var requireObjectCoercible = __webpack_require__("1d80");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
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

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("825a");
var definePropertiesModule = __webpack_require__("37e8");
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
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var IS_PURE = __webpack_require__("c430");
var FunctionName = __webpack_require__("5e77");
var isCallable = __webpack_require__("1626");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
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
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

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

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("a04b");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "841c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__("c65b");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var sameValue = __webpack_require__("129f");
var toString = __webpack_require__("577e");
var getMethod = __webpack_require__("dc4a");
var regExpExec = __webpack_require__("14c3");

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

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
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
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

var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "90e3":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
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

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var toString = __webpack_require__("577e");
var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var shared = __webpack_require__("5692");
var create = __webpack_require__("7c73");
var getInternalState = __webpack_require__("69f3").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var UNSUPPORTED_NCG = __webpack_require__("107c");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
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

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

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

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var aCallable = __webpack_require__("59ed");
var anObject = __webpack_require__("825a");
var tryToString = __webpack_require__("0d51");
var getIteratorMethod = __webpack_require__("35a1");

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var iteratorClose = __webpack_require__("2a62");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("aed9");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

var TypeError = global.TypeError;
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

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var toAbsoluteIndex = __webpack_require__("23cb");
var toIntegerOrInfinity = __webpack_require__("5926");
var lengthOfArrayLike = __webpack_require__("07fa");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
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
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
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

/***/ "a4b4":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var fails = __webpack_require__("d039");
var hasOwn = __webpack_require__("1a2d");
var isArray = __webpack_require__("e8b5");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var $toString = __webpack_require__("577e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var definePropertiesModule = __webpack_require__("37e8");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var arraySlice = __webpack_require__("f36a");
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
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

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
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
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
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
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
// https://tc39.es/ecma262/#sec-json.stringify
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
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
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
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var hasOwn = __webpack_require__("1a2d");
var inheritIfRequired = __webpack_require__("7156");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var thisNumberValue = __webpack_require__("408a");
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
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
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ab36":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
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

/***/ "addb":
/***/ (function(module, exports, __webpack_require__) {

var arraySlice = __webpack_require__("4dae");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var create = __webpack_require__("7c73");
var getPrototypeOf = __webpack_require__("e163");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "aed9":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");

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

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var FUNCTION_NAME_EXISTS = __webpack_require__("5e77").EXISTS;
var uncurryThis = __webpack_require__("e330");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
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
var bind = __webpack_require__("0366");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");
var IS_IOS_PEBBLE = __webpack_require__("d4c3");
var IS_WEBOS_WEBKIT = __webpack_require__("a4b4");
var IS_NODE = __webpack_require__("605d");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
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

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
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
var hasOwn = __webpack_require__("1a2d");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
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
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var thisNumberValue = __webpack_require__("408a");
var $repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "b980":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var TypeError = global.TypeError;
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
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c65b":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
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

/***/ "c770":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


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

var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

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

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
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

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

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

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__("e330");
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
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
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var hasOwn = __webpack_require__("1a2d");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d4c3":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");
var global = __webpack_require__("da84");

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var uncurryThis = __webpack_require__("e330");
var redefine = __webpack_require__("6eeb");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
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
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "d998":
/***/ (function(module, exports, __webpack_require__) {

var UA = __webpack_require__("342f");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "d9e2":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var wrapErrorConstructorWithCause = __webpack_require__("e5cb");

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
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
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var toString = __webpack_require__("577e");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
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

var global = __webpack_require__("da84");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
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
var defineProperty = __webpack_require__("9bf2").f;
var defineIterator = __webpack_require__("7dd0");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
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
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e330":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "e391":
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__("577e");

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e5cb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var hasOwn = __webpack_require__("1a2d");
var createNonEnumerableProperty = __webpack_require__("9112");
var isPrototypeOf = __webpack_require__("3a9b");
var setPrototypeOf = __webpack_require__("d2bb");
var copyConstructorProperties = __webpack_require__("e893");
var inheritIfRequired = __webpack_require__("7156");
var normalizeStringArgument = __webpack_require__("e391");
var installErrorCause = __webpack_require__("ab36");
var clearErrorStack = __webpack_require__("c770");
var ERROR_STACK_INSTALLABLE = __webpack_require__("b980");
var IS_PURE = __webpack_require__("c430");

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


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
var call = __webpack_require__("c65b");
var NativePromise = __webpack_require__("fea9");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var aCallable = __webpack_require__("59ed");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var anInstance = __webpack_require__("19aa");
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
var Queue = __webpack_require__("01b4");
var InternalStateModule = __webpack_require__("69f3");
var isForced = __webpack_require__("94ca");
var wellKnownSymbol = __webpack_require__("b622");
var IS_BROWSER = __webpack_require__("6069");
var IS_NODE = __webpack_require__("605d");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';

var getInternalState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromisePrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
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
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
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
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
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

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    // eslint-disable-next-line unicorn/no-thenable -- safe
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
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
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
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
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("1a2d");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

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

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
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

/***/ "e9c4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var apply = __webpack_require__("2ba4");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");

var Array = global.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];
      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__("59ed");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f36a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var isCallable = __webpack_require__("1626");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

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
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
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
__webpack_require__.d(__webpack_exports__, "initData", function() { return /* reexport */ initData; });

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: external {"commonjs":"quasar","commonjs2":"quasar","root":"Quasar"}
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_ = __webpack_require__("7c52");
var external_commonjs_quasar_commonjs2_quasar_root_Quasar_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_quasar_commonjs2_quasar_root_Quasar_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VChatbot.vue?vue&type=template&id=26be0710&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bot"},[_c('q-scroll-area',{ref:"scroller",staticClass:"bg-grey-2 col-grow row q-pa-sm"},[_c('div',{staticClass:"q-pr-md"},[_vm._l((_vm.messages),function(msg,index){return _c('div',{key:index},[(msg.rating)?_c('q-chat-message',{key:'msgRating-'+index,staticClass:"animate-fade",attrs:{"sent":msg.sent,"bg-color":msg.bgColor,"avatar":msg.avatar}},[_c('q-rating',{staticStyle:{"font-size":"2rem"},attrs:{"max":5,"readonly":""},model:{value:(msg.rating),callback:function ($$v) {_vm.$set(msg, "rating", $$v)},expression:"msg.rating"}})],1):_vm._e(),(msg.text)?_c('q-chat-message',{key:'msg-'+index,staticClass:"animate-fade",attrs:{"label":msg.label,"sent":msg.sent,"text-color":msg.textColor,"bg-color":msg.bgColor,"name":msg.name,"avatar":msg.avatar,"text":msg.text,"stamp":msg.stamp}}):_vm._e()],1)}),_c('div',{staticClass:"sys-chat"},[(_vm.error)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"orange-4","text-color":"black","size":"12"}},[_c('div',{staticClass:"q-pb-sm"},[_vm._v(" "+_vm._s(_vm.$q.lang.vui.chatbot.errorMessage)+" ")]),_c('q-btn',{staticClass:"full-width",attrs:{"label":_vm.$q.lang.vui.chatbot.tryAgain,"color":"white","text-color":"black"},on:{"click":function($event){return _vm.askBot(_vm.lastPayload)}}})],1):_vm._e()],1),_c('div',{staticClass:"sys-chat non-selectable"},[(_vm.inputConfig.buttons.length > 0)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"primary","size":"12"}},[_c('div',{staticClass:"text-blue-2 q-caption"},[_vm._v(" "+_vm._s(_vm.$q.lang.vui.suggestedAnswers)+" ")]),_c('div',{staticClass:"row docs-btn"},_vm._l((_vm.inputConfig.buttons),function(btn,index){return _c('q-btn',{key:'repChatBtn-'+index,staticClass:"full-width",attrs:{"label":btn.title,"color":"white","text-color":"black"},on:{"click":function($event){return _vm.postAnswerBtn(btn)}}})}),1)]):_vm._e()],1),_c('div',{staticClass:"message-processing sys-chat non-selectable"},[(_vm.processing)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"grey-4"}},[_c('q-spinner-dots',{attrs:{"size":"2em"}})],1):_vm._e()],1),_c('div',{staticClass:"non-selectable"},[(_vm.inputConfig.showRating)?_c('q-chat-message',{staticClass:"animate-fade",attrs:{"bg-color":"primary","sent":""}},[_c('q-rating',{staticStyle:{"font-size":"2rem"},attrs:{"max":4},model:{value:(_vm.rating),callback:function ($$v) {_vm.rating=$$v},expression:"rating"}})],1):_vm._e()],1)],2)]),_c('div',{staticClass:"message-response row docs-btn q-pl-sm non-selectable"},[_c('q-input',{ref:"input",staticClass:"col-grow",attrs:{"type":_vm.inputConfig.modeTextarea ? 'textarea' : 'text',"max-height":100,"placeholder":_vm.$q.lang.vui.chatbot.inputPlaceholder,"disable":_vm.processing || _vm.error,"loading":_vm.processing},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }_vm.inputConfig.modeTextarea ? false : (_vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0) ? false : _vm.postAnswerText()}},model:{value:(_vm.inputConfig.responseText),callback:function ($$v) {_vm.$set(_vm.inputConfig, "responseText", $$v)},expression:"inputConfig.responseText"}}),_c('q-btn',{attrs:{"round":"","color":"primary","icon":"send","disable":_vm.processing || (_vm.inputConfig.responseText.trim() === '' && _vm.inputConfig.rating === 0)},on:{"click":function($event){return _vm.postAnswerText()}}}),(_vm.devMode === true)?_c('q-btn',{attrs:{"round":"","color":"red","icon":"refresh"},on:{"click":_vm.restart}}):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VChatbot.vue?vue&type=template&id=26be0710&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VChatbot.vue?vue&type=script&lang=js&









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
      }.bind(this));
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

var VChatbot_component = normalizeComponent(
  components_VChatbotvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VChatbot = (VChatbot_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VCommands.vue?vue&type=template&id=8b078d18&
var VCommandsvue_type_template_id_8b078d18_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.isCommandCommited)?_c('q-select',{ref:"commandInput",attrs:{"placeholder":_vm.$q.lang.vui.commands.globalPlaceholder,"outlined":"","bg-color":"white","dense":"","autofocus":"","dropdown-icon":"search","use-input":"","input-debounce":"300","hide-selected":"","options":_vm.commandAutocompleteOptions},on:{"blur":_vm.reset,"filter":_vm.searchCommands,"input":_vm.selectCommand},nativeOn:{"keydown":function($event){return _vm.commitCommand.apply(null, arguments)}}},[(_vm.text !== '' && _vm.selectedCommand.commandName && _vm.selectedCommand.commandName.startsWith(_vm.text))?_c('span',{staticStyle:{"line-height":"40px","opacity":"0.5","position":"fixed"}},[_vm._v(_vm._s(_vm.selectedCommand.commandName))]):_vm._e()]):_c('div',{staticClass:"row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.executeCommand.apply(null, arguments)}}},[_c('div',{staticClass:"bg-grey-4 text-center vertical-middle text-bold q-px-md",staticStyle:{"line-height":"40px"}},[_vm._v(_vm._s(_vm.selectedCommand.commandName))]),(!_vm.isExecuted)?_c('div',{staticClass:"row col items-center q-py-xs"},[(_vm.selectedCommand.commandParams && _vm.selectedCommand.commandParams.length > 0)?[_vm._l((_vm.selectedCommand.commandParams),function(param,index){return [(param.paramType.rawType === 'io.vertigo.commons.command.GenericUID')?[_c('q-select',{key:param,staticClass:"col q-px-xs",staticStyle:{"height":"32px"},attrs:{"use-chips":"","bg-color":"white","dense":"","borderless":"","use-input":"","input-debounce":"300","value":_vm.getParamValue(index),"options":_vm.paramsAutocompleteOptions[index],"autofocus":index === 0,"dropdown-icon":"search"},on:{"filter":function(val, update, abort) { _vm.autocompleteParam(param, index, val, update, abort);},"input":function (newValue) { _vm.selectParam(newValue, index)}},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)}).apply(null, arguments)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)}).apply(null, arguments)}}})]:[_c('q-input',{key:param,staticClass:"col q-px-xs",staticStyle:{"height":"32px"},attrs:{"color":"secondary","borderless":"","autofocus":index === 0,"dense":""},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)}).apply(null, arguments)},"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return (function(event) {_vm.backIfNeeded(event, index === 0)}).apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleEnter(index)}]},model:{value:(_vm.commandParamsValues[index].value),callback:function ($$v) {_vm.$set(_vm.commandParamsValues[index], "value", $$v)},expression:"commandParamsValues[index].value"}})],_c('q-separator',{key:param,attrs:{"vertical":""}})]})]:_c('div',{staticClass:"col"},[_vm._v(_vm._s(_vm.$q.lang.vui.commands.executeCommand))]),_c('q-btn',{attrs:{"flat":"","icon":"play_arrow","size":"sm","round":""},on:{"click":_vm.executeCommand}})],2):_c('div',{staticClass:"row col items-center"},[_c('div',{staticClass:"col shadow-2 bg-secondary text-white q-px-md",staticStyle:{"line-height":"40px"}},[_vm._v(_vm._s(_vm.commandResult.display))]),(_vm.commandResult.targetUrl)?_c('q-btn',{attrs:{"type":"a","href":_vm.baseUrl + _vm.commandResult.targetUrl,"flat":""}},[_vm._v(_vm._s(_vm.$q.lang.vui.commands.linkLabel))]):_vm._e(),_c('q-btn',{attrs:{"flat":"","icon":"cancel","size":"sm","round":""},on:{"click":_vm.reset}})],1)])],1)}
var VCommandsvue_type_template_id_8b078d18_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VCommands.vue?vue&type=template&id=8b078d18&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VCommands.vue?vue&type=script&lang=js&



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
          this.$data.commandResult = response.data;
        }.bind(this));
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
  VCommandsvue_type_template_id_8b078d18_render,
  VCommandsvue_type_template_id_8b078d18_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VCommands = (VCommands_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VComments.vue?vue&type=template&id=57976546&
var VCommentsvue_type_template_id_57976546_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_c('q-btn',{staticClass:"on-left",attrs:{"round":"","size":"lg","color":"primary","textColor":"white","icon":_vm.count>0?_vm.icon:_vm.iconNone},on:{"click":function($event){_vm.commentDrawer = !_vm.commentDrawer}}},[(_vm.count>0)?_c('q-badge',{staticStyle:{"right":"-.4em","top":"-.4em"},attrs:{"floating":"","small":"","color":"red"}},[_vm._v(_vm._s(_vm.count))]):_vm._e()],1),_c('q-drawer',{staticStyle:{"top":"58px"},attrs:{"overlay":"","behavior":"mobile","width":600,"side":"right"},model:{value:(_vm.commentDrawer),callback:function ($$v) {_vm.commentDrawer=$$v},expression:"commentDrawer"}},[_c('q-list',[_c('q-item-label',{attrs:{"header":""}},[_c('big',[_vm._v(_vm._s(_vm.$q.lang.vui.comments.title))])],1),_c('q-item',[_c('q-item-section',[_c('q-input',{staticClass:"col",attrs:{"type":"textarea","autogrow":"","label":_vm.$q.lang.vui.comments.inputLabel,"stack-label":""},model:{value:(_vm.commentTextArea),callback:function ($$v) {_vm.commentTextArea=$$v},expression:"commentTextArea"}})],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-btn',{attrs:{"color":"primary","round":"","icon":"send","title":_vm.$q.lang.vui.comments.actionLabel,"aria-label":_vm.$q.lang.vui.comments.actionLabel},on:{"click":_vm.publishComment}})],1)],1),_c('q-separator'),_vm._l((_vm.list),function(comment){return _c('q-item',{key:comment.uuid,staticClass:"items-start",class:{'cursor-pointer': comment.author==_vm.connectedAccount}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-avatar',[_c('img',{attrs:{"src":_vm.baseUrl+'x/accounts/api/'+comment.author+'/photo'}})])],1),_c('q-item-section',[_c('q-item-label',[_vm._v(_vm._s(comment.authorDisplayName))]),_c('div',[_vm._v(" "+_vm._s(comment.msg)+" ")])],1),_c('q-item-section',{attrs:{"side":""}},[_c('q-item-label',{attrs:{"stamp":""}},[_vm._v(_vm._s(_vm.toDelay(new Date(comment.creationDate))))]),(comment.author==_vm.connectedAccount)?_c('q-icon',{attrs:{"name":"edit"}}):_vm._e()],1),(comment.author==_vm.connectedAccount)?_c('q-popup-edit',{attrs:{"buttons":true,"label-cancel":_vm.$q.lang.vui.comments.cancel,"label-set":_vm.$q.lang.vui.comments.save},on:{"save":function($event){return _vm.updateComment(comment)}}},[_c('q-input',{attrs:{"type":"textarea","autogrow":"","dense":""},model:{value:(comment.msg),callback:function ($$v) {_vm.$set(comment, "msg", $$v)},expression:"comment.msg"}})],1):_vm._e()],1)})],2)],1)],1)}
var VCommentsvue_type_template_id_57976546_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VComments.vue?vue&type=template&id=57976546&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VComments.vue?vue&type=script&lang=js&
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
        this.list = response.data;
        this.count = this.list.length;
      }.bind(this));
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
        }.bind(this));
      }
    },
    updateComment: function updateComment(newComment) {
      this.$http.put(this.baseUrl + 'x/comment/api/comments/' + newComment.uuid, newComment).then(function () {
        //Ok
        this.commentTextArea = '';
        this.fetchCommentsList();
      }.bind(this));
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
  VCommentsvue_type_template_id_57976546_render,
  VCommentsvue_type_template_id_57976546_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VComments = (VComments_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=template&id=043c22d7&
var VExtensionsStorevue_type_template_id_043c22d7_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row q-col-gutter-md"},_vm._l((_vm.extensions),function(extension){return _c('div',{key:extension.name,staticClass:"col-xs-12 col-lg-6 col-xl-4"},[_c('q-card',[_c('q-item',{staticClass:"bg-white",staticStyle:{"height":"100px"}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{style:(_vm.getIconStyle(extension.color)),attrs:{"name":extension.icon,"size":"40px"}})],1),_c('q-item-section',[_c('div',{staticClass:"row col items-center"},[_c('div',{staticClass:"q-subheading text-bold"},[_vm._v(_vm._s(extension.label))]),_c('div',{staticClass:"col"}),_c('div',[_c('q-toggle',{attrs:{"disable":"","readonly":"","color":"positive"},model:{value:(extension.enabled),callback:function ($$v) {_vm.$set(extension, "enabled", $$v)},expression:"extension.enabled"}})],1)]),_c('div',{staticClass:"row col q-body-2 text-justify"},[_vm._v(_vm._s(extension.description))])])],1)],1)],1)}),0)}
var VExtensionsStorevue_type_template_id_043c22d7_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VExtensionsStore.vue?vue&type=template&id=043c22d7&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VExtensionsStore.vue?vue&type=script&lang=js&


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
  VExtensionsStorevue_type_template_id_043c22d7_render,
  VExtensionsStorevue_type_template_id_043c22d7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VExtensionsStore = (VExtensionsStore_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VFacets.vue?vue&type=template&id=092364a7&
var VFacetsvue_type_template_id_092364a7_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"facets"},[(_vm.isAnyFacetValueSelected())?_c('div',{staticClass:"selectedFacets q-pb-md"},_vm._l((_vm.selectedFacets),function(selectedFacetValues,selectedFacet){return _c('div',{key:selectedFacet},[(!_vm.facetMultipleByCode(selectedFacet))?_vm._l((selectedFacetValues),function(selectedFacetValue){return _c('q-chip',{key:selectedFacetValue.code,staticClass:"q-mb-sm",attrs:{"clickable":"","icon-right":"cancel"},on:{"click":function($event){return _vm.$emit('toogle-facet', selectedFacet, selectedFacetValue, _vm.contextKey)}}},[_vm._v(_vm._s(_vm.facetLabelByCode(selectedFacet))+": "+_vm._s(_vm.facetValueLabelByCode(selectedFacet, selectedFacetValue))+" ")])}):_vm._e()],2)}),0):_vm._e(),_vm._l((_vm.facets),function(facet){return _c('q-list',{key:facet.code,staticClass:"facetValues q-py-none",attrs:{"dense":""}},[(facet.multiple || !_vm.isFacetSelected(facet.code))?[_c('q-item-label',{attrs:{"header":""}},[_c('big',[_vm._v(_vm._s(facet.label))])],1),_vm._l((_vm.selectedInvisibleFacets(facet.code)),function(value){return _c('q-item',{key:value.code,staticClass:"facetValue q-ml-md",attrs:{"clickable":""},nativeOn:{"click":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}},[(facet.multiple)?_c('q-item-section',{attrs:{"side":""}},[_c('q-checkbox',{attrs:{"dense":"","value":true},on:{"input":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}})],1):_vm._e(),_c('q-item-section',[_vm._v(_vm._s(value.label))]),_c('q-item-section',{attrs:{"side":""}},[_vm._v(_vm._s(value.count))])],1)}),_vm._l((_vm.visibleFacets(facet.code, facet.values)),function(value){return _c('q-item',{key:value.code,staticClass:"facetValue q-ml-md",attrs:{"clickable":""},nativeOn:{"click":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}},[(facet.multiple)?_c('q-item-section',{attrs:{"side":""}},[_c('q-checkbox',{attrs:{"dense":"","value":_vm.isFacetValueSelected(facet.code, value.code)},on:{"input":function($event){return _vm.$emit('toogle-facet', facet.code, value.code, _vm.contextKey)}}})],1):_vm._e(),_c('q-item-section',[_vm._v(_vm._s(value.label))]),_c('q-item-section',{attrs:{"side":""}},[_vm._v(_vm._s(value.count))])],1)}),(facet.values.length > _vm.maxValues && !_vm.isFacetExpanded(facet.code))?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){return _vm.expandFacet(facet.code)}}},[_vm._v(_vm._s(_vm.$q.lang.vui.facets.showAll))]):_vm._e(),(facet.values.length > _vm.maxValues && _vm.isFacetExpanded(facet.code))?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){return _vm.reduceFacet(facet.code)}}},[_vm._v(_vm._s(_vm.$q.lang.vui.facets.showLess))]):_vm._e()]:_vm._e()],2)})],2)}
var VFacetsvue_type_template_id_092364a7_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VFacets.vue?vue&type=template&id=092364a7&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VFacets.vue?vue&type=script&lang=js&











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
    facetValueByCode: function facetValueByCode(facetCode, facetValueCode) {
      return this.facetByCode(facetCode).values.filter(function (facetValue) {
        return facetValue.code === facetValueCode;
      })[0];
    },
    facetLabelByCode: function facetLabelByCode(facetCode) {
      return this.facetByCode(facetCode).label;
    },
    facetMultipleByCode: function facetMultipleByCode(facetCode) {
      return this.facetByCode(facetCode).multiple;
    },
    facetValueLabelByCode: function facetValueLabelByCode(facetCode, facetValueCode) {
      var facetValueByCode = this.facetValueByCode(facetCode, facetValueCode);
      return facetValueByCode ? facetValueByCode.label : facetValueCode; //might be not found
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
    isAnyFacetValueSelected: function isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some(function (facetCode) {
        return !this.facetMultipleByCode(facetCode);
      }.bind(this));
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
    selectedInvisibleFacets: function selectedInvisibleFacets(facetCode) {
      var _this = this;

      return this.selectedFacets[facetCode].filter(function (facetValueCode) {
        return !_this.facetValueByCode(facetCode, facetValueCode);
      }).map(function (facetValueCode) {
        var obj = {};
        obj.code = facetValueCode;
        obj.label = facetValueCode;
        obj.count = 0;
        return obj;
      });
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
  VFacetsvue_type_template_id_092364a7_render,
  VFacetsvue_type_template_id_092364a7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VFacets = (VFacets_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=template&id=575d0bbc&
var VGeopointInputvue_type_template_id_575d0bbc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('q-input',{attrs:{"label":"Longitude","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.inputObject.lon),callback:function ($$v) {_vm.$set(_vm.inputObject, "lon", _vm._n($$v))},expression:"inputObject.lon"}}),_c('q-input',{attrs:{"label":"Latitude","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.inputObject.lat),callback:function ($$v) {_vm.$set(_vm.inputObject, "lat", _vm._n($$v))},expression:"inputObject.lat"}})],1)}
var VGeopointInputvue_type_template_id_575d0bbc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VGeopointInput.vue?vue&type=template&id=575d0bbc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VGeopointInput.vue?vue&type=script&lang=js&

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
  VGeopointInputvue_type_template_id_575d0bbc_render,
  VGeopointInputvue_type_template_id_575d0bbc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VGeopointInput = (VGeopointInput_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VHandles.vue?vue&type=template&id=6621b1be&
var VHandlesvue_type_template_id_6621b1be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('q-input',{attrs:{"placeholder":_vm.$q.lang.vui.handles.placeholder,"debounce":300,"autofocus":"","outlined":"","bg-color":"white","dense":""},on:{"input":_vm.searchHandles},scopedSlots:_vm._u([{key:"prepend",fn:function(){return [_c('q-icon',{attrs:{"name":"search"}})]},proxy:true}]),model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}}),_c('q-list',{attrs:{"bordered":"","dense":"","separator":""}},_vm._l((_vm.handles),function(handle){return _c('q-item',{directives:[{name:"ripple",rawName:"v-ripple"}],key:handle.code,attrs:{"clickable":""},on:{"click":function($event){return _vm.VUi.methods.goTo(_vm.baseUrl + 'hw/' + handle.code )}}},[_c('q-item-section',[_vm._v(" "+_vm._s(handle.code)+" ")])],1)}),1)],1)}
var VHandlesvue_type_template_id_6621b1be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VHandles.vue?vue&type=template&id=6621b1be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VHandles.vue?vue&type=script&lang=js&
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
          this.$data.handles = response.data;
        }.bind(this));
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
  VHandlesvue_type_template_id_6621b1be_render,
  VHandlesvue_type_template_id_6621b1be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VHandles = (VHandles_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=template&id=2f4f3e4d&
var VJsonEditorvue_type_template_id_2f4f3e4d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},_vm._l((_vm.jsonAsObject),function(value,key){return _c('div',{key:key,class:'col-'+(12/_vm.cols)},[(!_vm.readonly)?_c('q-input',{attrs:{"label":key,"orientation":"vertical","stack-label":""},on:{"input":_vm.updateJson},model:{value:(_vm.jsonAsObject[key]),callback:function ($$v) {_vm.$set(_vm.jsonAsObject, key, $$v)},expression:"jsonAsObject[key]"}}):_c('q-field',{attrs:{"label":key,"orientation":"vertical","stack-label":"","borderless":"","readonly":""}},[_c('span',[_vm._v(_vm._s(value))])])],1)}),0)}
var VJsonEditorvue_type_template_id_2f4f3e4d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VJsonEditor.vue?vue&type=template&id=2f4f3e4d&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VJsonEditor.vue?vue&type=script&lang=js&


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
  VJsonEditorvue_type_template_id_2f4f3e4d_render,
  VJsonEditorvue_type_template_id_2f4f3e4d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VJsonEditor = (VJsonEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VNotifications.vue?vue&type=template&id=7e9a7200&
var VNotificationsvue_type_template_id_7e9a7200_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-btn',{staticClass:"on-left",attrs:{"round":"","dense":"","color":_vm.hasNew?'primary':'white',"textColor":_vm.hasNew?'white':'primary',"icon":_vm.count>0?_vm.icon:_vm.iconNone}},[(_vm.count>0)?_c('q-badge',{attrs:{"color":"red","text-color":"white","floating":""}},[_vm._v(_vm._s(_vm.count))]):_vm._e(),_c('q-menu',{staticClass:"notifications"},[_c('q-list',{staticStyle:{"width":"300px"}},_vm._l((_vm.list),function(notif){return _c('q-item',{key:notif.uuid,attrs:{"tag":"a","href":notif.targetUrl}},[_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{attrs:{"name":_vm.toIcon(notif.type),"size":"2rem"}})],1),_c('q-item-section',[_c('q-item-label',[_vm._v(_vm._s(notif.title))]),_c('q-item-label',{attrs:{"caption":"","lines":"3"}},[_vm._v(_vm._s(notif.content))])],1),_c('q-item-section',{attrs:{"side":"","top":""}},[_c('q-item-label',{attrs:{"caption":""}},[_vm._v(_vm._s(_vm.toDelay(new Date(notif.creationDate))))])],1)],1)}),1)],1)],1)}
var VNotificationsvue_type_template_id_7e9a7200_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VNotifications.vue?vue&type=template&id=7e9a7200&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VNotifications.vue?vue&type=script&lang=js&



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
  VNotificationsvue_type_template_id_7e9a7200_render,
  VNotificationsvue_type_template_id_7e9a7200_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VNotifications = (VNotifications_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMap.vue?vue&type=template&id=216750ce&
var VMapvue_type_template_id_216750ce_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.id}},[_vm._t("default")],2)}
var VMapvue_type_template_id_216750ce_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VMap.vue?vue&type=template&id=216750ce&

// EXTERNAL MODULE: external {"commonjs":"ol","commonjs2":"ol","root":"ol"}
var external_commonjs_ol_commonjs2_ol_root_ol_ = __webpack_require__("0f55");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMap.vue?vue&type=script&lang=js&


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
          vm.postInit();
        } else {
          setTimeout(checkForMap, 50);
        }
      }

      checkForMap();
    },
    postInit: function postInit() {
      if (this.$props.initialZoomLevel) {
        this.olMap.getView().setZoom(this.$props.initialZoomLevel);
      }
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
  VMapvue_type_template_id_216750ce_render,
  VMapvue_type_template_id_216750ce_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMap = (VMap_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMapLayer.vue?vue&type=template&id=08890d30&
var VMapLayervue_type_template_id_08890d30_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.id}},[_c('div',{attrs:{"id":_vm.id+'Popup'}},[(_vm.popupDisplayed)?_c('q-card',{staticClass:"q-px-md"},[_vm._t("card",function(){return [_c('div',{staticClass:"text-subtitle2"},[_vm._v(_vm._s(_vm.objectDisplayed[_vm.nameField]))])]},{"objectDisplayed":_vm.objectDisplayed})],2):_vm._e()],1)])}
var VMapLayervue_type_template_id_08890d30_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VMapLayer.vue?vue&type=template&id=08890d30&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VMapLayer.vue?vue&type=script&lang=js&








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
  data: function data() {
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
    list: function list(newVal) {
      //console.log('watch list');
      this.$data.items = newVal;
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    cluster: function cluster(newVal) {
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
          var iconFeature = new external_commonjs_ol_commonjs2_ol_root_ol_["Feature"]({
            geometry: new external_commonjs_ol_commonjs2_ol_root_ol_["geom"].Point(external_commonjs_ol_commonjs2_ol_root_ol_["proj"].fromLonLat([geoObject.lon, geoObject.lat]))
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
    fetchList: function fetchList(topLeft, bottomRight) {
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
    decode: function decode(geohash) {
      var bounds = this.bounds(geohash); // <-- the hard work
      // now just determine the centre of the cell...

      var latMin = bounds.sw.lat,
          lonMin = bounds.sw.lon;
      var latMax = bounds.ne.lat,
          lonMax = bounds.ne.lon; // cell centre

      var lat = (latMin + latMax) / 2;
      var lon = (lonMin + lonMax) / 2; // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places

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
    bounds: function bounds(geohash) {
      if (geohash.length == 0) throw new Error('Invalid geohash');
      geohash = geohash.toLowerCase();
      var evenBit = true;
      var latMin = -90,
          latMax = 90;
      var lonMin = -180,
          lonMax = 180;

      for (var i = 0; i < geohash.length; i++) {
        var chr = geohash.charAt(i);
        var idx = this.$data.base32.indexOf(chr);
        if (idx == -1) throw new Error('Invalid geohash');

        for (var n = 4; n >= 0; n--) {
          var bitN = idx >> n & 1;

          if (evenBit) {
            // longitude
            var lonMid = (lonMin + lonMax) / 2;

            if (bitN == 1) {
              lonMin = lonMid;
            } else {
              lonMax = lonMid;
            }
          } else {
            // latitude
            var latMid = (latMin + latMax) / 2;

            if (bitN == 1) {
              latMin = latMid;
            } else {
              latMax = latMid;
            }
          }

          evenBit = !evenBit;
        }
      }

      var bounds = {
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
  mounted: function mounted() {
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
      clusterLayer.setStyle(function (feature
      /*resolution*/
      ) {
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
  VMapLayervue_type_template_id_08890d30_render,
  VMapLayervue_type_template_id_08890d30_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VMapLayer = (VMapLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1614fe0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VTree.vue?vue&type=template&id=3c71d92d&
var VTreevue_type_template_id_3c71d92d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-field',_vm._b({scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{attrs:{"name":"arrow_drop_down"}})]},proxy:true},{key:"control",fn:function(){return [_c('div',{staticClass:"self-center full-width no-outline",attrs:{"tabindex":"0"}},[_vm._v(_vm._s(_vm.getSelectedLabel()))])]},proxy:true}])},'q-field',_vm.$attrs,false),[_c('q-menu',{ref:"menu",attrs:{"breakpoint":600,"fit":""}},[_c('q-tree',{attrs:{"nodes":_vm.convertListToTree(_vm.$props.list, _vm.$props.subTreeKey),"node-key":_vm.$props.keyField,"label-key":_vm.$props.labelField,"expanded":_vm.expandedNodes,"selected":_vm.selectedNode},on:{"update:expanded":[function($event){_vm.expandedNodes=$event},_vm.handleExpanded],"update:selected":[function($event){_vm.selectedNode=$event},_vm.handleSelected]}})],1)],1)}
var VTreevue_type_template_id_3c71d92d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VTree.vue?vue&type=template&id=3c71d92d&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VTree.vue?vue&type=script&lang=js&


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
  data: function data() {
    return {
      selectedNode: this.$props.value,
      expandedNodes: [this.$props.value]
    };
  },
  watch: {
    value: function value(newVal) {
      this.$data.selectedNode = newVal;
    }
  },
  methods: {
    handleSelected: function handleSelected(target) {
      this.$emit('input', this.$data.selectedNode);

      if (target) {
        this.$refs.menu.hide();
      }
    },
    handleExpanded: function handleExpanded() {
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function getSelectedLabel() {
      if (this.$data.selectedNode) {
        var node = this.$props.list.find(function (rse) {
          return rse[this.$props.keyField] === this.$data.selectedNode;
        }.bind(this));
        return node[this.$props.labelField];
      }

      return null;
    },
    convertListToTree: function convertListToTree(list, subTreeKey) {
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
// CONCATENATED MODULE: ./src/components/VTree.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VTreevue_type_script_lang_js_ = (VTreevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/VTree.vue





/* normalize component */

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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__("00b4");

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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js









function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./src/directives/VAlertUnsavedUpdates.js



/* harmony default export */ var VAlertUnsavedUpdates = ({
  inserted: function inserted(el, binding, vnode) {
    var watchKeys = binding.expression;

    if (!window.watcherUpdates) {
      //Some init must be only once
      window.watcherUpdates = {
        originalDocumentTitle: document.title,
        updates_detected: false,
        acceptedUpdates: function acceptedUpdates() {
          window.watcherUpdates.updates_detected = false;
          document.title = window.watcherUpdates.originalDocumentTitle;
        },
        beforeWindowUnload: function beforeWindowUnload(e) {
          //les navigateurs n'affichent pas le message proposé pour éviter le scam, il suffit de retourner une chaine non vide
          if (window.watcherUpdates.updates_detected) {
            // Cancel the event
            e.preventDefault(); // Chrome requires returnValue to be set

            e.returnValue = 'Voulez-vous quitter cette page ? \n Les modifications que vous avez apportées ne seront peut-être pas enregistrées';
          }
        }
      };
      window.addEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload);

      if (vnode.context.$root.uiMessageStack) {
        var uiMessageStack = vnode.context.$root.uiMessageStack;
        var hasError = uiMessageStack.globalErrors.length > 0;

        var _iterator = _createForOfIteratorHelper(watchKeys.split(",")),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var watchKey = _step.value;
            hasError = hasError || uiMessageStack.objectFieldErrors[watchKey];

            if (hasError) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (hasError) {
          window.watcherUpdates.updates_detected = true; //if there is other errors => mark as dirty
        }
      }
    } //each button eventListener click


    el.addEventListener('click', window.watcherUpdates.acceptedUpdates); //each button watch data (watchKey may differ)

    var _iterator2 = _createForOfIteratorHelper(watchKeys.split(",")),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var watchKey = _step2.value;
        vnode.context.$root.$watch('vueData.' + watchKey, function () {
          window.watcherUpdates.updates_detected = true;
          document.title = '*' + window.watcherUpdates.originalDocumentTitle;
        }, {
          deep: true
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  unbind: function unbind() {
    window.removeEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload);
  }
});
// CONCATENATED MODULE: ./src/directives/VAutofocus.js
/* harmony default export */ var VAutofocus = ({
  bind: function bind(el, binding, vnode) {
    var doFocus = binding.value;

    if (doFocus && !window.autofocus) {
      window.autofocus = true;
      vnode.context.$nextTick(function () {
        return el.focus();
      });
    }
  }
});
// CONCATENATED MODULE: ./src/directives/VIfUnsavedUpdates.js
/* harmony default export */ var VIfUnsavedUpdates = ({
  update: function update(el, binding, vnode) {
    vnode.context.$nextTick(function () {
      if (!window.watcherUpdates || !window.watcherUpdates.updates_detected) {
        el.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
      }
    });
  }
});
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
  inserted: function inserted(elNav, args) {
    var debugMode = args.value.debug ? args.value.debug : false;
    var startingOffset = args.value.startingOffset ? args.value.startingOffset : 24;
    var fixedPos = args.value.fixedPos ? args.value.fixedPos : 24;
    var fixeTrigger = startingOffset - fixedPos;
    var scanner = args.value.scanner ? args.value.scanner : fixedPos + 30; //scanner is 30px bottom of fixedPos, must be smaller than the smallest first element

    var elAs = elNav.querySelectorAll('a');
    elAs[0].classList.add("active"); //first active

    var scrollContainer = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollTarget(document.querySelector(elAs[0].hash));
    var scannerLines = [];
    var startLinearLine;
    var lastScrollLine;

    if (debugMode) {
      //scannerLine1 = Vue.createDebugLine('nearesBlock','absolute',scanner,'red' );
      // scannerLine1b = Vue.createDebugLine('scannerStart', 'fixed', scanner, 'orange');
      // startingTopLine = Vue.createDebugLine('startingTop', 'fixed', startingOffset, 'green');//position where the element is at start
      // scannerLine3 = Vue.createDebugLine('fixedPos', 'fixed', fixedPos, 'blue'); //position where the nav is fixed   
      startLinearLine = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.createDebugLine('startLinear', 'absolute', 0, 'red');
      lastScrollLine = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.createDebugLine('last', 'absolute', 0, 'red');
    }

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollSpyHandler = function () {
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
        console.log("y: " + _y + " (startingOffset)"); //return { top: _y, left: _x };
      } // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position


      if (window.pageYOffset > fixeTrigger) {
        if (!elNav.style.top) {
          elNav.style.top = fixedPos + "px"; //when fixed, we must set a valid width

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

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBlockTop = function (scrollPosition) {
      var blockTop = [];

      for (var _i = 0; _i < elAs.length; _i++) {
        var elScrollId = elAs[_i].hash;
        var elScroll = document.querySelector(elScrollId);

        if (elScroll) {
          blockTop.push(scrollPosition + elScroll.getBoundingClientRect().top);
        } else {//console.warn('ScrollSpy element '+elScrollId+' not found')
        }
      }

      return blockTop;
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.scrollTo = function (event) {
      event.preventDefault();
      var elScrollId = event.target.hash;
      var elScroll = document.querySelector(elScrollId);
      var toScroll = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollPosition(scrollContainer) + elScroll.getBoundingClientRect().top - scanner;
      var scrollPosition = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollPosition(scrollContainer);
      var blockTop = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBlockTop(scrollPosition);
      var scrollBreakpoints = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBreakPoints(scrollPosition);

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
      external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.setScrollPosition(scrollContainer, toScroll, duration);
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBreakPoints = function (scrollPosition) {
      var blockTop = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.computeBlockTop(scrollPosition);
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      /** visible height */

      var scrollHeight = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.scroll.getScrollHeight(scrollContainer);
      /** height of scrollable element */

      var scrollMax = scrollHeight - windowHeight;
      /** Maximum possible scroll */

      var scrollEnd = scrollMax; //blockTop[blockTop.length-1]; /** Finish linear move at this scroll position */

      var scrollStart = scrollEnd - windowHeight + scanner;
      /** Start linear move at this scroll position : start a block start */

      for (var _i2 = 1; _i2 < elAs.length; _i2++) {
        if (blockTop[_i2] - scanner > scrollStart) {
          scrollStart = blockTop[_i2] - scanner;
          break;
        }
      }

      var scrollDelta = scrollEnd - scrollStart; //scroll linear regression "to" length
      //console.log('SP',scrollPosition, ' WH', windowHeight, ' SH',scrollHeight, ' SM', scrollMax, ' SS', scrollStart,  ' SD', scrollDelta, " scanner",scanner    );

      var scrollBreakpoints = [];
      scrollBreakpoints.push(0);

      for (var _i3 = 1; _i3 < elAs.length; _i3++) {
        if (blockTop[_i3] - scanner > scrollStart) {
          scrollBreakpoints[_i3] = scrollStart + scrollDelta * (blockTop[_i3] - scrollStart) / (scrollHeight - scrollStart); //console.log(i+' scrollBreakpoints top: ',blockTop[i])
        } else {
          scrollBreakpoints[_i3] = blockTop[_i3] - scanner;
        }

        scrollBreakpoints[_i3] = Math.round(scrollBreakpoints[_i3]);
      }

      if (debugMode) {
        for (var _i4 = 1; _i4 < elAs.length; _i4++) {
          var scannerLine;

          if (scannerLines.length < _i4) {
            scannerLine = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.createDebugLine('navId#' + _i4, 'absolute', 0, 'red');
            scannerLines.push(scannerLine);
          } else {
            scannerLine = scannerLines[_i4 - 1];
          }

          scannerLine.style.top = scrollBreakpoints[_i4] + scanner + 'px';
        }

        startLinearLine.style.top = scrollStart + scanner + 'px';
        lastScrollLine.style.top = scrollEnd + scanner + 'px';
      }

      return scrollBreakpoints;
    };

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.createDebugLine = function (name, position, top, color) {
      var scannerLine1 = document.createElement("div");
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

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
      multiLine: true,
      icon: 'warning',
      timeout: 2500
    }; //Setup Error Message //if response was an error

    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      notif.message = response.message;
    } //Setup Generic Response Messages


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
  selectedFunction: function selectedFunction(object, field, item
  /*, keyboard*/
  ) {
    this.$data.vueData[object][field] = item.value;
  },
  searchAutocomplete: function searchAutocomplete(list, valueField, labelField, componentId, url, terms, update, abort) {
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
  loadAutocompleteById: function loadAutocompleteById(list, valueField, labelField, componentId, url, objectName, fieldName) {
    //Method use when value(id) is set by another way : like Ajax Viewcontext update, other component, ...
    //if options already contains the value (id) : we won't reload.
    if (!this.$data.vueData[objectName][fieldName] || this.$data.componentStates[componentId].options.filter(function (option) {
      return option.value === this.$data.vueData[objectName][fieldName];
    }.bind(this)).length > 0) {
      return;
    }

    this.$data.componentStates[componentId].loading = true;
    this.$data.componentStates[componentId].options.push({
      'value': this.$data.vueData[objectName][fieldName],
      'label': ''
    });
    this.$http.post(url, this.objectToFormData({
      value: this.$data.vueData[objectName][fieldName],
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
      this.$data.componentStates[componentId].options.pop();
      this.$data.componentStates[componentId].options = this.$data.componentStates[componentId].options.concat(finalList);
    }.bind(this)).catch(function (error) {
      this.$data.componentStates[componentId].options.pop();
      this.$q.notify(error.response.status + ":" + error.response.statusText);
    }.bind(this)).then(function () {
      // always executed
      this.$data.componentStates[componentId].loading = false;
    }.bind(this));
  },
  decodeDate: function decodeDate(value, format) {
    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY'), 'DD/MM/YYYY')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY'), format);
    } else {
      return value;
    }
  },
  encodeDate: function encodeDate(newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), format)) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), 'DD/MM/YYYY');
    } else {
      return newValue;
    }
  },
  decodeDatetime: function decodeDatetime(value, format) {
    if (value === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm')) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(value, 'DD/MM/YYYY HH:mm'), format);
    } else {
      return value;
    }
  },
  encodeDatetime: function encodeDatetime(newValue, format) {
    if (newValue === external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), format)) {
      return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.formatDate(external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.date.extractDate(newValue, format), 'DD/MM/YYYY HH:mm');
    } else {
      return newValue;
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
    params.append(selectedFacetsContextKey, JSON.stringify(vueData[selectedFacetsContextKey]));
    var searchUrl = componentStates[contextKey + 'Search'].searchUrl;
    var collectionComponentId = componentStates[contextKey + 'Search'].collectionComponentId;

    if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
      var collectionPagination = componentStates[collectionComponentId].pagination;
      params.append('sortFieldName', collectionPagination.sortBy);
      params.append('sortDesc', collectionPagination.descending);
    }

    this.httpPostAjax(searchUrl, params, {
      onSuccess: function onSuccess(response) {
        if (componentStates[collectionComponentId].pagination) {
          var collectionPagination = componentStates[collectionComponentId].pagination;
          collectionPagination.page = 1; // reset page

          collectionPagination.rowsNumber = response.data.model[contextKey + '_list'].length;
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
  vueDataToArray: function vueDataToArray(value) {
    if (Array.isArray(value)) {
      return value;
    } else if (value) {
      return [value];
    }

    return [];
  },
  obtainVueDataAccessor: function obtainVueDataAccessor(referer, object, field, rowIndex) {
    if (field != null && field != 'null') {
      if (rowIndex != null) {
        return {
          get: function get() {
            return referer.$data.vueData[object][rowIndex][field];
          },
          set: function set(newData) {
            referer.$data.vueData[object][rowIndex][field] = newData;
          }
        };
      } else {
        return {
          get: function get() {
            return referer.$data.vueData[object][field];
          },
          set: function set(newData) {
            referer.$data.vueData[object][field] = newData;
          }
        };
      }
    } else {
      return {
        get: function get() {
          return referer.$data.vueData[object];
        },
        set: function set(newData) {
          referer.$data.vueData[object] = newData;
        }
      };
    }
  },
  uploader_changeIcon: function uploader_changeIcon() {
    this.$q.iconSet.uploader.removeUploaded = 'delete_sweep';
    this.$q.iconSet.uploader.done = 'delete';
  },
  uploader_mounted: function uploader_mounted(componentId, object, field, rowIndex) {
    this.uploader_changeIcon();
    var component = this.$refs[componentId]; //must removed duplicate

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

        if (component.files.some(function (file) {
          return file.name === fileData.name;
        })) {
          console.warn("Component doesn't support duplicate file ", fileData);
        } else {
          fileData.__sizeLabel = external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.format.humanStorageSize(fileData.size);
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
  uploader_dragenter: function uploader_dragenter(componentId) {
    var componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = true;
  },
  uploader_dragleave: function uploader_dragleave(componentId) {
    var componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = false;
  },
  uploader_drop: function uploader_drop(event, componentId) {
    var component = this.$refs[componentId];
    component.addFiles(event.dataTransfer.files);
  },
  uploader_forceComputeUploadedSize: function uploader_forceComputeUploadedSize(componentId) {
    var component = this.$refs[componentId]; //recompute totalSize

    component.uploadedSize = 0;
    component.uploadedFiles.forEach(function (file) {
      component.uploadedSize += file.size;
    });
    component.uploadSize = component.uploadedSize;
    component.queuedFiles.forEach(function (file) {
      component.uploadSize += file.size;
    });
  },
  uploader_humanStorageSize: function uploader_humanStorageSize(size) {
    return external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.utils.format.humanStorageSize(size);
  },
  uploader_addedFile: function uploader_addedFile(isMultiple, componentId) {
    if (!isMultiple) {
      var component = this.$refs[componentId];
      var vueDataAccessor = component.vueDataAccessor;
      component.removeUploadedFiles();
      vueDataAccessor.set([]);
    }
  },
  uploader_uploadedFiles: function uploader_uploadedFiles(uploadInfo, componentId) {
    var component = this.$refs[componentId];
    var vueDataAccessor = component.vueDataAccessor;
    uploadInfo.files.forEach(function (file) {
      file.fileUri = file.xhr.response;
      vueDataAccessor.get().push(file.fileUri);
    }.bind(this));
  },
  uploader_failedFiles: function uploader_failedFiles(uploadInfo) {
    uploadInfo.files.forEach(function (file) {
      this.onAjaxError({
        status: file.xhr.status,
        statusText: file.xhr.statusText,
        data: JSON.parse(file.xhr.response)
      }); //server can return : a response with a uiMessageStack object or directly the uiMessageStack

      /*let uiMessageStack = response.globalErrors?response:response.uiMessageStack;
      Object.keys(uiMessageStack).forEach(function (key) {
          this.$data.uiMessageStack[key] = uiMessageStack[key];
      }.bind(this));*/
    }.bind(this));
  },
  uploader_removeFiles: function uploader_removeFiles(removedFiles, componentId) {
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
        }).then(function
          /*response*/
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
  httpPostAjax: function httpPostAjax(url, paramsIn, options) {
    var vueData = this.$data.vueData;
    var uiMessageStack = this.$data.uiMessageStack;
    var params = this.isFormData(paramsIn) ? paramsIn : this.objectToFormData(paramsIn);
    params.append('CTX', vueData.CTX);
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
    });
  },
  hasFieldsError: function hasFieldsError(object, field, rowIndex) {
    var fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;

    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;
      return Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field) && fieldsErrors[objectName][field].length > 0;
    }

    return false;
  },
  getErrorMessage: function getErrorMessage(object, field, rowIndex) {
    var fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;

    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;

      if (Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field)) {
        return fieldsErrors[objectName][field].join(', ');
      }
    } else {
      return '';
    }
  },
  vueDataParams: function vueDataParams(keys) {
    var params = new FormData();

    for (var i = 0; i < keys.length; i++) {
      var contextKey = keys[i];
      var vueDataValue = this.$data.vueData[contextKey];

      if (vueDataValue && _typeof(vueDataValue) === 'object' && Array.isArray(vueDataValue) === false) {
        // object
        Object.keys(vueDataValue).forEach(function (propertyKey) {
          if (!propertyKey.startsWith("_")) {
            // _ properties are private and don't belong to the serialized entity
            if (Array.isArray(vueDataValue[propertyKey])) {
              var vueDataFieldValue = vueDataValue[propertyKey];

              if (!vueDataFieldValue || vueDataFieldValue.length == 0) {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', ""); // reset array with an empty string
              } else {
                vueDataFieldValue.forEach(function (value, index) {
                  if (vueDataFieldValue[index] && _typeof(vueDataFieldValue[index]) === 'object') {
                    this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]['_v_inputValue']);
                  } else {
                    this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]);
                  }
                }.bind(this));
              }
            } else {
              if (vueDataValue[propertyKey] && _typeof(vueDataValue[propertyKey]) === 'object') {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataValue[propertyKey]['_v_inputValue']);
              } else {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataValue[propertyKey]);
              }
            }
          }
        }.bind(this));
      } else {
        //primitive
        this.appendToFormData(params, 'vContext[' + contextKey + ']', vueDataValue);
      }
    }

    return params;
  },
  objectToFormData: function objectToFormData(object) {
    var formData = new FormData();
    Object.keys(object).forEach(function (key) {
      this.appendToFormData(formData, key, object[key]);
    }.bind(this));
    return formData;
  },
  appendToFormData: function appendToFormData(formData, name, value) {
    if (value != null) {
      formData.append(name, value);
    } else {
      formData.append(name, "");
    }
  },
  isFormData: function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
  }
});
// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-en-us.js
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
// CONCATENATED MODULE: ./src/lang/vertigo-ui-lang-fr.js
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
// CONCATENATED MODULE: ./src/main.js
























function getBoundMethods(obj, methods) {
  var boundMethods = {};
  Object.keys(methods).forEach(function (methodName) {
    return boundMethods[methodName] = methods[methodName].bind(obj);
  });
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
  Vue.component("v-tree", VTree); // directives

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
      get: function get() {
        return options.axios;
      }
    },
    $http: {
      get: function get() {
        return options.axios;
      }
    },
    $vui: {
      get: function get() {
        return getBoundMethods(this, methods);
      }
    }
  });

  if (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.enUs) {
    external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.enUs.vui = vertigo_ui_lang_en_us;
  }

  if (external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.fr) {
    external_commonjs_quasar_commonjs2_quasar_root_Quasar_default.a.lang.fr.vui = vertigo_ui_lang_fr;
  }
}
var main_methods = methods;
function initData(instance, json) {
  instance.vueData = json.vueData;
  instance.componentStates = json.componentStates;
  instance.uiMessageStack = json.uiMessageStack;
  instance.vuiLang = json.vuiLang;
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var un$Slice = __webpack_require__("f36a");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
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

/***/ "fce3":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


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

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fea9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ })

/******/ });
});
//# sourceMappingURL=vertigo-ui.umd.js.map