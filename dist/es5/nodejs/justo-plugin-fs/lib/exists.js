"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =





op;var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function op(params) {
  var entry;


  if (params.length >= 1) {
    entry = params[0].src;
  }

  if (!entry) throw new Error("src expected.");


  return fs.exists(entry);
}