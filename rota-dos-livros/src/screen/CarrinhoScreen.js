import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AxiosInstance } from '../api/AxiosInstance';
import { DataContext } from '../context/DataContext';
import { deleteAllCarrinho } from '../services/DataServices';
import { useFocusEffect } from '@react-navigation/native';
import { getValueFor } from "../services/DataServices";
import { ItemCarrinho } from '../components/ItemCarrinho';
import { Foundation } from '@expo/vector-icons';

export const CarrinhoScreen = () => {
    const [livros, setLivros] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { dadosUsuario } = useContext(DataContext)
    const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
    const [valorItensCarrinho, setValorItensCarrinho] = useState(0);



    const getFavoritos = async () => {
        let fav = await getValueFor('carrinho')
        let favs = fav != null ? JSON.parse(fav) : []

        let listaFavoritos = []

        for (let id of favs) {
            listaFavoritos.push(await getLivro(id))
        }

        setLivros(listaFavoritos)
        setQuantidadeItensCarrinho(listaFavoritos.length);
        setValorItensCarrinho(listaFavoritos.length * 20)
        setLoading(false)
    }

    const getLivro = async (id) => {

        try {
            let response = await AxiosInstance.get(`/livros/${id}`, {
                headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
            })
            return response.data
        } catch {
            console.log("Erro ao requisitar livro")
        }
    };

    async function removerCarrinho() {
        await deleteAllCarrinho()
        getFavoritos()
    }

    useFocusEffect(
        React.useCallback(() => {
            getFavoritos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.txtCarrinho}>Carrinho</Text>

                {
                    quantidadeItensCarrinho != 0 ? (
                        <View style={styles.qtd_lixeira}>
                            <Text>{quantidadeItensCarrinho} livro(s)</Text>
                            <TouchableOpacity onPress={removerCarrinho}>
                                <Foundation name="trash" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text>Seu carrinho está vazio</Text>
                    )
                }
            </View>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#116A7B" />
                </View>
            ) : (
                <View style={styles.containerLivros}>
                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={livros}
                        renderItem={({ item }) => (
                            <ItemCarrinho
                                key={item.codigoLivro}
                                id={item.codigoLivro}
                                nomeLivro={item.nomeLivro}
                                nomeAutor={item.autorDTO.nomeAutor}
                                imagem={item.img}
                                editora={item.editoraDTO.nomeEditora}
                            />
                        )}
                    />
                </View>
            )}
            {
                quantidadeItensCarrinho != 0 ? (
                    <View style={styles.containerTotal}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total</Text>
                        <Text>R$ {valorItensCarrinho},00</Text>
                    </View>
                ) : (
                    null
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C2DEDC',
        flex: 1,
        gap: 10,
        padding: 30
    },
    containerInfo: {
        justifyContent: 'center',
        gap: 10
    },
    txtCarrinho: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    qtd_lixeira: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerLivros: {
        flex: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#116a7b',
        borderTopWidth: 1,
        borderTopColor: '#116a7b',
    },
    containerInfoLivro: {
        flex: 2,
        paddingLeft: 20
    },
    containerPrecoLivro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btnQtd: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#116a7b',
        gap: 20,
        borderRadius: 20,
        padding: 5,
        textAlign: 'center',
        justifyContent: 'center'
    },
    txtBtnQtd: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
    containerTotal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
