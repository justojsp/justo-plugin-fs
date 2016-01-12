//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;

//suite
suite("#fs", function() {

  test("fs.clean", function() {
    const clean = require("../../../dist/es5/nodejs/justo-plugin-fs").clean;

    clean.must.be.instanceOf(Function);
    clean.toString().must.contain("runSimpleTask");
  });

  test("fs.copy", function() {
    const copy = require("../../../dist/es5/nodejs/justo-plugin-fs").copy;

    copy.must.be.instanceOf(Function);
    copy.toString().must.contain("runSimpleTask");
  });
})();
