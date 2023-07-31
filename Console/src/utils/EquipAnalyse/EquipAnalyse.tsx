import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link, Card, Space, Button } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, E7DataDomain, SetList } from '../const';
import { AttributeCode, AttributeCodeIconFlex, Equipment, HeroDetail, HeroListResult, InitEquipment, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../pages/type";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
import { PieChart } from "../PieChart/PieChart";
import { GenerateSetImageUrl } from "../helper";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface EquipAnalyseProps {
    equip?: Equipment;
    visible: boolean;
    onCancel: () => void;
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
    const [IsRightThree, setIsRightThree] = useState(false)

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
    const [HeroNameFilter, setHeroNameFilter] = useState("")
    const [EquipSetFilter, setEquipSetFilter] = useState("")

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
            if (EquipSetFilter !== "") {
                let set1 = item.heroDetail.rankSets1.split(",")
                let set2 = item.heroDetail.rankSets2.split(",")
                let set3 = item.heroDetail.rankSets3.split(",")
                let setAllTemp = [...set1, ...set2, ...set3]
                if (!setAllTemp.includes(EquipSetFilter)) { 
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
        setIsRightThree(false)
        if (props.equip !== undefined) {
            if (props.visible) {
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
                setEquipLevel(props.equip.Level)
            } else {
                SetZero()
            }
        }
    }, [props.visible])

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
    if (IsRightThree) {
        switch (MainType) {
            case ClassAtk:
                atkGrade += MainValue / 9
                break;
            case ClassAtk + ClassSuffixPercent:
                atkPercentGrade += MainValue
                break;
            case ClassDefend:
                defendGrade += MainValue / 6
                break;
            case ClassDefend + ClassSuffixPercent:
                defendPercentGrade += MainValue
                break;
            case ClassHp:
                hpGrade += MainValue / 50
                break;
            case ClassHp + ClassSuffixPercent:
                hpPercentGrade += MainValue
                break;
            case ClassSpeed:
                speedGrade += MainValue * 2
                break;
            case ClassCC:
                ccGrade += MainValue * 1.5
                break;
            case ClassCD:
                cdGrade += MainValue * 1.1
                break;
            case ClassHr:
                hrGrade += MainValue
                break;
            case ClassRr:
                rrGrade += MainValue
                break;
        }
    }
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

    return <Modal style={{ width: 1600 }} visible={props.visible} onCancel={props.onCancel} onConfirm={() => { props.onCancel() }} onOk={() => { props.onCancel() }}>
        <HeroDetailStatisticShow Hero={hero} visible={heroVisible} onCancel={() => { setHeroVisible(false) }} />
        <Grid.Row>
            <Grid.Col span={5}>
                <div><Image src={props.equip?.EquipImageStr}></Image></div>
                <div><Button style={{ margin: 20 }} type="primary" onClick={() => { SetZero() }}>重置分数</Button></div>
                <Checkbox style={{ marginTop: 0 }} checked={IsRightThree} onChange={setIsRightThree}>是否为右三件</Checkbox>
                {IsRightThree && <div style={{ marginTop: 20 }}>
                    主属性类型：
                    <Select value={MainType} onChange={setMainType} style={{ width: 130 }}>
                        <Select.Option value={ClassAtk}>攻击力固定值</Select.Option>
                        <Select.Option value={ClassAtk + ClassSuffixPercent}>攻击力百分比</Select.Option>
                        <Select.Option value={ClassDefend}>防御力固定值</Select.Option>
                        <Select.Option value={ClassDefend + ClassSuffixPercent}>防御力百分比</Select.Option>
                        <Select.Option value={ClassHp}>生命值固定值</Select.Option>
                        <Select.Option value={ClassHp + ClassSuffixPercent}>生命值百分比</Select.Option>
                        <Select.Option value={ClassSpeed}>速度</Select.Option>
                        <Select.Option value={ClassCC}>暴击率</Select.Option>
                        <Select.Option value={ClassCD}>暴击伤害</Select.Option>
                        <Select.Option value={ClassHr}>效果命中</Select.Option>
                        <Select.Option value={ClassRr}>效果抵抗</Select.Option>
                    </Select>
                    <InputNumber min={0} style={{ width: 60 }} value={MainValue} onChange={setMainValue} />
                </div>}
                <div style={{ marginTop: 20 }}>
                    <div><span style={{ color: "" }}>攻击分: {(atkGrade + atkPercentGrade).toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>防御分: {(defendGrade + defendPercentGrade).toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>生命分: {(hpGrade + hpPercentGrade).toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>速度分: {speedGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>暴率分: {ccGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>暴伤分: {cdGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>命中分: {hrGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>抵抗分: {rrGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "red" }}>总分: {totalGrade.toFixed(2)}</span></div>
                </div>
                <Card title={"强化预览(85级红装)"} style={{ marginTop: 40 }}>
                    <PieChart equip={equip} />
                </Card>
            </Grid.Col>
            <Grid.Col span={4}>
                <div style={{ width: 200 }}>
                    <InputNumber defaultValue={0} hideControl prefix={<span style={{ color: "blue" }}>攻击力 固定{"\u00A0\u00A0\u00A0"}</span>} min={0} value={Atk} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setAtk(val) } else { setAtk(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>攻击力 %{"\u00A0\u00A0\u00A0"}{"\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={AtkPercent} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setAtkPercent(val) } else { setAtkPercent(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>防御力 固定{"\u00A0\u00A0\u00A0"}</span>} min={0} value={Defend} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setDefend(val) } else { setDefend(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>防御力 %{"\u00A0\u00A0\u00A0"}{"\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={DefendPercent} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setDefendPercent(val) } else { setDefendPercent(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>生命值 固定{"\u00A0\u00A0\u00A0"}</span>} min={0} value={Hp} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setHp(val) } else { setHp(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>生命值 %{"\u00A0\u00A0\u00A0"}{"\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={HpPercent} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setHpPercent(val) } else { setHpPercent(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>速度{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={Speed} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setSpeed(val) } else { setSpeed(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>暴击率{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={CC} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setCC(val) } else { setCC(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>暴击伤害{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={CD} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setCD(val) } else { setCD(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>效果命中{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={Hr} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setHr(val) } else { setHr(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>效果抵抗{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={RR} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setRR(val) } else { setRR(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>强化等级{"\u00A0\u00A0\u00A0\u00A0\u00A0"}+</span>} min={0} value={UpgradeLevel} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setUpgradeLevel(val) } else { setUpgradeLevel(0) } }} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>装备等级{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={EquipLevel} style={{ margin: 10, width: 200 }} onChange={(val) => { if (val !== undefined) { setEquipLevel(val) } else { setEquipLevel(0) } }} />
                </div>
            </Grid.Col>
            <Grid.Col span={11}>
                <div style={{ backgroundColor: "blue" }}></div>
                <Grid.Row>
                    <Grid.Col span={10} style={{ margin: 10 }}>
                        <span style={{ marginRight: 20 }}>角色名称筛选</span>
                        <Input value={HeroNameFilter} style={{ width: 180, }} onChange={setHeroNameFilter}></Input>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ margin: 10 }}>
                        <span style={{marginRight:20}}>套装筛选</span>
                        <Select
                            value={EquipSetFilter}
                            onChange={setEquipSetFilter}
                            virtualListProps={{ height: 1000 }}
                            style={{width:70,}}
                            renderFormat={(option, value) => {
                                if (value === "") { 
                                    return <div></div>
                                }
                                return <Image preview={false} width={30} src={GenerateSetImageUrl(value+"")}></Image>
                            }}
                        >
                            <Select.Option value={""}>空</Select.Option>
                            {SetList.map((setTemp) => { 
                                return <Select.Option value={setTemp}>
                                    <Image preview={false } width={30} src={GenerateSetImageUrl(setTemp)}></Image>
                                </Select.Option>
                            })}
                            
                        </Select>
                    </Grid.Col>
                    <Grid.Col span={4} style={{ marginTop: 15 }}>
                        <Popover content={<div>参考B站UP主阿吉的视频攻略:<Link href="https://www.bilibili.com/video/BV1Es4y1T7tf">点此跳转</Link></div>}><span>只看RTA角色</span></Popover>
                        <Checkbox checked={ChakeyListFilter} onChange={setChakeyListFilter}></Checkbox>
                    </Grid.Col>
                </Grid.Row>
                <Table
                    data={FindSuitHeroList}
                    columns={[
                        {
                            title: '角色',
                            render(col, item: FindSuitHero, index) {
                                return <HeroImageShow ImageSizeParm={0.6} HeroDetail={item.HeroDetail} />
                            },
                        },
                        {
                            title: '装备分利用率',
                            render(col, item: FindSuitHero, index) {
                                return <span>{(item.UseRadio * 100).toFixed(2)}%</span>
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
                                        if (!allSet.includes(val)&&val!=="") {
                                            allSet.push(val)
                                        }
                                    })
                                })
                                return <Space direction='vertical'><Image.PreviewGroup infinite>{allSet.map((setTemp, index) => {
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
                                return <Link onClick={() => {
                                    setHero(item.HeroDetail)
                                    setHeroVisible(true)
                                }}>详情</Link>
                            },
                        },
                    ]}
                ></Table>
            </Grid.Col>
        </Grid.Row>
    </Modal>
}