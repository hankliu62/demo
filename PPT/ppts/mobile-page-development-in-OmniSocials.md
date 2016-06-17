title: 手机页面开发在OmniSocials中的实践
speaker: Vincent Hou
url: https://github.com/vincenthou
transition: move
theme: green

[slide]

# 手机页面开发在OmniSocials中的实践
## Mobile Page Development in OmniSocials
<small>演讲者：[@Vincent Hou](https://github.com/vincenthou)</small>

[slide]

## 说点啥

* 尺寸定义
* 可选的布局方式
* 调试工具
* 设计的基本原则
* 开发模式说明
* 基础库依赖
* 组件化方案

[slide]

## 适配协作基本思路

* 选择一种尺寸作为设计和开发基准
* 定义一套适配规则，自动适配其他的尺寸
* 特殊适配效果给出设计效果

[slide]

![手机适配方案](http://vdemo.qiniudn.com/mobile-adaption.jpeg)

设计师选择iPhone6作为基准设计尺寸，交付给开发的设计尺寸是按750px * 1334px为准(高度会随着内容多少而改变)。前端开发人员通过一套适配规则自动适配到其他的尺寸。

[slide]

## 为什么要设置viewport

```html
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
```

[slide]

## 两种像素

* **物理像素(pt):** 任何设备屏幕的物理像素的数量都是固定不变的
* **逻辑像素/CSS像素(px):** 在CSS、JS中使用的一个抽象的概念，也可以称为设备独立像素，简称为dips
* **DPR:** 物理像素与逻辑像素（px）的对应关系， **物理像素/逻辑像素**，可以通过`window.devicePixelRatio`获取

```text
667px * 375px
dpr = 750 / 375 = 2
```

[slide]

## 以iphone6为例

* **分辨率:** 1334pt * 750pt
* **屏幕尺寸:** 4.7 inches (屏幕对角线长度)
* **屏幕像素密度:** 326 dpi

![PPI](https://camo.githubusercontent.com/c1502f74d9951713cd06f2fd56ba2937a374d92a/687474703a2f2f37786c6332612e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f31362d312d31392f35363932343537332e6a70673f696d616765566965772f322f772f333030)

**Notice:** 屏幕像素密度(Pixels Per Inch)简称 ppi ，单位是 dpi(dot per inch)。这里指屏幕水平或垂直每英寸有326个物理像素。原则上来说，ppi越高越好，因为图像会更加细腻清晰。

[slide]

## 三种视口

* **布局视口(Layout Viewport):** 可以在JS通过 `document.body.clientWidth` 获取
* **视觉视口(Visual Viewport):** 可以在JS通过 `window.innerWidth` 获取
* **理想视口:** 可以在JS通过 `screen.width` 获取，有兼容性问题，但在试验中可以认为就是理想尺寸

```html
<meta name="viewport" content="width=device-width">
```

[slide]

## 布局视口

在手机上，视口与移动端浏览器屏幕宽度不再相关联，是完全独立的，是浏览器厂商定的视口

![布局视口](https://camo.githubusercontent.com/43e1321a2708326ba26ac9710f714f75838b5343/687474703a2f2f37786c6332612e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f46764754754e6a6a366a6270485a765874636a2d4c365f7951577858)

[slide]

## 视觉视口

用户正在看到的网页的区域，大小是屏幕中CSS像素的数量

![视觉视口](https://camo.githubusercontent.com/7caa987d3754bd966fab21333dc8a351a3d108b2/687474703a2f2f37786c6332612e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f466d786c6e414f5f5f2d35365a5a4e5335485a6364516c6f4e546649)

[slide]

##理想视口

理想视口中的网页用户最理想的宽度，用户进入页面的时候不需要缩放

![缩放比例](http://ybshare.coding.io/share/img/flexible/width-demo.gif)

[slide]

## 缩放的影响

* 缩放是在放大或缩小逻辑像素，也就是CSS像素，不影响设备像素
* 缩放会影响布局视口的尺寸，不会影响视觉视口

```js
zoom level = screen.width / window.innerWidth
```

```html
<meta name="viewport" content="initial-scale=1,user-scalable=no">
```

[slide]

## 实际逻辑像素效果取决于

* 是否是理想视口
* 页面是否缩放
* 屏幕是否为高密度

[slide]

## 默认绘制策略

* 浏览器厂商为了让用户在小屏幕下网页也能够显示地很好，所以把视口宽度设置地很大，一般在 768px ~ 1024px 之间，最常见的宽度是 980px
* IOS自动调整默认缩放比

![没有设置viewport](https://camo.githubusercontent.com/204ead9fb51cda7871a1847de0f3ea5cc6e266a9/687474703a2f2f37786c6332612e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f466c762d6c39696366612d307853796e69665f6659707472786c58373f696d616765566965772f322f772f333030)

[slide]

## 做个试验

[Demo](http://0.0.0.0:8081/mobile-page/viewport.html)

[slide]

## 尺寸换算方式

页面划分为100a

```text
1a = 7.5px
1rem = 75px
1rem = 10a
```

也就是页面宽度是10rem，默认的基准font-size是75px

```text
240 / 75 = 3.2
240px -> 3.2rem
```

使用[sublime text插件](https://github.com/flashlizi/cssrem)

[slide]

## 字体不使用rem的方法

字体的大小不推荐用rem作为单位。所以对于字体的设置，仍旧使用px作为单位，并配合用data-dpr属性来区分不同dpr下的的大小。

```css
div {
  width: 1rem; 
  height: 0.4rem;
  font-size: 12px; // 默认写上dpr为1的fontSize
}

[data-dpr="2"] div {
  font-size: 24px;
}

[data-dpr="3"] div {
  font-size: 36px;
}
```

[Rem单位](http://0.0.0.0:8081/mobile-page/rem.html)

[slide]

## 小背景图不使用rem

较小的背景图（比如icon）的 background-size 不要使用具体 rem 数值，裁剪后会出现边缘丢失。应使用与元素等尺寸切图，设定background-size来缩放

```css
.cover-bg {
  background-size: cover;
}

.contain-bg {
  background-size: contain;
}
```

[slide]

## 实际发生了什么

* 动态生成 viewport
* 屏幕宽度设置 rem的大小，即给<html>设置font-size
* 根据设备像素比（window.devicePixelRatio）给<html>设置data-dpr

![scale](https://camo.githubusercontent.com/8b2ca71b169202a8e356d431c81a7b15ff6fdf42/687474703a2f2f37786c6332612e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f4669455233715232717272584c6e61334b4e757a6d2d6f59662d7147)

[slide]

## 做个试验

[Demo](http://huodong.m.taobao.com/act/yibo.html)

![Qrcode](https://camo.githubusercontent.com/ed811c9fc57a03fe46ef716921a221a678bb1160/687474703a2f2f7777772e773363706c75732e636f6d2f73697465732f64656661756c742f66696c65732f626c6f67732f323031352f313531312f7969626f71722e706e67)

[slide]

## 使用栅格系统

[makegrid](https://github.com/amfe/lib-flexible#栅格系统)配置参数

* designWidth - 设计稿宽度
* designUnit - 设计稿最小单位a（以px为单位）
* columnCount - 栅格列数
* columnXUnit - 栅格列宽（以a为单位）
* gutterXUnit - 栅格间距（以a为单位）
* edgeXUnit - 页面左右边距（以a为单位）
* className - 栅格样式的名称（可省略，默认为grid）

**Notice:** 方案还预置了几个默认的栅格规范，分别是750-12，750-6，640-12，640-6

[slide]

## 使用flexbox

* [Why flexbox](http://philipwalton.github.io/solved-by-flexbox/)

```css
.wrap {
  display: -webkit-box;
  display: flex;
}

.item {
  -webkit-box-flex: 1;
  flex: 1;
}
```

```html
<ul class="wrap">
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
</ul>
```

[slide]

## 做个试验

[终于可以随意加减导航了](http://0.0.0.0:8081/mobile-page/flexbox.html)

[slide]

## 调试工具

* [Chrome DevTools](https://developer.chrome.com/devtools/docs/device-mode)
* [Weinre](http://blog.csdn.net/freshlover/article/details/42640253)
* [微信web开发者工具](http://mp.weixin.qq.com/wiki/10/e5f772f4521da17fa0d7304f68b97d7e.html#.E4.B8.8B.E8.BD.BD.E5.9C.B0.E5.9D.80)
* [Browsersync](http://www.browsersync.cn/)

[slide]

## 善用搜索引擎和堆栈

```
try {
  something
} catch(e) {
  window.location.href = 'http://stackoverflow.com/search?q=[js] + ' + e.message;
}
```

[slide]

## 懂点设计

CRAP

<div class="columns2">
<img src="http://vdemo.qiniudn.com/without-design.jpg" height="450">
<img src="http://vdemo.qiniudn.com/with-design.jpg" height="450">
</div>

[slide]

## 对比(Contrast)

* 对比的基本思想就是要避免页面上的元素太过相似
* 如果元素（字体、颜色、大小、线宽、形状、空间等）不相同，那就干脆让它们截然不同
* 对比能够让讯息更准确的传达，内容更容易的被找到、被记住。如果你想让对比效果更明显，就一定要大胆，不要让两种颜色看起来好像差不错又不一样
* 当然也不要在同一个页面使用太多种字体

[slide style="background-image:url('http://vdemo.qiniudn.com/contrast-design.jpg');background-size:contain;background-position:50%;"]

[slide]

## 重复(Repetition)

* 重复的目的就是“一致性”，让设计中的视觉要素在整个作品中重复出现
* 可以重复颜色、形状、材质、空间关系、线宽、材质、空间等
* 既能增加条理性，又能增加统一性

[slide style="background-image:url('http://vdemo.qiniudn.com/repetition-design.jpg');background-size:contain;background-position:50%;"]

[slide]

## 对齐(Alignment)

* 任何东西都不能在页面上随意安放
* 每个元素都应当与页面上的另一个元素有某种视觉联系
* 这样能够建立一种清晰、精巧而清爽的外观，提升可读性
* 避免一个页面上混用多种对其模式，也就是不要有一些置左，有一些置右
* 尽量避免使用居中对齐，除非是比较正式、稳重的设计（有些时候居中是一种很土的对齐方式）

[slide style="background-image:url('http://vdemo.qiniudn.com/alignment-design.jpg');background-size:contain;background-position:50%;"]

[slide]

## 亲密性(Proximity)

* 彼此相关的项应当靠近，归组在一起
* 如果多个项相互之间存在很近的亲密性，它们就会成为一个视觉单元，而不是多个孤立的元素
* 有助于组织信息，减少混乱，为读者提供清晰的结构

[slide style="background-image:url('http://vdemo.qiniudn.com/proximity-design.jpg');background-size:contain;background-position:50%;"]

[slide]

## Take a break

[slide]

## OmniSocials页面是如何开发的

* Yii2.0标准的MVC模式
* 在模块的webapp目录下
* 页面路由由controllers目录中添加的控制器控制
* 页面放在views目录下通过PHP渲染
* 静态资源放置在static目录下，包括图片，字体，JS脚本和CSS样式表（支持使用coffee和SCSS）
* 静态资源的引用方式比较自由（通过在action中根据条件注入，在views的layouts目录下定义，直接在PHP页面上使用script引入）

**一点吐槽:** script标签应该放在body底部，起码也加个async或defer属性吧 {:&.moveIn}

[slide]

## Vendor工具库

* [jweixin](http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html): 微信JSSDK，不解释
* [flexible](https://github.com/amfe/lib-flexible): 移动端自适应布局方案
* [zepto](https://github.com/madrobby/zepto): 移动端jquery
* [moment](https://github.com/moment/moment): 日期处理工具集
* [swiper](https://github.com/nolimits4web/Swiper.git#3.0.7): 带硬件加速滑动轮播插件
* [lazyload](https://github.com/jieyou/lazyload#1.3.1): 图片延迟加载
* [alogs](https://github.com/fex-team/alogs): 前端统计库
* [mobile-detect](https://github.com/hgoebl/mobile-detect.js): 设备识别库
* [hammer](https://github.com/hammerjs/hammer.js): 手势识别工具库
* [fastclick](https://github.com/ftlabs/fastclick): 解决手机上click事件的300ms问题

[slide]

## Custom工具库

* [handlewechat.coffee](http://git.augmentum.com.cn/scrm/aug-marketing/blob/master/src/static/webapp/handlewechat.coffee): 基本容错处理，从PHP写入的option参数中读取配置并通过config接口注入权限验证配置，对于非404页面隐藏右上角菜单接口，404页面支持查看公众号
* [common.coffee](http://git.augmentum.com.cn/scrm/aug-marketing/blob/master/src/static/webapp/common.coffee): 有用的全局方法，包括发送Restful请求，查询参数处理，localstorage，消抖函数，日期格式化等
* [tracker.coffee](http://git.augmentum.com.cn/scrm/aug-marketing/blob/master/src/static/webapp/tracker.coffee): 上报未捕获的前端异常，配合alogs使用，生成到`frontend/runtime/frontend-error.log`

[slide]

## 使用Riot作为组件化方案

![Riot](http://riotjs.com/img/logo/riot120x.png)

| Framework | Version | Minified Size |
|------------------------|------------|---------------|
| Ember | 2.2.0 | 446.0kb |
| Polymer | 1.0.6 | 183.0kb |
| Angular | 1.4.8 | 148.0kb |
| React | 0.14.3 | 136.0kb |
| [Riot](http://riotjs.com/) | **2.3.11** | **20kb** |

[slide]

## Riot中的tag

```text
<header class="c-header">
  <span class="c-header__return" onclick={ back }></span>
  <div class="c-header__title">{ opts.title }</div>

  <script>
    var self = this;

    this.beforeHandler = this.beforeHandler || this.opts.beforeHandler;
    this.customHandler = this.customHandler || this.opts.customHandler;

    this.back = () => {
      if (util.isFunction(self.customHandler)) {
        self.customHandler.apply(self);
      } else {
        util.isFunction(self.beforeHandler) && self.beforeHandler.apply(self);
        window.history.back();
      }
    }
  </script>
</header>
```

[slide]

## 使用BEM定义样式组件

```text
.c-header {
  background-color: $brand-default-bg;
  color: $brand-default-color;
  text-align: center;
  position: relative;
  height: 1.25rem;
  line-height: 1.25rem;

  &__return {
    @include background-image('/images/mobile/components/return.png');
    @include size(1.1rem, 100%);
  }

  &__title {
    @include text-el;
    margin: 0 1.1rem;
  }
}
```

[slide]

## 在PHP页面中使用

```php
<header></header>

<panel class="additional-panel" padding="true">
  <location location="{ opts.location }"></location>
</panel>

<section class="btns-wrapper clearfix">
  <btn class="cancel-btn"></btn>
  <btn class="sure-btn"></btn>
</section>

<popselect-options></popselect-options>

<script src="/build/webapp/components/header/header.js"></script>
<script src="/build/webapp/components/popselect/popselect.js"></script>
<script src="/build/webapp/components/location/location.js"></script>
<script src="/build/webapp/components/btn/btn.js"></script>
<script src="/build/webapp/components/panel/panel.js"></script>
```

[slide]

## 入口脚本

```coffee
$ ->
  //配置项初始化
  //回调处理方法定义

init = ->
  //数据初始化

  riot.mount('header', {title: '服务地址', customHandler: backHandler})
  riot.mount('panel')
  sureBtnTag = riot.mount('.sure-btn', 'btn', {text: '确定', type: 'solid', disable: true, clickHandler: sureHandler})[0]

  //各种mount

//初始化页面组建数据和交互行为
init()
```

[slide]

## 合适的才是最好的

![Vue](http://vuejs.org/images/logo.png)

Vue.js

[slide]

## 参考资料

* [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)
* [MobileWeb 适配总结](http://html-js.com/article/MobileWeb)
* [Flowchart: how to retinafy your website](http://mir.aculo.us/2012/06/26/flowchart-how-to-retinafy-your-website/)
* [移动端适配方案(上)](https://github.com/riskers/blog/issues/17)
* [移动端适配方案(下)](https://github.com/riskers/blog/issues/18)
* [移动端页面适配方案PPT](http://ybshare.coding.io/share/flexible.htm)
* [Stackoverflow上对于虚拟视口和布局视口差别的回答](http://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport)
* [viewports剖析](http://www.w3cplus.com/css/viewports.html)
* [Paul Irish's post: Chrome DevTools for Mobile](http://www.html5rocks.com/en/tutorials/developertools/mobile/?redirect_from_locale=zh)
* [移动端前端开发调试](http://yujiangshui.com/multidevice-frontend-debug/)
* [视区相关单位vw, vh..简介以及可实际应用场景](http://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/)
* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
* [iOS9 带来的initial-scale的变化](http://div.io/topic/1409)

[slide]

## 切图神器

* [MarkMan](http://www.getmarkman.com/)/[PxCook](http://www.fancynode.com.cn/pxcook/home)
* [AssistorPS](http://www.uisdc.com/tag/assistor-ps)/[Parker](http://www.cutterman.cn/v2/parker)
* [Cutterman](http://www.cutterman.cn/v2/cutterman)

[slide]

## 好书推荐

[写给大家看的设计书](http://book.douban.com/subject/3323633/)