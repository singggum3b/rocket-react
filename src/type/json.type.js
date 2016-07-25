// @flow
import type { $Refinement, $Reify } from "tcomb";
import t from "tcomb";

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
	templateName: string,
	componentsList: Array<JSONComponentType>
}

export type JSONSiteMapType = Array<JSONTemplateType>
