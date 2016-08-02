"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






copy;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function copy(params) {

  if (params.length == 1) {
    if (params[0] instanceof Array) params = params[0];} else 
  if (params.length == 2) {
    if (typeof params[0] == "string" && typeof params[1] == "string") {
      params = [{ src: params[0], dst: params[1] }];}}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {




    for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var param = _step.value;
      var src = param.src;
      var dst = param.dst || param.dest;

      if (!src) throw new Error("Expected source file(s).");
      if (!dst) throw new Error("Expected destination path.");
      if (typeof dst != "string") throw new Error("Destination must be a string.");}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {



    for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var _param = _step2.value;
      var _src = _param.src;
      var _dst = _param.dst || _param.dest;
      var ignore = _param.ignore;

      if (!ignore) ignore = [];
      if (typeof ignore == "string") ignore = [ignore];

      if (typeof _src == "string") {
        cp(_src, _dst, ignore);} else 
      {
        _dst = _path2.default.join(_dst, "/");var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
          for (var _iterator3 = _src[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var s = _step3.value;cp(s, _dst, ignore);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}




  function cp(src, dst, ignore) {
    if (ignore.indexOf(src) < 0) {
      if (ignore) new fs.Dir(src).copyTo({ path: dst, ignore: ignore });else 
      fs.copy(src, dst);}}}