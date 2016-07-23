// @flow
export type ComponentResolverType = (params : {
	name:string,
	props: {[k:string]: Object}
}) => Promise<Function>;

export type RouteDataResolverType = (nextRouterState: {location: Object})
	=> Promise<{[k:string]: Object}>

