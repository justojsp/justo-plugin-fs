//imports
import {simple} from "justo";

//internal data
const NS = "org.justo.plugin.fs";
var chown, clean, copy, create;

module.exports = {
  get chown() {
    if (!chown) chown = simple({ns: NS, name: "chown"}, require("./lib/chown").default);
    return chown;
  },

  get clean() {
    if (!clean) clean = simple({ns: NS, name: "clean"}, require("./lib/clean").default);
    return clean;
  },

  get remove() {
    return this.clean;
  },

  get copy() {
    if (!copy) copy = simple({ns: NS, name: "copy"}, require("./lib/copy").default);
    return copy;
  },

  get create() {
    if (!create) create = simple({ns: NS, name: "create"}, require("./lib/create").default);
    return create;
  }
};
