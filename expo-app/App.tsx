import { StatusBar } from "expo-status-bar";

import { NavigationProvider } from "./providers/NavigationProvider";
import { ThemeProvider } from "./providers/theme";
import { UrqlProvider } from "./providers/UrqlProvider";

export default function App() {
  return (
    <ThemeProvider>
      <UrqlProvider>
        <NavigationProvider />
        <StatusBar style="auto" />
      </UrqlProvider>
    </ThemeProvider>
  );
}
