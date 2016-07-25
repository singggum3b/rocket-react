// @flow

import fromJSON from "tcomb/lib/fromJSON";
import type {JSONSiteMapType,JSONTemplateType} from "./type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "./type/factoryOption.type";
import type {TemplateResolverType,ComponentListResolverType} from "./type/factoryOutput.type";
import {SiteMap} from "./class/sitemap.class";
import {Template} from "./class/template.class";

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
