// @flow
import { TemplateType } from "./Types";
export class Template {
	constructor(tpl: TemplateType) {
		(this: TemplateType);
	}

	getLayout(): Object {
		return this.name;
	}
}
