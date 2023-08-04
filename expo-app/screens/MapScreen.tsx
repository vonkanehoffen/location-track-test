import React from "react";
import { Box, Button } from "../providers/theme";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../providers/NavigationProvider";

type MapScreenProps = NativeStackScreenProps<StackParamList, "Map">;

export function MapScreen({ navigation }: MapScreenProps) {
  return (
    <Box variant="page">
      <Box>
        <Button onPress={() => navigation.navigate("Distance")}>Go back</Button>
      </Box>
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
