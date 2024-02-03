import { Descriptions } from "@arco-design/web-react"
import { ArtifactListResult, ArtifactTemplateInfo, CalClassSetValue, CalGradeByClass, CalLeftMainValueByClass, CalMainValueByClass, CalValueByClass, CalculateClassGradeNeedOneRes, CalculateOneEquipConfInfoByTemplate, CalculatedStatus, ClassAtk, ClassAtkPercent, ClassCC, ClassCD, ClassChineseMap, ClassDefend, ClassDefendPercent, ClassHp, ClassHpPercent, ClassHr, ClassRr, ClassSpeed, ClassSuffixFinal, ClassToFKeyMap, ConvertSelfDevotionTypeToCommon, EquipLocNecklace, EquipLocRing, EquipLocShoes, Equipment, ExtraPanel, FKeyCC, FKeyCD, FKeyHR, FKeyRR, GetEETypeValue, GetSelfDevotionGradeValueByLevel, GetSubGradeNeedLevel, HeroDetailBackEnd, HeroTemplate, Range } from "../const"
import { IconFire } from "@arco-design/web-react/icon"
import { ValidSubValueAnalyse } from "../EquipAnalyse/ValidSubValueAnalyse"

export interface ClassGradeNeedShowProps {
    classType: string
    heroInfo: CalculatedStatus
    aim?: Range
    calculateClassGradeNeedOneRes: CalculateClassGradeNeedOneRes
}

interface HeroTemplateNeedShowProps { 
    template: HeroTemplate;
    result: HeroTemplateByEquipRes;
}

export function getLevelColor(level?: number) { 
    if (level === undefined) { 
        return "grey"
    }
    switch (level) { 
        case 0:
            return "grey"
        case 1:
            return "FFCCCC"
        case 2:
            return "FF9999"
        case 3:
            return "FF3333"
        case 4:
            return "FF0000"
        case 5:
            return "FF0000"
    }
}

export function getLevelIcon(level?: number) {
    if (level === undefined) { 
        return <></>
    }
    let style = { color: getLevelColor(level) }
    let tempArray = []
    for (let i = 0; i < level; i++) {
        tempArray.push(1)
    }
    return <div>
        {tempArray.map(() => { 
            return <IconFire style={style} />
        })}
    </div>
}


export function HeroTemplateNeedShow(props: HeroTemplateNeedShowProps) { 
    // let oneEquipConfInfo = CalculateOneEquipConfInfoByTemplate({
    //     template: props.template,
    //     heroDetailBackEnd: HeroDetailBackEnd,
    //     set: string[],
    //     mainNecklace: string,
    //     mainRing: string,
    //     mainShoes: string,
    //     artifactInfo?: ArtifactTemplateInfo[],
    //     allArtifactInfoList: ArtifactListResult,
    //     selfDevotion?: string,
    // })
    const data = [
        {
            label: <div style={{ color: getLevelColor(props.result.HpLevel) }}>血量</div>,
            value: getLevelIcon(props.result.HpLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.AtkLevel) }}>攻击</span>,
            value: getLevelIcon(props.result.AtkLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.DefendLevel) }}>防御</span>,
            value: getLevelIcon(props.result.DefendLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.SpeedLevel) }}>速度</span>,
            value: getLevelIcon(props.result.SpeedLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.CCLevel) }}>暴率</span>,
            value: getLevelIcon(props.result.CCLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.CDLevel) }}>暴伤</span>,
            value: getLevelIcon(props.result.CDLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.HRLevel) }}>命中</span>,
            value: getLevelIcon(props.result.HRLevel),
        },
        {
            label: <span style={{ color: getLevelColor(props.result.RRLevel) }}>抗性</span>,
            value: getLevelIcon(props.result.RRLevel),
        },
    ];
    return <Descriptions
        column={1}
        // title='User Info'
        data={data}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
    />
}

