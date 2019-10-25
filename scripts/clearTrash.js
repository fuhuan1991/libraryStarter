var fs = require('fs');
const path = require('path');

function deleteDir(url) {
  var files = [];
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url);
    files.forEach(function (file) {
      var curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url);
  } else {
    console.log("给定的路径不存在！");
  }
}
deleteDir(path.resolve('./lib/trash'));
