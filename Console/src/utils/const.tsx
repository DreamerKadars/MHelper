import weapon from "../asset/weapon.png"
import helmet from "../asset/helmet.png"
import cuirass from "../asset/cuirass.png"
import necklace from "../asset/necklace.jpg"
import ring from "../asset/ring.png"
import shoes from "../asset/shoes.png"

import atkPng from "../asset/class/atk.png"
import ccPng from "../asset/class/cc.png"
import cdPng from "../asset/class/cd.png"
import defendPng from "../asset/class/defend.png"
import hpPng from "../asset/class/hp.png"
import hrPng from "../asset/class/hr.png"
import rrPng from "../asset/class/rr.png"
import speedPng from "../asset/class/speed.png"
import percentPng from "../asset/class/percent.png"
import { template } from "@babel/core"


export const E7DataDomain = "https://e7.soultrial.top/Data"

export const ClassAtk = "atk"       // 攻击
export const ClassDefend = "defend"    // 防御
export const ClassHp = "hp"        // 血量
export const ClassSpeed = "speed"     // 速度
export const ClassCC = "cc"        // 暴击率
export const ClassCD = "cd"        // 暴击伤害
export const ClassHr = "hr"        // 效果命中
export const ClassRr = "rr"        // 效果抵抗
export const ClassAtkPercent = "atkPercent"       // 攻击%
export const ClassDefendPercent = "defendPercent"    // 防御%
export const ClassHpPercent = "hpPercent"        // 血量%
export const ClassSuffixPercent = "Percent"        // 百分比后缀
export const ClassSuffixFinal = "Final"        // Final后缀,代表系数

export const ClassChineseMap: Map<string, string> = new Map([
    ["","?"],
    [ClassAtk, "攻击"],
    [ClassDefend,  "防御"],
    [ClassHp,  "血量"],
    [ClassAtkPercent,  "攻击%"],
    [ClassDefendPercent,  "防御%"],
    [ClassHpPercent,  "血量%"],
    [ClassSpeed,  "速度"],
    [ClassCC,  "暴击率"],
    [ClassCD,  "暴击伤害"],
    [ClassHr,  "效果命中"],
    [ClassRr,  "效果抵抗"],
]);

export function CalculateGradeByClass(classType: string, value: number) { 
    let res = 0
    switch (classType) { 
        case ClassAtk:
            res = value / 9
            break
        case ClassAtkPercent:
            res = value
            break
        case ClassHp:
            res = value / 50
            break
        case ClassHpPercent:
            res = value
            break
        case ClassDefend:
            res = value / 6
            break
        case ClassDefendPercent:
            res = value
            break
        case ClassSpeed:
            res = value * 2
            break
        case ClassCC:
            res = value * 1.5
            break
        case ClassCD:
            res = value * 1.1
            break
        case ClassRr:
            res = value
            break
        case ClassHr:
            res = value
            break
    }
    return res
}

export const FKeyAtk = "atk"
export const FKeyDef = "def"
export const FKeySpeed = "spd"
export const FKeyCC = "chc"
export const FKeyCD = "chd"
export const FKeyHP = "hp"
export const FKeyHR = "eff"
export const FKeyRR = "efr"

export const FKeySelfDevotionAtkPercent = "att_rate"
export const FKeySelfDevotionHpPercent = "max_hp_rate"
export const FKeySelfDevotionDefPercent = "def_rate"
export const FKeySelfDevotionAtk = "att"
export const FKeySelfDevotionHp = "max_hp"
export const FKeySelfDevotionDef = "def"
export const FKeySelfDevotionCC = "cri"
export const FKeySelfDevotionHR = "acc"
export const FKeySelfDevotionRR = "res"

export const ClassMainMap: Map<string,number> = new Map([
    [ClassAtk, 525],
    [ClassDefend, 310],
    [ClassHp, 2835 ],
    [ClassAtkPercent,  65],
    [ClassDefendPercent,  65],
    [ClassHpPercent,  65],
    [ClassSpeed,  45],
    [ClassCC,  55],
    [ClassCD,  70],
    [ClassHr,  65],
    [ClassRr,  65],
]);

export function DeepCopyArray(arr: any[]) {
    const copiedArray = [];

    for (let i = 0; i < arr.length; i++) {
        const originalSubValue = arr[i];
        const copiedSubValue = { ...originalSubValue }; // 使用对象扩展运算符进行浅拷贝
        copiedArray.push(copiedSubValue);
    }

    return copiedArray;
}

export function DeepCopyNumberArray(arr: number[]) {
    const copiedArray = [];

    for (let i = 0; i < arr.length; i++) {
        const copiedSubValue = arr[i];
        copiedArray.push(copiedSubValue);
    }

    return copiedArray;
}

export const EquipLocWeapon = "weapon"
export const EquipLocHelmet = "helmet"
export const EquipLocCuirass = "cuirass"
export const EquipLocNecklace = "necklace"
export const EquipLocRing = "ring"
export const EquipLocShoes = "shoes"

export const EquipLocRange = [EquipLocWeapon, EquipLocHelmet, EquipLocCuirass, EquipLocNecklace, EquipLocRing, EquipLocShoes]
export const EquipLocCNRange = ["武器", "头盔", "胸甲", "项链", "戒指", "鞋子"]
export const EquipLocCNMap = new Map<string, string>([
    ["","?"],
    [EquipLocWeapon, "武器"],
    [EquipLocHelmet, "头盔"],
    [EquipLocCuirass, "胸甲"],
    [EquipLocNecklace, "项链"],
    [EquipLocRing, "戒指"],
    [EquipLocShoes, "鞋子"],])

export const MainRange = [ ClassAtk, ClassDefend, ClassHp, ClassSpeed, ClassCC, ClassCD, ClassHr ]
export const MainAllRange = [ ClassAtk, ClassAtkPercent, ClassDefend, ClassDefendPercent, ClassHp, ClassHpPercent, ClassSpeed, ClassCC, ClassCD, ClassHr, ClassRr ]

export const SubWeaponRange = [ClassAtkPercent, ClassHp, ClassHpPercent, ClassSpeed, ClassCC, ClassCD, ClassHr, ClassRr]
export const SubHelmetRange = [ClassAtk, ClassAtkPercent, ClassDefend, ClassDefendPercent, ClassHpPercent, ClassSpeed, ClassCC, ClassCD, ClassHr, ClassRr]
export const SubCuirassRange = [ClassDefendPercent, ClassHp, ClassHpPercent, ClassSpeed, ClassCC, ClassCD, ClassHr, ClassRr]

export const MainRingRange = [ClassAtkPercent, ClassDefendPercent, ClassHpPercent, ClassHr, ClassRr, ClassHp, ClassAtk, ClassDefend]
export const MainNecklaceRange = [ClassCC, ClassCD, ClassAtkPercent, ClassDefendPercent, ClassHpPercent, ClassHp, ClassAtk, ClassDefend]
export const MainShoesRange = [ClassSpeed, ClassAtkPercent, ClassDefendPercent, ClassHpPercent, ClassHp, ClassAtk, ClassDefend]

export const ClassAtkRange = [1200, 5200]
export const ClassDefendRange = [800, 2400]
export const ClassHpRange = [9000, 25000]
export const ClassSpeedRange = [110, 270]
export const ClassCCRange = [15, 100]
export const ClassCDRange = [100, 350]
export const ClassHrRange = [0, 180]
export const ClassRrRange = [0, 225]

export const ClassRangeMap: Map<string, number[]> = new Map([
    [ClassAtk, ClassAtkRange],
    [ClassDefend, ClassDefendRange],
    [ClassHp, ClassHpRange],
    [ClassSpeed, ClassSpeedRange],
    [ClassCC, ClassCCRange],
    [ClassCD, ClassCDRange],
    [ClassHr, ClassHrRange],
    [ClassRr, ClassRrRange],
]);

export const ChakeyList = ["c1126", "c6062", "c2089", "c1133", "c2019", "c2050", "c1143", "c1118", "c1137", "c1099", "c2074", "c2024", "c2073", "c2110", "c4144", "c4004", "c2053", "c2099", "c1117", "c2070", "c2046", "c2015", "c2004", "c1125", "c2022", "c1109", "c1014", "c1134", "c1112", "c2002", "c2071", "c2095", "c2072", "c5004", "c2012", "c2090", "c1034", "c2014", "c3105", "c2088", "c2103", "c2111", "c2009", "c2079", "c2042", "c2049", "c2008", "c1116", "c1129", "c1101", "c1006", "c5050", "c1121", "c1103", "c1102", "c1106", "c1131", "c1119", "c1100", "c1074", "c5001", "c1146", "c1140", "c1113", "c1123", "c1122", "c1135", "c2027", "c2007", "c2085", "c2062", "c2036", "c4025", "c1132", "c1070", "c1076", "c1042", "c1091", "c1114", "c5071", "c1009", "c1089", "c1142", "c1141", "c1073", "c1139", "c1019", "c4051", "c2080", "c1111", "c1110", "c1080", "c1069", "c1016", "c2082", "c1007", "c5024", "c2031", "c2037", "c2018", "c1020", "c1090", "c1065", "c1023", "c5016", "c2011", "c3094", "c1008", "c2023", "c1124", "c2039", "c1128", "c1132", "c2048", "c5009", "c1127", "c2038", "c2087", "c5149"]

export const SetAcc = "acc" // 命中
export const SetAtt = "att" // 攻击
export const SetCoop = "coop" // 夹击
export const SetCounter = "counter" // 反击
export const SetCri = "cri" // 暴击
export const SetCriDmg = "cri_dmg" // 暴伤
export const SetImmune = "immune" // 免疫
export const SetMaxHp = "max_hp" // 生命
export const SetPenetrate = "penetrate" // 穿透
export const SetRage = "rage" // 愤怒
export const SetRes = "res" // 抗性
export const SetRevenge = "revenge" // 复仇
export const SetScar = "scar" // 伤口
export const SetShield = "shield" // 护盾
export const SetSpeed = "speed" // 速度
export const SetTorrent = "torrent" // 激流
export const SetVampire = "vampire" // 吸血
export const SetDef = "def" // 防御

export const SetList = ["speed", "acc", "att", "counter", "cri_dmg", "cri", "def", "immune", "max_hp", "penetrate", "res", "torrent", "revenge", "scar", "shield", "rage", "coop", "vampire"]

export const CCGradeFactor = 1.5
export const SpeedGradeFactor = 2
export const CDGradeFactor = 1.125
export const CommonGradeFactor = 1

export interface SpeedConfig { 
    AllFixedSpeed: number;
    SpeedSetSpeed: number;
    TwoSetSpeed: number;
    FourSetSpeed: number;
}

