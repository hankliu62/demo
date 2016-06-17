title: ECMAScript 6
speaker: Hank Liu
url: https://github.com/frontnode
transition: slide
theme: light

[slide]

# ECMAScript 6
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

## JavaScript实现
----
* 核心（ECMAScript）：提供核心语法功能(语法, 类型, 语句, 关键字, 操作符, 对象...) {:&.zoomIn}
* 文档对象模型（DOM）:提供访问和操作网页内容的方法和接口(document)
* 浏览器对象模型（BOM）:提供与浏览器交互的方法和接口(window, location, navigator, screen, history)

[slide]

## ECMAScript 6简介
----
* ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，正处在快速开发之中，大部分已经完成了，预计将在2015年6月正式发布。 {:&.rollIn}
* ES6的目标，是使得JavaScript语言可以用来编写大型的复杂的应用程序，成为企业级开发语言。
* 由于ES6还没有定案，有些语法规则还会变动，目前支持ES6的软件和开发环境还不多。各大浏览器的最新版本，对ES6的支持可以查看<http://kangax.github.io/es5-compat-table/es6/>。
* Google公司的V8引擎已经部署了ES6的部分特性，使用Node.js，就可以体验这些特性。

[slide]

## Traceur转码器
----
* Google公司的Traceur转码器，可以将ES6代码转为ES5代码。
* 3种转码方式
1.  直接插入网页
2.  在线转换
3.  命令行转换

[slide]

## 直接插入网页
* 值得注意的是，script标签的type属性的值是module，而不是text/javascript。这是Traceur编译器识别ES6代码的标志，编译器会自动将所有type=module的代码编译为ES5，然后再交给浏览器执行。 {:&.zoomIn}



[slide]

## 在线转换
----
* Traceur提供一个[在线编译器](http://google.github.io/traceur-compiler/demo/repl.html)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

[slide]

## 命令行转换
* 作为命令行工具使用，Traceur是一个node.js的模块，首先需要用npm安装
``` shell
sudo npm install -g traceur
```

* traceur直接运行es6脚本文件，会在标准输出显示运行结果，以前面的calc.js为例
``` shell
$ traceur calc.js
```

* 如果要将ES6脚本转为ES5保存
``` shell
$ traceur --script calc.es6.js --out calc.es5.js --experimental
```

[slide]

## let和const命令

* 基本用法: 声明变量 {:&.zoomIn}
* 不存在变量提升
* 不允许重复声明
* 块级作用域
* 不是全局对象的属性

[slide]

## 变量的解构赋值
* 数组的解构赋值 {:&.zoomIn}
* 对象的解构赋值
* 用途

[slide]

## 用途
* 交换变量的值 {:&.zoomIn}
* 取出从函数返回多个值
* 函数参数的定义, 解构赋值可以方便地将一组参数与变量名对应起来。
* 快速提取JSON数据的值

[slide]

## 数组的扩展

* Array.from() {:&.zoomIn}
* Array.of()
* 数组实例的find()和findIndex()
* 数组实例的fill()
* 数组实例的entries()，keys()和values()
* 数组实例的includes()

[slide]

## 对象的扩展

* 属性的简洁表示法 {:&.zoomIn}
* 属性名表达式
* Object.is()
* Object.assign()
* proto属性，Object.setPrototypeOf()，Object.getPrototypeOf()

[slide]

## Object.assign()的用处

* 为对象添加属性 {:&.zoomIn}
* 为对象添加方法
* 克隆对象
* 合并多个对象

[slide]

## 什么是prototype

* function定义的对象有一个prototype属性，prototype属性又指向了一个prototype对象，注意prototype属性与prototype对象是两个不同的东西，要注意区别。在prototype对象中又有一个constructor属性，这个constructor属性同样指向一个constructor对象，而这个constructor对象恰恰就是这个function函数本身 {:&.zoomIn}

[slide]

## prototype图解

![Pay Back](http://www.uw3c.com/images/jsviews/js01.jpg) {:&.zoomIn}

[slide]

## prototype补充

* 每一个构造函数都有一个属性叫做原型(prototype)。作用：为一个特定类声明通用的变量或者函数。 {:&.zoomIn}
* 每一个对象都有\_\_proto\_\_属性, \_\_proto\_\_是一个对象拥有的内置属性（请注意：prototype是函数的内置属性，\_\_proto\_\_是对象的内置属性），返回对象类型原型的引用。
* 所有对象的\_\_proto\_\_都指向其构造器的prototype
* 优点：使用prototype既能保留公有性，又能具有私有性。

[slide]

## 函数的扩展

* 函数参数的默认值 {:&.zoomIn}
* 箭头操作符
* 不定参数，拓展参数

[slide]

## Set和Map数据结构

* 基本用法 {:&.zoomIn}
* 属性和方法
* 遍历操作

[slide]

## Generator 函数

* 简介 {:&.zoomIn}
* next方法的参数
* for...of循环
* yield*语句
* 对象属性的Generator函数

[slide]

## Class

* Class基本语法 {:&.zoomIn}
* Class的继承
* Class的Generator方法
* Class的静态方法

[slide]


## Class基本语法

* 概述 {:&.zoomIn}
* constructor方法
* 实例对象
* name属性
* Class表达式
* 不存在变量提升

[slide]

## Module

* export命令，import命令 {:&.zoomIn}
* 模块的整体输入，module命令
* export default命令
* 模块的继承

[slide]


## 家庭作业

* [JavaScript Puzzlers!](http://javascript-puzzlers.herokuapp.com/?utm_source=ourjs.com) {:&.zoomIn}

[slide]

## 好书推荐

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)




