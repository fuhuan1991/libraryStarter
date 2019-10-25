const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const tsImportPluginFactory = require('ts-import-plugin');
const postcss = require('rollup-plugin-postcss');
const generateEntry = require('./helpers').generateEntry;
const searchStyleImportDeep = require('./helpers').searchStyleImportDeep;
const defaultExternalArr = require('./constants').defaultExternalArr;
const extraExternalArr = require('./constants').extraExternalArr;
const image = require('rollup-plugin-img');
const path = require('path');
const terser = require('rollup-plugin-terser').terser;

// import commonjs from 'rollup-plugin-commonjs';
// import typescript from 'rollup-plugin-typescript2';
// import resolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// import tsImportPluginFactory from "ts-import-plugin";
// import postcss from 'rollup-plugin-postcss';
// import { generateEntry, searchStyleImportDeep } from './helpers'
// import { defaultExternalArr, extraExternalArr } from './constants';
// import image from 'rollup-plugin-img';

const tsImportPlugin = tsImportPluginFactory({
  libraryDirectory: "es",
  libraryName: "antd",
  style: true,
});

// 默认的入口文件名称
const defaultEntryName = 'rollupEntry';

// 根据components中的组件名称，自动生成rolloup所需的入口文件
generateEntry(defaultEntryName, path.resolve('src/components'));
// 生成外部引用文件
let externalStyle = [];
searchStyleImportDeep(path.resolve('src/components'), externalStyle);
externalStyle = Array.from(new Set(externalStyle)).concat(extraExternalArr);
console.log('外部依赖组件:', defaultExternalArr);
console.log('需要从外部引入的antd样式:', externalStyle);

export default {
  input: `src/${defaultEntryName}.js`,
  external: defaultExternalArr.concat(externalStyle),
  output: [
    {
      file: 'build/gioDesign.cjs.js',
      format: 'cjs',
    },
    {
      file: 'build/gioDesign.es.js',
      format: 'es',
    },
  ],
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
      extract: true,
      use : [
        ['less', { javascriptEnabled: true }]
      ],
      plugins: []
    }),
    image({
      output: `build/images`,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192,
      exclude: 'node_modules/**'
    }),
    terser()
  ],
}