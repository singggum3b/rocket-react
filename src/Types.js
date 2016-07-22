// @flow

Map.fromJSON = function (val: {[name: string]: any}): Map {
	return new Map(Object.entries(val));
};

export type JsonComponentType = {
	id: string;
	name: string;
	path?: string;
	props: {
		[name: string]: any
	}
}

export type JsonSectionType = {
	name: string;
	components: Array<JsonComponentType>;
}

export type JsonTemplateType = {
	name: string;
	sections: Map<string,JsonSectionType>
}
