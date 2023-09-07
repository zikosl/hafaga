import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList
} from 'react-native';
import palette from '../palette';
const { width, height } = Dimensions.get('screen')
const yellow = "#FAD103";

function MarketData(props) {
  const { source, navigation, adress, title, id } = props
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Menu', {
      sid: id,
      title: title,
      image: source,
      adress: adress
    })}>
      <View style={styles.container}>
        <View style={{ borderRadius: 10, overflow: "hidden" }}><Image source={{ uri: source }} style={styles.image} /></View>
        <View style={styles.tnt}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image source={require('../images/c.png')} style={{ width: 30, height: 30, tintColor: palette.primary, resizeMode: "contain" }} />
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container:
  {
    width: width / 2 - 20, marginHorizontal: 10, marginVertical: 20,
    alignItems: "center",
    borderColor: '#efefef',
    borderRadius: 22,
    borderWidth: 1,
  },
  image:
  {
    width: width / 4, height: width / 4, resizeMode: "cover", borderRadius: width / 8
  },
  title:
  {
    fontSize: 16, color: "#666",
    fontFamily: "Gilroy-Medium"
  },
  tnt:
  {
    flexDirection: "row", flex: 1, alignItems: "center",
    justifyContent: "center", marginVertical: 10,
    paddingHorizontal: 20,

  }
});

export default MarketData;