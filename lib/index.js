//imports
import {simple} from "justo";

//internal data
var clean, copy;

export default {
  get clean() {
    if (!clean) clean = simple({ns: "org.justojs.plugin.fs", name: "clean"}, require("./clean"));
    return clean;
  },

  get copy() {
    if (!copy) copy = simple({ns: "org.justojs.plugin.fs", name: "copy"}, require("./copy"));
    return copy;
  }
};
