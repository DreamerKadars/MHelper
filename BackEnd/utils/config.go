package utils

import "os"

type ServiceConf struct {
	ConfDir string
}

var Setting ServiceConf

func CheckSetting() {
	if Setting.ConfDir == "" {
		panic("conf dir is null")
	}
}

func InitConfDir() {
	Setting.ConfDir = os.Getenv("ServiceConfDir")
	CheckSetting()
}
