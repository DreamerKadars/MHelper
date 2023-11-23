package db_type

type HeroTemplate struct {
	Meta             `bson:"inline"`
	HeroTemplateName *string         `bson:"hero_template_name,omitempty"` // 模板名称
	HeroCode         *string         `bson:"hero_code,omitempty"`          // 英雄代码
	Description      *string         `bson:"description,omitempty"`        // 英雄描述
	HeroPanel        *HeroPanel      `bson:"hero_panel,omitempty"`         // 英雄面板
	AverageGrade     *float32        `bson:"average_grade,omitempty"`      // 均分
	Set              *[][]string     `bson:"set,omitempty"`                // 套装
	Artifact         *[]ArtifactInfo `bson:"artifact,omitempty"`           // 神器
	MainRing         *[]string       `bson:"main_ring,omitempty"`          // 戒指主属性
	MainNecklace     *[]string       `bson:"main_necklace,omitempty"`      // 项链主属性
	MainShoes        *[]string       `bson:"main_shoes,omitempty"`         // 鞋子主属性
	UserName         *string         `bson:"user_name,omitempty"`          // 归属用户
	IsPublic         *bool           `bson:"is_public,omitempty"`          // 是否公开
	SelfDevotion     string          `bson:"self_devotion,omitempty"`      // 阵型
}

type ArtifactInfo struct {
	ArtifactCode string
	Level        int
}
type Range struct {
	Up     int
	Down   int
	Enable bool
}

type HeroPanel struct {
	HP  Range //血量
	DF  Range //防御
	ATK Range //攻击
	SP  Range //抵抗
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
