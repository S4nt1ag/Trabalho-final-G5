import * as SecureStore from 'expo-secure-store';


async function save(key, value) {

  try {
      let itens = await getValueFor(key);

      if (itens == null) {
          itens = [value]
          await SecureStore.setItemAsync(key, JSON.stringify(itens));
      } else {
          let newItens = JSON.parse(itens)

          if (!newItens.includes(value))
              newItens.push(value)

          await SecureStore.setItemAsync(key, JSON.stringify(newItens));
      }
  } catch (error) {
      console.log("Erro ao persistir dados:" + error);
  }

  let valores = await getValueFor(key);
  console.log("Valores:" + JSON.stringify(valores));
}

const deleteItem = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

async function getValueFor(key) {
  let result = null;

  try {
    result = await SecureStore.getItemAsync(key);

  } catch (error) {
    console.log('Erro ao recuperar dados' + error);
  }

  return JSON.parse(result);
}

export { save, getValueFor, deleteItem };