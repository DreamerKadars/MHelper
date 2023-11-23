import React, { useState, useEffect } from "react";
import "@arco-design/web-react/dist/css/arco.css";
import { Form, Table } from "@arco-design/web-react";
import { } from "../../const";
import { Layout } from '@arco-design/web-react';
import { Upload } from '@arco-design/web-react';
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { Grid } from '@arco-design/web-react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables, ArcElement } from "chart.js";
import { E7DataDomain } from '../const';
import { AttributeCodeIconFlex, HeroDetail, JobCodeIconFlex } from "../../utils/const";
Chart.register(...registerables);
Chart.register(ArcElement);
const Row = Grid.Row;
const Col = Grid.Col;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;


interface HeroImageShowProps { 
    HeroDetail: HeroDetail;
    ImageSizeParm?: number;
}

const HeroImageShow = (props: HeroImageShowProps) => {
    const [croppedImageUrl, setCroppedImageUrl] = useState('');
    let ImageSizeParm= 1
    if (props.ImageSizeParm !== undefined) { 
        ImageSizeParm = props.ImageSizeParm
    }
    useEffect(() => {
        handleCrop()
    }, [props.HeroDetail.heroCode])
    const handleCrop = () => {
        let srcHeroImage = E7DataDomain + "/HeroImage/" + props.HeroDetail.heroCode + ".png"
        let srcIronImage = E7DataDomain + "/icon.png"
        let srcHeroFrameImage = E7DataDomain + "/hero_frame.png"
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx == undefined) {
            return <div></div>
        }
        canvas.width = 100 * ImageSizeParm;
        canvas.height = 120 * ImageSizeParm;

        let imgHero = new Image(), imgIron = new Image(), imgFrame = new Image();
        imgHero.setAttribute('crossOrigin', 'anonymous');
        imgHero.src = srcHeroImage;
        imgIron.setAttribute('crossOrigin', 'anonymous');
        imgIron.src = srcIronImage;
        imgFrame.setAttribute('crossOrigin', 'anonymous');
        imgFrame.src = srcHeroFrameImage
        
        let pm1 = new Promise<void>((res, rej) => {
            imgHero.onload = () => {
                res();
            }
        });
        let pm2 = new Promise<void>((res, rej) => {
            imgIron.onload = () => {
                res();
            }
        });
        let pm3 = new Promise<void>((res, rej) => {
            imgFrame.onload = () => {
                res();
            }
        });
        
        Promise.all([pm1, pm2, pm3]).then((res) => {
            ctx.drawImage(imgHero, 0, 0, 100 * ImageSizeParm, 100 * ImageSizeParm);
            ctx.drawImage(imgFrame, 0, 0, 100 * ImageSizeParm, 100 * ImageSizeParm);
            let attributeCodeIconFlex = AttributeCodeIconFlex.get(props.HeroDetail.attributeCode)
            if (attributeCodeIconFlex != undefined) { 
                ctx.drawImage(imgIron, 0, 50 * attributeCodeIconFlex, 50, 50, 70 * ImageSizeParm, 0, 30 * ImageSizeParm, 30 * ImageSizeParm);
            }
            let jobCodeIconFlexIconFlex = JobCodeIconFlex.get(props.HeroDetail.jobCode)
            if (jobCodeIconFlexIconFlex != undefined) {
                ctx.drawImage(imgIron, 50 + jobCodeIconFlexIconFlex * 46.5, 0, 50, 50, 0, 0, 30 * ImageSizeParm, 30 * ImageSizeParm);
            }
            ctx.drawImage(imgIron, 50, 140 + 40 * (props.HeroDetail.grade - 3), 140, 45, 0, 80 * ImageSizeParm, 100 * ImageSizeParm, 30 * ImageSizeParm);
            let fontSize = 18 * ImageSizeParm
            ctx.font = fontSize+'px Arial';
            ctx.fillStyle = 'black';
            const maxTextWidth = 100 * ImageSizeParm; // 最大文字宽度
            let text = props.HeroDetail.heroName
            let textWidth = ctx.measureText(text).width;
            // 计算文字的绘制位置，使其居中
            let x = 0
            if (textWidth < maxTextWidth) {
                x = (canvas.width - textWidth) / 2;
            }
            ctx.fillText(props.HeroDetail.heroName, x, 118 * ImageSizeParm,maxTextWidth);
        }).then(() => {
            const dataURL = canvas.toDataURL();
            setCroppedImageUrl(dataURL);
        });
    };
    return (
        <div>
            {croppedImageUrl && <img src={croppedImageUrl} alt="Cropped Image" />}
        </div>
    );
}

export default HeroImageShow