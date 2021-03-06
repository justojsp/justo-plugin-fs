"use strict";
var _justo = require("justo");


var NS = "org.justo.plugin.fs";
var chmod, chown, clean, copy, create;

module.exports = {
  get chmod() {
    if (!chmod) chmod = (0, _justo.simple)({ ns: NS, name: "chmod" }, require("./lib/chmod").default);
    return chmod;
  },

  get chown() {
    if (!chown) chown = (0, _justo.simple)({ ns: NS, name: "chown" }, require("./lib/chown").default);
    return chown;
  },

  get clean() {
    if (!clean) clean = (0, _justo.simple)({ ns: NS, name: "clean" }, require("./lib/clean").default);
    return clean;
  },

  get remove() {
    return this.clean;
  },

  get copy() {
    if (!copy) copy = (0, _justo.simple)({ ns: NS, name: "copy" }, require("./lib/copy").default);
    return copy;
  },

  get create() {
    if (!create) create = (0, _justo.simple)({ ns: NS, name: "create" }, require("./lib/create").default);
    return create;
  },

  get exists() {
    if (!this._exists) Object.defineProperty(this, "_exists", { value: (0, _justo.simple)({ ns: NS, name: "exists" }, require("./lib/exists").default) });
    return this._exists;
  } };