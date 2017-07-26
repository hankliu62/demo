package main

import (
	"fmt"
	"strings"
)

func main() {
	a := []string{"apple", "banana", "pear"}

	str := fmt.Sprintf("friuts includes `%s`", strings.Join(a, ", "))
	fmt.Println(str)
}
