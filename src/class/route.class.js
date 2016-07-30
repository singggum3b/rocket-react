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
		nextState: {location: Object}, routeObj: Route<T>, resolver : ComponentResolverType
	) {
		const initProps =  Object.assign({}, routeObj.meta.props, {layout: routeObj.layout});
		return resolver({
			name: routeObj.templateName,
			initProps,
			type: this.COMPONENT_TYPES.TEMPLATE,
		});
	}

	static getIndexComponentList(
		nextState: {location: Object}, routeObj: Route<T>,resolver : ComponentResolverType
	) {
		const indexComponentList = routeObj.componentsList.filter((cmp) => !cmp.meta.path);
		return this.__resolveComponentList(indexComponentList,routeObj,resolver);
	}

	static getSubRouteComponentList(
		nextState: {location: Object},
		routeObj: Route<T>,
		resolver : ComponentResolverType,
		component: Component<JSONComponentType>
	) {
		const componentList = routeObj.componentsList.filter(
			(cmp) => {
				const isSame = isPathSameRoot(nextState.location.pathname,cmp.fullPath);
				if (cmp.exactPath) {
					return (isSame.sameRoot && isSame.sameLength);
				}
				return isSame.sameRoot;
			}
		);
		return this.__resolveComponentList(componentList,routeObj,resolver);
	}

	static __resolveComponentList(componentList,routeObj,resolver) {
		const promisedComponentList = componentList.map(
			(cmp) => resolver({
				name: cmp.name,
				initProps: cmp.meta.props,
				type: this.COMPONENT_TYPES.COMPONENT,
			}).catch((e) => undefined)
		);
		return Promise.all(promisedComponentList)
			.then((result) => {
				const rs = componentList.reduce(
					(obj,cmp,index) => (Object.assign(obj,{[cmp.annotatedName]: result[index]})),
					{}
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
		this.layout = this.componentsList
			.reduce((result,cmp) => {
				const {section, annotatedName} = cmp;
				return Object.assign(result,{
					[section]: result[section] ? result[section].concat(annotatedName) : [annotatedName],
				});
			},{});
	}

}

function isPathSameRoot(source,target) {
	const sourceArray = source.split("/");
	const targetArray = target.split("/");
	return {
		sameRoot: targetArray.every((fragment,index) => (
			fragment === sourceArray[index] || fragment.includes(":")
		)),
		sameLength: sourceArray.length === targetArray.length,
	};
}
