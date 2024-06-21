import React from "react";
import { Layout, Menu,  Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { HomeOutlined, AppstoreAddOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';



const { Header, Content, Sider } = Layout;

const Admin = () => {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className='sider'>
                <h1 className='homePage'>Admin Role</h1>
                <div className="side-title">MENU</div>
                <Menu mode="inline" className="menu">
                    <Menu.Item key="1" icon={<HomeOutlined />} style={{ color: "#fffffe" }} onClick={() => navigate('/admin/products')}>
                        Product List
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />} style={{ color: "#fffffe" }} onClick={() => navigate('/admin/add-product')}>
                        Add Product
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className='header'>
                    <div></div>
                    <div className="userWrapper">
                        <BellOutlined />
                        <Avatar icon={<UserOutlined />} />
                        <span>Admin</span>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;