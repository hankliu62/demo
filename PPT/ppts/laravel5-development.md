title: 初识Laravel 5.0
speaker: Tony Zheng
url: https://github.com/frontnode
transition: slide

[slide]

# 初识Laravel 5.0

# ![Laravel 5.0](http://image.golaravel.com/5/ff/ccd6322336f7401d95c963a1b4e0b.png "Laravel")

<small>演讲者：[@Tony Zheng](https://github.com/zhengjinxin)</small>

[slide]

![frontnode](https://avatars1.githubusercontent.com/u/7091908 "frontnode") {:&.flexbox.vcenter}

微博：frontnode

QQ： 2080432723

邮箱： frontnode@126.com

开源地址： https://github.com/frontnode

> Web开发，流程改进，最佳实践，性能优化

[slide]
## Laravel - The PHP Framework For Web Artisans

* Laravel是一套web应用开发框架，它具有富于表达性且简洁的语法。我们相信，开发过程应该是愉悦、创造性的体验。Laravel努力剔除开发过程中的痛苦，因此我们提供了验证（authentication）、路由（routing）、session和缓存（caching）等开发过程中经常用到的工具或功能。

* Laravel的目标是给开发者创造一个愉快的开发过程，并且不牺牲应用的功能性。快乐的开发者才能创造最棒的代码！为了这个目的，我们博取众框架之长处集中到Laravel中，这些框架甚至是基于Ruby on Rails、ASP.NET MVC、和Sinatra等开发语言或工具的。

* Laravel是易于理解并且强大的，它提供了强大的工具用以开发大型、健壮的应用。杰出的IoC、数据库迁移工具和紧密集成的单元测试支持，这些工具赋予你构建任何应用的能力。

* 创建者:[Taylor Otwell](https://github.com/taylorotwell)

[slide]

## 环境需求

* PHP 版本 >= 5.4
* Mcrypt PHP 扩展
* OpenSSL PHP 扩展
* Mbstring PHP 扩展
* Tokenizer PHP 扩展
* 在 PHP 5.5 之后， 有些操作系统需要手动安装 PHP JSON 扩展包。如果你是使用 Ubuntu，可以通过 apt-get install php5-json 来进行安装。

[slide]

## 基于Composer管理器

* Composer 是一套帮你管理第三方扩展包的工具。能够让你迅速在 Packagist 中找到需要的扩展包。

[slide]

## 应用程序结构

```php
├── app
│   ├── Commands
│   ├── Console
│   ├── Events
│   ├── Exceptions
│   ├── Handlers
│   ├── Http
│   ├── Providers
│   └── Services
├── bootstrap
├── config
├── database
│   ├── migrations
│   └── seeds
├── public
├── resources
├── storage
├── tests
└── vendor
```
[slide]

## RESTful 路由

* 通过简单的闭包就能响应HTTP请求。帮你快速开始构建非凡的应用。

```php

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

```

[slide]

## 优雅的模版引擎(1)

* PHP代码或轻量级的Blade模版引擎都可无缝融合。Blade模版可以继承，并且拥有极快的解析速度。
* Blade 是 Laravel 所提供的一个简单却又非常强大的模板引擎。不像控制器页面布局，Blade 是使用 模板继承(template inheritance) 和 区块(sections)。所有的 Blade 模板后缀名都要命名为 .blade.php

[slide]

## 优雅的模版引擎(2)

* [语法](http://my.oschina.net/whsheng/blog/324456)

```php

@extends('app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Home</div>

                <div class="panel-body">
                    You are logged in!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

```

[slide]

## 迁移

* 建立迁移文件
 * 使用 Artisan CLI 的 make:migrate 命令建立迁移文件：
 ```php
php artisan make:migration create_pages_table
```

* 执行迁移
```php
php artisan migrate
```

* 回滚迁移
 * 回滚上一次的迁移
 ```php
php artisan migrate:rollback
 ```

 *回滚所有迁移
```php
php artisan migrate:reset
```
[slide] Facades

* [Facades](http://www.cnblogs.com/wzh206/archive/2010/03/21/1691112.html)

* Facades 提供一个静态接口给在应用程序的 服务容器 中可以取用的类。Laravel 附带许多 facades，甚至你可能已经在不知情的状况下使用过它们！Laravel 的「facades」作为在 IoC 容器里面的基础类的静态代理，提供的语法有简洁、易表达的优点，同时维持比传统的静态方法更高的可测试性和弹性。

* 在 Laravel 应用程序的环境中，facade 是个提供从容器访问对象的类。Facade 类是让这个机制可以运作的原因。Laravel 的 facades 和你建立的任何自定义 facades，将会继承基本的 Facade 类。

你的 facade 类只需要去实现一个方法：getFacadeAccessor。getFacadeAccessor 方法的工作是定义要从容器解析什么。基本的 Facade 类利用 __callStatic() 魔术方法来从你的 facade 调用到解析出来的对象。

所以当你对 facade 调用，例如 Cache::get，Laravel 从 IoC 容器解析缓存管理类出来，并对该类调用 get 方法。用专业口吻来说，Laravel Facades 是使用 Laravel IoC 容器作为服务定位器的便捷语法。

[slide]

## 数据填充(1)

* Laravel 可以简单的使用 seed 类，填充测试数据到数据库。所有的 seed 类放在 database/seeds 目录下。可以使用任何你想要的类名称，但是应该遵守某些大小写规范，如 UserTableSeeder 之类。默认已经有一个 DatabaseSeeder 类。在这个类里，使用 call 方法执行其他的 seed 类，让你控制填充的顺序。

[slide]

## 数据填充(2)
```php
class DatabaseSeeder extends Seeder {

    public function run()
    {
        $this->call('UserTableSeeder');

        $this->command->info('User table seeded!');
    }

}

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create(array('email' => 'foo@bar.com'));
    }

}
```

* 执行数据填充，使用 Artisan CLI 的 db:seed 命令：
```php
php artisan db:seed
```

* 默认 db:seed 命令会执行 DatabaseSeeder，可以使用它来调用其他 seed 类，不过，也可以使用 --class 参数指定要单独执行的类：
```php
php artisan db:seed --class=UserTableSeeder
```

[slide]

## 邮件和队列(1)

* Laravel 基于热门的 SwiftMailer 函数库之上，提供了一个简洁的 API。邮件配置文件为 config/mail.php，包含若干选项，让您可以更改 SMTP 主机、连接端口、凭证，也可以让您对函数库发送出去的所有消息配置全局的 from 地址。您可使用任何您想要的 SMTP 服务器。如果想使用 PHP mail 函数来发送邮件，您可以将配置文件中的 driver 更改为 mail。您也可以使用 sendmail 驱动器。

```php
Mail::send('emails.welcome', array('words' => 'hello world'), function($message)
{
    $message->to('bravemantonyzheng@126.com', 'Tony Zheng')->subject('Welcome!');
});
```

[slide]

## 邮件和队列(2)

* 发送电子邮件消息会大幅延长应用程序的响应时间，因此许多开发者选择将邮件消息加入队列并于后台发送。 Laravel 使用内置 统一的 queue API ，让您轻松地完成此工作。要将邮件消息加入队列，只要使用 Mail 类的 queue 方法：
```php
Mail::queue('emails.welcome', array('words' => 'hello world'), function($message)
{
    $message->to('bravemantonyzheng@126.com', 'Tony Zheng')->subject('Welcome!');
});
```

[slide]

## 邮件和队列(3)

* 队列中还可以放job, 应用程序中能够放进队列的工作都存放在 App\Commands 目录下，你可以借由下面 Artisan 命令产生一个可使用队列的命令：

```php
php artisan make:command SendEmail --queued

Queue::push(new SendEmail($message)); // 默认default队列

Queue::pushOn('emails', new SendEmail($message)); // 特定队列

```

[slide]

## 辅助方法

* array_add 如果给定的键不在数组中，array_add 函数会把给定的键值对加到数组中。

```php
$array = array('foo' => 'bar');

$array = array_add($array, 'key', 'value');
```

* array_divide array_divide 函数返回两个数组，一个包含原本数组的键，另一个包含原本数组的值。

```php
$array = array('foo' => 'bar');

list($keys, $values) = array_divide($array);
```

* [and so on](http://www.golaravel.com/laravel/docs/5.0/helpers/)

[slide]

## 好书推荐

php核心技术与最佳实践