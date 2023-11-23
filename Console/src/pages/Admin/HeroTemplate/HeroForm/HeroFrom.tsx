import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Form,
    Input,
    Select,
    Button,
    Message,
    InputNumber,
    InputTag,
    Slider,
    Card,
    Grid,
    Checkbox,
    Popover,
    Collapse,
    Image,
    Descriptions,
    Tag,
    Layout,
    Space
} from '@arco-design/web-react';
import { GetHeroDetail, HandlerAxiosErrPrefix, HandlerAxiosSuccessPrefix, LoadArtifactJSON, LoadHeroFribbelsJSON, LoadHeroJSON } from '../../../../utils/api/help';
import { GenerateSetImageUrl, SkipToUrl } from '../../../../utils/helper';
import { PathHeroTemplateManage } from '../../../../const';
import { HeroSelect } from '../../../../utils/HeroSelect/HeroSelect';
import HeroImageShow from '../../../../utils/HeroImageShow/HeroImageShow';
import { CreateHeroPanelWithUP, HeroDetail, HeroDetailBackEnd, HeroFribbelsResult, HeroPanel, Range, HeroTemplate, FKeySpeed, FKeyHP, CalculatedStatus, FKeyCC, FKeyHR, FKeyRR, FKeyCD, ExtraPanel, FKeyDef, FKeyAtk, ArtifactTemplateInfo, SelfDevotion, GetSelfDevotionGradeValueByLevel, GetSelfDevotionTypeChinese, ArtifactInfo, ArtifactListResult, DefaultArtifactInfo, ConvertSelfDevotionTypeToCommon, GetEETypeValue, ClassSuffixFinal } from '../../../../utils/const';
import { EquipArtifactMultiSelect, EquipSetMultiSelect } from '../../../../utils/EquipSetSelect/EquipSetSelect';
import { HeroTemplateCreate, HeroTemplateGet, HeroTemplateUpdate } from '../../../../utils/api/heroTemplate';
import { CalClassSetGrade, CalClassSetValue, CalGradeByClass, CalLeftMainValueByClass, CalMainGradeByClass, CalMainValueByClass, CalValueByClass, ClassAtk, ClassCC, ClassCD, ClassChineseMap, ClassDefend, ClassHp, ClassHr, ClassMainMap, ClassRr, ClassSetMap, ClassSpeed, ClassToFKeyMap, EquipLocNecklace, EquipLocRing, EquipLocShoes, MainNecklaceRange, MainRingRange, MainShoesRange, SetMaxHp, SetSpeed } from '../../../../utils/const';
import { IconExclamationCircle, IconQuestionCircle } from '@arco-design/web-react/icon';
import { RangeShow } from '../../../../utils/StatisticShow/StatisticShow';
// import { PathHeroTemplateManage } from '../../..';
const FormItem = Form.Item;

interface HeroPanelEditProps {
    data: HeroPanel;
    heroCode: string;
    onChange?: (info: HeroPanel) => any;
    disabled?: boolean;
}

export function HeroPanelEdit(props: HeroPanelEditProps) {
    let curInfo = props.data
    const [range, setRange] = useState(CreateHeroPanelWithUP())

    const [{ data }, execute, _] = GetHeroDetail()

    useEffect(() => {
        if (props.heroCode !== undefined && props.heroCode !== "") {
            execute({ params: { HeroCode: props.heroCode } }).then((response) => {
                let info = response.data.Data as HeroDetailBackEnd
                let newRange = CreateHeroPanelWithUP(info)
                if (range !== newRange) {
                    setRange(newRange) // 计算该英雄的属性范围
                }
            }).catch((error) => { HandlerAxiosErrPrefix("读取角色信息", error) })
        }
    }, [props.heroCode])

    if (props.heroCode === "") {
        return <div></div>
    }
    if (curInfo === undefined || curInfo === null) {
        curInfo = CreateHeroPanelWithUP()
    }

    return <div>
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.ATK}
            range={range.ATK}
            label='攻击'
            classType={ ClassAtk }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.ATK = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.DF} range={range.DF}
            label='防御'
            classType={ ClassDefend }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.DF = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.HP} range={range.HP}
            label='生命'
            classType={ ClassHp }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.HP = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.SP}
            range={range.SP}
            label='速度'
            classType={ ClassSpeed }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.SP = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.CC}
            range={range.CC}
            label='暴率'
            classType={ ClassCC }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.CC = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.CD}
            range={range.CD}
            label='暴伤'
            classType={ ClassCD }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.CD = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.HR}
            range={range.HR}
            label='命中'
            classType={ ClassHr }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.HR = info
                    props.onChange(curInfo)
                }
            }}
        />
        <RangeEdit
            disabled={props.disabled}
            data={curInfo.RR}
            range={range.RR}
            label='抗性'
            classType={ ClassRr }
            onChange={(info) => {
                if (props.onChange) {
                    curInfo.RR = info
                    props.onChange(curInfo)
                }
            }}
        />
    </div>
}


