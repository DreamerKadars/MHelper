package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

const (
	EpicUrl               = "https://epic7.game.onstove.com"
	EpicStaticUrl         = "https://static.smilegatemegaport.com"
	EpicGameUrl           = "https://epic7.game.onstove.com"
	HeroListPath          = "/guide/wearingStatus/getHeroList"
	HeroDetailPath        = "/guide/getHeroDetail"
	HeroImagePath         = "/event/live/epic7/guide/images/hero/%s_s.png"
	ArtifactListPath      = "/guide/wearingStatus/getArtifactList"
	ArtifactImagePath     = "/event/live/epic7/guide/wearingStatus/images/artifact/%s_ico.png"
	ArtifactFullImagePath = "/event/live/epic7/guide/wearingStatus/images/artifact/%s_full.png"
)

var HeroCodeBlackList = []string{"c1001", "c1005"} // 这两个女主是转职前的，避免冲突先删除

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
	RegDate                    string  `json:"regDate"` // 更新时间
	AttackStats                string  `json:"attackStats"`
	DefenseStats               string  `json:"defenseStats"`
	VitalityStatistics         string  `json:"vitalityStatistics"`
	SpeedStatistics            string  `json:"speedStatistics"`
	CriticalStatistics         string  `json:"criticalStatistics"`
	CriticalHitStatistics      string  `json:"criticalHitStatistics"`
	EffectiveStatistics        string  `json:"effectiveStatistics"`
	EffectResistanceStatistics string  `json:"effectResistanceStatistics"`
	AttackLevel                int     `json:"attackLevel"`
	DefenseLevel               int     `json:"defenseLevel"`
	VitalityLevel              int     `json:"vitalityLevel"`
	SpeedLevel                 int     `json:"speedLevel"`
	CriticalLevel              int     `json:"criticalLevel"`
	CriticalHitLevel           int     `json:"criticalHitLevel"`
	EffectiveLevel             int     `json:"effectiveLevel"`
	EffectResistanceLevel      int     `json:"effectResistanceLevel"`
	AttackAverage              float32 `json:"attackAverage"`
	DefenseAverage             float32 `json:"defenseAverage"`
	VitalityAverage            float32 `json:"vitalityAverage"`
	SpeedAverage               float32 `json:"speedAverage"`
	CriticalAverage            float32 `json:"criticalAverage"`
	CriticalHitAverage         float32 `json:"criticalHitAverage"`
	EffectiveAverage           float32 `json:"effectiveAverage"`
	EffectResistanceAverage    float32 `json:"effectResistanceAverage"`
	NumberStatistic            int     `json:"numberStatistic"`
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
	for i := 1; ; i++ {
		respHeroListTempByte, err := httpEpic(http.MethodPost, EpicUrl, HeroListPath, map[string]string{
			"Gc_currentpage":  strconv.Itoa(i),
			"Accept-Language": "zh-CN,zh;q=0.9",
			"Gc_world":        "world_global",
			"Gc_ispaging":     "Y",
		})

		if err != nil {
			fmt.Println("", err.Error())
			return res, err
		}
		fmt.Println(string(respHeroListTempByte))
		respHeroListTemp, err := UnmarshalHeroListResult(respHeroListTempByte)
		if err != nil {
			return res, err
		}
		if len(respHeroListTemp.HeroList) == 0 {
			break
		}
		res.HeroList = append(res.HeroList, respHeroListTemp.HeroList...)
	}

	resTemp := make([]HeroInfo, 0)
	for _, hero := range res.HeroList {
		blackFlag := false
		for _, blackListHero := range HeroCodeBlackList {
			if hero.HeroCode == blackListHero {
				blackFlag = true
			}
		}
		if blackFlag {
			continue
		}
		resTemp = append(resTemp, hero)
	}
	res.HeroList = resTemp

	return res, nil
}

func UnmarshalArtifactResult(data []byte) (ArtifactResult, error) {
	var r ArtifactResult
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *ArtifactResult) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type ArtifactResult struct {
	ArtifactList []ArtifactDetail `json:"artifactList"`
	Lang         string           `json:"lang"`
	TotalCount   int64            `json:"totalCount"`
}

