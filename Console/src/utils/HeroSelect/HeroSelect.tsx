import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Image, Message, Select, Table } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { E7DataDomain } from '../const';
import { AttributeCodeIconFlex, HeroDetail, HeroListResult, InitializeHeroStaticDetail, JobCodeIconFlex } from "../../pages/type";
import { LoadHeroJSON } from "../api/help";
import HeroImageShow from "../HeroImageShow/HeroImageShow";

interface HeroSelectProps {
    HeroCode: string;
    OnChange: (heroDetail: HeroDetail) => any
}

export const HeroSelect = (props: HeroSelectProps) => {
    const [{ data, loading, error }, refetch] = LoadHeroJSON()
    const [searchKey, setSearchKey] = useState("")
    const [fresh,setFresh] = useState(false)
    let HeroListResult: HeroListResult = data
    const FindHeroDetailInList = (HeroCode: string, heroList: HeroDetail[]) => {
        let result: HeroDetail
        for (let i = 0; i < heroList.length; i++) {
            if (HeroCode == heroList[i].heroCode) {
                return heroList[i]
            }
        }
    }
    console.log(HeroListResult)
    return <Grid.Row>
        <Grid.Col span={18}>
            <Select
                virtualListProps={{height:500}}
                style={{ width: 200 }}
                onChange={(heroCode) => {
                    console.log(heroCode)
                    let res = FindHeroDetailInList(heroCode, HeroListResult?.heroList)
                    if (res == undefined) {
                        Message.error("找不到角色编码")
                        return
                    }
                    console.log(res)
                    props.OnChange(res)
                    // setFresh(!fresh)
                }}
                renderFormat={(option, value) => {
                    return <div>{option?._key}</div>
                }}
                showSearch
                filterOption={(inputValue, option) => {
                    let str: string = option.key?.toString() !== undefined ? option.key?.toString() : ""
                    return str.indexOf(inputValue.toLowerCase()) >= 0
                }
                }
            >
                {HeroListResult?.heroList.filter((heroDetail: HeroDetail) => {
                    if (!heroDetail.heroCode.includes(searchKey)) {
                        return false
                    }
                    return true
                }).map((heroDetail: HeroDetail) => {
                    return <Select.Option
                        value={heroDetail.heroCode}
                        key={heroDetail.heroName}
                    // style={{height:200}}
                    >
                        <HeroImageShow ImageSizeParm={0.6} HeroDetail={heroDetail}></HeroImageShow>
                    </Select.Option>
                })}
            </Select>
        </Grid.Col>
        <Grid.Col span={6}>
            {HeroListResult?.heroList.map((heroDetail) => {
                if (props.HeroCode == heroDetail.heroCode) {
                    return <HeroImageShow HeroDetail={heroDetail}></HeroImageShow>
                }
            })}
        </Grid.Col>
    </Grid.Row>
}