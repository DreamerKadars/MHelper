import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, E7DataDomain } from '../const';
import { AttributeCode, AttributeCodeIconFlex, Equipment, HeroDetail, HeroListResult, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../pages/type";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
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
    const [IsRightThree, setIsRightThree] = useState(true)
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

    if (HeroListResult !== undefined && HeroListResult.heroList != undefined) {
        tempHeroList = HeroListResult.heroList.filter((item) => {
            if (ChakeyListFilter) {
                if (!ChakeyList.includes(item.heroCode)) {
                    return false
                }
            }
            return true
        })
    }
    useEffect(() => {
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
            setIsRightThree(false)
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
            UseRadio: useTotalGrade / totalGrade,
        })
    })



    return <Modal style={{ width: 1600 }} visible={props.visible} onCancel={props.onCancel} onConfirm={() => { props.onCancel() }} onOk={() => { props.onCancel() }}>
        <HeroDetailStatisticShow Hero={hero} visible={heroVisible} onCancel={() => { setHeroVisible(false) }} />
        <Grid.Row>
            <Grid.Col span={5}>
                <Image src={props.equip?.EquipImageStr}></Image>
                <Checkbox style={{ marginTop: 20 }} value={IsRightThree} onChange={setIsRightThree}>是否为右三件</Checkbox>
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
                    <div><span style={{ color: "" }}>攻击分: {atkGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>防御分: {defendGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>生命分: {hpGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>速度分: {speedGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>暴率分: {ccGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>暴伤分: {cdGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>命中分: {hrGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "" }}>抵抗分: {rrGrade.toFixed(2)}</span></div>
                    <div><span style={{ color: "red" }}>总分: {totalGrade.toFixed(2)}</span></div>
                </div>
            </Grid.Col>
            <Grid.Col span={4}>
                <div style={{ width: 200 }}>
                    <InputNumber prefix={<span style={{ color: "blue" }}>攻击力固定值</span>} min={0} value={Atk} style={{ margin: 10, width: 200 }} onChange={setAtk} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>攻击力百分比</span>} min={0} value={AtkPercent} style={{ margin: 10, width: 200 }} onChange={setAtkPercent} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>防御力固定值</span>} min={0} value={Defend} style={{ margin: 10, width: 200 }} onChange={setDefend} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>防御力百分比</span>} min={0} value={DefendPercent} style={{ margin: 10, width: 200 }} onChange={setDefendPercent} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>生命值固定值</span>} min={0} value={Hp} style={{ margin: 10, width: 200 }} onChange={setHp} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>生命值百分比</span>} min={0} value={HpPercent} style={{ margin: 10, width: 200 }} onChange={setHpPercent} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>速度{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={Speed} style={{ margin: 10, width: 200 }} onChange={setSpeed} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>暴击率{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={CC} style={{ margin: 10, width: 200 }} onChange={setCC} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>暴击伤害{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={CD} style={{ margin: 10, width: 200 }} onChange={setCD} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>效果命中{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={Hr} style={{ margin: 10, width: 200 }} onChange={setHr} />
                    <InputNumber prefix={<span style={{ color: "blue" }}>效果抵抗{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}</span>} min={0} value={RR} style={{ margin: 10, width: 200 }} onChange={setRR} />
                </div>
            </Grid.Col>
            <Grid.Col span={11}>
                <div style={{ backgroundColor: "blue" }}></div>
                <Grid.Col span={24} style={{ marginLeft: 10 }}>
                    <Form.Item label='只看RTA角色' style={{ marginRight: 10 }}>
                        <Checkbox value={ChakeyListFilter} onChange={setChakeyListFilter}></Checkbox>
                    </Form.Item>
                </Grid.Col>
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