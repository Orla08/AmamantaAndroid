import { View, Text, Image, Pressable, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
//import {mostrarNotificacion, handleScheduleNotification, handleCancel} from './notificacion.android'



const Prueba3 = () => {
  const [identificacion, setId] = useState('0');
  const [seno, setSeno] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [segundosTotal, setSegundosTotal] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [registroHabilitado, setRegistroHabilitado] = useState(true);
  const [tokenDevice, setTokenDevice] = useState('')
  const [formattedTime, setFormattedTime] = useState("00:00:00"); // Estado para almacenar el tiempo formateado

  const getDatosSesion = async () => { //En esta funcion asincrona obtenemos la identificacion
    try {
      const id = await AsyncStorage.getItem('id');
      const seno2 = await AsyncStorage.getItem('seno');
      const device = await AsyncStorage.getItem('tokenDispositivo');
      setSeno(seno2 || 'NoSeno')
      setId(id || '0'); //Y se la seteamos a el state de ID para que cuando se ejecute la funcion de ingreso de datos ya tenga el id que se necesita enviar
      setTokenDevice(device || 'nulo');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
  }, []);

  const formatTime = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const ingresoDatos = async () => {
    try {
      const response = await axios.post("http://192.168.1.18/php/notificaciones4.php", {
        seno: seno,
        tiempo: segundosTotal,
        idDevice: tokenDevice,
        idUser: identificacion,

      });
      console.log(response.data); // Verificar la respuesta del servidor en la consola
      if (response.data.result === "success") {
        const respuestaPhp = response.data; // Aquí están todos los datos del usuario
        console.log(respuestaPhp);
      } else {

      }
    } catch (error) {
      console.log("Error del catch:", error); // Imprimir detalles del error
    }
  };





  useEffect(() => {

    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        // Decrementa los segundos y ajusta las horas y minutos según sea necesario
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes = minutes - 1;

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours = hours - 1;

            if (newHours < 0) {
              // Detener el temporizador y mostrar una alerta cuando llegue a cero
              clearInterval(timer);
              setIsTimerRunning(false);
              resetTimer()
              Alert.alert('Tiempo terminado', 'El temporizador ha llegado a cero.');
            }
          }
        }
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        // Actualiza el estado con el tiempo formateado
        setFormattedTime(formatTime(newHours, newMinutes, newSeconds));

      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Limpia el temporizador al desmontar el componente
  }, [hours, minutes, seconds, isTimerRunning]);


  const showAlert = () => {
    Alert.alert('Tiempo terminado', 'El temporizador ha llegado a cero.');
  }


  // Esto se ejecutará cada vez que 'isTimerRunning' cambie
  const toggleTimer = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      Alert.alert('Valores incorrectos', 'Por favor, selecciona un tiempo válido.');
      setRegistroHabilitado(true);
    } else {
      setSegundosTotal((hours * 3600) + (minutes * 60) + seconds);
      setIsTimerRunning(!isTimerRunning); // Solo cambia el estado aquí
    }
  };
  // Asegúrate de que esto esté en el cuerpo principal de tu componente funcional
  useEffect(() => {
    if (isTimerRunning && registroHabilitado) {
      ingresoDatos();
      setRegistroHabilitado(false); // Deshabilita el registro después de llamar a ingresoDatos()
    }
  }, [isTimerRunning]);

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setFormattedTime("00:00:00")
    setIsTimerRunning(false);
    setRegistroHabilitado(true);
  };


  const xx = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <View style={styles.containerTxtEncabezado}>
          <Pressable style={styles.iconoAtras}
            onPress={() => { xx.navigate("Home") }}>
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <Text style={styles.txtIntroduccion}>Temporizador</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isTimerRunning ?
            <>
              <View style={styles.contenedorHora}>
                <View style={styles.Hora}>
                  <Text style={styles.txtHora}>Hrs</Text>
                  <Text style={styles.txtHora}>Min</Text>
                  <Text style={styles.txtHora}>Seg</Text>
                </View>
                <Text style={styles.horaFormateada}>
                  {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </Text>
              </View>
            </> :
            <>
              <Text style={styles.txtInformativo}>
                En el formato HH:MM:SS escoja dentro{'\n'} de cuanto le recordaremos
              </Text>

              <View style={styles.timerContainer}>
                <View style={{
                  alignItems: 'center',

                }}>
                  <Text style={{ color: 'black' }}>Hrs</Text>
                  <Picker
                    selectedValue={hours}
                    style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerDefault}
                    onValueChange={(itemValue) => setHours(itemValue)}
                  //itemStyle={styles.pickerItem} // Cambia el color de los números a negro
                  >
                    {/* <Picker.Item  style={{color:'black'}} label="1" value={1} /> */}
                    {[...Array(24).keys()].map((value) => (
                      <Picker.Item key={value} label={value.toString()} value={value} />
                    ))}
                  </Picker>
                </View>
                <Text style={styles.timerText}>:</Text>

                <View style={{
                  alignItems: 'center',

                }}>
                  <Text style={{ color: 'black', }}>Min</Text>
                  <Picker
                    selectedValue={minutes}
                    style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerDefault}
                    onValueChange={(itemValue) => setMinutes(itemValue)}
                  //itemStyle={styles.pickerItem} // Cambia el color de los números a negro
                  >
                    {[...Array(60).keys()].map((value) => (
                      <Picker.Item key={value} label={value.toString()} value={value} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.timerText}>:</Text>

                <View style={{
                  alignItems: 'center',

                }}>
                  <Text style={{ color: 'black', }}>Seg</Text>
                  <Picker
                    selectedValue={seconds}
                    style={Platform.OS === 'android' || Platform.OS === 'Android' ? styles.pickerAndroid : styles.pickerDefault}
                    onValueChange={(itemValue) => setSeconds(itemValue)}
                  //itemStyle={styles.pickerItem} // Cambia el color de los números a negro
                  >
                    {[...Array(60).keys()].map((value) => (
                      <Picker.Item style={{ color: '#6A71B9' }} key={value} label={value.toString()} value={value} />
                    ))}
                  </Picker>
                </View>

              </View>
            </>
          }
          <View style={styles.contenedorBotones}>
            <TouchableOpacity onPress={() => {
              toggleTimer()
            }}>

              {isTimerRunning ?
                <View style={styles.boton}>
                  <IconMaterial name="pause" size={40} color="#fff" />
                </View>
                :
                <View style={styles.boton}>
                  <IconMaterial name="play" size={40} color="#fff" />
                </View>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={resetTimer}>
              <View style={styles.boton}>
                <IconMaterial name="stop" size={40} color="#fff" />
              </View>
            </TouchableOpacity>
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
  containerTxtEncabezado: {
    backgroundColor: '#ffadc6',
    height: 130,
    marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  iconoAtras: {
    marginTop: 20,
    alignItems: 'flex-start',
    marginTop: 70
  },
  txtIntroduccion: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginRight: 70,
    marginLeft: 60
  },
  txtInformativo: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 40
  },
  pickerDefault: {
    backgroundColor: 'transparent', // Fondo transparente para iOS u otras plataformas,
    width: 100,
    height: 200,
  },
  pickerAndroid: {
    backgroundColor: 'transparent', // Fondo transparente para Android
    color: 'black', // Color de texto para Android (puede ser necesario ajustarlo)
  },
  // picker: {

  //   backgroundColor: 'transparent'
  // },
  pickerItem: {
    color: 'black', // Cambia el color de los números a negro
  },
  contenedorHora: {
    marginTop: 20,
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: '#6A71B9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 80,
    marginBottom: 20
  },
  Hora: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  horaFormateada: {
    marginTop: 20,
    fontSize: 50,
    color: '#fff',
  },
  txtHora: {
    marginHorizontal: 20,
    color: '#fff',
    opacity: 0.6
  },
  timerText: {
    fontSize: 32,
    color: 'black',
  },
  timerControlText: {
    marginTop: 20,
    fontSize: 24,
    color: 'black',
  },
  contenedorBotones: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    marginHorizontal: 100
  },
  boton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#6A71B9',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Prueba3