import React from "react";
import { useCart } from "../context/cartContext";
import { List, Button, Layout , Menu } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Content, Sider } = Layout;

const Cart: React.FC = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className='sider'>
                <h1 className='homePage'>Home Page</h1>
                <div className="side-title">MENU</div>
                <Menu mode="inline" className='menu'>
                    <Menu.Item key="1" icon={<HomeOutlined />} style={{ color: "#fffffe" }}>
                        <Link to="/dashboard" >Product List</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />} style={{ color: "#fffffe" }}>
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ padding: '24px', margin: '0' }}>
                    <List
                        header={<div>Cart</div>}
                        itemLayout="horizontal"
                        bordered
                        dataSource={cart}
                        renderItem={(item: any) => (
                            <List.Item actions={[<Button onClick={() => removeFromCart(item.id)} type="primary" danger style={{ float: 'right' }}>Remove</Button>]}>
                                <List.Item.Meta
                                    title={item.title}
                                    description={`Price: $${item.price}`}
                                />
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Cart;