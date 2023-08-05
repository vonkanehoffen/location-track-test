import React from "react";
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ButtonProps {
  onPress: () => void;
  icon: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({ onPress, icon, label, style }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{label}</Text>
      {icon && (
        <FontAwesome name={icon} size={24} color="white" style={styles.icon} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 64,
    borderRadius: 40,
    backgroundColor: "#2239bf",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    marginLeft: 16,
  },
});
