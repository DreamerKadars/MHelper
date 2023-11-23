package httpmiddleware

import (
	"net/http"
	"time"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

const (
	JwtCookieKey      = "user_jwt_token"
	UserNameCookieKey = "user_name"
	LocationHeader    = "Location"
	DefaultIndex      = "/Main"
)

var jwtSecret []byte
var signer *jwt.Signer

func SetJwtSecret(jwtSecretTemp string) {
	jwtSecret = []byte(jwtSecretTemp)
	signer = jwt.NewSigner(jwt.HS256, jwtSecret, time.Hour*72)
}

func CookieTokenExtractor(ctx iris.Context) string {
	jwtCookie, err := ctx.Request().Cookie(JwtCookieKey)
	if err != nil {
		return ""
	}
	return jwtCookie.Value
}

func CreateJwtMiddleware() iris.Handler {
	verifier := jwt.NewVerifier(jwt.HS256, jwtSecret)
	verifier.Extractors = []jwt.TokenExtractor{CookieTokenExtractor}
	verifier.WithDefaultBlocklist()
	verifyMiddleware := verifier.Verify(func() interface{} {
		return new(UserJwtKey)
	})
	return verifyMiddleware
}

type UserJwtKey struct {
	Username string `json:"username"`
}

func SetJwtCookie(ctx iris.Context, username string) {
	token, err := signer.Sign(UserJwtKey{Username: username})
	if err != nil {
		ctx.SetErr(err)
		return
	}
	ctx.SetCookie(&http.Cookie{
		// Domain:  "",
		Name:    JwtCookieKey,
		Value:   string(token),
		Expires: time.Now().Add(time.Hour * 72),
		Path:    "/",
	})
	ctx.SetCookie(&http.Cookie{
		// Domain:  "",
		Name:    UserNameCookieKey,
		Value:   string(username),
		Expires: time.Now().Add(time.Hour * 72),
		Path:    "/",
	})

	ctx.StatusCode(http.StatusOK)
	// ctx.Header(LocationHeader, DefaultIndex)
}

func GetTokenInfo(ctx iris.Context) {
	claims := jwt.Get(ctx).(*UserJwtKey)
	standardClaims := jwt.GetVerifiedToken(ctx).StandardClaims
	expiresAtString := standardClaims.ExpiresAt().
		Format(ctx.Application().ConfigurationReadOnly().GetTimeFormat())
	timeLeft := standardClaims.Timeleft()

	ctx.Writef("foo=%s\nexpires at: %s\ntime left: %s\n", claims.Username, expiresAtString, timeLeft)
}
