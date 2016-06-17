title: 项目中的前端组件开发
speaker: Vincent Hou
url: https://github.com/frontnode
transition: slide

[slide]

# 项目中的前端组件开发
## Frontend Components
<small>演讲者：[@Vincent Hou](https://github.com/vincenthou)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## 前端组件的结构
----
* 结构：HTML -> DOM {:&.bounceIn}
* 表现：CSS -> LESS, SCSS, Stylus
* 行为：Javascript -> coffeescript, typescript, livescript

[slide]

## 开源解决方案
----
* MVVM框架：angular, vuejs, avalon {:&.zoomIn}
* View: reactjs, **riotjs**
* UI Components: bootstrap, foundation, semantic-ui, amaze-ui, brick
* Future: polymer, web components

[slide]

## 我们的选择
----
* Bootstrap
* Angular ui-bootstrap
* Angular directive
* **SCSS**

[slide]

## 组件和页面的关系
----
* 页面由组件组成，组件在页面上定位
* 页面上只需要定义有哪些组件，以及组件的布局和定位
* 页面上使用栅格化布局组件，根据具体情况适当覆盖布局样式
* 组件的行为和样式应该是内聚的，不会依赖或者破坏页面上的样式
* 相同作用域组件之间通过接口传递数据
* 跨作用域或者层级的组件通过pub/sub传递数据

[slide]

## 合理的结构
----
* 最简单的层次
* 语义化的标签 (不是只有div)
* 合理的拆分和组件抽象

[slide]

![Sample](http://vdemo.qiniudn.com/dom.png) {:.flexbox.vcenter style="margin-top:-40px"}

```html
<div class="messages-wrapper" ng-repeat="message in page.messages">
    <div class="message">
        <div class="avatar">
            <img ng-src="{{message.avatar}}"/>
        </div>
        <div class="body">
            <div class="header">
                <div class="name">
                    <a ng-href="{{message.homepage}}">{{message.username}}</a>
                </div>
                <div class="time">{{message.createdAt}}</div>
            </div>
            <div class="content-wrapper">
                <div class="content">{{message.content}}</div>
            </div>
        </div>
    </div>
</div>
```

[slide]

![Mad](http://vdemo.qiniudn.com/mad.jpg) {:&.flexbox.vcenter}

太复杂啦！{:&.zoomIn}

[slide]

更清晰的结构

```html
<ul class="messages-wrapper" ng-repeat="message in page.messages">
    <li class="msg-box">
        <img class="img" ng-src="{{message.avatar}}"/>
        <div class="body">
            <a class="name" ng-href="{{message.homepage}}">{{message.username}}</a>
            <time class="time">{{message.createdAt|date:'yyyy-MM-dd HH:mm:ss'}}</time>
            <p class="content">{{message.content}}</p>
        </div>
    </li>
</ul>
```

[slide]

## 干净的样式
----
* 最少层次的嵌套(3层以内)
* 局部化变量, 防止污染全局空间
* 合理使用mixin和extend
* 学会偷懒
* 你还是在写CSS
* 适时重构样式

[slide]

### 最少层次的嵌套(3层以内)

```sass
body {
  .wrapper {
    .content {
      #top-story {
        .title {
          a {
            /* STYLES HERE */
          }
        }
      }
    }
  }
}
```

->

```sass
body .wrapper .content #top-story .title a {
  /* STYLES HERE */
}
```

[slide]

### 局部化变量, 防止污染全局空间

```sass
$bg-color = gray;
message-wrapper {
    background-color: $bg-color;
    ...
}
```

->

```sass
message-wrapper {
    $bg-color = gray;
    background-color: $bg-color;
    ...
}
```

[slide]

### 合理使用mixin和extend

你的理解是怎样的？

{:&.fadeIn}
* mixin不是mixin, extend不是extend
* mixin会在生成的CSS中重复多份
* extend会将公共的样式赋予继承类，类似组合的概念

```sass 
.weather {
  @extends %module;
  background: LightCyan;
  @include transition(all 0.3s ease);
  > h3 {
    border-bottom: 1px solid white;
    @include transform(rotate(90deg));
  }
}
```

Reference: [Extend placeholder selector](http://thesassway.com/intermediate/understanding-placeholder-selectors) [Mixin or Placeholder](http://www.sitepoint.com/sass-mixin-placeholder/)

[slide]

### 学会偷懒

* 还是DRY，DRY很重要
* 首先看bootstrap中有没有，是否满足需要，这需要改全局变量的值还是要局部覆盖
* 看公共样式组件中是否已经存在，如果是一个公共的需求，考虑添加新的公共样式
* 其他地方有个类似的，改成公共样式大家用
* 实在没有办法就自己实现一个吧

[slide]

## 公共组件

src/frontend/web/modules/core

```sh
├── controllers
│   ├── graphicCtrl.coffee
│   └── userCtrl.coffee
├── coreLoader.coffee
├── coreModule.coffee
├── directives
│   ├── wmAutoComplete.coffee
│　　　　　　　...
├── filter
│   ├── countdownFilter.coffee
│　　　　　　　...
├── index.scss
├── partials
│   ├── graphicmodal.html
│   ├── properties
│   └── wm-bootstrap-tpls.js
├── services
│   ├── authService.coffee
│　　　　　　　...
└── styles
```

[slide]

## 公共样式组件

```sh
├── components
│   ├── _autocomplete.scss
│   ├── _breadcrumb.scss
│   ├── _button.scss
│   ├── _checkbox.scss
│   ├── _copy.scss
│   ├── _customerfilter.scss
│   ├── _datetimepicker.scss
│   ├── _dropdown.scss
│   ├── _fileupload.scss
│　　　　　　　...
├── _components.scss
├── _layout.scss
└── mixins
    ├── _font-size.scss
    └── _util.scss

```

[slide]

## 你还是在写CSS

* SCSS只是工具，你更要关心生成的样式是怎样的
* OOCSS
* SMACSS
* DRY CSS
* BEM

参考 [CSS模块化](https://github.com/vincenthou/vincenthou.github.io/issues/25)

[slide]

## 适时重构样式

![Pay Back](http://vdemo.qiniudn.com/pay_back.png)

出来混迟早是要还的 {:&.bounceIn}

[slide]

## 清晰的行为 (controller)
----
* 最小依赖，仅仅注入需要service, factory, value
* 使用面向对象的思维编写页面和组件
* 适时抽取公共的service，避免DRY
* 避免依赖scope的层次结构传递数据

[slide]

## 来个组件 (directive)
----
* 理解directive, filter, service 和 controller的分工
* scope的三种接口：@, &, =
* 最小化外部信息，根据需要提供theme的切换
* 过于复杂的功能考虑拆分
* 复杂的逻辑内部消化，保持接口简洁和可测试性
* restrict: 'A'

Reference: [Understanding Directives](https://github.com/angular/angular.js/wiki/Understanding-Directives) [Testable directive](http://ng-learn.org/2014/01/Dom-Manipulations/)

[slide]

## 设计原则
----
* OCP　开闭原则　{:&.moveIn}
* LSP　里氏代换原则
* DIP　依赖倒转原则
* ISP　接口隔离原则　(不要写万能的模块)
* CARP　合成/聚合复用原则　（多使用组合）
* PLK　最小知识原则（迪米特法则，Facade，jquery）


[slide]

## 使用lint帮助你学习最佳实践

* [CoffeeLint](http://www.coffeelint.org/)
* [SCSSLint](https://github.com/causes/scss-lint)

[slide]

## Look forward for the [feature](https://github.com/w3c/webcomponents)

[slide]

## 好书推荐

程序员修炼之道－从小工到专家