type ArtifactDetail struct {
	// LangCode              interface{} `json:"langCode"`
	ArtifactCode          string  `json:"artifactCode"`
	ArtifactName          string  `json:"artifactName"`
	JobCode               string  `json:"jobCode"`
	Grade                 int64   `json:"grade"`
	AbilityAttack         int64   `json:"abilityAttack"`
	AbilityDefense        int64   `json:"abilityDefense"`
	EnhanceAbilityAttack  int64   `json:"enhanceAbilityAttack"`
	EnhanceAbilityDefense int64   `json:"enhanceAbilityDefense"`
	InfoText              string  `json:"infoText"`
	Lv0101                string  `json:"lv01_01"`
	Lv0102                string  `json:"lv01_02"`
	Lv0103                string  `json:"lv01_03"`
	Lv0104                string  `json:"lv01_04"`
	Lv0105                string  `json:"lv01_05"`
	LVMax01               string  `json:"lvMax_01"`
	LVMax02               string  `json:"lvMax_02"`
	LVMax03               string  `json:"lvMax_03"`
	LVMax04               string  `json:"lvMax_04"`
	LVMax05               string  `json:"lvMax_05"`
	RowNum                int64   `json:"rowNum"`
	PageNo                int64   `json:"pageNo"`
	RankingSeq            int64   `json:"rankingSeq"`
	Ranking               int64   `json:"ranking"`
	SpecificGravity       float32 `json:"specificGravity"`
	// AcquisitionPlaces     interface{} `json:"acquisitionPlaces"`
}

func GetAllArtifactList() (ArtifactResult, error) {
	var res ArtifactResult
	res.ArtifactList = make([]ArtifactDetail, 0)
	for i := 1; ; i++ {
		respArtifactListTempByte, err := httpEpic(http.MethodPost, EpicGameUrl, ArtifactListPath, map[string]string{
			"Gc_currentpage": strconv.Itoa(i),
			"Gc_lang":        "zh-CN",
			"Gc_world":       "world_global",
			"Gc_ispaging":    "Y",
		})
		if err != nil {
			return res, err
		}
		respArtifactListTemp, err := UnmarshalArtifactResult(respArtifactListTempByte)
		if err != nil {
			return res, err
		}
		if len(respArtifactListTemp.ArtifactList) == 0 {
			break
		}
		res.ArtifactList = append(res.ArtifactList, respArtifactListTemp.ArtifactList...)
	}
	return res, nil
}

var ClassAtkRange = []float32{1200, 5200}
var ClassDefendRange = []float32{800, 2400}
var ClassHpRange = []float32{9000, 25000}
var ClassSpeedRange = []float32{110, 270}
var ClassCCRange = []float32{15, 100}
var ClassCDRange = []float32{100, 350}
var ClassHrRange = []float32{0, 180}
var ClassRrRange = []float32{0, 225}

var ClassRangeMap map[string][]float32 = map[string][]float32{
	ClassAtk:    ClassAtkRange,
	ClassDefend: ClassDefendRange,
	ClassHp:     ClassHpRange,
	ClassSpeed:  ClassSpeedRange,
	ClassCC:     ClassCCRange,
	ClassCD:     ClassCDRange,
	ClassHr:     ClassHrRange,
	ClassRr:     ClassRrRange,
}

func CalculateAverageAndLevel(class, statisticStr string) (float32, int, int, error) {
	if statisticStr == "" {
		return 0, 0, 0, nil
	}
	// 计算平均值
	numberStatistic := strings.Split(statisticStr, ",")
	numberArray := make([]int, 0)
	for _, strNum := range numberStatistic {
		num, err := strconv.Atoi(strNum)
		if err != nil {
			panic(err)
			return 0, 0, 0, err
		}
		numberArray = append(numberArray, num)
	}
	var totalNum int = 0
	for _, num := range numberArray {
		totalNum += num
	}
	tempRange := ClassRangeMap[class]
	var averageNum float32 = 0.0
	for index, num := range numberArray {
		averageNum = averageNum + (float32(num)/float32(totalNum))*(tempRange[0]+((float32(index)*2+1)/20)*(tempRange[1]-tempRange[0]))
	}

	level := 0
	for index := 0; index < 10; index++ {
		indexFloat := float32(index)
		if (averageNum > tempRange[0]*(10-indexFloat)/10+tempRange[1]*(indexFloat)/10) &&
			(averageNum <= tempRange[0]*(10-(indexFloat+1))/10+tempRange[1]*(indexFloat+1)/10) {
			level = index + 1
			break
		}
	}
	return float32(averageNum), level, totalNum, nil
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

	heroDetailTemp, err := UnmarshalHeroDetailResult(respHeroDetailTempByte)
	if err != nil {
		return err
	}
	heroDetailTemp.HeroDetail.AttackAverage, heroDetailTemp.HeroDetail.AttackLevel, _, _ = CalculateAverageAndLevel(ClassAtk, heroDetailTemp.HeroDetail.AttackStats)
	heroDetailTemp.HeroDetail.DefenseAverage, heroDetailTemp.HeroDetail.DefenseLevel, _, _ = CalculateAverageAndLevel(ClassDefend, heroDetailTemp.HeroDetail.DefenseStats)
	heroDetailTemp.HeroDetail.VitalityAverage, heroDetailTemp.HeroDetail.VitalityLevel, _, _ = CalculateAverageAndLevel(ClassHp, heroDetailTemp.HeroDetail.VitalityStatistics)
	heroDetailTemp.HeroDetail.SpeedAverage, heroDetailTemp.HeroDetail.SpeedLevel, _, _ = CalculateAverageAndLevel(ClassSpeed, heroDetailTemp.HeroDetail.SpeedStatistics)
	heroDetailTemp.HeroDetail.CriticalAverage, heroDetailTemp.HeroDetail.CriticalLevel, _, _ = CalculateAverageAndLevel(ClassCC, heroDetailTemp.HeroDetail.CriticalStatistics)
	heroDetailTemp.HeroDetail.CriticalHitAverage, heroDetailTemp.HeroDetail.CriticalHitLevel, _, _ = CalculateAverageAndLevel(ClassCD, heroDetailTemp.HeroDetail.CriticalHitStatistics)
	heroDetailTemp.HeroDetail.EffectiveAverage, heroDetailTemp.HeroDetail.EffectiveLevel, _, _ = CalculateAverageAndLevel(ClassHr, heroDetailTemp.HeroDetail.EffectiveStatistics)
	heroDetailTemp.HeroDetail.EffectResistanceAverage, heroDetailTemp.HeroDetail.EffectResistanceLevel, heroDetailTemp.HeroDetail.NumberStatistic, _ = CalculateAverageAndLevel(ClassRr, heroDetailTemp.HeroDetail.EffectResistanceStatistics)

	info.HeroDetail = heroDetailTemp.HeroDetail
	return nil
}

