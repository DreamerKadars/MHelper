import { JSX, useEffect, useState } from "react";
import { HandlerAxiosErrPrefix, ListHeroDetail, LoadArtifactJSON, LoadHeroJSON, LoadSubValueDistributionJSON } from "../../api/help";
import { CalEquipSubValue, SubValue, ConvertHeroListResultToMap, EquipLocNecklace, EquipLocRing, EquipLocShoes, Equipment, GenerateValueDistributionRange, GetClassIntensifyRange, GetOneValueDistributionMapKey, GetSubValueClassFourRange, HeroDetailBackEnd, HeroListResult, HeroTemplate, IntensifyDistribution, IntensifyDistributions, OneValueDistributionRange, SetAcc, GetHighSpeedThreshold, ClassSpeed, CalHeroTemplatePreComputationForAdapter, ArtifactListResult, HeroTemplatePreComputationForAdapter, HighOneSubValueGradeThreshold, EquipLocCNMap, ClassChineseMap, GetClassImage, ClassSuffixPercent, GuessUpgradeDistribution, GetClassRecoinUpgrade, CalculateGradeByClass, ConvertValueTypeFixed, ConvertValueTypePercent, GetClassTransform, ClassDefend, ClassDefendPercent, DeepCopyArray, GradeAimStrategy, CalGradeByClass, GetGlobalInsSpeedPByLocal, GetGlobalInsPByLocal, GetGradeAimStrategiesByLocal, GetGlobalSpeedConfigByLocal, DeepCopyNumberArray } from "../../const";
import { HeroTemplateList } from "../../api/heroTemplate";
import { Badge, Button, Card, Descriptions, Form, Grid, Image, Link, Popover, Progress, Radio, Select, Space, Statistic, Table, TableColumnProps } from "@arco-design/web-react";
import { GenerateSetImageUrl, GetHeroDetailFromListByHeroCode, SkipToUrl } from "../../helper";
import HeroImageShow from "../../HeroImageShow/HeroImageShow";
import { PathHeroTemplateAnalyse } from "../../../const";
import { CalculateHeroTemplateByEquip, HeroTemplateByEquipRes, HeroTemplateNeedShow, getLevelColor } from "../../HeroTemplateHelper/HeroTemplateHelper";
import { template } from "@babel/core";
import { IconArrowUp, IconEdit, IconExclamationCircle, IconRight } from "@arco-design/web-react/icon";
import { CalEquipNum } from "../../PieChart/PieChart";
import { DataType } from "@arco-design/web-react/es/Descriptions/interface";
import { GlobalIntensifyModifyModalProps } from "./GlobalIntensifyModify";

const ManuelResultHighSpeed = "高速装备"
const ManuelResultOnlyOneValue = "单值装备"

interface IntensifyAnalyseProps {
    equip?: Equipment;
    LevelUP: (subValueClass: string, value: number, FourLocClass?: string) => any;
    HeroTemplateList: HeroTemplate[];
}

