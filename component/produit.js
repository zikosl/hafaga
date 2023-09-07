import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import { URL } from "../api";
import Colors from "../palette"
const { width, height } = Dimensions.get('screen')
const yellow = "#FAD103";


function Produit(props) {
  const { catid, details, hidden, id, image, plugins, prix, promo, quantite, surcommand, title } = props
  const text = title[0].toUpperCase() + title.substring(1).toLowerCase()
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('PF', props)}
      style={
        styles.container
      }>
      <SharedElement id={image}>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <FastImage style={styles.image} source={{ uri: URL + "/" + image }} />
        </View>
      </SharedElement>
      <SharedElement id={title}>
        <Text style={styles.title}>{text}</Text>
      </SharedElement>
      <View style={styles.btn}>
        <Image style={styles.icon} source={require('../images/add.png')} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container:
  {
    flex: 1, backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 30,
    marginVertical: 25,
    marginHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  name:
  {
    fontSize: 18, color: '#303030',
  },
  image:
  {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title:
  {
    fontSize: 14, color: '#303030',
    fontFamily: "Gilroy-Medium",
    textAlign: "center",
    marginVertical: 10
  },
  btn:
  {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: -7,
    marginBottom: -7
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.light
  }
});

export default Produit;