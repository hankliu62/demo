package main

import (
	"fmt"
	"strings"
)

func main() {
	a := []string{"apple", "banana", "pear"}

	str := fmt.Sprintf("friuts includes `%s`", strings.Join(a, ", "))
	fmt.Println(str)

	var mapA map[string]interface{}
	if mapA == nil {
		fmt.Println("================nil================")
	} else {
		fmt.Println("================no nil================")
	}

	mapA = make(map[string]interface{})
	mapA["abc"] = 1

	if mapA == nil {
		fmt.Println("================nil================")
	} else {
		fmt.Println("================no nil================")
	}
}
