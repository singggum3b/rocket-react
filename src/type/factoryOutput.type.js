// @flow
export type RouteResolverType<T> = (nextRouterState: {location: Object}, callback: Function) => T

/**
 * Resolve template component for a specific route
 */
export type TemplateResolverType = RouteResolverType<Function>

/**
 * Resolve component list for a specific route
 */
export type ComponentListResolverType = RouteResolverType<{[key:string]: Function}>
