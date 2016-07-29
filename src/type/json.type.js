// @flow
import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";

export type JSONComponentType = {
	id: string,
	name: string,
	path?: string,
	section: string,
	type: "component" | "flowComponent",
	props: {
		[name: string]: any
	}
}

export type JSONRouteType = {
	templateName: string,
	componentsList: Array<JSONComponentType>,
	props: {
		[name: string]: any
	}
}

export type JSONSiteMapType = Array<JSONRouteType>