export interface CalculateHeroTemplateByEquipReq { 
    templateList: HeroTemplate[]
    HeroDetailMap: Map<string, HeroDetailBackEnd>,
    equip: Equipment,
    transform?: boolean,
}

export interface HeroTemplateByEquipRes { 
    grade: number;
    unnecessaryGrade?: number; // 最低浪费多少
    transformHelp?: string;
    AtkLevel?: number;
    HpLevel?: number;
    DefendLevel?: number;
    SpeedLevel?: number;
    CCLevel?: number;
    CDLevel?: number;
    HRLevel?: number;
    RRLevel?: number;
    Level?: number;
}

export interface CalculateHeroTemplateByEquipRes {
    HeroTemplateByEquipResList: HeroTemplateByEquipRes[]
}

// 需要根据一个面板，去估算这个角色，希望在副属性上出现什么属性
// 根据需要的分数每个属性分为5个等级，极低，低，中，高，极高。每个属性都可以单独配置，比如说速度需求100-140 极低， 140-180，低速，180-220，中速，220-260 高速，260-300 极高
// 五个档对应这个属性应该在装备上有多少分

// - 极低(0)：完全不需要，有就不行。
// - 低(1) ：基本不需要，只能允许一次强化内的份额(9分)，超出部分，将当作浪费分数。
// - 中(2) ：比较需要的属性，3次以内强化都可以接受，超出部分，将当作浪费分数。
// - 高(3) ：强烈需要的属性，不会当作浪费分数。
// - 极高(4)：非常强烈需要的属性，如果能存在，但是不存在，那么则不会考虑该装备。（容易溢出不会有该等级，暴率和暴伤）
// 12分内不计算浪费，高于12后当作浪费分数。
export function GetTransformGrade(grade: number) { 
    if (grade > 25) { 
        return 0
    }
    if (grade <= 12) {
        return grade;
    } else { 
        return 12
    }
}
export function CalculateClassSubValueValidGrade(grade: number, level: number) { 
    let unnecessaryGrade = 0;
    let transformValue = 0;

    switch (level) { 
        case 0:
            unnecessaryGrade += grade;
            transformValue += GetTransformGrade(grade);
            break;
        case 1:
        case 2:
            if (grade >= 27) {
                unnecessaryGrade += grade - 27;
            }
            break;
        case 3:
            unnecessaryGrade = 0;
            break;
        case 4:
            unnecessaryGrade = 0;
            // if (grade === 0) {
            //     unnecessaryGrade = 1000
            // }
            break;
    }
    
    return {
        unnecessaryGrade: unnecessaryGrade,
        transformValue: transformValue,
    }
}

