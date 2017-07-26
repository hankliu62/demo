package main

import (
	"fmt"
	"math/rand"
	"runtime"
	"sync"
	"sync/atomic"
	"time"
)

// 共享state多协程同步访问解决方案一：
// 互斥锁: go mutex是互斥锁，只有Lock和Unlock两个方法，在这两个方法之间的代码不能被多个goroutins同时调用到。
// 用互斥锁进行了明确的锁定来让共享的state跨多个Go协程同步访问。

func main() {
	var state = make(map[int]int)

	// mutex 将同步对state的访问
	var mutex = &sync.Mutex{}

	var ops int64

	// 运行 100 个 Go 协程来重复读取 state。
	for r := 0; r < 100; r++ {
		go func(ra int) func() {
			total := 0
			return func() {
				for {
					key := rand.Intn(5)
					// 使用mutex.Lock()来确保对state的独占访问
					mutex.Lock()
					total += state[key]
					mutex.Unlock()
					// fmt.Println("total", ra, ": ", total)
					atomic.AddInt64(&ops, 1)

					// 为了确保Go协程不会在调度用饿死，每次调用后使用runtime.Gosched()来进行释放, 这个释放一般是自动处理
					runtime.Gosched()
				}
			}
		}(r)()
	}

	for w := 0; w < 10; w++ {
		go func() {
			for {
				key := rand.Intn(5)
				value := rand.Intn(100)
				mutex.Lock()
				state[key] = value
				mutex.Unlock()
				atomic.AddInt64(&ops, 1)

				runtime.Gosched()
			}
		}()
	}

	time.Sleep(time.Second)

	opsFinal := atomic.LoadInt64(&ops)
	fmt.Println("ops: ", opsFinal)

	// 最后对state访问时也需要使用Lock()操作
	mutex.Lock()
	fmt.Println("state: ", state)
	mutex.Unlock()
}
