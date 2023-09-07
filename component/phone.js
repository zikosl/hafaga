import React from "react";
import {
    TextInput,
    View,
    Image,
    StyleSheet,
    Text,

} from "react-native";
import { PhoneNumberUtil } from 'google-libphonenumber';

export default function Phone({ setValueChange, value }) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const [active, setActive] = React.useState(false);
    const change = (text) => {
        const currentValue = text.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength == 9) {
            const number = phoneUtil.parse(currentValue, "DZ")
            //setValue(phoneUtil.format(number))
            setValueChange(phoneUtil.format(number))
        }
        else {
            //setValue(currentValue)
            setValueChange(currentValue)
        }
    }
    React.useEffect(() => {
        change(value)
    }, [])
    return (

        <View style={[styles.flex, active && { borderColor: "#FAD103", borderWidth: 1, elevation: 0 }]}>
            <View style={styles.phone}>
                <Image source={require('../images/DZ.png')} style={styles.img} />
                <Text style={styles.text}>+ 213</Text>
            </View>
            <TextInput caretHidden={true} placeholder={"000 00 00 00"} onFocus={() => setActive(true)} onBlur={() => setActive(false)} onChangeText={change} value={value} maxLength={13} keyboardType={"phone-pad"} style={styles.input} />
        </View>

    )
}

const styles = StyleSheet.create({
    flex: {
        borderWidth: 1,
        borderColor: "#dcdcdc",
        flexDirection: "row",
        paddingVertical: 5,
        marginVertical: 6,
        borderRadius: 7,
        paddingLeft: 10
    },
    img: {
        width: 32,
        resizeMode: "contain",
        marginRight: 4
    },
    phone: {
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: "center"
    },
    text: {
        fontFamily: "Dosis-Medium",
        fontSize: 17
    },
    input: {
        flex: 1,
        fontFamily: "Dosis-Medium",
        fontSize: 17,
        color: "#323232",
        textAlign: "center"
    }
})