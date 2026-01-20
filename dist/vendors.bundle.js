/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkGameApp"] = self["webpackChunkGameApp"] || []).push([["vendors"],{

/***/ 20
/*!*******************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/logical.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = logical;\nvar alternativeProps = {\n  marginBlockStart: ['WebkitMarginBefore'],\n  marginBlockEnd: ['WebkitMarginAfter'],\n  marginInlineStart: ['WebkitMarginStart', 'MozMarginStart'],\n  marginInlineEnd: ['WebkitMarginEnd', 'MozMarginEnd'],\n  paddingBlockStart: ['WebkitPaddingBefore'],\n  paddingBlockEnd: ['WebkitPaddingAfter'],\n  paddingInlineStart: ['WebkitPaddingStart', 'MozPaddingStart'],\n  paddingInlineEnd: ['WebkitPaddingEnd', 'MozPaddingEnd'],\n  borderBlockStart: ['WebkitBorderBefore'],\n  borderBlockStartColor: ['WebkitBorderBeforeColor'],\n  borderBlockStartStyle: ['WebkitBorderBeforeStyle'],\n  borderBlockStartWidth: ['WebkitBorderBeforeWidth'],\n  borderBlockEnd: ['WebkitBorderAfter'],\n  borderBlockEndColor: ['WebkitBorderAfterColor'],\n  borderBlockEndStyle: ['WebkitBorderAfterStyle'],\n  borderBlockEndWidth: ['WebkitBorderAfterWidth'],\n  borderInlineStart: ['WebkitBorderStart', 'MozBorderStart'],\n  borderInlineStartColor: ['WebkitBorderStartColor', 'MozBorderStartColor'],\n  borderInlineStartStyle: ['WebkitBorderStartStyle', 'MozBorderStartStyle'],\n  borderInlineStartWidth: ['WebkitBorderStartWidth', 'MozBorderStartWidth'],\n  borderInlineEnd: ['WebkitBorderEnd', 'MozBorderEnd'],\n  borderInlineEndColor: ['WebkitBorderEndColor', 'MozBorderEndColor'],\n  borderInlineEndStyle: ['WebkitBorderEndStyle', 'MozBorderEndStyle'],\n  borderInlineEndWidth: ['WebkitBorderEndWidth', 'MozBorderEndWidth']\n};\n\nfunction logical(property, value, style) {\n  if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {\n    var alternativePropList = alternativeProps[property];\n    for (var i = 0, len = alternativePropList.length; i < len; ++i) {\n      style[alternativePropList[i]] = value;\n    }\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/logical.js?\n}");

/***/ },

/***/ 79
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
(module) {

eval("{function _arrayLikeToArray(r, a) {\n  (null == a || a > r.length) && (a = r.length);\n  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];\n  return n;\n}\nmodule.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/arrayLikeToArray.js?\n}");

/***/ },

/***/ 213
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{/**\n * @license React\n * scheduler.development.js\n *\n * Copyright (c) Meta Platforms, Inc. and affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n true &&\n  (function () {\n    function performWorkUntilDeadline() {\n      needsPaint = !1;\n      if (isMessageLoopRunning) {\n        var currentTime = exports.unstable_now();\n        startTime = currentTime;\n        var hasMoreWork = !0;\n        try {\n          a: {\n            isHostCallbackScheduled = !1;\n            isHostTimeoutScheduled &&\n              ((isHostTimeoutScheduled = !1),\n              localClearTimeout(taskTimeoutID),\n              (taskTimeoutID = -1));\n            isPerformingWork = !0;\n            var previousPriorityLevel = currentPriorityLevel;\n            try {\n              b: {\n                advanceTimers(currentTime);\n                for (\n                  currentTask = peek(taskQueue);\n                  null !== currentTask &&\n                  !(\n                    currentTask.expirationTime > currentTime &&\n                    shouldYieldToHost()\n                  );\n\n                ) {\n                  var callback = currentTask.callback;\n                  if (\"function\" === typeof callback) {\n                    currentTask.callback = null;\n                    currentPriorityLevel = currentTask.priorityLevel;\n                    var continuationCallback = callback(\n                      currentTask.expirationTime <= currentTime\n                    );\n                    currentTime = exports.unstable_now();\n                    if (\"function\" === typeof continuationCallback) {\n                      currentTask.callback = continuationCallback;\n                      advanceTimers(currentTime);\n                      hasMoreWork = !0;\n                      break b;\n                    }\n                    currentTask === peek(taskQueue) && pop(taskQueue);\n                    advanceTimers(currentTime);\n                  } else pop(taskQueue);\n                  currentTask = peek(taskQueue);\n                }\n                if (null !== currentTask) hasMoreWork = !0;\n                else {\n                  var firstTimer = peek(timerQueue);\n                  null !== firstTimer &&\n                    requestHostTimeout(\n                      handleTimeout,\n                      firstTimer.startTime - currentTime\n                    );\n                  hasMoreWork = !1;\n                }\n              }\n              break a;\n            } finally {\n              (currentTask = null),\n                (currentPriorityLevel = previousPriorityLevel),\n                (isPerformingWork = !1);\n            }\n            hasMoreWork = void 0;\n          }\n        } finally {\n          hasMoreWork\n            ? schedulePerformWorkUntilDeadline()\n            : (isMessageLoopRunning = !1);\n        }\n      }\n    }\n    function push(heap, node) {\n      var index = heap.length;\n      heap.push(node);\n      a: for (; 0 < index; ) {\n        var parentIndex = (index - 1) >>> 1,\n          parent = heap[parentIndex];\n        if (0 < compare(parent, node))\n          (heap[parentIndex] = node),\n            (heap[index] = parent),\n            (index = parentIndex);\n        else break a;\n      }\n    }\n    function peek(heap) {\n      return 0 === heap.length ? null : heap[0];\n    }\n    function pop(heap) {\n      if (0 === heap.length) return null;\n      var first = heap[0],\n        last = heap.pop();\n      if (last !== first) {\n        heap[0] = last;\n        a: for (\n          var index = 0, length = heap.length, halfLength = length >>> 1;\n          index < halfLength;\n\n        ) {\n          var leftIndex = 2 * (index + 1) - 1,\n            left = heap[leftIndex],\n            rightIndex = leftIndex + 1,\n            right = heap[rightIndex];\n          if (0 > compare(left, last))\n            rightIndex < length && 0 > compare(right, left)\n              ? ((heap[index] = right),\n                (heap[rightIndex] = last),\n                (index = rightIndex))\n              : ((heap[index] = left),\n                (heap[leftIndex] = last),\n                (index = leftIndex));\n          else if (rightIndex < length && 0 > compare(right, last))\n            (heap[index] = right),\n              (heap[rightIndex] = last),\n              (index = rightIndex);\n          else break a;\n        }\n      }\n      return first;\n    }\n    function compare(a, b) {\n      var diff = a.sortIndex - b.sortIndex;\n      return 0 !== diff ? diff : a.id - b.id;\n    }\n    function advanceTimers(currentTime) {\n      for (var timer = peek(timerQueue); null !== timer; ) {\n        if (null === timer.callback) pop(timerQueue);\n        else if (timer.startTime <= currentTime)\n          pop(timerQueue),\n            (timer.sortIndex = timer.expirationTime),\n            push(taskQueue, timer);\n        else break;\n        timer = peek(timerQueue);\n      }\n    }\n    function handleTimeout(currentTime) {\n      isHostTimeoutScheduled = !1;\n      advanceTimers(currentTime);\n      if (!isHostCallbackScheduled)\n        if (null !== peek(taskQueue))\n          (isHostCallbackScheduled = !0),\n            isMessageLoopRunning ||\n              ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline());\n        else {\n          var firstTimer = peek(timerQueue);\n          null !== firstTimer &&\n            requestHostTimeout(\n              handleTimeout,\n              firstTimer.startTime - currentTime\n            );\n        }\n    }\n    function shouldYieldToHost() {\n      return needsPaint\n        ? !0\n        : exports.unstable_now() - startTime < frameInterval\n          ? !1\n          : !0;\n    }\n    function requestHostTimeout(callback, ms) {\n      taskTimeoutID = localSetTimeout(function () {\n        callback(exports.unstable_now());\n      }, ms);\n    }\n    \"undefined\" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&\n      \"function\" ===\n        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&\n      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());\n    exports.unstable_now = void 0;\n    if (\n      \"object\" === typeof performance &&\n      \"function\" === typeof performance.now\n    ) {\n      var localPerformance = performance;\n      exports.unstable_now = function () {\n        return localPerformance.now();\n      };\n    } else {\n      var localDate = Date,\n        initialTime = localDate.now();\n      exports.unstable_now = function () {\n        return localDate.now() - initialTime;\n      };\n    }\n    var taskQueue = [],\n      timerQueue = [],\n      taskIdCounter = 1,\n      currentTask = null,\n      currentPriorityLevel = 3,\n      isPerformingWork = !1,\n      isHostCallbackScheduled = !1,\n      isHostTimeoutScheduled = !1,\n      needsPaint = !1,\n      localSetTimeout = \"function\" === typeof setTimeout ? setTimeout : null,\n      localClearTimeout =\n        \"function\" === typeof clearTimeout ? clearTimeout : null,\n      localSetImmediate =\n        \"undefined\" !== typeof setImmediate ? setImmediate : null,\n      isMessageLoopRunning = !1,\n      taskTimeoutID = -1,\n      frameInterval = 5,\n      startTime = -1;\n    if (\"function\" === typeof localSetImmediate)\n      var schedulePerformWorkUntilDeadline = function () {\n        localSetImmediate(performWorkUntilDeadline);\n      };\n    else if (\"undefined\" !== typeof MessageChannel) {\n      var channel = new MessageChannel(),\n        port = channel.port2;\n      channel.port1.onmessage = performWorkUntilDeadline;\n      schedulePerformWorkUntilDeadline = function () {\n        port.postMessage(null);\n      };\n    } else\n      schedulePerformWorkUntilDeadline = function () {\n        localSetTimeout(performWorkUntilDeadline, 0);\n      };\n    exports.unstable_IdlePriority = 5;\n    exports.unstable_ImmediatePriority = 1;\n    exports.unstable_LowPriority = 4;\n    exports.unstable_NormalPriority = 3;\n    exports.unstable_Profiling = null;\n    exports.unstable_UserBlockingPriority = 2;\n    exports.unstable_cancelCallback = function (task) {\n      task.callback = null;\n    };\n    exports.unstable_forceFrameRate = function (fps) {\n      0 > fps || 125 < fps\n        ? console.error(\n            \"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported\"\n          )\n        : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);\n    };\n    exports.unstable_getCurrentPriorityLevel = function () {\n      return currentPriorityLevel;\n    };\n    exports.unstable_next = function (eventHandler) {\n      switch (currentPriorityLevel) {\n        case 1:\n        case 2:\n        case 3:\n          var priorityLevel = 3;\n          break;\n        default:\n          priorityLevel = currentPriorityLevel;\n      }\n      var previousPriorityLevel = currentPriorityLevel;\n      currentPriorityLevel = priorityLevel;\n      try {\n        return eventHandler();\n      } finally {\n        currentPriorityLevel = previousPriorityLevel;\n      }\n    };\n    exports.unstable_requestPaint = function () {\n      needsPaint = !0;\n    };\n    exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {\n      switch (priorityLevel) {\n        case 1:\n        case 2:\n        case 3:\n        case 4:\n        case 5:\n          break;\n        default:\n          priorityLevel = 3;\n      }\n      var previousPriorityLevel = currentPriorityLevel;\n      currentPriorityLevel = priorityLevel;\n      try {\n        return eventHandler();\n      } finally {\n        currentPriorityLevel = previousPriorityLevel;\n      }\n    };\n    exports.unstable_scheduleCallback = function (\n      priorityLevel,\n      callback,\n      options\n    ) {\n      var currentTime = exports.unstable_now();\n      \"object\" === typeof options && null !== options\n        ? ((options = options.delay),\n          (options =\n            \"number\" === typeof options && 0 < options\n              ? currentTime + options\n              : currentTime))\n        : (options = currentTime);\n      switch (priorityLevel) {\n        case 1:\n          var timeout = -1;\n          break;\n        case 2:\n          timeout = 250;\n          break;\n        case 5:\n          timeout = 1073741823;\n          break;\n        case 4:\n          timeout = 1e4;\n          break;\n        default:\n          timeout = 5e3;\n      }\n      timeout = options + timeout;\n      priorityLevel = {\n        id: taskIdCounter++,\n        callback: callback,\n        priorityLevel: priorityLevel,\n        startTime: options,\n        expirationTime: timeout,\n        sortIndex: -1\n      };\n      options > currentTime\n        ? ((priorityLevel.sortIndex = options),\n          push(timerQueue, priorityLevel),\n          null === peek(taskQueue) &&\n            priorityLevel === peek(timerQueue) &&\n            (isHostTimeoutScheduled\n              ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))\n              : (isHostTimeoutScheduled = !0),\n            requestHostTimeout(handleTimeout, options - currentTime)))\n        : ((priorityLevel.sortIndex = timeout),\n          push(taskQueue, priorityLevel),\n          isHostCallbackScheduled ||\n            isPerformingWork ||\n            ((isHostCallbackScheduled = !0),\n            isMessageLoopRunning ||\n              ((isMessageLoopRunning = !0),\n              schedulePerformWorkUntilDeadline())));\n      return priorityLevel;\n    };\n    exports.unstable_shouldYield = shouldYieldToHost;\n    exports.unstable_wrapCallback = function (callback) {\n      var parentPriorityLevel = currentPriorityLevel;\n      return function () {\n        var previousPriorityLevel = currentPriorityLevel;\n        currentPriorityLevel = parentPriorityLevel;\n        try {\n          return callback.apply(this, arguments);\n        } finally {\n          currentPriorityLevel = previousPriorityLevel;\n        }\n      };\n    };\n    \"undefined\" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&\n      \"function\" ===\n        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&\n      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());\n  })();\n\n\n//# sourceURL=webpack://GameApp/./node_modules/scheduler/cjs/scheduler.development.js?\n}");

/***/ },

/***/ 228
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ 6925);\n  var loggedTypeFailures = {};\n  var has = __webpack_require__(/*! ./lib/has */ 9376);\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) { /**/ }\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +\n              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          );\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\ncheckPropTypes.resetWarningCache = function() {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/checkPropTypes.js?\n}");

/***/ },

/***/ 508
/*!**********************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/transition.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = transition;\n\nvar _hyphenateProperty = __webpack_require__(/*! css-in-js-utils/lib/hyphenateProperty */ 5721);\n\nvar _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);\n\nvar _isPrefixedValue = __webpack_require__(/*! css-in-js-utils/lib/isPrefixedValue */ 4014);\n\nvar _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);\n\nvar _capitalizeString = __webpack_require__(/*! ../utils/capitalizeString */ 7091);\n\nvar _capitalizeString2 = _interopRequireDefault(_capitalizeString);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar properties = {\n  transition: true,\n  transitionProperty: true,\n  WebkitTransition: true,\n  WebkitTransitionProperty: true,\n  MozTransition: true,\n  MozTransitionProperty: true\n};\n\nvar prefixMapping = {\n  Webkit: '-webkit-',\n  Moz: '-moz-',\n  ms: '-ms-'\n};\n\nfunction prefixValue(value, propertyPrefixMap) {\n  if ((0, _isPrefixedValue2.default)(value)) {\n    return value;\n  }\n\n  // only split multi values, not cubic beziers\n  var multipleValues = value.split(/,(?![^()]*(?:\\([^()]*\\))?\\))/g);\n\n  for (var i = 0, len = multipleValues.length; i < len; ++i) {\n    var singleValue = multipleValues[i];\n    var values = [singleValue];\n    for (var property in propertyPrefixMap) {\n      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);\n\n      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {\n        var prefixes = propertyPrefixMap[property];\n        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {\n          // join all prefixes and create a new value\n          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));\n        }\n      }\n    }\n\n    multipleValues[i] = values.join(',');\n  }\n\n  return multipleValues.join(',');\n}\n\nfunction transition(property, value, style, propertyPrefixMap) {\n  // also check for already prefixed transitions\n  if (typeof value === 'string' && properties.hasOwnProperty(property)) {\n    var outputValue = prefixValue(value, propertyPrefixMap);\n    // if the property is already prefixed\n    var webkitOutput = outputValue.split(/,(?![^()]*(?:\\([^()]*\\))?\\))/g).filter(function (val) {\n      return !/-moz-|-ms-/.test(val);\n    }).join(',');\n\n    if (property.indexOf('Webkit') > -1) {\n      return webkitOutput;\n    }\n\n    var mozOutput = outputValue.split(/,(?![^()]*(?:\\([^()]*\\))?\\))/g).filter(function (val) {\n      return !/-webkit-|-ms-/.test(val);\n    }).join(',');\n\n    if (property.indexOf('Moz') > -1) {\n      return mozOutput;\n    }\n\n    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;\n    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;\n    return outputValue;\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/transition.js?\n}");

/***/ },

