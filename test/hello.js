// @flow
import installTypeFormatter from "tcomb/lib/installTypeFormatter";
installTypeFormatter();

import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import type { Template, JSONTemplateType } from "../src/class/template.class";


const sample = require("./sample.json");
const parsed: JSONTemplateType = fromJSON(sample,JSONTemplateType);
const template = new Template(parsed);
// ============================
console.log(parsed,template);

