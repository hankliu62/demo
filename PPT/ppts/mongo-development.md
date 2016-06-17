title: Mongo查询和性能优化
speaker: Rex Chen
url: https://github.com/frontnode
transition: slide

[slide]

# Mongo查询和性能优化
## MongoDB
<small>演讲者：[@Rex chen](https://github.com/rexchen123)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## Not Only SQL
----
* 易扩展
* 大数据量，高性能
* 灵活的数据模型
* nosql阵营Cassandra、Mongodb、CouchDB、Redis、 Riak、Membase、Neo4j 和 HBase
* 为什么使用Nosql： http://www.infoq.com/cn/news/2011/01/nosql-why/

[slide]

## Mongo
----
* 所用语言：C++
* 特点：保留了SQL一些友好的特性（查询，索引）。
* 在数据存储时采用内存到文件映射
* 对性能的关注超过对功能的要求
* 在32位操作系统上，数据库大小限制在约2.5Gb
* 空数据库大约占 192Mb
* 采用 GridFS存储大数据或元数据（不是真正的文件系统）

[slide]

## 增删改
----
* 增 insert
* 删 drop（快但是需要重建索引） remove
* 改 update $set, $inc, $push和$addToset, $pop和$pull, 定位符$只更新第一个匹配的元素

[slide]

## 查
----
* $lt, $lte, $gt, $gte
* $in, $nin 和 $or
* $exist, null
* 正则
* 数组 $all, $size, $slice, $elemMatch
* $where

[slide]

## 游标
----
* limit, skip, sort
* skip首先找到需要skip的文档，然后再抛弃这些文档，大多数数据库会在索引中保存更多的元数据用于处理skip，但mongo暂时不支持，所以不要用skip略过大量的结果
* 分页和随机选取文档

[slide]

## 聚合
----
* aggregate $match, $project, $group, $unwind, $sort
* MapReduce map, reduce, finalize
* count distinct group

[slide]

## 聚合

----
* $match 中可以使用所有常规的查询操作符，但是不能使用地理空间操作符$near, $center, $box 

```
db.map.aggregate({"$match":{"gps":{"$near":[10,20]}}})

```
 {:&.zoomIn}
```
Error("Printing Stack Trace")@:0
()@src/mongo/shell/utils.js:37
([object Object])@src/mongo/shell/collection.js:866
@(shell):1

uncaught exception: aggregate failed: {
    "errmsg" : "exception: $near is not allowed inside of a $match aggregation expression",
    "code" : 16424,
    "ok" : 0
}
```

```
db.member.aggregate({"$match":{"score":{"$lt":2}}})
```

[slide]

## $project
----
* 数学表达式$add, $subtract, $multiply, $devide, $mod
* 日期表达式$year, $month, $day等
* 字符串表达式$substr, $concat, $toLower, $toUpper
* 逻辑表达式$cmp, $strcasecmp, $eq
* 布尔表达式$and, $or, $not
* 控制语句$cond:[booleanExpr, $trueExpr, $falseExpr], $ifNull:[expr, $replacementExpr]

[slide]

## $project
----
会员等级A：0～2， B：2-10, C: >=10

```
db.member.aggregate(
    {
        "$project":{
            "level":{
                "$cond":[
                    {"$lt":["$score", 2]},
                    "A",
                    {
                        "$cond":[
                            {"$lt":["$score", 10]},
                            "B",
                            "C"
                        ]
                    }
                ]
            }
        }
    }
)
```
 {:&.zoomIn}

[slide]

## $unwind
----
*  拆分，把数组的每一个值拆分成一个单独的文档

```
db.member.aggregate({"$unwind":"$properties"})
```

[slide]

找出促销码最多的5个产品

```
db.promotionCode.aggregate(
    {"$project":{"productId":1,"_id":0}},
    {"$group":{"_id":"$productId", "count":{"$sum":1}}},
    {"$sort":{"count":-1}},
    {"$limit":5}
)
```
 {:&.zoomIn}

[slide]

## group
----
* key 分组的键
* initial 每一组会初始化并传给后续过程
* $reduce function(doc, prev) 当前文档和累加器文档,每一组都有一个独立的累加器
* condition 选填 可以避免迭代整个集合


[slide]

## group

用group算出每一天的会话总数


```
db.chatMessage.group({
    "key":{"date":true},
    "initial":{"messageCount":0},
    "$reduce": function(doc, prev) {
       prev.messageCount++;
    },
    "$condition":{}
}
)
```

{:&.zoomIn}

[slide]

## MapReduce
----

* Map emit(key, [value, value]) 发出数据
* Reduce函数接收Map函数返回的结果作为参数,进行处理
* Finalize格式化输出
* Query对目标记录进行过滤

[slide]

## MapReduce

用MapReduce算出每一天的会话总数

```
map = function () {
    emit(this.date, 1)
    }
reduce = function (key, values) {
        var total = 0
        values.forEach(function(v) {total += v})
        return total
    }
options = { out: "date_totals" }
db.chatConversation.mapReduce(map, reduce, options)
db.date_totals.find()
```

[slide]

## 索引
----
* 什么是索引？为什么用索引？
    * 索引和书本的目录类似,有了索引就不需要翻阅正本书，数据库可以直接在索引中查找,找到条目后，
可以直接跳到目标文档的位置,这个可以时查找速度提高几个数量级.


[slide]

## 比较

----

```
db.promotionCode.find({"code":"0F0100AA"}).explain()
```

```
db.promotionCode.find({"code":"0F0100AA"}).limit(1).explain()
```

```
db.promotionCode.ensureIndex({"code":1})
db.promotionCode.find({"code":"0F010002"}).limit(1).explain()
```

[slide]

## 索引
----
* 如何选择需要建立索引的字段

```
和传统关系型数据库（如：MySql）一样
可以查看常用的查询，以及哪些需要被优化的查询找出一组常用的键。
```

[slide]

## 复合索引
----
* 索引的值是按照一定顺序排列的，所以排序的时候非常快


```
db.promotionCode.ensureIndex({"code":1,"isUsed":1})

["0F010001", false] -> ox8caca90as
["0F010002", true]  -> ox8cacw90as
["0F010003", false] -> ox8cacaa0as
["0F010004", false] -> ox8cacs90as
["0F010005", false] -> ox8cace90as
```

```
db.promotionCode.ensureIndex({"isUsed":-1,"code":1})

["false", "0F010001"] -> ox8caca90as
["false", "0F010003"] -> ox8cacw90as
["false", "0F010004"] -> ox8cacaa0as
["false", "0F010005"] -> ox8cacs90as
["true", "0F010002"]  -> ox8cace90as
```

[slide]

## 低效率操作符
----
* $where, $ne, $nin, $exists  全表扫描
* $not在使用$lt，$gt或正则时可以使用索引，其他则是全表扫描

[slide]

## $or和$in哪一个好？
----

or是两次查询merge到一块，所以$in要好。

 {:&.zoomIn}

[slide]

## 索引对象和数组
----
* db.member.ensureIndex({"location":1})
* db.member.ensureIndex({"location.city":1})


[slide]

## 索引对象和数组
----
* db.member.ensureIndex({"properties":1})
* db.member.ensureIndex({"properties.1":1}) （下标从0开始,下同）
* db.member.ensureIndex({"properties.1.value":1})
* 为了避免多键索引中索引条目爆照性增长，一个索引中的数组字段最多只能有一个.

[slide]

## 唯一索引和稀疏索引
----
* db.promotionCode.ensureIndex({"code":1},{"unique":true})唯一索引
* db.promotionCode.ensureIndex({"code":1,"accountId":1}, {"unique":true})复合唯一索引
* db.promotionCode.ensureIndex({"code":1},{"unique":true, "dropDups":true})去重（只第一个保留）
* db.promotionCode.ensureIndex({"code":1},{"unique":true, "sparse":true})稀疏索引不匹配空文档

[slide]

## 索引基数
----
集合中某个字段拥有不同值的数量
* gender 和 isUsed
* email 和 username
基数越高索引越有用

[slide]

## 什么时候使用索引
----
* 一般来说如果查询需要返回集合内30%的文档（或者更多一般是30%~60%没有严格的规则），那就应该比较索引和全表扫描的查询速度

| 索引适用 | 全表扫描适用 |
|------|-----|
| 集合较大 | 集合较小 |
| 文档较大 | 文档较小 |
| 选择性查询 | 非选择性查询 |

[slide]

## 索引管理
----
* ensureIndex创建索引
* dropIndex删除索引
* getIndexs查看索引


[slide]

## 好书推荐

MongoDB权威指南
