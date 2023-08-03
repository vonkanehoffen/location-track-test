import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LocationOneOff } from "./components/LocationOneOff";
import { LocationTracker } from "./components/LocationTracker";
import { Provider } from "urql";
import { client } from "./lib/client";
import { LocationTrackerBg } from "./components/LocationTrackerBg";
import AppStateExample from "./components/AppStateExample";

export default function App() {
  return (
    <Provider value={client}>
      <View style={styles.container}>
        <LocationOneOff />
        <LocationTracker />
        <LocationTrackerBg />
        <AppStateExample />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
