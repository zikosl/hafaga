import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Image, Pressable } from 'react-native'
import { G } from 'react-native-svg';
import api from '../api';
import Header from '../component/header'
import LoginContext from '../context/logincontext';
import palette from '../palette';
import { useTranslation } from 'react-i18next';


const yellow = "#FAD103";
const lite = "#d9d9d9";
const dlite = "#aaaaaa";

export default function MyCommands(props) {
    const Context = React.useContext(LoginContext)
    const [active, setActive] = React.useState(true)
    const [Commands, setCommands] = React.useState([])
    const [FARR, setFARR] = React.useState([])
    const [SARR, setSARR] = React.useState([])
    const navigation = useNavigation();
    React.useEffect(() => {
        const sub = navigation.addListener("focus", () =>
            getHistorique()
        )
        return sub
    }, [props.navigation])
    const getHistorique = async () => {
        const a = (await api.post('client/archive', { client: Context.login.uid })).data
        const AARR = []
        const RARR = []
        a.forEach((v) => {
            if (v.step > 2) {
                AARR.push(v)
            }
            else {
                RARR.push(v)
            }
        })

        setFARR(AARR)
        setSARR(RARR)
        setCommands(AARR);
    }
    const { t, i18n } = useTranslation();
    const font = t("font");
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: "flex-start", paddingLeft: 20, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Image source={require('../images/books.png')} style={styles.icon} />
                <Text style={[styles.text, { fontFamily: font + "-Bold", }]}>{t('msg15')}</Text>
            </View>
            <View style={{ width: 40, height: 3, marginTop: 5, marginHorizontal: 30, backgroundColor: palette.primary }} />
            <View style={styles.row}>
                <Pressable style={[styles.btn, active && { borderColor: palette.primary }]} onPress={() => { setActive(true); setCommands(FARR) }}>
                    <Text style={[styles.ttext, active && { color: palette.primary }, { fontFamily: font + "-SemiBold" }]}>{t('msg16')}</Text>
                </Pressable>
                <Pressable style={[styles.btn, !active && { borderColor: palette.primary }]} onPress={() => { setActive(false); setCommands(SARR) }}>
                    <Text style={[styles.ttext, !active && { color: palette.primary }, { fontFamily: font + "-SemiBold" }]}>{t('msg17')}</Text>
                </Pressable >
            </View >
            {
                Commands.map((v, i) => {
                    let total = v.tarif;
                    v.commands = JSON.parse(v.commands)
                    v.commands.forEach(v => total += v.quantite * v.prix);
                    return (
                        <View key={i} style={styles.cmd}>
                            <Text style={styles.cmdN}>Command N° {v.pid}</Text>
                            <Text style={styles.cmdtext}><Text style={{ fontFamily: "Dosis-Bold" }}>Total :</Text> {total} DA</Text>
                        </View>
                    )
                })
            }
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 25
    },
    text: {
        fontSize: 17,
        fontFamily: "Gilroy-SemiBold",
        color: palette.Gray,
        paddingVertical: 10,
        textAlign: "left"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginTop: 6
    },
    ttext: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 17,
        color: palette.secondary
    },
    line: {
        width: 4,
        height: 20, borderRadius: 3,
        backgroundColor: palette.Smoke,
        marginHorizontal: 7
    },
    cmd: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 25,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 7,
        marginHorizontal: 10,
        borderColor: "#bbb"
    },
    cmdtext: {
        fontFamily: "Gilroy-Medium",

    },
    cmdN: {
        fontFamily: "BigShouldersStencilDisplay-Bold",
        flex: 1
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: palette.Gray,
        marginRight: 10
    },
    btn: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        paddingVertical: 10, marginHorizontal: 10,
        borderWidth: 2,
        borderColor: "#fff"
    }
})