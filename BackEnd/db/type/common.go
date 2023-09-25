package db_type

import (
	"fmt"
	"time"
)

const (
	IDFiledName = "_id"
)

var (
	ErrNotFound = fmt.Errorf("resource not found")
	ErrInternal = fmt.Errorf("internal error have happened")
)

type ResourceID string

type Meta struct {
	ID         ResourceID `bson:"_id"`
	CreateTime time.Time
	UpdateTime time.Time
}
