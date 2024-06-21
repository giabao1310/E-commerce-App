import React, { useContext, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const { mutate: removeFromCart } = useMutation({
        mutationFn: async (productId: string) => {
            await setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
        },
        onSuccess: () => {
            notification.success({
                message: 'Product Removed',
                description: 'Product has been removed from the cart.',
            });
        }
    });

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);