// props.equip.MainValue
export const IntensifyAnalyse = (props: IntensifyAnalyseProps) => {
    const [fresh, setFresh] = useState(false)
    const [heroJson,] = LoadHeroJSON()
    const [ListHeroDetailResult] = ListHeroDetail()
    const [calculateNeed, setCalculateNeed] = useState(false)
    const [subValues, setSubValues] = useState<SubValue[]>([])
    const [loading, setLoading] = useState(false)
    const [evaluateValidEquipResult, setEvaluateValidEquipResult] = useState<EvaluateValidEquipResult>()
    const [gradeAimStrategies, setGradeAimStrategies] = useState<GradeAimStrategy[]>([])
    const [globalInsP, setGlobalInsP] = useState<number[]>([])
    const [globalInsSpeedP, setGlobalInsSpeedP] = useState<number[]>([])
    const [globalIntensifyModifyModalVisible, setGlobalIntensifyModifyModalVisible] = useState(false)
    

    useEffect(() => {
        if (props.equip === undefined) {
            return
        }
        setSubValues(CalEquipSubValue(props.equip))
        setLoading(false)
    }, [props.equip]) // 装备改变时，需要进行预计算

    let getGradeStrategy = () => { 
        setGradeAimStrategies(GetGradeAimStrategiesByLocal())
        setGlobalInsP(GetGlobalInsPByLocal())
        setGlobalInsSpeedP(GetGlobalInsSpeedPByLocal())
    }
    useEffect(() => { 
        getGradeStrategy()
    },[])

    let HeroDetailMap = new Map<string, HeroDetailBackEnd>()
    ListHeroDetailResult?.data?.Data?.map((item: HeroDetailBackEnd) => {
        HeroDetailMap.set(item.code!, item)
    })

    const [subValueDistributionJSON] = LoadSubValueDistributionJSON()
    const subValueDistributionMap = new Map<string, OneValueDistributionRange>()
    for (let key in subValueDistributionJSON.data) {
        subValueDistributionMap.set(key, subValueDistributionJSON.data[key])
    }

    const [artifactJSONResult, _] = LoadArtifactJSON()
    let artifactInfo: ArtifactListResult = artifactJSONResult.data

    if (props.equip === undefined) {
        return <></>
    }
    let subNum = CalEquipNum(props.equip)
    let equipColor: string
    
    if (subNum == 4) {
        equipColor = "red"
    } else if (subNum == 3) {
        if (props.equip.UpgradeLevel >= 12) { 
            return <span>词条数量:{subNum},词条过少不支持计算</span>    
        }
        equipColor = "purple"
    } else {
        return <span>词条数量:{subNum},词条过少不支持计算</span>
    }
    if (props.equip.Set === undefined || props.equip.Set === "") { 
        return <span>缺少套装数据</span>
    }
    if (props.equip.EquipLoc === undefined || props.equip.EquipLoc === "") {
        return <span>缺少部位数据</span>
    }
    if (props.equip.MainType === undefined || props.equip.MainType === "") {
        return <span>缺少主属性数据</span>
    }

    if (props.equip.EquipColor !== "") {
        equipColor = props.equip.EquipColor
    }

    let level = 85 // 装备等级
    if (props.equip?.Level!== undefined) { 
        level = props.equip?.Level
    }

    let speedThreshold = GetHighSpeedThreshold(props.equip.Set, props.equip.EquipLoc, props.equip.MainType)
    
    let HeroListResult: HeroListResult = heroJson.data
    const HeroListMap = ConvertHeroListResultToMap(HeroListResult)
    
    let upgradeTimeDistribution = GuessUpgradeDistribution(subValues, Math.floor(props.equip.UpgradeLevel / 3), equipColor)

    let subValuesDescriptionsData: any[] = []
    let nowGrade = 0
    subValues.map((subValue, index) => {
        nowGrade += CalGradeByClass(undefined, subValue.Class, subValue.Value)
        subValuesDescriptionsData.push({
            label: <div style={{ whiteSpace: "nowrap" }}><Image height={30} src={GetClassImage(subValue.Class)}></Image>{subValue.Class.includes(ClassSuffixPercent) && <Image height={30} src={GetClassImage(ClassSuffixPercent)}></Image>}</div>,
            value: <div>{subValue.Class !== "" && <div> {props.equip?.Level === 85 ? <Badge
                dotStyle={{}}
                count={upgradeTimeDistribution[index]} >
                <span style={{ fontSize: 30, marginRight: 10 }}>{subValue.Value}</span></Badge> :
                <span style={{ fontWeight: "bold" }}>{subValue.Value}</span>}</div>}</div>,
        })
    })
    nowGrade = Number(nowGrade.toFixed(2))
    
    let recoinGrade = 0
    let subValuesRecoinDescriptionsData: any[] = []
    subValues.map((subValue, index) => { 
        recoinGrade += CalGradeByClass(undefined, subValue.Class, subValue.Value + GetClassRecoinUpgrade(subValue.Class, upgradeTimeDistribution[index]))
        subValuesRecoinDescriptionsData.push({
            label: <div style={{ height: 30 }}></div>,
            value: <div style={{ height: 30 }}> <span style={{ fontSize: 30, }}>{GetClassRecoinUpgrade(subValue.Class, upgradeTimeDistribution[index]) + subValue.Value}</span></div>,
        })
    })
    recoinGrade = Number(recoinGrade.toFixed(2))

    let startCalculateEquipIntensify = () => { 
        let resp = CalculateEquipIntensify({
            equip: props.equip!,
            equipColor: equipColor as "red" | "purple",
            level: level,
            HeroTemplateList: props.HeroTemplateList,
            subValueDistributionMap: subValueDistributionMap,
            HeroDetailMap: HeroDetailMap,
            artifactListResult: artifactInfo,
            upgradeTimeDistribution: upgradeTimeDistribution,
            speedThreshold: speedThreshold,
        })        
        setLoading(false)
        return resp
    }

    let dataGradeAimStrategy: any[] = []
    gradeAimStrategies.map((aim) => { 
        dataGradeAimStrategy.push({
            label: aim.Description,
            value: aim.AimGrade,
        })
    })
    let tempGlobalSpeedConfig = GetGlobalSpeedConfigByLocal()
    dataGradeAimStrategy.push({
        label: "速度套高速",
        value: tempGlobalSpeedConfig.SpeedSetSpeed,
    })
    dataGradeAimStrategy.push({
        label: "固定值右二赌高速",
        value: tempGlobalSpeedConfig.AllFixedSpeed,
    })
    dataGradeAimStrategy.push({
        label: "两件套高速",
        value: tempGlobalSpeedConfig.TwoSetSpeed,
    })
    dataGradeAimStrategy.push({
        label: "四件套高速",
        value: tempGlobalSpeedConfig.FourSetSpeed,
    })
    
    let globalInsPThreshold = globalInsP[Math.round(props.equip.UpgradeLevel / 3)]
    let globalInsSpeedPThreshold = globalInsSpeedP[Math.round(props.equip.UpgradeLevel / 3)]
    let InsRes = false

    if (evaluateValidEquipResult !== undefined && (evaluateValidEquipResult.ValidTotal * 100 / evaluateValidEquipResult.Total > globalInsPThreshold)) {         
        InsRes = true
    }
    evaluateValidEquipResult?.ManuelResults.map((ManuelResult) => { 
        if (ManuelResult.describe === ManuelResultHighSpeed) {
            let speedP = ManuelResult.num / evaluateValidEquipResult.Total
            if (speedP > globalInsSpeedPThreshold) { 
                InsRes = true
            }
        }
    })

    // 求紫色装备的第四个属性的可能列表
    let fourRange = GetSubValueClassFourRange(props.equip)
    
    return <div>
        <GlobalIntensifyModifyModalProps
            visible={globalIntensifyModifyModalVisible}
            onClose={() => { 
                setGlobalIntensifyModifyModalVisible(false)
                getGradeStrategy()
            }}
        />
        <Grid.Row>
            <Grid.Col span={12}>
                <Card
                    style={{ width: 360, border: "2px solid " + (equipColor === "purple" ? "#C8A2C8" : "red"), borderRadius: "12px" }}
                    title={props.equip.Level + "装备-" + EquipLocCNMap.get(props.equip.EquipLoc) + "-" + ClassChineseMap.get(props.equip.MainType) + "(+" + props.equip.UpgradeLevel + ")"}
                    extra={<Image preview={false} width={30} src={GenerateSetImageUrl(props.equip.Set + "")}></Image>}
                    bordered={false}
                >
                    <Grid.Row>
                        <Grid.Col span={12}>
                            <Descriptions
                                column={1}
                                data={subValuesDescriptionsData}
                                style={{ marginBottom: 6 }}
                                labelStyle={{ paddingRight: 36 }}
                            />
                            <div style={{ marginLeft: 100 }}>{nowGrade}分</div>
                        </Grid.Col>
                        {props.equip.UpgradeLevel === 15 ?
                            <>
                                <Grid.Col span={4}>
                                    <IconRight style={{ height: 150, fontSize: 24, marginLeft: 10 }} />
                                </Grid.Col>
                                <Grid.Col span={6} style={{ top: -5 }}>
                                    <Descriptions
                                        column={1}
                                        data={subValuesRecoinDescriptionsData}
                                        style={{ marginBottom: 20 }}
                                    />
                                    <div>{recoinGrade}分</div>
                                </Grid.Col>
                            </>
                                :
                            <>
                                <Grid.Col span={12}>
                                    {(equipColor === "purple" && props.equip.UpgradeLevel == 9) ? <>
                                    </> : <div>
                                        {
                                        subValues.map((subValue: SubValue, index) => {
                                            // 紫装强化到12时
                                            return <Radio.Group value={''} name='button-radio-group' onChange={(valueIns) => {
                                                props.LevelUP(subValue.Class, valueIns)
                                            }}>
                                                {GetClassIntensifyRange(subValue.Class, props.equip!.Level).map((intensifyRange: number) => {
                                                    return (
                                                        <Radio key={intensifyRange} value={intensifyRange} style={{ width: "3%", height: 30, marginBottom: 12 }}>
                                                            {({ checked }) => {
                                                                return (
                                                                    <Button tabIndex={-1} key={intensifyRange} type={checked ? 'primary' : 'default'}>
                                                                        {intensifyRange}
                                                                    </Button>
                                                                );
                                                            }}
                                                        </Radio>
                                                    );
                                                })}
                                            </Radio.Group>
                                        })
                                    }</div>}
                                    
                                </Grid.Col>
                            </>}
                    </Grid.Row>
                    {
                        (equipColor === "purple" && props.equip.UpgradeLevel == 9) ? <>
                            <span style={{ color: "red", marginTop: 20 }}>请选择第四个属性</span>
                            {fourRange.map((subValue: SubValue, index) => {
                                return <div><Radio.Group value={''} style={{ marginTop: 4, marginRight: 4 }} name='button-radio-group' onChange={(valueIns) => {
                                    props.LevelUP(subValue.Class, valueIns, subValue.Class)
                                }}>
                                    <Image height={30} src={GetClassImage(subValue.Class)}></Image>{subValue.Class.includes(ClassSuffixPercent) && <Image height={30} src={GetClassImage(ClassSuffixPercent)}></Image>}
                                    {GetClassIntensifyRange(subValue.Class, props.equip!.Level).map((intensifyRange: number) => {
                                        return (
                                            <>
                                                <Radio key={intensifyRange} value={intensifyRange} style={{ width: "3%", height: 30, marginBottom: 12 }}>
                                                    {({ checked }) => {
                                                        return (
                                                            <Button tabIndex={-1} key={intensifyRange} type={checked ? 'primary' : 'default'}>
                                                                {intensifyRange}
                                                            </Button>
                                                        );
                                                    }}
                                                </Radio>
                                            </>
                                        );
                                    })}
                                </Radio.Group></div>
                            })}
                        </> : <></>
                    }
                </Card>
            </Grid.Col>

            <Grid.Col span={12}>
                <Card
                    extra={<IconEdit onClick={() => { 
                        setGlobalIntensifyModifyModalVisible(true)
                    }}/>}
                    title={"规则说明"} style={{ marginLeft: 10,  border: "2px solid " + "green", borderRadius: "12px" }}>
                    <Descriptions
                        style={{ }}
                        column={2}
                        data={dataGradeAimStrategy}
                    ></Descriptions>
                    <Descriptions
                        style={{}}
                        column={1}
                        labelStyle={{ paddingRight :20}}
                        data={[{ label: "普通装备概率配置", value: <>{globalInsP.map((pTemp) => { return <span style={{ marginRight: 5 }}>{pTemp}</span> })}</> },
                            { label: "高速装备概率配置", value: <>{globalInsSpeedP.map((pTemp) => { return <span style={{ marginRight: 5 }}>{pTemp}</span> })}</> }]}
                    ></Descriptions>
                </Card>
            </Grid.Col>
        </Grid.Row >
        <Button
            type='primary'
            loading={loading}
            onClick={async () => {
                setLoading(true)
                let res = await startCalculateEquipIntensify()
                setEvaluateValidEquipResult(res)
            }}
            style={{width:"100%",height:100,fontSize:50, marginTop: 20, marginBottom: 20 }}
        >
            开始计算!
        </Button>
        {evaluateValidEquipResult === undefined ? <></> : <Card style={{ marginTop: 20 }} title={"计算结果"}><Grid.Row>
            <Grid.Col span={12}>
                <div>
                    <Popover content={ <div>
                            <Statistic title='可能装备总数' value={evaluateValidEquipResult.Total} groupSeparator style={{ marginRight: 60 }} />
                            <Statistic title='有效装备总数' value={evaluateValidEquipResult.ValidTotal} groupSeparator />
                        </div>
                    }>
                        <Statistic
                            // style={{height:100,width:300,}}
                            title={<span style={{ fontWeight: "bold" }}>综合最终有效概率</span>}
                            value={evaluateValidEquipResult.ValidTotal * 100 / evaluateValidEquipResult.Total}
                            precision={2}
                            // prefix={<IconArrowRise />}
                            suffix='%'
                            countUp
                            styleValue={{ color: '#0fbf60', fontSize: 80, marginTop: -30 }}
                        />
                    </Popover>
                </div>
            </Grid.Col>
            <Grid.Col span={12}>
                <>普通装备概率:{globalInsP[Math.round(props.equip.UpgradeLevel / 3)]}%,</>
                <>高速装备概率:{globalInsSpeedP[Math.round(props.equip.UpgradeLevel / 3)]}%</>
                {InsRes ? <div style={{ color: "red", fontSize: 70, fontWeight: "bold" }}>强化!</div> :
                    <div style={{ color: "gray", fontSize: 70, fontWeight: "bold" }}>不建议!</div>}
            </Grid.Col>
        </Grid.Row>
            
            <EvaluateValidEquipResultTable
                HeroListResult={HeroListResult}
                EvaluateValidEquipResult={evaluateValidEquipResult}
                SpeedThreshold={speedThreshold}
            />
            
        </Card>
        }
    </div>
}

