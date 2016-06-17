var winnerPromise = new Promise(function (resolve) {
        setTimeout(function () {
            console.log('this is winner1');
            resolve('this is winner2');
        }, 4);
    });
var loserPromise = new Promise(function (resolve) {
        setTimeout(function () {
            console.log('this is loser1');
            resolve('this is loser2');
        }, 1000);
    });
// 第一个promise变为resolve后程序停止
Promise.race([winnerPromise, loserPromise]).then(function (value) {
    console.log(value);
});