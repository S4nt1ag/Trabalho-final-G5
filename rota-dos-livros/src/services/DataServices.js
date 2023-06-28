import * as SecureStore from 'expo-secure-store';


const save = async (key, value) => {
  let objetoAtual = null;
    let arrayObjetos = [];

    objetoAtual = await SecureStore.getItemAsync(key);
    objetoAtual = JSON.parse(objetoAtual);

    if (objetoAtual !== null && objetoAtual !== undefined) {
        arrayObjetos.push(objetoAtual);
        arrayObjetos.push(value);
        await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
        console.log("[" + arrayObjetos + "]")
    }
    else {
        arrayObjetos.push(value);
        await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
        console.log(" [" + arrayObjetos + "]")
    }
}

const deleteItem = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

async function getValueFor(key) {
  let result = null;

  try {
    result = await SecureStore.getItemAsync(key);

  } catch (error) {
    console.log('Erro ao recuperar dados 1' + error);
  }

  return JSON.parse(result);
}

export { save, getValueFor, deleteItem };