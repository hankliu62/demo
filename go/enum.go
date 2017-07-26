package main

import (
	"fmt"
)

const (
	_ = iota
	A = 10000 + iota
	B
)

func main() {
	fmt.Println(A)
	fmt.Println(B)

	var min int64 = 1<<4 - 1

	fmt.Println(min)
}
