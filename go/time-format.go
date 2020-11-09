package main

import (
	"fmt"
	"time"

	"git.hankliu.com.cn/hankrpc/share/util"
)

func main() {
	fmt.Println(time.Now().AddDate(0, 0, -1).Format(util.DATE_FORMAT))
	fmt.Println(time.Now().AddDate(0, 0, 1).Format(util.DATE_FORMAT))
}
