package main

import (
	"fmt"
	"time"
)

// 通道同步： 使用通道来同步Go协程的执行状态，一个使用阻塞的接收方式来等待协程的运行结束

// 下面是一个运行在Go协程中的函数，其中参数done通道将用于通知其他Go协程这个函数已经工作完毕
func worker(done chan bool) {
	fmt.Print("working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	done <- true
}

func main() {
	done := make(chan bool, 1)

	// 运行一个Go协程，传入通知通道
	go worker(done)

	// 程序在接收到通道中的worker发出通知前一直会阻塞，如果移除下面这行代码，程序可能在worker还没有执行的时候就已经结束了
	<-done

	fmt.Println("after worker done")
}
