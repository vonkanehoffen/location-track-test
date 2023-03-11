import "./App.css";
import { Provider } from "urql";
import { LocationFeed } from "./views/location-feed/LocationFeed";
import { client } from "./client";

function App() {
  return (
    <Provider value={client}>
      <div className="App">
        <LocationFeed />
      </div>
    </Provider>
  );
}

export default App;
