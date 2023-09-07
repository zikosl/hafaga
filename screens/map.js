import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Image
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import API, { URL } from '../api';
import MAPS from '../maps';
import Colors from '../palette';

function Map(props) {
  const [data, setData] = React.useState([])
  const [map, setMap] = React.useState({
    latitude: 35.4015654,
    longitude: 8.1095251,
    latitudeDelta: 0.008383,
    longitudeDelta: 0.003315,
  })
  React.useEffect(() => {
    let isMount = true;
    getService().then((v) => {
      if (isMount) {
        setData(v)
      }
    })
    return () => isMount = false
  }, [])
  const getService = async () => {
    const a = await API.post("client/service")
    return a.data
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={
          map
        }
        onUserLocationChange={({ nativeEvent }) => setMap({
          ...map,
          latitude: nativeEvent.coordinate.latitude,
          longitude: nativeEvent.coordinate.longitude
        })}
        showsUserLocation={true}
        followsUserLocation
        provider={PROVIDER_GOOGLE}
        customMapStyle={MAPS}
      >
        {
          data.map((e, i) => {
            return (
              <Marker
                coordinate={JSON.parse(e.maps)}
                key={i}
                onPress={() => props.navigation.navigate("Categorie", e)}
              >
                <Text style={styles.title}>{e.service}</Text>
                <View style={{ borderRadius: 40, borderWidth: 3, width: 40, height: 40, borderColor: "#fff", overflow: "hidden" }}>
                  <Image source={{ uri: URL + "/" + e.image }} style={{ width: 40, height: 40, resizeMode: "cover" }} />
                </View>
              </Marker>
            )
          })
        }
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 46,
    height: 46,
    resizeMode: "contain",
    tintColor: "#00b7ff",
  },
  title: {
    fontFamily: "Poligon Medium",
    color: Colors.secondary,
    fontSize: 10
  }
});

export default Map;