// @flow
import type { JSONComponentType, JSONComponentListType } from "../type/json.type";
import { default as mergeOptions } from "merge-options";

export class Component<T: JSONComponentType> {

	static warning(cmp: T, parentPath: string) {
		if (cmp.path && (joinPath(parentPath, cmp.path) === parentPath)) {
			console.warn(cmp);
			throw new Error("Inefficient usage of component : Same path for child and parent.");
		}
	}

	static generateComponentList(
		componentsList: Array<JSONComponentListType>,
		parentPath: string,
		componentIndex
	) {
		return componentsList.map(
			(obj) => {
				if (obj.cloneID) {
					let cloneSourceComponent = getCloneMergedComponent(componentIndex, obj.cloneID);
					if (cloneSourceComponent) {
						cloneSourceComponent = mergeOptions(cloneSourceComponent,obj);
						return new Component(cloneSourceComponent, parentPath, componentIndex);
					}
					return false;
				}
				return new Component(obj, parentPath, componentIndex);
			}
		).filter(Boolean);
	}

	meta: T;
	id: string | number;
	name: string;
	section: string;
	exactPath: boolean;
	type: "component" = "component";
	path: string | void;
	parentPath: string;
	annotatedName: string;
	paramsList: Array<string>;
	componentsList: ?Array<this>;
	excludedId: ?Array<string | boolean>;
	excludedName: ?Array<string>;

	constructor(cmp: T, parentPath: string, componentIndex) {
		this.constructor.warning(cmp,parentPath);
		this.meta = cmp;
		this.id = cmp.id;
		this.exactPath = cmp.exactPath;
		this.section = cmp.section;
		this.name = cmp.name;
		this.parentPath = parentPath || "/";
		this.path = cmp.path || undefined;
		this.fullPath = joinPath(this.parentPath, this.path);
		this.paramsList = this.fullPath.match(/:(\w+)/g);
		this.annotatedName = `${cmp.section}@${cmp.id}`;
		if (cmp.componentsList) {
			this.componentsList = Component.generateComponentList(cmp.componentsList, this.path, componentIndex);
			this.layout = this.componentsList
				.reduce((result,cmp) => {
					const {section, annotatedName} = cmp;
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
			.some((property) => excludeByArray(cmp[property[0]],this[property[1]]));
	}

}

function joinPath(left,right) {
	if (!right) return left;
	if (right.indexOf("/") === 0) {
		return `${right}`;
	}
	return `${left}/${right}`;
}

function excludeByArray(array, valueToIgnore) {
	return array ? array.some((val) => val === valueToIgnore) : false;
}

function getCloneMergedComponent(componentIndex, cloneID) {
	const cloneSourceComponent = componentIndex.find((comp) => comp.id === cloneID);
	if (cloneSourceComponent) {
		console.log(cloneSourceComponent);
		if (cloneSourceComponent.cloneID) {
			return mergeOptions(
				getCloneMergedComponent(componentIndex,cloneSourceComponent.cloneID),
				cloneSourceComponent
			);
		}
		return cloneSourceComponent;
	}

	console.warn("Cannot find cloneSource component for cloneID : ", cloneID);

	return undefined;
}
