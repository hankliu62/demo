package main

import (
	"fmt"
	"os"
)

// Defer 被用来确保一个函数调用在程序执行结束前执行。同样用来执行一些清理工作。 相当于其他语言中的finally
// 用defer延迟关闭改资源，以免引起内存泄漏
func main() {
	f := createFile("/defer.txt")
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}

	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	f.Close()
}
