//imports
const catalog = require("justo").catalog;
const babel = require("justo-plugin-babel");
const jslinter = require("justo-plugin-eslint");
const publish = require("justo-plugin-npm").publish;
const cli = require("justo-plugin-cli");

//works
const jslint = catalog.simple({
  name: "jslint",
  desc: "Parse best practices and grammar (JavaScript).",
  task: jslinter,
  params: {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  }
});

catalog.workflow({name: "build", desc: "Build the package."}, function() {
  jslint("Best practices and grammar (JavaScript)");

  cli("Clean build directory", {
    cmd: "bash",
    args: ["-c", "rm -rf ./build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/"}
    ]
  });

  cli("Clean dist directory", {
    cmd: "bash",
    args: ["-c", "-rf ./dist/es5/"]
  });

  cli("Create package", {
    cmd: "bash",
    args: ["-c", "mkdir -p dist/es5/nodejs/justo-plugin-fs; cp -rf package.json README.md build/es5/index.js build/es5/lib/ dist/es5/nodejs/justo-plugin-fs/"]
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

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