interface EvaluateValidEquipResultTableProps { 
    EvaluateValidEquipResult?: EvaluateValidEquipResult;
    SpeedThreshold: number;
    HeroListResult: HeroListResult;
}
function EvaluateValidEquipResultTable(props: EvaluateValidEquipResultTableProps) {
    interface EvaluateValidEquipResultTableDate {
        HeroCode: string[],
        HeroTemplateID: string[],
        Tag: string[],
        SubValueNeed: string[],
        GradeThreshold: number,
        Describe: string,
        Valid: number,
        Priority: number,
    }
    let dataCommon: EvaluateValidEquipResultTableDate[] = []
    let dataManuel: EvaluateValidEquipResultTableDate[] = []
    
    if (props.EvaluateValidEquipResult === undefined) { 
        return <></>
    }
    props.EvaluateValidEquipResult.ManuelResults.map((manuelResult) => { 
        if (manuelResult.describe === ManuelResultHighSpeed) { 
            dataManuel.push({
                HeroCode: [],
                HeroTemplateID: [],
                Tag: [],
                SubValueNeed: [ClassSpeed],
                GradeThreshold: props.SpeedThreshold,
                Describe: "高速装备",
                Valid: manuelResult.num,
                Priority: 1000,
            })
        } else if (manuelResult.describe.includes(ManuelResultOnlyOneValue)) {
            let oneValue = manuelResult.describe.split("#")
            dataManuel.push({
                HeroCode: [],
                HeroTemplateID: [],
                Tag: [],
                SubValueNeed: [oneValue[1]],
                GradeThreshold: 40,
                Describe: oneValue[0],
                Valid: manuelResult.num,
                Priority: 1000,
            })
        }
    })

    props.EvaluateValidEquipResult.PreComputationResults.map((preComputationResult) => {
        dataCommon.push({
            HeroCode: preComputationResult.preComputation.HeroCode,
            HeroTemplateID: preComputationResult.preComputation.HeroTemplateID,
            Tag: [],
            SubValueNeed: preComputationResult.preComputation.SubValueNeed,
            GradeThreshold: preComputationResult.preComputation.GradeThreshold,
            Describe: "",
            Valid: preComputationResult.num,
            Priority: preComputationResult.num,
        })
    })

    return <div>
        <span>特殊装备</span>
        <Table
            pagination={false}
            style={{ marginTop: 20 }}
            data={dataManuel}
            columns={[
                {
                    title: '目标',
                    render: (index, item) => {
                        return <div key={index}>{item.GradeThreshold}</div>
                    },
                },
                {
                    title: '需求属性',
                    render: (index, item) => {
                        return <div key={index}>{item.SubValueNeed.map((subValue) => {
                            return <Image height={20} src={GetClassImage(subValue.replace("Percent", ""))}></Image>
                        })}</div>
                    },
                },
                {
                    title: '描述',
                    render: (index, item) => {
                        return <div key={index}>{item.Describe}</div>
                    },
                }, {
                    title: '有效概率',                    
                    render: (index, item) => {
                        return <Statistic
                            key={index}
                            // style={{height:100,width:300,}}
                            value={item.Valid * 100 / props.EvaluateValidEquipResult!.Total}
                            precision={2}
                            // prefix={<IconArrowRise />}
                            suffix='%'
                            countUp
                            styleValue={{ color: '#0fbf60', }}
                        />
                    },
                }
            ]}
        />
        <Table
        style={{ marginTop: 20 }}
        data={dataCommon}
        columns={[{
            title: '分数目标',
            width: 100,
            render: (index, item) => {
                return <div key={index}>{item.GradeThreshold}</div>
            },
        }, {
            title: '需求属性',
            width: 120,
            render: (index, item) => {
                return <div key={index}>{item.SubValueNeed.map((subValue) => { 
                    return <Image height={20} src={GetClassImage(subValue.replace("Percent", ""))}></Image>
                })}</div>
            },
        }, {
            title: '有效概率',
            width: 100,
            defaultSortOrder: 'descend',
            sorter: (a, b) => (a.Valid * 100 / props.EvaluateValidEquipResult!.Total) - (b.Valid * 100 / props.EvaluateValidEquipResult!.Total),
            render: (index, item) => {
                return <Statistic
                    key={index}
                    // style={{height:100,width:300,}}
                    value={item.Valid * 100 / props.EvaluateValidEquipResult!.Total}
                    precision={2}
                    // prefix={<IconArrowRise />}
                    suffix='%'
                    countUp
                    styleValue={{ color: '#0fbf60', }}
                />
            },
        }, {
            title: '可用角色',
            render: (col, item, index) => {
                return <div key={index} style={{ display: "flex" ,flexWrap:"wrap",width:300}}>
                    {item.HeroCode.map((heroCode: string) => { 
                        let tempHeroDetail = GetHeroDetailFromListByHeroCode(heroCode, props.HeroListResult?.heroList)
                        if (tempHeroDetail) {
                            return <HeroImageShow  key={col + "-" + index} ImageSizeParm={0.4} HeroDetail={tempHeroDetail} />
                        } else { 
                            return <></>
                        }
                    })}
                </div>
            },
        }
        ]}
        />
    </div>
}

