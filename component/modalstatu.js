import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function ModalStatu({source,text,onPress})
{
  return(
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.qst}>{text}</Text>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <TouchableWithoutFeedback onPress={()=>onPress(false)}>
          <Image source={require('../images/dislike.png')} style={styles.unlike} />
        </TouchableWithoutFeedback>
          <Image source={source} style={styles.icon} />
          <TouchableWithoutFeedback onPress={()=>onPress(true)}>
          <Image source={require('../images/like.png')} style={styles.like} />
        </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#11111155",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  flex:{
    paddingVertical:30,
    paddingHorizontal:40,
    backgroundColor:"#fff",
    borderRadius:7
  },
  like:{
    width:40,
    height:40,
    resizeMode:"contain",
    alignSelf:"center",
    tintColor:"#66ff61"
  },
  unlike:{
    width:40,
    height:40,
    resizeMode:"contain",
    alignSelf:"center",
    tintColor:"#ff6c4f"
  },
  icon:{
    width:80,
    height:80,
    resizeMode:"contain",
    marginHorizontal:40
  },
  qst:{
    fontFamily:"Dosis-Medium",
    fontSize:18,
    textAlign:"center",
    marginBottom:15
  }
})

export default ModalStatu