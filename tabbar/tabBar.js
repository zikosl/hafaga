import React, { useState } from "react"
import { StyleSheet, View } from "react-native";
import TabItem from "./tabItem"

export default function TabBar({ style, icons, state, descriptors, navigation }) {
  //const focusedOptions = descriptors[state.routes[state.index].key].options;
  return (
    <View style={[styles.bar, style]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const icon = icons[index];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TabItem
            key={index}
            style={styles.item}
            //icon={icon}
            label={label}
            active={isFocused}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icon}
          </TabItem>
        )
      }
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 60,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
  },
  item: {
    flex: 1,
  },
});