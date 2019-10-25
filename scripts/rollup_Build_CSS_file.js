const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const getAllGioComponentNames = require('./helpers').getAllGioComponentNames;
const searchStyleImportDeep = require('./helpers').searchStyleImportDeep;
const defaultExternalArr = require('./constants').defaultExternalArr;
const extraExternalArr = require('./constants').extraExternalArr;
const tsImportPluginFactory = require('ts-import-plugin');
const postcss = require('rollup-plugin-postcss');
const image = require('rollup-plugin-img');
const path = require('path');
const rollup = require('rollup');
// import { getAllGioComponentNames, searchStyleImportDeep } from './helpers.js';
// import commonjs from 'rollup-plugin-commonjs';
// import typescript from 'rollup-plugin-typescript2';
// import resolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// import postcss from 'rollup-plugin-postcss';
// import tsImportPluginFactory from "ts-import-plugin";
// import { defaultExternalArr, extraExternalArr } from './constants.js';
// import image from 'rollup-plugin-img';


const tsImportPlugin = tsImportPluginFactory({
  libraryDirectory: "es",
  libraryName: "antd",
  style: true,
});

function generateInputConfig(name) {

  // 找出每一个组件引用过的ant样式
  let externalStyle = [];
  searchStyleImportDeep(path.resolve(`src/components/${name}`), externalStyle);
  externalStyle = Array.from(new Set(externalStyle));

  return {
    input: { [name]: `src/components/${name}/index.tsx` },
    external: defaultExternalArr.concat(extraExternalArr).concat(externalStyle),
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
        extract: `lib/${name}/style.css`,
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
    ]
  };
}

function generateOutputConfig(name) {
  return outputOptions = {
    format: 'es',
    dir: 'lib',
    entryFileNames: `trash/${name}/index.js`,
  };
}

async function buildSingle(name) {
  console.log('building CSS file for:', name)
  const inputOptions = generateInputConfig(name);
  const outputOptions = generateOutputConfig(name);
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

async function buildAll() {
  const names = getAllGioComponentNames();
  for (let i = 0; i <= names.length-1; i++) {
    await buildSingle(names[i])
  }
}

buildAll().then(() => {
  console.log('build completed')
}, () => {
  console.log('build failed')
})
