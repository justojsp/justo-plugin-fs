"use strict";var _justo = require("justo");



var NS = "org.justo.plugin.fs";
var clean, copy, create;

module.exports = { 
  get clean() {
    if (!clean) clean = (0, _justo.simple)({ ns: NS, name: "clean" }, require("./lib/clean").default);
    return clean;}, 


  get remove() {
    return this.clean;}, 


  get copy() {
    if (!copy) copy = (0, _justo.simple)({ ns: NS, name: "copy" }, require("./lib/copy").default);
    return copy;}, 


  get create() {
    if (!create) create = (0, _justo.simple)({ ns: NS, name: "create" }, require("./lib/create").default);
    return create;} };