var GlobalSpeedConfig:SpeedConfig={ 
    AllFixedSpeed: 22,
    SpeedSetSpeed: 18,
    TwoSetSpeed: 18,
    FourSetSpeed: 20,
}

export function GetGlobalSpeedConfigByLocal() { 
    let res: SpeedConfig = GlobalSpeedConfig
    if (Number(localStorage.getItem("AimSpeed#AllFixedSpeed")) !== 0) { 
        res.AllFixedSpeed = Number(localStorage.getItem("AimSpeed#AllFixedSpeed"))
    }
    if (Number(localStorage.getItem("AimSpeed#SpeedSetSpeed")) !== 0) {
        res.SpeedSetSpeed = Number(localStorage.getItem("AimSpeed#SpeedSetSpeed"))
    }
    if (Number(localStorage.getItem("AimSpeed#TwoSetSpeed")) !== 0) {
        res.TwoSetSpeed = Number(localStorage.getItem("AimSpeed#TwoSetSpeed"))
    }
    if (Number(localStorage.getItem("AimSpeed#FourSetSpeed")) !== 0) {
        res.FourSetSpeed = Number(localStorage.getItem("AimSpeed#FourSetSpeed"))
    }
    return res
}

// 单属性高的装备阀值,分数
export const HighOneSubValueGradeThreshold = 40

// 计算高速装备的阀值
export function GetHighSpeedThreshold(setType: string | undefined, EquipLoc: string, MainClassType: string) {
    let tempGlobalSpeedConfig = GetGlobalSpeedConfigByLocal()
    if (EquipLoc === EquipLocShoes) {
        return 1000 // 鞋子就别赌速度了
    }
    if ((EquipLoc === EquipLocRing || EquipLoc === EquipLocNecklace) && (MainClassType === ClassAtk || MainClassType === ClassDefend || MainClassType === ClassHp)) { 
        return tempGlobalSpeedConfig.AllFixedSpeed // 固定值项链/戒指 的赌速度要求，进一步提高
    }
    if (setType === undefined) { 
        return tempGlobalSpeedConfig.FourSetSpeed
    }
    let result = tempGlobalSpeedConfig.FourSetSpeed
    switch (setType) {
        case SetAcc:
        case SetCri:
        case SetImmune:
        case SetMaxHp:
        case SetPenetrate:
        case SetRes:
        case SetSpeed:
        case SetTorrent:
        case SetDef:
            result = tempGlobalSpeedConfig.TwoSetSpeed
    }
    return result    
}

export interface SubValue {
    Class: string;
    Value: number;
}

export const CalEquipSubValue = (equip: Equipment) => {
    let subValues = [{ Class: "", Value: 0, }, { Class: "", Value: 0, }, { Class: "", Value: 0, }, { Class: "", Value: 0, }]
    let subValueList = [equip.CC, equip.CD, equip.Atk, equip.Speed, equip.AtkPercent, equip.Hp, equip.HpPercent, equip.RR, equip.Hr, equip.Defend, equip.DefendPercent]
    let subValueClassList = [ClassCC, ClassCD, ClassAtk, ClassSpeed, ClassAtkPercent, ClassHp, ClassHpPercent, ClassRr, ClassHr, ClassDefend, ClassDefendPercent]
    let subIndex = 0
    subValueList.map((value, index) => {
        if (subIndex >= 4) {
            return
        }
        if (value !== 0) {
            subValues[subIndex] = {
                Class: subValueClassList[index],
                Value: value,
            }
            subIndex++
        }
    })
    if (subIndex == 3) { // 代表是紫装
        subValues[3] = {
            Class: "",
            Value: 0,
        }
    }
    if (equip.FourLocClass !== "" && equip.UpgradeLevel >= 12 && equip.EquipColor === "purple") { 
        let newSubValues = [{ Class: "", Value: 0, }, { Class: "", Value: 0, }, { Class: "", Value: 0, }, { Class: "", Value: 0, }]
        let subIndex = 0
        subValues.map((value, index) => { 
            if (value.Class === equip.FourLocClass) {
                newSubValues[3] = value//放在第四位
            } else { 
                newSubValues[subIndex] = value
                subIndex++
            }
        })
        subValues = newSubValues
    }
    return subValues
}

// 计算紫装剩余的一件属性，

function ConvertStringToSubValue(classArray: string[]) { 
    let res: SubValue[] = []
    classArray.map((classType:string) => { 
        res.push({
            Class: classType,
            Value: 0,
        })
    })
    return res
}

export function GetSubValueRange(EquipLoc: string, MainType: string) { 
    let range: string[] = []
    switch (EquipLoc) {
        case EquipLocWeapon:
            range = SubWeaponRange;
            break;
        case EquipLocHelmet:
            range = SubHelmetRange;
            break;
        case EquipLocCuirass:
            range = SubCuirassRange;
            break;
        case EquipLocNecklace:
            range = MainNecklaceRange;
            break;
        case EquipLocRing:
            range = MainRingRange;
            break;
        case EquipLocShoes:
            range = MainShoesRange;
            break;
    }
    range = range.filter((valueType: string) => {
        if (valueType === MainType) { 
            return false
        }
        return true
    })
    return range
}

export function GetSubValueClassFourRange(equip: Equipment) { 
    let range: string[] = []
    let subValues = CalEquipSubValue(equip)
    range = GetSubValueRange(equip.EquipLoc, equip.MainType)
    
    let res = ConvertStringToSubValue(range.filter((classType => {
        if (classType == equip.MainType) {
            return false
        }
        let exitFlag = false;
        subValues.map((subClassType) => {
            if (classType == subClassType.Class) {
                exitFlag= true
            }
        })
        if (exitFlag) { 
            return false
        }
        return true
    })))
    return res
}

export function GetClassIntensifyRange(subClass: string, Level: number) { 
    let range: number[] = []
    if (Level == 85) {
        switch (subClass) {
            case ClassAtk:
                range = [40]
                break
            case ClassAtkPercent:
                range = [4, 5, 6, 7, 8]
                break
            case ClassHp:
                range = [180]
                break
            case ClassHpPercent:
                range = [4, 5, 6, 7, 8]
                break
            case ClassDefend:
                range = [31]
                break
            case ClassDefendPercent:
                range = [4, 5, 6, 7, 8]
                break
            case ClassSpeed:
                range = [2, 3, 4]
                break
            case ClassCC:
                range = [3, 4, 5]
                break
            case ClassCD:
                range = [4, 5, 6, 7]
                break
            case ClassRr:
                range = [4, 5, 6, 7, 8]
                break
            case ClassHr:
                range = [4, 5, 6, 7, 8]
                break
        }
    } else { 
        switch (subClass) {
            case ClassAtk:
                range = [45]
                break
            case ClassAtkPercent:
                range = [5, 6, 7, 8, 9]
                break
            case ClassHp:
                range = [203]
                break
            case ClassHpPercent:
                range = [5, 6, 7, 8, 9]
                break
            case ClassDefend:
                range = [35]
                break
            case ClassDefendPercent:
                range = [5, 6, 7, 8, 9]
                break
            case ClassSpeed:
                range = [3, 4]
                break
            case ClassCC:
                range = [3, 4, 5, 6]
                break
            case ClassCD:
                range = [4, 5, 6, 7, 8]
                break
            case ClassRr:
                range = [5, 6, 7, 8, 9]
                break
            case ClassHr:
                range = [5, 6, 7, 8, 9]
                break
        }
    }
    if (range.length === 0) { 
        range = []
    }
    return range
}

export function GetClassRecoinUpgrade(subClass: string, timeUpgrade: number) {
    if (timeUpgrade < 0 || timeUpgrade > 5) { 
        return 0
    }
    let rangeRecoin = [0, 0, 0, 0, 0, 0]
    switch (subClass) {
        case ClassAtk:
            rangeRecoin = [11, 22, 33, 44, 55, 66]
            break;
        case ClassHp:
            rangeRecoin = [56, 112, 168, 224, 280, 336]
            break;
        case ClassDefend:
            rangeRecoin = [9, 18, 27, 36, 45, 54]
            break;
        case ClassAtkPercent:
            rangeRecoin = [1, 3, 4, 5, 7, 8]
            break;
        case ClassHpPercent:
            rangeRecoin = [1, 3, 4, 5, 7, 8]
            break;
        case ClassDefendPercent:
            rangeRecoin = [1, 3, 4, 5, 7, 8]
            break;
        case ClassCC:
            rangeRecoin = [1, 2, 3, 4, 5, 6]
            break;
        case ClassCD:
            rangeRecoin = [1, 2, 3, 4, 5, 6]
            break;
        case ClassSpeed:
            rangeRecoin = [0, 1, 2, 3, 4, 4]
            break;
        case ClassHr:
            rangeRecoin = [1, 3, 4, 5, 7, 8]
            break;
        case ClassRr:
            rangeRecoin = [1, 3, 4, 5, 7, 8]
            break;
    }
    return rangeRecoin[timeUpgrade]!
}

export function GetClassTransform(subClass: string, timeUpgrade: number, equipLevel:number) {
    if (timeUpgrade < 0 || timeUpgrade >= 3) {
        return 0
    }
    let rangeTransform = [0, 0, 0]
    if (equipLevel === 90 || equipLevel === 85) { // 85当作可以重铸的90来计算
        switch (subClass) {
            case ClassAtk:
                rangeTransform = [58, 99, 134]
                break;
            case ClassHp:
                rangeTransform = [259, 448, 590]
                break;
            case ClassDefend:
                rangeTransform = [44, 79, 103]
                break;
            case ClassAtkPercent:
                rangeTransform = [9, 14, 18]
                break;
            case ClassHpPercent:
                rangeTransform = [9, 14, 18]
                break;
            case ClassDefendPercent:
                rangeTransform = [9, 14, 18]
                break;
            case ClassCC:
                rangeTransform = [5, 8, 11]
                break;
            case ClassCD:
                rangeTransform = [8, 11, 15]
                break;
            case ClassSpeed:
                rangeTransform = [4, 6, 8]
                break;
            case ClassHr:
                rangeTransform = [9, 14, 18]
                break;
            case ClassRr:
                rangeTransform = [9, 14, 18]
                break;
        }
    } else { 
        switch (subClass) {
            case ClassAtk:
                rangeTransform = [47, 77, 101]
                break;
            case ClassHp:
                rangeTransform = [203, 336, 422]
                break;
            case ClassDefend:
                rangeTransform = [35, 61, 76]
                break;
            case ClassAtkPercent:
                rangeTransform = [8, 11, 14]
                break;
            case ClassHpPercent:
                rangeTransform = [8, 11, 14]
                break;
            case ClassDefendPercent:
                rangeTransform = [8, 11, 14]
                break;
            case ClassCC:
                rangeTransform = [4, 6, 8]
                break;
            case ClassCD:
                rangeTransform = [7, 9, 12]
                break;
            case ClassSpeed:
                rangeTransform = [4, 5, 6]
                break;
            case ClassHr:
                rangeTransform = [8, 11, 14]
                break;
            case ClassRr:
                rangeTransform = [8, 11, 14]
                break;
        }
    }
    return rangeTransform[timeUpgrade]!
}

