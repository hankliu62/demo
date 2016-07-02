title: React Native开发环境构建
speaker: Hank Liu
url: https://github.com/frontnode
transition: slide
theme: light

[slide]

# React Native
## 开发环境构建
<small>演讲者：[@Hank Liu](https://github.com/biluo62)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]

## 开始使用React Native

### 目标平台：

* IOS  {:&.rollIn}
* Andriod

[slide]

## 开始使用React Native

### 开发环境：

* Mac {:&.rollIn}
* Linux
* Windows
* 注：由于本人使用的是Mac，下面我所说的开发环境都是以Mac为基准，如果你使用的是Windows或者Linux系统，请移步[Window 开发环境配置](http://reactnative.cn/docs/0.27/getting-started.html#content)，值得注意的是苹果公司只允许在Mac上开发IOS应用。

[slide]

## 软件安装

### Homebrew

Homebrew是Mac系统的包管理器，我们主要是使用Homebrew来安装Node和一些其他必要的工具。

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

注：在某些Mac OS X版本中，在安装Homebrew时会遇到*/usr/local*目录不可写的权限问题，需要使用如下命令设置权限：

```sh
sudo chown -R 'whoami' /usr/local
```

[slide]

## 软件安装

### NodeJs

在Mac系统中，我们使用Homebrew来安装NodeJs，值得注意的是，使用React Native时，必须要求NodeJs的版本在4.0以上，而使用Homebrew默认会安装最新的NodeJs（6.x版本）。

```sh
brew install node
```

[slide]

## 软件安装

### React Native命令行工具(react-native-cli)

React Native命令行工具主要用于执行创建、初始化、更新项目以及运行打包服务(packager)等任务。

使用NodeJs的包管理器npm来进行全局安装React Native 命令行工具：

```sh
npm install -g react-native-cli
```

注：如果在安装过程中出现*EACCES: permission denied*的权限错误，请参照Homebrew安装，使用上述命令修改*/usr/local*的权限

[slide]

## 软件安装

### Xcode

Xcode 是运行在操作系统Mac OS X上的集成开发工具（IDE），由苹果公司开发。Xcode是开发OS X 和 iOS 应用程序的最快捷的方式。Xcode 具有统一的用户界面设计，编码、测试、调试都在一个简单的窗口内完成。

React Native 需要安装Xcode 7.0及以上的版本，我们可以使用APP Store来安装Xcode，目前在APP Store上Xcode的版本为7.3.1，完全符合React Native的要求。使用APP Store安装Xcode时会同时安装Xcode IDE和Xcode命令行工具。

注：虽然一般来说命令行工具都是默认安装了，但你最好还是启动Xcode，并在 *Xcode | Preferences | Locations* 菜单中检查一下是否装有某个版本的 *Command Line Tools* 。Xcode的命令行工具中也包含一些必须的工具，比如 *git* 等。

[slide]

## 软件安装

### Watchman(推荐，不必须)

Watchman是由facebook提供的监视文件系统变更的工具，安装此工具能提高开发时性能。(packager可以快速捕捉文件更新而实现实时刷新)。

```sh
brew install watchman
```

[slide]

## 软件安装

### Flow(没使用过)

[Flow](https://www.flowtype.org/)是一个静态的JS类型检查工具。译注：你在很多示例中看到的奇奇怪怪的冒号问号，以及方法参数中像类型一样的写法，都是属于这个flow工具的语法。这一语法并不属于ES标准，只是Facebook自家的代码规范。所以新手可以直接跳过（即不需要安装这一工具，也不建议去费力学习flow相关语法）。

```sh
brew install flow
```

注：未使用过，有兴趣的自己去了解下。

[slide]

## 软件安装

### Nuclide

* Nuclide由facebook提供的基于atom的集成开发环境，用于编写、运行和调试React Native程序。

* 由于本人一直是使用Sublime Text来搬砖，所以更倾向于使用Sublime来编写React Native程序，大家可以根据自己的喜好来选择适合自己的编写代码的IDE。

[slide]

## 软件安装

### Andriod Studio

* Android Studio 是一个Android开发环境，基于IntelliJ IDEA. 类似Eclipse ADT，Android Studio提供了集成的Android开发工具用于开发和调试。 {:&.rollIn}

* React Native目前需要Android Studio2.0以及以上的版本。

* 注：Android Studio需要Java Development Kit [JDK] 1.8或更高版本。你可以在命令行中输入 javac -version来查看你当前安装的JDK版本。如果版本不合要求，则可以到[官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载。

* Android Studio包含了运行和测试React Native应用所需的Android SDK和模拟器。

[slide]

### Android Studio安装

* 第一步

![第一步](/images/Android_Studio_Step_1.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### Android Studio安装

* 第二步：安装Android Studio所需要的Andriod SDK。(注：勾选Performance和Android Virtual Device，存在即勾选)

![Andriod SDK安装](/images/Android_Studio_Step_2.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### Android Studio安装

* 第三步：Verify Settings

![Verify Settings](/images/Android_Studio_Step_3.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### Android Studio安装

* 第四步：下载安装

![下载安装](/images/Android_Studio_Step_4.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### Android Studio安装

* 第五步：配置Android SDK，在Android Studio的启动欢迎界面中选择*Configure | SDK Manager*。

![配置Android SDK](/images/Android_Studio_Step_5.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### 配置Android SDK：SDK Platforms

* 在SDK Platforms窗口中，选择右下角*Show Package Details*，然后在Android 6.0 (Marshmallow)中勾选*Google APIs*、*Intel x86 Atom System Image*、*Intel x86 Atom_64 System Image*以及*Google APIs Intel x86 Atom_64 System Image*。

![配置SDK Platforms](/images/Android_Studio_Step_6.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### 配置Android SDK：SDK Tools

* 在SDK Tools窗口中，选择*Show Package Details*，然后在*Android SDK Build Tools*中勾选*Android SDK Build-Tools 23.0.1*。（必须是这个版本）

![配置SDK Tools](/images/Android_Studio_Step_7.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### 下载安装选择的SDK配置

![下载安装选择的SDK配置](/images/Android_Studio_Step_8.png) {:.flexbox.vcenter style="margin:auto;width:600px;"}

[slide]

### ANDROID_HOME环境变量

* 确保*ANDROID_HOME*环境变量正确地指向了你安装的Android SDK的路径。具体的做法是把下面的命令加入到*~/.bash_profile*文件中：(译注：~表示用户目录，即*/Users/你的用户名/*，而小数点开头的文件在Finder中是隐藏的，并且这个文件有可能并不存在。请在终端下使用*sudo vi ~/.bash_profile*命令创建或编辑。如不熟悉vi操作，请点击这里学习）

``` sh
sudo vi ~/.bash_profile

# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=~/Library/Android/sdk

# 然后使用下列命令使其立即生效（否则重启后才生效）：
source ~/.bash_profile

# 可以使用如下命令来检查此变量是否已正确设置：
echo $ANDROID_HOME
```

[slide]

## 好书推荐
《Getting Started with React Native》



