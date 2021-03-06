//imports
import path from "path";
import * as fs from "justo-fs";

/**
 * Copy files and/or directories.
 */
export default function copy(params) {
  //(1) arguments
  if (params.length == 1) {
    if (params[0] instanceof Array) params = params[0];
  } else if (params.length == 2) {
    if (typeof(params[0]) == "string" && typeof(params[1]) == "string") {
      params = [{src: params[0], dst: params[1]}];
    }
  }

  //(2) check
  for (let param of params) {
    let src = param.src;
    let dst = param.dst || param.dest;

    if (!src) throw new Error("Expected source file(s).");
    if (!dst) throw new Error("Expected destination path.");
    if (typeof(dst) != "string") throw new Error("Destination must be a string.");
  }

  //(3) copy
  for (let param of params) {
    let src = param.src;
    let dst = param.dst || param.dest;
    let force = !!param.force;
    let ignore = param.ignore;

    if (!ignore) ignore = [];
    if (typeof(ignore) == "string") ignore = [ignore];

    if (typeof(src) == "string") {
      cp(src, dst, {ignore, force});
    } else {
      dst = path.join(dst, "/");
      for (let s of src) cp(s, dst, {ignore, force});
    }
  }

  //helper functions
  function cp(src, dst, opts) {
    if (opts.ignore.indexOf(src) < 0) {
      // if (ignore) new fs.Dir(src).copyTo({path: dst, ignore});
      fs.copy(src, dst, opts);
    }
  }
}
