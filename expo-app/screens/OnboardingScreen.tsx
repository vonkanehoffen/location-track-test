import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForegroundPermissions } from "expo-location";
import { useCallback, useEffect } from "react";

import { StackParamList } from "../providers/NavigationProvider";
import { Box, Button, Spinner, Title, Paragraph } from "../providers/theme";
import { usePermissions } from "expo-notifications";

type OnboardingScreenProps = NativeStackScreenProps<
  StackParamList,
  "Onboarding"
>;

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [permission, askPermission] = useForegroundPermissions();
  const [notifPermission, askNotifPermission] = usePermissions();

  const onContinue = useCallback(() => {
    navigation.navigate("Distance");
  }, [navigation]);

  useEffect(() => {
    // Only redirect on first render or permission change,
    // not when users go back to this screen.
    if (permission?.granted) {
      onContinue();
    }
  }, [onContinue, permission?.granted]);

  if (permission?.granted) {
    return (
      <Box variant="page">
        <Box>
          <Title>Permissions granted</Title>
          <Paragraph>
            To monitor your office marathon, we need access to your location.
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
          To monitor your office marathon, we need access to your location.
        </Paragraph>
      </Box>
      {!permission ? (
        <Spinner />
      ) : (
        <>
          <Button onPress={askNotifPermission}>
            Grant{notifPermission && "ed"} notification permission
          </Button>
          <Button onPress={askPermission}>Grant permission</Button>
        </>
      )}
    </Box>
  );
}
