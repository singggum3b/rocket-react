// @flow

import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import {Route as RouteClass} from "../src/class/route.class";
import {Component} from "../src/class/component.class";
import type {JSONSiteMapType,JSONTemplateType} from "../src/type/json.type";
import {createSyncFactory} from "../src";

import {Route, Router, IndexRoute, browserHistory, withRouter} from "react-router";

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

function decorator(target) {
	return target;
}

// =============================
const syncRouteFactory = createSyncFactory({
	siteMap: parsedSiteMap,
	componentResolver({name,initProps}) {
		return new Promise((resolve,reject) => {
			const BareComponentClass = moduleResolver(name);
			try {
				console.log(Reflect.ownKeys(BareComponentClass.prototype));
			} catch (e) {
				console.log(e);
			}
			if (BareComponentClass) {
				resolve(BareComponentClass);
			} else {
				reject();
			}
		});
	},
	routeDataResolver(nextState) {
		return new Promise((resolve,reject) => {
			resolve(sampleRoute);
		});
	},
});

// =====================================

const routeList = syncRouteFactory.siteMap.routeList.map((routeObj: RouteClass)=>{
	return (
		<Route path={routeObj.path}
					 key={routeObj.path}
					 getComponent={syncRouteFactory.getTemplateClass(routeObj)}>
			<IndexRoute getComponents={syncRouteFactory.getIndexComponentList(routeObj)} />
			{
				routeObj.componentsList.map((cmp: Component) => {
					return (
						<Route key={cmp.annotatedName}
									 path={cmp.path}
									 getComponents={syncRouteFactory.getSubRouteComponentList(routeObj,cmp.path)} />
					);
				})
			}
		</Route>
	)
});

ReactDOM.render((
	<Router history={browserHistory} >
		{routeList}
	</Router>
), document.getElementById("example"));
