import React, { useEffect } from "react";
import { Form, Input, Button, Spin } from 'antd';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { localApi } from "../services/api";


const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;

interface EditProductPros {
    productId: number | null;
    onclose: () => void;
}


const EditProduct: React.FC<EditProductPros> = ({ productId, onclose }) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const { data } = await localApi.get(`/products/${productId}`);
            return data;
        },
        enabled: !!productId
    })

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        }
    }, [product, form]);

    const { mutate: editProduct } = useMutation({
        mutationFn: async (updated: any) => {
            await localApi.put(`/products/${productId}`, updated)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
            onclose();
        }
    })

    // ****
    const onFinish = (values: any) => {
        editProduct(values);
    }

    if (isLoading) {
        return <Spin tip="Updating product information...">{content}</Spin>
    }

    return (
        <Form form={form} onFinish={onFinish} name="edit-product">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Fill in the product title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Fill in the product price!' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Fill in the description!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditProduct;