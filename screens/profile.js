import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../palette';
import Header from "../component/header"
import TextTraduction from '../component/textlang';
import ToggleText from '../component/togglelangtext';
import Language from '../context/language';
import LoginContext from '../context/logincontext';
import { set } from 'lodash';
import { useNavigation } from '@react-navigation/core';
import MyCommands from './mycommands';
import palette from '../palette';
import { useTranslation } from 'react-i18next';
import { Logout } from 'iconsax-react-native';


const { width, height } = Dimensions.get('window')
const yellow = "#FAD103";
const dark = "#303030";
const phonUtile = PhoneNumberUtil.getInstance();

function Profile(props) {
  const Context = React.useContext(LoginContext);
  const { fname, lname, picture, color } = Context.login
  const tele = Context.login.phone
  const email = Context.login.mail
  const [edit, setEdit] = React.useState(false)
  const [name, setName] = React.useState(fname)
  const [Prename, setPrename] = React.useState(lname)
  const [phone, setPhone] = React.useState(tele == null ? "" : "0" + tele);
  const [mail, setMail] = React.useState(email)
  const navigation = useNavigation();
  const scrollRef = React.useRef();
  const scroll = () => {
    setEdit(!edit);
    if (edit) {
      scrollRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
    else {
      scrollRef.current?.scrollToEnd()
    }
  }
  const { t, i18n } = useTranslation();
  const font = t("font");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", width: width }} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require('../images/login2.png')} imageStyle={{ opacity: 1, width: width, resizeMode: "cover" }} style={{ flex: 1, justifyContent: "center", borderRadius: 20 }}>
        {
          typeof picture == "undefined" ? (
            <InitialIcon font={font + "-Bold"} initials={fname[0] + lname[0]} color={color} />
          ) : (
            <View
              style={{
                padding: 4,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 39,
                alignSelf: "center"
              }}
            >
              <Image source={{ uri: picture }}
                style={{
                  backgroundColor: '#0ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 35,
                  width: 70,
                  height: 70,
                  borderColor: "#fff"
                }} />
            </View>
          )
        }
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "center",
          marginVertical: 20,
        }}>
          <TextInput editable={false} style={[styles.input, { fontSize: 18, fontFamily: "MontserratAlternates-Medium" }]} onChangeText={setName} value={name} />
          <TextInput editable={false} style={[styles.input, { fontSize: 18, fontFamily: "MontserratAlternates-Medium" }]} onChangeText={setPrename} value={Prename} />
        </View>
        <View style={{
          borderWidth: 1,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          borderRadius: 20,
          borderColor: "#ddd",
          paddingTop: 20
        }}>
          <Text
            style={[styles.font, { fontFamily: font + "-Bold" }]}
          >
            {t('msg18')}
          </Text>
          <View style={{ justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
            <Image style={{ width: 30, resizeMode: "contain", marginRight: 7, tintColor: palette.Gray }} source={require('../images/mail.png')} />
            <Text style={[styles.input, { fontFamily: font + "-Bold", }]}>{t('msg3')}</Text>
            <TextInput editable={false} onChangeText={setMail} style={[styles.input, { fontSize: 16, fontFamily: "Poligon Regular" }]} value={mail} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Image style={{ width: 30, resizeMode: "contain", marginRight: 7, tintColor: palette.Gray }} source={require('../images/phone.png')} />
            <Text style={[styles.input, { fontFamily: font + "-Bold", }]}>{t('msg14')}</Text>
            <TextInput editable={false} style={[styles.input, { fontSize: 16, fontFamily: "Poligon Regular" }]} onChangeText={setPhone} value={phone.toString()} />
          </View>
        </View>
        <MyCommands />

        <TouchableOpacity style={styles.btnQ} onPress={Context.logout}>
          <Logout size={30} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

function Setting({ title, image, style, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.setting, style]}>
      <Image source={image} style={styles.image} />
      <Text style={styles.titlesetting}>{title}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  titlesetting: {
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    color: Colors.secondary
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 7,
    tintColor: Colors.Gray
  },
  setting: {
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 10
  },
  title: {
    color: "#F7DB02",
    marginLeft: 25,
    fontSize: 16,
    //backgroundColor:'#fff',
    flex: 1,
    marginVertical: 15
  },
  btnQ:
  {
    backgroundColor: palette.primary,
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 10
  },
  text:
  {
    color: "#303030",
    fontFamily: "Dosis-Medium"
  },
  font: {
    color: "#505050",
    fontSize: 17,
    position: "absolute",
    top: -13,
    left: 20,
    paddingHorizontal: 4
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    tintColor: palette.primary,
    width: 45,
    height: 45
  },
  input:
  {
    fontFamily: "Poligon Medium",
    fontSize: 18,
    letterSpacing: 1,
    color: "#222",
    paddingHorizontal: 4
  },
  img: {
    width: 30,
    height: 30,
    tintColor: "#323232"
  }
});

const InitialIcon = ({ initials, color, font }) => {
  return (
    <View
      style={{
        padding: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 39,
        alignSelf: "center"
      }}
    >
      <View
        style={{
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 35,
          width: 70,
          height: 70,
          borderColor: "#fff"
        }}>
        <Text style={{ color: 'white', fontFamily: font, fontSize: 25, letterSpacing: 1 }}>{initials}</Text>
      </View>
    </View>
  );
};


export default Profile;