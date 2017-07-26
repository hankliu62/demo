package main

import (
	"fmt"
)

// go支持递归
func fact(num int) int {
	if num == 0 {
		return 1
	}

	return num * fact(num-1)
}

func main() {
	fmt.Println(fact(7))
	fmt.Println(fact(10))
	fmt.Println(fact(0))
	fmt.Println(fact(0))
}
