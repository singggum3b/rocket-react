// @flow
export type RouteResolverType<T> = (nextRouterState: {location: Object}, callback: Function) => T

export type TemplateResolverType = RouteResolverType<Function>

export type ComponentListResolverType = RouteResolverType<{[key:string]: Function}>