func GenerateHeroDataJSON() error {
	allHeroList, err := GetAllHeroList()
	if err != nil {
		return err
	}
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

func FileIsExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil
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
		heroImagePath := DataHeroImageFolder + hero.HeroCode + ".png"
		if FileIsExist(heroImagePath) {
			continue
		}
		respHttp, err := httpEpic(http.MethodGet, EpicStaticUrl, fmt.Sprintf(HeroImagePath, hero.HeroCode), nil)
		if err != nil {
			return err
		}
		file, err := os.Create(heroImagePath)
		if err != nil {
			Error("%+v", err)
			return err
		}
		Info(heroImagePath)
		defer file.Close()
		_, err = file.Write(respHttp)
		if err != nil {
			return err
		}
	}
	return nil
}

func GenerateArtifactDataJSON() error {
	allArtifactList, err := GetAllArtifactList()
	if err != nil {
		return err
	}
	// for index, _ := range allArtifactList.ArtifactList {
	// 	err := FullHeroDetail(&allArtifactList.ArtifactList[index])
	// 	if err != nil {
	// 		return err
	// 	}
	// }
	f, err := os.Create(DataFolder + DataArtifactStatisticName) //创建文件，会自动覆盖
	if err != nil {
		return err
	}
	defer f.Close() //关闭文件
	resByte, err := json.Marshal(allArtifactList)
	if err != nil {
		return err
	}
	_, err = f.Write(resByte)
	if err != nil {
		return err
	}
	return nil
}

func GetAllArtifactImage() error {
	ArtifactListResultByte, err := os.ReadFile(DataFolder + DataArtifactStatisticName)
	if err != nil {
		return err
	}
	artifactListResult, err := UnmarshalArtifactResult(ArtifactListResultByte)
	if err != nil {
		return err
	}

	for _, artifact := range artifactListResult.ArtifactList {
		artifactImagePath := DataArtifactImageFolder + artifact.ArtifactCode + "_ico.png"
		if FileIsExist(artifactImagePath) {
			continue
		}
		respHttp, err := httpEpic(http.MethodGet, EpicStaticUrl, fmt.Sprintf(ArtifactImagePath, artifact.ArtifactCode), nil)
		if err != nil {
			return err
		}
		file, err := os.Create(artifactImagePath)
		if err != nil {
			Error("%+v", err)
			return err
		}
		Info(artifactImagePath)
		defer file.Close()
		_, err = file.Write(respHttp)
		if err != nil {
			return err
		}
	}

	for _, artifact := range artifactListResult.ArtifactList {
		artifactImagePath := DataArtifactImageFolder + artifact.ArtifactCode + "_full.png"
		if FileIsExist(artifactImagePath) {
			continue
		}
		respHttp, err := httpEpic(http.MethodGet, EpicStaticUrl, fmt.Sprintf(ArtifactFullImagePath, artifact.ArtifactCode), nil)
		if err != nil {
			return err
		}
		file, err := os.Create(artifactImagePath)
		if err != nil {
			Error("%+v", err)
			return err
		}
		Info(artifactImagePath)
		defer file.Close()
		_, err = file.Write(respHttp)
		if err != nil {
			return err
		}
	}
	return nil
}

func (r *HeroExtraInfoResult) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type HeroExtraInfoResult map[string]HeroExtraInfo

type HeroExtraInfo struct {
	Name        string       `json:"name"`
	ExtraPanels []ExtraPanel `json:"extra_panels"`
}

type ExtraPanel struct {
	Reason      string        `json:"reason"`
	EffectValue []EffectValue `json:"EffectValue"`
}

type EffectValue struct {
	ClassType string `json:"classType"`
	Value     int64  `json:"value"`
}
