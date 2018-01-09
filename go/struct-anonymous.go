package main

import (
	"fmt"
)

// Human human struct
type Human struct {
	name   string
	age    int
	weight int
}

// Student student struct
type Student struct {
	Human      // 匿名字段，那么默认Student就包含了Human的所有字段
	speciality string
}

// Employee 与Human就有相同的属性name
type Employee struct {
	Human      // 匿名字段Human
	speciality string
	name       string // 雇员的phone字段
}

func main() {
	// 我们初始化一个学生
	mark := Student{Human{"Mark", 25, 120}, "Computer Science"}

	// 我们访问相应的字段
	fmt.Println("His name is ", mark.name)
	fmt.Println("His age is ", mark.age)
	fmt.Println("His weight is ", mark.weight)
	fmt.Println("His speciality is ", mark.speciality)
	// 修改对应的备注信息
	mark.speciality = "AI"
	fmt.Println("Mark changed his speciality")
	fmt.Println("His speciality is ", mark.speciality)
	// 修改他的年龄信息
	fmt.Println("Mark become old")
	mark.age = 46
	fmt.Println("His age is", mark.age)
	// 修改他的体重信息
	fmt.Println("Mark is not an athlet anymore")
	mark.weight += 60
	fmt.Println("His weight is", mark.weight)

	/**
	 * 相当于定义了一个
	 * type Student struct {
	 *   Human Human      // 匿名字段，那么默认Student就包含了Human的所有字段
	 *   speciality string
	 * }
	 * 所以初始化时不能写出 `Student{name: "hank", age: 18, weight: 100, speciality: "Computer Science"}`
	 * 但是访问的时候却可以通过`Student.name`直接访问，也可以通过`Student.Human.name`进行访问
	 */
	hank := Student{Human: Human{name: "hank", age: 18, weight: 100}, speciality: "Computer Science"}

	// 我们访问相应的字段
	fmt.Println("His name is ", hank.name)
	fmt.Println("His age is ", hank.age)
	fmt.Println("His weight is ", hank.weight)
	fmt.Println("His speciality is ", hank.speciality)

	hank.name = "hankliu"

	fmt.Println("His name is ", hank.Human.name)

	bob := Employee{Human: Human{"Bob", 34, 150}, speciality: "Designer"}
	fmt.Println("Bob's work name is:", bob.name) // 即使Employee中name字段不存在值，通过Employee.name访问的也是Employee中的name的值，而不是Human中的name的值
	// 如果我们要访问Human的phone字段
	fmt.Println("Bob's personal name is:", bob.Human.name)
}
