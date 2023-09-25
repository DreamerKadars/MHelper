import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link, Card, Space, Button, Result } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, E7DataDomain, SetList } from '../const';
import { ArtifactInfo, ArtifactListResult, AttributeCode, AttributeCodeIconFlex, Equipment, HeroDetail, HeroListResult, InitEquipment, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../pages/type";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { LoadArtifactJSON, LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
import { PieChart } from "../PieChart/PieChart";
import { GenerateArtifactImageUrl, GenerateSetImageUrl } from "../helper";
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
        <span style={{ marginRight: 20 }}>套装筛选</span>
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
                return <Select.Option value={setTemp}>
                    <Image preview={false} width={30} src={GenerateSetImageUrl(setTemp)}></Image>
                </Select.Option>
            })}
        </Select>
    </div>
} 

interface EquipSetMultiSelectProps {
    EquipSet: string[];
    onChange: (val: string[]) => any;
    noLabel?: boolean;
    style?: React.CSSProperties | undefined;
}

export const EquipSetMultiSelect = (props: EquipSetMultiSelectProps) => {
    return <div>
        {props.noLabel !== true && <span style={{ marginRight: 20 }}>套装筛选</span>}
        <Select
            value={props.EquipSet}
            onChange={props.onChange}
            virtualListProps={{ height: 1000 }}
            style={props.style!==undefined?props.style : { width: 70, }}
            mode='multiple'
            renderFormat={(option, value) => {
                if (value === "") {
                    return <div></div>
                }
                return <Image preview={false} width={30} src={GenerateSetImageUrl(value + "")}></Image>
            }}
        >
            <Select.Option value={""}>空</Select.Option>
            {SetList.map((setTemp) => {
                return <Select.Option value={setTemp}>
                    <Image preview={false} width={30} src={GenerateSetImageUrl(setTemp)}></Image>
                </Select.Option>
            })}
        </Select>
    </div>
} 

interface EquipArtifactMultiSelectProps {
    Artifact : string[];
    onChange: (val: string[]) => any;
    style?: React.CSSProperties | undefined;
}

export const EquipArtifactMultiSelect = (props: EquipArtifactMultiSelectProps) => {
    const [{ data, loading, error }, refetch] = LoadArtifactJSON()
    let artifactInfo:ArtifactListResult = data

    return <div>
        <Select
            value={props.Artifact}
            onChange={props.onChange}
            virtualListProps={{ height: 500 }}
            style={props.style !== undefined ? props.style : { width: 370, }}
            mode='multiple'
            renderFormat={(option, value) => {
                if (value === "") {
                    return <div></div>
                }
                
                console.log()
                return <div><Image preview={false} width={30} src={GenerateArtifactImageUrl(value + "")}></Image>{option?.extra?.artifactName}</div>
            }}
            filterOption={(inputValue, option) => {
                return option?.props?.extra?.artifactName?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
                    option?.props?.extra?.artifactName?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0   
            }
            }
        >
            <Select.Option value={""}>空</Select.Option>
            {artifactInfo?.artifactList.map((artifactTemp:ArtifactInfo) => {
                return <Select.Option value={artifactTemp.artifactCode} key={artifactTemp.artifactName} extra={artifactTemp}>
                    <Image preview={false} width={70} src={GenerateArtifactImageUrl(artifactTemp.artifactCode)}></Image>{artifactTemp.artifactName}
                </Select.Option>
            })}
        </Select>
    </div>
 }