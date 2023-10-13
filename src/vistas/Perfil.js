import { Text, StyleSheet, View, SafeAreaView, Pressable, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';



export default function Perfil() {

    const { isLoading, tokenUsuario, logout, userInfo } = useContext(AuthContext)

    const salir = () => {
        Alert.alert(
            'Cerrar Sesion',
            `Confirma salir de sesion?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        logout();
                    }
                }
            ]
        );
    }

    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <View >
                <View style={styles.containerIntroduccion}>
                    <Text style={styles.txtIntroduccion}>Perfil</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containerCuerpo}>
                        <Image style={styles.imagen} source={require('../../assets/imgHome/perfil.png')} />
                        <Text style={{ color: 'black', fontSize: 24, fontFamily: 'Roboto-Bold' }}>{userInfo.nombre}</Text>
                        <Text style={{ color: 'black', fontSize: 17, marginTop: 10, fontFamily: 'Roboto-regular' }}>{userInfo.email}</Text>
                        <Text style={{ color: 'black', fontSize: 17, marginTop: 10, fontFamily: 'Roboto-regular' }}>{userInfo.edad} Años de edad</Text>
                        <View style={{ marginTop: 70 }}>
                            <TouchableOpacity
                                style={styles.contenedorLogout}
                                onPress={salir}>
                                <Text style={styles.txtInferiores}>Cerrar Sesión </Text>
                                <AntDesign name="logout" size={24} color="white" />
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
    txtIntroduccion: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginRight: 70,
        marginLeft: 60
    },
    containerCuerpo: {
        alignItems: 'center',
    },
    imagen: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginVertical: 30,
    },
    contenedorLogout: {
        marginTop: 20,
        backgroundColor: '#6A71B9',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    txtInferiores: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        padding: 10
    }

})

