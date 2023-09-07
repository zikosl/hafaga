
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    PermissionsAndroid, TouchableOpacity, Image
} from 'react-native';
import LoginContext from '../context/logincontext';
import _, { lte } from 'lodash'
import PannierItem from '../component/panitem';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import palette from '../palette';
const yellow = "#FAee03";
const green = "#afff40";
const red = "#ff6040"
class MiniMap extends React.Component {
    constructor(props) {
        super(props)
        let Sum = 0
        let tot = 20
        props.DATA.forEach((v) => { Sum += v.q; tot += v.q * v.prix })
        this.state = {
            condition: Sum,
            total: tot,
            data: null,
            enable: true,
            statu: false
        }
        this.setReady()
        this.getStatu()
        this.tarif = 0;
    }
    getStatu() {
        this.Mount = true
        const { ids } = this.props
    }
    componentWillUnmount() {
        this.Mount = false
    }
    static contextType = LoginContext
    Test = (value, i) => {
        const { condition, total } = this.state
        const { DATA } = this.props
        if (condition < 10) {
            this.setState({ condition: condition + 1, total: total + parseInt(value) })
            DATA[i].q += 1
            return true
        }
        return false
    }
    Min = (value, i) => {
        const { condition, total } = this.state
        const { DATA } = this.props
        this.setState({ total: total - value, condition: condition - 1 })
        DATA[i].q -= 1
    }
    async setReady() {
        const { DATA, current } = this.props
        const map = {
            latitude: DATA[0].map.latitude,
            longitude: DATA[0].map.longitude
        }
        const u = await this.getDistanceOneToOne(current.latitude, current.longitude, map.latitude, map.longitude)
        this.setState({ data: u.distance })
        const { data, total } = this.state
        let d = u.distance.value
        this.tarif = d % 1000 * 0.12;
        d = Math.floor(d / 1000);
        this.tarif = d % 1500 * 0.05;
        d = Math.floor(d / 1000);
        this.tarif = d * 0.03;
        this.tarif = Math.round(this.tarif);
        this.tarif = Math.max(this.tarif, 75);
        this.tarif = Math.min(this.tarif, 250);
        this.setState({ total: total + this.tarif })
    }
    async getDistanceOneToOne(lat1, lng1, lat2, lng2) {
        const Location1Str = lat1 + "," + lng1;
        const Location2Str = lat2 + "," + lng2;
        const GOOGLE_API_KEY = "AIzaSyCv69VO_c_zxzJQEuXgubDZ8VAF8Vy2ijA"
        let ApiURL = "https://maps.googleapis.com/maps/api/directions/json?";

        let params = `origin=${Location1Str}&destination=${Location2Str}&key=${GOOGLE_API_KEY}`; // you need to get a key
        let finalApiURL = `${ApiURL}${encodeURI(params)}`;

        let fetchResult = await fetch(finalApiURL); // call API
        let Result = await fetchResult.json(); // extract json
        return Result.routes[0].legs[0];
    }
    deleteAll() {
        this.setState({ enable: false })
        const { DATA } = this.props
        const { docid } = this.context.login
    }
    render() {
        const { DATA, service, current, navigation } = this.props
        const { condition, total, data, enable, statu } = this.state
        const arr = []
        DATA.forEach((v) => {
            arr.push({
                Quentite: v.q,
                prix: this.tarif,
                map: current,
                idCmd: v.idCmd
            })
        })
        return (
            <>
                <View style={styles.view}>
                    <View style={{ flexDirection: 'row', position: "absolute", top: -18, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 10, height: 10, backgroundColor: statu ? green : red, alignSelf: "center", marginHorizontal: 7, marginTop: 5, borderRadius: 5 }}></View>
                        <Text style={styles.head}>{service}</Text>
                    </View>
                    <View>
                        {
                            DATA.map((i, k) => <PannierItem Min={(v) => this.Min(v, k)} key={k} onPress={(v) => this.Test(v, k)} {...i} />)
                        }
                    </View>
                    <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10, borderTopWidth: 1, paddingTop: 10 }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 14, fontFamily: "MavenPro-Bold" }}>Tarif Livraison</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 15, textAlign: "right", fontFamily: "MontserratAlternates-Bold" }}>{this.tarif}.00 DA</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10, paddingTop: 10 }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 14, fontFamily: "MavenPro-Bold" }}>Tarif D'application</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 15, textAlign: "right", fontFamily: "MontserratAlternates-Bold" }}>20.00 DA</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", flexDirection: "row", marginVertical: 10, borderTopWidth: 1, paddingTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 17, fontFamily: "MavenPro-Bold", color: '#131' }}>Total</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, textAlign: "center", fontFamily: "MontserratAlternates-Bold" }}>{condition}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, textAlign: "right", fontFamily: "MontserratAlternates-SemiBold", color: '#131' }}>{total}.00 DA</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
                    <TouchableOpacity onPress={() => this.deleteAll()} disabled={!enable} style={[styles.btn, !enable && { opacity: .7 }]}>
                        <Text style={{ fontSize: 16, fontFamily: "MavenPro-SemiBold", textAlign: "center" }}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ enable: false })
                            if (this.context.hasphone()) {
                            }
                            else {
                                this.setState({ enable: true })
                                navigation.navigate('AddPhone')
                            }
                        }}
                        disabled={data == null || !enable || !statu}
                        style={[styles.btn, data == null || !enable || !statu || !this.context.getFinal() && { opacity: .7 }, { flexDirection: "row", alignItems: "center" }]}>
                        <Image style={styles.img} source={require('../images/buy.png')} />
                        <Text style={{ fontSize: 16, fontFamily: "MavenPro-Bold", textAlign: "center" }}>Confirmer</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    btn:
    {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: palette.primary,
        borderRadius: 7,
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: "center"
    },
    view: {
        borderWidth: 1, padding: 10,
        paddingTop: 25,
        marginTop: 10,
        borderRadius: 10,
        borderColor: "#999"
    },
    head: {
        fontFamily: "MavenPro-secondary",
        fontSize: 17,
        color: "#383400",
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