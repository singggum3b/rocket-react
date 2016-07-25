// @flow
import type {JSONSiteMapType} from "../type/json.type";
import {Template} from "./template.class";

export class SiteMap<T : JSONSiteMapType> {

	meta : T;
	routeList : Array<Template>;

	constructor(sitemap: T) {
		this.meta = sitemap;
		this.routeList = sitemap.map((route) => new Template(route));
	}

}
