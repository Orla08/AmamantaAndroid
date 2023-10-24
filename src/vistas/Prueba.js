import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign'
//import {withNavigation} from 'react-navigation'
//import { useNavigation } from "@react-navigation/native";
//import * as Notifications from 'expo-notifications';

function Prueba() {

  const [idUser, setIdUser] = useState('');
  const [seno, setSeno] = useState('');
  const [opcion, setOpcion] = useState(1);
  const [sumaTiempo, setSumaTiempo] = useState('');
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const getDatosSesion = async () => { //En esta funcion asincrona obtenemos la identificacion
    try {
      const id = await AsyncStorage.getItem('id');
      const seno2 = await AsyncStorage.getItem('seno');
      setSeno(seno2 || 'izquierdo');
      setIdUser(id || '0'); //Y se la seteamos a el state de ID para que cuando se ejecute la funcion de ingreso de datos ya tenga el id que se necesita enviar
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatosSesion();  //Aqui se ejecuta la funcion de inmediato sin mirar las demas
  }, []);

  const ingresoDatos = async () => {
    setCargando(true); // Comienza la carga

    try {
      const response = await axios.post("https://www.plataforma50.com/pruebas/Amamanta/historial3.php", {
        idUser: idUser,
      });

      // Extrae la parte JSON de la respuesta
      const jsonStartIndex = response.data.indexOf('{"result":');
      if (jsonStartIndex !== -1) {
        const jsonResponse = response.data.substring(jsonStartIndex);
        const responseData = JSON.parse(jsonResponse);

        const result = responseData.result;
        const sumaTiempo = responseData.sumaTiempo;
        const registros = responseData.registros;

        console.log(result);
        console.log(sumaTiempo);
        console.log(registros);

        if (result === "success") {
          setSumaTiempo(sumaTiempo);
          setDatos(registros);
        } else {
          console.log("Error en el resultado");
        }
      } else {
        console.log("Error: La respuesta no contiene un JSON válido");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false); // Finaliza la carga
    }
  };


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
      <View >
        <View style={styles.containerIntroduccion}>
          <Pressable style={styles.iconoAtras}
            onPress={() => { xx.navigate("Historial") }}>
            <AntDesign name="left" size={24} color="white" />
          </Pressable>
          <Text style={styles.txtIntroduccion}>Historial</Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingBottom: 20 }}>

        <View style={{ flex: 40, justifyContent: 'center', alignItems: 'center' }}>
          {datos.length > 0 ?
            (
              <View >
                <Text style={styles.txtInfo} >El tiempo total que ha amamantando al bebé es de</Text>
                <Text style={{ color: 'black', fontSize: 30, fontFamily: 'Roboto.Bold', textAlign: 'center' }}>{sumaTiempo}</Text>
              </View>
            ) :
            (
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                {cargando ? <Text style={{ color: 'black' }}>Cargando...</Text> : ''}
                <TouchableOpacity
                  style={styles.contenedorSubmit}
                  onPress={() => (
                    ingresoDatos(), // Llama a la función ingresoDatos
                    console.log(idUser)
                  )}>
                  <Text style={styles.txtInferiores}>Consultar</Text>
                </TouchableOpacity>
                <Text style={styles.txtInfo}>Presione en consultar para visualizar el historial completo de lactancia</Text>
              </View>
            )}
        </View>

        <View style={{ flex: 60 }}>
          {datos.length > 0 ?
            (
              <>
                <View style={styles.container2}>
                  <Text style={[styles.header, { textAlign: 'center', fontSize: 20 }]}>Historial</Text>
                  <TableHeader />
                  <FlatList
                    data={datos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <>
                        <View style={styles.contenedorLista}>
                          <Text style={{ color: 'black', textTransform: 'lowercase' }}>{item.seno}</Text>
                          <Text style={{ color: 'black' }}>{item.tiempo}</Text>
                          <Text style={{ color: 'black' }}>{item.fecha}</Text>
                        </View>
                      </>
                    )}
                  />
                </View>
              </>
            ) :
            (
              ''
            )}
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
    marginTop: 70,
    marginLeft: 30
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
  txtInfo: {
    color: '#6A71B9',
    opacity: 0.7,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 50,
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 20
  },
  txtTiempo: {
    color: '#ccc',
    fontFamily: 'Roboto-Bold',
    fontSize: 16
  },
  container2: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffadc6',
    color: 'black'
  },
  contenedorLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF0F7',
    color: 'black'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  header: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    textTransform: 'uppercase'
  },
  contenedorSubmit: {
    marginTop: 20,
    backgroundColor: '#6A71B9',
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 8
  },
  txtInferiores: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    padding: 10
  },


});

export default Prueba;
