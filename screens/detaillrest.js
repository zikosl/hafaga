import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Header from "../component/header"
import MarketData from '../component/marketdata';
import Colors from '../palette';
const { width, height } = Dimensions.get('screen')
import API, { URL } from '../api';

const DetaillRest = (props) => {
    const navigation = useNavigation();
    const { service, servid, adress, image, categories } = props.route.params
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ImageBackground style={styles.img} source={require('../images/bglogo.png')}>
                <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.logo} source={require('../images/logoinverse.png')} />
                        <View style={{ justifyContent: "flex-end", flex: 1, marginHorizontal: 20, marginBottom: 20 }}>
                            <Text style={{ fontSize: 22, color: Colors.secondary, fontFamily: "Poligon Medium" }}>{service}</Text>
                            <View style={{ width: 50, height: 3, backgroundColor: Colors.primary, marginVertical: 3 }} />
                            <Text style={{ fontSize: 14, color: Colors.secondary, fontFamily: "Gilroy-Medium" }}>{adress}</Text>
                        </View>
                    </View>
                    <View style={{ borderRadius: 20, padding: 5, elevation: 1, marginRight: 5, backgroundColor: "#fff", alignSelf: "center" }}>
                        <Image style={{ width: 80, height: 80, resizeMode: "cover", borderRadius: 20 }} source={{ uri: URL + '/' + image }} />
                    </View>
                </View>
            </ImageBackground>
            <View>
                <FlatList
                    data={JSON.parse(categories)}
                    numColumns={2}
                    keyExtractor={(item, i) => i}
                    style={{ paddingHorizontal: 7, paddingTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={(i) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Detaill', {
                                title: i.item.title,
                                id: servid,
                                adress: service,
                                image: i.item.image,
                                idc: i.item.id,
                            })} style={{ flex: 1, backgroundColor: "#fff", marginHorizontal: 7, justifyContent: "center", paddingVertical: 10, alignItems: "center", borderRadius: 10, borderWidth: 1, borderColor: "#efefef", marginVertical: 2 }}>
                                <Image source={{ uri: URL + '/' + i.item.image }} style={styles.image}></Image>
                                <Text style={{ fontFamily: "Gilroy-Bold", paddingVertical: 10 }}>{i.item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
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

export default DetaillRest;