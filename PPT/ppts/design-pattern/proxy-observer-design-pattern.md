title: Proxy AND Observer
speaker: Hank Liu
url: https://github.com/frontnode
transition: slide
theme: light

[slide]

# Proxy AND Observer
## Frontend Components
<small>演讲者：[@Hank Liu](https://github.com/biluo62)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## 设计模式(Design pattern)
----
* 是一套被反复使用，思想成熟，经过分类和无数实战设计经验的总结。使用设计模式是为了让系统代码可重用，可扩展，可解耦，更容易被人理解且能保证代码可靠性。设计模式使代码开发真正工程化；设计模式是软件工程的基石脉络，如同大厦的结构一样。只有夯实地基搭好结构，才能盖出坚壮的大楼。也是我们迈向高级开发人员必经的一步。 {:&.rollIn}

[slide]

## JavaScript中的设计模式
----
* 编程语言之间是相通的； {:&.rollIn}
* 很多本该有的东西JavaScript都有，但是并没有作为正式的部分。这些年人们利用自己对计算机编程的思想，利用了很多晦涩的技巧实现了很多JavaScript设计者都未曾预计到的任务，比如各种设计模式的实现，比如面向对象的编程。

[slide]

## 设计原则
----
设计模式的根本原因是为了代码复用，增加可维护性。有如下原则：

* 【单一职责原则】： 就一个类而言, 应该仅有一个引起它变化的原因. 增加功能不应该修改已有的代码, 避免修改出错及重复测试. 如果你能够想到多于一个的动机去改变一个类,那么这个类就是具有多于一个的职责, 应该考虑类的职责分离； {:&.rollIn}
* 【里氏代换原则】： 父类型可以被子类型替换,程序行为不发生变化. 这样父类才能真正的被复用, 而子类也能够在父类的基础上增加新的行为. 里氏替换原则通俗的来讲就是： 子类可以扩展父类的功能，但不能改变父类原有的功能；
* 【依赖倒转原则】： 面向接口编程, 引用一个对象，如果这个对象有底层类型，直接引用底层；

[slide]

## 设计原则
----
* 【接口隔离原则】： 客户端不应该依赖它不需要的接口；一个类对另一个类的依赖应该建立在最小的接口上； {:&.rollIn}
* 【迪米特原则】： 一个对象应该对其它对象有尽可能少的了解；
* 【合成复用原则】: 尽量首先使用合成/聚合的方式，而不是使用继承;
* 【开放-封闭原则】: 对扩展开放，对修改关闭;

[slide]

## 设计原则总结
----
* 单一职责原则告诉我们实现类要职责单一； {:&.rollIn}
* 里氏替换原则告诉我们不要破坏继承体系；
* 依赖倒置原则告诉我们要面向接口编程；
* 接口隔离原则告诉我们在设计接口的时候要精简单一；
* 迪米特法则告诉我们要降低耦合；
* 而开闭原则是总纲，他告诉我们要对扩展开放，对修改关闭。

[slide]
## 代理模式(Proxy)概念
----
* 代理: 顾名思义就是帮助别人做事; {:&.rollIn}
* 代理模式(Proxy)，为其它对象提供一种代理以控制对这个对象的访问。代理模式是的代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。

[slide]
----

![Sample](/assets/proxy.png) {:.flexbox.vcenter style="margin-top:-40px;"}
* 中介 {:&.rollIn}
* 经理把收集日报周报反馈给大老板；
* 卡扣通过中间的黄色东西连接在一起；

[slide]
## 三个角色基本概念
----
* 抽象角色：声明真实对象和代理对象的共同接口。 {:&.rollIn}
* 代理角色：代理对象角色内部含有对真实对象的引用，从而可以操作真实对象，同时代理对象提供与真实对象相同的接口以便在任何时刻都能代替真实对象。同时，代理对象可以在执行真实对象操作时，附加其他的操作，相当于对真实对象进行封装。
* 真实角色：代理角色所代表的真实对象，是我们最终要引用的对象。
* 代理模式的一个好处就是对外部提供统一的接口方法，而代理类在接口中实现对真实类的附加操作行为，从而可以在不影响外部调用情况下，进行系统扩展。也就是说，我要修改真实角色的操作的时候，尽量不要修改他，而是在外部在“包”一层进行附加行为，即代理类。

[slide]
## 模式作用及使用场景
----
1. 缓存代理（需要重复获取网页中大部分数据的时候）； {:&.rollIn}
2. 虚拟代理（根据需要创建开销很大的对象如渲染网页暂时用占位符替代真图）；
3. 安全代理（控制真实对象的访问权限）；
4. 智能指引（调用对象代理处理另外一些事情如垃圾回收机制）；

[slide]
### 缓存代理
----

* 缓存代理应该是应用最多的一个代理方式了，这种方式能够真正解决运算时间问题，网络不畅问题，离线问题

``` js
//计算乘积问题
function fb(num){
  if(num<=1){
    return 1;
  }
  return num*fb(--num);
}
//缓存代理出场了
var cProxy = (function(){
  var cache = {};
  return function(num){
    if(cache[num]){
      console.log(`this is cache ${cache[num]}`);
      return cache[num];
    }
    return cache[num] = fb(num);
  }
})();
//测试
console.log(cProxy(4));  //24
cProxy(4);  //"this is cache 24"
```

[slide]
### 缓存代理
----

* 比如需要重复获取网页中大部分数据的时候，就可以考虑使用缓存代理

``` js
// 向后台发请求，获取当前页面的数据
// http.getPage(page);
var pageProxy = (function(){
  var cache = {};
  return function(fn){   //fn作为处理页码数据的函数
    var pageData = cache[page];
    if(pageData){
        return fn(pageData);  //返回制定页码的数据
    }
    http.getPage(page)   //获取制定页码的数据
    .then((data)=>{
        cache[page] = data;  //存放数据
        fn(data);
    })
  }
})();
```

[slide]
### 虚拟代理
----
* 现实中, 如快递哥送快递? {:&.rollIn}
* 一个在线的编辑器，他是怎样同步你的内容呢? 内容一改变就发送一起请求同步吧?
* 这个想法显然不切实际。如果这样，我每天没事都会打开这个编辑器，把asfdsafdsafsad...在里面敲上几分钟。保证分分钟弄死他的服务器。所以一般，我们会使用虚拟代理来接受你的请求。

[slide]
### 虚拟代理
----

* 虚拟代理和函数节流的思想是一样的，将用户对性能的rape的伤害降低到最低。

``` js
var send = function(article) {
  return $.ajax({
    url: xxx,
    type: "POST",
    contentType: "text/plain",
    data: article
  })
}
var proxy = (function() {
  var content = document.querySelector('#article'), timer;
  return function() {
    var article = content.value;
    if (timer) { //不覆盖已经发送的请求
      return;
    }
    timer = setTimeout(function() {
      send(article).then(function() {  //执行完成再处理
        clearTimeout(timer);
        timer = null;
      });
    }, 2000);
  }
})();
setTimeout(function(){
  proxy();
}, 2000); //定时发送请求
```

[slide]
### 保护代理
----
* 保护代理就是起到保护作用，用来过滤掉一下不必要的请求，将真正需要的递给本体。

``` js
//譬如，验证用户名是否唯一
//这里我们应用，保护代理的思想，如果用户名是不合法的，则不会将该请求给本体执行
var checkUser = function(name){
  $.ajax({
      url:"xxxxx",
      type:"POST",
      contentType:"application/json",
      data:JSON.stringify({
          name:name  //用户名
      })
  })
}
var proxy = (function(){
  var user = document.querySelector("#username");
  return function(){
      var userName = user.value;
      var errMsg = detect(userName,["NotEmpty","isUserName"]);
      if(errMsg){
          console.log(errMsg);
          return;
      }
      checkUser(userName);
  }
})();

// 如果你的用户名格式不正确，这个请求是不会达到本体的。直接回在proxy里面被拦截掉。所以一个很好的代理(保护代理)，能让你的请求100%用在刀刃上。
```
[slide]
### 图片延迟加载
----

``` js
//将背景图设置，和图片加载的src修改分开
var delayload = (function() {
  var img = document.querySelector("#img");
  return function(src) {
    img.src = src;
  };
})();
var proxy = (function(){
  var image = document.createElement("img");
  image.onload = function() {
    delayload(image.src);
  }
  return function(src) {
    delayload("loading.gif");
    image.src = "jimmy.jpg";
  };
})();
proxy.setSrc("jimmy.jpg");
```
[slide]
## 代理模式总结
----
* 代理优势是非常明显的, 但是, 由于代理写起来需要更多的逻辑和代码，如果没有什么需求的话，不用代理也是行得通的。还有就是，用不用代理和你原来的本体执行的业务逻辑是完全分开的，即，如果以后有什么需求，或者你对自己的代码不满意，重构的时候，再添加代理，这种方式也是很推荐的。 {:&.rollIn}
* 不能滥用代理，有时候仅仅是给代码增加复杂度；

[slide]
## 观察者模式(Observer)概念
----
* 观察者模式：又被称为订阅者模式，通过一个对象管理相依于它的多对象，同时当该对象的状态改变的时候会主动通知依赖于它的对象。常用在我们后台数据的变化对于前台view的更新上。 {:&.zoomIn}
* 提供给关联对象一种同步通信的手段，使某个对象与依赖它的其他对象之间保持状态同步,当一个目标需要告诉观察者发生了什么有趣的事情,它会向观察者广播一个通知。
* 当我们不再希望某个特定的观察者获取其注册目标发出的改变通知时,该目标可以将它从观察者列表中删除。
* 优点：让主题和依赖主题的观察者之间松耦合，实现逻辑层和表示层的分离。

[slide]
## 观察者模式列表基本概念
----
* Subject(目标): 维护一系列观察者,方便添加或删除观察者 {:&.zoomIn}
* Observer(观察者): 接口或抽象类, 为那些在目标状态发生改变时需获得通知的对象提供一个更新接口
* ConcreteSubject(具体目标): 被观察者的具体实现,包含一些基本的属性状态及其他操作。状态发生改变时,向Observer发出通知,存储ConcreteObserver的状态
* ConcreteObserver(具体观察者): 存储一个指向ConcreteSubject的更新接口,实现Observer的更新接口,以使自身状态与目标的状态保持一致。

[slide]
## 观察者模式在Javascript中的应用
---
* 观察者模式广泛应用于Javascript编程中。所有的浏览器事件(鼠标点击，按键等事件)都是该模式的例子, 事件handler是观察者，事件源是被观察者。
* 现在UI交互逻辑应用了观察者模式, M和V之间的实现关联的重要设计模式之一就是观察者模式, 由于视图呈现的复杂和多样化，为了便于扩展，需要视图有一种随模型数据的变化而“自行变化”的能力，而实现方式就是，视图通过侦听模型对象的变化而渲染自己，不需要外力来渲染，外力只需要改变唯一的标准(模型对象)就可以.

![Sample](/assets/observer.png)

[slide]
## 观察者模式实例
---
[Observer Example](/js/observer.js)

[slide]
## 观察者模式总结
----
* 通过创建可观察的对象，当发生一个感兴趣的事件时可将该事件通过给所有的观察者，从而形成松散耦合。 {:&.zoomIn}

[slide]
## 家庭作业

* [JavaScript Puzzlers!](http://javascript-puzzlers.herokuapp.com/?utm_source=ourjs.com) {:&.zoomIn}

[slide]

## 好书推荐
《Design Patterns: Elements of Reusable Object-Oriented Software》




