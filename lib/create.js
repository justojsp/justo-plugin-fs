//imports
import {File, Dir} from "justo-fs";


/**
 * Create files and directories.
 */
export default function create(params) {
  var files, dirs, src, res;

  //(1) params
  if (params.length == 1) {
    let param = params[0];

    if (typeof(param) == "string") {
      files = dirs = [];
      src = [param];
    } else {
      if (param.file) {
        let file = param.file;

        if (typeof(file) == "string") files = [{path: file}];
        else files = [file];
      } else {
        files = param.files || [];
      }

      if (param.dir) dirs = [{path: param.dir}];
      else dirs = param.dirs || [];

      src = param.src || [];
    }
  } else if (params.length > 1) {
    files = dirs = [];
    src = params;
  }

  //(2) create
  res = 0;

  if (files) res += createFiles(files);
  if (dirs) res += createDirs(dirs);
  if (src) res += createSrc(src);

  //(3) return
  return res;
}

function createFiles(files) {
  var res;

  //(1) create
  res = 0;

  for (let file of files) {
    res += createFile(typeof(file) == "string" ? {path: file} : file);
  }

  //(3) return
  return res;
}

function createFile(file)  {
  var opts;

  //(1) create
  opts = {
    overwrite: file.hasOwnProperty("overwrite") ? file.overwrite : true,
    content: file.content || ""
  };

  return new File(file.path).create(opts) ? 1 : 0;
}

function createDirs(dirs) {
  var res;

  //(1) create
  res = 0;

  for (let dir of dirs) {
    res += createDir(typeof(dir) == "string" ? {path: dir} : dir);
  }

  //(2) return
  return res;
}

function createDir(dir) {
  return new Dir(dir.path).create() ? 1 : 0;
}

function createSrc(src) {
  var res = 0;

  //(1) create
  for (let entry of src) {
    if (/\/$/.test(entry)) res += createDir({path: entry});
    else res += createFile({path: entry});
  }

  //(2) return
  return res;
}
