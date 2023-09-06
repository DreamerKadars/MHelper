package api

import (
	"MHelper/httpmiddleware"
	"MHelper/service"
	"MHelper/utils"

	"github.com/kataras/iris/v12"
)

type LoginRequest struct {
	Username string
	Password string
}

func Login(ctx iris.Context) {
	req := LoginRequest{}
	err := ctx.ReadJSON(&req)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}

	// 验证账号密码
	err = service.CheckUser(req.Username, req.Password)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	// 用账号生成jwt
	httpmiddleware.SetJwtCookie(ctx, req.Username)
	return
}
