import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Button, notification, Spin, Space, Modal } from 'antd';
import { externalApi, localApi } from '../services/api';
import { useCart } from '../context/cartContext';
import EditProduct from './editProduct';

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;


const ProductList = ({ searchTerm }: { searchTerm: string }) => {
    const queryClient = useQueryClient();
    const { addToCart } = useCart();
    const [modal, setModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


    // Fetch products from external API and store in local API
    // and delete existing products in local API before storing new products
    const fetchAndStoreProducts = async () => {
        try {
            const externalProducts = await externalApi.get('/products');
            const localProducts = await localApi.get('/products');
            const productLimit = externalProducts.data.slice(0, 200);
            const localProductsCheck = Array.isArray(localProducts.data) ? localProducts.data : [];

            await Promise.all(localProductsCheck.map((product: any) => localApi.delete(`/products/${product.id}`)));

            await Promise.all(productLimit.map((product: any) => {
                return localApi.post('/products', { ...product, id: parseInt(product.id, 10) });
            }));

            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            notification.success({
                message: 'Products Loaded',
                description: 'Products have been loaded from the external API.',
            });
        } catch (error) {
            console.error('Error fetching and storing products:', error);
            notification.error({
                message: 'Error Fetching Products',
                description: 'An error occurred while fetching products.',
            }
            );
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await localApi.get('/products');
            if (Array.isArray(data) && data.length === 0) {
                fetchAndStoreProducts().then(() => {
                    localStorage.setItem('fetchedData', 'true');
                });
            }
        };
        fetchData();
    }, []);

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await localApi.get('/products');
            return data;
        }
    });

    // Check role for button in action column in product table
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';


    const { mutate: deleteMutation } = useMutation({
        mutationFn: async (id: number) => {
            await localApi.delete(`/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            notification.success({
                message: 'Product Deleted',
                description: 'Product has been deleted.',
            });
        }
    });

    const handleDelete = (id: number) => {
        deleteMutation(id);
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: any, b: any) => a.title.localeCompare(b.title),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a: any, b: any) => a.price - b.price,
            filters: [
                { text: 'Under $10', value: [0, 10] },
                { text: '$10 - $50', value: [10, 20] },
                { text: '$50 - $100', value: [50, 100] },
                { text: '$100 - $1000', value: [100, 1000] },
                { text: 'Over $1000', value: [100, 10000] }
            ],
            onFilter: (value: any, record: any) => record.price > value[0] && record.price < value[1],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: any, b: any) => a.title.localeCompare(b.title),
        },
        ...(!isAdmin ? [
            {
                title: 'Actions',
                key: 'actions',
                render: (_: any, record: any) => (
                    <Button onClick={() => addToCart(record)}>Add to Cart</Button>
                )
            }
        ] : [
            {
                title: 'Actions',
                key: 'actions',
                render: (_: any, record: any) => (
                    <Space size={'middle'}>
                        <Button onClick={() => {
                            setEditProduct(record.id);
                            setModal(true);
                        }}>Edit</Button>
                        <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                    </Space>
                )
            }])
    ]

    const filteredProducts = (products || []).filter((product: any) =>
        product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (isLoading) {
        return <Spin tip="Loading product information...">{content}</Spin>
    }

    return (
        <>
            <Table dataSource={filteredProducts} columns={columns} rowKey="id"/>
            <Modal title="Edit Product" visible={modal} onCancel={() => setModal(false)} footer={null}>
                <EditProduct productId={editProduct} onclose={() => setModal(false)} />
            </Modal>
        </>
    );
}

export default ProductList;