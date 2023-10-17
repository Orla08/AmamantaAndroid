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
    try {
      const response = await axios.post("http://10.1.80.133/php/historial.php", {
        idUser: idUser,
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
  const ingresoDatos2 = async () => {
    try {
      const response = await axios.post("http://10.1.80.133/php/historial2.php", {
        idUser: idUser,
      });
      console.log(response.data.sumaTiempo);
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
  const ingresoDatos3 = async () => {
    try {
      const response = await axios.post("http://10.1.80.133/php/historial3.php", {
        idUser: idUser,
      });
      console.log(response.data.sumaTiempo);
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
  const ingresoDatos4 = async () => {
    try {
      const response = await axios.post("http://10.1.80.133/php/historial4.php", {
        idUser: idUser,
      });
      console.log(response.data.sumaTiempo);
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
              <View style={{ alignItems: 'center', justifyContent: 'space-around', height: 100 }}>
                <Text style={{ color: 'black' }} >El tiempo total que ha amamantando al bebé es de</Text>
                <Text style={styles.txtTiempo}>{sumaTiempo}</Text>
              </View>
            ) :
            (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ backgroundColor: 'red', borderRadius: 30 }}
                  onPress={() => (
                    ingresoDatos(), // Llama a la función ingresoDatos
                    console.log(idUser)
                  )}>
                  <Text style={{ color: 'black', textAlign: 'center', padding: 8 }}>Mandar</Text>
                </TouchableOpacity>
                <Text style={{ color: 'black', paddingTop: 40 }}>Seleccione un tipo de Historial</Text>
              </View>
            )}
        </View>

        <View style={{ flex: 60 }}>
          {datos.length > 0 ?
            (
              <>
                <View style={styles.container2}>
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


});

export default Prueba;
