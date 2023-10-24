import { View, Text, Image, Pressable, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";


const PosicionesAmamantar = () => {
    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.containerIntroduccion}>
                    <Pressable style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.txtIntroduccion}>Posiciones para amamantar</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedoresDeTexto}>
                        <Text style={styles.txtCuerpos}>
                            Independientemente de la postura que adopte la madre para amamantar, existen unos principios básicos que deben de ser tenidos
                            en cuenta y que facilitan el agarre del bebé y en consecuencia, la transferencia eficaz de leche y el vaciado adecuado del pecho.
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            1. La madre debe de sentirse cómoda con la postura. La utilización de cojines o almohadas puede resultar útil.
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            2. El cuerpo del bebé debe de estar en estrecho contacto con el de la madre. Cuando la madre está recostada, el peso del bebé descansa
                            sobre el cuerpo de la madre y resulta más fácil mantener ese contacto estrecho que facilita la puesta en marcha de los reflejos en el lactante.
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            3. La cabeza debe de estar frente al pecho, bien alineada con el cuerpo (el cuello no debe de estar flexionado, ni la cabeza girada).
                            Es preferible desplazar al bebé que desplazar el pecho de la madre.
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            4. El mentón debe de estar apoyado en el pecho con el pezón encima del labio superior, a la altura de la nariz. De esta forma, cuando el bebé
                            ponga en marcha el reflejo de búsqueda y agarre el pecho, el cuello quedará en ligera hiperextensión, facilitando la coordinación succión, deglución, respiración.
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            5. Es preferible favorecer el afianzamiento espontáneo, cuando la boca del bebé esté bien abierta, acercarle al pecho y permitir que sea él quien lo agarre.
                            Si el bebé no lo consigue, puede ser útil el agarre dirigido (ver técnica al final del anexo).
                        </Text>
                        <Text style={styles.txtCuerpos}>
                            Para prestar un apoyo eficaz a las madres con dificultades deberemos de tener en cuenta sus condiciones físicas y la forma y tamaño de sus pechos.

                        </Text>
                        <Text style={styles.txtSubtitulos}>Posición en CRIANZA BIOLÓGICA</Text>
                        <Text>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Madre semirecostada (entre 15º-65º) y cómoda.</Text>
                        </Text>
                        <Text>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Bebé colocado encima de la madre con la cara entre sus pechos.</Text>
                        </Text>
                        <Text>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Permitir que sea el bebé quien se desplace hacia el pecho de la madre y realice un agarre espontáneo.</Text>
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Esta postura es especialmente útil cuando existen dificultades con el agarre, ya que facilita que el recién nacido ponga en marcha sus reflejos instintivos.
                                El recién nacido cabecea y se desplaza buscando el pecho de la madre. Esta postura también es útil cuando existe dolor en el periné..</Text>
                        </Text>
                        <Text style={styles.txtSubtitulos}>Posición de CUNA</Text>
                        <Text style={styles.txtCuerpos}>Es una de las posturas más utilizadas.</Text>
                        <Text>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>La madre sujeta el cuello y la cabeza del bebé con el mismo brazo y mano del pecho que ofrece. </Text>
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Para que el cuello no esté flexionado, en la mayoría de los casos, es necesario colocar la cabeza en el antebrazo en lugar de en el codo y la mano en la espalda en lugar de en las nalgas. </Text>
                        </Text>
                        <Text style={styles.txtSubtitulos}>Posición de DANCER</Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>La madre coloca al bebé sentado a caballito sobre su muslo, con la cabeza frente al pecho. </Text>
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Con una mano sujeta al bebé por la espalda y con la otra afianza el mentón del bebé a su pecho. Coloca la mano en forma de bandeja bajo el pecho y con el índice y el pulgar en forma de U afianza el mentón.</Text>
                        </Text>
                        <Text style={styles.txtCuerpos}>Esta postura es especialmente útil en: </Text>

                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Problemas con el paladar  </Text>
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}> Hipotonía (síndrome de Down…) </Text>
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            <Text style={styles.conceptos}>- </Text>
                            <Text style={styles.txtCuerpos}>Retrognatia y Reflujo gastroesofágico.</Text>
                        </Text>
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
        flexDirection: 'row',
        display: 'flex',
    },
    iconoAtras: {
        alignItems: 'flex-start',
        marginTop: 70,
        marginLeft: 30,
    },
    txtIntroduccion: {
        fontSize: 29,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginLeft: 40,
        marginRight: 75,
        lineHeight: 30,
        fontFamily: 'Roboto-Bold',
        lineHeight: 30, // Ajusta el interlineado aquí
    },
    txt_s: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'justify',
        marginHorizontal: 30,
        color: '#595858',
    },
    conceptos: {
        fontSize: 20,
        textAlign: 'justify',
        color: '#6A71B9',
        opacity: 0.7,
        fontFamily: 'Roboto-Medium',
    },
    txtSubtitulos: {
        fontSize: 22,
        color: '#6A71B9',
        marginBottom: 15,
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
    },
    contenedoresDeTexto: {
        paddingTop: 15,
        marginHorizontal: 25,
        paddingBottom: 130
    },
    txtCuerpos: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#595858',
    },

})


export default PosicionesAmamantar