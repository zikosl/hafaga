import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import Header from "../component/header"
import MarketData from '../component/marketdata';
import palette from '../palette';

const { width, height } = Dimensions.get('screen')
const yellow = "#FAD103";

class DetaillCategorie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DATA: []
        }
    }
    async getAll() {
        const DATA = []
        const { id } = this.props.route.params
        if (this.Mount) {
            this.setState({ DATA: DATA })
        }
    }
    componentDidMount() {
        this.Mount = true
        this.getAll()
    }
    componentWillUnmount() {
        this.Mount = false
    }
    render = () => {
        const { DATA } = this.state
        const { id, title } = this.props.route.params
        const { navigation } = this.props
        return (
            <View style={{ backgroundColor: '#EAEFF6', flex: 1 }}>
                <Header back={true}>
                    <Text style={{ marginVertical: 15, fontFamily: 'MavenPro-Bold', fontSize: 16, color: palette.primary }}>Categories</Text>
                </Header>
                <View>
                    <FlatList
                        data={DATA}
                        numColumns={1}
                        keyExtractor={(item, i) => i.toString()}
                        style={{ paddingHorizontal: 7, paddingTop: 20 }}
                        renderItem={(i) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('All', {
                                    title: i.item.title,
                                    id: i.item.id,
                                })} style={{ flex: 1, backgroundColor: "#fff", marginHorizontal: 7, alignSelf: "center", justifyContent: "center", paddingVertical: 10, paddingHorizontal: 20, marginVertical: 7, alignItems: "center", borderRadius: 10 }}>
                                    <View style={{ borderRadius: 100, overflow: "hidden" }}>
                                        <Image defaultSource={require('../images/in-progress.png')} source={{ uri: i.item.image }} style={styles.image}></Image>
                                    </View>
                                    <Text style={{ fontFamily: "MavenPro-Bold", paddingVertical: 10 }}>{i.item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    title: {
        color: "#F7DB02",
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
        color: "#777",
        marginVertical: 10,
        fontStyle: "italic",
        marginLeft: 6
    },
    img:
    {
        width: width,
        marginHorizontal: 0,
        height: 140,
        backgroundColor: "#333"
    },
});

export default DetaillCategorie;