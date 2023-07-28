package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
)

const (
	EpicUrl        = "https://epic7.smilegatemegaport.com"
	EpicStaticUrl  = "https://static.smilegatemegaport.com"
	HeroListPath   = "/guide/wearingStatus/getHeroList"
	HeroDetailPath = "/guide/getHeroDetail"
	HeroImagePath  = "/event/live/epic7/guide/images/hero/%s_s.png"
)

func UnmarshalHeroListResult(data []byte) (HeroListResult, error) {
	var r HeroListResult
	err := json.Unmarshal(data, &r)
	return r, err
}

type HeroListResult struct {
	HeroList []HeroInfo `json:"heroList"`
}

type HeroInfo struct {
	HeroCode      string     `json:"heroCode"`
	HeroName      string     `json:"heroName"`
	Grade         int64      `json:"grade"`
	JobCode       string     `json:"jobCode"`
	AttributeCode string     `json:"attributeCode"`
	HeroDetail    HeroDetail `json:"heroDetail"`
}

func UnmarshalHeroDetailResult(data []byte) (HeroDetailResult, error) {
	var r HeroDetailResult
	err := json.Unmarshal(data, &r)
	return r, err
}

type HeroDetailResult struct {
	HeroDetail HeroDetail `json:"heroDetail"`
}

type HeroDetail struct {
	HeroCode  string `json:"heroCode"`
	WorldCode string `json:"worldCode"`
	// StrategyType               int64       `json:"strategyType"`
	// BossType                   int64       `json:"bossType"`
	// Floor                      int64       `json:"floor"`
	// RegDate                    string      `json:"regDate"`
	AttackStats                string  `json:"attackStats"`
	DefenseStats               string  `json:"defenseStats"`
	VitalityStatistics         string  `json:"vitalityStatistics"`
	SpeedStatistics            string  `json:"speedStatistics"`
	CriticalStatistics         string  `json:"criticalStatistics"`
	CriticalHitStatistics      string  `json:"criticalHitStatistics"`
	EffectiveStatistics        string  `json:"effectiveStatistics"`
	EffectResistanceStatistics string  `json:"effectResistanceStatistics"`
	RankSets1                  string  `json:"rankSets1"`
	EqipRankShare1             float64 `json:"eqipRankShare1"`
	RankSets2                  string  `json:"rankSets2"`
	EqipRankShare2             float64 `json:"eqipRankShare2"`
	RankSets3                  string  `json:"rankSets3"`
	EqipRankShare3             float64 `json:"eqipRankShare3"`
}

func httpEpic(method, domain, path string, header map[string]string) ([]byte, error) {
	req, err := http.NewRequest(method, domain+path, nil)
	if err != nil {
		return nil, err
	}
	for k, v := range header {
		req.Header.Add(k, v)
	}
	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return respBody, nil
}
func GetAllHeroList() (HeroListResult, error) {
	var res HeroListResult
	res.HeroList = make([]HeroInfo, 0)
	for i := 0; ; i++ {
		respHeroListTempByte, err := httpEpic(http.MethodPost, EpicUrl, HeroListPath, map[string]string{
			"Gc_currentpage":  strconv.Itoa(i),
			"Accept-Language": "zh-CN,zh;q=0.9",
			"Gc_world":        "world_global",
			"Gc_ispaging":     "Y",
		})
		if err != nil {
			return res, err
		}
		respHeroListTemp, err := UnmarshalHeroListResult(respHeroListTempByte)
		if err != nil {
			return res, err
		}
		if len(respHeroListTemp.HeroList) == 0 {
			break
		}
		res.HeroList = append(res.HeroList, respHeroListTemp.HeroList...)
	}
	return res, nil
}

func FullHeroDetail(info *HeroInfo) error {
	respHeroDetailTempByte, err := httpEpic(http.MethodPost, EpicUrl, HeroDetailPath, map[string]string{
		"Herocode":        info.HeroCode,
		"Accept-Language": "zh-CN,zh;q=0.9",
		"Lang":            "zh-CN",
		"World":           "world_global",
		"Bosstype":        "1",
		"Floor":           "1",
		"Strategytype":    "0",
	})
	if err != nil {
		return err
	}
	Info("%+v", string(respHeroDetailTempByte))
	heroDetailTemp, err := UnmarshalHeroDetailResult(respHeroDetailTempByte)
	if err != nil {
		return err
	}
	info.HeroDetail = heroDetailTemp.HeroDetail
	return nil
}

func GenerateHeroDataJSON() error {
	allHeroList, err := GetAllHeroList()
	if err != nil {
		return err
	}
	Info("%+v", allHeroList)
	for index, _ := range allHeroList.HeroList {
		err := FullHeroDetail(&allHeroList.HeroList[index])
		if err != nil {
			return err
		}
	}
	f, err := os.Create(DataFolder + DataHeroStatisticName) //创建文件，会自动覆盖
	if err != nil {
		return err
	}
	defer f.Close() //关闭文件
	resByte, err := json.Marshal(allHeroList)
	if err != nil {
		return err
	}
	_, err = f.Write(resByte)
	if err != nil {
		return err
	}
	return nil
}

func GetAllHeroImage() error {

	HeroListResultByte, err := os.ReadFile(DataFolder + DataHeroStatisticName)
	if err != nil {
		return err
	}
	heroListResult, err := UnmarshalHeroListResult(HeroListResultByte)
	if err != nil {
		return err
	}
	for _, hero := range heroListResult.HeroList {
		respHttp, err := httpEpic(http.MethodGet, EpicStaticUrl, fmt.Sprintf(HeroImagePath, hero.HeroCode), nil)
		if err != nil {
			return err
		}

		file, err := os.Create(DataHeroImageFolder + hero.HeroCode + ".png")
		if err != nil {
			return err
		}
		defer file.Close()
		_, err = file.Write(respHttp)
		if err != nil {
			return err
		}
	}
	return nil
}
