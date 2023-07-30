import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar  } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ClassRangeMap, E7DataDomain } from '../const';
import { AttributeCodeIconFlex, HeroDetail, JobCodeIconFlex } from "../../pages/type";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const generateColors = (numColors: number) => {
    const colors = [];
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();

    for (let i = 0; i < numColors; i++) {
        hue += goldenRatio;
        hue %= 1;
        const color = `hsl(${Math.floor(hue * 360)}, 70%, 50%)`;
        colors.push(color);
    }

    return colors;
};

interface StatisticShowProps {
    Type: string;
    StatisticAverage: number;
    StatisticLevel: number;
}

const colors = [
    'gray',
    'gray',
    'green',
    'green',
    'blue',
    'blue',
    'purple',
    'purple',
    'orange',
    'red',
];

export const StatisticShow = (props: StatisticShowProps) => {
    let numberRange = ClassRangeMap.get(props.Type)
    if (numberRange === undefined) { 
        return <div></div>
    }
    let tempRange: number[] = numberRange
    let level = props.StatisticLevel
    let averageNum = props.StatisticAverage
    return <div ><Popover content={"范围是[" + tempRange[0] + "," + tempRange[1] + "],落在第" + level + "区间内"}> <span style={{ color: colors[level-1], fontWeight: "bold" }}>{averageNum.toFixed(2)}</span></Popover></div>
}

interface HeroDetailStatisticShowProps {
    Hero: HeroDetail
    visible: boolean
    onCancel: () => void
}

function convertToNumberArray(str: string) {
    const result = new Array<number>(10).fill(0);
    if (str === "") { 
        return result
    }
    const numbers = str.split(',').map(Number);
    for (let i = 0; i < numbers.length && i < 10; i++) {
        const num = numbers[i];
        if (!isNaN(num)) {
            result[i] = num;
        }
    }
    return result;
}

const AtkLabels = ['1400', '1800', '2200', '2600', '3000', '3400', '3800', '4200', '4600', '5000']
const DefendLabels = ['880', '1040', '1200', '1360', '1520', '1680', '1840', '2000', '2160', '2320']
const HpLabels = ['9800', '11400', '13000', '14600', '16200', '17800', '19400', '21000', '22600', '24200']
const SpeedLabels = ['118', '134', '150', '166', '182', '198', '214', '230', '246', '262']
const CCLabels = ['19.25', '27.75', '36.25', '44.75', '53.25', '61.75', '70.25', '78.75', '87.25', '95.75']
const CDLabels = ['160', '180', '200', '220', '240', '260', '280', '300', '320', '340']
const HRLabels = ['9', '27', '45', '63', '81', '99', '117', '135', '153', '171']
const RRLabels = ['11.25', '33.75', '56.25', '78.75', '101.25', '123.75', '146.25', '168.75', '191.25', '213.75']

export const HeroDetailStatisticShow = (props: HeroDetailStatisticShowProps) => { 
    const dataRadar = {
        labels: ['攻击', '防御', '生命', '速度', '暴击率', '暴击伤害', '效果命中', '效果抵抗'],
        datasets: [
            {
                label:"平均属性雷达图", 
                data: [props.Hero.heroDetail.attackLevel,
                    props.Hero.heroDetail.defenseLevel,
                    props.Hero.heroDetail.vitalityLevel,
                    props.Hero.heroDetail.speedLevel,
                    props.Hero.heroDetail.criticalLevel,
                    props.Hero.heroDetail.criticalHitLevel,
                    props.Hero.heroDetail.effectiveLevel,
                    props.Hero.heroDetail.effectResistanceLevel],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                fill:true,
            },
        ],
    };
    
    const dataATK = {
        labels: AtkLabels,
        datasets: [
            {
                label: '攻击力分布',
                data: convertToNumberArray(props.Hero.heroDetail.attackStats),
                backgroundColor: 'rgba(75,192,192,0.6)', // 柱形图颜色
            },
        ],
    };
    
    let dataAll = []
    dataAll.push({ labels: AtkLabels, datasets: [{ label: '攻击力分布', data: convertToNumberArray(props.Hero.heroDetail.attackStats), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: DefendLabels, datasets: [{ label: '防御力分布', data: convertToNumberArray(props.Hero.heroDetail.defenseStats), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: HpLabels, datasets: [{ label: '生命值分布', data: convertToNumberArray(props.Hero.heroDetail.vitalityStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: SpeedLabels, datasets: [{ label: '速度分布', data: convertToNumberArray(props.Hero.heroDetail.speedStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: CCLabels, datasets: [{ label: '暴击率分布', data: convertToNumberArray(props.Hero.heroDetail.criticalStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: CDLabels, datasets: [{ label: '暴击伤害分布', data: convertToNumberArray(props.Hero.heroDetail.criticalHitStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: HRLabels, datasets: [{ label: '效果命中分布', data: convertToNumberArray(props.Hero.heroDetail.effectiveStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })
    dataAll.push({ labels: RRLabels, datasets: [{ label: '效果抗性分布', data: convertToNumberArray(props.Hero.heroDetail.effectResistanceStatistics), backgroundColor: 'rgba(75,192,192,0.6)', },], })

    let options = {
        scales: {
            x: {
                grid: {
                    offset: false
                }
            }
        }
    }
    const dataDescriptions = [
        {
            label: '平均攻击力',
            value: props.Hero.heroDetail.attackAverage,
        },
        {
            label: '平均防御力',
            value: props.Hero.heroDetail.defenseAverage,
        },
        {
            label: '平均生命值',
            value: props.Hero.heroDetail.vitalityAverage,
        },
        {
            label: '平均速度',
            value: props.Hero.heroDetail.speedAverage,
        },
        {
            label: '平均暴击率',
            value: props.Hero.heroDetail.criticalAverage,
        },
        {
            label: '平均暴击伤害',
            value: props.Hero.heroDetail.criticalHitAverage,
        },
        {
            label: '平均效果命中',
            value: props.Hero.heroDetail.effectiveAverage,
        },
        {
            label: '平均效果抗性',
            value: props.Hero.heroDetail.effectResistanceAverage,
        },
    ];

    return <Modal style={{width:1600}} visible={props.visible} onCancel={props.onCancel} onConfirm={() => { props.onCancel() }} onOk={() => { props.onCancel() }}>
        <Grid.Row>
            <Grid.Col span={3}>
                <HeroImageShow HeroDetail={props.Hero}></HeroImageShow>
            </Grid.Col>
            <Grid.Col span={13}>
                <Descriptions
                    column={2}
                    colon=":"
                    title='角色数据'
                    data={dataDescriptions}
                    labelStyle={{ paddingRight: 36 }}
                />
            </Grid.Col>
            <Grid.Col span={8} style={{}}>
                <Radar data={dataRadar} />
            </Grid.Col>
        </Grid.Row>
        <Grid.Row>
            {dataAll.map((data, index) => {
                return <Grid.Col key={index} span={6}>
                    <div style={{ width: '800px' }}>
                        <Bar data={data} options={options} />
                    </div>
                </Grid.Col>
        })}
        </Grid.Row>
        
    </Modal>
}