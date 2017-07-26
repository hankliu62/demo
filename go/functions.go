package main

import (
	"fmt"
)

// go语言的核心为函数

// go语言中的函数需要明确返回值（return），不会自动将最后一行的表达式当做返回值
// 当函数存在明确声明返回值时，需要在形参圆括号的后面声明返回值的类型
func plus(a int, b int) int {
	return a + b
}

func main() {
	// 使用name(args)来调用一个函数
	res := plus(2, 5)
	fmt.Println("plus: ", res)
}
