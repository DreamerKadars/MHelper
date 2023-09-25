package operator

import (
	"MHelper/db/client"
	db_type "MHelper/db/type"
	"MHelper/utils"
	"context"
	"fmt"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type HeroTemplateOperator struct {
}

func (o *HeroTemplateOperator) GetCollectionName() string {
	return strings.TrimSuffix(utils.GenerateTypeName(o), "Operator")
}

func (o *HeroTemplateOperator) CreateHeroTemplate(ctx context.Context, req *db_type.CreateHeroTemplateRequest) (*db_type.CreateHeroTemplateResponse, error) {
	if err := o.IsValidHeroTemplate(&req.Info, nil); err != nil {
		return nil, err
	}

	var id db_type.ResourceID = db_type.ResourceID(utils.GenerateID(req.Info))
	req.Info.ID = id

	req.Info.CreateTime = time.Now()
	req.Info.UpdateTime = time.Now()
	result, err := client.GetCollection(o.GetCollectionName()).InsertOne(ctx, req.Info)
	if err != nil {
		return nil, err
	}
	if result.InsertedID == nil {
		return nil, fmt.Errorf("result.InsertedID is nil")
	}
	resp := &db_type.CreateHeroTemplateResponse{
		ID: req.Info.ID,
	}
	return resp, nil
}

func (o *HeroTemplateOperator) GetHeroTemplate(ctx context.Context, req *db_type.GetHeroTemplateRequest) (*db_type.GetHeroTemplateResponse, error) {
	var filter bson.D = []bson.E{}
	if req.ID != "" {
		filter = append(filter, bson.E{Key: db_type.IDFiledName, Value: req.ID})
	}
	singleResult := client.GetCollection(o.GetCollectionName()).FindOne(ctx, filter)
	if singleResult == nil {
		return nil, db_type.ErrNotFound
	}
	err := singleResult.Err()
	if err == mongo.ErrNoDocuments {
		return nil, db_type.ErrNotFound
	}
	if err != nil {
		utils.Info("%+v", err)
		return nil, err
	}
	var resp db_type.GetHeroTemplateResponse
	err = singleResult.Decode(&resp.Info)
	if err != nil {
		utils.Info("%+v", err)
		return nil, db_type.ErrInternal
	}
	return &resp, nil
}

func (o *HeroTemplateOperator) ListHeroTemplate(ctx context.Context, req *db_type.ListHeroTemplateRequest) (*db_type.ListHeroTemplateResponse, error) {
	var filter bson.D = []bson.E{}
	if req.HeroCode != nil {
		filter = append(filter, bson.E{Key: "hero_code", Value: req.HeroCode})
	}
	cur, err := client.GetCollection(o.GetCollectionName()).Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	resp := &db_type.ListHeroTemplateResponse{}
	for cur.Next(ctx) {
		HeroTemplate := db_type.HeroTemplate{}
		err = cur.Decode(&HeroTemplate)
		if err != nil {
			utils.Info("call cur.Decode fail:%+v", err)
			continue
		}
		resp.Infos = append(resp.Infos, HeroTemplate)
	}
	if err != nil {
		return nil, err
	}
	if cur.Err() != nil {

		return nil, cur.Err()
	}
	return resp, nil
}

func (o *HeroTemplateOperator) UpdateHeroTemplate(ctx context.Context, req *db_type.UpdateHeroTemplateRequest) (*db_type.UpdateHeroTemplateResponse, error) {
	_, err := o.GetHeroTemplate(ctx, &db_type.GetHeroTemplateRequest{
		ID: req.ID,
	})
	if err != nil {
		return nil, err
	}

	session, err := client.GetClient().StartSession()
	if err != nil {
		return nil, err
	}

	defer session.EndSession(context.Background())

	sessionContext := mongo.NewSessionContext(context.Background(), session)

	txnFunc := func(sessionContext mongo.SessionContext) error {
		HeroTemplate, err := o.GetHeroTemplate(sessionContext, &db_type.GetHeroTemplateRequest{ID: req.ID})
		if err != nil {
			return err
		}

		if err := o.IsValidHeroTemplate(&HeroTemplate.Info, &req.NewInfo); err != nil {
			return err
		}

		res, err := client.GetCollection(o.GetCollectionName()).UpdateOne(ctx,
			bson.D{{Key: db_type.IDFiledName, Value: req.ID}},
			bson.D{{Key: "$set", Value: req.NewInfo}},
		)

		if err == mongo.ErrNoDocuments {
			return db_type.ErrNotFound
		}
		if err != nil {
			return err
		}
		if res.MatchedCount != 1 {
			return db_type.ErrNotFound
		}
		return nil
	}

	err = mongo.WithSession(context.Background(), sessionContext, txnFunc)
	if err != nil {
		utils.Error("Transaction error:%+v", err)
		return nil, err
	}

	return &db_type.UpdateHeroTemplateResponse{}, nil
}

func (o *HeroTemplateOperator) DeleteHeroTemplate(ctx context.Context, req *db_type.DeleteHeroTemplateRequest) (*db_type.DeleteHeroTemplateResponse, error) {
	_, err := o.GetHeroTemplate(ctx, &db_type.GetHeroTemplateRequest{
		ID: req.ID,
	})
	if err != nil {
		return nil, err
	}
	res, err := client.GetCollection(o.GetCollectionName()).DeleteOne(ctx,
		bson.D{{Key: db_type.IDFiledName, Value: req.ID}})

	if err == mongo.ErrNoDocuments {
		return nil, db_type.ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	if res.DeletedCount != 1 {
		return nil, db_type.ErrNotFound
	}
	return &db_type.DeleteHeroTemplateResponse{}, nil
}

func (o *HeroTemplateOperator) IsValidHeroTemplate(oldInfo, newInfo *db_type.HeroTemplate) error {
	var tempHeroTemplate db_type.HeroTemplate = *oldInfo
	if newInfo != nil {
		updateInfoJSON, err := bson.Marshal(newInfo)
		if err != nil {
			return err
		}
		err = bson.Unmarshal(updateInfoJSON, tempHeroTemplate)
		if err != nil {
			return err
		}
	}

	heroCode := utils.GetString(tempHeroTemplate.HeroCode)

	if heroCode == "" {
		return fmt.Errorf("角色编码不能为空")
	}

	_, err := heroStaticOperator.GetHeroStaticDetail(context.Background(), &db_type.GetHeroStaticDetailRequest{
		HeroCode: heroCode,
	})
	if err != nil {
		return fmt.Errorf("寻找编码为[%s]的角色失败:%+v", heroCode, err)
	}

	if utils.GetString(tempHeroTemplate.HeroTemplateName) == "" {
		return fmt.Errorf("模板名称不能为空")
	}

	return nil
}
