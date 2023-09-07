import React from 'react';

const LoginContext= React.createContext({
  login:{
      mail:"",
      pass:"",
  },
  Pannier:[],
  config:{
    driver:67,
    company:33,
    tarif:19
  },
  final:false,
  isLogin : () => {},
  setInformation : (data)=>{},
  logout :() =>{},
  hasphone:()=>{},
  getPannierByKey:(sid,pid)=>{},
  updatePannier:()=>{},
  getFinal:()=>{},
  setToken:(data)=>{},
  getSocket:()=>{},
  getConfig:()=>{},
  updateConfig:()=>{},
  checkPannier:(sid)=>{},
});

export default LoginContext