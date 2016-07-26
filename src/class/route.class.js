// @flow
import type {JSONRouteType,JSONComponentType} from "../type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "../type/factoryOption.type";
import {Component} from "./component.class";

export class Route<T: JSONRouteType> {

	static COMPONENT_TYPES = {
		TEMPLATE: "template",
		COMPONENT: "component",
	};
	static getTemplateClass(
		nextState: {location: Object}, routeObj: Route, resolver : ComponentResolverType
	) {
		return new Promise((resolve,reject) => {
			resolver({
				name: routeObj.templateName,
				props: routeObj.props,
				type: this.COMPONENT_TYPES.TEMPLATE,
			}).then(
				resolve,
				reject
			);
		});
	}

	static getIndexComponentList(
		nextState: {location: Object}, routeObj: Route,resolver : ComponentResolverType
	) {
		const indexComponentList = routeObj.componentsList.filter((cmp) => !cmp.path);
		return this.__resolveComponentList(indexComponentList,routeObj,resolver);
	}

	static getSubRouteComponentList(
		nextState: {location: Object},
		routeObj: Route,
		resolver : ComponentResolverType,
		componentPath: string
	) {
		const matchedComponentList = routeObj.componentsList.filter(
			(cmp) => cmp.path === componentPath
		);
		const indexComponentList = routeObj.componentsList.filter((cmp) => !cmp.path);
		const componentList = matchedComponentList.concat(indexComponentList);
		return this.__resolveComponentList(componentList,routeObj,resolver);
	}

	static __resolveComponentList(componentList,routeObj,resolver) {
		const promisedComponentList = componentList.map(
			(cmp) => resolver({
				name: cmp.name,
				props: cmp.props,
				type: this.COMPONENT_TYPES.COMPONENT,
			}).catch((e) => undefined)
		);
		return Promise.all(promisedComponentList)
			.then((result) => {
				const rs = componentList.map(
					(cmp,index) => ({[cmp.annotatedName]: result[index]})
				);
				return Promise.resolve(rs);
			});
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
