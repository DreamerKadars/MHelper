package api

import (
	db_type "MHelper/db/type"
	"MHelper/service"
	"MHelper/utils"

	"github.com/kataras/iris/v12"
)

const (
	ParamID      = "ID"
	SerialNumber = "HeroCode"
)

func GetHeroTemplate(ctx iris.Context) {
	ID := ctx.URLParamDefault(ParamID, "")
	respHeroTemplate, err := service.GetHeroTemplate(ctx.Request().Context(), ID)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, respHeroTemplate)
}

func ListHeroTemplate(ctx iris.Context) {
	HeroCode := ctx.URLParamDefault(SerialNumber, "")
	var tempHeroCode *string = nil

	if HeroCode != "" {
		tempHeroCode = &HeroCode
	}
	respHeroTemplateList, err := service.ListHeroTemplate(ctx.Request().Context(), &db_type.ListHeroTemplateRequest{
		HeroCode: tempHeroCode,
	})
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, respHeroTemplateList)
}

func CreateHeroTemplate(ctx iris.Context) {
	reqCreateHeroTemplate := db_type.CreateHeroTemplateRequest{}
	if err := ctx.ReadJSON(&reqCreateHeroTemplate.Info); err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	ID, err := service.CreateHeroTemplate(ctx.Request().Context(), &reqCreateHeroTemplate)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, ID)
}

func UpdateHeroTemplate(ctx iris.Context) {
	reqUpdateHeroTemplate := db_type.UpdateHeroTemplateRequest{}
	if err := ctx.ReadJSON(&reqUpdateHeroTemplate); err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	err := service.UpdateHeroTemplate(ctx.Request().Context(), &reqUpdateHeroTemplate)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, nil)
}

func DeleteHeroTemplate(ctx iris.Context) {
	reqDeleteHeroTemplate := db_type.DeleteHeroTemplateRequest{}
	reqDeleteHeroTemplate.ID = db_type.ResourceID((ctx.URLParamDefault(ParamID, "")))
	err := service.DeleteHeroTemplate(ctx.Request().Context(), &reqDeleteHeroTemplate)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, nil)
}
