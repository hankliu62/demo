package main

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

func modifyMap(c bson.M) {
	c["add"] = "add a field"
}

func main() {
	c := bson.M{
		"current": "current field",
	}

	modifyMap(c)

	fmt.Println(c)
}
