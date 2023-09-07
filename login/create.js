import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Text
} from 'react-native';
import TextTraduction from '../component/textlang';
import Input from '../component/input';
import Loading from '../component/loading';
import API from "../api"
import LoginContext from '../context/logincontext';
import messaging from '@react-native-firebase/messaging';
import palette from '../palette';
import { useTranslation } from 'react-i18next';

function CreateProfile(props) {
    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState("");
    const [uname, setUname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const Context = React.useContext(LoginContext)
    const { phone } = props.route.params;

    const signup = async () => {
        setVisible(true)
        const a = await API.post('client/signup', {
            name: name,
            uname: uname,
            email: email,
            phone: phone
        })
        Context.setInformation(a.data)
        sendFcmToken(a.data.id).then(e => Context.setToken(e));
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
    const { t, i18n } = useTranslation();
    const font = t('font')
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={{ flex: 1, justifyContent: "space-between" }} imageStyle={{ opacity: 1, width: null, height: null, resizeMode: "stretch" }} source={require("../images/login.png")}>
                <Image style={styles.logo} source={require('../images/logoh1.png')} />

                <View style={styles.phone}>
                    <Input onValueChange={(v) => setName(v)} placeholder={t('create.item1')} />
                    <Input onValueChange={(v) => setUname(v)} placeholder={t('create.item2')} />
                    <Input onValueChange={(v) => setEmail(v)} placeholder={t('create.item3')} />

                    <TouchableOpacity disabled={name == "" || uname == ""} onPress={() => { signup() }} style={[styles.btn, visible && { opacity: .8 }]}>
                        <Text style={[styles.text, { fontFamily: font + "-SemiBold" }]}>{t('create.item4')}</Text>
                    </TouchableOpacity>
                </View>
                <View />
                <View />
                <View />
                <Loading visible={visible} />
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
        maxHeight: 250,
        minHeight: 250
    },
    textInputContainer: {
        marginBottom: 20,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
    },
    reloader: {
        width: 50, height: 50,
        alignSelf: "center",
        marginVertical: 4
    }
});

export default CreateProfile;