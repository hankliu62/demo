package main

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

func main() {
	orderbys := &[]string{}
	condition := &bson.M{}
	getDefaultCondition(condition, orderbys)
	fmt.Println("orderbys: ", *orderbys)
	fmt.Println("condition: ", *condition)
}

func getDefaultCondition(condition *bson.M, orderbys *[]string) {
	*orderbys = append(*orderbys, "-createAt")
	(*condition)["title"] = "123"
}
