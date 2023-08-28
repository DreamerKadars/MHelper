package db

import (
	"MHelper/db/client"
	"MHelper/db/operator"
)

// db包负责提供数据库的操作，提供数据访问层和领域层的能力，分别体现在operator和type中,领域层提供的方法会注入进数据访问层，使表层的功能在底层生效

var Operator ChiefOperator

func InitDB() {
	client.InitDBConnect()
	Operator = ChiefOperator{}
}

type ChiefOperator struct {
	operator.UserOperator
}
