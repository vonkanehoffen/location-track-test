import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { StackParamList } from "../providers/NavigationProvider";
import { FlatList } from "react-native";
import {
  DB_NAME,
  JourneySummary,
  dropLocationsTable,
  useGetJourneys,
} from "../services/location/db";
import { Box, Button, Title } from "../providers/theme";

type JourneyInit = NativeStackScreenProps<StackParamList, "JourneyInit">;

export function JourneyInitScreen({ navigation }: JourneyInit) {
  const journeys = useGetJourneys();
  const handleNew = () => {
    const dateTime = new Date().toISOString().slice(0, 16);
    navigation.navigate("Map", { journeyId: dateTime });
  };
  const handleDropTable = () => {
    dropLocationsTable();
  };
  const shareDb = () => {
    Sharing.shareAsync(`${FileSystem.documentDirectory}/SQLite/${DB_NAME}`, {
      dialogTitle: "Share or copy the DB via",
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Box variant="page" sx={{ my: 4 }}>
      <Title>Journeys</Title>
      <FlatList
        data={journeys}
        renderItem={({ item }: { item: JourneySummary }) => (
          <Box variant="secondary">
            <Button
              onPress={() =>
                navigation.navigate("Map", { journeyId: item.journeyId })
              }
            >
              {item.journeyId}
            </Button>
          </Box>
        )}
      />
      {/* <Button onPress={handleDropTable}>Drop Table</Button> */}
      <Button onPress={shareDb}>Share DB</Button>
      <Button onPress={handleNew}>New Journey</Button>
    </Box>
  );
}
