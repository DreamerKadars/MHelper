package service

import (
	"MHelper/utils"
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

const (
	ClassEquipment      = "equipment" // 完整装备
	ClassLevel85        = "85"        // 85级装备
	dpiMin              = 70
	dpiMax              = 2400
	numLengthParam      = 2.20
	numLengthParamLarge = 3.0
)

type Equipment struct {
	ID string // 随机数ID
	Object
	CC             int       //暴击率
	CD             int       //暴击伤害
	Atk            int       //攻击白
	AtkPercent     int       //攻击百分比
	Speed          int       //速度
	Hp             int       //血量
	HpPercent      int       //血量百分比
	RR             int       //效果抵抗
	Hr             int       //效果命中
	Defend         int       //防御力
	DefendPercent  int       //防御力百分比
	Level          int       // 等级
	UpgradeLevel   int       // 强化等级
	UpgradePercent []float64 //升级到各个级别装备的概率
	AnchorIndex    int       // 主属性锚点下标
	Objects        []Object  // 包含在内的检测物体
	MainType       string    // 主属性类型
	MainValue      int       // 主属性数值
}

type Object struct {
	Class   string // 类别
	X1      float32
	Y1      float32
	X2      float32
	Y2      float32
	Value   int
	Percent bool
}

// 因为效果不好，需要进行纠正
func CorrectYoloObjects(YoloObjects []*Object) []*Equipment {
	equipment := make([]*Equipment, 0)
	otherObject := make([]*Object, 0)
	levelObject := make([]*Object, 0)

	for _, object := range YoloObjects {
		if object.Class == ClassEquipment {
			equipment = append(equipment, &Equipment{
				Object: *object,
			})
		} else if object.Class == ClassLevel85 {
			levelObject = append(levelObject, object)
		} else {
			otherObject = append(otherObject, object)
		}
	}

	// 属性归属
	for _, objectOther := range otherObject {
		for _, equip := range equipment {
			if objectOther.X2 <= equip.X2+(equip.X2-equip.X1)/10 &&
				objectOther.Y2 <= equip.Y2+(equip.Y2-equip.Y1)/10 &&
				objectOther.X1 >= equip.X1-(equip.X2-equip.X1)/10 &&
				objectOther.Y1 >= equip.Y1-(equip.Y2-equip.Y1)/10 {
				equip.Objects = append(equip.Objects, *objectOther)
			}
		}
	}

	// 等级判断
	for _, levelObjectTemp := range levelObject {
		for _, equip := range equipment {
			if levelObjectTemp.X2 <= equip.X2+(equip.X2-equip.X1)/10 &&
				levelObjectTemp.Y2 <= equip.Y2+(equip.Y2-equip.Y1)/10 &&
				levelObjectTemp.X1 >= equip.X1-(equip.X2-equip.X1)/10 &&
				levelObjectTemp.Y1 >= equip.Y1-(equip.Y2-equip.Y1)/10 {
				equip.Level = 85 // 当前只有85级装备
			}
		}
	}

	// 删除没有两条属性以上的装备
	newEquip := make([]*Equipment, 0)
	for _, equip := range equipment {
		if len(equip.Objects) > 1 {
			newEquip = append(newEquip, equip)
		}
	}
	equipment = newEquip

	// 寻找每个装备的主属性位置
	for _, equip := range equipment {
		// 装备的主属性被认为是锚点，即坐标y值最小的那个，和坐标系是反的
		var indexAnchor int = -1
		var minY float32 = 100000
		for index, object := range equip.Objects {
			if object.Y2 < minY {
				minY = object.Y2
				indexAnchor = index
			}
		}
		equip.AnchorIndex = indexAnchor
	}

	return equipment

	// 计算主属性离边框的位置,并重新改框
	var topDis, bottomDis, leftDis, rightDis float32 = 0, 0, 0, 0
	for _, equip := range equipment {
		topDis += equip.Y2 - equip.Objects[equip.AnchorIndex].Y2
		bottomDis += equip.Objects[equip.AnchorIndex].Y1 - equip.Y1
		leftDis += equip.Objects[equip.AnchorIndex].X1 - equip.X1
		rightDis += equip.X2 - equip.Objects[equip.AnchorIndex].X2

		fmt.Println(equip.Y2-equip.Objects[equip.AnchorIndex].Y2,
			equip.Objects[equip.AnchorIndex].Y1-equip.Y1,
			equip.Objects[equip.AnchorIndex].X1-equip.X1,
			equip.X2-equip.Objects[equip.AnchorIndex].X2, equip.Objects[equip.AnchorIndex].Class)
		// fmt.Printf("%+v\n",equip)
	}
	topDis /= float32(len(equipment))
	bottomDis /= float32(len(equipment))
	leftDis /= float32(len(equipment))
	rightDis /= float32(len(equipment))

	// 标准化一次框位置
	for _, equip := range equipment {
		equip.X1 = equip.Objects[equip.AnchorIndex].X1 - leftDis
		equip.Y1 = equip.Objects[equip.AnchorIndex].Y1 - bottomDis
		equip.X2 = equip.Objects[equip.AnchorIndex].X2 + topDis
		equip.Y2 = equip.Objects[equip.AnchorIndex].Y2 + rightDis
	}

	// 推算其他框的位置

	// 再次标准化

	return equipment
}

// 解析图片文件并且得出一系列信息
func ParseImage(imageFileName, imageSuffix string, ID string) ([]*Equipment, error) {
	res := make([]*Equipment, 0)
	jsonFilePath := utils.JsonPath + ID + utils.JsonSuffix

	const maxWaitTime = 100
	var jsonFile []byte
	for i := 0; i < maxWaitTime; i++ {
		<-time.NewTicker(time.Second).C
		var err error
		jsonFile, err = os.ReadFile(jsonFilePath)
		if err == nil {
			break
		}
	}

	if len(jsonFile) == 0 {
		return nil, fmt.Errorf("解析图片超时，超时时间为%d s", maxWaitTime)
	}

	YoloObjects := make([]*Object, 0)
	err := json.Unmarshal(jsonFile, &YoloObjects)
	if err != nil {
		return nil, err
	}

	res = CorrectYoloObjects(YoloObjects)
	indexImage := 1
	for _, equip := range res {
		// 装备的主属性被认为是锚点，即右上角坐标y值最大的那个
		var indexAnchor = equip.AnchorIndex

		leftX := equip.Objects[indexAnchor].X1 - (equip.Objects[indexAnchor].X2-equip.Objects[indexAnchor].X1)/5
		// 锚点右侧的属性需要参与计算数值，代表副词条
		for index, object := range equip.Objects {
			if index == indexAnchor {
				// 主属性
				value, percent, err := CalculateNum(indexImage, utils.ImageAfterProcess127Path, imageFileName, imageSuffix, false, int(object.X2), int(object.Y1), int(object.X2+numLengthParamLarge*(object.X2-object.X1)), int(object.Y2))
				if err != nil {
					continue
				}
				equip.MainType = object.Class
				if percent {
					equip.MainType += "Percent"
				}
				equip.MainValue = value
				continue
			}
			if object.X1 > leftX {
				value, percent, err := CalculateNum(indexImage, utils.ImageAfterProcess127Path, imageFileName, imageSuffix, false, int(object.X2), int(object.Y1), int(object.X2+numLengthParam*(object.X2-object.X1)), int(object.Y2))
				indexImage++
				if err != nil {
					continue
				}
				switch object.Class {
				case utils.ClassAtk:
					if percent {
						equip.AtkPercent = value
					} else {
						equip.Atk = value
					}
				case utils.ClassHp:
					if percent {
						equip.HpPercent = value
					} else {
						equip.Hp = value
					}
				case utils.ClassDefend:
					if percent {
						equip.DefendPercent = value
					} else {
						equip.Defend = value
					}
				case utils.ClassSpeed:
					equip.Speed = value
				case utils.ClassCC:
					equip.CC = value
				case utils.ClassCD:
					equip.CD = value
				case utils.ClassRr:
					equip.RR = value
				case utils.ClassHr:
					equip.Hr = value
				}
			}
		}

		// 读取装备等级
		// x1, y1, x2, y2 := GetLevelLoc(equip.X1, equip.Y1, equip.X2, equip.Y2)
		// equip.Level, _, err = CalculateNum(utils.ImageAfterProcessPath, imageFileName, imageSuffix, x1, y1, x2, y2)
		// if err != nil {
		// 	utils.Error("%+v", err)
		// }
		// 读取装备强化等级
		x1, y1, x2, y2 := GetUpgradeLevelLoc(equip.X1, equip.Y1, equip.X2, equip.Y2)
		equip.UpgradeLevel, _, err = CalculateNum(indexImage, utils.ImageAfterProcess192Path, imageFileName, imageSuffix, true, x1, y1, x2, y2)
		indexImage++
		if err != nil {
			utils.Error("%+v", err)
		}
	}
	return res, nil
}

// 计算图片中一个副属性的数值,强制需要+号时必须要识别到+号
func CalculateNum(index int, imagePath, imageFileName, imageSuffix string, mustPlus bool, x1, y1, x2, y2 int) (value int, percent bool, err error) {
	var targetImage string
	var ocrResult string
	defer func() {
		utils.Info("OCR： 生成图像文件[%s],ocr识别结果：[%s],转义结果[数字:%d 百分比;%+v],是否有错误[%+v]", targetImage, ocrResult, value, percent, err)
	}()
	targetImage = imagePath + imageFileName + "_temp_" + strconv.Itoa(index) + imageSuffix
	err = Cut(imagePath+imageFileName, targetImage, x1, y1, x2, y2)
	if err != nil {
		return 0, false, err
	}

	dpi := int((y2 - y1) * 9 / 10)

	if dpi < dpiMin {
		dpi = dpiMin
	}
	if dpi > dpiMax {
		dpi = dpiMax
	}
	cmd := exec.Command("tesseract", targetImage, "stdout", "-l", "E7", "--dpi", strconv.Itoa(dpi), "-c", "tessedit_char_whitelist=0123456789%+", "--psm", "8")
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		return
	}
	ocrResult = out.String()
	result := ocrResult
	result = strings.Replace(result, "020", "%", -1)
	if strings.Contains(result, "%") {
		percent = true
	}
	// 如果存在百分号，删除%号后面的字符
	if strings.LastIndex(result, "%") != -1 {
		result = result[:strings.LastIndex(result, "%")]
	}

	result = strings.ReplaceAll(result, "%", "")
	result = strings.ReplaceAll(result, "\n", "")
	result = strings.ReplaceAll(result, "\f", "")
	result = strings.ReplaceAll(result, " ", "")

	if len(result) == 0 {
		return 0, false, fmt.Errorf("未解析到数字")
	}
	if mustPlus && !strings.Contains(result, "+") {
		return 0, false, nil
	}
	// 如果存在+号，删除+号前的字符
	if strings.LastIndex(result, "+") != -1 {
		result = result[strings.LastIndex(result, "+"):]
	}
	result = strings.TrimPrefix(result, "+")
	value, err = strconv.Atoi(result)
	return value, percent, err
}

