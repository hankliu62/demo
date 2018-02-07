package main

import (
	"fmt"
)

// slice是go语言中关键的数据类型，是一种比数组更加强大的数据接口
// 与array最直观的区别是：slice的长度是可变的，而array的长度是固定的
func main() {
	// 使用make函数来创建一个制定类型的初始个数的slice
	s := make([]string, 3)
	fmt.Println("emp: ", s)
	// 跟array类似，可以使用len函数来获取slice的个数
	fmt.Println("len: ", len(s))

	// 使用slice[index] = value来给指定的位置赋值
	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set: ", s)
	fmt.Println("get: ", s[1])

	// 可以使用go的内置函数append给slice追加值，返回追加后新的slice的值,
	// append的第一个参数为需要追加的slice对象， 第二个参数是可变参数，可以追加一个或者多个元素值
	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("apd: ", s)

	// slice也可以被拷贝，需要使用go语言的内置函数copy
	cs := make([]string, len(s))
	copy(cs, s)
	fmt.Println("cs: ", cs)

	// slice支持使用slice[low:high]语法从原slice是拷贝返回指定位置的子slice对象
	// 包前不包后，low或者high可以省略其中某一个，表示从开始位置到指定位置，或者从指定位置到结束位置
	l := s[2:5]
	fmt.Println("sl1: ", l)

	l = s[:5]
	fmt.Println("sl2: ", l)

	l = s[2:]
	fmt.Println("sl3: ", l)

	// slice也可以组成多维切片结构，跟多维数组不同的是，内部的slice的长度可以不同
	twoD := make([][]int, 3)
	length := len(twoD)

	for i := 0; i < length; i++ {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			twoD[i][j] = i + j
		}
	}

	fmt.Println("2d: ", twoD)

	// 结束大于数组的长度
	arr := []int{1, 2, 3, 4, 5}
	fmt.Println("sub slice: ", arr[0:10])
}
