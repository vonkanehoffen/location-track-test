import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * The unique key of the journey id.
 */
export const journeyIdStorageName = "journeyId";

/**
 * Set journey ID in storage.
 */
export async function setJourneyId(journeyId: string) {
  await AsyncStorage.setItem(journeyIdStorageName, journeyId);
}

/**
 *
 * @param location Get journey ID from storage.
 */
export async function getJourneyId() {
  return await AsyncStorage.getItem(journeyIdStorageName);
}
