import { JSX, useEffect, useState } from "react";
import { HandlerAxiosErrPrefix, ListHeroDetail, LoadArtifactJSON, LoadHeroJSON, LoadSubValueDistributionJSON } from "../../api/help";
import { CalEquipSubValue, SubValue, ConvertHeroListResultToMap, EquipLocNecklace, EquipLocRing, EquipLocShoes, Equipment, GenerateValueDistributionRange, GetClassIntensifyRange, GetOneValueDistributionMapKey, GetSubValueClassFourRange, HeroDetailBackEnd, HeroListResult, HeroTemplate, IntensifyDistribution, IntensifyDistributions, OneValueDistributionRange, SetAcc, GetHighSpeedThreshold, ClassSpeed, CalHeroTemplatePreComputationForAdapter, ArtifactListResult, HeroTemplatePreComputationForAdapter, HighOneSubValueGradeThreshold, EquipLocCNMap, ClassChineseMap, GetClassImage, ClassSuffixPercent, GuessUpgradeDistribution, GetClassRecoinUpgrade, CalculateGradeByClass, ConvertValueTypeFixed, ConvertValueTypePercent, GetClassTransform, ClassDefend, ClassDefendPercent, DeepCopyArray, GradeAimStrategy, CalGradeByClass, GetGlobalSpeedConfigByLocal, GetGlobalInsPByLocal, GetGlobalInsSpeedPByLocal, GetGradeAimStrategiesByLocal } from "../../const";
import { HeroTemplateList } from "../../api/heroTemplate";
import { Badge, Button, Card, Descriptions, Form, Grid, Image, InputNumber, Link, Modal, Popover, Progress, Radio, Space, Statistic, Table, TableColumnProps } from "@arco-design/web-react";
import { GenerateSetImageUrl, GetHeroDetailFromListByHeroCode, SkipToUrl } from "../../helper";
import HeroImageShow from "../../HeroImageShow/HeroImageShow";
import { PathHeroTemplateAnalyse } from "../../../const";
import { CalculateHeroTemplateByEquip, HeroTemplateByEquipRes, HeroTemplateNeedShow, getLevelColor } from "../../HeroTemplateHelper/HeroTemplateHelper";
import { template } from "@babel/core";
import { IconArrowUp, IconEdit, IconExclamationCircle, IconRight } from "@arco-design/web-react/icon";
import { CalEquipNum } from "../../PieChart/PieChart";
import { DataType } from "@arco-design/web-react/es/Descriptions/interface";

export interface GlobalIntensifyModifyModalProps {
    visible: boolean;
    onClose: () => any;
}

export const GlobalIntensifyModifyModalProps = (props: GlobalIntensifyModifyModalProps) => { 
    let tempGlobalSpeedConfig = GetGlobalSpeedConfigByLocal()
    let [tempGlobalInsP, setTempGlobalInsP] = useState(GetGlobalInsPByLocal())
    let [tempGlobalInsSpeedP, setTempGlobalInsSpeedP] = useState(GetGlobalInsSpeedPByLocal()) 
    
    return <Modal
        title={"强化策略"}
        visible={props.visible}
        onOk={props.onClose}
        onCancel={props.onClose}
        onConfirm={props.onClose}
    >
        {GetGradeAimStrategiesByLocal().map((gradeAimStrategy) => { 
            let storageGradeStr = localStorage.getItem(gradeAimStrategy.Description + "#Grade")
            let storageGrade = Number(storageGradeStr)
            return <Form.Item label={gradeAimStrategy.Description+"分数标准"} style={{width:1000}}>
                <InputNumber
                    style={{width:100}}
                    value={storageGrade !== 0 ? storageGrade : gradeAimStrategy.AimGrade}
                    onChange={(newGrade) => { 
                        localStorage.setItem(gradeAimStrategy.Description + "#Grade",newGrade.toString())
                    }}
                ></InputNumber>
            </Form.Item>
        })}

        <Form.Item label={"速度套速度目标"} style={{ width: 1000 }}>
            <InputNumber
                style={{ width: 100 }}
                value={tempGlobalSpeedConfig.SpeedSetSpeed}
                onChange={(newGrade) => {
                    localStorage.setItem("AimSpeed#SpeedSetSpeed", newGrade.toString())
                }}
            ></InputNumber>
        </Form.Item>
        <Form.Item label={"两件套散件速度目标"} style={{ width: 1000 }}>
            <InputNumber
                style={{ width: 100 }}
                value={tempGlobalSpeedConfig.TwoSetSpeed}
                onChange={(newGrade) => {
                    localStorage.setItem("AimSpeed#TwoSetSpeed", newGrade.toString())
                }}
            ></InputNumber>
        </Form.Item>
        <Form.Item label={"四件套散件速度目标"} style={{ width: 1000 }}>
            <InputNumber
                style={{ width: 100 }}
                value={tempGlobalSpeedConfig.FourSetSpeed}
                onChange={(newGrade) => {
                    localStorage.setItem("AimSpeed#FourSetSpeed", newGrade.toString())
                }}
            ></InputNumber>
        </Form.Item>
        <Form.Item label={"右三固定词条速度目标"} style={{ width: 1000 }}>
            <InputNumber
                style={{ width: 100 }}
                value={tempGlobalSpeedConfig.AllFixedSpeed}
                onChange={(newGrade) => {
                    localStorage.setItem("AimSpeed#AllFixedSpeed", newGrade.toString())
                }}
            ></InputNumber>
        </Form.Item>

        <Form.Item label={"普通装备强化概率（分阶段）"} style={{ width: 1000 }}>
            {tempGlobalInsP.map((value, index) => {
                return <InputNumber
                    style={{ width: 50 }}
                    value={value}
                    //suffix='%'
                    hideControl
                    min={0}
                    max={100}
                    onChange={(newValue) => {
                        tempGlobalInsP[index] = newValue
                        setTempGlobalInsP([...tempGlobalInsP])
                        localStorage.setItem("GlobalInsP", tempGlobalInsP.join(","))
                    }}
                ></InputNumber>
            })}
        </Form.Item>
        <Form.Item label={"高速装备强化概率（分阶段）"} style={{ width: 1000 }}>
            {tempGlobalInsSpeedP.map((value, index) => {
                return <InputNumber
                    style={{ width: 50 }}
                    value={value}
                    hideControl
                    // suffix='%'
                    min={0}
                    max={100}
                    onChange={(newValue) => {
                        tempGlobalInsSpeedP[index] = newValue
                        setTempGlobalInsSpeedP([...tempGlobalInsSpeedP])
                        localStorage.setItem("GlobalInsSpeedP", tempGlobalInsSpeedP.join(","))
                    }}
                ></InputNumber>
            })}
        </Form.Item>
    </Modal>

}