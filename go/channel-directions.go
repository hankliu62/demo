package main

import (
	"fmt"
)

// 通道方向： 当通道作为函数的参数时，可以指定通道是不是只用来接收或者发送值
// 提升程序的安全性

// ping函数定义一个只允许发送数据的通道pings，如果在函数中使用pings通道接收数据，会得到一个编译错误
func ping(pings chan<- string, msg string) {
	pings <- msg
	// fmt.Println(<-pings) // ./channel-directions.go:12: invalid operation: <-pings (receive from send-only type chan<- string)
}

// pong函数允许使用pings通道来接收数据，使用pongs通道来发送数据
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

func main() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "passed message")
	pong(pings, pongs)

	fmt.Println(<-pongs)
}
