import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import TextTraduction from './textlang';
import Colors from '../palette'

function MiniCategorie(props) {
  const { title, image, stat, active, onPress } = props
  let res = title.split(' ')
  const a = []
  res.forEach(v => {
    let d = v[0].toUpperCase() + v.substring(1);
    a.push(d)
  });
  res = a.join(" ")
  return (
    <TouchableOpacity onPress={onPress} style={[styles.si]}>
      <View style={[styles.imgst, active && { backgroundColor: Colors.primary, borderColor: "#fff" }]}>
        <Image source={stat ? image : { uri: image }} style={styles.sim} />
      </View>
      <TextTraduction style={[styles.st, active && { color: Colors.Gray }]}>{res}</TextTraduction>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  si:
  {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,

    paddingHorizontal: 10,
    marginVertical: 3,
    paddingVertical: 10,
  },
  imgst:
  {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 7,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  sim:
  {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  st:
  {
    fontSize: 16,
    color: Colors.Smoke,
    fontFamily: "Montserrat-Bold",
    textAlignVertical: "center",
  },
});
export default MiniCategorie;