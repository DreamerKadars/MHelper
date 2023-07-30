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

export const InitializeHeroStaticDetail = () => {
    return {
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
};

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