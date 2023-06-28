import { LoginScreen } from './src/screen/LoginScreen';
import Tabs from './src/tabs/Tabs';
import { EditoraScreen } from './src/screen/EditoraScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './src/context/DataContext';
import LivroScreen from './src/screen/LivroScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={
            {
              headerStyle: {
                backgroundColor: "#116A7B",
                borderBottomWidth: 0,
              },
              headerTintColor: "#fff"
            }}>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          
          <Stack.Screen options={{
            headerLeft: null
          }}
            name="Livraria" component={Tabs} />

          <Stack.Screen name="Livro" component={LivroScreen} />
          <Stack.Screen name="Editora" component={EditoraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;