/***/ 579
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorValues.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var _typeof = (__webpack_require__(/*! ./typeof.js */ 3738)[\"default\"]);\nfunction _regeneratorValues(e) {\n  if (null != e) {\n    var t = e[\"function\" == typeof Symbol && Symbol.iterator || \"@@iterator\"],\n      r = 0;\n    if (t) return t.call(e);\n    if (\"function\" == typeof e.next) return e;\n    if (!isNaN(e.length)) return {\n      next: function next() {\n        return e && r >= e.length && (e = void 0), {\n          value: e && e[r++],\n          done: !e\n        };\n      }\n    };\n  }\n  throw new TypeError(_typeof(e) + \" is not iterable\");\n}\nmodule.exports = _regeneratorValues, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorValues.js?\n}");

/***/ },

/***/ 646
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/invariant.js ***!
  \********************************************/
(module) {

"use strict";
eval("{/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\n\n\nvar validateFormat =  true ? function (format) {\n  if (format === undefined) {\n    throw new Error('invariant(...): Second argument must be a string.');\n  }\n} : 0;\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments to provide\n * information about what broke and what you were expecting.\n *\n * The invariant message will be stripped in production, but the invariant will\n * remain to ensure logic does not differ in production.\n */\n\nfunction invariant(condition, format) {\n  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  validateFormat(format);\n\n  if (!condition) {\n    var error;\n\n    if (format === undefined) {\n      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');\n    } else {\n      var argIndex = 0;\n      error = new Error(format.replace(/%s/g, function () {\n        return String(args[argIndex++]);\n      }));\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // Skip invariant's own stack frame.\n\n    throw error;\n  }\n}\n\nmodule.exports = invariant;\n\n//# sourceURL=webpack://GameApp/./node_modules/fbjs/lib/invariant.js?\n}");

/***/ },

/***/ 691
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
(module) {

eval("{function _isNativeFunction(t) {\n  try {\n    return -1 !== Function.toString.call(t).indexOf(\"[native code]\");\n  } catch (n) {\n    return \"function\" == typeof t;\n  }\n}\nmodule.exports = _isNativeFunction, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/isNativeFunction.js?\n}");

/***/ },

/***/ 801
/*!***********************************************!*\
  !*** ./node_modules/nullthrows/nullthrows.js ***!
  \***********************************************/
(module) {

"use strict";
eval("{\n\nfunction nullthrows(x, message) {\n  if (x != null) {\n    return x;\n  }\n  var error = new Error(message !== undefined ? message : 'Got unexpected ' + x);\n  error.framesToPop = 1; // Skip nullthrows's own stack frame.\n  throw error;\n}\n\nmodule.exports = nullthrows;\nmodule.exports[\"default\"] = nullthrows;\n\nObject.defineProperty(module.exports, \"__esModule\", ({value: true}));\n\n\n//# sourceURL=webpack://GameApp/./node_modules/nullthrows/nullthrows.js?\n}");

/***/ },

/***/ 887
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var regenerator = __webpack_require__(/*! ./regenerator.js */ 6993);\nvar regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ 1791);\nfunction _regeneratorAsyncGen(r, e, t, o, n) {\n  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);\n}\nmodule.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js?\n}");

/***/ },

/***/ 927
/*!**************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/resolveArrayValue.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ resolveArrayValue)\n/* harmony export */ });\n/* harmony import */ var _hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hyphenateProperty */ 5360);\n\nfunction resolveArrayValue(property, value) {\n  return value.join(';' + (0,_hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(property) + ':');\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/resolveArrayValue.js?\n}");

/***/ },

/***/ 1003
/*!***********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _createForOfIteratorHelperLoose)\n/* harmony export */ });\n/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7800);\n\nfunction _createForOfIteratorHelperLoose(r, e) {\n  var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"];\n  if (t) return (t = t.call(r)).next.bind(t);\n  if (Array.isArray(r) || (t = (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(r)) || e && r && \"number\" == typeof r.length) {\n    t && (r = t);\n    var o = 0;\n    return function () {\n      return o >= r.length ? {\n        done: !0\n      } : {\n        done: !1,\n        value: r[o++]\n      };\n    };\n  }\n  throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js?\n}");

/***/ },

/***/ 1099
/*!******************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/utils/isObject.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isObject;\nfunction isObject(value) {\n  return value instanceof Object && !Array.isArray(value);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/utils/isObject.js?\n}");

/***/ },

/***/ 1156
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
(module) {

eval("{function _iterableToArrayLimit(r, l) {\n  var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"];\n  if (null != t) {\n    var e,\n      n,\n      i,\n      u,\n      a = [],\n      f = !0,\n      o = !1;\n    try {\n      if (i = (t = t.call(r)).next, 0 === l) {\n        if (Object(t) !== t) return;\n        f = !1;\n      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);\n    } catch (r) {\n      o = !0, n = r;\n    } finally {\n      try {\n        if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return;\n      } finally {\n        if (o) throw n;\n      }\n    }\n    return a;\n  }\n}\nmodule.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?\n}");

/***/ },

/***/ 1261
/*!*********************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/crossFade.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = crossFade;\n\nvar _cssInJsUtils = __webpack_require__(/*! css-in-js-utils */ 1361);\n\nvar CROSS_FADE_REGEX = /cross-fade\\(/g;\n// http://caniuse.com/#search=cross-fade\nvar prefixes = ['-webkit-', ''];\n\nfunction crossFade(property, value) {\n  if (typeof value === 'string' && !(0, _cssInJsUtils.isPrefixedValue)(value) && value.indexOf('cross-fade(') !== -1) {\n    return prefixes.map(function (prefix) {\n      return value.replace(CROSS_FADE_REGEX, prefix + 'cross-fade(');\n    });\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/crossFade.js?\n}");

/***/ },

/***/ 1361
/*!**************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   assignStyle: () => (/* reexport safe */ _assignStyle__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   camelCaseProperty: () => (/* reexport safe */ _camelCaseProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   cssifyDeclaration: () => (/* reexport safe */ _cssifyDeclaration__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   cssifyObject: () => (/* reexport safe */ _cssifyObject__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   hyphenateProperty: () => (/* reexport safe */ _hyphenateProperty__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   isPrefixedProperty: () => (/* reexport safe */ _isPrefixedProperty__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   isPrefixedValue: () => (/* reexport safe */ _isPrefixedValue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   isUnitlessProperty: () => (/* reexport safe */ _isUnitlessProperty__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   normalizeProperty: () => (/* reexport safe */ _normalizeProperty__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   resolveArrayValue: () => (/* reexport safe */ _resolveArrayValue__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   unprefixProperty: () => (/* reexport safe */ _unprefixProperty__WEBPACK_IMPORTED_MODULE_10__[\"default\"]),\n/* harmony export */   unprefixValue: () => (/* reexport safe */ _unprefixValue__WEBPACK_IMPORTED_MODULE_11__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _assignStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assignStyle */ 5987);\n/* harmony import */ var _camelCaseProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camelCaseProperty */ 1822);\n/* harmony import */ var _cssifyDeclaration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cssifyDeclaration */ 7956);\n/* harmony import */ var _cssifyObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cssifyObject */ 7241);\n/* harmony import */ var _hyphenateProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hyphenateProperty */ 5360);\n/* harmony import */ var _isPrefixedProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isPrefixedProperty */ 7533);\n/* harmony import */ var _isPrefixedValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isPrefixedValue */ 4783);\n/* harmony import */ var _isUnitlessProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isUnitlessProperty */ 6299);\n/* harmony import */ var _normalizeProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./normalizeProperty */ 5971);\n/* harmony import */ var _resolveArrayValue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resolveArrayValue */ 927);\n/* harmony import */ var _unprefixProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./unprefixProperty */ 5743);\n/* harmony import */ var _unprefixValue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./unprefixValue */ 1653);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/index.js?\n}");

/***/ },

/***/ 1653
/*!**********************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/unprefixValue.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ unprefixValue)\n/* harmony export */ });\nvar RE = /(-ms-|-webkit-|-moz-|-o-)/g;\nfunction unprefixValue(value) {\n  if (typeof value === 'string') {\n    return value.replace(RE, '');\n  }\n\n  return value;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/unprefixValue.js?\n}");

/***/ },

/***/ 1791
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js ***!
  \*************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ 5172);\nvar regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ 5546);\nfunction AsyncIterator(t, e) {\n  function n(r, o, i, f) {\n    try {\n      var c = t[r](o),\n        u = c.value;\n      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {\n        n(\"next\", t, i, f);\n      }, function (t) {\n        n(\"throw\", t, i, f);\n      }) : e.resolve(u).then(function (t) {\n        c.value = t, i(c);\n      }, function (t) {\n        return n(\"throw\", t, i, f);\n      });\n    } catch (t) {\n      f(t);\n    }\n  }\n  var r;\n  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, \"function\" == typeof Symbol && Symbol.asyncIterator || \"@asyncIterator\", function () {\n    return this;\n  })), regeneratorDefine(this, \"_invoke\", function (t, o, i) {\n    function f() {\n      return new e(function (e, r) {\n        n(t, i, e, r);\n      });\n    }\n    return r = r ? r.then(f, f) : f();\n  }, !0);\n}\nmodule.exports = AsyncIterator, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js?\n}");

/***/ },

/***/ 1822
/*!**************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/camelCaseProperty.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ camelCaseProperty)\n/* harmony export */ });\nvar DASH = /-([a-z])/g;\nvar MS = /^Ms/g;\nvar cache = {};\n\nfunction toUpper(match) {\n  return match[1].toUpperCase();\n}\n\nfunction camelCaseProperty(property) {\n  if (cache.hasOwnProperty(property)) {\n    return cache[property];\n  }\n\n  var camelProp = property.replace(DASH, toUpper).replace(MS, 'ms');\n  cache[property] = camelProp;\n  return camelProp;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/camelCaseProperty.js?\n}");

/***/ },

/***/ 1837
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ 3072);\nvar setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 5636);\nvar isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ 691);\nvar construct = __webpack_require__(/*! ./construct.js */ 9646);\nfunction _wrapNativeSuper(t) {\n  var r = \"function\" == typeof Map ? new Map() : void 0;\n  return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {\n    if (null === t || !isNativeFunction(t)) return t;\n    if (\"function\" != typeof t) throw new TypeError(\"Super expression must either be null or a function\");\n    if (void 0 !== r) {\n      if (r.has(t)) return r.get(t);\n      r.set(t, Wrapper);\n    }\n    function Wrapper() {\n      return construct(t, arguments, getPrototypeOf(this).constructor);\n    }\n    return Wrapper.prototype = Object.create(t.prototype, {\n      constructor: {\n        value: Wrapper,\n        enumerable: !1,\n        writable: !0,\n        configurable: !0\n      }\n    }), setPrototypeOf(Wrapper, t);\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _wrapNativeSuper(t);\n}\nmodule.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/wrapNativeSuper.js?\n}");

/***/ },

/***/ 1847
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ 4893);\nfunction _objectWithoutProperties(e, t) {\n  if (null == e) return {};\n  var o,\n    r,\n    i = objectWithoutPropertiesLoose(e, t);\n  if (Object.getOwnPropertySymbols) {\n    var n = Object.getOwnPropertySymbols(e);\n    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);\n  }\n  return i;\n}\nmodule.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/objectWithoutProperties.js?\n}");

/***/ },

/***/ 2049
/*!************************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/utils/prefixProperty.js ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = prefixProperty;\n\nvar _capitalizeString = __webpack_require__(/*! ./capitalizeString */ 7091);\n\nvar _capitalizeString2 = _interopRequireDefault(_capitalizeString);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction prefixProperty(prefixProperties, property, style) {\n  var requiredPrefixes = prefixProperties[property];\n\n  if (requiredPrefixes && style.hasOwnProperty(property)) {\n    var capitalizedProperty = (0, _capitalizeString2.default)(property);\n\n    for (var i = 0; i < requiredPrefixes.length; ++i) {\n      var prefixedProperty = requiredPrefixes[i] + capitalizedProperty;\n\n      if (!style[prefixedProperty]) {\n        style[prefixedProperty] = style[property];\n      }\n    }\n  }\n\n  return style;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/utils/prefixProperty.js?\n}");

/***/ },

/***/ 2284
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _typeof)\n/* harmony export */ });\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/typeof.js?\n}");

/***/ },

/***/ 2327
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPrimitive)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ 2284);\n\nfunction toPrimitive(t, r) {\n  if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(t) || !t) return t;\n  var e = t[Symbol.toPrimitive];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/toPrimitive.js?\n}");

/***/ },

