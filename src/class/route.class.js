// @flow
import type {
	JSONRouteType,
	JSONComponentType,
	JSONReplacementComponentType,
	JSONComponentListType,
} from "../type/json.type";
import type {ComponentResolverType,RouteDataResolverType} from "../type/factoryOption.type";
import {Component} from "./component.class";

export class Route<T: JSONRouteType> {

	static COMPONENT_TYPES = {
		TEMPLATE: "template",
		COMPONENT: "component",
	};

	static getTemplateClass(
		nextState: {location: Object},
		routeObj: Route<T> | Component<JSONComponentType>,
		resolver: ComponentResolverType
	) {
		const initProps =  Object.assign({}, routeObj.meta.props, {layout: routeObj.layout});
		const templatePromise = resolver({
			name: routeObj.name,
			initProps,
			type: this.COMPONENT_TYPES.TEMPLATE,
		});
		if (routeObj.parentPath) {
			return templatePromise.then((cmp) => {
				return {[routeObj.annotatedName]: cmp};
			});
		}
		return templatePromise;
	}

	static getIndexComponentList(
		nextState: {location: Object},
		routeObj: Route<T> | Component<JSONComponentType>,
		resolver : ComponentResolverType
	) {
		const {componentsList} = routeObj;

		// I make sure componentList is not null
		if (componentsList == null) return [];

		const indexComponentList = componentsList.filter((cmp) => !cmp.meta.path);
		return this.__resolveComponentList(indexComponentList,routeObj,resolver);
	}

	static getSubRouteComponentList(
		nextState: {location: Object},
		routeObj: Route<T> | Component<JSONComponentType>,
		resolver : ComponentResolverType,
		component: Component<JSONComponentType>,
		excludedComponent?: JSONReplacementComponentType,
	) {

		const {componentsList} = routeObj;

		// I make sure componentList is not null
		if (componentsList == null) return [];

		let processedComponentList = componentsList.filter(
			(cmp) => {
				// =================
				let isSame = false;
				// ==================
				// I check if component path is out of root - decouple path and UI
				if (component.path && component.path.indexOf("/") === 0) {
					isSame = isPathSameRoot(`${component.parentPath}${component.path}`,cmp.fullPath);
					// console.log(`${component.parentPath}${component.path}`,cmp.fullPath);
					// console.log(isSame);
					if (cmp.exactPath) {
						const isSameInJSON = isPathSameRoot(nextState.location.pathname,cmp.fullPath);
						return (
							(isSame.sameRoot && isSame.sameLength)
							&& (isSameInJSON.sameRoot && isSameInJSON.sameLength)
						);
					}
					return isSame.sameRoot || (cmp === component);
				}
				// ======================
				isSame = isPathSameRoot(nextState.location.pathname,cmp.fullPath);
				if (cmp.exactPath) {
					// console.log(nextState.location.pathname,cmp.fullPath);
					return (isSame.sameRoot && isSame.sameLength);
				}

				return isSame.sameRoot;
			}
		);
		// ======================
		if (excludedComponent) {
			const {props} = excludedComponent;
			// I replace excluded component with provided one
			processedComponentList = processedComponentList.map((cmp) => {
				const isExcluded = cmp.isExcluded(component);

				if (isExcluded) {
					const excludedProps = Object.assign({
						exludedBy: component,
					},props);

					return new Component(
						Object.assign({},
							cmp.meta,
							excludedComponent,
							{props}
						),
						cmp.parentPath,
						[]
					);
				}
				return cmp;
			});
		} else {
			// I filter excluded components
			processedComponentList = processedComponentList.filter((cmp) => {
				return !cmp.isExcluded(component);
			});
		}
		return this.__resolveComponentList(processedComponentList,routeObj,resolver);
	}

	static __resolveComponentList(componentList,routeObj,resolver) {
		const promisedComponentList = componentList.map(
			(cmp) => resolver({
				name: cmp.name,
				initProps: Object.assign({}, cmp.meta.props,cmp.layout && {layout: cmp.layout}),
				type: this.COMPONENT_TYPES.COMPONENT,
			}).catch((e) => undefined)
		);
		return Promise.all(promisedComponentList)
			.then((result) => {
				const rs = componentList.reduce(
					(obj,cmp,index) => (Object.assign(obj,{[cmp.annotatedName]: result[index]})),
					{}
				);
				console.log(rs);
				return Promise.resolve(rs);
			});
	}

	meta: T;
	name: string;
	path: string;
	componentsList: Array<Component<*>>;
	annotatedName: string;
	layout: {
		[section: string]: Array<string>
	};

	constructor(tpl: T, componentIndex: Array<JSONComponentListType>) {
		this.meta = tpl;
		this.name = tpl.name;
		this.path = tpl.path || "/";
		this.componentsList = Component.generateComponentList(
			tpl.componentsList,
			this.path, componentIndex
		);
		this.annotatedName = `route@${this.path}@${this.name}`;
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
