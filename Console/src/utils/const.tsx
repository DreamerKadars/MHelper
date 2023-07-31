export const E7DataDomain = "http://e7-data.soultrial.top/data"

export const ClassAtk = "atk"       // 攻击力
export const ClassDefend = "defend"    // 防御力
export const ClassHp = "hp"        // 血量
export const ClassSpeed = "speed"     // 速度
export const ClassCC = "cc"        // 暴击率
export const ClassCD = "cd"        // 暴击伤害
export const ClassHr = "hr"        // 效果命中
export const ClassRr = "rr"        // 效果抵抗
export const ClassSuffixPercent = "Percent"        // 百分比后缀


export const ClassAtkRange = [1200, 5200]
export const ClassDefendRange = [800, 2400]
export const ClassHpRange = [9000, 25000]
export const ClassSpeedRange = [110, 270]
export const ClassCCRange = [15, 100]
export const ClassCDRange = [100, 350]
export const ClassHrRange = [0, 180]
export const ClassRrRange = [0, 225]

export const ClassRangeMap:Map<string, number[]> = new Map([
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
export const SetList = ["acc", "att", "coop", "counter", "cri_dmg", "cri", "def", "immune", "max_hp", "penetrate", "rage", "res", "revenge", "scar", "shield", "speed", "torrent", "vampire"]