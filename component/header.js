import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraggableButton from '../component/draggable';

function Header (props)
{
    const navigation = useNavigation()
    const back = typeof props.back != "undefined"
    const isloading = props.is
    return (
        <View style={styles.header}>
            <ScrollView horizontal contentContainerStyle={[isloading && {flex:1},{alignItems:"center"}]} showsHorizontalScrollIndicator={false}>
            <TouchableHighlight  onPress={()=>{if(back){navigation.goBack()}}}>
                <Image style={styles.logo} source={require('../images/logo2.png')}/>
            </TouchableHighlight>
            {props.children}
            </ScrollView>
            {
            typeof props.pan == 'undefined' && (
                <DraggableButton/>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:"#303030",
        paddingVertical:5,
        flexDirection:"row",
        alignItems:"center",
    },
    logo:{
        height:25,
        resizeMode:"contain",
        width:100,
        marginRight:30
    }
});

export default Header;