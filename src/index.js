// @flow

import fromJSON from "tcomb/lib/fromJSON";
import type {Class} from "./type/common.type.js";
import type {
	JSONSiteMapType,
	JSONRouteType,
	JSONComponentType,
	JSONReplacementComponentType } from "./type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "./type/factoryOption.type";
import type {TemplateResolverType,ComponentListResolverType} from "./type/factoryOutput.type";
import {SiteMap} from "./class/sitemap.class";
import {Route} from "./class/route.class";
import {Component} from "./class/component.class";

export function createSyncFactory(option: {
	siteMap: JSONSiteMapType,
	componentResolver: ComponentResolverType,
	routeDataResolver: RouteDataResolverType,
	excludedComponent?: JSONReplacementComponentType,
}): {
	siteMap: SiteMap<JSONSiteMapType>,
} {
	return {
		siteMap: new SiteMap(option.siteMap),
		getTemplateClass(routeObj: Route<JSONRouteType>) {
			return function (nextState,cb) {
				routeObj.constructor
					.getTemplateClass(nextState,routeObj,option.componentResolver)
					.then((res) => {
						cb(null,res);
					})
					.catch((err) => {
						cb(err,null);
					});
			};
		},
		getIndexComponentList(routeObj: Route<JSONRouteType>) {
			return function (nextState,cb) {
				routeObj.constructor
					.getIndexComponentList(nextState,routeObj,option.componentResolver)
					.then((res) => {
						cb(null,res);
					})
					.catch((err) => {
						cb(err,null);
					});
			};
		},
		getSubRouteComponentList(routeObj: Route<JSONRouteType>,component: Component<*>) {
			return function (nextState,cb) {
				routeObj.constructor
					.getSubRouteComponentList(
						nextState,
						routeObj,
						option.componentResolver,
						component,
						option.excludedComponent,
					)
					.then((res) => {
						cb(null,res);
					})
					.catch((err) => {
						cb(err,null);
					});
			};
		},
	};
}

/*export function createAsyncFactory(option: {
	componentResolver: ComponentResolverType,
	routeDataResolver: RouteDataResolverType,
}): {
	templateResolver: TemplateResolverType,
	componentListResolver: ComponentListResolverType
} {}*/

export function isReactPureComponent(componentClass: Function) {
	return !(componentClass.prototype.isReactComponent);
}

export function cloneReactClassWithProps(BareComponentClass: Class<any>, initProps: Object) {
	const isPure = isReactPureComponent((BareComponentClass : Class<any>));
	if (isPure) {
		const Component = function(props: Object) {
			return BareComponentClass(Object.assign(
				{},
				BareComponentClass.defaultProps,
				initProps,props
			));
		};
		Component.propTypes = BareComponentClass.propTypes;
		Component.displayName = BareComponentClass.displayName;
		return Component;
	} else {
		class Component extends BareComponentClass {
			static displayName = BareComponentClass.displayName;
			static defaultProps = Object.assign({}, BareComponentClass.defaultProps, initProps);
			constructor(props: Object, context: Object) {
				super(props, context);
			}
		}
		return Component;
	}
}
