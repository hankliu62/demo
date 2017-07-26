package main

import (
	"fmt"
)

// 通道: 连接多个Go协程的管道，不同协程之间通讯的桥梁
// 在某个Go协程中将值发送到通道，在其他Go协程中来接受该值
// 语法: make(chan val-type): 创建一个通道，通道类型就是需要传递值的类型
// 发送一个值到通道中语法： channels <- value
// 从通道中获取某个值语法： <-channels
func main() {
	channels := make(chan string)

	go func() {
		fmt.Println("goroutines")
		// 发送值到通道中
		channels <- "some ping: first"
		channels <- "some ping: second"
	}()

	fmt.Println("direct: before goroutines")

	// 接受通道中的值
	msg := <-channels

	fmt.Println("direct: after first revice channels message")

	fmt.Println("first ping channels: ", msg)

	go func() {
		fmt.Println("goroutines2")
		channels <- "ohter ping: first"
		channels <- "ohter ping: second"
	}()

	// 简单测试发现规律： 不权威
	// 对于同一个Go协程中发送的数据来说，针对同一个Go协程中的数据，通道信息的接收规则是先进先出（队列）
	// 对于不同Go协程中发送的数据来说，针对不同个Go协程中的数据，通道信息的接收时的规则是先进后出（栈）
	// 对与不同协程发送的数据来说，只有等某个协程中发送的数据全部接收完才会接收下一个协程中的数据
	msg2 := <-channels
	fmt.Println("direct: after second revice channels message")

	fmt.Println("second ping channels: ", msg2)

	msg3 := <-channels

	fmt.Println("three ping channels: ", msg3)

	// 默认发送和接收操作是阻塞的，直到发送方和接收方都准备完毕。
	fmt.Println("done")
}
