import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingScreen } from "../screens/OnboardingScreen";
import { DistanceScreen } from "../screens/DistanceScreen";
import { MapScreen } from "../screens/MapScreen";

export type StackParamList = {
  Onboarding: undefined;
  Distance: undefined;
  Map: undefined;
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
        <Stack.Screen name="Distance" component={DistanceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