/***/ 2357
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-native-safe-area-context/lib/module/NativeSafeAreaProvider.web.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NativeSafeAreaProvider: () => (/* binding */ NativeSafeAreaProvider)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native */ 9176);\n/* eslint-env browser */\n\n\n\n/**\n * TODO:\n * Currently insets and frame are based on the window and are not\n * relative to the provider view. This is inconsistent with iOS and Android.\n * However in most cases if the provider view covers the screen this is not\n * an issue.\n */\n\nconst CSSTransitions = {\n  WebkitTransition: 'webkitTransitionEnd',\n  Transition: 'transitionEnd',\n  MozTransition: 'transitionend',\n  MSTransition: 'msTransitionEnd',\n  OTransition: 'oTransitionEnd'\n};\nfunction NativeSafeAreaProvider({\n  children,\n  style,\n  onInsetsChange\n}) {\n  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {\n    // Skip for SSR.\n    if (typeof document === 'undefined') {\n      return;\n    }\n    const element = createContextElement();\n    document.body.appendChild(element);\n    const onEnd = () => {\n      const {\n        paddingTop,\n        paddingBottom,\n        paddingLeft,\n        paddingRight\n      } = window.getComputedStyle(element);\n      const insets = {\n        top: paddingTop ? parseInt(paddingTop, 10) : 0,\n        bottom: paddingBottom ? parseInt(paddingBottom, 10) : 0,\n        left: paddingLeft ? parseInt(paddingLeft, 10) : 0,\n        right: paddingRight ? parseInt(paddingRight, 10) : 0\n      };\n      const frame = {\n        x: 0,\n        y: 0,\n        width: document.documentElement.offsetWidth,\n        height: document.documentElement.offsetHeight\n      };\n      // @ts-ignore: missing properties\n      onInsetsChange({\n        nativeEvent: {\n          insets,\n          frame\n        }\n      });\n    };\n    element.addEventListener(getSupportedTransitionEvent(), onEnd);\n    onEnd();\n    return () => {\n      document.body.removeChild(element);\n      element.removeEventListener(getSupportedTransitionEvent(), onEnd);\n    };\n  }, [onInsetsChange]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_native__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    style: style\n  }, children);\n}\nlet _supportedTransitionEvent = null;\nfunction getSupportedTransitionEvent() {\n  if (_supportedTransitionEvent != null) {\n    return _supportedTransitionEvent;\n  }\n  const element = document.createElement('invalidtype');\n  _supportedTransitionEvent = CSSTransitions.Transition;\n  for (const key in CSSTransitions) {\n    if (element.style[key] !== undefined) {\n      _supportedTransitionEvent = CSSTransitions[key];\n      break;\n    }\n  }\n  return _supportedTransitionEvent;\n}\nlet _supportedEnv = null;\nfunction getSupportedEnv() {\n  if (_supportedEnv !== null) {\n    return _supportedEnv;\n  }\n  const {\n    CSS\n  } = window;\n  if (CSS && CSS.supports && CSS.supports('top: constant(safe-area-inset-top)')) {\n    _supportedEnv = 'constant';\n  } else {\n    _supportedEnv = 'env';\n  }\n  return _supportedEnv;\n}\nfunction getInset(side) {\n  return `${getSupportedEnv()}(safe-area-inset-${side})`;\n}\nfunction createContextElement() {\n  const element = document.createElement('div');\n  const {\n    style\n  } = element;\n  style.position = 'fixed';\n  style.left = '0';\n  style.top = '0';\n  style.width = '0';\n  style.height = '0';\n  style.zIndex = '-1';\n  style.overflow = 'hidden';\n  style.visibility = 'hidden';\n  // Bacon: Anything faster than this and the callback will be invoked too early with the wrong insets\n  style.transitionDuration = '0.05s';\n  style.transitionProperty = 'padding';\n  style.transitionDelay = '0s';\n  style.paddingTop = getInset('top');\n  style.paddingBottom = getInset('bottom');\n  style.paddingLeft = getInset('left');\n  style.paddingRight = getInset('right');\n  return element;\n}\n//# sourceMappingURL=NativeSafeAreaProvider.web.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-safe-area-context/lib/module/NativeSafeAreaProvider.web.js?\n}");

/***/ },

/***/ 2475
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
(module) {

eval("{function _assertThisInitialized(e) {\n  if (void 0 === e) throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  return e;\n}\nmodule.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?\n}");

/***/ },

/***/ 2682
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{/** @license React v16.13.1\n * react-is.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\n// The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n// nor polyfill, then a plain number is used for performance.\nvar hasSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\nvar REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;\nvar REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;\nvar REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;\nvar REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;\nvar REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;\nvar REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary\n// (unstable) APIs that have been removed. Can we remove the symbols?\n\nvar REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;\nvar REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;\nvar REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;\nvar REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;\nvar REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;\nvar REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;\nvar REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;\nvar REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;\nvar REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;\nvar REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;\nvar REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;\n\nfunction isValidElementType(type) {\n  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.\n  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);\n}\n\nfunction typeOf(object) {\n  if (typeof object === 'object' && object !== null) {\n    var $$typeof = object.$$typeof;\n\n    switch ($$typeof) {\n      case REACT_ELEMENT_TYPE:\n        var type = object.type;\n\n        switch (type) {\n          case REACT_ASYNC_MODE_TYPE:\n          case REACT_CONCURRENT_MODE_TYPE:\n          case REACT_FRAGMENT_TYPE:\n          case REACT_PROFILER_TYPE:\n          case REACT_STRICT_MODE_TYPE:\n          case REACT_SUSPENSE_TYPE:\n            return type;\n\n          default:\n            var $$typeofType = type && type.$$typeof;\n\n            switch ($$typeofType) {\n              case REACT_CONTEXT_TYPE:\n              case REACT_FORWARD_REF_TYPE:\n              case REACT_LAZY_TYPE:\n              case REACT_MEMO_TYPE:\n              case REACT_PROVIDER_TYPE:\n                return $$typeofType;\n\n              default:\n                return $$typeof;\n            }\n\n        }\n\n      case REACT_PORTAL_TYPE:\n        return $$typeof;\n    }\n  }\n\n  return undefined;\n} // AsyncMode is deprecated along with isAsyncMode\n\nvar AsyncMode = REACT_ASYNC_MODE_TYPE;\nvar ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;\nvar ContextConsumer = REACT_CONTEXT_TYPE;\nvar ContextProvider = REACT_PROVIDER_TYPE;\nvar Element = REACT_ELEMENT_TYPE;\nvar ForwardRef = REACT_FORWARD_REF_TYPE;\nvar Fragment = REACT_FRAGMENT_TYPE;\nvar Lazy = REACT_LAZY_TYPE;\nvar Memo = REACT_MEMO_TYPE;\nvar Portal = REACT_PORTAL_TYPE;\nvar Profiler = REACT_PROFILER_TYPE;\nvar StrictMode = REACT_STRICT_MODE_TYPE;\nvar Suspense = REACT_SUSPENSE_TYPE;\nvar hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated\n\nfunction isAsyncMode(object) {\n  {\n    if (!hasWarnedAboutDeprecatedIsAsyncMode) {\n      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint\n\n      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');\n    }\n  }\n\n  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;\n}\nfunction isConcurrentMode(object) {\n  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;\n}\nfunction isContextConsumer(object) {\n  return typeOf(object) === REACT_CONTEXT_TYPE;\n}\nfunction isContextProvider(object) {\n  return typeOf(object) === REACT_PROVIDER_TYPE;\n}\nfunction isElement(object) {\n  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\nfunction isForwardRef(object) {\n  return typeOf(object) === REACT_FORWARD_REF_TYPE;\n}\nfunction isFragment(object) {\n  return typeOf(object) === REACT_FRAGMENT_TYPE;\n}\nfunction isLazy(object) {\n  return typeOf(object) === REACT_LAZY_TYPE;\n}\nfunction isMemo(object) {\n  return typeOf(object) === REACT_MEMO_TYPE;\n}\nfunction isPortal(object) {\n  return typeOf(object) === REACT_PORTAL_TYPE;\n}\nfunction isProfiler(object) {\n  return typeOf(object) === REACT_PROFILER_TYPE;\n}\nfunction isStrictMode(object) {\n  return typeOf(object) === REACT_STRICT_MODE_TYPE;\n}\nfunction isSuspense(object) {\n  return typeOf(object) === REACT_SUSPENSE_TYPE;\n}\n\nexports.AsyncMode = AsyncMode;\nexports.ConcurrentMode = ConcurrentMode;\nexports.ContextConsumer = ContextConsumer;\nexports.ContextProvider = ContextProvider;\nexports.Element = Element;\nexports.ForwardRef = ForwardRef;\nexports.Fragment = Fragment;\nexports.Lazy = Lazy;\nexports.Memo = Memo;\nexports.Portal = Portal;\nexports.Profiler = Profiler;\nexports.StrictMode = StrictMode;\nexports.Suspense = Suspense;\nexports.isAsyncMode = isAsyncMode;\nexports.isConcurrentMode = isConcurrentMode;\nexports.isContextConsumer = isContextConsumer;\nexports.isContextProvider = isContextProvider;\nexports.isElement = isElement;\nexports.isForwardRef = isForwardRef;\nexports.isFragment = isFragment;\nexports.isLazy = isLazy;\nexports.isMemo = isMemo;\nexports.isPortal = isPortal;\nexports.isProfiler = isProfiler;\nexports.isStrictMode = isStrictMode;\nexports.isSuspense = isSuspense;\nexports.isValidElementType = isValidElementType;\nexports.typeOf = typeOf;\n  })();\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js?\n}");

/***/ },

/***/ 2782
/*!************************************************************************************!*\
  !*** ./node_modules/react-native-safe-area-context/lib/module/SafeAreaView.web.js ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SafeAreaView: () => (/* binding */ SafeAreaView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native */ 1817);\n/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ 9176);\n/* harmony import */ var _SafeAreaContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SafeAreaContext */ 4372);\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\n\n\nconst defaultEdges = {\n  top: 'additive',\n  left: 'additive',\n  bottom: 'additive',\n  right: 'additive'\n};\nfunction getEdgeValue(inset, current, mode) {\n  switch (mode) {\n    case 'off':\n      return current;\n    case 'maximum':\n      return Math.max(current, inset);\n    case 'additive':\n    default:\n      return current + inset;\n  }\n}\nconst SafeAreaView = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({\n  style = {},\n  mode,\n  edges,\n  ...rest\n}, ref) => {\n  const insets = (0,_SafeAreaContext__WEBPACK_IMPORTED_MODULE_3__.useSafeAreaInsets)();\n  const edgesRecord = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {\n    if (edges == null) {\n      return defaultEdges;\n    }\n    return Array.isArray(edges) ? edges.reduce((acc, edge) => {\n      acc[edge] = 'additive';\n      return acc;\n    }, {}) :\n    // ts has trouble with refining readonly arrays.\n    edges;\n  }, [edges]);\n  const appliedStyle = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {\n    const flatStyle = react_native__WEBPACK_IMPORTED_MODULE_1__[\"default\"].flatten(style);\n    if (mode === 'margin') {\n      const {\n        margin = 0,\n        marginVertical = margin,\n        marginHorizontal = margin,\n        marginTop = marginVertical,\n        marginRight = marginHorizontal,\n        marginBottom = marginVertical,\n        marginLeft = marginHorizontal\n      } = flatStyle;\n      const marginStyle = {\n        marginTop: getEdgeValue(insets.top, marginTop, edgesRecord.top),\n        marginRight: getEdgeValue(insets.right, marginRight, edgesRecord.right),\n        marginBottom: getEdgeValue(insets.bottom, marginBottom, edgesRecord.bottom),\n        marginLeft: getEdgeValue(insets.left, marginLeft, edgesRecord.left)\n      };\n      return [style, marginStyle];\n    } else {\n      const {\n        padding = 0,\n        paddingVertical = padding,\n        paddingHorizontal = padding,\n        paddingTop = paddingVertical,\n        paddingRight = paddingHorizontal,\n        paddingBottom = paddingVertical,\n        paddingLeft = paddingHorizontal\n      } = flatStyle;\n      const paddingStyle = {\n        paddingTop: getEdgeValue(insets.top, paddingTop, edgesRecord.top),\n        paddingRight: getEdgeValue(insets.right, paddingRight, edgesRecord.right),\n        paddingBottom: getEdgeValue(insets.bottom, paddingBottom, edgesRecord.bottom),\n        paddingLeft: getEdgeValue(insets.left, paddingLeft, edgesRecord.left)\n      };\n      return [style, paddingStyle];\n    }\n  }, [edgesRecord.bottom, edgesRecord.left, edgesRecord.right, edgesRecord.top, insets.bottom, insets.left, insets.right, insets.top, mode, style]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_native__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _extends({\n    style: appliedStyle\n  }, rest, {\n    ref: ref\n  }));\n});\n//# sourceMappingURL=SafeAreaView.web.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-safe-area-context/lib/module/SafeAreaView.web.js?\n}");

/***/ },

/***/ 2882
/*!*******************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/unit.js ***!
  \*******************************************************/
(module) {

eval("{var minus = \"-\".charCodeAt(0);\nvar plus = \"+\".charCodeAt(0);\nvar dot = \".\".charCodeAt(0);\nvar exp = \"e\".charCodeAt(0);\nvar EXP = \"E\".charCodeAt(0);\n\n// Check if three code points would start a number\n// https://www.w3.org/TR/css-syntax-3/#starts-with-a-number\nfunction likeNumber(value) {\n  var code = value.charCodeAt(0);\n  var nextCode;\n\n  if (code === plus || code === minus) {\n    nextCode = value.charCodeAt(1);\n\n    if (nextCode >= 48 && nextCode <= 57) {\n      return true;\n    }\n\n    var nextNextCode = value.charCodeAt(2);\n\n    if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {\n      return true;\n    }\n\n    return false;\n  }\n\n  if (code === dot) {\n    nextCode = value.charCodeAt(1);\n\n    if (nextCode >= 48 && nextCode <= 57) {\n      return true;\n    }\n\n    return false;\n  }\n\n  if (code >= 48 && code <= 57) {\n    return true;\n  }\n\n  return false;\n}\n\n// Consume a number\n// https://www.w3.org/TR/css-syntax-3/#consume-number\nmodule.exports = function(value) {\n  var pos = 0;\n  var length = value.length;\n  var code;\n  var nextCode;\n  var nextNextCode;\n\n  if (length === 0 || !likeNumber(value)) {\n    return false;\n  }\n\n  code = value.charCodeAt(pos);\n\n  if (code === plus || code === minus) {\n    pos++;\n  }\n\n  while (pos < length) {\n    code = value.charCodeAt(pos);\n\n    if (code < 48 || code > 57) {\n      break;\n    }\n\n    pos += 1;\n  }\n\n  code = value.charCodeAt(pos);\n  nextCode = value.charCodeAt(pos + 1);\n\n  if (code === dot && nextCode >= 48 && nextCode <= 57) {\n    pos += 2;\n\n    while (pos < length) {\n      code = value.charCodeAt(pos);\n\n      if (code < 48 || code > 57) {\n        break;\n      }\n\n      pos += 1;\n    }\n  }\n\n  code = value.charCodeAt(pos);\n  nextCode = value.charCodeAt(pos + 1);\n  nextNextCode = value.charCodeAt(pos + 2);\n\n  if (\n    (code === exp || code === EXP) &&\n    ((nextCode >= 48 && nextCode <= 57) ||\n      ((nextCode === plus || nextCode === minus) &&\n        nextNextCode >= 48 &&\n        nextNextCode <= 57))\n  ) {\n    pos += nextCode === plus || nextCode === minus ? 3 : 2;\n\n    while (pos < length) {\n      code = value.charCodeAt(pos);\n\n      if (code < 48 || code > 57) {\n        break;\n      }\n\n      pos += 1;\n    }\n  }\n\n  return {\n    number: value.slice(0, pos),\n    unit: value.slice(pos)\n  };\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/postcss-value-parser/lib/unit.js?\n}");

/***/ },

/***/ 2987
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
(module) {

eval("{function _arrayWithHoles(r) {\n  if (Array.isArray(r)) return r;\n}\nmodule.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/arrayWithHoles.js?\n}");

/***/ },

/***/ 3072
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
(module) {

eval("{function _getPrototypeOf(t) {\n  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {\n    return t.__proto__ || Object.getPrototypeOf(t);\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _getPrototypeOf(t);\n}\nmodule.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?\n}");

/***/ },

/***/ 3145
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _arrayLikeToArray)\n/* harmony export */ });\nfunction _arrayLikeToArray(r, a) {\n  (null == a || a > r.length) && (a = r.length);\n  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];\n  return n;\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js?\n}");

/***/ },

/***/ 3176
/*!********************************************!*\
  !*** ./node_modules/styleq/dist/styleq.js ***!
  \********************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{/**\n * Copyright (c) Nicolas Gallagher\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.styleq = void 0;\nvar cache = new WeakMap();\nvar compiledKey = '$$css';\n\nfunction createStyleq(options) {\n  var disableCache;\n  var disableMix;\n  var transform;\n\n  if (options != null) {\n    disableCache = options.disableCache === true;\n    disableMix = options.disableMix === true;\n    transform = options.transform;\n  }\n\n  return function styleq() {\n    // Keep track of property commits to the className\n    var definedProperties = []; // The className and inline style to build up\n\n    var className = '';\n    var inlineStyle = null; // The current position in the cache graph\n\n    var nextCache = disableCache ? null : cache; // This way of creating an array from arguments is fastest\n\n    var styles = new Array(arguments.length);\n\n    for (var i = 0; i < arguments.length; i++) {\n      styles[i] = arguments[i];\n    } // Iterate over styles from last to first\n\n\n    while (styles.length > 0) {\n      var possibleStyle = styles.pop(); // Skip empty items\n\n      if (possibleStyle == null || possibleStyle === false) {\n        continue;\n      } // Push nested styles back onto the stack to be processed\n\n\n      if (Array.isArray(possibleStyle)) {\n        for (var _i = 0; _i < possibleStyle.length; _i++) {\n          styles.push(possibleStyle[_i]);\n        }\n\n        continue;\n      } // Process an individual style object\n\n\n      var style = transform != null ? transform(possibleStyle) : possibleStyle;\n\n      if (style.$$css) {\n        // Build up the class names defined by this object\n        var classNameChunk = ''; // Check the cache to see if we've already done this work\n\n        if (nextCache != null && nextCache.has(style)) {\n          // Cache: read\n          var cacheEntry = nextCache.get(style);\n\n          if (cacheEntry != null) {\n            classNameChunk = cacheEntry[0]; // $FlowIgnore\n\n            definedProperties.push.apply(definedProperties, cacheEntry[1]);\n            nextCache = cacheEntry[2];\n          }\n        } // Update the chunks with data from this object\n        else {\n          // The properties defined by this object\n          var definedPropertiesChunk = [];\n\n          for (var prop in style) {\n            var value = style[prop];\n            if (prop === compiledKey) continue; // Each property value is used as an HTML class name\n            // { 'debug.string': 'debug.string', opacity: 's-jskmnoqp' }\n\n            if (typeof value === 'string' || value === null) {\n              // Only add to chunks if this property hasn't already been seen\n              if (!definedProperties.includes(prop)) {\n                definedProperties.push(prop);\n\n                if (nextCache != null) {\n                  definedPropertiesChunk.push(prop);\n                }\n\n                if (typeof value === 'string') {\n                  classNameChunk += classNameChunk ? ' ' + value : value;\n                }\n              }\n            } // If we encounter a value that isn't a string or `null`\n            else {\n              console.error(\"styleq: \".concat(prop, \" typeof \").concat(String(value), \" is not \\\"string\\\" or \\\"null\\\".\"));\n            }\n          } // Cache: write\n\n\n          if (nextCache != null) {\n            // Create the next WeakMap for this sequence of styles\n            var weakMap = new WeakMap();\n            nextCache.set(style, [classNameChunk, definedPropertiesChunk, weakMap]);\n            nextCache = weakMap;\n          }\n        } // Order of classes in chunks matches property-iteration order of style\n        // object. Order of chunks matches passed order of styles from first to\n        // last (which we iterate over in reverse).\n\n\n        if (classNameChunk) {\n          className = className ? classNameChunk + ' ' + className : classNameChunk;\n        }\n      } // ----- DYNAMIC: Process inline style object -----\n      else {\n        if (disableMix) {\n          if (inlineStyle == null) {\n            inlineStyle = {};\n          }\n\n          inlineStyle = Object.assign({}, style, inlineStyle);\n        } else {\n          var subStyle = null;\n\n          for (var _prop in style) {\n            var _value = style[_prop];\n\n            if (_value !== undefined) {\n              if (!definedProperties.includes(_prop)) {\n                if (_value != null) {\n                  if (inlineStyle == null) {\n                    inlineStyle = {};\n                  }\n\n                  if (subStyle == null) {\n                    subStyle = {};\n                  }\n\n                  subStyle[_prop] = _value;\n                }\n\n                definedProperties.push(_prop); // Cache is unnecessary overhead if results can't be reused.\n\n                nextCache = null;\n              }\n            }\n          }\n\n          if (subStyle != null) {\n            inlineStyle = Object.assign(subStyle, inlineStyle);\n          }\n        }\n      }\n    }\n\n    var styleProps = [className, inlineStyle];\n    return styleProps;\n  };\n}\n\nvar styleq = createStyleq();\nexports.styleq = styleq;\nstyleq.factory = createStyleq;\n\n//# sourceURL=webpack://GameApp/./node_modules/styleq/dist/styleq.js?\n}");

/***/ },

