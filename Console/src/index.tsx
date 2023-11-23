import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "@arco-design/web-react";
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import "@arco-design/web-react/dist/css/arco.css";
import HomePage from "./pages/HomePage/HomePage"
import "./index.less"
import Menu from "./common/Menu/Menu";
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import {
  createRoot
} from 'react-dom/client'
import HeroData from "./pages/HeroData/HeroData"
import { LoadHeroJSON } from "./utils/api/help";
import MLogin from "./pages/MLogin/MLogin";
import HeroTemplateForm from "./pages/Admin/HeroTemplate/HeroForm/HeroFrom";
import { PathHeroData, PathHeroTemplateAnalyse, PathHeroTemplateCreate, PathHeroTemplateManage, PathHeroTemplatePublic, PathHeroTemplateUpdate, PathIDParam, PathLogin, PathMain } from "./const";
import HeroTemplateManage from "./pages/Admin/HeroTemplate/HeroTemplateManage";

const Sider = Layout.Sider;
const Content = Layout.Content;

createRoot(document.getElementById('root')!).render(<div className='layout'>
  {/* <Header></Header> */}
  <Header></Header>
  <Layout style={{ width: 1500 }}>
    <Layout>
      <Sider style={{width:160}}><div className='logo' />
        <Menu></Menu>
      </Sider>
      <Content style={{ background: 'rgb(240,255,255)', padding: '30px' }}>
        <BrowserRouter>
          <Routes>
            <Route path={PathMain} element={<HomePage />} />
            <Route path={PathHeroData} element={<HeroData />} />
            <Route path={PathLogin} element={<MLogin />} />
            <Route path={PathHeroTemplateManage} element={<HeroTemplateManage isPublic={false} />} />
            <Route path={PathHeroTemplateCreate} element={<HeroTemplateForm type={"create"} />}></Route>
            <Route path={PathHeroTemplateUpdate + PathIDParam} element={<HeroTemplateForm type={"update"} />}></Route>
            <Route path={PathHeroTemplateAnalyse + PathIDParam} element={<HeroTemplateForm type={"analyse"} />}></Route>
            <Route path={PathHeroTemplatePublic } element={<HeroTemplateManage isPublic={true} />}></Route>
            <Route path='/*' element={<Navigate to={PathMain}></Navigate>} />
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  </Layout>
  <Footer></Footer>
  {/* <Footer></Footer> */}
</div>);
