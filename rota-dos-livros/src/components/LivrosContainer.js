import { Card } from '@rneui/themed';
import { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { AxiosInstance } from "../api/AxiosInstance";
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../context/DataContext';

export default function LivrosContainer() {
  const [dataLivros, setDataLivros] = useState();
  const [loading, setLoading] = useState(true); 
  const { dadosUsuario } = useContext(DataContext);

  const navigation = useNavigation();

  const getLivros = async () => {
    setLoading(true); 

    await AxiosInstance.get("/livros", {
      headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
    })
      .then(result => {
        setDataLivros(result.data);
      })
      .catch(error => {
        console.log("Ocorreu um erro ao recuperar os dados: " + error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#116A7B" /> 
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teste}
          data={dataLivros}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Livro', item)}>
              <Card containerStyle={styles.cardContainer}>
                <Card.Image
                  style={styles.imagem}
                  source={{ uri: `data:image/jpeg;base64,${item.img}` }}
                />
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagem: {
    width: 140,
    borderRadius: 3,
    height: 200
  },
  teste: {
    flexDirection: 'row',
    padding: 0,
    gap: 35
  },
  title: {
    maxWidth: 140,
    color: "#fff",
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  cardContainer: {
    padding: 0,
    backgroundColor: "#CDC2AE",
    borderRadius: 5,
    height: 200,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    margin: 0
  },
  scrollView: {
    height: 280
  }
});
