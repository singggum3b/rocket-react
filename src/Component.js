// @flow
import { JsonComponentType } from "./Types";

export class ComponentObj {
	constructor(cmp : JsonComponentType) {
		Object.assign(this,cmp);
	}

	getComponentClass(): string {
		return this.name;
	}

}