interface Distribution { 
    Value: number;
    DistributionNum: number;
}
// 通过初始值和强化次数，计算该属性可能的分布，和对应的概率
export interface OneValueDistributionRange {
    Total: number;
    IntensifyNum: number;
    Class: string;
    Level: number;
    Distributions: Distribution[];
}

export function GetOneValueDistributionMapKey(classType: string, level: number, intensifyNum:number) {
    return classType + "-" + intensifyNum + "-" + level
}

export async function GenerateValueDistributionRange() { 
    let resultMap = new Map<string, OneValueDistributionRange>()

    await MainAllRange.map((classType: string) => { 
        [85, 90].map((level: number) => {
            let range = GetClassIntensifyRange(classType, level);
            [0, 1, 2, 3, 4, 5].map((intensifyNum: number) => {
                let defaultDistribution = new Array<number>(2000);
                for (let ii = 0; ii < 2000; ii++){
                    defaultDistribution[ii] = 0
                }
                defaultDistribution[0] = 1;
                for (let i = 0; i < intensifyNum; i++) { 
                    let tempDistribution = new Array<number>(2000);
                    for (let ii = 0; ii < 2000; ii++) {
                        tempDistribution[ii] = 0
                    }
                    for (let j = 0; j < 2000; j++) { 
                        for (let k = 0; k < range.length; k++) { 
                            if (j + range[k] >= 2000) { 
                                continue
                            }
                            tempDistribution[j + range[k]] += defaultDistribution[j]
                        }
                    }
                    tempDistribution.map((value, index) => { 
                        defaultDistribution[index] = value
                    })
                }

                let result: OneValueDistributionRange = { 
                    Total: 0,
                    IntensifyNum: intensifyNum,
                    Class: classType,
                    Level: level,
                    Distributions: [],
                }
                defaultDistribution.map((value, index) => {
                    if (defaultDistribution[index] !== 0) {
                        result.Distributions.push({
                            Value: index,
                            DistributionNum: value,
                        })
                        result.Total += value
                    }
                })
                resultMap.set(classType + "-" + intensifyNum + "-" + level, result)
            })
        })
    })
}

function StrMapToObj(strMap: any) { 
    let obj = Object.create(null)
    for (let [k, v] of strMap) { 
        obj[k] = v
    }
    return obj;
}

export const ClassGradeFactorMap: Map<string, number> = new Map([
    [ClassAtk, -1],
    [ClassDefend, -1],
    [ClassHp, -1],
    [ClassAtkPercent, CommonGradeFactor],
    [ClassDefendPercent, CommonGradeFactor],
    [ClassHpPercent, CommonGradeFactor],
    [ClassSpeed, SpeedGradeFactor],
    [ClassCC, CCGradeFactor],
    [ClassCD, CDGradeFactor],
    [ClassHr, CommonGradeFactor],
    [ClassRr, CommonGradeFactor],
]);

export const ClassToFKeyMap:Map<string, string> = new Map([
    [ClassAtk, FKeyAtk],
    [ClassAtkPercent, FKeyAtk],
    [ClassHp, FKeyHP],
    [ClassHpPercent, FKeyHP],
    [ClassDefend, FKeyDef],
    [ClassDefendPercent, FKeyDef],
    [ClassSpeed, FKeySpeed],
    [ClassCC, FKeyCC],
    [ClassCD, FKeyCD],
    [ClassHr, FKeyHR],
    [ClassRr, FKeyRR],
])

export const ClassSetMap: Map<string, number> = new Map([
    [SetAcc, 20], // 命中
    [SetAtt, 45], // 攻击力
    [SetDef, 20], // 防御
    [SetCoop, 0],
    [SetCounter, 0],
    [SetCri, 12],
    [SetCriDmg, 60],
    [SetImmune, 0],
    [SetMaxHp, 20],
    [SetPenetrate, 0],
    [SetRage, 0],
    [SetRes, 20],
    [SetRevenge, 12], // 12% 速度
    [SetScar, 0],
    [SetShield, 0],
    [SetSpeed, 25], // 25% 速度
    [SetTorrent, -10], // -10% 血
    [SetVampire, 0],
])

export const ValidSetToClassMap:Map<string, string> = new Map([
    [SetAcc, ClassHr], // 命中
    [SetAtt, ClassAtk], // 攻击力
    [SetDef, ClassDefend], // 防御力
    // [SetCoop, 0],
    // [SetCounter, 0],
    [SetCri, ClassCC],
    [SetCriDmg, ClassCD],
    // [SetImmune, 0],
    [SetMaxHp, ClassHp],
    // [SetPenetrate, 0],
    // [SetRage, 0],
    [SetRes, ClassRr],
    [SetRevenge, ClassSpeed], // 12% 速度
    // [SetScar, 0],
    // [SetShield, 0],
    [SetSpeed, ClassSpeed], // 25% 速度
    [SetTorrent, ClassHp], // -10% 血
    // [SetVampire, 0],
])


export const CalGradeByClass = (heroInfo: CalculatedStatus | undefined, classType: string, value: number) => {
    switch (classType) { 
        case ClassAtk:
            if (heroInfo === undefined) {
                return value / 9
            }
            return Number((100 * (value / heroInfo.lv60SixStarFullyAwakened[FKeyAtk])).toFixed(2))
        case ClassDefend:
            if (heroInfo === undefined) {
                return value / 6
            }
            return Number((100 * (value / heroInfo.lv60SixStarFullyAwakened[FKeyDef])).toFixed(2))
        case ClassHp:
            if (heroInfo === undefined) {
                return value / 50
            }
            return Number((100 * (value / heroInfo.lv60SixStarFullyAwakened[FKeyHP])).toFixed(2))
        default:
            let factor = ClassGradeFactorMap.get(classType)
            if (factor !== undefined) { 
                return  Number((factor*value).toFixed(2))
            }
    }
    return 0
}

export const CalLeftMainValueByClass = (classType: string) => {
    if (classType !== ClassAtk && classType !== ClassDefend && classType !== ClassHp) { 
        return 0
    }
    let value = ClassMainMap.get(classType)
    if (value !== undefined) { 
        return value
    }
    return 0
}

export const CalValueByClass = (heroInfo: CalculatedStatus,classType: string,value:number) => { 
    switch (classType) {
        case ClassAtkPercent: 
        case ClassDefendPercent:
        case ClassHpPercent:
            let FKeyTemp = ClassToFKeyMap.get(classType)
            if (FKeyTemp === undefined) { 
                return 0
            }
            return heroInfo?.lv60SixStarFullyAwakened[FKeyTemp] * value / 100
        default:
            return value
    }
}

export const CalMainValueByClass = (heroInfo: CalculatedStatus, mainClassType: string, classType: string) => {
    let mainValue = ClassMainMap.get(mainClassType)
    if (mainValue == undefined) {
        return 0
    }

    if (mainClassType.indexOf(classType) < 0) { 
        return 0
    }

    switch (classType) {
        case ClassAtk: 
        case ClassDefend:
        case ClassHp:
            if (mainClassType.indexOf(ClassSuffixPercent) < 0) {
                return mainValue
            } else { 
                let FKeyTemp = ClassToFKeyMap.get(classType)
                if (FKeyTemp === undefined) { 
                    return 0
                }
                return heroInfo?.lv60SixStarFullyAwakened[FKeyTemp] * mainValue / 100
            }
        default:
            return mainValue
    }
}

export const CalMainGradeByClass = (heroInfo: CalculatedStatus, mainClassType: string) => {
    let mainValue = ClassMainMap.get(mainClassType)
    if (mainValue == undefined) { 
        return 0
    }
    return CalGradeByClass(heroInfo, mainClassType, mainValue)
}

export const CalClassSetGrade = (heroInfo: CalculatedStatus | undefined, setType: string) => { 
    if (heroInfo === undefined) { 
        return 0
    }
    let value = ClassSetMap.get(setType)

    if (value == undefined) { 
        return 0
    }

    switch (setType) { 
        case SetCri:
            return value * CCGradeFactor
        case SetCriDmg:
            return value * CDGradeFactor
        case SetSpeed:
            return (heroInfo.lv60SixStarFullyAwakened[FKeySpeed] / 2)
        case SetRevenge:
            return (heroInfo.lv60SixStarFullyAwakened[FKeySpeed] * 6 / 25)
        default:
            return value
    }
}

export const CalClassSetValue = (heroInfo: CalculatedStatus | undefined, setTypes: string[], needClassType: string) => { 
    if (heroInfo === undefined) { 
        return 0
    }
    let value = 0
    setTypes.map((setType) => { 
        let valueTemp = ClassSetMap.get(setType)
        if (valueTemp == undefined) { 
            return
        }

        if (ValidSetToClassMap.get(setType) !== needClassType) { 
            return
        }

        switch (setType) { 
            case SetSpeed:
                value += (heroInfo.lv60SixStarFullyAwakened[FKeySpeed] / 4) // 25% 速度
                break;
            case SetRevenge:
                value += (heroInfo.lv60SixStarFullyAwakened[FKeySpeed] * 3 / 25) // 12% 速度
                break;
            case SetAtt:
                value += (heroInfo.lv60SixStarFullyAwakened[FKeyAtk] * 9 / 20) // 45% 攻击
                break;
            case SetMaxHp:
                value += (heroInfo.lv60SixStarFullyAwakened[FKeyHP] * 1 / 5) // 20% 生命
                break;
            case SetDef:
                value += (heroInfo.lv60SixStarFullyAwakened[FKeyDef] * 1 / 5) // 20% 防御
                break;
            case SetTorrent:
                value += (-heroInfo.lv60SixStarFullyAwakened[FKeyHP] * 1 / 5) // -10% 血量
                break;
            default:
                value += valueTemp
        }
    })
    return value
}

