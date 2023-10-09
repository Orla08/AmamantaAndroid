import { Text, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { colors } from './style'

const { height, width } = Dimensions.get('screen')


export default function Reloj() {
    return (
        <View style={styles.container}>
            <View style={styles.circuloContenedor}>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circuloContenedor: {
        // height: 300,
        // width: 300,
        height: width - 100,
        width: width - 100,
        borderRadius: width - 100,
        backgroundColor: colors.color4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})