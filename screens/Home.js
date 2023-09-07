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
import LoginContext from '../context/logincontext';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';

import { useTranslation } from 'react-i18next';

const Logo = "#1e1140";

function Home(props) {
  const [type, setType] = React.useState([])
  const [refrech, setRefreche] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [index, setIndex] = React.useState(-1)
  const [id, setId] = React.useState(-1)
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
  const UpdateIndex = async (i) => {
    setIndex(i)
  }

  React.useEffect(() => {
    setId(index == -1 ? -1 : type[index].id)
  }, [index])
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
  const Context = React.useContext(LoginContext);
  const { fname, lname, picture, color } = Context.login
  const { t, i18n } = useTranslation();
  const font = t("font");

  return (
    <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor="#55555533" barStyle="dark-content" />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../images/logoinverse.png')} />
        {
          typeof picture == "undefined" ? (
            <InitialIcon onPress={() => navigation.navigate('Profile')} font={font + "-Bold"} initials={fname[0] + lname[0]} color={color} />
          ) : (
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={{
                padding: 4,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 39,
                alignSelf: "center"
              }}
            >
              <Image source={{ uri: picture }}
                style={{
                  backgroundColor: '#0ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 35,
                  width: 50,
                  height: 50,
                  borderColor: "#fff"
                }} />
            </Pressable>
          )
        }
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
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl colors={["#ffe600", "#c0d100", "#ccff00"]} refreshing={refrech} onRefresh={refrehing} />}
      >
        <Pressable style={styles.bd} onPress={() => navigation.navigate('Search')}>
          <Image style={styles.sim} source={require('../icons/find.png')} />
        </Pressable>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
            }}
          >
            <MiniCategorie active={index == -1} onPress={() => UpdateIndex(-1)} stat={true} image={require('../images/commandi.png')} title={t('msg12')} />
            {
              type.map((v, i) => {
                return <MiniCategorie key={i} active={index == i} onPress={() => UpdateIndex(i)} image={URL + "/" + v.image} title={v.title} />
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
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fcfcfc",
    alignItems: "flex-end",
    marginHorizontal: 10,
    paddingRight: 20
  },
  sim: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#777"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  }
});

const InitialIcon = ({ onPress, initials, color, font }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 39,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 35,
          width: 50,
          height: 50,
          borderColor: "#fff"
        }}>
        <Text style={{ color: 'white', fontFamily: font, fontSize: 19, letterSpacing: 1 }}>{initials}</Text>
      </View>
    </Pressable>
  );
};
export default Home;
