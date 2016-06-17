var Promise = require('promise');
var request = require('request');

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        request(URL, function (error, response, body) {
            if (!error) {
                if (response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(response.statusMessage);
                }
            } else {
                reject(error);
            }
        });
    });
}
// 运行示例
var URL = "http://localhost:8083/app/json/comment.json";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});