import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
  RefreshControl,
  StatusBar,
  NativeModules,
  Pressable
} from 'react-native';
import HomeCard from '../component/card';
import DraggableButton from '../component/draggable';
import Header from '../component/header';
import MiniCategorie from '../component/mini';
import ModalItem from '../component/modalitem';
import Produit from '../component/produit';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import SearchBar from '../component/searchbar';
import API, { URL } from "../api"
import MinisubCategorie from '../component/minisub';
import { useNavigation } from '@react-navigation/core';
import { sortedIndexOf } from 'lodash';

const Logo = "#1e1140";

function Home(props) {
  const [type, setType] = React.useState([])
  const [subtype, setSubType] = React.useState([])
  const [refrech, setRefreche] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [index, setIndex] = React.useState(-1)
  const [id, setId] = React.useState(-1)
  const [subindex, setSubIndex] = React.useState(0)
  const [produit, setProduit] = React.useState([])
  const navigation = useNavigation();
  const refrehing = () => {
    setRefreche(true)
    loadCategorie().then(a => {
      setType(a)
      loadProduit("", false).then(val => {
        setProduit(val)
      })
    });
    setRefreche(false)
  }
  React.useEffect(() => {
    let isMounted = true;
    loadCategorie().then(a => {
      if (isMounted) {
        setType(a)
        loadProduit("", false).then(val => {
          setProduit(val)
        })
      }
    });
    return () => isMounted = false;
  }, [])
  const UpdateIndex = async (i, d) => {
    setSubType(d)
    setIndex(i)
    setSubIndex(0)
  }

  React.useEffect(() => {
    if (subtype.length == 0) {
      setId(index == -1 ? -1 : type[index].id)
    }
    else {
      setId(subtype[subindex].globid)
    }
  }, [index, subindex])
  React.useEffect(() => {
    loadProduit(id, id != -1).then(val => setProduit(val))
  }, [id])
  const loadCategorie = async () => {
    const a = await API.post('client/catsub')
    return a.data
  }
  const loadProduit = async (id, bool) => {
    const a = await API.post('client/produit', { id: id, bool: bool })
    return a.data
  }
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  const hundleMore = async () => {
    setLoading(true)
    const a = await loadProduit(id, id != -1);
    setProduit([...produit, ...a]);
    setLoading(false);
  }
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor="#55555533" barStyle="dark-content" />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../images/logoinverse.png')} />
        <Pressable style={styles.bd} onPress={() => navigation.navigate('Search')}>
          <Image style={styles.sim} source={require('../icons/find.png')} />
        </Pressable>
      </View>
      {/* <SearchBar autoFocus={false} style={{backgroundColor:"#dfdae855",borderWidth:0}}
          input={{color:"#999999"}}
          icon={{tintColor:Logo}}
        /> */}
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            hundleMore();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={<RefreshControl colors={["#ffe600", "#c0d100", "#ccff00"]} refreshing={refrech} onRefresh={refrehing} />}
      >
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
            }}
          >
            <MiniCategorie active={index == -1} onPress={() => UpdateIndex(-1, [])} stat={true} image={require('../images/commandi.png')} title={"tout"} />
            {
              type.map((v, i) => {
                const sub = v.subs == null ? [] : JSON.parse(v.subs)
                return <MiniCategorie key={i} active={index == i} onPress={() => UpdateIndex(i, sub)} image={URL + "/" + v.image} title={v.title} />
              })
            }
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={subtype.length == 0 && { paddingVertical: 20 }}
          >
            {
              subtype.map((v, i) => {
                return <MinisubCategorie key={i} active={subindex == i} onPress={() => setSubIndex(i)} image={URL + "/" + v.image} title={v.title} />
              })
            }
          </ScrollView>
        </View>

        {/* <HomeCard source={require("../images/offre.png")} number = "25"/> */}
        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
          {
            produit.map((v, i) => {
              return <View key={i} style={{ width: "50%" }}><Produit  {...v} /></View>
            })
          }
        </View>
        {
          loading && (
            <Image style={{ width: 60, height: 60, resizeMode: "center", alignSelf: "center" }} source={require('../images/hafaga.gif')} />
          )
        }
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  pan: {
    backgroundColor: '#303030',
    position: "absolute",
    padding: 10,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderWidth: .5,
    top: 480,
    right: 20
  },
  pimage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    tintColor: '#FAD103'
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  bd: {
    padding: 10,
    margin: 5,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: "#eee",
    alignSelf: "center",
    backgroundColor: "#fcfcfc",
    elevation: 3
  },
  sim: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#777"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Home;
