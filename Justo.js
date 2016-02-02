//imports
const catalog = require("justo").catalog;
const simple = require("justo").simple;
const fs = require("justo-fs");
const babel = require("justo-plugin-babel");
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;
const cli = require("justo-plugin-cli");

//works
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  cli("Clean build directory", {
    cmd: "PowerShell",
    args: ["rm -Force -Recurse ./build/es5"]
  });

  jshint("Best practices", {
    output: true,
    src: "lib/"
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib/"}
    ]
  });

  cli("Clean dist directory", {
    cmd: "PowerShell",
    args: ["rm -Force -Recurse ./dist/es5/"]
  });

  cli("Create package", {
    cmd: "PowerShell",
    args: ["mkdir dist/es5/nodejs/justo-plugin-fs; cp -Recurse -Force package.json,README.md,build/es5/index.js,build/es5/lib/ dist/es5/nodejs/justo-plugin-fs/"]
  });
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
