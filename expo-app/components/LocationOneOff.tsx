import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Button, View, Text } from "react-native";

export function LocationOneOff() {
  const [location, setLocation] = useState();
  const [fetching, setFetching] = useState(false);
  const getLocation = async () => {
    setFetching(true);
    const l = await Location.getCurrentPositionAsync();
    setLocation(l);
    setFetching(false);
  };
  return (
    <View>
      <Button title="Get Location One Off" onPress={getLocation} />
      <Text>{fetching && "Fetching..."}</Text>
      <Text> {JSON.stringify(location, null, 2)}</Text>
    </View>
  );
}
