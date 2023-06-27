import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { AxiosInstance } from '../api/AxiosInstance';
import { DataContext } from '../context/DataContext';

export const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const { armazenarDadosUsuario } = useContext(DataContext);

  const handleLogin = async () => {
    try {
      const resultado = await AxiosInstance.post('/auth/signin', {
        username: usuario,
        password: senha
      });

      if (resultado.status === 200) {
        console.log('deu certo');
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);

        navigation.navigate('Livraria');
      } else {
        console.log('erro');
        
      }
    } catch (error) {
      console.log('erro: ' + error);
      setErro('Usuário ou senha incorretos');
    }
  };

  const alternarVisibilidadeSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsuario}
        value={usuario}
        placeholder="Usuário"
      />
      <View style={styles.senhaContainer}>
        <TextInput
          style={styles.inputSenha}
          onChangeText={setSenha}
          value={senha}
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
        />
        <TouchableOpacity style={styles.olhoButton} onPress={alternarVisibilidadeSenha}>
          <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.txtButton}>Entrar</Text>
      </TouchableOpacity>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#116a7b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  input: {
    height: 40,
    width: 270,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#cdc2ae',
  },
  senhaContainer: {
    position: 'relative',
    width: 270,
  },
  inputSenha: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#cdc2ae',
  },
  olhoButton: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#000',
    color: '#fff',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  txtButton: {
    color: '#fff',
  },
  erro: {
    color: 'red',
    marginTop: 10,
  },
});