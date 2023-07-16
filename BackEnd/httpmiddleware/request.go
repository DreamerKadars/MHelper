package httpmiddleware

import (
	"MHelper/utils"
	"fmt"

	"github.com/kataras/iris/v12"
)

func HandleRequest(ctx iris.Context) {
	fmt.Println(ctx.Path())
	utils.Info(ctx.Path())
	ctx.Next()
}
