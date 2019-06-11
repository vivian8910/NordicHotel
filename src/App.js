import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import SearchAppBar from "./components/searchBar.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003f54",
      light: "#3a6a81"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <SearchAppBar />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
