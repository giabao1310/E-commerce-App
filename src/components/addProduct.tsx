import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { localApi } from "../services/api";

const { TextArea } = Input;

const AddProduct: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate : addMutation} = useMutation({
        mutationFn: async (newProduct: any) => {
            await localApi.post('/products', newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            notification.success({
                message: 'Product Added',
                description: 'Product has been added successfully.',
            });
            navigate('/admin/products');
        },
        onError: () => {
            notification.error({
                message: 'Error Adding Product',
                description: 'An error occurred while adding the product.',
            });
        },
    });

    const onFinish = (values: any) => {
        addMutation(values);
    };

    return (
        <Form form={form} onFinish={onFinish} style={{marginTop: '50px'}}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddProduct;