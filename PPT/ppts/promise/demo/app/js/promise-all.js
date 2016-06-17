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

function getURLNoReturn(URL) {
    return new Promise(function (resolve, reject) {

    });
}

var requests = {
    comment: function getComment() {
        return getURL('http://localhost:8083/app/json/comment.json').then(JSON.parse);
    },
    people: function getPeople() {
        // return getURLNoReturn('http://localhost:8083/app/json/people.json');
        return getURL('http://localhost:8083/app/json/people.json').then(JSON.parse);
    }
};

function main() {
    return Promise.all([requests.comment(), requests.people()]);
}

// 运行示例
main().then(function (values) {
    console.log('------------------------');
    console.log(values[0]);
    console.log('------------------------');
    console.log(values[1]);
    console.log('------------------------');
}).catch(function(error){
    console.log(error);
});