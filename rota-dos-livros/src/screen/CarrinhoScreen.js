import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { useEffect, useState, useContext } from "react";
import { AxiosInstance } from "../api/AxiosInstance";
import { DataContext } from '../context/DataContext';

export const CarrinhoScreen = () => {

    const [dataLivros, setDataLivros] = useState();
    const { dadosUsuario } = useContext(DataContext);

    const getLivros = async () => {

        await AxiosInstance.get("/livros", {
            headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
        })
            .then(result => {
                setDataLivros(result.data);
            })
            .catch(error => {
                console.log("Ocorreu um erro ao recuperar os dados: " + error);
            })
    };

    useEffect(() => {
        getLivros();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.txtCarrinho}>Carrinho</Text>
                <View style={styles.qtd_lixeira}>
                    <Text>X livro(s)</Text>
                    <TouchableOpacity>
                        <FontAwesome5 name="trash" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerLivros}>
                <FlatList
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.teste}
                    data={dataLivros}
                    renderItem={({ item }) => (
                        <View style={styles.containerLivroCarrinho}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item.img}` }}
                                style={{ width: 70, height: 100 }}
                            ></Image>
                            <View style={styles.containerInfoLivro}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nomeLivro}</Text>
                                <Text style={{ fontSize: 17 }}>{item.autorDTO.nomeAutor}</Text>
                                <Text style={{ fontSize: 17 }}>{item.editoraDTO.nomeEditora}</Text>
                            </View>
                            <View>
                                <View style={styles.containerPrecoLivro}>
                                    <View style={styles.btnQtd}>
                                        <TouchableOpacity>
                                            <Text style={styles.txtBtnQtd}>-</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.txtBtnQtd}>2</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.txtBtnQtd}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 12 }}>R$ 20,00</Text>
                                    <TouchableOpacity>
                                        <FontAwesome5 name="trash" size={20} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                >

                </FlatList>
            </View>
            <View style={styles.containerTotal}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total</Text>
                <Text>R$ 000,00</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C2DEDC',
        flex: 1,
    },
    containerInfo: {
        flex: 1,
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'center',
        paddingTop: 20,
    },
    txtCarrinho: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    qtd_lixeira: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
    },
    containerLivros: {
        flex: 4,
        borderBottomWidth: 2,
        borderBottomColor: "#116a7b",
        borderTopWidth: 2,
        borderTopColor: "#116a7b",
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    containerLivroCarrinho: {
        flex: 1,
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    containerInfoLivro: {
        flex: 2,
        paddingLeft: 20,
    },
    containerPrecoLivro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btnQtd: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#116a7b',
        gap: 20,
        borderRadius: 20,
        padding: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    txtBtnQtd: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },
    containerTotal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
    }
})
