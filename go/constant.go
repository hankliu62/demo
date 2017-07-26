package main

import (
	"fmt"
	"math"
)

// 常量： 支持字符、字符串、布尔和数值常量
func main() {
	// 使用const来声明并初始化一个指定类型的常量
	// const语句可以出现在任何var语句可以出现的地方
	const s string = "constant"
	fmt.Println(s)

	// 与var声明变量一样，类型可以省略，自动识别常量的类型
	// 数值型常量没有特定的类型，直到该常量被赋予了一个数值
	const n = 500000000

	const d = 3e20 / n
	fmt.Println(d)

	fmt.Println(int64(d))

	fmt.Println(math.Sin(n))
}
