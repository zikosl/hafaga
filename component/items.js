import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


function Items (props){
    const {title,onValueChange,i,select} = props
    const active = i==select
    return (
      <TouchableWithoutFeedback onPress={()=>onValueChange(i)}>
        <View style={[styles.flex,active && {borderBottomWidth:3,borderColor:"#333"}]}>
          <Text style={styles.input}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
  flex:{
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:10,
    paddingVertical:7,
    marginVertical:6,
    marginHorizontal:7,
  },
  input:
  {
    fontFamily:"Gilroy-Medium",
    fontSize:16,
    color:"#333"
  }
});

export default Items;