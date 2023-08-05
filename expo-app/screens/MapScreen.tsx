import React from "react";
import { Box, Button, Paragraph } from "../providers/theme";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../providers/NavigationProvider";
import { useLocations } from "../services/location/server-state";

type MapScreenProps = NativeStackScreenProps<StackParamList, "Map">;

export function MapScreen({ navigation }: MapScreenProps) {
  const [result, reexecuteQuery] = useLocations("1");
  const coords = result.data?.journey_location.map((l) => ({
    latitude: l.location.split(",")[0],
    longitude: l.location.split(",")[1],
  }));

  const refetch = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  if (!coords?.length)
    return (
      <Box>
        <Paragraph>No locations</Paragraph>
        <Button onPress={() => navigation.navigate("Distance")}>Go back</Button>
        <Button onPress={refetch}>Refetch</Button>
      </Box>
    );

  // const coords = locations.map((location) => ({
  //   latitude: location.coords.latitude,
  //   longitude: location.coords.longitude,
  // }));

  return (
    <Box variant="page">
      <Box style={{ paddingTop: 90 }}>
        <Button onPress={() => navigation.navigate("Distance")}>Go back</Button>
        <Button onPress={refetch}>Refetch</Button>
      </Box>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: coords[coords.length - 1].latitude,
          longitude: coords[coords.length - 1].longitude,
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
