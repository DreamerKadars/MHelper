package api

import (
	"MHelper/db"
	db_type "MHelper/db/type"
	"MHelper/utils"

	"github.com/kataras/iris/v12"
)

func GetHeroStaticDetail(ctx iris.Context) {
	req := &db_type.GetHeroStaticDetailRequest{}
	req.HeroCode = ctx.URLParamDefault("HeroCode", "")
	resp, err := db.Operator.GetHeroStaticDetail(ctx, req)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, resp.Info)
}
