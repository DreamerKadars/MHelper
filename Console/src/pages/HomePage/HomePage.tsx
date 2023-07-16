import React, { useState } from "react";
import "./HomePage.less"
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Table } from "@arco-design/web-react";
import { } from "../../const";

import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";

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

const HomePage = () => {
    let defaultInfo: Equipment[] = []
    const [Info, setInfo] = useState(defaultInfo)
    const targetHeight = 50
    const targetWidth = 125
    const imageInterval = 1.1
    return (
        <div>
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
                                console.log(item)
                                // 计算比例使得高度为50 长度为125
                                let heightPercent = targetHeight / (item.Y2 - item.Y1)
                                let widthPercent = targetWidth / (item.X2 - item.X1)
                                let clipStr = "rect(" + item.Y1 * heightPercent + "px " + item.X2 * widthPercent + "px " + item.Y2 * heightPercent + "px " + item.X1 * widthPercent + "px)"
                                console.log(heightPercent, widthPercent)
                                console.log(clipStr)
                                console.log(widthPercent * 100 + "%")
                                console.log(heightPercent * 100 + "%")

                                return <div key={index} style={{ height: targetHeight * imageInterval }}>
                                    <img
                                        alt="装备"
                                        src={item.OriginImage === undefined ? "" : URL.createObjectURL(item.OriginImage)}
                                        style={{
                                            height: item.OriginImageHeight * heightPercent,
                                            width: item.OriginImageWidth * widthPercent,
                                            left: -item.X1 * widthPercent + 10,
                                            top: -item.Y1 * heightPercent + targetHeight * 1.48 * index + 50,
                                            position: "absolute",
                                            clip: "rect(" + item.Y1 * heightPercent + "px " + item.X2 * widthPercent + "px " + item.Y2 * heightPercent + "px " + item.X1 * widthPercent + "px)",
                                        }}
                                    />
                                </div>
                            },
                        },
                        {
                            title: '装备副词条',
                            render(col, item, index) {
                                return <div style={{ maxHeight:targetHeight}}>
                                    {item.Speed !== 0 && <p> 速度:{item.Speed}</p>}
                                    {item.Atk !== 0 && <p>攻击力:{item.Atk}</p>}
                                    {item.AtkPercent !== 0 && <p>攻击力:{item.AtkPercent}%</p>}
                                    {item.Defend !== 0 && <p>防御力:{item.Defend}</p>}
                                    {item.DefendPercent !== 0 && <p>防御力:{item.DefendPercent}%</p>}
                                    {item.Hp !== 0 && <p>生命值:{item.Hp}</p>}
                                    {item.HpPercent !== 0 && <p> 生命值:{item.HpPercent}</p>}
                                    {item.CC !== 0 && <p>暴击率:{item.CC}</p>}
                                    {item.CD !== 0 && <p> 暴击率伤害:{item.CD}</p>}
                                    {item.Hr !== 0 && <p>效果命中:{item.Hr}</p>}
                                    {item.RR !== 0 && <p> 效果抵抗:{item.RR}</p>}
                                </div>
                            }
                        },
                        {
                            title: '装备等级',
                            dataIndex: "Level",
                        },
                        {
                            title: '强化等级',
                            dataIndex: "UpgradeLevel",
                        },
                        {
                            title: '强化预览',
                        },
                    ]}
                />
            </div>}
        </div>
    );
};

export default HomePage;