const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

function isObject (value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object';
}

function isArray (value) {
  return Array.isArray(value);
}

function merge (origin, target) {
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      const originValue = origin[key];
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        if (isArray(originValue) && isArray(target[key])) {
          target[key] = [...target[key], ...originValue];
        } else if (isObject(originValue) && isObject(target[key])) {
          merge(originValue, target[key]);
        }
      } else {
        target[key] = originValue;
      }
    }
  }
}

function createConfigFiles () {
  const ConfigMapFiles = require('./config').ConfigMapFiles;
  for (const filename in ConfigMapFiles) {
    const filePath = path.join(__dirname, 'temp', filename);
    const targetFilePath = path.resolve(ConfigMapFiles[filename]);
    fs.stat(filePath, function (err, stats) {
      if (err) {
        throw err;
      }

      if (stats.isFile()) {
        const content = fs.readFileSync(filePath);
        fs.writeFileSync(targetFilePath, content);
      };
    });
  }
}

function mergePackageFile () {
  const targetPackagePath = path.resolve('package.json');
  const originPackagePath = path.join(__dirname, 'temp', 'package');
  const originPackagePathState = fs.statSync(originPackagePath);
  const targetPackagePathState = fs.statSync(targetPackagePath);
  if (originPackagePathState.isFile() && targetPackagePathState.isFile()) {
    const targetContent = fs.readFileSync(targetPackagePath).toString();
    const targetPackageContent = JSON.parse(targetContent);
    const originContent = fs.readFileSync(originPackagePath).toString();
    const originPackageContent = JSON.parse(originContent);
    merge(originPackageContent, targetPackageContent);
    jsonfile.writeFile(targetPackagePath, targetPackageContent, { spaces: 2 }).catch(function (err) {
      err && console.error(err);
    });
  };
}

module.exports.genConfig = function () {
  createConfigFiles();
  mergePackageFile();
}