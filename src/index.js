// @flow

import type {ComponentResolverType,RouteDataResolverType} from "./type/factoryOption.type";
import type {TemplateResolverType,ComponentListResolverType} from "./type/factoryOutput.type";

export function createFactory(option: {
	componentResolver: ComponentResolverType,
	routeDataResolver: RouteDataResolverType,
}): {
	templateResolver: TemplateResolverType,
	componentListResolver: ComponentListResolverType
} {
	return {
		templateResolver(nextState,cb) {
			return function () {};
		},
		componentListResolver(nextState,cb) {
			return {
				abc() {},
			};
		},
	};
}
