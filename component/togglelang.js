import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Modal, View, Image } from "react-native"
import Language from '../context/language'

export default function LangBtn() {
    const Context = React.useContext(Language)
    const [init, setInit] = React.useState(Context.information.language == "fr")
    const [visible, setVisible] = React.useState(false)
    const update = async () => {
        setInit(!init)
        setVisible(true)
        try {
            await Context.toggle(init ? "ar" : "fr")
            setVisible(false)
        }
        catch (e) {
            setVisible(false)
            alert("Try Again")
            Context.setLanguge()
        }
    }
    return (
        <>
            <TouchableOpacity onPress={() => update()} style={styles.btn}>
                <Text style={styles.text}>{Context.information.language.toUpperCase()}</Text>
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
            >
                <View style={styles.flex}>
                    <Image style={styles.img} source={require('../images/hafaga.gif')} />
                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#95ff00",
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 7,
        top: 7,
        elevation: 1,
        zIndex: 9999
    },
    text: {
        fontFamily: 'MontserratAlternates-SemiBold',
        fontSize: 18
    },
    img: {
        resizeMode: "contain",
        width: 60,
        height: 60
    }
    ,
    flex: {
        backgroundColor: "#22222255",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})