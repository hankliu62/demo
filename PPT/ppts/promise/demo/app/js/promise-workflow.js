var Promise = require('promise');

function asyncFunction() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('Async Hello world');
    }, 16);
  });
}

asyncFunction().then(function (value) {
  console.log(value);
}).catch(function (error) {
  console.log(error);
});