import { View, Text, Image, Pressable, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";



const TiposDePezon = () => {
    const xx = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.containerIntroduccion}>
                    <Pressable style={styles.iconoAtras}
                        onPress={() => { xx.navigate("Home") }}>
                        <AntDesign name="left" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.txtIntroduccion}>Tipos de pezón</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedoresDeTexto}>
                        <Text style={styles.txtCuerpos}>
                            Existen diferentes tipos de pezón: pezón invertido, pezón retráctil, pezón plano, alargado... Pero
                            ¿influye la forma del pezón en la lactancia materna, y de qué manera en función del tipo de pezones que tengamos?
                            ¡Te lo explicamos!
                        </Text>
                        <Text style={styles.txtSubtitulos}>¿Te preguntas si tu tipo de pezón afecta a la lactancia?</Text>
                        <Text style={styles.txtCuerpos}>
                            En principio, los tipos de pezón y el tamaño de los mismos no influyen en la capacidad de lactar. Sin embargo,
                            sí que pueden tener lugar algunos problemas en el pezón que requieran algún tipo más de atención.
                        </Text>
                        <Text style={styles.conceptos}>Pezón normal</Text>
                        <Text style={styles.txtCuerpos}>
                            Se dice que el pezón es normal cuando sobresale unos milímetros de la areola en su estado normal y aumenta sin problemas
                            por ejemplo ante un cambio de temperatura o la manipulación táctil..
                        </Text>
                        {/* <Image //Imagen del pezon NORMAL 
                        /> */}
                        <Text style={styles.conceptos}>Pezón plano</Text>
                        <Text style={styles.txtCuerpos}>
                            A veces se confunden con la areola, pero sí reaccionan ante la estimulación
                            y pueden volverse normales durante la lactancia materna. Su única peculariedad es que es más corto de lo común.
                        </Text>
                        {/* <Image //Imagen del pezon PLANO 
                        /> */}
                        <Text style={styles.conceptos}>Pezón invertido</Text>
                        <Text style={styles.txtCuerpos}>
                            Un pezón invertido se hunde en su parte central. Puede tener este aspecto siempre o solo al estimularlo. En ocasiones,
                            los pezones invertidos se retraen hasta quedar al ras de la areola, o incluso pueden hundirse en el tejido mamarios.
                        </Text>
                        {/* <Image //Imagen del pezon INVERTIDO 
                        /> */}
                        <Text style={styles.conceptos}>Macro pezón</Text>
                        <Text style={styles.txtCuerpos}>
                            Los pezones no suelen ser demasiado grandes, pero hay excepciones en que pueden llegar a medir hasta 20 cm. En cualquier
                            caso, no supone un inconveniente para la salud. Quizás sí podrías tener problemas durante la lactancia si es demasiado grande para el bebé.
                        </Text>
                        {/* <Image //Imagen del MACRO pezon 
                        /> */}
                        <Text style={styles.txtSubtitulos}>Lesiones del pezón</Text>
                        <Text style={styles.txtCuerpos}>
                            Dar el pecho no debe doler nunca. El tener grietas o dolor no es ni normal, ni debemos acostumbrarnos a ello. Si aparecen, debemos buscar la causa de su aparición y solucionar el problema.
                        </Text>
                        <Text style={styles.conceptos}>Perlas del pezón</Text>
                        <Text style={styles.txtCuerpos}>
                            Son un punto blanco en el pezón generadas por el traumatismo de los conductos.
                        </Text>
                        {/* <Image //Imagen del PERLAS DEL PEZON 
                        /> */}
                        <Text style={styles.conceptos}>Mastitis</Text>
                        <Text style={styles.txtCuerpos}>
                            Es una inflamación en el tejido mamario que a veces implica una infección. Generada por el vaciamiento incompleto del pecho y una causa importante es el mal agarre.
                        </Text>
                        {/* <Image //Imagen del Mastitis 
                        /> */}
                        <Text style={styles.txtSubtitulos}>Dolor mamario posterior al amamantamiento</Text>
                        <Text style={styles.txtCuerpos}>
                            Muchas madres sienten ardor y punzadas, que, muchas veces, se convierte en dolor mamario crónico.
                        </Text>
                        {/* <Image //Imagen del Mastitis 
                        /> */}
                        <Text style={styles.conceptos}>Las grietas</Text>
                        <Text style={styles.txtCuerpos}>
                            Son heridas que se producen en el pezón o areola, y que pueden producir mucho dolor y llegar a comprometer seriamente la continuidad de la lactancia.
                        </Text>
                        {/* <Image //Imagen del Mastitis 
                        /> */}
                        <Text style={styles.conceptos}>¿Cuál es la causa?</Text>
                        <Text style={styles.txtCuerpos}>
                            Posición o agarre del niño inadecuados.{'\n'}
                            Presencia de frenillo sublingual.
                        </Text>
                        <Text style={styles.conceptos}>¿Cómo actuar ante las grietas?</Text>
                        <Text style={styles.txtCuerpos}>
                            Asegurarse de que la postura es correcta.{'\n'}
                            Evitar el uso de chupetes.{'\n'}
                            Si existe frenillo sublingual corto, micrognatia o retrognatia: aunque se pueden adoptar algunas posturas para reducir el rozamiento.
                        </Text>
                        <Text style={styles.conceptos}>¿Cómo tratar la grieta?</Text>
                        <Text style={styles.txtCuerpos}>
                            Debemos mantener la piel limpia y seca.{'\n'}
                            Intentar mantener la herida al aire.{'\n'}
                            Es interesante limitar el uso de discos de lactancia, ya que la piel se puede macerar al permanecer tapada y húmeda.{'\n'}
                            Cubre tus pezones con un poco de leche materna (pasa los dedos muy limpios) después de cada toma. Esta tiene propiedades cicatrizantes y desinfectantes.
                        </Text>
                        <Text style={styles.txtSubtitulos}>Cuidado de los pezones</Text>
                        <Text style={styles.txtCuerpos}>
                            Para el cuidado diario de los pezones, recurrí al método “A.L.A.S.”:
                        </Text>
                        <Text style={{ opacity: 0.7 }}>
                            <Text style={styles.conceptos}>Aire:</Text>
                            <Text style={styles.txtCuerpos}>
                                dejarlos secar al aire después de cada toma.
                            </Text>
                        </Text>
                        <Text style={{ opacity: 0.7 }}>
                            <Text style={styles.conceptos}>Lubricación:</Text>
                            <Text style={styles.txtCuerpos}>
                                con una gota de la primera leche que producís, para evitar o tratar las grietas de la piel.
                            </Text>
                        </Text>
                        <Text style={{ opacity: 0.7 }}>
                            <Text style={styles.conceptos}>Agua:</Text>
                            <Text style={styles.txtCuerpos}>
                                para lavarlos —sin utilizar jabón-, y nunca frotarlos.                            </Text>
                        </Text>
                        <Text style={{ paddingBottom: 30, opacity: 0.7 }}>
                            <Text style={styles.conceptos}>Sol:</Text>
                            <Text style={styles.txtCuerpos}>
                                en tomas de unos pocos minutos, siempre antes de las 11 horas y después de las 16 horas.
                            </Text>
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
        marginTop: 20,
        alignItems: 'flex-start',
        marginTop: 70
    },
    txtIntroduccion: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginRight: 70,
        marginLeft: 60
    },
    imagen: {
        backgroundColor: '#000',
        width: 300,
        height: 300,
        borderRadius: 20,
        marginHorizontal: 50,
        marginVertical: 30,
    },
    txt_s: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'justify',
        marginHorizontal: 30
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
        textAlign: 'justify',
        fontFamily: 'Poppins-Medium',
    },
    contenedoresDeTexto: {
        paddingTop: 15,
        marginHorizontal: 25,
        paddingBottom: 130
    },
    txtCuerpos: {
        fontSize: 18,
        marginBottom: 17,
        textAlign: 'justify',
        color: '#1b1a1a',
        fontFamily: 'Roboto-Regular'
    },

})

export default TiposDePezon