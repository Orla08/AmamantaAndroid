import { StyleSheet, Text, View, Image, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'

//SafeAreaView solo es en iphone

const imgIntrouccion = require("../../assets/imgHome/Introduccion2.jpeg");

function Introduccion() {
    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.containerIntroduccion}>
                    <Pressable style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.txtIntroduccion}>Introducción</Text>
                </View>
                <View>
                    <Image
                        style={styles.imagen}
                        source={imgIntrouccion}
                    />
                </View>
                <View>
                    <Text style={styles.txt_s}>Mamá estas en una etapa, la
                        cual es uno de los mejores momentos de tu vida.
                    </Text>
                    <Text style={styles.txt_s}>
                        Esta cartilla busca guiarte, dando respuesta a tus dudas e inquietudes y brindándote consejos para este
                        proceso tan importante para ti, como para tu bebé y toda la familia.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerIntroduccion: {
        backgroundColor: '#ffadc6',
        height: 130,
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        display: 'flex',
    },
    iconoAtras: {
        alignItems: 'flex-start',
        marginTop: 70,
        marginLeft: 20
    },
    txtIntroduccion: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginRight: 85,
        marginLeft: 60,
        //marginHorizontal:80,
        fontWeight: '600',
    },
    imagen: {
        backgroundColor: '#000',
        width: 300,
        height: 230,
        borderRadius: 20,
        marginHorizontal: 50,
        marginVertical: 30,
        objectFit: 'fill',
    },
    txt_s: {
        padding: 2,
        fontSize: 20,
        marginHorizontal: 50,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#595858',
        lineHeight: 19,
        fontFamily: 'Roboto-Regular'
    }

})

export default Introduccion