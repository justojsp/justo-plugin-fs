"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function op(params) {
  var opts;


  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (typeof opts.src == "string") opts.src = [opts.src];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = opts.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var src = _step.value;fs.chmod(src, opts.mode, { recurse: !!opts.recurse });}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}