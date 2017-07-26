package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
)

func hashData(data, secret string) string {
	key := []byte(secret)
	h := hmac.New(sha256.New, key)
	h.Write([]byte(data))
	sha256Data := hex.EncodeToString(h.Sum(nil))
	result := fmt.Sprintf("%s%s", sha256Data, data)

	return result
}

func serialize(value string) string {
	buf := new(bytes.Buffer)
	buf.WriteString("s:")
	buf.WriteString(strconv.FormatInt(int64(len(value)), 10))
	buf.WriteString(":\"")
	buf.WriteString(value)
	buf.WriteString("\";")
	return buf.String()
}

func createPhpYiiCookieValue(value string) string {
	data := hashData(serialize(value), "r5jO-PYHr50S6EU88Rt9v70FiEwxXvAC")
	return data
}

func main() {
	fmt.Println(createPhpYiiCookieValue("5642e607d6f97f60768b4569"))
}
