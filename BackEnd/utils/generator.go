package utils

import (
	"reflect"

	"github.com/lithammer/shortuuid"
)

func GenerateID(i interface{}) string {
	return GenerateTypeName(i) + "-" + shortuuid.New()
}

func GenerateTypeName(i interface{}) string {
	if reflect.TypeOf(i).Kind() == reflect.Pointer {
		return reflect.TypeOf(i).Elem().Name()
	}
	return reflect.TypeOf(i).Name()
}
