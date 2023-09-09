import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackParamList } from "../providers/NavigationProvider";
import { View, StyleSheet, FlatList } from "react-native";
import { JourneySummary, useGetJourneys } from "../services/location/db";
import { Box, Button, Paragraph, Title } from "../providers/theme";

type JourneyInit = NativeStackScreenProps<StackParamList, "JourneyInit">;

export function JourneyInitScreen({ navigation }: JourneyInit) {
  const journeys = useGetJourneys();
  console.log("journeys", journeys);
  const handleNew = () => {
    const dateTime = new Date().toISOString().slice(0, 16);
    navigation.navigate("Map", { journeyId: dateTime });
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
      <Button onPress={handleNew}>New Journey</Button>
    </Box>
  );
}
