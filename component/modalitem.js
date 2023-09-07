import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Text
} from 'react-native';
import palette from '../palette';
const yellow = "#FAD103";


export default function ModalItem({ detail, prix, title, id, service, image, adress, idc, hide }) {
  const [titre, setTitre] = React.useState(title)
  const [price, setPrice] = React.useState(prix)
  const [details, setDetails] = React.useState(detail)
  const [services, setServices] = React.useState(service)
  React.useEffect(() => {
    setTitre(title)
    setPrice(prix)
    setDetails(detail)
    setServices(service)
  }, [title])
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <Text style={styles.title}>{titre}</Text>
        <Text style={styles.num}>{price}.00 DA</Text>
        <Text style={styles.detail}>{details}</Text>
        {
          title != "" && (
            <TouchableOpacity style={styles.btn} onPress={() => {
              hide()
              navigation.navigate("DR", {
                id: id,
                adress: adress,
                image: image,
                title: service,
                idc: idc
              }
              )
            }}>
              <Text style={styles.text}>{services}</Text>
            </TouchableOpacity>
          )
        }
      </SafeAreaView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#11111122"
  },
  flex:
  {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0,
    elevation: 1
  },
  title: {
    fontFamily: "MavenPro-Medium",
    textAlign: "center",
    fontSize: 18
  },
  num: {
    fontFamily: "MavenPro-Bold",
    textAlign: "center",
    fontSize: 21
  },
  detail:
  {
    fontFamily: "MavenPro-Regular",
    textAlign: "center",
    fontSize: 16
  },
  btn: {
    backgroundColor: palette.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "center",
    borderRadius: 7
  },
  text: {
    fontFamily: "MavenPro-Regular",
    textAlign: "center",
    fontSize: 16
  }
})