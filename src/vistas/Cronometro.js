import { View, Text, StyleSheet, Pressable, ScrollView, Image, Alert, TouchableOpacity, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import BackgroundTimer from 'react-native-background-timer';
import { useCronometro } from '../vistas/CronometroContext'
import { AuthContext } from '../context/AuthContext';




const img = require('../../assets/tonykroos.jpg')
const iconStart = require('../../assets/iconos/boton-de-play.png')
const iconPausa = require('../../assets/iconos/pausa.png')
const iconStop = require('../../assets/iconos/boton-detener.png')
const imgSenoIzquier = require('../../assets/iconos/senIzquierdo.png')
const imgSenoDerecho = require('../../assets/iconos/senDerecho.png')

const Cronometro = () => {
    const [activo, setActivo] = useState(false);
    const [activo2, setActivo2] = useState(false);
    const [tiempo, setTiempo] = useState(0)
    const [segundos, setSegundos] = useState(0)
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    const [identificacion, setId] = useState('');
    const [seno, setSeno] = useState('');
    const [seno2, setSeno2] = useState('');
    const [alert2, setAlert2] = useState(false);


    const { cronometroActivo, toggleCronometro } = useContext(AuthContext);


    const getDatosSesion = async () => { //En esta funcion asincrona obtenemos la identificacion
        try {
            const id = await AsyncStorage.getItem('id');
            const seno2 = await AsyncStorage.getItem('seno');
            setSeno2(seno2 || 'NoSeno');
            setId(id || '0'); //Y se la seteamos a el state de ID para que cuando se ejecute la funcion de ingreso de datos ya tenga el id que se necesita enviar
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
    }, []);


    const iniciarCronometro = () => {
        setActivo(!activo); //Se ejecuta la funcion y cambia el stateActivo a true;
        if (activo == false) {
            setActivo2(true);
        }
        //toggleCronometro(); // Usar la función del contexto para iniciar/detener el cronómetro
    };

    useEffect(() => {
        let intervalo;

        if (activo) { //Si activo es true es decir si se presiono el boton que ejecuta la funcion iniciarCronometro
            // Utiliza BackgroundTimer en lugar de setInterval
            intervalo = BackgroundTimer.setInterval(() => { //dentro de la variable intervalo se guardara una funcion  que es setInterval(función, intervalo);
                setSegundos((prevSegundos) => prevSegundos + 1);
            }, 1000); //La funcion se ejecutara cada segundo
        } else {
            BackgroundTimer.clearInterval(intervalo); //Este clearInterval() es para detener la funcion de setInterval
        }

        return () => {
            BackgroundTimer.clearInterval(intervalo);
        };
    }, [activo]); // Si contiene elementos, el efecto se ejecutará cada vez que alguno de los elementos en el array de dependencias cambie entre renderizados.
    // como segundos cambia entre renderizados e ahi cuando empezara a ejecutarse el useEffect



    const detenerCronometro = () => { //Este es para detener el cronometro
        setActivo(false); //En este momento se desactiva la funcion iniciar y el useEffect que ejecuta lso intervalos tambien se detendra
    };

    const reiniciarCronometro = () => { //Este es para reiniciar el cronometro practicamente dejamos todo como cuando no tenia nada en 0 los valores y falso los booleanos
        setActivo(false);
        setActivo2(false);
        setAlert2(false);
        setSeno('');
        setSegundos(0);
        setMinutos(0);
        setHoras(0);
    };

    // Actualizar los minutos y horas cuando los segundos lleguen a 60
    useEffect(() => {
        if (segundos === 60) {
            setSegundos(0);
            setMinutos((prevMinutos) => prevMinutos + 1);
        }
        if (minutos === 60) {
            setMinutos(0);
            setHoras((prevHoras) => prevHoras + 1);
        }
    }, [segundos, minutos]); // Si contiene elementos, el efecto se ejecutará cada vez que alguno de los elementos en el array de dependencias cambie entre renderizados
    // como minutos y horas cambia entre renderizados e ahi cuando empezara a ejecutarse el useEffect

    /*   cambioDeCeros= () =>{
            if(segundos<10){
                setSegundos("0"+segundos);
            }else{setSegundos(segundos)}
            if(minutos<10){
                setMinutos("0"+minutos);
            }else{setMinutos(minutos)}
            if(horas<10){
                setHoras("0"+horas)
            }else{setHoras(horas)}
      }
      useEffect(()=>{
        cambioDeCeros()
      },[]) */

    const ceroALaLeft = (value) => {
        return value < 10 ? `0${value}` : value.toString();
    };

    // Dentro de tu useEffect existente que actualiza tiempo
    useEffect(() => {
        const tiempoCombinado = `${ceroALaLeft(horas)}:${ceroALaLeft(minutos)}:${ceroALaLeft(segundos)}`; //Dentro de tiempo combinado va la union de horas:minutos:segundos
        setTiempo(tiempoCombinado);
    }, [horas, minutos, segundos]);


    //Actualizar la variable tiempo que es la que se enviara en el post
    /* useEffect(() => {
      setTiempo(horas+":"+minutos+":"+segundos);
    },[horas,minutos,segundos]); // */

    const ingresoDatos = async () => {
        try {
            const response = await axios.post("https://www.plataforma50.com/pruebas/Amamanta/datos.php", {
                seno: seno,
                /*             tiempo: tiempoAmamantando, */
                tiempo: tiempo,
                idUser: identificacion,
            });
            //console.log(response.data); // Verificar la respuesta del servidor en la consola
            if (response.data.result === "success") {
                await AsyncStorage.setItem("seno", seno);
                const respuestaPhp = response.data; // Aquí están todos los datos del usuario
                console.log(respuestaPhp);
            } else {
                console.log("Error del try");
            }
        } catch (error) {
            console.log(error);
            /* console.log(seno);
            console.log(id2);
            console.log(id);
            console.log(comentario);
            console.error(error); */
        }
    };
    const showAlert = () =>
        Alert.alert(
            'Envio De Datos',
            `Esta seguro que los datos proporcionados como: " Seno: ${seno} ", " tiempo: ${tiempo} " son los correctos?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        //setActivo(!activo);
                        Alert.alert('Cancelado')
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        if (seno != "") {
                            ingresoDatos()
                            xx.navigate("Home")
                            console.log('Envio Exitoso')
                        } else {
                            Alert.alert('Cancelado', 'Debe escoger un seno');
                            xx.navigate("Cronometro")
                        }
                    }
                }
            ]
        );

    const showAlert2 = () =>
        Alert.alert(
            'Envio De Datos',
            `Cambiaste de seno y ahora se enviarán los siguientes datos: "Seno: ${seno} ", "tiempo: ${tiempo} " son los correctos?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        setActivo(true); //Como se cancelo el cambio de seno sigue corriendo el cronometro actual
                        Alert.alert('Cancelado')
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        if (seno != "") {//Si el seno no es vacio
                            ingresoDatos() //Haz el envio de datos 
                            reiniciarCronometro(); //Reinicia el cronometro
                            setActivo(true); //Ponlo a correor otra vez
                            if (seno == 'izquierdo') { //Si el seno es izquierdo previamente
                                setSeno('derecho') //Setealo a derecho 
                            } else { setSeno('izquierdo') } //Y si no o sea si es derecho setealo a izquierdo
                            //xx.navigate("Cronometro") //Mandalo nuevamente a la vista de Cronometro para que siga allí
                            console.log('Envio Exitoso')
                            setAlert2(true); //Aqui se coloca true el state de alert para que se pueda modificar el comentario superior de la pantalla si cambia de seno 
                        } else {
                            Alert.alert('Cancelado', 'Debe escoger un seno');
                            xx.navigate("Cronometro")
                        }
                    }
                }
            ]
        );



    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.containerIntroduccion}>
                    <Pressable style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.txtBienvenida}>Cronometro</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingTop:10, paddingBottom:30 }}>
                    <View >
                        {/* <Text style={styles.txtSuperior}> {!alert2 ? `Presione el seno con el${'\n'}cual amamantará al niño` : "Cambió de seno"} </Text> */}
                        {seno2 == 'NoSeno' ?
                                (
                                    <Text style={styles.txtInformativo}>
                                        {`Presione el seno con el${'\n'}cual amamantará al niño`}
                                    </Text>
                                ) : 
                                (
                                    alert2 ? 
                                    <Text style={styles.txtInformativo}>Cambió de seno</Text>:
                                        seno2 == 'derecho' ? (
                                            <Text style={styles.txtInformativo2}>
                                                {`La ultima vez que amamantaste al niño fue con el seno ${seno2}, que bueno sería que ahora lo amamantes con el izquierdo
                                                `}
                                            </Text>
                                        ) : (
                                            <Text style={styles.txtInformativo2}>
                                                {`La ultima vez que amamantaste al niño fue con el seno ${seno2}, que bueno sería que ahora lo amamantes con el derecho
                                                `}
                                            </Text>
                                        )
                                )
                            }
                        <View style={styles.containerImg}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (seno == "derecho") {
                                            showAlert2();
                                            if (alert) {
                                                iniciarCronometro()
                                            }
                                        } else {
                                            setSeno('izquierdo')
                                            iniciarCronometro()
                                        }
                                    }
                                    }
                                    style={[{ paddingLeft: 57 }]}
                                >
                                    <Image
                                        style={styles.imagen}
                                        source={imgSenoIzquier}
                                    />
                                    <Text
                                        style={seno == 'izquierdo' ?
                                            { textAlign: "center", fontSize: 20, color: '#000', fontWeight: '600', } :
                                            { textAlign: "center", fontSize: 20, color: '#c6bdbd', fontWeight: '600', }}
                                    >
                                        IZQUIERDO</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (seno == "izquierdo") {
                                            showAlert2();
                                            if (alert) {
                                                iniciarCronometro()
                                            }
                                        } else {
                                            setSeno('derecho')
                                            iniciarCronometro()
                                        }
                                        /*  if(seno != ""){
                                            setSeno('')
                                            detenerCronometro()
                                        }else{
                                            setSeno('derecho')
                                            iniciarCronometro()
                                        } */
                                    }
                                    }
                                    style={[{ paddingRight: 57 }]}
                                >
                                    <Image
                                        style={styles.imagen2}
                                        source={imgSenoDerecho}
                                    />
                                    <Text
                                        style={seno == 'derecho' ?
                                            { textAlign: "center", fontSize: 20, color: '#000', fontWeight: '600', } :
                                            { textAlign: "center", fontSize: 20, color: '#c6bdbd', fontWeight: '600', }}
                                    >
                                        DERECHO</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                    <View style={styles.containerCuerpo}>
                        <Text style={styles.Text}>
                            <Text >{activo ? `Cronometro En Curso ${'\n'}` : `Conometro${'\n'}En Pausa `}</Text>
                            <Text >{activo ? "Lactando en seno " + seno : ""}</Text>
                        </Text>
                        <View >
                            <View style={styles.contCards}>
                                {/* <Stopwatch
                        laps
                        msecs
                        start={isRunning}
                        reset={resetWatch}
                        options={{
                            container: styles.stopwatchContainer,
                            text: styles.stopwatchText,
                        }}
                        /> 
                        <Text style={{ fontSize: 40 }}>
                            {horas < 10 ? `0${horas}` : horas}:
                            {minutos < 10 ? `0${minutos}` : minutos}:
                            {segundos < 10 ? `0${segundos}` : segundos}
                        </Text>*/}
                                <Text style={[{ fontSize: 40 }, { textAlign: 'center' }, { color: '#c6bdbd' }]}>
                                    {tiempo}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.contenedorSubmit}
                            onPress={reiniciarCronometro}>
                            <Text style={styles.txtInferiores}>
                                Reiniciar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.contenedorSubmit}
                            onPress={() => {
                                showAlert()
                            }}>
                            <Text style={styles.txtInferiores}>
                                Enviar Datos
                            </Text>
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
        flexDirection: 'row'
    }, 
    iconoAtras: {
        marginTop: 75,
        marginLeft:30,
    },
    txtBienvenida: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        fontWeight: '600',
        marginLeft: 50,
        marginRight: 90,
        //fontFamily: 'Roboto'
    },
    txtSuperior: {
        textAlign: "center",
        fontSize: 25,
        marginTop: 10,
        color: '#595858',
        fontWeight: '700',
        marginHorizontal: 10,
    },
    containerImg: {
        flexDirection: 'row',
        marginHorizontal: 21,
        justifyContent: 'space-around'
    },
    imagen: {
        width: 120,
        height: 220,
        marginTop: 30,
        marginBottom: 5,
        objectFit: 'fill',
    },
    imagen2: {
        width: 120,
        height: 220,
        marginTop: 30,
        marginBottom: 5,
        //transform:[{scaleX:-1}],
        objectFit: 'fill',
    },
    Text: {
        marginTop: 7,
        fontSize: 20,
        fontWeight: '700',
        color: '#595858',
        textAlign: 'center',
        marginBottom: 5
        //fontFamily: 'Roboto'
    },
    text2: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
        //fontFamily: 'Roboto'
    },
    containerCuerpo: {
        marginTop: 30
    },
    contCards: {
        marginBottom: 5,
        backgroundColor: '#FFF0F7',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 73
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 70,
        paddingBottom:20
    },
    contenedorSubmit: {
        marginTop: 20,
        backgroundColor: '#6A71B9',
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 8,
    },
    txtInferiores: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        padding: 10
    },
    txtInformativo:{
        color: '#6A71B9',
        textAlign: 'center',
        fontSize: 17,
        paddingBottom: 20,
        fontFamily: 'Roboto-Medium',
        opacity: 0.7,
        paddingHorizontal: 20
    },
    txtInformativo2:{
        color: '#6A71B9',
        opacity: 0.7,
        textAlign: 'center',
        fontSize: 17,
        paddingBottom: 10,
        fontFamily: 'Roboto-Medium',
        paddingHorizontal: 20
    }
})

export default Cronometro

// dependencies: {
//     'react-native-vector-icons': {
//       platforms: {
//         ios: null,
//       },
//     },
//   },
// module.exports = {
//     project: {
//       ios: {},
//       android: {},
//     },
//     assets: ["./assets/fonts/"],
  
//   };