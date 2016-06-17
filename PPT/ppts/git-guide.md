title: Git Guide
speaker: Tony Zheng
url: https://github.com/zhengjinxin
transition: move
theme: colors

[slide]

# Git Guide

<small>演讲者：[@Tony Zheng](https://github.com/zhengjinxin)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

[slide]

## 设置Git的配置变量

```sh
git config --global user.name "Tony Zheng"
git config --global user.email tonyzheng@augmentum.com
```

设置别名

```sh
git config --system alias.st status
git config --system alias.ci commit
git config --system alias.co checkout
git config --system alias.br branch
```

[slide]

## Git 初始化
```sh
git init
```
* git init命令在工作区创建了隐藏目录.git，这个.git目录就是Git版本库（又叫仓库, repository）
.git 版本库所在的目录又被称为工作区
* Git将版本库（.git）目录放在工作区根目录下，那么Git的相关操作一定要在工作区根目录下执行吗？实际上，当在Git工作区的某一个子目录下执行操作的时候，会在工作区目录中依次向上递归查找.git目录，找到的.git目录就是工作区对应的版本库，.git所在的目录就是工作区的根目录，文件.git/index记录了工作区文件的状态（实际上是暂存区的状态）

[slide]

## git config命令的各参数有何区别
```sh
git config -e
git config -e --global
git config -e --system
```

* Git的三个配置文件分别是版本库级别的配置文件、全局配置文件（用户主目录下）和系统级配置文件（/etc目录下）。其中版本库级别的配置文件的优先级最高，全局配置文件次之，系统级配置文件优先级最低。

[slide]

## git config命令

```sh
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
```
* git config命令可以用于读取和更改INI配置文件的内容。使用只带一个参数的git config {section}.{key}命令可以读取INI配置文件中某个配置的键值，读取[core]小节的bare的属性值，可以用如下命令:

```sh
git config core.bare
```

```sh
git config a.b something
git config x.y.z others
```

```sh
[a]
    b = something
[x "y"]
    z = others
```

[slide]

## Git 工作区，暂存区和版本库

![img](http://img.my.csdn.net/uploads/201211/05/1352126739_7909.jpg "img") {:&.flexbox.vcenter}

* 图中左侧为工作区，右侧为版本库。在版本库中标记为index的区域为暂存区，标记为master的是master分支所代表的目录树。
* 图中可以看出， 此时HEAD实际是指向master分支的一个“游标”，所以图示的命令中出现HEAD的地方可以用master来替换。
* 图中的objects标识的区域为git的对象库，位置位于 .git/objects目录下。
* 当对工作区修改（或新增）的文件执行git add命令时，暂存区的目录树会被更新，同时工作区修改（或新增）的文件内容会被写入到对象库中的一个新的对象中，而该对象的id被记录在暂存区的文件索引中。

[slide]

* 当执行提交操作（git commit）时，暂存区的目录树会写到版本库（对象库）中，master分支会做相应的更新，即master最新指向的目录树就是提交时原暂存区的目录树。
* 当执行git reset HEAD命令时，暂存区的目录树会被重写，会被master分支指向的目录树所替换，但是工作区不受影响。
* 当执行git rm --cached 命令时，会直接从暂存区删除文件，工作区则不做出改变。
* 当执行git checkout .或git checkout -- 命令是，会用暂存区全部的文件或指定的文件替换工作区的文件。这个操作很危险，会清楚工作区中未添加到暂存区的改动。
* 当执行git checkout HEAD .或git checkout HEAD 命令时，会用HEAD指向的master分支中的全部或部分文件替换暂存区和工作区中的文件。这个命令也是极度危险的。因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。

[slide]

## Git 对象

* 你会在Git里到处看到这种“40个字符”字符串。每一个“对象名”都是对“对象”内容做SHA1哈希计算得来的，（SHA1是一种密码学的哈希算法）。这样就意味着两个不同内容的对象不可能有相同的“对象名”。
* 每个对象(object) 包括三个部分：类型，大小和内容。大小就是指内容的大小，内容取决于对象的类型，有四种类型的对象："blob"、"tree"、 "commit" 和"tag"。
    * ```blob```用来存储文件数据，通常是一个文件。
    * ```tree```有点像一个目录，它管理一些```tree```或是 ```blob```（就像文件和子目录）
    * 一个“commit”只指向一个"tree"，它用来标记项目某一个特定时间点的状态。它包括一些关于时间点的元数据，如时间戳、最近一次提交的作者、指向上次提交（commits）的指针等等。
    * 一个“tag”是来标记某一个提交(commit) 的方法。
    * 对象保存在Git库的objects目录下（ID的前2位作为目录名，后38位作为文件名）

[slide]

## Git 对象

![img](http://gitbook.liuhui998.com/assets/images/figure/objects-example.png)
[slide]

## Git引用
* Git中的引用是一个非常重要的概念，对于理解分支（branch）、HEAD指针以及reflog非常有帮助。
* Git系统中的分支名、远程分支名、tag等都是指向某个commit的引用。比如master分支，origin/master远程分支，命名为V1.0.0.0的tag等都是引用，它们通过该保存某个commit的SHA1哈希值指向某个commit
```sh
git rev-parse master
git rev-parse refs/heads/master
git rev-parse HEAD
```
* 可以看出在当前的版本库中，HEAD、master和refs/heads/master具有相同的指向。查看.git/HEAD和.git/refs/heads/master，可以看出master指向的是一个提交ID（最新提交）。用一个文件指向这个链条的最新提交，那么这个文件就可以用于追踪整个提交历史了。整个文件就是.git/refs/heads/master文件。
* 目录.git/refs是保存引用的命名空间，其中.git/refs/heads目录下的引用又称为分支。对于分支，既可以使用正规的长格式的表示法，如refs/heads/master，也可以去掉前面的两级目录用master表示。Git有一个底层命令git rev-parse 用于显示引用对应的提交ID


[slide]

## Git 重置

* master分支在版本库的引用目录（.git/refs）中体现为一个引用文件.git/refs/heads/master，其中内容就是分支中最新的提交ID
* 引用 refs/heads/master 就好像是一个游标，在有新的提交发生的时候指向了新的提交。可以如果只可上、不可下，就不能称为“游标”。Git提供了git reset命令，可以将“游标”指向任意一个存在的提交ID。
```sh
git reset --hard HEAD^
```
* 使用重置命令很危险，会彻底丢弃历史。那么还能通过浏览提交历史的办法找到丢弃的提交ID，再使用重置命令恢复历史吗？不可能！因为重置让提交历史也改变了。

[slide]

## 用reflog挽救错误的重置

* Git 提供了一个挽救机制，通过.git/logs目录下日志文件记录了分支的变更。默认非裸版本库（带有工作区）都提供分支日志功能，这是因为带有工作区的版本库都有如下设置：
```sh
git config core.logallrefupdates
```
查看一下master分支的日志文件.git/logs/refs/heads/master中的内容。
```sh
tail -5 .git/logs/refs/heads/master
```
可以看出这个文件记录了master分支指向的变迁，最新的改变追加到文件的末尾。
Git提供了一个git reflog命令，对这个文件进行操作。使用show子命令可以显示此文件的内容。
```sh
git reflog show master | head -5
```
* 查看git reflog的输出和直接查看日志文件最大的不同在于显示顺序的不同，即最新改变放在了最前面显示，而且只显示了每次改变的最终的SHA1哈希值。还有一个重要的区别在于git reflog命令的输出中还提供了一个方便的易记的表达式:<refname>@{<n>}。这个表达式的含义是引用<refname>之前第<n>次改变时的SHA1哈希值。
* 那么将引用master切换到两次变更之前的值，可以使用下面的命令。
```sh
git reset --hard master@{2}
```
* 此时如果再看git reflog查看，会看到恢复master的操作也记录在日志中了。

[slide]

## 深入理解git reset命令

* 用法一：git reset [-q] [```<commit>```] [--] ```<paths>```...
* 用法二：git reset [--soft | --mixed | --hard | --merge | --keep] [-q] [```<commit>```]

* 上面列出的两个用法，其中<commmit>都是可选项，可以使用引用或提交ID，如果省略<commit>则相当于使用了HEAD的指向作为提交ID。
* 上面列出的两种用法的区别在于，第一种用法在命令中包含路径<paths>。为了避免路径和引用（或者提交ID）同名而发生冲突，可以在<paths>前用两个连续的短线（减号）作为分隔。
* 第一种用法不会重置引用，更不会改变工作区。但是第二种用法则会重置引用。

[slide]

## git reset 示例
```sh
git reset --hard <commit>
git reset --soft <commit>
git reset --mixed(默认) <commit>
git reset
git reset HEAD
git reset -- filename
git reset --soft HEAD^
git reset HEAD^
git reset --mixed HEAD^
git reset --hard HEAD^
```
[slide]

## Git 检出

* 用法一：git checkout [-q] [```<commit>```] [--] ```<paths>```...
* 用法二：git checkout [```<branch>```]
* 用法三: git checkout [-m] [[-b | --orphan] ```<new_branch>```] [```<start_point>```]

* 重置的默认值是HEAD, 而检出的默认值是index，因此重置一般用于重置暂存区，而检出命令主要是覆盖工作区。
* 第一种用法不会改变HEAD头指针，主要是用于指定版本的文件覆盖工作区中对应的文件。如果省略<commit>，则会用暂存区的文件覆盖工作区的文件，否则用指定提交中的文件覆盖暂存区和工作区中对应的文件。
* 第二种用法则会改变HEAD头指针。之所以后面的参数写作<branch>，是因为只有HEAD切换到一个分支才可以对提交进行跟踪，否则仍然会进入“分离头指针”的状态。所以用法二最主要的作用是切换分支。
* 第三种用法主要是创建和切换到新的分支（```<new_branch>```），新的分支从<start_point>指定的提交开始创建。

[slide]

## git checkout 示例
```sh
git checkout branch
git checkout
git checkout HEAD
git checkout -- filename
git checkout branch --filename
git checkout -- . 或者 git checkout .
```

[slide]

## 恢复进度
* 命令 git stash 可以用于保存和恢复工作进度，掌握这个命令对于日常的工作会有很大的帮助。
* 命令示例
```sh
git stash
git stash list
git stash pop [--index] [<stash>]
git stash [save [--patch] [-k | --[no-]keep-index] [-q|--quiet] [<message>]]
git stash apply [--index] [<stash>]
git stash drop [<stash>]
git stash clear
git stash branch <branchname> <stash>
```
[slide]

## Git 基本操作

* 执行git rm命令删除文件
* 命令git add -u快速标记删除
* 恢复删除的文件 git checkout HEAD^ -- welcome.txt
* 移动文件 git mv

[slide]

## 历史穿梭

* gitk: 它是最早实现的一个图形化的Git版本库浏览软件，只能用于版本库浏览。
* gitg：它有着非常漂亮的原生的图形界面。gitg不但能够实现gitk的全部功能，即浏览提交历史和文件，还能帮助执行提交。
* qgit：和gitg一样不但能够浏览提交历史和文件，还能帮助执行提交。

[slide]

## 改变历史

* 修补式提交

```sh
git commit --amend
```

[slide]

## 强制非快进式推送

* 一般情况下，推送只允许“快进式”推送。所谓快进式推送，就是要推送的本地版本库的提交是建立在远程版本库相应分支的现有基础上的，即远程版本库相应分支的最新提交是本地版本库最新提交的祖先提交。
* 非快进式提交
```sh
git push -f
```

[slide]

## 远程版本库
```sh
git show-ref
```
* 从git show-ref的输出中发现了几个不寻常的引用，这些引用以refs/remotes/origin为前缀，并且名称和远程版本库的分支名一一对应。这些引用实际上就是从远程版本库的分支复制过来的，称为远程分支。
* 克隆操作产生的远程分支为什么都有一个名为“origin/”的前缀？
```sh
[remote "origin"]
    url = git@github.com:bravemantonyzheng/LearnGit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
```

[slide]

## 分支追踪
* 使用如下命令完成分支的创建和切换
```sh
git checkout hello-1.x
```

* 显示的创建本地分支
```sh
git checkout -b hello-1.x origin/hello-1.x
```
* 在上面基于远程分支创建本地分支的过程中，命令输出的第一行说的是建立了本地分支和远程分支的跟踪。和远程分支建立跟踪后，本地分支就具有下列关系特征：
    * 检查工作区状态时，会显示本地分支和被跟踪远程分支提交之间的关系。
    * 当执行git pull命令时，会和被跟踪的远程分支进行合并（或者变基），如果两者出现版本偏离的话。
    * 当执行git push命令时，会推送到远程版本库的同名分支中。
* 如果希望在基于一个本地分支创建一个本地分支也能够使用分支间的跟踪功能，就要在创建分支时提供--track参数。

[slide]

## PUSH 和 PULL 操作与远程版本库

* 当不带任何参数执行git push命令时，实际的执行过程是：
    * 如果为当前分支设置了```<remote>```，即由配置branch.```<branchname>```.remote给出了远程版本库代号，则不带参数执行git push相当于执行了git push ```<remote>```。
    * 如果没有为当前分支设置```<remote>```，则不带参数执行git push相当于执行了git push origin。
    * 要推送的远程版本库的URL地址由remote.<remote>.pushurl给出。如果没有配置，则使用remote.```<remote>```.url配置的URL地址。
    * 如果为注册的远程版本库设置了push参数，即通过remote.```<remote>```.push配置了一个引用表达式，则使用该引用表达式执行推送。
    * 否则使用“：”作为引用表达式。该表达式的含义是同名分支推送，即对所有在远程版本库中有同名分支的本地分支执行推送。

[slide]

## Git merge的三种模式
* Fast forward 
    * 当待合并的2个branch最近的commit是线性关系时, 或者说，某个branch自上次更新后没有commit信息时, git则直接移动指针即可，并没有真正的merge操作，也没有对应的merge commit信息
* Merge made by recursive
    * 当要合并的2个branch的最近的commit对应的直接祖先不同时, git就无法通过简单的移动指针来进行合并, 只能以2个branch的最新commit和他们的共同祖先进行一次merge, 并对应有一个merge commit信息
* Conflict
    * 当2个branch都修改了同一个文件的同一部分时，这时就会发生冲突，git的自动合并就会失败, 这时使用git status会看到

[slide]

## 好书推荐

Git 权威指南