package httpserver

import (
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
	JWTConf JWTConf `yaml:"jwt_conf"`
}
type JWTConf struct {
	Secret string `yaml:"secret"`
}

var serviceConf ServiceConf

// 读取服务器配置
func init(){
	// 读取配置文件中的jwt token
	data, err := os.ReadFile(fmt.Sprintf(utils.Setting.ConfDir+"service_conf.yml", utils.GetEnvTag()))
	if err != nil {
		panic("load service conf file fail!")
	}
	err = yaml.Unmarshal(data, &serviceConf)
	if err != nil {
		panic("yaml unmarshal fail!")
	}
	utils.Info("load service Conf success! content is %+v\n", serviceConf)
}

func StartHttpServer() {
	App = iris.New()

	App.UseRouter(httpmiddleware.HandleRequest)
	apiV1 := App.Party("/api/v1")

		e7 := apiV1.Party("/e7")
		e7.Post("/upload", api.UploadImageInfo)

	e7.Post("/login", api.Login())
	e7.Post("/register", api.Register())

	App.Listen(":8080")
}
