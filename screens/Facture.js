import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  PermissionsAndroid,TouchableOpacity, Animated
} from 'react-native';
import Header from '../component/header'
import MiniMap from '../component/minmapn';
const yellow = "#FAee03";

class FactureUn extends React.Component{
  render =() => {
    return (
      <View style={{justifyContent:"center",flex:1,backgroundColor:"#fff"}}>

            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Image  source={require("../images/unavailable.png")}  style={{width:120,height:120,resizeMode:"contain",opacity:this.Fade}} />
              <Text style={{fontFamily:"MontserratAlternates-SemiBold",flexWrap:"wrap",opacity:this.Fade,color:"#822",marginTop:20,width:150,textAlign:"center",fontSize:14}}>ce service n'est pas disponible dans votre location actuel</Text>
            </View>
      </View>
    );
  };
}
  const styles = StyleSheet.create({
  });

export default FactureUn;