export interface Equipment {
    ID: string;
    Class: string;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    Value: number;
    Percent: boolean;
    CC: number;
    CD: number;
    Atk: number;
    AtkPercent: number;
    Speed: number;
    Hp: number;
    HpPercent: number;
    RR: number;
    Hr: number;
    Defend: number;
    DefendPercent: number;
    Level: number;
    UpgradeLevel: number;
    UpgradePercent: null;
    Objects: Object[];
    OriginImage?: File;
    EquipImageStr?: string;
    OriginImageWidth: number;
    OriginImageHeight: number;
    MainType: string;
    MainValue: number;
    EquipLoc: string;
    EquipColor: string;
    FourLocClass: string;
    Set?: string;
}

export const InitEquipment = () => {
    let res: Equipment = {
        ID: '',
        Class: '',
        X1: 0,
        Y1: 0,
        X2: 0,
        Y2: 0,
        Value: 0,
        Percent: true,
        CC: 0,
        CD: 0,
        Atk: 0,
        AtkPercent: 0,
        Speed: 0,
        Hp: 0,
        HpPercent: 0,
        RR: 0,
        Hr: 0,
        Defend: 0,
        DefendPercent: 0,
        Level: 0,
        UpgradeLevel: 0,
        UpgradePercent: null,
        Objects: [],
        OriginImageWidth: 0,
        OriginImageHeight: 0,
        MainType: "",
        MainValue: 0,
        EquipLoc: "",
        EquipColor: "",
        FourLocClass: "",
    }
    return res
}

export interface Object {
    Class: string;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    Value: number;
    Percent: boolean;
}


export interface UploadImageRespInfo {
    Code: number;
    Data: Equipment[];
}


export interface HeroListResult {
    heroList: HeroDetail[];
}

export interface HeroDetail {
    heroCode: string;
    heroName: string;
    grade: number;
    jobCode: JobCode;
    attributeCode: AttributeCode;
    heroDetail: HeroStaticDetail;
}

export function DefaultHeroDetail() { 
    let res: HeroDetail = {
        heroCode: "",
        heroName: "",
        grade: 0,
        jobCode: JobCode.Knight,
        attributeCode: AttributeCode.Dark,
        heroDetail: InitializeHeroStaticDetail(),
    }
    return res
}

export function ConvertHeroListResultToMap(HeroListResult: HeroListResult) {
    let res = new Map<string, HeroDetail>()
    if (HeroListResult === undefined) {
        return res
    }
    HeroListResult?.heroList?.map((info) => {
        res.set(info.heroCode, info)
    })
    return res
}

export function GetHeroDetailFromMap(heroCode: string, HeroListMap: Map<string, HeroDetail>) {
    if (HeroListMap === undefined) { 
        return DefaultHeroDetail()
    }
    let res = HeroListMap.get(heroCode)
    if (res === undefined) { 
        return DefaultHeroDetail()
    }
    return res
}

export const InitializeHeroStaticDetail = () => {
    let res: HeroStaticDetail = {
        heroCode: "",
        worldCode: "",
        attackStats: "",
        defenseStats: "",
        vitalityStatistics: "",
        speedStatistics: "",
        criticalStatistics: "",
        criticalHitStatistics: "",
        effectiveStatistics: "",
        effectResistanceStatistics: "",
        attackLevel: 0,
        defenseLevel: 0,
        vitalityLevel: 0,
        speedLevel: 0,
        criticalLevel: 0,
        criticalHitLevel: 0,
        effectiveLevel: 0,
        effectResistanceLevel: 0,
        attackAverage: 0,
        defenseAverage: 0,
        vitalityAverage: 0,
        speedAverage: 0,
        criticalAverage: 0,
        criticalHitAverage: 0,
        effectiveAverage: 0,
        effectResistanceAverage: 0,
        numberStatistic: 0,
        rankSets1: "",
        eqipRankShare1: 0,
        rankSets2: "",
        eqipRankShare2: 0,
        rankSets3: "",
        eqipRankShare3: 0,
    };
    return res
};

export type HeroFribbelsResult = Map<string, HeroFribbels>

export interface HeroFribbels {
    code: string;
    _id: string;
    name: string;
    moonlight: boolean;
    rarity: number;
    attribute: string;
    role: string;
    zodiac: string;
    self_devotion: SelfDevotion;
    assets: Assets;
    ex_equip: any[];
    skills: Skills;
    calculatedStatus: CalculatedStatus;
}

export interface Assets {
    icon: string;
    image: string;
    thumbnail: string;
}

export interface CalculatedStatus {
    lv50FiveStarFullyAwakened: { [key: string]: number };
    lv60SixStarFullyAwakened: { [key: string]: number };
}

export interface Grades {
    B: number;
    A: number;
    S: number;
    SS: number;
    SSS: number;
}

export interface Skills {
    S1: S1;
    S2: S2;
    S3: S1;
}

export interface S1 {
    hitTypes: string[];
    rate: number;
    pow: number;
    targets: number;
    selfHpScaling: number;
    options: any[];
}

export interface S2 {
    hitTypes: any[];
    options: any[];
}

export interface HeroDetailBackEnd {
    code?: string;
    self_devotion?: SelfDevotion;
    calculatedStatus?: CalculatedStatus;
    heroCode?: string;
    heroName?: string;
    grade?: number;
    jobCode?: string;
    attributeCode?: string;
    eeType?: string;
    heroDetail?: HeroDetailBackEndStatistics;
    extra_panels?: ExtraPanel[];
}

export interface ExtraPanel {
    reason: string;
    effectValue: EffectValue[];
}

export interface EffectValue {
    classType: string;
    value: number;
}

export interface HeroDetailBackEndStatistics {
    heroCode: string;
    worldCode: string;
    regDate: Date;
    attackStats: string;
    defenseStats: string;
    vitalityStatistics: string;
    speedStatistics: string;
    criticalStatistics: string;
    criticalHitStatistics: string;
    effectiveStatistics: string;
    effectResistanceStatistics: string;
    attackLevel: number;
    defenseLevel: number;
    vitalityLevel: number;
    speedLevel: number;
    criticalLevel: number;
    criticalHitLevel: number;
    effectiveLevel: number;
    effectResistanceLevel: number;
    attackAverage: number;
    defenseAverage: number;
    vitalityAverage: number;
    speedAverage: number;
    criticalAverage: number;
    criticalHitAverage: number;
    effectiveAverage: number;
    effectResistanceAverage: number;
    numberStatistic: number;
    rankSets1: string;
    eqipRankShare1: number;
    rankSets2: string;
    eqipRankShare2: number;
    rankSets3: string;
    eqipRankShare3: number;
}

export interface SelfDevotion {
    type: string;
    grades: Grades;
}

export interface Grades {
    D: number;
    C: number;
    B: number;
    A: number;
    S: number;
    SS: number;
    SSS: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toHeroDetailBackEnd(json: string): HeroDetailBackEnd {
        return JSON.parse(json);
    }

    public static heroDetailBackEndToJson(value: HeroDetailBackEnd): string {
        return JSON.stringify(value);
    }
}

export enum AttributeCode {
    Dark = "dark",
    Fire = "fire",
    Ice = "ice",
    Wind = "wind",
    Light = "light",
}

export const AttributeCodeIconFlex: Map<string, number> = new Map([
    [AttributeCode.Dark, 0],
    [AttributeCode.Fire, 1],
    [AttributeCode.Ice, 2],
    [AttributeCode.Wind, 3],
    [AttributeCode.Light, 4],
]);

export interface HeroStaticDetail {
    heroCode: string;
    worldCode: string;
    attackStats: string;
    defenseStats: string;
    vitalityStatistics: string;
    speedStatistics: string;
    criticalStatistics: string;
    criticalHitStatistics: string;
    effectiveStatistics: string;
    effectResistanceStatistics: string;
    attackLevel: number;
    defenseLevel: number;
    vitalityLevel: number;
    speedLevel: number;
    criticalLevel: number;
    criticalHitLevel: number;
    effectiveLevel: number;
    effectResistanceLevel: number;
    attackAverage: number;
    defenseAverage: number;
    vitalityAverage: number;
    speedAverage: number;
    criticalAverage: number;
    criticalHitAverage: number;
    effectiveAverage: number;
    effectResistanceAverage: number;
    numberStatistic: number;
    rankSets1: string;
    eqipRankShare1: number;
    rankSets2: string;
    eqipRankShare2: number;
    rankSets3: string;
    eqipRankShare3: number;
}

export enum JobCode {
    Assassin = "assassin",
    Knight = "knight",
    Mage = "mage",
    Manauser = "manauser",
    Ranger = "ranger",
    Warrior = "warrior",
}

export const JobCodeIconFlex: Map<string, number> = new Map([
    [JobCode.Mage, 0],
    [JobCode.Knight, 1],
    [JobCode.Assassin, 2],
    [JobCode.Ranger, 3],
    [JobCode.Manauser, 4],
    [JobCode.Warrior, 5],
]);

export interface HeroTemplate {
    ID?: string,
    HeroTemplateName?: string,
    HeroCode?: string,
    HeroPanel?: HeroPanel,
    AverageGrade?: number,
    Description?: string,
    Set?: string[][],
    Artifact?: ArtifactTemplateInfo[],
    MainRing?: string[],
    MainNecklace?: string[],
    MainShoes?: string[],
    UserName?: string,
    IsPublic?: boolean,
    SelfDevotion?: string,
}

export interface GradeAimStrategy {
    Loc: "left" | "right";
    NeedClassNum: number,
    AimGrade: number,
    Description: string,
    Probability: number[],
}

export function GetGradeAimStrategiesByLocal() { 
    let res: GradeAimStrategy[] = [...GradeAimStrategies]
    res.map((_, index) => { 
        let storageGradeStr = localStorage.getItem(res[index].Description + "#Grade")
        let storageGrade = Number(storageGradeStr)
        if (storageGrade != 0) { 
            res[index].AimGrade = storageGrade
        }
    })
    return res
}

var GradeAimStrategies: GradeAimStrategy[] = [
    {
        Loc: "left",
        NeedClassNum: 4,
        AimGrade: 65,
        Description: "左三(四需求及以上)",
        Probability: [],
    }, {
        Loc: "right",
        NeedClassNum: 4,
        AimGrade: 60,
        Description: "右三(四需求及以上)",
        Probability: [],
    }, {
        Loc: "left",
        NeedClassNum: 3, // 奶妈武器： 抗性，血量%，血量，速度
        AimGrade: 62,
        Description: "左三(三需求)",
        Probability: [],
    }, {
        Loc: "right",
        NeedClassNum: 3, // 奶妈抗性戒指： 防御%，防御，血量%，血量，速度
        AimGrade: 55,
        Description: "右三(三需求)",
        Probability: [],
    }, {
        Loc: "left",
        NeedClassNum: 2, // 纯输出护甲： 双爆
        AimGrade: 50,
        Description: "左三(双需求)",
        Probability:[],
    }, {
        Loc: "right",
        NeedClassNum: 2, // 出输出攻击鞋： 双爆
        AimGrade: 47,
        Description: "右三(双需求)",
        Probability: [],
    }
]

