import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'


const iconHistorial = require("../../assets/imgHome/historial.jpeg")


export default function Historial() {
    const xx = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.containerIntroduccion}>
                    <TouchableOpacity style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.txtIntroduccion}>Historial</Text>
                </View>
                <ScrollView>
                    <View style={styles.contenedorCards2}>
                        <View>
                            <TouchableOpacity
                                onPress={() => { xx.navigate("Prueba") }}
                            >
                                <View style={[styles.containerImg,]}>
                                    <Image
                                        source={iconHistorial}
                                        style={styles.imgCards2}
                                    />
                                </View>
                                <Text style={styles.txt2}>Consulta total {'\n'}de lactancia</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => { xx.navigate("Historial1") }}
                            >
                                <View style={[styles.containerImg,]}>
                                    <Image
                                        source={iconHistorial}
                                        style={styles.imgCards2}
                                    />
                                </View>
                                <Text style={styles.txt2}>Consulta total{'\n'}por seno</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => { xx.navigate("Historial2") }}
                            >
                                <View style={[styles.containerImg,]}>
                                    <Image
                                        source={iconHistorial}
                                        style={styles.imgCards2}
                                    />
                                </View>
                                <Text style={styles.txt2}>Consulta total {'\n'}por seno y fecha</Text>
                            </TouchableOpacity>
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
        display: 'flex',
    },
    iconoAtras: {
        alignItems: 'flex-start',
        marginTop: 70
    },
    txtIntroduccion: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginRight: 120,
        marginLeft: 90,
        //marginHorizontal:80,
        fontWeight: '600',
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
    },
    imgCards2: {
        width: 100,
        height: 93,
        objectFit: 'fill',
    },
    txt2: {
        paddingTop: 6,
        fontSize: 15,
        textAlign: 'center',
        color: '#595858',
        lineHeight: 12,
        fontFamily: 'Roboto-Regular'
    },
    contenedorCards2: {
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 20,
        paddingVertical: 50,
        alignItems: 'center',
        height: 600,
    }

})
