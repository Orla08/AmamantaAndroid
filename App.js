import React, { useEffect } from 'react'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons' //Instancia Luego name y dentro del name como se llama
import Home from './src/vistas/Home'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navegacion } from './src/vistas/navegacion/Navegacion'

import { LogLevel, OneSignal } from 'react-native-onesignal';
import { AuthProvider } from './src/context/AuthContext';

// Remove this method to stop OneSignal Debugging
// OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize("7d3e4541-8271-4854-ae89-ee5c0167f395");

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);


// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
});

const device = OneSignal.User.pushSubscription.getPushSubscriptionId();
AsyncStorage.setItem("tokenDispositivo", device);
console.log(device);


/* <Icons name='chevron-left' style={{color:'black', fontSize:30}}/> */
function App() {
    useEffect(() => {
        const getDeviceAndSaveToLocalStorage = async () => {
            const device = await OneSignal.User.pushSubscription.getPushSubscriptionId();
            if (device) {
                AsyncStorage.setItem("tokenDispositivo", device);
                console.log(device);
            }
        };

        getDeviceAndSaveToLocalStorage();
    }, []); // El segundo argumento vacío [] asegura que esto se ejecute solo una vez al montar el componente

    return (
        <AuthProvider>
            <Navegacion />
        </AuthProvider>
    )
}

export default App
