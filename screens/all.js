import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import CategorieCard from '../component/catcard';
import Header from "../component/header"

class All extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            sub:[],
            DATA:[]
        }
    }
    componentDidMount()
    {
        this.Mount = true
        this.getAllType()
    }
    componentWillUnmount()
    {
        this.Mount = false
    }
    async getAllType()
    {
        const {id} = this.props.route.params
        const ARR=[]
        const IDs=[]
    }
    async getAllDATA(id)
    {
        const GENERAL =[]
        if(this.Mount)
            this.setState({DATA:GENERAL})
    }
    render =() => {
        const {sub,DATA} = this.state
        const {title} = this.props.route.params
    return (
        <View style={{backgroundColor:'#EAEFF6',flex:1}}>
            <Header back={true}>
                <Text style={styles.title}>{title}</Text>
            </Header>
            {
                DATA.map((v,i)=>{
                 return (<View key={i}>
                         <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{flex:1,marginBottom:80}}>
                                {   
                                    v.data.map((v,i)=><CategorieCard key={i} source={v.image} idc={v.idc} adress={v.adress} title={v.service} id={v.id} rate={4.5} navigation={this.props.navigation}/>)
                                }
                            </View>
                         </ScrollView>
                        </View>
                        )
                     })
            }
        </View>
    );
    };
}
const styles = StyleSheet.create({
    title:{
        color:"#F7DB02",
        marginLeft:25,
        fontSize:16,
        //backgroundColor:'#fff',
        flex:1,
        marginVertical:10,
        fontFamily:"MavenPro-Bold"
    },
    head:
    {
        fontSize:20,
        color:"#777",
        marginVertical:10,
        fontFamily:"MavenPro-Medium",
        marginLeft:10
    },

});

export default All;