/***/ 3268
/*!****************************************************!*\
  !*** ./node_modules/react-native-svg-web/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Circle: () => (/* binding */ Circle),\n/* harmony export */   ClipPath: () => (/* binding */ ClipPath),\n/* harmony export */   Defs: () => (/* binding */ Defs),\n/* harmony export */   Ellipse: () => (/* binding */ Ellipse),\n/* harmony export */   ForeignObject: () => (/* binding */ ForeignObject),\n/* harmony export */   G: () => (/* binding */ G),\n/* harmony export */   Image: () => (/* binding */ Image),\n/* harmony export */   Line: () => (/* binding */ Line),\n/* harmony export */   LinearGradient: () => (/* binding */ LinearGradient),\n/* harmony export */   Marker: () => (/* binding */ Marker),\n/* harmony export */   Mask: () => (/* binding */ Mask),\n/* harmony export */   Path: () => (/* binding */ Path),\n/* harmony export */   Pattern: () => (/* binding */ Pattern),\n/* harmony export */   Polygon: () => (/* binding */ Polygon),\n/* harmony export */   Polyline: () => (/* binding */ Polyline),\n/* harmony export */   RadialGradient: () => (/* binding */ RadialGradient),\n/* harmony export */   Rect: () => (/* binding */ Rect),\n/* harmony export */   Stop: () => (/* binding */ Stop),\n/* harmony export */   Svg: () => (/* binding */ Svg),\n/* harmony export */   Symbol: () => (/* binding */ Symbol),\n/* harmony export */   TSpan: () => (/* binding */ TSpan),\n/* harmony export */   Text: () => (/* binding */ Text),\n/* harmony export */   TextPath: () => (/* binding */ TextPath),\n/* harmony export */   Use: () => (/* binding */ Use),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_native_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native-web */ 5131);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ 5556);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/**\n * Copyright (c) 2017 Chris Baker <mail.chris.baker@gmail.com>\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n *\n */\n\n\n\n\nconst createReactElement =\n  react_native_web__WEBPACK_IMPORTED_MODULE_1__[\"default\"] || react__WEBPACK_IMPORTED_MODULE_0__.createElement;\n\nfunction createElement(name, type) {\n  class CreateElement extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    render() {\n      return createReactElement(type, this.props, this.props.children);\n    }\n  }\n\n  CreateElement.displayName = name;\n\n  CreateElement.propTypes = {\n    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),\n  };\n\n  CreateElement.defaultProps = {\n    children: undefined,\n  };\n\n  return CreateElement;\n}\n\nconst Svg = createElement(\"Svg\", \"svg\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Svg);\nSvg.Svg = Svg; // stay consistent with the old require based api\n\nconst Circle = createElement(\"Circle\", \"circle\");\nSvg.Circle = Circle;\n\nconst ClipPath = createElement(\"ClipPath\", \"clipPath\");\nSvg.ClipPath = ClipPath;\n\nconst Defs = createElement(\"Defs\", \"defs\");\nSvg.Defs = Defs;\n\nconst Ellipse = createElement(\"Ellipse\", \"ellipse\");\nSvg.Ellipse = Ellipse;\n\nconst ForeignObject = createElement(\"ForeignObject\", \"foreignObject\");\nSvg.ForeignObject = ForeignObject;\n\nconst G = createElement(\"G\", \"g\");\nSvg.G = G;\n\nconst Image = createElement(\"Image\", \"image\");\nSvg.Image = Image;\n\nconst Line = createElement(\"Line\", \"line\");\nSvg.Line = Line;\n\nconst LinearGradient = createElement(\"LinearGradient\", \"linearGradient\");\nSvg.LinearGradient = LinearGradient;\n\nconst Marker = createElement(\"Marker\", \"marker\");\nSvg.Marker = Marker;\n\nconst Mask = createElement(\"Mask\", \"mask\");\nSvg.Mask = Mask;\n\nconst Path = createElement(\"Path\", \"path\");\nSvg.Path = Path;\n\nconst Pattern = createElement(\"Pattern\", \"pattern\");\nSvg.Pattern = Pattern;\n\nconst Polygon = createElement(\"Polygon\", \"polygon\");\nSvg.Polygon = Polygon;\n\nconst Polyline = createElement(\"Polyline\", \"polyline\");\nSvg.Polyline = Polyline;\n\nconst RadialGradient = createElement(\"RadialGradient\", \"radialGradient\");\nSvg.RadialGradient = RadialGradient;\n\nconst Rect = createElement(\"Rect\", \"rect\");\nSvg.Rect = Rect;\n\nconst Stop = createElement(\"Stop\", \"stop\");\nSvg.Stop = Stop;\n\nconst Symbol = createElement(\"Symbol\", \"symbol\");\nSvg.Symbol = Symbol;\n\nconst Text = createElement(\"Text\", \"text\");\nSvg.Text = Text;\n\nconst TextPath = createElement(\"TextPath\", \"textPath\");\nSvg.TextPath = TextPath;\n\nconst TSpan = createElement(\"TSpan\", \"tspan\");\nSvg.TSpan = TSpan;\n\nconst Use = createElement(\"Use\", \"use\");\nSvg.Use = Use;\n\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-svg-web/index.js?\n}");

/***/ },

/***/ 3693
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 7736);\nfunction _defineProperty(e, r, t) {\n  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {\n    value: t,\n    enumerable: !0,\n    configurable: !0,\n    writable: !0\n  }) : e[r] = t, e;\n}\nmodule.exports = _defineProperty, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/defineProperty.js?\n}");

/***/ },

/***/ 3738
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
(module) {

eval("{function _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return module.exports = _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _typeof(o);\n}\nmodule.exports = _typeof, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/typeof.js?\n}");

/***/ },

/***/ 4014
/*!*************************************************************!*\
  !*** ./node_modules/css-in-js-utils/lib/isPrefixedValue.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isPrefixedValue;\nvar RE = /-webkit-|-moz-|-ms-/;\n\nfunction isPrefixedValue(value) {\n  return typeof value === 'string' && RE.test(value);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/lib/isPrefixedValue.js?\n}");

/***/ },

/***/ 4336
/*!**************************************************************!*\
  !*** ./node_modules/styleq/dist/transform-localize-style.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{/**\n * Copyright (c) Nicolas Gallagher\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.localizeStyle = localizeStyle;\nvar cache = new WeakMap();\nvar markerProp = '$$css$localize';\n/**\n * The compiler polyfills logical properties and values, generating a class\n * name for both writing directions. The style objects are annotated by\n * the compiler as needing this runtime transform. The results are memoized.\n *\n * { '$$css$localize': true, float: [ 'float-left', 'float-right' ] }\n * => { float: 'float-left' }\n */\n\nfunction compileStyle(style, isRTL) {\n  // Create a new compiled style for styleq\n  var compiledStyle = {};\n\n  for (var prop in style) {\n    if (prop !== markerProp) {\n      var value = style[prop];\n\n      if (Array.isArray(value)) {\n        compiledStyle[prop] = isRTL ? value[1] : value[0];\n      } else {\n        compiledStyle[prop] = value;\n      }\n    }\n  }\n\n  return compiledStyle;\n}\n\nfunction localizeStyle(style, isRTL) {\n  if (style[markerProp] != null) {\n    var compiledStyleIndex = isRTL ? 1 : 0; // Check the cache in case we've already seen this object\n\n    if (cache.has(style)) {\n      var _cachedStyles = cache.get(style);\n\n      var _compiledStyle = _cachedStyles[compiledStyleIndex];\n\n      if (_compiledStyle == null) {\n        // Update the missing cache entry\n        _compiledStyle = compileStyle(style, isRTL);\n        _cachedStyles[compiledStyleIndex] = _compiledStyle;\n        cache.set(style, _cachedStyles);\n      }\n\n      return _compiledStyle;\n    } // Create a new compiled style for styleq\n\n\n    var compiledStyle = compileStyle(style, isRTL);\n    var cachedStyles = new Array(2);\n    cachedStyles[compiledStyleIndex] = compiledStyle;\n    cache.set(style, cachedStyles);\n    return compiledStyle;\n  }\n\n  return style;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/styleq/dist/transform-localize-style.js?\n}");

/***/ },

/***/ 4372
/*!***********************************************************************************!*\
  !*** ./node_modules/react-native-safe-area-context/lib/module/SafeAreaContext.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SafeAreaConsumer: () => (/* binding */ SafeAreaConsumer),\n/* harmony export */   SafeAreaContext: () => (/* binding */ SafeAreaContext),\n/* harmony export */   SafeAreaFrameContext: () => (/* binding */ SafeAreaFrameContext),\n/* harmony export */   SafeAreaInsetsContext: () => (/* binding */ SafeAreaInsetsContext),\n/* harmony export */   SafeAreaListener: () => (/* binding */ SafeAreaListener),\n/* harmony export */   SafeAreaProvider: () => (/* binding */ SafeAreaProvider),\n/* harmony export */   useSafeArea: () => (/* binding */ useSafeArea),\n/* harmony export */   useSafeAreaFrame: () => (/* binding */ useSafeAreaFrame),\n/* harmony export */   useSafeAreaInsets: () => (/* binding */ useSafeAreaInsets),\n/* harmony export */   withSafeAreaInsets: () => (/* binding */ withSafeAreaInsets)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native */ 3384);\n/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native */ 1817);\n/* harmony import */ var _NativeSafeAreaProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NativeSafeAreaProvider */ 2357);\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\n\n\nconst isDev = \"development\" !== 'production';\nconst SafeAreaInsetsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);\nif (isDev) {\n  SafeAreaInsetsContext.displayName = 'SafeAreaInsetsContext';\n}\nconst SafeAreaFrameContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);\nif (isDev) {\n  SafeAreaFrameContext.displayName = 'SafeAreaFrameContext';\n}\nfunction SafeAreaProvider({\n  children,\n  initialMetrics,\n  initialSafeAreaInsets,\n  style,\n  ...others\n}) {\n  const parentInsets = useParentSafeAreaInsets();\n  const parentFrame = useParentSafeAreaFrame();\n  const [insets, setInsets] = react__WEBPACK_IMPORTED_MODULE_0__.useState(initialMetrics?.insets ?? initialSafeAreaInsets ?? parentInsets ?? null);\n  const [frame, setFrame] = react__WEBPACK_IMPORTED_MODULE_0__.useState(initialMetrics?.frame ?? parentFrame ?? {\n    // Backwards compat so we render anyway if we don't have frame.\n    x: 0,\n    y: 0,\n    width: react_native__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('window').width,\n    height: react_native__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('window').height\n  });\n  const onInsetsChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {\n    const {\n      nativeEvent: {\n        frame: nextFrame,\n        insets: nextInsets\n      }\n    } = event;\n    setFrame(curFrame => {\n      if (\n      // Backwards compat with old native code that won't send frame.\n      nextFrame && (nextFrame.height !== curFrame.height || nextFrame.width !== curFrame.width || nextFrame.x !== curFrame.x || nextFrame.y !== curFrame.y)) {\n        return nextFrame;\n      } else {\n        return curFrame;\n      }\n    });\n    setInsets(curInsets => {\n      if (!curInsets || nextInsets.bottom !== curInsets.bottom || nextInsets.left !== curInsets.left || nextInsets.right !== curInsets.right || nextInsets.top !== curInsets.top) {\n        return nextInsets;\n      } else {\n        return curInsets;\n      }\n    });\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_NativeSafeAreaProvider__WEBPACK_IMPORTED_MODULE_3__.NativeSafeAreaProvider, _extends({\n    style: [styles.fill, style],\n    onInsetsChange: onInsetsChange\n  }, others), insets != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SafeAreaFrameContext.Provider, {\n    value: frame\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SafeAreaInsetsContext.Provider, {\n    value: insets\n  }, children)) : null);\n}\nfunction SafeAreaListener({\n  onChange,\n  style,\n  children,\n  ...others\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_NativeSafeAreaProvider__WEBPACK_IMPORTED_MODULE_3__.NativeSafeAreaProvider, _extends({}, others, {\n    style: [styles.fill, style],\n    onInsetsChange: e => {\n      onChange({\n        insets: e.nativeEvent.insets,\n        frame: e.nativeEvent.frame\n      });\n    }\n  }), children);\n}\nconst styles = react_native__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create({\n  fill: {\n    flex: 1\n  }\n});\nfunction useParentSafeAreaInsets() {\n  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(SafeAreaInsetsContext);\n}\nfunction useParentSafeAreaFrame() {\n  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(SafeAreaFrameContext);\n}\nconst NO_INSETS_ERROR = 'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.';\nfunction useSafeAreaInsets() {\n  const insets = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SafeAreaInsetsContext);\n  if (insets == null) {\n    throw new Error(NO_INSETS_ERROR);\n  }\n  return insets;\n}\nfunction useSafeAreaFrame() {\n  const frame = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SafeAreaFrameContext);\n  if (frame == null) {\n    throw new Error(NO_INSETS_ERROR);\n  }\n  return frame;\n}\nfunction withSafeAreaInsets(WrappedComponent) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {\n    const insets = useSafeAreaInsets();\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent, _extends({}, props, {\n      insets: insets,\n      ref: ref\n    }));\n  });\n}\n\n/**\n * @deprecated\n */\nfunction useSafeArea() {\n  return useSafeAreaInsets();\n}\n\n/**\n * @deprecated\n */\nconst SafeAreaConsumer = SafeAreaInsetsContext.Consumer;\n\n/**\n * @deprecated\n */\nconst SafeAreaContext = SafeAreaInsetsContext;\n//# sourceMappingURL=SafeAreaContext.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-safe-area-context/lib/module/SafeAreaContext.js?\n}");

/***/ },

/***/ 4373
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorKeys.js ***!
  \****************************************************************/
(module) {

eval("{function _regeneratorKeys(e) {\n  var n = Object(e),\n    r = [];\n  for (var t in n) r.unshift(t);\n  return function e() {\n    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;\n    return e.done = !0, e;\n  };\n}\nmodule.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorKeys.js?\n}");

/***/ },

/***/ 4467
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _defineProperty)\n/* harmony export */ });\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ 9922);\n\nfunction _defineProperty(e, r, t) {\n  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(r)) in e ? Object.defineProperty(e, r, {\n    value: t,\n    enumerable: !0,\n    configurable: !0,\n    writable: !0\n  }) : e[r] = t, e;\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/defineProperty.js?\n}");

/***/ },

