package main

import (
	"fmt"
)

func vals() (int, int) {
	return 3, 7
}

// go内建多返回值支持,
func main() {
	// 使用多复制操作来获取多返回值
	a, b := vals()
	fmt.Println("a: ", a)
	fmt.Println("b: ", b)

	// 如果只想要返回值的其中一部分，可以使用 空值定义符（_）
	_, c := vals()

	fmt.Println("c: ", c)
}
