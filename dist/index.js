(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tcomb"));
	else if(typeof define === 'function' && define.amd)
		define(["tcomb"], factory);
	else if(typeof exports === 'object')
		exports["RocketReact"] = factory(require("tcomb"));
	else
		root["RocketReact"] = factory(root["tcomb"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.JSONSiteMapType = exports.JSONRouteType = exports.JSONReplacementComponentType = exports.JSONComponentListType = exports.JSONComponentType = exports.JSONCloneComponentType = exports.ID = undefined;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ID = exports.ID = _tcomb2.default.union([_tcomb2.default.String, _tcomb2.default.Number], "ID");

	// $FlowFixMe


	ID.dispatch = function (value) {
		if (typeof value === "string" || value instanceof String) return _tcomb2.default.String;
		return _tcomb2.default.Number;
	};

	var JSONCloneComponentType = exports.JSONCloneComponentType = _tcomb2.default.interface({
		id: ID,
		cloneID: ID,
		priority: _tcomb2.default.maybe(_tcomb2.default.Number),
		path: _tcomb2.default.maybe(_tcomb2.default.String),
		props: _tcomb2.default.maybe(_tcomb2.default.dict(_tcomb2.default.String, _tcomb2.default.Any)),
		type: _tcomb2.default.enums.of(["clone"]),
		section: _tcomb2.default.maybe(_tcomb2.default.String),
		exactPath: _tcomb2.default.maybe(_tcomb2.default.Boolean),
		excludedId: _tcomb2.default.maybe(_tcomb2.default.list(ID)),
		excludedName: _tcomb2.default.maybe(_tcomb2.default.list(_tcomb2.default.String))
	}, "JSONCloneComponentType");

	// recursive


	var JSONComponentType = exports.JSONComponentType = _tcomb2.default.declare("JSONComponentType");

	var JSONComponentListType = exports.JSONComponentListType = _tcomb2.default.union([JSONComponentType, JSONCloneComponentType], "JSONComponentListType");

	// $FlowFixMe Not necessary to flow check this function, only relevant to tcomb


	JSONComponentListType.dispatch = function (value) {
		// $FlowFixMe
		if (value.cloneID) return JSONCloneComponentType;
		// $FlowFixMe
		return JSONComponentType;
	};

	var JSONReplacementComponentType = exports.JSONReplacementComponentType = _tcomb2.default.interface({
		name: _tcomb2.default.String,
		props: _tcomb2.default.dict(_tcomb2.default.String, _tcomb2.default.Any)
	}, "JSONReplacementComponentType");

	var JSONRouteType = exports.JSONRouteType = _tcomb2.default.interface({
		path: _tcomb2.default.String,
		name: _tcomb2.default.String,
		props: _tcomb2.default.dict(_tcomb2.default.String, _tcomb2.default.Any),
		componentsList: _tcomb2.default.list(JSONComponentListType)
	}, "JSONRouteType");

	var JSONSiteMapType = exports.JSONSiteMapType = _tcomb2.default.list(JSONRouteType, "JSONSiteMapType");

	JSONComponentType.define(_tcomb2.default.interface({
		id: ID,
		priority: _tcomb2.default.maybe(_tcomb2.default.Number),
		name: _tcomb2.default.String,
		path: _tcomb2.default.maybe(_tcomb2.default.String),
		section: _tcomb2.default.String,
		exactPath: _tcomb2.default.maybe(_tcomb2.default.Boolean),
		excludedId: _tcomb2.default.maybe(_tcomb2.default.list(ID)),
		excludedName: _tcomb2.default.maybe(_tcomb2.default.list(_tcomb2.default.String)),
		type: _tcomb2.default.enums.of(["component"]),
		props: _tcomb2.default.dict(_tcomb2.default.String, _tcomb2.default.Any),
		componentsList: _tcomb2.default.maybe(_tcomb2.default.list(JSONComponentListType))
	}))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function getFunctionName(f) {
	  return f.displayName || f.name || '<function' + f.length + '>';
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function isFunction(x) {
	  return typeof x === 'function';
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function isNil(x) {
	  return x === null || x === void 0;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(4);
	var isObject = __webpack_require__(12);

	module.exports = function isType(x) {
	  return isFunction(x) && isObject(x.meta);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Component = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	var _json = __webpack_require__(2);

	var _mergeOptions = __webpack_require__(19);

	var _mergeOptions2 = _interopRequireDefault(_mergeOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = exports.Component = function () {
		_createClass(Component, null, [{
			key: "warning",
			value: function warning(cmp, parentPath) {
				_assert(cmp, _tcomb2.default.Any, "cmp");

				_assert(parentPath, _tcomb2.default.String, "parentPath");

				if (cmp.path && joinPath(parentPath, cmp.path) === parentPath) {
					console.warn(cmp);
					throw new Error("Inefficient usage of component : Same path for child and parent.");
				}

				if (parentPath === "/" && cmp.path) {
					console.warn("Root route [/] should not have nested component with path property.");
				}
			}
		}, {
			key: "generateComponentList",
			value: function generateComponentList(componentsList, parentPath, componentIndex) {
				_assert(componentsList, _tcomb2.default.list(_json.JSONComponentListType), "componentsList");

				_assert(parentPath, _tcomb2.default.String, "parentPath");

				_assert(componentIndex, _tcomb2.default.list(_json.JSONComponentListType), "componentIndex");

				var ret = function (componentsList, parentPath, componentIndex) {
					return componentsList.map(function (componentObject) {
						_assert(componentObject, _json.JSONComponentListType, "componentObject");

						var ret = function (componentObject) {
							if (componentObject.type === "clone") {
								var cloneSourceComponent = getCloneMergedComponent(componentIndex, componentObject.cloneID);
								if (cloneSourceComponent) {
									var resultComponent = (0, _mergeOptions2.default)(cloneSourceComponent, componentObject);

									return new Component(resultComponent, parentPath, componentIndex);
								}
								return null;
							} else {
								return new Component(componentObject, parentPath, componentIndex);
							}
						}.call(this, componentObject);

						_assert(ret, _tcomb2.default.maybe(Component), "return value");

						return ret;
					}).filter(Boolean);
				}.call(this, componentsList, parentPath, componentIndex);

				_assert(ret, _tcomb2.default.list(Component), "return value");

				return ret;
			}
		}]);

		function Component(cmp, parentPath, componentIndex) {
			_classCallCheck(this, Component);

			_assert(cmp, _tcomb2.default.Any, "cmp");

			_assert(parentPath, _tcomb2.default.String, "parentPath");

			_assert(componentIndex, _tcomb2.default.list(_json.JSONComponentListType), "componentIndex");

			this.type = "component";

			this.constructor.warning(cmp, parentPath);
			this.meta = cmp;
			this.id = cmp.id;
			this.priority = cmp.priority || 0;
			this.exactPath = cmp.exactPath;
			this.section = cmp.section;
			this.name = cmp.name;
			this.parentPath = parentPath || "/";
			this.path = cmp.path || "";
			this.fullPath = joinPath(this.parentPath, this.path);
			this.paramsList = this.fullPath.match(/:(\w+)/g);
			this.annotatedName = cmp.section + "@" + cmp.id;
			if (cmp.componentsList) {
				this.componentsList = Component.generateComponentList(cmp.componentsList, this.path, componentIndex);
				this.layout = this.componentsList.reduce(function (result, comp) {
					_assert(result, _tcomb2.default.Object, "result");

					_assert(comp, Component, "comp");

					var section = comp.section;
					var annotatedName = comp.annotatedName;

					return Object.assign(result, _defineProperty({}, section, result[section] ? result[section].concat(annotatedName) : [annotatedName]));
				}, {});
			}
			this.excludedId = cmp.excludedId;
			this.excludedName = cmp.excludedName;
		}

		_createClass(Component, [{
			key: "isExcluded",
			value: function isExcluded(cmp) {
				var _this = this;

				_assert(cmp, Component, "cmp");

				return [["excludedId", "id"], ["excludedName", "name"], ["excludedPath", "path"]]
				// $FlowFixMe Flow doesn't support this usecase
				.some(function (property) {
					return excludeByArray(cmp[property[0]], _this[property[1]]);
				});
			}
		}]);

		return Component;
	}();

	function joinPath(left, right) {
		if (!right) return left;
		if (right.indexOf("/") === 0) {
			return "" + right;
		}
		return (left + "/" + right).replace(/(\/{2,})/g, "/");
	}

	function excludeByArray(array, valueToIgnore) {
		return array ? array.some(function (val) {
			return val === valueToIgnore;
		}) : false;
	}

	function getCloneMergedComponent(componentIndex, cloneID) {
		_assert(componentIndex, _tcomb2.default.list(_json.JSONComponentListType), "componentIndex");

		_assert(cloneID, _tcomb2.default.union([_tcomb2.default.String, _tcomb2.default.Number]), "cloneID");

		var ret = function (componentIndex, cloneID) {
			var cloneSourceComponent = componentIndex.find(function (comp) {
				return comp.id === cloneID;
			});
			if (cloneSourceComponent) {
				if (cloneSourceComponent.cloneID) {
					return (0, _mergeOptions2.default)(getCloneMergedComponent(componentIndex, cloneSourceComponent.cloneID), cloneSourceComponent);
				}
				return cloneSourceComponent;
			}

			console.warn("Cannot find cloneSource component for cloneID : ", cloneID);

			return undefined;
		}.call(this, componentIndex, cloneID);

		_assert(ret, _tcomb2.default.maybe(_json.JSONComponentListType), "return value");

		return ret;
	}

	function _assert(x, type, name) {
		function message() {
			return 'Invalid value ' + _tcomb2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcomb2.default.getTypeName(type) + ')';
		}

		if (_tcomb2.default.isType(type)) {
			if (!type.is(x)) {
				type(x, [name + ': ' + _tcomb2.default.getTypeName(type)]);

				_tcomb2.default.fail(message());
			}
		} else if (!(x instanceof type)) {
			_tcomb2.default.fail(message());
		}

		return x;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Route = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	var _json = __webpack_require__(2);

	var _factoryOption = __webpack_require__(9);

	var _component = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Route = exports.Route = function () {
		_createClass(Route, null, [{
			key: "getTemplateClass",
			value: function getTemplateClass(nextState, routeObj, resolver) {
				_assert(nextState, _tcomb2.default.interface({
					location: _tcomb2.default.Object
				}), "nextState");

				_assert(routeObj, _tcomb2.default.union([Route, _component.Component]), "routeObj");

				_assert(resolver, _factoryOption.ComponentResolverType, "resolver");

				var initProps = Object.assign({}, routeObj.meta.props, { layout: routeObj.layout });
				var templatePromise = resolver({
					name: routeObj.name,
					initProps: initProps,
					type: this.COMPONENT_TYPES.TEMPLATE
				});
				if (routeObj.parentPath) {
					return templatePromise.then(function (cmp) {
						return _defineProperty({}, routeObj.annotatedName, cmp);
					});
				}
				return templatePromise;
			}
		}, {
			key: "getIndexComponentList",
			value: function getIndexComponentList(nextState, routeObj, resolver) {
				_assert(nextState, _tcomb2.default.interface({
					location: _tcomb2.default.Object
				}), "nextState");

				_assert(routeObj, _tcomb2.default.union([Route, _component.Component]), "routeObj");

				_assert(resolver, _factoryOption.ComponentResolverType, "resolver");

				var componentsList = routeObj.componentsList;

				// I make sure componentList is not null

				if (componentsList == null) return [];

				var indexComponentList = componentsList.filter(function (cmp) {
					return !cmp.meta.path;
				});
				return this.__resolveComponentList(indexComponentList, routeObj, resolver);
			}
		}, {
			key: "getSubRouteComponentList",
			value: function getSubRouteComponentList(nextState, routeObj, resolver, component, excludedComponent) {
				_assert(nextState, _tcomb2.default.interface({
					location: _tcomb2.default.Object
				}), "nextState");

				_assert(routeObj, _tcomb2.default.union([Route, _component.Component]), "routeObj");

				_assert(resolver, _factoryOption.ComponentResolverType, "resolver");

				_assert(component, _component.Component, "component");

				_assert(excludedComponent, _tcomb2.default.maybe(_json.JSONReplacementComponentType), "excludedComponent");

				var componentsList = routeObj.componentsList;

				// I make sure componentList is not null

				if (componentsList == null) return [];

				var processedComponentList = componentsList.filter(function (cmp) {
					// =================
					var isSame = false;
					// ==================
					// I check if component path is out of root - decouple path and UI
					if (component.path && component.path.indexOf("/") === 0) {
						isSame = isPathSameRoot("" + component.parentPath + component.path, cmp.fullPath);
						// console.log(`${component.parentPath}${component.path}`,cmp.fullPath);
						// console.log(isSame);
						if (cmp.exactPath) {
							var isSameInJSON = isPathSameRoot(nextState.location.pathname, cmp.fullPath);
							return isSame.sameRoot && isSame.sameLength && isSameInJSON.sameRoot && isSameInJSON.sameLength;
						}
						return isSame.sameRoot || cmp === component;
					}
					// ======================
					isSame = isPathSameRoot(nextState.location.pathname, cmp.fullPath);
					if (cmp.exactPath) {
						// console.log(nextState.location.pathname,cmp.fullPath);
						return isSame.sameRoot && isSame.sameLength;
					}

					return isSame.sameRoot;
				});
				// ======================
				if (excludedComponent) {
					(function () {
						var props = excludedComponent.props;
						// I replace excluded component with provided one

						processedComponentList = processedComponentList.map(function (cmp) {
							var isExcluded = cmp.isExcluded(component);

							if (isExcluded) {
								var excludedProps = Object.assign({
									exludedBy: component
								}, props);

								return new _component.Component(Object.assign({}, cmp.meta, excludedComponent, { props: props }), cmp.parentPath, []);
							}
							return cmp;
						});
					})();
				} else {
					// console.log(component);
					// I filter excluded components
					processedComponentList = processedComponentList.filter(function (cmp) {
						return !cmp.isExcluded(component);
					});
				}
				return this.__resolveComponentList(processedComponentList, routeObj, resolver);
			}
		}, {
			key: "__resolveComponentList",
			value: function __resolveComponentList(componentList, routeObj, resolver) {
				var _this = this;

				var promisedComponentList = componentList.map(function (cmp) {
					return resolver({
						name: cmp.name,
						initProps: Object.assign({}, cmp.meta.props, cmp.layout && { layout: cmp.layout }),
						type: _this.COMPONENT_TYPES.COMPONENT
					}).catch(function (e) {
						return undefined;
					});
				});
				return Promise.all(promisedComponentList).then(function (result) {
					var rs = componentList.reduce(function (obj, cmp, index) {
						return Object.assign(obj, _defineProperty({}, cmp.annotatedName, result[index]));
					}, {});
					return Promise.resolve(rs);
				});
			}
		}]);

		function Route(tpl, componentIndex) {
			_classCallCheck(this, Route);

			_assert(tpl, _tcomb2.default.Any, "tpl");

			_assert(componentIndex, _tcomb2.default.list(_json.JSONComponentListType), "componentIndex");

			this.meta = tpl;
			this.name = tpl.name;
			this.path = tpl.path || "/";
			var componentList = _component.Component.generateComponentList(tpl.componentsList, this.path, componentIndex);
			this.layout = componentList.reduce(function (result, cmp) {
				var section = cmp.section;
				var annotatedName = cmp.annotatedName;

				return Object.assign(result, _defineProperty({}, section, result[section] ? result[section].concat(annotatedName) : [annotatedName]));
			}, {});
			this.componentsList = sortComponentByPriority(componentList);
			this.annotatedName = "route@" + this.path + "@" + this.name;
		}

		return Route;
	}();

	Route.COMPONENT_TYPES = {
		TEMPLATE: "template",
		COMPONENT: "component"
	};


	function sortComponentByPriority(componentsList) {
		_assert(componentsList, _tcomb2.default.list(_component.Component), "componentsList");

		return componentsList.sort(function (a, b) {
			return b.priority - a.priority;
		});
	}

	function isPathSameRoot(source, target) {
		var sourceArray = source.split("/");
		var targetArray = target.split("/");
		return {
			sameRoot: targetArray.every(function (fragment, index) {
				return fragment === sourceArray[index] || fragment.includes(":");
			}),
			sameLength: sourceArray.length === targetArray.length
		};
	}

	function _assert(x, type, name) {
		function message() {
			return 'Invalid value ' + _tcomb2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcomb2.default.getTypeName(type) + ')';
		}

		if (_tcomb2.default.isType(type)) {
			if (!type.is(x)) {
				type(x, [name + ': ' + _tcomb2.default.getTypeName(type)]);

				_tcomb2.default.fail(message());
			}
		} else if (!(x instanceof type)) {
			_tcomb2.default.fail(message());
		}

		return x;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RouteDataResolverType = exports.ComponentResolverType = undefined;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Resolve a component with props
	 */
	var ComponentResolverType = exports.ComponentResolverType = _tcomb2.default.Function;

	/**
	 * Resolve full data for a specific route
	 */

	var RouteDataResolverType = exports.RouteDataResolverType = _tcomb2.default.Function;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(4);
	var isNil = __webpack_require__(5);
	var fail = __webpack_require__(21);
	var stringify = __webpack_require__(13);

	function assert(guard, message) {
	  if (guard !== true) {
	    if (isFunction(message)) { // handle lazy messages
	      message = message();
	    }
	    else if (isNil(message)) { // use a default message
	      message = 'Assert failed (turn on "Pause on exceptions" in your Source panel)';
	    }
	    assert.fail(message);
	  }
	}

	assert.fail = fail;
	assert.stringify = stringify;

	module.exports = assert;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function isArray(x) {
	  return x instanceof Array;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isNil = __webpack_require__(5);
	var isArray = __webpack_require__(11);

	module.exports = function isObject(x) {
	  return !isNil(x) && typeof x === 'object' && !isArray(x);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getFunctionName = __webpack_require__(3);

	function replacer(key, value) {
	  if (typeof value === 'function') {
	    return getFunctionName(value);
	  }
	  return value;
	}

	module.exports = function stringify(x) {
	  try { // handle "Converting circular structure to JSON" error
	    return JSON.stringify(x, replacer, 2);
	  }
	  catch (e) {
	    return String(x);
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SiteMap = undefined;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	var _json = __webpack_require__(2);

	var _route = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SiteMap = exports.SiteMap = function SiteMap(sitemap) {
		var _this = this;

		_classCallCheck(this, SiteMap);

		_assert(sitemap, _tcomb2.default.Any, "sitemap");

		this.meta = sitemap;
		this.flatComponentList = [].concat.apply([], sitemap.map(function (route) {
			return flattenProperty(route, "componentsList");
		})).filter(function (comp) {
			return comp.id || comp.id === 0;
		});
		this.routeList = sitemap.map(function (route) {

			return new _route.Route(route, _this.flatComponentList);
		});
	};

	function flattenProperty(target, propName) {
		var ret = function (target, propName) {
			if (target[propName] && target[propName].length) {
				return target[propName].reduce(function (result, propObj) {
					_assert(result, _tcomb2.default.list(_tcomb2.default.Object), "result");

					_assert(propObj, _tcomb2.default.Object, "propObj");

					return result.concat([target]).concat(flattenProperty(propObj, propName));
				}, []);
			}
			return [target];
		}.call(this, target, propName);

		_assert(ret, _tcomb2.default.list(_tcomb2.default.Object), "return value");

		return ret;
	}

	function _assert(x, type, name) {
		function message() {
			return 'Invalid value ' + _tcomb2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcomb2.default.getTypeName(type) + ')';
		}

		if (_tcomb2.default.isType(type)) {
			if (!type.is(x)) {
				type(x, [name + ': ' + _tcomb2.default.getTypeName(type)]);

				_tcomb2.default.fail(message());
			}
		} else if (!(x instanceof type)) {
			_tcomb2.default.fail(message());
		}

		return x;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Route = exports.Component = exports.JSONComponentType = exports.JSONSiteMapType = undefined;
	exports.createSyncFactory = createSyncFactory;
	exports.isReactPureComponent = isReactPureComponent;
	exports.cloneReactClassWithProps = cloneReactClassWithProps;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	var _fromJSON = __webpack_require__(22);

	var _fromJSON2 = _interopRequireDefault(_fromJSON);

	var _commonType = __webpack_require__(16);

	var _json = __webpack_require__(2);

	var _factoryOption = __webpack_require__(9);

	var _factoryOutput = __webpack_require__(17);

	var _sitemap = __webpack_require__(14);

	var _route = __webpack_require__(8);

	var _component = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.JSONSiteMapType = _json.JSONSiteMapType;
	exports.JSONComponentType = _json.JSONComponentType;
	exports.Component = _component.Component;
	exports.Route = _route.Route;
	function createSyncFactory(option) {
		_assert(option, _tcomb2.default.interface({
			siteMap: _json.JSONSiteMapType,
			componentResolver: _factoryOption.ComponentResolverType,
			routeDataResolver: _factoryOption.RouteDataResolverType,
			excludedComponent: _tcomb2.default.maybe(_json.JSONReplacementComponentType)
		}), "option");

		var ret = function (option) {
			return {
				siteMap: new _sitemap.SiteMap(option.siteMap),
				getTemplateClass: function getTemplateClass(routeObj, parentRouteObj) {
					_assert(routeObj, _tcomb2.default.union([_route.Route, _component.Component]), "routeObj");

					_assert(parentRouteObj, _tcomb2.default.maybe(_tcomb2.default.union([_route.Route, _component.Component])), "parentRouteObj");

					return function (nextState, cb) {
						if (parentRouteObj) {
							Promise.all([_route.Route.getTemplateClass(nextState, routeObj, option.componentResolver).catch(function (e) {
								return console.error(e);
							}), _route.Route.getIndexComponentList(nextState, parentRouteObj, option.componentResolver).catch(function (e) {
								return console.error(e);
							})]).then(function (resultList) {
								try {
									cb(null, Object.assign({}, resultList[0], resultList[1]));
								} catch (e) {
									throw e;
								}
							});
						} else {
							_route.Route.getTemplateClass(nextState, routeObj, option.componentResolver, parentRouteObj).then(function (res) {
								try {
									cb(null, res);
								} catch (e) {
									throw e;
								}
							});
						}
					};
				},
				getIndexComponentList: function getIndexComponentList(routeObj) {
					_assert(routeObj, _tcomb2.default.union([_route.Route, _component.Component]), "routeObj");

					return function (nextState, cb) {
						_route.Route.getIndexComponentList(nextState, routeObj, option.componentResolver).then(function (res) {
							try {
								cb(null, res);
							} catch (e) {
								throw e;
							}
						});
					};
				},
				getSubRouteComponentList: function getSubRouteComponentList(routeObj, component) {
					_assert(routeObj, _tcomb2.default.union([_route.Route, _component.Component]), "routeObj");

					_assert(component, _component.Component, "component");

					return function (nextState, cb) {
						_route.Route.getSubRouteComponentList(nextState, routeObj, option.componentResolver, component, option.excludedComponent).then(function (res) {
							try {
								cb(null, res);
							} catch (e) {
								throw e;
							}
						});
					};
				}
			};
		}.call(this, option);

		_assert(ret, _tcomb2.default.interface({
			siteMap: _sitemap.SiteMap
		}), "return value");

		return ret;
	}

	/*export function createAsyncFactory(option: {
		componentResolver: ComponentResolverType,
		routeDataResolver: RouteDataResolverType,
	}): {
		templateResolver: TemplateResolverType,
		componentListResolver: ComponentListResolverType
	} {}*/

	function isReactPureComponent(componentClass) {
		_assert(componentClass, _tcomb2.default.Function, "componentClass");

		return !componentClass.prototype.isReactComponent;
	}

	function cloneReactClassWithProps(BareComponentClass, initProps) {
		_assert(BareComponentClass, _commonType.Class, "BareComponentClass");

		_assert(initProps, _tcomb2.default.Object, "initProps");

		var isPure = isReactPureComponent(_assert(BareComponentClass, _commonType.Class, "BareComponentClass"));
		if (isPure) {
			var _Component = function _Component(props) {
				_assert(props, _tcomb2.default.Object, "props");

				return BareComponentClass(Object.assign({}, BareComponentClass.defaultProps, initProps, props));
			};
			_Component.propTypes = BareComponentClass.propTypes;
			_Component.displayName = BareComponentClass.displayName;
			return _Component;
		} else {
			var _Component2 = function (_BareComponentClass) {
				_inherits(_Component2, _BareComponentClass);

				function _Component2(props, context) {
					_classCallCheck(this, _Component2);

					_assert(props, _tcomb2.default.Object, "props");

					_assert(context, _tcomb2.default.Object, "context");

					return _possibleConstructorReturn(this, Object.getPrototypeOf(_Component2).call(this, props, context));
				}

				return _Component2;
			}(BareComponentClass);

			_Component2.displayName = BareComponentClass.displayName;
			_Component2.defaultProps = Object.assign({}, BareComponentClass.defaultProps, initProps);

			return _Component2;
		}
	}

	function _assert(x, type, name) {
		function message() {
			return 'Invalid value ' + _tcomb2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcomb2.default.getTypeName(type) + ')';
		}

		if (_tcomb2.default.isType(type)) {
			if (!type.is(x)) {
				type(x, [name + ': ' + _tcomb2.default.getTypeName(type)]);

				_tcomb2.default.fail(message());
			}
		} else if (!(x instanceof type)) {
			_tcomb2.default.fail(message());
		}

		return x;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Class = undefined;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Class = exports.Class = _tcomb2.default.Function;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ComponentListResolverType = exports.TemplateResolverType = exports.RouteResolverType = undefined;

	var _tcomb = __webpack_require__(1);

	var _tcomb2 = _interopRequireDefault(_tcomb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RouteResolverType = exports.RouteResolverType = _tcomb2.default.Function;

	/**
	 * Resolve template component for a specific route
	 */

	var TemplateResolverType = exports.TemplateResolverType = RouteResolverType;

	/**
	 * Resolve component list for a specific route
	 */

	var ComponentListResolverType = exports.ComponentListResolverType = RouteResolverType;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	var toString = Object.prototype.toString;

	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isOptionObject = __webpack_require__(18);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.propertyIsEnumerable;
	var globalThis = this;
	var defaultMergeOpts = {
		concatArrays: false
	};

	function getEnumerableOwnPropertyKeys(value) {
		var keys = [];

		for (var key in value) {
			if (hasOwnProperty.call(value, key)) {
				keys.push(key);
			}
		}

		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(value);

			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(value, symbols[i])) {
					keys.push(symbols[i]);
				}
			}
		}

		return keys;
	}

	function clone(value) {
		if (Array.isArray(value)) {
			return cloneArray(value);
		}

		if (isOptionObject(value)) {
			return cloneOptionObject(value);
		}

		return value;
	}

	function cloneArray(array) {
		var result = array.slice(0, 0);

		getEnumerableOwnPropertyKeys(array).forEach(function (key) {
			result[key] = clone(array[key]);
		});

		return result;
	}

	function cloneOptionObject(obj) {
		var result = Object.getPrototypeOf(obj) === null ? Object.create(null) : {};

		getEnumerableOwnPropertyKeys(obj).forEach(function (key) {
			result[key] = clone(obj[key]);
		});

		return result;
	}

	/**
	 * @param merged {already cloned}
	 * @return {cloned Object}
	 */
	function mergeKeys(merged, source, keys, mergeOpts) {
		keys.forEach(function (key) {
			if (key in merged) {
				merged[key] = merge(merged[key], source[key], mergeOpts);
			} else {
				merged[key] = clone(source[key]);
			}
		});

		return merged;
	}

	/**
	 * @param merged {already cloned}
	 * @return {cloned Object}
	 *
	 * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)
	 */
	function concatArrays(merged, source, mergeOpts) {
		var result = merged.slice(0, 0);
		var resultIndex = 0;

		[merged, source].forEach(function (array) {
			var indices = [];

			// result.concat(array) with cloning
			for (var k = 0; k < array.length; k++) {
				if (!hasOwnProperty.call(array, k)) {
					continue;
				}

				indices.push(String(k));

				if (array === merged) {
					// already cloned
					result[resultIndex++] = array[k];
				} else {
					result[resultIndex++] = clone(array[k]);
				}
			}

			// merge non-index keys
			result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter(function (key) {
				return indices.indexOf(key) === -1;
			}), mergeOpts);
		});

		return result;
	}

	/**
	 * @param merged {already cloned}
	 * @return {cloned Object}
	 */
	function merge(merged, source, mergeOpts) {
		if (mergeOpts.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
			return concatArrays(merged, source, mergeOpts);
		}

		if (!isOptionObject(source) || !isOptionObject(merged)) {
			return clone(source);
		}

		return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), mergeOpts);
	}

	module.exports = function () {
		var mergeOpts = merge(clone(defaultMergeOpts), (this !== globalThis && this) || {}, defaultMergeOpts);
		var merged = {};

		for (var i = 0; i < arguments.length; i++) {
			var option = arguments[i];

			if (option === undefined) {
				continue;
			}

			if (!isOptionObject(option)) {
				throw new TypeError('`' + option + '` is not an Option Object');
			}

			merged = merge(merged, option, mergeOpts);
		}

		return merged;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isType = __webpack_require__(6);
	var getFunctionName = __webpack_require__(3);
	var assert = __webpack_require__(10);
	var stringify = __webpack_require__(13);

	// creates an instance of a type, handling the optional new operator
	module.exports = function create(type, value, path) {
	  if (isType(type)) {
	    return !type.meta.identity && typeof value === 'object' && value !== null ? new type(value, path): type(value, path);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    // here type should be a class constructor and value some instance, just check membership and return the value
	    path = path || [getFunctionName(type)];
	    assert(value instanceof type, function () { return 'Invalid value ' + stringify(value) + ' supplied to ' + path.join('/'); });
	  }

	  return value;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function fail(message) {
	  throw new TypeError('[tcomb] ' + message);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__(10);
	var isFunction = __webpack_require__(4);
	var isNil = __webpack_require__(5);
	var getTypeName = __webpack_require__(23);
	var isObject = __webpack_require__(12);
	var isArray = __webpack_require__(11);
	var isType = __webpack_require__(6);
	var create = __webpack_require__(20);

	function fromJSON(value, type, path) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert(isFunction(type), function () {
	      return 'Invalid argument type ' + assert.stringify(type) + ' supplied to fromJSON(value, type) (expected a type)';
	    });
	    path = path || [getTypeName(type)];
	  }

	  if (isFunction(type.fromJSON)) {
	    return create(type, type.fromJSON(value), path);
	  }

	  if (!isType(type)) {
	    return value instanceof type ? value : new type(value);
	  }

	  var kind = type.meta.kind;
	  var k;
	  var ret;

	  switch (kind) {

	    case 'maybe' :
	      return isNil(value) ? null : fromJSON(value, type.meta.type, path);

	    case 'subtype' : // the kind of a refinement is 'subtype' (for legacy reasons)
	      ret = fromJSON(value, type.meta.type, path);
	      if (process.env.NODE_ENV !== 'production') {
	        assert(type.meta.predicate(ret), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected a valid ' + getTypeName(type) + ')';
	        });
	      }
	      return ret;

	    case 'struct' :
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isObject(value), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an object for type ' + getTypeName(type) + ')';
	        });
	      }
	      var props = type.meta.props;
	      ret = {};
	      for (k in props) {
	        if (props.hasOwnProperty(k)) {
	          ret[k] = fromJSON(value[k], props[k], ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + getTypeName(props[k])) : null ));
	        }
	      }
	      return new type(ret);

	    case 'interface' :
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isObject(value), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an object)';
	        });
	      }
	      var interProps = type.meta.props;
	      ret = {};
	      for (k in interProps) {
	        if (interProps.hasOwnProperty(k)) {
	          ret[k] = fromJSON(value[k], interProps[k], ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + getTypeName(interProps[k])) : null ));
	        }
	      }
	      return ret;

	    case 'list' :
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isArray(value), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array for type ' + getTypeName(type) + ')';
	        });
	      }
	      var elementType = type.meta.type;
	      var elementTypeName = getTypeName(elementType);
	      return value.map(function (element, i) {
	        return fromJSON(element, elementType, ( process.env.NODE_ENV !== 'production' ? path.concat(i + ': ' + elementTypeName) : null ));
	      });

	    case 'union' :
	      var actualType = type.dispatch(value);
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isFunction(actualType), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (no constructor returned by dispatch of union ' + getTypeName(type) + ')';
	        });
	      }
	      return fromJSON(value, actualType, path);

	    case 'tuple' :
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isArray(value), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array for type ' + getTypeName(type) + ')';
	        });
	      }
	      var types = type.meta.types;
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isArray(value) && value.length === types.length, function () {
	          return 'Invalid value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array of length ' + types.length + ' for type ' + getTypeName(type) + ')';
	        });
	      }
	      return value.map(function (element, i) {
	        return fromJSON(element, types[i], ( process.env.NODE_ENV !== 'production' ? path.concat(i + ': ' + getTypeName(types[i])) : null ));
	      });

	    case 'dict' :
	      if (process.env.NODE_ENV !== 'production') {
	        assert(isObject(value), function () {
	          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an object for type ' + getTypeName(type) + ')';
	        });
	      }
	      var domain = type.meta.domain;
	      var codomain = type.meta.codomain;
	      var domainName = getTypeName(domain);
	      var codomainName = getTypeName(codomain);
	      ret = {};
	      for (k in value) {
	        if (value.hasOwnProperty(k)) {
	          ret[domain(k, ( process.env.NODE_ENV !== 'production' ? path.concat(domainName) : null ))] = fromJSON(value[k], codomain, ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + codomainName) : null ));
	        }
	      }
	      return ret;

	    default : // enums, irreducible, intersection
	      return type(value, path);
	  }
	}

	module.exports = fromJSON;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isType = __webpack_require__(6);
	var getFunctionName = __webpack_require__(3);

	module.exports = function getTypeName(ctor) {
	  if (isType(ctor)) {
	    return ctor.displayName;
	  }
	  return getFunctionName(ctor);
	};

/***/ }
/******/ ])
});
;