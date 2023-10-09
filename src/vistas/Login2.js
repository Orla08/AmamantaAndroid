import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Imputs from '../componentes/imputs/Imputs';
import { OneSignal } from 'react-native-onesignal';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const iconUsuario = require('../../assets/iconos/iconUsuario.png')
const icoEdad = require('../../assets/iconos/edad.png')
const icoEmail = require('../../assets/iconos/iconEmail.png');
const icoContrasena = require('../../assets/iconos/iconContrasena.png');

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/

const Login2 = () => {
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const { activo, success, isLoading, userInfo, login } = useContext(AuthContext);
    //const [isNavigating, setIsNavigating] = useState(false); // Nuevo estado para controlar la navegación




    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm(); //Hacemos un object destructuring en el cual obtenemos dos funciones de la clase useForm()

    console.log(errors);



    useEffect(() => {
        if (success === 'si') {
            //setIsNavigating(true); // Evitar múltiples navegaciones
            xx.navigate('Home'); // Realizar la navegación cuando success sea 'si'
        }
    }, [success]);

    const Login = () => {
        login(email, contrasena)
            .catch(error => {
                // Manejar el error si es necesario
            });
    };



    // const autenticacion = async () => {
    //     try {
    //         const response = await axios.post("http://10.1.80.72/php/login3.php", {
    //             id: id,
    //             email: email,
    //             contrasena: contrasena
    //         });
    //         const device = OneSignal.User.pushSubscription.getPushSubscriptionId();
    //         AsyncStorage.setItem("tokenDispositivo", device);
    //         console.log(device);
    //         console.log(response.data, "1223"); // Verificar la respuesta del servidor en la consola<
    //         const userData = response.data; // Aquí están todos los datos del usuario

    //         if (userData.email == email && userData.contrasena == contrasena) {
    //             setId(userData.identificacion)
    //             await AsyncStorage.setItem("token", "70");
    //             await AsyncStorage.setItem("id", userData.id);
    //             await AsyncStorage.setItem("nombre", userData.nombre);
    //             await AsyncStorage.setItem("edad", userData.edad);
    //             await AsyncStorage.setItem("email", userData.email);
    //             xx.navigate('Home');
    //         } else {
    //             setActivo(true);
    //             console.log("Credenciales incorrectas");
    //         }
    //     } catch (error) {
    //         console.error("Error del Axios" + error);
    //     }
    // };


    const xx = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <View >
                <Image
                    source={require('../../assets/imgHome/AmamantaLogo.png')}
                    style={styles.imgLogo}
                />
                <Text style={styles.txtRegistarse}>Ingresa con tu cuenta o crea una nueva</Text>

                <Imputs
                    imagen={icoEmail}
                    style={{ fontFamily: 'Roboto-Light' }}
                    name="email"
                    placeholder="Email"
                    datos={email}
                    setDatos={setEmail}
                    control={control}
                    rules={{
                        pattern:
                        {
                            value: EMAIL_REGEX,
                            message: "Email Invalido"
                        },
                        required: 'Email Requerido',
                    }}
                />

                <Imputs
                    imagen={icoContrasena}
                    style={{ fontFamily: 'Roboto-Light' }}
                    name="contrasena"
                    placeholder="Contraseña"
                    datos={contrasena}
                    setDatos={setContrasena}
                    secureTextEntry
                    rules={{
                        required: 'Contraseña Requerida',
                        minLength: { value: 5, message: "Contraseña debe contener 5 caracteres minimos" },
                        maxLength: { value: 14, message: "Contraseña debe contener 14 caracteres maximo" }
                    }}
                    control={control}
                />

                {activo && (
                    <Text style={{
                        color: 'red',
                        paddingLeft: 60,
                        fontFamily: 'Roboto-Regular'
                    }}>
                        Email y o contraseña incorrectos
                    </Text>)
                }
                <View>
                    <View >
                        <TouchableOpacity style={styles.btnIngreso}
                            onPress={
                                handleSubmit(Login)
                                //setEnviar(true)
                            }
                        ><Text style={styles.txtInferior}>Ingresar</Text>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity
                        onPress={() => { xx.navigate("Registro") }}
                        style={styles.enlace}
                    >
                        <Text style={[styles.btnEnlaces, { textDecorationLine: 'underline' }]}>Crear una cuenta</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0F7',
        padding: 20,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    imgLogo: {
        width: 280,
        height: 200,
        objectFit: 'fill',
        marginVertical: 50,
        marginHorizontal: 60
    },
    txtRegistarse: {
        fontSize: 30,
        textAlign: 'center',
        color: '#6A71B9',
        marginBottom: 25,
        marginHorizontal: 25,
        fontFamily: 'Roboto-Bold'
    },
    containInputs: {
        marginTop: 10,
        marginBottom: 7,
        marginHorizontal: 50,
        backgroundColor: '#FAD2E0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center'
    },
    inputs: {
        marginLeft: 10,
        width: 210,
        color: 'black'
    },
    iconos: {
        width: 20,
        height: 20,

    },
    btnIngreso: {
        marginTop: 20,
        backgroundColor: '#6A71B9',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 130
    },
    txtInferior: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        padding: 10,
        fontFamily: 'Roboto-Medium'
    },
    enlace: {
        marginTop: 80,
        marginHorizontal: 100,
        //backgroundColor: '#fff'
    },
    btnEnlaces: {
        color: '#FF7BAC',
        fontWeight: '600',
        textAlign: 'center',
        //backgroundColor: '#000'
        /*textDecorationColor: '#FF7BAC' */
    },
})

export default Login2

