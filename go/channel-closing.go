package main

import (
	"fmt"
)

// 通道关闭： 关闭一个通道意味着不能向这个通道再发送值， 这个特性可以给通道的接收方传达通道工作已经完结的信息
// 语法: close(chan)
func main() {
	// 使用jobs通道来传递main()中的Go协程任务执行的结束信息（使用j来代替）到一个工作Go协程中，
	// 当我们没有多余的任务信息给这个工作Go协程时，将close这个jobs通道
	jobs := make(chan int, 5)
	done := make(chan bool)

	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				break
			}
		}
	}()

	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
	}

	close(jobs)

	fmt.Println("sent all jobs")

	<-done
}
