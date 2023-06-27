import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { AxiosInstance } from "../api/AxiosInstance";
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

export const AllEditorasScreen = () => {

    const [dataEditora, setDataEditora] = useState();
    const { dadosUsuario } = useContext(DataContext);

    const navigation = useNavigation();

    useEffect(() => {
        getEditoras()
    }, [])

    const getEditoras = async () => {
        await AxiosInstance.get("/editoras",
            {
                headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
            }).then(result => {
                setDataEditora(result.data)
            }).catch(error => {
                console.log("Ocorreu um erro ao recuperar os dados: " + error)
            })
    }

    const Item = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Editora', item)}>
                <Image
                    style={styles.imagem}
                    source={{ uri: `data:image/png;base64,${item.img}` }}
                />
            </TouchableOpacity>
            <Text style={styles.nome}>{item.nomeEditora}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                contentContainerStyle={styles.list}
                data={dataEditora}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.codigoEditora}
                horizontal={true}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },

    imagem: {
        width: 70,
        height: 70,
        borderRadius: 50
    },

    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    list: {
        padding: 20,
        gap: 30,
    },
})