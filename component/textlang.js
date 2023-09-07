import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Modal, View, Image } from "react-native"
import Language from '../context/language'
import { useTranslation } from 'react-i18next';

export default function TextTraduction({ style, children }) {
    const { t, i18n } = useTranslation();
    const font = t("font");
    return (
        <Text style={[style, { fontFamily: font + "-SemiBold" }]}>{children}</Text>
    )
}
const styles = StyleSheet.create({

})