interface CalculateEquipIntensifyRequest { 
    equip: Equipment;
    equipColor: "red" | "purple";
    level: number;
    HeroTemplateList: HeroTemplate[];
    subValueDistributionMap: Map<string, OneValueDistributionRange>;
    HeroDetailMap: Map<string, HeroDetailBackEnd>;
    artifactListResult: ArtifactListResult;
    upgradeTimeDistribution: number[];
    speedThreshold: number;
}

function CalculateEquipIntensify(req: CalculateEquipIntensifyRequest) { 
    let { equip, equipColor, level, HeroTemplateList, subValueDistributionMap, HeroDetailMap, artifactListResult, upgradeTimeDistribution, speedThreshold } = req

    let subValues = CalEquipSubValue(equip)
    let UpgradeLevelForIntensify = Math.floor(equip.UpgradeLevel / 3) * 3
    
    let intensifyDistribution: IntensifyDistribution = new IntensifyDistribution
    
    IntensifyDistributions.map((intensifyDistributionTemp) => { 
        if (intensifyDistributionTemp.EquipType === equipColor && intensifyDistributionTemp.StartLevel === UpgradeLevelForIntensify) { 
            intensifyDistribution = intensifyDistributionTemp
        }
    })
    if (intensifyDistribution === undefined) { 
        return 
    }

    let subValueClassFourRange = [subValues[3]]
    if (subValues[3].Class == "") { // 证明没有第四条属性
        subValueClassFourRange = GetSubValueClassFourRange(equip)
    }

    // 高速特殊处理，如果速度套和二件套散件大于18速，其他四件套大于20速，视为高速装备
    let evaluateValidEquipResult: EvaluateValidEquipResult = {
        PreComputationResults: [],
        ManuelResults: [],
        Total: 0,
        ValidTotal: 0,
    }
    for (let key of intensifyDistribution.Distribution.keys()) { // 遍历所有的强化次数分配
        // 当前分布的出现次数
        let distributionNum = intensifyDistribution.Distribution.get(key)
        if (distributionNum === undefined) { 
            continue
        }
        // 保证key的长度为4，计算出每个属性的强化次数
        let intensifyNumDistribution = [(Number(key[0]) - Number('0')), (Number(key[1]) - Number('0')), (Number(key[2]) - Number('0')), (Number(key[3]) - Number('0'))]
        // console.log(intensifyNumDistribution)
        // intensifyNumDistribution是预测的强化次数，upgradeTimeDistribution 是基础的强化次数
        // 加一起就是总的讲话次数
        let upgradeTimeDistributionRes = [
            intensifyNumDistribution[0] + upgradeTimeDistribution[0],
            intensifyNumDistribution[1] + upgradeTimeDistribution[1],
            intensifyNumDistribution[2] + upgradeTimeDistribution[2],
            intensifyNumDistribution[3] + upgradeTimeDistribution[3],
        ]
        for (let subValueFourIndex = 0; subValueFourIndex < subValueClassFourRange.length; subValueFourIndex++) { // 遍历所有的强化次数分配
            let subValueClassFour = subValueClassFourRange[subValueFourIndex]
            // 已经得知当前每个值的强化次数，开始计算装备的副属性出现范围
            let everyValueDistributionRange = [
                subValueDistributionMap.get(GetOneValueDistributionMapKey(subValues[0].Class, level, intensifyNumDistribution[0]))!,
                subValueDistributionMap.get(GetOneValueDistributionMapKey(subValues[1].Class, level, intensifyNumDistribution[1]))!,
                subValueDistributionMap.get(GetOneValueDistributionMapKey(subValues[2].Class, level, intensifyNumDistribution[2]))!,
                subValueDistributionMap.get(GetOneValueDistributionMapKey(subValueClassFour.Class, level, intensifyNumDistribution[3]))!,
            ]
            everyValueDistributionRange.map((k, index) => { 
                if (k === undefined) { 
                    console.log(subValues[index], level, intensifyNumDistribution[index])
                }

            })
            
            let tempSubValues = [subValues[0], subValues[1], subValues[2], subValueClassFour]  

            // console.log(equip, tempSubValues, HeroTemplateList, HeroDetailMap, artifactListResult)
            let resHeroTemplatePreComputation = CalHeroTemplatePreComputationForAdapter(equip, tempSubValues, HeroTemplateList, HeroDetailMap, artifactListResult)
            // console.log(resHeroTemplatePreComputation)
            
            // console.log(upgradeTimeDistributionRes.toString())            
            let evaluateValidEquipResultTemp = DfsEveryValueDistributionRange(speedThreshold, equip.EquipLoc, tempSubValues, 0, everyValueDistributionRange, resHeroTemplatePreComputation, upgradeTimeDistributionRes, equipColor, level)
            // console.log(evaluateValidEquipResultTemp, distributionNum)
            // 开始合并结果
            evaluateValidEquipResultTemp = MultiplyEvaluateValidEquipResult(evaluateValidEquipResultTemp, distributionNum)
            // console.log(evaluateValidEquipResultTemp.Total, evaluateValidEquipResultTemp.ValidTotal)

            // console.log(evaluateValidEquipResult.Total, evaluateValidEquipResult.ValidTotal)
            evaluateValidEquipResult = MergeEvaluateValidEquipResult(evaluateValidEquipResult, evaluateValidEquipResultTemp)
            // console.log(evaluateValidEquipResult.Total, evaluateValidEquipResult.ValidTotal)
        }
    }
    return evaluateValidEquipResult
}

