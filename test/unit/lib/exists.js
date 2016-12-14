//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const op = require("../../../dist/es5/nodejs/justo-plugin-fs/lib/exists").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data/exists";

  test("op(config) - existing", function() {
    op([{
      src: path.join(DATA, "file.txt")
    }]).must.be.eq(true);
  });

  test("op(config) - not existing", function() {
    op([{
      src: path.join(DATA, "unknown.txt")
    }]).must.be.eq(false);
  });
})();