export function GetGlobalInsPByLocal() {
    let res: number[] = [...GlobalInsP]
    let storageGradeStr = localStorage.getItem("GlobalInsP")
    if (storageGradeStr !== "" && storageGradeStr !== null) { 
        return storageGradeStr.split(",").map(numStr => Number(numStr))
    }
    return res
}

export function GetGlobalInsSpeedPByLocal() {
    let res: number[] = [...GlobalInsSpeedP]
    let storageGradeStr = localStorage.getItem("GlobalInsSpeedP")
    if (storageGradeStr !== "" && storageGradeStr !== null) {
        return storageGradeStr.split(",").map(numStr => Number(numStr))
    }
    return res
}

var GlobalInsP: number[] = [30, 50, 70, 80, 90]
var GlobalInsSpeedP: number[] = [2, 3, 4, 5, 20]

export const ConvertValueTypePercent = "convert_percent"
export const ConvertValueTypeFixed = "convert_fixed"
export const ConvertValueTypeNull = "convert_null"
export interface HeroTemplatePreComputationForAdapter {
    HeroCode: string[],
    HeroTemplateID: string[],
    Tag: string[],
    // AtkBase: number,
    // DefendBase: number,
    // HpBase: number,
    SubValueNeed: string[],
    GradeThreshold: number,
    NeedClassTypeNum: number,
    ConvertValueType: string, // 需求不是全部都对的，就有转换的收益，转换收益有3种，转百分比、转固定值、不能转
}

function IsRightLoc(loc: string) { 
    switch (loc) {
        case EquipLocNecklace:
        case EquipLocRing:
        case EquipLocShoes:
            return true
    }
    return false
}

// 需要的属性、阀值、转换属性
export function CalHeroTemplatePreComputationForAdapter(equip: Equipment, SubValues: SubValue[], HeroTemplateList: HeroTemplate[], HeroDetailMap: Map<string, HeroDetailBackEnd>, artifactListResult:ArtifactListResult) {
    let res: HeroTemplatePreComputationForAdapter[] = []
    
    const tempMap: Map<string, HeroTemplatePreComputationForAdapter> = new Map()
    HeroTemplateList.map((heroTemplate: HeroTemplate) => { 
        if (heroTemplate.HeroCode === undefined) { 
            return
        }
        let heroInfo = HeroDetailMap.get(heroTemplate.HeroCode)
        if (heroInfo === undefined) { 
            return
        }
        // let atkBase = heroInfo?.calculatedStatus?.lv60SixStarFullyAwakened[FKeyAtk]
        // let defendBase = heroInfo?.calculatedStatus?.lv60SixStarFullyAwakened[FKeyDef]
        // let hpBase = heroInfo?.calculatedStatus?.lv60SixStarFullyAwakened[FKeyHP]

        // 套装匹配
        let flagSetMatch = false
        heroTemplate.Set?.map((sets) => { 
            sets.map((set) => { 
                if (set === equip.Set) { 
                    flagSetMatch = true
                }
            })
        })
        if (!flagSetMatch) { 
            return 
        }
        
        if (IsRightLoc(equip.EquipLoc)) { 
            // 右三主属性匹配
            let rangeMainClass: string[] = []
            switch (equip.EquipLoc) {
                case EquipLocNecklace:
                    rangeMainClass = heroTemplate.MainNecklace === undefined ? [] : heroTemplate.MainNecklace
                    break
                case EquipLocRing:
                    rangeMainClass = heroTemplate.MainRing === undefined ? [] : heroTemplate.MainRing
                    break
                case EquipLocShoes:
                    rangeMainClass = heroTemplate.MainShoes === undefined ? [] : heroTemplate.MainShoes
                    break
            }
            let flagMainClassMatch = false
            rangeMainClass.map((classType: string) => {
                if (classType === equip.MainType) {
                    flagMainClassMatch = true
                }
            })
            if (!flagMainClassMatch) {
                return
            }
        }
        
        let subValueNeed = CalculateOneEquipConfInfoByTemplate({
            template: heroTemplate,
            heroDetailBackEnd: heroInfo,
            set: [],
            mainNecklace: "",
            mainRing: "",
            mainShoes: "",
            selfDevotion: heroTemplate.SelfDevotion,
            artifactInfo: heroTemplate.Artifact,
            allArtifactInfoList: artifactListResult,
        })

        let convertValueType = ConvertValueTypeNull // 算一下把没有的属性转掉有多少转换收益
        let CanConvertList: SubValue[] = GetSubValueClassFourRange(equip) // 原本是用来求紫装的属性的，但是也可以用来求可以转换的其他范围
        CanConvertList.map((subValue) => {
            let need: CalculateClassGradeNeedOneRes | undefined
            switch (subValue.Class) {
                case ClassAtk:
                case ClassAtkPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneAtk
                    break;
                case ClassHp:
                case ClassHpPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneHP
                    break;
                case ClassDefend:
                case ClassDefendPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneDefend
                    break;
                case ClassSpeed:
                    need = subValueNeed.resCalculateClassGradeNeedOneSpeed
                    break;
                case ClassCC:
                    need = subValueNeed.resCalculateClassGradeNeedOneCC
                    break;
                case ClassCD:
                    need = subValueNeed.resCalculateClassGradeNeedOneCD
                    break;
                case ClassRr:
                    need = subValueNeed.resCalculateClassGradeNeedOneRR
                    break;
                case ClassHr:
                    need = subValueNeed.resCalculateClassGradeNeedOneHR
                    break;
            }
            if (need === undefined) {
                return
            } else {
                let level = GetSubGradeNeedLevel(subValue.Class, need.subGrade)
                if (level > 0){ 
                    if ((subValue.Class === ClassAtk || subValue.Class === ClassHp || subValue.Class === ClassDefend) &&
                        convertValueType === ConvertValueTypeNull) {
                        convertValueType = ConvertValueTypeFixed
                    } else {
                        convertValueType = ConvertValueTypePercent
                    }
                }
            }
        })

        // 计算这个模板在这个部位需要多少种属性，需要的属性数量决定目标
        let needClassNumInTemplate = 0 
        let subValueRange = GetSubValueRange(equip.EquipLoc, equip.MainType)
        subValueRange.map((subValueClass) => { 
            let need: CalculateClassGradeNeedOneRes | undefined
            switch (subValueClass) {
                case ClassAtk: // 固定值的需要当作没有，因为没有装备需要高固定值
                    break
                case ClassAtkPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneAtk
                    break;
                case ClassHp:
                    break
                case ClassHpPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneHP
                    break;
                case ClassDefend:
                    break
                case ClassDefendPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneDefend
                    break;
                case ClassSpeed:
                    need = subValueNeed.resCalculateClassGradeNeedOneSpeed
                    break;
                case ClassCC:
                    need = subValueNeed.resCalculateClassGradeNeedOneCC
                    break;
                case ClassCD:
                    need = subValueNeed.resCalculateClassGradeNeedOneCD
                    break;
                case ClassRr:
                    need = subValueNeed.resCalculateClassGradeNeedOneRR
                    break;
                case ClassHr:
                    need = subValueNeed.resCalculateClassGradeNeedOneHR
                    break;
            }
            if (need === undefined) {
                return
            } else {
                let level = GetSubGradeNeedLevel(subValueClass, need.subGrade)
                if (level > 0) { 
                    needClassNumInTemplate++
                }
            }
        })


        let needClassNumInEquip = 0
        // 需要的副属性进行筛选和分级,然后通过需求度分级        
        let tempSubValueNeed: string[] = []
        SubValues.map((subValue: SubValue) => { 
            let need
            switch (subValue.Class) { 
                case ClassAtk:
                case ClassAtkPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneAtk
                    break;
                case ClassHp:
                case ClassHpPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneHP
                    break;
                case ClassDefend:
                case ClassDefendPercent:
                    need = subValueNeed.resCalculateClassGradeNeedOneDefend
                    break;
                case ClassSpeed:
                    need = subValueNeed.resCalculateClassGradeNeedOneSpeed
                    break;
                case ClassCC:
                    need = subValueNeed.resCalculateClassGradeNeedOneCC
                    break;
                case ClassCD:
                    need = subValueNeed.resCalculateClassGradeNeedOneCD
                    break;
                case ClassRr:
                    need = subValueNeed.resCalculateClassGradeNeedOneRR
                    break;
                case ClassHr:
                    need = subValueNeed.resCalculateClassGradeNeedOneHR
                    break;
            }
            if (need === undefined) {
                tempSubValueNeed.push("")
            } else { 
                let level = GetSubGradeNeedLevel(subValue.Class, need.subGrade)
                if (level > 0) {
                    needClassNumInEquip++
                    tempSubValueNeed.push(subValue.Class)
                } else {
                    tempSubValueNeed.push("")
                }
            }
        })

        let preComputation: HeroTemplatePreComputationForAdapter            

        if (needClassNumInEquip < 2) { // 可利用的属性只有一个，那么不适合参与计算
            return
        }

        // 根据达到副词条的难度，来制定目标的有效分数（不包含极限的高速装备）
        // 决定难度的因素：
        // 1. 在该位置上，主属性固定后的，副属性选择范围
        // 2. 左三，右三，有着主属性上导致两者胚子获取难度的区别
        let locLeftOrRight: "right" | "left" = "left"
        if (equip.EquipLoc === EquipLocNecklace || equip.EquipLoc === EquipLocRing || equip.EquipLoc === EquipLocShoes) { 
            locLeftOrRight = "right"
        }

        if (needClassNumInTemplate > 4) {
            needClassNumInTemplate = 4
        }

        let aimGrade = 0 // 理论上一定能找到目标分数
        GradeAimStrategies.map((GradeAimStrategy) => { 
            if (GradeAimStrategy.Loc === locLeftOrRight && GradeAimStrategy.NeedClassNum === needClassNumInTemplate) { 
                aimGrade = GradeAimStrategy.AimGrade
            }
        })

        let needCode = ""
        tempSubValueNeed.map((needTemp) => {
            if (needTemp) {
                needCode += "1"
            } else {
                needCode += "0"
            }
        })
        needCode += "#" + aimGrade
        if (tempMap.get(needCode) === undefined) {
            preComputation = {
                HeroCode: [heroTemplate.HeroCode],
                SubValueNeed: tempSubValueNeed,
                GradeThreshold: aimGrade,
                HeroTemplateID: [heroTemplate.ID!],
                Tag: [],
                NeedClassTypeNum: needClassNumInTemplate,
                ConvertValueType: convertValueType,
            }
            tempMap.set(needCode, preComputation)
        } else {
            preComputation = tempMap.get(needCode)!
            if (!preComputation.HeroCode.includes(heroTemplate.HeroCode)) {
                preComputation.HeroCode.push(heroTemplate.HeroCode)
            }
            preComputation.HeroTemplateID.push(heroTemplate.ID!)
        }
    })

    for (let value of tempMap.values()) { // 遍历所有的强化次数分配keys
        res.push(value)
    }
    return res
}

