title: Angular Overview and Best Practice
speaker: Sara Zhang
url: https://github.com/frontnode
transition: move
theme: dark

[slide]

# Angular Overview and Best Practice
<small>演讲者：[@Sara Zhang](https://github.com/sarazhang123)</small>

[slide]

## AngularJS的历史
----
* AngularJS最初由Misko Hevery和Adam Abrons于2009年开发，设计初衷是为了让Web设计师而非开发者使用HTML标签来创建简单的应用程序。后来Misko参与了Google Feedback项目的开发。他觉得[GWT](http://baike.baidu.com/link?url=I8Sd9b5d9L_WU5s2LVtKlvHyUXuAtEvQj40kJeeY0ayNJRgfCBATIeggB27VLpZacmjZUNpWS_DMPgOlLvl6w_)的开发模式非常缓慢。于是他跟他的老板打赌，他能在两个礼拜内用AngularJS重写整个应用。老板尽管不相信，但还是答应让他重写。结果Misko并没能在两个礼拜内完成，他用了三个礼拜。但是他仅用了1500行代码就完成了原本17000行代码的应用。这引起了很多人的重视，于是Google决定让他们全职开发AngularJS。

[slide]

## AngularJS特性介绍
----
* 模块化开发 {:&.zoomIn}
* MVVM(Model-View-ViewModel)
* 双向数据绑定
* 指令
* REST接口
* 依赖注入

[slide]

## AngularJS优缺点
----
[subslide]
* 优点 {:&.zoomIn}
  * 模板功能强大丰富，并且是声明式的，自带了丰富的Angular指令
  * 是一个比较完善的前端MV*框架，包含模板，双向数据绑定，路由，模块化，服务，过滤器，依赖注入等所有功能
  * 自定义Directive, 可在项目中重用组件
=========
* 缺点 {:&.zoomIn}
  * 上手容易，但深入理解比较困难
  * 依赖注入,文件压缩问题
  ```js
  var BookCtrl = function($scope, $http) { /* constructor body */ };
  BookCtrl.$inject = ['$scope', '$http']; //Solution 1
  var BookCtrl = ['$scope', '$http', function($scope, $http) { /* constructor body */ }]; //Solution 2
  ```
  * 双向绑定的性能问题
   * DOM事件，譬如用户输入文本，点击按钮等。(ng-click)
   * XHR响应事件 ($http)
   * 浏览器Location变更事件 ($location)
   * Timer事件($timeout, $interval)
   * 执行$digest()或$apply()
[/subslide]

[slide]

## 控制器--Controller
---
* 为应用中的Model设置初始状态 {:&.zoomIn}
* 通过$scope,ViewModel把数据模型和函数暴露给视图(View)
* 监视模型其余部分的变化，并采取相应的动作

[slide]

## 指令--Directive
---
[subslide]

* 命名
  * 指令以驼峰的形式进行命名
  ```js
  myModule.directive('wmEnter', function(){/* function body */});
  ```
* 调用形式
```html
<div wm-enter></div>
<div data-wm-enter></div>
<div wm:enter></div>
<div x-wm-enter></div>
```
* 内置指令: ng-click, ng-show等ng-开头
=========
* 指令定义选项
  * restrict: 描述了指令在模板中的使用方式，E(元素), A(属性), C(CSS样式类), M(注释)
  * template: 以字符串的形式编写一个内联模板
  * tempalteUrl: 描述加载模板所要使用的URL
  * replace: 是否替换指令所在的元素
  * transclude: 把指令元素中原来的子节点移动到一个新模板内
  * scope: 为当前指令创建一个新的作用域，而不是使之继承父作用域
  * require: 要求必须存在另一个指令，当前指令才能正确运行
  * link: 给最终生成的DOM元素添加事件监听，并设置数据绑定

[/subslide]

[slide]

## 服务--Service
----
* 服务是为web应用执行特定任务的单例对象或方法
```js
myModule.factory('restService', function(){/*function body*/});
```
* 调用形式
```js
var userCtrl = ['restService', function(restService){/*function body*/}];
```
* 内置服务: $location, $http, $q 等

[slide]

## 过滤器--Filter

* 使用过滤器来格式化数据，以更友好的形式显示给用户
  ``` js
  myModule.filter('titleCase', function(){
    function(input) {
      /*body*/
    }
  });
  ```
* 调用形式
  ```html
  {{expression | filterName: param1: ...paramN}}
  ```
* 内置过滤器: date, currency, uppercase

[slide]

## 最佳实践

[slide]

## 指令
---
* {{ }} 的问题 {:&.zoomIn}
  * 在页面初始化的时候，用户可能会看到 {{ }}，然后闪烁一下才出现真正的内容。
    * 使用 ng-cloak directive 来隐藏它
    * 使用 ng-bind 替代 {{ }}
* 对images使用ng-src 替代src。
* 小心使用 ng-repeat 中的 $index
  ``` html
  <ul ng-controller="ListCtrl">
    <li ng-repeat="item in items track by $index">
      {{item.name}}
      <button ng-click="remove($index)">remove</button>
    </li>
  </ul>
  <ul ng-controller="ListCtrl">
    <li ng-repeat="item in items | filter: input track by $index">
      {{item.name}}
      <button ng-click="remove($index)">remove</button>
    </li>
  </ul>
  ```

[slide]

## $rootScope的使用
---
* $rootScope 是可以用的，不过很可能被滥用
  * 通常我们用不到它，因为几乎每个 view 都有一个 controller 以及相对应的自己的 scope。
  * 但偶尔有一些数据我们希望全局应用在整个app中，这时我们可以将数据注入$rootScope,全局变量是邪恶的，你必须很小心地使用 $rootScope。特别是不要用于代码，而仅仅用于注入数据。如果你非常希望在$rootScope写一个函数，那最好把它写到 service 里

[slide]

## Controller, Service, Directive职责
---
* 作用域  {:&.zoomIn}
  * 在templates（模板）中scope（作用域）按只读对待
  * 在controllers（控制器）中scope按只写对待
* 将界面与业务逻辑分离
  * Controller 不应该直接引用 DOM，而应该控制 view 的行为
  * Service 在大部分情况下也不应该直接引用 DOM，它应该是一个单例（singletons），独立于界面，与 view 的逻辑无关。
  * DOM 操作应该放在 directives 里面

[slide]

## ControllerAs Syntax
---
* controllerAs View Syntax
  * controllers提供了一个单一的新实例，这种语法更接近于JS的构造函数
  * 模板中渲染时，采用对象属性的形式访问，更具有上下文意义，更加易读

  ```
  <div ng-controller="Customer">
      {{ name }}
  </div>

  <div ng-controller="Customer as customer">
      {{ customer.name }}
  </div>
  ```

[slide]

## ControllerAs Syntax
---
* controllerAs Controller Syntax
  * scope具有继承性，子scope可以访问父scope中的属性，有时会造成混乱
  * controllerAs是一个语法糖，可以将model绑定到视图上，也可以将scope注入到controller中使用它提供的方法

  ```
  function Customer($scope) {
      $scope.name = {};
      $scope.sendMessage = function() { };
  }
  function Customer() {
    this.name = {};
    this.sendMessage = function() { };
  }
  function Customer() {
    var vm = this;
    vm.name = {};
    vm.sendMessage = function() { };
  }
  ```

[slide]

## 使用$q
---
[subslide]

* 使用promise来处理回调。AngularJS已经为它暴露了“$q”服务。
  * 可以对函数进行链式调用，不会陷入代码缩进的噩梦
  * 在调用链的过程中，可以保证上一个函数调用完成之后才会调用下一个函数
  * 每一个then()调用都带有两个参数，成功和失败的回调
  * 调用链中出现错误，可以在任意一个错误回调中进行处理
=========

* 链式调用如下
  ```
  var deferred = $q.defer();
  var fetchUser = function() {
    deferred.resolve(user);
    deferred.reject('Reason for failure');
  }
  //类似的，处理fetchUserPermissions和fetchUserListData

  deferred.promise.then(fetchUser())
    .then(fetchUserPermissions())
    .then(fetchUserListData())
    .then(function(list) {
      //处理数据列表
    }, function(error) {
      //任何一个步骤中所发生的错误都可以在这里处理
  });
  ```
[/subslide]

[slide]

## Coding Style
---
* 将与页面有绑定关系的成员放置在controller的顶部，将函数的实现细节放在下面,可读性更高,能一目了然哪些成员是与页面显示有关的，避免使用函数表达式
  ```js
  function Sessions() {
      var vm = this;

      vm.search = search;
      vm.refresh = dataservice.refresh; // 1 liner is OK
      vm.title = 'Sessions';

      getList()

      function search() {
        /* */
      }

      function getList() {
        /* */
      }
  }
  ```

[slide]

## 使用内置服务代替原生对象
---
* 使用Angular内置服务
 * document --> $document
 * window --> $window
 * setTimeout --> $timeout
 * setInterval --> $interval

**参考文档: [angular-styleguide](https://github.com/johnpapa/angular-styleguide#style-y030)**

[slide]

## 项目相关
---
* Common Directives
  * wmTable--表格组件
  * wmPagination--分页组件
  * wmFileUpload--上传文件组件
  * wmCheck--checkbox
  * wmRadio--radio button
  * wmSelect--下拉选择框
  * wmLocation--地址联动组件
  * wmSearch--搜索组件
  * wmTabs && wmTabPanes--Tab切换组件
  * wmTooltip--文本显示不全时，hover文本气泡显示全部内容
  * wmCharts--图表统计组件
  * wmDatetimePicker--日期组件
  * wmBreadcrumb--面包屑组件
  * required && wmEmail && wmUrl && wmValidate--表单验证组件

[slide]

## 项目相关
---
* Common Service
  * restService--封装了$http服务
  * notificationService--顶部弹出的标准系统通知(info, success, warning, error, confirm)
  * downloadService--下载二维码
  * uploadService--上传文件
  * exportService--导出文件

[slide]

## 项目相关
---
* 使用命令添加国际化key
  ```
    grunt addi18n:core:'test':'Test':'测试'
  ```
* Chrome Angular 调试工具 -- Batarang

[slide]

## 项目相关
---
* [common directives](http://git.augmentum.com.cn/scrm/aug-marketing/wikis/common-directives)
* [chart guide](http://git.augmentum.com.cn/scrm/aug-marketing/wikis/chart-guide)
* [frontend development guide](http://git.augmentum.com.cn/scrm/aug-marketing/wikis/frontend-development-guide)
