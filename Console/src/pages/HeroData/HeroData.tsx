import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Button, Card, Checkbox, Form, Grid, Input, Link, Popover, Select, Table, TableColumnProps } from "@arco-design/web-react";
import { } from "../../const";
import { LoadHeroJSON } from "../../utils/api/help";
import { AttributeCode, HeroDetail, HeroListResult, InitializeHeroStaticDetail, JobCode } from "../../utils/const";
import HeroImageShow from "../../utils/HeroImageShow/HeroImageShow";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRr, ClassSpeed } from "../../utils/const";
import { HeroDetailStatisticShow, StatisticShow } from "../../utils/StatisticShow/StatisticShow";
const FormItem = Form.Item;

const HomeData = () => {
    const [{ data, loading, error }, refetch] = LoadHeroJSON()
    const defaultStr: string[] = []
    const defaultNum: number[] = []
    const defaultHero: HeroDetail = {
        heroCode: "",
        heroName: "",
        grade: 0,
        jobCode:JobCode.Knight,
        attributeCode: AttributeCode.Dark,
        heroDetail: InitializeHeroStaticDetail()
    }
    const [hero, setHero] = useState(defaultHero)
    const [heroVisible, setHeroVisible] = useState(false)
    const [attributeCode, setAttributeCode] = useState(defaultStr)
    const [jobCode, setJobCode] = useState(defaultStr)
    const [starCode, setStarCode] = useState(defaultNum)
    const [name, setName] = useState("")
    const [ChakeyListFilter, setChakeyListFilter] = useState(false)
    
    let HeroListResult: HeroListResult = data
    let tempHeroList: HeroDetail[] = []
    
    if (HeroListResult !== undefined && HeroListResult.heroList != undefined) {
        tempHeroList = HeroListResult.heroList.filter((item) => {
            if (attributeCode?.length > 0 && !attributeCode.includes(item.attributeCode)) {
                return false
            }
            if (jobCode?.length > 0 && !jobCode.includes(item.jobCode)) {
                return false
            }
            if (starCode?.length > 0 && !starCode.includes(item.grade)) {
                return false
            }
            if (name !== "" && item.heroName.indexOf(name) < 0) {
                return false
            }
            if (ChakeyListFilter) { 
                if (!ChakeyList.includes(item.heroCode)) { 
                    return false
                }
            }
            return true
        })
    }


    const columns: TableColumnProps[] = [
        {
            title: '角色(平均值)',
            render(col, item: HeroDetail, index) {
                return <HeroImageShow HeroDetail={item} />
            },
        },
        {
            title: '角色代码',
            render(col, item: HeroDetail, index) {
                return <span>{item.heroCode}</span>
            },
        },
        {
            title: '攻击力',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassAtk} StatisticAverage={item.heroDetail.attackAverage} StatisticLevel={item.heroDetail.attackLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.attackAverage - b.heroDetail.attackAverage,
        },
        {
            title: '防御力',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassDefend} StatisticAverage={item.heroDetail.defenseAverage} StatisticLevel={item.heroDetail.defenseLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.defenseAverage - b.heroDetail.defenseAverage,
        },
        {
            title: '生命值',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassHp} StatisticAverage={item.heroDetail.vitalityAverage} StatisticLevel={item.heroDetail.vitalityLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.vitalityAverage - b.heroDetail.vitalityAverage,
        },
        {
            title: '速度',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassSpeed} StatisticAverage={item.heroDetail.speedAverage} StatisticLevel={item.heroDetail.speedLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.speedAverage - b.heroDetail.speedAverage,
        },
        {
            title: '暴击率',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassCC} StatisticAverage={item.heroDetail.criticalAverage} StatisticLevel={item.heroDetail.criticalLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.criticalAverage - b.heroDetail.criticalAverage,
        },
        {
            title: '暴击伤害',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassCD} StatisticAverage={item.heroDetail.criticalHitAverage} StatisticLevel={item.heroDetail.criticalHitLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.criticalHitAverage - b.heroDetail.criticalHitAverage,
        },
        {
            title: '效果命中',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassHr} StatisticAverage={item.heroDetail.effectiveAverage} StatisticLevel={item.heroDetail.effectiveLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.effectiveAverage - b.heroDetail.effectiveAverage,
        },
        {
            title: '效果抵抗',
            render(col, item: HeroDetail, index) {
                return <StatisticShow Type={ClassRr} StatisticAverage={item.heroDetail.effectResistanceAverage} StatisticLevel={item.heroDetail.effectResistanceLevel} />
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.effectResistanceAverage - b.heroDetail.effectResistanceAverage,
        },
        {
            title: '统计数量',
            render(col, item: HeroDetail, index) {
                return <div>{item.heroDetail.numberStatistic}</div>
            },
            sorter: (a: HeroDetail, b: HeroDetail) => a.heroDetail.numberStatistic - b.heroDetail.numberStatistic,
        },
        {
            title: '操作',
            render(col, item: HeroDetail, index) {
                return <Link onClick={() => { 
                    setHero(item)
                    setHeroVisible(true)
                }}>详情</Link>
            },
        },
    ];
    
    return <div>
        <HeroDetailStatisticShow Hero={hero} visible={heroVisible} onCancel={() => { setHeroVisible(false) }}/>
        <Card
            style={{ margin: 10 }}
        >
            <Grid.Row>
                <Grid.Col span={5} style={{ marginRight: 10 }}>
                    <FormItem label='属性' >
                        <Select
                            // addBefore={ "属性"}
                            style={{ width: 200 }}
                            onChange={(val) => {
                                setAttributeCode(val)
                            }}
                            value={attributeCode}
                            mode='multiple'
                            allowClear
                        >
                            <Select.Option value={AttributeCode.Fire}>火焰</Select.Option>
                            <Select.Option value={AttributeCode.Ice}>寒气</Select.Option>
                            <Select.Option value={AttributeCode.Wind}>自然</Select.Option>
                            <Select.Option value={AttributeCode.Light}>光明</Select.Option>
                            <Select.Option value={AttributeCode.Dark}>黑暗</Select.Option>
                        </Select>
                    </FormItem>
                </Grid.Col>
                <Grid.Col span={5} style={{ marginRight: 10 }}>
                    <FormItem label='职业' >
                        <Select
                            mode='multiple'
                            style={{ width: 200 }}
                            allowClear
                            onChange={(val) => {
                                setJobCode(val)
                            }}
                            value={jobCode}
                        >
                            <Select.Option value={JobCode.Mage}>法师</Select.Option>
                            <Select.Option value={JobCode.Knight}>骑士</Select.Option>
                            <Select.Option value={JobCode.Assassin}>盗贼</Select.Option>
                            <Select.Option value={JobCode.Ranger}>射手</Select.Option>
                            <Select.Option value={JobCode.Manauser}>精灵师</Select.Option>
                            <Select.Option value={JobCode.Warrior}>战士</Select.Option>
                        </Select>
                    </FormItem>
                </Grid.Col>
                <Grid.Col span={5} style={{ marginRight: 10 }}>
                    <FormItem label='星级' style={{ marginRight: 10 }}>
                        <Select
                            mode='multiple'
                            style={{ width: 200 }}
                            allowClear
                            onChange={(val) => {
                                setStarCode(val)
                            }}
                            value={starCode}
                        >
                            <Select.Option value={3}>三星</Select.Option>
                            <Select.Option value={4}>四星</Select.Option>
                            <Select.Option value={5}>五星</Select.Option>
                        </Select>
                    </FormItem>
                </Grid.Col>
                <Grid.Col span={6}>
                    <FormItem label='角色名' style={{ marginRight: 10 }}>
                        <Input onChange={(val) => { setName(val) }}></Input>
                    </FormItem>
                </Grid.Col>
                <Grid.Col span={12} style={{ marginLeft: 10 }}>
                    <FormItem label={<Popover content={<div>参考B站UP主阿吉的视频攻略:<Link href="https://www.bilibili.com/video/BV1Es4y1T7tf">点此跳转</Link></div>}>只看RTA角色</Popover>} style={{ marginRight: 10 }}>
                        <Checkbox checked={ChakeyListFilter} onChange={setChakeyListFilter}></Checkbox>
                    </FormItem>
                </Grid.Col>
                {/* <Grid.Col span={2} style={{ marginLeft: 10 }}>
                    <Button type='primary' onClick={() => { setZero(!zero) }}>过滤</Button>
                </Grid.Col> */}
            </Grid.Row>
            <Grid.Row></Grid.Row>
        </Card>

        <Table
            style={{ margin: 10 }}
            data={tempHeroList}
            columns={columns}
        />
    </div>
}

export default HomeData;