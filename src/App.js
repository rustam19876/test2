


import React from 'react';
import Request from './views/Request';


import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">Главная страница</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Request/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2024</Footer>
            </Layout>
        </Layout>
    );
};
export default App;
