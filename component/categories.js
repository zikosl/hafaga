import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Modal,
    RefreshControl,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
import Items from '../component/items';
import SearchBar from '../component/searchbar';
import Produit from '../component/produit';
import ModalItem from '../component/modalitem';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
const { width, height } = Dimensions.get('window')
import {
    connectInfiniteHits
} from "react-instantsearch/connectors";
function Hits(props) {
    const { id, value, search } = props
    const hits = []
    props.hits.forEach((e) => {
        if (e.prix > 0) {
            hits.push({
                ...e,
                state: true
            })
        }
    })
    const [loadingbtm, setLoadingbtm] = React.useState(false)
    const [Showed, setShowed] = React.useState([])
    const [referesh, setReferesh] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [limit, setLimit] = React.useState(null)
    const [file, setFile] = React.useState([])
    const [data, setData] = React.useState({
        content: null,
        name: null,
        prix: null,
        service: null,
        id: null,
        image: null,
        adress: null,
        idc: [],
    })
    const myARR = []
    value.forEach((u) => {
        myARR.push(u.id)
    })
    const showdetail = (data) => {
        setVisible(true)
        setData(data)
    }
    React.useEffect(() => {
        setLoading(true)
        setShowed([])
        GetData();
        setLoading(false)
    }, [props.id])
    const devisarr = (a) => {
        const s = Math.floor(a.length / 10)
        const ARR = []
        for (let i = 0; i < s; i++) {
            const ar = []
            for (let j = 0 + i * 10; j < 10 + i * 10; j++) {
                ar.push(a[j])
            }
            ARR.push(ar)
        }
        const ar = []
        for (let i = s * 10; i < a.length; i++) {
            ar.push(a[i])
        }
        ARR.push(ar)
        if (ARR[ARR.length - 1].length == 0) {
            ARR.pop()
        }
        return ARR
    }
    const hundleMore = async () => {
        setLoadingbtm(true)
        const af = []
        setLoadingbtm(false)
        setShowed(af)
    }
    const GetData = async () => {
        const af = []
        const mya = devisarr(myARR)
        const docs = []
    }
    const onrefreching = async () => {
        setReferesh(true)
        GetData();
        setReferesh(false)
    }
    const result = [...Showed];
    while (result.length % 2 != 0) {
        result.push({ state: false })
    }
    while (hits.length % 2 != 0) {
        hits.push({ state: false })
    }
    const etat = id == null
    return (
        (loading) ? (
            <View style={{ flex: 1 }}>
                <Pleasewait />
            </View>
        ) : (

            <FlatList
                style={{ backgroundColor: "#fff" }}
                data={search != "" ? hits : result}
                keyExtractor={(d, i) => i.toString()}
                numColumns={2}
                renderItem={({ index, item }) => {
                    let v = item
                    const qt = typeof v.Quentite == "undefined" ? -1 : v.Quentite
                    return v.state ? <Produit onPress={(g) => showdetail(g)} promo={typeof v.promo == "undefined" ? -1 : v.promo} plugins={v.plugins} id={search != "" ? v.objectID : v.id} source={{ uri: v.image }} nbr={qt} ids={v.idservice} content={v.details} name={v.title} surcommand={v.surcommand} prix={v.prix} /> : <View style={{ flex: 1 }} />
                }}
                refreshControl={
                    <RefreshControl colors={["#ffe600", "#c0d100", "#ccff00"]} refreshing={referesh} onRefresh={() => onrefreching()} />
                }
                onEndReached={() => hundleMore()}
                ListFooterComponent={
                    <>
                        {
                            loadingbtm && (
                                <Image style={{ width: 60, height: 60, resizeMode: "center", alignSelf: "center" }} source={require('../images/hafaga.gif')} />
                            )
                        }
                        <Modal
                            transparent
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                            animationType={"slide"}
                        >
                            <ModalItem title={data.name} hide={() => setVisible(false)} idc={data.idc} prix={data.prix} image={data.image} adress={data.adress} detail={data.content} id={data.id} service={data.service} />
                        </Modal>
                    </>
                }
            />
        )
    )
}
function Pleasewait() {
    return (
        <ContentLoader backgroundColor={"#ddd"}>
            <Rect x="10" y="10" rx="4" ry="4" width={width / 2 - 20} height={width / 2 - 20} />
            <Rect x={width / 2 + 10} y="10" rx="4" ry="4" width={width / 2 - 20} height={width / 2 - 20} />
            <Rect x="10" y={width / 2} rx="4" ry="4" width={width / 2 - 20} height={20} />
            <Rect x="10" y={width / 2 + 30} rx="4" ry="4" width={width / 2 - 50} height={20} />
            <Rect x={width / 2 + 10} y={width / 2} rx="4" ry="4" width={width / 2 - 20} height={20} />
            <Rect x={width / 2 + 10} y={width / 2 + 30} rx="4" ry="4" width={width / 2 - 50} height={20} />
            <Rect x="10" y={width / 2 + 60} rx="4" ry="4" width={width / 2 - 20} height={width / 2 - 20} />
            <Rect x={width / 2 + 10} y={width / 2 + 60} rx="4" ry="4" width={width / 2 - 20} height={width / 2 - 20} />
            <Rect x="10" y={width + 50} rx="4" ry="4" width={width / 2 - 20} height={20} />
            <Rect x="10" y={width + 80} rx="4" ry="4" width={width / 2 - 50} height={20} />
            <Rect x={width / 2 + 10} y={width + 50} rx="4" ry="4" width={width / 2 - 20} height={20} />
            <Rect x={width / 2 + 10} y={width + 80} rx="4" ry="4" width={width / 2 - 50} height={20} />
        </ContentLoader>
    )
}
const styles = StyleSheet.create({
});
const SearchItem = connectInfiniteHits(Hits);

export default SearchItem;