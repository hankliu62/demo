package main

import (
	"fmt"
	"math/rand"
	"time"
)

// randSlice return a random result which in slice
func randSlice(slice []string) string {
	if slice == nil || len(slice) == 0 {
		return ""
	}

	length := len(slice)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	return slice[r.Intn(length)]
}

func Slice_rand(a []string) string {
	randnum := rand.Intn(len(a))
	return a[randnum]
}

func Shuffle(array []interface{}, source rand.Source) {
	random := rand.New(source)
	for i := len(array) - 1; i > 0; i-- {
		j := random.Intn(i + 1)
		array[i], array[j] = array[j], array[i]
	}
}

func main() {

	arr := []string{"1", "2"}

	length := len(arr)

	r := rand.New(rand.NewSource(time.Now().Unix()))

	a := arr[r.Intn(length)]
	b := arr[r.Intn(length)]
	c := arr[r.Intn(length)]

	d := Slice_rand(arr)
	e := Slice_rand(arr)
	f := Slice_rand(arr)

	fmt.Println("================b================")
	fmt.Printf("a: %+v\n", a)
	fmt.Printf("b: %+v\n", b)
	fmt.Printf("c: %+v\n", c)
	fmt.Printf("d: %+v\n", d)
	fmt.Printf("e: %+v\n", e)
	fmt.Printf("f: %+v\n", f)
	fmt.Println("================b================")

	src := []string{"1", "2", "3", "4"}
	dest := make([]string, len(src))
	perm := rand.Perm(len(src))
	for i, v := range perm {
		dest[v] = src[i]
	}

	fmt.Println("================dest================")
	fmt.Printf("dest: %+v\n", dest)
	fmt.Println("================dest================")

	source := rand.NewSource(time.Now().UnixNano())
	array := []interface{}{"1", "2", "3", "4"}

	Shuffle(array, source) // [c b a]

	fmt.Println("================array================")
	fmt.Printf("array: %+v\n", array)
	fmt.Println("================array================")
}
