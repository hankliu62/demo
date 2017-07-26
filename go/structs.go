package main

import (
	"fmt"
)

// 声明了一个person的结构体， 存在string类型的name和int类型的age字段
type person struct {
	name string
	age  int
}

// go中的结构体是各个类型字段的集合，在组织数据时非常有用
func main() {

	// 创建一个结构体元素
	bob := person{"Bob", 20}
	fmt.Println("Bob: ", bob)

	// 初始化结构体时指定字段的名称, 指定字段名称时，字段的key不需要使用字符串包裹
	alice := person{name: "Alice", age: 20}
	fmt.Println("Alice: ", alice)

	// 初始化结构体时可以省略某些字段，省略的字段将会初始化为零值
	fred := person{name: "Fred"}
	fmt.Println("Fred: ", fred)

	// 使用&操作符可以获得结构体指针
	ann := person{name: "ann", age: 18}
	fmt.Println("&ann: ", &ann)

	// 使用点操作符来访问结构体中的字段
	fmt.Println("ann.name: ", ann.name)

	// 可以对结构体指针使用点操作符，指针会自动解引用
	annptr := &ann
	fmt.Println("annptr.age: ", annptr.age)

	// 结构体中的字段值是可变的
	annptr.age = 19
	fmt.Println("annptr.age: ", annptr.age)
}
