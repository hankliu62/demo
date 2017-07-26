package main

import (
	"fmt"
	"regexp"
	"strings"
	"unicode/utf8"
)

type Location struct {
	Country  string
	Province string
	City     string
	Detail   string
}

func main() {
	// var (
	// 	province     = "香港特别行政区"
	// 	locationCity = "红市"
	// 	city         string
	// )
	// // suffixes = ["市", "省", "壮族自治区", "回族自治区", "维吾尔自治区", "自治区", "特别行政区"]
	// reg := regexp.MustCompile(`(省|市|(壮族|回族|维吾尔)?自治区|特别行政区)$`)
	// province = reg.ReplaceAllString(province, "")

	// city = locationCity
	// reg = regexp.MustCompile(`^(香港|澳门|台湾)`)
	// if len(reg.FindAllString(city, -1)) == 0 {
	// 	reg = regexp.MustCompile(`(县|市|盟|(地)?区|自治(县|州))$`)
	// 	city = reg.ReplaceAllString(city, "")

	// 	if utf8.RuneCountInString(city) == 1 {
	// 		city = locationCity
	// 	}
	// }

	location := Location{
		Country:  "中国",
		Province: "上海市",
		City:     "浦东区",
		Detail:   "",
	}

	new := formatMemberSpecialLocation(location)

	fmt.Println("================province================")
	// fmt.Printf("province: %+v\n", province)
	// fmt.Printf("city: %+v\n", city)
	fmt.Printf("location: %+v\n", location)
	fmt.Printf("new: %+v\n", new)
	fmt.Printf("utf8.RuneCountInString('忠县'): %+v\n", utf8.RuneCountInString("忠县"))
	fmt.Println("================province================")
}

func formatMemberSpecialLocation(location Location) Location {
	var (
		country       = location.Country
		province      = location.Province
		city          = location.City
		detail        = location.Detail
		specialCities = []string{"浦东新区"}
	)

	reg := regexp.MustCompile(`(省|市|(壮族|回族|维吾尔)?自治区|特别行政区)$`)
	province = reg.ReplaceAllString(province, "")

	reg = regexp.MustCompile(`^(香港|澳门|台湾)`)
	specialCitiesStr := strings.Join(specialCities, "|")
	specialCitiesReg := regexp.MustCompile(fmt.Sprintf("(%s)$", specialCitiesStr))
	if len(reg.FindAllString(province, -1)) == 0 && len(specialCitiesReg.FindAllString(city, -1)) == 0 {
		reg = regexp.MustCompile(`(县|市|盟|(地)?区|自治(县|州))$`)
		city = reg.ReplaceAllString(city, "")

		if utf8.RuneCountInString(city) == 1 {
			city = location.City
		}
	}

	return Location{
		Country:  country,
		Province: province,
		City:     city,
		Detail:   detail,
	}
}
