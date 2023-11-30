package httpserver

import (
	"MHelper/db"
	"MHelper/httpmiddleware"
	"MHelper/httpserver/api"
	"MHelper/utils"
	"fmt"
	"os"

	"github.com/kataras/iris/v12"
	"gopkg.in/yaml.v2"
)

var App *iris.Application

type ServiceConf struct {
	JWTConf        JWTConf           `yaml:"jwt_conf"`
	StaticDataConf db.StaticDataConf `yaml:"static_data_conf"`
}
type JWTConf struct {
	Secret string `yaml:"secret"`
}

var serviceConf ServiceConf

// 读取服务器配置
func InitHttpServer() {
	// 读取配置文件中的jwt token
	data, err := os.ReadFile(fmt.Sprintf(utils.Setting.ConfDir + "service_conf.yml"))
	if err != nil {
		panic("load service conf file fail!" + err.Error())
	}
	err = yaml.Unmarshal(data, &serviceConf)
	if err != nil {
		panic("yaml unmarshal fail!" + err.Error())
	}
	httpmiddleware.SetJwtSecret(serviceConf.JWTConf.Secret)
	db.SetStaticDataConf(serviceConf.StaticDataConf)
	utils.Info("load service Conf success! content is %+v\n", serviceConf)
	db.InitDB()
}

func StartHttpServer() {
	utils.InitConfDir()
	InitHttpServer()
	App = iris.New()

	App.UseRouter(httpmiddleware.HandleRequest)
	apiV1 := App.Party("/api/v1")

	e7 := apiV1.Party("/e7")
	{
		e7.Post("/upload", api.UploadImageInfo)
		e7.Post("/login", api.Login)
		e7.Get("/hero_static_data", api.GetHeroStaticDetail)
		e7.Get("/hero_static_data_list", api.ListHeroStaticDetail)
		e7.Get("/hero_template/get", api.GetHeroTemplate)
		e7.Get("/hero_template/list", api.ListHeroTemplate)
	}

	protectedAPI := App.Party("/api/v1/protected")
	protectedAPI.Use(httpmiddleware.CreateJwtMiddleware())
	{
		protectedAPI.Get("/", httpmiddleware.GetTokenInfo)

		protectedAPI.Get("/hero_template/get", api.GetHeroTemplate)
		protectedAPI.Get("/hero_template/list", api.ListHeroTemplate)
		protectedAPI.Put("/hero_template/update", api.UpdateHeroTemplate)
		protectedAPI.Delete("/hero_template/delete", api.DeleteHeroTemplate)
		protectedAPI.Post("/hero_template/create", api.CreateHeroTemplate)
	}

	App.Listen(":8080")
}
