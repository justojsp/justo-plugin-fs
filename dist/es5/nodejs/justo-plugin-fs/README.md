[![Build Status](https://travis-ci.org/justojsp/justo-plugin-fs.svg)](https://travis-ci.org/justojsp/justo-plugin-fs)

Simple tasks to run file system commands:

- Copy files and directories.
- Clean files and directories.
- Create files and directories.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-fs
```

## Use

```
const fs = require("justo-plugin-fs");
```

## create task

The `create` task creates files and/or directories:

```
create(opts, config : object) : number
create(opts, src : string) : number
create(opts, src : string[]) : number
```

Returns the number of entries created.

The `config` parameter can have the following properties:

- `src` (string or string[]). The entries to create. The directories must end with a `/` character.
- `file` (string or object) or `files` (string[] or object[]). The files to create.
- `dir` (string) `dirs` (string[]). The directories to create.

The `file` or `files` can have:

- `path` (string). The file path.
- `content` (string or object). The file content. If object, the task transforms it to JSON.
- `overwrite` (boolean). Overwrite if existing? `true`, yep; `false`, nope. Default: `false`.

Examples for creating files:

```
const create = require("justo-plugin-fs").create;

//empty file
create("Create file.txt", "file.txt")
create("Create file.txt", {src: "file.txt"});
create("Create file.txt", {file: "file.txt"});

//file with content
create("Create file.txt", {file: {path: "file.txt", content: "ABC."}});

//several empty files
create("Create a.txt and b.txt", "a.txt", "b.txt");
create("Create a.txt and b.txt", {src: ["a.txt", "b.txt"]});
create("Create a.txt and b.txt", {files: ["a.txt", "b.txt"]});
create("Create a.txt and b.txt", {files: [{path: "a.txt"}, {path: "b.txt"}]});

//several files with content
create("Create a.txt and b.txt", {files: [{path: "a.txt", content: "ABC."}, {path: "b.txt", content: "CBA."}]});
```

The `dir` and `dirs` are used for creating directories. Examples:

```
const create = require("justo-plugin-fs").create;

create("Create dir", "dir/");
create("Create dir", {src: "dir/"});
create("Create dir", {src: ["dir1/", "dir2/"]});
create("Create dir", {dir: "dir"});
create("Create dir", {dirs: ["dir"]});
create("Create dir1 and dir2", {dirs: ["dir1", "dir2"]});
```

The `src` option can be used for creating files and directories. In this case,
the directories must end with the `/` character. If we use the `dir` or `dirs` options,
it is not needed.

## clean task

The `clean` task removes files and directories. This must be called as follows:

```
clean(opts, config : object)
clean(opts, src : string[])
```

To delete files, use the `files` property as `string[]`. If some file doesn't exist,
`clean()` doesn't throw any error. If some file is a directory, the directory
isn't removed.

To delete directories, we must use the `dirs` property as `string[]`. If some directory
doesn't exist, `clean()` doesn't throw any error. If some directory is a file,
the file isn't removed.

When we don't want to indicate the entry type, we can use the `src` property (`string[]`).

Example:

```
const clean = require("justo-plugin-fs").clean;

clean("Example", {
  files: [
    "a.txt",
    "b.txt"
  ],
  dirs: [
    "dir1",
    "dir2"
  ]
});

clean("Example", {
  src: [
    "a.txt",
    "b.txt",
    "dir1",
    "dir2"
  ]
});

clean("Example", [
  "a.txt",
  "b.txt",
  "dir1",
  "dir2"
])
```

## remove task

The `remove` task is an alias of `clean`.

## copy task

The `copy` task must be called as follows:

```
copy(opts, src, dst)
copy(opts, {src, dst})
copy(opts, {src, dst}, {src, dst}, {src, dst}...)
copy(opts, [{src, dst}, {src, dst}, {src, dst}...])
```

When we use the parameters `src` and `dst`, the first one indicates the entry
to copy to the second one. If `dst` ends with `/`, the source will be copied
to the directory with the same name as the source has. Example:

```
copy("title...", "entry", "dir/");      //copy entry to dir/entry
copy("title...", "entry", "entry.old"); //copy entry to entry.old
```

When we use an object, the properties can be:

- `src` (String[]). The source entries to copy to destination.
- `dst` (String) or `dest` (String). The destination.
- `ignore` (string or string[]). To exclude entries.

Example:

```
const copy = require("justo-plugin-fs").copy;

//copy one.txt to dir/one.txt
//copy two.txt to dir/two.txt
copy("title...", {
  src: ["one.txt", "two.txt"],
  dst: "dir"
});

//copy dir1/one.txt to dst/one.txt
//copy dir2/two.txt to dst/two.txt
copy("title...", {
  src: ["dir1/one.txt", "dir2/two.txt"],
  dst: "dst"
});

//copy src/one.txt to dst1/one.txt
//copy src/two.txt to dst2/two.txt
copy(
  "title...",
  {src: "src/one.txt", dst: "dst1"},
  {src: "src/two.txt", dst: "dst2"}
);

//copy src/one.txt to dst1/one.txt
//copy src/two.txt to dst2/two.txt
copy("title...", [
  {src: "src/one.txt", dst: "dst1"},
  {src: "src/two.txt", dst: "dst2"}
]);
```
