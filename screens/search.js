import React from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import Items from '../component/items';
import SearchBar from '../component/searchbar';
import _, { lte } from 'lodash'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import api from '../api';
import Produit from '../component/produit';
import Loading from '../component/loading';
const { width, height } = Dimensions.get('window')
const A = [
  { x: 10, y: 10 },
  { x: width / 2 + 20, y: 10 },
  { x: 10, y: width / 2 + 20 },
  { x: width / 2 + 20, y: width / 2 + 20 },
  { x: 10, y: width + 30 },
  { x: width / 2 + 20, y: width + 30 },
  { x: 10, y: width + width / 2 + 40 },
  { x: width / 2 + 20, y: width + width / 2 + 40 },

]
function Search(props) {
  const [result, setResult] = React.useState([])
  const [list, setList] = React.useState([])
  const [select, setSelect] = React.useState(-1)
  const [id, setId] = React.useState(-1)
  const [value, setValue] = React.useState('')
  const [startAt, setStartAt] = React.useState(10)
  const [loading, setLoading] = React.useState(false)
  const [load, setLoad] = React.useState(false)
  React.useEffect(() => {
    let Mount = true
    getCategorie().then(d => {
      if (Mount) {
        setList(d)
        search();
      }
    })
    return () => Mount = false;
  }, [])
  const updateid = (i, j) => {
    setSelect(i)
    setId(j)
  }
  const getCategorie = async () => {
    const a = await api.post('client/searchmenu');
    return a.data
  }
  const search = async () => {
    setResult([])
    const a = await api.post('client/searchproduit', {
      hint: value,
      id: id,
      start: 0
    });
    setResult(a.data)
  }
  const loadingData = async () => {
    setLoad(true)
    await search()
    setLoad(false)
  }
  const loadMore = () => {
    if (result.length % 10 == 0 && result.length != 0) {
      setLoading(true)
      api.post('client/searchproduit', {
        hint: value,
        id: id,
        start: startAt
      }).then((a) => {
        setResult([...result, ...a.data]);
        setLoading(false);
        setStartAt(startAt + 10)
      });
    }
  }
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  React.useEffect(() => {
    search()
  }, [value])
  React.useEffect(() => {
    search()
  }, [select])
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: StatusBar.currentHeight }}>
      <SearchBar valueChange={(g) => { setValue(g) }} />
      <View>
        <ScrollView

          horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={list.length == 0 && { flex: 1 }} style={{ height: 60 }}>
          {
            list.length == 0 && (
              <ContentLoader backgroundColor={"#ddd"}>
                <Rect x="10" y="2" rx="4" ry="4" width="100" height="20" />
                <Rect x="120" y="2" rx="4" ry="4" width="100" height="20" />
                <Rect x="230" y="2" rx="4" ry="4" width="100" height="20" />
                <Rect x="340" y="2" rx="4" ry="4" width="100" height="20" />
                <Rect x="450" y="2" rx="4" ry="4" width="100" height="20" />
              </ContentLoader>
            )
          }
          {
            list.length != 0 && (
              <>
                <Items title={"Tout"} onValueChange={(i) => { updateid(i, -1) }} i={-1} select={select} />
                {
                  list.map((v, i) => {
                    return <Items title={v.title} onValueChange={(i) => updateid(i, v.id)} i={i} select={select} key={i} />
                  })
                }
              </>
            )
          }

        </ScrollView>
      </View>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMore();
          }
        }}
        style={{ flex: 1 }} contentContainerStyle={list.length == 0 && { flex: 1 }}
        refreshControl={<RefreshControl colors={["#ffe600", "#c0d100", "#ccff00"]} refreshing={load} onRefresh={loadingData} />}
      >
        {list.length != 0 && (<View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
          {
            result.map((v, i) => {
              return <View key={i} style={{ width: "50%" }}><Produit  {...v} /></View>
            })
          }
        </View>)}
        {list.length == 0 && (<ContentLoader viewBox="0 0 390 490">
          {
            A.map((v, i) => <MyLoader key={i} x={v.x} y={v.y} />)
          }
        </ContentLoader>)}
        {
          loading && (
            <Image style={{ width: 60, height: 60, resizeMode: "center", alignSelf: "center" }} source={require('../images/hafaga.gif')} />
          )
        }
      </ScrollView>
    </View>
  );
};

const MyLoader = ({ x, y }) => {
  return (
    <Rect x={x} y={y} rx="20" ry="20" width={width / 2} height={width / 2} />
  )
}
const styles = StyleSheet.create({
});

export default Search;