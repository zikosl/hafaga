import React from "react";
import { Modal, StyleSheet, View, Text, Image } from 'react-native';

export default function Loading({ visible }) {
    return (
        <Modal
            visible={visible}
            transparent
        >
            <View style={styles.container}>
                <View style={styles.flex}>
                    <Text style={styles.title}>Hafaga</Text>
                    <Image style={styles.img} source={require('../images/hafaga.gif')} />
                    <Text style={styles.text}>Enjoy Us</Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#11111166",
        justifyContent: "center",
        alignItems: "center"
    },
    flex: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
        elevation: 1
    },
    title: {
        fontFamily: "Gilroy-Bold",
        fontSize: 18
    },
    img: {
        marginVertical: 15,
        width: 80,
        height: 80,
        resizeMode: "contain"
    },
    text: {
        fontFamily: "arabic",
        fontSize: 16
    }
})