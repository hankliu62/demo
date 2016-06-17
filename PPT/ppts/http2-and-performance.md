title: Web性能优化和HTTP2.0
speaker: Vincent Hou
url: https://github.com/frontnode
transition: move
theme: colors

[slide]

# Web性能优化和HTTP2.0
## Web Performance Optimization and HTTP2.0
<small>演讲者：[@Vincent Hou](https://github.com/vincenthou)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## HTTP的版本变迁
----
* **0.9** 1990年：已过时。只接受 GET 一种请求方法，没有在通讯中指定版本号，且不支持请求头。由于该版本不支持 POST 方法，所以客户端无法向服务器传递太多信息
* **HTTP/1.0**　1996年：这是第一个在通讯中指定版本号的HTTP 协议版本，至今仍被广泛采用，特别是在代理服务器中
* **HTTP/1.1**　1999年：当前版本，持久连接被默认采用，并能很好地配合代理服务器工作。还支持以管道方式同时发送多个请求，以便降低线路负载，提高传输速度
* **HTTP/2.0**　2015年：最新版本，保证了与 HTTP 1.1 的完全语义兼容，最初考虑的是 Google SPDY 协议、微软的 SM 协议和 Network-Friendly HTTP 更新。最终各方推荐了 SPDY 协议，并在此基础上进行了相应更新

[slide]

## HTTP1.1的革新
----
* 缓存处理
* 带宽优化及网络连接的使用
* 错误通知的管理
* 消息在网络中的发送
* 互联网地址的维护
* 安全性及完整性

[slide]

## HTTP基础 - 通信模型
----
![三次握手](http://www.cfanz.cn/uploads/png/2012/12/29/18/4aPe25A6RD.png)

* 无状态的请求响应模型 {:&.bounceIn}
* 持久化连接keep-alive
* 管道化pipelining

[slide]

## HTTP基础 - 报文内容演示
----
![报文内容](http://images.cnitblog.com/blog/79263/201303/25113656-16b00686c5a7459eaf570d5899c2412f.png)

[slide]

## HTTP基础 - 报文内容名词
----

* 请求和响应报文 {:&.moveIn}
* 请求行和首部header字段
* 状态行，首部header字段和报文主体

[slide]

## HTTP基础 - 状态码分类
----
* **2xx** 成功响应 {:&.fadeIn}
* **3xx** 重定向
* **4xx** 客户端错误
* **5xx** 服务器错误

[slide]

## HTTP基础 - 状态码实例
----
* **204** No Content
* **206** Partial Content
* **301** Move Permanently
* **302** Found
* **304** Not Modified
* **400** Bad Request
* **401** Unauthorized
* **403** Forbidden
* **503** Service Unavailable

[slide]

## HTTP优化 - 缓存控制
----
* **Expires** 基于绝对时间的控制 {:&.rollIn}
* **Cache Controll** 基于相对时间的控制max-age
* **Last-Modified/If-Modified-Since** 基于文件修改时间的控制
* **ETag/If-None-Match** 基于文件修改状态的控制

[slide]

## HTTP优化 - 并发加载（开源）
----
* 同域名并发 6~8 个连接 {:&.rollIn}
* 静态资源做域名散列
* 独立的域名来托管静态资源

[slide]

## HTTP优化 - 并发加载（节流）
----
* 异步接口合并（Batch Ajax Request）{:&.rollIn}
* 图片合并，雪碧图（CSS Sprite）
* CSS、JS 合并（Concatenation）
* CSS、JS 内联（Inline）
* 图片、音频内联（Data URI）

[slide]

## 雅虎 14 条优化原则
----
* **请求数量: ** 合并脚本和样式表，CSS Sprites，拆分初始化负载，划分主域
* **请求带宽: ** 开启 GZip，精简 JavaScript，移除重复脚本，图像优化
* **缓存利用: ** 使用 CDN，使用外部 JavaScript 和 CSS，添加 Expires 头，减少 DNS 查找，配置 ETag，使 AjaX 可缓存
* **页面结构: ** 将样式表放在顶部，将脚本放在底部，尽早刷新文档的输出
* **代码校验: ** 避免 CSS 表达式，避免重定向

[slide]

## HTTP2.0的革新
----
* 多路复用 {:&.zoomIn}
* HEAD 压缩
* 优先级请求
* 服务器推送
* 默认的TLS连接

[slide]

## 新增的二进制分帧层
----
![二进制分帧层](http://imququ.com/static/uploads/2015/05/http2_1.png)

[slide]

## 几个概念
----
* **帧（Frame）:** HTTP/2 数据通信的最小单位。帧用来承载特定类型的数据，如 HTTP 首部、负荷；或者用来实现特定功能，例如打开、关闭流。每个帧都包含帧首部，其中会标识出当前帧所属的流
* **消息（Message）:** 指 HTTP/2 中逻辑上的 HTTP 消息。例如请求和响应等，消息由一个或多个帧组成
* **流（Stream）:** 存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数 ID
* **连接（Connection）:** 与 HTTP/1 相同，都是指对应的 TCP 连接

[slide]

## 帧、消息、流和连接的关系
----
![帧、消息、流和连接的关系](http://imququ.com/static/uploads/2015/05/http2_2.png)

[slide]

## 多路复用
----
![多路复用](http://7ls0pw.com1.z0.glb.clouddn.com/多路复用.jpeg)

[slide]

## HEAD 压缩
----
![HEAD 压缩](http://7ls0pw.com1.z0.glb.clouddn.com/头压缩.jpeg)

[slide]

## 优先级请求
----
![优先级请求](http://7ls0pw.com1.z0.glb.clouddn.com/优先级请求.jpeg)

[slide]

## 服务器推送
----
![服务器推送](http://7ls0pw.com1.z0.glb.clouddn.com/服务器推送.jpeg)

[slide]

## 参考资料

* [HTTP/2 与 WEB 性能优化](http://imququ.com/post/http2-and-wpo-1.html)
* [实现HTTP2.0协议的服务器们](https://github.com/http2/http2-spec/wiki/Implementations)
* [HTTP2.0中英文对照版](https://github.com/fex-team/http2-spec)
* [HTTP2.0中文翻译版](http://yuedu.baidu.com/ebook/478d1a62376baf1ffc4fad99)
* [HTTP 2.0来了](http://mp.weixin.qq.com/s?__biz=MzA5MDMzMTcyNA==&mid=204191136&idx=1&sn=2da08cf025d63480d394b774e8ba8d22&3rd=MzA3MDU4NTYzMw==&scene=6#rd)

[slide]

## 好书推荐

* 图解HTTP
* 图解TCP/IP
* 图解XXXX
* Web性能权威指南
