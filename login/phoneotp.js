import React from "react"
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import LoginContext from "../context/logincontext";
import api from "../api";
import palette from "../palette";
import { useTranslation } from "react-i18next";

export default function PhoneOtp(props) {
    const Context = React.useContext(LoginContext);
    const [code, setcode] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const { confirmation, phone } = props.route.params
    console.log(props, confirmation)
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const font = t('font')
    const login = async () => {
        setLoading(true)
        try {
            // const credential = auth.PhoneAuthProvider.credential(
            //     confirmation.verificationId,
            //     code
            // )
            // auth().signInWithCredential(credential).then(async () => {


            // })
            api.post('client/login', {
                phone: phone
            }).then(r => {
                console.log(r)
                Context.setInformation(r.data)
            }).catch(e => {
                console.log(e)
                navigation.navigate('Create', {
                    phone: phone
                })
            })
            setLoading(false)
        }
        catch (error) {
            console.log('ok')
            if (error.code == 'auth/invalid-verification-code') {
                alert('Code No valid')
            }
            else {
                console.log(error)
            }
            setLoading(false)
        }
    }
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <Image style={styles.img} source={require('../images/logo2.png')} />
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <View style={styles.flex}>
                        <TextInput keyboardType="numeric" value={code} onChangeText={(g) => setcode(g)} style={[styles.code, { fontFamily: font + "-Medium" }]} />
                        <TouchableOpacity disabled={loading} onPress={() => login()} style={styles.btn}>
                            <Text style={[styles.btntext, { fontFamily: font + "-Medium" }]}>{t("msg19")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    flex: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20
    },

    code: {
        borderWidth: 1,
        borderRadius: 30,
        marginHorizontal: 60,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        textAlign: "center",
        fontSize: 18,
        marginVertical: 110
    },
    btntext: {
        color: palette.light
    },
    btn: {
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: palette.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    img: {
        resizeMode: "contain",
        alignSelf: "center",
        width: 220,
        height: 150,
    }
})