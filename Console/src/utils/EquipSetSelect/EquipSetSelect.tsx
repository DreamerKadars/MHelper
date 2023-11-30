import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link, Card, Space, Button, Result, Tag, Radio } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, E7DataDomain, SetList } from '../const';
import { ArtifactInfo, ArtifactListResult, ArtifactTemplateInfo, AttributeCode, AttributeCodeIconFlex, DefaultArtifactInfo, Equipment, HeroDetail, HeroListResult, InitEquipment, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../utils/const";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { LoadArtifactJSON, LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
import { PieChart } from "../PieChart/PieChart";
import { GenerateArtifactImageUrl, GenerateSetImageUrl } from "../helper";
import { IconMinusCircle } from "@arco-design/web-react/icon";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface EquipSetSelect {
    EquipSet: string;
    onChange: (val: string) => any;
}

export const EquipSetSelect = (props: EquipSetSelect) => {
    return <div>
        <span style={{ marginRight: 20 }}>装备套装</span>
        <Select
            value={props.EquipSet}
            onChange={props.onChange}
            virtualListProps={{ height: 1000 }}
            style={{ width: 70, }}
            renderFormat={(option, value) => {
                if (value === "") {
                    return <div></div>
                }
                return <Image preview={false} width={30} src={GenerateSetImageUrl(value + "")}></Image>
            }}
        >
            <Select.Option value={""}>空</Select.Option>
            {SetList.map((setTemp) => {
                return <Select.Option value={setTemp} key={ setTemp}>
                    <Image preview={false} width={30} src={GenerateSetImageUrl(setTemp)}></Image>
                </Select.Option>
            })}
        </Select>
    </div>
}

interface EquipSetMultiSelectProps {
    EquipSet: string[][];
    onChange: (val: string[][]) => any;
    noLabel?: boolean;
    style?: React.CSSProperties | undefined;
    disabled?: boolean;
}

export const EquipSetMultiSelect = (props: EquipSetMultiSelectProps) => {
    return <div>
        {props.noLabel !== true && <span style={{ marginRight: 20 }}>套装筛选</span>}
        {props.EquipSet?.map((equipSet, index) => {
            return <div key={index} style={{marginBottom:15}}>
                {equipSet.map((tempEquipSet: string, tempIndex: number) => {
                    return <Tag key={tempIndex} style={{ marginRight: 10 }} closable={!props.disabled} visible={true} onClose={() => {
                        let temp = props.EquipSet
                        temp[index] = temp[index].filter((_, index) => index !== tempIndex)
                        props.onChange(temp)
                    }}>
                        <Image preview={false} width={30} src={GenerateSetImageUrl(tempEquipSet + "")}></Image>
                    </Tag>
                })}
                {props.disabled?<></>:< Select
                    disabled={props.disabled}
                    value={""}
                    onChange={(newEquipSet) => {
                        let temp = props.EquipSet
                        temp[index].push(newEquipSet)
                        props.onChange(temp)
                    }
                    }
                    virtualListProps={{ height: 1000 }}
                    style={props.style !== undefined ? props.style : { width: 70, }}
                    renderFormat={(option, value) => {
                        if (value === "") {
                            return <div></div>
                        }
                        return <Image preview={false} width={30} src={GenerateSetImageUrl(value + "")}></Image>
                    }}
                    >
                    <Select.Option value={""} key={-1}>空</Select.Option>
                    {SetList.map((setTemp, setIndex) => {
                        return <Select.Option value={setTemp} key={setIndex}>
                            <Image preview={false} width={30} src={GenerateSetImageUrl(setTemp)}></Image>
                        </Select.Option>
                    })}
                </Select>
                }       
                {props.disabled?<></>:<IconMinusCircle onClick={() => { 
                    let temp = props.EquipSet
                    temp = temp.filter((_,oldIndex) => { 
                        if (index == oldIndex) {
                            return false
                        }
                        return true
                    })
                    props.onChange(temp)
                }} style={{ margin: 10 }} />}
            </div>
        })}
        
        {props.disabled ? <></> : <div>
            <Button
                disabled={props.disabled}
                onClick={() => {
                    let temp = props.EquipSet
                    if (temp === undefined || temp === null) {
                        temp = []
                    }
                    temp.push([])
                    props.onChange(temp)
                }}
                style={{ margin: 10 }}
            >
                添加套装配置
            </Button>
        </div>}
    </div>
}

interface EquipArtifactMultiSelectProps {
    Artifact: ArtifactTemplateInfo[];
    onChange: (newArtifact: ArtifactTemplateInfo[]) => any;
    style?: React.CSSProperties | undefined;
    disabled?: boolean;
    allArtifactInfoList: ArtifactListResult;
}

export const EquipArtifactMultiSelect = (props: EquipArtifactMultiSelectProps) => {
    let ArtifactCodeList: string[] = []
    let ArtifactCodeToLevelMap: Map<string,number> = new Map()
    props.Artifact?.map((info) => { 
        if (info.ArtifactCode !== undefined) { 
            ArtifactCodeList.push(info.ArtifactCode)
            if (info.Level !== undefined) {
                ArtifactCodeToLevelMap.set(info.ArtifactCode,info.Level)
            }
        }
    })
    const submit = () => { 
        let newArtifactTemplateInfoList: ArtifactTemplateInfo[] = []
        ArtifactCodeList.map((newArtifact: string) => {
            let newLevel = ArtifactCodeToLevelMap.get(newArtifact)
            if (newLevel === undefined) {
                newLevel = 15
            }
            newArtifactTemplateInfoList.push({
                ArtifactCode: newArtifact,
                Level: newLevel,
            })
        })
        props.onChange(newArtifactTemplateInfoList)
    }
    return <div>
        {props.disabled ? <div>
            {props.Artifact?.map((artifact: ArtifactTemplateInfo, index: number) => {
                let tempArtifactInfo = DefaultArtifactInfo()
                props.allArtifactInfoList?.artifactList.map((artifactTemp: ArtifactInfo, artifactIndex: number) => {
                    if (artifactTemp.artifactCode === artifact.ArtifactCode) {
                        tempArtifactInfo = artifactTemp
                    }
                })
                return <div key={index}>
                    {props.allArtifactInfoList?.artifactList.map((artifactTemp: ArtifactInfo, artifactIndex: number) => {
                        if (artifact.ArtifactCode === artifactTemp.artifactCode) { 
                            let ArtifactDetailByLevel = []
                            for (let i = 0; i <= 30;i+=3) { 
                                ArtifactDetailByLevel.push({
                                    Level: i,
                                    HP: ((tempArtifactInfo.abilityDefense * (30 - i) + tempArtifactInfo.enhanceAbilityDefense * i)/30).toFixed(2),
                                    ATK: ((tempArtifactInfo.abilityAttack * (30 - i) + tempArtifactInfo.enhanceAbilityAttack * i) / 30).toFixed(2),
                                })
                            }
                            return <Card
                                    hoverable
                                    style={{ width: 360, marginBottom: 20 }}
                                    >
                                        <Content>
                                    <Popover
                                        content={
                                            <div>
                                                <Descriptions
                                                    column={1}
                                                    title='神器信息'
                                                    data={[{
                                                        label: "初始生命",
                                                        value: tempArtifactInfo.abilityDefense,
                                                    },{
                                                        label: "初始攻击",
                                                        value: tempArtifactInfo.abilityAttack,
                                                    },{
                                                        label: "满级生命",
                                                        value: tempArtifactInfo.enhanceAbilityDefense,
                                                    },{
                                                        label: "满级攻击",
                                                        value: tempArtifactInfo.enhanceAbilityAttack,
                                                    },
                                                    ]}
                                                    style={{ marginBottom: 20 }}
                                                    labelStyle={{ paddingRight: 36 }}
                                                />
                                                <Popover content={<div>
                                                    <Table
                                                        data={ArtifactDetailByLevel}
                                                        columns={[
                                                            {
                                                                title: "等级",
                                                                dataIndex: "Level"
                                                            }, {
                                                                title: "血量",
                                                                dataIndex: "HP"
                                                            }, {
                                                                title: "攻击",
                                                                dataIndex: "ATK"
                                                            }
                                                        ]}
                                                        pagination={false}
                                                    />
                                                </div>}><Link>详细血防</Link></Popover>
                                            </div>
                                        }
                                    >
                                        <Image preview={false} width={50} src={GenerateArtifactImageUrl(artifact.ArtifactCode + "")}></Image>{artifactTemp.artifactName}
                                        <span style={{fontWeight:"bold",color:"red"}}>{ArtifactCodeToLevelMap.get(artifact.ArtifactCode) !== undefined ?
                                            "+" + ArtifactCodeToLevelMap.get(artifact.ArtifactCode) :""
                                        }</span>
                                    </Popover>
                                </Content>
                            </Card>
                        }
                    })}
                </div>
            })}
        </div>
            :
            <Select
                disabled={props.disabled}
                value={ArtifactCodeList}
                onChange={(newArtifactList: string[]) => { 
                    ArtifactCodeList = newArtifactList
                    submit()
                }}
                virtualListProps={{ height: 500 }}
                style={props.style !== undefined ? props.style : { width: 370, }}
                mode='multiple'
                renderFormat={(option, value) => {
                    if (value === "") {
                        return <div></div>

                    }
                    let tempArtifactInfo = DefaultArtifactInfo()
                    props.allArtifactInfoList?.artifactList.map((artifactTemp: ArtifactInfo, artifactIndex: number) => {
                        if (artifactTemp.artifactCode === option?.extra?.artifactCode) {
                            tempArtifactInfo = artifactTemp
                        }
                    })
                    let ArtifactDetailByLevel = []
                    for (let i = 0; i <= 30; i += 3) {
                        ArtifactDetailByLevel.push({
                            Level: i,
                            HP: ((tempArtifactInfo.abilityDefense * (30 - i) + tempArtifactInfo.enhanceAbilityDefense * i) / 30).toFixed(2),
                            ATK: ((tempArtifactInfo.abilityAttack * (30 - i) + tempArtifactInfo.enhanceAbilityAttack * i) / 30).toFixed(2),
                        })
                    }
                    return <div>
                        <Popover content={<div style={{width:200}}>
                            <Descriptions
                                column={1}
                                title='神器信息'
                                data={[{
                                    label: "初始生命",
                                    value: tempArtifactInfo.abilityDefense,
                                },{
                                    label: "初始攻击",
                                    value: tempArtifactInfo.abilityAttack,
                                },{
                                    label: "满级生命",
                                    value: tempArtifactInfo.enhanceAbilityDefense,
                                },{
                                    label: "满级攻击",
                                    value: tempArtifactInfo.enhanceAbilityAttack,
                                },]}
                                style={{ marginBottom: 20 }}
                                labelStyle={{ paddingRight: 36 }}
                            />
                            <Popover content={<div>
                                <Table
                                    data={ArtifactDetailByLevel}
                                    columns={[
                                        {
                                            title: "等级",
                                            dataIndex: "Level"
                                        }, {
                                            title: "血量",
                                            dataIndex: "HP"
                                        }, {
                                            title: "攻击",
                                            dataIndex: "ATK"
                                        }
                                    ]}
                                    pagination={ false}
                                />
                            </div>}><Link>详细血防</Link></Popover>
                            <Radio.Group
                                onChange={(newValue:number) => { 
                                    ArtifactCodeToLevelMap.set(tempArtifactInfo.artifactCode, newValue)
                                    submit()
                                }}
                                value={ArtifactCodeToLevelMap.get(tempArtifactInfo.artifactCode) === undefined ? 15 : ArtifactCodeToLevelMap.get(tempArtifactInfo.artifactCode)}
                                options={[15, 18, 21, 24, 27, 30]}
                                style={{ marginBottom: 20 }} />
                        </div>}>
                            <Image preview={false} width={30} src={GenerateArtifactImageUrl(value + "")}></Image>{option?.extra?.artifactName}
                            <span style={{ fontWeight: "bold", color: "red" }}>{ArtifactCodeToLevelMap.get(value as string) !== undefined ?
                                "+" + ArtifactCodeToLevelMap.get(value as string) : ""
                            }</span>
                        </Popover>
                    </div>
                }}
                filterOption={(inputValue, option) => {
                    return option?.props?.extra?.artifactName?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
                        option?.props?.extra?.artifactName?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                    }
                }
            >
                <Select.Option value={""}>空</Select.Option>
                {props.allArtifactInfoList?.artifactList.map((artifactTemp: ArtifactInfo,artifactIndex:number) => {
                    return <Select.Option value={artifactTemp.artifactCode} key={artifactTemp.artifactName} extra={artifactTemp}>
                        <Image preview={false} width={70} src={GenerateArtifactImageUrl(artifactTemp.artifactCode)}></Image>{artifactTemp.artifactName}
                        <span style={{ fontWeight: "bold", color: "red" }}>{ArtifactCodeToLevelMap.get(artifactTemp.artifactCode) !== undefined ?
                            "+" + ArtifactCodeToLevelMap.get(artifactTemp.artifactCode) : ""
                        }</span>
                    </Select.Option>
                })}
            </Select>
        }
    </div>
}