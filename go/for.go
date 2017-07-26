package main

import (
	"fmt"
)

// for是go语言中唯一的循环结构
func main() {

	// 带单个循环条件
	i := 1
	for i <= 3 {
		fmt.Println(i)
		i = i + 1
	}

	// 初始化;条件；后续形式的for循环
	for j := 6; j <= 8; j++ {
		fmt.Println(j)
	}

	// 不带条件的for循环，相当于无限循环，除非遇到break语句、return语句（抛出异常？）
	for {
		fmt.Println("loop")
		break
	}
}
