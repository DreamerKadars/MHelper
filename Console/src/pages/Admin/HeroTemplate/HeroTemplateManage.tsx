import { Button, Card, Form, Grid, Image, Input, Link, Message, Modal, Select, Space, Table, TableColumnProps } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { ConvertHeroListResultToMap, GetHeroDetailFromMap, HeroDetail, HeroListResult, HeroTemplate } from '../../../utils/const';

import { IconEdit, IconDelete } from '@arco-design/web-react/icon';
import { HandlerAxiosErrPrefix, HandlerAxiosSuccessPrefix, LoadHeroJSON } from '../../../utils/api/help';
import { GenerateSetImageUrl, GetHeroDetailFromListByHeroCode, SkipToUrl } from '../../../utils/helper';
import { PathHeroTemplateAnalyse, PathHeroTemplateCreate, PathHeroTemplateUpdate } from '../../../const';
import { HeroTemplateDelete, HeroTemplateList, HeroTemplateUpdate } from '../../../utils/api/heroTemplate';
import HeroImageShow from '../../../utils/HeroImageShow/HeroImageShow';
import { HeroSelect } from '../../../utils/HeroSelect/HeroSelect';
import { RangeShow } from "../../../utils/StatisticShow/StatisticShow";
import { AttributeCode, ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassHr, ClassRr, ClassSpeed, JobCode } from '../../../utils/const';
import { useLocation, useNavigate } from 'react-router-dom';
const { Row, Col } = Grid;

interface HeroTemplateManageProps {
    isPublic: boolean
    // role: string
}
    
