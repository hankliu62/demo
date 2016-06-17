var Promise = require('promise');

var promise = new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});

promise.catch(function(error) {
  console.error(error);
});

Promise.reject(new Error("出错了")).catch(function(error) {
  console.error(error);
});