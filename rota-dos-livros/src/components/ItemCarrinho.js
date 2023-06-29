import React, { useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { removeItenCart, deleteItemUni } from '../services/DataServices';
import { CartContext } from '../context/CartContext';

export const ItemCarrinho = (props) => {


    const [qtd, setQtd] = useState(1);
    const [valorUni, setValorUni] = useState(20);
    const { addToCart, qntdCarrinho, removeFromCart } = useContext(CartContext)

    const decrementarQuantidade = () => {
        if (qtd > 1 && valorUni > 20) {
            setQtd(qtd - 1);
            setValorUni(valorUni - 20);
            removeFromCart(1)
            console.log(qntdCarrinho)
        }
    };

    const incrementarQuantidade = () => {
        setQtd(qtd + 1);
        setValorUni(valorUni + 20);
        addToCart()
        console.log(qntdCarrinho)
    };


    return (
        <View style={styles.containerLivroCarrinho}>
            <Image
                source={{ uri: `data:image/jpeg;base64,${props.imagem}` }}
                style={{ width: 70, height: 100 }}
            />
            <View style={styles.containerInfoLivro}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{props.nomeLivro}</Text>
                <Text style={{ fontSize: 13 }}>{props.nomeAutor}</Text>
                <Text style={{ fontSize: 13 }}>{props.editora}</Text>
            </View>
            <View>
                <View style={styles.containerPrecoLivro}>

                    <View style={styles.qntButton}>
                        <TouchableOpacity onPress={() => decrementarQuantidade()}>
                            <Entypo name="minus" size={16} color="#fff" />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#fff" }}>{qtd}</Text>
                        </View>

                        <TouchableOpacity onPress={() => incrementarQuantidade()}>
                            <Entypo name="plus" size={16} color="#fff" />
                        </TouchableOpacity>

                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                        R$ {valorUni},00
                    </Text>
                    <TouchableOpacity onPress={() => deleteItemUni('carrinho', props.id)}>
                        <Foundation name="trash" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    containerLivroCarrinho: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    containerInfoLivro: {
        flex: 2,
    },
    containerPrecoLivro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    txtBtnQtd: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: '100%'
    },
    qntButton: {
        backgroundColor: '#116a7b',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        gap: 20,
        borderRadius: 5
    }
})