/***/ 4574
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactIs = __webpack_require__(/*! react-is */ 9678);\nvar assign = __webpack_require__(/*! object-assign */ 5228);\n\nvar ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ 6925);\nvar has = __webpack_require__(/*! ./lib/has */ 9376);\nvar checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ 228);\n\nvar printWarning = function() {};\n\nif (true) {\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\nfunction emptyFunctionThatReturnsNull() {\n  return null;\n}\n\nmodule.exports = function(isValidElement, throwOnDirectAccess) {\n  /* global Symbol */\n  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\n  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.\n\n  /**\n   * Returns the iterator method function contained on the iterable object.\n   *\n   * Be sure to invoke the function with the iterable as context:\n   *\n   *     var iteratorFn = getIteratorFn(myIterable);\n   *     if (iteratorFn) {\n   *       var iterator = iteratorFn.call(myIterable);\n   *       ...\n   *     }\n   *\n   * @param {?object} maybeIterable\n   * @return {?function}\n   */\n  function getIteratorFn(maybeIterable) {\n    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);\n    if (typeof iteratorFn === 'function') {\n      return iteratorFn;\n    }\n  }\n\n  /**\n   * Collection of methods that allow declaration and validation of props that are\n   * supplied to React components. Example usage:\n   *\n   *   var Props = require('ReactPropTypes');\n   *   var MyArticle = React.createClass({\n   *     propTypes: {\n   *       // An optional string prop named \"description\".\n   *       description: Props.string,\n   *\n   *       // A required enum prop named \"category\".\n   *       category: Props.oneOf(['News','Photos']).isRequired,\n   *\n   *       // A prop named \"dialog\" that requires an instance of Dialog.\n   *       dialog: Props.instanceOf(Dialog).isRequired\n   *     },\n   *     render: function() { ... }\n   *   });\n   *\n   * A more formal specification of how these methods are used:\n   *\n   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)\n   *   decl := ReactPropTypes.{type}(.isRequired)?\n   *\n   * Each and every declaration produces a function with the same signature. This\n   * allows the creation of custom validation functions. For example:\n   *\n   *  var MyLink = React.createClass({\n   *    propTypes: {\n   *      // An optional string or URI prop named \"href\".\n   *      href: function(props, propName, componentName) {\n   *        var propValue = props[propName];\n   *        if (propValue != null && typeof propValue !== 'string' &&\n   *            !(propValue instanceof URI)) {\n   *          return new Error(\n   *            'Expected a string or an URI for ' + propName + ' in ' +\n   *            componentName\n   *          );\n   *        }\n   *      }\n   *    },\n   *    render: function() {...}\n   *  });\n   *\n   * @internal\n   */\n\n  var ANONYMOUS = '<<anonymous>>';\n\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.\n  var ReactPropTypes = {\n    array: createPrimitiveTypeChecker('array'),\n    bigint: createPrimitiveTypeChecker('bigint'),\n    bool: createPrimitiveTypeChecker('boolean'),\n    func: createPrimitiveTypeChecker('function'),\n    number: createPrimitiveTypeChecker('number'),\n    object: createPrimitiveTypeChecker('object'),\n    string: createPrimitiveTypeChecker('string'),\n    symbol: createPrimitiveTypeChecker('symbol'),\n\n    any: createAnyTypeChecker(),\n    arrayOf: createArrayOfTypeChecker,\n    element: createElementTypeChecker(),\n    elementType: createElementTypeTypeChecker(),\n    instanceOf: createInstanceTypeChecker,\n    node: createNodeChecker(),\n    objectOf: createObjectOfTypeChecker,\n    oneOf: createEnumTypeChecker,\n    oneOfType: createUnionTypeChecker,\n    shape: createShapeTypeChecker,\n    exact: createStrictShapeTypeChecker,\n  };\n\n  /**\n   * inlined Object.is polyfill to avoid requiring consumers ship their own\n   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n   */\n  /*eslint-disable no-self-compare*/\n  function is(x, y) {\n    // SameValue algorithm\n    if (x === y) {\n      // Steps 1-5, 7-10\n      // Steps 6.b-6.e: +0 != -0\n      return x !== 0 || 1 / x === 1 / y;\n    } else {\n      // Step 6.a: NaN == NaN\n      return x !== x && y !== y;\n    }\n  }\n  /*eslint-enable no-self-compare*/\n\n  /**\n   * We use an Error-like object for backward compatibility as people may call\n   * PropTypes directly and inspect their output. However, we don't use real\n   * Errors anymore. We don't inspect their stack anyway, and creating them\n   * is prohibitively expensive if they are created too often, such as what\n   * happens in oneOfType() for any type before the one that matched.\n   */\n  function PropTypeError(message, data) {\n    this.message = message;\n    this.data = data && typeof data === 'object' ? data: {};\n    this.stack = '';\n  }\n  // Make `instanceof Error` still work for returned errors.\n  PropTypeError.prototype = Error.prototype;\n\n  function createChainableTypeChecker(validate) {\n    if (true) {\n      var manualPropTypeCallCache = {};\n      var manualPropTypeWarningCount = 0;\n    }\n    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {\n      componentName = componentName || ANONYMOUS;\n      propFullName = propFullName || propName;\n\n      if (secret !== ReactPropTypesSecret) {\n        if (throwOnDirectAccess) {\n          // New behavior only for users of `prop-types` package\n          var err = new Error(\n            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n            'Use `PropTypes.checkPropTypes()` to call them. ' +\n            'Read more at http://fb.me/use-check-prop-types'\n          );\n          err.name = 'Invariant Violation';\n          throw err;\n        } else if ( true && typeof console !== 'undefined') {\n          // Old behavior for people using React.PropTypes\n          var cacheKey = componentName + ':' + propName;\n          if (\n            !manualPropTypeCallCache[cacheKey] &&\n            // Avoid spamming the console because they are often not actionable except for lib authors\n            manualPropTypeWarningCount < 3\n          ) {\n            printWarning(\n              'You are manually calling a React.PropTypes validation ' +\n              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +\n              'and will throw in the standalone `prop-types` package. ' +\n              'You may be seeing this warning due to a third-party PropTypes ' +\n              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'\n            );\n            manualPropTypeCallCache[cacheKey] = true;\n            manualPropTypeWarningCount++;\n          }\n        }\n      }\n      if (props[propName] == null) {\n        if (isRequired) {\n          if (props[propName] === null) {\n            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));\n          }\n          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));\n        }\n        return null;\n      } else {\n        return validate(props, propName, componentName, location, propFullName);\n      }\n    }\n\n    var chainedCheckType = checkType.bind(null, false);\n    chainedCheckType.isRequired = checkType.bind(null, true);\n\n    return chainedCheckType;\n  }\n\n  function createPrimitiveTypeChecker(expectedType) {\n    function validate(props, propName, componentName, location, propFullName, secret) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== expectedType) {\n        // `propValue` being instance of, say, date/regexp, pass the 'object'\n        // check, but we can offer a more precise error message here rather than\n        // 'of type `object`'.\n        var preciseType = getPreciseType(propValue);\n\n        return new PropTypeError(\n          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),\n          {expectedType: expectedType}\n        );\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createAnyTypeChecker() {\n    return createChainableTypeChecker(emptyFunctionThatReturnsNull);\n  }\n\n  function createArrayOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');\n      }\n      var propValue = props[propName];\n      if (!Array.isArray(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));\n      }\n      for (var i = 0; i < propValue.length; i++) {\n        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);\n        if (error instanceof Error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!isValidElement(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!ReactIs.isValidElementType(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createInstanceTypeChecker(expectedClass) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!(props[propName] instanceof expectedClass)) {\n        var expectedClassName = expectedClass.name || ANONYMOUS;\n        var actualClassName = getClassName(props[propName]);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createEnumTypeChecker(expectedValues) {\n    if (!Array.isArray(expectedValues)) {\n      if (true) {\n        if (arguments.length > 1) {\n          printWarning(\n            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +\n            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'\n          );\n        } else {\n          printWarning('Invalid argument supplied to oneOf, expected an array.');\n        }\n      }\n      return emptyFunctionThatReturnsNull;\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      for (var i = 0; i < expectedValues.length; i++) {\n        if (is(propValue, expectedValues[i])) {\n          return null;\n        }\n      }\n\n      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {\n        var type = getPreciseType(value);\n        if (type === 'symbol') {\n          return String(value);\n        }\n        return value;\n      });\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createObjectOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');\n      }\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));\n      }\n      for (var key in propValue) {\n        if (has(propValue, key)) {\n          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n          if (error instanceof Error) {\n            return error;\n          }\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createUnionTypeChecker(arrayOfTypeCheckers) {\n    if (!Array.isArray(arrayOfTypeCheckers)) {\n       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;\n      return emptyFunctionThatReturnsNull;\n    }\n\n    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n      var checker = arrayOfTypeCheckers[i];\n      if (typeof checker !== 'function') {\n        printWarning(\n          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +\n          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'\n        );\n        return emptyFunctionThatReturnsNull;\n      }\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      var expectedTypes = [];\n      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n        var checker = arrayOfTypeCheckers[i];\n        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);\n        if (checkerResult == null) {\n          return null;\n        }\n        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {\n          expectedTypes.push(checkerResult.data.expectedType);\n        }\n      }\n      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createNodeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!isNode(props[propName])) {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function invalidValidatorError(componentName, location, propFullName, key, type) {\n    return new PropTypeError(\n      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +\n      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'\n    );\n  }\n\n  function createShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      for (var key in shapeTypes) {\n        var checker = shapeTypes[key];\n        if (typeof checker !== 'function') {\n          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createStrictShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      // We need to check all keys in case some are required but missing from props.\n      var allKeys = assign({}, props[propName], shapeTypes);\n      for (var key in allKeys) {\n        var checker = shapeTypes[key];\n        if (has(shapeTypes, key) && typeof checker !== 'function') {\n          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));\n        }\n        if (!checker) {\n          return new PropTypeError(\n            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +\n            '\\nBad object: ' + JSON.stringify(props[propName], null, '  ') +\n            '\\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')\n          );\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n\n    return createChainableTypeChecker(validate);\n  }\n\n  function isNode(propValue) {\n    switch (typeof propValue) {\n      case 'number':\n      case 'string':\n      case 'undefined':\n        return true;\n      case 'boolean':\n        return !propValue;\n      case 'object':\n        if (Array.isArray(propValue)) {\n          return propValue.every(isNode);\n        }\n        if (propValue === null || isValidElement(propValue)) {\n          return true;\n        }\n\n        var iteratorFn = getIteratorFn(propValue);\n        if (iteratorFn) {\n          var iterator = iteratorFn.call(propValue);\n          var step;\n          if (iteratorFn !== propValue.entries) {\n            while (!(step = iterator.next()).done) {\n              if (!isNode(step.value)) {\n                return false;\n              }\n            }\n          } else {\n            // Iterator will provide entry [k,v] tuples rather than values.\n            while (!(step = iterator.next()).done) {\n              var entry = step.value;\n              if (entry) {\n                if (!isNode(entry[1])) {\n                  return false;\n                }\n              }\n            }\n          }\n        } else {\n          return false;\n        }\n\n        return true;\n      default:\n        return false;\n    }\n  }\n\n  function isSymbol(propType, propValue) {\n    // Native Symbol.\n    if (propType === 'symbol') {\n      return true;\n    }\n\n    // falsy value can't be a Symbol\n    if (!propValue) {\n      return false;\n    }\n\n    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'\n    if (propValue['@@toStringTag'] === 'Symbol') {\n      return true;\n    }\n\n    // Fallback for non-spec compliant Symbols which are polyfilled.\n    if (typeof Symbol === 'function' && propValue instanceof Symbol) {\n      return true;\n    }\n\n    return false;\n  }\n\n  // Equivalent of `typeof` but with special handling for array and regexp.\n  function getPropType(propValue) {\n    var propType = typeof propValue;\n    if (Array.isArray(propValue)) {\n      return 'array';\n    }\n    if (propValue instanceof RegExp) {\n      // Old webkits (at least until Android 4.0) return 'function' rather than\n      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/\n      // passes PropTypes.object.\n      return 'object';\n    }\n    if (isSymbol(propType, propValue)) {\n      return 'symbol';\n    }\n    return propType;\n  }\n\n  // This handles more types than `getPropType`. Only used for error messages.\n  // See `createPrimitiveTypeChecker`.\n  function getPreciseType(propValue) {\n    if (typeof propValue === 'undefined' || propValue === null) {\n      return '' + propValue;\n    }\n    var propType = getPropType(propValue);\n    if (propType === 'object') {\n      if (propValue instanceof Date) {\n        return 'date';\n      } else if (propValue instanceof RegExp) {\n        return 'regexp';\n      }\n    }\n    return propType;\n  }\n\n  // Returns a string that is postfixed to a warning about an invalid type.\n  // For example, \"undefined\" or \"of type array\"\n  function getPostfixForTypeWarning(value) {\n    var type = getPreciseType(value);\n    switch (type) {\n      case 'array':\n      case 'object':\n        return 'an ' + type;\n      case 'boolean':\n      case 'date':\n      case 'regexp':\n        return 'a ' + type;\n      default:\n        return type;\n    }\n  }\n\n  // Returns class name of the object, if any.\n  function getClassName(propValue) {\n    if (!propValue.constructor || !propValue.constructor.name) {\n      return ANONYMOUS;\n    }\n    return propValue.constructor.name;\n  }\n\n  ReactPropTypes.checkPropTypes = checkPropTypes;\n  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/factoryWithTypeCheckers.js?\n}");

/***/ },

/***/ 4579
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 7736);\nfunction _defineProperties(e, r) {\n  for (var t = 0; t < r.length; t++) {\n    var o = r[t];\n    o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);\n  }\n}\nfunction _createClass(e, r, t) {\n  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", {\n    writable: !1\n  }), e;\n}\nmodule.exports = _createClass, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/createClass.js?\n}");

/***/ },

/***/ 4594
/*!******************************************!*\
  !*** ./node_modules/fbjs/lib/warning.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n\n\nvar emptyFunction = __webpack_require__(/*! ./emptyFunction */ 9395);\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\n\nfunction printWarning(format) {\n  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    args[_key - 1] = arguments[_key];\n  }\n\n  var argIndex = 0;\n  var message = 'Warning: ' + format.replace(/%s/g, function () {\n    return args[argIndex++];\n  });\n\n  if (typeof console !== 'undefined') {\n    console.error(message);\n  }\n\n  try {\n    // --- Welcome to debugging React ---\n    // This error was thrown as a convenience so that you can use this stack\n    // to find the callsite that caused this warning to fire.\n    throw new Error(message);\n  } catch (x) {}\n}\n\nvar warning =  true ? function (condition, format) {\n  if (format === undefined) {\n    throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');\n  }\n\n  if (!condition) {\n    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n      args[_key2 - 2] = arguments[_key2];\n    }\n\n    printWarning.apply(void 0, [format].concat(args));\n  }\n} : 0;\nmodule.exports = warning;\n\n//# sourceURL=webpack://GameApp/./node_modules/fbjs/lib/warning.js?\n}");

/***/ },

/***/ 4633
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ 5172);\nvar regenerator = __webpack_require__(/*! ./regenerator.js */ 6993);\nvar regeneratorAsync = __webpack_require__(/*! ./regeneratorAsync.js */ 5869);\nvar regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ 887);\nvar regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ 1791);\nvar regeneratorKeys = __webpack_require__(/*! ./regeneratorKeys.js */ 4373);\nvar regeneratorValues = __webpack_require__(/*! ./regeneratorValues.js */ 579);\nfunction _regeneratorRuntime() {\n  \"use strict\";\n\n  var r = regenerator(),\n    e = r.m(_regeneratorRuntime),\n    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;\n  function n(r) {\n    var e = \"function\" == typeof r && r.constructor;\n    return !!e && (e === t || \"GeneratorFunction\" === (e.displayName || e.name));\n  }\n  var o = {\n    \"throw\": 1,\n    \"return\": 2,\n    \"break\": 3,\n    \"continue\": 3\n  };\n  function a(r) {\n    var e, t;\n    return function (n) {\n      e || (e = {\n        stop: function stop() {\n          return t(n.a, 2);\n        },\n        \"catch\": function _catch() {\n          return n.v;\n        },\n        abrupt: function abrupt(r, e) {\n          return t(n.a, o[r], e);\n        },\n        delegateYield: function delegateYield(r, o, a) {\n          return e.resultName = o, t(n.d, regeneratorValues(r), a);\n        },\n        finish: function finish(r) {\n          return t(n.f, r);\n        }\n      }, t = function t(r, _t, o) {\n        n.p = e.prev, n.n = e.next;\n        try {\n          return r(_t, o);\n        } finally {\n          e.next = n.n;\n        }\n      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;\n      try {\n        return r.call(this, e);\n      } finally {\n        n.p = e.prev, n.n = e.next;\n      }\n    };\n  }\n  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {\n    return {\n      wrap: function wrap(e, t, n, o) {\n        return r.w(a(e), t, n, o && o.reverse());\n      },\n      isGeneratorFunction: n,\n      mark: r.m,\n      awrap: function awrap(r, e) {\n        return new OverloadYield(r, e);\n      },\n      AsyncIterator: regeneratorAsyncIterator,\n      async: function async(r, e, t, o, u) {\n        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);\n      },\n      keys: regeneratorKeys,\n      values: regeneratorValues\n    };\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports)();\n}\nmodule.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorRuntime.js?\n}");

/***/ },

/***/ 4756
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{// TODO(Babel 8): Remove this file.\n\nvar runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ 4633)();\nmodule.exports = runtime;\n\n// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/regenerator/index.js?\n}");

/***/ },

/***/ 4783
/*!************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/isPrefixedValue.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isPrefixedValue)\n/* harmony export */ });\nvar RE = /-webkit-|-moz-|-ms-/;\nfunction isPrefixedValue(value) {\n  return typeof value === 'string' && RE.test(value);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/isPrefixedValue.js?\n}");

/***/ },

