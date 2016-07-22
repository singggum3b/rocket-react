// @flow
import "babel-polyfill";
import fromJSON from "tcomb/lib/fromJSON";
import { JsonTemplateType } from "../src/Types";
const sample = require("./sample.json");

console.log(new JsonTemplateType(sample));

