package main

import (
	"fmt"
	"math/rand"
	"time"
)

// ShuffleSlice shuffle slice
func ShuffleSlice(array []interface{}, source rand.Source) {
	random := rand.New(source)
	for i := len(array) - 1; i > 0; i-- {
		j := random.Intn(i + 1)
		array[i], array[j] = array[j], array[i]
	}
}

func main() {

	source := rand.NewSource(time.Now().UnixNano())
	array := []interface{}{"1", "2", "3", "4", "5", "6"}

	ShuffleSlice(array, source) // [c b a]

	fmt.Println("================array================")
	fmt.Printf("array: %+v\n", array)
	fmt.Println("================array================")
}
