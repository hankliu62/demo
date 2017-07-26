package main

import (
	"fmt"
)

// 非阻塞式的通道操作：常规的通道发送和接收数据是阻塞式的， 我们可以使用带default分支的select语句来非阻塞的发送和接收
// 甚至可以是非阻塞的多路select

func main() {
	messages := make(chan string)
	signals := make(chan bool)

	// 针对在下面这几种种情况，如果我们不是用带default的select语句来接收或发送通道数据，
	// 由于是messages和signals是非缓存通道，必须存在一个并行的通道接收方或者发送方，否则会编译出错
	select {
	case msg := <-messages:
		fmt.Println("received message: ", msg)
	default:
		fmt.Println("no message received")
	}

	msg := "hi"
	select {
	case messages <- msg:
		fmt.Println("send message: ", msg)
	default:
		fmt.Println("no message send")
	}

	// 在default分支前存在多个case分支，用来实现多路非阻塞的选择器
	select {
	case msg := <-messages:
		fmt.Println("received message: ", msg)
	case sig := <-signals:
		fmt.Println("received signal: ", sig)
	default:
		fmt.Println("no activity")
	}

}
