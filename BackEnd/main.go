package main

import (
	"MHelper/httpserver"
	"MHelper/service"
)

func init() {
	go service.DealOldFile()
}

func main() {
	// 需要使用
	// utils.Info("%+v", utils.GenerateHeroDataJSON())
	// utils.Info("%+v", utils.GetAllHeroImage())

	httpserver.StartHttpServer()
}
