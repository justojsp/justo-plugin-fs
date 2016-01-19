//imports
import {simple} from "justo";

//internal data
const NS = "org.justo.plugin.fs";
var clean, copy, create;

export default {
  get clean() {
    if (!clean) clean = simple({ns: NS, name: "clean"}, require("./clean"));
    return clean;
  },

  get copy() {
    if (!copy) copy = simple({ns: NS, name: "copy"}, require("./copy"));
    return copy;
  },

  get create() {
    if (!create) create = simple({ns: NS, name: "create"}, require("./create"));
    return create;
  }
};
