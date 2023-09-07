import React from 'react';
import { Modal, View, Text } from 'react-native';
import LoginContext from './logincontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import _ from "lodash"
import api from '../api';
import io from "socket.io-client";
import { URL } from "../api"
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default class LoginProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: {
        phone: "",
        pass: "",
        id: ""
      },

      Pannier: [],
      final: false,
      config: {
        driver: 67,
        company: 33,
        tarif: 19
      }
    }
  }


  isLogin = () => {
    return (this.state.login.id != "")
  };
  setInformation = (data) => {
    data.color = getRandomColor();
    AsyncStorage.setItem("login", JSON.stringify(data))
    if (this.Mount) {
      this.setState({ login: data })
    }
    this.updatePannier()
  }
  async datacheck() {
    const value = await AsyncStorage.getItem("login")
    if (this.Mount) {
      this.setState({ ready: true })
    }
    if (value != null) {
      let a = JSON.parse(value);
      if (this.Mount) {
        this.setState({ login: JSON.parse(value) })
        this.updatePannier()
      }
    }
  }
  checkInternet() {
    NetInfo.addEventListener((state) => this.checkConnection(state))
  }
  checkConnection(state) {
    if (this.Mount) {
      this.setState({ connected: state.isConnected })
    }
  }
  componentDidMount() {
    this.Mount = true
    this.socket = false
    this.updateConfig();
    this.datacheck().then(() => {
      if (this.isLogin()) {
        this.socket = io(URL);
        let customId = this.state.login.id
        this.socket.on("connect", () => {
          this.socket.emit('storeClientInfo', { customId: customId });
        });
        this.socket.on("Update", () => this.updatePannier());
        this.socket.on("config", () => this.updateConfig());
      }
    })
    this.hasProvider()
    this.checkInternet()
  }
  componentWillUnmount() {
    this.Mount = false
    if (this.socket) {
      this.socket.disconnect()
    }
  }
  async pannier() {
    const { uid } = this.state.login
    const a = await api.post("client/pannier", { cid: uid })
    console.log(a.data.length)
    return a.data
  }
  logout = () => {
    AsyncStorage.removeItem('login')
    const mylogin = {
      phone: "",
      pass: "",
      id: ""
    }
    const { login } = this.state
    login.id = ""
    if (this.Mount) {
      this.setState({
        login: login
      })
    }
    if (this.socket) {
      this.socket.disconnect()
    }
  }
  hasphone = () => {
    return this.state.login.phone != null
  }
  hasProvider() {
  }
  getFinal() {
    return this.state.final
  }

  getPannierByKey(sid, pid) {
    const { Pannier } = this.state
    let value = true
    Pannier.forEach((u) => {
      if (u.serviceid == sid) {
        let e = JSON.parse(u.commands)
        e.forEach(v => {
          if (v.pid == pid) {
            value = false
          }
        })
      }
    })
    return value
  }
  checkPannier(sid) {
    const { Pannier } = this.state
    let value = 0
    Pannier.forEach((u) => {
      if (u.serviceid == sid) {
        if (u.commander == false) {
          let e = JSON.parse(u.commands)
          e.forEach(v => {
            value += v.quantite;
          })
        }
      }
    })
    return value
  }
  async updatePannier() {
    const a = await this.pannier()
    if (this.Mount) {
      this.setState({
        Pannier: a
      })
    }
  }
  updateConfig = async () => {
    const a = await api.post('client/config');
    if (this.Mount) {
      this.setState({ config: a.data })
    }
  }
  setToken = (data) => {
    const { login } = this.state
    login.token = data;
    if (this.Mount) {
      this.setState({ login: login })
    }
  }
  render() {
    const { ready, connected } = this.state
    if (ready) {
      return (
        <LoginContext.Provider
          value={{
            login: this.state.login,
            Pannier: this.state.Pannier,
            isLogin: this.isLogin,
            setInformation: this.setInformation,
            logout: this.logout,
            hasphone: this.hasphone,
            getPannierByKey: (sid, pid) => this.getPannierByKey(sid, pid),
            updatePannier: () => this.updatePannier(),
            checkPannier: (sid) => this.checkPannier(sid),
            getFinal: () => this.getFinal(),
            setToken: this.setToken,
            getSocket: () => this.socket,
            getConfig: () => this.state.config,
            updateConfig: () => this.updateConfig()
          }}
        >
          {this.props.children}
          <Modal
            visible={!connected}
            transparent
          >
            <View style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "center", alignItems: "center" }}>
              <View style={{ backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 7 }}>
                <Text style={{ textAlign: 'center', fontFamily: "Poligon Medium", marginVertical: 5 }}>Verifie Votre Connexion</Text>
                <Text style={{ textAlign: 'center', fontFamily: "Poligon Medium", marginVertical: 5 }}>internet</Text>
              </View>
            </View>
          </Modal>
        </LoginContext.Provider>
      );
    }
    else return null
  }
}