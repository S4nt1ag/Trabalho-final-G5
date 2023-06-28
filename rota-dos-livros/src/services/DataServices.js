import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, serializedValue);
    console.log('Dados salvos com sucesso');
  } catch (error) {
    console.log('Erro ao persistir dados:', error);
  }
}

async function getValueFor(key) {
  let result = null;

  try {
    result = await SecureStore.getItemAsync(key);

  } catch (error) {
    console.log('Erro ao recuperar dados' + error);
  }

  return result;
}

export { save, getValueFor };