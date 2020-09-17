const copy = require("recursive-copy");
const path = require("path");

copy(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../dist'), {
  overwrite:true,
  filter: [
    '**/*',
    '!.tsx',
    '!.ts'
  ]
})