/***/ 4893
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
(module) {

eval("{function _objectWithoutPropertiesLoose(r, e) {\n  if (null == r) return {};\n  var t = {};\n  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {\n    if (-1 !== e.indexOf(n)) continue;\n    t[n] = r[n];\n  }\n  return t;\n}\nmodule.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js?\n}");

/***/ },

/***/ 4994
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
(module) {

eval("{function _interopRequireDefault(e) {\n  return e && e.__esModule ? e : {\n    \"default\": e\n  };\n}\nmodule.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/interopRequireDefault.js?\n}");

/***/ },

/***/ 5129
/*!******************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/sizing.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = sizing;\nvar prefixes = ['-webkit-', '-moz-', ''];\n\nvar properties = {\n  maxHeight: true,\n  maxWidth: true,\n  width: true,\n  height: true,\n  columnWidth: true,\n  minWidth: true,\n  minHeight: true\n};\nvar values = {\n  'min-content': true,\n  'max-content': true,\n  'fill-available': true,\n  'fit-content': true,\n  'contain-floats': true\n};\n\nfunction sizing(property, value) {\n  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {\n    return prefixes.map(function (prefix) {\n      return prefix + value;\n    });\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/sizing.js?\n}");

/***/ },

/***/ 5172
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/OverloadYield.js ***!
  \**************************************************************/
(module) {

eval("{function _OverloadYield(e, d) {\n  this.v = e, this.k = d;\n}\nmodule.exports = _OverloadYield, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/OverloadYield.js?\n}");

/***/ },

/***/ 5228
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
(module) {

"use strict";
eval("{/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/object-assign/index.js?\n}");

/***/ },

/***/ 5360
/*!**************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/hyphenateProperty.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hyphenateProperty)\n/* harmony export */ });\n/* harmony import */ var hyphenate_style_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hyphenate-style-name */ 5685);\n\nfunction hyphenateProperty(property) {\n  return (0,hyphenate_style_name__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(property);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/hyphenateProperty.js?\n}");

/***/ },

/***/ 5407
/*!*********************************************************************************!*\
  !*** ./node_modules/react-native-safe-area-context/lib/module/InitialWindow.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialWindowMetrics: () => (/* binding */ initialWindowMetrics),\n/* harmony export */   initialWindowSafeAreaInsets: () => (/* binding */ initialWindowSafeAreaInsets)\n/* harmony export */ });\nconst initialWindowMetrics = null;\n\n/**\n * @deprecated\n */\nconst initialWindowSafeAreaInsets = null;\n//# sourceMappingURL=InitialWindow.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-safe-area-context/lib/module/InitialWindow.js?\n}");

/***/ },

/***/ 5475
/*!*************************************************************************!*\
  !*** ./node_modules/react-native-safe-area-context/lib/module/index.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SafeAreaConsumer: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaConsumer),\n/* harmony export */   SafeAreaContext: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaContext),\n/* harmony export */   SafeAreaFrameContext: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaFrameContext),\n/* harmony export */   SafeAreaInsetsContext: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaInsetsContext),\n/* harmony export */   SafeAreaListener: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaListener),\n/* harmony export */   SafeAreaProvider: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.SafeAreaProvider),\n/* harmony export */   SafeAreaView: () => (/* reexport safe */ _SafeAreaView__WEBPACK_IMPORTED_MODULE_1__.SafeAreaView),\n/* harmony export */   initialWindowMetrics: () => (/* reexport safe */ _InitialWindow__WEBPACK_IMPORTED_MODULE_2__.initialWindowMetrics),\n/* harmony export */   initialWindowSafeAreaInsets: () => (/* reexport safe */ _InitialWindow__WEBPACK_IMPORTED_MODULE_2__.initialWindowSafeAreaInsets),\n/* harmony export */   useSafeArea: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.useSafeArea),\n/* harmony export */   useSafeAreaFrame: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.useSafeAreaFrame),\n/* harmony export */   useSafeAreaInsets: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.useSafeAreaInsets),\n/* harmony export */   withSafeAreaInsets: () => (/* reexport safe */ _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__.withSafeAreaInsets)\n/* harmony export */ });\n/* harmony import */ var _SafeAreaContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SafeAreaContext */ 4372);\n/* harmony import */ var _SafeAreaView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SafeAreaView */ 2782);\n/* harmony import */ var _InitialWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InitialWindow */ 5407);\n'use client';\n\n\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/react-native-safe-area-context/lib/module/index.js?\n}");

/***/ },

/***/ 5482
/*!********************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/index.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var parse = __webpack_require__(/*! ./parse */ 8809);\nvar walk = __webpack_require__(/*! ./walk */ 8449);\nvar stringify = __webpack_require__(/*! ./stringify */ 9063);\n\nfunction ValueParser(value) {\n  if (this instanceof ValueParser) {\n    this.nodes = parse(value);\n    return this;\n  }\n  return new ValueParser(value);\n}\n\nValueParser.prototype.toString = function() {\n  return Array.isArray(this.nodes) ? stringify(this.nodes) : \"\";\n};\n\nValueParser.prototype.walk = function(cb, bubble) {\n  walk(this.nodes, cb, bubble);\n  return this;\n};\n\nValueParser.unit = __webpack_require__(/*! ./unit */ 2882);\n\nValueParser.walk = walk;\n\nValueParser.stringify = stringify;\n\nmodule.exports = ValueParser;\n\n\n//# sourceURL=webpack://GameApp/./node_modules/postcss-value-parser/lib/index.js?\n}");

/***/ },

/***/ 5546
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorDefine.js ***!
  \******************************************************************/
(module) {

eval("{function _regeneratorDefine(e, r, n, t) {\n  var i = Object.defineProperty;\n  try {\n    i({}, \"\", {});\n  } catch (e) {\n    i = 0;\n  }\n  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {\n    function o(r, n) {\n      _regeneratorDefine(e, r, function (e) {\n        return this._invoke(r, n, e);\n      });\n    }\n    r ? i ? i(e, r, {\n      value: n,\n      enumerable: !t,\n      configurable: !t,\n      writable: !t\n    }) : e[r] = n : (o(\"next\", 0), o(\"throw\", 1), o(\"return\", 2));\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _regeneratorDefine(e, r, n, t);\n}\nmodule.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorDefine.js?\n}");

/***/ },

/***/ 5556
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (true) {\n  var ReactIs = __webpack_require__(/*! react-is */ 9678);\n\n  // By explicitly using `prop-types` you are opting into new development behavior.\n  // http://fb.me/prop-types-in-prod\n  var throwOnDirectAccess = true;\n  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ 4574)(ReactIs.isElement, throwOnDirectAccess);\n} else // removed by dead control flow\n{}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/index.js?\n}");

/***/ },

/***/ 5636
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
(module) {

eval("{function _setPrototypeOf(t, e) {\n  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {\n    return t.__proto__ = e, t;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _setPrototypeOf(t, e);\n}\nmodule.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?\n}");

/***/ },

/***/ 5685
/*!****************************************************!*\
  !*** ./node_modules/hyphenate-style-name/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable no-var, prefer-template */\nvar uppercasePattern = /[A-Z]/g\nvar msPattern = /^ms-/\nvar cache = {}\n\nfunction toHyphenLower(match) {\n  return '-' + match.toLowerCase()\n}\n\nfunction hyphenateStyleName(name) {\n  if (cache.hasOwnProperty(name)) {\n    return cache[name]\n  }\n\n  var hName = name.replace(uppercasePattern, toHyphenLower)\n  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hyphenateStyleName);\n\n\n//# sourceURL=webpack://GameApp/./node_modules/hyphenate-style-name/index.js?\n}");

/***/ },

/***/ 5715
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 2987);\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 1156);\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7122);\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 7752);\nfunction _slicedToArray(r, e) {\n  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();\n}\nmodule.exports = _slicedToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/slicedToArray.js?\n}");

/***/ },

/***/ 5721
/*!***************************************************************!*\
  !*** ./node_modules/css-in-js-utils/lib/hyphenateProperty.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = hyphenateProperty;\n\nvar _hyphenateStyleName = __webpack_require__(/*! hyphenate-style-name */ 5685);\n\nvar _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction hyphenateProperty(property) {\n  return (0, _hyphenateStyleName2[\"default\"])(property);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/lib/hyphenateProperty.js?\n}");

/***/ },

/***/ 5743
/*!*************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/unprefixProperty.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ unprefixProperty)\n/* harmony export */ });\nvar RE = /^(ms|Webkit|Moz|O)/;\nfunction unprefixProperty(property) {\n  var propertyWithoutPrefix = property.replace(RE, '');\n  return propertyWithoutPrefix.charAt(0).toLowerCase() + propertyWithoutPrefix.slice(1);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/unprefixProperty.js?\n}");

/***/ },

/***/ 5869
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsync.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ 887);\nfunction _regeneratorAsync(n, e, r, t, o) {\n  var a = regeneratorAsyncGen(n, e, r, t, o);\n  return a.next().then(function (n) {\n    return n.done ? n.value : a.next();\n  });\n}\nmodule.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regeneratorAsync.js?\n}");

/***/ },

/***/ 5971
/*!**************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/normalizeProperty.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ normalizeProperty)\n/* harmony export */ });\n/* harmony import */ var _camelCaseProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camelCaseProperty */ 1822);\n/* harmony import */ var _unprefixProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unprefixProperty */ 5743);\n\n\nfunction normalizeProperty(property) {\n  return (0,_unprefixProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((0,_camelCaseProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(property));\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/normalizeProperty.js?\n}");

/***/ },

/***/ 5987
/*!********************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/assignStyle.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ assignStyle)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction filterUniqueArray(arr) {\n  return arr.filter(function (val, index) {\n    return arr.lastIndexOf(val) === index;\n  });\n}\n\nfunction assignStyle(base) {\n  for (var i = 0, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; ++i) {\n    var style = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];\n\n    for (var property in style) {\n      var value = style[property];\n      var baseValue = base[property];\n\n      if (baseValue && value) {\n        if (Array.isArray(baseValue)) {\n          base[property] = filterUniqueArray(baseValue.concat(value));\n          continue;\n        }\n\n        if (Array.isArray(value)) {\n          base[property] = filterUniqueArray([baseValue].concat(_toConsumableArray(value)));\n          continue;\n        }\n\n        if (_typeof(value) === 'object') {\n          base[property] = assignStyle({}, baseValue, value);\n          continue;\n        }\n      }\n\n      base[property] = value;\n    }\n  }\n\n  return base;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/assignStyle.js?\n}");

/***/ },

/***/ 6299
/*!***************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/isUnitlessProperty.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isUnitlessProperty)\n/* harmony export */ });\n/* harmony import */ var _hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hyphenateProperty */ 5360);\n\nvar unitlessProperties = {\n  borderImageOutset: true,\n  borderImageSlice: true,\n  borderImageWidth: true,\n  fontWeight: true,\n  lineHeight: true,\n  opacity: true,\n  orphans: true,\n  tabSize: true,\n  widows: true,\n  zIndex: true,\n  zoom: true,\n  // SVG-related properties\n  fillOpacity: true,\n  floodOpacity: true,\n  stopOpacity: true,\n  strokeDasharray: true,\n  strokeDashoffset: true,\n  strokeMiterlimit: true,\n  strokeOpacity: true,\n  strokeWidth: true\n};\nvar prefixedUnitlessProperties = ['animationIterationCount', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative', 'flexOrder', 'gridColumn', 'gridColumnEnd', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowStart', 'lineClamp', 'order'];\nvar prefixes = ['Webkit', 'ms', 'Moz', 'O'];\n\nfunction getPrefixedProperty(prefix, property) {\n  return prefix + property.charAt(0).toUpperCase() + property.slice(1);\n} // add all prefixed properties to the unitless properties\n\n\nfor (var i = 0, len = prefixedUnitlessProperties.length; i < len; ++i) {\n  var property = prefixedUnitlessProperties[i];\n  unitlessProperties[property] = true;\n\n  for (var j = 0, jLen = prefixes.length; j < jLen; ++j) {\n    unitlessProperties[getPrefixedProperty(prefixes[j], property)] = true;\n  }\n} // add all hypenated properties as well\n\n\nfor (var _property in unitlessProperties) {\n  unitlessProperties[(0,_hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_property)] = true;\n}\n\nfunction isUnitlessProperty(property) {\n  return unitlessProperties.hasOwnProperty(property);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/isUnitlessProperty.js?\n}");

/***/ },

/***/ 6368
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
(module) {

"use strict";
eval("{\n\nmodule.exports = value => {\n\tif (Object.prototype.toString.call(value) !== '[object Object]') {\n\t\treturn false;\n\t}\n\n\tconst prototype = Object.getPrototypeOf(value);\n\treturn prototype === null || prototype === Object.prototype;\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/is-plain-obj/index.js?\n}");

/***/ },

