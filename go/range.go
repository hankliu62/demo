package main

import (
	"fmt"
)

// go语言中使用range来迭代各种各样的数据结构（目前已知的可迭代的结构： array，slice，map）
// 一般配合for一起使用
func main() {
	// range在数组和slice中迭代时，每次迭代都会提供每一项的索引和值（第一个返回值为索引，第二个返回值为该项的值）
	// 当我们不需要索引时，我们可以使用 *空值定义符(_)* 来忽略它
	nums := []int{1, 2, 3}
	sum := 0
	for _, num := range nums {
		sum += num
	}
	fmt.Println("sum: ", sum)

	for i, num := range nums {
		if num%3 == 0 {
			fmt.Println("index: ", i)
		}
	}

	// 使用range来迭代map中的键值对
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	// range在字符串中迭代unicode编码，第一个返回值是每一个迭代字符的位置，第二个返回值为字符的unicode编码
	for i, c := range "go" {
		fmt.Println(i, c)
	}
}
