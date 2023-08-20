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
		UpdateHeroImage()

		<-time.NewTicker(time.Hour).C
		// 周六晚上2点自动更新
		if time.Now().Weekday() == time.Saturday && time.Now().Local().Hour() == 2 {
			// 更新英雄数据
			UpdateHeroDataJSON()
			// 更新英雄图片
			UpdateHeroImage()
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
