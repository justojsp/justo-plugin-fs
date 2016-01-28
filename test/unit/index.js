//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;

//suite
suite("#fs", function() {
  test("fs.clean", function() {
    const clean = require("../../dist/es5/nodejs/justo-plugin-fs").clean;

    clean.must.be.instanceOf(Function);
    clean.toString().must.contain("runSimpleTask");
  });

  test("fs.remove", function() {
    const remove = require("../../dist/es5/nodejs/justo-plugin-fs").remove;

    remove.must.be.instanceOf(Function);
    remove.toString().must.contain("runSimpleTask");
  });

  test("fs.copy", function() {
    const copy = require("../../dist/es5/nodejs/justo-plugin-fs").copy;

    copy.must.be.instanceOf(Function);
    copy.toString().must.contain("runSimpleTask");
  });

  test("fs.create", function() {
    const create = require("../../dist/es5/nodejs/justo-plugin-fs").create;

    create.must.be.instanceOf(Function);
    create.toString().must.contain("runSimpleTask");
  });
})();
