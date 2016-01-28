//imports
const catalog = require("justo").catalog;
const simple = require("justo").simple;
const fs = require("justo-fs");
const babel = require("justo-plugin-babel");
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;

//works
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  simple("Clean build directory", function() {
    var clean;

    if (fs.exists("./dist/es5/nodejs/justo-plugin-fs")) clean = require("./dist/es5/nodejs/justo-plugin-fs/lib/clean");
    else clean = require("./build/es5/lib/clean");

    clean({dirs: ["build/es5"]});
  })();

  jshint("Best practices", {
    output: true,
    src: "lib/"
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    files: {
      "build/es5/index.js": "index.js",
      "build/es5/lib/clean.js": "lib/clean.js",
      "build/es5/lib/copy.js": "lib/copy.js",
      "build/es5/lib/create.js": "lib/create.js"
    }
  });

  simple("Clean dist directory", function() {
    var clean;

    if (fs.exists("./dist/es5/nodejs/justo-plugin-fs")) clean = require("./dist/es5/nodejs/justo-plugin-fs/lib/clean");
    else clean = require("./build/es5/lib/clean");

    clean({dirs: ["dist/es5"]});
  })();

  simple("Create package", function() {
    var copy;

    if (fs.exists("./dist/es5/nodejs/justo-plugin-fs")) copy = require("./dist/es5/nodejs/justo-plugin-fs/lib/copy");
    else copy = require("./build/es5/lib/copy");

    copy([
      {
        src: "build/es5/index.js",
        dst: "dist/es5/nodejs/justo-plugin-fs/"
      },
      {
        src: "build/es5/lib/",
        dst: "dist/es5/nodejs/justo-plugin-fs/lib"
      },
      {
        src: ["package.json", "README.md"],
        dst: "dist/es5/nodejs/justo-plugin-fs"
      }
    ]);
  })();
});

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish"}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-fs"
  });
});

catalog.macro("default", ["build", "test"]);