/***/ 6485
/*!******************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/createPrefixer.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = createPrefixer;\n\nvar _prefixProperty = __webpack_require__(/*! ./utils/prefixProperty */ 2049);\n\nvar _prefixProperty2 = _interopRequireDefault(_prefixProperty);\n\nvar _prefixValue = __webpack_require__(/*! ./utils/prefixValue */ 7971);\n\nvar _prefixValue2 = _interopRequireDefault(_prefixValue);\n\nvar _addNewValuesOnly = __webpack_require__(/*! ./utils/addNewValuesOnly */ 9863);\n\nvar _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);\n\nvar _isObject = __webpack_require__(/*! ./utils/isObject */ 1099);\n\nvar _isObject2 = _interopRequireDefault(_isObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction createPrefixer(_ref) {\n  var prefixMap = _ref.prefixMap,\n      plugins = _ref.plugins;\n\n  return function prefix(style) {\n    for (var property in style) {\n      var value = style[property];\n\n      // handle nested objects\n      if ((0, _isObject2.default)(value)) {\n        style[property] = prefix(value);\n        // handle array values\n      } else if (Array.isArray(value)) {\n        var combinedValue = [];\n\n        for (var i = 0, len = value.length; i < len; ++i) {\n          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);\n\n          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);\n        }\n\n        // only modify the value if it was touched\n        // by any plugin to prevent unnecessary mutations\n        if (combinedValue.length > 0) {\n          style[property] = combinedValue;\n        }\n      } else {\n        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);\n\n        // only modify the value if it was touched\n        // by any plugin to prevent unnecessary mutations\n        if (_processedValue) {\n          style[property] = _processedValue;\n        }\n\n        style = (0, _prefixProperty2.default)(prefixMap, property, style);\n      }\n    }\n\n    return style;\n  };\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/createPrefixer.js?\n}");

/***/ },

/***/ 6852
/*!********************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/imageSet.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = imageSet;\n\nvar _isPrefixedValue = __webpack_require__(/*! css-in-js-utils/lib/isPrefixedValue */ 4014);\n\nvar _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// http://caniuse.com/#feat=css-image-set\nvar prefixes = ['-webkit-', ''];\n\nfunction imageSet(property, value) {\n  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {\n    return prefixes.map(function (prefix) {\n      return value.replace(/image-set\\(/g, prefix + 'image-set(');\n    });\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/imageSet.js?\n}");

/***/ },

/***/ 6864
/*!*********************************************!*\
  !*** ./node_modules/merge-options/index.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{\nconst isOptionObject = __webpack_require__(/*! is-plain-obj */ 6368);\n\nconst {hasOwnProperty} = Object.prototype;\nconst {propertyIsEnumerable} = Object;\nconst defineProperty = (object, name, value) => Object.defineProperty(object, name, {\n\tvalue,\n\twritable: true,\n\tenumerable: true,\n\tconfigurable: true\n});\n\nconst globalThis = this;\nconst defaultMergeOptions = {\n\tconcatArrays: false,\n\tignoreUndefined: false\n};\n\nconst getEnumerableOwnPropertyKeys = value => {\n\tconst keys = [];\n\n\tfor (const key in value) {\n\t\tif (hasOwnProperty.call(value, key)) {\n\t\t\tkeys.push(key);\n\t\t}\n\t}\n\n\t/* istanbul ignore else  */\n\tif (Object.getOwnPropertySymbols) {\n\t\tconst symbols = Object.getOwnPropertySymbols(value);\n\n\t\tfor (const symbol of symbols) {\n\t\t\tif (propertyIsEnumerable.call(value, symbol)) {\n\t\t\t\tkeys.push(symbol);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn keys;\n};\n\nfunction clone(value) {\n\tif (Array.isArray(value)) {\n\t\treturn cloneArray(value);\n\t}\n\n\tif (isOptionObject(value)) {\n\t\treturn cloneOptionObject(value);\n\t}\n\n\treturn value;\n}\n\nfunction cloneArray(array) {\n\tconst result = array.slice(0, 0);\n\n\tgetEnumerableOwnPropertyKeys(array).forEach(key => {\n\t\tdefineProperty(result, key, clone(array[key]));\n\t});\n\n\treturn result;\n}\n\nfunction cloneOptionObject(object) {\n\tconst result = Object.getPrototypeOf(object) === null ? Object.create(null) : {};\n\n\tgetEnumerableOwnPropertyKeys(object).forEach(key => {\n\t\tdefineProperty(result, key, clone(object[key]));\n\t});\n\n\treturn result;\n}\n\n/**\n * @param {*} merged already cloned\n * @param {*} source something to merge\n * @param {string[]} keys keys to merge\n * @param {Object} config Config Object\n * @returns {*} cloned Object\n */\nconst mergeKeys = (merged, source, keys, config) => {\n\tkeys.forEach(key => {\n\t\tif (typeof source[key] === 'undefined' && config.ignoreUndefined) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Do not recurse into prototype chain of merged\n\t\tif (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {\n\t\t\tdefineProperty(merged, key, merge(merged[key], source[key], config));\n\t\t} else {\n\t\t\tdefineProperty(merged, key, clone(source[key]));\n\t\t}\n\t});\n\n\treturn merged;\n};\n\n/**\n * @param {*} merged already cloned\n * @param {*} source something to merge\n * @param {Object} config Config Object\n * @returns {*} cloned Object\n *\n * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)\n */\nconst concatArrays = (merged, source, config) => {\n\tlet result = merged.slice(0, 0);\n\tlet resultIndex = 0;\n\n\t[merged, source].forEach(array => {\n\t\tconst indices = [];\n\n\t\t// `result.concat(array)` with cloning\n\t\tfor (let k = 0; k < array.length; k++) {\n\t\t\tif (!hasOwnProperty.call(array, k)) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tindices.push(String(k));\n\n\t\t\tif (array === merged) {\n\t\t\t\t// Already cloned\n\t\t\t\tdefineProperty(result, resultIndex++, array[k]);\n\t\t\t} else {\n\t\t\t\tdefineProperty(result, resultIndex++, clone(array[k]));\n\t\t\t}\n\t\t}\n\n\t\t// Merge non-index keys\n\t\tresult = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter(key => !indices.includes(key)), config);\n\t});\n\n\treturn result;\n};\n\n/**\n * @param {*} merged already cloned\n * @param {*} source something to merge\n * @param {Object} config Config Object\n * @returns {*} cloned Object\n */\nfunction merge(merged, source, config) {\n\tif (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {\n\t\treturn concatArrays(merged, source, config);\n\t}\n\n\tif (!isOptionObject(source) || !isOptionObject(merged)) {\n\t\treturn clone(source);\n\t}\n\n\treturn mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);\n}\n\nmodule.exports = function (...options) {\n\tconst config = merge(clone(defaultMergeOptions), (this !== globalThis && this) || {}, defaultMergeOptions);\n\tlet merged = {_: {}};\n\n\tfor (const option of options) {\n\t\tif (option === undefined) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tif (!isOptionObject(option)) {\n\t\t\tthrow new TypeError('`' + option + '` is not an Option Object');\n\t\t}\n\n\t\tmerged = merge(merged, {_: option}, config);\n\t}\n\n\treturn merged._;\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/merge-options/index.js?\n}");

/***/ },

/***/ 6925
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
(module) {

"use strict";
eval("{/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/lib/ReactPropTypesSecret.js?\n}");

/***/ },

/***/ 6988
/*!**************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/commonjs/index.js ***!
  \**************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nObject.defineProperty(exports, \"useAsyncStorage\", ({\n  enumerable: true,\n  get: function () {\n    return _hooks.useAsyncStorage;\n  }\n}));\nvar _AsyncStorage = _interopRequireDefault(__webpack_require__(/*! ./AsyncStorage */ 9671));\nvar _hooks = __webpack_require__(/*! ./hooks */ 8476);\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nvar _default = exports[\"default\"] = _AsyncStorage.default;\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/@react-native-async-storage/async-storage/lib/commonjs/index.js?\n}");

/***/ },

/***/ 6993
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regenerator.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ 5546);\nfunction _regenerator() {\n  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */\n  var e,\n    t,\n    r = \"function\" == typeof Symbol ? Symbol : {},\n    n = r.iterator || \"@@iterator\",\n    o = r.toStringTag || \"@@toStringTag\";\n  function i(r, n, o, i) {\n    var c = n && n.prototype instanceof Generator ? n : Generator,\n      u = Object.create(c.prototype);\n    return regeneratorDefine(u, \"_invoke\", function (r, n, o) {\n      var i,\n        c,\n        u,\n        f = 0,\n        p = o || [],\n        y = !1,\n        G = {\n          p: 0,\n          n: 0,\n          v: e,\n          a: d,\n          f: d.bind(e, 4),\n          d: function d(t, r) {\n            return i = t, c = 0, u = e, G.n = r, a;\n          }\n        };\n      function d(r, n) {\n        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {\n          var o,\n            i = p[t],\n            d = G.p,\n            l = i[2];\n          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));\n        }\n        if (o || r > 1) return a;\n        throw y = !0, n;\n      }\n      return function (o, p, l) {\n        if (f > 1) throw TypeError(\"Generator is already running\");\n        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {\n          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);\n          try {\n            if (f = 2, i) {\n              if (c || (o = \"next\"), t = i[o]) {\n                if (!(t = t.call(i, u))) throw TypeError(\"iterator result is not an object\");\n                if (!t.done) return t;\n                u = t.value, c < 2 && (c = 0);\n              } else 1 === c && (t = i[\"return\"]) && t.call(i), c < 2 && (u = TypeError(\"The iterator does not provide a '\" + o + \"' method\"), c = 1);\n              i = e;\n            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;\n          } catch (t) {\n            i = e, c = 1, u = t;\n          } finally {\n            f = 1;\n          }\n        }\n        return {\n          value: t,\n          done: y\n        };\n      };\n    }(r, o, i), !0), u;\n  }\n  var a = {};\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n  t = Object.getPrototypeOf;\n  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {\n      return this;\n    }), t),\n    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);\n  function f(e) {\n    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, \"GeneratorFunction\")), e.prototype = Object.create(u), e;\n  }\n  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, \"constructor\", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction), GeneratorFunction.displayName = \"GeneratorFunction\", regeneratorDefine(GeneratorFunctionPrototype, o, \"GeneratorFunction\"), regeneratorDefine(u), regeneratorDefine(u, o, \"Generator\"), regeneratorDefine(u, n, function () {\n    return this;\n  }), regeneratorDefine(u, \"toString\", function () {\n    return \"[object Generator]\";\n  }), (module.exports = _regenerator = function _regenerator() {\n    return {\n      w: i,\n      m: f\n    };\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports)();\n}\nmodule.exports = _regenerator, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/regenerator.js?\n}");

/***/ },

/***/ 7091
/*!**************************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/utils/capitalizeString.js ***!
  \**************************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = capitalizeString;\nfunction capitalizeString(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/utils/capitalizeString.js?\n}");

/***/ },

/***/ 7122
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 79);\nfunction _unsupportedIterableToArray(r, a) {\n  if (r) {\n    if (\"string\" == typeof r) return arrayLikeToArray(r, a);\n    var t = {}.toString.call(r).slice(8, -1);\n    return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;\n  }\n}\nmodule.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js?\n}");

/***/ },

/***/ 7241
/*!*********************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/cssifyObject.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ cssifyObject)\n/* harmony export */ });\n/* harmony import */ var _cssifyDeclaration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cssifyDeclaration */ 7956);\n\nfunction cssifyObject(style) {\n  var css = '';\n\n  for (var property in style) {\n    var value = style[property];\n\n    if (typeof value !== 'string' && typeof value !== 'number') {\n      continue;\n    } // prevents the semicolon after\n    // the last rule declaration\n\n\n    if (css) {\n      css += ';';\n    }\n\n    css += (0,_cssifyDeclaration__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(property, value);\n  }\n\n  return css;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/cssifyObject.js?\n}");

/***/ },

/***/ 7383
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
(module) {

eval("{function _classCallCheck(a, n) {\n  if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\");\n}\nmodule.exports = _classCallCheck, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/classCallCheck.js?\n}");

/***/ },

/***/ 7533
/*!***************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/isPrefixedProperty.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isPrefixedProperty)\n/* harmony export */ });\nvar RE = /^(Webkit|Moz|O|ms)/;\nfunction isPrefixedProperty(property) {\n  return RE.test(property);\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/isPrefixedProperty.js?\n}");

/***/ },

/***/ 7550
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
(module) {

eval("{function _isNativeReflectConstruct() {\n  try {\n    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n  } catch (t) {}\n  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {\n    return !!t;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports)();\n}\nmodule.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js?\n}");

/***/ },

/***/ 7736
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var _typeof = (__webpack_require__(/*! ./typeof.js */ 3738)[\"default\"]);\nvar toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 9045);\nfunction toPropertyKey(t) {\n  var i = toPrimitive(t, \"string\");\n  return \"symbol\" == _typeof(i) ? i : i + \"\";\n}\nmodule.exports = toPropertyKey, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/toPropertyKey.js?\n}");

/***/ },

/***/ 7752
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
(module) {

eval("{function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nmodule.exports = _nonIterableRest, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/nonIterableRest.js?\n}");

/***/ },

/***/ 7800
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _unsupportedIterableToArray)\n/* harmony export */ });\n/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ 3145);\n\nfunction _unsupportedIterableToArray(r, a) {\n  if (r) {\n    if (\"string\" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(r, a);\n    var t = {}.toString.call(r).slice(8, -1);\n    return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(r, a) : void 0;\n  }\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js?\n}");

/***/ },

/***/ 7956
/*!**************************************************************!*\
  !*** ./node_modules/css-in-js-utils/es/cssifyDeclaration.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ cssifyDeclaration)\n/* harmony export */ });\n/* harmony import */ var _hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hyphenateProperty */ 5360);\n\nfunction cssifyDeclaration(property, value) {\n  return (0,_hyphenateProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(property) + ':' + value;\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/css-in-js-utils/es/cssifyDeclaration.js?\n}");

/***/ },

/***/ 7971
/*!*********************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/utils/prefixValue.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = prefixValue;\nfunction prefixValue(plugins, property, value, style, metaData) {\n  for (var i = 0, len = plugins.length; i < len; ++i) {\n    var processedValue = plugins[i](property, value, style, metaData);\n\n    // we can stop processing if a value is returned\n    // as all plugin criteria are unique\n    if (processedValue) {\n      return processedValue;\n    }\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/utils/prefixValue.js?\n}");

/***/ },

/***/ 8168
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _extends)\n/* harmony export */ });\nfunction _extends() {\n  return _extends = Object.assign ? Object.assign.bind() : function (n) {\n    for (var e = 1; e < arguments.length; e++) {\n      var t = arguments[e];\n      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);\n    }\n    return n;\n  }, _extends.apply(null, arguments);\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/extends.js?\n}");

/***/ },

/***/ 8449
/*!*******************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/walk.js ***!
  \*******************************************************/
(module) {

eval("{module.exports = function walk(nodes, cb, bubble) {\n  var i, max, node, result;\n\n  for (i = 0, max = nodes.length; i < max; i += 1) {\n    node = nodes[i];\n    if (!bubble) {\n      result = cb(node, i, nodes);\n    }\n\n    if (\n      result !== false &&\n      node.type === \"function\" &&\n      Array.isArray(node.nodes)\n    ) {\n      walk(node.nodes, cb, bubble);\n    }\n\n    if (bubble) {\n      cb(node, i, nodes);\n    }\n  }\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/postcss-value-parser/lib/walk.js?\n}");

/***/ },

/***/ 8452
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var _typeof = (__webpack_require__(/*! ./typeof.js */ 3738)[\"default\"]);\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ 2475);\nfunction _possibleConstructorReturn(t, e) {\n  if (e && (\"object\" == _typeof(e) || \"function\" == typeof e)) return e;\n  if (void 0 !== e) throw new TypeError(\"Derived constructors may only return object or undefined\");\n  return assertThisInitialized(t);\n}\nmodule.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?\n}");

/***/ },

/***/ 8476
/*!**************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/commonjs/hooks.js ***!
  \**************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.useAsyncStorage = useAsyncStorage;\nvar _AsyncStorage = _interopRequireDefault(__webpack_require__(/*! ./AsyncStorage */ 9671));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction useAsyncStorage(key) {\n  return {\n    getItem: (...args) => _AsyncStorage.default.getItem(key, ...args),\n    setItem: (...args) => _AsyncStorage.default.setItem(key, ...args),\n    mergeItem: (...args) => _AsyncStorage.default.mergeItem(key, ...args),\n    removeItem: (...args) => _AsyncStorage.default.removeItem(key, ...args)\n  };\n}\n//# sourceMappingURL=hooks.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/@react-native-async-storage/async-storage/lib/commonjs/hooks.js?\n}");

/***/ },

/***/ 8587
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _objectWithoutPropertiesLoose)\n/* harmony export */ });\nfunction _objectWithoutPropertiesLoose(r, e) {\n  if (null == r) return {};\n  var t = {};\n  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {\n    if (-1 !== e.indexOf(n)) continue;\n    t[n] = r[n];\n  }\n  return t;\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js?\n}");

/***/ },

/***/ 8809
/*!********************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/parse.js ***!
  \********************************************************/
