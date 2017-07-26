package main

import (
	"fmt"
	"time"
)

// 打点器： 在固定时间间隔内重复的运行Go代码
// 语法: ticker = time.NewTicker(time.Seconde( * n)?)
// 打点器与定时器一样可以被停止，也是调用打点器的Stop()方法
// 停止打点器的语法： ticker.Stop()
// 一般的使用for和range来迭代打点器通道中传递的值
func main() {
	ticker := time.NewTicker(time.Millisecond * 500)

	go func() {
		// 使用for和range迭代打点器通道的值
		for t := range ticker.C {
			fmt.Println("Tick at", t)
		}
	}()

	time.Sleep(time.Millisecond * 2100)
	// 停止打点器
	ticker.Stop()
	fmt.Println("Ticker stopped")
}
