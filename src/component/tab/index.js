import React from 'react';
import { TabBar } from 'antd-mobile';
import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline,
} from 'antd-mobile-icons';
import './index.scss'; // 导入 SCSS 文件
import { useNavigate } from 'react-router-dom';

const Tab = () => {
    // 定义 tab 选项
    const tabs = [
        {
            key: '/',
            title: '月度账单',
            icon: <BillOutline />
        },
        {
            key: '/new',
            title: '新增',
            icon: <AddCircleOutline />
        },
        {
            key: '/year',
            title: '年度账单',
            icon: <CalculatorOutline />
        },
    ];

    // 使用 navigate 实现路由切换
    const navigate = useNavigate();
    const switchRoute = (path) => {
        navigate(path);
    };

    return (
        <div id="app-container">
            <div className="tab-bar-container">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item
                            key={item.key}  // 使用 key 作为唯一标识
                            icon={item.icon}  // 渲染图标
                            title={item.title}  // 渲染标题
                        />
                    ))}
                </TabBar>
            </div>
        </div>
    );
};

export default Tab;
