import React from 'react';

const Location= React.createContext({
  location:null,
  available:false,
  getLocation : ()=>{},
  isAvailable: ()=>{}
});

export default Location