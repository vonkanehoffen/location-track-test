import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForegroundPermissions } from "expo-location";
import { usePermissions } from "expo-notifications";
import { useCallback, useEffect } from "react";

import { StackParamList } from "../providers/NavigationProvider";
import { Button } from "../components/Button";
import { Box, Spinner, Title, Paragraph } from "../providers/theme";

type OnboardingScreenProps = NativeStackScreenProps<
  StackParamList,
  "Onboarding"
>;

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [locationPermission, askLocationPermission] =
    useForegroundPermissions();
  const [notifPermission, askNotifPermission] = usePermissions();

  const onContinue = useCallback(() => {
    navigation.navigate("JourneyInit");
  }, [navigation]);

  useEffect(() => {
    // Only redirect on first render or permission change,
    // not when users go back to this screen.
    if (locationPermission?.granted && notifPermission?.granted) {
      onContinue();
    }
  }, [onContinue, locationPermission?.granted, notifPermission?.granted]);

  if (locationPermission?.granted) {
    return (
      <Box variant="page">
        <Box>
          <Title>Permissions granted</Title>
          <Paragraph>
            To calculate emissions, we need access to your location.
          </Paragraph>
        </Box>
        <Button onPress={onContinue}>Let's start!</Button>
      </Box>
    );
  }

  return (
    <Box variant="page">
      <Box>
        <Title>We need your permission</Title>
        <Paragraph>
          To calculate emissions, we need access to your location.
        </Paragraph>
      </Box>
      {!locationPermission ? (
        <Spinner />
      ) : (
        <>
          <Button
            onPress={askNotifPermission}
            style={{ marginBottom: 16 }}
            label="Grant notification permission"
            icon={notifPermission?.granted ? "check-circle" : undefined}
          />
          <Button
            onPress={askLocationPermission}
            label="Grant location permission"
            icon={locationPermission?.granted ? "check" : undefined}
          />
        </>
      )}
    </Box>
  );
}
