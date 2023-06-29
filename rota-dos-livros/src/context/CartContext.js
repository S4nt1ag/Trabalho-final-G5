import React, { createContext, useState } from 'react';
import { saveTotalQntd, getValueFor } from '../services/DataServices'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [qntdCarrinho, setQntdCarrinho] = useState(0);
    
    const getTotal = async () => {
        let total = null
        total = await getValueFor('qntdTotal')

        if (total != null) {
            let value = parseInt(total)
            setQntdCarrinho(value)
        }
    }

    const addToCart = async () => {
        setQntdCarrinho(qntdCarrinho + 1);
        await saveTotalQntd(qntdCarrinho);
    };

    const removeFromCart = async (qntd) => {
        if (qntdCarrinho > 0 && qntd < qntdCarrinho) {
            setQntdCarrinho(qntdCarrinho - qntd);
            await saveTotalQntd(qntdCarrinho - qntd);
        }
    };

    return (
        <CartContext.Provider value={{
            qntdCarrinho,
            addToCart,
            removeFromCart,
            setQntdCarrinho,
            getTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};