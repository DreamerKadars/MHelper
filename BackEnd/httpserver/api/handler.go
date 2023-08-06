package api

import (
	"MHelper/service"
	"MHelper/utils"
	"bytes"
	"fmt"
	"io"
	"math/rand"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/kataras/iris/v12"
)

const (
	PngFileSuffix   = ".png"
	JpegFileSuffix  = ".jpeg"
	JpgFileSuffix   = ".jpg"
	HeaderSaveCheck = "x-st-save"
)

func saveImage(path string, buffer bytes.Buffer) error {
	// 创建本地文件
	utils.Info("%+v", path)
	f, err := os.Create(path)
	if err != nil {
		utils.Info("%+v", err)
		return err
	}

	// 将上传的文件内容复制到本地文件
	_, err = io.Copy(f, &buffer)
	if err != nil {
		utils.Info("%+v", err)
		return err
	}
	//f.Close()

	return err
}

func UploadImageInfo(ctx iris.Context) {
	// 解析multipart表单
	err := ctx.Request().ParseMultipartForm(32 << 20) // 32MB

	if err != nil {
		utils.FailResponse(ctx, fmt.Errorf("Failed to parse multipart form"))
		return
	}

	// 获取上传的文件
	file, handler, err := ctx.Request().FormFile("file")
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	defer file.Close()

	var buf bytes.Buffer
	_, err = io.Copy(&buf, file)
	if err != nil {
		panic(err)
	}

	fileSuffix := strings.ToLower(path.Ext(handler.Filename)) //获取文件后缀

	if fileSuffix != PngFileSuffix && fileSuffix != JpegFileSuffix && fileSuffix != JpgFileSuffix {
		utils.FailResponse(ctx, fmt.Errorf("图片仅仅支持png/jpeg/jpg格式"))
		return
	}

	// 生成本地文件,为该文件生成本地的唯一标识
	imageID := strconv.Itoa(int(time.Now().Unix())) + "_" + strconv.Itoa(rand.Intn(10000))
	imagePath := utils.ImagePath + imageID + fileSuffix

	if saveImage(imagePath, buf) != nil {
		utils.FailResponse(ctx, err)
		return
	}

	if res, err := strconv.ParseBool(ctx.GetHeader(HeaderSaveCheck)); err == nil && res {
		saveImagePath := utils.SaveImagePath + imageID + fileSuffix
		saveImage(saveImagePath, buf)
	}

	res, err := service.ParseImage(imageID+fileSuffix, fileSuffix, imageID)
	if err != nil {
		utils.FailResponse(ctx, err)
		return
	}
	utils.SuccessResponse(ctx, res)
}
