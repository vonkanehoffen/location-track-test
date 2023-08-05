import React from "react";
import { StyleSheet, StyleProp, ViewStyle, View, Text } from "react-native";

interface InfoHeaderProps {
  textA: string;
  textB: string;
  style?: StyleProp<ViewStyle>;
}

export const InfoHeader = ({ textA, textB, style }: InfoHeaderProps) => (
  <View style={[styles.infoHeader, style]}>
    <Text style={styles.textA}>{textA}</Text>
    <Text style={styles.textB}>{textB}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: 64,
    left: 32,
    right: 32,
    height: 64,
    backgroundColor: "#2239bf",
    borderRadius: 32,
    paddingHorizontal: 24,
  },
  textA: {
    color: "white",
    marginRight: 16,
    fontSize: 16,
  },
  textB: {
    color: "white",
    marginRight: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});
