package main

import (
	"fmt"
	"sort"
)

// 函数自定义排序: 对于自定义类型的排序，需要实现sort的接口，也就是说需要实现Len() int，Swap(i, j int)和Less(i, j int) bool这三个方法
// 创建一个内置[]string类型的别名的ByLength的类型

// ByLength attaches methods of interface to []string
type ByLength []string

// 在别名的类型中我们需要实现sort.interface接口的Len,Swap和Less方法，这样我们就可以使用sort包中的Sort方法进行自定义排序
// Less方法控制自定义排序的逻辑
func (s ByLength) Len() int {
	return len(s)
}

func (s ByLength) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

func (s ByLength) Less(i, j int) bool {
	return len(s[i]) < len(s[j])
}

func main() {
	fruits := []string{"peach", "banana", "kiwi"}
	// 将原始的fruits切片装换成ByLength来进行自定义排序
	sort.Sort(ByLength(fruits))
	fmt.Println("Sorted fruits: ", fruits)
}
