import { ScrollView } from "react-native";
import { Text, View, Image, StyleSheet } from "react-native";
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export function Favoritos() {
    return (
        <ScrollView style={{ backgroundColor: "#C2DEDC" }}>

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Meus Favoritos</Text>

                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text>3 livro(s)</Text>
                        <Foundation name="trash" size={20} color="black" />
                    </View>
                </View>

                <View style={styles.favorite}>
                    <Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/I/51feD87yuEL._SY344_BO1,204,203,200_QL70_ML2_.jpg" }}></Image>
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookName}>1984</Text>
                        <Text style={styles.bookAuthor}>Autor: George Orwell</Text>
                    </View>
                    <Entypo name="cross" size={24} color="#fff" style={{alignSelf: 'flex-start'}}/>
                </View>

                <View style={styles.favorite}>
                    <Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/I/51feD87yuEL._SY344_BO1,204,203,200_QL70_ML2_.jpg" }}></Image>
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookName}>1984</Text>
                        <Text style={styles.bookAuthor}>Autor: George Orwell</Text>
                    </View>
                    <Entypo name="cross" size={24} color="#fff" style={{alignSelf: 'flex-start'}}/>
                </View>

                <View style={styles.favorite}>
                    <Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/I/51feD87yuEL._SY344_BO1,204,203,200_QL70_ML2_.jpg" }}></Image>
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookName}>1984</Text>
                        <Text style={styles.bookAuthor}>Autor: George Orwell</Text>
                    </View>
                    <Entypo name="cross" size={24} color="#fff" style={{alignSelf: 'flex-start'}}/>
                </View>

                <View style={styles.favorite}>
                    <Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/I/51feD87yuEL._SY344_BO1,204,203,200_QL70_ML2_.jpg" }}></Image>
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookName}>1984</Text>
                        <Text style={styles.bookAuthor}>Autor: George Orwell</Text>
                    </View>
                    <Entypo name="cross" size={24} color="#fff" style={{alignSelf: 'flex-start'}}/>
                </View>

                <View style={styles.favorite}>
                    <Image style={styles.image} source={{ uri: "https://m.media-amazon.com/images/I/51feD87yuEL._SY344_BO1,204,203,200_QL70_ML2_.jpg" }}></Image>
                    <View style={styles.bookInfo}>
                        <Text style={styles.bookName}>1984</Text>
                        <Text style={styles.bookAuthor}>Autor: George Orwell</Text>
                    </View>
                    <Entypo name="cross" size={24} color="#fff" style={{alignSelf: 'flex-start'}}/>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C2DEDC",
        padding: 30,
        gap: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    header: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#116A7B",
        gap: 10
    },
    favorite: {
        backgroundColor: "#116A7B",
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookName: {
        color: "#fff",
        fontWeight: 'bold'
    },
    bookAuthor: {
        color: "#fff"
    },
    image: {
        width: 60,
        height: 90,
        resizeMode: 'contain'
    },
    bookInfo: {
        justifyContent: 'center'
    }
})