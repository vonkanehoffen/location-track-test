import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
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

export function MapScreen({ route, navigation }: MapScreenProps) {
  const { journeyId } = route.params;

  const locations = useLocationData(journeyId);
  const tracking = useLocationTracking(journeyId);
  const distance = useLocationDistance(locations);

  // console.log("LOC DATA", locations);

  const emission = (distance * 0.192).toFixed(2);

  const polyline = locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));

  const currentLocation = locations[locations.length - 1];
  return (
    <View style={styles.container}>
      {locations?.length ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={locations[0]} />
          <Circle
            center={currentLocation}
            radius={currentLocation.accuracy}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.1)"
          />
          <Polyline coordinates={polyline} strokeColor="#000" strokeWidth={6} />
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
        onPress={() => navigation.navigate("JourneyInit")}
        icon="chevron-left"
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
