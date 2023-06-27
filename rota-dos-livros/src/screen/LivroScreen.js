import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const LivroScreen = ({ navigation, route }) => {
  const livroData = route.params;
  const [loading, setLoading] = useState(false);

  const dataLancamento = new Date(livroData.dataLancamento);
  const dia = dataLancamento.getDate();
  const mes = dataLancamento.getMonth() + 1;
  const ano = dataLancamento.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  return (
    <View style={styles.container}>
      <View style={styles.cardLivro}>
        <View style={styles.cardImagem}>
          <Image resizeMode="contain" style={styles.tinyLogo} source={{ uri: `data:image/jpeg;base64,${livroData.img}` }} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.tituloLivro}>{livroData?.nomeLivro}</Text>
          <Text style={styles.autorLivro}>
            <Text style={{ fontWeight: 'bold' }}>Autor:</Text> {livroData?.autorDTO?.nomeAutor}
          </Text>
          <Text style={styles.editoraLivro}>
            <Text style={{ fontWeight: 'bold' }}>Editora:</Text> {livroData?.editoraDTO?.nomeEditora}
          </Text>
          <Text style={styles.codigoLivro}>
            <Text style={{ fontWeight: 'bold' }}>ISBN:</Text> {livroData?.codigoIsbn}
          </Text>
          <Text style={styles.dataLancamento}>
            <Text style={{ fontWeight: 'bold' }}>Data de Lançamento:</Text> {dataFormatada}
          </Text>
        </View>
      </View>
      <View style={styles.containerButao}>
        <TouchableOpacity style={styles.btnCarrinho}>
          {loading ? (
            <ActivityIndicator size="large" color="#116A7B" />
          ) : (
            <>
              <Text style={styles.txtBtnCarrinho}>Adicionar ao Carrinho</Text>
              <FontAwesome5 name="shopping-cart" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFavoritos}>
          <Text style={styles.txtBtnFavoritos}>Adicionar aos Favoritos</Text>
          <FontAwesome5 name="heart" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2DEDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLivro: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
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
  cardImagem: {
    flex: 2,
    marginBottom: 10,
    width: 320,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  tinyLogo: {
    width: 250,
    height: 300,
  },
  tituloLivro: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  editoraLivro: {
    fontSize: 15,
  },
  containerButao: {
    flex: 1,
  },
  btnCarrinho: {
    backgroundColor: '#116A7B',
    color: '#fff',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  txtBtnCarrinho: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnFavoritos: {
    backgroundColor: '#ECE5C7',
    color: '#fff',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  txtBtnFavoritos: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LivroScreen;
