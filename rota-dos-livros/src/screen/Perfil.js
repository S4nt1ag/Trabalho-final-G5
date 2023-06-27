import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Perfil() {

    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
                <Ionicons name="person-circle" size={130} color="#1D1D1D" />

                <View style={styles.user}>
                    <Text><Text style={{fontWeight: 'bold'}}>User:</Text> user</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> user@mail.com</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.buttonContent}>
                        <Text style={{color: "#fff", fontWeight: 'bold'}}>Logout</Text>
                        <MaterialIcons name="logout" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C2DEDC",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    user: {
        backgroundColor: "#ECE5C7",
        padding: 30,
        width: '90%',
        borderRadius: 10,
        gap: 10
    },
    button: {
        backgroundColor: "#116A7B",
        width: 150,
        padding: 15,
        marginTop: 20,
        borderRadius: 10
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    }
})