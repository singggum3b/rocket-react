// @flow
import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import type { Template, JSONTemplateType } from "../src/Types";


const sample = require("./sample.json");
console.log(fromJSON(sample,JSONTemplateType));
