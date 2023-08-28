package api

import (
	"MHelper/utils"
	"time"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

var jwtSecret string

func SetJwtSecret (secret string) {
	jwtSecret = secret
}


func AuthorMiddleware (ctx iris.Context) {
	
	token := jwt.FromHeader(ctx)
	signer := jwt.NewSigner(jwt.HS256, , 15*time.Minute)
	token, err := signer.Sign(userClaims{Username: "kataras"})

	verifier := NewVerifier(HS256, secret)
	
}
// 使用JWT为用户生成可以使用的Token，并且提供解析使用的中间件