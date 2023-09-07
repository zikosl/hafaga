import React from 'react';
import { Modal, View, Text, PermissionsAndroid, Button } from 'react-native';
import Location from './location';
import _ from "lodash"
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
//import GeoFencing from 'react-native-geo-fencing';

export default class LocationProvider extends React.Component {
  state = {
    location: null,
    available: true
  }
  polygon = [
    { lat: 35.37883759354478, lng: 8.109813759593235 },
    { lat: 35.389474055938855, lng: 8.103633950022923 },
    { lat: 35.389474055938855, lng: 8.094020912913548 },
    { lat: 35.392832647426346, lng: 8.08646781232761 },
    { lat: 35.398709845965605, lng: 8.08646781232761 },
    { lat: 35.40794457815542, lng: 8.088184426097142 },
    { lat: 35.41242164324781, lng: 8.086811135081517 },
    { lat: 35.416059075499675, lng: 8.074108193186985 },
    { lat: 35.409063867744905, lng: 8.067928383616673 },
    { lat: 35.4113024002913, lng: 8.063121865061985 },
    { lat: 35.4138206750837, lng: 8.063808510569798 },
    { lat: 35.419696343553035, lng: 8.053165505198704 },
    { lat: 35.4278096574764, lng: 8.059688637522923 },
    { lat: 35.429488172121516, lng: 8.06174857404636 },
    { lat: 35.429488172121516, lng: 8.082691262034642 },
    { lat: 35.41717825238963, lng: 8.093334267405735 },
    { lat: 35.42725014482083, lng: 8.110500405101048 },
    { lat: 35.42249413031842, lng: 8.12491996076511 },
    { lat: 35.4113024002913, lng: 8.13865287092136 },
    { lat: 35.40766475332932, lng: 8.145862648753392 },
    { lat: 35.39073354413724, lng: 8.122345040110813 },
    { lat: 35.37883759354478, lng: 8.109813759593235 },
  ];
  getlocation() {
    return this.state.location
  }
  isAvailable() {
    return this.state.available
  }
  componentDidMount() {
    this.Mount = true
    this.getloc();
  }
  async getloc() {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    console.log(granted)
    if (granted) {
      Geolocation.watchPosition(
        async (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          let point = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          if (this.Mount) {
            this.setState({ location: region })
          }
          /*GeoFencing.containsLocation(point, this.polygon).then(()=>{
          if(this.Mount)
          {
            this.setState({available:true})
          }
          })
          .catch(()=>{
            if(this.Mount)
            {
              this.setState({available:false})
            }
          })*/
        },
        (error) => {
        },
        { enableHighAccuracy: true, timeout: 150000, maximumAge: 100000 }
      );
    }
    else {
      alert("Please Garant Location Access")
      this.getloc();
    }
  }
  async getCurrent() {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted) {
      Geolocation.getCurrentPosition(
        async (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          let point = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          if (this.Mount) {
            this.setState({ location: region })
          }
          /*GeoFencing.containsLocation(point, this.polygon).then(() => {
            if (this.Mount) {
              this.setState({ available: true })
            }
          })
            .catch(() => {
              if (this.Mount) {
                this.setState({ available: false })
              }
            })*/
        },
        (error) => {
        },
        { enableHighAccuracy: true, timeout: 150000, maximumAge: 100000 }
      );
    }
    else {
      alert("Please Garant Location Access")
      this.getCurrent();
    }
  }
  componentWillUnmount() {
    this.Mount = false
    Geolocation.clearWatch()
  }
  render() {
    const { available, location } = this.state
    return (<Location.Provider
      value={{
        location: this.state.location,
        available: this.state.available,
        getLocation: () => this.getlocation(),
        isAvailable: () => this.isAvailable()
      }}
    >

      {location != null ? this.props.children : <MyModel getCurrent={this.getCurrent} getloc={this.getloc} />}
    </Location.Provider>)
  }

}

function MyModel({ getloc, getCurrent }) {
  const { t } = useTranslation()
  return (
    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, backgroundColor: "#fff" }}>
      <Text style={{ flexWrap: 'wrap', fontSize: 18, fontFamily: "arabic", marginVertical: 20, paddingHorizontal: 20 }}>{t('locprov.item1')}</Text>
      <Button onPress={() => {
        getloc()
        getCurrent()
      }} color={'#779e00'} title={t('locprov.item2')} />
    </View>
  )
}