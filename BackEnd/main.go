package main

import (
	data_agent "MHelper/data_agent"
	"MHelper/httpserver"
	"MHelper/service"
	"encoding/json"
	"os"
)

func init() {
	go service.DealOldFile()
}

type IntensifyDistribution struct {
	EquipType    string
	StartLevel   int
	Distribution map[string]int // key为4位数字符串
	Total        int
}

func CalPurpleDistribution(num int) []string {
	if num == 0 {
		return []string{"0000"}
	}
	array := make([]string, 0)
	subArray := CalPurpleDistribution(num - 1)

	for i := 0; i < 4; i++ {
		if num == 2 && i != 3 { // 倒数第二跳，只能跳第四位
			continue
		}
		if num > 2 && i == 3 { // 前三跳，不能跳第四位
			continue
		}
		for _, tempResult := range subArray {
			temp := []byte(tempResult)
			temp[i] += 1
			array = append(array, string(temp))
		}
	}
	return array
}

func CalRedDistribution(num int) []string {
	if num == 0 {
		return []string{"0000"}
	}
	array := make([]string, 0)
	subArray := CalRedDistribution(num - 1)
	for i := 0; i < 4; i++ {
		for _, tempResult := range subArray {
			temp := []byte(tempResult)
			temp[i] += 1
			array = append(array, string(temp))
		}
	}
	return array
}

func main() {
	tempPath := "./1.json"
	file, _ := os.Create(tempPath)
	defer file.Close()

	results := make([]IntensifyDistribution, 0)
	for i := 0; i < 15; i += 3 {
		distributionMap := make(map[string]int)
		distributions := CalRedDistribution((15 - i) / 3)
		for _, distribution := range distributions {
			distributionMap[distribution]++
		}
		result := IntensifyDistribution{
			EquipType:    "red",
			StartLevel:   i,
			Distribution: distributionMap,
			Total:        len(distributions),
		}
		results = append(results, result)
	}

	for i := 0; i < 15; i += 3 {
		distributionMap := make(map[string]int)
		distributions := CalPurpleDistribution((15 - i) / 3)
		for _, distribution := range distributions {
			distributionMap[distribution]++
		}
		result := IntensifyDistribution{
			EquipType:    "purple",
			StartLevel:   i,
			Distribution: distributionMap,
			Total:        len(distributions),
		}
		results = append(results, result)
	}

	str, _ := json.Marshal(results)
	file.Write(str)

	if data_agent.IsArgsDataAgent() {
		data_agent.StartDataAgent()
	} else {
		httpserver.StartHttpServer()
	}
}
