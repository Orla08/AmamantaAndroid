import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const imgSenoIzquier = require('../../assets/iconos/senIzquierdo.png')
const imgSenoDerecho = require('../../assets/iconos/senDerecho.png')


export default function Historial1() {

    const [idUser, setIdUser] = useState('');
    const [seno, setSeno] = useState('');
    const [sumaTiempo, setSumaTiempo] = useState('');
    const [datos, setDatos] = useState([]);
    const [activo, setActivo] = useState(false)

    const getDatosSesion = async () => { //En esta funcion asincrona obtenemos la identificacion
        try {
            const id = await AsyncStorage.getItem('id');
            setIdUser(id || '0'); //Y se la seteamos a el state de ID para que cuando se ejecute la funcion de ingreso de datos ya tenga el id que se necesita enviar
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
    }, []);

    const ingresoDatos = async () => {
        try {
            const response = await axios.post("http://10.1.80.133/php/historial2.php", {
                idUser: idUser,
                seno: seno,
            });
            console.log(response.data.sumaTiempo);
            console.log(response.data.registros);
            if (response.data.result === "success") {
                setSumaTiempo(response.data.sumaTiempo);
                setDatos(response.data.registros)
            } else {
                console.log("Error del try");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activo) {
            ingresoDatos()
        }
    }, [seno, activo])

    const TableHeader = () => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Seno</Text>
            <Text style={[styles.cell, styles.header]}>Tiempo</Text>
            <Text style={[styles.cell, styles.header]}>Fecha</Text>
        </View>
    );




    const xx = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.containerIntroduccion}>
                <TouchableOpacity style={styles.iconoAtras}
                    onPress={() => { xx.navigate("Home") }}>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtIntroduccion}>Historial</Text>
            </View>

            <View style={{ flex: 1, }}>
                <View style={{ flex: 40, alignItems: 'center' }}>
                    <Text style={{ color: 'black' }}>ajsdjad</Text>
                </View>
                <View style={{ flex: 60, }}>
                    <Text style={{ color: 'black' }}>ajsdjad</Text>
                </View>
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
    },
    imagen: {
        width: 140,
        height: 250,
        marginTop: 30,
        marginBottom: 5,
        objectFit: 'fill',
    },
    imagen2: {
        width: 140,
        height: 250,
        marginTop: 30,
        marginBottom: 5,
        //transform:[{scaleX:-1}],
        objectFit: 'fill',
    },
    containerImg: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container2: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    contenedorLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF0F7',
        color: 'black'
    }, row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffadc6',
        color: 'black'
    },

})


// <View style={styles.containerImg}>
//     <View>
//         <TouchableOpacity
//             onPress={() => {
//                 setSeno('izquierdo')
//                 setActivo(true);

//             }
//             }
//             style={[{ paddingLeft: 57 }]}
//         >
//             <Image
//                 style={styles.imagen}
//                 source={imgSenoIzquier}
//             />
//         </TouchableOpacity>
//     </View>
//     <View>
//         <TouchableOpacity
//             onPress={() => {
//                 setSeno('derecho')
//                 setActivo(true);
//             }
//             }
//             style={[{ paddingRight: 57 }]}
//         >
//             <Image
//                 style={styles.imagen2}
//                 source={imgSenoDerecho}
//             />
//         </TouchableOpacity>
//     </View>
// </View>