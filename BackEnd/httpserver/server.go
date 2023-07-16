package httpserver

import (
	"MHelper/httpmiddleware"
	"MHelper/httpserver/api"

	"github.com/kataras/iris/v12"
)

var App *iris.Application

func StartHttpServer() {
	App = iris.New()

	App.UseRouter(httpmiddleware.HandleRequest)
	apiV1 := App.Party("/api/v1")

	e7 := apiV1.Party("/e7")
	e7.Post("/upload", api.UploadImageInfo)

	App.Listen(":8080")
}
