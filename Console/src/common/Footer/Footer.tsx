import React from "react";
import { Divider } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

export default function Footer() {
    return (
        <div className='footer'>
            <Divider></Divider>
            <p style={{float:"right",marginRight:40}}>E7装备强化推荐器 v1.1</p>
        </div>
    );
}
