// @flow

import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import {Route as RouteClass} from "../src/class/route.class";
import {Component} from "../src/class/component.class";
import type {JSONSiteMapType, JSONRouteType} from "../src/type/json.type";
import {createSyncFactory, cloneReactClassWithProps} from "../src";

import {Route, Router, IndexRoute, browserHistory} from "react-router";

const sampleSitemap = require("./sampleSiteMap.json");
const parsedSiteMap = fromJSON(sampleSitemap,JSONSiteMapType);

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

function renderComponentList(routeObj) {
	return routeObj.componentsList.map((cmp: Component) => {
		if (cmp.componentsList) {
			return (
				<Route key={cmp.annotatedName}
							 path={cmp.path}
							 getComponents={syncRouteFactory.getTemplateClass(cmp,routeObj)} >
					<IndexRoute getComponents={syncRouteFactory.getIndexComponentList(cmp)} />
					{
						renderComponentList({componentsList: cmp.componentsList})
					}
				</Route>
			);
		}

		if (cmp.path) {
			return (
				<Route key={cmp.annotatedName}
							 path={cmp.path}
							 getComponents={syncRouteFactory.getSubRouteComponentList(routeObj,cmp)} />
			);
		}

		return false;
	}).filter(Boolean);
}

const dynamicRouteList = syncRouteFactory.siteMap.routeList.map((routeObj: RouteClass)=>{
	return (
		<Route path={routeObj.path}
					 key={routeObj.path}
					 getComponent={syncRouteFactory.getTemplateClass(routeObj)}>
			<IndexRoute getComponents={syncRouteFactory.getIndexComponentList(routeObj)} />
			{
				renderComponentList(routeObj)
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
