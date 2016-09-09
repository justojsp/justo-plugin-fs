//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const dummy = require("justo-dummy");
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const File = require("justo-fs").File;
const Dir = require("justo-fs").Dir;
const copy = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/copy").default;

//suite
suite("#copy()", function() {
  const SRC_DIR = new Dir("test/unit/data/copy"), SRC = SRC_DIR.path;
  var DST_DIR, DST;

  const log = dummy({}, ["debug()", "info()", "warn()", "error()", "fatal()"]);

  init("*", function() {
    DST_DIR = Dir.createTmpDir();
    DST = DST_DIR.path;
  }).title("Create tmp dir where to copy");

  fin("*", function() {
    DST_DIR.remove();
  }).title("Remove tmp dir");

  test("File to file", function() {
    var src = new File(SRC_DIR, "a.txt");
    var dst = new File(DST_DIR, "aaa.txt");

    copy([src.path, dst.path], log);

    file(dst.path).must.exist();
    file(dst.path).text.must.be.eq(src.text);
  });

  test("Dir to dir", function() {
    var src = SRC_DIR;
    var dst = DST_DIR;
    var srcFile1 = new File(SRC_DIR, "a.txt");
    var srcFile2 = new File(SRC_DIR, "b.txt");
    var srcFile3 = new File(SRC_DIR, "ignore", "c.txt");
    var dstFile1 = new File(DST_DIR, "a.txt");
    var dstFile2 = new File(DST_DIR, "b.txt");
    var dstFile3 = new File(DST_DIR, "ignore", "c.txt");

    copy([src.path, dst.path], log);

    file(dstFile1.path).must.exist();
    file(dstFile1.path).text.must.be.eq(srcFile1.text);
    file(dstFile2.path).must.exist();
    file(dstFile2.path).text.must.be.eq(srcFile2.text);
    file(dstFile3.path).must.exist();
    file(dstFile3.path).text.must.be.eq(srcFile3.text);
  });

  suite.only("ignore", function() {
    test("Top-level file to ignore", function() {
      copy([{src: SRC, dst: DST, ignore: "a.txt"}], log);

      file(DST, "a.txt").must.not.exist();
      file(DST, "b.txt").must.exist();
      file(DST, "ignore", "c.txt").must.exist();
    });

    test("Top-level dir to ignore", function() {
      copy([{src: SRC, dst: DST, ignore: "ignore"}], log);

      file(DST, "a.txt").must.exist();
      file(DST, "b.txt").must.exist();
      dir(DST, "ignore").must.not.exist();
    });

    test("Dir to dir with ignore", function() {
      var src = SRC_DIR;
      var dst = DST_DIR;
      var srcFile1 = new File(SRC_DIR, "a.txt");
      var srcFile2 = new File(SRC_DIR, "b.txt");
      var dstFile1 = new File(DST_DIR, "a.txt");
      var dstFile2 = new File(DST_DIR, "b.txt");

      copy([{src: src.path, dst: dst.path, ignore: path.join(SRC, "ignore")}], log);

      file(dstFile1.path).must.exist();
      file(dstFile1.path).text.must.be.eq(srcFile1.text);
      file(dstFile2.path).must.exist();
      file(dstFile2.path).text.must.be.eq(srcFile2.text);
      file(DST, "ignore", "c.txt").must.not.exist();
    });
  });

  test("Entries to dir", function() {
    var src1 = new File(SRC_DIR, "a.txt");
    var src2 = new File(SRC_DIR, "b.txt");
    var dst1 = new File(DST_DIR, "a.txt");
    var dst2 = new File(DST_DIR, "b.txt");
    var src = [src1.path, src2.path];
    var dst = DST_DIR.path;

    copy([{src: src, dst}], log);

    file(dst1.path).must.exist();
    file(dst1.path).text.must.be.eq(src1.text);
    file(dst2.path).must.exist();
    file(dst2.path).text.must.be.eq(src2.text);
  });

  test("Several times", function() {
    var src1 = new File(SRC_DIR, "a.txt");
    var src2 = new File(SRC_DIR, "b.txt");
    var dst1 = new File(DST_DIR, "a.txt");
    var dst2 = new File(DST_DIR, "b.txt");

    copy([{src: src1.path, dst: dst1.path}, {src: src2.path, dst: dst2.path}], log);

    file(dst1.path).must.exist();
    file(dst1.path).text.must.be.eq(src1.text);
    file(dst2.path).must.exist();
    file(dst2.path).text.must.be.eq(src2.text);
  });

  suite("force option", function() {
    suite("force=false", function() {
      test("All existent entries", function() {
        copy([{
          src: [path.join(SRC, "a.txt"), path.join(SRC, "b.txt")],
          dst: DST,
          force: false
        }], log);

        file(DST, "a.txt").must.exist();
        file(DST, "b.txt").must.exist();
      });

      test("Some nonexistent entry", function() {
        copy.must.raise(/doesn't exist/, [[{
          src: [path.join(SRC, "a.txt"), path.join(SRC, "nonexistent.txt"), path.join(SRC, "b.txt")],
          dst: DST,
          force: false
        }], log]);

        file(DST, "a.txt").must.exist();
        file(DST, "b.txt").must.not.exist();
      });
    });

    suite("force=true", function() {
      test("All existent entries", function() {
        copy([{
          src: [path.join(SRC, "a.txt"), path.join(SRC, "b.txt")],
          dst: DST,
          force: true
        }], log);

        file(DST, "a.txt").must.exist();
        file(DST, "b.txt").must.exist();
      });

      test("Some nonexistent entry", function() {
        copy([{
          src: [path.join(SRC, "a.txt"), path.join(SRC, "nonexistent.txt"), path.join(SRC, "b.txt")],
          dst: DST,
          force: true
        }], log);

        file(DST, "a.txt").must.exist();
        file(DST, "b.txt").must.exist();
      });
    });
  });
})();
