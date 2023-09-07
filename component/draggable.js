import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

export default function DraggableButton({style}){
  const navigation = useNavigation()
    return(
      <TouchableOpacity onPress={()=>navigation.navigate("Facture")} style={[styles.pan,style]} >
                  <Image style={styles.pimage} source={require('../icons/pan.png')}></Image>
      </TouchableOpacity>
    )
    
}
const styles = StyleSheet.create({
    pan:{
      //position:"absolute",
      padding:0,
      borderRadius:28,
      justifyContent:"center",
      alignItems:"center",
      alignSelf:"flex-end",
      //top:480,
      //right:20,
    },
    pimage:{
      width:49,
      height:49,
      resizeMode:"contain",
    },
  
  
  });