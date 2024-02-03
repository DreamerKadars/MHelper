import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Descriptions, Form, Modal, Popover, Table, Image, Input, InputNumber, Checkbox, Select, Link, Card, Space, Button, Radio, Collapse } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, ChartOptions } from "chart.js";
import { ChakeyList, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRangeMap, ClassRr, ClassSpeed, ClassSuffixPercent, ConvertHeroListResultToMap, E7DataDomain, EquipLocCNRange, EquipLocNecklace, EquipLocRange, EquipLocRing, EquipLocShoes, GetDefaultEquipImage, HeroDetailBackEnd, HeroTemplate, MainNecklaceRange, SetList } from '../const';
import { AttributeCode, AttributeCodeIconFlex, Equipment, HeroDetail, HeroListResult, InitEquipment, InitializeHeroStaticDetail, JobCode, JobCodeIconFlex } from "../../utils/const";
import HeroImageShow from "../HeroImageShow/HeroImageShow";
import { HandlerAxiosErrPrefix, ListHeroDetail, LoadHeroJSON } from "../api/help";
import { HeroDetailStatisticShow } from "../StatisticShow/StatisticShow";
import { PieChart } from "../PieChart/PieChart";
import { GenerateSetImageUrl } from "../helper";
import { EquipSetSelect } from "../EquipSetSelect/EquipSetSelect";
import { EquipmentMainSelect } from "../../pages/Admin/HeroTemplate/HeroForm/HeroFrom";
import { HeroTemplateForEquipSearchTable } from "./HeroTemplateForEquipSearchTable/HeroTemplateForEquipSearchTable";
import { CalculateEquipValidSubNumByHeroTemplate, CalculateHeroTemplateByEquip } from "../HeroTemplateHelper/HeroTemplateHelper";
import { HeroTemplateList } from "../api/heroTemplate";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface ValidSubValueAnalyseProps {
    equip?: Equipment;
    HeroTemplateList: HeroTemplate[];
}

export const ValidSubValueAnalyse = (props: ValidSubValueAnalyseProps) => {
    const [heroJson,] = LoadHeroJSON()
    const [ListHeroDetailResult] = ListHeroDetail()
    let HeroDetailMap = new Map<string, HeroDetailBackEnd>()
    ListHeroDetailResult?.data?.Data?.map((item: HeroDetailBackEnd) => {
        HeroDetailMap.set(item.code!, item)
    })

    let HeroListResult: HeroListResult = heroJson.data

    const HeroListMap = ConvertHeroListResultToMap(HeroListResult)

    if (props.equip === undefined) {
        return <></>
    }
    let res = CalculateEquipValidSubNumByHeroTemplate({
        templateList: props.HeroTemplateList,
        HeroDetailMap: HeroDetailMap,
        equip: props.equip,
        setFilter: props.equip.Set,
    })

    

    return <>
        <Descriptions
            column={1}
            // title='有效词条'
            data={[{
                label: "两条有效词条",
                value: res.TwoValid.Num,
            }, {
                label: "三条有效词条",
                value: res.ThreeValid.Num,
            }, {
                label: "四条有效词条",
                value: res.FourValid.Num,
            }]}
            labelStyle={{ paddingRight: 36 }}
        />
    </>
}
