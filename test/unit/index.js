//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/justo-plugin-fs");

//suite
suite("#fs", function() {
  test("fs.chmod", function() {
    pkg.chmod.must.be.instanceOf(Function);
  });

  test("fs.chown", function() {
    pkg.chown.must.be.instanceOf(Function);
  });

  test("fs.clean", function() {
    pkg.clean.must.be.instanceOf(Function);
  });

  test("fs.copy", function() {
    pkg.copy.must.be.instanceOf(Function);
  });

  test("fs.create", function() {
    pkg.create.must.be.instanceOf(Function);
  });

  test("fs.remove", function() {
    pkg.remove.must.be.instanceOf(Function);
  });
  
  test("exists", function() {
    pkg["exists"].must.be.instanceOf(Function);
  });
})();
