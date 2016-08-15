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


export {
	// $FlowFixMe
	JSONSiteMapType, JSONComponentType,
	Component, Route,
};

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
		getTemplateClass(
			routeObj: Route<JSONRouteType> | Component<JSONComponentType>,
			parentRouteObj?: Route<JSONRouteType> | Component<JSONComponentType>
		) {
			return function (nextState,cb) {
				if (parentRouteObj) {
					Promise.all([
						Route.getTemplateClass(nextState,routeObj,option.componentResolver).catch(e => console.error(e)),
						Route.getIndexComponentList(nextState,parentRouteObj,option.componentResolver).catch(e => console.error(e)),
					]).then((resultList) => {
						cb(null,Object.assign({},resultList[0],resultList[1]));
					})
				} else {
					Route
						.getTemplateClass(nextState,routeObj,option.componentResolver,parentRouteObj)
						.then((res) => {
							cb(null,res);
						})
						.catch((err) => {
							cb(err,null);
						});
				}
			};
		},
		getIndexComponentList(routeObj: Route<JSONRouteType> | Component<JSONComponentType>) {
			return function (nextState,cb) {
				Route
					.getIndexComponentList(nextState,routeObj,option.componentResolver)
					.then((res) => {
						cb(null,res);
					})
					.catch((err) => {
						cb(err,null);
					});
			};
		},
		getSubRouteComponentList(routeObj: Route<JSONRouteType> | Component<JSONComponentType>,component: Component<*>) {
			return function (nextState,cb) {
				Route
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
