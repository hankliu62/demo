var promise = Promise.resolve($.ajax('./../json/comment.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});