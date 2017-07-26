package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func hashData(data, secret string) string {
	key := []byte(secret)
	h := hmac.New(sha256.New, key)
	h.Write([]byte(data))
	mdStr := hex.EncodeToString(h.Sum(nil))

	result := fmt.Sprintf("%s.%s", mdStr, data)
	fmt.Printf("\n===================sha256==========: %+v\n", mdStr)
	fmt.Printf("\n===================data==========: %+v\n", data)
	fmt.Printf("\n===================secret==========: %+v\n", secret)
	return result
}

func main() {
	value := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI1NTE4YTBiZmQ2Zjk3ZjA5MDQ4YjQ1NjciLCJhdWQiOiJtb2JpbGUiLCJleHAiOjQ2NTY3MTYwODEsImlhdCI6MTUwMTA0MjQ4MSwiaXNzIjoibW9iaWxlIiwic3ViIjoiZm9sbG93ZXI6NTkzYTZiNTRhNTkyNTEwMWI2MDAwMDAxIn0.jUAk9k0xGKfNQvk9WBcmOFVZ1KfmI1n2ZZjXmchv5VM"
	key := "r5jO-PYHr50S6EU88Rt9v70FiEwxXvAC"
	result := hashData(value, key)
	fmt.Printf("\n===================result==========: %+v\n", result)
}
