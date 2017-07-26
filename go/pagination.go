package main

import (
	"math"

	"fmt"
)

func main() {
	fmt.Println(getResultsMeta(1, 10, 131))
}

func getResultsMeta(page int, pageSize int, total int) map[string]interface{} {
	pageCount := float64(total) / float64(pageSize)
	meta := map[string]interface{}{
		"currentPage": page,
		"perPage":     pageSize,
		"totalCount":  total,
		"pageCount":   math.Ceil(pageCount),
	}

	return meta
}
