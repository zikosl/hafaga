import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Header from "../component/header"
import MarketData from '../component/marketdata';
import Colors from '../palette';
const { width, height } = Dimensions.get('screen')
import API, { URL } from '../api';
import Produit from '../component/produit';

const Menu = (props) => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([])
    const { title, sid, adress, image } = props.route.params
    React.useEffect(() => {
        let Mount = true
        getMenu().then(a => {
            if (Mount) {
                setData(a)
            }
        })
        return () => Mount = false;
    }, [])
    const getMenu = async () => {
        const a = await API.post('client/getproduit', { mid: sid })
        return a.data
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ImageBackground style={styles.img} source={require('../images/bglogo.png')}>
                <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.logo} source={require('../images/logoinverse.png')} />
                        <View style={{ justifyContent: "flex-end", flex: 1, marginHorizontal: 20, marginBottom: 20 }}>
                            <Text style={{ fontSize: 22, color: Colors.secondary, fontFamily: "Poligon Medium" }}>{title}</Text>
                            <View style={{ width: 50, height: 3, backgroundColor: Colors.primary, marginVertical: 3 }} />
                            <Text style={{ fontSize: 14, color: Colors.secondary, fontFamily: "Gilroy-Medium" }}>{adress}</Text>
                        </View>
                    </View>
                    <View style={{ borderRadius: 20, padding: 5, elevation: 1, marginRight: 5, backgroundColor: "#fff", alignSelf: "center" }}>
                        <Image style={{ width: 80, height: 80, resizeMode: "cover", borderRadius: 20 }} source={{ uri: image }} />
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={{ flex: 1.0 }}>
                <View
                    showsVerticalScrollIndicator={false}
                    style={{ flexDirection: 'row', flexWrap: "wrap" }}
                >
                    {
                        data.map((v, i) => {
                            return <View key={i} style={{ width: "50%" }}><Produit  {...v} /></View>
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colors.primary,
        marginLeft: 25,
        fontSize: 16,
        //backgroundColor:'#fff',
        flex: 1,
        marginVertical: 10
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: "contain"
    },
    head:
    {
        fontSize: 20,
        color: Colors.Gray,
        marginVertical: 10,
        fontFamily: 'Gilroy-SemiBold',
        marginLeft: 6
    },
    img:
    {
        width: width,
        marginHorizontal: 0,
        height: 200,
        backgroundColor: "#333",
        paddingTop: StatusBar.currentHeight
    },
    logo: {
        width: 180,
        height: 80,
        resizeMode: "contain",
    },
});

export default Menu;