import { StatusBar } from "expo-status-bar";

import { NavigationProvider } from "./providers/NavigationProvider";
import { ThemeProvider } from "./providers/theme";
import { UrqlProvider } from "./providers/UrqlProvider";
import { setupDb } from "./services/location/db";

export default function App() {
  setupDb();
  return (
    <ThemeProvider>
      <UrqlProvider>
        <NavigationProvider />
        <StatusBar style="auto" />
      </UrqlProvider>
    </ThemeProvider>
  );
}
