import Routing from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Routing />
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