interface RangeEditProps {
    data: Range;
    range: Range;
    label?: string;
    onChange?: (info: Range) => any;
    disabled?: boolean;
    classType: string;
}

export function RangeEdit(props: RangeEditProps) {
    let marks: Record<number, React.ReactNode> = {}
    marks[props.range.Down] = props.range.Down
    marks[props.range.Up] = props.range.Up

    const [tempData, setTempData] = useState({ Enable: false, Down: props.range.Down, Up: props.range.Up })
    useEffect(() => {
        setTempData(props.data !== undefined ? props.data : { Enable: false, Down: props.range.Down, Up: props.range.Up })
    }, [props.data])
    return <div>
        <Grid.Row>
            <Grid.Col span={2}>
                <Checkbox
                    disabled={props.disabled}
                    style={{ margin: 10 }} checked={tempData.Enable} onChange={(newEnable) => {
                        if (props.onChange) {
                            const newRange: Range = {
                                Enable: newEnable,
                                Down: tempData.Down,
                                Up: tempData.Up,
                            }
                            props.onChange(newRange)
                        }
                    }}></Checkbox>
            </Grid.Col>
            <Grid.Col span={11}>
                <FormItem label={
                    <span style={{ color: tempData.Enable ? 'black' : 'gray', fontWeight: 700, display: "flow" }}>
                        {props.label}
                    </span>}
                    disabled={!tempData.Enable || props.disabled}>
                    {(!tempData.Enable || props.disabled) ?
                        <div style={{marginLeft:50}}><RangeShow Type={props.classType} RangeData={props.data}></RangeShow></div> :
                        <Slider
                        marks={marks}
                        style={{ width: 400 }} min={props.range.Down} max={props.range.Up} range
                        showInput={{
                            hideControl: false,
                            style: {
                                width: 80,
                            },
                        }} value={[tempData.Down, tempData.Up]} onChange={(input) => {
                            let array: number[] = input as number[]
                            const newRange: Range = {
                                Enable: true,
                                Down: array[0],
                                Up: array[1],
                            }
                            setTempData(newRange)
                        }}
                        onAfterChange={(input) => {
                            let array: number[] = input as number[]
                            const newRange: Range = {
                                Enable: true,
                                Down: array[0],
                                Up: array[1],
                            }
                            if (props.onChange) {
                                props.onChange(newRange)
                            }
                        }}
                    />
                    }
                </FormItem>
            </Grid.Col>
        </Grid.Row>
    </div>
}

interface HeroTemplateFormProps {
    type: string;
}

