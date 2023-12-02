package db_type

import "encoding/json"

type EETypeInfo struct {
	HeroCode string `json:"heroCode"`
	HeroName string `json:"heroName"`
	EEType   string `json:"eeType"`
}

func UnmarshalEETypeDataFile(data []byte) (map[string]EETypeInfo, error) {
	var r map[string]EETypeInfo
	err := json.Unmarshal(data, &r)
	return r, err
}

func UnmarshalHeroDetailFribbelsFile(data []byte) (map[string]HeroDetailFribbels, error) {
	var r map[string]HeroDetailFribbels
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *HeroDetailFribbels) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type HeroDetailFribbels struct {
	Code             string           `json:"code"`
	SelfDevotion     SelfDevotion     `json:"self_devotion"`
	CalculatedStatus CalculatedStatus `json:"calculatedStatus"`
}

type CalculatedStatus struct {
	Lv50FiveStarFullyAwakened map[string]float64 `json:"lv50FiveStarFullyAwakened"`
	Lv60SixStarFullyAwakened  map[string]float64 `json:"lv60SixStarFullyAwakened"`
}

type SelfDevotion struct {
	Type   string `json:"type"`
	Grades Grades `json:"grades"`
}

type Grades struct {
	B   float64 `json:"B"`
	A   float64 `json:"A"`
	S   float64 `json:"S"`
	Ss  float64 `json:"SS"`
	Sss float64 `json:"SSS"`
}

type HeroDetailFile struct {
	HeroList []HeroDetail `json:"heroList"`
}

func UnmarshalHeroDetailFile(data []byte) (HeroDetailFile, error) {
	var r HeroDetailFile
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *HeroDetail) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type HeroDetail struct {
	HeroCode      string          `json:"heroCode"`
	HeroName      string          `json:"heroName"`
	Grade         int64           `json:"grade"`
	JobCode       string          `json:"jobCode"`
	AttributeCode string          `json:"attributeCode"`
	EEType        string          `json:"eeType"`
	HeroDetail    HeroDetailClass `json:"heroDetail"`
}

type HeroDetailClass struct {
	HeroCode                   string  `json:"heroCode"`
	WorldCode                  string  `json:"worldCode"`
	RegDate                    string  `json:"regDate"`
	AttackStats                string  `json:"attackStats"`
	DefenseStats               string  `json:"defenseStats"`
	VitalityStatistics         string  `json:"vitalityStatistics"`
	SpeedStatistics            string  `json:"speedStatistics"`
	CriticalStatistics         string  `json:"criticalStatistics"`
	CriticalHitStatistics      string  `json:"criticalHitStatistics"`
	EffectiveStatistics        string  `json:"effectiveStatistics"`
	EffectResistanceStatistics string  `json:"effectResistanceStatistics"`
	AttackLevel                int64   `json:"attackLevel"`
	DefenseLevel               int64   `json:"defenseLevel"`
	VitalityLevel              int64   `json:"vitalityLevel"`
	SpeedLevel                 int64   `json:"speedLevel"`
	CriticalLevel              int64   `json:"criticalLevel"`
	CriticalHitLevel           int64   `json:"criticalHitLevel"`
	EffectiveLevel             int64   `json:"effectiveLevel"`
	EffectResistanceLevel      int64   `json:"effectResistanceLevel"`
	AttackAverage              float64 `json:"attackAverage"`
	DefenseAverage             float64 `json:"defenseAverage"`
	VitalityAverage            float64 `json:"vitalityAverage"`
	SpeedAverage               float64 `json:"speedAverage"`
	CriticalAverage            float64 `json:"criticalAverage"`
	CriticalHitAverage         float64 `json:"criticalHitAverage"`
	EffectiveAverage           float64 `json:"effectiveAverage"`
	EffectResistanceAverage    float64 `json:"effectResistanceAverage"`
	NumberStatistic            int64   `json:"numberStatistic"`
	RankSets1                  string  `json:"rankSets1"`
	EqipRankShare1             float64 `json:"eqipRankShare1"`
	RankSets2                  string  `json:"rankSets2"`
	EqipRankShare2             float64 `json:"eqipRankShare2"`
	RankSets3                  string  `json:"rankSets3"`
	EqipRankShare3             float64 `json:"eqipRankShare3"`
}

// 记录一条信息
type OneClassValueInfo struct {
	ClassType string `json:"classType"`
	Value     int    `json:"value"`
}

type HeroExtraPanelInfoFile map[string]HeroExtraPanelInfo

func UnmarshalHeroExtraPanelInfoDataFile(data []byte) (map[string]HeroExtraPanelInfo, error) {
	var r HeroExtraPanelInfoFile
	err := json.Unmarshal(data, &r)
	return r, err
}

type ExtraPanel struct {
	Reason      string              `json:"reason"`
	EffectValue []OneClassValueInfo `json:"effectValue"`
}

type HeroExtraPanelInfo struct {
	Name        string       `json:"name"`
	ExtraPanels []ExtraPanel `json:"extra_panels"`
}

type HeroStatic struct {
	HeroDetailFribbels
	HeroDetail
	HeroExtraPanelInfo
}

type GetHeroStaticDetailRequest struct {
	HeroCode string
}

type GetHeroStaticDetailResponse struct {
	Info HeroStatic
}

type ListHeroStaticDetailRequest struct {
}

type ListHeroStaticDetailResponse struct {
	Infos []HeroStatic
}
