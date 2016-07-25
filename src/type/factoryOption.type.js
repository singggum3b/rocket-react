// @flow

/**
 * Resolve a component with props
 */
export type ComponentResolverType =
	(params : {
		name:string,
		props: {[k:string]: Object}
	}) => Promise<Function>;

/**
 * Resolve full data for a specific route
 */
export type RouteDataResolverType =
	(nextRouterState: {location: Object})=> Promise<{[k:string]: Object}>
