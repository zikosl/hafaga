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
  requireNativeComponent
} from 'react-native';
import palette from '../palette';
const yellow = "#FAD103";


export default function Plugin({ prix, name, update }) {

  const [i, setI] = React.useState(0)
  const add = () => {
    if (i < 20) {
      setI(i + 1)
    }
    update(
      {
        prix: prix,
        name: name,
        Quentite: i
      }
    )
  }
  const min = () => {
    if (i > 0) {
      setI(i - 1)
    }
    update(
      {
        prix: prix,
        name: name,
        Quentite: i
      }
    )
  }
  return (
    <SafeAreaView style={styles.flex}>
      <Text style={styles.title}>{name}</Text>
      <Text style={[styles.title, { alignSelf: "flex-end", marginTop: -28, color: "#00223d" }]}>{prix} DA</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => min()} style={styles.btn}>
          <Text style={styles.btnt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{i}</Text>
        <TouchableOpacity onPress={() => add()} style={styles.btn}>
          <Text style={styles.btnt}>+</Text>
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
    paddingBottom: 10,
    borderRadius: 10,
    marginVertical: 7,
    borderColor: "#888"
  },
  title: {
    fontFamily: "MavenPro-Medium",
    textAlign: "center",
    fontSize: 18,
    marginTop: -10,
    alignSelf: "flex-start",
    backgroundColor: "#fff"
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
    marginTop: 20
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