export default function HeroTemplateForm(props: HeroTemplateFormProps) {
    const { id } = useParams();
    const [Once, setOnce] = useState(false)
    const [form] = Form.useForm();
    const [fresh, setFresh] = useState(false)
    let defaultTemplate: HeroTemplate = {}
    const [nowHeroTemplateData, setNowHeroTemplateData] = useState(defaultTemplate)
    var heroDetailBackEndDefault: HeroDetailBackEnd = {}
    const [heroDetailBackEnd, setHeroDetailBackEnd] = useState(heroDetailBackEndDefault)

    const [artifactJSONResult, _] = LoadArtifactJSON()
    let artifactInfo: ArtifactListResult = artifactJSONResult.data

    const [{ }, heroTemplateGet] = HeroTemplateGet(false)
    const [{ }, getHeroDetail] = GetHeroDetail()

    const updateHeroDetailBackEnd = () => { 
        let heroCode = form.getFieldValue("HeroCode")
        if (heroCode !== undefined && heroCode !== "") {
            getHeroDetail({ params: { HeroCode: heroCode } }).then((response) => {
                let info = response.data.Data as HeroDetailBackEnd
                setHeroDetailBackEnd(info)
            }).catch((error) => { HandlerAxiosErrPrefix("读取角色信息", error) })
        }
    }

    if ((props.type === "update" || props.type === "analyse") && Once === false) {
        setOnce(true)
        heroTemplateGet({ params: { ID: id } }).then((response) => {
            setNowHeroTemplateData(response.data.Data)
            // form.resetFields
            form.setFieldsValue(response.data.Data)
            for (let [key, value] of Object.entries(response.data.Data)) {
                form.setFieldValue(key, value)
            }

            updateHeroDetailBackEnd()
            setFresh(!fresh)
            // form.setFields(response.data.Data)
        }).catch((error) => { HandlerAxiosErrPrefix("查询角色模板", error) })
    }

    let editEnable = true
    if (props.type === "analyse") {
        editEnable = false
    }

    useEffect(() => { }, [props])

    const [{ data, loading, error }, heroTemplateCreate, refetch] = HeroTemplateCreate()
    const [{ }, heroTemplateUpdate] = HeroTemplateUpdate()

    return (
        <Card style={{ backgroundColor: "" }}>
            <Grid.Row>
                <Grid.Col span={12}>
                    <Form
                        style={{ width: 600 }}
                        autoComplete='off'
                        form={form}
                        size={"large"}
                        onSubmit={(v) => {
                            // 因为输入使用的单独的set，所有v不能代表所有表单的输入，需要使用form.getFields()
                            if (props.type === "update") {
                                heroTemplateUpdate({ data: { ID: id, NewInfo: form.getFields() } }).then((response) => {
                                    HandlerAxiosSuccessPrefix("更新角色模板", response)
                                    setFresh(!fresh)
                                }).catch((error) => { HandlerAxiosErrPrefix("更新角色模板", error) })
                            } else if (props.type === "create") {
                                heroTemplateCreate({ data: form.getFields() }).then(() => {
                                    SkipToUrl(PathHeroTemplateManage)
                                    Message.success("创建角色模板成功")
                                }).catch((error) => { HandlerAxiosErrPrefix("创建角色模板", error) })
                            }
                        }}
                    >
                        <FormItem label='角色' rules={[{ required: true }]} shouldUpdate={(prev, next) => prev.HeroCode !== next.HeroCode}>
                            <HeroSelect
                                disabled={!editEnable}
                                HeroCode={form.getFieldValue("HeroCode")} OnChange={(heroCode: HeroDetail) => {
                                    form.setFieldValue("HeroCode", heroCode.heroCode)
                                    updateHeroDetailBackEnd()
                                    setFresh(!fresh)
                                }} />
                        </FormItem>
                        <FormItem disabled={!editEnable} label='角色模板名称' field='HeroTemplateName' rules={[{ required: true }]}>
                            {editEnable === false ? <div>
                                { form.getFieldValue("HeroTemplateName")}
                            </div>:<Input placeholder='请输入角色模板名称' />}
                        </FormItem>
                        <FormItem disabled={!editEnable} label='有效均分' field='AverageGrade'>
                            {editEnable === false ? <div>
                                {form.getFieldValue("AverageGrade")}
                            </div> : <InputNumber placeholder='有效均分' />}
                        </FormItem>
                        <FormItem disabled={!editEnable} label='说明' field='Description'>
                            {editEnable === false ? <div>
                                {form.getFieldValue("Description")}
                            </div> : <Input placeholder='说明' />}
                        </FormItem>
                        <FormItem label='使用套装' rules={[{ required: true }]}>
                            <EquipSetMultiSelect
                                disabled={!editEnable}
                                noLabel={true}
                                EquipSet={form.getFieldValue("Set")}
                                onChange={(sets: string[][]) => {
                                    form.setFieldValue("Set", sets)
                                    setFresh(!fresh)
                                }}
                                style={{ width: 100 }}
                            />
                        </FormItem>
                        <FormItem label='使用神器' rules={[{ required: true }]}>
                            <EquipArtifactMultiSelect
                                disabled={!editEnable}
                                Artifact={form.getFieldValue("Artifact")}
                                onChange={(artifact: ArtifactTemplateInfo[]) => {
                                    form.setFieldValue("Artifact", artifact)
                                    setFresh(!fresh)
                                }}
                                allArtifactInfoList={artifactInfo}
                            />
                        </FormItem>
                        <FormItem label='项链主属' field={"MainNecklace"} rules={[{ required: true }]}>
                            <EquipmentMainSelect
                                disabled={!editEnable}
                                loc={EquipLocNecklace}
                                onChange={(mainSelect: string[]) => {
                                    form.setFieldValue("MainNecklace", mainSelect)
                                    setFresh(!fresh)
                                }}
                                value={form.getFieldValue("MainNecklace")}
                            />
                        </FormItem>
                        <FormItem label='戒指主属' rules={[{ required: true }]}>
                            <EquipmentMainSelect
                                disabled={!editEnable}
                                loc={EquipLocRing}
                                onChange={(mainSelect: string[]) => {
                                    form.setFieldValue("MainRing", mainSelect)
                                    setFresh(!fresh)
                                }}
                                value={form.getFieldValue("MainRing")}
                            />
                        </FormItem>
                        <FormItem label='鞋子主属' rules={[{ required: true }]}>
                            <EquipmentMainSelect
                                disabled={!editEnable}
                                loc={EquipLocShoes}
                                onChange={(mainSelect: string[]) => {
                                    form.setFieldValue("MainShoes", mainSelect)
                                    setFresh(!fresh)
                                }}
                                value={form.getFieldValue("MainShoes")}
                            />
                        </FormItem>
                        <FormItem label='自阵等级' rules={[]}>
                            <SelfDevotionSelect
                                selfDevotionInfo={heroDetailBackEnd.self_devotion}
                                disabled={!editEnable}
                                value={form.getFieldValue("SelfDevotion")}
                                onChange={(info) => { 
                                    form.setFieldValue("SelfDevotion", info)
                                    setFresh(!fresh)
                                }}
                            />
                        </FormItem>
                        {/* <FormItem label='属性配置' field='Name' rules={[{ required: true }]}> */}
                        <Card title={"属性配置"} style={{ width: 600 }}>
                            <HeroPanelEdit
                                disabled={!editEnable}
                                heroCode={form.getFieldValue("HeroCode")} data={form.getFieldValue("HeroPanel")} onChange={(info: HeroPanel) => {
                                    form.setFieldValue("HeroPanel", info)
                                    setFresh(!fresh)
                                }} />
                        </Card>
                        {/* </FormItem> */}
                        {editEnable?<FormItem wrapperCol={{ offset: 5 }}>
                            <Button type='primary' htmlType='submit' style={{ margin: 24 }}>
                                提交
                            </Button>
                        </FormItem>:<div></div>} 
                    </Form>
                </Grid.Col>
                {/* !editEnable &&  */}
                {<Grid.Col span={12}>
                    <Card title={<div>{"角色数据"}</div>} style={{marginBottom:10}}>
                        <HeroDetailBackEndShow heroDetailBackEnd={heroDetailBackEnd}/>
                    </Card>
                    <Card title={<div>{"分数需求"}<Popover content={<div>{"说明:主属性固定值按525攻、2835血、310防计算,专属装备加成取最高"}</div>}><IconQuestionCircle /></Popover> </div>}>
                        <Collapse
                            lazyload={false}
                            style={{ maxWidth: 1180 }}
                        >
                            {nowHeroTemplateData?.Set?.map((set, setIndex) => {
                                return <div key={setIndex}>
                                    {nowHeroTemplateData?.MainNecklace?.map((mainNecklace, necklaceIndex) => {
                                        return <div key={necklaceIndex}>
                                            {nowHeroTemplateData?.MainRing?.map((mainRing, ringIndex) => {
                                                return <div key={ringIndex}>
                                                    {nowHeroTemplateData?.MainShoes?.map((mainShoes, shoesIndex) => {
                                                        return <OneEquipConfGradeShow
                                                            key={shoesIndex}
                                                            set={set}
                                                            setIndex={setIndex}
                                                            mainNecklace={mainNecklace}
                                                            mainRing={mainRing}
                                                            mainShoes={mainShoes}
                                                            heroDetailBackEnd={heroDetailBackEnd}
                                                            nowHeroTemplateData={nowHeroTemplateData}
                                                            artifactInfo={nowHeroTemplateData.Artifact}
                                                            selfDevotion={nowHeroTemplateData.SelfDevotion}
                                                            allArtifactInfoList= {artifactInfo}
                                                        />
                                                    })}
                                                </div>
                                            })}
                                        </div>
                                    })}
                                </div>
                            })}
                        </Collapse>
                    </Card>
                </Grid.Col>}
            </Grid.Row>
        </Card>
    );
}

