package main

import (
	"cast"
	"fmt"
	"time"
)

func main() {
	const HOURS_PER_DAY = 24
	fmt.Println(time.Now().Unix())
	fmt.Println(time.Unix(708278400, 0).Format(time.RFC3339))
	fmt.Println(time.Unix(708278400000, 0).Format(time.RFC3339))
	fmt.Printf("9.8249	=>	%0.2f(四舍)\n", 9.8249)
	fmt.Printf("9.82671	=>	%0.2f(六入)\n", 9.82671)
	fmt.Printf("9.8351	=>	%0.2f(五后非零就进一)\n", 9.8351)
	fmt.Printf("9.82501	=>	%0.2f(五后非零就进一)\n", 9.82501)
	fmt.Printf("9.8250	=>	%0.2f(五后为零看奇偶，五前为偶应舍去)\n", 9.005)
	fmt.Printf("9.8350	=>	%0.2f(五后为零看奇偶，五前为奇要进一)\n", 9.015)
	var hours = time.Duration(12)
	var day = hours / HOURS_PER_DAY
	fmt.Println(day, "==================")
	fmt.Printf("==================type: %+t\n", time.Hour*hours)
	fmt.Println(time.Now().AddDate(0, 0, 0))
	today := time.Now().Format("20060102")
	expectedOrderNumber := today + cast.ToString(cast.ToInt(today)+1)
	fmt.Println(expectedOrderNumber)

	type A struct {
		B string
	}

	fmt.Println(cast.ToFloat64(int(123)))

	// var a = []A{}

	// a = append(a, nil)
	// fmt.Println("a================length: ", len(a))
}