export interface ArtifactTemplateInfo {
    ArtifactCode?: string,
    Level?: number,
}
export interface Range {
    Up: number,
    Down: number,
    Enable: boolean,
}

export const FKeySelfDevotionTranslationMap = new Map<string, string>([
    [FKeySelfDevotionAtkPercent, "攻击%"],
    [FKeySelfDevotionHpPercent, "生命%"],
    [FKeySelfDevotionDefPercent, "防御%"],
    [FKeySelfDevotionAtk, "攻击"],
    [FKeySelfDevotionHp, "生命"],
    [FKeySelfDevotionDef, "防御"],
    [FKeySelfDevotionCC, "暴率"],
    [FKeySelfDevotionHR, "命中"],
    [FKeySelfDevotionRR, "抗性"],
])

export function GetSelfDevotionTypeChinese(type?: string) {
    if (type === undefined) {
        return ""
    }
    let res = FKeySelfDevotionTranslationMap.get(type)
    if (res === undefined) {
        return ""
    }
    return res
}

export const FKeySelfDevotionToCommonMap = new Map<string, string>([
    [FKeySelfDevotionAtkPercent, ClassAtkPercent],
    [FKeySelfDevotionHpPercent, ClassHpPercent],
    [FKeySelfDevotionDefPercent, ClassDefendPercent],
    [FKeySelfDevotionAtk, ClassAtk],
    [FKeySelfDevotionHp, ClassHp],
    [FKeySelfDevotionDef, ClassDefend],
    [FKeySelfDevotionCC, ClassCC],
    [FKeySelfDevotionHR, ClassHr],
    [FKeySelfDevotionRR, ClassRr],
])

export function ConvertSelfDevotionTypeToCommon(type?: string) {
    if (type === undefined) {
        return ""
    }
    let res = FKeySelfDevotionToCommonMap.get(type)
    if (res === undefined) {
        return ""
    }
    return res
}

export function GetSelfDevotionGradeValueByLevel(level: string, selfDevotionInfo?: SelfDevotion) {
    if (selfDevotionInfo === undefined || level === "") {
        return 0
    }
    let factor = 1
    switch (selfDevotionInfo.type) { 
        case FKeySelfDevotionAtkPercent:
        case FKeySelfDevotionHpPercent:
        case FKeySelfDevotionDefPercent:
        case FKeySelfDevotionCC:
        case FKeySelfDevotionHR:
        case FKeySelfDevotionRR:
            factor = 100
    }
    switch (level) {
        case "D":
            return Number((selfDevotionInfo.grades.D * factor).toFixed(2))
        case "C":
            return Number((selfDevotionInfo.grades.C * factor).toFixed(2))
        case "B":
            return Number((selfDevotionInfo.grades.B * factor).toFixed(2))
        case "A":
            return Number((selfDevotionInfo.grades.A * factor).toFixed(2))
        case "S":
            return Number((selfDevotionInfo.grades.S * factor).toFixed(2))
        case "SS":
            return Number((selfDevotionInfo.grades.SS * factor).toFixed(2))
        case "SSS":
            return Number((selfDevotionInfo.grades.SSS * factor).toFixed(2))
    }
    return 0
}

export function CreateHeroPanelWithUP(heroDetailBackEnd?: HeroDetailBackEnd) {
    let temp: HeroPanel = {
        HP: { Down: 0, Up: 40000, Enable: false },//血量
        DF: { Down: 0, Up: 3500, Enable: false },//防御
        ATK: { Down: 0, Up: 6000, Enable: false },//攻击
        SP: { Down: 0, Up: 350, Enable: false },//速度
        CC: { Down: 0, Up: 100, Enable: false },//暴击率
        CD: { Down: 0, Up: 350, Enable: false },//暴击伤害
        HR: { Down: 0, Up: 350, Enable: false },//命中
        RR: { Down: 0, Up: 350, Enable: false },//抵抗
    }
    if (heroDetailBackEnd !== undefined && heroDetailBackEnd.calculatedStatus !== undefined) {
        temp.ATK.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyAtk]
        temp.DF.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyDef]
        temp.SP.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeySpeed]
        temp.HP.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyHP]
        temp.CC.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyCC] * 100
        temp.CD.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyCD] * 100
        temp.HR.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyHR] * 100
        temp.RR.Down = heroDetailBackEnd.calculatedStatus.lv60SixStarFullyAwakened[FKeyRR] * 100
    }
    return temp
}
export interface HeroPanel {
    HP: Range,//血量
    DF: Range,//防御
    SP: Range,//速度
    ATK: Range,//攻击
    CC: Range,//暴击率
    CD: Range,//暴击伤害
    HR: Range,//命中
    RR: Range,//抵抗
}

export interface ArtifactListResult {
    artifactList: ArtifactInfo[],
}
export interface ArtifactInfo {
    artifactCode: string;
    artifactName: string;
    jobCode: string;
    grade: number;
    abilityAttack: number;
    abilityDefense: number;
    enhanceAbilityAttack: number;
    enhanceAbilityDefense: number;
    infoText: string;
    lv01_01: string;
    lv01_02: string;
    lv01_03: string;
    lv01_04: string;
    lv01_05: string;
    lvMax_01: string;
    lvMax_02: string;
    lvMax_03: string;
    lvMax_04: string;
    lvMax_05: string;
    rowNum: number;
    pageNo: number;
    rankingSeq: number;
    ranking: number;
    specificGravity: number;
}
export function DefaultArtifactInfo() {
    let res: ArtifactInfo = {
        artifactCode: "",
        artifactName: "",
        jobCode: "",
        grade: 0,
        abilityAttack: 0,
        abilityDefense: 0,
        enhanceAbilityAttack: 0,
        enhanceAbilityDefense: 0,
        infoText: "",
        lv01_01: "",
        lv01_02: "",
        lv01_03: "",
        lv01_04: "",
        lv01_05: "",
        lvMax_01: "",
        lvMax_02: "",
        lvMax_03: "",
        lvMax_04: "",
        lvMax_05: "",
        rowNum: 0,
        pageNo: 0,
        rankingSeq: 0,
        ranking: 0,
        specificGravity: 0,
    }
    return res
}
export function GetEETypeValue(type:string) { 
    switch (type) { 
        case ClassAtkPercent:
        case ClassHpPercent:
        case ClassDefendPercent:
            return 14
        case ClassCC:
            return 12
        case ClassSpeed:
            return 10
        case ClassHr:
        case ClassRr:
            return 16
    }
    return 0
}

// 攻击需求 0-20 分 基本不需要 不能歪
// 攻击需求 20-120 分 歪3次以内，也就是27分以内，超过作废
// 120分以上，多少都OK
export const SubGradeNeedLevelRange = new Map<string, number[]>([
    [ClassAtk, [30, 120, 170, 220]],
    [ClassAtkPercent, [30, 120, 170, 220]],
    [ClassHp, [30, 120, 170, 220]],
    [ClassHpPercent, [30, 120, 170, 220]],
    [ClassDefend, [30, 120, 170, 220]],
    [ClassDefendPercent, [30, 120, 170, 220]],
    [ClassSpeed, [30, 120, 200, 250]],
    [ClassCC, [20, 50, 100, 1000]],
    [ClassCD, [20, 50, 100, 170]],
    [ClassHr, [20, 50, 100, 150]],
    [ClassRr, [20, 50, 100, 150]],
    ]
)

export const GetSubGradeNeedLevel = (classType: string, grade: number) => {
    let range = SubGradeNeedLevelRange.get(classType)
    if (grade === 0) { 
        return 0
    }
    if (range === undefined) { 
        return 0
    }
    let res = 4
    
    for (let i = 0; i < range.length;i++){
        if (grade < range[i]) { 
            res = i
            break
        }
    }
    return res
}

export function GetDefaultEquipImage(EquipLoc: string) {
    switch (EquipLoc) { 
        case EquipLocWeapon:
            return weapon
        case EquipLocHelmet:
            return helmet
        case EquipLocCuirass:
            return cuirass
        case EquipLocNecklace:
            return necklace
        case EquipLocRing:
            return ring
        case EquipLocShoes:
            return shoes
    }
    return ""
}

export function GetClassImage(classType: string) {
    switch (classType) {
        case ClassAtk:
        case ClassAtkPercent:
            return atkPng
        case ClassHp:
        case ClassHpPercent:
            return hpPng
        case ClassDefend:
        case ClassDefendPercent:
            return defendPng
        case ClassCC:
            return ccPng
        case ClassCD:
            return cdPng
        case ClassSpeed:
            return speedPng
        case ClassHr:
            return hrPng
        case ClassRr:
            return rrPng
        case ClassSuffixPercent:
            return percentPng
    }
    return ""
}

export class IntensifyDistribution {
    EquipType: "red" | "purple";
    StartLevel: number;
    Distribution: Map<string, number>;
    Total: number;
    constructor() {
        this.EquipType = "red"
        this.StartLevel = 0
        this.Distribution = new Map<string, number>()
        this.Total = 0
    }
}

