//imports
import * as fs from "justo-fs";

/**
 * Cleans files and/or directories.
 */
export default function clean(params) {
  var opts;

  //(1) arguments
  if (params.length >= 1) {
    if (params[0] instanceof Array) opts = {src: params[0]};
    else opts = Object.assign({}, params[0]);
  }

  if (!opts) opts = {};
  if (typeof(opts.src) == "string") opts.src = [opts.src];

  //(2) remove
  if (opts.files) cleanFiles(opts.files);
  if (opts.dirs) cleanDirs(opts.dirs);
  if (opts.src) cleanSrc(opts.src);

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
