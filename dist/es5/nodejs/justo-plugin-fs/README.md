[![Build Status](https://travis-ci.org/justojsp/justo-plugin-fs.svg)](https://travis-ci.org/justojsp/justo-plugin-fs)

Simple tasks to run file system commands:

- Copy files and directories.
- Clean files and directories.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-fs
```

## Use

```
const fs = require("justo-plugin-fs");
```

## clean task

The `fs` defines the `clean` task to remove files and directories. This must be called as follows:

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
