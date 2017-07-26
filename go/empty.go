package main

import (
	"fmt"
	"reflect"
	"time"

	"git.augmentum.com.cn/mairpc/share/util"
)

func IsEmpty(v reflect.Value) bool {
	fmt.Printf("v: %+v\n", v)
	if !v.IsValid() {
		return true
	}

	switch v.Kind() {
	case reflect.Array, reflect.Map, reflect.Slice, reflect.String:
		return v.Len() == 0
	case reflect.Bool:
		return !v.Bool()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return v.Uint() == 0
	case reflect.Float32, reflect.Float64:
		return v.Float() == 0
	case reflect.Interface, reflect.Ptr:
		return v.IsNil()
	}

	return reflect.DeepEqual(v.Interface(), reflect.Zero(v.Type()).Interface())
}

// isEmpty gets whether the specified object is considered empty or not.
func isEmpty2(object interface{}) bool {
	// var numericZeros = []interface{}{
	// 	int(0),
	// 	int8(0),
	// 	int16(0),
	// 	int32(0),
	// 	int64(0),
	// 	uint(0),
	// 	uint8(0),
	// 	uint16(0),
	// 	uint32(0),
	// 	uint64(0),
	// 	float32(0),
	// 	float64(0),
	// }

	// fmt.Println(object == nil, "===============")

	// if object == nil {
	// 	return true
	// } else if object == "" {
	// 	return true
	// } else if object == false {
	// 	return true
	// }

	// for _, v := range numericZeros {
	// 	if object == v {
	// 		return true
	// 	}
	// }

	objValue := reflect.ValueOf(object)

	switch objValue.Kind() {
	case reflect.Map:
		fallthrough
	case reflect.Slice, reflect.Chan:
		{
			return (objValue.Len() == 0)
		}
	case reflect.Struct:
		switch object.(type) {
		case time.Time:
			return object.(time.Time).IsZero()
		}
	case reflect.Ptr:
		{
			if objValue.IsNil() {
				return true
			}
			switch object.(type) {
			case *time.Time:
				return object.(*time.Time).IsZero()
			default:
				return false
			}
		}
	}
	return false
}

func ExtendMap(dst interface{}, srcs ...interface{}) {
	dstValue := reflect.ValueOf(dst)
	for _, src := range srcs {
		if src == nil {
			continue
		}
		srcValue := reflect.ValueOf(src)
		for _, key := range srcValue.MapKeys() {
			dstValue.SetMapIndex(key, srcValue.MapIndex(key))
		}
	}
}

type B struct {
	b string
}

type A struct {
	a int16
	b B
	c string
}

func main() {
	a := A{
		c: "",
	}
	fmt.Println("================IsEmpty================")
	fmt.Printf("IsEmpty: %+v\n", IsEmpty(reflect.ValueOf(a.b)))
	fmt.Printf("IsEmpty: %+v\n", isEmpty2(a.b))

	updatedInfos := map[string]interface{}{}

	locationLog := map[string]interface{}{}
	tagsLog := map[string]interface{}{
		"abc": nil,
	}
	properties := map[string]interface{}{}

	util.ExtendMap(updatedInfos, locationLog, tagsLog, properties)
	// fmt.Printf("updatedInfos: %+v\n", updatedInfos)

	fmt.Println("================IsEmpty================")
}
