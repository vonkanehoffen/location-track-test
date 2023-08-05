import React from "react";
import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface RoundButtonProps {
  onPress: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
}

export const RoundButton = ({ onPress, icon, style }: RoundButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <FontAwesome name={icon} size={24} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
    borderRadius: 40,
    backgroundColor: "#2239bf",
  },
});
