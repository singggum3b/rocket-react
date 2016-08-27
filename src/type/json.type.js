// @flow
import t from "tcomb";

export type ID = string | number;

// $FlowFixMe
ID.dispatch = function (value) {
	if (typeof value === "string" || value instanceof String) return t.String;
	return t.Number;
};

export type JSONCloneComponentType = {
	id: ID,
	cloneID: ID,
	priority?: number,
	path?: string,
	props?: {
		[name: string]: any
	},
	type: "clone",
	section?: string,
	exactPath?: boolean,
	excludedId?: Array<ID>,
	excludedName?: Array<string>,
}

// recursive
export type JSONComponentType = {
	id: ID,
	priority?: number,
	name: string,
	path?: string,
	section: string,
	exactPath?: boolean,
	excludedId?: Array<ID>,
	excludedName?: Array<string>,
	type: "component",
	props: {
		[name: string]: any
	},
	componentsList?: Array<JSONComponentListType>,
}

export type JSONComponentListType = JSONComponentType | JSONCloneComponentType

// $FlowFixMe Not necessary to flow check this function, only relevant to tcomb
JSONComponentListType.dispatch = function (value) {
	// $FlowFixMe
	if (value.cloneID) return JSONCloneComponentType;
	// $FlowFixMe
	return JSONComponentType;
};

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
