//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const File = require("justo-fs").File;
const Dir = require("justo-fs").Dir;
const create = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/create").default;

//suite
suite("#create()", function() {
  var DST_DIR = new Dir(Dir.TMP_DIR, Date.now());
  var file, file1, file2;
  var dir, dir1, dir2;

  init("*", function() {
    DST_DIR.create();
    file = file1 = new File(DST_DIR, "file1.txt");
    file2 = new File(DST_DIR, "file2.txt");
    dir = dir1 = new Dir(DST_DIR, "dir1");
    dir2 = new Dir(DST_DIR, "dir2");
  });

  fin("*", function() {
    DST_DIR.remove();
  });

  suite("create(src : string)", function() {
    test("create(src) - file not existing", function() {
      create([file.path]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
    });

    test("create(src) - file existing", function() {
      file.text = "ABC.";
      file.text.must.be.eq("ABC.");

      create([file.path]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
    });

    test("create(src) - dir not existing", function() {
      create([dir.path + "/"]).must.be.eq(1);
      dir.exists().must.be.eq(true);
    });

    test("create(src) - dir existing", function() {
      dir.create();
      dir.exists().must.be.eq(true);
      create([dir.path + "/"]).must.be.eq(0);
      dir.exists().must.be.eq(true);
    });
  });

  suite("create(src : string[])", function() {
    test("create(src : string[]) - not existing", function() {
      create([file.path, dir.path + "/"]).must.be.eq(2);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
      dir.exists().must.be.eq(true);
    });

    test("create(src : string[]) - existing", function() {
      file.text = "ABC.";
      file.text.must.be.eq("ABC.");
      dir.create();

      create([file.path, dir.path + "/"]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
      dir.exists().must.be.eq(true);
    });
  });

  suite("create({file})", function() {
    test("create({file : string}) - not existing", function() {
      create([{file: file.path}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
    });

    test("create({file : string}) - existing", function() {
      file.text = "ABC.";
      file.text.must.be.eq("ABC.");
      create([{file: file.path}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.size.must.be.eq(0);
    });

    test("create({file : {path, content : string}}) - not existing", function() {
      create([{file: {path: file.path, content: "ABC."}}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.text.must.be.eq("ABC.");
    });

    test("create({file : {path, content : object}}) - not existing", function() {
      create([{file: {path: file.path, content: {x: 1, y: 2}}}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.json.must.be.eq({x: 1, y: 2});
    });

    test("create({file : {path, content : string}}) - existing", function() {
      file.text = "previous";
      create([{file: {path: file.path, content: "ABC."}}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.text.must.be.eq("ABC.");
    });

    test("create({file : {path, content : object}}) - existing", function() {
      file.text = "previous";
      create([{file: {path: file.path, content: {x: 1, y: 2}}}]).must.be.eq(1);
      file.exists().must.be.eq(true);
      file.json.must.be.eq({x: 1, y: 2});
    });

    test("create({file : {path, content : string, overwrite: false}}) - existing", function() {
      file.text = "previous";
      create([{file: {path: file.path, content: "ABC.", overwrite: false}}]).must.be.eq(0);
      file.exists().must.be.eq(true);
      file.text.must.be.eq("previous");
    });

    test("create({file : {path, content : object, overwrite: false}}) - existing", function() {
      file.text = "previous";
      create([{file: {path: file.path, content: {x: 1, y: 2}, overwrite: false}}]).must.be.eq(0);
      file.exists().must.be.eq(true);
      file.text.must.be.eq("previous");
    });
  });

  suite("create({files})", function() {
    test("create({files : string[]}) - not existing", function() {
      create([{files: [file1.path, file2.path]}]).must.be.eq(2);
      file1.exists().must.be.eq(true);
      file1.size.must.be.eq(0);
      file2.exists().must.be.eq(true);
      file2.size.must.be.eq(0);
    });

    test("create({files : string[]}) - existing", function() {
      file1.text = "ABC.";
      file2.text = "CBA.";
      create([{files: [file1.path, file2.path]}]).must.be.eq(2);
      file1.exists().must.be.eq(true);
      file1.size.must.be.eq(0);
      file2.exists().must.be.eq(true);
      file2.size.must.be.eq(0);
    });

    test("create({files : object[]}) - not existing", function() {
      create([{files: [{path: file1.path, content: "ABC."}, {path: file2.path, content: "CBA."}]}]).must.be.eq(2);
      file1.exists().must.be.eq(true);
      file1.text.must.be.eq("ABC.");
      file2.exists().must.be.eq(true);
      file2.text.must.be.eq("CBA.");
    });

    test("create({files : object[]}) - existing", function() {
      file1.text = "previous";
      file2.text = "previous";
      create([{files: [{path: file1.path, content: "ABC."}, {path: file2.path, content: "CBA."}]}]).must.be.eq(2);
      file1.exists().must.be.eq(true);
      file1.text.must.be.eq("ABC.");
      file2.exists().must.be.eq(true);
      file2.text.must.be.eq("CBA.");
    });
  });

  suite("create({dir})", function() {
    test("create({dir: string}) - not existing", function() {
      create([{dir: dir.path}]).must.be.eq(1);
      dir.exists().must.be.eq(true);
    });

    test("create({dir: string}) - existing", function() {
      dir.create();
      create([{dir: dir.path}]).must.be.eq(0);
      dir.exists().must.be.eq(true);
    });
  });

  suite("create({dirs})", function() {
    test("create({dirs: string[]}) - not existing", function() {
      create([{dirs: [dir1.path, dir2.path]}]).must.be.eq(2);
      dir1.exists().must.be.eq(true);
      dir2.exists().must.be.eq(true);
    });

    test("create({dirs: string[]}) - existing", function() {
      dir1.create();
      dir2.create();
      create([{dirs: [dir1.path, dir2.path]}]).must.be.eq(0);
      dir1.exists().must.be.eq(true);
      dir2.exists().must.be.eq(true);
    });
  });
})();
