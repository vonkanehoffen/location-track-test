import React from "react";
import { Box, Button, Paragraph } from "../providers/theme";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../providers/NavigationProvider";
import { useLocationData } from "../services/location";

type MapScreenProps = NativeStackScreenProps<StackParamList, "Map">;

export function MapScreen({ navigation }: MapScreenProps) {
  const locations = useLocationData();

  if (!locations?.length) return <Paragraph>No locations</Paragraph>;

  const coords = locations.map((location) => ({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }));

  return (
    <Box variant="page">
      <Box>
        <Button onPress={() => navigation.navigate("Distance")}>Go back</Button>
      </Box>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: locations[0].coords.latitude,
          longitude: locations[0].coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={coords} strokeColor="#000" strokeWidth={6} />
      </MapView>
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
