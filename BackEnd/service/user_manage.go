package service

import (
	"MHelper/db"
	db_type "MHelper/db/type"
	"MHelper/utils"
	"context"
	"fmt"
	"regexp"
)

func RegisterUser(username, password string) error {
	ctx := context.Background()
	_, err := db.Operator.CreateUser(ctx, &db_type.CreateUserRequest{
		Info: db_type.User{
			UserName: utils.NewString(username),
			PassWord: utils.NewString(password),
		},
	})
	if err != nil {
		return err
	}
	return nil
}

func CheckUser(username, password string) error {
	ctx := context.Background()
	reg := "^[A-Za-z0-9]+$"
	errFormat := fmt.Errorf("username/password只能为字母数字组合")
	if ok, _ := regexp.MatchString(reg, username); !ok {
		return errFormat
	}
	if ok, _ := regexp.MatchString(reg, password); !ok {
		return errFormat
	}

	_, err := db.Operator.GetUser(ctx, &db_type.GetUserRequest{
		UserName: username,
		PassWord: password,
	})
	if err != nil {
		return err
	}
	return nil
}
