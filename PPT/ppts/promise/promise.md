title: Promise
speaker: Hank Liu
url: https://github.com/frontnode
transition: slide
theme: light

[slide]

# Promise
## 异步处理对象操作的组件
<small>演讲者：[@Hank Liu](https://github.com/biluo62)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## Promise定义
----

* Promise是抽象异步处理对象以及对其进行各种操作的组件 {:&.rollIn}

* 使用Promise就是将javascript中异步的方式变换成同步来操作。Promise则是把类似的异步处理对象和处理规则进行规范化， 并按照采用统一的接口来编写，规定方法之外的写法都会报错。

[slide]

## 回顾
----

* 思考: 在Promise出现之前，我们是如何进行异步处理的？ {:&.rollIn}

* 回调函数。


[slide]

## 回调函数异步处理
----

``` js
getAsync("fileA.txt", function(error, result){
    if(error){// 取得失败时的处理
        throw error;
    }
    // 取得成功时的处理
});
```

[slide]

## 回调函数异步处理
----
* 注意: 传给回调函数的参数为(error对象， 执行结果)组合。 {:&.rollIn}
* Node.js等则规定在JavaScript的回调函数的第一个参数为 Error 对象，这也是它的一个惯例。
* 像上面这样基于回调函数的异步处理如果统一参数使用规则的话，写法也会很明了。这也仅是编码规约而已，即使采用不同的写法也不会出错。
* Promise则是把类似的异步处理对象和处理规则进行规范化，并按照采用统一的接口来编写，而采取规定方法之外的写法都会出错。

[slide]

## Promise例子
----

``` js

var promise = getAsyncPromise("fileA.txt");
promise.then(function(result){
    // 获取文件内容成功时的处理
}).catch(function(error){
    // 获取文件内容失败时的处理
});

```

[slide]
## Promise简介
----

* Constructor
* Instance Method
* Static Method

[slide]
## Constructor
----

* Promise类似于 XMLHttpRequest，从构造函数 Promise 来创建一个新建新promise对象作为接口。 {:&.rollIn}
* 要想创建一个promise对象、可以使用new来调用Promise的构造器来进行实例化。

[slide]
## Instance Method
----

* promise.then(onFulfilled, onRejected) {:&.rollIn}
* promise.catch(onRejected)

[slide]
## promise.then
----

* 对通过new生成的promise对象为了设置其值在 resolve(成功) / reject(失败)时调用的回调函数 可以使用promise.then() 实例方法。 {:&.rollIn}
* onFulfilled函数会在promise对象的revolve状态调用，onRejected为在promise对象reject状态下调用
* onFulfilled、onRejected 两个都为可选参数。
* promise.then 成功和失败时都可以使用。 另外在只想对异常进行处理时可以采用 promise.then(undefined, onRejected) 这种方式，只指定reject时的回调函数即可。

[slide]
## promise.catch
----

* promise.catch(onRejected)。 {:&.rollIn}
* 只对异常进行处理时, catch用来代替promise.then(undefined, onRejected)抛出错误。

[slide]
## Static Method
----

* Promise.all() {:&.rollIn}
* Promise.resolve()
* Promise.reject()
* Promise.race()

[slide]
## Promise workflow
----

``` js
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
```

[slide]
## Promise的状态
----

用new Promise 实例化的promise对象有以下三个状态

* "has-resolution" - Fulfilled // resolve(成功)时。此时会调用 onFulfilled {:&.rollIn}
* "has-rejection" - Rejected // reject(失败)时。此时会调用 onRejected
* "unresolved" - Pending // 既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态等
* 注: Pending可以转换成Fulfilled或者Rejected状态, 从Pending转换为Fulfilled或Rejected之后， 这个promise对象的状态就不会再发生任何变化

[slide]
### 创建XHR的promise对象
----

``` js
function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);//传入resolve中的参数会在状态改变的时候，传到then中
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

// 运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
console.log(value);
}).catch(function onRejected(error){
console.error(error);
});

```

[slide]
## Promise.resolve
----

* new Promise的快捷方式 {:&.rollIn}
* 将thenable对象转换为promise对象

[slide]
## new Promise的快捷方式
----

``` js
Promise.resolve(42).then(function(value){
    console.log(value);
});

// 等价于

new Promise(function(resolve) {
  resolve(42);
}).then(function onFulfilled(value){
  console.log(value);
})

```

* 注: Promise.resolve作为 new Promise() 的快捷方式，在进行promise对象的初始化或者编写测试代码的时候都非常方便。

[slide]

## 将thenable对象转换为promise对象
----

* ES6 Promises里提到了Thenable这个概念，简单来说它就是一个非常类似promise的东西。 {:&.rollIn}
* 我们有时称具有 .length 方法的非数组对象为Array like一样，thenable指的是一个具有 .then 方法的对象。
* 将thenable对象转换为promise对象的机制要求thenable对象所拥有的 then 方法应该和Promise所拥有的 then 方法具有同样的功能和处理过程，在将thenable对象转换为promise对象的时候，还会巧妙的利用thenable对象原来具有的 then 方法。

[slide]
## 将thenable对象转换为promise对象
----

``` js

var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});

```

[slide]
## Promise.reject
----

* Promise.reject(error)是和 Promise.resolve(value) 类似的静态方法，是 new Promise() 方法的快捷方式。 {:&.rollIn}
* 它和Promise.resolve(value) 的不同之处在于promise内调用的函数是reject而不是resolve，这在编写测试代码或者进行debug时，说不定会用得上。


[slide]
## Promise.reject
----

``` js
var promise = new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});

promise.catch(function(error) {
  console.error(error);
})

Promise.reject(new Error("出错了")).catch(function(error) {
  console.error(error);
});
```

[slide]
## Promise.all
----

* Promise.all 接收一个 promise对象的数组作为参数。 {:&.rollIn}
* 当这个数组里的所有promise对象全部变为resolve或reject状态的时候，它才会去调用 .then 方法。


[slide]
## Promise.race
----

* 和 Promise.all 类似, Promise.race 接收一个 promise对象的数组作为参数, 对多个promise对象进行处理。 {:&.rollIn}
* Promise.all 在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理， 与之相对的是 Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

[slide]
## 每次调用then都会返回一个新创建的promise对象
----

* promise.then(...).catch(...) {:&.rollIn}
* 是不是对最初的promise进行方法链式调用呢？
* 不是的, 不管是 then 还是 catch 方法调用，都返回了一个新的promise对象。
* 采用了方法链的方式将多个 then 方法调用串连在了一起后，各函数也会严格按照 resolve → then → then → then 的顺序执行，并且传给每个 then 方法的 value 的值都是前一个promise对象通过 return 返回的值。


[slide]
## promise.then()方法的坑
----

``` js
// 反模式
function badAsyncCall() {
    var promise = Promise.resolve();
    promise.then(function() {
        // 任意处理
        return newVar;
    });
    return promise;
}

function anAsyncCall() {
    var promise = Promise.resolve();
    return promise.then(function() {
        // 任意处理
        return newVar;
    });
}

```

[slide]
## then or catch?
----

* promise.catch 也可以理解为 promise.then(undefined, onRejected) {:&.rollIn}
* 思考: promise.then 里同时指定处理对错误进行处理的函数相比，和使用 catch 又有什么异同?
* promise.then中的onRejected不能进行错误处理。

[slide]
## then or catch总结
----

* 使用promise.then(onFulfilled, onRejected) 的话, 在 onFulfilled 中发生异常的话，在 onRejected 中是捕获不到这个异常的。 {:&.rollIn}
* 在 promise.then(onFulfilled).catch(onRejected) 的情况下, then 中产生的异常能在 .catch 中捕获
* .then 和 .catch 在本质上是没有区别的, 需要分场合使用。


[slide]

## 好书推荐
《代码整洁之道》




