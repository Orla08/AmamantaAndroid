import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Pressable, Alert, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import Lap from '../componentes/Lap';
import Reloj from '../componentes/Reloj';
import Controladores from '../componentes/Controladores';
import { colors } from '../componentes/style';

const { height, width } = Dimensions.get('screen')


function Temporizador() {
    const xx = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.containerIntroduccion}>
                <Pressable style={styles.iconoAtras} onPress={() => { xx.navigate("Home") }}>
                    <AntDesign name="left" size={24} color="white" />
                </Pressable>
                <Text style={styles.txtBienvenida}>Cronómetro</Text>
            </View>
            <View style={styles.contenedor2}>
                <View style={{ flex: 45 }}>
                    <Reloj />
                </View>
                <View style={{ flex: 45 }}>
                    <Lap />
                </View>
                <View style={{ flex: 10 }}>
                    <Controladores />
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color1,
    },
    contenedor2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    containerIntroduccion: {
        backgroundColor: colors.color2,
        height: 130,
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconoAtras: {
        marginTop: 60,
    },
    txtBienvenida: {
        fontSize: 30,
        color: colors.color1,
        textAlign: 'center',
        marginTop: 55,
        fontWeight: '600',
        marginHorizontal: 80,
    },
    m: {}
})


export default Temporizador