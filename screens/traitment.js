import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    StatusBar
} from 'react-native';
import Header from "../component/header"
import LoginContext from '../context/logincontext';
import ModalStatu from '../component/modalstatu'
import Colors from '../palette'
import api from '../api';
import palette from '../palette';
const yellow = Colors.primary
const Traitment = (props) => {
    const { data, N } = props.route.params
    const commands = JSON.parse(data.commands)
    const ctx = React.useContext(LoginContext)
    const auto = JSON.parse(data.auto)
    const [svisible, setSvisible] = React.useState(data.step == 5)
    const [srate, setsrate] = React.useState(false)
    const steps = data.step;
    const update = (v) => {
        api.post('client/end', {
            pid: N,
            srate: srate,
            drate: v
        }).then(() => {
            ctx.updatePannier();
        })
    }
    let total = data.prix + 19, qt = 0;
    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: StatusBar.currentHeight }}>
            <ScrollView style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }} showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('../images/line.png')} imageStyle={{ tintColor: Colors.secondary }} style={styles.img}>
                </ImageBackground>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: 60, height: 60, backgroundColor: steps == 2 ? yellow : Colors.secondary, borderRadius: 30 }}>
                        {
                            steps == 2 && (<Image source={require('../images/ok.png')} />)
                        }
                    </View>
                    <View style={{ width: 60, height: 60, backgroundColor: steps == 4 ? yellow : Colors.secondary, borderRadius: 30 }}>
                        {
                            steps == 4 && (<Image source={require('../images/ok.png')} />)
                        }
                    </View>
                    <View style={{ width: 60, height: 60, backgroundColor: steps == 5 ? yellow : Colors.secondary, borderRadius: 30 }}>
                        {
                            steps == 5 && (<Image source={require('../images/ok.png')} />)
                        }
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Image style={[styles.image, { height: 35 }, steps == 2 && { tintColor: palette.primary }]} source={require('../images/food.png')} />
                    </View>
                    <View style={{ flex: 4, alignItems: "center" }}>
                        <Image style={[styles.image, steps == 4 && { tintColor: palette.primary }]} source={require('../images/bike.png')} />
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Image style={[styles.image, { width: 35, height: 35 }, steps == 5 && { tintColor: palette.primary }]} source={require('../images/mark.png')} />
                    </View>
                </View>
                <View style={{ marginVertical: 30, marginHorizontal: 5, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: palette.primary, borderRadius: 10, borderColor: "#efefef", borderWidth: 1 }}>
                    <Text style={{ fontSize: 20, fontFamily: "Gilroy-Bold", color: Colors.light, textAlign: "center", marginBottom: 20 }}>Facture</Text>
                    {
                        commands.map((v, i) => {
                            total += parseInt(v.prix) * parseInt(v.quantite)
                            qt += parseInt(v.quantite)
                            return (<View key={i} style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Bold' }}>{v.title}</Text>
                                    <Text style={{ fontSize: 14, color: Colors.light, fontFamily: 'Gilroy-Medium' }}>{v.details}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Regular' }}>{v.quantite}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Medium' }}>{v.prix.toFixed(2)} DA</Text>
                                </View>
                            </View>)
                        })
                    }
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 25, marginTop: 25, borderTopWidth: 1, borderTopColor: "#333" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-SemiBold' }}>Tarif de livraison</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Medium' }}>{data.prix.toFixed(2)} DA</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 25, marginTop: 25 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-SemiBold' }}>Tarif de l'application</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Medium' }}>19.00 DA</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 25, marginTop: 25, borderTopWidth: 1, borderTopColor: "#333" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Bold' }}>Total</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Bold' }}>{qt}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Text style={{ fontSize: 16, color: Colors.light, fontFamily: 'Gilroy-Medium' }}>{total}DA</Text>
                        </View>
                    </View>
                    <View style={{ width: 200, alignSelf: "center", backgroundColor: Colors.light, flexDirection: "row", marginTop: 35, justifyContent: "space-around", paddingVertical: 7, borderRadius: 8 }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: palette.primary, fontFamily: "Gilroy-Heavy" }}>N° {N}</Text>
                        </View>
                    </View>
                    {/* <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Image source={require('../images/qr.png')} style={{width:80,height:80,marginTop:5}}/>
                    </View> */}
                    {auto.image != null && (<View style={{ flexDirection: "row", marginTop: 10, borderTopColor: '#777', borderTopWidth: 1, paddingTop: 20 }}>
                        <View style={{ width: 90, height: 90, backgroundColor: "#C4C4C4", borderRadius: 45 }}>
                            <Image source={{ uri: auto.image }} style={{ width: 90, height: 90 }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
                            <Text>{auto.driver}</Text>
                            <Text>{auto.material}</Text>
                            <Text>N: {auto.phone}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../images/star.png')} />
                                <Image source={require('../images/star.png')} />
                                <Image source={require('../images/star.png')} />
                                <Image source={require('../images/star.png')} />
                                <Image source={require('../images/star.png')} />
                            </View>
                        </View>
                    </View>)}
                </View>
            </ScrollView>
            <Modal
                transparent
                visible={svisible}
            >
                <ModalStatu source={require('../images/rest.png')} onPress={(v) => { setSvisible(false); setsrate(v) }} text={"Comment était le restaurant?"} />
            </Modal>
            <Modal
                transparent
                visible={steps == 5}
            >
                <ModalStatu source={require('../images/rest.png')} onPress={(v) => update(v)} text={"Comment était la livraison?"} />
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        color: palette.primary,
        marginLeft: 25,
        fontSize: 16,
        //backgroundColor:'#fff',
        flex: 1,
        marginVertical: 10
    },
    head:
    {
        fontSize: 20,
        color: "#777",
        marginVertical: 10,
        fontStyle: "italic",
        marginLeft: 10
    },
    img:
    {
        width: "100%",
        height: 10,
        overflow: "hidden",
        //margin:10,
        position: "absolute",
        top: 25,
    },
    image: {
        width: 40, resizeMode: "contain",
        height: 40,
        tintColor: Colors.secondary
    }
});

export default Traitment;