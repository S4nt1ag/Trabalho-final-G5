import React, { createContext, useState } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {

    const [qntdCarrinho, setQntdCarrinho] = useState(0);

    const addToCart = () => {
        setQntdCarrinho(qntdCarrinho + 1)
    }

    const removeFromCart = (qntd) => {
        if (qntdCarrinho > 0 && qntd < qntdCarrinho)
            setQntdCarrinho(qntdCarrinho - qntd)
    }

    return (
        <CartContext.Provider value={{
            qntdCarrinho,
            addToCart,
            removeFromCart,
            setQntdCarrinho
        }}>
            {children}
        </CartContext.Provider>
    )
}