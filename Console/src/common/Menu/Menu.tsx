import React from "react";
import { Menu as ArcoMenu } from "@arco-design/web-react";
import { IconHome, IconCalendar, IconBook } from '@arco-design/web-react/icon';
import "@arco-design/web-react/dist/css/arco.css";
import { SkipToUrl } from "../../utils/helper";
const MenuItem = ArcoMenu.Item;
// const SubMenu = ArcoMenu.SubMenu;

export default function Menu() {
    return (
        <ArcoMenu
            selectedKeys={[window.location.href]}
            onClickMenuItem={(key) => {
                SkipToUrl(key)
            }}
            style={{ width: '100%', height: '100%', minHeight: 1000 }}
        >
            <MenuItem key='/Main' style={{}}>
                <IconHome />
                装备检测
            </MenuItem>
            <MenuItem key='/HeroData'>
                <IconCalendar />
                角色数据
            </MenuItem>
        </ArcoMenu>
    );
}
