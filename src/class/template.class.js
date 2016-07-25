// @flow
import type {JSONTemplateType,JSONComponentType} from "../type/json.type";
import {Component} from "./component.class";

export class Template<T: JSONTemplateType> {

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

	getComponentsMapForRoute(route) {

	}

}
