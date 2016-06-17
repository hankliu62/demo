var Promise = require('promise');

var promise = new Promise(function(resolve, reject){
  resolve('hello everyone');
});

promise.then(function (value) {
  console.log(value);
}).catch(function (error) {
  console.log(error);
});