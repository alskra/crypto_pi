'use strict';

const fs = require('fs');
const path = require('path');

export default function readdirsyncRecursive(dirPath) {
  let result = [];
  fs.readdirSync(dirPath).forEach((item) => {
    const itemPath = path.resolve(dirPath, item);
    result.push(itemPath);
    if (fs.statSync(itemPath).isDirectory()) {
      result = result.concat(readdirsyncRecursive(itemPath));
    }
  });
  return result;
}

//console.log(readdirsyncRecursive('src/json'));