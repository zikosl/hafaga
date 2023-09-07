import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';

class HomeCard extends React.Component {
    render(){
        const {source,number} =this.props
        return (
            <View style={{flex:1}}>
                <ImageBackground style={styles.offre} source={source}>
                <ImageBackground style={styles.sale} source={require('../images/sale.png')}>
                    <View style={{flexDirection:"row",flex:1,alignItems:'center'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize:45,fontWeight:"bold",fontStyle:'italic',textAlign:"right"}}>{number}</Text>
                    </View>
                    <View style={{flex:1,alignItems:"flex-start",paddingLeft:2}}>
                        <Text style={{fontWeight:"bold",fontStyle:'italic'}}>%</Text>
                        <Text style={{fontWeight:"bold",fontStyle:'italic'}}>OFF</Text>
                    </View>
                    </View>
                </ImageBackground>
                </ImageBackground>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    offre:
    {
      width:null,
      height:150,
      resizeMode:'contain',
      borderRadius:5,
      overflow:"hidden",
      marginVertical:10,
      marginHorizontal:20,
      justifyContent:'center',
      paddingVertical:10
    },
    sale:
    {
      width:120,
      height:120,
      resizeMode:'contain',
      overflow:"hidden",
      marginLeft:10,
      paddingLeft:10
    }
});

export default HomeCard;
