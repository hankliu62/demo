package main

import (
	"fmt"
)

// 可变参数函数，可以用任意数量的参数调用, fmt.Println就是一个可变参数函数

// 可以使用任意数量的int类型的值当做参数
func sum(nums ...int) int {
	fmt.Println("args: ", nums)

	total := 0
	for _, num := range nums {
		total += num
	}

	return total
}

func main() {
	// 可变参数函数的调用与常规函数的调用是一致的，除了参数的数量是可变的之外
	sum1 := sum(1, 2)
	fmt.Println("sum1: ", sum1)

	sum2 := sum(2, 3, 4)
	fmt.Println("sum2: ", sum2)

	nums := []int{1, 2, 3, 4, 5}
	// 展开操作符...
	sum3 := sum(nums...)
	fmt.Println("sum3: ", sum3)
}
