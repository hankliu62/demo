package main

import (
	"fmt"
)

// 通道遍历： for和range为基本的数据结构提供了迭代的功能，在通道中也适用，我们可以使用上述结构获取通道中的值
// 值得注意的是，使用for和range迭代通道的值时，要保证该通道已经关闭。否则在迭代通道的所有值后时，这个循环会一直阻塞，等待通道中的下一个值
// 一个非空通道是可以被关闭的，通道中的剩下的值仍然可以接收，关闭通道只是意味着不能再向这个通道发送值了
func main() {
	channels := make(chan string, 2)

	channels <- "one"
	channels <- "two"

	close(channels) // 如果注释该句，编译出错：fatal error: all goroutines are asleep - deadlock!

	// <-channels

	for elem := range channels {
		fmt.Println("chan value: ", elem)
	}

	fmt.Println("I'm ran")
}
