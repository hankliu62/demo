title: 初识SEO
speaker: Sara Zhang
url: https://github.com/frontnode
transition: move
theme: dark

[slide]

# 初识SEO
<small>演讲者：[@Sara Zhang](https://github.com/sarazhang123)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## 什么是SEO
----
* 概念：全称Search Engine Optimization，中文译为“搜索引擎优化”。SEO是指从自然搜索结果获得网站流量的技术和过程，是在了解搜索引擎自然排名机制的基础上， 对网站进行内部及外部的调整优化， 改进网站在搜索引擎中的关键词自然排名， 获得更多流量， 从而达成网站销售及品牌建设的目标。 {:&.zoomIn}
* 本质：优化网站，让搜索引擎蜘蛛（spider）更好的阅读和抓取网站的HTML内容。

[slide]

## 为什么要SEO
----
* SEO让行业网站的产品和服务更完善、提升客户满意度。
* SEO让行业网站更规范和成熟，以获得投资商信赖。
* SEO让行业网站不会在将来因为当初没有SEO而损失惨重。
* SEO让行业网站的流量增加从而获得巨额收入。

[slide]

## 搜索引擎工作原理简介
----
* 爬行和抓取(蜘蛛、链接、地址库)  {:&.zoomIn}
* 预处理（提取文字、分词、索引）
* 排名（相关性计算）

[slide]

## 网站结构优化

[slide]

## 禁止收录机制
---
[subslide]

1. robots.txt文件
```shell
User-agent: Baiduspider
Disallow: /ab/
Disallow: .jpg$
Allow: /ab/cd/
Sitemap: http://faq.seowhy.com/sitemap.txt
```
**被robots.txt禁止抓取的URL还是可能出现在搜索结果中。只要有导入链接指向这个URL，搜索引擎就知道这个URL的存在。**
=========
2. meta robots标签
```html
<meta name="robots" content="noindex,nofollow，nosnippet,noarchive,noodp">
<!-- 禁止所有搜索引擎索引本页面，禁止跟踪本页面上的链接，
不要在搜索结果中显示说明文字，不要显示快照，
不要使用开放目录中的标题和说明 
百度的官方说法是目前只支持NOFOLLOW和NOARCHIVE -->
```

[/subslide]

[slide]

## nofollow的使用
----
* 链接的nofollow属性只适用于本链接上。nofollow最初的目的是减少垃圾链接对搜索引擎排名的影响。搜索引擎看到这个标签就不会跟踪链接，也不传递权重和锚文字。
```html
<a href="http://www.example.com" rel="nofollw">这是锚文字</a>
```
[阮一峰博客下的留言链接](http://www.ruanyifeng.com/blog/2015/05/thunk.html)

[slide]

## URL静态化

* 早期的搜索引擎不愿意收录动态URL，主要原因是可能陷入无限循环或收录大量重复内容，造成资源极大浪费。 {:&.zoomIn}
``` shell
http://www.domain.com/product.php?color=red&cat=shoes
http://www.domain.com/product.php?cat=shoes&color=red
```
* 使用服务器的URL重写模块进行URL静态化
```shell
RewriteRule /products/([0-9]+) /products.php?id=$1
```
[SEO十万个为什么](http://faq.seowhy.com/category2.html)

[slide]

## 网址规范化
---
* 概念：网址规范化指的是搜索引擎挑选最合适的URL作为真正网址的过程。 {:&.zoomIn}

* 解决网址规范化问题

  * 301转向 {:&.zoomIn}
  * Canonical标签
```html
<!-- 告诉搜索引擎这个页面的规范化网址应该是http://www.quncrm.com -->
<link rel="canonical" href="http://www.quncrm.com" />
```

[slide]

## 404页面
* 404错误代码  {:&.zoomIn}
* 404页面设计
* 404错误与外链
  * [死链检测](http://tool.chinaz.com/Links)

[slide]

## 页面优化


[slide]

## 页面优化方法

* 页面标题　 {:&.zoomIn}
* 描述标签(排名无关)
* 关键词标签(排名无关)
* 正文中的关键词
* 链接及锚文字
* Google沙盒效应

[slide]

## 外部链接建设

[slide]

## 外部链接意义

* 互联网的本质特性之一就是链接。内部链接自己可以控制，外部链接对相关性、收录及权重的影响及其重大，占了SEO的60% ~ 70%以上。
###1. 相关性及锚文字
###2. 权重及信任度
###3. 收录


[slide]

## Google炸弹

* 数目众多的以特定关键词为链接锚文字的外部链接指向某一个URL
* 被链接的页面一般不包含这个关键词，内容和这个关键词基本无关
* 这个被链接的URL在搜索这个关键词时的排名急剧上升

[slide]

## 外部链接查询

* 链接查询指令
  * 反向链接
```
link:www.baidu.com
```
  * 外部链接
```
link:www.baidu.com -site:baidu.com
```
* 工具查询外链
  * [网站收录／反链查询－站长工具](http://tool.chinaz.com/Seos/Sites.aspx)
  * [Backlink Summary](http://www.webconfs.com/backlink-summary.php)

[slide]

## 友情链接

* 概念：友情链接的意思就是像好朋友一样，互相联系起来，并且网站互相指向彼此的网站，并且利用双方的权重来影响排名
* 注意点：看要交换网站的PR、收录情况及快照日期等
* 交换场所：
  * 1、友情链接QQ群
  * 2、友情链接交换平台
  * 3、搜索引擎查找同行业网站
  * 4、购买友情链接

[slide]

## SEO作弊及惩罚

[slide]

## 主要SEO作弊方法

* 隐藏文字(Hidden Text) {:&.zoomIn}
* 隐藏链接(Hidden Links)(效果为0)
* 垃圾链接(Link Spam)
* 链接农场(Link Farm)
* 隐藏页面(Cloacking Page)
* 桥页(Doorway Pages)
* 跳转
* 买卖链接(Paid Links)

[slide]

## 搜索引擎惩罚种类

* 在搜索最主要的关键词时被惩罚，次要关键词和长尾关键词排名不变。高度集中的锚文字是主要原因之一  {:&.zoomIn}
* 所有关键词全面排名下降
* 不针对排名，针对网站PR值。出售链接的网站经常出现这种现象
* 排名下降固定的值，如Google的负30惩罚

[slide]

## 搜索引擎惩罚的检测

* 使用site指令 {:&.zoomIn}
* 网管工具
* 搜索网站上特有文字
* 检查日志

[slide]

## SEO工具

* [Alexa](http://www.alexa.com)
* [百度指数](http://index.baidu.com)
* [百度搜索风云榜](http:top.baidu.com)
* [Alexa网站排名查询](http://www.Alexa.cn)
* [百度站长平台](http://zhanzhang.baidu.com/site/index)
* [Backlink Summary](http://www.webconfs.com/backlink-summary.php)

[slide]

## 好书推荐

SEO实战密码





