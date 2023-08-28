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

type UserOperator struct {
}

func (o *UserOperator) GetCollectionName() string {
	return strings.TrimSuffix(utils.GenerateTypeName(o), "Operator")
}

func (o *UserOperator) CreateUser(ctx context.Context, req *db_type.CreateUserRequest) (*db_type.CreateUserResponse, error) {
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
	resp := &db_type.CreateUserResponse{
		ID: req.Info.ID,
	}
	return resp, nil
}

func (o *UserOperator) GetUser(ctx context.Context, req *db_type.GetUserRequest) (*db_type.GetUserResponse, error) {
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
	var resp db_type.GetUserResponse
	err = singleResult.Decode(&resp.Info)
	if err != nil {
		utils.Info("%+v", err)
		return nil, db_type.ErrInternal
	}
	return &resp, nil
}

func (o *UserOperator) ListUser(ctx context.Context, req *db_type.ListUserRequest) (*db_type.ListUserResponse, error) {
	var filter bson.D = []bson.E{}
	if req.UserSerialNumber != nil {
		filter = append(filter, bson.E{Key: db_type.IDFiledName, Value: req.UserSerialNumber})
	}
	cur, err := client.GetCollection(o.GetCollectionName()).Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	resp := &db_type.ListUserResponse{}
	for cur.Next(ctx) {
		User := db_type.User{}
		err = cur.Decode(&User)
		if err != nil {
			utils.Info("call cur.Decode fail:%+v", err)
			continue
		}
		resp.Infos = append(resp.Infos, User)
	}
	if err != nil {
		return nil, err
	}
	if cur.Err() != nil {

		return nil, cur.Err()
	}
	return resp, nil
}

func (o *UserOperator) UpdateUser(ctx context.Context, req *db_type.UpdateUserRequest) (*db_type.UpdateUserResponse, error) {
	_, err := o.GetUser(ctx, &db_type.GetUserRequest{
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
		User, err := o.GetUser(sessionContext, &db_type.GetUserRequest{ID: req.ID})
		if err != nil {
			return err
		}

		if err := User.Info.IsValid(req.NewInfo); err != nil {
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

	return &db_type.UpdateUserResponse{}, nil
}

func (o *UserOperator) DeleteUser(ctx context.Context, req *db_type.DeleteUserRequest) (*db_type.DeleteUserResponse, error) {
	_, err := o.GetUser(ctx, &db_type.GetUserRequest{
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
	return &db_type.DeleteUserResponse{}, nil
}
