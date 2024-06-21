import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, Typography } from 'antd';
import { localApi } from '../services/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUser } from '../context/userContext';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await localApi.get('/users', {
                params: {
                    username: values.username,
                    password: values.password,
                },
            });
            if (response.data.length > 0) {
                const user = response.data[0];
                login(user);

                notification.success({
                    message: 'Login Successful',
                    description: `Welcome ${user.username}!`,
                });
                navigate(user.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: 'Invalid username or password.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Login Error',
                description: 'An error occurred while logging in.',
            });
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className='loginContainer'>
            <Form name="login" onFinish={onFinish} className='loginForm'>
                <Typography.Title className='title'>Login</Typography.Title>
                <Form.Item name="username" rules={[{ required: true, message: 'Please fill in your username!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please fill in your password!' }]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
