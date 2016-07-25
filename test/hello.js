// @flow

import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import {Template} from "../src/class/template.class";
import {Component} from "../src/class/component.class";
import type {JSONSiteMapType,JSONTemplateType} from "../src/type/json.type";
import {createSyncFactory} from "../src";

import React from "react";
import {Route,IndexRoute} from "react-router";

const sampleRoute = require("./sampleRoute.json");
const sampleSitemap = require("./sampleSiteMap.json");
const parsedRoute = fromJSON(sampleRoute, JSONTemplateType);
const parsedSiteMap = fromJSON(sampleSitemap, JSONSiteMapType);

// ============================
console.log(new Template(parsedRoute), parsedSiteMap);
// ============================
const customRequire = require.context("./components",false,/\.js$/);
function moduleResolver(name) {
	let module;
	try {
		module = customRequire(name);
	} catch (e) {
		console.log(`Cant resolve module : ${name}`);
	}

	return module;
}
// =============================
const syncRouteFactory = createSyncFactory({
	siteMap: parsedSiteMap,
	componentResolver({name,props}) {
		return new Promise((resolve,reject) => {
			const module = moduleResolver(name);
			if (module) {
				resolve(module);
			} else {
				reject();
			}
		});
	},
	routeDataResolver(nextState) {
		return new Promise((resolve,reject)=>{
			resolve(sampleRoute);
		});
	},
});

// =====================================

const routeList = syncRouteFactory.siteMap.routeList.map((routeObj: Template)=>{
	return (
		<Route getComponent={routeObj.getTemplate}>
			<IndexRoute getComponents={routeObj.getIndexComponentList} />
			{
				routeObj.componentsList.map((cmp: Component)=> {
					return <Route path={cmp.path} getComponents={routeObj.getSubRouteComponent} />;
				})
			}
		</Route>
	)
});