export function CalculateHeroTemplateByEquip(req: CalculateHeroTemplateByEquipReq) { 
    let res: HeroTemplateByEquipRes[] = []
    req.templateList.map((template, index) => { 
        let heroDetailBackEnd = req.HeroDetailMap.get(template.HeroCode!)
        if (heroDetailBackEnd === undefined || heroDetailBackEnd.calculatedStatus === undefined) { 
            res.push({
                grade: 0,
            })
            return
        }
        let resConfInfoByTemplate = CalculateOneEquipConfInfoByTemplate({
            template: template,
            heroDetailBackEnd: heroDetailBackEnd,
            set: [],
            mainNecklace: "",
            mainRing: "",
            mainShoes: "",
        })
        
        let resTemp: HeroTemplateByEquipRes = { grade: 0, }

        resTemp.AtkLevel = GetSubGradeNeedLevel(ClassAtk, resConfInfoByTemplate.resCalculateClassGradeNeedOneAtk.subGrade)
        resTemp.HpLevel = GetSubGradeNeedLevel(ClassHp, resConfInfoByTemplate.resCalculateClassGradeNeedOneHP.subGrade)
        resTemp.DefendLevel = GetSubGradeNeedLevel(ClassDefend, resConfInfoByTemplate.resCalculateClassGradeNeedOneDefend.subGrade)
        resTemp.SpeedLevel = GetSubGradeNeedLevel(ClassSpeed, resConfInfoByTemplate.resCalculateClassGradeNeedOneSpeed.subGrade)
        resTemp.CCLevel = GetSubGradeNeedLevel(ClassCC, resConfInfoByTemplate.resCalculateClassGradeNeedOneCC.subGrade)
        resTemp.CDLevel = GetSubGradeNeedLevel(ClassCD, resConfInfoByTemplate.resCalculateClassGradeNeedOneCD.subGrade)
        resTemp.HRLevel = GetSubGradeNeedLevel(ClassHr, resConfInfoByTemplate.resCalculateClassGradeNeedOneHR.subGrade)
        resTemp.RRLevel = GetSubGradeNeedLevel(ClassRr, resConfInfoByTemplate.resCalculateClassGradeNeedOneRR.subGrade)
        
        let allGrade = 0
        let unnecessaryGrade = 0
        let transformValue = 0 // 转换收益
        // 攻击
        let atkGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassAtk, req.equip.Atk)
        let atkPercentGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassAtkPercent, req.equip.AtkPercent)

        let hpGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassHp, req.equip.Hp)
        let hpPercentGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassHpPercent, req.equip.HpPercent)

        let defendGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassDefend, req.equip.Defend)
        let defendPercentGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassDefendPercent, req.equip.DefendPercent)

        let speedGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassSpeed, req.equip.Speed)

        let ccGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassCC, req.equip.CC)
        let cdGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassCD, req.equip.CD)
        let hrGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassHr, req.equip.Hr)
        let rrGrade = CalGradeByClass(heroDetailBackEnd.calculatedStatus!, ClassRr, req.equip.RR)

        let aktUnnecessaryGrade = CalculateClassSubValueValidGrade(atkGrade + atkPercentGrade, resTemp.AtkLevel).unnecessaryGrade
        let hpUnnecessaryGrade = CalculateClassSubValueValidGrade(hpGrade + hpPercentGrade, resTemp.HpLevel).unnecessaryGrade
        let defendUnnecessaryGrade = CalculateClassSubValueValidGrade(defendGrade + defendPercentGrade, resTemp.DefendLevel).unnecessaryGrade
        let speedResult = CalculateClassSubValueValidGrade(speedGrade, resTemp.SpeedLevel)
        let ccResult = CalculateClassSubValueValidGrade(ccGrade, resTemp.CCLevel)
        let cdResult = CalculateClassSubValueValidGrade(cdGrade, resTemp.CDLevel)
        let hrResult = CalculateClassSubValueValidGrade(hrGrade, resTemp.HRLevel)
        let rrResult = CalculateClassSubValueValidGrade(rrGrade, resTemp.RRLevel)
        
        let transformHelp = ""
        let atkTransformValue = CalculateClassSubValueValidGrade(atkGrade, resTemp.AtkLevel).transformValue
        let atkPercentTransformValue = CalculateClassSubValueValidGrade(atkPercentGrade, resTemp.AtkLevel).transformValue
        let hpTransformValue = CalculateClassSubValueValidGrade(hpGrade, resTemp.HpLevel).transformValue
        let hpPercentTransformValue = CalculateClassSubValueValidGrade(hpPercentGrade, resTemp.HpLevel).transformValue
        let defendTransformValue = CalculateClassSubValueValidGrade(defendGrade, resTemp.DefendLevel).transformValue
        let defendPercentTransformValue = CalculateClassSubValueValidGrade(defendPercentGrade, resTemp.DefendLevel).transformValue
        let speedTransformValue = speedResult.transformValue
        let ccTransformValue = ccResult.transformValue
        let cdTransformValue = cdResult.transformValue
        let hrTransformValue = hrResult.transformValue
        let rrTransformValue = rrResult.transformValue
        let transformList = [
            { type: ClassAtk, transformValue: atkTransformValue, },
            { type: ClassAtkPercent, transformValue: atkPercentTransformValue, },
            { type: ClassHp, transformValue: hpTransformValue, },
            { type: ClassHpPercent, transformValue: hpPercentTransformValue, },
            { type: ClassDefend, transformValue: defendTransformValue, },
            { type: ClassDefendPercent, transformValue: defendPercentTransformValue, },
            { type: ClassSpeed, transformValue: speedTransformValue, },
            { type: ClassCC, transformValue: ccTransformValue, },
            { type: ClassCD, transformValue: cdTransformValue, },
            { type: ClassHr, transformValue: hrTransformValue, },
            { type: ClassRr, transformValue: rrTransformValue, },
        ]
        transformList.map((item) => { 
            if (item.transformValue > transformValue) { 
                transformValue = item.transformValue
                transformHelp = "转换" + ClassChineseMap.get(item.type)
            }
        })

        unnecessaryGrade = aktUnnecessaryGrade + hpUnnecessaryGrade + defendUnnecessaryGrade + speedResult.unnecessaryGrade +
            ccResult.unnecessaryGrade + cdResult.unnecessaryGrade + hrResult.unnecessaryGrade + rrResult.unnecessaryGrade
        allGrade = atkGrade + atkPercentGrade + hpGrade + hpPercentGrade + defendGrade + defendPercentGrade + speedGrade + ccGrade + cdGrade + hrGrade + rrGrade

        let validValue = allGrade - unnecessaryGrade

        if (transformValue > unnecessaryGrade) { 
            console.log(transformValue, aktUnnecessaryGrade , hpUnnecessaryGrade , defendUnnecessaryGrade , speedResult.unnecessaryGrade ,
                ccResult.unnecessaryGrade , cdResult.unnecessaryGrade , hrResult.unnecessaryGrade , rrResult.unnecessaryGrade)
        }
        if (req.transform === true && transformValue !== 0) { 
            validValue += transformValue
            resTemp.transformHelp = transformHelp
        }
        
        if (allGrade === 0) {
            resTemp.grade = 0
        } else {
            resTemp.grade = Number((validValue * 100 / allGrade).toFixed(2))
        }
        resTemp.unnecessaryGrade = allGrade - validValue
        res.push(resTemp)
    })
    return res
}

