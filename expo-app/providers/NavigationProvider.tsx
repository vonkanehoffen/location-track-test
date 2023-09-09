import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingScreen } from "../screens/OnboardingScreen";
import { MapScreen } from "../screens/MapScreen";
import { JourneyInitScreen } from "../screens/JourneyInitScreen";

export type StackParamList = {
  Onboarding: undefined;
  Distance: undefined;
  JourneyInit: undefined;
  Map: {
    journeyId: string;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

export function NavigationProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="JourneyInit" component={JourneyInitScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
