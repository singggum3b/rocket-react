// @flow
import type { JSONComponentType, JSONComponentListType, ID } from "../type/json.type";
import { default as mergeOptions } from "merge-options";

export class Component<T: JSONComponentType> {

	static warning(cmp: T, parentPath: string) {
		if (cmp.path && (joinPath(parentPath, cmp.path) === parentPath)) {
			console.warn(cmp);
			throw new Error("Inefficient usage of component : Same path for child and parent.");
		}

		if (parentPath === "/" && cmp.path) {
			console.warn("Root route [/] should not have nested component with path property.");
		}
	}

	static generateComponentList(
		componentsList: Array<JSONComponentListType>,
		parentPath: string,
		componentIndex: Array<JSONComponentListType>,
	): Array<Component<*>> {
		return componentsList.map(
			(componentObject: JSONComponentListType): ?Component<*> => {
				if (componentObject.type === "clone") {
					const cloneSourceComponent = getCloneMergedComponent(componentIndex, componentObject.cloneID);
					if (cloneSourceComponent) {
						const resultComponent = mergeOptions(cloneSourceComponent, removeNilProperty(componentObject));
						return new Component(resultComponent, parentPath, componentIndex);
					}
					return null;
				} else {
					return new Component(componentObject, parentPath, componentIndex);
				}
			}
		).filter(Boolean);
	}

	meta: T;
	id: string | number;
	priority: number;
	name: string;
	section: string;
	exactPath: ?boolean;
	type: "component" = "component";
	path: string;
	fullPath: string;
	parentPath: string;
	annotatedName: string;
	paramsList: ?Array<string>;
	componentsList: ?Array<Component<T>>;
	excludedId: ?Array<ID>;
	excludedName: ?Array<string>;
	layout: {
		[section: string]: Array<string>
	};

	constructor(cmp: T, parentPath: string, componentIndex: Array<JSONComponentListType>) {
		this.constructor.warning(cmp,parentPath);
		this.meta = cmp;
		this.id = cmp.id;
		this.priority = cmp.priority || 0;
		this.exactPath = cmp.exactPath;
		this.section = cmp.section;
		this.name = cmp.name;
		this.parentPath = parentPath || "/";
		this.path = cmp.path || "";
		this.fullPath = joinPath(this.parentPath, this.path);
		this.paramsList = this.fullPath.match(/:(\w+)/g);
		this.annotatedName = `${cmp.section}@${cmp.id}`;
		if (cmp.componentsList) {
			this.componentsList = Component.generateComponentList(
				cmp.componentsList, this.path,
				componentIndex
			);
			this.layout = this.componentsList.reduce((result: Object, comp: Component<T>) => {
				const {section, annotatedName} = comp;
				return Object.assign(result,{
					[section]: result[section] ? result[section].concat(annotatedName) : [annotatedName],
				});
			},{});
		}
		this.excludedId = cmp.excludedId;
		this.excludedName = cmp.excludedName;
	}

	isExcluded(cmp: Component<*>) {
		return [["excludedId","id"],["excludedName","name"],["excludedPath","path"]]
			// $FlowFixMe Flow doesn't support this usecase
			.some((property) => excludeByArray(cmp[property[0]], this[property[1]]));
	}

}

function joinPath(left,right) {
	if (!right) return left;
	if (right.indexOf("/") === 0) {
		return `${right}`;
	}
	return `${left}/${right}`.replace(/(\/{2,})/g,"/");
}

function excludeByArray(array, valueToIgnore) {
	return array ? array.some((val) => val === valueToIgnore) : false;
}

function getCloneMergedComponent(componentIndex: Array<JSONComponentListType>, cloneID: string | number): ?JSONComponentListType {
	const cloneSourceComponent = componentIndex.find((comp) => comp.id === cloneID);
	if (cloneSourceComponent) {
		if (cloneSourceComponent.cloneID) {
			return mergeOptions(
				getCloneMergedComponent(componentIndex, cloneSourceComponent.cloneID),
				removeNilProperty(cloneSourceComponent)
			);
		}
		return cloneSourceComponent;
	}

	console.warn("Cannot find cloneSource component for cloneID : ", cloneID);

	return undefined;
}

function removeNilProperty(obj: Object) : Object {
	Reflect.ownKeys(obj).map((propName) => {
		if ((obj[propName] === undefined) || (obj[propName] === null)) {
			delete obj[propName];
		}
		return propName;
	});
	return obj;
}
