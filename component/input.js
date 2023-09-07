import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Animated
} from 'react-native';
import palette from '../palette';
import { useTranslation } from 'react-i18next';

function Input({ onValueChange, value, placeholder, style }) {
  const [active, setActive] = React.useState(false)
  const animition = React.useRef(new Animated.Value(value == "" ? 1 : 0)).current;
  const first = () => {
    if (value == "")
      Animated.timing(animition, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start();
  };

  const second = () => {
    Animated.timing(animition, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    }).start();
  };
  const top = animition.interpolate({
    inputRange: [0, 1],
    outputRange: [-13, 13]
  })
  const left = animition.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 22]
  })
  const { t, i18n } = useTranslation()
  const font = t("font");
  return (
    <Animated.View style={[styles.body, active && { borderColor: palette.primary }, style]}>
      <Animated.Text style={[styles.text, { top: top, left: left, fontFamily: font + "-Medium", letterSpacing: 1 }, active && { color: palette.primary }]}>{placeholder}</Animated.Text>
      <TextInput placeholder={""} style={[styles.input, { fontFamily: font + "-Medium" }]}
        caretHidden={true}
        onFocus={() => { setActive(true); second() }}
        onBlur={() => { setActive(false); first() }}
        onChangeText={(g) => { onValueChange(g) }}
        value={value} />
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    borderColor: palette.secondary,
    backgroundColor: "#ffffff88",
    paddingHorizontal: 10,
    borderRadius: 7,
    marginVertical: 10,
    elevation: 0
  },
  input:
  {
    fontSize: 16,
    fontFamily: "Dosis-Medium",
    color: palette.secondary,
    borderWidth: 0,
  },
  text: {
    position: "absolute",
    fontFamily: "MavenPro-Medium",
    fontSize: 16,
    color: palette.secondary,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  }
});

export default Input;