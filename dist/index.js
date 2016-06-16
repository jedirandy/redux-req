(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxRequest"] = factory();
	else
		root["ReduxRequest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _middleware = __webpack_require__(2);

	Object.keys(_middleware).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _middleware[key];
	    }
	  });
	});

	var _request = __webpack_require__(3);

	Object.keys(_request).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _request[key];
	    }
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.middleware = exports.ACTION_TYPE = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _request = __webpack_require__(3);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ACTION_TYPE = exports.ACTION_TYPE = 'REDUX_REQUEST';

	var middleware = exports.middleware = function middleware(store) {
	    return function (next) {
	        return function (action) {
	            if (action.type === ACTION_TYPE) {
	                var _ret = function () {
	                    var url = action.url;
	                    var _action$method = action.method;
	                    var method = _action$method === undefined ? 'GET' : _action$method;
	                    var payload = action.payload;
	                    var requestType = action.requestType;
	                    var receiveType = action.receiveType;
	                    var resourceName = action.resourceName;
	                    var beforeSend = action.beforeSend;

	                    var requestedAt = new Date();
	                    next({
	                        type: requestType,
	                        requestedAt: requestedAt,
	                        resourceName: resourceName
	                    });
	                    return {
	                        v: (0, _request2.default)(url, method, {
	                            payload: payload,
	                            beforeSend: beforeSend,
	                            onSuccess: function onSuccess(res) {
	                                return next({
	                                    type: receiveType,
	                                    error: false,
	                                    payload: res,
	                                    requestedAt: requestedAt,
	                                    resourceName: resourceName
	                                });
	                            },
	                            onFailure: function onFailure(err) {
	                                return next({
	                                    type: receiveType,
	                                    error: true,
	                                    payload: err,
	                                    requestedAt: requestedAt,
	                                    resourceName: resourceName
	                                });
	                            }
	                        })
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            } else {
	                return next(action);
	            }
	        };
	    };
	};

	exports.default = middleware;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var noop = function noop() {};

	var request = exports.request = function request(url, method, _ref) {
	    var payload = _ref.payload;
	    var onSuccess = _ref.onSuccess;
	    var onError = _ref.onError;
	    var _ref$beforeSend = _ref.beforeSend;
	    var beforeSend = _ref$beforeSend === undefined ? noop : _ref$beforeSend;

	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url, true);
	    beforeSend(xhr);
	    xhr.send(payload);
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) if (xhr.status < 400) onSuccess(xhr.response, xhr);else onError(xhr.response, xhr);
	    };
	};

	exports.default = request;

/***/ }
/******/ ])
});
;