export const IntensifyDistributions: IntensifyDistribution[] = [
    {
        "EquipType": "red",
        "StartLevel": 0,
        "Distribution": new Map<string, number>([
            ["0005", 1],
            ["0014", 5],
            ["0023", 10],
            ["0032", 10],
            ["0041", 5],
            ["0050", 1],
            ["0104", 5],
            ["0113", 20],
            ["0122", 30],
            ["0131", 20],
            ["0140", 5],
            ["0203", 10],
            ["0212", 30],
            ["0221", 30],
            ["0230", 10],
            ["0302", 10],
            ["0311", 20],
            ["0320", 10],
            ["0401", 5],
            ["0410", 5],
            ["0500", 1],
            ["1004", 5],
            ["1013", 20],
            ["1022", 30],
            ["1031", 20],
            ["1040", 5],
            ["1103", 20],
            ["1112", 60],
            ["1121", 60],
            ["1130", 20],
            ["1202", 30],
            ["1211", 60],
            ["1220", 30],
            ["1301", 20],
            ["1310", 20],
            ["1400", 5],
            ["2003", 10],
            ["2012", 30],
            ["2021", 30],
            ["2030", 10],
            ["2102", 30],
            ["2111", 60],
            ["2120", 30],
            ["2201", 30],
            ["2210", 30],
            ["2300", 10],
            ["3002", 10],
            ["3011", 20],
            ["3020", 10],
            ["3101", 20],
            ["3110", 20],
            ["3200", 10],
            ["4001", 5],
            ["4010", 5],
            ["4100", 5],
            ["5000", 1]
        ]),
        "Total": 1024
    },
    {
        "EquipType": "red",
        "StartLevel": 3,
        "Distribution": new Map<string, number>([
            ["0004", 1],
            ["0013", 4],
            ["0022", 6],
            ["0031", 4],
            ["0040", 1],
            ["0103", 4],
            ["0112", 12],
            ["0121", 12],
            ["0130", 4],
            ["0202", 6],
            ["0211", 12],
            ["0220", 6],
            ["0301", 4],
            ["0310", 4],
            ["0400", 1],
            ["1003", 4],
            ["1012", 12],
            ["1021", 12],
            ["1030", 4],
            ["1102", 12],
            ["1111", 24],
            ["1120", 12],
            ["1201", 12],
            ["1210", 12],
            ["1300", 4],
            ["2002", 6],
            ["2011", 12],
            ["2020", 6],
            ["2101", 12],
            ["2110", 12],
            ["2200", 6],
            ["3001", 4],
            ["3010", 4],
            ["3100", 4],
            ["4000", 1]]),
        "Total": 256
    },
    {
        "EquipType": "red",
        "StartLevel": 6,
        "Distribution": new Map<string, number>([
            ["0003", 1],
            ["0012", 3],
            ["0021", 3],
            ["0030", 1],
            ["0102", 3],
            ["0111", 6],
            ["0120", 3],
            ["0201", 3],
            ["0210", 3],
            ["0300", 1],
            ["1002", 3],
            ["1011", 6],
            ["1020", 3],
            ["1101", 6],
            ["1110", 6],
            ["1200", 3],
            ["2001", 3],
            ["2010", 3],
            ["2100", 3],
            ["3000", 1],
        ]),
        "Total": 64
    },
    {
        "EquipType": "red",
        "StartLevel": 9,
        "Distribution": new Map<string, number>([
            ["0002", 1],
            ["0011", 2],
            ["0020", 1],
            ["0101", 2],
            ["0110", 2],
            ["0200", 1],
            ["1001", 2],
            ["1010", 2],
            ["1100", 2],
            ["2000", 1],
        ]),
        "Total": 16
    },
    {
        "EquipType": "red",
        "StartLevel": 12,
        "Distribution": new Map<string, number>([
            ["0001", 1],
            ["0010", 1],
            ["0100", 1],
            ["1000", 1],
        ]),
        "Total": 4
    },
    {
        "EquipType": "red",
        "StartLevel": 15,
        "Distribution": new Map<string, number>([
            ["0000", 1],
        ]),
        "Total": 1
    },
    {
        "EquipType": "purple",
        "StartLevel": 0,
        "Distribution": new Map<string, number>([
            ["0032", 1],
            ["0041", 1],
            ["0122", 3],
            ["0131", 4],
            ["0212", 3],
            ["0221", 6],
            ["0302", 1],
            ["0311", 4],
            ["0401", 1],
            ["1022", 3],
            ["1031", 4],
            ["1112", 6],
            ["1121", 12],
            ["1202", 3],
            ["1211", 12],
            ["1301", 4],
            ["2012", 3],
            ["2021", 6],
            ["2102", 3],
            ["2111", 12],
            ["2201", 6],
            ["3002", 1],
            ["3011", 4],
            ["3101", 4],
            ["4001", 1],
        ]),
        "Total": 108
    },
    {
        "EquipType": "purple",
        "StartLevel": 3,
        "Distribution": new Map<string, number>([
            ["0022", 1],
            ["0031", 1],
            ["0112", 2],
            ["0121", 3],
            ["0202", 1],
            ["0211", 3],
            ["0301", 1],
            ["1012", 2],
            ["1021", 3],
            ["1102", 2],
            ["1111", 6],
            ["1201", 3],
            ["2002", 1],
            ["2011", 3],
            ["2101", 3],
            ["3001", 1],
        ]),
        "Total": 36
    },
    {
        "EquipType": "purple",
        "StartLevel": 6,
        "Distribution": new Map<string, number>([
            ["0012", 1],
            ["0021", 1],
            ["0102", 1],
            ["0111", 2],
            ["0201", 1],
            ["1002", 1],
            ["1011", 2],
            ["1101", 2],
            ["2001", 1],
        ]),
        "Total": 12
    },
    {
        "EquipType": "purple",
        "StartLevel": 9,
        "Distribution": new Map<string, number>([
            ["0002", 1],
            ["0011", 1],
            ["0101", 1],
            ["1001", 1],
        ]),
        "Total": 4
    },
    {
        "EquipType": "purple",
        "StartLevel": 12,
        "Distribution": new Map<string, number>([
            ["0001", 1],
            ["0010", 1],
            ["0100", 1],
            ["1000", 1],
        ]),
        "Total": 4
    },{
        "EquipType": "purple",
        "StartLevel": 15,
        "Distribution": new Map<string, number>([
            ["0000", 1],
        ]),
        "Total": 1
    }
]

export interface CalculateClassGradeNeedOneReq {
    classType: string
    setList: string[]
    mainNecklace: string
    mainRing: string
    mainShoes: string
    heroInfo: CalculatedStatus
    extraHeroInfo?: ExtraPanel[]
    aim?: Range
}

export interface ExtraValueShowInfo { reason: string, value: number }

export interface CalculateClassGradeNeedOneRes {
    baseValue: number
    leftValue: number
    setValue: number
    mainValue: number
    subValue: number
    subGrade: number
    factor: number
    extraValue: ExtraValueShowInfo[]
}

export function CalculateClassGradeNeedOne(req: CalculateClassGradeNeedOneReq) {
    const { classType, setList, mainNecklace, mainRing, mainShoes, heroInfo, aim, extraHeroInfo } = req
    // 基础值+套装+主属性+副属性 = 模版目标
    let baseValue = 0
    let leftValue = CalLeftMainValueByClass(classType)
    let setValue = 0
    let mainValue = 0
    let subValue = 0
    let subGrade = 0

    let factor = 100 // 有情况会导致有倍率计算
    let extraValue: ExtraValueShowInfo[] = []
    let extraValueSum = 0

    if (aim === undefined || aim.Enable === false) {

    } else {
        setValue = CalClassSetValue(heroInfo, setList, classType)

        let FKeyTemp = ClassToFKeyMap.get(classType)
        if (FKeyTemp !== undefined) {
            baseValue = heroInfo?.lv60SixStarFullyAwakened[FKeyTemp]
            if (FKeyTemp === FKeyCC || FKeyTemp === FKeyCD || FKeyTemp === FKeyHR || FKeyTemp === FKeyRR) {
                baseValue *= 100
            }
        }

        mainValue = CalMainValueByClass(heroInfo, mainNecklace, classType) + CalMainValueByClass(heroInfo, mainRing, classType) + CalMainValueByClass(heroInfo, mainShoes, classType)
        mainValue = Number(mainValue.toFixed(2))
        extraHeroInfo?.map((ExtraPanel) => {
            ExtraPanel.effectValue.map((panel) => {
                if (panel.classType.indexOf(classType) >= 0) {
                    if (panel.classType.indexOf(ClassSuffixFinal) >= 0) {
                        factor += panel.value
                        return
                    }
                    let tempValue = CalValueByClass(heroInfo, panel.classType, panel.value)
                    extraValue.push({
                        reason: ExtraPanel.reason,
                        value: tempValue,
                    })
                    extraValueSum += tempValue
                }
            })
        })


        subValue = Number((aim.Down * 100 / factor - baseValue - leftValue - setValue - mainValue - extraValueSum).toFixed(2))
        subGrade = CalGradeByClass(heroInfo, classType, subValue)
    }
    let res: CalculateClassGradeNeedOneRes = {
        baseValue: baseValue,
        leftValue: leftValue,
        setValue: setValue,
        mainValue: mainValue,
        subValue: subValue,
        subGrade: subGrade,
        factor: factor,
        extraValue: extraValue,
    }
    return res
}
export interface OneEquipConfInfo {
    resCalculateClassGradeNeedOneHP: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneDefend: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneAtk: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneSpeed: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneCC: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneCD: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneHR: CalculateClassGradeNeedOneRes;
    resCalculateClassGradeNeedOneRR: CalculateClassGradeNeedOneRes;
}

export interface CalculateOneEquipConfInfoByTemplateReq {
    template: HeroTemplate,
    heroDetailBackEnd: HeroDetailBackEnd,
    set: string[],
    mainNecklace: string,
    mainRing: string,
    mainShoes: string,
    artifactInfo?: ArtifactTemplateInfo[],
    allArtifactInfoList?: ArtifactListResult,
    selfDevotion?: string,
}

export function GetArtifactValueByLevel(artifactCode: string, level: number, allArtifactInfoList: ArtifactListResult) {
    if (allArtifactInfoList === undefined) {
        return { ATK: 0, HP: 0 }
    }

    let tempArtifactInfo = DefaultArtifactInfo()
    allArtifactInfoList.artifactList.map((artifactTemp: ArtifactInfo, artifactIndex: number) => {
        if (artifactTemp.artifactCode === artifactCode) {
            tempArtifactInfo = artifactTemp
        }
    })

    return {
        HP: Number(((tempArtifactInfo.abilityDefense * (30 - level) + tempArtifactInfo.enhanceAbilityDefense * level) / 30).toFixed(2)),
        ATK: Number(((tempArtifactInfo.abilityAttack * (30 - level) + tempArtifactInfo.enhanceAbilityAttack * level) / 30).toFixed(2)),
    }
}

