import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import TextTraduction from './textlang';
import Colors from '../palette'

function MinisubCategorie(props) {
  const { title, image, active, onPress } = props
  let res = title.split(' ')
  const a = []
  res.forEach(v => {
    let d = v[0].toUpperCase() + v.substring(1);
    a.push(d)
  });
  res = a.join(" ")
  return (
    <Pressable onBlur={() => alert(title)} onPress={onPress} style={[styles.si]}>
      <View style={[styles.btn, !active && { backgroundColor: "transparent" }]} />
      <TextTraduction style={[styles.st, active && { color: Colors.Gray }]}>{res}</TextTraduction>
      <View style={{
        borderRadius: 25,
        overflow: "hidden",
      }}>
        {
          active ? (
            <Image source={{ uri: image }} style={[styles.sim, { resizeMode: 'contain' }]} />
          ) : (
            <View style={styles.sim} />
          )
        }
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  si:
  {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 3,
    paddingVertical: 10,
    minWidth: 70
  },
  sim:
  {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  st:
  {
    fontSize: 14,
    color: Colors.Smoke,
    fontFamily: "Montserrat-Bold",
    textAlignVertical: "center",
    marginHorizontal: 10
  },
  btn: {
    backgroundColor: Colors.primary,
    width: 15,
    height: 15,
    borderRadius: 10,
  }
});
export default MinisubCategorie;