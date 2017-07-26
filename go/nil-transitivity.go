package main

import (
	"fmt"
	"reflect"
)

type A struct {
	value int64
}

type B struct {
	value string
	ai    interface{}
	a     *A
}

func transitivity(i interface{}) {
	iValue := reflect.ValueOf(i)

	fmt.Println("================i================")
	fmt.Printf("i: %+v\n", i)
	fmt.Printf("i == nil?: %+v\n", i == nil)
	fmt.Printf("iValue: %+v\n", iValue.IsNil())
	fmt.Println("================i================")
}

func transitivity2(b *A) {
	if b == nil {
		fmt.Println("================b================")
		fmt.Printf("b: %+v\n", b)
		fmt.Println("================b================")
	}
}

func main() {
	// b := B{}

	// fmt.Println("================b.a================")
	// fmt.Printf("b.a: %+v\n", b.a)
	// fmt.Println("================b.a================")

	// var i interface{}
	var b B
	transitivity2(b.a)
}
