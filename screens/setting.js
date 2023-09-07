import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  RefreshControl, TouchableOpacity, Animated,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import Header from '../component/header'
import LoginContext from '../context/logincontext';
import _, { lte } from 'lodash'
import PannierItem from '../component/panitem';
import Geolocation from 'react-native-geolocation-service';
import MiniMap from '../component/minmapn';
import Location from '../context/location';
import { useNavigation } from '@react-navigation/core';
import Colors from "../palette"

function Item(props) {
  const { title, navigation, data } = props
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Traitment', { data: data, N: title })} style={styles.menu}>
      <Text style={styles.text}>Commande N° {title}</Text>
    </TouchableOpacity>
  )
}
function MyMapPannier(props) {
  const ctx = React.useContext(Location)

  return (
    <MiniMap current={ctx.location} {...props} />
  )
}
function Facture(props) {
  const provider = React.useContext(Location)
  return (
    <Setting {...props} provider={provider} />
  )
}
const Setting = (props) => {
  const [values, setValues] = React.useState([])
  const [VP, setVP] = React.useState([])
  const [wait, setWait] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const navigation = useNavigation();
  const reload = async () => {
    setLoad(true)
    await context.updatePannier();
    setLoad(false)
  }
  const context = React.useContext(LoginContext)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      context.updatePannier();
    })
    return unsubscribe;
  }, [props.navigation]);
  const get = () => {
    const a = [], b = []
    console.log(context.Pannier.length)
    setWait(context.Pannier.length == 0);
    context.Pannier.forEach((v) => {
      if (v.step > 0) {
        b.push(v)
      }
      else {
        a.push(v)
      }
    })
    return [a, b]
  }
  React.useEffect(() => {
    let Mount = true;
    fade()
    if (Mount) {
      const a = get();
      setValues(a[0]);
      setVP(a[1])
    }
    return () => Mount = false;
  }, [context.Pannier])
  const Fade = React.useRef(new Animated.Value(1)).current
  const fade = () => (
    Animated.loop(
      Animated.sequence([
        Animated.timing(Fade, {
          toValue: .5,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(Fade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    )
  );
  const condition = values.length == 0 && VP.length == 0;
  return (
    <View style={{ justifyContent: "center", flex: 1, backgroundColor: "#fff" }}>

      {
        wait ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animated.Image source={require("../images/document.png")} style={{ width: 120, tintColor: "rgb(30, 30, 110)", height: 120, resizeMode: "contain", opacity: Fade }} />
            {
              condition ? (
                <Animated.Text style={{ fontFamily: "MontserratAlternates-SemiBold", color: "rgb(30, 30, 110)", marginTop: 20, width: 150, textAlign: "center", fontSize: 14 }}>No Commande</Animated.Text>

              ) : (
                <ActivityIndicator size="large" color="#6d38ff" />
              )
            }
          </View>
        ) :
          (<View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}>
            <View style={{ alignItems: "center" }}>
              <View style={{ alignItems: "center", paddingTop: StatusBar.currentHeight, paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 7 }}>
                  <Image style={styles.img} source={require('../images/invoice.png')} />
                  <Text style={styles.cmd}>Cart</Text>
                </View>
                <View style={{ width: 50, height: 3, backgroundColor: Colors.primary, alignSelf: "flex-start" }} />
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}
              refreshControl={<RefreshControl colors={["#ffe600", "#c0d100", "#ccff00"]} refreshing={load} onRefresh={reload} />}
            >

              {
                VP.map((v, i) => { return <Item key={i} title={v.id} data={v} navigation={navigation} /> })
              }
              {
                values.map((v, i) => {
                  return (
                    <MyMapPannier navigation={navigation} key={i} maps={JSON.parse(v.map)} tarif={v.prix} statu={v.online} panid={v.id} data={JSON.parse(v.commands)} service={v.service} />
                  )
                })
              }
            </ScrollView>
          </View>)
      }
    </View>
  );
}
const styles = StyleSheet.create({
  btn:
  {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    borderRadius: 7,
    marginHorizontal: 20,
    marginBottom: 20
  },
  view: {
    borderWidth: 1, padding: 10,
    paddingTop: 25,
    marginTop: 10,
    borderRadius: 10,
    borderColor: Colors.Smoke
  },
  head: {
    fontFamily: "Gilroy-Bold",
    fontSize: 22,
    color: Colors.Diablo,
    left: 5,
    backgroundColor: "#fff",
    position: "absolute",
    top: -18,
  },
  cmd:
  {
    fontSize: 20, fontFamily: 'Gilroy-SemiBold', textAlign: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    color: Colors.Gray
  },
  menu:
  {
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#ccc", borderRadius: 7,
    marginVertical: 10,
    marginHorizontal: 10
  },
  text:
  {
    fontSize: 16, fontFamily: 'Gilroy-Bold',
  },
  img: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: Colors.Gray
  },
  scroll: {
    backgroundColor: "#fff",
  }
});
export default Facture;