interface EquipmentMainSelectProps {
    value: string[];
    loc: string;
    onChange: (info: string[]) => any;
    disabled?: boolean;
}

export function EquipmentMainSelect(props: EquipmentMainSelectProps) {
    let selectRange: string[] = []
    switch (props.loc) {
        case EquipLocNecklace:
            selectRange = MainNecklaceRange
            break;
        case EquipLocRing:
            selectRange = MainRingRange
            break;
        case EquipLocShoes:
            selectRange = MainShoesRange
            break;
    }

    return <div>
        {props.disabled ?
                <Space size='small'>
                    {props.value?.map((value: string) => {
                        return <div>
                            {selectRange?.map((oneRangeValue: string, artifactIndex: number) => {
                                if (oneRangeValue === value) {
                                    return <Tag>{ClassChineseMap.get(value)}</Tag>
                                }
                            })}
                        </div>
                    })}
                </Space>
            :
                <Select
                    disabled={props.disabled}
                    value={props.value}
                    mode='multiple'
                    onChange={props.onChange}
                >
                {selectRange.map((item) => {
                    return <Select.Option key={item} value={item}>
                        {ClassChineseMap.get(item)}
                    </Select.Option>
                })}
            </Select>}
        </div>
}


interface ClassGradeNeedShowProps { 
    classType: string
    setList: string[]
    mainNecklace: string
    mainRing: string
    mainShoes: string
    heroInfo: CalculatedStatus
    extraHeroInfo?:ExtraPanel[]
    aim?: Range
    subGrade: number
    setSubGrade: (newValue:number) => any
}

