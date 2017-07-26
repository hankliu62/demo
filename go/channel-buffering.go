package main

import (
	"fmt"
)

// Go语言中默认的通道是无缓存的，只有在对应的接收通道(<-chan)准备好时才允许进行发送操作(chan <- value)
// 缓存通道： 可缓存通道允许在在没有对应接收方的时候，允许缓存限定数量的值
// 语法: make(chan val-type, count), count-- 可缓存信息的数量
func main() {
	// 创建一个可缓存通道，可缓存数量为2
	channels := make(chan string, 2)

	// 该通道是可缓存的，即使没有并发的接收方通道，也可以进行发送操作
	channels <- "buffered"
	channels <- "channel"
	// channels <- "three"

	fmt.Println(<-channels)
	fmt.Println(<-channels)
	// msg3 := <-channels
	// fmt.Println(msg3)
}
