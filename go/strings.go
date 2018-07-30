package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("================selector================")
	fmt.Printf("selector: %+v\n", strings.Contains("12321321", "#user"))
	fmt.Printf("selector: %+v\n", strings.Contains("12321#user12321323", "#user"))
	fmt.Printf("selector: %+v\n", strings.Replace("12321321", "#user", fmt.Sprintf("@%s", "卡鲁秋"), 1))
	fmt.Printf("selector: %+v\n", strings.Replace("12321#user12321#user323", "#user", fmt.Sprintf("@%s", "卡鲁秋"), 8))
	fmt.Println("================selector================")
}
