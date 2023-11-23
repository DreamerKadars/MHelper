package operator

import (
	db_type "MHelper/db/type"
	"MHelper/utils"
	"context"
	"fmt"
	"os"
)

type HeroStaticOperator struct {
}

var heroStaticOperator HeroStaticOperator

var heroStaticMap map[string]db_type.HeroStatic = make(map[string]db_type.HeroStatic)

func InitStaticHero(heroDataFile, heroDataFribbelsFile, heroExtraPanelInfoDataFile string) error {
	heroDataByte, err := os.ReadFile(heroDataFile)
	if err != nil {
		return err
	}
	heroData, err := db_type.UnmarshalHeroDetailFile(heroDataByte)
	if err != nil {
		return err
	}

	heroExtraPanelInfoDataByte, err := os.ReadFile(heroExtraPanelInfoDataFile)
	if err != nil {
		return err
	}
	heroDataFribbelsByte, err := os.ReadFile(heroDataFribbelsFile)
	if err != nil {
		return err
	}

	heroExtraPanelInfoData, err := db_type.UnmarshalHeroExtraPanelInfoDataFile(heroExtraPanelInfoDataByte)
	if err != nil {
		return err
	}

	heroDataFribbels, err := db_type.UnmarshalHeroDetailFribbelsFile(heroDataFribbelsByte)
	if err != nil {
		return err
	}
	for _, value := range heroDataFribbels {
		heroDataFribbels[value.Code] = value
	}

	for _, heroDataDetail := range heroData.HeroList {
		if _, ok := heroDataFribbels[heroDataDetail.HeroCode]; !ok {
			// panic(fmt.Errorf("找不到[%s]对应的角色数据", heroDataDetail.HeroCode))
			utils.Info("%+v", fmt.Errorf("找不到[%s]对应的角色数据", heroDataDetail.HeroCode))
		}
		heroStaticMap[heroDataDetail.HeroCode] = db_type.HeroStatic{
			HeroDetail:         heroDataDetail,
			HeroDetailFribbels: heroDataFribbels[heroDataDetail.HeroCode],
			HeroExtraPanelInfo: heroExtraPanelInfoData[heroDataDetail.HeroCode],
		}
	}
	utils.Info("read static data success")
	return nil
}

func (o *HeroStaticOperator) GetHeroStaticDetail(ctx context.Context, req *db_type.GetHeroStaticDetailRequest) (*db_type.GetHeroStaticDetailResponse, error) {
	if info, ok := heroStaticMap[req.HeroCode]; ok {
		return &db_type.GetHeroStaticDetailResponse{
			Info: info,
		}, nil
	}
	return nil, db_type.ErrNotFound
}
