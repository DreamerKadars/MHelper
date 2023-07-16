package utils

import (
	"fmt"
	"net/http"

	"github.com/kataras/iris/v12"
)

type FailResponseStruct struct {
	Code    int
	Message string
}

type SuccessResponseStruct struct {
	Code int
	Data interface{}
}

func FailResponse(ctx iris.Context, err error) error {
	if err == nil {
		return fmt.Errorf("err is nil")
	}
	ctx.StatusCode(http.StatusBadRequest)
	return ctx.JSON(FailResponseStruct{
		Code:    http.StatusBadRequest,
		Message: err.Error(),
	})
}

func SuccessResponse(ctx iris.Context, Data interface{}) error {
	ctx.StatusCode(http.StatusOK)
	return ctx.JSON(SuccessResponseStruct{
		Code: http.StatusOK,
		Data: Data,
	})
}
