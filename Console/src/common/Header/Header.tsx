import React from "react";
import { Menu } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import "./Header.less"
const MenuItem = Menu.Item;


export default function Header() {
    return (
        <div className='menu-demo'>
            <Menu mode='horizontal' defaultSelectedKeys={['1']} className='menu-header'>
                <MenuItem
                    key='0'
                    style={{ padding: 0, marginRight: 38, }}
                    disabled
                >
                    <div
                        style={{
                            width: 80,
                            height: 30,
                            borderRadius: 2,
                            background: 'var(--color-fill-3)',
                            cursor: 'text',
                        }}
                    />
                </MenuItem>
                {/* <MenuItem key='1'>Home</MenuItem>
                <MenuItem key='2'>Solution</MenuItem>
                <MenuItem key='3'>Cloud Service</MenuItem>
                <MenuItem key='4'>Cooperation</MenuItem> */}
            </Menu>
        </div>
    );
}
