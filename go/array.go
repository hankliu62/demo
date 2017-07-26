package main

import (
	"fmt"
)

// go语言中数组是一个固定长度的序列
func main() {
	// 创建一个数组用来存放指定个数和类型的元素，数组的默认为零值
	var a [5]int
	fmt.Println(a)

	// 可以使用array[index] = value来赋值，同时也可以使用array[index]来获取制定位置的值
	a[4] = 100
	fmt.Println("set: ", a)
	fmt.Println("get: ", a[4])

	// 可以使用go的内置函数len来获取数组的长度
	fmt.Println("len: ", len(a))

	// 在声明的同时给数组赋上初始值， 当数组声明的个数要大于初始值的个数时，后面的位置依次为零值，反之，编译出错
	// 初始值的个数必须少于数组声明的个数
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl: ", b)

	// 数组存储的类型是单一的，可以组合数据来构造多维数组的数据结构
	var twoD [2][3]int
	for i := 0; i < len(twoD); i++ {
		for j := 0; j < len(twoD[i]); j++ {
			twoD[i][j] = i + j
		}
	}

	fmt.Println("2d: ", twoD)
}
