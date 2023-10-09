import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
const imgIntrouccion = require('../../assets/home/madre_hijo.jpg')
import AntDesign from 'react-native-vector-icons/AntDesign'
//import {Video, ResizeMode} from 'expo-av';
import VideoPlayer from 'react-native-video-player'

const Separator = () => {
    return <View style={styles.separator} />;
};

const Videos = () => {


    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={[styles.containerIntroduccion]}>
                    <Text style={styles.txtBienvenida}>Videos tutoriales</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 30, marginTop: 10 }}>
                        <Text
                            style={{ color: '#595858', fontFamily: 'Roboto-Medium', fontSize: 20, textAlign: 'center', marginBottom: 15 }}
                        >Formas para alimentar al Bebé
                        </Text>
                        <VideoPlayer
                            video={require('../../assets/videos/video.mp4')}
                            videoWidth={screenWidth} // Establece el ancho al ancho de la pantalla
                            videoHeight={screenHeight * 0.3} // Establece la altura como el 60% de la pantalla
                            style={{ borderRadius: 30 }}
                            fullScreenOnLongPress={true}
                            fullscreen={true}
                        />
                        <Separator />
                    </View>
                    <View style={{ paddingHorizontal: 30, marginTop: 5 }}>
                        <Text
                            style={{ color: '#595858', fontFamily: 'Roboto-Medium', fontSize: 20, textAlign: 'center', marginBottom: 15 }}
                        >Tips Para Dormir al bebé
                        </Text>
                        <VideoPlayer
                            video={require('../../assets/videos/video.mp4')}
                            videoWidth={screenWidth} // Establece el ancho al ancho de la pantalla
                            videoHeight={screenHeight * 0.3} // Establece la altura como el 60% de la pantalla
                            style={{ borderRadius: 30 }}
                        />
                        <Separator />
                    </View>
                    <View style={{ paddingHorizontal: 30, marginTop: 5, paddingBottom: 180 }}>
                        <Text
                            style={{ color: '#595858', fontFamily: 'Roboto-Medium', fontSize: 20, textAlign: 'center', marginBottom: 15 }}
                        >¿Por qué el bebé duerme tanto?
                        </Text>
                        <VideoPlayer
                            video={require('../../assets/videos/video.mp4')}
                            videoWidth={screenWidth} // Establece el ancho al ancho de la pantalla
                            videoHeight={screenHeight * 0.3} // Establece la altura como el 60% de la pantalla
                            style={{ borderRadius: 30 }}
                        />
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
        flexDirection: 'row'
    },
    txtBienvenida: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        fontFamily: 'Roboto-Bold'
    },
    contenedorVideos: {
        alignItems: 'center',
        paddingTop: 20
    },
    separator: {
        height: 1, // Altura del separador
        backgroundColor: '#ffadc6', // Color del separador
        marginVertical: 30, // Margen vertical para ajustar el espacio,
        marginHorizontal: 10,
        opacity: 0.3
    },
})

export default Videos