function DfsEveryValueDistributionRange(speedThreshold: number, EquipLoc: string, subValues: SubValue[], dfsIndex: number, everyValueDistributionRange: OneValueDistributionRange[], heroTemplatePreComputation: HeroTemplatePreComputationForAdapter[], upgradeTimeDistribution: number[], equipColor: string, level: number) {
    let tempSubValues = DeepCopyArray(subValues) // 赋值一个中间数据，不要改变原始数据
    let evaluateValidEquipResult: EvaluateValidEquipResult = {
        Total: 0,
        ValidTotal: 0,
        PreComputationResults: [],
        ManuelResults: [],
    }
    // if (dfsIndex == 1) { 
    //     return evaluateValidEquipResult
    // }
    if (dfsIndex == 4) { 
        // 代表四种属性都已经计算完毕,开始计算最终强化完成的装备是否是好用的。
        // console.log(JSON.stringify(tempSubValues))
        let temp = EvaluateValidEquip(speedThreshold, EquipLoc, tempSubValues, heroTemplatePreComputation, upgradeTimeDistribution, equipColor, level)
        return temp
    }
    let oneValueRange: OneValueDistributionRange = everyValueDistributionRange[dfsIndex]
    for (let i = 0; i < oneValueRange.Distributions.length; i++) { 
        tempSubValues[dfsIndex].Value += oneValueRange.Distributions[i].Value
        let distributionNum = oneValueRange.Distributions[i].DistributionNum
        let dfsRes: EvaluateValidEquipResult = DfsEveryValueDistributionRange(speedThreshold, EquipLoc, tempSubValues, dfsIndex + 1, everyValueDistributionRange, heroTemplatePreComputation, upgradeTimeDistribution, equipColor, level)
        dfsRes = MultiplyEvaluateValidEquipResult(dfsRes, distributionNum)
        evaluateValidEquipResult = MergeEvaluateValidEquipResult(evaluateValidEquipResult, dfsRes)

        tempSubValues[dfsIndex].Value -= oneValueRange.Distributions[i].Value
        // console.log(JSON.stringify(tempSubValues))
    }
    return evaluateValidEquipResult!
}

