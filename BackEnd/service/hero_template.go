package service

import (
	"MHelper/db"
	db_type "MHelper/db/type"
	"context"
	"fmt"
)

func GetHeroTemplate(ctx context.Context, ID string) (*db_type.HeroTemplate, error) {
	if ID == "" {
		return nil, fmt.Errorf("id is nil")
	}
	respHeroTemplate, err := db.Operator.GetHeroTemplate(ctx, &db_type.GetHeroTemplateRequest{
		ID: db_type.ResourceID(ID),
	})
	if err != nil {
		return nil, err
	}
	return &respHeroTemplate.Info, err
}

func ListHeroTemplate(ctx context.Context, req *db_type.ListHeroTemplateRequest) ([]db_type.HeroTemplate, error) {
	respHeroTemplateList, err := db.Operator.ListHeroTemplate(ctx, req)
	if err != nil {
		return nil, err
	}
	return respHeroTemplateList.Infos, err
}

func CreateHeroTemplate(ctx context.Context, req *db_type.CreateHeroTemplateRequest) (db_type.ResourceID, error) {
	respCreateHeroTemplate, err := db.Operator.CreateHeroTemplate(ctx, req)
	if err != nil {
		return "", err
	}
	return respCreateHeroTemplate.ID, nil
}

func UpdateHeroTemplate(ctx context.Context, req *db_type.UpdateHeroTemplateRequest) error {
	_, err := db.Operator.UpdateHeroTemplate(ctx, req)
	if err != nil {
		return err
	}
	return nil
}

func DeleteHeroTemplate(ctx context.Context, req *db_type.DeleteHeroTemplateRequest) error {
	_, err := db.Operator.DeleteHeroTemplate(ctx, req)
	if err != nil {
		return err
	}
	return nil
}
