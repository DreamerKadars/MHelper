import React, { useState, useEffect } from "react";
import "./HomePage.less"
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Image as ArcoImage, Link, Table, Button, Checkbox, Popover, Card, Modal } from "@arco-design/web-react";
import { HeaderSave } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem, UploadListProps } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables, ArcElement } from "chart.js";
import { Equipment, InitEquipment, UploadImageRespInfo } from "../../utils/const";
import { LoadHeroJSON } from "../../utils/api/help";
import { EquipAnalyse, EquipAnalyseModal } from "../../utils/EquipAnalyse/EquipAnalyse";
import { GetTotalGrade, PieChart } from "../../utils/PieChart/PieChart";
import { IconDelete, IconEye } from "@arco-design/web-react/icon";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface ImageCropperProps {
    imageUrl: string,
    left: number,
    top: number,
    right: number,
    bottom: number,
    croppedWidth: number,
}
const ImageCropper = async (props: ImageCropperProps) => {
    const { imageUrl, left, top, right, bottom, croppedWidth } = props

    // 创建一个临时图片对象用于裁剪
    let image = new Image();
    image.src = imageUrl

    await new Promise<void>((res, rej) => {
        image.onload = () => {
            res();
        }
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cropWidth = right - left;
    const cropHeight = bottom - top;

    // 计算缩放比例
    const scale = croppedWidth / cropWidth;
    const scaledHeight = cropHeight * scale;

    canvas.width = croppedWidth;
    canvas.height = scaledHeight;
    if (ctx == undefined) {
        return ""
    }
    ctx.drawImage(image, left, top, cropWidth, cropHeight, 0, 0, croppedWidth, scaledHeight);

    // 将裁剪后的图片转换成 data URL
    const dataURL = canvas.toDataURL();
    return dataURL;
};

const renderUploadList = (filesList: UploadItem[], props: UploadListProps) => (
    <div style={{ display: 'flex', marginTop: 20, }} >
        {filesList.map((file) => {
            const url = file.url || URL.createObjectURL(file.originFile!);
            return (
                <Card
                    key={file.uid}
                    hoverable
                    style={{
                        width: 270,
                        marginRight: 10,
                    }}
                    bodyStyle={{ padding: '4px 8px', }}
                    cover={
                        <img
                            src={url}
                            style={{ width: '100%', }}
                        />
                    }
                    actions={[
                        <div
                            onClick={() => {
                                Modal.info({
                                    title: '预览',
                                    style: {width:1200},
                                    content: <img src={url} width='100%' height='100%' />,
                                });
                            }}
                        >
                            <IconEye style={{ fontSize: 12, }} />
                        </div>,
                        <div>
                            <IconDelete
                                style={{ fontSize: 12, }}
                                onClick={() => {
                                    if (props.onRemove !== undefined) { 
                                        props.onRemove(file);
                                    }
                                }}
                            />
                        </div>,
                    ]}
                >
                    <Card.Meta description={file.name?.split('.')[0]} />
                </Card>
            );
        })}
    </div>
)

const HomePage = () => {
    let defaultInfo: Equipment[] = []

    const [Info, setInfo] = useState(defaultInfo)
    const [visible, setVisible] = useState(false)
    const [ImageSave, setImageSave] = useState(false)
    let defaultEquipment: Equipment = InitEquipment();
    const [equip, setEquip] = useState(defaultEquipment)

    return (
        <Layout>
            <EquipAnalyseModal equip={equip} visible={visible} onCancel={() => { setVisible(false) }}/>
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
                        <div>E7装备强化推荐器(只支持85红装)</div>
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
                        renderUploadList={renderUploadList}
                        headers={{ "x-st-save":ImageSave}}
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
                                let urlOriginImage = ""
                                if (item.originFile !== undefined) {
                                    const imageBitmap = await createImageBitmap(item.originFile);
                                    width = imageBitmap.width;
                                    height = imageBitmap.height;
                                    urlOriginImage = URL.createObjectURL(item.originFile)
                                }

                                equip = (item.response as UploadImageRespInfo).Data

                                if (equip !== undefined) {
                                    const promises2 = equip?.map(async (equipTemp, index) => {
                                        equip[index].OriginImage = item.originFile
                                        equip[index].OriginImageWidth = width
                                        equip[index].OriginImageHeight = height
                                        await ImageCropper({
                                            imageUrl: urlOriginImage,
                                            left: equipTemp.X1,
                                            top: equipTemp.Y1,
                                            right: equipTemp.X2,
                                            bottom: equipTemp.Y2,
                                            croppedWidth: 300
                                        }).then((url) => {
                                            equip[index].EquipImageStr = url
                                        })
                                        if (equip[index].Objects?.length > 1) { // 至少有两个属性才展示。
                                            newInfo.push(equip[index]);
                                        }
                                        return null
                                    })
                                    await Promise.all(promises2);
                                }
                            })
                            await Promise.all(promises);
                            setInfo(newInfo)
                        }}
                        tip='Only pictures can be uploaded'
                    />
                </Form>
                <Button type="primary" style={{margin:20}} onClick={() => {
                    setVisible(true)
                    let inputEquip = InitEquipment()
                    inputEquip.Level = 85
                    setEquip(inputEquip)
                }}>手动录入装备</Button>
                {/* <div style={{ display: "flex", float: "right",margin:20 }} >
                    <Popover content={<div>由于作者本人是国服萌新，只有竞技场88装备和龙讨伐装备，需要其他种类装备的截图用于训练模型。如果您上传了<span style={{ color: "red" }}>迷宫88/活动88/龙讨伐外的85和90装备</span>，希望您可以选择该选项，我们将感谢您的支持。</div>}>
                        <Checkbox checked={ImageSave} onChange={setImageSave}>同意保存图片用做数据集</Checkbox>
                    </Popover>
                </div> */}
                
                <br />
                {Info?.length > 0 && <div>
                    <Table
                        data={Info}
                        pagination={false}
                        columns={[
                            {
                                title: '装备',
                                width: 400,
                                render(col, item, index) {
                                    return <div key={index} style={{}}>
                                        <ArcoImage src={item.EquipImageStr}></ArcoImage>
                                    </div>
                                },
                            },
                            {
                                title: '装备副词条',
                                width: 150,
                                render(col, item, index) {
                                    return <div style={{}}>
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

                                    return <div style={{}}>
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
                                    return <div style={{}}>
                                        {<p style={{ fontSize: 12, color: "red", fontWeight: "bold" }}> 总分:{GetTotalGrade(item).toFixed(2)}</p>}
                                    </div>
                                }
                            },
                            {
                                title: '装备等级',
                                width: 170,
                                render(col, item, index) {
                                    return <div style={{}}>
                                        {item.Level === 85 ? <div style={{ color: "green" }}>85级可重铸装备</div> : <div style={{}}>其他不可重铸装备</div>}
                                    </div>
                                }
                            },
                            {
                                title: '当前强化等级',
                                width: 150,
                                render(col, item, index) {
                                    return <div style={{}}>
                                        +{item.UpgradeLevel}
                                    </div>
                                }
                            },
                            // {
                            //     title: '剩余强化次数',
                            //     width: 150,
                            //     render(col, item, index) {
                            //         return <div style={{  }}>
                            //             {Math.floor((17 - item.UpgradeLevel) / 3)}
                            //         </div>
                            //     }
                            // },
                            {
                                title: '强化预览(仅85红装)',
                                width: 250,
                                render(col, item, index) {
                                    return <div style={{}}>
                                        <PieChart equip={item} mode=""/>
                                    </div>
                                }
                            },
                            {
                                title: '操作',
                                width: 120,
                                render(col, item, index) {
                                    return <div style={{}}>
                                        <Link onClick={() => {
                                            setEquip(item)
                                            setVisible(true)
                                        }} >装备解析</Link>
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