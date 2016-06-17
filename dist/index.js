(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SemanticFetch"] = factory();
	else
		root["SemanticFetch"] = factory();
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var defaultBodyResolver = exports.defaultBodyResolver = function defaultBodyResolver(res) {
	    var contentType = res.headers.get('content-type');
	    if (contentType.includes('text/plain')) return res.text();
	    if (contentType.includes('multipart/form-data')) return res.formData();
	    if (contentType.includes('application/json')) return res.json();
	    return res.blob();
	};

	var createFetch = exports.createFetch = function createFetch(fetch) {
	    var bodyResolver = arguments.length <= 1 || arguments[1] === undefined ? defaultBodyResolver : arguments[1];
	    return function (url, options) {
	        return fetch(url, options).then(function (res) {
	            return Promise.all([bodyResolver(res), Promise.resolve(res)]);
	        }, function (err) {
	            return Promise.reject(Response.error());
	        }).then(function (_ref) {
	            var _ref2 = _slicedToArray(_ref, 2);

	            var body = _ref2[0];
	            var res = _ref2[1];

	            var response = {
	                body: body,
	                _res: res,
	                status: res.status
	            };
	            if (res.status < 400) return Promise.resolve(response);else return Promise.reject(response);
	        });
	    };
	};

	exports.default = createFetch;

/***/ }
/******/ ])
});
;