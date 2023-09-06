package db_type

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Meta      `bson:"inline"`
	UserName  *string `bson:"user_name,omitempty"`
	AccountID *int    `bson:"account_id,omitempty"`
	PassWord  *string `bson:"pass_word,omitempty"`
	Role      *string `bson:"role,omitempty"`
}

func (u User) GetUserName() string {
	if u.UserName != nil {
		return *u.UserName
	}
	return ""
}

func (u User) GetAccountID() int {
	if u.AccountID != nil {
		return *u.AccountID
	}
	return 0
}

func (u User) GetRole() string {
	if u.Role != nil {
		return *u.Role
	}
	return ""
}

type CreateUserRequest struct {
	Info User
}

type CreateUserResponse struct {
	ID ResourceID
}

type GetUserRequest struct {
	ID       ResourceID
	UserName string
	PassWord string
}

type GetUserResponse struct {
	Info User
}

type ListUserRequest struct {
	UserSerialNumber *int `bson:"optional"`
}

type ListUserResponse struct {
	Infos []User
}

type UpdateUserRequest struct {
	ID      ResourceID
	NewInfo User
}

type UpdateUserResponse struct {
	ID ResourceID
}

type DeleteUserRequest struct {
	ID ResourceID
}

type DeleteUserResponse struct {
}

func (o *User) IsValid(newInfo interface{}) error {
	var tempUser User = *o
	if newInfo != nil {
		if updateInfo, ok := newInfo.(*User); ok {
			updateInfoJSON, err := bson.Marshal(updateInfo)
			if err != nil {
				return err
			}
			err = bson.Unmarshal(updateInfoJSON, tempUser)
			if err != nil {
				return err
			}
		}
	}

	// 应该要检验用户名的
	if tempUser.GetUserName() == "" {
		return fmt.Errorf("用户名不能为空")
	}

	return nil
}
