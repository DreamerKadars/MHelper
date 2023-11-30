import { Descriptions } from "@arco-design/web-react"
import { GetArtifactValueByLevel } from "../../pages/Admin/HeroTemplate/HeroForm/HeroFrom"
import { ArtifactListResult, ArtifactTemplateInfo, CalClassSetValue, CalGradeByClass, CalLeftMainValueByClass, CalMainValueByClass, CalValueByClass, CalculatedStatus, ClassAtk, ClassAtkPercent, ClassCC, ClassCD, ClassChineseMap, ClassDefend, ClassDefendPercent, ClassHp, ClassHpPercent, ClassHr, ClassRr, ClassSpeed, ClassSuffixFinal, ClassToFKeyMap, ConvertSelfDevotionTypeToCommon, Equipment, ExtraPanel, FKeyCC, FKeyCD, FKeyHR, FKeyRR, GetEETypeValue, GetSelfDevotionGradeValueByLevel, GetSubGradeNeedLevel, HeroDetailBackEnd, HeroTemplate, Range } from "../const"
import { IconFire } from "@arco-design/web-react/icon"

export interface ClassGradeNeedShowProps {
    classType: string
    heroInfo: CalculatedStatus
    aim?: Range
    calculateClassGradeNeedOneRes: CalculateClassGradeNeedOneRes
}

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
        let defendUnnecessaryGrade = CalculateClassSubValueValidGrade(defendGrade + defendPercentGrade, resTemp.HpLevel).unnecessaryGrade
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