package dataagent

import (
	"MHelper/utils"
	"os"
	"time"
)

func IsArgsDataAgent() bool {
	utils.Info("程序输入变量：%+v", os.Args)
	for _, arg := range os.Args {
		if arg == "DataAgent" {
			return true
		}
	}
	return false
}

// 开启DataAgent
func StartDataAgent() {
	for {
		// 更新英雄数据
		// UpdateHeroDataJSON()
		// 更新英雄图片

		<-time.NewTicker(time.Hour).C
		// 周六晚上2点自动更新
		if time.Now().Weekday() == time.Saturday && time.Now().Local().Hour() == 2 {
			// 更新英雄数据
			UpdateHeroDataJSON()
			// 更新英雄图片
			UpdateHeroImage()
			// 更新神器数据和图片
			UpdateArtifactImageAndJSON()
		}
	}
}

func UpdateHeroDataJSON() {
	err := utils.GenerateHeroDataJSON()
	if err != nil {
		utils.Info("call GenerateHeroDataJSON fail:%+v", err)
	}
	utils.Info("call GenerateHeroDataJSON success")
}

func UpdateHeroImage() {
	err := utils.GetAllHeroImage()
	if err != nil {
		utils.Info("call GetAllHeroImage fail:%+v", err)
	} else {
		utils.Info("call GetAllHeroImage success")
	}
}

// UpdateArtifactImageAndJSON 更新artifact的数据信息和图片
func UpdateArtifactImageAndJSON() {
	err := utils.GenerateArtifactDataJSON()
	if err != nil {
		utils.Info("call GenerateArtifactDataJSON fail:%+v", err)
	} else {
		utils.Info("call GenerateArtifactDataJSON success")
	}

	err = utils.GetAllArtifactImage()
	if err != nil {
		utils.Info("call GetAllArtifactImage fail:%+v", err)
	} else {
		utils.Info("call GetAllArtifactImage success")
	}
}