interface EvaluateValidEquipByPreComputationResult { 
    preComputation: HeroTemplatePreComputationForAdapter,
    num: number,
}

interface EvaluateValidEquipByManuelResult {
    describe: string,
    num: number,
}

interface EvaluateValidEquipResult { 
    Total: number,
    ValidTotal: number,
    PreComputationResults: EvaluateValidEquipByPreComputationResult[],
    ManuelResults: EvaluateValidEquipByManuelResult[],
}


function MultiplyEvaluateValidEquipResult(result: EvaluateValidEquipResult, multipleNumber: number): EvaluateValidEquipResult {
  const multipliedResult: EvaluateValidEquipResult = {
      Total: result.Total * multipleNumber,
      ValidTotal: result.ValidTotal * multipleNumber,
      PreComputationResults: result.PreComputationResults.map((preResult) => ({
          preComputation: preResult.preComputation,
          num: preResult.num * multipleNumber,
      })),
      ManuelResults: result.ManuelResults.map((manuelResult) => ({
          describe: manuelResult.describe,
          num: manuelResult.num * multipleNumber,
      })),
  };
  return multipliedResult;
}

function MergeEvaluateValidEquipByManuelResults(arr1: EvaluateValidEquipByManuelResult[], arr2: EvaluateValidEquipByManuelResult[]) {
    const mergedResults: EvaluateValidEquipByManuelResult[] = [];
    const map = new Map();

    function mergeResults(arr: EvaluateValidEquipByManuelResult[]) {
        for (const result of arr) {
            if (map.has(result.describe)) {
                const existingResult = map.get(result.describe);
                existingResult.num += result.num;
            } else {
                const newResult: EvaluateValidEquipByManuelResult = { ...result };
                mergedResults.push(newResult);
                map.set(result.describe, newResult);
            }
        }
    }

    mergeResults(arr1);
    mergeResults(arr2);

    return mergedResults;
}