(module) {

eval("{var openParentheses = \"(\".charCodeAt(0);\nvar closeParentheses = \")\".charCodeAt(0);\nvar singleQuote = \"'\".charCodeAt(0);\nvar doubleQuote = '\"'.charCodeAt(0);\nvar backslash = \"\\\\\".charCodeAt(0);\nvar slash = \"/\".charCodeAt(0);\nvar comma = \",\".charCodeAt(0);\nvar colon = \":\".charCodeAt(0);\nvar star = \"*\".charCodeAt(0);\nvar uLower = \"u\".charCodeAt(0);\nvar uUpper = \"U\".charCodeAt(0);\nvar plus = \"+\".charCodeAt(0);\nvar isUnicodeRange = /^[a-f0-9?-]+$/i;\n\nmodule.exports = function(input) {\n  var tokens = [];\n  var value = input;\n\n  var next,\n    quote,\n    prev,\n    token,\n    escape,\n    escapePos,\n    whitespacePos,\n    parenthesesOpenPos;\n  var pos = 0;\n  var code = value.charCodeAt(pos);\n  var max = value.length;\n  var stack = [{ nodes: tokens }];\n  var balanced = 0;\n  var parent;\n\n  var name = \"\";\n  var before = \"\";\n  var after = \"\";\n\n  while (pos < max) {\n    // Whitespaces\n    if (code <= 32) {\n      next = pos;\n      do {\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (code <= 32);\n      token = value.slice(pos, next);\n\n      prev = tokens[tokens.length - 1];\n      if (code === closeParentheses && balanced) {\n        after = token;\n      } else if (prev && prev.type === \"div\") {\n        prev.after = token;\n        prev.sourceEndIndex += token.length;\n      } else if (\n        code === comma ||\n        code === colon ||\n        (code === slash &&\n          value.charCodeAt(next + 1) !== star &&\n          (!parent ||\n            (parent && parent.type === \"function\" && parent.value !== \"calc\")))\n      ) {\n        before = token;\n      } else {\n        tokens.push({\n          type: \"space\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      }\n\n      pos = next;\n\n      // Quotes\n    } else if (code === singleQuote || code === doubleQuote) {\n      next = pos;\n      quote = code === singleQuote ? \"'\" : '\"';\n      token = {\n        type: \"string\",\n        sourceIndex: pos,\n        quote: quote\n      };\n      do {\n        escape = false;\n        next = value.indexOf(quote, next + 1);\n        if (~next) {\n          escapePos = next;\n          while (value.charCodeAt(escapePos - 1) === backslash) {\n            escapePos -= 1;\n            escape = !escape;\n          }\n        } else {\n          value += quote;\n          next = value.length - 1;\n          token.unclosed = true;\n        }\n      } while (escape);\n      token.value = value.slice(pos + 1, next);\n      token.sourceEndIndex = token.unclosed ? next : next + 1;\n      tokens.push(token);\n      pos = next + 1;\n      code = value.charCodeAt(pos);\n\n      // Comments\n    } else if (code === slash && value.charCodeAt(pos + 1) === star) {\n      next = value.indexOf(\"*/\", pos);\n\n      token = {\n        type: \"comment\",\n        sourceIndex: pos,\n        sourceEndIndex: next + 2\n      };\n\n      if (next === -1) {\n        token.unclosed = true;\n        next = value.length;\n        token.sourceEndIndex = next;\n      }\n\n      token.value = value.slice(pos + 2, next);\n      tokens.push(token);\n\n      pos = next + 2;\n      code = value.charCodeAt(pos);\n\n      // Operation within calc\n    } else if (\n      (code === slash || code === star) &&\n      parent &&\n      parent.type === \"function\" &&\n      parent.value === \"calc\"\n    ) {\n      token = value[pos];\n      tokens.push({\n        type: \"word\",\n        sourceIndex: pos - before.length,\n        sourceEndIndex: pos + token.length,\n        value: token\n      });\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      // Dividers\n    } else if (code === slash || code === comma || code === colon) {\n      token = value[pos];\n\n      tokens.push({\n        type: \"div\",\n        sourceIndex: pos - before.length,\n        sourceEndIndex: pos + token.length,\n        value: token,\n        before: before,\n        after: \"\"\n      });\n      before = \"\";\n\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      // Open parentheses\n    } else if (openParentheses === code) {\n      // Whitespaces after open parentheses\n      next = pos;\n      do {\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (code <= 32);\n      parenthesesOpenPos = pos;\n      token = {\n        type: \"function\",\n        sourceIndex: pos - name.length,\n        value: name,\n        before: value.slice(parenthesesOpenPos + 1, next)\n      };\n      pos = next;\n\n      if (name === \"url\" && code !== singleQuote && code !== doubleQuote) {\n        next -= 1;\n        do {\n          escape = false;\n          next = value.indexOf(\")\", next + 1);\n          if (~next) {\n            escapePos = next;\n            while (value.charCodeAt(escapePos - 1) === backslash) {\n              escapePos -= 1;\n              escape = !escape;\n            }\n          } else {\n            value += \")\";\n            next = value.length - 1;\n            token.unclosed = true;\n          }\n        } while (escape);\n        // Whitespaces before closed\n        whitespacePos = next;\n        do {\n          whitespacePos -= 1;\n          code = value.charCodeAt(whitespacePos);\n        } while (code <= 32);\n        if (parenthesesOpenPos < whitespacePos) {\n          if (pos !== whitespacePos + 1) {\n            token.nodes = [\n              {\n                type: \"word\",\n                sourceIndex: pos,\n                sourceEndIndex: whitespacePos + 1,\n                value: value.slice(pos, whitespacePos + 1)\n              }\n            ];\n          } else {\n            token.nodes = [];\n          }\n          if (token.unclosed && whitespacePos + 1 !== next) {\n            token.after = \"\";\n            token.nodes.push({\n              type: \"space\",\n              sourceIndex: whitespacePos + 1,\n              sourceEndIndex: next,\n              value: value.slice(whitespacePos + 1, next)\n            });\n          } else {\n            token.after = value.slice(whitespacePos + 1, next);\n            token.sourceEndIndex = next;\n          }\n        } else {\n          token.after = \"\";\n          token.nodes = [];\n        }\n        pos = next + 1;\n        token.sourceEndIndex = token.unclosed ? next : pos;\n        code = value.charCodeAt(pos);\n        tokens.push(token);\n      } else {\n        balanced += 1;\n        token.after = \"\";\n        token.sourceEndIndex = pos + 1;\n        tokens.push(token);\n        stack.push(token);\n        tokens = token.nodes = [];\n        parent = token;\n      }\n      name = \"\";\n\n      // Close parentheses\n    } else if (closeParentheses === code && balanced) {\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      parent.after = after;\n      parent.sourceEndIndex += after.length;\n      after = \"\";\n      balanced -= 1;\n      stack[stack.length - 1].sourceEndIndex = pos;\n      stack.pop();\n      parent = stack[balanced];\n      tokens = parent.nodes;\n\n      // Words\n    } else {\n      next = pos;\n      do {\n        if (code === backslash) {\n          next += 1;\n        }\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (\n        next < max &&\n        !(\n          code <= 32 ||\n          code === singleQuote ||\n          code === doubleQuote ||\n          code === comma ||\n          code === colon ||\n          code === slash ||\n          code === openParentheses ||\n          (code === star &&\n            parent &&\n            parent.type === \"function\" &&\n            parent.value === \"calc\") ||\n          (code === slash &&\n            parent.type === \"function\" &&\n            parent.value === \"calc\") ||\n          (code === closeParentheses && balanced)\n        )\n      );\n      token = value.slice(pos, next);\n\n      if (openParentheses === code) {\n        name = token;\n      } else if (\n        (uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) &&\n        plus === token.charCodeAt(1) &&\n        isUnicodeRange.test(token.slice(2))\n      ) {\n        tokens.push({\n          type: \"unicode-range\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      } else {\n        tokens.push({\n          type: \"word\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      }\n\n      pos = next;\n    }\n  }\n\n  for (pos = stack.length - 1; pos; pos -= 1) {\n    stack[pos].unclosed = true;\n    stack[pos].sourceEndIndex = value.length;\n  }\n\n  return stack[0].nodes;\n};\n\n\n//# sourceURL=webpack://GameApp/./node_modules/postcss-value-parser/lib/parse.js?\n}");

/***/ },

/***/ 9045
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var _typeof = (__webpack_require__(/*! ./typeof.js */ 3738)[\"default\"]);\nfunction toPrimitive(t, r) {\n  if (\"object\" != _typeof(t) || !t) return t;\n  var e = t[Symbol.toPrimitive];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != _typeof(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\nmodule.exports = toPrimitive, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/toPrimitive.js?\n}");

/***/ },

/***/ 9063
/*!************************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/stringify.js ***!
  \************************************************************/
(module) {

eval("{function stringifyNode(node, custom) {\n  var type = node.type;\n  var value = node.value;\n  var buf;\n  var customResult;\n\n  if (custom && (customResult = custom(node)) !== undefined) {\n    return customResult;\n  } else if (type === \"word\" || type === \"space\") {\n    return value;\n  } else if (type === \"string\") {\n    buf = node.quote || \"\";\n    return buf + value + (node.unclosed ? \"\" : buf);\n  } else if (type === \"comment\") {\n    return \"/*\" + value + (node.unclosed ? \"\" : \"*/\");\n  } else if (type === \"div\") {\n    return (node.before || \"\") + value + (node.after || \"\");\n  } else if (Array.isArray(node.nodes)) {\n    buf = stringify(node.nodes, custom);\n    if (type !== \"function\") {\n      return buf;\n    }\n    return (\n      value +\n      \"(\" +\n      (node.before || \"\") +\n      buf +\n      (node.after || \"\") +\n      (node.unclosed ? \"\" : \")\")\n    );\n  }\n  return value;\n}\n\nfunction stringify(nodes, custom) {\n  var result, i;\n\n  if (Array.isArray(nodes)) {\n    result = \"\";\n    for (i = nodes.length - 1; ~i; i -= 1) {\n      result = stringifyNode(nodes[i], custom) + result;\n    }\n    return result;\n  }\n  return stringifyNode(nodes, custom);\n}\n\nmodule.exports = stringify;\n\n\n//# sourceURL=webpack://GameApp/./node_modules/postcss-value-parser/lib/stringify.js?\n}");

/***/ },

/***/ 9293
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
(module) {

eval("{function asyncGeneratorStep(n, t, e, r, o, a, c) {\n  try {\n    var i = n[a](c),\n      u = i.value;\n  } catch (n) {\n    return void e(n);\n  }\n  i.done ? t(u) : Promise.resolve(u).then(r, o);\n}\nfunction _asyncToGenerator(n) {\n  return function () {\n    var t = this,\n      e = arguments;\n    return new Promise(function (r, o) {\n      var a = n.apply(t, e);\n      function _next(n) {\n        asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n);\n      }\n      function _throw(n) {\n        asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n);\n      }\n      _next(void 0);\n    });\n  };\n}\nmodule.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/asyncToGenerator.js?\n}");

/***/ },

/***/ 9376
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
(module) {

eval("{module.exports = Function.call.bind(Object.prototype.hasOwnProperty);\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/lib/has.js?\n}");

/***/ },

/***/ 9379
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _objectSpread2)\n/* harmony export */ });\n/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ 4467);\n\nfunction ownKeys(e, r) {\n  var t = Object.keys(e);\n  if (Object.getOwnPropertySymbols) {\n    var o = Object.getOwnPropertySymbols(e);\n    r && (o = o.filter(function (r) {\n      return Object.getOwnPropertyDescriptor(e, r).enumerable;\n    })), t.push.apply(t, o);\n  }\n  return t;\n}\nfunction _objectSpread2(e) {\n  for (var r = 1; r < arguments.length; r++) {\n    var t = null != arguments[r] ? arguments[r] : {};\n    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {\n      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e, r, t[r]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {\n      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));\n    });\n  }\n  return e;\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/objectSpread2.js?\n}");

/***/ },

/***/ 9395
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
(module) {

"use strict";
eval("{\n\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\nfunction makeEmptyFunction(arg) {\n  return function () {\n    return arg;\n  };\n}\n/**\n * This function accepts and discards inputs; it has no side effects. This is\n * primarily useful idiomatically for overridable function endpoints which\n * always need to be callable, since JS lacks a null-call idiom ala Cocoa.\n */\n\n\nvar emptyFunction = function emptyFunction() {};\n\nemptyFunction.thatReturns = makeEmptyFunction;\nemptyFunction.thatReturnsFalse = makeEmptyFunction(false);\nemptyFunction.thatReturnsTrue = makeEmptyFunction(true);\nemptyFunction.thatReturnsNull = makeEmptyFunction(null);\n\nemptyFunction.thatReturnsThis = function () {\n  return this;\n};\n\nemptyFunction.thatReturnsArgument = function (arg) {\n  return arg;\n};\n\nmodule.exports = emptyFunction;\n\n//# sourceURL=webpack://GameApp/./node_modules/fbjs/lib/emptyFunction.js?\n}");

/***/ },

/***/ 9511
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 5636);\nfunction _inherits(t, e) {\n  if (\"function\" != typeof e && null !== e) throw new TypeError(\"Super expression must either be null or a function\");\n  t.prototype = Object.create(e && e.prototype, {\n    constructor: {\n      value: t,\n      writable: !0,\n      configurable: !0\n    }\n  }), Object.defineProperty(t, \"prototype\", {\n    writable: !1\n  }), e && setPrototypeOf(t, e);\n}\nmodule.exports = _inherits, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/inherits.js?\n}");

/***/ },

/***/ 9646
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 7550);\nvar setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 5636);\nfunction _construct(t, e, r) {\n  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);\n  var o = [null];\n  o.push.apply(o, e);\n  var p = new (t.bind.apply(t, o))();\n  return r && setPrototypeOf(p, r.prototype), p;\n}\nmodule.exports = _construct, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/construct.js?\n}");

/***/ },

/***/ 9671
/*!*********************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _mergeOptions = _interopRequireDefault(__webpack_require__(/*! merge-options */ 6864));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n/**\n * Copyright (c) Nicolas Gallagher.\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n// eslint-disable-next-line @typescript-eslint/ban-types\n\n// eslint-disable-next-line @typescript-eslint/ban-types\n\nconst merge = _mergeOptions.default.bind({\n  concatArrays: true,\n  ignoreUndefined: true\n});\nfunction mergeLocalStorageItem(key, value) {\n  const oldValue = window.localStorage.getItem(key);\n  if (oldValue) {\n    const oldObject = JSON.parse(oldValue);\n    const newObject = JSON.parse(value);\n    const nextValue = JSON.stringify(merge(oldObject, newObject));\n    window.localStorage.setItem(key, nextValue);\n  } else {\n    window.localStorage.setItem(key, value);\n  }\n}\nfunction createPromise(getValue, callback) {\n  return new Promise((resolve, reject) => {\n    try {\n      const value = getValue();\n      callback?.(null, value);\n      resolve(value);\n    } catch (err) {\n      callback?.(err);\n      reject(err);\n    }\n  });\n}\nfunction createPromiseAll(promises, callback, processResult) {\n  return Promise.all(promises).then(result => {\n    const value = processResult?.(result) ?? null;\n    callback?.(null, value);\n    return Promise.resolve(value);\n  }, errors => {\n    callback?.(errors);\n    return Promise.reject(errors);\n  });\n}\nconst AsyncStorage = {\n  /**\n   * Fetches `key` value.\n   */\n  getItem: (key, callback) => {\n    return createPromise(() => window.localStorage.getItem(key), callback);\n  },\n  /**\n   * Sets `value` for `key`.\n   */\n  setItem: (key, value, callback) => {\n    return createPromise(() => window.localStorage.setItem(key, value), callback);\n  },\n  /**\n   * Removes a `key`\n   */\n  removeItem: (key, callback) => {\n    return createPromise(() => window.localStorage.removeItem(key), callback);\n  },\n  /**\n   * Merges existing value with input value, assuming they are stringified JSON.\n   */\n  mergeItem: (key, value, callback) => {\n    return createPromise(() => mergeLocalStorageItem(key, value), callback);\n  },\n  /**\n   * Erases *all* AsyncStorage for the domain.\n   */\n  clear: callback => {\n    return createPromise(() => window.localStorage.clear(), callback);\n  },\n  /**\n   * Gets *all* keys known to the app, for all callers, libraries, etc.\n   */\n  getAllKeys: callback => {\n    return createPromise(() => {\n      const numberOfKeys = window.localStorage.length;\n      const keys = [];\n      for (let i = 0; i < numberOfKeys; i += 1) {\n        const key = window.localStorage.key(i) || \"\";\n        keys.push(key);\n      }\n      return keys;\n    }, callback);\n  },\n  /**\n   * (stub) Flushes any pending requests using a single batch call to get the data.\n   */\n  flushGetRequests: () => undefined,\n  /**\n   * multiGet resolves to an array of key-value pair arrays that matches the\n   * input format of multiSet.\n   *\n   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]\n   */\n  multiGet: (keys, callback) => {\n    const promises = keys.map(key => AsyncStorage.getItem(key));\n    const processResult = result => result.map((value, i) => [keys[i], value]);\n    return createPromiseAll(promises, callback, processResult);\n  },\n  /**\n   * Takes an array of key-value array pairs.\n   *   multiSet([['k1', 'val1'], ['k2', 'val2']])\n   */\n  multiSet: (keyValuePairs, callback) => {\n    const promises = keyValuePairs.map(item => AsyncStorage.setItem(item[0], item[1]));\n    return createPromiseAll(promises, callback);\n  },\n  /**\n   * Delete all the keys in the `keys` array.\n   */\n  multiRemove: (keys, callback) => {\n    const promises = keys.map(key => AsyncStorage.removeItem(key));\n    return createPromiseAll(promises, callback);\n  },\n  /**\n   * Takes an array of key-value array pairs and merges them with existing\n   * values, assuming they are stringified JSON.\n   *\n   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])\n   */\n  multiMerge: (keyValuePairs, callback) => {\n    const promises = keyValuePairs.map(item => AsyncStorage.mergeItem(item[0], item[1]));\n    return createPromiseAll(promises, callback);\n  }\n};\nvar _default = exports[\"default\"] = AsyncStorage;\n//# sourceMappingURL=AsyncStorage.js.map\n\n//# sourceURL=webpack://GameApp/./node_modules/@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage.js?\n}");

/***/ },

/***/ 9678
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{\n\nif (false) // removed by dead control flow\n{} else {\n  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ 2682);\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/prop-types/node_modules/react-is/index.js?\n}");

/***/ },

/***/ 9863
/*!**************************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/utils/addNewValuesOnly.js ***!
  \**************************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = addNewValuesOnly;\nfunction addIfNew(list, value) {\n  if (list.indexOf(value) === -1) {\n    list.push(value);\n  }\n}\n\nfunction addNewValuesOnly(list, values) {\n  if (Array.isArray(values)) {\n    for (var i = 0, len = values.length; i < len; ++i) {\n      addIfNew(list, values[i]);\n    }\n  } else {\n    addIfNew(list, values);\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/utils/addNewValuesOnly.js?\n}");

/***/ },

/***/ 9922
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPropertyKey)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ 2284);\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ 2327);\n\n\nfunction toPropertyKey(t) {\n  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(t, \"string\");\n  return \"symbol\" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i) ? i : i + \"\";\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js?\n}");

/***/ },

/***/ 9982
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("{\n\nif (false) // removed by dead control flow\n{} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ 213);\n}\n\n\n//# sourceURL=webpack://GameApp/./node_modules/scheduler/index.js?\n}");

/***/ },

/***/ 9996
/*!********************************************************************!*\
  !*** ./node_modules/inline-style-prefixer/lib/plugins/position.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

"use strict";
eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = position;\nfunction position(property, value) {\n  if (property === 'position' && value === 'sticky') {\n    return ['-webkit-sticky', 'sticky'];\n  }\n}\n\n//# sourceURL=webpack://GameApp/./node_modules/inline-style-prefixer/lib/plugins/position.js?\n}");

/***/ }

}]);