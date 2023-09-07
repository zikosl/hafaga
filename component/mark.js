import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
const Mark =(props) => {
  return (
    <View style={{flexDirection:"row",position:"absolute",alignItems:"center",borderRadius:5,elevation:1,top:94,paddingHorizontal:5,left:10,backgroundColor:'#F7DB02',justifyContent:'center'}}>
      <Text style={{fontFamily:"MavenPro-Medium"}}>{props.value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Mark;