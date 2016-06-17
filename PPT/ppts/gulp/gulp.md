title: Gulp
speaker: Hank Liu
url: https://github.com/frontnode
transition: slide
theme: light

[slide]

# Gulp
## 前端构建工具
<small>演讲者：[@Hank Liu](https://github.com/biluo62)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## 前端自动化工作流
----
* 每种项目都有自己特定的开发流程、工作流程。从需求分析、设计、编码、测试、发布，一个整个开发流程中，会根据不同的情况形成自己独特的步骤和流程。一个工作流的过程不是一开始就固定的，而是随着项目的深入而不断地改进，期间甚至会形成一些工具。例如当年大神们在Linux写C语言，觉得每次编译好多文件好麻烦，就发明了makefile。不同代码的管理好麻烦，然后就发明了git、SVN等等。 {:&.rollIn}

* 一个工作流程的好坏会影响你开发的效率、开发的流程程度，然后间接影响心情，打击编码积极性。所以我认为开发一个项目的时候，编码前把工作流程梳理清楚确定下来是一个非常重要的步骤。并且这个流程要在真实环境中不停的改进。

[slide]

## 为什么要前端自动化
----

* 在前端开发实践中，需要有自己的基础前端架构，包括了开发环境、代码管理，代码质量，性能检测，命令行工具，开发规范，开发流程，前端架构及性能优化。 {:&.rollIn}

* 规范代码, 提高代码质量, 最终的目的在于提升工作效率。

* 提问: 一个前端自动化开发流程中，我们需要做什么?

[slide]

## 前端自动化开发流程
----
* 良好的模块化； {:&.rollIn}
* 自动化编译；
* 自动化测试；
* 实时刷新页面；
* 自动化打包、压缩发布；

[slide]

## 自动化构建工具
----
* grunt {:&.rollIn}
* gulp


[slide]

## grunt
----

![Sample](/assets/grunt.png) {:.flexbox.vcenter style="margin-top:-10px;"}

[slide]
## grunt是什么
----

* grunt是一个依赖于node平台的构建工具; {:&.rollIn}
* grunt也是ant、maven性质类似的工具，不过它主要服务于前端的，主要被用来处理文件（包括html、css、js）的合并、压缩、依赖等问题，不过这并不是它本身的功能，grunt本身是一个构建平台，他的强大来自于其社区插件不断的增加和更新，grunt构建平台提供了成千上万插件来实现我们不同的构建需求，且由于开源，不断的开发人员贡献他们的一份力量。

[slide]
## grunt优点
----

* 社区活跃度高，插件最丰富（选择权重最高）； {:&.rollIn}
* 语法简单，易于编写；
* 中文文档丰富，在后面帮助标题，提供了两个中文翻译连接。（英语渣的福音）；
* Grunt生态系统非常庞大，并且一直在增长。

[slide]
## gulp
----

![Sample](/assets/gulp.png) {:.flexbox.vcenter style="margin-top:-10px;"}

[slide]
## gulp简介
----

* Gulp 是一个构建系统，它能通过自动执行常见任务，比如编译预处理 CSS，压缩 JavaScript 和刷新浏览器，来改进网站开发的过程。Gulp 是基于 Node.js 构建的，因此 Gulp 源文件和你用来定义任务的 Gulp 文件都被写进了 JavaScript（或者 CoffeeScript）里。前端开发工程师还可以用自己熟悉的语言来编写任务去 lint JavaScript 和 CSS、解析模板以及在文件变动时编译 LESS 文件 {:&.rollIn}

[slide]
## Gulp vs Grunt
----

### Grunt 之殇

* 插件很难遵守单一责任原则 {:&.rollIn}
* 用插件做一些本来不需要插件来做的事情
* 试图用配置文件完成所有事，结果就是混乱不堪
* 落后的流程控制产生了让人头痛的临时文件/文件夹所导致的性能滞后


[slide]
## 插件很难遵守单一责任原则
----

* 因为 Grunt 的 API 设计缺憾，使得许多插件不得不负责一些和其主要任务无关的事情。比如说要对处理后的文件进行更名操作，你可能使用的是 uglify 插件，也有可能使用的是 concat 插件（取决于工作流的最后一个环节是谁）。 {:&.rollIn}

[slide]
## 用插件做一些本来不需要插件来做的事情
----

* 因为 Grunt 提供了统一的 CLI 入口，子任务由插件定义，由 CLI 命令来调用执行，因此哪怕是很简单的外部命令（比如说运行 karma start）都得有一个插件来负责封装它，然后再变成 Grunt CLI 命令的参数来运行，多此一举。 {:&.rollIn}

[slide]
## 试图用配置文件完成所有事，结果就是混乱不堪
----

* 规模较大，构建／分发／部署流程较为复杂的项目，其 Gruntfile 有多庞杂相信有经历的人都有所体会。而 gulp.js 奉行的是“写程序而不是写配置”，它走的是一种 node way。 {:&.rollIn}
* gulp对于 node.js 开发者来说这是好事，符合他们的一贯作风；不过对于那些纯前端工程师来说（数量不小），这似乎没有什么显著的改善。
* 近来 Grunt 社区涌现了不少插件来帮助开发者组织／管理／简化臃肿的 Gruntfile，效果都还不错(load-grunt-config)。


[slide]
## 落后的流程控制产生了让人头痛的临时文件/文件夹所导致的性能滞后
----

* 这是 gulp.js 下刀子的重点，也是本标题里“流式构建”所解决的根本问题。流式构建改变了底层的流程控制，大大提高了构建工作的效率和性能，给用户的直观感觉就是：更快。 {:&.rollIn}

[slide]
### Gulp 之道
----

* 使用 Gulp，你的构建脚本是代码，而不是配置文件 {:&.rollIn}
* 使用标准库（node.js standard library）来编写脚本
* 插件都很简单，只负责完成一件事（基本上都是20行左右的函数）
* 任务都以最大的并发数来执行
* 输入 / 输出（I/O）是基于“流式”的

[slide]
## Gulp的安装和使用流程
----

### 第一步：安装命令行工具

``` shell

$ npm install -g gulp

```

[slide]
### 第二步：在你的项目下把 gulp 安装为开发依赖组件
----

``` shell

$ cd YOUR_PROJECT
$ npm install gulp --save-dev

```

[slide]

### 第三步：在项目的根路径下创建Gulpfile.js
----

``` js

var gulp = require('gulp');

gulp.task('default', function () {
});

```
[slide]
### 第四步：运行！
----

``` shell

$ gulp

```

[slide]
## Gulp API
----

* [Gulp API](http://www.gulpjs.com.cn/docs/api/)


[slide]
## 家庭作业

* 花点时间浏览一下[gulp.js 插件库](https://gulpjs.com/plugins/)，大致了解下利用已有的插件你都可以做哪些事情 {:&.zoomIn}
* 对于常用的插件，仔细阅读它们自己的文档，以便发挥出它们最大的功效
* 抽时间学习 gulp.js API，特别是 gulp.task() 里关于任务体的详细描述，学会如何执行回调函数（callback），如何返回 promise 等等
* 尝试编写适合自己工作流程和习惯的任务，如果它工作良好，把它做成插件发布给大家吧！

[slide]

## 好书推荐
《编写可维护的JavaScript》




