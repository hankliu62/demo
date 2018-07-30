package main

import (
	"encoding/base64"
	"fmt"
	"regexp"
)

func main() {
	shortenUrl("aHR0cHM6Ly9kZXYtY2RuLmJ6eS5haS92b2ljZS9kNzY0ZTVkMC05M2YzLTExZTgtOGMyOS1hZjkzMDg1MTg3NjkubXAz") // xxx.map
	shortenUrl("aHR0cHM6Ly9kZXYtY2RuLmJ6eS5haS92b2ljZS9kNzY0ZTVkMC05M2YzLTExZTgtOGMyOS1hZjkzMDg1MTg3Njk=")     // xxx
}

func shortenUrl(longUrl string) {
	urlBytes, err := base64.StdEncoding.DecodeString(longUrl)
	if err != nil {
		fmt.Println("url invalid", err)
	}

	originalUrl := string(urlBytes)
	fmt.Println(originalUrl)

	str := regexp.MustCompile("/([0-9a-z-]+)(?:.[0-9a-z]+)?$").FindStringSubmatch(originalUrl)
	if len(str) < 2 {
		fmt.Println("url invalid")
	} else {
		fmt.Println(str, str[1])
	}
}