func Cut(source, target string, x1, y1, x2, y2 int) error {
	img, tt, err := loadImage(source)
	if err != nil {
		return err
	}
	if !rectIsInRect(x1, y1, x2, y2, img.Bounds()) {
		return fmt.Errorf("rectangele not in target image")
	}
	// 图片文件解码
	rgbImg := img.(*image.Gray)
	subImg := rgbImg.SubImage(image.Rect(x1, y1, x2, y2)).(*image.Gray) //图片裁剪x0 y0 x1 y1
	return saveImage(target, subImg, 100, tt)
}

func rectIsInRect(x1, y1, x2, y2 int, ret image.Rectangle) bool {
	var p = image.Pt(x1, y1)
	var p1 = image.Pt(x2, y2)
	return pointInRect(p, ret) && pointInRect(p1, ret)

}

//判断点是否在图片像素的矩形框内
func pointInRect(p image.Point, ret image.Rectangle) bool {
	return ret.Min.X <= p.X && p.X <= ret.Max.X &&
		ret.Min.Y <= p.Y && p.Y <= ret.Max.Y
}

//加载图片
func loadImage(path string) (image.Image, string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, "", err
	}
	defer file.Close()
	return image.Decode(file)
}

//保存图片
func saveImage(path string, subImg image.Image, quality int, tt string) error {
	f, err := os.Create(path) //创建文件，会自动覆盖
	if err != nil {
		return err
	}
	defer f.Close() //关闭文件
	var opt jpeg.Options
	opt.Quality = quality

	switch tt {
	case "jpeg":
		return jpeg.Encode(f, subImg, &opt)
	case "png":
		return png.Encode(f, subImg)
	default:
	}
	return nil
}

// 0 0.25968 0.47286 1
// 0 0 0.24633 1
func GetUpgradeLevelLoc(x1, y1, x2, y2 float32) (newX1, newY1, newX2, newY2 int) {
	newX1 = int(x1 + 0.28968*(x2-x1))
	newY1 = int(y1)
	newX2 = int(x1 + 0.42286*(x2-x1))
	newY2 = int(y1 + 0.21633*(y2-y1))
	return
}

// 0 0.05943 0.17700 1
// 0 0.10850 0.33137 1
func GetLevelLoc(x1, y1, x2, y2 float32) (newX1, newY1, newX2, newY2 int) {
	newX1 = int(x1 + 0.05943*(x2-x1))
	newY1 = int(y1 + 0.10850*(y2-y1))
	newX2 = int(x1 + 0.17700*(x2-x1))
	newY2 = int(y1 + 0.33137*(y2-y1))
	return
}
