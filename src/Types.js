// @flow

import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";
import fromJSON from "tcomb/lib/fromJSON";

export type JSONComponentType = {
	id: string,
	name: string,
	path?: string,
	section: string,
	props: {
		[name: string]: any
	}
}

export type JSONTemplateType = {
	name: string,
	componentsList: Array<JSONComponentType>
}

export class Template {

	constructor(tpl: JSONTemplateType) {
		Object.assign(this,tpl);
	}

	getLayout() {

	}

	getComponentsMapForRoute(route) {

	}

}
