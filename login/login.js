import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import LoginContext from '../context/logincontext';
import Loading from '../component/loading';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Phone from '../component/phone';
import auth from '@react-native-firebase/auth'
import { PhoneNumberUtil } from 'google-libphonenumber';
import { SharedElement } from 'react-navigation-shared-element';
import palette from '../palette';
import { useTranslation } from 'react-i18next';


GoogleSignin.configure({
    webClientId: '879076605977-vknkekp2t53guk3fi2sh89f00l1momro.apps.googleusercontent.com',
});
function Login(props) {
    const [visible, setVisible] = React.useState(false)
    const [enabled, setEnabled] = React.useState(true)
    const [phone, setPhone] = React.useState("669788086")
    const phoneUtil = PhoneNumberUtil.getInstance();
    const ctx = React.useContext(LoginContext);

    const updatephone = (g) => {
        setPhone(g)
        const currentValue = g.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength == 9) {
            const number = phoneUtil.parseAndKeepRawInput(g, "DZ")
            if (phoneUtil.isValidNumber(number)) {
                setEnabled(false)
            }
            else {
                setEnabled(true)
            }
        }
    }
    const login = async (e) => {
        setVisible(true)
        const number = phoneUtil.parseAndKeepRawInput(phone, "DZ")
        const internationalNumber = phoneUtil.formatOutOfCountryCallingNumber(number);
        const currentValue = phone.replace(/[^\d]/g, '');

        props.navigation.navigate('Otp', {
            confirmation: "ok",
            phone: currentValue
        })


        // auth().verifyPhoneNumber(internationalNumber).then((confirmation) => {
        //     setVisible(false)
        //     const currentValue = phone.replace(/[^\d]/g, '');
        //     props.navigation.navigate('Otp', {
        //         confirmation: confirmation,
        //         phone: currentValue
        //     })
        // }).catch((e) => {
        //     console.log(e)
        //     setVisible(false)
        //     alert('try again later')
        // })
    }



    const { t, i18n } = useTranslation();
    const font = t("font");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={{ flex: 1, justifyContent: "flex-start" }} imageStyle={{ opacity: .9, width: null, height: null, resizeMode: "stretch" }} source={require("../images/login.png")}>
                {/* <LangBtn/> */}
                <View style={styles.body}>
                    <SharedElement id="First">
                        <Image style={styles.logo} source={require('../images/logoh1.png')} />
                    </SharedElement>
                    <SharedElement id='Second'>
                        <Text style={[styles.texts, { fontFamily: font + "-Bold" }]}>{t('msg2')}</Text>
                    </SharedElement>
                </View>
                <View style={{ flex: 1 }} />
                <View style={styles.phone}>
                    <Phone setValueChange={updatephone} value={phone} />
                    <TouchableOpacity disabled={enabled} onPress={() => { login() }} style={[styles.btn, enabled && { opacity: .8 }]}>
                        <Text style={[styles.text, { fontFamily: font + "-SemiBold" }]}>{t('msg5')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3 }} />
                <Loading visible={visible} />
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: "space-around",
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20
    },
    texts:
    {
        color: palette.secondary,
        textAlign: "center",
        fontSize: 17,
        marginHorizontal: 60,
        lineHeight: 20,
        marginTop: 20
    },
    container: {
        flex: 1,
    },
    btn:
    {
        backgroundColor: palette.primary,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 25,
        borderRadius: 7,
        marginVertical: 30,
    },
    text:
    {
        color: palette.light,
        fontSize: 16
    },
    btnin:
    {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },
    lg: {
        marginHorizontal: 20,
        flex: 2
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20
    },
    bottom: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 10
    },
    top: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginVertical: 10
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: "contain"
    },
    btnCTm: {
        backgroundColor: "#303030",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        paddingBottom: 20,
        paddingTop: 10,
        marginBottom: -10
    },
    phone: {
        borderWidth: 0,
        elevation: 2,
        borderRadius: 8,
        backgroundColor: "#ffff",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 20,
        marginHorizontal: 10,
        paddingVertical: 20
    }
});

export default Login;