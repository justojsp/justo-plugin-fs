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
  const SRC_DIR = new Dir("test/unit/data/copy");
  var DST_DIR = new Dir(Dir.TMP_DIR, Date.now());
  const log = dummy({}, ["debug()", "info()", "warn()", "error()", "fatal()"]);

  init("*", function() {
    DST_DIR.create();
  });

  fin("*", function() {
    DST_DIR.remove();
  });

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
    var dstFile1 = new File(DST_DIR, "a.txt");
    var dstFile2 = new File(DST_DIR, "b.txt");

    copy([src.path, dst.path], log);

    file(dstFile1.path).must.exist();
    file(dstFile1.path).text.must.be.eq(srcFile1.text);
    file(dstFile2.path).must.exist();
    file(dstFile2.path).text.must.be.eq(srcFile2.text);
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
    var dst = DST_DIR.path;

    copy([{src: src1.path, dst: dst1.path}, {src: src2.path, dst: dst2.path}], log);

    file(dst1.path).must.exist();
    file(dst1.path).text.must.be.eq(src1.text);
    file(dst2.path).must.exist();
    file(dst2.path).text.must.be.eq(src2.text);
  });
})();
