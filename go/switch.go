package main

import (
	"fmt"
	"time"
)

// go语言中的switch语句
func main() {
	i := 2

	// 当条件与某个case相匹配时，只会执行该case分支，该case分支下面的其他分支都不会执行，
	// 也就是说，不需要使用break语句来防止执行多条分支
	fmt.Print("Write ", i, " as ")
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}

	// 可选的default分支
	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println(time.Now().Weekday(), "it's the weekend")
	default:
		fmt.Println(time.Now().Weekday(), "it's a weekday")
	}

	// 不带条件的的switch语句是实现if/else语句的另一种实现
	// case语句的条件可以为表达式
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("it's before noon")
	default:
		fmt.Println("it's after noon")
	}
}
