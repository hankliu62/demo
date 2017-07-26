package main

import (
	"errors"
	"fmt"
)

// Go语言使用一个明确的独立的返回值来传递错误信息，这与使用异常的Java和在C语言中经常见到的超重的单返回值/错误值相比，Go语言的处理方式能清楚的知道哪个函数返回了错误，并能像调用那些没有出错的函数一样调用。

// 依照惯例，错误通常是最后一个返回值，并且是error类型（内建的接口）
func f1(arg int) (int, error) {
	if arg == 38 {
		// 使用errors.New创建一个给定错误信息的error类型值
		return -1, errors.New("can't work with 38")
	}

	// 返回错误值为nil时表示没有错误
	return arg + 3, nil
}

type myError struct {
	arg  int
	prob string
}

// 通过实现Error方法来自定义error类型
func (e myError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.prob)
}

func f2(arg int) (int, error) {
	if arg == 38 {
		return -1, &myError{arg: arg, prob: "can't work with 38"}
	}

	return arg + 3, nil
}

func main() {
	for _, i := range []int{4, 8, 38} {
		if r, e := f1(i); e == nil {
			fmt.Println("f1 worked(r): ", r)
			fmt.Println("f1 worked(e): ", e)
		} else {
			fmt.Println("f1 failed(r): ", r)
			fmt.Println("f1 failed(e): ", e)
		}
	}

	_, e := f2(38)
	fmt.Println("f2 e: ", e)
	// Java当中有instanceof这样的关键字判断类型 Go当中自然也有相应的方法来判断类型(类型断言: Comma-ok断言)
	// 语法value, ok := em.(T)
	// em代表要判断的变量， em必须为initerface类型才可以进行类型断言
	// T代表被判断的类型
	// value代表返回的值
	// ok代表是否为改类型

	// 你如果想在程序中使用一个自定义错误类型中的数据，你需要通过类型断言来得到这个错误类型的实例。
	// 跟map的属性断言类似: _, prs := map[key], 其中prs能够判断key属性是否存在map中
	me, ok := e.(*myError)
	fmt.Println("f2 e me: ", me)
	fmt.Println("f2 e ok: ", ok)
	if me, ok := e.(*myError); ok {
		fmt.Println("f2 me.arg: ", me.arg)
		fmt.Println("f2 me.prob: ", me.prob)
	}

	_, e2 := f2(30)
	fmt.Println("f2 e2: ", e2)
	me2, ok2 := e2.(*myError)
	fmt.Println("f2 e2 me2: ", me2)
	fmt.Println("f2 e2 ok2: ", ok2)
	if me, ok := e2.(*myError); ok {
		fmt.Println("f2 me.arg: ", me.arg)
		fmt.Println("f2 me.prob: ", me.prob)
	}
}
