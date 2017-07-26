package main

import (
  "fmt"
)

func main() {
  // 声明变量的类型并初始化
  var a string = "initail"
  fmt.Println(a)

  // 声明并初始化多个相同类型的变量
  var b, c int = 1, 2
  fmt.Println(b, c)

  // 声明初始化变量，自动识别变量的类型
  var d = true
  fmt.Println(d)

  // 声明变量，未初始化时，赋予默认值，int类型默认值为0
  var e int
  fmt.Println(e)

  // := 声明并初始化变量的简写，等同于: var f string = "short"
  f := "short"
  fmt.Println(f)
}
