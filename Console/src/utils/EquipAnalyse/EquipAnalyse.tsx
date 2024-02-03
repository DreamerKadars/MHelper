import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link, Card, Space, Button, Radio, Collapse, Tabs } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { CalEquipSubValue, ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, ConvertHeroListResultToMap, E7DataDomain, EquipLocCNRange, EquipLocCuirass, EquipLocHelmet, EquipLocNecklace, EquipLocRange, EquipLocRing, EquipLocShoes, EquipLocWeapon, GetClassImage, GetDefaultEquipImage, HeroDetailBackEnd, HeroTemplate, MainNecklaceRange, SetList } from '../const';
import { AttributeCode, AttributeCodeIconFlex, Equipment, HeroDetail, HeroListResult, InitEquipment, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../utils/const";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { HandlerAxiosErrPrefix, ListHeroDetail, LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
import { PieChart } from "../PieChart/PieChart";
import { GenerateSetImageUrl } from "../helper";
import { EquipSetSelect } from "../EquipSetSelect/EquipSetSelect";
import { EquipmentMainSelect } from "../../pages/Admin/HeroTemplate/HeroForm/HeroFrom";
import { HeroTemplateForEquipSearchTable } from "./HeroTemplateForEquipSearchTable/HeroTemplateForEquipSearchTable";
import { CalculateHeroTemplateByEquip } from "../HeroTemplateHelper/HeroTemplateHelper";
import { ValidSubValueAnalyse } from "./ValidSubValueAnalyse";
import { HeroTemplateList } from "../api/heroTemplate";
import { IntensifyAnalyse } from "./IntensifyAnalyse/IntensifyAnalyse";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;


interface EquipAnalyseModalProps {
    equip?: Equipment;
    visible: boolean;
    onCancel: () => void;
}

export const EquipAnalyseModal = (props: EquipAnalyseModalProps) => {
    return <Modal style={{ width: 1600 }} visible={props.visible} onCancel={props.onCancel} onConfirm={() => { props.onCancel() }} onOk={() => { props.onCancel() }}>
        <EquipAnalyse equip={props.equip}/>
    </Modal>
}

interface EquipAnalyseProps {
    equip?: Equipment;
}

export const EquipAnalyse = (props: EquipAnalyseProps) => {
    const [{ data, loading, error }, refetch] = LoadHeroJSON()
    let HeroListResult: HeroListResult = data
    let tempHeroList: HeroDetail[] = []

    const [MainType, setMainType] = useState("")
    const [MainValue, setMainValue] = useState(0)
    const [CC, setCC] = useState(0)
    const [CD, setCD] = useState(0)
    const [Atk, setAtk] = useState(0)
    const [Speed, setSpeed] = useState(0)
    const [AtkPercent, setAtkPercent] = useState(0)
    const [Hp, setHp] = useState(0)
    const [HpPercent, setHpPercent] = useState(0)
    const [RR, setRR] = useState(0)
    const [Hr, setHr] = useState(0)
    const [Defend, setDefend] = useState(0)
    const [DefendPercent, setDefendPercent] = useState(0)
    const [UpgradeLevel, setUpgradeLevel] = useState(0)
    const [EquipLevel, setEquipLevel] = useState(0)
    const [equipLoc, setEquipLoc] = useState("")
    const [equipColor, setEquipColor] = useState("purple")
    const [fourLocClass, setFourLocClass] = useState("")
    
    
    const [nowEquip, setNowEquip] = useState(InitEquipment())
    const [fresh, setFresh] = useState(false)

    const defaultHero: HeroDetail = {
        heroCode: "",
        heroName: "",
        grade: 0,
        jobCode: JobCode.Knight,
        attributeCode: AttributeCode.Dark,
        heroDetail: InitializeHeroStaticDetail()
    }
    const [hero, setHero] = useState(defaultHero)
    const [heroVisible, setHeroVisible] = useState(false)
    const [ChakeyListFilter, setChakeyListFilter] = useState(false)
    const [BigData, setBigData] = useState(false)
    const [transform, setTransform] = useState(false)
    const [HeroNameFilter, setHeroNameFilter] = useState("")
    const [equipSet, setEquipSet] = useState("")

    const [heroTemplateList, setHeroTemplateList] = useState<HeroTemplate[]>([])
    const [{ }, funcHeroTemplateList] = HeroTemplateList(false)

    const HeroListMap = ConvertHeroListResultToMap(HeroListResult)
    console.log(equipColor)
    if (HeroListResult !== undefined && HeroListResult.heroList != undefined) {
        tempHeroList = HeroListResult.heroList.filter((item) => {
            if (ChakeyListFilter) {
                if (!ChakeyList.includes(item.heroCode)) {
                    return false
                }
            }
            if (HeroNameFilter !== "") {
                if (item.heroName.indexOf(HeroNameFilter) < 0) {
                    return false
                }
            }
            if (equipSet !== "") {
                let set1 = item.heroDetail.rankSets1.split(",")
                let set2 = item.heroDetail.rankSets2.split(",")
                let set3 = item.heroDetail.rankSets3.split(",")
                let setAllTemp = [...set1, ...set2, ...set3]
                if (!setAllTemp.includes(equipSet)) { 
                    return false
                }
            }
            return true
        })
    }
    const SetZero = () => { 
        setAtk(0)
        setAtkPercent(0)
        setDefend(0)
        setDefendPercent(0)
        setHp(0)
        setHpPercent(0)
        setSpeed(0)
        setCC(0)
        setCD(0)
        setHr(0)
        setRR(0)
        setMainType("")
        setMainValue(0)
        setUpgradeLevel(0)
        setEquipLevel(85)
    }
    useEffect(() => {
        setEquipLoc("")
        if (props.equip !== undefined) {
            setAtk(props.equip.Atk)
            setAtkPercent(props.equip.AtkPercent)
            setDefend(props.equip.Defend)
            setDefendPercent(props.equip.DefendPercent)
            setHp(props.equip.Hp)
            setHpPercent(props.equip.HpPercent)
            setSpeed(props.equip.Speed)
            setCC(props.equip.CC)
            setCD(props.equip.CD)
            setHr(props.equip.Hr)
            setRR(props.equip.RR)
            setMainType(props.equip.MainType)
            setMainValue(props.equip.MainValue)
            setUpgradeLevel(props.equip.UpgradeLevel)
            if (props.equip.Level === 85) {
                setEquipLevel(props.equip.Level)
            } else { 
                setEquipLevel(88)
            }
            if (props.equip.Set !== undefined) { 
                setEquipSet(props.equip.Set)
            }
            setEquipLoc(props.equip.EquipLoc)
            if (props.equip.EquipColor == "") {
                setEquipColor("red")
            } else { 
                setEquipColor(props.equip.EquipColor)
            }
            setFourLocClass(props.equip.FourLocClass)
            setFresh(!fresh)
        } else { 
            SetZero()
        }
    }, [props.equip])

    useEffect(() => {
        funcHeroTemplateList().then((resp) => {
            setHeroTemplateList(resp.data.Data)
        }).catch((error) => {
            console.log(error)
            HandlerAxiosErrPrefix("读取角色模板", error)
        })
    }, [])

    useEffect(() => { 
        // 刷新该页面配备的装备结构
        let newEquip: Equipment 
        if (props.equip !== undefined) {
            newEquip = { ...props.equip }
        } else { 
            newEquip = InitEquipment()
        }

        newEquip.Atk = Atk
        newEquip.Hp = Hp
        newEquip.Defend = Defend
        newEquip.AtkPercent = AtkPercent
        newEquip.HpPercent = HpPercent
        newEquip.DefendPercent = DefendPercent
        newEquip.CC = CC
        newEquip.CD = CD
        newEquip.Hr = Hr
        newEquip.RR = RR
        newEquip.Speed = Speed
        newEquip.MainType = MainType
        newEquip.MainValue = MainValue
        newEquip.UpgradeLevel = UpgradeLevel
        newEquip.EquipLoc = equipLoc
        newEquip.Set = equipSet
        newEquip.Level = EquipLevel
        newEquip.EquipColor = equipColor
        newEquip.FourLocClass = fourLocClass
        switch (equipLoc) { 
            case EquipLocWeapon:
                newEquip.MainType = ClassAtk
                break
            case EquipLocCuirass:
                newEquip.MainType = ClassDefend
                break
            case EquipLocHelmet:
                newEquip.MainType = ClassHp
                break
        }
        setNowEquip(newEquip)
    }, [fresh, Atk, Hp, Defend, AtkPercent, HpPercent, DefendPercent, CC, CD, Hr, RR, Speed, MainType, MainValue, UpgradeLevel, EquipLevel, equipLoc, equipSet, equipColor, fourLocClass])

    let speedGrade = Speed * 2
    let atkGrade = (Atk / 9)
    let defendGrade = (Defend / 6)
    let hpGrade = (Hp / 50)
    let atkPercentGrade = AtkPercent
    let defendPercentGrade = DefendPercent
    let hpPercentGrade = HpPercent
    let ccGrade = (CC * 1.5)
    let cdGrade = (CD * 1.1)
    let hrGrade = Hr
    let rrGrade = RR
    // 总分干扰判断，取消
    // if (equipLoc !== "") {
    //     switch (MainType) {
    //         case ClassAtk:
    //             atkGrade += MainValue / 9
    //             break;
    //         case ClassAtk + ClassSuffixPercent:
    //             atkPercentGrade += MainValue
    //             break;
    //         case ClassDefend:
    //             defendGrade += MainValue / 6
    //             break;
    //         case ClassDefend + ClassSuffixPercent:
    //             defendPercentGrade += MainValue
    //             break;
    //         case ClassHp:
    //             hpGrade += MainValue / 50
    //             break;
    //         case ClassHp + ClassSuffixPercent:
    //             hpPercentGrade += MainValue
    //             break;
    //         case ClassSpeed:
    //             speedGrade += MainValue * 2
    //             break;
    //         case ClassCC:
    //             ccGrade += MainValue * 1.5
    //             break;
    //         case ClassCD:
    //             cdGrade += MainValue * 1.1
    //             break;
    //         case ClassHr:
    //             hrGrade += MainValue
    //             break;
    //         case ClassRr:
    //             rrGrade += MainValue
    //             break;
    //     }
    // }
    const totalGrade = speedGrade + atkGrade + defendGrade + hpGrade + atkPercentGrade + defendPercentGrade + hpPercentGrade + ccGrade + cdGrade + hrGrade + rrGrade

    interface FindSuitHero {
        HeroDetail: HeroDetail,
        UseRadio: number,
    }

    let FindSuitHeroList: FindSuitHero[] = []

    tempHeroList.map((item: HeroDetail) => {
        const useTotalGrade = (speedGrade * item.heroDetail.speedLevel +
            atkGrade * item.heroDetail.attackLevel +
            defendGrade * item.heroDetail.defenseLevel +
            hpGrade * item.heroDetail.vitalityLevel +
            atkPercentGrade * item.heroDetail.attackLevel +
            defendPercentGrade * item.heroDetail.defenseLevel +
            hpPercentGrade * item.heroDetail.vitalityLevel +
            ccGrade * item.heroDetail.criticalLevel +
            cdGrade * item.heroDetail.criticalHitLevel +
            hrGrade * item.heroDetail.effectiveLevel +
            rrGrade * item.heroDetail.effectResistanceLevel) / 10
        FindSuitHeroList.push({
            HeroDetail: item,
            UseRadio: totalGrade === 0 ? 0 : (useTotalGrade / totalGrade),
        })
    })

    // 构造强化概率计算的输入
    let equip: Equipment = InitEquipment()

    equip.CC = CC
    equip.CD = CD
    equip.Atk = Atk
    equip.AtkPercent = AtkPercent
    equip.Speed = Speed
    equip.Hp = Hp
    equip.HpPercent = HpPercent
    equip.RR = RR
    equip.Hr = Hr
    equip.Defend = Defend
    equip.DefendPercent = DefendPercent
    equip.UpgradeLevel = UpgradeLevel
    equip.Level = EquipLevel
    equip.MainType = MainType
    equip.MainValue = MainValue
    equip.EquipColor = equipColor

    let subNum = 0 // 计算副属性的数量，不应该大于4个
    let subValues = CalEquipSubValue(equip)
    let subValueList = [CC, CD, Atk, Speed, AtkPercent, Hp, HpPercent, RR, Hr, Defend, DefendPercent]
    subValueList.map((value) => { 
        if (value !== 0) {
            subNum++;
        }
    })
    let subValueValidList: string[] = []
    subValues.map((value) => {
        if (value.Class !== "") {
            subValueValidList.push(value.Class)
        }
    })
    console.log(equipColor, UpgradeLevel)
    return <Card>
    <HeroDetailStatisticShow Hero={hero} visible={heroVisible} onCancel={() => { setHeroVisible(false) }} />
        <Grid.Row>
            <Grid.Col span={10}>
                <Grid.Row>
                    <Grid.Col span={13}>
                        <div><Image src={(props.equip?.EquipImageStr === undefined || props.equip?.EquipImageStr === "") ? GetDefaultEquipImage(equipLoc) : props.equip?.EquipImageStr}>

                        </Image>
                        </div>

                        <div>
                            {/* <Button style={{ margin: 20 }} type="primary" onClick={() => { setFresh(!fresh) }}>计算结果</Button> */}
                            <Button style={{ margin: 20 }} type="primary" onClick={() => { SetZero() }}>重置分数</Button>
                        </div>
                        <Radio.Group defaultValue='a' style={{ marginBottom: 20 }} onChange={setEquipLoc} value={equipLoc}>
                            {EquipLocRange.map((key, index) => {
                                return <Radio value={key} key={index}>{EquipLocCNRange[index]}</Radio>
                            })}
                        </Radio.Group>
                        <div style={{ width: 150 }}>
                            {(equipLoc === EquipLocNecklace || equipLoc === EquipLocRing || equipLoc === EquipLocShoes) && <div>
                                <span>主属性</span>
                                <EquipmentMainSelect
                                    disabled={false}
                                    loc={equipLoc}
                                    onChange={(mainSelect: string) => {
                                        setMainType(mainSelect)
                                    }}
                                    value={MainType}
                                    single={true}
                                />
                            </div>
                            }
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <EquipSetSelect
                                EquipSet={equipSet}
                                onChange={setEquipSet}
                            />
                        </div>
                        {(equipColor === "purple" && UpgradeLevel >= 12) && <div style={{ width: 150, marginTop: 20 }}>
                            <div>
                                <span>第四条副属性</span>
                                <EquipmentMainSelect
                                    disabled={false}
                                    loc={""}
                                    selectRange={subValueValidList}
                                    onChange={(mainSelect: string) => {
                                        setFourLocClass(mainSelect)
                                    }}
                                    value={fourLocClass}
                                    single={true}
                                />
                            </div>
                        </div>}
                        <div style={{ marginTop: 20 }}>
                            <span style={{ marginRight: 20 }}>装备颜色</span>
                            <Select
                                style={{ width: 70, color: equipColor }}
                                value={equipColor}
                                renderFormat={(_, value) => {
                                    return <div style={{ color: equipColor }}>{value === "red" ? "红装" : "紫装"}</div>
                                 }}
                                onChange={setEquipColor}
                            >
                                <Select.Option key={"red"} value="red" style={{ color: "red" }}>红装</Select.Option>
                                <Select.Option key={"purple"} value="purple" style={{ color: "purple" }}>紫装</Select.Option>
                            </Select>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <div><span style={{ color: "" }}>攻击分: {(atkGrade + atkPercentGrade).toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>防御分: {(defendGrade + defendPercentGrade).toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>生命分: {(hpGrade + hpPercentGrade).toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>速度分: {speedGrade.toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>暴率分: {ccGrade.toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>暴伤分: {cdGrade.toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>命中分: {hrGrade.toFixed(2)}</span></div>
                            <div><span style={{ color: "" }}>抵抗分: {rrGrade.toFixed(2)}</span></div>
                            <div><span style={{ fontSize: 25, fontWeight: "bold", color: "red" }}>总分: {totalGrade.toFixed(2)}</span></div>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={11}>
                        <div style={{ width: 140, marginRight: 10 }}>
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassAtk)}></Image></div>} min={0} value={Atk} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setAtk(val) } else { setAtk(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassAtk)}></Image><Image height={20} src={GetClassImage(ClassSuffixPercent)}></Image></div>} min={0} value={AtkPercent} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setAtkPercent(val) } else { setAtkPercent(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassDefend)}></Image></div>} min={0} value={Defend} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setDefend(val) } else { setDefend(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassDefend)}></Image><Image height={20} src={GetClassImage(ClassSuffixPercent)}></Image></div>} min={0} value={DefendPercent} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setDefendPercent(val) } else { setDefendPercent(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassHp)}></Image></div>} min={0} value={Hp} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setHp(val) } else { setHp(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassHp)}></Image><Image height={20} src={GetClassImage(ClassSuffixPercent)}></Image></div>} min={0} value={HpPercent} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setHpPercent(val) } else { setHpPercent(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassSpeed)}></Image></div>} min={0} value={Speed} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setSpeed(val) } else { setSpeed(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassCC)}></Image></div>} min={0} value={CC} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setCC(val) } else { setCC(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassCD)}></Image></div>} min={0} value={CD} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setCD(val) } else { setCD(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassHr)}></Image></div>} min={0} value={Hr} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setHr(val) } else { setHr(0) } }} />
                            <InputNumber hideControl prefix={<div style={{ width: 50 }}><Image height={20} src={GetClassImage(ClassRr)}></Image></div>} min={0} value={RR} style={{ margin: 10, width: 140 }} onChange={(val) => { if (val !== undefined) { setRR(val) } else { setRR(0) } }} />
                            {subNum>4 ?<span style={{color:"red"}}>副属性数量不应该大于4条!</span>:<></>}
                        </div>
                    </Grid.Col>
                </Grid.Row>
                <Collapse
                    style={{ marginTop: 40, marginRight: 15 }}
                    defaultActiveKey={['1', '2', '3']}
                >
                    <Collapse.Item header='强化分析' name='1'>
                        
                        <Select
                            prefix={<span style={{ color: "blue" }}>当前强化等级{"\u00A0\u00A0\u00A0\u00A0\u00A0"}+</span>}
                            value={UpgradeLevel} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setUpgradeLevel(val) } else { setUpgradeLevel(0) } }}
                        >
                            {[0, 3, 6, 9, 12, 15].map((level) => { 
                                return <Select.Option key={level} value={level}>{level}</Select.Option>
                            })}
                        </Select>
                        <Select prefix={<span style={{ color: "blue" }}>装备等级{"\u00A0\u00A0\u00A0\u00A0"}</span>} value={EquipLevel} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setEquipLevel(val) } else { setEquipLevel(0) } }} >
                            <Select.Option key={85} value={85}>85装备</Select.Option>
                            <Select.Option key={88} value={88}>88装备</Select.Option>
                        </Select>
                        <Collapse.Item header={<div style={{ fontSize: 10 }}>有效词条分析</div>} name='2'>
                            <ValidSubValueAnalyse HeroTemplateList={heroTemplateList} equip={nowEquip}></ValidSubValueAnalyse>
                        </Collapse.Item>
                        <Collapse.Item header={<div style={{ fontSize: 10 }}>分数估算预览(85级红装重铸前)</div>} name='3'>
                            <div style={{ height: 370 }}>
                                <PieChart mode="pie" equip={equip}/>
                            </div>
                        </Collapse.Item>
                    </Collapse.Item>
                </Collapse> 
            </Grid.Col>
           
            <Grid.Col span={14}>
                <Tabs defaultActiveTab='1'>
                    <Tabs.TabPane key='1' title='适配分析'>
                        <div style={{ backgroundColor: "blue" }}></div>
                        <Grid.Row>
                            <Grid.Col span={10} style={{ margin: 10 }}>
                                <span style={{ marginRight: 20 }}>角色名称筛选</span>
                                <Input value={HeroNameFilter} style={{ width: 180, }} onChange={setHeroNameFilter}></Input>
                            </Grid.Col>
                            {
                                BigData === false ?
                                    <Grid.Col span={4} style={{ marginTop: 15, marginRight: 10 }}>
                                        {/* <Popover content={<div>参考B站UP主阿吉的视频攻略:<Link href="https://www.bilibili.com/video/BV1Es4y1T7tf">点此跳转</Link></div>}><span>只看RTA角色</span></Popover> */}
                                        考虑转换石<Checkbox checked={transform} onChange={setTransform}></Checkbox>
                                    </Grid.Col>
                                    : <></>
                            }
                            <Grid.Col span={4} style={{ marginTop: 15 }}>
                                {/* <Popover content={<div>参考B站UP主阿吉的视频攻略:<Link href="https://www.bilibili.com/video/BV1Es4y1T7tf">点此跳转</Link></div>}><span>只看RTA角色</span></Popover> */}
                                大数据模式<Checkbox checked={BigData} onChange={setBigData}></Checkbox>
                            </Grid.Col>
                        </Grid.Row>
                        {
                            BigData === false ? <div>
                                <HeroTemplateForEquipSearchTable
                                    nameFilter={HeroNameFilter}
                                    equip={nowEquip}
                                    setFilter={equipSet}
                                    transform={transform}
                                    HeroTemplateList={heroTemplateList}
                                />
                            </div> : <Table
                                data={FindSuitHeroList}
                                columns={[
                                    {
                                        title: '角色',
                                        render(col, item: FindSuitHero, index) {
                                            return <HeroImageShow key={index} ImageSizeParm={0.6} HeroDetail={item.HeroDetail} />
                                        },
                                    },
                                    {
                                        title: '装备分利用率',
                                        render(col, item: FindSuitHero, index) {
                                            return <span key={index} >{(item.UseRadio * 100).toFixed(2)}%</span>
                                        },
                                        sorter: (a: FindSuitHero, b: FindSuitHero) => a.UseRadio - b.UseRadio,
                                        sortDirections: ['ascend', 'descend'],
                                        defaultSortOrder: 'descend',
                                    },
                                    {
                                        title: '常用套装',
                                        render(col, item: FindSuitHero, index) {
                                            let set1 = item.HeroDetail.heroDetail.rankSets1.split(",")
                                            let set2 = item.HeroDetail.heroDetail.rankSets2.split(",")
                                            let set3 = item.HeroDetail.heroDetail.rankSets3.split(",")
                                            let allSet: string[] = []
                                            let setAllTemp = [set1, set2, set3]
                                            setAllTemp.map((set) => {
                                                set.map((val) => {
                                                    if (!allSet.includes(val) && val !== "") {
                                                        allSet.push(val)
                                                    }
                                                })
                                            })
                                            return <Space key={index} direction='vertical'><Image.PreviewGroup infinite>{allSet.map((setTemp, index) => {
                                                return <Space><Image width={30} style={{ display: "inline-block" }} key={index} src={GenerateSetImageUrl(setTemp)}></Image></Space>
                                            })}</Image.PreviewGroup></Space>
                                        },
                                        sorter: (a: FindSuitHero, b: FindSuitHero) => a.UseRadio - b.UseRadio,
                                        sortDirections: ['ascend', 'descend'],
                                        defaultSortOrder: 'descend',
                                    },
                                    {
                                        title: '操作',
                                        render(col, item: FindSuitHero, index) {
                                            return <Link key={index} onClick={() => {
                                                setHero(item.HeroDetail)
                                                setHeroVisible(true)
                                            }}>详情</Link>
                                        },
                                    },
                                ]}
                            ></Table>
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key='2' title='强化分析'>
                        <IntensifyAnalyse
                            HeroTemplateList={heroTemplateList}
                            equip={nowEquip}
                            LevelUP={(classTypeIns, valueIns,newFourLocClass) => { 
                                setUpgradeLevel(UpgradeLevel + 3)
                                if (newFourLocClass !== undefined && newFourLocClass !== "") { 
                                    setFourLocClass(newFourLocClass)
                                }
                                switch (classTypeIns) { 
                                    case ClassAtk:
                                        setAtk(Atk + valueIns)
                                        break;
                                    case ClassAtk + ClassSuffixPercent:
                                        setAtkPercent(AtkPercent + valueIns)
                                        break;
                                    case ClassDefend:
                                        setDefend(Defend + valueIns)
                                        break;
                                    case ClassDefend + ClassSuffixPercent:
                                        setDefendPercent(DefendPercent + valueIns)
                                        break;
                                    case ClassHp:
                                        setHp(Hp + valueIns)
                                        break;
                                    case ClassHp + ClassSuffixPercent:
                                        setHpPercent(HpPercent + valueIns)
                                        break;
                                    case ClassSpeed:
                                        setSpeed(Speed + valueIns)
                                        break;
                                    case ClassCC:
                                        setCC(CC + valueIns)
                                        break;
                                    case ClassCD:
                                        setCD(CD + valueIns)
                                        break;
                                    case ClassHr:
                                        setHr(Hr + valueIns)
                                        break;
                                    case ClassRr:
                                        setRR(RR + valueIns)
                                        break;
                                }
                            }}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Grid.Col>
        </Grid.Row>
    </Card>
}