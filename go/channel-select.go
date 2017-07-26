package main

import (
	"fmt"
	"time"
)

// 通道选择器： 同时等待多个通道操作，Go语言中协程、通道和通道选择器结合是Go中的一个强大的特性

func one(c chan<- string) {
	time.Sleep(time.Second * 1)
	c <- "one"
}

func two(c chan<- string) {
	time.Sleep(time.Second * 2)
	c <- "two"
}

func main() {
	c1 := make(chan string, 1)
	c2 := make(chan string, 1)

	go one(c1)
	go two(c2)

	now1 := time.Now().Second()
	// 各个通道在若干时间后接收一个值，下面例子用来模拟并行的Go协程中阻塞的RPC操作
	for i := 0; i < 2; i++ {
		// 使用select关键字来同时等待两个值，并打印通道接收到的数据
		select {
		case msg1 := <-c1:
			fmt.Println("received: ", msg1)
		case msg2 := <-c2:
			fmt.Println("received: ", msg2)
		}
	}
	now2 := time.Now().Second()
	// 第一次和第二次Sleep是并发执行，总共运行的时间为两秒左右
	fmt.Println("now2 - now1 = ", now2-now1, now1, now2)

	go one(c1)
	go two(c2)
	now3 := time.Now().Second()
	msg3 := <-c1
	msg4 := <-c2
	now4 := time.Now().Second()

	fmt.Println("received: ", msg3)
	fmt.Println("received: ", msg4)
	fmt.Println("now4 - now3 = ", now4-now3, now3, now4)
}
