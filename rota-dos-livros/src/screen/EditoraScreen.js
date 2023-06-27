import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
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
    },

    containerEditora: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50,
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '60%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ECE5C7',
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
        width: "80%",
        borderRadius: 5,
    },

    imagemLivro: {
        width: 140,
        height: 200,
        borderRadius: 5,
    },

    nomeLivro: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#242323',
    },
});