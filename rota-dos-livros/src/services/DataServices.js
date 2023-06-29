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
    objetoAtual = JSON.parse(objetoAtual);

    if (objetoAtual !== null && objetoAtual !== undefined) {
        arrayObjetos.push(objetoAtual);
        arrayObjetos.push(value);
        await SecureStore.setItemAsync(key, JSON.stringify(arrayObjetos));
    }
    else {
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

// const deleteId = async (key,value) => {

//   let object = await SecureStore.getItemAsync(key);
//   object = JSON.parse(object)
//   console.log(object)

//   if(object.includes(value)) {
//     let i = object.indexOf(value)
//     object.splice(i, 1)
//     await SecureStore.setItemAsync(key, JSON.stringify(object));
//   } else {
//     console.log(false)
//   }
// }

export { save, getValueFor, deleteItem, deleteAllFavoritos, saveCarrinho, deleteAllCarrinho };