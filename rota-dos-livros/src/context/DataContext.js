import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const DataContext = createContext({});

export const DataProvider = ({children}) => {

    const [dadosUsuario, setDadosUsuario] = useState('');

    const armazenarDadosUsuario = (jwt) => {
        var jwtDecodificado = jwt_decode(jwt);

        //.user = chave do json
        var usuario = jwtDecodificado.user;

        usuario = JSON.parse(usuario);


        setDadosUsuario({
            id: usuario?.id,
            nome: usuario?.username,
            email: usuario?.email,
            token: jwt
        })
    }

    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario
        }}>
            {children}
        </DataContext.Provider>
    )
}