const fs = require("fs");
const path = require('path');
const searchExclude = require('./constants').searchExclude;

// 生成rollup打包时所使用的入口js文件
function generateEntry(entryName, dir) {
  const modules = [];
  fs.readdirSync(dir).forEach(function(filename){
    const path = dir + "/" + filename;
    const stat = fs.statSync(path);
    if (stat && stat.isDirectory()) {
      modules.push(filename);
    }
  })
  console.log('所有gio组件的名字:', modules);
  const importArr = [];
  const exportArr = [];
  
  modules.map((name) => {
    const capName = name.replace(/^\S|-\w/g, (s, index) => {
      if (index > 0) {
        return s[1].toUpperCase();
      } else {
        return s.toUpperCase();
      }
    });
    importArr.push(`import ${capName} from './components/${name}';`);
    exportArr.push(`  ${capName},`);
  });
  
  exportArr.unshift('export {');
  exportArr.unshift('');
  exportArr.push('};');
  
  const string = importArr.concat(exportArr).join('\n');
  
  const fd = fs.openSync(`./src/${entryName}.js`, 'w');
  fs.writeSync(fd, string, 0)
}

// 获取所有引用ant样式的地址
// function getAllAntStyleAddress() {
//   let allImports = [];
//   searchStyleImportDeep(path.resolve('./src/components'), allImports);
//   return Array.from(new Set(allImports));
// }

// 在文件的每一行中搜寻import antd样式的代码
function checkAntImport(lines) {
  const matchResults = [];
  for (let i = 0; i <= lines.length-1; i ++) {
    const line = lines[i].trim();
    // 被注释的代码行直接忽略掉
    if (/^\/\/|^\/\*|^\*/.test(line)) {
      continue;
    }
    const r = checkSingleLine(lines[i]);
    if (r) {
      matchResults.push(r);
    }
  }
  return matchResults;
}
// 在某一行代码中寻找是否引用了ant/lib/xxxx/style目录下的index.css, index.less或css.js这样的样式文件
function checkSingleLine(line) {
  const r = line.match(/^@*import(\s)+('|")(antd\/lib\/((\w|-)+)\/style\/(index\.(css|less)|css\.js))/);
  if (r && r[3]) {
    return r[3]
  } else {
    return null;
  }
}

// 生成用于设置外部引用文件的数组
// export function generateExternalArray(defaultArr) {
//   return getAllAntStyleAddress().concat(defaultArr);
// }

// 
function generateModuleMap() {
  const componentDir = 'src/components';
  const cModuleNames = fs.readdirSync(path.resolve(componentDir)).filter((name) => !searchExclude.includes(name));
  const cModuleMap = cModuleNames.reduce((prev, name) => {
    prev[name] = `${componentDir}/${name}/index.tsx`;
    return prev;
  }, {});
  return cModuleMap;
}

function getAllGioComponentNames() {
  const componentDir = 'src/components';
  const names = fs.readdirSync(path.resolve(componentDir));
  return names.filter((name) => {
    return !/^\./.test(name);
  });
}

function searchStyleImportDeep(address, antStyleImportArr) {
  const filenames = fs.readdirSync(path.resolve(address));
  filenames.map((name) => {
    if (!searchExclude.includes(name)) {
      const stat = fs.statSync(path.resolve(address) + '/' + name);
      if (stat && stat.isDirectory()) {
        // 文件夹
        searchStyleImportDeep(path.resolve(address) + '/' + name, antStyleImportArr);
      } else {
        // 文件
        try {
          const lines = fs.readFileSync(path.resolve(address) + '/' + name).toString().split("\n");
          // antStyleImportArr是一个文件中所有的ant样式引用
          const arr = checkAntImport(lines);
          if (arr.length > 0) {
            arr.map((item) => {
              antStyleImportArr.push(item);
            });
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  });
}

module.exports = {
  generateEntry,
  checkAntImport,
  checkSingleLine,
  generateModuleMap,
  getAllGioComponentNames,
  searchStyleImportDeep
};
