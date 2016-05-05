//imports
import * as fs from "justo-fs";

/**
 * Task operation.
 */
export default function op(params) {
  var opts;

  //(1) arguments
  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (typeof(opts.src) == "string") opts.src = [opts.src];

  //(2) change
  for (let src of opts.src) fs.chmod(src, opts.mode, {recurse: !!opts.recurse});
}
