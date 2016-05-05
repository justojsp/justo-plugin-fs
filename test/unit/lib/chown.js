//imports
const assert = require("assert");
const path = require("path");
const Dir = require("justo-fs").Dir;
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/chown").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data/chown";
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

  test("chown({src : string, user, group})", function() {
    assert(op([{src: path.join(TMP, "a.txt"), user: undefined, group: undefined}]) === undefined);
  });

  test("chown({src : string, user, group, recurse})", function() {
    assert(op([{src: TMP, user: undefined, group: undefined, recurse: true}]) === undefined);
  });

  test("chown({src : string[], user, group})", function() {
    assert(op([{src: [path.join(TMP, "a.txt")], user: undefined, group: undefined}]) === undefined);
  });

  test("chown({src : string[], user, group, recurse})", function() {
    assert(op([{src: [TMP], user: undefined, group: undefined, recurse: true}]) === undefined);
  });
})();
