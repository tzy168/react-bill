import React from 'react';
// import { Button } from 'antd-mobile';
import Tab from '../../component/tab/index.js';
import { Outlet } from 'react-router-dom';
import './index.css'; // 导入 CSS 文件

const Layout = () => {
    return (
        <div id="app-container">
            <div className="content-container">
                <Outlet />
            </div>
            <div className="tab-bar-container">
                <Tab />
            </div>
        </div>
    );
};

export default Layout;