function ClassGradeNeedShow(props: ClassGradeNeedShowProps) { 
    const { classType, setList, mainNecklace, mainRing, mainShoes, heroInfo, aim } = props

    // 基础值+套装+主属性+副属性 = 模版目标
    let baseValue = 0
    let leftValue = CalLeftMainValueByClass(classType)
    let setValue = 0
    let mainValue = 0
    let subValue = 0
    let subGrade = 0

    let factor = 100 // 有情况会导致有倍率计算

    let extraValue: { reason: string, value: number }[] = []
    let extraValueSum = 0

    if (aim === undefined || aim.Enable === false) {
        
    } else { 
        setValue = CalClassSetValue(heroInfo,setList,classType)

        let FKeyTemp = ClassToFKeyMap.get(classType)
        if (FKeyTemp !== undefined) { 
            baseValue = heroInfo?.lv60SixStarFullyAwakened[FKeyTemp]
            if (FKeyTemp === FKeyCC || FKeyTemp === FKeyCD || FKeyTemp === FKeyHR || FKeyTemp === FKeyRR) { 
                baseValue *= 100
            }
        }

        mainValue = CalMainValueByClass(heroInfo, mainNecklace, classType) + CalMainValueByClass(heroInfo, mainRing, classType) + CalMainValueByClass(heroInfo, mainShoes, classType)
        mainValue = Number(mainValue.toFixed(2))
        props.extraHeroInfo?.map((ExtraPanel) => { 
            ExtraPanel.effectValue.map((panel) => { 
                if (panel.classType.indexOf(classType) >= 0) { 
                    if (panel.classType.indexOf(ClassSuffixFinal) >= 0) {
                        factor += panel.value
                        return
                    }
                    let tempValue = CalValueByClass(heroInfo,panel.classType,panel.value)
                    extraValue.push({
                        reason: ExtraPanel.reason,
                        value:tempValue,
                    })
                    extraValueSum += tempValue
                }
            })
        })


        subValue = Number((aim.Down * 100 / factor - baseValue - leftValue - setValue - mainValue - extraValueSum).toFixed(2))
        subGrade = CalGradeByClass(heroInfo, classType, subValue)
    }

    useEffect(() => {
        if (subGrade !== props.subGrade) { 
            props.setSubGrade(subGrade)
        }
    }, [props])
    
    if (aim === undefined || aim.Enable === false) {
        return <div>-</div>
    }
    
    return <div>
        {factor===100?"":"("}
        {<Popover content={<div>基础数值({CalGradeByClass(heroInfo, classType, baseValue)}分)</div>}>
            <span style={{ fontWeight: "bold", color: "grey" }}>
                {Number.isNaN(baseValue) ? "" : baseValue}
            </span>
        </Popover>}
        {
            extraValue?.map((panel,panelIndex) => { 
                return <Popover key={panelIndex} content={<div>{panel.reason}({CalGradeByClass(heroInfo, classType, panel.value)}分)</div>}><span style={{ fontWeight: "bold", color: "grey" }}>+{panel.value}</span></Popover>
            })
        }
        {leftValue !== 0 ? <Popover content={<div>左三主属性加成({CalGradeByClass(heroInfo,classType,leftValue)}分)</div>}><span style={{ fontWeight: "bold" ,color:"grey"}}>+{leftValue}</span></Popover>:""}
        {setValue !== 0 ? <Popover content={<div>套装加成({CalGradeByClass(heroInfo,classType,setValue)}分)</div>}><span style={{ fontWeight: "bold" ,color:"blue"}}>+{setValue}</span></Popover>:""}
        {mainValue !== 0 ? <Popover content={<div>右三主属性加成({CalGradeByClass(heroInfo,classType,mainValue)}分)</div>}><span style={{ fontWeight: "bold" ,color: "orange" }}>+{mainValue}</span></Popover>:""}
        {subValue !== 0 ? <Popover content={<div>副属性加成({CalGradeByClass(heroInfo, classType, subValue)}分)</div>}><span style={{ fontWeight: "bold", color: "purple" }}>+{subValue}</span></Popover>:""}
        {factor === 100 ? "" : ")*" + (factor / 100).toFixed(2)}
        <Popover content={"目标阈值"}><span style={{ fontWeight: "bold", color: "red" }}>={aim.Down}</span></Popover>
    </div>
}

