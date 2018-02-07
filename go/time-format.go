package main

import (
	"fmt"
	"time"
)

const (
	YYYYMMDD = "2006.01.02"
)

func BeginningOfMinute(t time.Time) time.Time {
	return t.Truncate(time.Minute)
}

func BeginningOfHour(t time.Time) time.Time {
	return t.Truncate(time.Hour)
}

func BeginningOfDay(t time.Time) time.Time {
	diffHour := time.Duration(-t.Hour()) * time.Hour
	return BeginningOfHour(t).Add(diffHour)
}

func main() {
	// fmt.Println(time.Now().AddDate(0, 0, -1).Format(util.DATE_FORMAT))
	// fmt.Println(time.Now().AddDate(0, 0, 1).Format(util.DATE_FORMAT))

	fmt.Printf("YYYYMMDD: %s\n", time.Now().Format(YYYYMMDD))
	fmt.Printf("%s: %s\n", time.RFC3339Nano, time.Now().Format(time.RFC3339Nano))

	fmt.Printf("BeginningOfMinute: %s\n", BeginningOfMinute(time.Now()).Format(time.RFC3339Nano))
	fmt.Printf("BeginningOfHour: %s\n", BeginningOfHour(time.Now()).Format(time.RFC3339Nano))
	fmt.Printf("BeginningOfHour: %s\n", BeginningOfDay(time.Now()).Format(time.RFC3339Nano))
}
