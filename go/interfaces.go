package main

import (
	"fmt"
	"math"
)

// go语言中的接口是方法特征的集合
// 下面定义了一个几何体的结构
type geometry interface {
	area() float64
	perim() float64
}

// 长方形结构体
type rect struct {
	width, height float64
}

// 圆结构体
type circle struct {
	radius float64
}

// 在go中实现一个接口，只需要实现该接口中的所有方法
// rect和circle结构体分别定义area和perim两个方法，相当于实现了geometry接口中的所有方法，所以说rect和circle结构体实现了geometry接口
func (r rect) area() float64 {
	return r.width * r.height
}

func (r rect) perim() float64 {
	return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}

func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

// 如果一个变量的类型是接口，我们可以通过这个变量调用这个被命名的接口中的方法
func measure(g geometry) {
	fmt.Println("g: ", g)
	fmt.Println("area: ", g.area())
	fmt.Println("perim: ", g.perim())
}

func main() {
	// 由于rect和circle结构体实现了geometry接口， 可以把他们的实例当做measure函数的参数
	r := rect{width: 10, height: 5}
	measure(r)

	c := circle{radius: 5}
	measure(c)
}
