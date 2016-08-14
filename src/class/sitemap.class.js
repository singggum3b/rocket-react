// @flow
import type {JSONSiteMapType, JSONComponentListType} from "../type/json.type";
import {Route} from "./route.class";

export class SiteMap<T : JSONSiteMapType> {

	meta : T;
	routeList : Array<Route<*>>;
	flatComponentList: Array<JSONComponentListType>;

	constructor(sitemap: T) {
		this.meta = sitemap;
		console.log(sitemap);
		this.flatComponentList = [].concat.apply(
			[],
			sitemap.map((route) => flattenProperty(route,"componentsList"))
		);
		console.log(this.flatComponentList);
		this.routeList = sitemap.map((route) => {

			return new Route(route, this.flatComponentList);
		});
	}
}

function flattenProperty(target,propName): Array<Object> {
	if (target[propName] && target[propName].length) {
		return target[propName].reduce((result: Array<Object>, propObj: Object) => {
			return result.concat([target]).concat(flattenProperty(propObj, propName));
		},[]);
	}
	return [target];
}
