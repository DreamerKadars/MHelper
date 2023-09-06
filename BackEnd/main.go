package main

import (
	data_agent "MHelper/data_agent"
	"MHelper/httpserver"
	"MHelper/service"
)

func init() {
	go service.DealOldFile()
}

func main() {
	if data_agent.IsArgsDataAgent() {
		data_agent.StartDataAgent()
	} else {
		httpserver.StartHttpServer()
	}
}
