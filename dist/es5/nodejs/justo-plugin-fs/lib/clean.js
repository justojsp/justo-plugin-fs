"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





clean;var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function clean(params) {
  var opts;


  if (params.length >= 1) {
    if (params[0] instanceof Array) opts = { src: params[0] };else 
    opts = Object.assign({}, params[0]);}


  if (!opts) opts = {};
  if (typeof opts.src == "string") opts.src = [opts.src];


  if (opts.files) cleanFiles(opts.files);
  if (opts.dirs) cleanDirs(opts.dirs);
  if (opts.src) cleanSrc(opts.src);


  function cleanFiles(files) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var f = _step.value;new fs.File(f).remove();}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}


  function cleanDirs(dirs) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = dirs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var d = _step2.value;new fs.Dir(d).remove();}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}


  function cleanSrc(src) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = src[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var s = _step3.value;fs.remove(s);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}}