function MergeEvaluateValidEquipResult(res1: EvaluateValidEquipResult, res2: EvaluateValidEquipResult) {
    // ManuelResults合并需要找到describe相同的
    let resManuelResults: EvaluateValidEquipByManuelResult[] = MergeEvaluateValidEquipByManuelResults(res1.ManuelResults, res2.ManuelResults)

    // 计算结果的时候，需要按照 阀值和需要属性进行归类
    let tempMap = new Map<string, EvaluateValidEquipByPreComputationResult>()
    
    const mergePreComputation = (preComputation: EvaluateValidEquipByPreComputationResult, index: number) => {
        let key = preComputation.preComputation.SubValueNeed.join("#") + "#" + preComputation.preComputation.GradeThreshold
        let tempValue = tempMap.get(key)
        if (tempValue === undefined) {
            tempMap.set(key, preComputation)
            return
        }
        tempValue.num += preComputation.num
        tempValue.preComputation.HeroCode = Array.from(new Set([...tempValue.preComputation.HeroCode, ...preComputation.preComputation.HeroCode]))
        tempValue.preComputation.HeroTemplateID = Array.from(new Set([...tempValue.preComputation.HeroTemplateID, ...preComputation.preComputation.HeroTemplateID]))
        tempMap.set(key, tempValue)
    }

    res1.PreComputationResults.map(mergePreComputation)
    res2.PreComputationResults.map(mergePreComputation)


    let res: EvaluateValidEquipResult = { 
        Total: res1.Total + res2.Total,
        ValidTotal: res1.ValidTotal + res2.ValidTotal,
        PreComputationResults: Array.from(tempMap.values()),
        ManuelResults: resManuelResults,
    }
    // console.log(res1, res2, res)
    return res
}

