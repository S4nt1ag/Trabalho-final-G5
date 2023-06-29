import React, { createContext, useState } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [qntdCarrinho, setQntdCarrinho] = useState(0);

    const addToCart = () => {
        setQntdCarrinho(qntdCarrinho + 1);
    };

    const removeFromCart = (qntd) => {
        if (qntdCarrinho > 0 && qntd < qntdCarrinho) {
            setQntdCarrinho(qntdCarrinho - qntd);
        } else {
            setQntdCarrinho(0); // Zera a quantidade no carrinho
        }
    };

    return (
        <CartContext.Provider
            value={{
                qntdCarrinho,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};