package main

import (
	"fmt"
)

// map是go语言中的关联数据类型（在其他语言中可以称为哈希表或字典， 相当于javascript的object）
func main() {
	// 创建一个空的map，需要使用make(map[key-type]val-type)语法来创建
	m := make(map[string]int)

	fmt.Println("emp: ", m)

	// 使用语法map[key] = value来设置键值对
	m["k1"] = 62
	m["k2"] = 20
	fmt.Println("set: ", m)

	// 使用map[key]来获取某个key对应的值, 当某个key不存在map中时返回零值
	fmt.Println("get: ", m["k1"])
	fmt.Println("non-existent: ", m["k3"])

	// 同时也可以使用内置函数len来获得键值对的个数
	fmt.Println("len: ", len(m))

	// 使用内置的delete函数删除某个键值对
	delete(m, "k2")
	fmt.Println("set: ", m)

	// 当使用map[key]从map中取值时，可选的第二个返回值，表示该key是否存在于map中，布尔值，为true表示存在，为false表示不存在
	// 可以用来消除键不存在和键有零值像值为0或者“”产生的歧义
	_, prs := m["k2"]
	fmt.Println("prs: ", prs)

	// 声明和初始化一个map
	n := map[string]int{"foo": 62, "bar": 20}
	fmt.Println("map:", n)
}
