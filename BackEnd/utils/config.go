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

func init() {
	Setting.ConfDir = os.Getenv("ServiceConfDir")
	CheckSetting()
}
