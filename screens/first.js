import { useNavigation } from '@react-navigation/native';
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
    Dimensions,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import palette from '../palette';
const { width } = Dimensions.get('screen')
import { useTranslation } from 'react-i18next';



function First(props) {
    const font = t("font");
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={{ flex: 1, justifyContent: "space-between" }} imageStyle={{ opacity: .9, width: null, height: null, resizeMode: "stretch" }} source={require("../images/splash.png")}>
                <Image source={require('../images/sd.png')} style={styles.img} />
                <View style={styles.body}>
                    <SharedElement id='First'>
                        <Image style={styles.logo} source={require('../images/logoh1.png')} />
                    </SharedElement>
                    <SharedElement id='Second'>
                        <Text style={[styles.text, { fontFamily: font + "-Bold" }]}>{t('msg2')}</Text>
                    </SharedElement>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.btn}>
                    <Text style={[styles.btnin, { fontFamily: font + "-Medium" }]}>{t('msg1')}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    img: {
        width: width - 60,
        height: width - 60,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 45
    },
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
    text:
    {
        color: palette.secondary,
        textAlign: "center",
        fontSize: 17,
        marginHorizontal: 60,
        lineHeight: 20,
        marginTop: 20
    },
    btn:
    {
        backgroundColor: "#FEFEFE",
        paddingVertical: 15,
        marginHorizontal: 60,
        borderRadius: 7,
        elevation: 2,
        marginBottom: 45,
    },
    btnin:
    {
        fontSize: 16,
        color: palette.secondary,
        textAlign: "center"
    },
    container: {
        flex: 1,
    },

    lg: {
        marginHorizontal: 20,
        flex: 2
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

export default First;