import * as SecureStore from 'expo-secure-store';


const save = async (key, value) => {
  let objetoAtual = null;
  let arrayObjetos = [];

  objetoAtual = await SecureStore.getItemAsync(key);

  if (objetoAtual !== null && objetoAtual !== undefined) {
    arrayObjetos = JSON.parse(objetoAtual);

    if (!arrayObjetos.includes(value)) {
      arrayObjetos.push(value);
      await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
    }
  } else {
    arrayObjetos.push(value);
    await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
  }

  console.log("[" + arrayObjetos + "]");
};

const saveCarrinho = async (key, value) => {
  let objetoAtual = null;
  let arrayObjetos = [];

  objetoAtual = await SecureStore.getItemAsync(key);

  if (objetoAtual !== null && objetoAtual !== undefined) {
    arrayObjetos = JSON.parse(objetoAtual);

    if (!arrayObjetos.includes(value)) {
      arrayObjetos.push(value);
      await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
    }
  } else {
    arrayObjetos.push(value);
    await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
  }

  console.log("[" + arrayObjetos + "]");
};

const deleteItem = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

const deleteAllFavoritos = async () => {
  await SecureStore.deleteItemAsync('favoritos');
  console.log("favoritos limpo")
};

const deleteAllCarrinho = async () => {
  await SecureStore.deleteItemAsync('carrinho');
  console.log("carrinho limpo")
};

async function getValueFor(key) {
  let result = null;

  try {
    result = await SecureStore.getItemAsync(key);

  } catch (error) {
    console.log('Erro ao recuperar dados 1' + error);
  }

  return result;
}

const deleteItemUni = async (key, value) => {
  let objetoAtual = null;
  let arrayObjetos = [];

  objetoAtual = await SecureStore.getItemAsync(key);

  if (objetoAtual !== null && objetoAtual !== undefined) {
    arrayObjetos = JSON.parse(objetoAtual);

    const index = arrayObjetos.indexOf(value);
    if (index !== value) {
      arrayObjetos.splice(index, 1);
      await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
    }
  }

  console.log("[" + arrayObjetos + "]");
};

const saveTotalQntd = async (value) => {
  let qntdTotal = null
  qntdTotal = await SecureStore.getItemAsync('qntdTotal');

  await SecureStore.setItemAsync('qntdTotal', JSON.stringify(value))
}

const deleteQntdTotal = async () => {
  await SecureStore.deleteItemAsync('qntdTotal');
  console.log("qntdTotal resetado")
}

export { save, getValueFor, deleteItem, deleteItemUni, deleteAllFavoritos, saveCarrinho, deleteAllCarrinho, saveTotalQntd, deleteQntdTotal };