interface OneEquipConfGradeShowProps { 
    setIndex: number;
    set: string[]
    mainNecklace: string
    mainRing: string
    mainShoes: string
    heroDetailBackEnd: HeroDetailBackEnd
    nowHeroTemplateData:HeroTemplate
    artifactInfo?: ArtifactTemplateInfo[]
    selfDevotion?: string
    allArtifactInfoList: ArtifactListResult;
}
export function GetArtifactValueByLevel(artifactCode: string, level: number, allArtifactInfoList: ArtifactListResult) { 
    if (allArtifactInfoList === undefined) { 
        return { ATK:0, HP:0 }
    }

    let tempArtifactInfo = DefaultArtifactInfo()
    allArtifactInfoList.artifactList.map((artifactTemp: ArtifactInfo, artifactIndex: number) => {
        if (artifactTemp.artifactCode === artifactCode) {
            tempArtifactInfo = artifactTemp
        }
    })

    return {
        HP: Number(((tempArtifactInfo.abilityDefense * (30 - level) + tempArtifactInfo.enhanceAbilityDefense * level) / 30).toFixed(2)),
        ATK: Number(((tempArtifactInfo.abilityAttack * (30 - level) + tempArtifactInfo.enhanceAbilityAttack * level) / 30).toFixed(2)), 
    }
}

