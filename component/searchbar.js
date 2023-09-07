import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import Colors from '../palette';
import { useTranslation } from 'react-i18next';

function SearchBar(props) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 7 }}>
      <View style={[styles.flex, active && { borderColor: Colors.primary }, props.style]}>
        <Image style={[styles.img, props.icon, active && { tintColor: Colors.primary }]} source={require('../icons/find.png')} />
        <TextInput
          returnKeyType="done"
          clearButtonMode="while-editing"
          onChangeText={(g) => {
            setValue(g)
            props.valueChange(g)
          }}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={[styles.input, props.input]}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          caretHidden
          placeholder={t("msg13").toLowerCase()} />
        {
          value != "" && (
            <TouchableOpacity onPress={() => {
              setValue('')
              props.valueChange('')
            }}>
              <Image style={[styles.img, { tintColor: "#444" }]} source={require('../images/eraser.png')} />
            </TouchableOpacity>
          )
        }
      </View>
      <View style={{ backgroundColor: Colors.primary, padding: 10, alignSelf: "center", marginLeft: 5, borderRadius: 7 }}>
        <Image style={{ width: 30, height: 30, resizeMode: "contain", tintColor: Colors.light }} source={require('../images/setting.png')} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  flex: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 10,
    marginBottom: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1
  },
  img: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 10,
    tintColor: '#aaa'
  },
  input:
  {
    flex: 1,
    fontFamily: "Gilroy-Medium",
    fontSize: 17,
    paddingHorizontal: 10
  }
});

export default SearchBar;