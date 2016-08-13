// @flow
import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";

// recursive
export type JSONComponentListType = JSONComponentType | JSONCloneComponentType

JSONComponentListType.dispatch = function (value) {
	if (value.cloneID) return JSONCloneComponentType;
	return JSONComponentType;
};

export type JSONCloneComponentType = {
	id: string | number,
	cloneID: string | number,
	props?: {
		[name: string]: any
	},
	excludedId?: Array<string | boolean>,
	excludedName?: Array<string>,
}

// recursive
export type JSONComponentType = {
	id: string | number,
	name: string,
	path?: string,
	section: string,
	exactPath?: boolean,
	excludedId?: Array<string | boolean>,
	excludedName?: Array<string>,
	type: "component" | void,
	props: {
		[name: string]: any
	},
	componentsList?: Array<JSONComponentListType>,
}

export type JSONReplacementComponentType = {
	name: string,
	props: {
		[name: string]: any
	},
}

export type JSONRouteType = {
	path: string,
	name: string,
	props: {
		[name: string]: any
	},
	componentsList: Array<JSONComponentListType>,
}

export type JSONSiteMapType = Array<JSONRouteType>
