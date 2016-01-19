"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _justo = require(
"justo");


var NS = "org.justo.plugin.fs";
var clean, copy, create;exports["default"] = Object.defineProperties(

{}, { 
  clean: { get: function get() {
      if (!clean) clean = (0, _justo.simple)({ ns: NS, name: "clean" }, require("./clean"));
      return clean;}, configurable: true, enumerable: true }, 


  copy: { get: function get() {
      if (!copy) copy = (0, _justo.simple)({ ns: NS, name: "copy" }, require("./copy"));
      return copy;}, configurable: true, enumerable: true }, 


  create: { get: function get() {
      if (!create) create = (0, _justo.simple)({ ns: NS, name: "create" }, require("./create"));
      return create;}, configurable: true, enumerable: true } });module.exports = exports["default"];
