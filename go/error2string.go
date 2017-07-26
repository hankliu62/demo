package main

import (
	"fmt"
)

type MyError struct {
	Code int
	Desc string
}

// 通过实现Error方法来自定义error类型
func (e MyError) Error() string {
	return fmt.Sprintf("%d - %s", e.Code, e.Desc)
}

func main() {
	myError := MyError{
		Code: 100,
		Desc: "custom error",
	}

	var errMsg string
	if assertErr, ok := myError.(error); ok {
		errMsg = assertErr.Error()
	} else {
		errMsg = myError.(string)
	}

	fmt.Println(errMsg)
}
