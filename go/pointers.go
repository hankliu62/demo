package main

import (
	"fmt"
)

func zeroval(ival int) {
	ival = 0
}

// 存在一个*int参数，表示iptr是一个指针， 在函数体内可以通过*iptr来引用指针，从内存地址中获得这个地址对应的值
// 使用*iptr对这个值进行赋值操作后，改变了引用指针真实地址的值
func zeroptr(iptr *int) {
	*iptr = 0
}

// go支持指针，允许程序通过引用传递值或者数据结构
func main() {
	i := 1
	fmt.Println("initail: ", i)

	zeroval(i)
	fmt.Println("zeroval: ", i)

	// 通过&i来获取i变量的内存地址
	zeroptr(&i)
	fmt.Println("zeroptr: ", i)

	fmt.Println("pointer: ", &i)
}
