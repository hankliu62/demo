package main

import (
	"fmt"
	"time"
)

// Go语言需要在后面某个时刻执行Go代码，或者在在某段时间间隔内重复运行Go代码
// Go内置了定时器和打点器的特性，专用于实现上述特性
// 定时器表示在未来的某一时刻的独立事件。告诉定时器需要等待的时间，提供一个用于通知的通道
// 语法： timer := time.NewTimer(time.Second( * n)?)
// 定时器不仅仅是单独等待到某个时刻后执行，我们还可以取消该定时器。在定时器自动失效之前我们可以取消该定时器
// 取消定时器语法: timer.Stop()
// 如果只是等待到某个时刻执行，我们可以使用time.Sleep来代替
func main() {
  // 提问： 定时器等到开始时间的计算是在创建定时器的时候，还是在运行时间器接收通道代码的时候？
	timer1 := time.NewTimer(time.Second * 2)

	// timer1.C通道接收到的数据为当前的时间
	// <-timer1.C知道定时器的通道C发送了定时器失效值之前，会一直阻塞
	fmt.Println("timer1.C: ", <-timer1.C)
	fmt.Println("Timer 1 expired")

	timer2 := time.NewTimer(time.Second)
	// done := make(chan bool)

	go func() {
		<-timer2.C
		fmt.Println("Timer 2 expired")

		// done <- true
	}()

	// stop := <-done
	stop := timer2.Stop()

	if stop {
		fmt.Println("Timer 2 Stop")
	}
}
