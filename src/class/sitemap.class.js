// @flow
import type {JSONSiteMapType} from "../type/json.type";
import {Route} from "./route.class";

export class SiteMap<T : JSONSiteMapType> {

	meta : T;
	routeList : Array<Route>;

	constructor(sitemap: T) {
		this.meta = sitemap;
		this.routeList = sitemap.map((route) => new Route(route));
	}

}
