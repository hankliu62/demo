package main

import (
	"fmt"
	"net/url"
)

func main() {
	// fmt.Println("./timetoken -t 3600 -key key  -url url")

	// var t int64
	// var key string
	// var resUrl string
	// flag.Int64Var(&t, "t", 0, "expire timestamp")
	// flag.StringVar(&key, "key", "", "encrypt key")
	// flag.StringVar(&resUrl, "url", "", "http://wm.com/5518a0bfd6f97f09048b4567/marketing/view/coupon/59190eeb9cd0b3002e74ea22")
	// flag.Parse()

	// if t == 0 || key == "" || resUrl == "" {
	// 	return
	// }

	// expireTime := fmt.Sprintf("%x", time.Now().Unix()+t)

	// resUri, pErr := url.Parse(resUrl)
	// if pErr != nil {
	// 	return
	// }
	// fmt.Println(resUri)
	// path := resUri.EscapedPath()
	// fmt.Println(path)
	// rawStr := fmt.Sprintf("%s%s%s", key, path, expireTime)
	// fmt.Println(rawStr)
	// md5H := md5.New()
	// md5H.Write([]byte(rawStr))

	// sign := fmt.Sprintf("%x", md5H.Sum(nil))
	// //sign := hex.EncodeToString(md5H.Sum(nil))

	// var newUrl string
	// if strings.Contains(resUrl, "?") {
	// 	newUrl = fmt.Sprintf("%s&sign=%s&t=%s", resUrl, sign, expireTime)
	// } else {
	// 	newUrl = fmt.Sprintf("%s?sign=%s&t=%s", resUrl, sign, expireTime)
	// }

	// fmt.Println(newUrl)

	shortenUrl("http://wm.com/mobile/product/coupon?couponId=59190eeb9cd0b3002e74ea22")
}

func shortenUrl(longUrl string) {
	parameters := url.Values{}

	parameters.Add("url", longUrl)
	a := parameters.Encode()

	fmt.Println(a)
}
