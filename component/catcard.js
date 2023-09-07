import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import Mark from '../component/mark';

class CategorieCard extends React.Component {
    render(){
    const {source,navigation,rate,title,id,adress,idc} = this.props
    let titles = title
    if(title.length>30)
    {
      titles = title.substr(0, 30)+"..."
    }
        return (
          <TouchableWithoutFeedback onPress={()=>navigation.navigate('Detaill',{
            title:title,
            id:id,
            adress:adress,
            image:source,
            idc:idc,
            screen:"All"
          })}>
              <ImageBackground source={{uri:source}} imageStyle={{resizeMode:"cover"}} style={[styles.img]}>
                  <View>
                      <Mark value={titles}/>
                  </View>
              </ImageBackground>
          </TouchableWithoutFeedback>
          
        );
    }
};

const styles = StyleSheet.create({
  img:
  {
      height:160, 
      borderRadius:10,
      overflow:"hidden",
      margin:10,
      flex:1
  }
});

export default CategorieCard;