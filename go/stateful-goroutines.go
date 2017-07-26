package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)

// 共享state多协程同步访问解决方案二：
// Go状态协议： 使用内置的Go协程和通道的同步特性来实现，基于通道方法和Go通过通讯和每个Go协程通过通讯来共享内存，确保每块数据为单独的协程所有

// 共享的内存state将被一个单独的Go协程所拥有，这能够确保数据在并行的读取下不会混乱。
// 为了对内存state进行读取和写入的操作，其他协程将会发送数据到拥有state的Go协程，然后接收对应的读写操作的回应
type readOp struct {
	key  int
	resp chan int
}

type writeOp struct {
	key  int
	val  int
	resp chan bool
}

func main() {
	var ops int64

	// reads和writes将用来发布对state的读去和写入操作的请求
	reads := make(chan *readOp)
	writes := make(chan *writeOp)

	go func() {
		var state = make(map[int]int)

		// 这个Go协程反应到达的请求，返回请求的结果到到请求协程数据的resp属性通道中
		for {
			select {
			case read := <-reads:
				read.resp <- state[read.key]
			case write := <-writes:
				state[write.key] = write.val
				write.resp <- true
			}
		}
	}()

	for r := 0; r < 100; r++ {
		go func() {
			for {
				read := &readOp{
					key:  rand.Intn(5),
					resp: make(chan int)}

				reads <- read
				fmt.Println("get map value: ", <-read.resp)
				atomic.AddInt64(&ops, 1)
			}
		}()
	}

	for w := 0; w < 100; w++ {
		go func() {
			for {
				write := &writeOp{
					key:  rand.Intn(5),
					val:  rand.Intn(100),
					resp: make(chan bool)}

				writes <- write
				atomic.AddInt64(&ops, 1)

				if v := <-write.resp; v {
					fmt.Println("set map value: ", write.val)
				}
			}
		}()
	}

	time.Sleep(time.Second)

	opsFinal := atomic.LoadInt64(&ops)
	fmt.Println("ops: ", opsFinal)
}
