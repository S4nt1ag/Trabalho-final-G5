import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { AxiosInstance } from '../api/AxiosInstance';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

export const EditoraScreen = ({ navigation, route }) => {

    const { dadosUsuario } = useContext(DataContext);

    const editora = route.params;
    const livro = route.params.listaLivrosDTO;

    async function goToLivros(livro) {

        await AxiosInstance.get(
            `livros/${livro.codigoLivro}`,
            { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }
        ).then(response => {
            const livroResponse = response.data;

            const livroObj = {
                img: livroResponse.imagem,
                nomeLivro: livroResponse.nomeLivro,
                autorDTO: livroResponse.autorDTO,
                editoraDTO: livroResponse.editoraDTO,
                dataLancamento: livroResponse.dataLancamento,
                codigoIsbn: livroResponse.codigoIsbn
            }

            navigation.navigate('Livro', livroObj);
        }).catch(err => {
            console.log('erro na requsiição de livros: ' + err);
        })
    }

    return (
        <ScrollView style={{backgroundColor: '#C2DEDC'}} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.containerEditora}>
                    <Image
                        style={styles.logoEditora}
                        source={{ uri: `data:image/png;base64,${editora.img}` }}
                    />
                    <Text style={styles.nomeEditora}>{editora.nomeEditora}</Text>
                </View>

                <View style={styles.containerLivros}>
                    {livro.map((livro) => (
                        <TouchableOpacity key={livro.codigoLivro} onPress={() => goToLivros(livro)}>
                            <View style={styles.cardBook}>
                                <Image
                                    style={styles.imagemLivro}
                                    source={{ uri: `data:image/png;base64,${livro.imagem}` }}
                                />
                                <Text style={styles.nomeLivro}>{livro.nomeLivro}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C2DEDC',
        alignItems: 'center'
    },

    containerEditora: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginBottom: 50,
        width: '60%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ECE5C7',
        shadowColor: '#5e5c50',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },

    logoEditora: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },

    nomeEditora: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        color: '#242323',
        textAlign: 'center'
    },

    containerTituloLivros: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    tituloLivros: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#242323',
    },

    containerLivros: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardBook: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        gap: 20
    },

    imagemLivro: {
        width: 140,
        height: 200,
        borderRadius: 5,
    },

    nomeLivro: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#242323',
    },
});