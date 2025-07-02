import Routing from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ChartProvider } from "./charts/chart-provider";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ChartProvider>
              <Routing />
            </ChartProvider>
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
