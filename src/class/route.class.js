// @flow
import type {JSONRouteType,JSONComponentType} from "../type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "../type/factoryOption.type";
import {Component} from "./component.class";

export class Route<T: JSONRouteType> {

	static getTemplateClass(
		nextState: {location: Object}, routeObj: Route,resolver : ComponentResolverType
	) {

	}

	static getIndexComponentList(
		nextState: {location: Object}, routeObj: Route,resolver : ComponentResolverType
	) {

	}

	static getSubRouteComponentList(
		nextState: {location: Object}, routeObj: Route,resolver : ComponentResolverType
	) {

	}

	meta: T;
	templateName: string;
	path: string;
	componentsList: Array<Component<*>>;
	layout: {
		[section: string]: Array<string>
	};

	constructor(tpl: T) {
		this.meta = tpl;
		this.templateName = tpl.templateName;
		this.path = tpl.path || "/";
		this.componentsList = tpl.componentsList.map(
			(obj) => new Component(obj,this.path)
		);
		this.layout = tpl.componentsList
			.reduce((result,cmp) => {
				const {section,name} = cmp;
				return Object.assign(result,{
					[section]: result[section] ? result[section].concat(name) : [name],
				});
			},{});
	}

}
