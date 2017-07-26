package main

import (
	"fmt"

	"github.com/wulijun/go-php-serialize/phpserialize"
	"gopkg.in/mgo.v2/bson"
)

func main() {
	condition, _ := phpserialize.Encode(map[interface{}]interface{}{
		"accountId": bson.NewObjectId().Hex(),
		"isDeleted": false,
	})
	updator, _ := phpserialize.Encode(map[interface{}]interface{}{
		"$pull": map[interface{}]interface{}{
			"properties": map[interface{}]interface{}{"id": bson.NewObjectId().Hex()},
		},
	})
	fmt.Println("condition: ", condition)
	fmt.Println("updator: ", updator)
}
