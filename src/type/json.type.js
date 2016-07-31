// @flow
import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";

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
	componentsList?: Array<JSONComponentType>,
}

export type JSONReplacementComponentType = {
	name: string,
	props: {
		[name: string]: any
	},
}

export type JSONRouteType = {
	path: string,
	templateName: string,
	props: {
		[name: string]: any
	},
	componentsList: Array<JSONComponentType>,
}

export type JSONSiteMapType = Array<JSONRouteType>