function OneEquipConfGradeShow(props: OneEquipConfGradeShowProps) { 
    const { setIndex, set, mainNecklace, mainRing, mainShoes, heroDetailBackEnd, nowHeroTemplateData } = props
    
    const [subGradeHP, setSubGradeHP] = useState(0)
    const [subGradeATK, setSubGradeATK] = useState(0)
    const [subGradeDF, setSubGradeDF] = useState(0)
    const [subGradeSP, setSubGradeSP] = useState(0)
    const [subGradeCC, setSubGradeCC] = useState(0)
    const [subGradeCD, setSubGradeCD] = useState(0)
    const [subGradeHR, setSubGradeHR] = useState(0)
    const [subGradeRR, setSubGradeRR] = useState(0)

    let failFlag = false
    if (subGradeHP < 0 || subGradeATK < 0 || subGradeDF < 0 || subGradeSP < 0 || subGradeCC < 0 || subGradeCD < 0 || subGradeHR < 0 || subGradeRR < 0) { 
        failFlag = true
    }

    // 计算得分
    let setGrade = 0
    set.map((setTemp) => {
        setGrade += CalClassSetGrade(heroDetailBackEnd?.calculatedStatus, setTemp)
    })
    // 计算平均分
    let averageGrade = Number(((subGradeHP + subGradeATK + subGradeDF + subGradeSP + subGradeCC + subGradeCD + subGradeRR + subGradeHR) / 6).toFixed(2))
    
    
    let extra_panels: ExtraPanel[] = []
    if (heroDetailBackEnd.extra_panels !== undefined && heroDetailBackEnd.extra_panels !== null) { 
        extra_panels = [...heroDetailBackEnd.extra_panels]
    }

    // 计算神器的攻击力和血量加到额外配置上
    if (props.artifactInfo !== undefined && props.artifactInfo !== null && props.artifactInfo[0] !== undefined) { 
        let res = GetArtifactValueByLevel(props.artifactInfo[0].ArtifactCode === undefined ? "" : props.artifactInfo[0].ArtifactCode,
            props.artifactInfo[0].Level === undefined ? 0 : props.artifactInfo[0].Level, 
            props.allArtifactInfoList)
        extra_panels.push({
            reason: '神器加成',
            effectValue: [{
                classType: "hp",
                value: res.HP,
            }, {
                    classType: "atk",
                    value: res.ATK,
                }]
        })
    }

    // 计算阵型的攻击力和血量加到额外配置上
    if (props.selfDevotion !== undefined && props.selfDevotion !== "") { 
        let value = GetSelfDevotionGradeValueByLevel(props.selfDevotion, heroDetailBackEnd.self_devotion)
        extra_panels.push({
            reason: props.selfDevotion +'自阵加成',
            effectValue: [{
                classType: ConvertSelfDevotionTypeToCommon(heroDetailBackEnd.self_devotion?.type),
                value: value,
            }]
        })
    }

    // 计算专属装备的加成加到额外配置上
    if (heroDetailBackEnd.eeType !== undefined && heroDetailBackEnd.eeType !== "") {
        extra_panels.push({
            reason: '专属装备加成',
            effectValue: [{
                classType: heroDetailBackEnd.eeType,
                value: GetEETypeValue(heroDetailBackEnd.eeType),
            }]
        })
    }

    return <Collapse.Item
        header={<>
            {failFlag ? <Popover content={"不可满足需求的配置"}><IconExclamationCircle style={{ color: "red" }} /></Popover> : <></>}
            {set.map((setTemp,setIndex) => {
                return <Image key={setIndex} preview={false} width={30} src={GenerateSetImageUrl(setTemp)}></Image>
            })}
            <span style={{ marginLeft: 10 }}>{" 项链:"} <span style={{ color: "red" }}>{ClassChineseMap.get(mainNecklace)}</span></span>
            <span style={{ marginLeft: 10 }}>{" 戒指:"} <span style={{ color: "red" }}>{ClassChineseMap.get(mainRing)}</span></span>
            <span style={{ marginLeft: 10 }}>{" 鞋子:"} <span style={{ color: "red" }}>{ClassChineseMap.get(mainShoes)}</span></span>
        </>}
        name={setIndex + mainNecklace + mainRing + mainShoes}
        extra={<>
            有效均分：<span style={{fontWeight:"bold"}}>{averageGrade}</span>
        </>}
    >
        <Descriptions
            column={1}
            title='分数分布'
            style={{ marginBottom: 20 }}
            labelStyle={{ paddingRight: 36 }}
            data={[{
                label: "套装分数",
                value: <>{setGrade}</>,
            }, {
                label: "右三主属性分数",
                value: <>{CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainNecklace)}
                    +{CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainRing)}
                    +{CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainShoes)}=
                    {CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainShoes) +
                        +CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainNecklace) +
                        CalMainGradeByClass(heroDetailBackEnd?.calculatedStatus!, mainShoes)
                    }
                </>,
            }, {
                label: "生命",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassHp}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.HP}
                        subGrade={subGradeHP}
                        setSubGrade={setSubGradeHP}
                    />
                </>,
            }, {
                label: "防御",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassDefend}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.DF}
                        subGrade={subGradeDF}
                        setSubGrade={setSubGradeDF}
                    />
                </>,
            }, {
                label: "攻击",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassAtk}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.ATK}
                        subGrade={subGradeATK}
                        setSubGrade={setSubGradeATK}
                    />
                </>,
            }, {
                label: "速度",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassSpeed}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.SP}
                        subGrade={subGradeSP}
                        setSubGrade={setSubGradeSP}
                    />
                </>,
            }, {
                label: "暴率",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassCC}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.CC}
                        subGrade={subGradeCC}
                        setSubGrade={setSubGradeCC}
                    />
                </>,
            }, {
                label: "暴伤",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassCD}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.CD}
                        subGrade={subGradeCD}
                        setSubGrade={setSubGradeCD}
                    />
                </>,
            }, {
                label: "命中",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassHr}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.HR}
                        subGrade={subGradeHR}
                        setSubGrade={setSubGradeHR}
                    />
                </>,
            }, {
                label: "抗性",
                value: <>
                    <ClassGradeNeedShow
                        classType={ClassRr}
                        setList={set}
                        mainNecklace={mainNecklace}
                        mainRing={mainRing}
                        mainShoes={mainShoes}
                        heroInfo={heroDetailBackEnd?.calculatedStatus!}
                        extraHeroInfo={extra_panels}
                        aim={nowHeroTemplateData.HeroPanel?.RR}
                        subGrade={subGradeRR}
                        setSubGrade={setSubGradeRR}
                    />
                </>,
            }, {
                label: "副属均分",
                value: <>{averageGrade}</>,
            }]}
        />
    </Collapse.Item>
}

