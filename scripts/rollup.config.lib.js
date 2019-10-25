const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const tsImportPluginFactory = require('ts-import-plugin');
const postcss = require('rollup-plugin-postcss');
const generateModuleMap = require('./helpers').generateModuleMap;
const searchStyleImportDeep = require('./helpers').searchStyleImportDeep;
const defaultExternalArr = require('./constants').defaultExternalArr;
const extraExternalArr = require('./constants').extraExternalArr;
const image = require('rollup-plugin-img');
const path = require('path');
// import commonjs from 'rollup-plugin-commonjs';
// import typescript from 'rollup-plugin-typescript2';
// import resolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// import tsImportPluginFactory from "ts-import-plugin";
// import postcss from 'rollup-plugin-postcss';
// import { generateModuleMap, searchStyleImportDeep } from './helpers';
// import { defaultExternalArr, extraExternalArr } from './constants';


const tsImportPlugin = tsImportPluginFactory({
  libraryDirectory: "es",
  libraryName: "antd",
  style: true,
});

// 找出每一个组件引用过的ant样式
let externalStyle = [];
searchStyleImportDeep(path.resolve('src/components'), externalStyle);
externalStyle = Array.from(new Set(externalStyle));

export default {
  input: generateModuleMap(),
  external: defaultExternalArr.concat(extraExternalArr).concat(externalStyle),
  output: {
    dir: 'lib',
    entryFileNames: '[name]/index.js',
    chunkFileNames: 'common/[name].js',
    experimentalOptimizeChunks: true,
    chunkGroupingSize: 50000,
    format: 'es',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    typescript({
      typescript: require("typescript"),
      tsconfig: "tsconfig.build.json",
      transformers: () => ({
        before: [tsImportPlugin]
      }),
    }),
    postcss({
      extract: 'lib/trash/style.css',
      use : [
        ['less', { javascriptEnabled: true }]
      ],
      plugins: []
    }),
    image({
      output: `lib/images`,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192,
      exclude: 'node_modules/**'
    }),
  ],
}