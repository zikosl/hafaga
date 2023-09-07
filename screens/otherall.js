import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image
} from 'react-native';
import Header from "../component/header"
import Mark from '../component/mark';
const OtherAll =() => {
  return (
    <View style={{backgroundColor:'#EAEFF6',flex:1}}>
        <Header back={true}>
            <Text style={styles.title}>Markets</Text>
        </Header>
        <View>
            <ImageBackground source={require('../images/img.png')} imageStyle={{resizeMode:"cover"}} style={styles.img}>
                    <View style={{justifyContent:"flex-end",flex:1,marginLeft:20,marginBottom:20}}>
                        <Text style={{fontSize:22,color:'#fff'}}>Superette sans visa</Text>
                        <Text style={{fontSize:14,color:'#fff'}}>Rue Haweri Boumedaine</Text>
                    </View>
                    <Mark value="4.5"/>
            </ImageBackground>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    title:{
        color:"#F7DB02",
        marginLeft:25,
        fontSize:16,
        //backgroundColor:'#fff',
        flex:1,
        marginVertical:10
    },
    img:
    {
        width:null,
        height:180,
        borderRadius:20,
        overflow:"hidden",
        margin:10
    }
});

export default OtherAll;