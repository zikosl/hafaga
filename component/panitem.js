import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Colors from "../palette"

function PannierItem({ title, quantite, prix, onPress, plugins, produitQ, current }) {
  const count = quantite;
  produitQ = produitQ == -1 ? 10 : produitQ;
  let final = Math.min(10 - current + quantite, produitQ);
  final = Math.min(10, final);
  const plus = () => {
    if (count < final) {
      onPress(count + 1)
      //setCount(count+1)
    }
  }
  const Miin = () => {
    if (count > 0) {
      onPress(count - 1)
      //setCount(count-1)
    }
  }
  return (
    <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10 }}>
      <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
        <Image source={require('../images/price.png')} style={styles.img} />
        <Text style={{ fontSize: 16, fontFamily: "Gilroy-SemiBold" }}>{title}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity disabled={count == 0} onPress={() => Miin()} style={[styles.btnv, count == 0 && { opacity: .7, backgroundColor: "#d9d8a9" }]}>
          <Text style={styles.btnt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{count}</Text>
        <TouchableOpacity disabled={count == final} onPress={() => plus()} style={[styles.btnv, count == final && { opacity: .7, backgroundColor: "#d9d8a9" }]}>
          <Text style={styles.btnt}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 16, textAlign: "right", fontFamily: "Gilroy-Medium" }}>{prix}.00 DA</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  btnv:
  {
    backgroundColor: Colors.primary,
    paddingBottom: 4,
    width: 30, height: 30, borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnt:
  {
    fontFamily: 'Gilroy-Medium',
    fontSize: 24,
  },
  value:
  {
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 10
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: Colors.primary
  }
});
export default PannierItem;