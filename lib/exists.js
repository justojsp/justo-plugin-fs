//imports
import * as fs from "justo-fs";

/**
 * Task operation.
 */
export default function op(params) {
  var entry;

  //(1) params
  if (params.length >= 1) {
    entry = params[0].src;
  }

  if (!entry) throw new Error("src expected.");

  //(2) return
  return fs.exists(entry);
}
