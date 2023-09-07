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

const Detaill = (props) => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([])
    const { title, id, adress, image, idc } = props.route.params
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
        const a = await API.post('client/menu', { sid: id, cid: idc })
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
                        <Image style={{ width: 80, height: 80, resizeMode: "cover", borderRadius: 20 }} source={{ uri: URL + '/' + image }} />
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1.0 }}>
                <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={(item, i) => i}
                    style={{ paddingHorizontal: 7, paddingTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={(i) => {
                        return (
                            <MarketData source={URL + "/" + i.item.image} uid={id} id={i.item.id} adress={title} title={i.item.title} navigation={navigation} />
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

export default Detaill;