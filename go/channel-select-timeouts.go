package main

import (
	"fmt"
	"time"
)

// 超时处理: 超时对于连接外部资源，或者其他一些需要花费执行时间的程序来说是非常重要的
// 得益于Go语言的通道和select, Go语言中实现超时是非常简单和优雅的

// 假设f1是一个连接外部资源的函数，并前在执行2s之后向通道返回执行结果
// 我们需要使用select语句来实现一个超时操作，需要使用通道传递结果。这对于一般情况是个好的方式，因为其他重要的Go特性是基于通道和select 的
func f1(c chan<- string) {
	time.Sleep(time.Second * 2)
	c <- "result 1"
}

func f2(c chan<- string) {
	time.Sleep(time.Second * 2)
	c <- "result 2"
}

func main() {
	c1 := make(chan string, 1)

	go f1(c1)

	// res := <-c1等待Go协程中运行f1函数的返回结果，
	// <-time.After(time.Second * 1)等待超时时间1s后发送的结果，由于select默认会处理第一个准备好的接收操作，这个f1执行时间超过1s的话会执行超时操作
	select {
	case res := <-c1:
		fmt.Println(res)
	case time1 := <-time.After(time.Second * 1):
		fmt.Println("timeout 1", time1)
	}

	c2 := make(chan string, 1)
	go f2(c2)

	select {
	case res := <-c2:
		fmt.Println(res)
	case time2 := <-time.After(time.Second * 3):
		fmt.Println("timeout 2", time2)
	}
}
