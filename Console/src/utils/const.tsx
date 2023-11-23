export const E7DataDomain = "http://e7-data.soultrial.top/data"

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

export const ClassChineseMap: Map<string,string> = new Map([
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

export const EquipLocRing = "ring"
export const EquipLocNecklace = "necklace"
export const EquipLocShoes = "shoes"

export const MainRange = { ClassAtk, ClassDefend, ClassHp, ClassSpeed, ClassCC, ClassCD, ClassHr }
export const MainAllRange = { ClassAtk, ClassAtkPercent, ClassDefend, ClassDefendPercent, ClassHp, ClassHpPercent, ClassSpeed, ClassCC, ClassCD, ClassHr,ClassRr }

export const MainRingRange = [  ClassAtkPercent, ClassDefendPercent,  ClassHpPercent,  ClassHr ,ClassRr ,ClassHp,ClassAtk, ClassDefend]
export const MainNecklaceRange = [ ClassCC, ClassCD, ClassAtkPercent, ClassDefendPercent, ClassHpPercent,  ClassHp,ClassAtk, ClassDefend]
export const MainShoesRange = [ ClassSpeed, ClassAtkPercent, ClassDefendPercent, ClassHpPercent , ClassHp,ClassAtk, ClassDefend]

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


export const CalGradeByClass = (heroInfo: CalculatedStatus, classType: string, value: number) => {
    if (heroInfo === undefined) { 
        return 0
    }
    switch (classType) { 
        case ClassAtk:
            return Number((100 * (value / heroInfo.lv60SixStarFullyAwakened[FKeyAtk])).toFixed(2))
        case ClassDefend:
            return Number((100 * (value / heroInfo.lv60SixStarFullyAwakened[FKeyDef])).toFixed(2))
        case ClassHp:
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
}

export const InitEquipment = () => {
    return {
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
    }
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