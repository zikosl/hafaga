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
    Keyboard
} from 'react-native';
import TextTraduction from '../component/textlang';
import OTPTextView from '../component/otp';
import auth from "@react-native-firebase/auth"
import API from "../api"
import LoginContext from '../context/logincontext';
import { useNavigation } from '@react-navigation/native';
import api from '../api';
import palette from '../palette';
import { useTranslation } from 'react-i18next';


function PhoneOtp(props) {
    const [visible, setVisible] = React.useState(true);
    const [value, setValue] = React.useState("");
    const [press, setPress] = React.useState(false);
    const [valid, setValid] = React.useState(false);
    const navigation = useNavigation();
    const Context = React.useContext(LoginContext);
    const { id } = props.route.params;
    console.log(id, value)
    const login = async () => {
        setPress(true);
        api.post("client/check", { id: id, token: value }).then(e => {
            setValid(true);
            navigation.navigate('Create', { id: id });
        }).catch(e => {
            setPress(false);
            alert("OTP invalid");
        })
    }
    const hundlechange = (text) => {
        setValue(text)
        if (text.length == 6) {
            setVisible(false)
        }
    }
    const { t, i18n } = useTranslation();
    const font = t("font");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={{ flex: 1, justifyContent: "space-between" }} imageStyle={{ opacity: 1, width: null, height: null, resizeMode: "stretch" }} source={require("../images/login.png")}>
                <Image style={styles.logo} source={require('../images/logoh1.png')} />

                <View style={styles.phone}>
                    <OTPTextView
                        containerStyle={styles.textInputContainer}
                        handleTextChange={text => hundlechange(text)}
                        textInputStyle={styles.roundedTextInput}
                        inputCount={6}
                        defaultValue={value}
                        tintColor={valid ? "#27e36c" : '#FAD10C'}
                        allactive={valid}
                    />
                    {
                        valid ? (<>
                            <Image source={require('../images/approved.png')} style={[styles.reloader, { tintColor: "#27e36c", width: 28, height: 28, marginVertical: 6 }]} />
                        </>
                        ) :
                            (
                                <>
                                    {
                                        !press ? (
                                            <TouchableOpacity disabled={visible} onPress={() => { login() }} style={[styles.btn, visible && { opacity: .8 }]}>
                                                <Text style={[styles.text, { fontFamily: font + "-SemiBold" }]}>{t('msg5')}</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <Image source={require('../images/hafaga.gif')} style={styles.reloader} />
                                        )
                                    }
                                </>
                            )
                    }

                </View>
                <View />
                <View />
                <View />
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1, justifyContent: "space-between"
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
        color: palette.secondary,
        fontSize: 16
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20
    },
    phone: {
        borderWidth: 0,
        elevation: 2,
        borderRadius: 8,
        backgroundColor: "#ffff",
        marginVertical: 20,
        paddingVertical: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        maxHeight: 180,
        minHeight: 180
    },
    textInputContainer: {
        marginBottom: 20,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 2,
    },
    reloader: {
        width: 50, height: 50,
        alignSelf: "center",
        marginVertical: 4
    }
});

export default PhoneOtp;