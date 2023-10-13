import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home.js";
import Videos from "../Videos.js";
import Documentacion from "../Documentacion.js";
import ConsejosBebe from "../ConsejosBebe.js";
import DescansoBebe from "../DescansoBebe.js";
import Introduccion from "../Introduccion.js";
import LactanciaMaterna from "../LactanciaMaterna.js";
import LQPETC from "../LQPETC.js";
import BeneficiosLactancia from "../BeneficiosLactancia.js";
import CambiosDeLeche from "../CambiosDeLeche.js";
import PosicionesAmamantar from "../PosicionesAmamantar.js";
import TiposDePezon from "../TiposDePezon.js";
import Cronometro from "../Cronometro.js";
import Prueba from "../Prueba.js";
import Login2 from "../Login2.js";
import Registro from "../Registro.js";
import Temporizador from "../Temporizador.js";
import Prueba3 from "../Prueba3.js";
import Prueba4 from "../Prueba4.js";
import { AuthContext } from "../../context/AuthContext.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreens from "../SplashScreens.js";
import Perfil from "../Perfil.js";

import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';




const iconVideos = require('/Users/Orlando/Downloads/Amamantasin/assets/iconos/video.png')
const iconHome = require('/Users/Orlando/Downloads/Amamantasin/assets/iconos/home.png')
const iconDocumentos = require('/Users/Orlando/Downloads/Amamantasin/assets/iconos/documentos.png')
const iconLogout = require('/Users/Orlando/Downloads/Amamantasin/assets/iconos/iconContrasena.png')



export const Navegacion = () => {
    const { tokenUsuario, splashLoading } = useContext(AuthContext)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ?
                    (
                        <Stack.Screen name="SplasScreens" component={SplashScreens} options={{ headerShown: false }} />
                    )
                    :
                    tokenUsuario !== 1 ? (
                        <>
                            <Stack.Screen name="Login" component={Login2} options={{ headerShown: false }} />
                            <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }} />
                            <Stack.Screen name="ConsejosBebe" component={ConsejosBebe} options={{ headerShown: false }} />
                            <Stack.Screen name="DescansoBebe" component={DescansoBebe} options={{ headerShown: false }} />
                            <Stack.Screen name="Introduccion" component={Introduccion} options={{ headerShown: false }} />
                            <Stack.Screen name="LactanciaMaterna" component={LactanciaMaterna} options={{ headerShown: false }} />
                            <Stack.Screen name="LQPETC" component={LQPETC} options={{ headerShown: false }} />
                            <Stack.Screen name="BeneficiosLactancia" component={BeneficiosLactancia} options={{ headerShown: false }} />
                            <Stack.Screen name="CambiosDeLeche" component={CambiosDeLeche} options={{ headerShown: false }} />
                            <Stack.Screen name="PosicionesAmamantar" component={PosicionesAmamantar} options={{ headerShown: false }} />
                            <Stack.Screen name="TiposDePezon" component={TiposDePezon} options={{ headerShown: false }} />
                            <Stack.Screen name="Cronometro" component={Cronometro} options={{ headerShown: false }} />
                            <Stack.Screen name="Temporizador" component={Temporizador} options={{ headerShown: false }} />
                            <Stack.Screen name="Prueba" component={Prueba} options={{ headerShown: false }} />
                            <Stack.Screen name="Prueba3" component={Prueba3} options={{ headerShown: false }} />
                            <Stack.Screen name="Prueba4" component={Prueba4} options={{ headerShown: false }} />
                        </>
                    )
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
}

//Tab
const Tab = createBottomTabNavigator(); //Instanciamos la clase createBottomTabNavigator en Tab

function TabGroup() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconColor = focused ? '#FAD2E0' : '#6A71B9'; // Cambia el color del ícono según si está activo o inactivo

                    if (route.name === 'Videos') {
                        iconName = 'youtube'; // Cambia el ícono según la pestaña
                    } else if (route.name === 'Inicio') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Documentacion') {
                        iconName = 'file-document-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = 'shield-account-outline';
                    }

                    // Retorna el componente de ícono
                    return <AntDesign name={iconName} size={35} color={iconColor} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#191970', // Color de ícono activo
                style: {
                    alignItems: 'center',
                },
            }}
        >
            <Tab.Screen name="Videos" component={Videos} options={{ headerShown: false }} />
            <Tab.Screen name="Documentacion" component={Documentacion} options={{ headerShown: false }} />
            <Tab.Screen name="Inicio" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

// //Stack
const Stack = createNativeStackNavigator(); //Instanciamos la clase createNativeStackNavigator en Tab

// function SatckGroup() {
//     const { tokenUsuario } = useContext(AuthContext)
//     return (
//         <Stack.Navigator>
//             {tokenUsuario == 1 ?
//                 (
//                     <>
//                         <Stack.Screen name="Login" component={Login2} options={{ headerShown: false }} />
//                         <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
//                     </>

//                 ) : (
//                     <>
//                         <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }} />
//                         <Stack.Screen name="ConsejosBebe" component={ConsejosBebe} options={{ headerShown: false }} />
//                         <Stack.Screen name="DescansoBebe" component={DescansoBebe} options={{ headerShown: false }} />
//                         <Stack.Screen name="Introduccion" component={Introduccion} options={{ headerShown: false }} />
//                         <Stack.Screen name="LactanciaMaterna" component={LactanciaMaterna} options={{ headerShown: false }} />
//                         <Stack.Screen name="LQPETC" component={LQPETC} options={{ headerShown: false }} />
//                         <Stack.Screen name="BeneficiosLactancia" component={BeneficiosLactancia} options={{ headerShown: false }} />
//                         <Stack.Screen name="CambiosDeLeche" component={CambiosDeLeche} options={{ headerShown: false }} />
//                         <Stack.Screen name="PosicionesAmamantar" component={PosicionesAmamantar} options={{ headerShown: false }} />
//                         <Stack.Screen name="TiposDePezon" component={TiposDePezon} options={{ headerShown: false }} />
//                         <Stack.Screen name="Cronometro" component={Cronometro} options={{ headerShown: false }} />
//                         <Stack.Screen name="Cronometro2" component={Cronometro2} options={{ headerShown: false }} />
//                         <Stack.Screen name="Temporizador" component={Temporizador} options={{ headerShown: false }} />
//                         <Stack.Screen name="Prueba" component={Prueba} options={{ headerShown: false }} />
//                         <Stack.Screen name="Prueba3" component={Prueba3} options={{ headerShown: false }} />
//                         <Stack.Screen name="Prueba4" component={Prueba4} options={{ headerShown: false }} />
//                     </>
//                 )

//             };

//         </Stack.Navigator>
//     )
// }


