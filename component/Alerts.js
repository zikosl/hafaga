import React from "react";
import { Modal, StyleSheet, View, Text, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import palette from "../palette";
const { width } = Dimensions.get('window')
import { useTranslation } from 'react-i18next';

export default function Alerts({ visible, deny, callback, title }) {
    const { t, i18n } = useTranslation();
    const font = t("font")
    return (
        <Modal
            visible={visible}
            transparent
        >
            <View style={styles.container}>
                <View style={styles.flex}>
                    <Text style={[styles.title, { fontFamily: font + "-SemiBold" }]}>{title}</Text>
                    <View style={styles.row}>
                        <Pressable style={styles.refus} onPress={deny}>
                            <Text style={[styles.text, { fontFamily: font + "-Medium", color: palette.primary }]}>{t('msg7')}</Text>
                        </Pressable>
                        <TouchableOpacity style={styles.accept} onPress={callback}>
                            <Text style={[styles.text, { fontFamily: font + "-Medium" }]}>{t('msg8')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
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
        elevation: 1,
        width: width - 120
    },
    title: {
        fontFamily: "Gilroy-Bold",
        fontSize: 17,
        lineHeight: 25,
        marginBottom: 25,
        textAlign: "center",
    },
    img: {
        marginVertical: 15,
        width: 80,
        height: 80,
        resizeMode: "contain"
    },
    text: {
        fontFamily: "arabic",
        fontSize: 16,
        color: "#fff"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    accept:
    {
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 7,
        backgroundColor: palette.primary,
        marginLeft: 10
    },
    refus: {
        paddingHorizontal: 20,
        paddingVertical: 7,
        marginRight: 10
    }
})