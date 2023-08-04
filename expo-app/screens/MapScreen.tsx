import React from "react";
import { Box } from "../providers/theme";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export function MapScreen() {
  return (
    <Box variant="page">
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
