package main

import (
	"fmt"
)

// go通过闭包来使用匿名函数，定义一个不需要命名的内联函数时使用匿名函数

func intSeq() func() int {
	count := 0

	return func() int {
		count++
		return count
	}
}

func main() {
	nextInt := intSeq()

	fmt.Println(nextInt())
	fmt.Println(nextInt())
	fmt.Println(nextInt())

	newInt := intSeq()
	fmt.Println(newInt())
}
