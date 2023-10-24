import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
//import Home from './HomeScreen.js';



const imgLac = require("../../assets/iconos/LacMac.png");

const LactanciaMaterna = () => {
    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.containerIntroduccion}>
                    <TouchableOpacity style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.txtIntroduccion}>Lactancia Materna</Text>
                </View>
                <ScrollView>
                    <View style={{ paddingVertical: 20 }}>
                        <View>
                            <Text style={styles.txt_s}>Mamá estas en una etapa, la
                                cual es uno de los mejores momentos de tu vida.
                            </Text>
                            <Text style={styles.txt_s}>
                                Esta cartilla busca guiarte, dando
                                respuesta a tus dudas e inquietudes
                                y brindándote consejos para este
                                proceso tan importante para ti,
                                como para tu bebé y toda la familia.
                            </Text>
                        </View>
                        <View>
                            <Image
                                style={styles.imagen}
                                source={imgLac}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
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
    },
    iconoAtras: {
        marginTop: 20,
        alignItems: 'flex-start',
        marginTop: 70,
        marginLeft: 20
    },
    txtIntroduccion: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginLeft: 20,
        marginRight: 40
    },
    imagen: {
        width: 309,
        height: 291,
        borderRadius: 20,
        marginHorizontal: 50,
        marginVertical: 30,
        objectFit: 'fill'
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

export default LactanciaMaterna