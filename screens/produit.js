import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
  _ScrollView,
  ToastAndroid
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import api from '../api';
import API, { URL } from "../api";
import TextTraduction from '../component/textlang';
import Location from '../context/location';
import LoginContext from '../context/logincontext';
import Colors from "../palette"
const { width, height } = Dimensions.get('screen')


function ProduitFull(props) {
  const [plugin, setPlugin] = React.useState([])
  const [Q, setQ] = React.useState(1);
  const [Enabled, setEnabled] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const { servid, details, hidden, id, image, plugins, prix, promo, quantite, surcommand, title } = props.route.params
  const navigation = useNavigation();
  const context = React.useContext(LoginContext)
  const pannier = context.checkPannier(servid);
  const location = React.useContext(Location)
  const max = Math.min(quantite == -1 ? 10 : quantite, 10 - pannier)
  React.useEffect(() => { setEnabled(context.getPannierByKey(servid, id)) }, [context.Pannier])
  React.useEffect(() => {
    const sub = navigation.addListener('focus', () => api.post('client/serviceid', { id: servid }).then(v => {
      setInfo(v.data)
    }))
    return sub
  }, [props.navigation])
  console.log(Enabled, max, 10)
  const add = () =>
    API.post("client/addpannier", {
      sid: servid,
      cid: context.login.uid,
      pid: id,
      Q: Q,
      maps: {
        latitude: location.location.latitude,
        longitude: location.location.longitude
      }
    })
  return (
    <>
      <ScrollView style={
        styles.container
      }>
        <View
          style={{ flexDirection: 'row', marginVertical: 8 }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('../images/arrow.png')} />
          </TouchableWithoutFeedback>
        </View>
        <SharedElement id={image}>
          <View style={{ alignSelf: "center", marginVertical: 20, borderRadius: 15, overflow: "hidden" }}>
            <FastImage style={styles.image} source={{ uri: URL + "/" + image }} />
          </View>
        </SharedElement>
        <Counter update={(c) => setQ(c)} max={max} />
        <View
          style={{ flexDirection: 'row', marginTop: 30, paddingHorizontal: 20 }}
        >
          <SharedElement id={title}>
            <TextTraduction style={styles.title}>{title}</TextTraduction>
          </SharedElement>
          <Text style={[styles.prix, { color: Colors.Diablo }]}>{promo == -1 ? prix : promo}<Text style={{ fontFamily: Colors.Smoke }}>{promo != -1 && prix}</Text> <Text style={{ fontSize: 12 }}>DA</Text></Text>
        </View>
        <View
          style={{ marginTop: 30, paddingHorizontal: 20 }}
        >
          <TouchableWithoutFeedback onPress={() => {
            if (!_.isEmpty(info)) {
              navigation.navigate('Map', { screen: "Categorie", params: info })
            }
          }}><Text style={styles.dtitle}>Détaille <Text style={{ color: Colors.Diablo }}>{!_.isEmpty(info) && '(' + info.service + ')'}</Text></Text></TouchableWithoutFeedback>
          <View style={{ alignSelf: 'flex-start', backgroundColor: Colors.primary, height: 2, width: 20 }} />
          <Text style={styles.details}>{details}</Text>
        </View>
        <View
          style={{ marginTop: 20, paddingHorizontal: 20 }}
        >
          <Text style={styles.dtitle}>Ajouts</Text>
          <View style={{ alignSelf: 'flex-start', backgroundColor: Colors.primary, height: 2, width: 28 }} />
          <ScrollView
            horizontal
          >
            {
              plugin.map((v, i) => <Plugins key={i} title={v.title} prix={v.prix} />)
            }
          </ScrollView>
        </View>
      </ScrollView>
      {
        Enabled && max > Q && (
          !surcommand ? (<AnimatedButton onPress={add} style={styles.btn}>
            <Text style={styles.icon}>Commandez maintenant </Text>
            <Image source={require('../icons/pan2.png')} style={{ width: 25, tintColor: Colors.secondary, height: 25 }} />
          </AnimatedButton>) : (
            <View style={[styles.btn, { alignSelf: "center", position: "absolute" }]}>
              <Text style={styles.icon}>Sur Commande </Text>
            </View>
          )
        )
      }
    </>
  );
};
function AnimatedButton(props) {
  const { style, onPress, children } = props;
  const anime = React.useRef(new Animated.Value(1)).current
  const [animate, setAnimate] = React.useState(true)
  const [final, setFinal] = React.useState(true)
  const navigation = useNavigation();

  const from = () => {
    Animated.timing(
      anime,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start()
  }
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "il ya une error",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const to = async () => {
    Animated.timing(
      anime,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
    setAnimate(false);
    onPress().then(e => {
      if (e.status == 202) {
        showToastWithGravity();
        navigation.goBack();
      }
      else {
        setFinal(false);
        navigation.navigate('Cart');
      }

    })
  }
  const scale = anime.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  })
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: scale
          }
        ],
        backgroundColor: "#fff",
        alignItems: "center"
      }}
    >
      <Pressable disabled={!animate} style={[style]} onPressIn={from} onPressOut={to}>
        {
          animate ? (children) : (
            <Image style={{ width: 30, height: 30 }} source={final ? require('../images/hafaga.gif') : require('../images/check.png')} />
          )
        }
      </Pressable>
    </Animated.View>

  )
}
function Counter({ update, max }) {
  const [i, setI] = React.useState(1)
  const newp = () => {
    if (i < max) {
      setI(i + 1)
      update(i + 1)
    }
  }
  const newm = () => {
    if (i > 1) {
      setI(i - 1)
      update(i - 1)
    }
  }
  return (
    <View style={styles.counter}>
      <TouchableWithoutFeedback onPress={() => newm()}><Text style={[styles.icons, { fontSize: 33 }]} >-</Text></TouchableWithoutFeedback>
      <Text style={styles.text}>{i}</Text>
      <TouchableWithoutFeedback onPress={() => newp()}><Text style={[styles.icons]} >+</Text></TouchableWithoutFeedback>
    </View>
  )
}
function Plugins({ prix, title }) {
  return (
    <View style={{ backgroundColor: Colors.Smoke, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
      <Text style={{ fontSize: 17, fontFamily: 'Gilroy-Medium', color: Colors.secondary }}>{title}</Text>
      <Text style={{ fontSize: 17, fontFamily: 'Gilroy-Medium', color: Colors.Gray }}>{prix} Da</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:
  {
    flex: 1, backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight
  },
  name:
  {
    fontSize: 18, color: '#303030',
  },
  image:
  {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 15,
  },
  title:
  {
    fontSize: 22, color: Colors.secondary + 'dd',
    textAlign: "left",
    textTransform: "capitalize",
    flex: 1
  },
  prix: {
    fontSize: 22, color: Colors.Smoke,
    fontFamily: "MontserratAlternates-SemiBold",
    textAlign: "right",
    flex: 1
  },
  dtitle:
  {
    fontSize: 20, color: Colors.secondary,
    fontFamily: "Gilroy-SemiBold",
    textAlign: "left",
    flex: 1
  },
  details: {
    fontSize: 18, color: Colors.Smoke,
    fontFamily: "Gilroy-SemiBold",
    textAlign: "left",
    textTransform: "capitalize",
    lineHeight: 25,
    marginTop: 10,
    flex: 1
  },
  btn:
  {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    flexDirection: "row-reverse",
    zIndex: 9999
  },
  icon: {
    textAlign: "center",
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    paddingLeft: 7
  },
  counter: {
    backgroundColor: Colors.primary,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    marginTop: 10,
  },
  text: {
    fontFamily: "MontserratAlternates-Bold",
    textAlign: "center",
    fontSize: 24,
    paddingHorizontal: 28,
  },
  icons: {
    fontSize: 30,
    fontFamily: "MontserratAlternates-Regular",
    textAlign: "center"
  }
});

export default ProduitFull;