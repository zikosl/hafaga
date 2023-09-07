import React from "react"


const LanguageContext = React.createContext({
    languageTag: "en",
    isRTL: false,
    font: () => { },
    translate: () => { },
    update: (data) => { }
});

export default LanguageContext