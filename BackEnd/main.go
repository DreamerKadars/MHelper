package main

import (
	"MHelper/httpserver"
	"MHelper/service"
)

func init() {
	go service.DealOldFile()
}

func main() {
	httpserver.StartHttpServer()
}
