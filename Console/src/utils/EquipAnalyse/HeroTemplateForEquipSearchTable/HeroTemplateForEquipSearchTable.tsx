import { useEffect, useState } from "react";
import { HandlerAxiosErrPrefix, ListHeroDetail, LoadHeroJSON } from "../../api/help";
import { ConvertHeroListResultToMap, EquipLocNecklace, EquipLocRing, EquipLocShoes, Equipment, HeroDetailBackEnd, HeroListResult, HeroTemplate } from "../../const";
import { HeroTemplateList } from "../../api/heroTemplate";
import { Image, Link, Popover, Space, Table, TableColumnProps } from "@arco-design/web-react";
import { GenerateSetImageUrl, GetHeroDetailFromListByHeroCode, SkipToUrl } from "../../helper";
import HeroImageShow from "../../HeroImageShow/HeroImageShow";
import { PathHeroTemplateAnalyse } from "../../../const";
import { CalculateHeroTemplateByEquip, HeroTemplateByEquipRes, HeroTemplateNeedShow } from "../../HeroTemplateHelper/HeroTemplateHelper";
import { template } from "@babel/core";
import { IconExclamationCircle } from "@arco-design/web-react/icon";

interface HeroTemplateForEquipSearchTableProps {
    equip?: Equipment;
    nameFilter?: string;
    transform?: boolean;
    setFilter?: string;
    HeroTemplateList: HeroTemplate[];
}

interface HeroTemplateNeed { 
    HpNeed: number;
    AtkNeed: number;
    DefendNeed: number;
    SpeedNeed: number;
    CCNeed: number;
    CDNeed: number;
    HRNeed: number;
    RRNeed: number;
}

export function GetHeroTemplateNeed(template: HeroTemplate) {
    let res: HeroTemplateNeed = {
        HpNeed: 0,
        AtkNeed: 0,
        DefendNeed: 0,
        SpeedNeed: 0,
        CCNeed: 0,
        CDNeed: 0,
        HRNeed: 0,
        RRNeed: 0,
    }
    
    return res
}

interface HeroTemplateForEquipSearchTableUnit { 
    template: HeroTemplate;
    res: HeroTemplateByEquipRes;
}

// props.equip.MainValue
export const HeroTemplateForEquipSearchTable = (props: HeroTemplateForEquipSearchTableProps) => {
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

    let res = CalculateHeroTemplateByEquip({
        templateList: props.HeroTemplateList,
        HeroDetailMap: HeroDetailMap,
        equip: props.equip,
        transform: props.transform,
    })

    if (res?.length != props.HeroTemplateList.length) { 
        return <></>
    }

    let dataTable: HeroTemplateForEquipSearchTableUnit[] = []
    for (let i = 0; i < props.HeroTemplateList.length; i++){
        dataTable.push({
            template: props.HeroTemplateList[i],
            res: res[i],
        })
    }

    dataTable = dataTable.filter((item) => {
        if (props.nameFilter !== undefined && props.nameFilter !== "" && item.template.HeroCode !== undefined) { 
            let heroInfo = HeroListMap.get(item.template.HeroCode)
            
            if (heroInfo !== undefined) {
                if (heroInfo.heroName.includes(props.nameFilter)) {
                    
                } else { 
                    return false
                }
            } else { 
                return false
            }
        }

        if (props.setFilter !== undefined && props.setFilter !== "") { 
            let flagSet = false
            item.template.Set?.map((setString: string[]) => {
                setString.map((set: string) => {
                    if (set == props.setFilter) { 
                        flagSet=true
                    }
                })
            })
            if (!flagSet) { 
                return false
            }
        }

        if (props.equip?.EquipLoc !== undefined && props.equip?.EquipLoc !== "") { 
            let mainTypeFilterRange: string[] = []
            switch (props.equip?.EquipLoc) {
                case EquipLocNecklace:
                    if (item.template.MainNecklace !== undefined) {
                        mainTypeFilterRange = item.template.MainNecklace
                    }
                    break
                case EquipLocRing:
                    if (item.template.MainRing !== undefined) {
                        mainTypeFilterRange = item.template.MainRing
                    }
                    break
                case EquipLocShoes:
                    if (item.template.MainShoes !== undefined) {
                        mainTypeFilterRange = item.template.MainShoes
                    }
                    break
            }

            if (mainTypeFilterRange.length !== 0) {
                let mainTypeFilterFlag = false
                mainTypeFilterRange.map((tempMainType) => {
                    if (tempMainType === props.equip?.MainType) {
                        mainTypeFilterFlag = true
                    }
                })
                if (!mainTypeFilterFlag) {
                    return false
                }
            }
        }
        
        return true
    })


    let columns: TableColumnProps[] = [
        {
            title: '使用角色', 
            width: 40,
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                let tempHeroDetail = GetHeroDetailFromListByHeroCode(item.template.HeroCode!, HeroListResult?.heroList)
                if (tempHeroDetail) {
                    return <HeroImageShow key={col + "-" + index} ImageSizeParm={0.6} HeroDetail={tempHeroDetail} />
                } else {
                    return <div key={col + "-" + index}></div>
                }
            },
        },
        {
            title: '配装名称',
            width: 100,
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                return <span style={{fontSize:10}} key={col + "-" + index}>{item.template.HeroTemplateName}</span>
            },
        },
        {
            title: '分数需求',
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                return <HeroTemplateNeedShow template={item.template} key={col + "-" + index} result={item.res} />
            },
        },
        {
            title: '套装',
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                
                let allSet: string[] = []
                let setAllTemp:string[] = []
                item.template.Set?.map((setString: string[]) => {
                    setString.map((set:string) => { 
                        setAllTemp.push(set)
                    })
                })
                setAllTemp.map((set) => {
                    if (!allSet.includes(set) && set !== "") {
                        allSet.push(set)
                    }
                })
                return <Space key={col + "-" + index} direction='vertical'><Image.PreviewGroup infinite>{allSet.map((setTemp, index) => {
                    return <Space><Image width={30} style={{ display: "inline-block" }} key={index} src={GenerateSetImageUrl(setTemp)}></Image></Space>
                })}</Image.PreviewGroup></Space>
            },
        },
        {
            title: '利用率',
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                return <div key={col + "-" + index}>
                    {item.res.grade}
                    {(item.res.transformHelp !== undefined && item.res.transformHelp !== "") ? "(" + item.res.transformHelp + ")" : ""}
                    {(item.res.unnecessaryGrade !== undefined && item.res.unnecessaryGrade > 8) ? <Popover content={<div>浪费分数:{item.res.unnecessaryGrade}</div> }><IconExclamationCircle style={{ color: "red" }} /> </Popover> : ""}
                </div>
            },
            sortDirections: ['descend'],
            defaultSortOrder: 'descend',
            sorter: (a: HeroTemplateForEquipSearchTableUnit, b: HeroTemplateForEquipSearchTableUnit) => a.res.grade - b.res.grade,
        },
        {
            title: '操作',
            render(col, item: HeroTemplateForEquipSearchTableUnit, index) {
                return <div key={col + "-" + index}>
                    <Link onClick={() => {
                        SkipToUrl(PathHeroTemplateAnalyse + "/" + item.template.ID)
                    }}>分析</Link>
                </div>
            }
        },
    ]

    return <>
        <Table
            data={dataTable}
            columns={columns}
        />
    </>
}