package main

import (
	"fmt"
)

func f(from string) {
	for i := 0; i < 10; i++ {
		fmt.Println(from, " : ", i)
	}
}

// Go协程(goruntine)在执行上来说是轻量级的线程， go运行是以异步的方式来运行协程

func main() {
	// 一般的函数调用是同步进行的
	f("direct")

	// 当使用go f(s)时，将会在协程中中调用这个函数，这个新的go协程将会并行的执行该函数的调用
	// 相当于以异步的方式来调用该函数
	go f("goroutine")

	go func(msg string) {
		fmt.Println("inner func: ", msg)
	}("going")

	// 这两个go协程在独立的协程中异步执行，我们需要等他们执行结束， fmt.Scanln需要我们退出时按下任意键结束
	f("direct2")
	var input string
	fmt.Scanln(&input)
	fmt.Println("done")
}
