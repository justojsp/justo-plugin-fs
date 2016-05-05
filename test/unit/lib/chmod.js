//imports
const assert = require("assert");
const path = require("path");
const Dir = require("justo-fs").Dir;
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/chmod").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data/chmod";
  var TMP_DIR, TMP, file;

  init({name: "*", title: "Create tmp dir"}, function() {
    TMP_DIR = Dir.createTmpDir();
    TMP = TMP_DIR.path;
  });

  init({name: "*", title: "Copy data files"}, function() {
    new Dir(DATA).copyTo(TMP);
  });

  fin({name: "*", title: "Remove tmp dir"}, function() {
    TMP_DIR.remove();
  });

  test("chmod({src : string, mode})", function() {
    assert(op([{src: path.join(TMP, "a.txt"), mode: "777"}]) === undefined);
  });

  test("chmod({src : string, mode, recurse})", function() {
    assert(op([{src: TMP, mode: "777", recurse: true}]) === undefined);
  });

  test("chmod({src : string[], mode})", function() {
    assert(op([{src: [path.join(TMP, "a.txt")], mode: "777"}]) === undefined);
  });

  test("chmod({src : string[], mode, recurse})", function() {
    assert(op([{src: [TMP], mode: "777", recurse: true}]) === undefined);
  });
})();
