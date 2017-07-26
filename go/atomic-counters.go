package main

import (
	"fmt"
	"runtime"
	"sync/atomic"
	"time"
)

func increment(ops *uint64) {
	for {
		atomic.AddUint64(ops, 1)

		runtime.Gosched()
	}
}

func main() {
	// 默认值为0, 所以不需要var ops uint64 = 0
	var ops uint64

	for i := 0; i < 50; i++ {
		go func() {
			for {
				atomic.AddUint64(&ops, 1)

				// runtime.Gosched()用于让协程让出CPU时间片
				runtime.Gosched()
			}
		}()

		// go increment(&ops)
	}

	time.Sleep(time.Second)

	opsFinal := atomic.LoadUint64(&ops)

	fmt.Println("ops: ", opsFinal, ops)

	// 提问： main()函数运行完后，其相关的Go协程是否还运行？
}
