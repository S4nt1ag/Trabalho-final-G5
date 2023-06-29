import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { deleteAllFavoritos, deleteId, removeItem, deleteItemUni } from '../services/DataServices';
import { DataContext } from '../context/DataContext';
import { AxiosInstance } from '../api/AxiosInstance';
import { getValueFor } from '../services/DataServices';
import { useFocusEffect } from '@react-navigation/native';

export function Favoritos() {
    const [livros, setLivros] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [quantidadeItensFavoritos, setQuantidadeItensFavoritos] = useState(0); // Novo estado
    const { dadosUsuario } = useContext(DataContext);

    const getFavoritos = async () => {
        let fav = await getValueFor('favoritos');
        let favs = fav != null ? JSON.parse(fav) : [];

        let listaFavoritos = [];

        for (let id of favs) {
            listaFavoritos.push(await getLivro(id));
        }

        setLivros(listaFavoritos);
        setQuantidadeItensFavoritos(listaFavoritos.length); // Atualizar quantidade de itens favoritos
        setLoading(false);
    };

    const getLivro = async (id) => {
        try {
            let response = await AxiosInstance.get(`/livros/${id}`, {
                headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
            });
            return response.data;
        } catch {
            console.log('Erro ao requisitar livro');
        }
    };

    async function removerFavoritos() {
        await deleteAllFavoritos();
        getFavoritos();
    }

    async function removerFavorito(key, value) {
        await deleteItemUni(key, value);
        getFavoritos();
    }

    useFocusEffect(
        React.useCallback(() => {
            getFavoritos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Meus Favoritos</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    {quantidadeItensFavoritos !== 0 ? (
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: "100%" }}>
                            <Text>{quantidadeItensFavoritos} item(s)</Text>
                            <TouchableOpacity onPress={() => removerFavoritos()}>
                                <Foundation name="trash" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text>Você ainda não possui favoritos</Text>
                    )}
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#116A7B" style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    contentContainerStyle={styles.list}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={livros}
                    renderItem={({ item }) => (
                        <View style={styles.favorite}>
                            <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.img}` }}></Image>
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookName}>{item.nomeLivro}</Text>
                                <Text style={styles.bookAuthor}>{item.autorDTO.nomeAutor}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removerFavorito('favoritos', item.codigoLivro)}>
                                <Entypo name="cross" size={24} color="#fff" style={{ alignSelf: 'flex-start' }} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C2DEDC',
        padding: 30,
        gap: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#116A7B',
        gap: 10,
    },
    favorite: {
        backgroundColor: '#116A7B',
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    bookAuthor: {
        color: '#fff',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    bookInfo: {
        justifyContent: 'center',
        maxWidth: 100,
        gap: 10,
    },
    list: {
        gap: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
