import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "@arco-design/web-react";
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import "@arco-design/web-react/dist/css/arco.css";
import HomePage from "./pages/HomePage/HomePage"
import "./index.less"
import {
  createRoot
} from 'react-dom/client'

const Sider = Layout.Sider;
const Content = Layout.Content;

export const PathMain: string = "/Main"
export const PathCardManage: string = "/CardManage"
export const PathCardUpdate: string = "/CardUpdate"
export const PathCardUpdateParam: string = "/:id"
export const PathCardCreate: string = "/CardCreate"

createRoot(document.getElementById('root')!).render(<div className='layout'>
  {/* <Header></Header> */}
  <Layout style={{}}>
    <Layout>
      {/* <Sider><div className='logo' />
        <Menu></Menu>
      </Sider> */}
      <Content style={{ background: 'rgb(240,255,255)', padding: '30px' }}>
        <BrowserRouter>
          <Routes>
            <Route path={PathMain} element={<HomePage />} />
            <Route path='/*' element={<Navigate to={PathMain}></Navigate>} />
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  </Layout>
  {/* <Footer></Footer> */}
</div>);
