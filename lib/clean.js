//imports
import * as fs from "justo-fs";

/**
 * Cleans files and/or directories.
 */
export default function clean(params) {
  var files, dirs, src;

  //(1) arguments
  if (params[0]) {
    if (params[0] instanceof Array) {
      src = params[0];
    } else {
      files = params[0].files;
      dirs = params[0].dirs;
      src = params[0].src;
    }
  }

  //(2) remove
  if (files) cleanFiles(files);
  if (dirs) cleanDirs(dirs);
  if (src) cleanSrc(src);

  //helper functions
  function cleanFiles(files) {
    for (let f of files) new fs.File(f).remove();
  }

  function cleanDirs(dirs) {
    for (let d of dirs) new fs.Dir(d).remove();
  }

  function cleanSrc(src) {
    for (let s of src) fs.remove(s);
  }
}
