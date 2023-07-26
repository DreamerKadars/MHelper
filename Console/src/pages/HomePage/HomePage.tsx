import React, { useState } from "react";
import "./HomePage.less"
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Table } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export interface Info {
    Code: number;
    Data: Equipment[];
}

export interface Equipment {
    ID: string;
    Class: string;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    Value: number;
    Percent: boolean;
    CC: number;
    CD: number;
    Atk: number;
    AtkPercent: number;
    Speed: number;
    Hp: number;
    HpPercent: number;
    RR: number;
    Hr: number;
    Defend: number;
    DefendPercent: number;
    Level: number;
    UpgradeLevel: number;
    UpgradePercent: null;
    Objects: Object[];
    OriginImage?: File;
    OriginImageWidth: number;
    OriginImageHeight: number;
}

export interface Object {
    Class: string;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    Value: number;
    Percent: boolean;
}


interface EquipmentPieChartProps {
    equip: Equipment;
}
// 85等级的分段
const levelGrade90 = [60, 63, 65, 68, 70, 73, 1000]
const levelGrade85 = [50, 53, 55, 58, 60, 63, 1000]
const PieChart = (props: EquipmentPieChartProps) => {
    let totalGrade = GetTotalGrade(props.equip)
    let grade: number[] = Array<number>(500)
    let gradeTemp: number[] = Array<number>(500)
    for (let i = 0; i < 100; i++) {
        grade[i] = 0
        gradeTemp[i] = 0
    }
    if (totalGrade > 100) {
        return <div></div>
    }
    grade[Math.round(totalGrade)] = 100.00
    let upgradeTime = Math.floor((17 - props.equip.UpgradeLevel) / 3)
    if (upgradeTime < 0 || upgradeTime > 5) {
        return <div></div>
    }
    console.log(props.equip)
    for (let i = 0; i < upgradeTime; i++) {
        for (let j = 0; j < 100; j++) {
            if (props.equip.Atk !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.5 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.5 * grade[j]
            }
            if (props.equip.AtkPercent !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j]
            }
            if (props.equip.Defend !== 0) {
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.5 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.5 * grade[j]
            }
            if (props.equip.DefendPercent !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j]
            }
            if (props.equip.Hp !== 0) {
                gradeTemp[j + 4] = gradeTemp[j + 4] + 0.25 * 1 * grade[j]
            }
            if (props.equip.HpPercent !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j]
            }
            if (props.equip.Speed !== 0) {
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.5 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.5 * grade[j]
            }
            if (props.equip.Hr !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j]
            }
            if (props.equip.RR !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j]
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j]
            }
            if (props.equip.CC !== 0) {
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.25 * grade[j] // 4.5分
                gradeTemp[j + 6] = gradeTemp[j + 6] + 0.25 * 0.25 * grade[j] // 6分
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.25 * grade[j] // 7.5分
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.25 * grade[j] // 9分
            }
            if (props.equip.CD !== 0) {
                gradeTemp[j + 4] = gradeTemp[j + 4] + 0.25 * 0.2 * grade[j] // 4.4
                gradeTemp[j + 5] = gradeTemp[j + 5] + 0.25 * 0.2 * grade[j] // 5.5 
                gradeTemp[j + 7] = gradeTemp[j + 7] + 0.25 * 0.2 * grade[j] // 6.6
                gradeTemp[j + 8] = gradeTemp[j + 8] + 0.25 * 0.2 * grade[j] // 7.7
                gradeTemp[j + 9] = gradeTemp[j + 9] + 0.25 * 0.2 * grade[j] // 8.8
            }
        }
        console.log(grade, gradeTemp)
        for (let j = 0; j < 100; j++) {
            grade[j] = gradeTemp[j]
            gradeTemp[j] = 0
        }
    }
    let gradeLevel = []

    if (props.equip.Level === 85) {
        gradeLevel = levelGrade85
    } else {
        gradeLevel = levelGrade90
    }

    let result = [0, 0, 0, 0,0,0,0]

    for (let i = 0, j = 0; j < 100; j++) {
        if (j <= gradeLevel[i]) {
            result[i] += grade[j]
        } else {
            i++
            result[i] += grade[j]
        }
    }

    return <div>
        <p style={{ fontSize: 10 }}>废件:{0}-{gradeLevel[0]}: <span style={{ color: "gray" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[0]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>过度:{gradeLevel[0] + 1}-{gradeLevel[1]}:<span style={{ color: "green" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[1]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>能用:{gradeLevel[1] + 1}-{gradeLevel[2]}:<span style={{ color: "blue" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[2]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>主力:{gradeLevel[2] + 1}-{gradeLevel[3]}:<span style={{ color: "purple" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[3]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>优秀:{gradeLevel[3] + 1}-{gradeLevel[4]}:<span style={{ color: "orange" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[4]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>传家宝:{gradeLevel[4] + 1}-{gradeLevel[5]}:<span style={{ color: "red" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[5]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>神器:{gradeLevel[5] + 1}-{"以上"}:<span style={{ color: "red", fontWeight:"bold" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[6]).toFixed(2)}%</span></p>
    </div>
};

const GetTotalGrade = (item: Equipment) => {
    const speedGrade = item.Speed * 2
    const atkGrade = item.Atk / 9
    const defendGrade = item.Defend / 6
    const hpGrade = item.Hp / 50
    const atkPercentGrade = item.AtkPercent
    const defendPercentGrade = item.DefendPercent
    const hpPercentGrade = item.HpPercent
    const ccGrade = item.CC * 1.5
    const cdGrade = item.CD * 1.1
    const hrGrade = item.Hr
    const rrGrade = item.RR
    return speedGrade + atkGrade + defendGrade + hpGrade + atkPercentGrade + defendPercentGrade + hpPercentGrade + ccGrade + cdGrade + hrGrade + rrGrade
}

const HomePage = () => {
    let defaultInfo: Equipment[] = []
    const [Info, setInfo] = useState(defaultInfo)
    const targetHeight = 100
    const targetWidth = 250
    const imageInterval = 1.1
    return (
        <Layout>
            <Header>
                <Row className='grid-demo' style={{ marginBottom: 16 }}>
                    <Col span={24} style={{
                        height: 70,
                        // lineHeight: 48,
                        // color: "white",
                        textAlign: "center",
                        fontSize: 40,
                        fontWeight: "bold"
                    }}>
                        <div>E7装备强化推荐器(只支持红装)</div>
                    </Col>
                </Row>
            </Header>
            <Content>
                <Form>
                    <Upload
                        drag
                        multiple
                        accept='image/*'
                        action='/api/v1/e7/upload'
                        imagePreview={true}
                        onDrop={(e) => {
                            // let uploadFile = e.dataTransfer.files[0]
                            // if (isAcceptFile(uploadFile, 'image/*')) {
                            //     return
                            // } else {
                            //     Message.info('不接受的文件类型，请重新上传指定文件类型~');
                            // }
                        }}
                        onChange={async (fileList: UploadItem[], file: UploadItem) => {
                            let newInfo: Equipment[] = []
                            const promises = fileList.map(async (item) => {
                                var equip: Equipment[] = []
                                if (item.response === undefined) {
                                    return
                                }
                                let width = 0;
                                let height = 0;
                                if (item.originFile !== undefined) {
                                    const imageBitmap = await createImageBitmap(item.originFile);
                                    width = imageBitmap.width;
                                    height = imageBitmap.height;
                                }

                                equip = (item.response as Info).Data
                                equip?.map((_, index) => {
                                    equip[index].OriginImage = item.originFile
                                    equip[index].OriginImageWidth = width
                                    equip[index].OriginImageHeight = height
                                    if (equip[index].Objects?.length > 1) { // 至少有两个属性才展示。
                                        newInfo.push(equip[index]);
                                    }
                                    return null
                                })
                            })
                            await Promise.all(promises);
                            setInfo(newInfo)
                        }}
                        tip='Only pictures can be uploaded'
                    />
                </Form>
                <br />
                {Info?.length > 0 && <div>
                    <Table
                        data={Info}
                        pagination={false}
                        columns={[
                            {
                                title: '装备',
                                width: targetWidth * imageInterval * imageInterval,
                                render(col, item, index) {
                                    // 计算比例使得高度为50 长度为125
                                    let heightPercent = targetHeight / (item.Y2 - item.Y1)
                                    let widthPercent = targetWidth / (item.X2 - item.X1)
                                    let clipStr = "rect(" + item.Y1 * heightPercent + "px " + item.X2 * widthPercent + "px " + item.Y2 * heightPercent + "px " + item.X1 * widthPercent + "px)"

                                    return <div key={index} style={{ height: targetHeight * imageInterval * 1.17 }}>
                                        <img
                                            alt="装备"
                                            src={item.OriginImage === undefined ? "" : URL.createObjectURL(item.OriginImage)}
                                            style={{
                                                height: item.OriginImageHeight * heightPercent,
                                                width: item.OriginImageWidth * widthPercent,
                                                left: -item.X1 * widthPercent + 10,
                                                top: -item.Y1 * heightPercent + targetHeight * 2.31 * index + 100,
                                                position: "absolute",
                                                clip: "rect(" + item.Y1 * heightPercent + "px " + item.X2 * widthPercent + "px " + item.Y2 * heightPercent + "px " + item.X1 * widthPercent + "px)",
                                            }}
                                        />
                                    </div>
                                },
                            },
                            {
                                title: '装备副词条',
                                width: 150,
                                render(col, item, index) {
                                    return <div style={{ maxHeight: targetHeight }}>
                                        {item.Speed !== 0 && <p style={{ fontSize: 10 }}> 速度:{item.Speed}</p>}
                                        {item.Atk !== 0 && <p style={{ fontSize: 10 }}>攻击力:{item.Atk}</p>}
                                        {item.AtkPercent !== 0 && <p style={{ fontSize: 10 }}>攻击力:{item.AtkPercent}%</p>}
                                        {item.Defend !== 0 && <p style={{ fontSize: 10 }}>防御力:{item.Defend}</p>}
                                        {item.DefendPercent !== 0 && <p style={{ fontSize: 10 }}>防御力:{item.DefendPercent}%</p>}
                                        {item.Hp !== 0 && <p style={{ fontSize: 10 }}>生命值:{item.Hp}</p>}
                                        {item.HpPercent !== 0 && <p style={{ fontSize: 10 }}> 生命值:{item.HpPercent}%</p>}
                                        {item.CC !== 0 && <p style={{ fontSize: 10 }}>暴击率:{item.CC}%</p>}
                                        {item.CD !== 0 && <p style={{ fontSize: 10 }}> 暴击伤害:{item.CD}%</p>}
                                        {item.Hr !== 0 && <p style={{ fontSize: 10 }}>效果命中:{item.Hr}%</p>}
                                        {item.RR !== 0 && <p style={{ fontSize: 10 }}> 效果抵抗:{item.RR}%</p>}
                                    </div>
                                }
                            },
                            {
                                title: '装备分数',
                                width: 170,
                                render(col, item, index) {
                                    const speedGrade = item.Speed * 2
                                    const atkGrade = (item.Atk / 9).toFixed(2)
                                    const defendGrade = (item.Defend / 6).toFixed(2)
                                    const hpGrade = (item.Hp / 50).toFixed(2)
                                    const atkPercentGrade = item.AtkPercent
                                    const defendPercentGrade = item.DefendPercent
                                    const hpPercentGrade = item.HpPercent
                                    const ccGrade = (item.CC * 1.5).toFixed(2)
                                    const cdGrade = (item.CD * 1.1).toFixed(2)
                                    const hrGrade = item.Hr
                                    const rrGrade = item.RR

                                    return <div style={{ maxHeight: targetHeight }}>
                                        {item.Speed !== 0 && <p style={{ fontSize: 10 }}> 速度得分:{speedGrade}</p>}
                                        {item.Atk !== 0 && <p style={{ fontSize: 10 }}> 攻击力固定值得分:{atkGrade}</p>}
                                        {item.AtkPercent !== 0 && <p style={{ fontSize: 10 }}> 攻击力百分比得分:{atkPercentGrade}</p>}
                                        {item.Defend !== 0 && <p style={{ fontSize: 10 }}> 防御力固定值得分:{defendGrade}</p>}
                                        {item.DefendPercent !== 0 && <p style={{ fontSize: 10 }}> 防御力百分比得分:{defendPercentGrade}</p>}
                                        {item.Hp !== 0 && <p style={{ fontSize: 10 }}> 生命固定值得分:{hpGrade}</p>}
                                        {item.HpPercent !== 0 && <p style={{ fontSize: 10 }}> 生命值百分比得分:{hpPercentGrade}</p>}
                                        {item.CC !== 0 && <p style={{ fontSize: 10 }}>暴击率得分:{ccGrade}</p>}
                                        {item.CD !== 0 && <p style={{ fontSize: 10 }}> 暴击伤害得分:{cdGrade}</p>}
                                        {item.Hr !== 0 && <p style={{ fontSize: 10 }}> 效果命中得分:{hrGrade}</p>}
                                        {item.RR !== 0 && <p style={{ fontSize: 10 }}> 效果抵抗得分:{rrGrade}</p>}
                                    </div>
                                }
                            },
                            {
                                title: '副词条总分',
                                width: 120,
                                render(col, item, index) {
                                    return <div style={{ maxHeight: targetHeight }}>
                                        {<p style={{ fontSize: 10, color: "red" }}> 总分:{GetTotalGrade(item).toFixed(2)}</p>}
                                    </div>
                                }
                            },
                            {
                                title: '装备等级',
                                width: 170,
                                render(col, item, index) {
                                    return <div style={{ maxHeight: targetHeight }}>
                                        {item.Level === 85 ? <div style={{ color: "green" }}>85级可重铸装备</div> : <div style={{}}>其他不可重铸装备</div>}
                                    </div>
                                }
                            },
                            {
                                title: '当前强化等级',
                                width: 150,
                                render(col, item, index) {
                                    return <div style={{ maxHeight: targetHeight }}>
                                        +{item.UpgradeLevel}
                                    </div>
                                }
                            },
                            {
                                title: '剩余强化次数',
                                width: 150,
                                render(col, item, index) {
                                    return <div style={{ maxHeight: targetHeight }}>
                                        {Math.floor((17 - item.UpgradeLevel) / 3)}
                                    </div>
                                }
                            },
                            {
                                title: '强化预览',
                                width: 300,
                                render(col, item, index) {
                                    return <div style={{}}>
                                        < PieChart equip={item} />
                                    </div>
                                }
                            },
                        ]}
                    />
                </div>}
            </Content>
        </Layout>
    );
};

export default HomePage;