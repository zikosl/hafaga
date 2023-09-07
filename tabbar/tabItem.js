import React, { Children } from "react"
import { TouchableWithoutFeedback, View, Animated, Text, StyleSheet, Image } from "react-native";
import { useSpring } from "./useSpring"
import { DiagonalTransition } from "./diagonalTransition"
import palette from "../palette";
import TextTraduction from "../component/textlang";
import { useTranslation } from 'react-i18next';


const activeColor = palette.primary;
const inactiveColor = palette.primary;

export default function TabItem({ style, icon, label, active, onPress,
  accessibilityRol,
  accessibilityState,
  accessibilityLabel,
  testID,
  onLongPress,
  children
}) {
  const animation = useSpring({ to: active ? 1 : 0 }, { stiffness: 50 });
  const dotScale = animation;
  const iconTranslate = animation.interpolate({ inputRange: [0, 1], outputRange: [0, -30] });
  const labelTranslate = animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
  const iconVisibility = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const labelVisibility = animation;
  const { t, i18n } = useTranslation();
  const font = t('font')
  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.centered, { transform: [{ translateY: labelTranslate }] }]}>
          <DiagonalTransition visibility={labelVisibility}>
            <TextTraduction style={[styles.label, { fontFamily: font + '-Medium' }]}>{t(label)}</TextTraduction>
          </DiagonalTransition>
        </Animated.View>
        <Animated.View style={[styles.centered, { transform: [{ translateY: iconTranslate }] }]}>
          <DiagonalTransition visibility={iconVisibility}>
            {
              children
            }
          </DiagonalTransition>
        </Animated.View>
        <Animated.View style={[styles.dot, { transform: [{ scale: dotScale }] }]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    position: "absolute",
  },
  icon: {
    tintColor: inactiveColor,
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  label: {
    color: activeColor,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  dot: {
    position: "absolute",
    bottom: 8,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: activeColor,
  },
});