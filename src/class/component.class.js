// @flow
import type {JSONComponentType} from "../type/json.type";

export class Component<T: JSONComponentType> {

	meta: T;
	name: string;
	section: string;
	path: string;
	parentPath: string;
	annotatedName: string;

	constructor(cmp: T, parentPath: string) {
		this.meta = cmp;
		this.section = cmp.section;
		this.name = cmp.name;
		this.parentPath = parentPath || "/";
		this.path = cmp.path || this.parentPath;
		this.annotatedName = `${cmp.section}@${cmp.name}@${cmp.id}`;
	}

	getComponentClass() {}

}
