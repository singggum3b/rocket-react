// @flow
import type {JSONComponentType} from "../type/json.type";

export class Component<T: JSONComponentType> {

	meta: T;

	constructor(cmp: T) {
		this.meta = cmp;
	}

	getComponentClass() {}

}
