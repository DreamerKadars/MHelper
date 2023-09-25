package db_type

type HeroTemplate struct {
	Meta             `bson:"inline"`
	HeroTemplateName *string    `bson:"hero_template_name,omitempty"`
	HeroCode         *string    `bson:"hero_code,omitempty"`     // 英雄代码
	HeroPanel        *HeroPanel `bson:"hero_panel,omitempty"`    // 英雄面板
	AverageGrade     *int       `bson:"average_grade,omitempty"` // 均分
	Set              *[]string  `bson:"set,omitempty"`           // 套装
	Artifact         *[]string  `bson:"artifact,omitempty"`      // 神器
}

type Range struct {
	Up   int
	Down int
}

type HeroPanel struct {
	HP  Range //血量
	DF  Range //防御
	ATK Range //攻击
	CC  Range //暴击率
	CD  Range //暴击伤害
	HR  Range //命中
	RR  Range //抵抗
}

func (u HeroTemplate) GetHeroTemplateName() string {
	if u.HeroTemplateName != nil {
		return *u.HeroTemplateName
	}
	return ""
}

type CreateHeroTemplateRequest struct {
	Info HeroTemplate
}

type CreateHeroTemplateResponse struct {
	ID ResourceID
}

type GetHeroTemplateRequest struct {
	ID ResourceID
}

type GetHeroTemplateResponse struct {
	Info HeroTemplate
}

type ListHeroTemplateRequest struct {
	HeroCode         *string `bson:"optional"`
	HeroTemplateName *string `bson:"optional"`
}

type ListHeroTemplateResponse struct {
	Infos []HeroTemplate
}

type UpdateHeroTemplateRequest struct {
	ID      ResourceID
	NewInfo HeroTemplate
}

type UpdateHeroTemplateResponse struct {
}

type DeleteHeroTemplateRequest struct {
	ID ResourceID
}

type DeleteHeroTemplateResponse struct {
}
