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
        <Text style={styles.txtButton}>Login</Text>
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
    height: 42,
    width: 330,
    marginTop: 41,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#D9D9D9',
    color: '#000'
  },
  senhaContainer: {
    position: 'relative',
    width: 330,
  },
  inputSenha: {
    marginTop: 41,
    height: 42,
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#D9D9D9',
  },
  olhoButton: {
    position: 'absolute',
    right: 10,
    top: 49,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    color: '#000',
    width: 134,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    marginTop: 41,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  txtButton: {
    color: '#000',
  },
  erro: {
    color: 'red',
    marginTop: 10,
  },
});