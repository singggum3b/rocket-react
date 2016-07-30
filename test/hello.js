// @flow

import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import {Route as RouteClass} from "../src/class/route.class";
import {Component} from "../src/class/component.class";
import type {JSONSiteMapType,JSONTemplateType} from "../src/type/json.type";
import {createSyncFactory, cloneReactClassWithProps} from "../src";

import {Route, Router, IndexRoute, browserHistory} from "react-router";

const sampleRoute = require("./sampleRoute.json");
const sampleSitemap = require("./sampleSiteMap.json");
const parsedRoute = fromJSON(sampleRoute, JSONTemplateType);
const parsedSiteMap = fromJSON(sampleSitemap, JSONSiteMapType);

// ============================
console.log(new RouteClass(parsedRoute), parsedSiteMap);
// ============================
function moduleResolver(name) {
	let module;
	try {
		module = require(`./components/${name}.js`).default;
	} catch (e) {
		console.log(`Cant resolve module :  ./components/${name}`);
		console.warn(e);
	}

	return module;
}

// =============================
const syncRouteFactory = createSyncFactory({
	siteMap: parsedSiteMap,
	componentResolver({name,initProps}) {
		return new Promise((resolve,reject) => {
			const BareComponentClass = moduleResolver(name);
			resolve(cloneReactClassWithProps(BareComponentClass,initProps));
		});
	},
	routeDataResolver(nextState) {
		return new Promise((resolve,reject) => {
			resolve(sampleRoute);
		});
	},
});

// =====================================

const dynamicRouteList = syncRouteFactory.siteMap.routeList.map((routeObj: RouteClass)=>{
	return (
		<Route path={routeObj.path}
					 key={routeObj.path}
					 getComponent={syncRouteFactory.getTemplateClass(routeObj)}>
			<IndexRoute getComponents={syncRouteFactory.getIndexComponentList(routeObj)} />
			{
				routeObj.componentsList.map((cmp: Component) => {
					return cmp.path ? (
						<Route key={cmp.annotatedName}
									 path={cmp.path}
									 getComponents={syncRouteFactory.getSubRouteComponentList(routeObj,cmp)} />
					) : null;
				})
			}
		</Route>
	);
});

const staticRouteList = [
	<Route key="404" path="*" component={()=>(<div>404 not found</div>)}></Route>,
];

ReactDOM.render((
	<Router history={browserHistory} >
		{dynamicRouteList.concat(staticRouteList)}
	</Router>
), document.getElementById("example"));
