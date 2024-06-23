import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { localApi } from "../services/api";

const { TextArea } = Input;

const AddProduct: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: addMutation } = useMutation({
        mutationFn: async (newProduct: any) => {
            await localApi.post('/products', newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            message.success({
                type: 'success',
                content: 'Product has been added successfully.',
            });
            navigate('/admin/products');
        },
        onError: () => {
            message.error({
                type: 'error',
                content: 'An error occurred while adding the product.',
            });
        },
    });

    const onFinish = (values: any) => {
        const newProduct = {
            ...values,
            images: [values.image],
        };
        addMutation(newProduct);
    };

    return (
        <Form form={form} onFinish={onFinish} style={{ marginTop: '50px' }}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please fill in the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please fill the price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please fill the description!' }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true, message: 'Please enter the product image URL!' }]}
            >
                <Input />
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