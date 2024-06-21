import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import ProductList from '../components/productList';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className='sider'>
                <h1 className='homePage'>Home Page</h1>
                <div className="side-title">MENU</div>
                <Menu mode="inline" className='menu'>
                    <Menu.Item key="1" icon={<HomeOutlined />} style={{ color: "#fffffe" }} onClick={() => navigate('/dashboard')}>
                        Product List
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />} style={{ color: "#fffffe" }} onClick={() => navigate('/cart')}>
                        Cart
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout style={{ minHeight: '100vh' }}>
                <Header className='header'>
                    <div className="wrapper">
                        <div className="searchContent">
                            <Search
                                placeholder="Search products"
                                size="large"
                                onSearch={handleSearch}
                                className='searchBar'
                            />
                        </div>
                    </div>
                    <div className='userWrapper'>
                        <BellOutlined/>
                        <Avatar icon={<UserOutlined />} />
                        <span>User</span>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <ProductList searchTerm={searchTerm} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;