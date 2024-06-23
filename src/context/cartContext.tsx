import React, { useContext, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart((prevCart) => [...prevCart, product]);
        message.open({
            type: 'success',
            content: 'Successfully added',
        });
    };

    const { mutate: removeFromCart } = useMutation({
        mutationFn: async (productId: string) => {
            await setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
        },
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'Product is removed from cart.',
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