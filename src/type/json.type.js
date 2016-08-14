// @flow
import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";

// recursive
export type JSONComponentListType = JSONComponentType | JSONCloneComponentType

// $FlowFixMe Not necessary to flow check this function, only relevant to tcomb
JSONComponentListType.dispatch = function (value) {
	// $FlowFixMe
	if (value.cloneID) return JSONCloneComponentType;
	// $FlowFixMe
	return JSONComponentType;
};

export type JSONCloneComponentType = {
	id: string | number,
	cloneID: string | number,
	path?: string,
	props?: {
		[name: string]: any
	},
	type: "clone",
	section?: string,
	exactPath?: boolean,
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
	type: "component",
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
