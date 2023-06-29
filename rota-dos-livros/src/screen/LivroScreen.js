import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { save, getValueFor, saveCarrinho, saveTotalQntd } from '../services/DataServices';
import { CartContext } from '../context/CartContext';

const LivroScreen = ({ navigation, route }) => {
  const livroData = route.params;
  const { addToCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false);

  //=====================formataçao data = ==================================================
  const dataLancamento = new Date(livroData.dataLancamento);
  const dia = dataLancamento.getDate();
  const mes = dataLancamento.getMonth() + 1;
  const ano = dataLancamento.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  //==========================================================================================

  const handleAddToFavorites = async (key, value) => {
    let livreId = livroData?.codigoLivro;
    console.log("id " + livreId)

    await save(key, value);
    console.log("value " + key + " " + value)

  };

  const handleAddToCarrinho = async (key, value) => {
    let livreId = livroData?.codigoLivro;
    console.log("id " + livreId)

    await saveCarrinho(key, value);
    addToCart()
    console.log("value " + key + " " + value)
  };

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
        <TouchableOpacity style={styles.btnCarrinho} onPress={() => { handleAddToCarrinho("carrinho", livroData?.codigoLivro) }}>
          {loading ? (
            <ActivityIndicator size="large" color="#116A7B" />
          ) : (
            <>
              <Text style={styles.txtBtnCarrinho}>Adicionar ao Carrinho</Text>
              <FontAwesome5 name="shopping-cart" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnFavoritos} onPress={() => { handleAddToFavorites("favoritos", livroData?.codigoLivro) }}>
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
    padding: 15
  },
  cardLivro: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    alignItems: 'center',
    gap: 5,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  tituloLivro: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center'
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
