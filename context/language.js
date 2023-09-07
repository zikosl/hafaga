import React from 'react';

const Language = React.createContext({
  information: {
    language: "fr",
    loginPage: [],
    registerPage: [],
    profile: []
  },
  toggle: (data) => { },
  get: () => { },
  setLanguge: () => { }
});

export default Language