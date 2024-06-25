import React, { useContext, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images: string[];
}

interface CartContextProps {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    cartQuantity: (id: number, quantity: number) => void;
    removeFromCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => {},
    cartQuantity: () => {},
    removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: CartProduct) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(cartItem => cartItem.id === product.id);
            if (existingProduct) {
                return prevCart.map(cartProduct =>
                    cartProduct.id === product.id
                        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                        : cartProduct
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        message.open({
            type: 'success',
            content: 'Successfully added',
        });
    };

    const cartQuantity = (id: number, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(product =>
                product.id === id ? { ...product, quantity } : product
            )
        );
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
        <CartContext.Provider value={{ cart, addToCart, removeFromCart , cartQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);