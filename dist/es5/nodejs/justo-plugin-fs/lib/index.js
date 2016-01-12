"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _justo = require(
"justo");


var clean, copy;exports["default"] = Object.defineProperties(

{}, { 
  clean: { get: function get() {
      if (!clean) clean = (0, _justo.simple)({ ns: "org.justojs.plugin.fs", name: "clean" }, require("./clean"));
      return clean;}, configurable: true, enumerable: true }, 


  copy: { get: function get() {
      if (!copy) copy = (0, _justo.simple)({ ns: "org.justojs.plugin.fs", name: "copy" }, require("./copy"));
      return copy;}, configurable: true, enumerable: true } });module.exports = exports["default"];