export interface CalculateEquipValidSubNumByHeroTemplateReq {
    templateList: HeroTemplate[]
    HeroDetailMap: Map<string, HeroDetailBackEnd>,
    equip: Equipment,
    setFilter?: string,
    EquipLoc?: string,
}

export interface ValidSubValueAnalyseInfo { 
    Num: number;
    TemplateId: string[];
}

export interface CalculateEquipValidSubNumByHeroTemplateRes {
    ThreeValid: ValidSubValueAnalyseInfo;
    FourValid: ValidSubValueAnalyseInfo;
    TwoValid: ValidSubValueAnalyseInfo;    
}

export function CalculateEquipValidSubNumByHeroTemplate(req: CalculateEquipValidSubNumByHeroTemplateReq) {
    let res: CalculateEquipValidSubNumByHeroTemplateRes = {
        ThreeValid: { Num: 0, TemplateId: [] },
        FourValid: { Num: 0, TemplateId: [] },
        TwoValid: { Num: 0, TemplateId: [] },
    }
    req.templateList.map((template, index) => {
        if (req.setFilter !== undefined && req.setFilter !== "") {
            let flagSet = false
            template.Set?.map((setString: string[]) => {
                setString.map((set: string) => {
                    if (set == req.setFilter) {
                        flagSet = true
                    }
                })
            })
            if (!flagSet) {
                return
            }
        }

        if (req.equip?.EquipLoc !== undefined && req.equip?.EquipLoc !== "") {
            let mainTypeFilterRange: string[] = []
            switch (req.equip?.EquipLoc) {
                case EquipLocNecklace:
                    if (template.MainNecklace !== undefined) {
                        mainTypeFilterRange = template.MainNecklace
                    }
                    break
                case EquipLocRing:
                    if (template.MainRing !== undefined) {
                        mainTypeFilterRange = template.MainRing
                    }
                    break
                case EquipLocShoes:
                    if (template.MainShoes !== undefined) {
                        mainTypeFilterRange = template.MainShoes
                    }
                    break
            }

            if (mainTypeFilterRange.length !== 0) {
                let mainTypeFilterFlag = false
                mainTypeFilterRange.map((tempMainType) => {
                    if (tempMainType === req.equip?.MainType) {
                        mainTypeFilterFlag = true
                    }
                })
                if (!mainTypeFilterFlag) {
                    return
                }
            }
        }

        let heroDetailBackEnd = req.HeroDetailMap.get(template.HeroCode!)
        if (heroDetailBackEnd === undefined || heroDetailBackEnd.calculatedStatus === undefined) {
            return
        }
        let resConfInfoByTemplate = CalculateOneEquipConfInfoByTemplate({
            template: template,
            heroDetailBackEnd: heroDetailBackEnd,
            set: [],
            mainNecklace: "",
            mainRing: "",
            mainShoes: "",
        })

        let resTemp: HeroTemplateByEquipRes = { grade: 0, }

        resTemp.AtkLevel = GetSubGradeNeedLevel(ClassAtk, resConfInfoByTemplate.resCalculateClassGradeNeedOneAtk.subGrade)
        resTemp.HpLevel = GetSubGradeNeedLevel(ClassHp, resConfInfoByTemplate.resCalculateClassGradeNeedOneHP.subGrade)
        resTemp.DefendLevel = GetSubGradeNeedLevel(ClassDefend, resConfInfoByTemplate.resCalculateClassGradeNeedOneDefend.subGrade)
        resTemp.SpeedLevel = GetSubGradeNeedLevel(ClassSpeed, resConfInfoByTemplate.resCalculateClassGradeNeedOneSpeed.subGrade)
        resTemp.CCLevel = GetSubGradeNeedLevel(ClassCC, resConfInfoByTemplate.resCalculateClassGradeNeedOneCC.subGrade)
        resTemp.CDLevel = GetSubGradeNeedLevel(ClassCD, resConfInfoByTemplate.resCalculateClassGradeNeedOneCD.subGrade)
        resTemp.HRLevel = GetSubGradeNeedLevel(ClassHr, resConfInfoByTemplate.resCalculateClassGradeNeedOneHR.subGrade)
        resTemp.RRLevel = GetSubGradeNeedLevel(ClassRr, resConfInfoByTemplate.resCalculateClassGradeNeedOneRR.subGrade)

        let subNum = 0 // 计算副属性的数量，不应该大于4个
        let subValueList = [req.equip.CC, req.equip.CD, req.equip.Atk, req.equip.Speed, req.equip.AtkPercent, req.equip.Hp, req.equip.HpPercent, req.equip.RR, req.equip.Hr, req.equip.Defend, req.equip.DefendPercent]
        let subLevelList = [resTemp.CCLevel, resTemp.CDLevel, resTemp.AtkLevel, resTemp.SpeedLevel, resTemp.AtkLevel, resTemp.HpLevel, resTemp.HpLevel, resTemp.RRLevel, resTemp.HRLevel, resTemp.DefendLevel, resTemp.DefendLevel]
        subValueList.map((_,index) => {
            if (subValueList[index] !== 0 && subLevelList[index] !== 0 && subLevelList[index] !== undefined) {
                subNum++;
            }
        })

        switch (subNum) { 
            case 2:
                res.TwoValid.Num++
                if (template.ID !== undefined) {
                    res.TwoValid.TemplateId.push(template.ID)
                }
                break;
            case 3:
                res.ThreeValid.Num++
                if (template.ID !== undefined) {
                    res.ThreeValid.TemplateId.push(template.ID)
                }
                break;
            case 4:
                res.FourValid.Num++
                if (template.ID !== undefined) {
                    res.FourValid.TemplateId.push(template.ID)
                }
                break;
        }
    })
    return res
}