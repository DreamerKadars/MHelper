import React from "react";
import { Menu as ArcoMenu } from "@arco-design/web-react";
import { IconHome, IconCalendar, IconBook, IconDesktop, IconUserGroup } from '@arco-design/web-react/icon';
import "@arco-design/web-react/dist/css/arco.css";
import { SkipToUrl } from "../../utils/helper";
import { PathAdmin, PathHeroTemplateManage } from "../../const";
import cookie from 'react-cookies'
const MenuItem = ArcoMenu.Item;
const JwtCookieKey = "user_jwt_token"
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
            <MenuItem key='/HeroTemplatePublic'>
                <IconCalendar />
                角色配装
            </MenuItem>
            {(cookie.load(JwtCookieKey) !== "" && cookie.load(JwtCookieKey) !== undefined) && <ArcoMenu.SubMenu key={PathAdmin} title={<>
                <IconDesktop /> 后台管理
            </>}>
                <MenuItem key={PathHeroTemplateManage}>
                    <IconUserGroup />
                    角色模板
                </MenuItem>
            </ArcoMenu.SubMenu>}
        </ArcoMenu>
    );
}
