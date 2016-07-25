// @flow
import type {JSONComponentType} from "../type/json.type";

export class Component<T: JSONComponentType> {

	meta: T;
	path: string;
	parentPath: string;
	annotatedName: string;

	constructor(cmp: T, parentPath: string) {
		this.meta = cmp;
		this.parentPath = parentPath || "/";
		this.path = cmp.path || this.parentPath;
		this.annotatedName = `${this.section}@${this.name}@${this.id}`;
	}

	getComponentClass() {}

}
