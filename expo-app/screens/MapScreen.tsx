import React from "react";
import { Box, Button, Paragraph } from "../providers/theme";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../providers/NavigationProvider";
import {
  useLocationData,
  useLocationDistance,
  useLocationTracking,
} from "../services/location";
import { RoundButton } from "../components/RoundButton";
import { InfoHeader } from "../components/InfoHeader";

type MapScreenProps = NativeStackScreenProps<StackParamList, "Map">;

export function MapScreen({ navigation }: MapScreenProps) {
  const locations = useLocationData();
  const tracking = useLocationTracking();
  const distance = useLocationDistance(locations);

  const emission = (distance * 0.192).toFixed(2);

  const coords = locations.map((location) => ({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }));

  return (
    <View style={styles.container}>
      {locations?.length ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: locations[locations.length - 1].coords.latitude,
            longitude: locations[locations.length - 1].coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Polyline coordinates={coords} strokeColor="#000" strokeWidth={6} />
        </MapView>
      ) : null}
      <InfoHeader textA={`${distance}m`} textB={`${emission}g CO2e`} />
      {tracking.isTracking ? (
        <RoundButton
          onPress={tracking.stopTracking}
          icon="stop"
          style={styles.btnStartStop}
        />
      ) : (
        <RoundButton
          onPress={tracking.startTracking}
          icon="play"
          style={styles.btnStartStop}
        />
      )}
      <RoundButton
        onPress={tracking.clearTracking}
        icon="refresh"
        style={styles.btnReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  btnStartStop: {
    position: "absolute",
    bottom: 40,
    right: 32,
  },
  btnReset: {
    position: "absolute",
    bottom: 40,
    right: 120,
  },
});
