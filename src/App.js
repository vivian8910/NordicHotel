import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import HotelContainer from "./components/hotelContainer.js";
import SearchBar from "./components/searchBar.js";
import HotelDetails from "./components/hotelDetails.js";
import hotels from "./data/data.js";
import "./App.css";

const App = () => {
  const [hotelsData, setHotelsData] = useState(hotels.hotels);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <SearchBar hotelsData={hotelsData} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/location/:city"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/hotels/:name"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/hoteldetails/:hotel"
              render={props => (
                <HotelDetails
                  {...props}
                  hotelsData={hotelsData}
                  setHotelsData={setHotelsData}
                />
              )}
            />
            <Route
              path="/favoritelist"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003f54",
      light: "#3a6a81"
    }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default App;
