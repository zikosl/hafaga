import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import React from "react";

import {
  I18nManager,
} from "react-native";
import LanguageContext from "./context";


function Traduction(props) {
  const [languageTag, setLanguageTag] = React.useState("en");
  const [isRTL, setIsRTL] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setI18nConfig();
    setLoading(true)
  }, [])
  React.useEffect(() => {
    setI18nConfig();
  }, [languageTag])
  const translationGetters = {
    ar: () => require("./ar.json"),
    en: () => require("./en.json"),
    fr: () => require("./fr.json")
  };

  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );

  const setI18nConfig = () => {
    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };
  return (
    <LanguageContext.Provider
      value={{
        isRTL: isRTL,
        languageTag: languageTag,
        translate: translate,
        update: (a, b) => {
          setLanguageTag(a);
          setIsRTL(b)
        },
        font: () => isRTL ? 'Changa' : "Gilroy"
      }}
    >
      {
        loading ? props.children : null
      }
    </LanguageContext.Provider>
  )
}
export default Traduction