export default function HeroTemplateManage(props:HeroTemplateManageProps) {
    let defaultHeroTemplateList: HeroTemplate[] = []
    let defaultHeroTemplateDelete: HeroTemplate = {}
    const [fresh, setFresh] = useState(false)
    const [heroTemplateList, setHeroTemplateList] = useState(defaultHeroTemplateList)
    const [heroJson,] = LoadHeroJSON()
    let HeroListResult: HeroListResult = heroJson.data
    
    const HeroListMap = ConvertHeroListResultToMap(HeroListResult)

    const [ReadFlag, setReadFlag] = useState(false)
    const [FlagDelete, setFlagDelete] = useState(false)
    const [attributeCode, setAttributeCode] = useState<string[]>([])
    const [jobCode, setJobCode] = useState<string[]>([])
    const [starCode, setStarCode] = useState<number[]>([])
    const [name, setName] = useState("")

    const [{ }, funcHeroTemplateList] = HeroTemplateList(false)
    const [{ }, heroTemplateDelete] = HeroTemplateDelete()

    const location = useLocation();
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        funcHeroTemplateList().then((resp) => {
            setHeroTemplateList(resp.data.Data)
        }).catch((error) => {
            HandlerAxiosErrPrefix("读取角色模板", error)
        })
    }, [fresh])
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        let page = searchParams.get('page');
        if (page == null) {
            page = "1"
        }
        setPageNum(Number(page))
    }, [location]);

    const handlePageChange = (page: string) => {
        
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        navigate({
            search: searchParams.toString(),
        });
    };

    let heroTemplateListAfterFilter = heroTemplateList.filter((info:HeroTemplate) => { 
        let item = GetHeroDetailFromMap(info.HeroCode !== undefined ? info.HeroCode : "", HeroListMap)
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
        return true
    })

    const columns: TableColumnProps[] = [
        {
            title: '模板名称',
            render(col, item: HeroTemplate, index) {
                return <span style={{fontSize:12}} key={col+"-"+index}>{item.HeroTemplateName}</span>
            },
        },
        {
            title: '使用角色',
            render(col, item: HeroTemplate, index) {
                let tempHeroDetail = GetHeroDetailFromListByHeroCode(item.HeroCode!, HeroListResult?.heroList)
                if (tempHeroDetail) {
                    return <HeroImageShow key={col+"-"+index} ImageSizeParm={0.6} HeroDetail={tempHeroDetail} />
                } else {
                    return <div key={col+"-"+index}></div>
                }
            },
        },
        {
            title: '有效均分',
            render(col, item: HeroTemplate, index) {
                return item.AverageGrade
            },
        },
        {
            title: '套装',
            render(col, item: HeroTemplate, index) {
                let allSet: string[] = []
                let setAllTemp: string[] = []
                item.Set?.map((setString: string[]) => {
                    setString.map((set: string) => {
                        setAllTemp.push(set)
                    })
                })
                setAllTemp.map((set) => {
                    if (!allSet.includes(set) && set !== "") {
                        allSet.push(set)
                    }
                })
                return <Space key={index} direction='vertical'><Image.PreviewGroup infinite>{allSet.map((setTemp, index) => {
                    return <Space><Image width={30} style={{ display: "inline-block" }} key={index} src={GenerateSetImageUrl(setTemp)}></Image></Space>
                })}</Image.PreviewGroup></Space>
            },
        },
        {
            title: '生命',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassHp} RangeData={item?.HeroPanel?.HP}></RangeShow>
            },
        },
        {
            title: '攻击',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassAtk} RangeData={item?.HeroPanel?.ATK}></RangeShow>
            },
        },
        {
            title: '防御',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassDefend} RangeData={item?.HeroPanel?.DF}></RangeShow>
            },
        },
        {
            title: '速度',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassSpeed} RangeData={item?.HeroPanel?.SP}></RangeShow>
            },
        },
        {
            title: '暴率',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassCC} RangeData={item?.HeroPanel?.CC}></RangeShow>
            },
        },
        {
            title: '暴伤',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassCD} RangeData={item?.HeroPanel?.CD}></RangeShow>
            },
        },
        {
            title: '命中',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassHr} RangeData={item?.HeroPanel?.HR}></RangeShow>
            },
        },
        {
            title: '抗性',
            render(col, item: HeroTemplate, index) {
                return <RangeShow key={col+"-"+index} Type={ClassRr} RangeData={item?.HeroPanel?.RR}></RangeShow>
            },
        },
        {
            title: '操作',
            render(col, item: HeroTemplate, index) {
                return <div key={col + "-" + index}>
                    
                    <Link onClick={() => {
                        SkipToUrl(PathHeroTemplateAnalyse + "/" + item.ID)
                    }}>分析</Link>
                    {props.isPublic!== true && <Link onClick={() => {
                        SkipToUrl(PathHeroTemplateUpdate + "/" + item.ID)
                    }}>编辑</Link>}
                    {props.isPublic !== true && <Link onClick={() => {
                        Modal.confirm({
                            onOk: () => {
                                heroTemplateDelete({ params: { ID: item.ID } }).then((response) => {
                                    HandlerAxiosSuccessPrefix("删除角色模板", response)
                                    setFresh(!fresh)
                                }).catch((error) => {
                                    HandlerAxiosErrPrefix("删除角色模板", error)
                                })
                            },
                            title: "删除确认",
                            content: <div>
                                是否确认删除模板[{item.HeroTemplateName}]
                            </div>,
                        })
                    }}
                    >删除</Link>}
                </div>
            },
        },
    ];
    return (
        <div>
            {props.isPublic !== true ? <Button type={"primary"} style={{ margin: 30 }} onClick={() => {
                SkipToUrl(PathHeroTemplateCreate)
            }}>创建角色模板</Button> : <></>}
            <Card
                style={{ marginBottom: 10 }}
            >
                <Grid.Row>
                    <Grid.Col span={5} style={{ marginRight: 10 }}>
                        <Form.Item label='属性' >
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
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={5} style={{ marginRight: 10 }}>
                        <Form.Item label='职业' >
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
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={5} style={{ marginRight: 10 }}>
                        <Form.Item label='星级' style={{ marginRight: 10 }}>
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
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Form.Item label='角色名' style={{ marginRight: 10 }}>
                            <Input onChange={(val) => { setName(val) }}></Input>
                        </Form.Item>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row></Grid.Row>
            </Card>
            <Table
                data={heroTemplateListAfterFilter}
                columns={columns}
                onChange={(pagination) => {
                    if (pagination.current !== undefined) {
                        handlePageChange(pagination.current.toString())
                    }
                }}
                pagination={{
                    current: pageNum,
                    // total:,
                }}
            />
        </div>
    );
}