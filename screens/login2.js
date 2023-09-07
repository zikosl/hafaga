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
    ScrollView,
} from 'react-native';
import Input from '../component/input'
import LoginContext from '../context/logincontext';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Loading from '../component/loading';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Language from '../context/language';
import LangBtn from '../component/togglelang';
import TextTraduction from '../component/textlang';
import Phone from '../component/phone';
import auth from '@react-native-firebase/auth'
import { PhoneNumberUtil } from 'google-libphonenumber';
import API from "../api"
import messaging from '@react-native-firebase/messaging';
import { SharedElement } from 'react-navigation-shared-element';
import palette from '../palette';
import api from '../api';
import Alerts from '../component/Alerts';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


GoogleSignin.configure({
    webClientId: '357825964619-bhl6sqe83cp2m2986h3bqmfv3fgbrhb9.apps.googleusercontent.com',
});
function Login(props) {
    const [visible, setVisible] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState("")
    const [alerts, setAlerts] = React.useState(false)
    const ctx = React.useContext(LoginContext);
    const navigation = useNavigation()
    const { t, i18n } = useTranslation();
    const reciveOTP = () => {
        setAlerts(false)
        setVisible(true)
        api.post('client/otp', {
            email: email,
            pass: pass
        }).then(({ data }) => {
            setVisible(false)
            navigation.navigate('Otp', {
                id: data.id
            })
        })
    }
    const login = () => {
        setVisible(true)
        api.post("client/login", {
            email: email,
            pass: pass
        }).then(r => {
            setVisible(false)
            console.log(r)
            if (r.status == 201) {
                navigation.navigate('Create', {
                    id: r.data.id
                })
            } else {
                ctx.setInformation(r.data);
                sendFcmToken(r.data.id).then(e => ctx.setToken(e));
            }
        }).catch((e) => {
            console.log(e)
            let response = e.response
            setVisible(false)
            if (response.status == 401) {
                setAlerts(true)
            }
            else if (response.status == 402) {
                alert(t("msg11"))
            }
            else {
                alert(t("msg10"))
            }
        })
    }
    const initUser = async token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id,email,first_name,last_name,picture.type(large)',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            async (error, user) => {
                const data = {}
                console.log(error)
                if (error) {
                    alert("Ressayer alterierment")
                    setVisible(false)
                } else {
                    data.id = user.id
                    data.fname = user.first_name
                    data.lname = user.last_name
                    data.mail = user.email
                    data.picture = user.picture.data.url
                    data.provider = 1
                    API.post("client/social", data).then((r) => {
                        ctx.setInformation(r.data);
                        sendFcmToken(r.data.id).then(e => ctx.setToken(e));
                        setVisible(false)
                    }).catch((e) => {
                        if (e.response.status == 401) {
                            alert(e.response.data)
                        }
                        else {
                            alert("Ressayer alterierment")
                        }
                        setVisible(false)
                    })
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    const onFacebookButtonPress = async () => {
        setVisible(true)
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            const data = await AccessToken.getCurrentAccessToken();
            initUser(data.accessToken)
        }
        catch (e) {
            console.log(error)
            alert("Ressayer alterierment")
            setVisible(false)
        }
        setVisible(false)
    }
    const sendFcmToken = async (id) => {
        try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            await API.post('token', { token: token, id: id });
            return token;
        } catch (err) {
            //Do nothing
            return;
        }
    };
    const onGoogleButtonPress = async () => {
        try {
            setVisible(true)
            const { user } = await GoogleSignin.signIn();
            const data = {}
            data.id = user.id
            data.fname = user.familyName
            data.lname = user.givenName
            data.mail = user.email
            data.picture = user.photo
            data.provider = 0
            API.post("client/social", data).then((r) => {
                ctx.setInformation(r.data);
                sendFcmToken(r.data.id).then(e => ctx.setToken(e));
                setVisible(false)
            }).catch((e) => {
                alert("Ressayer alterierment")
                setVisible(false)
            })
        }
        catch (e) {
            console.log(e)
            alert("Ressayer alterierment")
            setVisible(false)
        }
        setVisible(false)
    }
    const font = t("font");
    const enabled = email == "" || pass == "";
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={{ flex: 1, justifyContent: "space-between" }} imageStyle={{ opacity: 1, width: null, height: null, resizeMode: "stretch" }} source={require("../images/login.png")}>
                {/* <LangBtn/> */}
                <ScrollView>
                    <View style={styles.body}>
                        <SharedElement id="First">
                            <Image style={styles.logo} source={require('../images/logoh1.png')} />
                        </SharedElement>
                        <SharedElement id='Second'>
                            <Text style={[styles.texts, { fontFamily: font + "-Bold" }]}>{t('msg2')}</Text>
                        </SharedElement>
                    </View>
                    <View style={styles.phone}>
                        <Input style={{ marginBottom: 15 }} value={email} onValueChange={setEmail} placeholder={t('msg3')} />
                        <Input value={pass} onValueChange={setPass} placeholder={t('msg4')} />
                        <TouchableOpacity disabled={enabled} onPress={() => { login() }} style={[styles.btn, enabled && { opacity: .8 }]}>
                            <Text style={[styles.text, { fontFamily: font + "-SemiBold" }]}>{t('msg5')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center", alignItems: 'center', paddingTop: 12, paddingBottom: 16 }}>
                        <View style={{ borderTopWidth: 1, width: 40, height: 0, borderColor: palette.secondary }}></View>
                        <Text style={{ fontSize: 14, fontFamily: font + "-Bold", marginHorizontal: 20, color: palette.secondary }}>{t('msg6')}</Text>
                        <View style={{ borderTopWidth: 1, width: 40, height: 0, borderColor: palette.secondary }}></View>
                    </View>
                    <View style={{ flexDirection: "row", paddingVertical: 40, alignItems: "center", justifyContent: "space-evenly" }}>
                        <TouchableOpacity onPress={onFacebookButtonPress} style={styles.lobin}>
                            <Image style={styles.img} source={require('../images/facebook.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onGoogleButtonPress} style={styles.lobin}>
                            <Image style={styles.img} source={require('../images/google.png')} />
                        </TouchableOpacity>
                    </View>
                    <Loading visible={visible} />
                    <Alerts title={t('msg9')} deny={() => setAlerts(false)} callback={reciveOTP} visible={alerts} />
                </ScrollView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: "space-around",
        marginTop: 15,
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20,
        overflow: 'hidden',
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
    text:
    {
        color: palette.light,
        fontSize: 16
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
        borderRadius: 8,
        backgroundColor: "#ffff",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 20,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingTop: 45
    }
});

export default Login;