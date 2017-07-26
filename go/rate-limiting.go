package main

import (
	"fmt"
	"time"
)

// 速率限制： 是一个重要的控制服务资源的利用和质量的途径， Go语言通过Go协程、通道和打点器很好的支持了速率限制功能

func main() {
	// 基本的速率限制，假设想限制接收请求的处理，将请求发送给相同的通道
	requests := make(chan int, 5)

	for i := 1; i <= 5; i++ {
		requests <- i
	}
	close(requests)

	// limiter就是速率限制任务中的管理器，limiter通道每1s接收一个值
	limiter := time.Tick(time.Millisecond * 1000)

	// 通过每次请求前阻塞limiter通道的接收，从而限制请求每1s发送一次
	for req := range requests {
		rateTime := <-limiter
		fmt.Println("request", req, rateTime)
	}

	// 临时进行速率限制，并且不影响整体的速率， burstyLimiter通道用来进行3次临时的脉冲型速率限制
	burstyLimiter := make(chan time.Time, 3)
	// 将通道填充需要临时改变3次的值，做好准备。
	for i := 1; i <= 3; i++ {
		now := time.Now()
		burstyLimiter <- now
	}

	// 每1s我们将添加一个新的值到 burstyLimiter中，直到达到 3 个的限制。
	go func() {
		for t := range time.Tick(time.Millisecond * 1000) {
			burstyLimiter <- t
		}
	}()

	// 提问： 为什么只有3个容量的缓存通道，可以在Go协程中设置超过该容量的值
	// time.Sleep(time.Second * 2)

	burstyRequests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		burstyRequests <- i
	}
	close(burstyRequests)

	// 由于前面3个通道数据，早已经缓存在burstyLimiter通道中，所以会连续运行3次，以后是每1s执行1次
	for req := range burstyRequests {
		rateTime := <-burstyLimiter
		fmt.Println("burstyRequests", req, rateTime)
	}
	close(burstyLimiter)
}
