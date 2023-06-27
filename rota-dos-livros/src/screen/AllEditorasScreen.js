import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { AxiosInstance } from "../api/AxiosInstance";
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

const AllEditorasScreen = ({ navigation }) => {
    const { dadosUsuario } = useContext(DataContext);

    const [dataEditora, setDataEditora] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getEditoras()
    }, [])

    const getEditoras = async () => {
        try {
            const response = await AxiosInstance.get("/editoras", {
                headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
            });
            setDataEditora(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Ocorreu um erro ao recuperar os dados: " + error);
            setIsLoading(false);
        }
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Editora', item)}>
            <View style={styles.item}>
                <Image
                    style={styles.imagem}
                    source={{ uri: `data:image/png;base64,${item.img}` }}
                />
                <Text style={styles.nome}>{item.nomeEditora}</Text>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#116A7B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Editoras</Text>
            <FlatList
                data={dataEditora}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.codigoEditora}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#C2DEDC',
    },

    titulo: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    item: {
        display: 'flex',
        backgroundColor: '#ECE5C7',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },

    imagem: {
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: 'white'
    },

    nome: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        color: '#242323',
    },
})

export default AllEditorasScreen;
