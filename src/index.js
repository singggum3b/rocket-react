// @flow

import fromJSON from "tcomb/lib/fromJSON";
import type {JSONSiteMapType,JSONRouteType} from "./type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "./type/factoryOption.type";
import type {TemplateResolverType,ComponentListResolverType} from "./type/factoryOutput.type";
import {SiteMap} from "./class/sitemap.class";
import {Route} from "./class/route.class";

export function createSyncFactory(option: {
	siteMap: JSONSiteMapType,
	componentResolver: ComponentResolverType,
	routeDataResolver: RouteDataResolverType,
}): {
	siteMap: SiteMap,
} {
	const siteMap = option.siteMap ? new SiteMap(option.siteMap) : undefined;
	return {
		siteMap,
		getTemplateClass(routeObj: Route) {
			return function (nextState,cb) {
				routeObj.constructor
					.getTemplateClass(nextState,routeObj,option.componentResolver).then(cb);
			};
		},
		getIndexComponentList(routeObj: Route) {
			return function (nextState,cb) {
				routeObj.constructor
					.getIndexComponentList(nextState,routeObj,option.componentResolver).then(cb);
			};
		},
		getSubRouteComponentList(routeObj: Route,componentPath: string) {
			return function (nextState,cb) {
				routeObj.constructor
					.getSubRouteComponentList(
						nextState,
						routeObj,
						option.componentResolver,
						componentPath
					).then(cb);
			};
		},
	};
}

export function createAsyncFactory(option: {
	componentResolver: ComponentResolverType,
	routeDataResolver: RouteDataResolverType,
}): {
	templateResolver: TemplateResolverType,
	componentListResolver: ComponentListResolverType
} {

}