export function CalculateOneEquipConfInfoByTemplate(req: CalculateOneEquipConfInfoByTemplateReq) {
    const { template, heroDetailBackEnd, set, mainNecklace, mainRing, mainShoes, artifactInfo, allArtifactInfoList, selfDevotion } = req

    let extra_panels: ExtraPanel[] = []
    if (heroDetailBackEnd.extra_panels !== undefined && heroDetailBackEnd.extra_panels !== null) {
        extra_panels = [...heroDetailBackEnd.extra_panels]
    }

    // 计算神器的攻击力和血量加到额外配置上
    if (artifactInfo !== undefined && artifactInfo !== null && artifactInfo[0] !== undefined && allArtifactInfoList !== undefined) {
        let res = GetArtifactValueByLevel(artifactInfo[0].ArtifactCode === undefined ? "" : artifactInfo[0].ArtifactCode,
            artifactInfo[0].Level === undefined ? 0 : artifactInfo[0].Level,
            allArtifactInfoList)
        extra_panels.push({
            reason: '神器加成',
            effectValue: [{
                classType: "hp",
                value: res.HP,
            }, {
                classType: "atk",
                value: res.ATK,
            }]
        })
    }

    // 计算阵型的攻击力和血量加到额外配置上
    if (selfDevotion !== undefined && selfDevotion !== "") {
        let value = GetSelfDevotionGradeValueByLevel(selfDevotion, heroDetailBackEnd.self_devotion)
        extra_panels.push({
            reason: selfDevotion + '自阵加成',
            effectValue: [{
                classType: ConvertSelfDevotionTypeToCommon(heroDetailBackEnd.self_devotion?.type),
                value: value,
            }]
        })
    }

    // 计算专属装备的加成加到额外配置上
    if (heroDetailBackEnd.eeType !== undefined && heroDetailBackEnd.eeType !== "") {
        extra_panels.push({
            reason: '专属装备加成',
            effectValue: [{
                classType: heroDetailBackEnd.eeType,
                value: GetEETypeValue(heroDetailBackEnd.eeType),
            }]
        })
    }

    let resCalculateClassGradeNeedOneHP = CalculateClassGradeNeedOne({
        classType: ClassHp,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.HP,
    })
    let resCalculateClassGradeNeedOneDefend = CalculateClassGradeNeedOne({
        classType: ClassDefend,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.DF,
    })
    let resCalculateClassGradeNeedOneAtk = CalculateClassGradeNeedOne({
        classType: ClassAtk,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.ATK,
    })
    let resCalculateClassGradeNeedOneSpeed = CalculateClassGradeNeedOne({
        classType: ClassSpeed,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.SP,
    })
    let resCalculateClassGradeNeedOneCC = CalculateClassGradeNeedOne({
        classType: ClassCC,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.CC,
    })
    let resCalculateClassGradeNeedOneCD = CalculateClassGradeNeedOne({
        classType: ClassCD,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.CD,
    })
    let resCalculateClassGradeNeedOneHR = CalculateClassGradeNeedOne({
        classType: ClassHr,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.HR,
    })
    let resCalculateClassGradeNeedOneRR = CalculateClassGradeNeedOne({
        classType: ClassRr,
        setList: set,
        mainNecklace: mainNecklace,
        mainRing: mainRing,
        mainShoes: mainShoes,
        heroInfo: heroDetailBackEnd?.calculatedStatus!,
        extraHeroInfo: extra_panels,
        aim: template.HeroPanel?.RR,
    })

    let res: OneEquipConfInfo = {
        resCalculateClassGradeNeedOneHP: resCalculateClassGradeNeedOneHP,
        resCalculateClassGradeNeedOneDefend: resCalculateClassGradeNeedOneDefend,
        resCalculateClassGradeNeedOneAtk: resCalculateClassGradeNeedOneAtk,
        resCalculateClassGradeNeedOneSpeed: resCalculateClassGradeNeedOneSpeed,
        resCalculateClassGradeNeedOneCC: resCalculateClassGradeNeedOneCC,
        resCalculateClassGradeNeedOneCD: resCalculateClassGradeNeedOneCD,
        resCalculateClassGradeNeedOneHR: resCalculateClassGradeNeedOneHR,
        resCalculateClassGradeNeedOneRR: resCalculateClassGradeNeedOneRR,
    }
    return res
}

// 猜测强化次数，只计算85装备
export function GuessUpgradeDistribution(subValues: SubValue[], upgradeTime: number, equipColor: string) { 
    let upgradeTimeDistribution: number[] = [0, 0, 0, 0]
    let subRanges: number[][] = []
    
    subValues.map((subValue) => { 
        subRanges.push(GetClassIntensifyRange(subValue.Class, 85))
    })

    let guessUpgradeTime = 0
    // 第一遍，优先除以强化平均值，计算一个大概
    subValues.map((subValue, index) => { 
        if (subValue.Class === "") { 
            return
        }
        let average = 0
        subRanges[index].map((value) => {
            average += value
        })
        average /= subRanges[index].length
        let resTemp = (subValue.Value / average) // 除以平均值的次数

        if (resTemp > 0 && resTemp <= 1) {
            resTemp = 1
        } else { 
            resTemp = Math.round(resTemp) // 四舍五入一下
        }
        if (resTemp > 0) { 
            resTemp -= 1 // 剪掉初始
        }
        guessUpgradeTime += resTemp
        upgradeTimeDistribution[index] = resTemp
    })
    
    // 进行次数调整，最多进行5次
    for (let i = 0; i < 5; i++){
        if (guessUpgradeTime === upgradeTime) { 
            break
        }
        
        let factor = 1 // 提升某一个次数
        if (guessUpgradeTime > upgradeTime) {
            // 找一个降低概率最多的
            factor = -1
        }

        let operateIndex = -1
        let operateIndexProbability = 0
        subValues.map((subValue, index) => {
            if (subValue.Value === 0) { // 没有该词条
                return
            }
            if (subValue.Class === ClassAtk || subValue.Class === ClassDefend || subValue.Class === ClassHp) { // 固定词条默认四舍五入是准确的
                return
            }
            let nextUpgradeTime = upgradeTimeDistribution[index] + factor
            if (nextUpgradeTime < 0 || nextUpgradeTime > 5) { 
                return
            }
            if (operateIndex === -1) { 
                operateIndex = index
            }
            let nextUpgradeTimeProbability = CalSubValueNumberProbability(subValue, index, nextUpgradeTime, upgradeTime, equipColor)
            if (nextUpgradeTimeProbability >= operateIndexProbability) { 
                operateIndex = index
                operateIndexProbability = nextUpgradeTimeProbability
            }
        })
        if (operateIndex >= 0) { 
            guessUpgradeTime += factor
            upgradeTimeDistribution[operateIndex] += factor
        }
    }
    return upgradeTimeDistribution
}

// 计算某个属性达到了一定数值时指定强化次数的概率。
function CalSubValueNumberProbability(subValue: SubValue, subValueIndex: number, theValueUpgradeTime: number, allUpgradeTime: number, equipColor: string) {
    // 条件概率 P(A|B)=P(AB)/P(B)
    // A:强化次数为upgradeTime
    // B:subValue为指定数值
    // P(B),就是这个属性达到当前值的概率，需要拆分为多种情况计算,P(B)= SUM P(B|upgradeTime= 0,1,2,3)

    let intensifyDistribution: IntensifyDistribution = new IntensifyDistribution
    let findFlag = false
    IntensifyDistributions.map((intensifyDistributionTemp) => {
        if (intensifyDistributionTemp.EquipType === equipColor && intensifyDistributionTemp.StartLevel === (15 - allUpgradeTime * 3)) {
            intensifyDistribution = intensifyDistributionTemp
            findFlag = true
        }
    })
    if (findFlag === false) {
        return 0
    }

    // 先预计算某个属性的强化次数+初始次数到达n的概率
    let P_UpgradeTime: number[] = [];
    for (let i = 0; i <= allUpgradeTime + 1; i++) { 
        let temp_UpgradeTime_Total = 0
        for (let key of intensifyDistribution.Distribution.keys()) { // 遍历所有的强化次数分配
            // 当前分布的比重
            let value = intensifyDistribution.Distribution.get(key)!
            // 保证key的长度为4，计算出每个属性的强化次数
            let intensifyNumDistribution = [(Number(key[0]) - Number('0')), (Number(key[1]) - Number('0')), (Number(key[2]) - Number('0')), (Number(key[3]) - Number('0'))]
            // 因为有初始值的存在，红装的强化分配实际上需要全+1,紫装则是前三项+1
            
            intensifyNumDistribution.map((_, index) => { 
                if (equipColor !== "red" && index === 3) {
                    return
                }
                intensifyNumDistribution[index] += 1
            })
            
            if (intensifyNumDistribution[subValueIndex] === i) { 
                temp_UpgradeTime_Total += value
            }
        }
        P_UpgradeTime.push(temp_UpgradeTime_Total / intensifyDistribution.Total)
    }
    


    // 然后计算升级次数upgradeTime已经时，当前值的发生概率
    let P_Value_OnUpgradeTime: number[] = [];
    for (let i = 0; i <= allUpgradeTime + 1; i++) { 
        let range = GetClassIntensifyRange(subValue.Class, 85)
        P_Value_OnUpgradeTime.push(CalValueProbabilityOnUpgradeTime(range, i, subValue.Value))
    }

    // theValueUpgradeTime是升级的次数，但是我预测的是算上初始次数的预测，所以说这里要加上对应的初始次数
    if (!(equipColor !== "red" && subValueIndex === 3)) { 
        theValueUpgradeTime += 1
    }

    let P_AB = P_UpgradeTime[theValueUpgradeTime] * P_Value_OnUpgradeTime[theValueUpgradeTime]
    let P_B = 0
    for (let i = 0; i <= allUpgradeTime + 1; i++) { 
        P_B += P_UpgradeTime[i] * P_Value_OnUpgradeTime[i]
    }
    if (P_B === 0) { 
        return 0
    }
    return P_AB / P_B
}

function CalValueProbabilityOnUpgradeTime(range: number[], upgradeTime: number,value:number) { 
    let valueDistribution = CalValueDistributionOnUpgradeTime(range, upgradeTime)
    
    let totalDistribution = 0
    valueDistribution.map((tempTime) => {
        totalDistribution += tempTime
    })
    return valueDistribution[value] / totalDistribution
}

function CalValueDistributionOnUpgradeTime(range: number[], upgradeTime: number) {
    let valueTop = 100
    let valueDistribution: number[] = new Array<number>(valueTop);
    for (let i = 0; i < valueTop;i++){
        valueDistribution[i] = 0
    }
    valueDistribution[0] = 1

    for (let k = 0; k < upgradeTime; k++) {
        let valueDistributionTemp: number[] = new Array<number>(valueTop);
        for (let i = 0; i < valueTop; i++) {
            valueDistributionTemp[i] = valueDistribution[i]
        }
        for (let i = 0; i < valueTop; i++) {
            if (valueDistribution[i] === 0) {
                continue
            }
            for (let j = 0; j < range.length; j++) {
                if (i + range[j] < valueTop) {
                    valueDistributionTemp[i + range[j]] += valueDistribution[i]
                }
            }
        }
        valueDistributionTemp.map((_, index) => {
            valueDistribution[index] = valueDistributionTemp[index]
        })
    }
    return valueDistribution
}
