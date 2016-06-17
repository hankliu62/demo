var promise = new Promise(function (resolve) {
    resolve(100);
});

var thenPromise = promise.then(function (value) {
    console.log(value);
});

var catchPromise = thenPromise.catch(function (error) {
    console.error(error);
});

console.log(promise === thenPromise);
console.log(thenPromise === catchPromise);