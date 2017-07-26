package main

import (
	"fmt"
)

type rect struct {
	width, height int
}

// area方法有一个接收器类型rect
// 可以为值类型或者指针类型的接收器定义方法
func (r *rect) area(width int) int {
	r.width = width
	return r.width * r.height
}

func (r rect) perim() int {
	r.width = 7
	return 2*r.width + 2*r.height
}

// go支持在结构体中定义方法

func main() {
	r := rect{width: 10, height: 5}

	rperim := r.perim()
	fmt.Println("perim: ", rperim)
	fmt.Println("r: ", r)

	rarea := r.area(6)
	fmt.Println("area: ", rarea)
	fmt.Println("r: ", r)

	rp := &r
	fmt.Println("perim:", rp.perim())
	fmt.Println("r: ", *rp)
	fmt.Println("area: ", rp.area(7))
	fmt.Println("r: ", *rp)
}
