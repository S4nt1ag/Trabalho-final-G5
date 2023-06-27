import { View, Text, StyleSheet } from "react-native"
import LivrosContainer from "../components/LivrosContainer"
import { Card } from '@rneui/themed';
import { ScrollView} from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import EditorasContainer from '../components/EditorasContainer'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
    return (
        <ScrollView style={{ backgroundColor: '#C2DEDC' }} showsVerticalScrollIndicator={false}>
            
            <View style={styles.container}>
                <EditorasContainer></EditorasContainer>

                <View style={styles.wrapperTitle}>
                    <FontAwesome5 name="book" size={20} color="#116A7B" />
                    <Text style={styles.title}>Livros</Text></View>

                <LivrosContainer></LivrosContainer>

                <View style={styles.wrapperTitle}>
                    <Entypo name="new" size={20} color="#116A7B" />
                    <Text style={styles.title}>Destaque</Text></View>

                <Card containerStyle={styles.highlight}>
                    <Card.Image
                        style={styles.imagem}
                        source={{
                            uri: ("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1XxCHH2U-Dc6e6hcl0kIWZMujA7ZXcpl4z5UwZeOG_BAWk3TRSl43E6MGrfGVRcHbWzQCmFNA8urGn2AhySo30AGsGnzGyrPfVeGmXuxUJaBKd1VCthHo2E_sRifsDbKlUEQ1znkHahwJ7m3h0sXS1_iIjuolIKot0lNB-0GL2KBlyzJw5feu8PK4/s1920/Livros%20que%20ser%C3%A3o%20publicados%20aqui%20em%202023%20(5).png")
                        }}
                    />
                    <Text style={styles.titleHighlight}>
                        📅 Lançamentos 2023 📅
                    </Text>
                    <Text style={styles.description}>
                        Veja os lançamentos literários que estão por vir neste ano!
                    </Text>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 30,
        backgroundColor: "#C2DEDC"
    },
    title: {
        fontSize: 20,
        fontWeight: 400
    },
    highlight: {
        padding: 5,
        margin: 0,
        backgroundColor: "#116A7B",
        borderRadius: 3,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0
    },
    titleHighlight: {
        color: "#000",
        fontWeight: "bold",
        padding: 5,
        textAlign: "center",
        backgroundColor: "#ECE5C7"
    },
    description: {
        padding: 5,
        textAlign: "center",
        color: "#fff"
    },
    wrapperTitle: {
        borderBottomWidth: 2,
        borderBottomColor: "#116a7b",
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    }
})