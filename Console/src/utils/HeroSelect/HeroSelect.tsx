import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Image, Message, Select, Table } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { E7DataDomain } from '../const';
import { AttributeCodeIconFlex, HeroDetail, HeroListResult, InitializeHeroStaticDetail, JobCodeIconFlex } from "../../utils/const";
import { LoadHeroJSON } from "../api/help";
import HeroImageShow from "../HeroImageShow/HeroImageShow";

interface HeroSelectProps {
    HeroCode: string;
    OnChange?: (heroDetail: HeroDetail) => any;
    disabled?: boolean;
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
    return <Grid.Row>
        <Grid.Col span={18}>
            {props.disabled ===true ? <div style={{margin:7}}>
                {HeroListResult?.heroList.map((heroDetail: HeroDetail) => {
                    if (heroDetail.heroCode == props.HeroCode) {
                        return heroDetail.heroName
                    }
                })}
            </div> : <Select
                disabled={props.disabled}
                value={props.HeroCode}
                virtualListProps={{ height: 500 }}
                style={{ width: 200 }}
                onChange={(heroCode) => {
                    let res = FindHeroDetailInList(heroCode, HeroListResult?.heroList)
                    if (res == undefined) {
                        Message.error("找不到角色编码")
                        return
                    }
                    if (props.OnChange) {
                        props.OnChange(res)
                    }
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
            </Select>}
        </Grid.Col>
        <Grid.Col span={6}>
            {HeroListResult?.heroList.map((heroDetail,heroIndex) => {
                if (props.HeroCode == heroDetail.heroCode) {
                    return <HeroImageShow key={heroIndex} HeroDetail={heroDetail}></HeroImageShow>
                }
            })}
        </Grid.Col>
    </Grid.Row>
}