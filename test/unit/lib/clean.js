//imports
const path = require("path");
const File = require("justo-fs").File;
const Dir = require("justo-fs").Dir;
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const clean = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/clean").default;

//suite
suite("#clean()", function() {
  const DATA_DIR = "test/unit/data/clean";
  const SRC_DIR = new Dir(DATA_DIR);
  const DST_DIR = new Dir(Dir.TMP_DIR, Date.now());

  init("*", function() {
    DST_DIR.create();
    SRC_DIR.copyTo(DST_DIR);
  });

  fin("*", function() {
    DST_DIR.remove();
  });

  test("clean([{files}])", function() {
    clean([{
      files: [
        path.join(DST_DIR.path, "a.txt"),
        path.join(DST_DIR.path, "c.txt"),
        path.join(DST_DIR.path, "unknown.txt"),
        path.join(DST_DIR.path, "dir1")
      ]
    }]);

    file(DST_DIR.path, "a.txt").must.not.exist();
    file(DST_DIR.path, "b.txt").must.exist();
    file(DST_DIR.path, "c.txt").must.not.exist();
    dir(DST_DIR.path, "dir1").must.exist();
    dir(DST_DIR.path, "dir2").must.exist();
    dir(DST_DIR.path, "dir3").must.exist();
  });

  test("clean([{dirs}])", function() {
    clean([{
      dirs: [
        path.join(DST_DIR.path, "a.txt"),
        path.join(DST_DIR.path, "dir1"),
        path.join(DST_DIR.path, "dir3"),
        path.join(DST_DIR.path, "unknown")
      ]
    }]);

    file(DST_DIR.path, "a.txt").must.exist();
    file(DST_DIR.path, "b.txt").must.exist();
    file(DST_DIR.path, "c.txt").must.exist();
    dir(DST_DIR.path, "dir1").must.not.exist();
    dir(DST_DIR.path, "dir2").must.exist();
    dir(DST_DIR.path, "dir3").must.not.exist();
  });

  test("clean([{src}])", function() {
    clean([{
      src: [
        path.join(DST_DIR.path, "a.txt"),
        path.join(DST_DIR.path, "c.txt"),
        path.join(DST_DIR.path, "dir1"),
        path.join(DST_DIR.path, "dir3"),
        path.join(DST_DIR.path, "unknown")
      ]
    }]);

    file(DST_DIR.path, "a.txt").must.not.exist();
    file(DST_DIR.path, "b.txt").must.exist();
    file(DST_DIR.path, "c.txt").must.not.exist();
    dir(DST_DIR.path, "dir1").must.not.exist();
    dir(DST_DIR.path, "dir2").must.exist();
    dir(DST_DIR.path, "dir3").must.not.exist();
  });

  test("clean([array])", function() {
    clean([[
        path.join(DST_DIR.path, "a.txt"),
        path.join(DST_DIR.path, "b.txt"),
        path.join(DST_DIR.path, "dir1"),
        path.join(DST_DIR.path, "dir2"),
        path.join(DST_DIR.path, "unknown")
    ]]);

    file(DST_DIR.path, "a.txt").must.not.exist();
    file(DST_DIR.path, "b.txt").must.not.exist();
    file(DST_DIR.path, "c.txt").must.exist();
    dir(DST_DIR.path, "dir1").must.not.exist();
    dir(DST_DIR.path, "dir2").must.not.exist();
    dir(DST_DIR.path, "dir3").must.exist();
  });
})();
