import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Home from '../screen/Home';
import AllEditorasScreen from '../screen/AllEditorasScreen'
import { Favoritos } from '../screen/Favoritos';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
            <Tab.Navigator
                initialRouteName="Livraria"
                screenOptions={{
                    tabBarActiveTintColor: '#ECE5C7',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#116A7B",
                        borderTopWidth: 0,
                        height: 60
                    },
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Início"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Editoras"
                    component={AllEditorasScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Favoritos"
                    component={Favoritos}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="heart" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Carrinho"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cart" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
    )
}