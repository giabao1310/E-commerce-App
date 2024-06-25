import React from "react";
import { useCart } from "../context/cartContext";
import { List, Button, Layout, Menu, InputNumber , Modal } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { confirm } = Modal;
const { Content, Sider } = Layout;

const Cart: React.FC = () => {
    const { cart, removeFromCart, cartQuantity } = useCart();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const deleteConfirm = (productId: string) => {
        confirm({
            title: 'Remove this product from cart?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                removeFromCart(productId);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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
                            <List.Item
                                actions={[
                                    <InputNumber
                                        min={1}
                                        max={100}
                                        value={item.quantity}
                                        onChange={(value) => cartQuantity(item.id, value)}
                                    />,
                                    <Button onClick={() => deleteConfirm(item.id)} type="primary" danger>Remove</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<img src={item.images[0]} style={{ width: '80px', height: '80px' }} alt={item.title} />}
                                    title={item.title}
                                    description={`Price: $${item.price}`}
                                />
                                <div>Total: ${item.price * item.quantity}</div>
                            </List.Item>
                        )}
                    />
                    <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
                        Total Price: ${getTotalPrice()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Cart;