package main

import (
	"fmt"
	"reflect"
)

type Hello interface {
	GetName() string
	SayHello()
}

type Foo struct {
	Name string
	Path string
	Age  int
}

func (f Foo) GetName() (name string) {
	name = f.Name

	return
}

func (Foo) SayHello() {
	fmt.Println("Hello")
}

func main() {
	foo := Foo{
		Name: "foo-name",
		Path: "path",
		Age:  12,
	}

	fmt.Println("===============foo====================")
	fmt.Printf("foo: %+v\n", foo)
	fmt.Println("===============foo====================")

	typ := reflect.TypeOf(foo)

	reflect.New(basicTargetType)

	fmt.Println("===============foo.Type====================")
	fmt.Printf("type.String(): %+v\n", typ.String())
	fmt.Printf("type.Name(): %+v\n", typ.Name())
	fmt.Printf("type.PkgPath(): %+v\n", typ.PkgPath())
	fmt.Printf("type.Kind() == reflect.Struct ? : %+v\n", typ.Kind() == reflect.Struct)
	fmt.Printf("type.NumMethod(): %+v\n\n", typ.NumMethod())
	for i := 0; i < typ.NumMethod(); i++ {
		method := typ.Method(i)
		fmt.Printf("\n===============type.Method(%d)====================\n", i)
		fmt.Printf("type.Method(%d): %+v\n", i, method)
		fmt.Printf("method.Name: %+v\n", method.Name)
		fmt.Printf("method.PkgPath: %+v\n", method.PkgPath)
		fmt.Printf("method.Type: %+v\n", method.Type)
		fmt.Printf("method.Func: %+v\n", method.Func)
		fmt.Printf("method.Func Type: %T\n", method.Func)
		fmt.Printf("method.Index: %+v\n", method.Index)
		fmt.Printf("===============type.Method(%d)====================\n", i)
	}
	method, ok := typ.MethodByName("123")
	fmt.Printf("\n")
	fmt.Printf("\n\ntype.MethodByName('123') ok ?: %+v\n", ok)
	fmt.Printf("type.MethodByName('123'): %+v\n", method)

	method, ok = typ.MethodByName("GetName")
	fmt.Printf("type.MethodByName('GetName') ok ?: %+v\n", ok)
	fmt.Printf("type.MethodByName('GetName'): %+v\n", method)

	// fmt.Printf("\n判断t类型是否实现了u接口: \n")
	// interfaceType := reflect.TypeOf(Hello)
	// fmt.Printf("type.Implements(reflect.TypeOf(interface{}{})): %+v\n", typ.Implements(interfaceType))

	fmt.Printf("type.NumField(): %+v\n", typ.NumField())
	for i := 0; i < typ.NumField(); i++ {
		field := typ.Field(i)
		fmt.Printf("\n===============type.Field(%d)====================\n", i)
		fmt.Printf("type.Field(%d): %+v\n", i, field)
		fmt.Printf("field.Name: %+v\n", field.Name)
		fmt.Printf("field.PkgPath: %+v\n", field.PkgPath)
		fmt.Printf("field.Type: %+v\n", field.Type)
		fmt.Printf("field.Tag: %+v\n", field.Tag)
		fmt.Printf("field.Tag Type: %T\n", field.Tag)
		fmt.Printf("field.Offset: %+v\n", field.Offset)
		fmt.Printf("field.Index: %+v\n", field.Index)
		fmt.Printf("field.Anonymous: %+v\n", field.Anonymous)
		fmt.Printf("===============type.Field(%d)====================\n", i)
	}
	// fmt.Printf("int.NumMethod(): %+v\n", reflect.TypeOf([]string{"12", "123"}).Len())
	fmt.Println("===============foo.Type====================")
}
