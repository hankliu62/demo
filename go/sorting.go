package main

import (
	"fmt"
	"sort"
)

// Go中的sort包含了内置和用户自定义类型的排序功能
func main() {
	// 破坏性
	strs := []string{"banana", "apple", "orange"}
	sort.Strings(strs)
	fmt.Println("Sorted strings: ", strs)

	ints := []int{4, 3, 9, 5}
	sort.Ints(ints)
	fmt.Println("Sorted ints: ", ints)

	// 使用sort来判断一个序列是否已经排序好, 该方法是只是单纯的判断列表中的数据是否已经是排序好的，而不是判断该列表是否已经调用了sort的排序方法
	s := sort.StringsAreSorted(strs)
	fmt.Println("Is sorted strs: ", s)

	fmt.Println("Is sorted for new slic: ", sort.IntsAreSorted([]int{1, 2, 3, 4}))
}
