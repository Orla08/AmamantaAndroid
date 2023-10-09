// CronometroContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';

const CronometroContext = createContext();

export const useCronometro = () => {
    return useContext(CronometroContext);
};

export const CronometroProvider = ({ children }) => {
    const [activo, setActivo] = useState(false);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    const [tiempo, setTiempo] = useState(0)

    const iniciarCronometro = () => {
        setActivo(!activo);
    };

    useEffect(() => {
        let intervalo;

        if (activo) {
            intervalo = BackgroundTimer.setInterval(() => {
                setSegundos((prevSegundos) => prevSegundos + 1);
            }, 1000);
        } else {
            BackgroundTimer.clearInterval(intervalo);
        }

        return () => {
            BackgroundTimer.clearInterval(intervalo);
        };
    }, [activo]);

    const detenerCronometro = () => {
        setActivo(false);
    };

    const reiniciarCronometro = () => {
        setActivo(false);
        setSegundos(0);
        setMinutos(0);
        setHoras(0);
    };

    useEffect(() => {
        if (segundos === 60) {
            setSegundos(0);
            setMinutos((prevMinutos) => prevMinutos + 1);
        }
        if (minutos === 60) {
            setMinutos(0);
            setHoras((prevHoras) => prevHoras + 1);
        }
    }, [segundos, minutos]);

    const ceroALaLeft = (value) => {
        return value < 10 ? `0${value}` : value.toString();
    };

    useEffect(() => {
        const tiempoCombinado = `${ceroALaLeft(horas)}:${ceroALaLeft(minutos)}:${ceroALaLeft(segundos)}`;
        setTiempo(tiempoCombinado);
    }, [horas, minutos, segundos]);

    const value = {
        activo,
        setActivo,
        segundos,
        setSegundos,
        minutos,
        horas,
        iniciarCronometro,
        detenerCronometro,
        reiniciarCronometro,
    };

    return (
        <CronometroContext.Provider value={value}>
            {children}
        </CronometroContext.Provider>
    );
};
