package main

import (
	"fmt"
)

// go语言中使用if-else语句来作为分支语句
func main() {
	// if-else语句中条件的圆括号可以省略，花括号不能省略
	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}

	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}

	// 在条件语句之前可以有一个语句，在这个语句中声明的变量可以在所有的条件分支中访问
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}
}

// go语言没有三目运算符，所有条件语句都是使用if-else来完成
