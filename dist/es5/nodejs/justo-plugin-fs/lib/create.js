"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






create;var _justoFs = require("justo-fs");function create(params) {
  var files, dirs, src, res;


  if (params.length == 1) {
    var param = params[0];

    if (typeof param == "string") {
      files = dirs = [];
      src = [param];} else 
    {
      if (param.file) {
        var file = param.file;

        if (typeof file == "string") files = [{ path: file }];else 
        files = [file];} else 
      {
        files = param.files || [];}


      if (param.dir) dirs = [{ path: param.dir }];else 
      dirs = param.dirs || [];

      src = param.src || [];}} else 

  if (params.length > 1) {
    files = dirs = [];
    src = params;}



  res = 0;

  if (files) res += createFiles(files);
  if (dirs) res += createDirs(dirs);
  if (src) res += createSrc(src);


  return res;}


function createFiles(files) {
  var res;


  res = 0;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var file = _step.value;
      res += createFile(typeof file == "string" ? { path: file } : file);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



  return res;}


function createFile(file) {
  var opts, res;


  opts = { 
    overwrite: file.hasOwnProperty("overwrite") ? file.overwrite : true, 
    content: file.content || "" };


  return new _justoFs.File(file.path).create(opts) ? 1 : 0;}


function createDirs(dirs) {
  var res;


  res = 0;var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

    for (var _iterator2 = dirs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var dir = _step2.value;
      res += createDir(typeof dir == "string" ? { path: dir } : dir);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}



  return res;}


function createDir(dir) {
  return new _justoFs.Dir(dir.path).create() ? 1 : 0;}


function createSrc(src) {
  var res = 0;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {


    for (var _iterator3 = src[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var entry = _step3.value;
      if (/\/$/.test(entry)) res += createDir({ path: entry });else 
      res += createFile({ path: entry });}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}



  return res;}