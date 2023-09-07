
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    PermissionsAndroid, TouchableOpacity, Image,

} from 'react-native';
import LoginContext from '../context/logincontext';
import _, { lte, values } from 'lodash'
import PannierItem from '../component/panitem';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/core';
import Colors from "../palette"
import Location from '../context/location';
import api from '../api';

const green = "#afff40";
const red = "#ff6040"
function MiniMap(props) {
    const { service, maps, panid, tarif } = props
    const location = React.useContext(Location)
    let statu = props.statu;
    const [data, setData] = React.useState(props.data);
    const context = React.useContext(LoginContext)
    const offre = 100 - context.getConfig().company - context.getConfig().driver
    let condition = 0;
    let total = tarif * (1 - offre / 100) + context.getConfig().tarif;
    const [enable, setEnable] = React.useState(true)
    const navigation = useNavigation();
    const update = (v, k) => {
        let n = [...data];
        n[k].quantite = v;
        setData(n);
    }
    data.forEach((v) => {
        total += v.quantite * v.prix;
        condition += v.quantite
    })
    const addtoPannier = () => {
        const values = [];
        data.forEach(e => {
            values.push({
                id: e.id,
                quantite: e.quantite
            })
        })
        return api.post('client/confirme', {
            command: values,
            id: panid
        })
    }
    const deleteAll = () => {
        api.post('client/delete', {
            pid: panid
        }).then(() => {
            context.updatePannier()
            setEnable(true)
        })
            .catch(() => setEnable(true))
    }
    return (
        <>
            <View style={styles.view}>
                <View style={{ flexDirection: 'row', position: "absolute", flex: 1, top: -13, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: 10, height: 10, backgroundColor: statu ? green : red, alignSelf: "center", marginHorizontal: 7, marginTop: 5, borderRadius: 5 }}></View>
                    <Text style={styles.head}>{service}</Text>

                </View>
                <View>
                    {
                        data.map((i, k) => {
                            return (
                                <PannierItem key={k} current={condition} onPress={(v) => update(v, k)} {...i} />
                            )
                        })
                    }
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginVertical: 10, borderTopWidth: 1, paddingTop: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontFamily: "Poligon Bold" }}>Tarif Livraison</Text>
                    </View>
                    <View style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: Colors.Diablo }}>
                        <Text style={{ fontFamily: "Gilroy-Bold", fontSize: 19, color: Colors.primary, alignSelf: "center" }}>-{offre}%</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 17, textAlign: "right", fontFamily: "Poligon Bold" }}>{tarif.toFixed(2)} DA</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10, paddingTop: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontFamily: "Poligon Bold" }}>Tarif D'application</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, textAlign: "right", fontFamily: "Poligon Bold" }}>{context.getConfig().tarif.toFixed(2)} DA</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10, borderTopWidth: 1, paddingTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontFamily: "Poligon Bold", color: Colors.Diablo }}>Total</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, textAlign: "center", fontFamily: "Gilroy-SemiBold" }}>{condition}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, textAlign: "right", fontFamily: "Poligon Semi Bold", color: '#131' }}>{total.toFixed(2)} DA</Text>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
                <TouchableOpacity onPress={() => deleteAll()} disabled={!enable} style={[styles.btn, !enable && { opacity: .7 }]}>
                    <Text style={{ fontSize: 16, fontFamily: "Poligon Semi Bold", textAlign: "center" }}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setEnable(false)
                        if (context.hasphone()) {
                            addtoPannier().then(() => {
                                context.updatePannier()
                                setEnable(true)
                            })
                                .catch(() => setEnable(true))
                        }
                        else {
                            setEnable(true)
                            navigation.navigate('AddPhone')
                        }
                    }}
                    disabled={data == null || !enable || !statu || condition == 0}
                    style={[styles.btn, data == null || !enable || !statu || condition == 0 && { opacity: .7 }, { flexDirection: "row", alignItems: "center" }]}>
                    {
                        enable ? (<><Image style={styles.img} source={require('../images/buy.png')} />
                            <Text style={{ fontSize: 16, fontFamily: "Poligon Semi Bold", textAlign: "center" }}>Confirmer</Text></>) : (
                            <Image style={{ width: 30, height: 30 }} source={require('../images/hafaga.gif')} />
                        )
                    }
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btn:
    {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary,
        borderRadius: 7,
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: "center"
    },
    view: {
        borderWidth: 1, padding: 10,
        paddingTop: 28,
        marginTop: 10,
        borderRadius: 10,
        borderColor: Colors.Smoke + '66',
        marginHorizontal: 10
    },
    head: {
        fontFamily: "Gilroy-secondary",
        fontSize: 17,
        color: Colors.Diablo,
        backgroundColor: "#fff",
        textAlignVertical: "center"
    },
    menu:
    {
        alignItems: "center",
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#ccc", borderRadius: 7,
        marginVertical: 10
    },
    img: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        marginRight: 7,
        tintColor: "#444"
    }
});

export default MiniMap;