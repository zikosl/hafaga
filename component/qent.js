import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Text,
  ScrollView
} from 'react-native';
import palette from '../palette';
import Plugin from './plugins';
const yellow = "#FAD103";


export default function Quentite({ id, idProduit, plugin, onPress, max, maxp, prix }) {

  const [prices, setPrices] = React.useState([])
  const update = (v) => {
    let total = 0;
    let bool = false
    prices.some(i => {
      if (i.name == v.name) {
        i.prix = v.prix
        i.Quentite = v.Quentite
        bool = true;
        return true;
      }
      total += i.prix * i.Quentite
    })
    if (bool) {
      prices.push(v)
      total += v.prix * v.Quentite
    }
    setPrices(prices)
    setPrix(i * prix + total)
  }
  const [Prix, setPrix] = React.useState(prix)
  if (maxp != -1) {
    if (max != -1) {
      max = Math.min(max, 10 - maxp)
    }
    else {
      max = 10 - maxp
    }
  }
  let Max = max == -1 ? 10 : Math.min(max, 10)
  const Min = Math.min(1, Max)
  const [i, setI] = React.useState(Min)
  const add = () => {
    if (i < Max) {
      setI(i + 1)
    }
  }
  const min = () => {
    if (i > Min) {
      setI(i - 1)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Total : {Prix * i} DA</Text>
          <View style={styles.bar}>
            <Text style={styles.titleBar}>Quentité</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => min()} style={styles.btn}>
                <Text style={styles.btnt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{i}</Text>
              <TouchableOpacity onPress={() => add()} style={styles.btn}>
                <Text style={styles.btnt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            plugin.map((v, i) => <Plugin update={(v) => update(v)} name={v.plugin} key={i} prix={v.prix} />)
          }
          <TouchableOpacity disabled={i == 0} onPress={() => onPress(i)} style={[styles.cbtn, i == 0 && { opacity: .7 }]}>
            <Text style={styles.tbtn}>Ajouter</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontSize: 18,
    color: '#292700'
  },
  titleBar: {
    fontFamily: "MavenPro-Medium",
    textAlign: "center",
    fontSize: 18,
    marginTop: -10,
    alignSelf: "flex-start",
    backgroundColor: "#fff"
  },
  bar: {
    borderWidth: 1,
    paddingBottom: 10,
    borderRadius: 10,
    marginVertical: 7,
    borderColor: "#888"
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
  btn:
  {
    backgroundColor: palette.primary,
    paddingBottom: 4,
    width: 30, height: 30, borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnt:
  {
    fontFamily: 'MavenPro-Medium',
    fontSize: 24,
  },
  value:
  {
    fontFamily: "MontserratAlternates-Bold",
    fontSize: 20,
    flex: 1,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 4,
    borderColor: "#bbb",
    marginHorizontal: 40
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cbtn: {
    backgroundColor: palette.primary,
    alignSelf: "center",
    marginTop: 40,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 7,
    elevation: 1
  },
  tbtn: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 16
  }
})