interface HeroDetailBackEndShowProps { 
    heroDetailBackEnd: HeroDetailBackEnd
}

function HeroDetailBackEndShow(props: HeroDetailBackEndShowProps) { 
    return <div>
        <Descriptions
            column={1}
            title='初始面板'
            style={{ marginBottom: 20 }}
            labelStyle={{ paddingRight: 86 }}
            data={[
                {
                    label: "生命",
                    value: <>{ props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyHP]}</>,
                }, {
                    label: "防御",
                    value: <>{ props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyDef]}</>,
                }, {
                    label: "攻击",
                    value: <>{ props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyAtk]}</>,
                }, {
                    label: "速度",
                    value: <>{ props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeySpeed]}</>,
                }, {
                    label: "暴率",
                    value: <>{props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyCC]! * 100}</>,
                }, {
                    label: "暴伤",
                    value: <>{props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyCD]! * 100}</>,
                }, {
                    label: "命中",
                    value: <>{props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyHR]! * 100}</>,
                }, {
                    label: "抗性",
                    value: <>{props.heroDetailBackEnd.calculatedStatus?.lv60SixStarFullyAwakened[FKeyRR]! * 100}</>,
                }]}
        ></Descriptions>
    </div>
}


interface SelfDevotionSelectProps {
    selfDevotionInfo?: SelfDevotion;
    value: string;
    onChange: (info: string) => any;
    disabled?: boolean;
    
}



export function SelfDevotionSelect(props: SelfDevotionSelectProps) {
    if (props.selfDevotionInfo === undefined) { 
        return <div></div>
    }
    
    return <div>
        {props.disabled === true ? <>
            <span style={{ fontWeight: "bold" }}>{props.value}-</span>
            <span style={{}}>{GetSelfDevotionTypeChinese(props.selfDevotionInfo?.type)}-</span>
            <span style={{}}>{GetSelfDevotionGradeValueByLevel(props.value, props.selfDevotionInfo)}</span>
        </> : <Select
                style={{width:200}}
            value={props.value}
            onChange={props.onChange}

            >
                <Select.Option value={""} key={""}>
                    {"无"}
                </Select.Option>
                {Object.keys(props.selfDevotionInfo.grades).map((key) => { 
                    console.log(key)
                    return <Select.Option value={key} key={key}>
                        <Grid.Row >
                            <Grid.Col span={6}>
                                <span style={{ fontWeight: "bold" }}>{key}</span>
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <span style={{}}>{GetSelfDevotionTypeChinese(props.selfDevotionInfo?.type)}</span>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <span style={{}}>{GetSelfDevotionGradeValueByLevel(key,props.selfDevotionInfo)}</span>
                            </Grid.Col>
                        </Grid.Row>
                </Select.Option>
            })}
        </Select>}
        
    </div>
}