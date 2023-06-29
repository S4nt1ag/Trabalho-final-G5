import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { removeItenCart } from '../services/DataServices';

export const ItemCarrinho = (props) => {
    const [qtd, setQtd] = useState(1);
    const [valorUni, setValorUni] = useState(20);

    const decrementarQuantidade = () => {
        if (qtd > 1 && valorUni > 20) {
            setQtd(qtd - 1);
            setValorUni(valorUni - 20);
        }
    };

    const incrementarQuantidade = () => {

        setQtd(qtd + 1);
        setValorUni(valorUni + 20);

    };


    return (
        <View style={styles.containerLivroCarrinho}>
            <Image
                source={{ uri: `data:image/jpeg;base64,${props.imagem}` }}
                style={{ width: 70, height: 100 }}
            />
            <View style={styles.containerInfoLivro}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.nomeLivro}</Text>
                <Text style={{ fontSize: 17 }}>{props.nomeAutor}</Text>
                <Text style={{ fontSize: 17 }}>{props.editora}</Text>
            </View>
            <View>
                <View style={styles.containerPrecoLivro}>
                    <View style={styles.btnQtd}>
                        <TouchableOpacity onPress={decrementarQuantidade}>
                            <Text style={styles.txtBtnQtd}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txtBtnQtd}>{qtd}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={incrementarQuantidade}>
                            <Text style={styles.txtBtnQtd}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 12 }}>
                        R$ {valorUni},00
                    </Text>
                    <TouchableOpacity>
                        <FontAwesome5 name="trash" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    containerLivroCarrinho: {
        flex: 1,
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
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
})