function EvaluateValidEquip(speedThreshold: number, EquipLoc: string, subValues: SubValue[], heroTemplatePreComputation: HeroTemplatePreComputationForAdapter[], upgradeTimeDistribution: number[], equipColor: string, level: number) {  
    let tempSubValues = DeepCopyArray(subValues) // 赋值一个中间数据，不要改变原始数据
    let tempUpgradeTimeDistribution = DeepCopyNumberArray(upgradeTimeDistribution)
    
    let result: EvaluateValidEquipResult = {
        PreComputationResults: [],
        ManuelResults: [],
        Total: 1,
        ValidTotal: 0,
    }

    tempSubValues.map((subValue: SubValue, index: number) => {
        let upgradeTime = tempUpgradeTimeDistribution[index] // 该属性的强化次数
        // 有一种特殊情况，那就是紫装的第4个位置，虽然升级次数是1或2次，但是由于没有基础的存在，少一个计算次数
        if (equipColor === "purple" && index === 3) {
            upgradeTime = upgradeTime - 1
        } else { 
            upgradeTime = upgradeTime
        }
        tempUpgradeTimeDistribution[index] = upgradeTime
    })

    // 先对85装备，计算重铸
    if (level === 85) {
        tempSubValues.map((subValue: SubValue, index: number) => {
            let upgradeTime = tempUpgradeTimeDistribution[index] // 该属性的强化次数
            tempSubValues[index].Value += GetClassRecoinUpgrade(subValue.Class, upgradeTime)
        })
    }

    let gradeSubValues = [
        CalculateGradeByClass(tempSubValues[0].Class, tempSubValues[0].Value),
        CalculateGradeByClass(tempSubValues[1].Class, tempSubValues[1].Value),
        CalculateGradeByClass(tempSubValues[2].Class, tempSubValues[2].Value),
        CalculateGradeByClass(tempSubValues[3].Class, tempSubValues[3].Value),
    ]
    tempSubValues.map((subValue: SubValue, index: number) => { 
        if (subValue.Class === ClassSpeed && subValue.Value >= speedThreshold) {
            result.ManuelResults.push({
                describe: ManuelResultHighSpeed,
                num: 1,
            })
        }
        if (subValue.Class !== ClassSpeed && gradeSubValues[index] >= HighOneSubValueGradeThreshold) {
            result.ManuelResults.push({
                describe: ManuelResultOnlyOneValue + "#" + subValue.Class,
                num: 1,
            })
        }
    })
    // 评估一件装备是否有用，需要看配装的分析，基于对模板的预计算
    heroTemplatePreComputation.map((preComputation,indexPre) => { 
        let validValue = 0 
        let convertValue = 0
        tempSubValues.map((subValue, index) => { 
            let nowValueValid = 0 // 当前属性的有效值
            if (preComputation.SubValueNeed[index]) { // 需要这个属性
                nowValueValid = CalculateGradeByClass(subValue.Class, subValue.Value) 
                validValue += nowValueValid // 总的有效值增加
            }
            
            // 计算转换收益
            let nowConvertValue = 0
            if (preComputation.ConvertValueType === ConvertValueTypeFixed) {
                nowConvertValue = (GetClassTransform(ClassDefend, tempUpgradeTimeDistribution[index], level)) / 6 - nowValueValid // 固定值当防御来转
            } else if (preComputation.ConvertValueType === ConvertValueTypePercent) {
                nowConvertValue = GetClassTransform(ClassDefendPercent, tempUpgradeTimeDistribution[index], level) - nowValueValid // 百分比当做最高的来转
            }            
            if (nowConvertValue > convertValue) { 
                convertValue = nowConvertValue
            }
        })
        if (validValue + convertValue > preComputation.GradeThreshold) { 
            result.PreComputationResults.push({
                preComputation: heroTemplatePreComputation[indexPre],
                num: 1,
            })
        }
    })
    if (result.ManuelResults.length !== 0 || result.PreComputationResults.length !== 0) {
        result.ValidTotal = 1
    }
    result.PreComputationResults.map((preComputationResult) => { 
        if (preComputationResult.num > 1) { 
            console.log(result)
        }
    })
    return result
}
