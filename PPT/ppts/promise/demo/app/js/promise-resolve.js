var Promise = require('promise');

Promise.resolve(42).then(function(value){
  console.log(value);
});

// new Promise(function(resolve){
//   resolve(42);
// }).then(function(value) {
//   console.log(value);
// })

