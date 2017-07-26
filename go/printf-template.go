package main

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

func main() {
	selector := bson.M{
		"test": "test",
	}

	fmt.Println("================selector================")
	fmt.Printf("selector: %+v\n", selector)
	fmt.Println("================selector================")
}
