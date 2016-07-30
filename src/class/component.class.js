// @flow
import type {JSONComponentType} from "../type/json.type";

export class Component<T: JSONComponentType> {

	meta: T;
	name: string;
	section: string;
	exactPath: boolean;
	type = "component";
	path: string | void;
	parentPath: string;
	annotatedName: string;
	paramsList: Array<string>;

	constructor(cmp: T, parentPath: string) {
		this.meta = cmp;
		this.exactPath = cmp.exactPath;
		this.section = cmp.section;
		this.name = cmp.name;
		this.parentPath = parentPath || "/";
		this.path = cmp.path || undefined;
		this.fullPath = joinPath(this.parentPath, this.path);
		this.paramsList = this.fullPath.match(/:(\w+)/g);
		this.annotatedName = `${cmp.section}@${cmp.name}@${cmp.id}`;
	}

}

function joinPath(left,right) {
	if (!right) return left;
	if (right.indexOf("/") === 0) {
		return `${right}`;
	} else {
		return `${left}/${right}`;
	}
}
