import { Text, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { colors } from './style'

const { height, width } = Dimensions.get('screen')


export default function Reloj() {
    return (
        <View style={styles.container}>
            <View style={styles.circuloContenedor}>
                <Text style={{ color: colors.color1, opacity: 0.6 }}>TEMPORIZADOR</Text>

                <View style={styles.contendorTemporizador}>
                    <View style={styles.counterContainer}>
                        <Text style={styles.txtCounter}>78</Text>
                        <Text style={{ color: colors.color1, opacity: 0.6 }}>min</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Text style={styles.txtCounter}>78</Text>
                        <Text style={{ color: colors.color1, opacity: 0.6 }}>sec</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Text style={styles.txtCounter}>78</Text>
                        <Text style={{ color: colors.color1, opacity: 0.6 }}>mec</Text>
                    </View>
                </View>
                <View></View>
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
    contendorTemporizador: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'
    },
    counterContainer: {
        alignItems: 'center',
    },
    txtCounter: {
        fontSize: 30,
        color: colors.color1
    }
})