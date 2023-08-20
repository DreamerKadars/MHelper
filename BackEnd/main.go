package main

import (
	dataagent "MHelper/data_agent"
	"MHelper/httpserver"
	"MHelper/service"
)

func init() {
	go service.DealOldFile()
}

func main() {
	if dataagent.IsArgsDataAgent() {
		dataagent.StartDataAgent()
	} else {
		httpserver.StartHttpServer()
	}
}
